import { Container } from "../../components/container/container";
import { Content } from "../../components/content/content";
import { SiteCommon } from "../../components/site";
import { renderElement } from "../../core/jsx";
import { addRouteable, Routeable, RouteMethod } from "../../core/router";
import { Song } from "../../model/music/song";
import { staticRouteFor } from "../../util/static";
import { audioBibleImage } from "./music";
import { MusicSidebar } from "./music-sidebar";

export class ViewSong implements Routeable {

  route;

  constructor(public song: Song) {
    this.route = `/music/${this.song.slug}.html`;
    addRouteable(this);
  }

  method: RouteMethod = 'GET';
  handle: RouteHandler = (input) => {
    const embedUrl = this.song.youtube.replace('watch?v=', 'embed/').replace(/&t=(\d+)s/, '?start=$1');

    return {
      body: renderElement(<SiteCommon
        title={this.song.title}
        image={audioBibleImage}
        input={input}
      >
        <Container spaced split>
          <Content>
            <link rel="stylesheet" href={staticRouteFor(__dir.filesByName['view-song.css']!)} />
            <h1>{this.song.title}</h1>
            <div class="embed-container">
              <iframe allowfullscreen="allowfullscreen" frameborder="0" src={embedUrl}></iframe>
            </div>
            {this.song.html}
          </Content>
          <MusicSidebar />
        </Container>
      </SiteCommon>)
    };
  };

}
