import { CSSProperties, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { /* Breadcrumb, */ Typography } from 'antd';
import { AiOutlineHome } from 'react-icons/ai';
import { Breadcrumbs, Flex } from './';

const { Title } = Typography;

type BreadcrumbItem = {
    key: string;
    icon?: ReactNode;
    title?: string;
    url?: string;
};

const itemStyles: CSSProperties = {
    display: 'flex',
    padding: '2px 4px 0 4px',
};

export function Header() {
    const renderItems = (breadcrumbs: BreadcrumbItem[]) => {
        return breadcrumbs.map((item: BreadcrumbItem) => {
            return {
                key: item.key,
                title: item.url ? (
                    <Link
                        to={item.url}
                        style={itemStyles}>
                        {item.icon && (
                            <span
                                style={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    margin: '0 4px 2px 0',
                                }}>
                                {item.icon}
                            </span>
                        )}
                        {item.title}
                    </Link>
                ) : (
                    <span style={itemStyles}>{item.title}</span>
                ),
            };
        });
    };

    return (
        <Flex
            style={{
                alignItems: 'center',
                borderBottom: '1px solid #f0f0f0',
                height: 72,
                padding: '0 32px 0 32px',
            }}>
            <Flex column>
                {/* <Breadcrumb
                    items={renderItems(testBreadcrumbs)}
                    style={{ fontSize: 14 }}
                /> */}
                <Breadcrumbs />
                <Title
                    level={1}
                    style={{ fontSize: 24, margin: 0 }}>
                    Header
                </Title>
            </Flex>
        </Flex>
    );
}
