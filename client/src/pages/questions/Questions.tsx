import { Button, Divider, List } from 'antd';
import { DefaultPage, Flex, Header } from '../../components';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const data = [{}];

export function Questions() {
    return (
        <DefaultPage header={<Header title="Flashcards" />}>
            <Divider orientation="left">Question sets</Divider>
            <Flex gap={16}>
                <Link
                    to="decks/new"
                    rel="true">
                    <Button
                        icon={<FaPlus style={{ marginTop: 4 }} />}
                        size="large"
                        type="primary"
                        style={{ alignSelf: 'center' }}
                    />
                </Link>
                <List
                    pagination={{ position: 'bottom', align: 'center' }}
                    dataSource={data}
                    renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                                title={<a href="https://ant.design">{item.title}</a>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                        </List.Item>
                    )}
                />
            </Flex>
        </DefaultPage>
    );
}
