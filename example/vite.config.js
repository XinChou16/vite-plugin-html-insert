import insertContentHtmlPlugin from '../';

export default {
    plugins: [
        insertContentHtmlPlugin({
            replacements: {
                CDN_URL: 'https://cdn.me.com'
            },
            transform: (content) => {
                content = content.replace(/%VERSION%/, '2.0.1');
                return content;
            }
        })
    ]
}