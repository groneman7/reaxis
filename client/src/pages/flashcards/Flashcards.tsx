import { useEffect } from 'react';
import { Dispatch, RootState, useDispatch, useSelector } from '../../state';
import { Link } from 'react-router-dom';
import { Button, Card, Divider, Progress, Tooltip, Typography } from 'antd';
import { DefaultPage, Flex, Spacer } from '../../components';
import { FaPlus } from 'react-icons/fa';

const { Text } = Typography;

export function Flashcards() {
    const dispatch = useDispatch<Dispatch>();
    const userDecks = useSelector(({ DEV_AUTH }: RootState) => DEV_AUTH.flashcards.decks);
    const decksList = useSelector(({ flashcards }: RootState) => flashcards.decks.list);

    const notesList = useSelector(({ flashcards }: RootState) => flashcards.notes?.list);

    useEffect(() => {
        dispatch.layout.HEADER_EDIT('Flashcards');
        dispatch.flashcards.getDecksList(userDecks);
    }, []);

    function TestDeckFetch(deckId: string) {
        dispatch.flashcards.loadNotesByDeck(deckId);
        console.log(notesList);
    }

    return (
        <DefaultPage>
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
            <Divider orientation="left">My decks</Divider>
            <Flex
                gap={32}
                style={{ height: 296, overflow: 'auto', padding: 16 }}>
                <Link
                    to="decks/new"
                    rel="true">
                    <Button
                        icon={<FaPlus style={{ marginTop: 4 }} />}
                        shape="circle"
                        size="large"
                        type="primary"
                        style={{ alignSelf: 'center' }}
                    />
                </Link>
                {decksList &&
                    decksList.map((deck) => {
                        return (
                            <Tooltip
                                key={deck._id}
                                placement="top"
                                title={deck.name}>
                                <Card
                                    hoverable
                                    onClick={() => TestDeckFetch(deck._id)}
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
        </DefaultPage>
    );
}
