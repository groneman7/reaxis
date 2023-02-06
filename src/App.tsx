import { useState } from 'react';
import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Flex,
    FlexProps,
    Heading,
    Icon,
    IconButton,
    Progress,
    Spacer,
    Stack,
    Text,
    theme,
} from '@chakra-ui/react';
import { TopNav } from './components/common';
import {
    AlarmClock,
    ChevronLeft,
    ChevronRight,
    Flag,
    Pencil,
    Settings,
    Settings2,
} from 'lucide-react';

function MainWrapper(props: FlexProps) {
    return (
        <Flex
            h="100%"
            bg="blue.400"
            gap="4">
            {props.children}
        </Flex>
    );
}

function MainContent(props: FlexProps) {
    return (
        <Flex
            bg="blue.50"
            direction="column"
            flex="1">
            {props.children}
        </Flex>
    );
}

function MainContentTabs(props: FlexProps) {
    return (
        <Flex
            bg="blue.500"
            boxShadow={`0px -3px 1px -1px ${theme.colors.blue[600]} inset`}
            pt="1"
            px="4"
            minHeight="42px">
            {props.children}
        </Flex>
    );
}

function Tab() {
    return (
        <Flex
            border="2px solid"
            borderBottom="0"
            borderColor="blue.600"
            borderTopRadius="md"
            bg="white"
            px="3"
            py="2">
            <Text
                fontSize="sm"
                fontWeight="semibold">
                Content Tab
            </Text>
        </Flex>
    );
}

function QuickActions() {
    return (
        <Flex
            borderBottom="1px"
            borderBottomColor="gray.200"
            bg="white"
            px="4"
            py="2">
            <ButtonGroup
                colorScheme="gray"
                size="xs"
                variant="quickAction">
                <Button
                    leftIcon={
                        <Icon
                            as={Settings2}
                            boxSize="4"
                        />
                    }>
                    Quick Action 1
                </Button>
                <Button
                    leftIcon={
                        <Icon
                            as={Settings2}
                            boxSize="4"
                        />
                    }>
                    Quick Action 1
                </Button>
                <Button
                    leftIcon={
                        <Icon
                            as={Settings2}
                            boxSize="4"
                        />
                    }>
                    Quick Action 2
                </Button>
                <Button
                    leftIcon={
                        <Icon
                            as={Settings2}
                            boxSize="4"
                        />
                    }>
                    Quick Action 3
                </Button>
                <Button
                    leftIcon={
                        <Icon
                            as={Settings2}
                            boxSize="4"
                        />
                    }>
                    Quick Action 4
                </Button>
            </ButtonGroup>
        </Flex>
    );
}

function Page() {
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
                <Flex>
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
                justifyContent="center"
                bg="whiteAlpha.600"
                direction="column"
                flex="1"
                p="8">
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
    return <Box bg="orange.100">s</Box>;
}

export default function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <Flex
            direction="column"
            h="100vh">
            <TopNav />
            <MainWrapper>
                <MainContent>
                    <MainContentTabs>
                        <Tab />
                    </MainContentTabs>
                    <QuickActions />
                    <Page />
                </MainContent>
                {sidebarOpen && <Sidebar />}
            </MainWrapper>
        </Flex>
    );
}
