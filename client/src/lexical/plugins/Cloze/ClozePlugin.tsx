import { useEffect } from 'react';
import { COMMAND_PRIORITY_EDITOR } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ClozeNode, TOGGLE_CLOZE_COMMAND, toggleCloze } from '../../nodes/ClozeNode';

export function ClozePlugin(): null {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        if (!editor.hasNodes([ClozeNode])) {
            throw new Error('ClozePlugin: ClozeNode not registered on editor.');
        }

        return editor.registerCommand<number | { index: number; hint?: string } | null>(
            TOGGLE_CLOZE_COMMAND,
            (payload) => {
                if (payload === null) {
                    toggleCloze(payload);
                    return true;
                } else if (typeof payload === 'number') {
                    toggleCloze(payload);
                    return true;
                } else {
                    const { index, hint } = payload;
                    toggleCloze(index, hint);
                }

                return true;
            },
            COMMAND_PRIORITY_EDITOR
        );
    }, [editor]);

    return null;
}
