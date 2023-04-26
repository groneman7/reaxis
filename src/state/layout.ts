import { createMachine } from 'xstate';

export const layoutMachine = createMachine({
    predictableActionArguments: true,
    type: 'parallel',
    states: {
        mainNav: {
            initial: 'expanded',
            states: {
                expanded: {
                    on: { COLLAPSE_MAIN_NAV: { target: 'collapsed' } },
                },
                collapsed: {
                    on: { EXPAND_MAIN_NAV: { target: 'expanded' } },
                },
            },
        },
        sidebar: {
            type: 'parallel',
            states: {
                visibility: {
                    initial: 'collapsed',
                    states: {
                        expanded: {
                            on: { COLLAPSE_SIDEBAR: { target: 'collapsed' } },
                        },
                        collapsed: {
                            on: { EXPAND_SIDEBAR: { target: 'expanded' } },
                        },
                    },
                },
            },
        },
    },
});
