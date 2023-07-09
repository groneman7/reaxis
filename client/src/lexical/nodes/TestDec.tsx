import { ReactNode } from 'react';
import {
    $getSelection,
    $isElementNode,
    $isRangeSelection,
    DecoratorNode,
    LexicalNode,
    NodeKey,
    createCommand,
} from 'lexical';

export class TestDecorator extends DecoratorNode<ReactNode> {
    __className: string;

    static getType(): string {
        return 'test-decorator';
    }

    static clone(node: TestDecorator): TestDecorator {
        return new TestDecorator(node.__className, node.__key);
    }

    constructor(className: string, key?: NodeKey) {
        super(key);
        this.__className = className;
    }

    createDOM(): HTMLElement {
        return document.createElement('div');
    }

    updateDOM(): false {
        return false;
    }

    decorate(): ReactNode {
        return <span>test</span>;
    }

    setClassName(className: string) {
        const writable = this.getWritable();
        writable.__className = className;
    }
}

export function $createTestDecorator(className: string): TestDecorator {
    return new TestDecorator(className);
}

export function $isTestDecorator(node: LexicalNode | null | undefined): node is TestDecorator {
    return node instanceof TestDecorator;
}

export const TOGGLE_TEST_DECORATOR = createCommand('TOGGLE_TEST_DECORATOR');

export function toggleTestDecoractor(className: string | null) {
    const selection = $getSelection();

    if (!$isRangeSelection(selection)) {
        return;
    }

    const nodes = selection.extract();

    if (className === null) {
        // Remove TestDecorator Nodes
        nodes.forEach((node) => {
            const parent = node.getParent();

            if ($isTestDecorator(parent)) {
                const children = parent.getChildren();

                for (let i = 0; i < children.length; i++) {
                    parent.insertBefore(children[i]);
                }

                parent.remove();
            }
        });
    } else {
        // Add or merge TestDecorator Nodes
        if (nodes.length === 1) {
            const firstNode = nodes[0]; // if the first node is a TestDecorator or if its
            // parent is a TestDecorator, we update the className.

            const testDecoratorNdoe = $isTestDecorator(firstNode)
                ? firstNode
                : $getAncestor(firstNode, $isTestDecorator);

            if (testDecoratorNdoe !== null) {
                testDecoratorNdoe.setClassName(className);

                return;
            }
        }

        let prevParent: any = null;
        let testDecNode: any = null;
        nodes.forEach((node) => {
            const parent = node.getParent();

            if (
                parent === testDecNode ||
                parent === null ||
                ($isElementNode(node) && !node.isInline())
            ) {
                return;
            }

            if ($isTestDecorator(parent)) {
                testDecNode = parent;
                parent.setClassName(className);

                return;
            }

            if (!parent.is(prevParent)) {
                prevParent = parent;
                testDecNode = $createTestDecorator(className);

                if ($isTestDecorator(parent)) {
                    if (node.getPreviousSibling() === null) {
                        parent.insertBefore(testDecNode);
                    } else {
                        parent.insertAfter(testDecNode);
                    }
                } else {
                    node.insertBefore(testDecNode);
                }
            }

            if ($isTestDecorator(node)) {
                if (node.is(testDecNode)) {
                    return;
                }

                if (testDecNode !== null) {
                    const children = node.getChildren();

                    for (let i = 0; i < children.length; i++) {
                        testDecNode.append(children[i]);
                    }
                }

                node.remove();
                return;
            }

            if (testDecNode !== null) {
                testDecNode.append(node);
            }
        });
    }
}

function $getAncestor(node: any, predicate: any) {
    let parent = node;

    while (parent !== null && (parent = parent.getParent()) !== null && !predicate(parent));

    return parent;
}
