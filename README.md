# chat-formatter

## Usage
```js
import format from 'chat-formatter'

format('**bold!** __underline!__ *italic*');
// => <strong>bold!</string> <u>underline!</u> <em>italic</em>
```

or you can use it as a markdown-it plugin

```js
import MarkdownIt from 'markdown-it'
import chatPlugin from 'chat-formatter/plugin'

const md = new MarkdownIt();

md.use(chatPlugin)

md.render('**bold!** __underline!__ *italic*')
// => <strong>bold!</string> <u>underline!</u> <em>italic</em>
```