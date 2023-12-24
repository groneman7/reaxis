import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import { MainNav, Sidebar } from './components';
import {
    BrowseFlashcards,
    Flashcards,
    Home,
    LexicalTest,
    NewDeck,
    StudyFlashcards,
} from './pages';
import './styles/common/app.css';
import { Questions } from './pages/questions/Questions';

const { Content } = Layout;

export default function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <MainNav />
            <Content
                style={{
                    background: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                <Layout style={{ flex: 1 }}>
                    <Routes>
                        <Route
                            path="/"
                            element={<Home />}
                        />
                        <Route
                            path="lexical"
                            element={<LexicalTest />}
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
                        <Route path="questions">
                            <Route
                                index
                                element={<Questions />}
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
