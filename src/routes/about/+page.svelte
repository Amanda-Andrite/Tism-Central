<script>
	let showMore = false; //state to track if read more is clicked
	function toggleText() {
		//keeps track if user has clicked read more
		showMore = !showMore;
	} //invert
</script>

<section class="contact-container">
	<div class="group-image">
		<!--group image of the team -->
		<div class="image-placeholder"></div>
	</div>

	<div class="content">
		<!--area of text/info -->
		<h1>ABOUT US</h1>
		<div class="text-content">
			<p>Text 1</p>
			{#if showMore}<!-- only shows if read more -->
				<p>Text 2</p>
			{/if}<!--end -->
		</div>
		<button class="read-more" on:click={toggleText}
			><!-- button for extra info -->
			{showMore ? 'Read Less' : 'Read More'}<!--change text-->
		</button>
	</div>
</section>

<style>
	.contact-container {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 80px;
		padding: 60px 20px;
		flex-wrap: wrap;
	}

	.group-image {
		background: #acacac;
		padding: 20px;
		border-radius: 12px;
		text-align: center;
		width: 260px;
	}

	.image-placeholder {
		width: 100%;
		height: 260px;
		background: #ebeaea;
		border-radius: 10px;
		position: relative;
	}

	.content {
		max-width: 500px;
	}

	.content h1 {
		font-size: 32px;
		font-weight: bold;
		margin-bottom: 20px;
	}

	.read-more {
		margin-top: 20px;
		padding: 10px 25px;
		border: none;
		border-radius: 10px;
		background: #bfbfbf;
		cursor: pointer;
		font-size: 14px;
	}

	.read-more:hover {
		background: #a6a3a3;
	}

	@media (max-width: 768px) {
		.contact-container {
			flex-direction: column;
			text-align: center;
		}

		.content {
			align-items: center;
		}
	}
</style>
