import { useEffect } from 'react';
import { mergeRegister } from '@lexical/utils';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { TestDecorator, TOGGLE_TEST_DECORATOR, toggleTestDecoractor } from '../nodes';
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_LOW, PASTE_COMMAND } from 'lexical';

export function TestPlugin() {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        if (!editor.hasNodes([TestDecorator])) {
            throw new Error('TestPlugin: TestDecorator not registered on editor');
        }

        return editor.registerCommand(
            TOGGLE_TEST_DECORATOR,
            (payload: string | null) => {
                if (payload === null) {
                    toggleTestDecoractor(payload);
                    return true;
                } /* if (typeof payload === 'string') */ else {
                    toggleTestDecoractor(payload);
                    return true;
                } /* else {
                        const { url, target, rel, title } = payload;
                        link.toggleLink(url, {
                            rel,
                            target,
                            title,
                        });
                        return true;
                    } */
            },
            COMMAND_PRIORITY_LOW
        );
    }, [editor]);
    return null;
}
