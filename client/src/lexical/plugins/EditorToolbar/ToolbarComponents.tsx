import { CSSProperties, ReactNode } from 'react';
import {
    FORMAT_ELEMENT_COMMAND,
    FORMAT_TEXT_COMMAND,
    LexicalEditor,
    REDO_COMMAND,
    UNDO_COMMAND,
} from 'lexical';
import { Button } from 'antd';
import { CgRedo, CgUndo } from 'react-icons/cg';
import {
    RxCode,
    RxFontBold,
    RxFontItalic,
    RxStrikethrough,
    RxTextAlignCenter,
    RxTextAlignJustify,
    RxTextAlignLeft,
    RxTextAlignRight,
    RxUnderline,
} from 'react-icons/rx';

type Editor = { editor: LexicalEditor };

type ToolbarComponentContainerProps = {
    children?: ReactNode;
    style?: CSSProperties;
};
export function ToolbarComponentContainer({ children, style }: ToolbarComponentContainerProps) {
    return <div style={{ display: 'flex', gap: 4, ...style }}>{children}</div>;
}

//----------------------------------------------------------------

type AlignmentProps = Editor;
export function AlignmentButtons({ editor }: AlignmentProps) {
    return (
        <ToolbarComponentContainer style={{ gap: 0 }}>
            <Button
                aria-label="Left Align"
                icon={<RxTextAlignLeft />}
                onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')}
            />
            <Button
                aria-label="Center Align"
                icon={<RxTextAlignCenter />}
                onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')}
            />
            <Button
                aria-label="Right Align"
                icon={<RxTextAlignRight />}
                onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')}
            />
            <Button
                aria-label="Justify Align"
                icon={<RxTextAlignJustify />}
                onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')}
            />
        </ToolbarComponentContainer>
    );
}

//----------------------------------------------------------------

type AdvancedFormatProps = Editor & {
    isCode: boolean;
    isStrikethrough: boolean;
};
export function AdvancedFormatButtons({
    editor,
    isCode,
    isStrikethrough,
}: AdvancedFormatProps) {
    return (
        <ToolbarComponentContainer>
            <Button
                aria-label="Format Strikethrough"
                className={isStrikethrough ? 'active' : ''}
                icon={<RxStrikethrough />}
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')}
                type={isStrikethrough ? 'primary' : 'default'}
            />
            <Button
                aria-label="Insert Code"
                className={isCode ? 'active' : ''}
                icon={<RxCode />}
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code')}
                type={isCode ? 'primary' : 'default'}
            />
        </ToolbarComponentContainer>
    );
}

//----------------------------------------------------------------

type BasicFormatProps = Editor & {
    isBold: boolean;
    isItalic: boolean;
    isUnderline: boolean;
};
export function BasicFormatButtons({
    editor,
    isBold,
    isItalic,
    isUnderline,
}: BasicFormatProps) {
    return (
        <ToolbarComponentContainer style={{ gap: 0 }}>
            <Button
                aria-label="Format Bold"
                className={isBold ? 'active' : ''}
                icon={<RxFontBold />}
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
                type={isBold ? 'primary' : 'default'}
            />
            <Button
                aria-label="Format Italics"
                className={isItalic ? 'active' : ''}
                icon={<RxFontItalic />}
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
                type={isItalic ? 'primary' : 'default'}
            />
            <Button
                aria-label="Format Underline"
                className={isUnderline ? 'active' : ''}
                icon={<RxUnderline />}
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
                type={isUnderline ? 'primary' : 'default'}
            />
        </ToolbarComponentContainer>
    );
}

//----------------------------------------------------------------

type UndoRedoProps = Editor & {
    canUndo: boolean;
    canRedo: boolean;
};
export function UndoRedoButtons({ editor, canUndo, canRedo }: UndoRedoProps) {
    return (
        <ToolbarComponentContainer>
            <Button
                aria-label="Undo"
                className=""
                disabled={!canUndo}
                icon={<CgUndo />}
                onClick={() => editor.dispatchCommand(UNDO_COMMAND, void null)}
            />
            <Button
                aria-label="Redo"
                className=""
                disabled={!canRedo}
                icon={<CgRedo />}
                onClick={() => editor.dispatchCommand(REDO_COMMAND, void null)}
            />
        </ToolbarComponentContainer>
    );
}
