<script>
	import {page} from '$app/stores';
	import {showAuthModal, resetAuthState} from '$lib/authModal.js';
	import {resolve, base} from '$app/paths';
	import {cartOverlayVisible} from '$lib/stores/cart';

	$: isStartPage = $page.url.pathname === '/';
	
	function openAuthModal() {
		resetAuthState();
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
				<img src="{base}/icons/profile-circle-svgrepo-com.svg" alt="Account" width="24" height="24" />
			</button>
		</div>
	</nav>

{:else}
	<nav>
		<!-- Navigation links -->
		<a href={resolve("/home")}>Home</a>
		<a href={resolve("/about")}>About</a>
		<a href={resolve("/contact")}>Contact</a>
		<div class="icon-group">
			<a href={resolve("/wishlist")} class="icon-link" aria-label="Wishlist">
				<img src="{base}/icons/heart-svgrepo-com.svg" alt="Wishlist" width="20" height="20" />
			</a>

			<button class="icon-button" on:click={() => cartOverlayVisible.set(true)} aria-label="Cart">
				<img src="{base}/icons/basket-2-svgrepo-com.svg" alt="Cart" width="24" height="24" />
			</button>

			<a href={resolve("/account")} class="icon-link" aria-label="Account">
				<img src="{base}/icons/profile-circle-svgrepo-com.svg" alt="Account" width="24" height="24" />
			</a>
		</div>
	</nav>
{/if}
</header>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.25rem var(--space-lg); 
		background-color: var(--color-surface);
		font-family: var(--font-heading);
	}

	.logo-area h1 {
		font-family: var(--font-heading);
		color: var(--link-color);
	}

	.icon-button {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		display: flex;
		align-items: center;
	}

	.icon-button img, 
	.icon-link img {
		filter: brightness(0) invert(1);
	}

	/* Navigation links */
	nav {
		display: flex; 
		gap: calc(var(--space-lg) * 2); 
		align-items: center;
	}

	nav a {
		font-family: var(--font-body);
		color: var(--link-color);
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
		gap: 1.5rem; 
		align-items: center;
	}

	/* Responsive to smaller screens */
	@media (max-width: 768px) {
		.header {
			flex-direction: column; 
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
