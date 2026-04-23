export const products = [
		{ id: 1, name: 'Izzys1', price: 25, category: 'Print', artist: 1 },
		{ id: 2, name: 'Amanda1', price: 5, category: 'Sticker', artist: 2 },
		{ id: 3, name: 'Izzys2', price: 30, category: 'Print', artist: 1 },
		{ id: 4, name: 'Cillian1', price: 3, category: 'Sticker', artist: 3 },
		{ id: 5, name: 'Martin1', price: 40, category: 'Print', artist: 4 },
		{ id: 6, name: 'Izzys3', price: 6, category: 'Sticker', artist: 1 }
	];

export function getProductById(id) {
	return products.find(product => product.id === Number(id));
}