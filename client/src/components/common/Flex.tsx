import { CSSProperties, ReactNode } from 'react';
export type FlexProps = {
    align?: string;
    children?: ReactNode;
    className?: string;
    column?: boolean;
    flex?: string;
    gap?: number;
    justify?: string;
    style?: CSSProperties;
};

export function Flex(props: FlexProps) {
    const { align, children, className, column, flex, gap, justify, style } = props;

    return (
        <div
            className={className}
            style={{
                alignItems: align,
                display: 'flex',
                flex: flex,
                flexDirection: column ? 'column' : 'row',
                gap: gap,
                justifyContent: justify,
                ...style,
            }}>
            {children}
        </div>
    );
}
