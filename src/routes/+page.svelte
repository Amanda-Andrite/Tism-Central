<script>
	import {goto} from '$app/navigation';
	import {resolve} from '$app/paths';
	import {showAuthModal} from '$lib/authModal';

	function continueAsGuest() {
		goto(resolve('/home'));
	}

	function openAuthModal() {
		showAuthModal.set(true);
	}
</script>

<div class="start-page">
    <div class ="background-overlay"></div>

	<div class="welcome-box">
		<h1>Welcome to Inspire Co.</h1>
		<p>Browse and explore all our wonderful pieces of art.</p>

		<button class="start-button" on:click={openAuthModal}>Log In / Sign Up</button>
		<button class="start-button guest-button" on:click={continueAsGuest}>Continue as Guest</button>
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
		color: var(--color-surface);
	}

	.welcome-box p {
		margin-bottom: var(--space-lg);
		color: var(--color-surface);
	}

	.start-button {
		width: 100%;
		max-width: 240px;
		padding: 12px;
		border: none;
		border-radius: var(--radius-md);
		background-color: var(--searchbar-accent);
		color: white;
		font-size: var(--font-base);
		font-family: var(--font-body);
		cursor: pointer;
	}

    .start-button:hover {
        background-color: var(--searchbar-background);
        color: var(--text-primary);
    }

	.guest-button {
		background-color: var(--searchbar-accent);
	}

	@media (max-width: 500px) {
		.welcome-box {
			min-height: 420px;
			padding: var(--space-md);
		}

		.start-button {
			max-width: 100%;
		}
	}
</style>