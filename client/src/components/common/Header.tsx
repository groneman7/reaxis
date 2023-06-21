import { ReactNode } from 'react';
import { Typography } from 'antd';
import { Breadcrumbs, Flex, FlexProps } from './';

const { Title } = Typography;

type HeaderProps = FlexProps & {
    title: string;
    toolbar?: ReactNode;
};

export function Header({ children, title, toolbar }: HeaderProps) {
    return (
        <Flex
            style={{
                alignItems: 'center',
                borderBottom: '1px solid #f0f0f0',
                height: 72,
                padding: '0 32px 0 32px',
            }}>
            <Flex column>
                <Breadcrumbs />
                <Title
                    level={1}
                    style={{ fontSize: 24, margin: '4px 0 0 0' }}>
                    {title || 'No title defined.'}
                </Title>
                {children}
                {toolbar}
            </Flex>
        </Flex>
    );
}
