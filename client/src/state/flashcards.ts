import axios, { AxiosError } from 'axios';
import { RootModel, createModel } from '.';
import type { Deck } from '../../../types';

type FlashcardsState = {
    activeDeckId: string;
    decks: {
        list: any[];
    };
    notes: {
        list: any[];
    };
    study: {
        status: 'ready' | 'active' | 'completed';
    };
};

export const flashcards = createModel<RootModel>()({
    state: {
        activeDeckId: '',
        decks: {
            list: [],
        },
        notes: {
            list: [],
        },
        study: {
            status: 'ready',
        },
    } as FlashcardsState,
    reducers: {
        DECKS_CLEAR({ decks }) {
            decks.list = [];
        },
        DECKS_LOAD({ decks }, payload: any[]) {
            decks.list = payload;
        },
        NOTES_ADD({ notes }, payload: any[]) {
            // Exclude duplicates
            // for (let i = 0; i < payload.length; i++) {
            // }
        },
        NOTES_CLEAR({ notes }) {
            notes.list = [];
        },
        NOTES_LOAD({ notes }, payload) {
            notes.list = payload;
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
        async getDecksList(deckIds: string[]) {
            try {
                const { data } = await axios({
                    method: 'get',
                    url: 'http://localhost:9000/api/decks',
                    params: { deckIds },
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
        async loadNotesByDeck(deckId: string) {
            try {
                const { data } = await axios({
                    method: 'get',
                    url: 'https://localhost:9000/api/notes',
                    params: { deckId },
                });
                dispatch.flashcards.NOTES_LOAD(data);
            } catch (ex) {
                if (ex instanceof AxiosError) {
                    console.warn(
                        `${ex.message}. Check that Reaxis API is running and available.`
                    );
                }
            }
        },
        async publishNewDeck(deck: Deck) {
            try {
                const test = await axios({
                    method: 'post',
                    url: 'https://localhost:9000/api/decks',
                    data: { ...deck },
                });
                console.log(test);
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
