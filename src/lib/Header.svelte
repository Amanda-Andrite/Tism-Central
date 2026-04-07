<script>
	import {page} from '$app/stores';
	import {showAuthModal} from '$lib/authModal.js';
	import {resolve} from '$app/paths';

	$: isStartPage = $page.url.pathname === '/';
	
	function openAuthModal() {
		showAuthModal.set(true);
	}
</script>

<header class="header">
	<div class="logo-area">
		<a href={resolve("/")}><h1>Inspire Co.</h1></a>
	</div>

{#if isStartPage}
	<nav>
		<div class="icon-group">
			<button class="icon-button" on:click={openAuthModal} aria-label="Account">
				<img src="/icons/profile-circle-svgrepo-com.svg" alt="Account" width="24" height="24" />
			</button>
		</div>
	</nav>

{:else}
	<nav>
		<!-- Navigation links -->
		<a href={resolve("/home")}>Home</a>
		<a href={resolve("/catalogue")}>Catalogue</a>
		<a href={resolve("/about")}>About</a>
		<a href={resolve("/contact")}>Contact</a>
		<div class="icon-group">
			<a href={resolve("/wishlist")} class="icon-link" aria-label="Wishlist">
				<img src="/icons/heart-svgrepo-com.svg" alt="Wishlist" width="20" height="20" />
			</a>

			<a href={resolve("/cart")} class="icon-link" aria-label="Cart">
				<img src="/icons/basket-2-svgrepo-com.svg" alt="Cart" width="24" height="24" />
			</a>

			<a href={resolve("/account")} class="icon-link" aria-label="Account">
				<img src="/icons/profile-circle-svgrepo-com.svg" alt="Account" width="24" height="24" />
			</a>
		</div>
	</nav>
{/if}
</header>

<style>
	.header {
		display: flex;
		justify-content: space-between; /* logo is placed next to navigation */
		align-items: center;

		padding: 0.25rem var(--space-lg); /*Changed to make header smaller*/

		background-color: var(--color-surface);
		font-family: var(--font-heading);
	}

	.icon-button {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		display: flex;
		align-items: center;
	}

	/* Navigation links */
	nav {
		display: flex; /* horizontal layout */
		gap: calc(var(--space-lg) * 2); /* wider spacing using variable */
		align-items: center;
	}

	nav a {
		color: var(--text-primary);
		text-decoration: none;
		font-weight: bold;
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	nav a:hover {
		color: var(--color-accent);
	}

	.icon-group {
		display: flex;
		gap: 1.5rem; /* icons are closer together */
		align-items: center;
	}

	/* Responsive to smaller screens */
	@media (max-width: 768px) {
		.header {
			flex-direction: column; /* logo on top of nav */
			align-items: flex-start;
		}
		.logo-area {
			margin-bottom: var(--space-sm);
		}
		nav {
			flex-wrap: wrap;
			gap: var(--space-md);
		}
	}
</style>
