import { Flex } from '@chakra-ui/layout';
import { Flashcard } from '../../components';

export function StudyFlashcards() {
    return (
        <Flex
            border="1px solid black"
            direction="column"
            flex="1">
            <Flex>asdf</Flex>
            <Flex
                bg="lightblue"
                flex="1"
                justifyContent="center"
                paddingTop={72}>
                <Flashcard />
            </Flex>
        </Flex>
    );
}
