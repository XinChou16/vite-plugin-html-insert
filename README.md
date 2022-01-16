# vite-plugin-html-insert

insert env variables in html file

## install

npm
```sh
npm install --save-dev vite-plugin-html-insert
```

yarn
```sh
yarn add -D vite-plugin-html-insert
```

pnpm
```bash
pnpm install -D vite-plugin-html-insert
```

## usage

visit [example config](./example/vite.config.js)

### 1. inject variables from `.env`

`vite.config.js`
```js
import insertContentHtmlPlugin from 'vite-plugin-html-insert';

export default {
    plugins: [
        insertContentHtmlPlugin()
    ]
}
```

`.env` file

```
VITE_TITLE=awesome
```

`index.html`

```html
<title> %VITE_TITLE% </title>
```

### 2. inject varibales from custom data

`vite.config.js`
```js
import insertContentHtmlPlugin from 'vite-plugin-html-insert';

export default {
    plugins: [
        insertContentHtmlPlugin({
            replacements: {
                CDN_URL: 'https://cdn.me.com'
            }
        })
    ]
}
```

`index.html`

```html
<script>
var CDN_URL = '%CDN_URL%';
</script>
```

### 3. inject content by custom transform

`vite.config.js`
```js
import insertContentHtmlPlugin from 'vite-plugin-html-insert';

export default {
    plugins: [
        insertContentHtmlPlugin({
            transform: (content) => {
                content = content.replace(/%VERSION%/, '2.0.1');
                return content;
            }
        })
    ]
}
```

`index.html`

```html
<script>
var VERSION = '%VERSION%';
</script>
```