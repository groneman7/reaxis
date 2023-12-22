import { useEffect } from 'react';
import { COMMAND_PRIORITY_EDITOR, $getNearestNodeFromDOMNode } from 'lexical';
import { NodeEventPlugin } from '@lexical/react/LexicalNodeEventPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import {
    $isClozeNode,
    CLOZE_COMMAND,
    ClozeNode,
    removeCloze,
    insertCloze,
} from '../../nodes/ClozeNode';

export function ClozePlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        if (!editor.hasNodes([ClozeNode])) {
            throw new Error('ClozePlugin: ClozeNode not registered on editor.');
        }

        return mergeRegister(
            editor.registerCommand<boolean>(
                CLOZE_COMMAND,
                (payload) => {
                    if (payload === true) {
                        insertCloze();
                        return true;
                    } else {
                        removeCloze();
                        return true;
                    }
                },
                COMMAND_PRIORITY_EDITOR
            )
        );
    }, [editor]);

    return (
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
    );
}
