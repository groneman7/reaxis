import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ElementNode, $getSelection } from 'lexical';
import { NodeEventPlugin } from '@lexical/react/LexicalNodeEventPlugin';
import { Popover } from 'antd';

const OFFSET_X = 8;
const OFFSET_Y = 8;

export function TextSelectionPlugin() {
    const [event, setEvent] = useState<MouseEvent | null>(null);
    const [selection, setSelection] = useState<string | null>(null);
    const [open, setOpen] = useState(false);

    function Portal() {
        return createPortal(
            <Popover
                arrow={false}
                open={open}
                placement="bottomLeft"
                content={<div>test</div>}>
                <div
                    style={{
                        position: 'absolute',
                        top: event ? event.pageY + OFFSET_Y : 0,
                        left: event ? event.pageX + OFFSET_X : 0,
                    }}></div>
            </Popover>,
            document.body
        );
    }

    return (
        <>
            <NodeEventPlugin
                nodeType={ElementNode}
                eventType={'mouseup'}
                eventListener={(e: Event) => {
                    const sel = $getSelection()?.getTextContent();
                    if (sel !== selection) {
                        if (sel) {
                            setEvent(e as MouseEvent);
                            setOpen(true);
                        } else {
                            setOpen(false);
                            setSelection(null);
                        }
                    } else {
                        setSelection(null);
                    }
                }}
            />
            <NodeEventPlugin
                nodeType={ElementNode}
                eventType={'mousemove'}
                eventListener={(e: Event) => {
                    const mouse = e as MouseEvent;
                    if (open && event) {
                        const [diffX, diffY] = [
                            Math.abs(mouse.clientX - event.clientX),
                            Math.abs(mouse.clientY - event.clientY),
                        ];
                        const distance = Math.sqrt(diffX * diffX + diffY * diffY);
                        if (distance >= 32) {
                            setOpen(false);
                            setEvent(null);
                        }
                    }
                }}
            />
            {open && <Portal />}
        </>
    );
}
