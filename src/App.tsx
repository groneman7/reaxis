import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Flex } from '@chakra-ui/layout';
import { Breadcrumb, Layout, Typography } from 'antd';
import { DefaultPage, MainNav, Sidebar } from './components';
import { Layers } from 'lucide-react';
import './styles/App.css';

import { BrowseFlashcards, Home } from './pages';

const { Title } = Typography;
const { Content } = Layout;

export default function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <MainNav />
            <Content style={{ background: 'white', display: 'flex', flexDirection: 'column' }}>
                <Flex
                    display="flex"
                    flexDirection="column"
                    gap={4}
                    h={96}
                    justifyContent="center"
                    px={32}>
                    <Breadcrumb
                        items={[
                            {
                                title: (
                                    <Flex
                                        align="center"
                                        gap={4}>
                                        <Layers size={16} />
                                        <span>Flashcards</span>
                                    </Flex>
                                ),
                                href: '/flashcards',
                            },
                        ]}
                    />
                    <Title
                        level={2}
                        style={{ margin: 0 }}>
                        Hello
                    </Title>
                </Flex>
                <Layout style={{ flex: 1 }}>
                    <DefaultPage>
                        <Routes>
                            <Route
                                path="/"
                                element={<Home />}
                            />
                            <Route path="flashcards">
                                <Route
                                    path="browse"
                                    element={<BrowseFlashcards />}
                                />
                            </Route>
                        </Routes>
                    </DefaultPage>
                    <Sidebar
                        isOpen={sidebarOpen}
                        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    />
                </Layout>
            </Content>
        </Layout>
    );
}
