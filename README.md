This is the source to my hobby website, immaculatalibrary.com.


### What is it?

What I always wanted Jekyll to be:

* **Fast**: Processing 1.3k+ markdown files and generating 3k+ routes takes <1s on initial load and <.5 on reloads
* **Simple**: No special template language, just TypeScript views where JSX renders to strings but allows composition
* **Small**: The core logic is ~365 lines of straightforward TypeScript under src/ split into 8 really small files
* **Unmagical**: There are no hard-coded rules about generating or loading anything; it's all done in app/main.ts
* **Components**: Self-contained, reusable view code including style/script/image resources, in their own folders


### Why a new SSG?

I wanted to write my static site with the concept of JSX-based components, but without any client-side logic.
Other solutions are extremely over-engineered. If they use JSX, they end up requiring React on the back-end.
If they don't use JSX, they're usually reinventing the wheel with over-engineered template languages.


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

Taken from `site/about.html.tsx`:

```typescript
import { Column } from './components/column/column';
import { TypicalPage } from './components/page';
import { Typography } from './components/typography';
import image from './img/page/home.jpg';

const sourceLink = "https://github.com/sdegutis/immaculatalibrary.com";

export default <>
  <TypicalPage image={image.path}>

    <Column spaced centered>
      <Typography>

        <h1>About Immaculata Library</h1>

        <p>The website Immaculata Library began as a quick place
          to store digital copies of invaluable and timeless
          Catholic books that have become copyright free,
          in order to easily share them with friends and family.</p>

        <p>Over time, it has grown to be a full online library,
          with links to free and paid Sacred music, links and
          reviews of Catholic movies, and links to other resources
          to help Catholics grow in devotion in this digital age.</p>

        <p>Only the most useful and approved of all Catholic books
          are selected for this website. This means, only books that
          have received official approbations from Bishops, <em>and</em> have
          helped to produce Saints, or are written by Saints, are offered.</p>

        <p>The <a href={sourceLink}>source code</a> for this site has also served
          as a perpetual pet project for me for the past few years, allowing me
          to keep my software development skills fresh and keep alive my passion
          for solving complex problems.</p>

      </Typography>
    </Column>

  </TypicalPage>
</>;
```


### Why isn't this a library?

Currently it's a JSX-based SSG. I extracted it into a lib a few days ago,
but it went out of date so quickly that I made that repo private, since
nobody knew about, and this repo was making progress so fast that it would
have only slowed me down to backport changes and update documentation.
But this morning I think I finally completed all the changes I wanted to.
If there's any interest in making it a lib, I'd be glad to do so.
