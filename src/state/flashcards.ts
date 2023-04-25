import { createMachine } from 'xstate';

export const flashcardMachine = createMachine({
    type: 'parallel',
    states: {
        list: {
            initial: 'loading',
            states: {
                loading: {
                    on: { FLASHCARDS_RECEIVED: { target: 'received' } },
                },
                received: {},
            },
        },
        study: {
            initial: 'ready',
            states: {
                ready: {
                    on: { START_STUDY: { target: 'active' } },
                },
                active: {
                    on: { COMPLETE_STUDY: { target: 'completed' } },
                },
                completed: {},
            },
        },
    },
});
