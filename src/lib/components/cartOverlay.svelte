<script>
	import { cartOverlayVisible, cartItems } from '$lib/stores/cart';
	import { fly } from 'svelte/transition';

	function closeOverlay() {
		cartOverlayVisible.set(false);
	}

	function removeItem(itemToRemove) {
		if (!itemToRemove || !itemToRemove.id) return;
		//update cart items by filtering out the item to remove
		cartItems.update((items) => items.filter((item) => item.id !== itemToRemove.id)); //remove item from cart
	}
</script>

{#if $cartOverlayVisible}
	<div
		class="overlay-background"
		role="button"
		on:click={closeOverlay}
		on:keydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') closeOverlay();
		}}
	></div>

    <div class ="overlay-panel" in:fly={{ x: 300, duration: 200 }}>
        <h3>Your Cart</h3>
        <button on:click={closeOverlay}>Close</button>
    </div>
{/if}

<style>
    .overlay-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1000;
    }

    .overlay-panel {
        position: fixed;
        top: 0;
        right: 0;
        width: 300px;
        height: 100%;
        background: white;
        box-shadow: -2px 0 10px rgba(0, 0, 0, 0.3);
        padding: 20px;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
</style>
