import { Flex, FlexProps } from '@chakra-ui/layout';
import { Layout } from 'antd';

const { Content } = Layout;

export function DefaultPage(props: FlexProps) {
    const { children } = props;
    return (
        <Content style={{ display: 'flex' }}>
            <Flex
                bg="white"
                flex="1"
                {...props}>
                {children}
            </Flex>
        </Content>
    );
}
