<script>
	import { cartOverlayVisible, cartItems } from '$lib/stores/cart';
	import { fly } from 'svelte/transition';

	function closeOverlay() {
		cartOverlayVisible.set(false);
	}

	function changeQuantity(id, amount) {
		cartItems.update(
			(items) =>
				items
					.map((item) => (item.id === id ? { ...item, quantity: item.quantity + amount } : item))
					.filter((item) => item.quantity > 0) //remove item if quantity drops to 0
		);
	}

	function increaseQuantity(item) {
		changeQuantity(item.id, 1);
	}

	function decreaseQuantity(item) {
		changeQuantity(item.id, -1);
		
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
						<div class="items-left">
							<div class="item-image"></div>
							<div class="quantity-controls">
								<button on:click={() => decreaseQuantity(item)}>-</button>
								<span>{item.quantity || 1}</span>
								<button on:click={() => increaseQuantity(item)}>+</button>
							</div>
						</div>
						<div class="item-details">
							<h4>{item.name}</h4>
							<p><strong>Artist:</strong> {item.artists}</p>
							<p><strong>Size:</strong> {item.size}</p>
							<p><strong>Price:</strong> ${item.price}</p>
							<button on:click={() => removeItem(item)}>Remove</button>
						</div>
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
		display: flex;
		gap: 10px;
		align-items: flex-start;
		border: 1px solid #ddd;
		border-radius: 10px;
		padding: 10px;
		background: #f9f9f9;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
	}

	.item-image {
		width: 100px;
		height: 100px;
		background: #ddd;
		border-radius: 6px;
		flex-shrink: 0;
	}

	.item-details {
		flex: 1;
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

	.quantity-controls {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-top: 8px;
	}

	.items-left {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
	}

	.quantity-controls button {
		width: 25px;
		height: 25px;
		border: none;
		background: black;
		color: white;
		border-radius: 4px;
		cursor: pointer;
	}

	.quantity-controls span {
		min-width: 20px;
		text-align: center;
		font-weight: bold;
	}
</style>
