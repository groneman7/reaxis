import {
    $createParagraphNode,
    ElementNode,
    LexicalNode,
    ParagraphNode,
    RangeSelection,
    SerializedElementNode,
} from 'lexical';
import utils from '@lexical/utils';

export class CalloutNode extends ElementNode {
    static getType(): string {
        return 'callout';
    }

    static clone(node: ElementNode): ElementNode {
        return new CalloutNode(node.__key);
    }

    createDOM(config: any): HTMLElement {
        const element = document.createElement('div');
        utils.addClassNamesToElement(element, config.theme.callout);
        return element;
    }

    updateDOM(prevNode: CalloutNode, dom: HTMLElement): boolean {
        return false;
    }

    static importJSON(serializedNode: SerializedElementNode) {
        const node = $createCalloutNode();
        node.setFormat(serializedNode.format);
        node.setIndent(serializedNode.indent);
        node.setDirection(serializedNode.direction);
        return node;
    }

    exportJSON() {
        return { ...super.exportJSON(), type: 'callout', version: 1 };
    }

    insertNewAfter(_: RangeSelection, restoreSelection?: boolean): ParagraphNode {
        const newBlock = $createParagraphNode();
        const direction = this.getDirection();
        newBlock.setDirection(direction);
        this.insertAfter(newBlock, restoreSelection);
        return newBlock;
    }

    collapseAtStart(): true {
        const paragraph = $createParagraphNode();
        const children = this.getChildren();
        children.forEach((child) => paragraph.append(child));
        this.replace(paragraph);
        return true;
    }
}

export function $createCalloutNode(): ElementNode {
    return new CalloutNode();
}

export function $isCalloutNode(node: LexicalNode | null | undefined): node is CalloutNode {
    return node instanceof CalloutNode;
}
