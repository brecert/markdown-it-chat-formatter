import { expect } from 'chai'

import { markdown } from '../../src/index'

const headers = `
# H1
## H2
### H3
#### H4
##### H5
###### H6

Alternatively, for H1 and H2, an underline-ish style:

Alt-H1
======

Alt-H2
------
`

const italics = `
Emphasis, aka italics, with *asterisks* or _underscores_.
`

const italicsExpected = `
Emphasis, aka italics, with <em>asterisks</em> or <em>underscores</em>.
`

const bold = `
Strong emphasis, aka bold, with **asterisks**.
`

const boldExpected = `
Strong emphasis, aka bold, with <strong>asterisks</strong>.
`

const underline = `
Underline with __underscores__.
`

const underlineExpected = `
Underline with <u>underscores</u>.
`

const combined = `
Combined emphasis with **asterisks and _underscores_**.
`

const combinedExpected = `
Combined emphasis with <strong>asterisks and <em>underscores</em></strong>.
`
const strikethrough = `
Strikethrough uses two tildes. ~~Scratch this.~~
`

const strikethroughExpected = `
Strikethrough uses two tildes. <s>Scratch this.</s>
`

const lists = `
1. First ordered list item
2. Another item
⋅⋅* Unordered sub-list. 
1. Actual numbers don't matter, just that it's a number
⋅⋅1. Ordered sub-list
4. And another item.

⋅⋅⋅You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).

⋅⋅⋅To have a line break without a paragraph, you will need to use two trailing spaces.⋅⋅
⋅⋅⋅Note that this line is separate, but within the same paragraph.⋅⋅
⋅⋅⋅(This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)

* Unordered list can use asterisks
- Or minuses
+ Or pluses
`

const listsExpected = `
1. First ordered list item
2. Another item
⋅⋅* Unordered sub-list.
1. Actual numbers don't matter, just that it's a number
⋅⋅1. Ordered sub-list
4. And another item.

⋅⋅⋅You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).

⋅⋅⋅To have a line break without a paragraph, you will need to use two trailing spaces.⋅⋅
⋅⋅⋅Note that this line is separate, but within the same paragraph.⋅⋅
⋅⋅⋅(This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)

* Unordered list can use asterisks
- Or minuses
+ Or pluses
`

const links = `
[I'm an inline-style link](https://www.google.com)

[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

[I'm a reference-style link][Arbitrary case-insensitive reference text]

[I'm a relative reference to a repository file](../blob/master/LICENSE)

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself].
`

const linksExpected = `
[I'm an inline-style link](<a href="https://www.google.com">https://www.google.com</a>)

[I'm an inline-style link with title](<a href="https://www.google.com">https://www.google.com</a> &quot;Google's Homepage&quot;)

[I'm a reference-style link][Arbitrary case-insensitive reference text]

[I'm a relative reference to a repository file](../blob/master/LICENSE)

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself].
`

const image = `
Inline-style: 
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

Reference-style: 
![alt text][logo]

[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2"
`

const imageExpected = `
Inline-style:
![alt text](<a href="https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png">https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png</a> &quot;Logo Title Text 1&quot;)

Reference-style:
![alt text][logo]

[logo]: <a href="https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png">https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png</a> &quot;Logo Title Text 2&quot;
`

const linkify = `
Links will automatically be linkified, https://example.com/.
`

const linkifyExpected = `
Links will automatically be linkified, <a href="https://example.com/">https://example.com/</a>.
`

const html = `
<dl>
  <dt>Definition list</dt>
  <dd>Is something people use sometimes.</dd>

  <dt>Markdown in HTML</dt>
  <dd>Does *not* work **very** well. Use HTML <em>tags</em>.</dd>
</dl>
`

const htmlExpected = `
&lt;dl&gt;
&lt;dt&gt;Definition list&lt;/dt&gt;
&lt;dd&gt;Is something people use sometimes.&lt;/dd&gt;

&lt;dt&gt;Markdown in HTML&lt;/dt&gt;
&lt;dd&gt;Does <em>not</em> work <strong>very</strong> well. Use HTML &lt;em&gt;tags&lt;/em&gt;.&lt;/dd&gt;
&lt;/dl&gt;
`

const horizontalRule = `
Three or more...

---

Hyphens

***

Asterisks

___

Underscores
`

const horizontalRuleExpected = horizontalRule

const code = `
Inline \`code\` has \`back-ticks around\` it.
`

const codeExpected = `
Inline <code>code</code> has <code>back-ticks around</code> it.
`

const codeBlock = `
\`\`\`javascript
var s = "JavaScript syntax highlighting";
alert(s);
\`\`\`
 
\`\`\`python
s = "Python syntax highlighting"
print s
\`\`\`
 
\`\`\`
No language indicated, so no syntax highlighting. 
But let's throw in a <b>tag</b>.
\`\`\`
`

const codeBlockExpected = `
<pre><code class="language-javascript">var s = &quot;JavaScript syntax highlighting&quot;;
alert(s);
</code></pre>
<pre><code class="language-python">s = &quot;Python syntax highlighting&quot;
print s
</code></pre>
<pre><code>No language indicated, so no syntax highlighting. 
But let's throw in a &lt;b&gt;tag&lt;/b&gt;.
</code></pre>
`

const escape = `
escape like \\_underscore_
`

const escapeExpected = `
escape like _underscore_
`

describe('Markdown', function() {
	describe('#render', function() {
		it('should not format headers', function() {
			expect(markdown.render(headers)).to.eq(headers.trim())
		})

		it('should format italics', function() {
			expect(markdown.render(italics)).to.eq(italicsExpected.trim())
		})

		it('should format underscores', function() {
			expect(markdown.render(bold)).to.eq(boldExpected.trim())
		})

		it('should format underline', function() {
			expect(markdown.render(underline)).to.eq(underlineExpected.trim())
		})

		it('should format italics and bold combined', function() {
			expect(markdown.render(combined)).to.eq(combinedExpected.trim())
		})

		it('should format strikethrough', function() {
			expect(markdown.render(strikethrough)).to.eq(strikethroughExpected.trim())
		})

		it('should not format lists', function() {
			expect(markdown.render(lists)).to.eq(listsExpected.trim())
		})

		it('shiould not format markdown links', function() {
			expect(markdown.render(links)).to.eq(linksExpected.trim())
		})

		it('should not format markdown images', function() {
			expect(markdown.render(image)).to.eq(imageExpected.trim())
		})

		it('should format code', function() {
			expect(markdown.render(code)).to.eq(codeExpected.trim())
		})

		it('should format codeblocks', function() {
			expect(markdown.render(codeBlock)).to.eq(codeBlockExpected.trimStart())
		})

		it('should linkify links', function() {
			expect(markdown.render(linkify)).to.eq(linkifyExpected.trim())
		})

		it('should not format html', function() {
			expect(markdown.render(html)).to.eq(htmlExpected.trim())
		})

		it('should not format horizontal rules', function () {
			expect(markdown.render(horizontalRule)).to.eq(horizontalRuleExpected.trim())
		})

		it('should escape character', function() {
			expect(markdown.render(escape)).to.eq(escapeExpected.trim())
		})

		it('should not format normal text', function() {
			expect(markdown.render('Are you using markdown-it?')).to.eq('Are you using markdown-it?'.trim())
		})

		it('should handle newlines correctly', function() {
			expect(markdown.render('a\nb\n\nc\n\n\nd\n\n\n\ne')).to.eq('a\nb\n\nc\n\n\nd\n\n\n\ne')
		})
	})
})