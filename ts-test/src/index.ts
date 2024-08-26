import type MarkdownIt from 'markdown-it'

import Markdown from 'markdown-it'

const MarkdownItTest:MarkdownIt.PluginWithOptions<{}> = ((md) => {
    // 保留默认规则
    const defaultRenderer = md.renderer.rules.fence!.bind(md.renderer.rules)
    md.renderer.rules.fence = (tokens, index, options, env, slf) => {
        const token = tokens[index]
        console.log("tokens",tokens)
        console.log(token.content.trim())
        return defaultRenderer(tokens, index, options, env, slf)
    }
})

const md = new Markdown();

md.use(MarkdownItTest);

console.log(md.render(
    `\`\`\`cddd
     Hello, world!
     \`\`\``));

export default MarkdownItTest;