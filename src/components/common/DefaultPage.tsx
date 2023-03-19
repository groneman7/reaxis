import { Flex, FlexProps } from '@chakra-ui/layout';
import { Layout } from 'antd';

const { Content } = Layout;

export function DefaultPage({ children }: FlexProps) {
    return (
        <Content style={{ display: 'flex' }}>
            <Flex
                bg="#ffffff"
                flex="1"
                p={32}>
                {children}
            </Flex>
        </Content>
    );
}
