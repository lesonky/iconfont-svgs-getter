#!/usr/bin/env node
'use strict';

const { getUrlContent } = require('./tool.js');
const path = require('path');
const fs = require('fs-extra');
const kebabCase = require('lodash.kebabcase');
const { Command } = require('commander');
const program = new Command();
const { version = '1.0.0' } = require('../package.json');

async function main({ url = '', output = 'svg' }) {
  try {
    // 获取 url 内容
    console.log('Fetching iconfont.js');
    const content = await getUrlContent(url);
    console.log('Fetching iconfont.js finished');
    // 获取 内容中 symbol 部分
    const symbols = content.match(/(?<=\<svg\>)(.*?)(?=\<\/svg\>)/) || [];
    if (!symbols[0]) {
      throw new Error('No symbols found!');
    }
    // 切分 symbols
    const symbolsList = symbols[0].match(/\<symbol.*?symbol\>/g);
    // 循环处理 symbols
    if (!symbolsList.length) {
      throw new Error('No symbols found!');
    }
    fs.emptyDirSync(path.resolve(__dirname, `${output}/filled`));
    fs.emptyDirSync(path.resolve(__dirname, `${output}/outlined`));
    fs.emptyDirSync(path.resolve(__dirname, `${output}/twotone`));
    fs.emptyDirSync(path.resolve(__dirname, `${output}/other`));

    symbolsList.forEach((symbol) => {
      // 获取名称
      let symbolName = kebabCase(/(?<=id="icon).*?(?=")/.exec(symbol));

      // 处理主题
      let folderName;
      if (/filled$/i.test(symbolName)) {
        folderName = 'filled';
        symbolName = symbolName.replace(/-filled$/i, '');
      } else if (/outlined$/i.test(symbolName)) {
        folderName = 'outlined';
        symbolName = symbolName.replace(/-outlined$/i, '');
      } else if (/twotone$/i.test(symbolName)) {
        folderName = 'twotone';
        symbolName = symbolName.replace(/-twotone$/i, '');
      } else {
        folderName = 'other';
      }

      // 替换标签参数
      symbol = symbol.replace(
        /\<symbol.*?\>/,
        `<?xml version="1.0" standalone="no"?>
    <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 1024 1024">
      `
      );
      symbol = symbol.replace(
        /\<\/symbol>/,
        `
    </svg>`
      );
      // 写入文件
      console.log(`Writing file ${symbolName}.svg`);
      fs.writeFileSync(path.resolve(__dirname, `${output}/${folderName}`, `${symbolName}.svg`), symbol, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    });
    console.log(`All files write finished, you can find them at ${path.resolve(__dirname, output)}`);
  } catch (e) {
    console.error(e);
    throw e;
  }
}

program
  .version(version)
  .option('-u,--url <url>', 'Iconfont.js url of the project')
  .option('-o,--output [output]', 'Output folderName for svg files');

program.on('--help', function () {
  console.log('');
  console.log('Example:');
  console.log('  $ iconfont-getter -u http://your-project-url -o svg');
});

program.parse(process.argv);

main(program.opts());

module.exports = { main };
