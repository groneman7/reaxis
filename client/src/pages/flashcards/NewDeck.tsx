import { useEffect } from 'react';
import { Dispatch, useDispatch } from '../../state';
import { Button, Divider, Form, Input, Select, Typography } from 'antd';
import {
    DefaultPage,
    Flex,
    Header,
    NewFlashcard,
    Spacer,
    Toolbar,
    ToolbarButton,
} from '../../components';
import { FiMinus } from 'react-icons/fi';

const { Title } = Typography;

export function NewDeck() {
    const dispatch = useDispatch<Dispatch>();

    const [form] = Form.useForm();
    const title = Form.useWatch('name', form);

    useEffect(() => {
        dispatch.layout.HEADER_EDIT('Create New Deck');
    }, []);

    return (
        <DefaultPage
            header={<Header title="Create New Deck" />}
            toolbar={
                <Toolbar>
                    <ToolbarButton>Import</ToolbarButton>
                    <Spacer />
                    <ToolbarButton>Save Draft</ToolbarButton>
                    <ToolbarButton type="primary">Publish</ToolbarButton>
                </Toolbar>
            }>
            <Form
                layout="vertical"
                form={form}>
                <Title>{title || 'New Deck'}</Title>
                <Form.Item
                    label="Name"
                    name="name">
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description">
                    <Input.TextArea autoSize={{ minRows: 2 }} />
                </Form.Item>
                <Divider orientation="left">Sharing</Divider>
                <Form.List name="contributors">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Flex
                                    align="center"
                                    gap={12}
                                    key={key}>
                                    <Form.Item
                                        name={[name, 'user']}
                                        style={{ flex: 2 }}
                                        {...restField}>
                                        <Select
                                            mode="multiple"
                                            placeholder="Search users"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name={[name, 'permission']}
                                        style={{ flex: 1 }}
                                        {...restField}>
                                        <Select
                                            options={[
                                                { value: 'editor', label: 'Editor' },
                                                {
                                                    value: 'commenter',
                                                    label: 'Commenter',
                                                },
                                            ]}
                                        />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button
                                            onClick={() => remove(name)}
                                            shape="circle"
                                            size="small">
                                            <FiMinus style={{ marginTop: 4 }} />
                                        </Button>
                                    </Form.Item>
                                </Flex>
                            ))}
                            <Form.Item>
                                <Button onClick={() => add()}>Add New Contributor</Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>

                <Divider orientation="left">Notes</Divider>
                <Form.List name="notes">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <NewFlashcard
                                    key={key}
                                    name={name}
                                    remove={remove}
                                    {...restField}
                                />
                            ))}
                            <Form.Item>
                                <Button
                                    onClick={() => add()}
                                    type="primary">
                                    Add Note
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form>
        </DefaultPage>
    );
}
