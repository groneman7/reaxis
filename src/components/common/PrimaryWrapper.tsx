import { Flex, FlexProps } from '@chakra-ui/react';

export function PrimaryWrapper(props: FlexProps) {
    const { children } = props;

    return (
        <Flex
            bg="blue.50"
            direction="column"
            flex="1"
            {...props}>
            {children}
        </Flex>
    );
}
