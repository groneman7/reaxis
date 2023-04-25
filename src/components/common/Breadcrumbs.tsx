import { CSSProperties, ReactNode } from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { Layers } from 'lucide-react';
import { AiOutlineHome } from 'react-icons/ai';

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
    // padding: '2px 4px 0 4px',
};

function breadcrumbMap(snippet: string, url: string): { title: ReactNode; icon?: ReactNode } {
    switch (snippet) {
        case 'flashcards':
            return {
                title: (
                    <Link
                        to={url}
                        style={titleStyles}>
                        <Layers style={iconStyles} />
                        Flashcards
                    </Link>
                ),
            };
        default:
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
    }
}

export function Breadcrumbs() {
    const location = useLocation();
    const pathSnippets = location.pathname.split('/');
    console.log(pathSnippets);

    const renderCrumbs = (list: string[]): BreadcrumbItem[] => {
        return list.map((snippet, i) => {
            const url = `/${list.slice(0, i + 1).join('/')}`;
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
