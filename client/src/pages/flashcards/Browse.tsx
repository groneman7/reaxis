import { Button, List } from 'antd';
import { ListCard } from '../../components';

const { Item } = List;

export function BrowseFlashcards() {
    const flashcardsList = [
        {
            name: 'Zanki Endocrine (Anatomy & Physiology)',
            type: 'Deck',
            description: 'Step 1 cards for the Endocrine system.',
            owner: 'groneman7',
        },
        {
            name: 'Zanki Endocrine (Pathology)',
            type: 'Deck',
            description: 'Step 1 cards for the Endocrine system.',
            owner: 'groneman7',
        },
        {
            name: 'Anking Step 1',
            type: 'Collection',
            description: 'All Step 1 decks.',
            owner: 'groneman7',
        },
    ];

    return (
        <List
            itemLayout="vertical"
            dataSource={flashcardsList}
            renderItem={(item) => (
                <Item>
                    <ListCard
                        menuItems={[
                            {
                                key: 'study',
                                label: 'Study Now',
                            },
                            {
                                key: 'queue',
                                label: 'Add to Queue',
                            },
                            { type: 'divider' },
                            {
                                key: 'save',
                                label: 'Save',
                                children: [
                                    { key: 'my-flashcards', label: 'My Flashcards' },
                                    { key: 'asdfasdf', label: 'My Deck 1' },
                                ],
                            },
                            {
                                key: 'copy',
                                label: 'Create a Copy',
                            },
                            { type: 'divider' },
                            {
                                key: 'share',
                                label: 'Share',
                                children: [
                                    {
                                        key: 'friends',
                                        type: 'group',
                                        label: 'Friends',
                                        children: [
                                            { key: '123', label: 'Emily Paulin' },
                                            { key: '456', label: 'Whitney Weinshenck' },
                                            { key: '789', label: 'Holly Insko' },
                                            { key: 'search-friends', label: 'Search...' },
                                        ],
                                    },
                                    {
                                        key: 'groups',
                                        type: 'group',
                                        label: 'Groups',
                                        children: [
                                            { key: '321', label: 'UKCOM 2026' },
                                            { key: '654', label: 'UKCOM 2025' },
                                            { key: 'search-groups', label: 'Search...' },
                                        ],
                                    },
                                    { type: 'divider' },
                                    { key: 'link', label: 'Copy Link' },
                                ],
                            },
                        ]}
                        subtitle={<Button type="link">{item.owner}</Button>}
                        title={item.name}>
                        {item.description}
                    </ListCard>
                </Item>
            )}
            style={{ flex: '1' }}
        />
    );
}
