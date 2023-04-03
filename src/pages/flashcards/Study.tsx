import { useState } from 'react';
import { Flex } from '@chakra-ui/layout';
import { DefaultPage, Flashcard } from '../../components';

const idealCard = {
    back: [
        { text: 'Cyclophosphamide', format: 'bold' },
        { text: ' is a ' },
        { text: 'prodrug', format: 'bold' },
        { text: ' metabolized to its active form by CYP450 enzymes.' },
    ],
    front: [
        {
            type: 'cloze-blank',
            id: 1,
            children: [{ text: 'Alkylating agents', format: 'bold' }],
        },
        { type: 'text', children: [{ text: ', such as ' }] },
        {
            type: 'cloze-blank',
            id: 2,
            children: [{ text: 'cyclophosphamide', format: 'bold' }],
        },
        {
            type: 'text',
            children: [
                { text: ', transfer ' },
                { text: 'alkyl groups', format: 'bold' },
                { text: ' to DNA, resulting in ' },
                { text: 'cell death', format: 'bold' },
                { text: '. This drug also provides ' },
            ],
        },
        { type: 'cloze-blank', id: 2, children: [{ text: 'immune suppression' }] },
        { type: 'text', children: [{ text: ', which can be utilized to ' }] },
        {
            type: 'cloze-blank',
            id: 1,
            children: [{ text: 'prevent post-transplant organ rejection' }],
        },
        { type: 'text', children: [{ text: '.' }] },
    ],
    idTested: 1,
};

export function StudyFlashcards() {
    const [flipped, setFlipped] = useState(false);

    const handleFlip = (duration: number) => {
        setFlipped(true);
        console.log(duration);
        // Implement spaced repition algorithm.
    };

    const handleNext = (confidence: number) => {
        // Implement next card.
        // Implement spaced-repition algorithm.
    };

    return (
        <DefaultPage bg="#f0f5ff">
            <Flex
                direction="column"
                flex="1">
                <Flex>asdf</Flex>
                <Flex
                    alignItems="center"
                    // bg="lightblue"
                    direction="column"
                    flex="1">
                    <Flashcard
                        card={{ ...idealCard, flipped, onFlip: handleFlip, onNext: handleNext }}
                    />
                </Flex>
            </Flex>
        </DefaultPage>
    );
}
