import type { ReactNode } from 'react';

interface HasChildren {
    children: ReactNode | ReactNode[];
}

export interface ToolbarProps extends HasChildren {}
