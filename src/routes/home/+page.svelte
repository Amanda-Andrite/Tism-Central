<script>
	import { wishlist } from '$lib/stores/wishlist';
	import { notification, showNotification } from '$lib/stores/notification';

	//Function to toggle wishlist items and show notifications
	function toggleWishlist(id) {
		wishlist.update((items) => {
			if (items.includes(id)) {
				showNotification('Removed from wishlist');
				return items.filter((i) => i !== id); //remove item if already in wishlist
			} else {
				showNotification('Added to wishlist');
				return [...items, id]; //add item to wishlist if not already there
			}
		});
	}

	//keeping content looped.
	let artistImages = [
		{ id: 1, name: 'Izzy' },
		{ id: 2, name: 'Amanda' },
		{ id: 3, name: 'Cillian' },
		{ id: 4, name: 'Martin' }
	];

	let products = [
		{ id: 1, name: 'Izzys1', price: 25, category: 'Print', artist: 1 },
		{ id: 2, name: 'Amanda1', price: 5, category: 'Sticker', artist: 2 },
		{ id: 3, name: 'Izzys2', price: 30, category: 'Print', artist: 1 },
		{ id: 4, name: 'Cillian1', price: 3, category: 'Sticker', artist: 3 },
		{ id: 5, name: 'Martin1', price: 40, category: 'Print', artist: 4 },
		{ id: 6, name: 'Izzys3', price: 6, category: 'Sticker', artist: 1 }
	];

	//Filters
	let selectedCategory = null; //type of product (e.g. sticker, print)
	let selectedArtist = null; // type of artist id or null
	let sortOrder = ''; //sorting prices
	let search = ''; //search bar logic

	//Reactive statement to filter and sort products based on selected filters above
	$: filteredProducts = products
		.filter((p) => !selectedCategory || p.category === selectedCategory) //filter by category
		.filter((p) => !selectedArtist || p.artist === selectedArtist) //filter by artist
		.filter((p) => !search || p.name.toLowerCase().includes(search.toLowerCase())) //filter by search
		//sort by price display
		.sort((a, b) => {
			if (sortOrder === 'lowToHigh') return a.price - b.price;//low to high
			if (sortOrder === 'highToLow') return b.price - a.price;//high to low
			return 0;
		});
</script>

{#if $notification}
	<div class="notification show">
		{$notification}
	</div>
{/if}

<div class="container">
	<div class="search-container">
		<div class="search-bar">
			<input
				type="text"
				placeholder="Search products..."
				bind:value={search}
				class="search-input"
			/>

			<!--Dropdown foe categories -->
			<select bind:value={selectedCategory} class="category-select">
				<option value={null}>All Categories</option>
				<option value="Sticker">Sticker</option>
				<option value="Print">Print</option>
			</select>
		</div>
	</div>

	<div class="artists-row">
		<!-- Loop through artists and clickable -->
		{#each artistImages as artist}
			<div
				class="card artist-card"
				role="button"
				tabindex="0"
				on:click={() => {
					if (selectedArtist === artist.id) {
						selectedArtist = null;
					} else {
						selectedArtist = artist.id;
					}
				}}
				on:keydown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						if (selectedArtist === artist.id) {
							selectedArtist = null;
						} else {
							selectedArtist = artist.id;
						}

						e.preventDefault();
					}
				}}
				class:selected={selectedArtist === artist.id}
			>
				<div class="image-box"></div>
				<div class="artist-name">
					{artist.name}
				</div>
			</div>
		{/each}
	</div>

	<div class="divider"></div>

	<div class="header-box">
		<div class="section-header">
			<div class="section-title">
				{#if selectedArtist}
					<!-- display selected artist name or 'All' if not selected -->
					Art by {artistImages.find((a) => a.id === selectedArtist)?.name}
				{:else}
					Art by All
				{/if}
			</div>

			<!-- Dropdown for sorting options -->
			<select bind:value={sortOrder} class="sort-select">
				<option value="">Sort By</option>
				<option value="lowToHigh">Price: Low → High</option>
				<option value="highToLow">Price: High → Low</option>
			</select>
		</div>
	</div>

	<div class="gallery-grid">
		{#each filteredProducts as item}
			<div class="card">
				<!-- Wishlist button to toggle item in wishlist and show notification -->
				<button class="wishlist-btn" on:click={() => toggleWishlist(item.id)}>
					<!-- Show filled heart if in wishlist, otherwise show empty heart -->
					{$wishlist.includes(item.id) ? '💖' : '🩶'}
				</button>

				<div class="image-box"></div>
				<!-- placeholder for product image -->
				<div class="name">{item.name}</div>
				<div class="price">${item.price}</div>
				<!-- name and price -->
			</div>
		{/each}
	</div>
	<!--Show message if no products match filters -->
	{#if filteredProducts.length === 0}
		<div class="no-results">No products found. Try changing your filters.</div>
	{/if}
</div>

<style>
	.search-container {
		position: sticky;
		top: 0px;
		z-index: 100;
		background: var(--color-white);
		padding: 10px 0;
		height: 70px;
		align-items: center;
	}

	.search-bar {
		position: sticky; /* keeps it visible while scrolling */
		top: 40px;
		z-index: 100;
		width: 100%;
		max-width: 600px;
		height: 30px;
		margin: 0 auto;
		display: flex;
		background: var(--searchbar-background);
		align-items: center;
		padding: 10px;
		gap: 10px;
	}

	.search-input {
		flex: 1;
		padding: 8px;
		border: none;
		outline: none;
		background: transparent;
		font-size: var(--font-sm);
	}

	.category-select {
		padding: 4px 8px;
		border: none;
		font-size: var(--font-sm);
	}

	.artists-row {
		/*Artists individual art display*/
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--gap-lg);
		justify-items: center;
	}

	.artist-card {
		padding: var(--space-sm);
		background: var(--card-background);
		text-align: center;
		cursor: pointer;
		border-radius: var(--radius-md);
	}

	.artist-card .image-box {
		width: 100%;
		aspect-ratio: 1 / 1;
		background: var(--card-placeholder);
		border-radius: var(--radius-md);
		margin-bottom: 10px;
	}

	/*highlight selected artist*/
	.artist-card.selected {
		background: var(--divider-color);
		color: var(--color-white);
	}

	.divider {
		height: 20px;
		background: var(--divider-color);
		margin: 40px 0;
	}

	.header-box {
		width: 100%;
		max-width: 700px;
		margin: 0 auto 20px auto;
		background: var(--searchbar-background);
		padding: var(--space-sm) var(--space-md);
	}

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.section-title {
		background: var(--searchbar-background);
		padding: var(--space-sm) var(--space-md);
		font-size: var(--font-sm);
	}

	/*Products display along the bottom*/
	.gallery-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--gap-lg);
		justify-items: center;
	}

	.card {
		position: relative;
		background: var(--card-background);
		padding: var(--card-padding);
		border-radius: var(--card-radius);
		width: 100%;
		max-width: 260px;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: flex-start;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	.card:hover {
		transform: scale(1.03);
		box-shadow: 0 4px 12px var(--color-shadow);
	}

	.image-box {
		width: 100%;
		aspect-ratio: 1 / 1;
		background: var(--card-placeholder);
		border-radius: var(--radius-md);
		margin-bottom: 10px;
	}

	.name {
		font-weight: bold;
		margin-top: 8px;
		text-align: center;
	}

	.price {
		text-align: center;
		margin-top: 4px;
		font-size: var(--font-sm);
	}

	.sort-select {
		padding: 5px 10px;
		font-size: var(--font-sm);
	}

	.wishlist-btn {
		position: absolute;
		top: 10px;
		right: 10px;
		width: 32px;
		height: 32px;
		border-radius: var(--radius-md);
		border: none;
		background: var(--color-white);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 16px;
		box-shadow: 0 2px 6px var(--color-shadow);
		transition:
			transform 0.2s ease,
			background-color 0.2s ease;
	}
	.wishlist-btn:hover {
		transform: scale(1.1);
		background: var(--color-hover-light);
	}

	.notification {
		position: fixed;
		bottom: 20px;
		left: 50%;
		transform: translateX(-50%);
		background: var(--color-black);
		color: var(--color-white);
		padding: 10px 20px;
		border-radius: var(--radius-md);
		font-size: var(--font-sm);
		z-index: 1000;
		opacity: 0;
		transition: opacity 0.5s ease;
	}

	/* Show notification */
	.notification.show {
		opacity: 1;
	}

	.no-results {
		text-align: center;
		margin-top: 40px;
		font-size: var(--font-base);
		color: var(--text-secondary);
	}

	@media (max-width: 770px) {
		.artists-row {
			grid-template-columns: repeat(2, 1fr);
		}
		.gallery-grid {
			grid-template-columns: repeat(2, 1fr);
		}
		.container {
			text-align: center;
		}
	}

	@media (max-width: 500px) {
		.gallery-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.artists-row {
			grid-template-columns: repeat(2, 1fr);
		}

		.section-header {
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			gap: 10px;
			flex-wrap: wrap;
		}

		.search-bar {
			position: relative;
			top: 0;
			max-width: 100%;
			justify-content: center;
		}

		.name {
			font-size: 13px;
			margin-top: 6px;
		}

		.price {
			text-align: center;
			font-size: 12px;
			margin-top: 4px;
		}

		.artist-name {
			font-size: 13px;
		}

		.card {
			padding: 10px;
		}

		.image-box {
			margin-bottom: 6px;
		}
	}
</style>
