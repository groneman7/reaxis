import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import {
    COMMAND_PRIORITY_EDITOR,
    $nodesOfType,
    $getSelection,
    $getNearestNodeFromDOMNode,
} from 'lexical';
import { NodeEventPlugin } from '@lexical/react/LexicalNodeEventPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import {
    $isClozeNode,
    CLOZE_COMMAND,
    ClozeNode,
    removeCloze,
    insertCloze,
    setClozeVariant,
} from '../../nodes/ClozeNode';

export const ClozeContext = createContext(0);

export function ClozePlugin() {
    // This plugin should implement all Cloze functionality for creating and viewing Cloze nodes. This includes, but is not limited to, tracking/manipulating the highest Cloze variant in a given editor.
    const [editor] = useLexicalComposerContext();
    const [maxCloze, setMaxCloze] = useState<number>(0);

    function determineMaxCloze(): void {
        const clozeNodes = $nodesOfType(ClozeNode);
        const variants = clozeNodes.map((node: ClozeNode) => {
            return node.getVariant();
        });
        const sorted = variants.sort((a, b) => b - a);
        if (sorted[0] > maxCloze) {
            setMaxCloze(sorted[0]);
        }
    }

    useEffect(() => {
        if (!editor.hasNodes([ClozeNode])) {
            throw new Error('ClozePlugin: ClozeNode not registered on editor.');
        }

        return mergeRegister(
            editor.registerCommand<boolean | number>(
                CLOZE_COMMAND,
                (payload) => {
                    if (typeof payload !== 'number') {
                        if (payload === true) {
                            insertCloze();
                            return true;
                        } else {
                            removeCloze();
                            return true;
                        }
                    } else {
                        // change cloze variant of current selection
                        setClozeVariant(payload);

                        return true;
                    }
                },
                COMMAND_PRIORITY_EDITOR
            )
        );
    }, [editor]);

    return (
        // This first NodeEvent handles what happens when a ClozeNode is left clicked.
        <ClozeContext.Provider value={maxCloze}>
            <NodeEventPlugin
                nodeType={ClozeNode}
                eventType="click"
                eventListener={(e: Event) => {
                    if (editor.isEditable()) return;

                    const domNode = e.target as HTMLElement;
                    editor.update(() => {
                        if (e.target) {
                            const node = $getNearestNodeFromDOMNode(domNode);

                            if ($isClozeNode(node)) {
                                domNode.focus();
                                node.setRevealed(true);
                            } else {
                                const parent = node?.getParent();
                                if ($isClozeNode(parent)) {
                                    domNode.focus();
                                    parent.setRevealed(true);
                                }
                            }
                        }
                    });
                }}
            />
        </ClozeContext.Provider>
    );
}
