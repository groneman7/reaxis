import { Dispatch, RootState, useDispatch, useSelector } from '../../state';
import { Button, Layout, Menu, MenuProps, Typography, theme } from 'antd';
import { Flex, Spacer } from './';
import {
    ChevronLeft,
    GitFork,
    HeartPulse,
    Layers,
    ListOrdered,
    Stethoscope,
} from 'lucide-react';

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
    const dispatch = useDispatch<Dispatch>();

    const isOpen = useSelector((state: RootState) => state.layout.mainNavOpen);

    return (
        <Sider
            collapsed={!isOpen}
            collapsedWidth={72}
            collapsible
            style={{
                borderRight: `1px solid #d9d9d9`,
                position: 'sticky',
                height: '100svh',
                top: 0,
                left: 0,
            }}
            theme="light"
            trigger={null}
            width={256}>
            <Flex
                column
                style={{ height: '100%' }}
                gap={16}>
                <Flex
                    align="center"
                    gap={12}
                    justify="center"
                    style={{ height: 72, overflowX: 'hidden', userSelect: 'none' }}>
                    <Button
                        icon={
                            <ChevronLeft
                                color={token.colorTextSecondary}
                                strokeWidth={2.5}
                                style={{
                                    marginLeft: isOpen ? '-2px' : '',
                                    transform: isOpen ? '' : 'rotate(180deg)',
                                    transition: 'transform 120ms ease-in-out',
                                }}
                            />
                        }
                        onClick={() => dispatch.layout.MAIN_NAV_TOGGLE()}
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
                        color={token.colorPrimary}
                        size={28}
                    />
                    <Title
                        hidden={!isOpen}
                        level={3}
                        style={{
                            color: token.colorPrimary,
                            margin: 0,
                            whiteSpace: 'nowrap',
                        }}>
                        Reaxis
                    </Title>
                </Flex>
                <Menu
                    items={items}
                    mode="inline"
                    selectable={false}
                />
                <Spacer />
                <Menu
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
