import {
    // EditorConfig,
    ElementNode,
    // LexicalEditor,
    LexicalNode,
    NodeKey,
    SerializedElementNode,
    Spread,
} from 'lexical';
import './clozeNode.css';

export type SerializedClozeNode = Spread<
    {
        text: string;
        hint: string;
        index: number;
        type: 'cloze';
        version: 1;
    },
    SerializedElementNode
>;

export class ClozeNode extends ElementNode {
    __text: string;
    __hint: string;
    __index: number;

    static getType(): string {
        return 'cloze';
    }

    static clone(node: ClozeNode): ClozeNode {
        return new ClozeNode(node.__text, node.__hint, node.__index, node.__key);
    }

    constructor(text: string, hint: string, index: number, key?: NodeKey) {
        super(key);
        this.__text = text;
        this.__hint = hint;
        this.__index = index;
    }

    createDOM(/* config: EditorConfig, editor: LexicalEditor */): HTMLElement {
        const clozeContainer = document.createElement('span');
        clozeContainer.classList.add('cloze-container');
        return clozeContainer;
    }

    updateDOM() {
        return false;
    }

    static importJSON(serializedNode: SerializedClozeNode): ClozeNode {
        return $createClozeNode(serializedNode.text, serializedNode.hint, serializedNode.index);
    }

    exportJSON(): SerializedClozeNode {
        return {
            ...super.exportJSON(),
            text: this.__text,
            hint: this.__hint,
            index: this.__index,
            type: 'cloze',
            version: 1,
        };
    }

    collapseAtStart(/* _selection: RangeSelection */): boolean {
        this.getParentOrThrow().insertBefore(this);
        return true;
    }
}

export function $createClozeNode(text: string, hint: string, index: number): ClozeNode {
    return new ClozeNode(text, hint, index);
}

export function $isClozeNode(node: LexicalNode | null | undefined): node is ClozeNode {
    return node instanceof ClozeNode;
}
