import { RootState, useSelector } from '../../state';
import { Typography } from 'antd';
import { Breadcrumbs, Flex } from './';

const { Title } = Typography;

export function Header() {
    const headerTitle = useSelector((state: RootState) => state.layout.header);

    return (
        <Flex
            style={{
                alignItems: 'center',
                borderBottom: '1px solid #f0f0f0',
                height: 72,
                padding: '0 32px 0 32px',
            }}>
            <Flex column>
                <Breadcrumbs />
                <Title
                    level={1}
                    style={{ fontSize: 24, margin: '4px 0 0 0' }}>
                    {headerTitle}
                </Title>
            </Flex>
        </Flex>
    );
}
