// Import React dependencies.
import React, { useMemo } from 'react';
// Import the Slate editor factory.
import { createEditor, Descendant, Node } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

// Define a serializing function that takes a value and returns a string.
const serialize = (value: Descendant[]) =>
  value
    // Return the string content of each paragraph in the value's children.
    .map(n => Node.string(n))
    // Join them all with line breaks denoting paragraphs.
    .join('\n');

// Define a deserializing function that takes a string and returns a value.
const deserialize = (string: string) =>
  // Return a value array of children derived by splitting the string.
  string.split('\n').map(line => ({
    children: [{ text: line }],
  }));

/**
 * localStorageに{ content: text }を保存することで永続化ができる
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type StorageEditorProps = {};
export const StorageEditor: React.FC<StorageEditorProps> = () => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const initialValue = useMemo(() => {
    const content = window.localStorage.getItem('content');
    if (content) {
      return deserialize(content);
    }
    return [
      {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.', type: null, bold: false }],
        bold: false,
      },
    ];
  }, []);

  return (
    <Slate
      editor={editor}
      // @ts-expect-error
      value={initialValue}
      onChange={value => {
        const isAstChange = editor.operations.some(op => op.type !== 'set_selection');
        if (isAstChange) {
          // Save the value to Local Storage.
          window.localStorage.setItem('content', serialize(value));
        }
      }}
    >
      <Editable />
    </Slate>
  );
};
