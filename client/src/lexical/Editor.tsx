import { CSSProperties } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import * as Nodes from './nodes';
import * as Plugins from './plugins';
import { editorThemeClasses } from './theme';
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
    className?: string;
    style?: CSSProperties;
    toolbarClassName?: string;
    toolbarStyle?: CSSProperties;
};

export function Editor(props: EditorProps) {
    const { className, style, toolbarClassName, toolbarStyle } = props;
    return (
        <div className={`editor-container ${className}`}>
            <LexicalComposer initialConfig={editorConfig}>
                <Plugins.ToolbarPlugin
                    className={toolbarClassName}
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
