({ updater, items, external }) => {

  return {
    routes: {

      'GET /': (input) => {
        return { body: 'hi wold' };
      },

      'POST /what': (input) => {
        return { body: external.util.format(input) };
      },

      'GET /admin/items': (input) => {
        return {
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify(items.map(it => [it.$$id, it.$$data]))
        }
      },

      'GET /admin': (input) => {
        return {
          body: <>
            {this.html}
            <script>{this.js}</script>
          </>
        };
      },

      'POST /admin/create': (input) => {
        const data = JSON.parse(input.text());
        try {
          const id = updater.create(JSON.parse(data));
          updater.rebuild();
          return { body: id };
        }
        catch (e) {
          return { body: external.util.format(e) };
        }
      },

      'POST /admin/update': (input) => {
        const id = input.query().get('id');
        const data = JSON.parse(input.text());
        try {
          updater.update(id, JSON.parse(data));
          updater.rebuild();
          return { body: 'ok' };
        }
        catch (e) {
          return { body: external.util.format(e) };
        }
      },

      'POST /admin/eval': (input) => {
        const code = input.text();
        try {
          const result = eval(code);
          return { body: external.util.format(result) };
        }
        catch (e) {
          return { body: external.util.format(e) };
        }
      },

    }
  };

}
