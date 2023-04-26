import { useEffect } from 'react';
import { Button, Card, Divider, Progress, Tooltip, Typography } from 'antd';
import { useMachine } from '@xstate/react';
import { decksMachine } from '../../state';
import { DefaultPage, Flex, Spacer } from '../../components';

const { Text } = Typography;

export function Flashcards() {
    const [current, send] = useMachine(decksMachine);
    const decks = current.context.decksList;

    useEffect(() => {
        send('GET_DECKS');
    }, []);

    return (
        <DefaultPage>
            <div
                style={{
                    border: '3px dashed pink',
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column',
                    gap: 16,
                    overflow: 'hidden',
                    padding: '32px 64px',
                }}>
                <Divider orientation="left">
                    Jump back into <strong>Queued Cards</strong>
                </Divider>
                <Flex
                    align="center"
                    column
                    gap={16}
                    style={{ padding: '0 32px' }}>
                    <Progress
                        percent={72}
                        size={144}
                        type="circle"
                    />
                    <Flex gap={16}>
                        <Button>View Deck</Button>
                        <Button
                            href="/flashcards/study"
                            type="primary">
                            Study Now
                        </Button>
                    </Flex>
                </Flex>
                <Divider orientation="left">My collections</Divider>
                <Flex
                    gap={32}
                    style={{ height: 296, overflow: 'auto', padding: 16 }}>
                    <Card
                        hoverable
                        title="Zanki Endocrine (Anatomy & Physiology)"
                        style={{ width: 256 }}>
                        Step 1 cards for endocrine system A&P.
                    </Card>
                    <Card
                        hoverable
                        title="Zanki Endocrine (Pathology)"
                        style={{ width: 256 }}>
                        Step 1 cards for endocrine pathology.
                    </Card>
                    <Card
                        hoverable
                        title="Zanki Endocrine (Pathology)"
                        style={{ width: 256 }}>
                        Step 1 cards for endocrine pathology.
                    </Card>
                    <Card
                        hoverable
                        title="Zanki Endocrine (Pathology)"
                        style={{ width: 256 }}>
                        Step 1 cards for endocrine pathology.
                    </Card>
                    <Card
                        hoverable
                        title="Zanki Endocrine (Pathology)"
                        style={{ width: 256 }}>
                        Step 1 cards for endocrine pathology.
                    </Card>
                    <Card
                        hoverable
                        title="Zanki Endocrine (Pathology)"
                        style={{ width: 256 }}>
                        Step 1 cards for endocrine pathology.
                    </Card>
                    <Card
                        hoverable
                        title="Zanki Endocrine (Pathology)"
                        style={{ width: 256 }}>
                        Step 1 cards for endocrine pathology.
                    </Card>
                    <Card
                        hoverable
                        title="Zanki Endocrine (Pathology)"
                        style={{ width: 256 }}>
                        Step 1 cards for endocrine pathology.
                    </Card>
                </Flex>
                <Button
                    href="/flashcards/browse?collections=true"
                    type="link">
                    Browse collections
                </Button>
                <Divider orientation="left">My decks</Divider>
                <Flex
                    gap={32}
                    style={{ height: 296, overflow: 'auto', padding: 16 }}>
                    {decks &&
                        decks.map((deck) => {
                            return (
                                <Tooltip
                                    key={deck._id}
                                    placement="top"
                                    title={deck.name}>
                                    <Card
                                        hoverable
                                        onClick={() => console.log('Deck clicked.')}
                                        title={deck.name}
                                        style={{
                                            minWidth: 256,
                                        }}>
                                        <Flex
                                            column
                                            flex="1"
                                            gap={4}>
                                            <a
                                                onClick={(e) => e.stopPropagation()}
                                                style={{ fontSize: 14 }}>
                                                {deck.owner}
                                            </a>
                                            <Text>{deck.description || 'No description.'}</Text>
                                            <Spacer />
                                            <Text>{`${deck.notes.length} ${
                                                deck.notes.length !== 1 ? 'notes' : 'note'
                                            }`}</Text>
                                        </Flex>
                                    </Card>
                                </Tooltip>
                            );
                        })}
                </Flex>
                <Button
                    href="/flashcards/browse"
                    type="link">
                    Browse decks
                </Button>
            </div>
        </DefaultPage>
    );
}
