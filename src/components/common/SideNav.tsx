import { ReactNode, useState } from 'react';
import { Button, Layout, Menu, MenuProps, Typography, theme } from 'antd';
import { Flex, Spacer } from '@chakra-ui/layout';
import {
    ChevronLeft,
    GitFork,
    HeartPulse,
    Layers,
    ListOrdered,
    Stethoscope,
} from 'lucide-react';
import './../../styles/SideNav.css';

const { Sider } = Layout;
const { Title } = Typography;
const { useToken } = theme;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: 'Flashcards',
        key: '1',
        icon: (
            <Layers
                size={24}
                strokeWidth={2.5}
                style={{ marginRight: 4 }}
            />
        ),
    },
    {
        label: 'Questions',
        key: '2',
        icon: (
            <ListOrdered
                size={24}
                strokeWidth={2.5}
                style={{ marginRight: 4 }}
            />
        ),
    },
    {
        label: 'Diagrams',
        key: '3',
        icon: (
            <GitFork
                size={24}
                strokeWidth={2.5}
                style={{ marginRight: 4, transform: 'rotate(180deg)' }}
            />
        ),
    },
    {
        label: 'Simulations',
        key: '4',
        icon: (
            <Stethoscope
                size={24}
                strokeWidth={2.5}
                style={{ marginRight: 4 }}
            />
        ),
    },
];

export function SideNav() {
    const [collapsed, setCollapsed] = useState(false);
    const { token } = useToken();

    return (
        <Sider
            className="side-nav"
            collapsed={collapsed}
            collapsible
            trigger={null}>
            <Button
                icon={
                    <ChevronLeft
                        color={token.colorTextSecondary}
                        strokeWidth={2.5}
                        style={{
                            marginLeft: collapsed ? 3 : -2,
                            marginTop: -0.5,
                            transform: collapsed ? 'rotate(180deg)' : '',
                            transition: 'transform 120ms ease-in-out',
                        }}
                    />
                }
                onClick={() => setCollapsed(!collapsed)}
                shape="circle"
                type="default"
                style={{
                    boxShadow: '1px 1px 6px 2px rgba(0, 0, 0, 0.1)',
                    position: 'absolute',
                    right: -16,
                    top: 56,
                }}
            />
            <Flex
                direction="column"
                h="100%"
                gap={32}>
                <Menu
                    className="side-nav-menu"
                    items={[
                        {
                            label: 'Evan Groneman',
                            key: '1',
                            children: [
                                {
                                    label: 'Account',
                                    key: '2',
                                },
                                {
                                    label: 'Log out',
                                    key: '3',
                                },
                            ],
                        },
                    ]}
                    selectable={false}
                    style={{ paddingLeft: 8, paddingRight: 8 }}
                />
                <Menu
                    className="side-nav-menu"
                    items={items}
                    mode="inline"
                />
                <Spacer />
                <Flex
                    align="center"
                    gap={12}
                    justify="center"
                    m={16}
                    userSelect="none">
                    <HeartPulse
                        color="#ffffff"
                        size={28}
                        // strokeWidth={2.5}
                    />
                    <Title
                        level={3}
                        style={{ alignSelf: 'center', color: '#ffffff', margin: 0 }}>
                        Reaxis
                    </Title>
                </Flex>
            </Flex>
        </Sider>
    );
}
