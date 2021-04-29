# 通过`iconfont.js`提供的项目在线js地址来批量生产独立图标svg文件的小工具
# How to use
```bash
# 安装
npm install @njshaoshao/iconfont-svgs-getter -g

# 使用
iconfont-getter -u http://at.alicdn.com/t/font_1166492_9wf3vffws5h.js -o ~/test
```

参数介绍

|短参数|长参数|介绍|
|:--|:--|:--:|
|-u|--url|项目的在线js地址|
|-o|--output|svg文件存储路径|

功能实现

1. 从命令中读取 iconfont 项目的 js 地址
2. 获取 js 的文本信息
3. 从 js 的文本中解析出项目的 svg 内容
4. 切分 symbol 并解析
5. 循环处理每一个 symbol 并替换相关参数, 清理 svg 文件夹中的文件,并写入新的 svg 文件

svg存储路径

1. 参数提供的基础存储路径
2. 根据 icon 的 class 属性后缀 filled/outlined/twotone 会将 svg 分别写入对应的文件夹,这符合 antd 的规则
3. 如果 class 不符合上述三种后缀,则会进入 other 文件夹

 
