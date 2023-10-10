This is the source to my hobby website, immaculatalibrary.com.


### Using it as your own JSX-based SSG

1. Clone the repo
2. Run `npm i`
3. Open it in VS Code
4. Press F5
5. Open localhost:8080
6. Make changes in anything under `site/`
7. Refresh browser

Replace everything in `site/` to make it your own site.


### How does it work?

* The core app is <400 loc of TypeScript under `src/`.

* It uses chokidar to read files under `site/`, sucrase to compile
  all TypeScript & JSX to JavaScript, and `vm.compileFunction` to
  turn them into modules, which can then be run.

* The file `site/core/main.ts` returns a map of routes to buffers.
  During dev time, this is served as HTTP from memory. At build time
  (like in GH Actions), files are generated from the map.

* Everything is done as efficiently as possible. This is because
  my own site has 1300+ markdown files to generate routes from,
  and I wanted to get it under 1s. Currently, changing any file
  under `site/` triggers a route reload that takes ~0.2s to ~0.7s.

* Just read the source. It's really, really small and straightforward.


### Example of a view

Taken from `404.html.tsx`:

```typescript
import * as Common from "./components/common";

export default <>
  <Common.TypicalPage image='/img/page/404.jpg'>

    <Common.Column spaced>
      <Common.Typography>

        <h1>Page not found</h1>
        <p>Sorry, couldn't find the page you're looking for.</p>

      </Common.Typography>
    </Common.Column>

  </Common.TypicalPage>
</>;
```


### Why isn't this a library?

Currently it's a JSX-based SSG. I extracted it into a lib a few days ago,
but it went out of date so quickly that I made that repo private, since
nobody knew about, and this repo was making progress so fast that it would
have only slowed me down to backport changes and update documentation.
But this morning I think I finally completed all the changes I wanted to.
If there's any interest in making it a lib, I'd be glad to do so.
