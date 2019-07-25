var MarkdownIt = require('markdown-it');

function renderEm(tokens, idx, opts, _, slf) {
  var token = tokens[idx];

  if (token.markup === '__') {
    token.tag = 'u';
  }

  return slf.renderToken(tokens, idx, opts);
}

function underline(md) {
  md.renderer.rules.strong_open = renderEm;
  md.renderer.rules.strong_close = renderEm;
}

var MarkdownIt$1 = require('markdown-it');

function test(md) {
  // md.block.ruler.at('paragraph', paragraph as any)
  md.renderer.rules.paragraph_open = () => '';

  md.renderer.rules.paragraph_close = () => '';
}

var MarkdownIt$2 = require('markdown-it');

function modifyNewline(md) {
  var defaultParagraphRenderer = md.renderer.rules.paragraph_open || ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));

  md.renderer.rules.paragraph_open = (tokens, idx, options, env, self) => {
    var result = '';

    if (idx > 1) {
      var inline = tokens[idx - 2];
      var paragraph = tokens[idx];

      if (inline.type === 'inline' && inline.map && inline.map[1] && paragraph.map && paragraph.map[0]) {
        var diff = paragraph.map[0] - inline.map[1];

        if (diff > 0) {
          result = '\n'.repeat(diff + 1);
        }
      }
    }

    return result + defaultParagraphRenderer(tokens, idx, options, env, self);
  };
}

function chatPlugin (md) {
  md.set({
    html: false,
    linkify: true
  });
  md.configure({
    components: {
      core: {
        rules: ['block', 'inline', 'linkify']
      },
      block: {
        rules: [// 'blockquote',
        'code', 'fence', // 'heading',
        // 'hr',
        // 'html_block',
        // 'lheading',
        // 'list',
        'paragraph']
      },
      inline: {
        rules: [// 'autolink',
        'backticks', // 'balance_paris',
        'emphasis', // 'entity',
        'escape', // 'html_inline',
        // 'image',
        // 'link',
        'newline', 'strikethrough', 'text']
      }
    }
  });
  md.use(underline).use(test).use(modifyNewline);
  return md;
}

var MarkdownIt$3 = require('markdown-it');
var md = new MarkdownIt$3();
md.use(chatPlugin);
function format(src) {
  return md.render(src);
}

export default format;
export { md as markdown };
