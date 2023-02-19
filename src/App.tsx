import { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { Option, Settings2 } from 'lucide-react';
import {
    PrimaryWrapper,
    QuickActionBar,
    QuickActionButton,
    Sidebar,
    TopNav,
    useTabs,
} from './components/common';
import { Content, Simulation } from './pages';

export default function App() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { Tabs } = useTabs([
        {
            _id: 'test_tab1',
            content: () => <>test</>,
            icon: Option,
            name: 'MD810 Foundations',
        },
        {
            _id: 'test_tab2',
            content: () => <>test</>,
            icon: Option,
            name: 'Clinical Simulation',
        },
        {
            _id: 'test_tab3',
            content: () => <>test</>,
            icon: Option,
            name: 'USMLE Step 1',
        },
        {
            _id: 'test_tab4',
            content: () => <>test</>,
            icon: Option,
            name: 'Test tab4',
        },
        {
            _id: 'test_tab5',
            content: () => <>test</>,
            icon: Option,
            name: 'Test tab5',
        },
    ]);

    return (
        <Flex
            direction="column"
            h="100vh">
            <TopNav />

            <Flex // App wrappper
                h="100%"
                bg="blue.400"
                gap="4">
                <PrimaryWrapper
                    borderTopRightRadius={sidebarOpen ? 'base' : '0'}
                    overflow="hidden">
                    <Tabs />
                    <QuickActionBar>
                        <QuickActionButton icon={Settings2}>Quick Action 1</QuickActionButton>
                        <QuickActionButton icon={Settings2}>Quick Action 2</QuickActionButton>
                        <QuickActionButton icon={Settings2}>Quick Action 3</QuickActionButton>
                        <QuickActionButton icon={Settings2}>Quick Action 4</QuickActionButton>
                    </QuickActionBar>
                    {/* <Content /> */}
                    <Simulation />
                </PrimaryWrapper>
                {sidebarOpen && <Sidebar />}
            </Flex>
        </Flex>
    );
}
