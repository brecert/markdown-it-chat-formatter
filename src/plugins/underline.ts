const MarkdownIt = require('markdown-it')

function renderEm (tokens: any, idx: number, opts: any, _: any, slf: any) {
  let token = tokens[idx];

  if (token.markup === '__') {
    token.tag = 'u';
  }
  
  return slf.renderToken(tokens, idx, opts);
}

export default function underline(md: any) {
	md.renderer.rules.strong_open = renderEm
	md.renderer.rules.strong_close = renderEm
}