const MarkdownIt = require('markdown-it');
function renderEm(tokens, idx, opts, _, slf) {
    let token = tokens[idx];
    if (token.markup === '__') {
        token.tag = 'u';
    }
    return slf.renderToken(tokens, idx, opts);
}
export default function underline(md) {
    md.renderer.rules.strong_open = renderEm;
    md.renderer.rules.strong_close = renderEm;
}
