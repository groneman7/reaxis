import { CSSProperties, ReactNode } from 'react';
import {
    FORMAT_ELEMENT_COMMAND,
    FORMAT_TEXT_COMMAND,
    LexicalEditor,
    REDO_COMMAND,
    UNDO_COMMAND,
} from 'lexical';
import { supportedBlockTypes, SupportedBlockTypes } from '../../supportedBlockTypes';
import { Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { CgRedo, CgUndo } from 'react-icons/cg';
import {
    RxCaretDown,
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
import { VscSettings } from 'react-icons/vsc';
import { defaultStyle } from '../../style';

export const mapComponents: Record<'dev-options' | 'alignment-buttons', JSX.Element> = {
    'dev-options': <DevOptions />,
};

type Editor = { editor: LexicalEditor };
type ToolbarComponentContainerProps = {
    children?: ReactNode;
    style?: CSSProperties;
};
export function ToolbarComponentContainer({ children, style }: ToolbarComponentContainerProps) {
    return <div style={{ display: 'flex', gap: 4, ...style }}>{children}</div>;
}

//----------------------------------------------------------------

type DevOptionsProps = Editor;
export function DevOptions({ editor }: DevOptionsProps) {
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
    function onSerialize() {
        const json = editor.toJSON();
        const asString = JSON.stringify(json['editorState']);
        console.log(asString);
    }
    return (
        <Dropdown
            menu={{ items: devOptions }}
            placement="bottomRight"
            trigger={['click']}>
            <Button icon={<VscSettings color="#eb2f96" />} />
        </Dropdown>
    );
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
                style={{ ...defaultStyle['button'] }}
            />
            <Button
                aria-label="Center Align"
                icon={<RxTextAlignCenter />}
                onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')}
                style={{ ...defaultStyle['button'] }}
            />
            <Button
                aria-label="Right Align"
                icon={<RxTextAlignRight />}
                onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')}
                style={{ ...defaultStyle['button'] }}
            />
            <Button
                aria-label="Justify Align"
                icon={<RxTextAlignJustify />}
                onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')}
                style={{ ...defaultStyle['button'] }}
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
                style={{ ...defaultStyle['button'] }}
                type={isStrikethrough ? 'primary' : 'default'}
            />
            <Button
                aria-label="Insert Code"
                className={isCode ? 'active' : ''}
                icon={<RxCode />}
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code')}
                style={{ ...defaultStyle['button'] }}
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
                style={{ ...defaultStyle['button'] }}
                type={isBold ? 'primary' : 'default'}
            />
            <Button
                aria-label="Format Italics"
                className={isItalic ? 'active' : ''}
                icon={<RxFontItalic />}
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
                style={{ ...defaultStyle['button'] }}
                type={isItalic ? 'primary' : 'default'}
            />
            <Button
                aria-label="Format Underline"
                className={isUnderline ? 'active' : ''}
                icon={<RxUnderline />}
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
                style={{ ...defaultStyle['button'] }}
                type={isUnderline ? 'primary' : 'default'}
            />
        </ToolbarComponentContainer>
    );
}

//----------------------------------------------------------------

type BlockSelectorProps = Editor & {
    allowedBlocks: SupportedBlockTypes[];
};
export function BlockSelector({ editor, allowedBlocks }: BlockSelectorProps) {
    const items: MenuProps['items'] = allowedBlocks.map((block) => {
        const selected = supportedBlockTypes[block];
        return {
            key: selected.key,
            icon: selected.icon || null,
            label: selected.label,
            onClick: () => {
                selected.format ? selected.format(editor) : void null;
            },
        };
    });

    return (
        <ToolbarComponentContainer>
            <Dropdown
                menu={{ items }}
                trigger={['click']}>
                <Button style={{ ...defaultStyle['button'] }}>
                    Format
                    <RxCaretDown style={{ marginLeft: 2, marginRight: -6 }} />
                </Button>
            </Dropdown>
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
                style={{ ...defaultStyle['button'] }}
            />
            <Button
                aria-label="Redo"
                className=""
                disabled={!canRedo}
                icon={<CgRedo />}
                onClick={() => editor.dispatchCommand(REDO_COMMAND, void null)}
                style={{ ...defaultStyle['button'] }}
            />
        </ToolbarComponentContainer>
    );
}
