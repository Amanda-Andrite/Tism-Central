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