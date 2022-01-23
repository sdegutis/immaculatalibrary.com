// import snippetsDir from 'dir:/data/snippets/';
// import Yaml from 'js-yaml';
// import { md, sortBy } from "../helpers";
// import { Routeable } from '../router';
// import { Container, Content, HeroImage, SplitPage } from '../view/page';
// import { Head, Html, SiteFooter, SiteHeader } from '../view/site';
// import { FsFile } from "/../src/filesys";
// import { RouteInput, RouteOutput } from "/../src/http";

// class Category implements Routeable {

//   static from(file: FsFile) {
//     const [, date, slug] = file.name.match(/^(\d{4}-\d{2}-\d{2})-(.+?).md$/)!;

//     const fileContents = file.text.replace(/\r\n/g, '\n');
//     const [, frontmatter, markdownContent] = fileContents.match(/^---\n(.+?)\n---\n\n(.+?)$/s)!;

//     const meta = Yaml.load(frontmatter!) as {
//       published: boolean,
//       title: string,
//       archiveLink: string,
//       bookSlug: string,
//     };

//     return new Category(
//       file,
//       date!,
//       slug!,
//       markdownContent!,
//       meta.published,
//       meta.title,
//       meta.archiveLink,
//       meta.bookSlug,
//     );
//   }

//   public previewMarkdown;
//   constructor(
//     private file: FsFile,
//     public date: string,
//     public slug: string,
//     public markdownContent: string,
//     public published: boolean,
//     public title: string,
//     public archiveLink: string,
//     public bookSlug: string,
//   ) {
//     this.previewMarkdown = this.derivePreview(2000);
//   }

//   private derivePreview(count: number) {
//     const paragraphs = this.markdownContent.trim().split(/(\r?\n>+ *\r?\n)/);

//     let running = 0;
//     for (let i = 0; i < paragraphs.length; i++) {
//       running += paragraphs[i]!.length;
//       if (running > count) break;
//     }

//     if (running < this.markdownContent.length - 1) {
//       return this.markdownContent.substring(0, running);
//     }
//     return null;
//   }

//   save() {
//     const header = Yaml.dump({
//       published: this.published,
//       title: this.title,
//       archiveLink: this.archiveLink,
//       bookSlug: this.bookSlug,
//     }, {
//       forceQuotes: true,
//     });
//     this.file.replace(Buffer.from(`---\n${header}---\n\n${this.markdownContent}`));
//   }

//   get route() {
//     return `/book-snippets/${this.date}-${this.slug}.html`;
//   }

//   image = '';

//   get(input: RouteInput): RouteOutput {
//     return {
//       body: <Html>
//         <Head title={this.title} />
//         <body>
//           <SiteHeader />
//           <main>
//             <HeroImage image={this.image} />
//             <Container>
//               <SplitPage>
//                 <Content>
//                   <h1>{this.title}</h1>
//                   {md.render(this.markdownContent)}
//                 </Content>
//               </SplitPage>
//             </Container>
//           </main>
//           {/* <QuickLinks /> */}
//           <SiteFooter />
//         </body>
//       </Html>
//     }
//   }

// }

// const categoryOrder = [
//   'classics',
//   'devotion',
//   'instruction',
//   'reference',
//   'saints',
//   'mary',
//   'joseph',
//   'apologetics',
//   'blessed-sacrament',
//   'sacred-heart',
//   'holy-spirit',
//   'lourdes',
//   'st-francis-de-sales',
//   'st-alphonsus-de-liguori',
//   'st-catherine-of-siena',
//   'st-teresa-of-avila',
//   'st-john-of-the-cross',
//   'st-john-henry-newman',
//   'st-thomas-more',
//   'st-thomas-aquinas',
//   'st-louis-de-montfort',
//   'jesuits',
//   'fr-lasance',
// ];

// export const allCategories = (snippetsDir
//   .files.map(file => Category.from(file))
//   .sort(sortBy(c => categoryOrder.indexOf(c).toString())));
