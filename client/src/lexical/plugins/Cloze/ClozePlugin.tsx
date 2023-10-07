import { useEffect } from 'react';
import { COMMAND_PRIORITY_EDITOR, $getSelection, $isRangeSelection } from 'lexical';
import { NodeEventPlugin } from '@lexical/react/LexicalNodeEventPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ClozeNode, TOGGLE_CLOZE_COMMAND, toggleCloze } from '../../nodes/ClozeNode';

export function ClozePlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([ClozeNode])) {
      throw new Error('ClozePlugin: ClozeNode not registered on editor.');
    }

    return editor.registerCommand<number | { index: number; hint?: string } | null>(
      TOGGLE_CLOZE_COMMAND,
      (payload) => {
        if (payload === null) {
          toggleCloze(payload);
          return true;
        } else if (typeof payload === 'number') {
          toggleCloze(payload);
          return true;
        } else {
          const { index, hint } = payload;
          toggleCloze(index, hint);
        }

        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor]);

  return (
    <NodeEventPlugin
      nodeType={ClozeNode}
      eventType="click"
      eventListener={() => {
        if (editor.isEditable()) return;

        const selection = $getSelection();
        const cloze: ClozeNode | null | undefined = selection?.getNodes()[0].getParent();
        if (cloze) {
          editor.registerNodeTransform(ClozeNode, (node) => {
            const clozeNode = new ClozeNode(cloze.__index, cloze.__hint, cloze.__key);
            clozeNode.setRevealed(true);
            console.log('ok...');
            console.log('node', node);
            console.log('clozeNode', clozeNode);
            node.replace(clozeNode, true);
            console.log('why tho... :(');
            clozeNode.select();
            console.log('But really, why??');
            if (
              $isRangeSelection(selection) &&
              (selection.anchor.getNode() === node || selection.focus.getNode() === node)
            ) {
              clozeNode.select();
            }
          });
        }
      }}
    />
  );
}
