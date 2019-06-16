# This site is fast

## Very very fast

It's built using an experimental static site generator / layer on top of hyperapp.

It is meant to be deployed on static hosting services like Netlify or Github Pages, which are often free, efficient, highly scalable and a lot more.

The entire site is a single Hyperapp instance.

Every page is bundled in it's own file using parcel's [dynamic imports](https://parceljs.org/code_splitting.html). The bundles are loaded in the background when links pointing to them enter the viewport, or when users hover on the links.

In other words, pages are loaded smartly and asynchronously, but share the same global state and hyperapp instance.



# Pages 
Pages are hyperapp components (pure view functions) that receive the state.

If they need dynamic runtime data, they get it from the state as usual.

Pages can export a `onLoad` hyperapp Action which gets triggered when the page's bundle has been downloaded. Not to confuse with an `onCreate` action which would be triggered when a page apprears on screen.

This `onLoad` Action can be used to load data for the page and setup the state in advance for the page.



# Routing

To route your app, you list all your route patterns in a `routes.js` file, and map these routes to your page components.

This is the routing for this site:

```
export default {
  '/': import('./pages/Home'),
  '/project': import('./pages/Project'),
  '/architecture': import('./pages/Architecture'),
  '/hurdles': import('./pages/Hurdles'),
  '/rickandmorty': import('./pages/RickAndMorty'),
  '/pokemons': import('./pages/Pokemons'),
  '/pokemons/:id': import('./pages/Pokemon')
}
```

You need to use the `import(...)` statement for each route to indicate parcel to bundle the file in it's own bundle.

The routes are actually loaded into the state, which allows the application to be aware of the status of each route. This is also necessary for many of the `Link` component's functionnalities.


# Link

The `<Link></Link>` component works just like your traditionnal Hyperapp / React <Link> components. Use use them like this:

`<Link to="/my-awesome-page>My awesome page!</Link>`  
or  
`<Link to="/products/:category/:id>My awesome page!</Link>`  

Except they do more stuff under the hood.

Here is what is going on in the background.

Each link is aware of the page bundle it points to. Links have 4 statuses: 

- Invalid route
  This is if the link has no mathing pattern in the state. The link knows it will 404. The link will still work, but will not be loading anything in the background.
- Iddle
  The link is valid and waits to enter the viewport or to be hovered on.
- Loading
  The page bundle matching the link is being downloaded. This was triggered because the link has entered the viewport, been hovered on or has been clicked.
- Loaded
  The mathing route is ready to be viewed

For this technical demo, the statuses for each link is being shown with an icon, but usually, this would all be transparent to the user.


# State structure


# Rendering

Pre-rendering the site is actually optionnal.
