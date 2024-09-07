import type * as cmView from '@codemirror/view';
import type * as cmState from '@codemirror/state';
import type * as cmLanguage from '@codemirror/language';

declare global {
  interface Window {
    /**
     * CodeMirror modules used by MarkEdit.
     */
    cm: {
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
    };
    api: {
      /**
       * Text editing interfaces.
       */
      editor: TextEditable;
      /**
       * Register an extension to MarkEdit.
       * @param extension CodeMirror extension.
       */
      addExtension: (extension: cmState.Extension) => void;
    };
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
