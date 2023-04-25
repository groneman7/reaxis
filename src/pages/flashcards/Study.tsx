import { useState } from 'react';
import { useMachine } from '@xstate/react';
import { flashcardMachine } from '../../state';
import { Button, Descriptions, Progress, Result, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { DefaultPage, Flashcard, Flex } from '../../components';

import queue from '../../data/cards.json';

const { Item } = Descriptions;
const { Text } = Typography;

export function StudyFlashcards() {
    const [current, send] = useMachine(flashcardMachine);

    const [cardIndex, setCardIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [duration, setDuration] = useState<number | null>(null);

    const handleFlip = (duration: number) => {
        setFlipped(true);
        setDuration(duration);
    };

    const handleNext = (confidence: number) => {
        // Implement spaced-repition algorithm.
        if (!queue[cardIndex + 1]) {
            send('COMPLETE_STUDY');
            return;
        } else {
            setCardIndex((i) => i + 1);
            setFlipped(false);
            setDuration(null);
        }
    };

    function RenderPage() {
        if (current.matches('study.ready')) {
            return (
                <Flex
                    justify="flex-start"
                    gap={256}
                    style={{ padding: 32 }}>
                    <Descriptions
                        bordered
                        column={1}
                        size="small"
                        title="Session Settings">
                        <Item label="Studying from">Queue</Item>
                        <Item label="Card limit">None</Item>
                        <Item label="Time limit">20 minutes</Item>
                    </Descriptions>
                    <Flex
                        column
                        gap={24}>
                        <Progress
                            format={() => (
                                <Flex
                                    column
                                    style={{ overflow: 'hidden' }}>
                                    <Text style={{ fontSize: 24, fontWeight: 600 }}>56</Text>
                                    <Text style={{ fontSize: 16 }}>cards left</Text>
                                </Flex>
                            )}
                            percent={72}
                            size={144}
                            type="circle"
                        />
                        <Button
                            onClick={() => send('START_STUDY')}
                            type="primary">
                            Start
                        </Button>
                    </Flex>
                </Flex>
            );
        }

        if (current.matches('study.active')) {
            return (
                <Flashcard
                    card={{
                        ...queue[cardIndex],
                        flipped,
                    }}
                    onFlip={handleFlip}
                    onNext={handleNext}
                />
            );
        }

        if (current.matches('study.completed')) {
            return (
                <Result
                    status="success"
                    title="Study complete!"
                    extra={
                        <Link to="/flashcards">
                            <Button>Go back</Button>
                        </Link>
                    }
                />
            );
        }

        return <>State not found.</>;
    }

    return (
        <DefaultPage>
            <RenderPage />
        </DefaultPage>
    );
}
