<script>
	import Button from '$lib/Button.svelte';
	import {onMount} from 'svelte';

	let name = '';
	let email = '';
	let message = '';

	//UI and message state
	let showSuccessModal = false;
	let submittedMessages = [];
	let editingId = null;
	let modalTitle = 'Message Received';

	//PRevents local storage from saving before old messages have loaded
	let storageLoaded = false;

	const maxMessageLength = 500;

	//Loads saved messages from localStorage when the page opens
	onMount(() => {
		const savedMessages = localStorage.getItem('submittedMessages');

		if(savedMessages) {
			submittedMessages = JSON.parse(savedMessages);
		}
		storageLoaded = true;
	});

	//Saves messages whenever submittedMessages changes
	$: if(storageLoaded) {
		localStorage.setItem('submittedMessages', JSON.stringify(submittedMessages));
	}

	function clearForm() {
		name = '';
		email = '';
		message = '';
		editingId = null;
	}

	//Handles both creating a new message and updating an exsisting message
	function handleSubmit() {
		if (!name.trim() || !email.trim() || !message.trim()) {
			return;
		}

		//If editingId has a value, update the exsisting message
		if (editingId !== null) {
			submittedMessages = submittedMessages.map((item) =>
				item.id === editingId
					? {
							...item,
							name,
							email,
							message
						}
					: item
			);

			modalTitle = 'Message Updated';
		} else {
			//Otherwise create a new message with a unique id
			submittedMessages = [
				...submittedMessages,
				{
					id: Date.now(),
					name,
					email,
					message
				}
			];

			modalTitle = 'Message Received';
		}

		showSuccessModal = true;
		clearForm();
	}

	//Loads selected message back into the form for editing
	function editMessage(item) {
		name = item.name;
		email = item.email;
		message = item.message;
		editingId = item.id;

		//Auto scrolls user up to thhe form
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}

	//Deletes a message after confirmation
	function deleteMessage(id) {
		if (confirm('Delete this message?')) {
			submittedMessages = submittedMessages.filter((item) => item.id !== id);

			//If the deleted message was being edited, reset the form
			if (editingId === id) {
				clearForm();
			}
		}
	}

	//Cancels editing and returns the form to the normal submit mode
	function cancelEdit() {
		clearForm();
	}

	function closeSuccessModal() {
		showSuccessModal = false;
	}
</script>

<div class="contact-page">
	<h1>GET IN TOUCH</h1>
	<p class="subtitle">We’d love to hear from you!</p>

	<!-- Contact form uses preventDefault so Svelte handles submission without the page reloading-->
	<form class="contact-form" on:submit|preventDefault={handleSubmit}>
		<label for="name">Name</label>
		<input id="name" type="text" bind:value={name} required />

		<label for="email">Email Address</label>
		<input id="email" type="email" bind:value={email} required />

		<label for="message">Message</label>
		<textarea
			id="message"
			rows="4"
			bind:value={message}
			required
			maxlength={maxMessageLength}
			placeholder="Write your message here..."
		></textarea>

		<!-- Live feedback on message length -->
		<p class="char-count">{message.length}/{maxMessageLength} characters</p>
		
		<!-- Shows when the user is editing an exsisting saved message -->
		{#if editingId !== null}
			<p class="editing-message">Editing saved message</p>
		{/if}

		<div class="submit-wrapper">
			<Button
				text={editingId !== null ? 'Update Message' : 'Submit'}
				type="submit"
				buttonClass="start-button"
			/>
		</div>

		{#if editingId !== null}
			<div class="submit-wrapper">
				<Button
					text="Cancel Edit"
					type="button"
					buttonClass="start-button"
					on:click={cancelEdit}
				/>
			</div>
		{/if}
	</form>

	<div class="submitted-messages">
		<h2>Saved Messages</h2>

		{#if submittedMessages.length === 0}
			<p class="empty-message">No messages submitted yet.</p>
		{:else}
			<!-- Keyed each block to help Svelte track each message bu id -->
			{#each submittedMessages as item (item.id)}
				<div class="message-card">
					<p><strong>Name:</strong> {item.name}</p>
					<p><strong>Email:</strong> {item.email}</p>
					<p><strong>Message:</strong> {item.message}</p>

					<div class="message-actions">
						<Button
							text="Edit"
							type="button"
							buttonClass="action-button"
							on:click={() => editMessage(item)}
						/>

						<Button
							text="Delete"
							type="button"
							buttonClass="action-button"
							on:click={() => deleteMessage(item.id)}
						/>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>

{#if showSuccessModal}
	<div class="modal-overlay">
		<div
			class="success-modal"
			role="dialog"
			aria-modal="true"
			aria-labelledby="success-title"
		>
			<button
				class="close-button"
				on:click={closeSuccessModal}
				aria-label="Close popup"
			>
				×
			</button>

			<div class="success-icon" aria-hidden="true">✓</div>

			<h2 id="success-title">{modalTitle}</h2>
			<p>Your message has been saved successfully.</p>
		</div>
	</div>
{/if}

<style>
	.contact-page {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: var(--space-md) var(--space-lg);
	}

	h1 {
		font-family: var(--font-heading);
		margin-bottom: var(--space-sm);
	}

	.subtitle {
		color: var(--text-primary);
		margin-bottom: var(--space-sm);
	}

	.contact-form {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-sm);
		width: 100%;
		max-width: 500px;
	}

	.contact-form label {
		text-align: left;
		font-weight: bold;
	}

	.contact-form input,
	.contact-form textarea {
		padding: var(--space-md);
		border: none;
		background-color: var(--card-background);
		border-radius: var(--radius-sm);
		font-family: var(--font-body);
	}

	.contact-form textarea {
		resize: none;
		min-height: 90px;
	}

	.char-count {
		margin: 0;
		text-align: right;
		font-size: var(--font-sm);
		color: var(--text-primary);
	}

	.editing-message {
		margin: 0;
		font-weight: bold;
		color: var(--text-primary);
	}

	.submit-wrapper {
		display: flex;
		justify-content: center;
		margin-top: 0;
	}

	.submitted-messages {
		width: 100%;
		max-width: 500px;
		margin-top: var(--space-lg);
		text-align: left;
	}

	.submitted-messages h2 {
		text-align: center;
		font-family: var(--font-heading);
	}

	.empty-message {
		text-align: center;
		color: var(--text-primary);
	}

	.message-card {
		background-color: var(--card-background);
		padding: var(--space-md);
		border-radius: var(--radius-md);
		margin-bottom: var(--space-md);
	}

	.message-actions {
		display: flex;
		gap: var(--space-sm);
		justify-content: flex-end;
	}

	.modal-overlay {
		position: fixed;
		inset: 0;
		background: var(--overlay-background-transparent);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	.success-modal {
		position: relative;
		width: 100%;
		max-width: 450px;
		min-height: 340px;
		background-color: var(--color-surface);
		padding: var(--space-lg);
		border-radius: var(--card-radius);
		box-shadow: 0 4px 20px var(--color-shadow);
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: var(--space-md);
	}

	.success-icon {
		width: 72px;
		height: 72px;
		border-radius: 50%;
		background-color: var(--card-background);
		color: var(--text-primary);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: var(--font-xl);
		font-weight: bold;
	}

	.success-modal h2 {
		margin: 0;
		font-family: var(--font-heading);
	}

	.success-modal p {
		margin: 0;
		max-width: 320px;
		line-height: 1.6;
		color: var(--color-white);
	}

	.close-button {
		position: absolute;
		top: var(--space-sm);
		right: var(--space-sm);
		width: 40px;
		height: 40px;
		border: none;
		background: none;
		font-size: var(--font-xl);
		cursor: pointer;
		color: var(--color-white);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
	}

	.close-button:hover {
		background-color: var(--color-hover-light);
		color: var(--text-primary);
	}

	.close-button:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 2px;
	}

	/* Placeholder text style for message box*/
	.contact-form input::placeholder,
	.contact-form textarea::placeholder {
		color: var(--color-white);
		opacity: 0.8;
	}

	@media (max-width: 600px) {
		.contact-form {
			max-width: 100%;
		}

		.success-modal {
			max-width: 90%;
			margin: 0 var(--space-md);
		}
	}
</style>