<header class="header">
	<div class="logo-area">
		<h1>Inspire Co.</h1>
	</div>

	<nav>
		<!-- Navigation links -->
		<a href="/">Home</a>
		<a href="/catalogue">Catalogue</a>
		<a href="/about">About</a>
		<a href="/contact">Contact</a>
		<div class="icon-group">
			<a href="/wishlist" class="icon-link" aria-label="Wishlist">
				<img src="/icons/heart-svgrepo-com.svg" alt="Wishlist" width="20" height="20" />
			</a>

			<a href="/cart" class="icon-link" aria-label="Cart">
				<img src="/icons/basket-2-svgrepo-com.svg" alt="Cart" width="24" height="24" />
			</a>

			<a href="/account" class="icon-link" aria-label="Account">
				<img src="/icons/profile-circle-svgrepo-com.svg" alt="Account" width="24" height="24" />
			</a>
		</div>
	</nav>
</header>

<style>
	.header {
		display: flex;
		justify-content: space-between; /* logo is placed next to navigation */
		align-items: center;
		padding: var(--space-md) var(--space-lg);
		background-color: var(--color-surface);
		font-family: var(--font-heading);
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
