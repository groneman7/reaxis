import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import {
    CAN_REDO_COMMAND,
    CAN_UNDO_COMMAND,
    SELECTION_CHANGE_COMMAND,
    $getSelection,
    $isRangeSelection,
    $createParagraphNode,
    // $getNodeByKey,
} from 'lexical';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { $isParentElementRTL, $wrapNodes, $isAtNodeEnd } from '@lexical/selection';
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import {
    INSERT_ORDERED_LIST_COMMAND,
    INSERT_UNORDERED_LIST_COMMAND,
    REMOVE_LIST_COMMAND,
    $isListNode,
    ListNode,
} from '@lexical/list';
import { $createHeadingNode, $createQuoteNode, $isHeadingNode } from '@lexical/rich-text';
import {
    $createCodeNode,
    // $isCodeNode,
    // getDefaultCodeLanguage,
    // getCodeLanguages,
} from '@lexical/code';
import { Button, Divider, Dropdown } from 'antd';
import type { MenuProps } from 'antd';

import { VscSettings } from 'react-icons/vsc';

import {
    AdvancedFormatButtons,
    AlignmentButtons,
    BasicFormatButtons,
    UndoRedoButtons,
} from './';

const LowPriority = 1;

// type SupportedBlockTypes =
//     | 'paragraph'
//     | 'h1'
//     | 'h2'
//     | 'h3'
//     | 'h4'
//     | 'h5'
//     | 'h6'
//     | 'quote'
//     | 'callout'
//     | 'code'
//     | 'ul'
//     | 'ol';

const supportedBlockTypes = [
    { type: 'paragraph', name: 'Normal' },
    { type: 'h4', name: 'Heading' },
    { type: 'h5', name: 'Subheading' },
    { type: 'quote', name: 'Quotes' },
    { type: 'code', name: 'Code' },
    { type: 'ul', name: 'Bulleted List' },
    { type: 'ol', name: 'Numbered List' },
];

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

function BlockOptionsDropdownMenuItems({
    editor,
    blockType,
}: {
    editor: any;
    blockType: string;
}): MenuProps['items'] {
    function formatBlock(desiredType: string) {
        if (blockType === desiredType) {
            if (desiredType !== 'ul' && desiredType !== 'ol') {
                editor.update(() => {
                    const selection = $getSelection();

                    if ($isRangeSelection(selection)) {
                        $wrapNodes(selection, () => $createParagraphNode());
                    }
                });
            } else {
                editor.dispatchCommand(REMOVE_LIST_COMMAND);
            }
        } else {
            blockType !== desiredType;
            switch (desiredType) {
                case 'paragraph':
                    editor.update(() => {
                        const selection = $getSelection();

                        if ($isRangeSelection(selection)) {
                            $wrapNodes(selection, () => $createParagraphNode());
                        }
                    });
                    break;
                case 'h4':
                    editor.update(() => {
                        const selection = $getSelection();

                        if ($isRangeSelection(selection)) {
                            $wrapNodes(selection, () => $createHeadingNode('h4'));
                        }
                    });
                    break;
                case 'h5':
                    editor.update(() => {
                        const selection = $getSelection();

                        if ($isRangeSelection(selection)) {
                            $wrapNodes(selection, () => $createHeadingNode('h5'));
                        }
                    });
                    break;
                case 'quote':
                    editor.update(() => {
                        const selection = $getSelection();

                        if ($isRangeSelection(selection)) {
                            $wrapNodes(selection, () => $createQuoteNode());
                        }
                    });
                    break;
                case 'code':
                    editor.update(() => {
                        const selection = $getSelection();

                        if ($isRangeSelection(selection)) {
                            $wrapNodes(selection, () => $createCodeNode());
                        }
                    });
                    break;
                case 'ul':
                    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND);
                    break;
                case 'ol':
                    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND);
                    break;
            }
        }
    }

    return supportedBlockTypes.map((t) => {
        return {
            key: t.type,
            label: t.name,
            onClick: () => formatBlock(t.type),
        };
    });
}

type ToolbarPluginProps = {
    className?: string;
    style?: CSSProperties;
};

export function ToolbarPlugin({ className, style }: ToolbarPluginProps) {
    const [editor] = useLexicalComposerContext();
    const toolbarRef = useRef(null);
    const [canUndo, setCanUndo] = useState(false);
    const [canRedo, setCanRedo] = useState(false);
    const [blockType, setBlockType] = useState('paragraph');
    const [selectedElementKey, setSelectedElementKey] = useState(null);
    // const [codeLanguage, setCodeLanguage] = useState('');
    const [isRTL, setIsRTL] = useState(false);
    const [isLink, setIsLink] = useState(false);
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrikethrough, setIsStrikethrough] = useState(false);
    const [isCode, setIsCode] = useState(false);

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
                setIsLink(true);
            } else {
                setIsLink(false);
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

    const insertLink = useCallback(() => {
        if (!isLink) {
            editor.dispatchCommand(TOGGLE_LINK_COMMAND, 'https://');
        } else {
            editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
        }
    }, [editor, isLink]);

    function onSerialize() {
        const json = editor.toJSON();
        const asString = JSON.stringify(json['editorState']);
        console.log(asString);
    }

    const defaultToolbarStyle: CSSProperties = {
        alignItems: 'center',
        background: '#e6f4ff',
        display: 'flex',
        flex: 1,
        gap: 4,
        justifyContent: 'flex-start',
        padding: 4,
    };

    const devOptions: MenuProps['items'] = [
        {
            key: 'main',
            type: 'group',
            label: 'Export',
            children: [
                {
                    key: 'serialize',
                    label: 'Serialize',
                    onClick: onSerialize,
                },
                {
                    key: 'clear-editor',
                    label: 'Clear Editor',
                    disabled: true,
                },
            ],
        },
    ];

    return (
        <div
            className={className}
            ref={toolbarRef}
            style={{ ...defaultToolbarStyle, ...style }}>
            <UndoRedoButtons
                editor={editor}
                canUndo={canUndo}
                canRedo={canRedo}
            />
            <Divider type="vertical" />
            {supportedBlockTypes.find((f) => f.type === blockType) && (
                <>
                    <Dropdown
                        menu={{
                            items: BlockOptionsDropdownMenuItems({
                                editor: editor,
                                blockType: blockType,
                            }),
                        }}
                        trigger={['click']}>
                        <Button>{supportedBlockTypes.find((f) => f.type)!['name']}</Button>
                    </Dropdown>
                    <Divider type="vertical" />
                </>
            )}
            {blockType === 'code' ? (
                <>
                    {/* <Select
                        className="toolbar-item code-language"
                        onChange={onCodeLanguageSelect}
                        options={codeLanguges}
                        value={codeLanguage}
                    />
                    <i className="chevron-down inside" /> */}
                </>
            ) : (
                <>
                    <BasicFormatButtons
                        editor={editor}
                        isBold={isBold}
                        isItalic={isItalic}
                        isUnderline={isUnderline}
                    />
                    <AdvancedFormatButtons
                        editor={editor}
                        isCode={isCode}
                        isStrikethrough={isStrikethrough}
                    />
                    <Button
                        aria-label="Insert Link"
                        className={isLink ? 'active' : ''}
                        onClick={insertLink}
                        type={isLink ? 'primary' : 'default'}>
                        Link
                    </Button>
                    <Divider type="vertical" />
                    <AlignmentButtons editor={editor} />
                    <Divider type="vertical" />
                    <Dropdown
                        menu={{ items: devOptions }}
                        placement="bottomRight"
                        trigger={['click']}>
                        <Button icon={<VscSettings color="#eb2f96" />} />
                    </Dropdown>
                </>
            )}
        </div>
    );
}
