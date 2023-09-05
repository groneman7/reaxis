import { ElementNode } from 'lexical';
import { NodeEventPlugin } from '@lexical/react/LexicalNodeEventPlugin';

type PluginProps = {
    onReset: (e: Event) => void;
};
export function ResetClickPlugin({ onReset }: PluginProps) {
    return (
        <NodeEventPlugin
            nodeType={ElementNode}
            eventType={'click'}
            eventListener={(e: Event) => onReset(e)}
        />
    );
}
