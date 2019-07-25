import underline from './plugins/underline'
import noParagraph from './plugins/no_paragraph'
import newline from './plugins/newline'

export default function(md: any) {
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
	    // 'normalize',
	    // 'replacements',
	    // 'smartquotes'
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
	    // 'reference',
	    // 'table'
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
	  .use(newline)

  return md
}