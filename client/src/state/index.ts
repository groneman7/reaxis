export { useDispatch, useSelector } from 'react-redux';
export { createModel } from '@rematch/core';
import { Models, RematchDispatch, RematchRootState, init } from '@rematch/core';
import immerPlugin from '@rematch/immer';
import persistPlugin from '@rematch/persist';
import selectPlugin from '@rematch/select';
import storage from 'redux-persist/lib/storage';

import { DEV_AUTH } from './DEVauth';
import { flashcards } from './flashcards';
import { layout } from './layout';

export interface RootModel extends Models<RootModel> {
    DEV_AUTH: typeof DEV_AUTH;
    flashcards: typeof flashcards;
    layout: typeof layout;
}

export const models: RootModel = { DEV_AUTH, flashcards, layout };

const persistConfig = {
    key: 'reaxis-persistence',
    storage,
    blacklist: ['quickActions'],
};

export const store = init<RootModel>({
    name: 'default-reaxis-store',
    models,
    plugins: [immerPlugin(), persistPlugin(persistConfig), selectPlugin()],
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
