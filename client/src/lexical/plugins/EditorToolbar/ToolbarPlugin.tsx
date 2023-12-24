import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import {
    CAN_REDO_COMMAND,
    CAN_UNDO_COMMAND,
    SELECTION_CHANGE_COMMAND,
    $getSelection,
    $isRangeSelection,
    $nodesOfType,
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
    ClozeButton,
    LinkButton,
    UndoRedoButtons,
} from './';
import type { SupportedBlockTypes } from '../../utils/blockTypes';
import { defaultStyle } from '../../utils/style';
import React from 'react';
import { $isClozeNode, ClozeNode } from '../../nodes';

const LowPriority = 1;

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

function determineMaxCloze(): number {
    const clozeNodes = $nodesOfType(ClozeNode);
    const variants = clozeNodes.map((node: ClozeNode) => {
        return node.getVariant();
    });
    const sorted = variants.sort((a: number, b: number) => b - a);
    return sorted[0];
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
        'cloze-button',
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
    const [clozeVariant, setClozeVariant] = useState<null | number>(null);
    const [maxCloze, setMaxCloze] = useState<number>(0);
    const [isRTL, setIsRTL] = useState(false);
    const [selectedLink, setSelectedLink] = useState(null);
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrikethrough, setIsStrikethrough] = useState(false);
    const [isCode, setIsCode] = useState(false);

    const mapToolbarComponents: Record<SupportedComponents, JSX.Element> = {
        'dev-options': <DevOptions editor={editor} />,
        'cloze-button': (
            <ClozeButton
                editor={editor}
                clozeVariant={clozeVariant}
                maxCloze={maxCloze}
            />
        ),
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

            // Update Cloze
            if ($isClozeNode(parent) || $isClozeNode(node)) {
                setClozeVariant(parent.__variant || node.__variant);
            } else {
                setClozeVariant(null);
            }
            setMaxCloze(determineMaxCloze());
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
