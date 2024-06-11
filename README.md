# Immaculata Library

### Run locally

1. `npm install`
2. Open in VS Code
3. F5 (run in debugger)
4. Open http://localhost:8080/

### Features

* Simple
* TypeScript
  * SSG-side and browser-side have same types
  * SSG-side and browser-side can share modules
* Builds entire site in ~900ms
  * Rebuilds most changes in ~90ms
* Custom JSX
  * Renders as strings in SSG (for SEO)
  * Renders as `document.createElement` in browser

### File structure

* [src/](src/): Custom runtime for hot-reloading, custom JSX, and importing data dirs.
* [site/](site/): The site itself
* [site/core/main.ts](site/core/main.ts): The entry point to the site, to build it yourself
* [site/core/jsx-transform-browser.ts](site/core/jsx-transform-browser.ts): Browser-side JSX implementation
* [site/core/jsx-transform-node.ts](site/core/jsx-transform-node.ts): SSG-side JSX implementation
