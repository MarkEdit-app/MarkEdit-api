# MarkEdit-api

Type definitions for the latest [MarkEdit](https://markedit.app) API.

## References

- [MarkEdit Customization Guide](https://github.com/MarkEdit-app/MarkEdit/wiki/Customization)
- [Example: Markdown Table Editor](https://github.com/MarkEdit-app/MarkEdit-mte)
- [Example: Text Highlight](https://github.com/MarkEdit-app/MarkEdit-highlight)
- [Example: Vue Language Package](https://github.com/MarkEdit-app/MarkEdit-lang-vue)

## Usage

> The general workflow for creating a MarkEdit script involves leveraging [CodeMirror extensions](https://codemirror.net/docs/extensions/) or [Lezer parsers](https://lezer.codemirror.net/) to modify the app's behavior.

Add `markedit-api` to your (TypeScript) project's devDependencies:

```json
{
  "devDependencies": {
    "markedit-api": "https://github.com/MarkEdit-app/MarkEdit-api#v0.5.0"
  }
}
```

Import types declarations with:

```ts
import { MarkEdit } from 'markedit-api';
```

The `MarkEdit` object provides these interfaces:

```ts
interface MarkEdit {
  // CodeMirror EditorView instance of the current editor.
  editorView: EditorView;
  // Convenient text editing interfaces.
  editorAPI: TextEditable;
  // CodeMirror modules used by MarkEdit.
  codemirror: { view, state, language, commands, search };
  // Lezer modules used by MarkEdit.
  lezer: { common, highlight, markdown, lr };
  // Get notified when the editor is initialized.
  onEditorReady: (listener: (editorView: EditorView) => void) => void;
  // Add an extension to MarkEdit.
  addExtension: (extension: Extension) => void;
  // Add a Markdown config to MarkEdit.
  addMarkdownConfig: (config: MarkdownConfig) => void;
  // Add a language to be highlighted (in code blocks) to MarkEdit.
  addCodeLanguage: (language: LanguageDescription) => void;
}
```

Also, you can import and use [CodeMirror](https://codemirror.net/) and [Lezer](https://lezer.codemirror.net/) dependencies like this:

```ts
import { keymap } from '@codemirror/view';
import { Prec } from '@codemirror/state';
import { Tag } from '@lezer/highlight';
import { MarkdownConfig } from '@lezer/markdown';
```

Build [CodeMirror extension](https://codemirror.net/docs/extensions/) with these dependencies, and add it to MarkEdit with:

```ts
MarkEdit.addExtension(extension); // Can also add an array of extensions
```

Build [MarkdownConfig](https://github.com/lezer-parser/markdown?tab=readme-ov-file#user-content-markdownconfig) with these dependencies, and add it to MarkEdit with:

```ts
MarkEdit.addMarkdownConfig(config);
```

MarkEdit supports syntax highlighting for code blocks, you can also build your own [Language Package](https://codemirror.net/examples/lang-package/), and add it to MarkEdit with:

```ts
MarkEdit.addCodeLanguage(language);
```

> While extensions and configs can theoretically be added at any time, it is recommended that they be added immediately after loading the script.

## Building

In your build configuration, mark used MarkEdit and CodeMirror dependencies as `external`.

Here is an example of [vite](https://vitejs.dev/) config:

```ts
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      external: [
        'markedit-api',
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

> Note: If you're using packages that are **not** supported in MarkEdit, such as leveraging [@codemirror/lang-vue](https://github.com/codemirror/lang-vue) to add syntax highlighting for Vue, they should **not** be marked as external.

It is recommended to build as [cjs](https://commonjs.org/), building as [umd](https://github.com/umdjs/umd) should work too. If you build it as an [iife](https://developer.mozilla.org/en-US/docs/Glossary/IIFE), make sure to replace imports as globals like this:

```
rollupOptions: {
  external: [
    'markedit-api',
    '@codemirror/view',
    '@codemirror/state',
  ],
  output: {
    globals: {
      'markedit-api': 'MarkEdit',
      '@codemirror/view': 'MarkEdit.codemirror.view',
      '@codemirror/state': 'MarkEdit.codemirror.state',
    },
  },
},
```

The reason is to ensure that user scripts and MarkEdit use the same modules, rather than being separately bundled from different projects.

The final step is to copy the built script to `~/Library/Containers/app.cyan.markedit/Data/Documents/scripts/`, and restart the app.

> Ensure the build system produces a single JavaScript file. If the build generates multiple chunks, you can use [vite-plugin-singlefile](https://github.com/richardtallent/vite-plugin-singlefile) to bundle everything into one file.

## Using JavaScript

If you just want to quickly prototype with JavaScript, you can directly access CodeMirror and MarkEdit interfaces through objects assigned to the `MarkEdit` object. For example:

```js
const keymap = MarkEdit.codemirror.view.keymap;
const editorAPI = MarkEdit.editorAPI;
```

----

For complete examples, refer to [Example: Markdown Table Editor](https://github.com/MarkEdit-app/MarkEdit-mte), [Example: Text Highlight](https://github.com/MarkEdit-app/MarkEdit-highlight) and [Example: Vue Language Package](https://github.com/MarkEdit-app/MarkEdit-lang-vue).
