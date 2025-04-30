# 🛠 MyBlogServer - Node.js + Express 博客后台系统

这是为前端博客项目 [`MyBlog`](https://github.com/tearlighting/myblog) 提供支持的后端服务，基于 Node.js + Express 构建，使用 Sequelize 操作 MySQL。它不仅完成了基础的 RESTful 接口开发，还涵盖了中间件、认证、参数校验、统一异常处理等服务端关键模块，体现了良好的工程化设计。

## ✨ 项目亮点

- **RESTful 风格接口**：统一的 URL 命名规范与接口结构，职责清晰。
- **JWT 鉴权系统**：从 `cookie + session` 模式过渡到 `JWT + Token` 模式，更贴近现代前后端分离场景。
- **自定义中间件**：
  - `corsMiddleware`：自手写跨域处理逻辑
  - `authMiddleware`：统一验证权限与登录状态
  - `errorMiddleware`：捕获异常并格式化响应结构
- **自研路由匹配系统**：基于类封装的路由注册与匹配逻辑，代替传统硬编码。
- **装饰器参数校验机制**：利用函数装饰器 + 参数装饰器，实现服务层参数合法性校验，彻底解耦业务逻辑与校验逻辑（当时未使用 zod）。
- **ORM 操作数据库**：使用 Sequelize 进行数据库操作，避免手写 SQL，提升开发体验与可维护性。
- **Markdown 转 HTML 标签闭合优化**：自定义栈结构对 `<img>` 等未闭合标签进行补全，提升 HTML 渲染兼容性。

## 🧱 技术栈

- Node.js + Express
- MySQL + Sequelize
- JWT + cookie-parser
- Markdown-it（用于文章内容解析）
- TypeScript

## 📦 安装与启动

```bash
git clone https://github.com/tearlighting/myblogSever.git
cd myblogSever
npm install
npm run dev
```

## 目录结构说明

```csharp
├── src
│   ├── config         # 配置相关（数据库连接等）
│   ├── hooks          # 自定义hooks
│   ├── routes         # 路由注册与匹配类
│   │    └── middleware # 自定义中间件（cors、auth、error等）
│   ├── service        # 业务逻辑 + 装饰器校验
│   ├── dao            # ORM数据库操作封装
│   └── utils          # 工具类（Markdown处理、响应工具等）
```

## 📌 后续计划

- 引入 Zod 重构参数校验逻辑
- 开发后台管理系统应该会用 React 吧
