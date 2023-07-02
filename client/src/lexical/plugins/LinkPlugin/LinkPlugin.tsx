import { LinkPlugin as LexicalLinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { validateUrl } from '../../utils';

export function LinkPlugin() {
    return <LexicalLinkPlugin validateUrl={validateUrl} />;
}
