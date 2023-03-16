import { Layout, Typography, theme } from 'antd';
import './styles/App.css';
import { SideNav } from './components/common';

const { Title } = Typography;
const { Header, Content, Sider } = Layout;
const { useToken } = theme;

export default function App() {
    const { token } = useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <SideNav />
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
