import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import { store } from './state';
import { ConfigProvider, ThemeConfig } from 'antd';
import App from './App';
import 'antd/dist/reset.css';

const theme: ThemeConfig = {
    token: {
        fontFamily:
            "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
        fontSize: 16,
    },
    components: {},
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <ConfigProvider theme={theme}>
                <Provider store={store}>
                    <App />
                </Provider>
            </ConfigProvider>
        </BrowserRouter>
    </React.StrictMode>
);
