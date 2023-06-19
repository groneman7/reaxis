import { RootModel, createModel } from '.';

type DEV_AUTH_STATE = {
    flashcards: {
        collections: string[];
        decks: string[];
        queue: string[];
    };
    userId: string;
};

export const DEV_AUTH = createModel<RootModel>()({
    state: {
        userId: 'groneman7',
        flashcards: {
            collections: ['6417a4ad5e0614fa3400dc71'],
            decks: [
                '6417a3e65e0614fa3400dc6c',
                '6417a5045e0614fa3400dc76',
                '64482e4dcf8bd21afcbd486e',
                '64482e4dcf8bd21afcbd4864',
                '64482e4dcf8bd21afcbd4884',
                '64482e4dcf8bd21afcbd4887',
                '64482e4dcf8bd21afcbd487b',
            ],
            queue: [''],
        },
    } as DEV_AUTH_STATE,
});
