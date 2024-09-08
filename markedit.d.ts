import type * as cmView from '@codemirror/view';
import type * as cmState from '@codemirror/state';
import type * as cmLanguage from '@codemirror/language';
import type * as cmSearch from '@codemirror/search';
import type * as cmCommands from '@codemirror/commands';
import type * as lezerCommon from '@lezer/common';
import type * as lezerHighlight from '@lezer/highlight';
import type * as lezerLr from '@lezer/lr';

declare global {
  const MarkEdit: {
    /**
     * CodeMirror EditorView instance of the current editor.
     */
    editorView: cmView.EditorView;

    /**
     * Convenient text editing interfaces.
     */
    editorAPI: TextEditable;

    /**
     * Add an extension to MarkEdit.
     * @param extension CodeMirror extension.
     */
    addExtension: (extension: cmState.Extension) => void;

    /**
     * CodeMirror modules used by MarkEdit.
     */
    codemirror: {
      /**
       * `@codemirror/view`
       */
      view: typeof cmView;
      /**
       * `@codemirror/state`
       */
      state: typeof cmState;
      /**
       * `@codemirror/language`
       */
      language: typeof cmLanguage;
      /**
       * `@codemirror/commands`
       */
      commands: typeof cmCommands;
      /**
       * `@codemirror/search`
       */
      search: typeof cmSearch;
    };

    /**
     * Lezer modules used by MarkEdit.
     */
    lezer: {
      /**
       * `@lezer/common`
       */
      common: typeof lezerCommon;
      /**
       * `@lezer/highlight`
       */
      highlight: typeof lezerHighlight;
      /**
       * `@lezer/lr`
       */
      lr: typeof lezerLr;
    },
  }
}

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
};
