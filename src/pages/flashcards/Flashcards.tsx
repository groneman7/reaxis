import { Flex } from '@chakra-ui/layout';
import { Button } from 'antd';

export function Flashcards() {
    return (
        <Flex
            direction="column"
            gap={16}>
            <Button type="link">Study now</Button>
            <Button type="link">My collections</Button>
            <Button type="link">My decks</Button>
            <Button
                href="/flashcards/browse?collections=true"
                type="link">
                Browse collections
            </Button>
            <Button
                href="/flashcards/browse"
                type="link">
                Browse decks
            </Button>
        </Flex>
    );
}
