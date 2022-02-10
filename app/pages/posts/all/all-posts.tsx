import { Container } from "../../../components/container/container";
import { HeroImage } from '../../../components/hero-image/hero-image';
import { QuickLinks } from '../../../components/quicklinks';
import { Head, Html, SiteFooter, SiteHeader } from '../../../components/site';
import { addRouteable, Routeable } from '../../../core/router';
import { allPosts } from "../../../model/models";
import { excerpt, format_date, md, reading_mins } from '../../../util/helpers';
import { renderElement } from "../../../util/jsx";
import { staticRouteFor } from "../../../util/static";
import cssFile from './posts.css';

export const allPostsPage: Routeable = {
  route: `/posts.html`,
  method: 'GET',
  handle: (input) => {
    const title = 'All Blog Posts';
    const image = staticRouteFor(__dir.filesByName['posts.jpg']!);
    return {
      body: renderElement(<>
        <Html>
          <Head title={title}>
            <link rel="stylesheet" href={staticRouteFor(cssFile)} />
          </Head>
          <body>
            <SiteHeader />
            <main>
              <HeroImage image={image} />
              <Container spaced>

                <h1>{title}</h1>

                <ul class="all-blog-posts">
                  {allPosts.map(post => <>
                    <li class="post-row">
                      <a href={post.view.route}>
                        <img class="image" src={post.imageSmall} />
                      </a>
                      <div>
                        <a class="title" href={post.view.route}>
                          {post.title}
                        </a>
                        <span class="date">
                          {format_date(post.date)} &bull; {reading_mins(post.markdownContent)} min
                        </span>
                        <div class="excerpt">
                          {md.render(excerpt(post.markdownContent))}
                        </div>
                      </div>
                    </li>
                  </>)}
                </ul>

              </Container>
            </main>
            <QuickLinks />
            <SiteFooter input={input} />
          </body>
        </Html>
      </>)
    };
  },
};

addRouteable(allPostsPage);
