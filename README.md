# Persona 4 Golden Inspired AI Web

[English](README.en.md) · [简体中文](README.md)

以 Persona 4 Golden 为视觉灵感、围绕复古木质电视构建的 Web 界面，后续计划接入面向游戏攻略的 AI 助手。

这是一个个人作品集项目，涵盖 **Frontend Engineering（前端工程）**，并计划在后续阶段扩展到 **AI Application Engineering（AI 应用工程）**。当前重点是将 Figma 设计还原为桌面端 UI 壳。

## 当前项目状态

**开发中：desktop WOOD 主题前端壳。** 已实现电视场景、聊天展示区域和输入区视觉。消息目前是写在组件中的静态示例；输入框可以输入文字，但发送按钮尚未接入提交逻辑。当前没有连接 AI 服务，也没有持久化聊天记录。

比例尺寸已构成响应式布局的基础，但移动端布局和矮屏适配尚未完成。

## 预览

![桌面 WOOD 主题与中文示例消息](docs/images/wood-large-zh-CN.webp)

使用仓库已有的桌面 WOOD 截图。画面中的消息用于展示 UI，并非真实 AI 对话。

## 已实现内容

- 木质电视外壳、天线、扬声器格栅、地面阴影和 CRT 风格屏幕。
- 黄色与深色背景、斜向分隔和半色调装饰。
- 装饰旋钮、独立 SVG 指针和明确的旋转轴心。
- 基于原生 DOM 的消息区域，以及不同样式的 user / assistant 气泡。
- 输入框和发送按钮的视觉结构，包含可访问名称。
- 滚动时显示、停止滚动后渐隐的滚动条样式；长消息溢出仍需验证。
- 基于百分比、`aspect-ratio` 和 `clamp` 字号的比例布局。
- 独立的 `/crt-distortion-test` 实验页面，可切换 CRT 扭曲滤镜和渲染倍率，尚未集成到主界面。

## 技术栈

| 技术                        | 用途                                     |
| --------------------------- | ---------------------------------------- |
| Next.js 16.4.0 / App Router | 应用结构与页面路由                       |
| React 19.3.0                | UI 组件与局部交互状态                    |
| TypeScript                  | 严格模式下的静态类型检查                 |
| Tailwind CSS 4              | 基础布局工具类                           |
| CSS Modules                 | 组件样式、电视布局与视觉效果             |
| SVG                         | Figma 导出的装饰资源，以及内联指针和图标 |

中文字体通过 `next/font/google` 加载 Noto Sans SC。

## 目录结构

```text
docs/images/                      # README 截图
public/
  figma/                          # 导出的视觉 SVG 资源
  crt-distortion-test/            # 实验页面使用的位移贴图
src/
  app/
    page.tsx                      # WOOD 主场景
    layout.tsx                    # 根布局与字体配置
    globals.css                   # Tailwind 入口和共享 CSS 变量
    crt-distortion-test/          # 独立 CRT 实验路由
  components/
    Background.tsx                # 背景装饰
    Tv.tsx                        # 电视场景、屏幕和输入区
    SpeakerNDials.tsx             # 扬声器与控制面板
    DecorativeDial.tsx            # 小旋钮与指针轴心
    ChangeDial.tsx                # 大频道旋钮
    MessageViewport.tsx           # 示例消息与滚动条状态
    *.module.css                  # 组件局部样式
```

## 当前进度

| 模块                                        | 状态                                |
| ------------------------------------------- | ----------------------------------- |
| 桌面 WOOD 主题、TV shell、CRT screen 与背景 | 已实现 UI                           |
| 装饰旋钮与指针布局                          | 已实现视觉，尚无旋钮交互            |
| 消息气泡、viewport、输入区与滚动条样式      | 已实现 UI；仅有示例消息，溢出待验证 |
| 响应式比例布局                              | 已有基础结构，移动端待实现          |
| SILHOUETTE theme                            | 尚未实现                            |
| LLM、RAG、Web Search、Sources / Citations   | 尚未实现                            |
| Supabase 与云端聊天记录                     | 尚未实现                            |
| Agent 与 MCP 集成                           | 尚未实现                            |

## 后续计划

- 验证消息溢出，完善 viewport 尺寸、键盘操作和小屏可用性。
- 实现专门的移动端布局与 SILHOUETTE 主题。
- 实现本地消息提交与对话界面状态。
- 接入 LLM，再探索面向游戏攻略问题的 RAG。
- 增加 Web Search 与 Sources / Citations。
- 使用 Supabase 实现云端聊天记录。
- 在后续阶段探索 Agent 与 MCP 集成。

以上是开发方向，不代表功能已经可用，也不构成固定交付时间表。

## 本地开发

需要 **Node.js 20.9 或更高版本**与 **npm**。运行当前 UI 壳不需要 API Key、Supabase 配置或环境变量。安装依赖和获取 Google 字体需要网络连接。

```bash
npm ci
npm run dev
```

访问 [localhost:3000](http://localhost:3000) 查看主场景，或打开 [CRT 实验页面](http://localhost:3000/crt-distortion-test)。

其他可用命令：

```bash
npm run lint                        # ESLint 检查
npx tsc --noEmit --incremental false # 类型检查
npm run build                       # 生产构建
npm run start                       # 启动生产构建
```

运行 `npm run start` 前，需要先执行 `npm run build`。

## 设计与实现说明

- 电视采用分层视觉布局，通过 absolute positioning 和百分比坐标保持导出资源之间的相对位置；聊天内容使用 flex 布局。
- CSS Modules 负责具体视觉样式，Tailwind 负责基础布局，共享颜色与圆角变量放在 `globals.css`。
- 装饰图形使用 SVG 背景；指针和发送图标使用 inline SVG，便于独立定位和变换。
- 小旋钮指针围绕已注明坐标依据的轴心旋转，角度由 CSS 自定义属性控制。当前旋钮仅用于装饰。
- 聊天内容保留原生 DOM。CRT 扭曲先放在独立实验路由中，用于观察文字、选择、滚动和输入行为，再考虑集成。
- 当前场景主要随宽度缩放，尚不能视为完成了全部响应式聊天适配。

## 许可与声明

这是一个非官方、受游戏启发的个人作品集项目，与 ATLUS、SEGA 无关联，也未获得其背书。Persona 4 Golden 及相关名称、商标和官方素材归各自权利人所有，本项目不主张拥有这些内容。

仓库目前没有 `LICENSE` 文件，也未声明项目代码的开源许可证。本 README 不授予任何第三方素材的使用权。
