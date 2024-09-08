# MarkEdit-api

Type definitions for the latest [MarkEdit](https://markedit.app) API.

Learn more: [Customization Guide](https://github.com/MarkEdit-app/MarkEdit/wiki/Customization).

Example project: [MarkEdit-mte (Markdown Table Editor)](https://github.com/MarkEdit-app/MarkEdit-mte).

## Usage

Add `markedit-api` to your project's devDependencies:

```json
{
  "devDependencies": {
    "markedit-api": "https://github.com/MarkEdit-app/MarkEdit-api#v0.0.2"
  }
}
```

MarkEdit bundles CodeMirror packages, so you can import dependencies like this:

```ts
import { keymap } from '@codemirror/view';
import { Prec } from '@codemirror/state';
import { TextEditable } from 'markedit-api';
```

In your build configuration, mark these dependencies as external:

```ts
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      external: [
        '@codemirror/view',
        '@codemirror/state',
      ],
    },
    lib: {
      entry: 'main.ts',
      formats: ['cjs'],
    },
  },
});
```

Build the project as a `CommonJS` library, copy it to `~/Library/Containers/app.cyan.markedit/Data/Documents/scripts/`, and restart the app.

If you're not using TypeScript or just want to quickly prototype, you can directly access CodeMirror and MarkEdit interfaces through objects assigned to the `Window` object. For example:

```js
const keymap = window.cm.view.keymap;
const editor = window.api.editor;
```

For a complete example, refer to [MarkEdit-mte](https://github.com/MarkEdit-app/MarkEdit-mte).
