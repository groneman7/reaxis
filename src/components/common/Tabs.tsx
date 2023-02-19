import { useState } from 'react';
import { Flex, FlexProps, Icon, IconButton, Text } from '@chakra-ui/react';
import { X } from 'lucide-react';

type Tab = {
    _id: string;
    content: any;
    icon: any;
    index?: number;
    name: string;
    isActive?: boolean;
};

export function useTabs(initial: Tab[]) {
    const [openTabs, setOpenTabs] = useState<Tab[]>(initial);
    const [activeTabId, setActiveTabId] = useState(initial[0]._id);

    function closeTab(tabId: string) {
        if (activeTabId === tabId) {
            const index = openTabs.findIndex((f) => f._id === tabId);
            setOpenTabs([...openTabs].filter((f) => f._id !== tabId));
            index > 0
                ? setActiveTabId(openTabs[index - 1]._id)
                : setActiveTabId(openTabs[index + 1]._id);
        }
        setOpenTabs([...openTabs].filter((f) => f._id !== tabId));
    }

    function Tab(props: FlexProps & Tab) {
        const { _id, icon, isActive, name } = props;

        return (
            <Flex
                align="center"
                borderTopRadius="md"
                bg={isActive ? 'white' : 'transparent'}
                color={isActive ? 'gray.800' : 'white'}
                cursor="pointer"
                gap="1"
                onClick={() => setActiveTabId(_id)}
                pl="3"
                pr="1"
                py="1"
                transition="all 100ms ease-in-out"
                _hover={{ bg: isActive ? '' : 'blue.600' }}
                _active={{ bg: isActive ? '' : 'blue.700' }}>
                <Icon
                    as={icon}
                    boxSize="3"
                    mr="1"
                    strokeWidth={3}
                />
                <Text
                    fontSize="sm"
                    fontWeight="medium"
                    userSelect="none">
                    {name}
                </Text>
                <IconButton
                    aria-label=""
                    icon={
                        <Icon
                            as={X}
                            boxSize="3"
                            strokeWidth={2.5}
                        />
                    }
                    isRound
                    onClick={(e) => {
                        e.stopPropagation();
                        closeTab(_id);
                    }}
                    size="xs"
                    variant="ghost"
                    _hover={{ bg: isActive ? 'gray.200' : 'blue.700' }}
                    _active={{ bg: isActive ? 'gray.400' : 'blue.800' }}
                />
            </Flex>
        );
    }

    function Tabs() {
        return (
            <Flex
                bg="blue.500"
                // boxShadow={`0px -3px 1px -1px ${theme.colors.blue[600]} inset`}
                gap="2"
                pt="2"
                px="2">
                {openTabs.map((tab, i) => (
                    <Tab
                        {...tab}
                        key={i + 1}
                        isActive={tab._id === activeTabId}
                    />
                ))}
            </Flex>
        );
    }

    return {
        Tabs,
        setActiveTabIndex: setActiveTabId,
    };
}
