import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, createMultiStyleConfigHelpers, extendTheme } from '@chakra-ui/react';
import App from './App';

import { alertAnatomy } from '@chakra-ui/anatomy';
const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    alertAnatomy.keys
);
const Alert = defineMultiStyleConfig({
    baseStyle: definePartsStyle({
        container: {
            borderRadius: 'base',
            fontSize: 'sm',
        },
    }),
});

const theme = extendTheme({
    components: {
        Alert,
        Button: {
            variants: {
                quickAction: {
                    bg: 'transparent',
                    color: 'gray.500',
                    _hover: {
                        bg: 'gray.200',
                    },
                    _active: {
                        bg: 'gray.400',
                        color: 'gray.600',
                    },
                },
            },
        },
    },
    fonts: {
        body: 'Inter, system-ui, sans-serif',
        heading: 'Inter, system-ui, sans-serif',
    },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <App />
        </ChakraProvider>
    </React.StrictMode>
);
