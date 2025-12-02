# 论文页面生成提示词模板

将以下提示词发送给 AI 模型，即可生成符合本项目规范的论文精读页面代码。

---

## 📋 提示词模板

```
请帮我生成一个论文精读页面的 React 组件代码，需要符合以下规范：

## 技术要求
- 使用 React 函数式组件
- 使用 Tailwind CSS 进行样式设计
- 使用 react-router-dom 的 Link 组件实现返回导航
- 使用 lucide-react 图标库
- 数学公式使用 react-katex 渲染：
  - 块级公式: <BlockMath math="..." />
  - 行内公式: <InlineMath math="..." />
- 必须在文件顶部导入: import 'katex/dist/katex.min.css';

## 代码结构要求
1. 固定顶部导航栏，包含：
   - 返回首页按钮 (Link to="/")
   - 论文标题
   - 章节快速跳转按钮
2. Header 区域：渐变背景，显示论文标题、arXiv 编号、一句话摘要
3. Main 内容区域：分章节展示论文内容
4. Footer 区域

## 样式规范
- 使用 className 而不是 class（这是 React/JSX 规范）
- 主色调可选：sky、blue、purple、emerald 等
- 背景色使用 slate-50 或 slate-950（深色主题）
- 代码/公式区块使用 bg-slate-50 rounded-lg border 样式
- 响应式设计：使用 md: 前缀处理桌面端样式

## 组件导出
- 组件名使用大驼峰命名（如 LlamaDeepDive）
- 文件末尾使用 export default 导出

## 论文信息
- 论文标题：[填写论文标题]
- arXiv 编号：[填写 arXiv 编号]
- 主要章节：[列出要展示的章节]
- 核心公式：[列出需要渲染的数学公式]

请生成完整的 JSX 代码，可以直接保存为 .jsx 文件使用。
```

---

## 📝 使用示例

```
请帮我生成一个论文精读页面的 React 组件代码，需要符合以下规范：

## 技术要求
- 使用 React 函数式组件
- 使用 Tailwind CSS 进行样式设计
- 使用 react-router-dom 的 Link 组件实现返回导航
- 使用 lucide-react 图标库
- 数学公式使用 react-katex 渲染：
  - 块级公式: <BlockMath math="..." />
  - 行内公式: <InlineMath math="..." />
- 必须在文件顶部导入: import 'katex/dist/katex.min.css';

## 代码结构要求
1. 固定顶部导航栏，包含：
   - 返回首页按钮 (Link to="/")
   - 论文标题
   - 章节快速跳转按钮
2. Header 区域：渐变背景，显示论文标题、arXiv 编号、一句话摘要
3. Main 内容区域：分章节展示论文内容
4. Footer 区域

## 样式规范
- 使用 className 而不是 class（这是 React/JSX 规范）
- 主色调使用 emerald
- 背景色使用 slate-50
- 代码/公式区块使用 bg-slate-50 rounded-lg border 样式
- 响应式设计：使用 md: 前缀处理桌面端样式

## 组件导出
- 组件名使用大驼峰命名
- 文件末尾使用 export default 导出

## 论文信息
- 论文标题：Attention Is All You Need
- arXiv 编号：arXiv:1706.03762
- 组件名：AttentionPaper
- 主要章节：
  1. 引言与背景
  2. Transformer 架构
  3. 自注意力机制 (Self-Attention)
  4. 位置编码
  5. 实验结果
- 核心公式：
  - Attention(Q,K,V) = softmax(QK^T / sqrt(d_k)) V
  - 位置编码公式

请生成完整的 JSX 代码，可以直接保存为 .jsx 文件使用。
```

---

## ⚡ 生成代码后的操作

1. **保存文件**：将生成的代码保存到 `src/pages/papers/YourPaperName.jsx`

2. **配置路由**：在 `src/App.jsx` 中添加：
   ```jsx
   import YourPaperName from './pages/papers/YourPaperName';
   // ...
   <Route path="/papers/your-paper-path" element={<YourPaperName />} />
   ```

3. **更新首页**：在 `src/pages/Home.jsx` 的对应分组中添加论文卡片：
   ```jsx
   {
     id: 'your-paper-id',
     title: '论文标题',
     authors: '作者',
     date: '2024-01',
     description: '一句话描述',
     tags: ['Tag1', 'Tag2'],
     path: '/papers/your-paper-path'
   }
   ```

4. **本地测试**：运行 `npm run dev` 检查效果

5. **部署**：运行 `.\deploy.ps1` 发布到 GitHub Pages

---

## 🎨 可用的 lucide-react 图标

常用图标导入示例：
```jsx
import { 
  ArrowLeft,      // 返回箭头
  BookOpen,       // 书籍/论文
  Brain,          // 大脑/AI
  Cpu,            // 处理器/计算
  Database,       // 数据库
  Zap,            // 闪电/高效
  BarChart,       // 图表
  Code,           // 代码
  Lightbulb,      // 灯泡/想法
  Layers,         // 层级
  Network,        // 网络
  Scale,          // 权衡
  Target,         // 目标
  Workflow        // 流程
} from 'lucide-react';
```

更多图标请访问：https://lucide.dev/icons/

---

## 📐 KaTeX 公式语法参考

```jsx
// 块级公式
<BlockMath math="\mathcal{L} = -\sum_{i} y_i \log(\hat{y}_i)" />

// 行内公式
<InlineMath math="\alpha + \beta = \gamma" />

// 矩阵
<BlockMath math="\begin{pmatrix} a & b \\ c & d \end{pmatrix}" />

// 分数
<BlockMath math="\frac{a}{b}" />

// 求和
<BlockMath math="\sum_{i=1}^{n} x_i" />

// 注意：花括号需要转义
// 正确: \{  \}
// 错误: { }（会被 JSX 解析）
```

更多语法请参考：https://katex.org/docs/supported.html




