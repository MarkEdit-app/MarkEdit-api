# MarkEdit-api

Type definitions for the latest [MarkEdit](https://markedit.app) API.

## References

- [MarkEdit Customization Guide](https://github.com/MarkEdit-app/MarkEdit/wiki/Customization)
- [Example (Markdown Table Editor)](https://github.com/MarkEdit-app/MarkEdit-mte)

## Usage

> The general workflow of making a MarkEdit script, which leverages [CodeMirror extensions](https://codemirror.net/docs/extensions/) to change the behavior of the app.

Add `markedit-api` to your (TypeScript) project's devDependencies:

```json
{
  "devDependencies": {
    "markedit-api": "https://github.com/MarkEdit-app/MarkEdit-api#v0.0.6"
  }
}
```

Import types declarations with:

```ts
import type {} from 'markedit-api';
```

There is a global object called `MarkEdit` that provides these interfaces:

```ts
interface MarkEdit {
  // CodeMirror EditorView instance of the current editor.
  editorView: EditorView;
  // Convenient text editing interfaces.
  editorAPI: TextEditable;
  // Add an extension to MarkEdit.
  addExtension: (extension: Extension) => void;
  // CodeMirror modules used by MarkEdit.
  codemirror: { view, state, language, languageData, langMarkdown };
  // Lezer modules used by MarkEdit.
  lezer: { common, highlight, markdown, lr },
}
```

Also, you can import and use [CodeMirror](https://codemirror.net/) and [Lezer](https://lezer.codemirror.net/) dependencies like this:

```ts
import { keymap } from '@codemirror/view';
import { Prec } from '@codemirror/state';
import { Tag } from '@lezer/highlight';
```

Build a [CodeMirror extension](https://codemirror.net/docs/extensions/) with these dependencies, and add it to MarkEdit with:

```ts
MarkEdit.addExtension(extension); // Can also add an array of extensions
```

In your build configuration, mark CodeMirror (and Lezer) dependencies as `external`.

Taking this [vite](https://vitejs.dev/) config as an example:

```ts
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      external: [
        '@codemirror/view',
        '@codemirror/state',
        // ...
      ],
    },
    lib: {
      entry: 'main.ts',
      formats: ['cjs'], // CommonJS
    },
  },
});
```

Build the project as a `CommonJS` library, copy it to `~/Library/Containers/app.cyan.markedit/Data/Documents/scripts/`, and restart the app.

If you just want to quickly prototype with JavaScript, you can directly access CodeMirror and MarkEdit interfaces through objects assigned to the `MarkEdit` object. For example:

```js
const keymap = MarkEdit.codemirror.view.keymap;
const editorAPI = MarkEdit.editorAPI;
```

For a complete example, refer to [Example (Markdown Table Editor)](https://github.com/MarkEdit-app/MarkEdit-mte).
