import { useState } from 'react';
import { Button, Form, Input, Radio } from 'antd';
import { DefaultPage } from '../../components';

export function NewDeck() {
    const [form] = Form.useForm();

    return (
        <DefaultPage style={{ alignItems: 'center' }}>
            <Form
                layout="vertical"
                form={form}
                // initialValues={{ deckName: '' }}
                // onValuesChange={onFormLayoutChange}
                style={{ maxWidth: 1200 }}>
                <Form.Item label="Field A">
                    <Input placeholder="input placeholder" />
                </Form.Item>
                <Form.Item label="Field B">
                    <Input placeholder="input placeholder" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary">Submit</Button>
                </Form.Item>
            </Form>
        </DefaultPage>
    );
}
