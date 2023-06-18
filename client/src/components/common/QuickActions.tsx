import { RootState, useSelector } from '../../state';

export function QuickActions() {
    const quickActions = useSelector((state: RootState) => state.quickActions);

    if (!quickActions) return null;
    return <>{quickActions.map((a) => a)}</>;
}
