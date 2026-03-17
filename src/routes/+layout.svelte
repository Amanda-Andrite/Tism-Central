<script>
  // Import components
  import Header from "$lib/Header.svelte";
  import Footer from "$lib/Footer.svelte";
</script>

<div id="layout-container">
    <!-- Header -->
    <Header />

    <!-- Page Content -->
    <main id="main-content" tabindex="-1">
        <slot />
    </main>

    <!-- Footer -->
    <Footer />
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

   @media (max-width: 768px) {
        main {
            padding: var(--space-lg) var(--space-md);
        }
    }
</style>