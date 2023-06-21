import { Button, Layout, Typography } from 'antd';
import { Flex, Spacer } from './';
import { ChevronRight } from 'lucide-react';

const { Sider } = Layout;
const { Title } = Typography;

type SidebarProps = {
    isOpen: boolean;
    onToggleSidebar: () => void;
};

export function Sidebar({ isOpen, onToggleSidebar }: SidebarProps) {
    return (
        <Sider
            collapsed={!isOpen}
            collapsedWidth={0}
            collapsible
            theme="light"
            trigger={null}
            style={{ height: '100svh', left: 0, maxWidth: '25%', position: 'sticky', top: 0 }}>
            <Button
                icon={
                    <ChevronRight
                        strokeWidth={3}
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
                    overflow: 'hidden',
                    position: 'absolute',
                    top: '50%',
                    transform: `translate(${isOpen ? '-50%' : '-100%'}, -50%)`,
                    transition: 'transform 120ms ease-in-out',
                    width: '16px',
                }}
            />
            <Flex
                column
                gap={32}
                style={{ height: '100%' }}>
                <Flex align="center">Sidebar</Flex>
                <Spacer />
            </Flex>
        </Sider>
    );
}
