<script>
	//keeping content looped.
	let artistImages = [1, 2, 3, 4];
	let products = [1, 2, 3, 4, 5, 6];
</script>

<div class="container">
	<div class="search-bar"></div>
	<div class="artists-row">
		{#each artistImages as item}
			<div class="card" style="width: 85%;"></div>
		{/each}
	</div>
	<div class="divider"></div>

	<div class="gallery-grid">
		{#each products as item}
			<div class="card"></div>
		{/each}
	</div>
</div>

<style>
	.search-bar {
		width: 100%;
		max-width: 600px;
		height: 30px;
		background: var(--searchbar-background);
		margin: 0 auto 40px auto;
		position: relative;
	}

	.search-bar::after {
		/*Where user will be able to categorise */
		content: '';
		position: absolute;
		right: 0;
		width: 25%;
		height: 100%;
		background: var(--searchbar-accent);
	}

	.artists-row {
		/*Artists individual art display*/
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--gap-lg);
		justify-items: center;
	}

	.divider {
		height: 20px;
		background: var(--divider-color);
		margin: 40px 0;
	}

	/*Products display along the bottom*/
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
		align-items: center;
		justify-content: center;
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
</style>
