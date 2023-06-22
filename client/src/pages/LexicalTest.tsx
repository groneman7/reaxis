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
                    <Title level={4}>Editor</Title>
                    <Editor allowedBlocks={['paragraph', 'h4', 'h5']} />
                </Flex>
            </Flex>
        </DefaultPage>
    );
}
