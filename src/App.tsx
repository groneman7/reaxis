import { useState } from 'react';
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Flex,
    Heading,
    Icon,
    IconButton,
    Progress,
    Spacer,
    Stack,
    Text,
} from '@chakra-ui/react';
import {
    PrimaryWrapper,
    QuickActionBar,
    QuickActionButton,
    TopNav,
    useTabs,
} from './components/common';
import {
    AlarmClock,
    ArrowLeft,
    ChevronLeft,
    ChevronRight,
    Flag,
    Option,
    Pencil,
    Settings,
    Settings2,
} from 'lucide-react';

function Content() {
    return (
        <Flex
            flex="1"
            direction="column">
            <Flex
                // borderBottom="2px"
                // borderBottomColor="blue.100"
                direction="column"
                gap="2"
                p="4">
                <Flex
                    align="center"
                    gap="2">
                    <IconButton
                        aria-label=""
                        colorScheme="blue"
                        icon={
                            <Icon
                                as={ArrowLeft}
                                boxSize="5"
                            />
                        }
                        isRound
                        size="sm"
                        variant="ghost"
                        _hover={{ bg: 'blue.100' }}
                        _active={{ bg: 'blue.300' }}
                    />
                    <Heading size="md">Exam 3</Heading>
                    <Spacer />
                    <Flex
                        align="center"
                        gap="2">
                        <Text>15:27</Text>
                        <IconButton
                            aria-label=""
                            color="blue.500"
                            display="flex"
                            icon={
                                <Icon
                                    as={AlarmClock}
                                    boxSize="4"
                                    strokeWidth={2}
                                />
                            }
                            isRound
                            size="xs"
                            variant="unstyled"
                            _hover={{ bg: 'blue.100' }}
                            _active={{ bg: 'blue.300', color: 'blue.600' }}
                        />
                    </Flex>
                </Flex>
                <Flex>
                    <Text
                        color="gray.500"
                        fontSize="sm"
                        fontWeight="semibold">
                        12 / 16
                    </Text>
                </Flex>
            </Flex>
            <Progress
                max={16}
                size="xs"
                value={12}
            />
            <Flex
                alignItems="center"
                // justifyContent="center"
                bg="whiteAlpha.600"
                direction="column"
                flex="1"
                p="16">
                <Card
                    maxWidth="container.md"
                    boxShadow="xl">
                    <CardHeader
                        display="flex"
                        justifyContent="flex-end">
                        <ButtonGroup
                            size="sm"
                            spacing="1"
                            variant="ghost">
                            <IconButton
                                aria-label=""
                                color="gray.400"
                                icon={<Icon as={Flag} />}
                            />
                            <IconButton
                                aria-label=""
                                color="gray.400"
                                icon={<Icon as={Pencil} />}
                            />
                            <IconButton
                                aria-label=""
                                color="gray.400"
                                icon={<Icon as={Settings} />}
                            />
                        </ButtonGroup>
                    </CardHeader>
                    <CardBody
                        alignItems="center"
                        display="flex"
                        gap="8"
                        justifyContent="space-between">
                        <Flex
                            align="center"
                            // bg="white"
                            borderRadius="base"
                            color="gray.400"
                            cursor="pointer"
                            h="100%"
                            p="1"
                            transition="all 120ms ease-in-out"
                            _hover={{
                                bg: 'gray.100',
                            }}
                            _active={{
                                bg: 'gray.300',
                                color: 'gray.500',
                            }}>
                            <Icon
                                as={ChevronLeft}
                                boxSize="5"
                            />
                        </Flex>
                        <Stack
                            spacing="4"
                            width="xl">
                            <Stack>
                                <Text
                                    fontSize="lg"
                                    textAlign="justify">
                                    Epithelial tissue contains exocrine glands, which secrete
                                    substances through ducts towards specific regions. For
                                    example, sweat glands carry sweat to the surface of the
                                    skin.
                                </Text>
                                <Text
                                    fontSize="lg"
                                    textAlign="justify">
                                    Epithelial tissue also contains endocrine glands, which
                                    secrete substances into circulation and interstitial fluid.
                                    For example, the thyroid gland secretes thyroxine.
                                </Text>
                            </Stack>
                            <Divider borderColor="gray.300" />
                            <Text
                                fontSize="md"
                                textAlign="justify">
                                Note: exocrine glands involve ducts while endocrine glands do
                                not.
                            </Text>
                        </Stack>
                        <Flex
                            align="center"
                            // bg="white"
                            borderRadius="base"
                            color="gray.400"
                            cursor="pointer"
                            h="100%"
                            p="1"
                            transition="all 120ms ease-in-out"
                            _hover={{
                                bg: 'gray.100',
                            }}
                            _active={{
                                bg: 'gray.300',
                                color: 'gray.500',
                            }}>
                            <Icon
                                as={ChevronRight}
                                boxSize="5"
                            />
                        </Flex>
                    </CardBody>
                    <CardFooter
                        display="flex"
                        px="24">
                        <ButtonGroup
                            flex="1"
                            size="sm"
                            spacing="8">
                            <Button flex="1">Repeat</Button>
                            <Button flex="1">Hard</Button>
                            <Button flex="1">Good</Button>
                            <Button flex="1">Easy</Button>
                        </ButtonGroup>
                    </CardFooter>
                </Card>
            </Flex>
        </Flex>
    );
}

function Sidebar() {
    return <Box bg="orange.100">sidebar</Box>;
}

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
                <PrimaryWrapper borderTopRightRadius={sidebarOpen ? 'base' : '0'}>
                    <Tabs />
                    <QuickActionBar>
                        <QuickActionButton icon={Settings2}>Quick Action 1</QuickActionButton>
                        <QuickActionButton icon={Settings2}>Quick Action 2</QuickActionButton>
                        <QuickActionButton icon={Settings2}>Quick Action 3</QuickActionButton>
                        <QuickActionButton icon={Settings2}>Quick Action 4</QuickActionButton>
                    </QuickActionBar>
                    <Content />
                </PrimaryWrapper>
                {sidebarOpen && <Sidebar />}
            </Flex>
        </Flex>
    );
}
