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
import type * as cmLangMarkdown from '@codemirror/lang-markdown';
import type * as cmCommands from '@codemirror/commands';
import type * as cmSearch from '@codemirror/search';
import type * as cmAutocomplete from '@codemirror/autocomplete';

import type * as lezerCommon from '@lezer/common';
import type * as lezerHighlight from '@lezer/highlight';
import type * as lezerMarkdown from '@lezer/markdown';
import type * as lezerLr from '@lezer/lr';

export const MarkEdit: Readonly<MarkEdit>;

export interface MarkEdit {
  /**
   * Configuration of the current editor.
   */
  editorConfig: Record<string, unknown>;

  /**
   * User-defined settings loaded from the [settings.json](https://github.com/MarkEdit-app/MarkEdit/wiki/Customization#advanced-settings) file.
   *
   * For example, user-defined scripts can use this to provide additional configurations.
   */
  userSettings: JSONObject;

  /**
   * CodeMirror EditorView instance of the current editor.
   */
  editorView: EditorView;

  /**
   * Convenient text editing interfaces.
   */
  editorAPI: TextEditable;

  /**
   * Retrieves a generative language model by name.
   */
  languageModel(name: LanguageModelName): LanguageModel;

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
     * The `@codemirror/lang-markdown` module.
     */
    langMarkdown: typeof cmLangMarkdown;

    /**
     * The `@codemirror/commands` module.
     */
    commands: typeof cmCommands;

    /**
     * The `@codemirror/search` module.
     */
    search: typeof cmSearch;

    /**
     * The `@codemirror/autocomplete` module.
     */
    autocomplete: typeof cmAutocomplete;
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
   * Get information of the current file.
   * @returns The file information, or undefined for unsaved new drafts.
   */
  getFileInfo(): Promise<FileInfo | undefined>;

  /**
   * Get all items from the native pasteboard.
   * @returns The items from the native (general) pasteboard.
   */
  getPasteboardItems(): Promise<PasteboardItem[]>;

  /**
   * Get the string from the native pasteboard.
   * @returns The string from the native (general) pasteboard, if applicable.
   */
  getPasteboardString(): Promise<string | undefined>;

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

  /**
   * Present a save panel for saving the file.
   * @param options The panel information, including the data and optionally a default file name.
   * @returns True if the file was successfully saved.
   */
  showSavePanel(options: SavePanelOptions): Promise<boolean>;

  /**
   * Run a [system service](https://support.apple.com/guide/mac-help/mchlp1012/mac) with input.
   * @param name The name of the system service.
   * @param input The input to pass to the service.
   * @returns True if the service performed successfully.
   */
  runService(name: string, input?: string): Promise<boolean>;
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
 * Unique identifier of a generative language model.
 *
 * The only supported model at this time is [Apple's Foundation Models](https://developer.apple.com/documentation/foundationmodels).
 */
export type LanguageModelName = 'Apple-Foundation-Models';

/**
 * Response of a language model content generation.
 *
 * For non-streaming scenarios, `done` is always true.
 */
export type LanguageModelResponse = {
  content?: string;
  error?: string;
  done: boolean;
};

/**
 * Response notifier for language model streaming responses.
 */
export type LanguageModelStream = (response: LanguageModelResponse) => void;

/**
 * Interfaces for a generative language model.
 */
export interface LanguageModel {
  /**
   * Check the language model availability.
   */
  availability(): Promise<LanguageModelAvailability>;

  /**
   * Create a new language model session.
   */
  createSession(options?: { instructions?: string }): Promise<LanguageModelSession>;
}

/**
 * Generative language model session.
 */
export interface LanguageModelSession {
  /**
   * Indicates a response is being generated.
   */
  isResponding(): Promise<boolean>;

  /**
   * Produces a response to a prompt.
   */
  respondTo(prompt: string, options?: LanguageModelGenerationOptions): Promise<LanguageModelResponse>;

  /**
   * Produces a response stream to a prompt.
   *
   * Each update delivers the latest snapshot of the content, not partial chunks.
   */
  streamResponseTo(
    prompt: string,
    options: LanguageModelGenerationOptions | LanguageModelStream,
    stream?: LanguageModelStream,
  ): void;
}

export type LanguageModelAvailability = {
  isAvailable: boolean;
  unavailableReason?: string;
};

export type LanguageModelGenerationOptions = {
  sampling?: LanguageModelSampling;
  temperature?: number;
  maximumResponseTokens?: number;
};

export type LanguageModelSampling =
  | { mode: 'greedy' }
  | { mode: 'top-k' | 'top-p'; value: number; seed?: number };

/**
 * Information of a file in the file system.
 */
export type FileInfo = {
  filePath: string;
  fileSize: number;
  creationDate: Date;
  modificationDate: Date;
};

/**
 * Represents a native pasteboard item.
 */
export type PasteboardItem = {
  /**
   * Type name, such as `public.utf8-plain-text`.
   */
  type: string;

  /**
   * Base64 representation of the pasteboard data.
   */
  data: string;

  /**
   * String representation of the pasteboard data, if applicable.
   */
  string?: string;
};

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
  state?: () => MenuItemState;

  /**
   * Icon for the item.
   *
   * This can be either a base64 string or a SF Symbol name.
   */
  icon?: string;

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
 * Represents the state of a menu item.
 */
export type MenuItemState = {
  /**
   * Whether enabled; defaults to true.
   */
  isEnabled?: boolean;
  /**
   * Whether selected; defaults to false.
   */
  isSelected?: boolean;
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

/**
 * Represents options to show the save panel.
 */
export type SavePanelOptions = {
  /**
   * String representation of the file, if applicable.
   */
  string?: string;

  /**
   * Base64 representation of the file, if applicable.
   */
  data?: string;

  /**
   * Default file name.
   */
  fileName?: string;
};

/**
 * Typed JSON value.
 */
type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONObject
  | JSONValue[];

/**
 * Typed JSON Object.
 */
type JSONObject = {
  [key: string]: JSONValue;
};
