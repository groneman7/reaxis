import { useEffect } from 'react';
import { Dispatch, useDispatch } from '../../state';
import { Button, Divider, Form, Input, Select, Tooltip, Typography } from 'antd';
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

import type { Deck } from '../../../../types';

const { Title } = Typography;

export function NewDeck() {
    const dispatch = useDispatch<Dispatch>();

    const [newDeckForm] = Form.useForm();
    const title = Form.useWatch('name', newDeckForm);

    useEffect(() => {
        dispatch.layout.HEADER_EDIT('Create New Deck');
    }, [dispatch.layout]);

    const handleSaveDraft = () => {
        // Most of this functionality will be shared with handlePublish().
    };

    const handlePublish = () => {
        // Validation needed: (1) Name cannot be empty. (2) Trim empty collaborators and empty notes. (3) All notes must be completed, depending on their type. For example, if it is a standard card, it must have a front and a back. (4) Do not accept a Deck with no notes; it may be saved as a draft but not published.
        // Other validation considerations: (1) Restrict certain characters in the Deck name.
        let collaborators = newDeckForm.getFieldValue('collaborators');
        if (collaborators === undefined) {
            collaborators = [{ userId: 'REAXIS_DEV', permission: 'owner' }];
        } else {
            collaborators.push({ userId: 'REAXIS_DEV', permission: 'owner' });
        }

        const newDeck: Deck = {
            _id: 'new',
            collaborators: [...collaborators],
            description: newDeckForm.getFieldValue('description'),
            name: newDeckForm.getFieldValue('name'),
            notes: newDeckForm.getFieldValue('notes'),
            owner: 'REAXIS_DEV', // ***OWNER HARDCODED
            visibility: 'public', // ***VISIBILITY HARDCODED
        };

        console.log(newDeck);
    };

    return (
        <DefaultPage
            header={<Header title="Create New Deck" />}
            toolbar={
                <Toolbar>
                    <Tooltip
                        placement="bottomLeft"
                        title="Feature Note: Consider creating a standalone 'Import' feature, rather than one integrated with manual creation of a new deck.">
                        <ToolbarButton>Import</ToolbarButton>
                    </Tooltip>
                    <Spacer />
                    <ToolbarButton onClick={handleSaveDraft}>Save Draft</ToolbarButton>
                    <ToolbarButton
                        type="primary"
                        onClick={handlePublish}>
                        Publish
                    </ToolbarButton>
                </Toolbar>
            }>
            <Form
                layout="vertical"
                form={newDeckForm}>
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
                <Form.List name="collaborators">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Flex
                                    align="center"
                                    gap={12}
                                    key={key}>
                                    <Form.Item
                                        name={[name, 'user']} // Needs to display user's name but return user ID.
                                        style={{ flex: 2 }}
                                        {...restField}>
                                        <Select
                                            mode="multiple" // Double check. Shouldn't this be single select?
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
                                <Tooltip
                                    placement="bottom"
                                    title="Feature Note: Users not currently implemented. Consider adding a default permission (e.g., 'Commenter') when new user is added. This will probably help form validation.">
                                    <Button onClick={() => add()}>Add New Collaborator</Button>
                                </Tooltip>
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
