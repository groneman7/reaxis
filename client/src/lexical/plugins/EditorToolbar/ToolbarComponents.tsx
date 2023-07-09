import { CSSProperties, ReactNode, useCallback, useEffect, useState } from 'react';
import {
    FORMAT_ELEMENT_COMMAND,
    FORMAT_TEXT_COMMAND,
    LexicalEditor,
    REDO_COMMAND,
    UNDO_COMMAND,
} from 'lexical';
import { supportedBlockTypes, SupportedBlockTypes } from '../../utils/blockTypes';
import { Button, Dropdown, Form, Input, Popover } from 'antd';
import type { MenuProps } from 'antd';
import { CgRedo, CgTrash, CgUndo } from 'react-icons/cg';
import {
    RxCaretDown,
    RxCode,
    RxFontBold,
    RxFontItalic,
    RxLink1,
    RxStrikethrough,
    RxTextAlignCenter,
    RxTextAlignJustify,
    RxTextAlignLeft,
    RxTextAlignRight,
    RxUnderline,
} from 'react-icons/rx';
import { VscSettings } from 'react-icons/vsc';
import { defaultStyle } from '../../utils/style';
import { TOGGLE_LINK_COMMAND } from '@lexical/link';
import { sanitizeUrl } from '../../utils';
import { TOGGLE_TEST_DECORATOR } from '../../nodes';

export type SupportedComponents =
    | 'dev-options'
    | 'test-dec'
    | 'alignment-buttons'
    | 'advanced-format-buttons'
    | 'basic-format-buttons'
    | 'block-selector'
    | 'link-button'
    | 'undo-redo-buttons';

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
        <>
            <div style={{ display: 'flex', flex: 1 }}></div>
            <Dropdown
                menu={{ items: devOptions }}
                placement="bottomRight"
                trigger={['click']}>
                <Button icon={<VscSettings color="#eb2f96" />} />
            </Dropdown>
        </>
    );
}

//----------------------------------------------------------------

export function TestDecoratorButton({ editor }: Editor) {
    return (
        <ToolbarComponentContainer>
            <Button onClick={() => editor.dispatchCommand(TOGGLE_TEST_DECORATOR, 'test-class')}>
                Dec
            </Button>
        </ToolbarComponentContainer>
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
                style={{
                    ...defaultStyle['button'],
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                }}
                type={isBold ? 'primary' : 'default'}
            />
            <Button
                aria-label="Format Italics"
                className={isItalic ? 'active' : ''}
                icon={<RxFontItalic />}
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
                style={{ ...defaultStyle['button'], borderRadius: 0 }}
                type={isItalic ? 'primary' : 'default'}
            />
            <Button
                aria-label="Format Underline"
                className={isUnderline ? 'active' : ''}
                icon={<RxUnderline />}
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
                style={{
                    ...defaultStyle['button'],
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                }}
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

type LinkButtonProps = Editor & {
    link: string | null;
};
export function LinkButton({ editor, link }: LinkButtonProps) {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const url = Form.useWatch('url', form);

    useEffect(() => {
        form.setFieldValue('url', link);
    }, [link]);

    const removeLink = () => {
        editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
        setOpen(false);
    };

    const updateLink = () => {
        editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl(url));
        setOpen(false);
    };

    return (
        <ToolbarComponentContainer>
            <Popover
                content={
                    <Form
                        colon={false}
                        form={form}
                        layout="vertical">
                        <Form.Item
                            label="URL"
                            name="url">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Text">
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <div style={{ display: 'flex' }}>
                                <Button
                                    onClick={removeLink}
                                    type="ghost"
                                    style={{ ...defaultStyle['button'] }}>
                                    <CgTrash />
                                </Button>
                                <div style={{ flex: 1 }}></div>
                                <Button
                                    onClick={updateLink}
                                    type="primary">
                                    {!link ? 'Insert' : 'Update'}
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                }
                open={open}
                onOpenChange={() => setOpen(!open)}
                title={!link ? 'Insert Link' : 'Update Link'}
                trigger="click">
                <Button
                    aria-label="Insert or edit link"
                    icon={<RxLink1 />}
                    style={{ ...defaultStyle['button'] }}
                    type={!link ? 'default' : 'primary'}
                />
            </Popover>
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
