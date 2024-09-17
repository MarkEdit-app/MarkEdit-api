/**
 * https://github.com/MarkEdit-app/MarkEdit-api
 *
 * - [MarkEdit Customization Guide](https://github.com/MarkEdit-app/MarkEdit/wiki/Customization)
 * - [Example (Markdown Table Editor)](https://github.com/MarkEdit-app/MarkEdit-mte)
 * - [Example (Text Highlight)](https://github.com/MarkEdit-app/MarkEdit-highlight)
 */

import type { EditorView } from '@codemirror/view';
import type { Extension } from '@codemirror/state';
import type { LanguageDescription } from '@codemirror/language';
import type { MarkdownConfig } from '@lezer/markdown';

import type * as cmView from '@codemirror/view';
import type * as cmState from '@codemirror/state';
import type * as cmLanguage from '@codemirror/language';
import type * as cmCommands from '@codemirror/commands';
import type * as cmSearch from '@codemirror/search';

import type * as lezerCommon from '@lezer/common';
import type * as lezerHighlight from '@lezer/highlight';
import type * as lezerMarkdown from '@lezer/markdown';
import type * as lezerLr from '@lezer/lr';

export const MarkEdit: MarkEdit;

export interface MarkEdit {
  /**
   * CodeMirror EditorView instance of the current editor.
   */
  editorView: EditorView;

  /**
   * Convenient text editing interfaces.
   */
  editorAPI: TextEditable;

  /**
   * CodeMirror modules used by MarkEdit.
   */
  codemirror: {
    /**
     * The `@codemirror/view` module.
     */
    view: typeof cmView;

    /**
     * The `@codemirror/state` module.
     */
    state: typeof cmState;

    /**
     * The `@codemirror/language` module.
     */
    language: typeof cmLanguage;

    /**
     * The `@codemirror/commands` module.
     */
    commands: typeof cmCommands;

    /**
     * The `@codemirror/search` module.
     */
    search: typeof cmSearch;
  };

  /**
   * Lezer modules used by MarkEdit.
   */
  lezer: {
    /**
     * The `@lezer/common` module.
     */
    common: typeof lezerCommon;

    /**
     * The `@lezer/highlight` module.
     */
    highlight: typeof lezerHighlight;

    /**
     * The `@lezer/markdown` module.
     */
    markdown: typeof lezerMarkdown;

    /**
     * The `@lezer/lr` module.
     */
    lr: typeof lezerLr;
  };

  /**
   * Get notified when the editor is initialized.
   * @param listener The callback function with the initialized editor instance.
   */
  onEditorReady: (listener: (editorView: EditorView) => void) => void;

  /**
   * Add an extension to MarkEdit.
   * @param extension CodeMirror extension.
   */
  addExtension: (extension: Extension) => void;

  /**
   * Add a Markdown config to MarkEdit.
   * @param config Markdown config.
   */
  addMarkdownConfig: (config: MarkdownConfig) => void;

  /**
   * Add a language to be highlighted (in code blocks) to MarkEdit.
   * @param language The language description.
   */
  addCodeLanguage: (language: LanguageDescription) => void;
}

/**
 * Abstract editor to provide convenient text editing interfaces.
 */
export interface TextEditable {
  /**
   * Get text of the document.
   * @param range The range of the text. If no range is provided, the entire document is returned.
   */
  getText(range?: TextRange): string;

  /**
   * Set text for the document.
   * @param text The text to set.
   * @param range The range of the text. If no range is provided, the entire document is overwritten.
   */
  setText(text: string, range?: TextRange): void;

  /**
   * Get text selections.
   */
  getSelections(): TextRange[];

  /**
   * Set text selections.
   * @param ranges Text ranges to set.
   */
  setSelections(ranges: TextRange[]): void;

  /**
   * Get the line number (0-indexed) of given text position.
   * @param position The text position.
   */
  getLineNumber(position: number): number;

  /**
   * Get line range of given row (0-indexed).
   * @param row The line number.
   */
  getLineRange(row: number): TextRange;

  /**
   * Get number of lines.
   */
  getLineCount(): number;

  /**
   * Get line separator.
   */
  getLineBreak(): string;

  /**
   * Get CodeMirror syntax node name of given position.
   * @param position The text position.
   */
  getNodeName(position: number): string;

  /**
   * Undo a change.
   */
  undo(): void;

  /**
   * Redo a change.
   */
  redo(): void;
}

export type TextRange = {
  from: number;
  to: number;
}
