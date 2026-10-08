const fs = require('fs');
const path = require('path');

const srcDir = './source/_posts';
const destDir = './astro-posts'; // 先输出到临时目录，检查无误再复制

if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.md'));

files.forEach(file => {
  let content = fs.readFileSync(path.join(srcDir, file), 'utf-8');
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return;

  let fm = match[1];
  const body = content.slice(match[0].length);

  // 字段替换
  fm = fm.replace(/^date:/m, 'pubDate:');
  fm = fm.replace(/^updated:/m, 'updatedDate:');
  fm = fm.replace(/^cover:/m, 'heroImage:');
  // categories 转 category（Fuwari 用单数）
  // fm = fm.replace(/^categories:/m, 'category:');

  // 日期去掉时间部分
  fm = fm.replace(/(pubDate|updatedDate):\s*(\d{4}-\d{2}-\d{2})\s+\d{2}:\d{2}:\d{2}/g, '$1: $2');

  const newContent = `---\n${fm}\n---${body}`;
  fs.writeFileSync(path.join(destDir, file), newContent, 'utf-8');
  console.log(`转换完成: ${file}`);
});

console.log('全部完成，请检查 astro-posts 目录后手动复制到 Astro 项目。');