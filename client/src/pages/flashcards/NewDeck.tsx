import { useEffect, useState } from 'react';
import { Dispatch, useDispatch } from '../../state';
import { Button, Divider, Form, Input, Segmented, Select, Typography } from 'antd';
import { DefaultPage, Flex } from '../../components';
import { FiMinus } from 'react-icons/fi';

const { Title } = Typography;

export function NewDeck() {
    const dispatch = useDispatch<Dispatch>();
    const [settingsBlock, setSettingsBlock] = useState('general');

    const [form] = Form.useForm();
    const title = Form.useWatch('name', form);

    useEffect(() => {
        dispatch.layout.HEADER_EDIT('Create New Deck');
    }, []);

    return (
        <DefaultPage style={{ alignItems: 'stretch' }}>
            <Form
                layout="vertical"
                form={form}>
                <Title>{title || 'New Deck'}</Title>
                <Divider orientation="left">Settings</Divider>
                <Segmented
                    // @ts-ignore
                    onChange={setSettingsBlock}
                    options={[
                        { value: 'general', label: 'General' },
                        { value: 'advanced', label: 'Advanced' },
                    ]}
                    value={settingsBlock}
                    style={{ marginBottom: 24 }}
                />
                {settingsBlock === 'general' ? (
                    <>
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
                    </>
                ) : (
                    <>
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
                                        <Button onClick={() => add()}>
                                            Add New Contributor
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                    </>
                )}

                <Divider orientation="left">Notes</Divider>
                <Flex gap={12}>
                    <Form.Item style={{ flex: 1 }}>
                        <Button block>Save Draft</Button>
                    </Form.Item>
                    <Form.Item style={{ flex: 2 }}>
                        <Button
                            block
                            type="primary">
                            Publish
                        </Button>
                    </Form.Item>
                </Flex>
            </Form>
        </DefaultPage>
    );
}
