import { CSSProperties, useState } from 'react';
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
    lorem?: boolean;
    toolbarStyle?: CSSProperties;
};
export function Editor(props: EditorProps) {
    const { allowedBlocks, className, components, lorem, toolbarStyle } = props;

    const editorConfig = {
        namespace: 'MyEditor',
        theme: editorThemeClasses,
        onError(error: any) {
            throw error;
        },
        nodes: [
            Nodes.HeadingNode,
            Nodes.LinkNode,
            Nodes.ListNode,
            Nodes.ListItemNode,
            Nodes.QuoteNode,
            Nodes.CalloutNode,
        ],
        editorState: lorem ? initial : null,
    };

    const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null);

    const onRef = (_floatingAnchorElem: HTMLDivElement) => {
        if (_floatingAnchorElem !== null) {
            setFloatingAnchorElem(_floatingAnchorElem);
        }
    };

    return (
        <>
            <div className={`editor-container ${className}`}>
                <LexicalComposer initialConfig={editorConfig}>
                    <Plugins.ToolbarPlugin
                        allowedBlocks={allowedBlocks}
                        components={components}
                        style={{ ...toolbarStyle }}
                    />
                    <Plugins.RichTextPlugin
                        contentEditable={
                            <div className="editor-scroller">
                                <div ref={onRef}>
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
                    <Plugins.FloatingLinkEditorPlugin
                        anchorElem={floatingAnchorElem || undefined}
                    />
                    <Plugins.FloatingTextFormatToolbarPlugin
                        anchorElem={floatingAnchorElem || undefined}
                    />
                    {/* <ClickableLinkPlugin /> */}
                    {/* <ListMaxIndentLevelPlugin maxDepth={4} /> */}
                </LexicalComposer>
            </div>
        </>
    );
}
