import { RootModel, createModel } from '.';

type LayoutState = {
    header: string;
    mainNavOpen: boolean;
};

export const layout = createModel<RootModel>()({
    state: {
        header: 'Home',
        mainNavOpen: true,
        quickActions: [],
    } as LayoutState,
    reducers: {
        HEADER_EDIT(state, payload) {
            state.header = payload;
        },
        MAIN_NAV_TOGGLE(state) {
            state.mainNavOpen = !state.mainNavOpen;
        },
    },
});
