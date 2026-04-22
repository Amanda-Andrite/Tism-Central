<section class="about-container">
	<div class="group-image">
		<!--group image of the team -->
		<div class="image-placeholder"></div>
	</div>

	<div class="content">
		<!--area of text/info -->
		<h1>ABOUT US</h1>
		<div class="text-content">
			<p>
				We are a group of four college students, each bringing our own unique artistic style and
				perspective to the table. From experimenting with different mediums to exploring creative
				expression in our own ways, we share a passion for art in all its forms. Our goal is to
				showcase our work, connect with others, and share our creativity with the public.
			</p>
			<p>
				Through this, we hope to inspire others, grow as artists, and build a space where different
				ideas and styles can come together. Whether it's bold, abstract pieces or more detailed and
				traditional work, we believe every form of art has its own story worth sharing.
			</p>
		</div>
	</div>
</section>

<style>
	.about-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 60px;
		padding: 60px 20px;
		align-items: center;
		margin: 0 auto;
	}

	.group-image {
		background: #acacac;
		padding: 20px;
		border-radius: 12px;
		width: 100%;
		max-width: 300px;
		justify-self: center;
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

	@media (max-width: 768px) {
		.about-container {
			grid-template-columns: 1fr;
			text-align: center;
		}

		.content {
			align-items: center;
			margin: 0 auto;
		}
	}
</style>
