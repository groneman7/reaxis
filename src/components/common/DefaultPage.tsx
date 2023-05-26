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
                column
                flex="1"
                gap={16}
                style={{
                    background: 'white',
                    overflow: 'hidden',
                    padding: '32px 64px',
                    ...style,
                }}>
                {children}
            </Flex>
        </Content>
    );
}
