<nav class="nav">
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/contact">Contact</a>
  <a href="/catalogue">Catalogue</a>
  <a href="/wishlist">Wishlist</a>
  <a href="/account">Account</a>
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