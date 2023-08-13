import { useEffect } from 'react';
import {
    $createParagraphNode,
    $insertNodes,
    $isRootOrShadowRoot,
    COMMAND_PRIORITY_EDITOR,
    LexicalCommand,
    TextNode,
    createCommand,
} from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createClozeNode, ClozeNode } from '../../nodes/ClozeNode';
import { $wrapNodeInElement } from '@lexical/utils';

export const INSERT_CLOZE_COMMAND: LexicalCommand<{
    text: string;
    hint: string;
    index: number;
}> = createCommand('INSERT_CLOZE_COMMAND');

export function ClozePlugin(): JSX.Element | null {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        if (!editor.hasNodes([ClozeNode])) {
            throw new Error('ClozePlugin: ClozeNode not registered on editor.');
        }

        return editor.registerCommand<{ text: string; hint: string; index: number }>(
            INSERT_CLOZE_COMMAND,
            (payload) => {
                const clozeNode = $createClozeNode(payload.text, payload.hint, payload.index);
                $insertNodes([clozeNode]);
                if ($isRootOrShadowRoot(clozeNode.getParentOrThrow())) {
                    $wrapNodeInElement(clozeNode, $createParagraphNode).selectEnd();
                }
                return true;
            },
            COMMAND_PRIORITY_EDITOR
        );
    }, [editor]);
    return null;
}
