// example.data.js
import { createContentLoader } from 'vitepress'

interface Post {
    title: string
    url: string
    date: {
      time: number
      string: string
    }
    excerpt: string | undefined
  }
  

export default createContentLoader(['../docs/posts/*.md','../docs/notes/**/*.md'], {
    excerpt: true,
    transform(rawData) {
        // 根据需要对原始数据进行 map、sort 或 filter
        // 最终的结果是将发送给客户端的内容
        return rawData
        .map(({ url, frontmatter, excerpt }) => ({
            frontmatter,
            title: frontmatter.title,
            url,
            excerpt,
            date: formatDate(frontmatter.date)
        }))
        .sort((a, b) => b.date.time - a.date.time)
    }
});

function formatDate(raw: string): Post['date'] {
    const date = new Date(raw)
    date.setUTCHours(12)
    return {
        time: +date,
        string: date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
        })
    }
}
