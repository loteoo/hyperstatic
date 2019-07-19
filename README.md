# Hyperstatic

Hyperstatic is a Hyperapp based static site generator with a code-splitting and navigation layer. It's goal is to be a simpler, lighter and faster GatsbyJS, that uses Hyperapp instead of React.

It's codebase also has an inherently smaller footprint by using Puppeteer for pre-rendering and Parcel for code-splitting.

See the demo site here: https://hyperstatic-demo.netlify.com/



# Starter template 🚀

To easiest way to get started is to use this [starter template](https://github.com/loteoo/hyperstatic-starter).

---  

#### Installation in an existing Hyperapp 2.0 project:  

1. `npm i hyperstatic`

2. Create a `routes.js` file with your routes in it.   
[Example](https://github.com/loteoo/hyperstatic-starter/blob/master/src/app/routes.js)



3. Replace hyperapp's `app` call with `hyperstatic`. Add the extra `routes` attribute that is needed.   
[Example](https://github.com/loteoo/hyperstatic-starter/blob/master/src/app.js#L18)  



4. Link to your pages using the `<Link>` component.   
[Example](https://github.com/loteoo/hyperstatic-starter/blob/master/src/app/view.jsx#L7)

5. (Optional) For pre-rendering, create a `render-pages.js`, list your URLs and call `renderPages` with them.   
[Example](https://github.com/loteoo/hyperstatic-starter/blob/master/render-pages.js)

Then add this helper command in your package.json scripts:  

```
"scripts": {
  "render-pages": "npm run build && node ./render-pages.js"
}
```


#### That should be it!
