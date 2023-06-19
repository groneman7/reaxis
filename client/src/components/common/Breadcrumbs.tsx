import { CSSProperties, ReactNode } from 'react';
import { Breadcrumb, Typography } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { RxLayers } from 'react-icons/rx';

const { Text } = Typography;

type BreadcrumbItem = {
    key: string;
    icon?: ReactNode;
    title: ReactNode;
    url?: ReactNode;
};

const iconStyles: CSSProperties = {
    marginBottom: 1,
};

const titleStyles: CSSProperties = {
    alignItems: 'center',
    display: 'flex',
    gap: 2,
};

function breadcrumbMap(snippet: string, url: string): { title: ReactNode; icon?: ReactNode } {
    switch (snippet) {
        case '':
            return {
                title: (
                    <Link
                        to={url}
                        style={titleStyles}>
                        <AiOutlineHome style={iconStyles} />
                        Home
                    </Link>
                ),
            };
        case 'flashcards':
            return {
                title: (
                    <Link
                        to={url}
                        style={titleStyles}>
                        <RxLayers style={iconStyles} />
                        Flashcards
                    </Link>
                ),
            };

        default:
            return {
                title: (
                    <Text style={titleStyles}>
                        <AiOutlineHome style={iconStyles} />
                        Undefined
                    </Text>
                ),
            };
    }
}

export function Breadcrumbs() {
    const location = useLocation();
    let pathSnippets = location.pathname.split('/');
    if (pathSnippets.length > 0 && pathSnippets[pathSnippets.length - 1] === '') {
        pathSnippets = pathSnippets.filter((snippet, i) => i > 0 && snippet !== '');
    }

    const renderCrumbs = (list: string[]): BreadcrumbItem[] => {
        return list.map((snippet, i) => {
            const url = snippet === '' ? '' : `/${list.slice(1, i + 1).join('/')}`;
            return { key: snippet, url, ...breadcrumbMap(snippet, url) };
        });
    };

    return (
        <Breadcrumb
            items={renderCrumbs(pathSnippets)}
            style={{ alignItems: 'center', fontSize: 14 }}
        />
    );
}
