<script>
	import { base } from '$app/paths';
</script>

<footer class="footer">
	<p>Inspire Co. 2026</p>
	<!-- Copyright Notice -->
	<a href="{base}/cart" class="info-link">Shipping & Info</a>
</footer>

<style>
	.footer {
		width: 100%; /*full width of bottom on page */
		padding: var(--space-md);
		text-align: center;
		font-family: var(--font-body);
		font-size: var(--font-sm);
		color: var(--link-color);
		background-color: var(--color-surface);
		border-top: 1px solid rgb(220, 220, 207);
	}

	.info-link {
		color: whitesmoke;
		padding: 6px 12px;
		border-radius: var(--radius-sm);
	}

	.info-link:hover {
		color: var(--color-accent);
	}

	/* Responsive to smaller screens */
	@media (max-width: 768px) {
		.footer {
			padding: var(--space-sm);
			font-size: 12px;
		}
	}
</style>
