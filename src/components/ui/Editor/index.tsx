// Import React dependencies.
import React, { useMemo, useCallback } from 'react';
// Import the Slate editor factory.
import { createEditor, BaseEditor, Transforms, Editor, Text } from 'slate';
import { ReactEditor, Slate, Editable, withReact, RenderElementProps, RenderLeafProps } from 'slate-react';

interface CustomText {
  text: string;
  bold?: boolean;
  type?: string;
}
interface CustomElement {
  type: string;
  children: CustomText[];
}

type CustomEditor = {
  type: string;
} & BaseEditor &
  ReactEditor;
declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
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

// Define a React component renderer for our code blocks.
const CodeElement = (props: RenderElementProps) => {
  const { attributes, children } = props;
  return (
    <pre {...attributes}>
      <code>{children}</code>
    </pre>
  );
};

const DefaultElement = (props: RenderElementProps) => {
  const { attributes, children } = props;
  return <p {...attributes}>{children}</p>;
};

const Leaf = (props: RenderLeafProps) => {
  const { attributes, children, leaf } = props;

  return (
    <span {...attributes} style={{ fontWeight: leaf.bold ? 'bold' : 'normal' }}>
      {children}
    </span>
  );
};

export const SlateEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);

  // Define a rendering function based on the element passed to `props`. We use
  // `useCallback` here to memoize the function for subsequent renders.
  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback(props => <Leaf {...props} />, []);

  return (
    <Slate editor={editor} value={initialValue}>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={event => {
          if (!event.ctrlKey) {
            return;
          }

          switch (event.key) {
            // When "`" is pressed, keep our existing code block logic.
            case '`': {
              event.preventDefault();
              // @ts-expect-error
              const [match] = Editor.nodes<CustomEditor>(editor, {
                match: n => n.type === 'code',
              });
              Transforms.setNodes(
                editor,
                { type: match ? 'paragraph' : 'code' },
                { match: n => Editor.isBlock(editor, n) },
              );
              break;
            }

            // When "B" is pressed, bold the text in the selection.
            case 'b': {
              event.preventDefault();
              Transforms.setNodes(
                editor,
                { bold: true },
                // Apply it to text nodes, and split the text node up if the
                // selection is overlapping only part of it.
                { match: n => Text.isText(n), split: true },
              );
              break;
            }

            default:
              break;
          }
        }}
      />
    </Slate>
  );
};
