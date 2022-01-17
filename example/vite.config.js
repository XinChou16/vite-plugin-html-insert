import insertContentHtmlPlugin from '../';
import path from 'path';

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
    ],
    build: {
        rollupOptions: {
            input: {
                index: path.resolve(__dirname, 'index.html'),
                main: path.resolve(__dirname, 'main.html')
            }
        }
    }
}