import { CSSProperties, ReactNode } from 'react';
import { Layout } from 'antd';
import { Flex } from './';

const { Content } = Layout;

type PageProps = {
    children?: ReactNode;
    style?: CSSProperties;
};

export function DefaultPage(props: PageProps) {
    const { children, style } = props;
    return (
        <Content style={{ display: 'flex' }}>
            <Flex
                style={{ background: 'white', overflow: 'hidden', ...style }}
                flex="1">
                {children}
            </Flex>
        </Content>
    );
}
