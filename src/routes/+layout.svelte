<script>
	import Header from "$lib/Header.svelte";
	import Footer from "$lib/Footer.svelte";
	import CartOverlay from "$lib/components/cartOverlay.svelte";

	import { showAuthModal, authState, resetAuthState } from '$lib/authModal.js';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import Button from '$lib/Button.svelte';

	function updateEmail(value) {
		authState.update((state) => ({
			...state,
			email: value
		}));
	}

	function updatePassword(value) {
		authState.update((state) => ({
			...state,
			password: value
		}));
	}

	function closeModal() {
		showAuthModal.set(false);
		resetAuthState();
	}

	function continueToSite() {
		const currentState = $authState;

		if (!currentState.email.trim() || !currentState.password.trim()) {
			authState.update((state) => ({
				...state,
				errorMessage: 'Please enter both email and password.',
				successMessage: ''
			}));
			return;
		}

		authState.update((state) => ({
			...state,
			errorMessage: '',
			successMessage: 'Login successful. Redirecting to home page...'
		}));

		localStorage.setItem('isLoggedIn','true');
		localStorage.setItem('isGuest','false');
		localStorage.setItem('userEmail', currentState.email);

		setTimeout(() => {
			showAuthModal.set(false);
			resetAuthState();
			goto(resolve('/home'));
		}, 800);
	}
</script>

<div id="layout-container">
	<Header />

	<main id="main-content" tabindex="-1">
		<slot />
	</main>

	{#if $showAuthModal}
		<div class="modal-overlay">
			<div
				class="modal-box"
				role="dialog"
				aria-modal="true"
				aria-labelledby="auth-title"
			>
				<button class="close-button" on:click={closeModal} aria-label="Close login modal">×</button>

				<h2 id="auth-title">Log In / Sign Up</h2>

				<label for="email">Email</label>
				<input
					id="email"
					type="email"
					value={$authState.email}
					on:input={(e) => updateEmail(e.target.value)}
					placeholder="Enter your email"
				/>

				<label for="password">Password</label>
				<input
					id="password"
					type="password"
					value={$authState.password}
					on:input={(e) => updatePassword(e.target.value)}
					placeholder="Enter your password"
				/>

				{#if $authState.errorMessage}
					<p
						class="feedback-message error-message"
						aria-live="assertive"
						role="alert"
					>
						{$authState.errorMessage}
					</p>
				{/if}

				{#if $authState.successMessage}
					<p
						class="feedback-message success-message"
						aria-live="polite"
					>
						{$authState.successMessage}
					</p>
				{/if}

				<Button
					text="Continue"
					buttonClass="continue-button"
					on:click={continueToSite}
				/>
			</div>
		</div>
	{/if}

	<Footer />
	<CartOverlay/>
</div>

<style>
	#layout-container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background-color: var(--color-background);
		color: var(--text-primary);
		font-family: var(--font-body);
	}

	main {
		flex: 1;
		padding: var(--space-md);
	}

	.modal-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 999;
	}

	.modal-box {
		position: relative;
		width: 100%;
		max-width: 400px;
		background-color: var(--color-surface);
		padding: var(--space-lg);
		border-radius: var(--card-radius);
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
	}

	.modal-box h2 {
		margin: 0;
		text-align: center;
	}

	.modal-box label {
		font-weight: bold;
		color: var(--text-primary);
	}

	.modal-box input {
		padding: 12px;
		border: 1px solid var(--card-background);
		border-radius: var(--radius-md);
		font-size: var(--font-base);
		font-family: var(--font-body);
	}

	.close-button {
		position: absolute;
		top: 10px;
		right: 10px;

		width: 32px;
		height: 32px;

		display: flex;
		align-items: center;
		justify-content: center;

		background: none;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
		color: var(--text-primary);
    	padding: var(--radius-sm);
		border-radius: 50%;
		transition: background-color 0.2s ease, transform 0.15s ease;
	}

	.close-button:hover {
		background-color: rgba(0, 0, 0, 0.1);
		transform: scale(1.1);
	}

	.close-button:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 2px;
	}

	.close-button:active {
		transform: scale(0.95);
	}

	.feedback-message {
		margin: 0;
		font-size: var(--font-sm);
		text-align: center;
		padding: var(--space-sm);
		border-radius: var(--radius-sm);
	}

	.error-message {
		background-color: rgba(255, 0, 0, 0.08);
		color: #b00020;
	}

	.success-message {
		background-color: rgba(0, 128, 0, 0.08);
		color: #1b5e20;
	}

	@media (max-width: 768px) {
		main {
			padding: var(--space-lg) var(--space-md);
		}
	}
</style>