import { Typography } from 'antd';
import { DefaultPage, Header, Editor, Flex } from '../components';

const { Title } = Typography;

export function LexicalTest() {
    return (
        <DefaultPage header={<Header title="Lexical Editor" />}>
            <Flex column>
                <Flex
                    column
                    style={{ marginBottom: 32 }}>
                    <Title level={4}>Full editor</Title>
                    <Editor />
                </Flex>
                <Flex
                    column
                    style={{ marginBottom: 32 }}>
                    <Title level={4}>Customized Editor</Title>
                    <Editor
                        allowedBlocks={['paragraph', 'h4', 'h5']}
                        components={[
                            'undo-redo-buttons',
                            'block-selector',
                            'basic-format-buttons',
                            'dev-options',
                        ]}
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
