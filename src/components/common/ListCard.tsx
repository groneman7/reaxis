import { Flex, FlexProps } from '@chakra-ui/layout';
import { Checkbox, Typography } from 'antd';

const { Title, Text } = Typography;

type ListCardProps = {
    name: string;
    description: string;
    selectable?: boolean;
};

export function ListCard({
    children,
    description,
    name,
    selectable,
}: FlexProps & ListCardProps) {
    return (
        <Flex
            direction="column"
            flex="1"
            gap={4}
            mb={32}>
            <Flex
                alignItems="center"
                gap={16}>
                {selectable && <Checkbox />}
                <Title
                    level={5}
                    style={{ margin: 0 }}>
                    {name}
                </Title>
            </Flex>
            <Flex ml={32}>
                <Text
                    strong
                    type="secondary">
                    {description}
                </Text>
            </Flex>
            <Flex ml={32}>{children}</Flex>
        </Flex>
    );
}
