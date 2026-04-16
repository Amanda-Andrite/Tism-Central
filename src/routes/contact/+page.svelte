<script>
	import Button from '$lib/Button.svelte';

	let name = '';
	let email = '';
	let message = '';

	let showSuccessModal = false;
	const maxMessageLength = 500;

	function handleSubmit() {
		showSuccessModal = true;
	}

	function closeSuccessModal() {
		showSuccessModal = false;
		name = '';
		email = '';
		message = '';
	}
</script>

<div class="contact-page">
	<h1>GET IN TOUCH</h1>
	<p class="subtitle">We’d love to hear from you!</p>

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

		<p class="char-count">{message.length}/{maxMessageLength} characters</p>

		<div class="submit-wrapper">
			<Button
				text="Submit"
				type="submit"
				buttonClass="start-button"
			/>
		</div>
	</form>
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

			<h2 id="success-title">Message Received</h2>
			<p>
				Your message has been received and we will get back to you as soon as possible.
			</p>
		</div>
	</div>
{/if}

<style>
	.contact-page {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 0.75rem var(--space-lg) var(--space-md);
	}

	h1 {
		font-family: var(--font-heading);
		margin-bottom: 0.2rem;
	}

	.subtitle {
		color: var(--text-secondary);
		margin-bottom: 0.5rem;
	}

	.contact-form {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.6rem;
		width: 100%;
		max-width: 500px;
	}

	.contact-form label {
		text-align: left;
		font-weight: bold;
	}

	.contact-form input,
	.contact-form textarea {
		padding: 12px;
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
		margin: -0.15rem 0 0;
		text-align: right;
		font-size: var(--font-sm);
		color: var(--text-secondary);
	}

	.submit-wrapper {
		display: flex;
		justify-content: center;
		margin-top: -0.1rem;
	}

	.modal-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.45);
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
		padding: 2.5rem 2rem;
		border-radius: var(--card-radius);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}

	.success-icon {
		width: 72px;
		height: 72px;
		border-radius: 50%;
		background-color: rgba(0, 128, 0, 0.12);
		color: #1b5e20;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2.3rem;
		font-weight: bold;
	}

	.success-modal h2 {
		margin: 0;
	}

	.success-modal p {
		margin: 0;
		max-width: 320px;
		line-height: 1.6;
	}

	.close-button {
		position: absolute;
		top: 12px;
		right: 12px;
		width: 40px;
		height: 40px;
		border: none;
		background: none;
		font-size: 1.6rem;
		cursor: pointer;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
	}

	.close-button:hover {
		background-color: rgba(0, 0, 0, 0.08);
	}

	.close-button:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 2px;
	}

	@media (max-width: 600px) {
		.contact-form {
			max-width: 100%;
		}

		.success-modal {
			max-width: 90%;
			margin: 0 1rem;
		}
	}
</style>