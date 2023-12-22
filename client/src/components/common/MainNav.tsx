import { Dispatch, RootState, useDispatch, useSelector } from '../../state';
import { Button, Layout, Menu, Typography, theme } from 'antd';
import type { MenuProps } from 'antd';
import { Flex, Spacer } from './';
import {
    ChevronLeft,
    GitFork,
    HeartPulse,
    Layers,
    ListOrdered,
    Stethoscope,
} from 'lucide-react';
import { MdEditNote } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Key, ReactNode } from 'react';

const { Sider } = Layout;
const { Title } = Typography;
const { useToken } = theme;

const defaultProps = {
    button: {
        style: {
            alignItems: 'center',
            display: 'flex',
        },
    },
    icon: {
        size: 16,
        strokeWidth: 2,
        style: { marginRight: 8 },
    },
};

type MenuItem = Required<MenuProps>['items'][number];
function getItem(
    label: ReactNode,
    key: Key,
    icon?: ReactNode,
    children?: MenuItem[],
    type?: 'group'
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuProps['items'] = [
    getItem(
        <Link to="/flashcards">Flashcards</Link>,
        '0',
        <Layers {...defaultProps['icon']} />
    ),
    getItem(
        <Link to="/questions">Questions</Link>,
        '1',
        <ListOrdered {...defaultProps['icon']} />
    ),
    getItem(
        <Link to="/diagrams">Diagrams</Link>,
        '2',
        <GitFork
            {...defaultProps['icon']}
            style={{ marginRight: 8, transform: 'rotate(90deg)' }}
        />
    ),
    getItem(
        <Link to="/simulations">Simulations</Link>,
        '3',
        <Stethoscope {...defaultProps['icon']} />
    ),
    getItem(
        <Link to="/lexical">Lexical Editor</Link>,
        '4',
        <MdEditNote style={{ marginRight: 8 }} />
    ),
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
                    <Link
                        to="/"
                        style={{
                            alignItems: 'center',
                            display: 'flex',
                            gap: 12,
                            justifyContent: 'center',
                        }}>
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
                    </Link>
                </Flex>
                <Menu items={items} />
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
