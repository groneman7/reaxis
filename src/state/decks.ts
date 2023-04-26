import { assign, createMachine } from 'xstate';
import axios from 'axios';

export const decksMachine = createMachine({
    predictableActionArguments: true,
    initial: 'idle',
    context: {
        decksList: [] as any[],
        error: undefined,
    },
    states: {
        idle: { on: { GET_DECKS: { target: 'loading' } } },
        loading: {
            invoke: {
                id: 'getDecks',
                src: (context, event) =>
                    axios({
                        method: 'get',
                        url: 'http://localhost:9000/api/decks',
                    }),
                onDone: {
                    target: 'success',
                    actions: assign({
                        decksList: (context, event) => event.data.data,
                    }),
                },
                onError: {
                    target: 'failure',
                    actions: assign({ error: (context, event) => event.data.data }),
                },
            },
        },
        success: { on: { REFRESH_DECKS: { target: 'loading' } } },
        failure: {},
    },
});
