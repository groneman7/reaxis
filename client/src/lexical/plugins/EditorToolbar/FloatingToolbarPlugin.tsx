import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { $isCodeHighlightNode } from '@lexical/code';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import {
    COMMAND_PRIORITY_LOW,
    createCommand,
    FORMAT_TEXT_COMMAND,
    LexicalCommand,
    LexicalEditor,
    SELECTION_CHANGE_COMMAND,
    $getSelection,
    $isRangeSelection,
    $isTextNode,
} from 'lexical';
import { getSelectedNode } from '../../utils';
import { BasicFormatButtons } from '.';

const HORIZONTAL_OFFSET = 8;
const VERTICAL_OFFSET = 8;

function TextFormatFloatingToolbar({
    editor,
    anchorElem,
    isLink,
    isBold,
    isItalic,
    isUnderline,
    isCode,
    isStrikethrough,
    isSubscript,
    isSuperscript,
}: {
    editor: LexicalEditor;
    anchorElem: HTMLElement;
    isBold: boolean;
    isCode: boolean;
    isItalic: boolean;
    isLink: boolean;
    isStrikethrough: boolean;
    isSubscript: boolean;
    isSuperscript: boolean;
    isUnderline: boolean;
}): JSX.Element {
    const popupCharStylesEditorRef = useRef<HTMLDivElement | null>(null);

    const insertLink = useCallback(() => {
        if (!isLink) {
            editor.dispatchCommand(TOGGLE_LINK_COMMAND, 'https://');
        } else {
            editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
        }
    }, [editor, isLink]);

    function mouseMoveListener(e: MouseEvent) {
        if (popupCharStylesEditorRef?.current && (e.buttons === 1 || e.buttons === 3)) {
            popupCharStylesEditorRef.current.style.pointerEvents = 'none';
        }
    }
    function mouseUpListener(e: MouseEvent) {
        if (
            popupCharStylesEditorRef?.current &&
            popupCharStylesEditorRef.current.style.opacity !== '1'
        ) {
            popupCharStylesEditorRef.current.style.pointerEvents = 'auto';
            popupCharStylesEditorRef.current.style.top = `${e.pageY + VERTICAL_OFFSET}px`;
            popupCharStylesEditorRef.current.style.left = `${e.pageX + HORIZONTAL_OFFSET}px`;
            popupCharStylesEditorRef.current.style.opacity = '1';
        }
    }

    useEffect(() => {
        if (popupCharStylesEditorRef?.current) {
            document.addEventListener('mousemove', mouseMoveListener);
            document.addEventListener('mouseup', mouseUpListener);

            return () => {
                document.removeEventListener('mousemove', mouseMoveListener);
                document.removeEventListener('mouseup', mouseUpListener);
            };
        }
    }, [popupCharStylesEditorRef]);

    return (
        <div
            ref={popupCharStylesEditorRef}
            style={{
                display: 'flex',
                left: 0,
                opacity: 0,
                position: 'absolute',
                top: 0,
                transition: 'opacity 150ms ease-in-out 100ms, transform 50ms ease-in-out',
                willChange: 'translate',
            }}>
            {editor.isEditable() && (
                <div>
                    <BasicFormatButtons
                        editor={editor}
                        isBold={isBold}
                        isItalic={isItalic}
                        isUnderline={isUnderline}
                    />
                </div>
            )}
        </div>
    );
}

function useFloatingTextFormatToolbar(
    editor: LexicalEditor,
    anchorElem: HTMLElement
): JSX.Element | null {
    const [isText, setIsText] = useState(false);
    const [isLink, setIsLink] = useState(false);
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrikethrough, setIsStrikethrough] = useState(false);
    const [isSubscript, setIsSubscript] = useState(false);
    const [isSuperscript, setIsSuperscript] = useState(false);
    const [isCode, setIsCode] = useState(false);

    const updatePopup = useCallback(() => {
        // console.log('selection change called');
        editor.getEditorState().read(() => {
            // Should not to pop up the floating toolbar when using IME input
            if (editor.isComposing()) {
                return;

                // const selection = $getSelection();
                // const nativeSelection = window.getSelection();
                // const rootElement = editor.getRootElement();

                // if (
                //     nativeSelection !== null &&
                //     (!$isRangeSelection(selection) ||
                //         rootElement === null ||
                //         !rootElement.contains(nativeSelection.anchorNode))
                // ) {
                //     setIsText(false);
                //     return;
                // }

                // if (!$isRangeSelection(selection)) {
                //     return;
                // }

                // const node = getSelectedNode(selection);

                // // Update text format
                // setIsBold(selection.hasFormat('bold'));
                // setIsItalic(selection.hasFormat('italic'));
                // setIsUnderline(selection.hasFormat('underline'));
                // setIsStrikethrough(selection.hasFormat('strikethrough'));
                // setIsSubscript(selection.hasFormat('subscript'));
                // setIsSuperscript(selection.hasFormat('superscript'));
                // setIsCode(selection.hasFormat('code'));

                // // Update links
                // const parent = node.getParent();
                // if ($isLinkNode(parent) || $isLinkNode(node)) {
                //     setIsLink(true);
                // } else {
                //     setIsLink(false);
                // }

                // if (
                //     !$isCodeHighlightNode(selection.anchor.getNode()) &&
                //     selection.getTextContent() !== ''
                // ) {
                //     setIsText($isTextNode(node));
                // } else {
                //     setIsText(false);
                // }

                // const rawTextContent = selection.getTextContent().replace(/\n/g, '');
                // if (!selection.isCollapsed() && rawTextContent === '') {
                //     setIsText(false);
                //     return;
                // }
            }
        });
    }, [editor]);

    useEffect(() => {
        document.addEventListener('selectionchange', updatePopup);
        return () => {
            document.removeEventListener('selectionchange', updatePopup);
        };
    }, [updatePopup]);

    useEffect(() => {
        return mergeRegister(
            editor.registerUpdateListener(() => {
                updatePopup();
            }),
            editor.registerRootListener(() => {
                if (editor.getRootElement() === null) {
                    setIsText(false);
                }
            })
        );
    }, [editor, updatePopup]);

    if (!isText || isLink) {
        return null;
    }

    return createPortal(
        <TextFormatFloatingToolbar
            editor={editor}
            anchorElem={anchorElem}
            isLink={isLink}
            isBold={isBold}
            isItalic={isItalic}
            isStrikethrough={isStrikethrough}
            isSubscript={isSubscript}
            isSuperscript={isSuperscript}
            isUnderline={isUnderline}
            isCode={isCode}
        />,
        anchorElem
    );
}

export function FloatingTextFormatToolbarPlugin({
    anchorElem = document.body,
}: {
    anchorElem?: HTMLElement;
}): JSX.Element | null {
    const [editor] = useLexicalComposerContext();
    return useFloatingTextFormatToolbar(editor, anchorElem);
}
