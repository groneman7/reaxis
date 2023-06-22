import { CSSProperties, ReactNode } from 'react';

type IconProps = {
    children?: ReactNode;
    // iconStyle?: CSSProperties;
    style?: CSSProperties;
};
export function Icon({ children, /* iconStyle, */ style }: IconProps) {
    return <div style={{ ...style }}>{children}</div>;
}
