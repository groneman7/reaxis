import { ReactNode, useState } from 'react';
import { Flex } from './';
import { Card, Button, Dropdown, Checkbox, Typography } from 'antd';
import type { MenuProps } from 'antd';
import { MoreHorizontal } from 'lucide-react';
import '../../styles/common/listCard.css';

const { Title, Text } = Typography;

type ListCardProps = {
    children?: ReactNode;
    description?: ReactNode;
    onMenuClick?: MenuProps['onClick'];
    menuItems?: MenuProps['items'];
    selectable?: boolean;
    selected?: boolean;
    subtitle?: ReactNode;
    title: ReactNode;
};

export function ListCard({
    children,
    onMenuClick,
    menuItems,
    selectable,
    subtitle,
    title,
}: ListCardProps) {
    const [selected, setSelected] = useState(false);

    function Main() {
        return (
            <Flex
                className={`list-card ${selected && 'list-card-selected'}`}
                flex="1">
                <Flex
                    column
                    flex="1">
                    <Flex
                        gap={16}
                        style={{ marginBottom: 4 }}>
                        {selectable && (
                            <Checkbox
                                checked={selected}
                                onChange={(e) => setSelected(e.target.checked)}
                            />
                        )}
                        <Title
                            level={5}
                            style={{ margin: 0 }}>
                            {title}
                        </Title>
                    </Flex>
                    <Flex style={{ marginBottom: 4, marginLeft: selectable ? 32 : 0 }}>
                        <Text
                            strong
                            type="secondary">
                            {subtitle}
                        </Text>
                    </Flex>
                    <Flex style={{ marginLeft: selectable ? 32 : 0 }}>{children}</Flex>
                </Flex>
                {menuItems && menuItems.length > 0 && (
                    <Flex align="center">
                        <Dropdown
                            arrow
                            menu={{ items: menuItems, onClick: onMenuClick }}
                            placement="bottomRight"
                            trigger={['click']}>
                            <Button
                                icon={
                                    <MoreHorizontal
                                        size={20}
                                        strokeWidth={1.5}
                                    />
                                }
                                style={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            />
                        </Dropdown>
                    </Flex>
                )}
            </Flex>
        );
    }
    if (menuItems && menuItems.length > 0) {
        return (
            <Dropdown
                menu={{ items: menuItems, onClick: onMenuClick }}
                // placement="topRight"
                trigger={['contextMenu']}>
                <div>
                    <Main />
                </div>
            </Dropdown>
        );
    } else {
        return <Main />;
    }
}
