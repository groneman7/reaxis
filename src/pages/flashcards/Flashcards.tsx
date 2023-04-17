import { Button } from 'antd';
import { DefaultPage } from '../../components';

export function Flashcards() {
    return (
        <DefaultPage>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Button
                    href="/flashcards/study"
                    type="link">
                    Study now
                </Button>
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
            </div>
        </DefaultPage>
    );
}
