import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ElementNode } from 'lexical';
import { NodeEventPlugin } from '@lexical/react/LexicalNodeEventPlugin';
import { ResetClickPlugin } from './ResetClickPlugin';
import { Popover } from 'antd';

const OFFSET_X = 8;
const OFFSET_Y = 8;

export function ContextMenuPlugin() {
    const [open, setOpen] = useState(false);
    const [event, setEvent] = useState<MouseEvent | null>(null);

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
            <ResetClickPlugin onReset={() => setOpen(false)} />
            <NodeEventPlugin
                nodeType={ElementNode}
                eventType="contextmenu"
                eventListener={(e: Event) => {
                    e.preventDefault();
                    setEvent(e as MouseEvent);
                    setOpen(true);
                }}
            />
            <NodeEventPlugin
                nodeType={ElementNode}
                eventType="blur"
                eventListener={(e: Event) => {
                    console.log('blur');
                    setEvent(null);
                    setOpen(false);
                }}
            />
            {open && <Portal />}
        </>
    );
}
