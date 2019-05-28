<p align="center">
  <a href="https://github.com/jorgebucaran/hyperapp">
    <img alt="Hyperapp non-official logo" src="https://raw.githubusercontent.com/loteoo/hyperapp-boilerplate/master/src/assets/icon-180x180.png" width="80" />
  </a>
</p>
<h1 align="center">
  Hyperapp 2.0 boilerplate
</h1>

Ready-to-go Hyperapp PWA/SPA starter template  


## 🚀 Quick start: 
```
# Clone project
git clone https://github.com/loteoo/hyperapp-boilerplate.git

cd hyperapp-boilerplate

npm install     # Install dependencies
npm start       # Dev server + live reload
```

```
npm run build   # Build for production and generate service worker
```
Or use a [.zip download](https://github.com/loteoo/hyperapp-boilerplate/archive/master.zip)

 
## Overview
- Uses [Parcel](https://parceljs.org/) for compilation, dev server and hot module reloading.  (It's  blazing fast, easy to use and reliable)
- [Hygen](https://www.hygen.io/) code generators are included for common use cases. (More to come!)  
- Works offline out of the box using [workbox](https://developers.google.com/web/tools/workbox/) to generate service workers and precache application files
- PWA/SPA ready with a default web app manifest
- Sane CSS defaults and reset with [sanitize.css](https://csstools.github.io/sanitize.css/)
- Uses the [standard](https://standardjs.com/) JavaScript style guide  
- [JSX](https://reactjs.org/docs/introducing-jsx.html) and the latest ES6-7-8-9 syntax is ready to use thanks to Parcel  


## File structure
Proposed folder structure as your project grows. Adapt it to your needs.  

```
├── _templates/                       # Hygen code generators
├── dist/                             # Compiled static files (parcel output)
├── src/                              # Application source code
│   ├── app/                          # App files
│   │   ├── pages/                    # Pages are top level components, triggered by a router
│   │   ├── theme/                    # Small, utility components, ex: text input, modal container, etc.
│   │   ├── components/               # Application components
│   │   │   ├── {ComponentName}/      # Advanced component with multiple files
│   │   │   │   ├── actions.js        # Local actions
│   │   │   │   ├── index.jsx         # Exported view
│   │   │   │   ├── init.js           # Initial local state
│   │   │   │   ├── style.css         # Component styles
│   │   │   │   └── other.svg         # Other related files (which are only used by the component)
│   │   │   └── {ComponentName}.jsx   # Simple file component
│   │   ├── actions.js                # Global actions
│   │   ├── init.js                   # Initial app state
│   │   ├── utils.js                  # Misc utility functions
│   │   └── view.jsx                  # Root view
│   ├── assets/                       # Global application assets (favicon, fonts...)
│   ├── app.js                        # Hyperapp instantiation
│   ├── global.css                    # Global styles
│   ├── index.html                    # Parcel entry & html frame
│   └── manifest.webmanifest          # Web app manifest
├── ...
...
```




## Code generators
(TODO: use enquirer to ask questions and generate the corresponding component)
Generate new Hyperapp components like this:
```
hygen component new --name 'component name'
hygen page new --name 'page name'
```
Available generators are located in the _templates folder. Feel free to add some more or change the existing ones!

 
http://www.hygen.io/





### Hyperapp 2.0 TLDR:

- **State**: Runtime data of your app, usually a javascript object.  
- **View**: Pure function that maps the State of your app to a DOM representation of the app (called virtual DOM). The vDOM will get rendered efficiently to the browser by hyperapp.  
- **Actions**: Pure functions that receives the current State, some params, and returns the next State.  
- **Subscribtions**: Declarative wrappers around event listeners. They are aware of the State and can dispatch Actions.  
- **Effects**: Declarative wrappers around side effects to interact with the outside world.  

Basically, use functional programming to describe an application and let Hyperapp bring it to life!  

Read the official documentation here:  
https://github.com/jorgebucaran/hyperapp/




### To-do list demo app:
Basic CRUD actions with hyperapp 2.0  
https://github.com/loteoo/hyperapp-todolist


Pull requests are welcome!

### FAQ:

> Why so many commits?  

The boilerplate has evolved and changed a lot over time.


---  


https://github.com/loteoo/hyperapp-boilerplate

