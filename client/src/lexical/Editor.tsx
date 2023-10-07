import { CSSProperties } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import * as Nodes from './nodes';
import * as Plugins from './plugins';
import { SupportedComponents } from './plugins/EditorToolbar';
import { SupportedBlockTypes } from './utils/blockTypes';
import { editorThemeClasses } from './utils/style';
import './EditorDefault.css';

import { initial } from './utils';

type EditorProps = {
  allowedBlocks?: SupportedBlockTypes[];
  className?: string;
  components?: SupportedComponents[];
  defaultState?: string;
  lorem?: boolean;
  readOnly?: boolean;
  toolbarStyle?: CSSProperties;
};
export function Editor(props: EditorProps) {
  const { allowedBlocks, className, components, defaultState, lorem, readOnly, toolbarStyle } =
    props;

  const editorConfig = {
    namespace: 'MyEditor',
    theme: editorThemeClasses,
    onError(error: unknown) {
      throw error;
    },
    nodes: [
      Nodes.HeadingNode,
      Nodes.LinkNode,
      Nodes.ListNode,
      Nodes.ListItemNode,
      Nodes.QuoteNode,
      Nodes.CalloutNode,
      Nodes.ClozeNode,
    ],
    editorState: defaultState ? defaultState : lorem ? initial : undefined,
    editable: !readOnly,
  };

  return (
    <>
      <div className={`editor-container ${readOnly ? 'read-only' : ''} ${className} `}>
        <LexicalComposer initialConfig={editorConfig}>
          {!readOnly ? (
            <>
              <Plugins.ToolbarPlugin
                allowedBlocks={allowedBlocks}
                components={components}
                style={{ ...toolbarStyle }}
              />
              <Plugins.RichTextPlugin
                contentEditable={
                  <div className="editor-scroller">
                    <div>
                      <ContentEditable className="editor-content" />
                    </div>
                  </div>
                }
                placeholder={null}
                ErrorBoundary={LexicalErrorBoundary}
              />
              <Plugins.HistoryPlugin />
              <Plugins.ListPlugin />
              <Plugins.LinkPlugin />
              {/* <Plugins.TextSelectionPlugin /> */}
              <Plugins.ClozePlugin />
              <Plugins.ContextMenuPlugin />
            </>
          ) : (
            <>
              <Plugins.RichTextPlugin
                contentEditable={
                  <div className="editor-scroller">
                    <div>
                      <ContentEditable className="editor-content" />
                    </div>
                  </div>
                }
                placeholder={null}
                ErrorBoundary={LexicalErrorBoundary}
              />
              <Plugins.ClozePlugin />
            </>
          )}
        </LexicalComposer>
      </div>
    </>
  );
}
