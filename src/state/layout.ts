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
        MAIN_NAV_TOGGLE(state) {
            state.mainNavOpen = !state.mainNavOpen;
        },
    },
});
