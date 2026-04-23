<script>
  import {resolve} from '$app/paths';
</script>

<nav class="nav">
	<a href={resolve('/home')}>Home</a>
	<a href={resolve('/about')}>About</a>
	<a href={resolve('/contact')}>Contact</a>
	<a href={resolve('/wishlist')}>Wishlist</a>
	<a href={resolve('/account')}>Account</a>
</nav>

<style>
  .nav {
    display: flex;
    gap: var(--space-md);
    font-family: var(--font-body);
  }

  .nav a {
    text-decoration: none;
    color: var(--text-primary);
    font-weight: 500;
  }

  .nav a:hover {
    color: var(--color-accent);
  }

  @media (max-width: 640px) {
    .nav {
      flex-direction: column;
      gap: var(--space-sm);
    }
  }
</style>