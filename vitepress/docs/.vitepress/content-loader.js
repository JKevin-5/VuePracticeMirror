const fs = require('fs');
const path = require('path');
const { createContentLoader } = require('vitepress');

module.exports = createContentLoader('docs/**/*.md', {
  transform(rawData) {
    return rawData.map((item) => {
      const filePath = path.join(__dirname, '../', item.filePath);
      const stats = fs.statSync(filePath);

      // 获取文件的创建时间
      const createdAt = stats.birthtime;

      return {
        ...item,
        createdAt,
      };
    });
  },
});
