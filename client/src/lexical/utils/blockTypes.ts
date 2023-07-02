import { ReactNode } from 'react';
import { $createParagraphNode, $getSelection, $isRangeSelection, LexicalEditor } from 'lexical';
import { $createCalloutNode } from '../nodes';
import { $createCodeNode } from '@lexical/code';
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from '@lexical/list';
import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text';
import { $wrapNodes } from '@lexical/selection';

export type SupportedBlockTypes =
    | 'paragraph'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'quote'
    | 'callout'
    | 'code'
    | 'ul'
    | 'ol';

type BlockTypeProps = {
    key: string;
    icon?: ReactNode;
    label: string;
    format?: (editor: LexicalEditor) => void;
};

export const supportedBlockTypes: Record<SupportedBlockTypes, BlockTypeProps> = {
    paragraph: {
        key: 'paragraph',
        label: 'Normal',
        format: (editor) => {
            editor.update(() => {
                const selection = $getSelection();

                if ($isRangeSelection(selection)) {
                    $wrapNodes(selection, () => $createParagraphNode());
                }
            });
        },
    },
    h1: {
        key: 'h1',
        label: 'Heading 1',
        format: (editor) => {
            editor.update(() => {
                const selection = $getSelection();

                if ($isRangeSelection(selection)) {
                    $wrapNodes(selection, () => $createHeadingNode('h1'));
                }
            });
        },
    },
    h2: {
        key: 'h2',
        label: 'Heading 2',
        format: (editor) => {
            editor.update(() => {
                const selection = $getSelection();

                if ($isRangeSelection(selection)) {
                    $wrapNodes(selection, () => $createHeadingNode('h2'));
                }
            });
        },
    },
    h3: {
        key: 'h3',
        label: 'Heading 3',
        format: (editor) => {
            editor.update(() => {
                const selection = $getSelection();

                if ($isRangeSelection(selection)) {
                    $wrapNodes(selection, () => $createHeadingNode('h3'));
                }
            });
        },
    },
    h4: {
        key: 'h4',
        label: 'Heading 4',
        format: (editor) => {
            editor.update(() => {
                const selection = $getSelection();

                if ($isRangeSelection(selection)) {
                    $wrapNodes(selection, () => $createHeadingNode('h4'));
                }
            });
        },
    },
    h5: {
        key: 'h5',
        label: 'Heading 5',
        format: (editor) => {
            editor.update(() => {
                const selection = $getSelection();

                if ($isRangeSelection(selection)) {
                    $wrapNodes(selection, () => $createHeadingNode('h5'));
                }
            });
        },
    },
    h6: {
        key: 'h6',
        label: 'Heading 6',
        format: (editor) => {
            editor.update(() => {
                const selection = $getSelection();

                if ($isRangeSelection(selection)) {
                    $wrapNodes(selection, () => $createHeadingNode('h6'));
                }
            });
        },
    },
    quote: {
        key: 'quote',
        label: 'Quote',
        format: (editor) => {
            editor.update(() => {
                const selection = $getSelection();

                if ($isRangeSelection(selection)) {
                    $wrapNodes(selection, () => $createQuoteNode());
                }
            });
        },
    },
    code: {
        key: 'code',
        label: 'Code',
        format: (editor) => {
            editor.update(() => {
                const selection = $getSelection();

                if ($isRangeSelection(selection)) {
                    $wrapNodes(selection, () => $createCodeNode());
                }
            });
        },
    },
    callout: {
        key: 'callout',
        label: 'Callout',
        format: (editor) => {
            editor.update(() => {
                const selection = $getSelection();

                if ($isRangeSelection(selection)) {
                    $wrapNodes(selection, () => $createCalloutNode());
                }
            });
        },
    },
    ul: {
        key: 'ul',
        label: 'Bulleted List',
        format: (editor) => {
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, void null);
        },
    },
    ol: {
        key: 'ol',
        label: 'Numbered List',
        format: (editor) => {
            editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, void null);
        },
    },
};
