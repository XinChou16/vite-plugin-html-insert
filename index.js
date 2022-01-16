const path = require('path');
const fs = require('fs');
const { loadEnv } = require('vite');

const resolve = p => path.resolve(process.cwd(), p);

const readHtmlTemplate = async filePath => {
    return await fs.promises.readFile(filePath, { encoding: 'utf8' });
};

const getHtmlContent = async (filePath, mode, options) => {
    try {
        filePath = resolve(filePath);
        let content = await readHtmlTemplate(filePath);
        const envs = loadEnv(mode, process.cwd()) || {};

        const { transform, replacements = {} } = options;
        if (transform) {
            content = transform(content);
        }

        Object.keys(replacements).forEach(key => {
            content = content.replace(new RegExp('%' + key + '%'), replacements[key]);
        });

        Object.keys(envs).forEach(key => {
            content = content.replace(new RegExp('%' + key + '%'), envs[key]);
        });

        return content;
    } catch (error) {
        console.error(error);
    }
};

const insertContentHtmlPlugin = (options = {}) => {
    let _env;
    return {
        name: 'vite-plugin-html-insert',
        config(_, env) {
            _env = env;
        },
        configureServer({ middlewares, config }) {
            middlewares.use(async (req, res, next) => {
                const url = req._parsedUrl.pathname;
                if (path.extname(url) !== '.html' && url !== '/') {
                    return next();
                }

                const content = await getHtmlContent('.' + url, config.mode, options);
                res.end(content);
            });
        },
        load(id) {
            if (path.extname(id) === '.html') {
                return getHtmlContent(id, _env.mode, options);
            }

            return null;
        }
    };
};

module.exports = insertContentHtmlPlugin;
