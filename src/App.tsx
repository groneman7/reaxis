import { ReactNode, useState } from 'react';
import type { MenuProps } from 'antd';
import { Layout, Menu, Space, Typography, theme } from 'antd';
import { ChevronLeft } from 'lucide-react';
import Button from 'antd/es/button';

const { Title } = Typography;
const { Header, Content, Sider } = Layout;
const { useToken } = theme;

type MenuItem = Required<MenuProps>['items'][number];

function createItem(label: ReactNode, key: string, icon?: ReactNode, children?: MenuItem[]) {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}
const items: MenuItem[] = [createItem('Flashcards', '1', null), createItem('Option 2', '2')];

export default function App() {
    const { token } = useToken();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                collapsible
                collapsed={collapsed}
                theme="light"
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
                        top: 36,
                    }}
                />

                <div>
                    <Title
                        level={2}
                        style={{
                            color: token.colorPrimary,
                            fontWeight: 700,
                            margin: 0,
                            padding: 16,
                            textAlign: 'center',
                        }}>
                        {!collapsed ? 'Reaxis' : 'R'}
                    </Title>
                    <Menu
                        // theme="dark"
                        items={items}
                        mode="inline"></Menu>
                </div>
            </Sider>
            <Layout>
                <Header
                    style={{
                        alignItems: 'center',
                        background: token.colorBgContainer,
                        display: 'flex',
                    }}>
                    <Title
                        level={3}
                        style={{ margin: 0 }}>
                        Flashcard Decks
                    </Title>
                </Header>
                <Content>
                    <div style={{ background: 'white' }}>Hello world</div>
                </Content>
            </Layout>
        </Layout>
    );
}
