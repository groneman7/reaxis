import axios, { AxiosError } from 'axios';
import { RootModel, createModel } from '.';

type FlashcardsState = {
    cards: {
        list: any[];
    };
    decks: {
        list: any[];
    };
    study: {
        status: 'ready' | 'active' | 'completed';
    };
};

export const flashcards = createModel<RootModel>()({
    state: {
        cards: {
            list: [],
        },
        decks: {
            list: [],
        },
        study: {
            status: 'ready',
        },
    } as FlashcardsState, //
    reducers: {
        CARDS_LOAD({ cards }, payload) {
            cards.list = payload;
        },
        DECKS_LOAD({ decks }, payload: any[]) {
            decks.list = payload;
        },
        STUDY_BEGIN({ study }) {
            study.status = 'active';
        },
        STUDY_END({ study }) {
            study.status = 'completed';
        },
        STUDY_READY({ study }) {
            study.status = 'ready';
        },
    },
    effects: (dispatch) => ({
        async getDecksList() {
            try {
                const { data } = await axios({
                    method: 'get',
                    url: 'http://localhost:9000/api/decks',
                });

                dispatch.flashcards.DECKS_LOAD(data);
            } catch (ex) {
                if (ex instanceof AxiosError) {
                    console.warn(
                        `${ex.message}. Check that Reaxis API is running and available.`
                    );
                }
            }
        },
    }),
});
