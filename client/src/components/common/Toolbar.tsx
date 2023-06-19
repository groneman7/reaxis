import { Button, ButtonProps } from 'antd';
import { Flex, FlexProps } from '.';

export function Toolbar({ children }: FlexProps) {
    return (
        <Flex
            gap={8}
            style={{
                // borderBottom: '1px solid',
                margin: '-32px -64px 32px -64px',
                padding: '4px',
            }}>
            {children}
        </Flex>
    );
}

export function ToolbarButton(props: ButtonProps) {
    const { children } = props;
    return <Button {...props}>{children}</Button>;
}
