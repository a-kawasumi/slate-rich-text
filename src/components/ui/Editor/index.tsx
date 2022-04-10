// Import React dependencies.
import React, { useState } from 'react';
// Import the Slate editor factory.
import { createEditor, BaseEditor } from 'slate';
import { ReactEditor, Slate, Editable, withReact } from 'slate-react';

type CustomText = { text: string };
type CustomElement = { type: string; children: CustomText[] };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

// Add the initial value.
const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
];

export const Editor = () => {
  const [editor] = useState(() => withReact(createEditor()));

  return (
    <Slate editor={editor} value={initialValue}>
      <Editable />
    </Slate>
  );
};
