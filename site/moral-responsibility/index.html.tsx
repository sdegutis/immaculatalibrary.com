import { jsxToString } from "@imlib/core";
import MarkdownIt from 'markdown-it';
import { Typography } from "../components/$typography.js";
import { CenteredColumn, Spaced } from "../components/column.js";
import { TypicalPage } from "../components/page.js";
import files from './';

const md = new MarkdownIt({
  typographer: true,
  html: true,
  linkify: true,
});

const file = files.find(f => f.path.endsWith('moral-responsibility.md'))!;
const content = md.render(file.content.toString('utf8'));

export default jsxToString(<>
  <TypicalPage page="Books" title="Moral Responsibility" image={`/img/categories/blessed-sacrament-big.jpg`}>

    <Spaced>
      <CenteredColumn>

        <Typography>{content}</Typography>

      </CenteredColumn>
    </Spaced>

  </TypicalPage>
</>);
