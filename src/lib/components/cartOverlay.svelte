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
		tabindex="0" 
		on:click={closeOverlay}
		on:keydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') closeOverlay();
		}}
	></div>

	<!-- Cart overlay panel -->
	<div class="overlay-panel" in:fly={{ x: 300, duration: 200 }} out:fly={{ x: 300, duration: 200 }}>
		<h3>Your Cart</h3>
		{#if $cartItems.length === 0}
			<p>Your cart is empty.</p>
		{:else}
			<div class="cart-list">
				{#each $cartItems as item}
					<!--loop through cart items and display them-->
					<div class="cart-item">
						<h4>{item.name}</h4>
						<p><strong>Artist:</strong> {item.artists}</p>
						<p><strong>Size:</strong> {item.size}</p>
						<p><strong>Price:</strong> ${item.price}</p>
						<button on:click={() => removeItem(item)}>Remove</button>
					</div>
				{/each}
			</div>
		{/if}
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

	.cart-list {
		flex: 1;
		overflow-y: auto;
		padding-right: 5px;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.cart-item {
		border: 1px solid #ddd;
		border-radius: 10px;
		padding: 10px;
		background: #f9f9f9;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
	}

	.cart-item h4 {
		margin: 0 0 5px 0;
	}

	.cart-item p {
		margin: 2px 0;
		font-size: 14px;
	}

	.cart-item button {
		margin-top: 5px;
		padding: 5px;
		background: #000000;
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;
	}
</style>
