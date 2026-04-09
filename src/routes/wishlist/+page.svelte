<script lang="ts">
	import { wishlist } from '$lib/stores/wishlist';

	let products = [
		{ id: 1, name: 'Izzys1', price: 25 },
		{ id: 2, name: 'Amanda1', price: 5 },
		{ id: 3, name: 'Izzys2', price: 30 },
		{ id: 4, name: 'Cillian1', price: 3 },
		{ id: 5, name: 'Martin1', price: 40 },
		{ id: 6, name: 'Izzys3', price: 6 }
	];
	$: wishlistItems = products.filter((p) => $wishlist.includes(p.id));
</script>

<div class="container">
	<h2>Your Wishlist</h2>
	<div class="gallery-grid">
		{#each wishlistItems as item}
			<div class="card">
				<div class="image-box"></div>
				<div class="text-group">
					<div class="name">{item.name}</div>
					<div class="price">${item.price}</div>
				</div>
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
		grid-template-columns: repeat(3, 1fr);
		gap: var(--gap-lg);
		justify-items: center;
	}

	.card {
		background: var(--card-background);
		padding: var(--card-padding);
		border-radius: var(--card-radius);
		width: 100%;
		max-width: 260px;
		aspect-ratio: 3 / 4;
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
