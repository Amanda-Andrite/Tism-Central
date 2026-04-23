# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.


Cillian Doyles (C00311110) Notes and Commitment to the project
    - designed, developed and implemented the entire account and product display pages
    - implemented the ability to save information when logged into an account to local storage
    - utilised the log in page developed by isabel to allow the user an easy accessible way to log in or sign up to their account if in guest mode
    - implemented a feature to prevent the user from inputting and saving details to local storage if in guest mode
    - made a product component to allow easy access, modification and addition to products for future use.
    - made the product page change based off of which is selected, reducing the needed pages from 1 per product to 1 for every product
    - implemented the navigtion feature in home and wishlist pages to get to the product display page
    - implemented the feature created by amanda to add items to the wishlist on the product display page and refactured the code to work with my own, saving time rather than designing a different system
    - implemented the add to cart feature created by martin to the product display page and again refactured the code to work with my own
    - made both web pages restructure themselves vertically when width is shrunk to a certain point   

Martin McCarthy's (C00312014) Notes and Commitment to the project
    -designed, developed and implemented the wishlist page, allowing users to save and view products using local storage
    -implemented functionality to add items to the wishlist from both the homepage and product display page
    -added a remove feature on the wishlist page to allow users to easily manage and delete saved items
    -designed and implemented a cart overlay that slides in from the right, displaying all selected cart items
    -implemented functionality within the cart overlay to increase and decrease product quantities
    -added navigation options within the cart overlay including “continue shopping” and “checkout” buttons
    -developed a static shipping and information page accessible from all pages via the footer
    -integrated an icon-based shortcut to the shipping and information page directly from the cart overlay

Amanda Andrites (C00309361) Notes and Commitment to the project
    -designed, developed, and implemented the global header and footer, ensuring they are accessible across all pages
    -initialised and configured navigation throughout the application
    -added and integrated icons within the header for improved usability and accessibility
    -designed and developed the homepage to display all products and their data
    -implemented filtering functionality on the homepage, allowing users to filter by category and artist
    -added a search bar to enable users to quickly find specific products
    -implemented sorting functionality to organise products by price (low to high and high to low)
    -integrated wishlist functionality on the homepage, allowing users to add and remove items directly
    -implemented user feedback through notifications when items are added to or removed from the wishlist
    -designed and developed a static “About Us” page using a grid layout
    -integrated and managed custom fonts and began establishing a consistent colour system across the application
    -configured and fixed linking issues using variables.css to ensure consistent styling across all pages