<header class="header">
  <div class="logo-area">
    <h1>Inspire Co.</h1>
  </div>

  <nav> <!-- Navigation links -->
    <a href="/">Home</a>
    <a href="/catalogue">Catalogue</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
    <a href="/account">Account</a>
    <a href="/wishlist">Wishlist</a>
    <a href="/cart">Cart</a>
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
  }

  nav a {
    color: var(--text-primary);
    text-decoration: none;
    font-weight: bold;
  }

  nav a:hover {
    color: var(--color-accent);
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