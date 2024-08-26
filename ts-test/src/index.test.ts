import MarkdownIt from "markdown-it";
import MarkdownItTest from ".";

const md = new MarkdownIt();

md.use(MarkdownItTest);

md.render(`
    \`\`\`js 
    Hello, world!
    \`\`\`
`);