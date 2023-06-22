import { CSSProperties } from 'react';

export const editorThemeClasses = {
    ltr: 'ltr',
    rtl: 'rtl',
    placeholder: 'editor-placeholder',
    paragraph: 'editor-paragraph',
    quote: 'editor-quote',
    heading: {
        h1: 'editor-heading-h1',
        h2: 'editor-heading-h2',
        h3: 'editor-heading-h3',
        h4: 'editor-heading-h4',
        h5: 'editor-heading-h5',
        h6: 'editor-heading-h6',
    },
    list: {
        nested: {
            listitem: 'editor-nested-listitem',
        },
        ol: 'editor-list-ol',
        ul: 'editor-list-ul',
        listitem: 'editor-listitem',
    },
    image: 'editor-image',
    link: 'editor-link',
    text: {
        bold: 'editor-text-bold',
        italic: 'editor-text-italic',
        overflowed: 'editor-text-overflowed',
        hashtag: 'editor-text-hashtag',
        underline: 'editor-text-underline',
        strikethrough: 'editor-text-strikethrough',
        underlineStrikethrough: 'editor-text-underlineStrikethrough',
        code: 'editor-text-code',
    },
};

export const defaultStyle: Record<'button' | 'icon' | 'toolbar', CSSProperties> = {
    button: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
    },
    icon: { marginLeft: 2, marginRight: -6 },
    toolbar: {
        alignItems: 'center',
        background: '#e6f4ff',
        display: 'flex',
        flex: 1,
        gap: 8,
        justifyContent: 'flex-start',
        padding: 4,
    },
};
