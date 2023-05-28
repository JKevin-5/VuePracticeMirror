import { path } from "@vuepress/utils";
const __dirname = path.resolve('./docs/.vuepress/vuepress-plugin-code-copy');
module.exports = (options) => {
    return (app) => {
        return {
            name: 'vuepress-plugin-code-copy',
            clientConfigFile: path.resolve(__dirname, "./clientRootMixin.js")
        }
    }
}