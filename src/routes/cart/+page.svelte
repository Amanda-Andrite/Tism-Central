<section class="info-container">
	<h1>Shipping & Checkout Information</h1>

	<div class="info-grid">
		<div class="info-section">
			<h2>Shipping</h2>
			<p>We aim to dispatch all orders within 6 – 7 business days.</p>
			<p>
				The package will be delivered within the estimated time of arrival. However, the actual
				delivery date may be affected by flight arrangements, weather conditions and other external
				factors. Please refer to the tracking information for the most accurate delivery date.
			</p>
		</div>

		<div class="info-section">
			<h2>Returns</h2>
			<p>Items can be returned within 14 days of delivery.</p>
			<p>
				When a returned item arrives at our warehouse, we will inspect and/or test it. If the
				returned item is used or damaged, has missing parts or accessories, or is damaged due to
				improper use, the refund will be reduced to reflect the loss in value. If the returned item
				is entirely in a non-resalable condition, no refund will be issued.
			</p>
		</div>

		<div class="info-section">
			<h2>Payments</h2>
			<p>
				All prices include the applicable VAT and any other taxes (where applicable). All prices are
				exclusive of delivery charges. 
			</p>
		</div>

		<div class="info-section">
			<h2>Checkout</h2>
			<p>Add items to your cart, review them, and proceed to checkout.</p>
		</div>
	</div>
</section>

<style>
	.info-container {
		max-width: 1000px;
		margin: 0 auto;
		padding: var(--space-lg);
	}

	h1 {
		margin-bottom: var(--space-lg);
		font-size: var(--font-xl);
	}

	h2 {
		margin-bottom: var(--space-sm);
	}

	.info-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-lg);
	}

	.info-section {
		padding: var(--space-md);
		background: var(--card-background);
		border-radius: var(--card-radius);

		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	@media (max-width: 768px) {
		.info-grid {
			grid-template-columns: 1fr;
		}
	}
</style>