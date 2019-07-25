const MarkdownIt = require('markdown-it');
import chatPlugin from './plugin.js';
const md = new MarkdownIt;
md.use(chatPlugin);
export default function format(src) {
    return md.render(src);
}
export { md as markdown };
