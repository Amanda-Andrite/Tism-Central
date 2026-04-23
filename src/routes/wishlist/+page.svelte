<script>
	import { wishlist } from '$lib/stores/wishlist';
	import { cartOverlayVisible, cartItems } from '$lib/stores/cart';
	import { goto } from '$app/navigation';

	//All produvt details
	let products = [
		{ id: 1, name: 'Izzys1', price: 25, size: 'A3', artists: 'Izzy' },
		{ id: 2, name: 'Amanda1', price: 5, size: 'A4', artists: 'Amanda' },
		{ id: 3, name: 'Izzys2', price: 30, size: 'A3', artists: 'Izzy' },
		{ id: 4, name: 'Cillian1', price: 3, size: 'A4', artists: 'Cillian' },
		{ id: 5, name: 'Martin1', price: 40, size: 'A3', artists: 'Martin' },
		{ id: 6, name: 'Izzys3', price: 6, size: 'A4', artists: 'Izzy' }
	];

	//reactive statement
	$: wishlistItems = products.filter((p) => $wishlist.includes(p.id)); //recalculate wishlist items whenever wishlist changes

	//Add to cart function
	function addToCart(product) {
		if(!product) return; //safety check

		cartItems.update(function(items){
			const existing = items.find(function(item) {
				return item.id === product.id;//check if product already in cart
			});

			//if product already in cart, increment quantity, otherwise add new product with quantity 1
			if(existing) {
				return items.map(function(item) {
					if (item.id === product.id){
						return { ...item, quantity: item.quantity + 1 };//increment quantity if already in cart
					}
					return item;//otherwise return item unchanged
				});
			}
			return [...items, { ...product, quantity: 1 }];//add new product to cart if not already in cart
		});

		cartOverlayVisible.set(true); //show cart overlay
	}
	function goToProduct(id) {
		localStorage.setItem('selectedProductId', id);
		goto(`/product-display`);
	}
</script>

<div class="container">
	<h2>Your Wishlist</h2>
	<div class="gallery-grid">
		{#each wishlistItems as item}
			<!--loop through wishlist items and display them-->
			<div class="card" role="button"
				tabindex="0" on:click={() => goToProduct(item.id)}
				on:keydown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						goToProduct(item.id);
						e.preventDefault();
					}
				}}>
				<div class="image-box"></div>
				<div class="text-group">
					<div class="name">{item.name}</div>
					<div class="price">${item.price}</div>
				</div>
				<!-- Add to cart button -->
				<button class="add-cart-btn" on:click={() => addToCart(item)}>Add to Cart</button>
			</div>
		{/each}
	</div>
</div>

<style>
	.container h2 {
		text-align: center;
		margin-bottom: 20px;
	}

	.gallery-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr); /*3 columns by default*/
		gap: var(--gap-lg);
		justify-items: center;
	}

	.card {
		background: var(--card-background);
		padding: var(--card-padding);
		border-radius: var(--card-radius);
		width: 100%;
		max-width: 260px;
		aspect-ratio: 3 / 4;  /*consistent aspect ratio for cards*/
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}
	.card:hover {
		transform: scale(1.03);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	}

	.image-box {
		width: 100%;
		height: 260px;
		background: var(--card-placeholder);
		border-radius: 10px;
	}

	.text-group {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		margin-top: 10px;
		padding: 0 10px;
		box-sizing: border-box;
	}

	.name {
		font-weight: bold;
		font-size: 16px;
	}

	.price {
		font-size: 14px;
		color: var(--text-color, #3b3a3a);
	}

	.add-cart-btn {
		width: calc(100% - 20px);
		margin: 10px;
		padding: 8px;
		background: black;
		color: white;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		font-size: 14px;
		transition:
			transform 0.2s ease,
			background 0.2s ease;
	}

	@media (max-width: 770px) {
		.gallery-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 500px) {
		.gallery-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
