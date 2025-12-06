# 如何添加新的论文阅读笔记

本文档详细说明了如何在本项目中添加新的论文阅读页面。

## 流程概览

整个过程分为四个简单的步骤：
1.  **一建文件**：创建新的论文详情页组件。
2.  **二配路由**：在 `App.jsx` 中注册页面路径。
3.  **三改首页**：在 `Home.jsx` 的列表中添加卡片信息。
4.  **四发布**：运行部署脚本更新网站。

---

## 详细步骤

### 1. 创建论文详情页

在 `src/pages/papers/` 目录下创建一个新的 `.jsx` 文件。
*   **命名建议**：使用大驼峰命名法（PascalCase），例如 `TransformerXL.jsx`。

你可以复制以下模板代码作为起点：

```jsx
// src/pages/papers/YourPaperName.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const YourPaperName = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-blue-500/30">
      
      {/* --- 顶部导航栏 --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 py-3">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {/* 返回按钮 */}
            <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
               <ArrowLeft size={20} />
               <span className="hidden md:inline">返回目录</span>
            </Link>
            <div className="w-px h-6 bg-slate-800 hidden md:block"></div>
            
            {/* 论文标题 (简短版) */}
            <span className="text-xl font-bold text-slate-100">
              Your Paper Title
            </span>
          </div>
        </div>
      </nav>

      {/* --- 主要内容区域 --- */}
      <main className="container mx-auto px-6 pt-32 pb-20 max-w-5xl">
        {/* 在这里粘贴或编写你的论文详细内容 HTML/React 代码 */}
        <h1 className="text-4xl font-bold text-white mb-8">论文详细标题</h1>
        <p>这里是论文的内容...</p>
      </main>
    </div>
  );
};

export default YourPaperName;
```

### 2. 配置路由

打开 `src/App.jsx` 文件。

1.  **导入你的组件**：
    ```jsx
    import DeepSeekV3 from './pages/papers/DeepSeekV3';
    import YourPaperName from './pages/papers/YourPaperName'; // <--- 新增这行
    ```

2.  **添加路由规则**：
    在 `<Routes>` 标签内添加一行：
    ```jsx
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/papers/deepseek-v3" element={<DeepSeekV3 />} />
      <Route path="/papers/your-paper-path" element={<YourPaperName />} /> {/* <--- 新增这行 */}
    </Routes>
    ```

### 3. 更新首页列表

打开 `src/pages/Home.jsx` 文件。

找到 `papers` 数组，在其中添加一个新的对象。这个对象的数据将显示在首页的卡片上。

```jsx
const papers = [
  {
    id: 'deepseek-v3',
    // ... existing paper ...
  },
  // --- 新增开始 ---
  {
    id: 'your-unique-id',              // 唯一ID，建议用英文小写
    title: 'Your Paper Title',         // 论文标题
    authors: 'Author Name et al.',     // 作者
    date: '2024-01',                   // 发表日期
    description: '一句话描述这篇论文的核心贡献或是解决了什么问题。',
    tags: ['NLP', 'Transformer'],      // 标签
    path: '/papers/your-paper-path'    // <--- 必须与 App.jsx 中配置的 path 完全一致
  }
  // --- 新增结束 ---
];
```

### 4. 本地测试与发布

**本地测试：**
在终端运行：
```powershell
npm run dev
```
浏览器打开 `http://localhost:5173`，检查首页是否出现了新卡片，点击卡片是否能正确跳转。

**发布上线：**
在终端运行部署脚本（Windows）：
```powershell
.\deploy.ps1
```
脚本执行完毕后，你的 GitHub Pages 将会自动更新。

---

## 小贴士

*   **图片资源**：如果论文讲解中需要图片，请将图片文件放入 `public/images/` (如果没有则新建) 文件夹中，并在代码中通过 `<img src="/images/your-image.png" />` 引用。
*   **样式**：项目已经集成了 Tailwind CSS，你可以直接在组件中使用 `className` 来编写样式。
*   **图标**：项目集成了 `lucide-react` 图标库，可以在 https://lucide.dev/icons/ 查找需要的图标。
















