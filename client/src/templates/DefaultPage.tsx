import { CSSProperties, ReactNode } from 'react';
import { Layout } from 'antd';
import { Flex } from '../components/common';

const { Content } = Layout;

type PageProps = {
    children?: ReactNode;
    header: ReactNode;
    style?: CSSProperties;
    toolbar?: ReactNode;
};

export function DefaultPage({ children, header, style, toolbar }: PageProps) {
    return (
        <Content style={{ background: 'white' }}>
            <Flex
                column
                flex="1">
                <Flex
                    column
                    flex="1">
                    {header}
                    {toolbar}
                </Flex>
                <Flex
                    column
                    gap={16}
                    style={{
                        overflow: 'hidden',
                        margin: '32px 64px',
                        ...style,
                    }}>
                    {children}
                </Flex>
            </Flex>
        </Content>
    );
}
