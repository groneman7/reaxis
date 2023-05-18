import { ReactNode } from 'react';
import { RootModel, createModel } from '.';

export const quickActions = createModel<RootModel>()({
    state: [] as ReactNode[],
    reducers: {
        SET(state, payload: ReactNode[]) {
            return (state = payload);
        },
    },
});
