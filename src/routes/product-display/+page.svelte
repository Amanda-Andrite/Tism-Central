<script>
    import { getProductById, products } from "$lib/stores/product";
    import { wishlist } from "$lib/stores/wishlist";
	import { cartOverlayVisible, cartItems } from '$lib/stores/cart';
    import { onMount } from "svelte";

    let product = null;
    let productId = null;
    let productName = "blank";
    let productPrice = 0;

    onMount(()=>{
        const id = localStorage.getItem('selectedProductId')
        product = getProductById(id);
        if(product) {
            productName = product.name;
            productPrice = product.price;
            productId = Number(product.id);
        }
    });

    function addToCart(product) {
		if(!product) return; //safety check

		cartItems.update(function(items){
			const existing = items.find(function(item) {
				return item.id === product.id;//check if product already in cart
			});

			
			if(existing) {
				return items.map(function(item) {
					if (item.id === product.id){
						return { ...item, quantity: item.quantity + 1 };//increment quantity if already in cart
					}
					return item;//otherwise return item unchanged
				});
			}
			return [...items, { ...product, quantity: 1 }];
		});

		cartOverlayVisible.set(true); //show cart overlay
	}

    function toggleWishlist(id) {
		wishlist.update((items) => {
            console.log("before:", items, "clicked:", id);
			if (items.includes(id)) {
				return items.filter((i) => i !== id); 
			} else {
				return [...items, id];
			}
		});
	}



</script>

<div class="product-display">
    <h1 class="product-name">{productName}</h1>
    <div class="product-top">
        <div class="image"></div>
        <h2 class="product-price">€{productPrice}</h2>
        <button type="button" class="wishlist-btn" on:click|stopPropagation={() => toggleWishlist(productId)} aria-label="Toggle wishlist">
					{$wishlist.includes(productId) ? 'remove from wishlist' : 'add to wishlist'}
		</button>
        <button class="add-cart-btn" on:click={() => addToCart(product)}>Add to Cart</button>
    </div>
    <div class="description">
        {#if product?.id === 1}
            <p>Details for Izzys1 </p>
        {:else if product?.id === 2}
            <p>Details for Amanda1</p>
        {:else if product?.id === 3}
            <p>Details for Izzys2</p>
        {:else if product?.id === 4}
            <p>Details for Cillian1</p>
        {:else if product?.id === 5}
            <p>Details for Martin1</p>
        {:else if product?.id === 6}
            <p>Details for Izzys3</p>
        {:else}
            <p>No product selected.</p>
        {/if}
    </div>
</div>

<style>
.product-display {
    display: flex;
    flex-direction: column;
    padding: 0 var(--space-sm) ;
}
.product-name{
    font-size: 2rem;
    margin-bottom: var(--card-padding);
    margin-left: 10px;
}
.product-top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    gap: var(--space-sm);
}
.description p {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    padding: var(--card-padding);
    background-color: var(--color-background);
    border: var(--card-background) solid 40px;
    border-radius: var(--card-radius);
}
.image {
  width: 100%;
  max-width: 31rem;        
  aspect-ratio: 1 / 1;   
  background-color: var(--color-background);
  border: 20px solid var(--card-background);
  border-radius: var(--card-radius);
}
.product-price {
    display: flex;
    align-self: flex-end;
    margin-left: auto;
    font-size:  var(--font-lg);
}
.add-cart-btn {
    display: flex;
    flex-direction: column;
    align-self: flex-end;
    padding: 20px 40px;
    border: none;
    border-radius: var(--radius-md);
    background-color: var(--divider-color);
    color: var(--color-background);
    cursor: pointer;
    font-size: var(--font-base);
    margin-right: var(--card-padding);
}
.add-cart-btn:hover {
    background-color: rgb(106, 106, 106);
}
.wishlist-btn {
    display: flex;
    flex-direction: column;
    align-self: flex-end;
    padding: 20px 40px;
    border: none;
    border-radius: var(--radius-md);
    background-color: var(--card-background);
    color: var(--color-black);
    cursor: pointer;
    font-size: var(--font-base);
    margin-right: var(--card-padding);
}
.wishlist-btn:hover {
    background-color: rgb(106, 106, 106);
}

@media (max-width: 768px) {
  .product-top {
    flex-direction: column;
    align-items: center;
  }

  .image {
    width: 100%;
    max-width: 90%;
  }


  .add-cart-btn {
    align-self: stretch;
    width: 100%;
    margin: 0;  
  }

}

</style>