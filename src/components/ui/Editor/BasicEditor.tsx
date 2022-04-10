// Import React dependencies.
import React, { useMemo, useCallback } from 'react';
// Import the Slate editor factory.
import { createEditor, BaseEditor, Transforms, Editor, Text } from 'slate';
import { ReactEditor, Slate, Editable, withReact, RenderElementProps, RenderLeafProps } from 'slate-react';

interface CustomText {
  text: string;
  bold: boolean | null;
  type: string | null;
}
interface CustomElement {
  type: string;
  bold: boolean | null;
  children: CustomText[];
}

type CustomEditorType = {
  type: string | null;
  bold: boolean | null;
} & BaseEditor &
  ReactEditor;
declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditorType;
    Element: CustomElement;
    Text: CustomText;
  }
}

// Add the initial value.
const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.', type: null, bold: false }],
    bold: null,
  },
];

// Define our own custom set of helpers.
const CustomEditor = {
  isBoldMarkActive(editor: CustomEditorType) {
    const [match] = Editor.nodes(editor, {
      match: n => n.bold === true,
      universal: true,
    });

    return !!match;
  },

  isCodeBlockActive(editor: CustomEditorType) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === 'code',
    });

    return !!match;
  },

  toggleBoldMark(editor: CustomEditorType) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    Transforms.setNodes<CustomEditorType>(
      editor,
      { bold: isActive ? null : true },
      { match: n => Text.isText(n), split: true },
    );
  },

  toggleCodeBlock(editor: CustomEditorType) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes<CustomEditorType>(
      editor,
      { type: isActive ? null : 'code' },
      { match: n => Editor.isBlock(editor, n) },
    );
  },
};

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

export const BasicEditor = () => {
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
      <div>
        <button
          type="button"
          onMouseDown={event => {
            event.preventDefault();
            CustomEditor.toggleBoldMark(editor);
          }}
        >
          Bold
        </button>
        <button
          type="button"
          onMouseDown={event => {
            event.preventDefault();
            CustomEditor.toggleCodeBlock(editor);
          }}
        >
          Code Block
        </button>
      </div>
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
              CustomEditor.toggleCodeBlock(editor);
              break;
            }

            // When "B" is pressed, bold the text in the selection.
            case 'b': {
              event.preventDefault();
              CustomEditor.toggleBoldMark(editor);
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
