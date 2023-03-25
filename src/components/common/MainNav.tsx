import { useMachine } from '@xstate/react';
import { layoutMachine } from '../../xstate';
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
import './../../styles/common/mainNav.css';

const { Sider } = Layout;
const { Title } = Typography;
const { useToken } = theme;

const defaultIconProps = { size: 20, strokeWidth: 2, style: { marginRight: 4 } };

type MenuItem = Required<MenuProps>['items'][number];
const items: MenuItem[] = [
    {
        label: 'Flashcards',
        key: '1',
        icon: <Layers {...defaultIconProps} />,
    },
    {
        label: 'Questions',
        key: '2',
        icon: <ListOrdered {...defaultIconProps} />,
    },
    {
        label: 'Diagrams',
        key: '3',
        icon: (
            <GitFork
                {...defaultIconProps}
                style={{ transform: 'rotate(180deg)' }}
            />
        ),
    },
    {
        label: 'Simulations',
        key: '4',
        icon: <Stethoscope {...defaultIconProps} />,
    },
];

export function MainNav() {
    const { token } = useToken();
    const [state, send] = useMachine(layoutMachine);
    const isCollapsed = state.matches({ mainNav: 'collapsed' });

    return (
        <Sider
            className="main-nav"
            collapsed={isCollapsed}
            collapsedWidth={72}
            collapsible
            trigger={null}
            width={256}>
            <Flex
                direction="column"
                h="100%"
                gap={16}>
                <Flex
                    align="center"
                    gap={12}
                    h={72}
                    justify="center"
                    overflowX="hidden"
                    userSelect="none">
                    <Button
                        icon={
                            <ChevronLeft
                                color={token.colorTextSecondary}
                                strokeWidth={2.5}
                                style={{
                                    marginLeft: isCollapsed ? '' : '-2px',
                                    transform: isCollapsed ? 'rotate(180deg)' : '',
                                    transition: 'transform 120ms ease-in-out',
                                }}
                            />
                        }
                        onClick={() =>
                            isCollapsed ? send('EXPAND_MAIN_NAV') : send('COLLAPSE_MAIN_NAV')
                        }
                        shape="circle"
                        type="default"
                        style={{
                            alignItems: 'center',
                            boxShadow: '1px 1px 6px 2px rgba(0, 0, 0, 0.1)',
                            display: 'flex',
                            justifyContent: 'center',
                            position: 'absolute',
                            right: 0,
                            top: 20,
                            transform: 'translate(50%)',
                        }}
                    />
                    <HeartPulse
                        color="#ffffff"
                        size={28}
                    />
                    <Title
                        hidden={isCollapsed}
                        level={3}
                        style={{
                            color: '#ffffff',
                            margin: 0,
                            whiteSpace: 'nowrap',
                        }}>
                        Reaxis
                    </Title>
                </Flex>
                <Menu
                    className="main-nav-menu"
                    items={items}
                    mode="inline"
                    selectable={false}
                />
                <Spacer />
                <Menu
                    className="main-nav-menu"
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
                />
            </Flex>
        </Sider>
    );
}
