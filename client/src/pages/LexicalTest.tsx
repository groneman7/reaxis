import { Typography } from 'antd';
import { DefaultPage, Header, Editor, Flex } from '../components';

const test =
    '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"The ","type":"text","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"mitochondria","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"cloze","version":1,"variant":1,"hint":null},{"detail":0,"format":0,"mode":"normal","style":"","text":" is the powerhouse of the cell.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}';

const { Title } = Typography;

export function LexicalTest() {
    return (
        <DefaultPage header={<Header title="Lexical Editor" />}>
            <Flex column>
                <Flex
                    column
                    style={{ marginBottom: 32 }}>
                    <Title level={4}>Flashcard Viewer</Title>
                    <Editor
                        allowedBlocks={['paragraph']}
                        components={[
                            'undo-redo-buttons',
                            'basic-format-buttons',
                            'cloze-button',
                            'dev-options',
                        ]}
                        defaultState={test}
                        readOnly
                    />
                </Flex>
                <Flex
                    column
                    style={{ marginBottom: 32 }}>
                    <Title level={4}>Flashcard Editor</Title>
                    <Editor
                        allowedBlocks={['paragraph']}
                        components={[
                            'undo-redo-buttons',
                            'basic-format-buttons',
                            'cloze-button',
                            'dev-options',
                        ]}
                        defaultState={test}
                    />
                </Flex>
                <Flex
                    column
                    style={{ marginBottom: 32 }}>
                    <Title level={4}>Full Editor with Lorem</Title>
                    <Editor lorem />
                </Flex>
                <Flex
                    column
                    style={{ marginBottom: 32 }}>
                    <Title level={4}>Read Only</Title>
                    <Editor
                        lorem
                        readOnly
                    />
                </Flex>
            </Flex>
        </DefaultPage>
    );
}
