import { List } from 'antd';
import { ListCard } from '../../components';

const { Item } = List;

export function BrowseFlashcards() {
    const flashcardsList = [
        {
            name: 'Zanki Endocrine (Anatomy & Physiology)',
            type: 'Deck',
            description: 'Step 1 cards for the Endocrine system.',
        },
        {
            name: 'Zanki Endocrine (Pathology)',
            type: 'Deck',
            description: 'Step 1 cards for the Endocrine system.',
        },
        {
            name: 'Anking Step 1',
            type: 'Collection',
            description: 'All Step 1 decks.',
        },
    ];
    return (
        <List
            itemLayout="vertical"
            dataSource={flashcardsList}
            renderItem={(item) => (
                <ListCard
                    description={item.type}
                    name={item.name}
                    selectable>
                    {item.description}
                </ListCard>
            )}
            style={{ flex: '1' }}
        />
    );
}
