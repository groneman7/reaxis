import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dispatch, RootState, useDispatch, useSelector } from '../../state';
import { Button, Descriptions, Progress, Result, Typography } from 'antd';
import { DefaultPage, Flashcard, Flex } from '../../components';

import queue from '../../data/cards.json';

const { Item } = Descriptions;
const { Text } = Typography;

export function StudyFlashcards() {
    const dispatch = useDispatch<Dispatch>();

    const status = useSelector(({ flashcards }: RootState) => flashcards.study.status);

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
            dispatch.flashcards.STUDY_END();
            return;
        } else {
            setCardIndex((i) => i + 1);
            setFlipped(false);
            setDuration(null);
        }
    };

    function RenderPage() {
        if (status === 'ready') {
            return (
                <>
                    <Flex
                        gap={256}
                        style={{ justifySelf: 'flex-start', padding: 32 }}>
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
                                        <Text style={{ fontSize: 24, fontWeight: 600 }}>
                                            56
                                        </Text>
                                        <Text style={{ fontSize: 16 }}>cards left</Text>
                                    </Flex>
                                )}
                                percent={72}
                                size={144}
                                type="circle"
                            />
                            <Button
                                onClick={dispatch.flashcards.STUDY_BEGIN}
                                type="primary">
                                Start
                            </Button>
                        </Flex>
                    </Flex>
                </>
            );
        }

        if (status === 'active') {
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

        if (status === 'completed') {
            return (
                <Result
                    status="success"
                    title="Study complete!"
                    extra={
                        <Link to="/flashcards">
                            <Button onClick={dispatch.flashcards.STUDY_READY}>Go back</Button>
                        </Link>
                    }
                />
            );
        }

        return <>State not found.</>;
    }

    return (
        <DefaultPage style={{ justifyContent: 'space-around' }}>
            <RenderPage />
        </DefaultPage>
    );
}
