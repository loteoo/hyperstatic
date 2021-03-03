<div align="center">
  <h1>Hyperstatic</h1>
  <p>Hyperapp based static site generator</p>
</div>

Hyperstatic is a thin code-splitting and navigation layer on top of hyperapp that creates fast and SEO friendly static sites. It's goal is to be a simpler, lighter and faster GatsbyJS, that uses Hyperapp instead of React.

It's codebase also has an inherently smaller footprint by using Puppeteer for pre-rendering and [dynamic imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports) for code-splitting.

See the demo site here: https://hyperstatic.dev/


# Starter template 🚀

To easiest way to get started is to use this [starter template](https://github.com/loteoo/hyperstatic-starter).

---  

#### Installation in an existing Hyperapp project:  

1. `npm i hyperstatic`

2. Create a `routes` object with your routes patterns in it.   
[Example](https://github.com/loteoo/hyperstatic-starter/blob/master/src/main.tsx#L8-L15)



3. Replace hyperapp's `app` call with `hyperstatic`. Add the extra `routes` attribute that is needed.   
[Example](https://github.com/loteoo/hyperstatic-starter/blob/master/src/main.tsx#L24)  



4. Link to your pages using the `<Link>` component.   
[Example](https://github.com/loteoo/hyperstatic-starter/blob/master/src/components/core/Header/index.tsx#L11)

5. For prerendering, add this helper command in your package.json scripts:  

```
"scripts": {
  "prerender": "npm run build && hyperstatic"
}
```

#### That should be it!

For more info, see https://hyperstatic.dev/

Pull requests are welcome! ❤
