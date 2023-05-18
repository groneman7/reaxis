export { useDispatch, useSelector } from 'react-redux';
export { createModel } from '@rematch/core';
import { Models, RematchDispatch, RematchRootState, init } from '@rematch/core';
import immerPlugin from '@rematch/immer';
import persistPlugin from '@rematch/persist';
import selectPlugin from '@rematch/select';
import storage from 'redux-persist/lib/storage';

import { flashcards } from './flashcards';
import { layout } from './layout';
import { quickActions } from './quickActions';

export interface RootModel extends Models<RootModel> {
    flashcards: typeof flashcards;
    layout: typeof layout;
    quickActions: typeof quickActions;
}

export const models: RootModel = { flashcards, layout, quickActions };

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
