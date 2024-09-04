# Next.js 项目最佳实践

[原文地址](https://juejin.cn/post/7194410416879960125)

## 使用

### [Next.js](https://nextjs.org/)

Next.js 是一个用于构建全栈 Web 应用程序的 React 框架。您可以使用 React Components 来构建用户界面，并使用 Next.js 来实现附加功能和优化。

在底层，Next.js 还抽象并自动配置 React 所需的工具，例如捆绑、编译等。这使您可以专注于构建应用程序，而不是花时间进行配置。

主要特点：

- 基于文件系统的**路由**
- 渲染，支持客户端，服务端渲染，以及 SSG、ISR
- 数据获取，服务端请求组件数据
- 样式， 支持 CSS 模块、Tailwind CSS 和 CSS-in-JS
- 优化：图像、字体和脚本优化，改善应用程序，优化用户体验
- TypeScript: 提供更好的类型检查和更高效的编译

```bash
# 开发环境启动
npm run dev

# 生产使用构建应用程序
npm run build

# 启动一个 Next.js 生产服务器
npm run start

# 检查 Next.js 的内置 ESLint 配置
npm run lint

# ssg 模式打包与预览
npm run ssg
npm run ssg:preview
```

### [Storybook](https://storybook.js.org/) 测试组件

```bash
# 可以通过 http://localhost:6006 访问
npm run storybook
```
