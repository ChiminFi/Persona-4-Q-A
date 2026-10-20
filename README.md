# Persona 4 Golden Inspired AI Web

[English](README.en.md) · [简体中文](README.md)

以 Persona 4 Golden 为视觉灵感的游戏攻略 AI 助手作品集项目。当前交付的是 **WOOD 桌面与小屏界面，以及本地模拟聊天**；真实 AI、检索和后端尚未接入。

## 当前状态

状态核对：2026-10-20（Asia/Taipei），包含 8f7d102 之后将会话状态移回 ChatPanel、简化输入管理的工作区改动。

- 已实现消息发送、多轮示例消息、loading、模拟逐词流式、错误提示与 Retry、静态 Sources、自动滚动和输入框自动增高。
- 桌面与小屏使用同一棵聊天 DOM；CSS 在宽度小于 48rem 时切换装饰与布局，不卸载聊天组件，也不运行两份聊天逻辑。
- messages、status、发送逻辑与计时器由 ChatPanel 管理。ChatComposer 使用不受控输入，通过 FormData 读取并在提交后重置表单。聊天 DOM 在断点切换时保持挂载，因此消息与未发送草稿保留；刷新或离开页面后不保存记录。
- 项目所有者已确认当前浏览器响应式与交互基本正常，并选择保留现有输入区样式；不宣称逐像素还原小屏稿。
- **真机软键盘与 safe-area 验证暂缓**。极端长文本、宽代码块/表格及 Sources、很矮的桌面窗口仍需专项覆盖，尚无高度专用规则。

## 预览与设计

![桌面 WOOD 主题与中文示例消息](docs/images/wood-large-zh-CN.webp)

桌面 WOOD 展示。

<p>
  <img src="docs/images/wood-mobile-zh-CN.webp" alt="小屏 WOOD 主题聊天界面" width="280" />
</p>

小屏 WOOD 展示：独立外框与共享聊天区域。两张截图中的消息均为本地示例，不是实时 AI 回答，也不代表已完成真机键盘验证。

[小屏 Figma 参考：390 × 844，节点 21:1484](https://www.figma.com/design/jJbm601weSdkUNfCRVt2xE/Untitled?node-id=21-1484)。当前版本保留了已确认的输入区和消息样式差异。

## 已实现内容

- 桌面木质电视、天线、扬声器、装饰旋钮、地面阴影和 CRT 屏幕；小屏使用独立的木框、银边、金属凹槽和玻璃装饰层。
- 共享聊天区域，与两端装饰层并列；桌面保留百分比定位和 aspect-ratio，小屏使用视口高度与四边留白。
- shadcn MessageScroller / Message / Bubble / Trace，以及 AI Elements MessageResponse / Streamdown 的 Markdown 渲染。
- Enter 发送、Shift+Enter 换行、输入法组合输入保护、忙碌期间禁止提交、FormData 表单提交与重置，以及输入自动增高。
- 独立的 /crt-distortion-test 实验页；扭曲滤镜没有接入主聊天页面。

## 本地模拟的边界

示例消息每 500ms 自动追加。发送后等待 1700ms，再以 80ms 间隔追加固定回复中的单词；这不是模型推理或网络流式。

输入 error（忽略首尾空白与大小写）会生成错误卡片。Retry 重新追加上一条用户内容和一轮请求，不替换原错误；因此重试 error 仍会失败。错误保存在消息 kind 中，status 随后回到 idle。

Sources 使用硬编码展示数据，包含 example.com 占位链接，不代表检索结果或已核实引用。已安装 ai SDK，但尚无真实聊天 transport、模型请求或 API 路由。

## 技术栈

| 技术 | 当前用途 |
| --- | --- |
| Next.js 16.4.0 / React 19.3.0 / TypeScript | App Router、组件和状态 |
| Tailwind CSS 4 / CSS Modules | 工具样式、电视几何和响应式 |
| shadcn/ui：Base UI + Nova | 基础交互组件 |
| @shadcn/react / AI Elements / Streamdown | 消息滚动、消息组件与 Markdown |
| SVG / CSS 渐变 | 桌面资源与小屏外框 |
| ai（package.json 中 ^7.0.137） | 已安装，未接入真实聊天 |

字体通过 next/font/google 加载 Geist 与 Noto Sans SC。

## 组件结构

~~~text
Page
├─ Background
└─ Tv：稳定的 scene
   ├─ desktop-decoration
   ├─ mobile-decoration
   └─ wood-chat-panel
      └─ ChatPanel：messages / status / send / retry / timers
         ├─ MessageViewport → MessageItem → Sources / AlertCard
         └─ ChatComposer：不受控输入 / FormData / form.reset()
~~~

Page、Tv 与根布局不声明 use client；聊天客户端边界位于 ChatPanel。响应式使用 CSS，无 matchMedia 条件切壳；不存在两个隐藏的聊天实例。

源码在 src/app、src/components、src/types/chat.ts；共享颜色在 src/app/globals.css，静态资源在 public/figma。

## 进度与后续

| 模块 | 状态 |
| --- | --- |
| WOOD 桌面 / 小屏与本地模拟聊天 | 已实现，当前浏览器行为由所有者确认 |
| 真机键盘 / safe-area | 暂缓验证 |
| SILHOUETTE 与主题切换 | 未实现 |
| 真实 LLM、RAG、Web Search、证据来源 | 未实现 |
| 数据库与持久化 | 未实现；MVP 不包含云端账户和长期聊天记忆 |

后续按需选择一个小步骤：处理具体前端问题、恢复真机验证、开发另一个主题，或另行规划真实 AI 接入。后端主方向是本地检索优先、Web Search 兜底，并分别评估检索与回答；不是已上线能力。

已知代码审查待办：replyTimer 清空位置应移到 timeout 回调入口；滚动条 timeout 缺少卸载清理；按本地时间生成的 EmptyCard 首次文案需检查服务端/客户端时间差异。它们是后续检查项，本次 README 编辑没有代写或修改这些应用实现。

规划与知识资料位于相邻的 Persona-4-golden 目录：PROJECT.md、ROADMAP.md、ARCHITECTURE.md、DECISIONS.md。该目录不是本应用 Git 仓库。来源质量审计已有报告，但没有采集成数据集；其中 20 单元建议与现有 5–8 单元 RAG 技术试验仍为不同提案。

MVP 不包含自主 Agent、MCP、登录、云端账户或长期 Memory。Supabase / pgvector 是计划中的检索存储方向，不代表已经接入云端聊天记录。

## 本地开发与检查

需要 Node.js 20.9 或更高版本与 npm。当前本地模拟不需要 API Key、Supabase 或环境变量；安装依赖和获取 Google 字体需要网络。

~~~bash
npm ci
npm run dev
~~~

访问 [localhost:3000](http://localhost:3000) 或 [CRT 实验页面](http://localhost:3000/crt-distortion-test)。

~~~bash
npm run lint
npx tsc --noEmit --incremental false
npm run build
npm run start
~~~

运行 start 前需先 build。2026-10-20 文档审查时，ESLint 与 TypeScript 检查通过；未执行生产构建或新增浏览器/真机测试。视觉与交互验收来自所有者的本轮反馈。

## 许可与声明

这是非官方、受游戏启发的个人作品集项目，与 ATLUS、SEGA 无关联，也未获得其背书。Persona 4 Golden 及相关名称、商标和官方素材归各自权利人所有。

仓库尚无 LICENSE，未声明项目代码的开源许可证；本 README 不授予第三方素材的使用权。
