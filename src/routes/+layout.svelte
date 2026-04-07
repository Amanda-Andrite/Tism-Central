<script>
  // Import components
  import Header from "$lib/Header.svelte";
  import Footer from "$lib/Footer.svelte";

	import { showAuthModal } from '$lib/authModal.js';
	import { goto } from '$app/navigation';
  import {resolve} from '$app/paths';

	let email = '';
	let password = '';

	function closeModal() {
		showAuthModal.set(false);
		email = '';
		password = '';
	}

	function continueToSite() {
    if (!email || !password) return;

		showAuthModal.set(false);
		goto(resolve('/home'));
	}
</script>

<div id="layout-container">
    <!-- Header -->
    <Header />

    <!-- Page Content -->
    <main id="main-content" tabindex="-1">
        <slot />
    </main>

    {#if $showAuthModal}
		  <div class="modal-overlay" on:click={closeModal}>
			  <div class="modal-box" on:click|stopPropagation>
				  <button class="close-button" on:click={closeModal}>×</button>

				  <h2>Log In / Sign Up</h2>

				  <label>Email</label>
				  <input
					  type="email"
					  bind:value={email}
					  placeholder="Enter your email"
				  />

				  <label>Password</label>
				  <input
					  type="password"
					  bind:value={password}
				  	placeholder="Enter your password"
				  />

				  <button class="continue-button" on:click={continueToSite}>
					  Continue
				  </button>
			  </div>
		  </div>
	  {/if}

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

.continue-button {
	padding: 12px;
	border: none;
	border-radius: var(--radius-md);
	background-color: var(--searchbar-accent);
	color: white;
	font-size: var(--font-base);
	cursor: pointer;
}

.continue-button:hover {
	background-color: var(--searchbar-background);
	color: var(--text-primary);
}

.close-button {
	position: absolute;
	top: 10px;
	right: 10px;
	background: none;
	border: none;
	font-size: 1.5rem;
	cursor: pointer;
	color: var(--text-primary);
}

   @media (max-width: 768px) {
        main {
            padding: var(--space-lg) var(--space-md);
        }
    }
</style>