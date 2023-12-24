import {
    $createParagraphNode,
    $getSelection,
    $isElementNode,
    $isRangeSelection,
    // EditorConfig,
    ElementNode,
    LexicalCommand,
    // LexicalEditor,
    LexicalNode,
    NodeKey,
    ParagraphNode,
    RangeSelection,
    SerializedElementNode,
    Spread,
    createCommand,
} from 'lexical';
import './clozeNode.css';
import { addClassNamesToElement, removeClassNamesFromElement } from '@lexical/utils';

export const CLOZE_COMMAND: LexicalCommand<boolean | number> = createCommand('CLOZE_COMMAND');

export type SerializedClozeNode = Spread<
    {
        variant: number;
        hint: string | null;
        type: 'cloze';
        version: 1;
    },
    SerializedElementNode
>;

export class ClozeNode extends ElementNode {
    __variant: number;
    __hint: string | null;
    __revealed: boolean;

    static getType(): string {
        return 'cloze';
    }

    static clone(node: ClozeNode): ClozeNode {
        return new ClozeNode(node.__variant, node.__hint, node.__key);
    }

    constructor(variant: number, hint: string | null, key?: NodeKey) {
        super(key);
        this.__variant = variant;
        this.__hint = hint;
        this.__revealed = false;
    }

    createDOM(/*config: EditorConfig , editor: LexicalEditor */): HTMLElement {
        const clozeContainer = document.createElement('span');
        clozeContainer.classList.add('cloze-container');
        clozeContainer.classList.add(`cloze-variant-${this.__variant}`);
        if (this.__revealed) {
            clozeContainer.classList.add('cloze-revealed');
        } else {
            clozeContainer.classList.add('cloze-hidden');
        }
        // clozeContainer.textContent = this.__hint;
        return clozeContainer;
    }

    updateDOM(prevNode: ClozeNode, dom: HTMLElement): boolean {
        if (!this.__revealed) {
            removeClassNamesFromElement(dom, 'cloze-revealed');
            addClassNamesToElement(dom, 'cloze-hidden');
        } else {
            removeClassNamesFromElement(dom, 'cloze-hidden');
            addClassNamesToElement(dom, 'cloze-revealed');
        }
        removeClassNamesFromElement(dom, `cloze-variant-${this.__variant + 1}`);
        removeClassNamesFromElement(dom, `cloze-variant-${this.__variant - 1}`);
        addClassNamesToElement(dom, `cloze-variant-${this.__variant}`);
        return false;
    }

    static importJSON(serializedNode: SerializedClozeNode): ClozeNode {
        return $createClozeNode(serializedNode.variant, serializedNode.hint);
    }

    exportJSON(): SerializedClozeNode {
        return {
            ...super.exportJSON(),
            variant: this.__variant,
            hint: this.__hint,
            type: 'cloze',
            version: 1,
        };
    }

    getRevealed(): boolean {
        return this.getLatest().__revealed;
    }

    setRevealed(isRevealed: boolean): void {
        const writable = this.getWritable();
        writable.__revealed = isRevealed;
    }

    getVariant(): number {
        return this.getLatest().__variant;
    }

    setVariant(variant: number): void {
        const writable = this.getWritable();
        writable.__variant = variant;
    }

    getHint(): string | null {
        return this.getLatest().__hint;
    }

    setHint(hint: string): void {
        const writable = this.getWritable();
        writable.__hint = hint;
    }

    insertNewAfter(_: RangeSelection, restoreSelection?: boolean): ParagraphNode {
        const newBlock = $createParagraphNode();
        const direction = this.getDirection();
        newBlock.setDirection(direction);
        this.insertAfter(newBlock, restoreSelection);
        return newBlock;
    }

    collapseAtStart(/* _selection: RangeSelection */): boolean {
        this.getParentOrThrow().insertBefore(this);
        return true;
    }

    canInsertTextBefore(): false {
        return false;
    }

    canInsertTextAfter(): false {
        return false;
    }

    canBeEmpty(): false {
        return false;
    }

    isInline(): true {
        return true;
    }
}

export function $createClozeNode(variant: number, hint: string | null): ClozeNode {
    return new ClozeNode(variant, hint);
}

export function $isClozeNode(node: LexicalNode | null | undefined): node is ClozeNode {
    return node instanceof ClozeNode;
}

export function setClozeVariant(newValue: number): void {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) {
        return;
    }
    const nodes = selection.extract();

    if (nodes.length === 1) {
        const firstNode = nodes[0];
        // if the first node is a Cloze node or if its
        // parent is a Cloze node, we set it to variant 1.
        const clozeNode = $isClozeNode(firstNode) ? firstNode : $getClozeAncestor(firstNode);
        if (clozeNode !== null) {
            clozeNode.setVariant(newValue);
            return;
        }
    }
}

export function removeCloze(): void {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) {
        return;
    }
    const nodes = selection.extract();

    nodes.forEach((node) => {
        const parent = node.getParent();

        if ($isClozeNode(parent)) {
            const children = parent.getChildren();

            for (let i = 0; i < children.length; i++) {
                parent.insertBefore(children[i]);
            }

            parent.remove();
        }
    });
}

export function insertCloze(): void {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) {
        return;
    }
    const nodes = selection.extract();

    if (nodes.length === 1) {
        const firstNode = nodes[0];
        // if the first node is a Cloze node or if its
        // parent is a Cloze node, we set it to variant 1.
        const clozeNode = $isClozeNode(firstNode) ? firstNode : $getClozeAncestor(firstNode);
        if (clozeNode !== null) {
            clozeNode.setVariant(1);
            return;
        }
    }

    let prevParent: ElementNode | ClozeNode | null = null;
    let clozeNode: ClozeNode | null = null;

    nodes.forEach((node) => {
        const parent = node.getParent();

        if (
            parent === clozeNode ||
            parent === null ||
            ($isElementNode(node) && !node.isInline())
        ) {
            return;
        }

        if ($isClozeNode(parent)) {
            clozeNode = parent;
            parent.setVariant(1);
            return;
        }

        if (!parent.is(prevParent)) {
            prevParent = parent;
            clozeNode = $createClozeNode(1, null);

            if ($isClozeNode(parent)) {
                if (node.getPreviousSibling() === null) {
                    parent.insertBefore(clozeNode);
                } else {
                    parent.insertAfter(clozeNode);
                }
            } else {
                node.insertBefore(clozeNode);
            }
        }

        if ($isClozeNode(node)) {
            if (node.is(clozeNode)) {
                return;
            }
            if (clozeNode !== null) {
                const children = node.getChildren();

                for (let i = 0; i < children.length; i++) {
                    clozeNode.append(children[i]);
                }
            }

            node.remove();
            return;
        }

        if (clozeNode !== null) {
            clozeNode.append(node);
        }
    });
}

function $getClozeAncestor(node: LexicalNode): null | LexicalNode {
    return $getAncestor(node, $isClozeNode);
}

function $getAncestor<NodeType extends LexicalNode = LexicalNode>(
    node: LexicalNode,
    predicate: (ancestor: LexicalNode) => ancestor is NodeType
): null | LexicalNode {
    let parent: null | LexicalNode = node;
    while (parent !== null && (parent = parent.getParent()) !== null && !predicate(parent));
    return parent;
}
