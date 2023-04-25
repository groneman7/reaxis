import { Button, Card, Divider, Progress } from 'antd';
import { DefaultPage, Flex, Spacer } from '../../components';

export function Flashcards() {
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
                <Divider orientation="left">Jump back in</Divider>
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
                    <Button
                        href="/flashcards/study"
                        type="link">
                        Study now
                    </Button>
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
                    href="/flashcards/browse"
                    type="link">
                    Browse decks
                </Button>
            </div>
        </DefaultPage>
    );
}
