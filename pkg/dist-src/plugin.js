import underline from './plugins/underline.js';
import noParagraph from './plugins/no_paragraph.js';
import newline from './plugins/newline.js';
export default function (md) {
    md.set({
        html: false,
        linkify: true,
    });
    md.configure({
        components: {
            core: {
                rules: [
                    'block',
                    'inline',
                    'linkify',
                ]
            },
            block: {
                rules: [
                    // 'blockquote',
                    'code',
                    'fence',
                    // 'heading',
                    // 'hr',
                    // 'html_block',
                    // 'lheading',
                    // 'list',
                    'paragraph',
                ]
            },
            inline: {
                rules: [
                    // 'autolink',
                    'backticks',
                    // 'balance_paris',
                    'emphasis',
                    // 'entity',
                    'escape',
                    // 'html_inline',
                    // 'image',
                    // 'link',
                    'newline',
                    'strikethrough',
                    'text'
                ]
            }
        }
    });
    md.use(underline)
        .use(noParagraph)
        .use(newline);
    return md;
}
