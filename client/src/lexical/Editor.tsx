import { CSSProperties, useState } from 'react';
import { createPortal } from 'react-dom';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import * as Nodes from './nodes';
import * as Plugins from './plugins';
import { SupportedComponents } from './plugins/EditorToolbar';
import { SupportedBlockTypes } from './utils/blockTypes';
import { editorThemeClasses } from './utils/style';
import './EditorDefault.css';

import { NodeEventPlugin } from '@lexical/react/LexicalNodeEventPlugin';

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
    const [test, setTest] = useState(false);

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
            // Nodes.TestDecorator,
        ],
        editorState: lorem ? initial : undefined,
    };

    const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null);

    const onRef = (_floatingAnchorElem: HTMLDivElement) => {
        if (_floatingAnchorElem !== null) {
            setFloatingAnchorElem(_floatingAnchorElem);
        }
    };

    function Test() {
        console.log('test again');
        return (
            <div style={{ background: 'lime', position: 'absolute', top: 0, left: 0 }}>
                test
            </div>
        );
    }

    function TestPortal(anchor: HTMLElement | DocumentFragment) {
        console.log('test');
        console.log(anchor);
        return createPortal(<Test />, document.body);
    }

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
                    <NodeEventPlugin
                        nodeType={Nodes.HeadingNode}
                        eventType="click"
                        eventListener={(e: Event) => {
                            setTest(true);
                        }}
                    />
                    {/* <Plugins.TestPlugin /> */}
                    {/* <ClickableLinkPlugin /> */}
                    {/* <ListMaxIndentLevelPlugin maxDepth={4} /> */}
                </LexicalComposer>
            </div>
        </>
    );
}
