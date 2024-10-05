/**
 * https://github.com/MarkEdit-app/MarkEdit-api
 *
 * - [MarkEdit Customization Guide](https://github.com/MarkEdit-app/MarkEdit/wiki/Customization)
 * - [Example: Markdown Table Editor](https://github.com/MarkEdit-app/MarkEdit-mte)
 * - [Example: Text Highlight](https://github.com/MarkEdit-app/MarkEdit-highlight)
 * - [Example: Vue Language Package](https://github.com/MarkEdit-app/MarkEdit-lang-vue)
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
  onEditorReady(listener: (editorView: EditorView) => void): void;

  /**
   * Add an extension to MarkEdit.
   * @param extension CodeMirror extension.
   */
  addExtension(extension: Extension): void;

  /**
   * Add a Markdown config to MarkEdit.
   * @param config Markdown config.
   */
  addMarkdownConfig(config: MarkdownConfig): void;

  /**
   * Add a language to be highlighted (in code blocks) to MarkEdit.
   * @param language The language description.
   */
  addCodeLanguage(language: LanguageDescription): void;

  /**
   * Add a menu item to the status bar.
   * @param item The menu item to add, which will be placed under the "Extensions" submenu. It can either perform an action or contain a submenu.
   */
  addMainMenuItem(item: MenuItem | MenuItem[]): void;

  /**
   * Present a contextual menu to receive user input.
   * @param items The items in the menu.
   * @param location The location to show the menu, with the default value set to the caret position.
   */
  showContextMenu(items: MenuItem[], location?: Point): void;

  /**
   * Present an alert to receive user input.
   * @param alert The alert to present.
   * @returns The index of the chosen button, 0-indexed.
   */
  showAlert(alert: Alert): Promise<number>;

  /**
   * Present a text box to receive user input.
   * @param textBox The text box to present.
   * @returns The input string, or undefined if no value is provided.
   */
  showTextBox(textBox?: TextBox): Promise<string | undefined>;
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

/**
 * Represents a portion of text.
 */
export type TextRange = {
  from: number;
  to: number;
};

/**
 * Represents a menu item in native menus.
 */
export type MenuItem = {
  title?: string;
  action?: () => void;

  /**
   * Whether an item is a separator used to logically group other items.
   */
  separator?: boolean;

  /**
   * Key equivalent of the action.
   */
  key?: string;

  /**
   * Key modifiers of the action. Valid values are `Shift`, `Control`, `Command`, and `Option`.
   *
   * The order does not matter but they are case sensitive.
   *
   * When `key` is uppercase, `Shift` is automatically enabled.
   */
  modifiers?: ('Shift' | 'Control' | 'Command' | 'Option')[];

  /**
   * Child items to build a submenu.
   */
  children?: MenuItem[];
};

/**
 * Represents a location on the screen.
 */
export type Point = {
  x: number;
  y: number;
};

/**
 * Represents a native alert to present.
 *
 * If it's a string, it will be used as the title.
 */
export type Alert = {
  /**
   * The title that is displayed prominently in the alert.
   */
  title?: string;

  /**
   * The informative message for more details.
   */
  message?: string;

  /**
   * The button titles.
   */
  buttons?: string[];
} | string;

/**
 * Represents a text box to receive input.
 *
 * If it's a string, it will be used as the title.
 */
export type TextBox = {
  title?: string;
  placeholder?: string;
  defaultValue?: string;
} | string;
