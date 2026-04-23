<script>
	import { cartOverlayVisible, cartItems } from '$lib/stores/cart';
	import { fly } from 'svelte/transition';
	import { base, resolve } from '$app/paths';

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

	//calculate total price whenever cart items change
	$: totalPrice = $cartItems.reduce((total, item) => {
		const quantity = item.quantity || 1; //default to 1 if quantity is not defined
		const itemTotal = item.price * quantity; //calculate total for item
		return total + itemTotal; //add to running total
	}, 0);
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
		<div class="cart-header">
			<h3>Your Cart</h3>
			<a href={resolve("/cart")} class="info-icon" aria-label="Info">
				<img src="{base}/icons/icons8-information-64 (1).svg" alt="Information" width="20" height="20" />
			</a>
		</div>
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
		<div class="cart-actions">
			<button class="close-btn" on:click={closeOverlay}>Continue Shopping</button>
			<button class="checkout-btn">
				Checkout - ${totalPrice}
			</button>
		</div>
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
		background: var(--color-black);
		color: var(--color-white);
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
		background: var(--color-black);
		color: var(--color-white);
		border-radius: 4px;
		cursor: pointer;
	}

	.quantity-controls span {
		min-width: 20px;
		text-align: center;
		font-weight: bold;
	}

	.cart-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.info-icon img {
		width: 22px;
		height: 22px;
		cursor: pointer;
		opacity: 0.7;
		transition: opacity 0.2s ease;
	}

	.info-icon img:hover {
		opacity: 1;
	}

	.cart-actions {
		margin-top: auto;
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		padding-top: var(--space-md);
		border-top: 1px solid var(--color-divider);
	}

	.close-btn {
		padding: var(--space-sm);
		border: 1px solid var(--text-primary);
		background: var(--color-surface);
		color: var(--text-primary);
		border-radius: var(--card-radius);
		cursor: pointer;
		transition: 0.2s ease;
	}

	.close-btn:hover {
		background: var(--color-surface-hover);
	}

	.checkout-btn {
		padding: var(--space-sm);
		background: var(--text-primary);
		color: var(--color-white);
		border: none;
		border-radius: var(--card-radius);
		cursor: pointer;
	}

	.checkout-btn:hover {
		background: #3a1441;
	}
</style>
