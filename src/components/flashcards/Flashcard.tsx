import { useEffect, useId, useState } from 'react';
import { Flex } from '@chakra-ui/layout';
import '../../styles/flashcards/flashcard.css';
import { Button } from 'antd';

type FlashcardProps = {
    card: {
        back?: any[];
        flipped: boolean;
        front: any[];
        idTested?: number;
        onFlip: (duration: number) => void;
        onNext: (confidence: number) => void;
    };
};

export function Flashcard({ card }: FlashcardProps) {
    const { back, flipped, front, idTested, onFlip, onNext } = card;
    const [startTime, setStartTime] = useState<number | null>(null);

    useEffect(() => {
        const start = new Date().getTime();
        setStartTime(start);
    }, []);

    const endDuration = () => {
        const endTime = new Date().getTime();
        return (endTime - startTime!) / 1000;
    };

    return (
        <Flex
            className="flashcard"
            direction="column">
            <Flex
                className="card card-front"
                direction="column"
                gap={32}>
                <div>
                    {front.map((f) => {
                        if (f.type === 'cloze-blank' && f.id === idTested) {
                            return f.children.map((c: any) => {
                                return (
                                    <span
                                        key={useId()}
                                        className={`${c.format} cloze ${
                                            flipped ? 'cloze-visible' : 'cloze-hidden'
                                        }`}
                                        onClick={() => onFlip(endDuration())}>
                                        {flipped ? c.text : '{...}'}
                                    </span>
                                );
                            });
                        } else {
                            return f.children.map((c: any) => {
                                return (
                                    <span
                                        key={useId()}
                                        className={c.format}>
                                        {c.text}
                                    </span>
                                );
                            });
                        }
                    })}
                </div>
                {flipped ? (
                    <Flex
                        justifyContent="space-between"
                        width="100%">
                        <Button
                            className="again"
                            onClick={() => onNext(1)}
                            style={{ minWidth: '6rem' }}>
                            Again
                        </Button>
                        <Button
                            className="hard"
                            onClick={() => onNext(2)}
                            style={{ minWidth: '6rem' }}>
                            Hard
                        </Button>
                        <Button
                            className="good"
                            onClick={() => onNext(3)}
                            style={{ minWidth: '6rem' }}>
                            Good
                        </Button>
                        <Button
                            className="easy"
                            onClick={() => onNext(4)}
                            style={{ minWidth: '6rem' }}>
                            Easy
                        </Button>
                    </Flex>
                ) : (
                    <Flex>
                        <Button onClick={() => onFlip(endDuration())}>Show</Button>
                    </Flex>
                )}
            </Flex>
            {back && back.length > 0 && flipped && (
                <Flex
                    className="card card-back"
                    direction="column">
                    <div>
                        {back.map((b: any, i: number) => {
                            return (
                                <span
                                    key={i}
                                    className={b.format}>
                                    {b.text}
                                </span>
                            );
                        })}
                    </div>
                </Flex>
            )}
        </Flex>
    );
}
