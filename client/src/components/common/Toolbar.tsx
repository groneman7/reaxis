import { Button, ButtonProps } from 'antd';
import { Flex, FlexProps } from '.';

export function Toolbar({ children }: FlexProps) {
    return (
        <Flex
            gap={8}
            style={{ borderBottom: '1px solid #f0f0f0', padding: 8 }}>
            {children}
        </Flex>
    );
}

export function ToolbarButton(props: ButtonProps) {
    const { children } = props;
    return <Button {...props}>{children}</Button>;
}
