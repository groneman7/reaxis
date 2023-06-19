import { ReactNode, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RootState, useSelector } from './state';
import { Layout } from 'antd';
import { Header, MainNav, QuickActions, Sidebar } from './components';
import { BrowseFlashcards, Flashcards, Home, NewDeck, StudyFlashcards } from './pages';
import './styles/common/app.css';

const { Content } = Layout;

export default function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <MainNav />
            <Content style={{ background: 'white', display: 'flex', flexDirection: 'column' }}>
                <Header />
                {/* <QuickActions /> */}
                <Layout style={{ flex: 1 }}>
                    <Routes>
                        <Route
                            path="/"
                            element={<Home />}
                        />
                        <Route path="flashcards">
                            <Route
                                index
                                element={<Flashcards />}
                            />
                            <Route path="decks">
                                <Route
                                    path="new"
                                    element={<NewDeck />}
                                />
                            </Route>
                            <Route
                                path="browse"
                                element={<BrowseFlashcards />}
                            />
                            <Route
                                path="study"
                                element={<StudyFlashcards />}
                            />
                        </Route>
                    </Routes>
                    <Sidebar
                        isOpen={sidebarOpen}
                        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    />
                </Layout>
            </Content>
        </Layout>
    );
}
