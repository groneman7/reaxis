import { Flex, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import { Settings2, Syringe } from 'lucide-react';
import { QuickActionBar, QuickActionButton } from '../components/common';

export function Simulation() {
    return (
        <Flex flex="1">
            <Flex p="4">
                <Text fontWeight="bold">Wednesday Addams</Text>
            </Flex>
            <Flex
                direction="column"
                flex="1">
                <Flex>Tabs</Flex>
                <Flex
                    borderLeft="1px solid #BEE3F8"
                    borderTop="1px solid #BEE3F8"
                    borderTopLeftRadius="base"
                    bg="whiteAlpha.700"
                    direction="column"
                    flex="1"
                    overflow="hidden">
                    <QuickActionBar>
                        <QuickActionButton icon={Settings2}>Quick action 1</QuickActionButton>
                        <QuickActionButton icon={Settings2}>Quick action 2</QuickActionButton>
                        <QuickActionButton icon={Settings2}>Quick action 3</QuickActionButton>
                    </QuickActionBar>
                    <Flex
                        direction="column"
                        gap="16"
                        p="6">
                        <Flex
                            borderLeft="4px"
                            borderLeftColor="purple.600"
                            borderRadius="base"
                            boxShadow="md"
                            bg="white"
                            direction="column">
                            <Flex
                                align="center"
                                gap="4">
                                <Flex
                                    align="center"
                                    bg="purple.100"
                                    borderBottomRightRadius="md"
                                    boxShadow="md"
                                    color="purple.600"
                                    gap="2"
                                    px="4"
                                    py="2">
                                    <Icon
                                        as={Syringe}
                                        boxSize="5"
                                        strokeWidth={2.5}
                                    />
                                    <Heading
                                        as="h4"
                                        size="sm">
                                        Pharmacy
                                    </Heading>
                                </Flex>
                                <Flex gap="2">
                                    <QuickActionButton>Filter</QuickActionButton>
                                    <QuickActionButton>Sort</QuickActionButton>
                                </Flex>
                            </Flex>
                            <Flex>Active Medications</Flex>
                            <Flex>table</Flex>
                            <Flex>Inactive Medications</Flex>
                            <Flex>table</Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}
