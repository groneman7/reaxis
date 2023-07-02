import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import {
    CAN_REDO_COMMAND,
    CAN_UNDO_COMMAND,
    SELECTION_CHANGE_COMMAND,
    $getSelection,
    $isRangeSelection,
    // $getNodeByKey,
} from 'lexical';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { $isParentElementRTL, $isAtNodeEnd } from '@lexical/selection';
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import { $isListNode, ListNode } from '@lexical/list';
import { $isHeadingNode } from '@lexical/rich-text';
import {
    SupportedComponents,
    DevOptions,
    AdvancedFormatButtons,
    AlignmentButtons,
    BasicFormatButtons,
    BlockSelector,
    LinkButton,
    UndoRedoButtons,
} from './';
import type { SupportedBlockTypes } from '../../utils/blockTypes';
import { defaultStyle } from '../../utils/style';
import React from 'react';

const LowPriority = 1;

// ** Default floating link editor **
// function positionEditorElement(editor, rect) {
//     if (rect === null) {
//         editor.style.opacity = '0';
//         editor.style.top = '-1000px';
//         editor.style.left = '-1000px';
//     } else {
//         editor.style.opacity = '1';
//         editor.style.top = `${rect.top + rect.height + window.pageYOffset + 10}px`;
//         editor.style.left = `${
//             rect.left + window.pageXOffset - editor.offsetWidth / 2 + rect.width / 2
//         }px`;
//     }
// }

// function FloatingLinkEditor({ editor }) {
//     const editorRef = useRef(null);
//     const inputRef = useRef(null);
//     const mouseDownRef = useRef(false);
//     const [linkUrl, setLinkUrl] = useState('');
//     const [isEditMode, setEditMode] = useState(false);
//     const [lastSelection, setLastSelection] = useState(null);

//     const updateLinkEditor = useCallback(() => {
//         const selection = $getSelection();
//         if ($isRangeSelection(selection)) {
//             const node = getSelectedNode(selection);
//             const parent = node.getParent();
//             if ($isLinkNode(parent)) {
//                 setLinkUrl(parent.getURL());
//             } else if ($isLinkNode(node)) {
//                 setLinkUrl(node.getURL());
//             } else {
//                 setLinkUrl('');
//             }
//         }
//         const editorElem = editorRef.current;
//         const nativeSelection = window.getSelection();
//         const activeElement = document.activeElement;

//         if (editorElem === null) {
//             return;
//         }

//         const rootElement = editor.getRootElement();
//         if (
//             selection !== null &&
//             nativeSelection &&
//             !nativeSelection.isCollapsed &&
//             rootElement !== null &&
//             rootElement.contains(nativeSelection.anchorNode)
//         ) {
//             const domRange = nativeSelection.getRangeAt(0);
//             let rect;
//             if (nativeSelection.anchorNode === rootElement) {
//                 let inner = rootElement;
//                 while (inner.firstElementChild != null) {
//                     inner = inner.firstElementChild;
//                 }
//                 rect = inner.getBoundingClientRect();
//             } else {
//                 rect = domRange.getBoundingClientRect();
//             }

//             if (!mouseDownRef.current) {
//                 positionEditorElement(editorElem, rect);
//             }
//             setLastSelection(selection);
//         } else if (!activeElement || activeElement.className !== 'link-input') {
//             positionEditorElement(editorElem, null);
//             setLastSelection(null);
//             setEditMode(false);
//             setLinkUrl('');
//         }

//         return true;
//     }, [editor]);

//     useEffect(() => {
//         return mergeRegister(
//             editor.registerUpdateListener(({ editorState }) => {
//                 editorState.read(() => {
//                     updateLinkEditor();
//                 });
//             }),

//             editor.registerCommand(
//                 SELECTION_CHANGE_COMMAND,
//                 () => {
//                     updateLinkEditor();
//                     return true;
//                 },
//                 LowPriority
//             )
//         );
//     }, [editor, updateLinkEditor]);

//     useEffect(() => {
//         editor.getEditorState().read(() => {
//             updateLinkEditor();
//         });
//     }, [editor, updateLinkEditor]);

//     useEffect(() => {
//         if (isEditMode && inputRef.current) {
//             inputRef.current.focus();
//         }
//     }, [isEditMode]);

//     return (
//         <div
//             ref={editorRef}
//             className="link-editor">
//             {isEditMode ? (
//                 <input
//                     ref={inputRef}
//                     className="link-input"
//                     value={linkUrl}
//                     onChange={(event) => {
//                         setLinkUrl(event.target.value);
//                     }}
//                     onKeyDown={(event) => {
//                         if (event.key === 'Enter') {
//                             event.preventDefault();
//                             if (lastSelection !== null) {
//                                 if (linkUrl !== '') {
//                                     editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);
//                                 }
//                                 setEditMode(false);
//                             }
//                         } else if (event.key === 'Escape') {
//                             event.preventDefault();
//                             setEditMode(false);
//                         }
//                     }}
//                 />
//             ) : (
//                 <>
//                     <div className="link-input">
//                         <a
//                             href={linkUrl}
//                             target="_blank"
//                             rel="noopener noreferrer">
//                             {linkUrl}
//                         </a>
//                         <div
//                             className="link-edit"
//                             role="button"
//                             tabIndex={0}
//                             onMouseDown={(event) => event.preventDefault()}
//                             onClick={() => {
//                                 setEditMode(true);
//                             }}
//                         />
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// }

// This function was used for changing the code language in Code blocks.
// function Select({ onChange, className, options, value }) {
//     return (
//         <select
//             className={className}
//             onChange={onChange}
//             value={value}>
//             <option
//                 hidden={true}
//                 value=""
//             />
//             {options.map((option) => (
//                 <option
//                     key={option}
//                     value={option}>
//                     {option}
//                 </option>
//             ))}
//         </select>
//     );
// }

function getSelectedNode(selection: any) {
    const anchor = selection.anchor;
    const focus = selection.focus;
    const anchorNode = selection.anchor.getNode();
    const focusNode = selection.focus.getNode();
    if (anchorNode === focusNode) {
        return anchorNode;
    }
    const isBackward = selection.isBackward();
    if (isBackward) {
        return $isAtNodeEnd(focus) ? anchorNode : focusNode;
    } else {
        return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
    }
}

type ToolbarPluginProps = {
    allowedBlocks?: SupportedBlockTypes[];
    components?: SupportedComponents[];
    style?: CSSProperties;
};
export function ToolbarPlugin({
    allowedBlocks = [
        'paragraph',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'code',
        'quote',
        'callout',
        'ul',
        'ol',
    ],
    components = [
        'undo-redo-buttons',
        'block-selector',
        'basic-format-buttons',
        'advanced-format-buttons',
        'alignment-buttons',
        'link-button',
        'dev-options',
    ],
    style,
}: ToolbarPluginProps) {
    const [editor] = useLexicalComposerContext();
    const toolbarRef = useRef(null);
    const [canUndo, setCanUndo] = useState(false);
    const [canRedo, setCanRedo] = useState(false);
    const [blockType, setBlockType] = useState('paragraph');
    const [selectedElementKey, setSelectedElementKey] = useState(null);
    // const [codeLanguage, setCodeLanguage] = useState('');
    const [isRTL, setIsRTL] = useState(false);
    const [selectedLink, setSelectedLink] = useState(null);
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrikethrough, setIsStrikethrough] = useState(false);
    const [isCode, setIsCode] = useState(false);

    const mapToolbarComponents: Record<SupportedComponents, JSX.Element> = {
        'dev-options': <DevOptions editor={editor} />,
        'advanced-format-buttons': (
            <AdvancedFormatButtons
                editor={editor}
                isCode={isCode}
                isStrikethrough={isStrikethrough}
            />
        ),
        'alignment-buttons': <AlignmentButtons editor={editor} />,
        'basic-format-buttons': (
            <BasicFormatButtons
                editor={editor}
                isBold={isBold}
                isItalic={isItalic}
                isUnderline={isUnderline}
            />
        ),
        'block-selector': (
            <BlockSelector
                editor={editor}
                allowedBlocks={allowedBlocks}
            />
        ),
        'link-button': (
            <LinkButton
                editor={editor}
                link={selectedLink}
            />
        ),
        'undo-redo-buttons': (
            <UndoRedoButtons
                editor={editor}
                canRedo={canRedo}
                canUndo={canUndo}
            />
        ),
    };

    const updateToolbar = useCallback(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            const anchorNode = selection.anchor.getNode();
            const element =
                anchorNode.getKey() === 'root'
                    ? anchorNode
                    : anchorNode.getTopLevelElementOrThrow();
            const elementKey = element.getKey();
            const elementDOM = editor.getElementByKey(elementKey);
            if (elementDOM !== null) {
                setSelectedElementKey(elementKey);
                if ($isListNode(element)) {
                    const parentList = $getNearestNodeOfType(anchorNode, ListNode);
                    const type = parentList ? parentList.getTag() : element.getTag();
                    setBlockType(type);
                } else {
                    const type = $isHeadingNode(element) ? element.getTag() : element.getType();
                    setBlockType(type);
                }
            }
            // Update text format
            setIsBold(selection.hasFormat('bold'));
            setIsItalic(selection.hasFormat('italic'));
            setIsUnderline(selection.hasFormat('underline'));
            setIsStrikethrough(selection.hasFormat('strikethrough'));
            setIsCode(selection.hasFormat('code'));
            setIsRTL($isParentElementRTL(selection));

            // Update links
            const node = getSelectedNode(selection);
            const parent = node.getParent();
            if ($isLinkNode(parent) || $isLinkNode(node)) {
                setSelectedLink(parent.__url || node.__url);
            } else {
                setSelectedLink(null);
            }
        }
    }, [editor]);

    useEffect(() => {
        return mergeRegister(
            editor.registerUpdateListener(({ editorState }) => {
                editorState.read(() => {
                    updateToolbar();
                });
            }),
            editor.registerCommand(
                SELECTION_CHANGE_COMMAND,
                (_payload, newEditor) => {
                    updateToolbar();
                    return false;
                },
                LowPriority
            ),
            editor.registerCommand(
                CAN_UNDO_COMMAND,
                (payload) => {
                    setCanUndo(payload);
                    return false;
                },
                LowPriority
            ),
            editor.registerCommand(
                CAN_REDO_COMMAND,
                (payload) => {
                    setCanRedo(payload);
                    return false;
                },
                LowPriority
            )
        );
    }, [editor, updateToolbar]);

    return (
        <div
            ref={toolbarRef}
            style={{ ...defaultStyle['toolbar'], ...style }}>
            {components.map((c) => (
                <React.Fragment key={c}>{mapToolbarComponents[c]}</React.Fragment>
            ))}
        </div>
    );
}
