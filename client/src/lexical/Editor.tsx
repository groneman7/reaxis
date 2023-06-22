import { CSSProperties } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import * as Nodes from './nodes';
import * as Plugins from './plugins';
import { SupportedBlockTypes } from './supportedBlockTypes';
import { editorThemeClasses } from './style';
import './EditorDefault.css';

// import { initial } from './testDefaultText';

const editorConfig = {
    namespace: 'MyEditor',
    theme: editorThemeClasses,
    onError(error: any) {
        throw error;
    },
    nodes: [Nodes.HeadingNode, Nodes.ListNode, Nodes.ListItemNode],
    // editorState: initial,
};

type EditorProps = {
    allowedBlocks?: SupportedBlockTypes[];
    className?: string;
    toolbarStyle?: CSSProperties;
};

export function Editor(props: EditorProps) {
    const { allowedBlocks, className, toolbarStyle } = props;
    return (
        <div className={`editor-container ${className}`}>
            <LexicalComposer initialConfig={editorConfig}>
                <Plugins.ToolbarPlugin
                    allowedBlocks={allowedBlocks}
                    style={{ ...toolbarStyle }}
                />
                <Plugins.RichTextPlugin
                    contentEditable={<ContentEditable className="editor-content" />}
                    placeholder={null}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <Plugins.HistoryPlugin />
                <Plugins.ListPlugin />
                {/* <CustomLinkPlugin /> */}
                {/* <ClickableLinkPlugin /> */}
                {/* <ListMaxIndentLevelPlugin maxDepth={4} /> */}
            </LexicalComposer>
        </div>
    );
}
