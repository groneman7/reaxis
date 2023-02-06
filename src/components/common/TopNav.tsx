import {
    Button,
    ButtonGroup,
    Flex,
    Heading,
    Icon,
    IconButton,
    Spacer,
    Stack,
} from '@chakra-ui/react';
import { GitFork, Layers, ListChecks, Power, Stethoscope } from 'lucide-react';
import { FaBrain } from 'react-icons/fa';

function Logo() {
    return (
        <Stack
            align="center"
            direction="row"
            spacing="3">
            <Icon
                as={FaBrain}
                boxSize="7"
                color="white"
            />
            <Heading
                color="white"
                size="md">
                Reaxis
            </Heading>
        </Stack>
    );
}

function NavItems() {
    return (
        <ButtonGroup size="sm">
            <Button
                bg="blue.400"
                colorScheme="blue"
                fontWeight="semibold"
                leftIcon={
                    <Icon
                        as={Layers}
                        strokeWidth={2.5}
                    />
                }>
                Flashcards
            </Button>
            <Button
                bg="blue.400"
                colorScheme="blue"
                fontWeight="semibold"
                leftIcon={
                    <Icon
                        as={ListChecks}
                        strokeWidth={2.5}
                    />
                }>
                Questions
            </Button>
            <Button
                bg="blue.400"
                colorScheme="blue"
                fontWeight="semibold"
                leftIcon={
                    <Icon
                        as={GitFork}
                        strokeWidth={2.5}
                        style={{ transform: 'rotate(180deg)' }}
                    />
                }>
                Diagrams
            </Button>
            <Button
                bg="blue.400"
                colorScheme="blue"
                fontWeight="semibold"
                leftIcon={
                    <Icon
                        as={Stethoscope}
                        strokeWidth={2.5}
                    />
                }>
                Simulation
            </Button>
        </ButtonGroup>
    );
}

function UserNavButton() {
    return (
        <ButtonGroup
            isAttached
            size="sm">
            <Button
                bg="blue.400"
                colorScheme="blue">
                Evan Groneman, MS1
            </Button>
            <IconButton
                aria-label=""
                bg="blue.400"
                colorScheme="red"
                icon={
                    <Icon
                        as={Power}
                        strokeWidth={3}
                    />
                }
            />
        </ButtonGroup>
    );
}

export function TopNav() {
    return (
        <Flex
            align="center"
            bg="blue.400"
            gap="8"
            px="4"
            py="2">
            <Logo />
            <NavItems />
            <Spacer />
            <UserNavButton />
        </Flex>
    );
}
