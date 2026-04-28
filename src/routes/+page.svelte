<script>
	import Button from '$lib/Button.svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import {onMount} from 'svelte';
	import { showAuthModal, resetAuthState } from '$lib/authModal';


	onMount(() => {
		const isLoggedIn = localStorage.getItem('isLoggedIn');
		const isGuest = localStorage.getItem('isGuest');

		if(isLoggedIn === 'true' || isGuest === 'true') {
			goto(resolve('/home'));
		}
	});

	function continueAsGuest() {
		localStorage.setItem('isGuest','true');
		localStorage.setItem('isLoggedIn','false');
		localStorage.removeItem('userEmail');

		goto(resolve('/home'));
	}

	function openAuthModal() {
		resetAuthState();
		showAuthModal.set(true);
	}
</script>

<div class="start-page">
	<div class="background-overlay"></div>

	<div class="welcome-box">
		<h1>Welcome to Inspire Co.</h1>
		<p>Browse and explore all our wonderful pieces of art.</p>

		<Button
			text="Log In / Sign Up"
			buttonClass="start-button"
			on:click={openAuthModal}
		/>

		<Button
			text="Continue as Guest"
			buttonClass="start-button guest-button"
			on:click={continueAsGuest}
		/>
	</div>
</div>

<style> 
	.start-page {
		position: relative;
		min-height: calc(100vh - 140px);
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--color-surface);
		padding: var(--space-lg);
		overflow: hidden;
	}

	.background-overlay {
		position: absolute;
		inset: 0;
		background-color: var(--transparent-overlay);
		z-index: 1;
	}

	.welcome-box {
		position: relative;
		z-index: 2;
		width: 100%;
		max-width: 380px;
		min-height: 500px;
		background-color: var(--overlay-background-transparent);
		border-radius: var(--card-radius);
		padding: var(--space-lg);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		gap: var(--space-md);
	}

	.welcome-box h1 {
		margin: 0;
		font-family: var(--font-heading);
		color: var(--color-white);
	}

	.welcome-box p {
		margin-bottom: var(--space-lg);
		color: var(--color-white);
	}

	@media (max-width: 500px) {
		.welcome-box {
			min-height: 420px;
			padding: var(--space-md);
		}
	}
</style>