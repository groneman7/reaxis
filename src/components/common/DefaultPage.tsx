import { ReactNode } from 'react';
import { Layout } from 'antd';
import { Flex } from './';

const { Content } = Layout;

type PageProps = {
    children?: ReactNode;
};

export function DefaultPage(props: PageProps) {
    const { children } = props;
    return (
        <Content style={{ display: 'flex' }}>
            <Flex
                style={{ background: 'white' }}
                flex="1"
                {...props}>
                {children}
            </Flex>
        </Content>
    );
}
