import { Container } from "../../../components/container/container";
import { SiteCommon } from '../../../components/site';
import { renderElement } from "../../../core/jsx";
import { addRouteable, Routeable } from '../../../core/router';
import { allPosts } from "../../../model/models";
import { calculateReadingMins, excerpt, formatDate, markdown } from '../../../util/helpers';
import { staticRouteFor } from "../../../util/static";
import cssFile from './posts.css';

export const allPostsPage: Routeable = {
  route: `/articles.html`,
  method: 'GET',
  handle: () => {
    const title = 'All Articles';
    const image = staticRouteFor(__dir.filesByName['posts.jpg']!);
    return {
      body: renderElement(<>
        <SiteCommon
          title={title}
          image={image}
        >
          <Container spaced>

            <link rel="stylesheet" href={staticRouteFor(cssFile)} />

            <h1>{title}</h1>

            <ul class="all-blog-posts">
              {allPosts.map(post => <>
                <li class="post-row">
                  {/* <a href={post.view.route}>
                    <img class="image" src={post.imageSmall} />
                  </a> */}
                  <div>
                    <a class="title" href={post.view.route}>
                      {post.title}
                    </a>
                    <span class="date">
                      {formatDate(post.date)} &bull; {calculateReadingMins(post.markdownContent)} min
                    </span>
                    <div class="excerpt">
                      {markdown.render(excerpt(post.markdownContent))}
                    </div>
                  </div>
                </li>
              </>)}
            </ul>

          </Container>
        </SiteCommon>
      </>)
    };
  },
};

addRouteable(allPostsPage);
