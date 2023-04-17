import { useState } from 'react';
import { Flex } from '../../components';
import { DefaultPage, Flashcard } from '../../components';
import queue from '../../data/cards.json';

export function StudyFlashcards() {
    const [cardIndex, setCardIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [duration, setDuration] = useState<number | null>(null);

    const handleFlip = (duration: number) => {
        setFlipped(true);
        setDuration(duration);
    };

    const handleNext = (confidence: number) => {
        // Implement spaced-repition algorithm.
        setCardIndex((i) => i + 1);
        setFlipped(false);
        setDuration(null);
    };

    return (
        <DefaultPage>
            <Flex
                column
                flex="1">
                <Flex
                    align="center"
                    column
                    flex="1">
                    <Flashcard
                        card={{
                            ...queue[cardIndex],
                            flipped,
                        }}
                        onFlip={handleFlip}
                        onNext={handleNext}
                    />
                </Flex>
            </Flex>
        </DefaultPage>
    );
}
