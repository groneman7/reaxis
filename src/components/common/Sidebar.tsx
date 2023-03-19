import { Flex, Spacer } from '@chakra-ui/layout';
import { Button, Layout, Menu, MenuProps, Typography, theme } from 'antd';
import { ChevronRight } from 'lucide-react';

const { Sider } = Layout;
const { Title } = Typography;

type SidebarProps = {
    isOpen: boolean;
    onToggleSidebar: () => void;
};

export function Sidebar({ isOpen, onToggleSidebar }: SidebarProps) {
    const { token } = theme.useToken();

    return (
        <Sider
            className=""
            collapsed={!isOpen}
            collapsedWidth={0}
            collapsible
            theme="light"
            trigger={null}
            width="33%">
            <Button
                icon={
                    <ChevronRight
                        strokeWidth={4}
                        style={{
                            transform: isOpen ? '' : 'rotate(180deg)',
                            transition: 'transform 120ms ease-in-out',
                        }}
                    />
                }
                onClick={onToggleSidebar}
                style={{
                    alignItems: 'center',
                    borderRadius: '2px',
                    display: 'flex',
                    height: '192px',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: '50%',
                    transform: `translate(${isOpen ? '-50%' : '-100%'}, -50%)`,
                    transition: 'transform 120ms ease-in-out',
                    width: '16px',
                }}
            />
            <Flex
                direction="column"
                h="100%"
                gap={32}>
                <Flex align="center">Sidebar</Flex>
                <Spacer />
            </Flex>
        </Sider>
    );
}
