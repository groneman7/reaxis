import { Flex, FlexProps, Icon, Text, theme } from '@chakra-ui/react';
import { ReactElement } from 'react';

import { Option } from 'lucide-react';

type Tab = {
    content: any;
    icon: any;
    index?: number;
    name: string;
    isActive?: boolean;
};

export function Tab(props: FlexProps & Tab) {
    const { icon, name } = props;
    return (
        <Flex
            align="center"
            border="2px solid"
            borderBottom="0"
            borderColor="blue.600"
            borderTopRadius="md"
            bg="white"
            gap="2"
            px="3"
            py="1">
            <Icon
                as={icon}
                boxSize="3"
                strokeWidth={2.5}
            />
            <Text
                fontSize="xs"
                fontWeight="bold"
                userSelect="none">
                {name}
            </Text>
        </Flex>
    );
}

export function Tabs(props: FlexProps) {
    const { children } = props;

    return (
        <Flex
            bg="blue.500"
            borderTopRightRadius="base"
            boxShadow={`0px -3px 1px -1px ${theme.colors.blue[600]} inset`}
            pt="1"
            px="4"
            userSelect="none">
            {children}
        </Flex>
    );
}

export function useTabs() {
    const openTabs: Tab[] = [
        {
            content: () => <>test</>,
            icon: Option,
            name: 'Content',
        },
    ];

    return {
        Tabs: () => (
            <Flex
                bg="blue.500"
                borderTopRightRadius="base"
                boxShadow={`0px -3px 1px -1px ${theme.colors.blue[600]} inset`}
                pt="1"
                px="4"
                minHeight="42px">
                {openTabs.map((tab, i) => (
                    <Tab
                        {...tab}
                        index={i}
                    />
                ))}
            </Flex>
        ),
    };
}
