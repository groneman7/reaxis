import { Button, Form, Input, Popconfirm } from 'antd';
import { Flex } from '../../components';
import { FiMinus } from 'react-icons/fi';

export function NewFlashcard(props: any) {
    return (
        <Flex
            align="center"
            gap={12}>
            <Form.Item
                name={[props.name, 'front']}
                style={{
                    flex: 1,
                }}
                {...props.restField}>
                <Input.TextArea autoSize />
            </Form.Item>
            <Form.Item
                name={[props.name, 'back']}
                style={{
                    flex: 1,
                }}
                {...props.restField}>
                <Input.TextArea autoSize />
            </Form.Item>
            <Form.Item>
                <Popconfirm
                    arrow={{ pointAtCenter: true }}
                    description="Are you sure to delete this card?"
                    cancelText="Cancel"
                    okButtonProps={{ danger: true }}
                    okText="Delete"
                    onConfirm={() => props.remove(props.name)}
                    placement="topRight"
                    title="Delete card">
                    <Button
                        shape="circle"
                        size="small">
                        <FiMinus style={{ marginTop: 4 }} />
                    </Button>
                </Popconfirm>
            </Form.Item>
        </Flex>
    );
}
