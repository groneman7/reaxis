import { Button, ButtonProps, Flex, FlexProps, Icon } from '@chakra-ui/react';

export function QuickActionBar(props: FlexProps) {
    const { children } = props;
    return (
        <Flex
            borderBottom="1px"
            borderBottomColor="gray.200"
            bg="white"
            gap="2"
            px="4"
            py="2">
            {children}
        </Flex>
    );
}

type QuickActionButtonProps = {
    icon?: any;
};

export function QuickActionButton(props: ButtonProps & QuickActionButtonProps) {
    const { children, icon } = props;
    return (
        <Button
            leftIcon={
                icon && (
                    <Icon
                        as={icon}
                        boxSize="4"
                    />
                )
            }
            size="sm"
            variant="quickAction"
            {...props}>
            {children}
        </Button>
    );
}
