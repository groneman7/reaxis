import React from 'react';
import ReactDOM from 'react-dom/client';

import { ConfigProvider, ThemeConfig } from 'antd';
import 'antd/dist/reset.css';

import App from './App';

const theme: ThemeConfig = {
    token: {
        fontFamily:
            "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
        fontSize: 16,
    },
    components: {
        Menu: {
            colorItemTextSelected: '#ffffff',
            colorItemBgSelected: '#1677ff',
        },
    },
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ConfigProvider theme={theme}>
            <App />
        </ConfigProvider>
    </React.StrictMode>
);
