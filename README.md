# Immaculata Library

*Custom TypeScript SSG*

(The code that creates https://www.immaculatalibrary.com/)
---

### Goals

* Be the simplest and fastest SSG that I could make.
* Be fun to use, not difficult or frustrating.
* Be able to innovate right when ideas come up.

### Run locally

1. `npm install`
2. Open in VS Code
3. F5 (run in debugger)
4. Open http://localhost:8080/

### Features

1. Use efficient file hot-reloading
2. Use TypeScript for everything
3. Use full power of VS Code
4. Use JSX for all views/templating
5. Use JSX directly without framework
6. Use no magic except custom JSX
7. Use `import` to read data files

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
