import { Column, Spaced } from "./components/column/column";
import { TypicalPage } from "./components/page";
import { Typography } from "./components/typography";

export default <>
  <TypicalPage image='/img/page/404.jpg'>

    <Spaced>
      <Column>
        <Typography>

          <h1>Page not found</h1>
          <p>Sorry, couldn't find the page you're looking for.</p>

        </Typography>
      </Column>
    </Spaced>

  </TypicalPage>
</>;
