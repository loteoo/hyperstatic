# This site is fast

It was built using an experimental code splitting and navigation layer on top of **Hyperapp 2.0**, then pre-rendered using a pupeteer script.

This *layer* is a site generator / framework with goals similar to Gatsby.js, but it is simpler, lighter and is for building Hyperapp based websites.

It is meant to be deployed on static hosting services like Netlify or Github Pages, which are often free, efficient, highly scalable and a lot more.

Pages are bundled individually and loaded asynchronously at the right time using a very smart `<Link>` component. They all still share the same global state and run in the same Hyperapp instance.




## Routing

To route your app, list all your route patterns in a `routes.js` file, and map these routes to your page components using parcel's `import` function.

This is the routing for this site:

```
export default {
  '/': import('./pages/Home'),
  '/project': import('./pages/Project'),
  '/starter': import('./pages/Starter'),
  '/counter': import('./pages/Counter'),
  '/pokemons': import('./pages/Pokemons'),
}
```

The `import(...)` function indicates parcel to bundle each page in it's own bundle. These bundles will be loaded asynchronously during your application's runtime.




## Navigation

The `<Link>` component works just like your typical Hyperapp / React / Gatsby `<Link>` component. Use use them like this:

`<Link to="/my-awesome-page>My awesome page!</Link>`  
or  
`<Link to="/products/some-slug/7839>My awesome product by ID!</Link>`  

**Except they do more stuff under the hood.**

Here is what is going on in the background.

Each link is aware of the page bundle it points to. Links have 4 statuses: 

- **Invalid route**:
  The link has no matching route. The link knows it will 404. The link will still work, but will not be doing anything in the background.
- **Iddle**:
  The link is valid and waits to enter the viewport or to be hovered on.
- **Loading**:
  The page bundle matching the link is being downloaded. This was triggered because this link, or another link pointing to the same bundle has entered the viewport, been hovered on or has been clicked.
- **Loaded**:
  The matching route is ready to be viewed
- **Active**:
  The route has been activated, the matching page is being viewed.

For this technical demo, the statuses for each link is being shown with an icon, but usually, this would all be transparent to the user.





## Pages 
Pages are Hyperapp components (view functions) that receive the state.

They are bundled in their own file using parcel's [dynamic imports](https://parceljs.org/code_splitting.html). 

The bundles are loaded in the background when links pointing to them enter the viewport, or when a user hovers on their corresponding links.


If they need dynamic runtime data, they get it from the state as usual.

Pages can export a `Init` Hyperapp Action which gets triggered when the page's bundle has been downloaded. Not to confuse with an `OnNavigation` action which would be triggered when a page apprears on screen.

This `Init` Action can be used to setup the state in advance for the page or load data ahead of time via side-effects.





## Pre-rendering 

Pre-rendering the site is actually optionnal. The entire site will still work perfectly without it, but doing it still has some nice benefits. 

Even if Hyperapp's tiny size and quick rendering brings your TTI to a negligable number, there will always be users with slow network connections and low-end devices who will benefit from this. 

This also allows your site to be indexed faster by search engines.

To render your routes, run this command:

```
npm run render-pages
```

If you have dynamic routes that you want to render, you need to give an array of all these URLs to the generator.

You can do this dynamically by adding javascript to the `createPages.js` file.

All pages for this demo site has been pre-rendered. Try disabling javascript in your browser, everything should still mostly work!
