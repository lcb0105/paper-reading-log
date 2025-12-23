import React from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Database, Layers, Activity, FileText, Cpu, ArrowRight, Brain, Image as ImageIcon } from 'lucide-react';

// --- Components ---
const Section = ({ title, icon, children }) => {
  return (
    <section className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden mb-6">
      <div className="flex items-center gap-3 p-4 bg-slate-800/50 border-b border-slate-700">
        <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
          {icon}
        </div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>
      <div className="p-6 text-slate-300 leading-relaxed">
        {children}
      </div>
    </section>
  );
};

const FormulaBlock = ({ latex, description, breakdown }) => {
  return (
    <div className="my-6 bg-slate-800/50 border-l-4 border-blue-500 p-6 rounded-r-lg">
      <div className="overflow-x-auto py-2 mb-4 flex justify-center">
        <BlockMath math={latex} />
      </div>
      <p className="font-semibold text-white mb-2">公式解读：</p>
      <p className="text-slate-400 mb-4 text-sm md:text-base">{description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-slate-900/50 p-4 rounded border border-slate-700">
        {breakdown.map((item, index) => (
          <div key={index} className="flex items-start text-sm">
            <span className="font-mono font-bold text-blue-400 mr-2 bg-blue-500/10 px-2 py-0.5 rounded min-w-[40px] text-center">
              <InlineMath math={item.symbol} />
            </span>
            <span className="text-slate-400">{item.meaning}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ArchitectureViz = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 my-8 p-6 bg-slate-800 rounded-xl text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
      
      {/* Input Image */}
      <div className="flex flex-col items-center z-10">
        <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg border border-white/20">
          <ImageIcon size={40} className="text-white" />
        </div>
        <span className="mt-2 font-mono text-sm text-green-300">输入图像 Xv</span>
      </div>
      
      <ArrowRight className="text-slate-400 hidden md:block" />
      <div className="md:hidden text-slate-400">↓</div>
      
      {/* Vision Encoder */}
      <div className="flex flex-col items-center z-10">
        <div className="w-32 h-20 bg-slate-700 rounded-lg flex flex-col items-center justify-center border border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
          <span className="font-bold text-indigo-300">ViT-L/14</span>
          <span className="text-xs text-slate-400">CLIP Encoder</span>
        </div>
        <span className="mt-2 font-mono text-sm text-indigo-300">Zv (网格特征)</span>
      </div>
      
      <ArrowRight className="text-slate-400 hidden md:block" />
      <div className="md:hidden text-slate-400">↓</div>
      
      {/* Projection */}
      <div className="flex flex-col items-center z-10">
        <div className="w-24 h-20 bg-orange-900/40 rounded-lg flex items-center justify-center border border-orange-500/50 backdrop-blur-sm">
          <span className="font-bold text-orange-300 text-center text-sm">Projection W</span>
        </div>
        <span className="mt-2 font-mono text-sm text-orange-300">Hv (语言Tokens)</span>
      </div>
      
      <ArrowRight className="text-slate-400 hidden md:block" />
      <div className="md:hidden text-slate-400">↓</div>
      
      {/* LLM */}
      <div className="flex flex-col items-center z-10">
        <div className="w-40 h-28 bg-slate-700 rounded-xl flex flex-col items-center justify-center border border-blue-500/50 shadow-xl">
          <Brain className="text-blue-400 mb-2" size={24} />
          <span className="font-bold text-xl text-blue-100">Vicuna</span>
          <span className="text-xs text-blue-300 mt-1">Language Model</span>
        </div>
        <span className="mt-2 font-mono text-sm text-blue-300">输出回答 Xa</span>
      </div>
    </div>
  );
};

// --- Main Component ---
const LLaVA = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">
      {/* 返回按钮 */}
      <div className="fixed top-4 left-4 z-50">
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 bg-slate-900/80 backdrop-blur-md rounded-lg text-slate-300 hover:text-blue-400 transition-colors border border-slate-800"
        >
          <ArrowLeft size={16} />
          返回
        </Link>
      </div>

      {/* Header */}
      <header className="bg-slate-900 py-12 border-b border-slate-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">LLaVA 论文深度解析</h1>
          <p className="text-xl text-slate-400">Visual Instruction Tuning</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <span className="bg-blue-600 px-3 py-1 rounded-full">NeurIPS 2023</span>
            <span className="bg-slate-700 px-3 py-1 rounded-full">Microsoft</span>
            <span className="bg-slate-700 px-3 py-1 rounded-full">University of Wisconsin</span>
            <span className="bg-slate-700 px-3 py-1 rounded-full">Visual Instruction Tuning</span>
          </div>
          <div className="mt-4">
            <a href="https://llava-vl.github.io" target="_blank" rel="noreferrer" className="text-sm font-medium text-blue-400 hover:underline">
              官方项目主页 →
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 max-w-4xl py-8">
        
        {/* 1. Abstract / Introduction */}
        <Section title="1. 核心概述 (Introduction)" icon={<BookOpen size={20} />}>
          <p className="mb-4">
            <strong className="text-blue-400">LLaVA (Large Language and Vision Assistant)</strong> 是多模态大模型领域的开创性工作之一。
            它的核心目标是将大型语言模型（LLM）强大的指令跟随能力扩展到视觉领域。
          </p>
          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30 mb-4">
            <h3 className="font-bold text-amber-400 mb-2">主要贡献：</h3>
            <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm">
              <li><strong className="text-white">多模态指令数据生成：</strong> 首次尝试使用纯文本 GPT-4 生成图像-文本对的指令微调数据。</li>
              <li><strong className="text-white">LLaVA 模型：</strong> 连接 CLIP 视觉编码器和 Vicuna 语言模型，实现端到端训练。</li>
              <li><strong className="text-white">性能卓越：</strong> 在多模态聊天能力上接近 GPT-4，并在 ScienceQA 上达到 SOTA。</li>
            </ul>
          </div>
        </Section>

        {/* 2. Visual Instruction Tuning 概念 */}
        <Section title="2. Visual Instruction Tuning：核心概念" icon={<BookOpen size={20} />}>
          <p className="mb-4">
            论文首次提出 <strong className="text-blue-400">"Visual Instruction Tuning"（视觉指令微调）</strong> 概念，
            将 NLP 领域成功的指令微调范式扩展到多模态领域。
          </p>
          
          <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg mb-4">
            <h4 className="font-bold text-blue-400 mb-2">核心思想</h4>
            <p className="text-sm text-slate-400">
              在 NLP 中，<strong className="text-white">Instruction Tuning</strong>（如 InstructGPT、Alpaca）通过在自然语言指令上微调 LLM，
              使模型能够遵循用户指令完成各种任务。
              <br/><br/>
              <strong className="text-green-400">Visual Instruction Tuning</strong> 将这一范式扩展到多模态：
              在 <strong className="text-white">(图像, 语言指令, 回答)</strong> 三元组上微调模型，
              使其能够根据图像内容遵循用户的视觉相关指令。
            </p>
          </div>
          
          <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-r-lg">
            <h4 className="font-bold text-amber-400 mb-2">与传统视觉任务的区别</h4>
            <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
              <li><strong className="text-white">传统方式：</strong> 每个任务（VQA、Caption、分类）需要单独的模型或任务头</li>
              <li><strong className="text-white">Visual Instruction Tuning：</strong> 单一模型通过不同的语言指令完成所有任务</li>
              <li><strong className="text-white">关键优势：</strong> Zero-shot 泛化到新任务，无需针对性训练</li>
            </ul>
          </div>
        </Section>

        {/* 3. Data Generation */}
        <Section title="3. GPT-4 辅助的数据生成 (Data Generation)" icon={<Database size={20} />}>
          <p className="mb-4">
            这是论文最巧妙的部分。作者没有大规模手动标注，而是利用纯文本的 GPT-4 来生成数据。
            但是 GPT-4（当时的版本）看不见图片，怎么办？作者使用了<strong className="text-blue-400">符号化表示 (Symbolic Representations)</strong>。
          </p>
          
          <h3 className="text-lg font-bold text-white mb-3">3.1 符号化表示：让 GPT-4 "看见" 图片</h3>
          <div className="bg-slate-800 p-4 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
            <p className="text-slate-500 mb-2"># 输入给 GPT-4 的符号化表示示例</p>
            <p className="text-green-400">Captions:</p>
            <p className="text-slate-300 ml-4">- A group of people standing outside of a black building.</p>
            <p className="text-slate-300 ml-4">- A restaurant with a neon sign that says "Colonie"</p>
            <p className="text-slate-300 ml-4">- A group of people standing outside of a restaurant.</p>
            <p className="text-green-400 mt-2">Bounding Boxes:</p>
            <p className="text-slate-300 ml-4">- person: [0.681, 0.242, 0.774, 0.694]</p>
            <p className="text-slate-300 ml-4">- person: [0.63, 0.222, 0.686, 0.516]</p>
            <p className="text-slate-300 ml-4">- potted plant: [0.445, 0.234, 0.559, 0.378]</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <h4 className="font-bold text-white mb-2">Captions 来源</h4>
              <ul className="list-disc list-inside text-sm space-y-1 text-slate-400">
                <li>使用 <strong className="text-white">COCO 数据集</strong>的图像</li>
                <li>每张图像有 <strong className="text-white">5 个人工标注的 Caption</strong></li>
                <li>提供多角度的图像描述</li>
              </ul>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <h4 className="font-bold text-white mb-2">Bounding Boxes 格式</h4>
              <ul className="list-disc list-inside text-sm space-y-1 text-slate-400">
                <li>格式：<code className="text-blue-400">[x_min, y_min, x_max, y_max]</code></li>
                <li>坐标归一化到 <strong className="text-white">[0, 1]</strong> 范围</li>
                <li>包含对象类别标签</li>
              </ul>
            </div>
          </div>
          
          <h3 className="text-lg font-bold text-white mb-3">3.2 三种指令类型详解</h3>
          <div className="space-y-4 mb-6">
            <div className="bg-blue-500/10 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <h4 className="font-bold text-blue-400 mb-2">① Conversation（对话型）- 58K 条</h4>
              <p className="text-sm text-slate-400 mb-2">
                模拟人类与 AI 助手之间关于图像的多轮问答对话。问题从简单到复杂递进。
              </p>
              <div className="bg-slate-800 p-3 rounded text-xs font-mono">
                <p className="text-slate-500">Human: What is the main focus of this image?</p>
                <p className="text-green-400">Assistant: The main focus is a restaurant called "Colonie" with people gathered outside...</p>
                <p className="text-slate-500">Human: What can you tell me about the signage?</p>
                <p className="text-green-400">Assistant: The restaurant has a neon sign displaying its name...</p>
              </div>
            </div>
            
            <div className="bg-green-500/10 border-l-4 border-green-500 p-4 rounded-r-lg">
              <h4 className="font-bold text-green-400 mb-2">② Detailed Description（详细描述）- 23K 条</h4>
              <p className="text-sm text-slate-400 mb-2">
                要求 GPT-4 提供极其详尽的图像描述，涵盖所有可见元素、空间关系、氛围等。
              </p>
              <div className="bg-slate-800 p-3 rounded text-xs font-mono">
                <p className="text-slate-500">Human: Describe this image in great detail.</p>
                <p className="text-green-400">Assistant: The image captures a vibrant street scene at night. In the foreground, 
                there's a black-fronted restaurant with a distinctive neon sign reading "Colonie". 
                Several people are gathered outside, appearing to be waiting or socializing. 
                A potted plant adds a touch of greenery to the urban setting...</p>
              </div>
            </div>
            
            <div className="bg-purple-500/10 border-l-4 border-purple-500 p-4 rounded-r-lg">
              <h4 className="font-bold text-purple-400 mb-2">③ Complex Reasoning（复杂推理）- 77K 条</h4>
              <p className="text-sm text-slate-400 mb-2">
                需要多步推理的深度问答，通常包含 <strong className="text-white">Chain-of-Thought（思维链）</strong> 推理过程。
              </p>
              <div className="bg-slate-800 p-3 rounded text-xs font-mono">
                <p className="text-slate-500">Human: What time of day do you think this photo was taken? Explain your reasoning.</p>
                <p className="text-green-400">Assistant: Based on several visual clues, this photo was likely taken in the evening:
                1) The neon sign is illuminated, suggesting it's dark outside
                2) The lighting appears artificial rather than natural sunlight
                3) People are gathered outside, common for dinner time at restaurants
                Therefore, this image was most likely captured during evening hours.</p>
              </div>
            </div>
          </div>
          
          <h3 className="text-lg font-bold text-white mb-3">3.3 System Prompt 设计</h3>
          <p className="text-slate-400 mb-3 text-sm">
            论文精心设计了 System Prompt，引导 GPT-4 扮演一个能够"看见"图像的 AI 助手：
          </p>
          <div className="bg-slate-800 p-4 rounded-lg font-mono text-xs overflow-x-auto mb-4">
            <p className="text-amber-400">System Message:</p>
            <p className="text-slate-300 mt-2">
              You are an AI visual assistant that can analyze a single image. You receive five sentences,
              each describing the same image you are observing. In addition, specific object locations 
              within the image are given, along with detailed coordinates. These coordinates are in the 
              form of bounding boxes, represented as (x1, y1, x2, y2) with floating numbers ranging from 
              0 to 1...
            </p>
            <p className="text-slate-300 mt-2">
              Using the provided caption and bounding box information, describe the scene in a detailed manner.
            </p>
          </div>
          
          <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
            <h4 className="font-bold text-green-400 mb-2">数据统计汇总</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-white">58K</p>
                <p className="text-xs text-slate-400">Conversation</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">23K</p>
                <p className="text-xs text-slate-400">Detailed Description</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">77K</p>
                <p className="text-xs text-slate-400">Complex Reasoning</p>
              </div>
            </div>
            <p className="text-green-400 font-semibold text-center mt-3">总计 158K 条多模态指令数据</p>
          </div>
        </Section>

        {/* 4. Architecture */}
        <Section title="4. 网络架构 (Network Architecture)" icon={<Cpu size={20} />}>
          <p className="mb-4">
            LLaVA 的架构设计非常简洁高效，主要由三部分组成：视觉编码器、投影层、语言模型。
          </p>
          
          <ArchitectureViz />
          
          <h3 className="text-lg font-bold text-white mt-6 mb-3">4.1 关键公式：视觉特征投影</h3>
          <p className="mb-4 text-slate-400">
            为了让语言模型"看懂"图片，需要将视觉特征转换到语言模型的词嵌入空间（Word Embedding Space）。
          </p>
          
          <FormulaBlock 
            latex="H_v = W \cdot Z_v, \quad \text{with } Z_v = g(X_v)"
            description="这是一个简单的线性投影层，将视觉编码器输出的特征映射到语言空间。"
            breakdown={[
              { symbol: "X_v", meaning: "输入图像" },
              { symbol: "g(\\cdot)", meaning: "视觉编码器 (CLIP ViT-L/14)" },
              { symbol: "Z_v", meaning: "视觉特征 (ViT 输出的网格特征)" },
              { symbol: "W", meaning: "可训练的投影矩阵 (Projection Matrix)" },
              { symbol: "H_v", meaning: "映射后的视觉 Tokens，维度与 LLM 词向量一致" }
            ]}
          />
          
          <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg mb-6">
            <p className="text-sm text-slate-400">
              <strong className="text-blue-400">注意：</strong> 这里使用的是 CLIP ViT-L/14 <strong className="text-white">倒数第二层的 Grid Features（网格特征）</strong>，而不是通常用于分类的 CLS Token，因为网格特征保留了更多的空间细节。
            </p>
          </div>
          
          <h3 className="text-lg font-bold text-white mb-3">4.2 输入序列的组织方式</h3>
          <p className="text-slate-400 mb-3 text-sm">
            论文精心设计了多模态输入序列的组织方式，将视觉 Token 和语言 Token 有机结合：
          </p>
          
          <div className="bg-slate-800 p-4 rounded-lg mb-4">
            <p className="text-slate-500 text-xs mb-2"># 第一轮对话的输入格式</p>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded">[SYS]</span>
              <span className="text-slate-500">System Prompt</span>
              <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded">&lt;Img&gt;</span>
              <span className="bg-green-500/30 text-green-300 px-2 py-1 rounded font-mono">H_v (视觉 Tokens)</span>
              <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded">&lt;/Img&gt;</span>
              <span className="bg-amber-500/20 text-amber-400 px-2 py-1 rounded">[Human]</span>
              <span className="text-slate-300">指令文本</span>
              <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded">[Assistant]</span>
              <span className="text-slate-300">回答</span>
            </div>
          </div>
          
          <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-r-lg mb-4">
            <h4 className="font-bold text-amber-400 mb-2">关键设计决策</h4>
            <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
              <li><strong className="text-white">图像 Token 在指令之前：</strong> 在第一轮对话中，视觉 Token 放在用户指令之前，让模型先"看到"图像再理解问题</li>
              <li><strong className="text-white">多轮对话：</strong> 后续轮次不再重复视觉 Token，依赖 LLM 的上下文记忆</li>
              <li><strong className="text-white">特殊 Token：</strong> 使用 &lt;Img&gt; 和 &lt;/Img&gt; 标记视觉 Token 的边界</li>
            </ul>
          </div>
          
          <h3 className="text-lg font-bold text-white mb-3">4.3 多轮对话格式</h3>
          <div className="bg-slate-800 p-4 rounded-lg font-mono text-xs overflow-x-auto">
            <p className="text-blue-400"># 多轮对话序列组织</p>
            <p className="text-slate-300 mt-2">
              X_system X_v <span className="text-amber-400">X^1_instruct</span> <span className="text-green-400">X^1_answer</span> 
              <span className="text-amber-400"> X^2_instruct</span> <span className="text-green-400">X^2_answer</span> ... 
              <span className="text-amber-400">X^T_instruct</span> <span className="text-green-400">X^T_answer</span>
            </p>
            <p className="text-slate-500 mt-2"># 其中：</p>
            <p className="text-slate-400">- X_system: 系统提示词</p>
            <p className="text-slate-400">- X_v: 视觉 Token（仅出现一次）</p>
            <p className="text-slate-400">- X^t_instruct: 第 t 轮用户指令</p>
            <p className="text-slate-400">- X^t_answer: 第 t 轮模型回答（训练时计算损失）</p>
          </div>
          
          <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg mt-4">
            <h4 className="font-bold text-green-400 mb-2">训练时的损失计算</h4>
            <p className="text-sm text-slate-400">
              <strong className="text-white">仅在 Assistant 回答部分计算损失</strong>，System Prompt、视觉 Token 和 Human 指令部分都被 mask 掉，
              不参与梯度计算。这确保模型学习的是"如何根据图像和指令生成回答"。
            </p>
          </div>
        </Section>

        {/* 5. Training (Formulas) */}
        <Section title="5. 训练流程与损失函数 (Training)" icon={<Activity size={20} />}>
          <p className="mb-4">
            LLaVA 的训练目标是标准的<strong className="text-blue-400">自回归（Auto-regressive）</strong>预测，即根据之前的上下文预测下一个 Token。
          </p>
          
          <h3 className="text-lg font-bold text-white mb-3">多模态指令微调损失函数</h3>
          
          <FormulaBlock 
            latex="p(X_a | X_v, X_{\text{instruct}}) = \prod_{i=1}^{L} p_{\theta}(x_i | X_v, X_{\text{instruct}, < i}, X_{a, < i})"
            description="模型的目标是最大化目标回答 (Xa) 的概率。这是一个条件概率分布。"
            breakdown={[
              { symbol: "\\theta", meaning: "模型的可训练参数 (权重)" },
              { symbol: "X_v", meaning: "输入的图像" },
              { symbol: "X_{\\text{instruct}}", meaning: "指令提示 (例如：'请描述这张图片')" },
              { symbol: "X_a", meaning: "目标的回答序列 (Ground Truth)" },
              { symbol: "L", meaning: "回答序列的总长度" },
              { symbol: "x_i", meaning: "回答中的第 i 个 token" }
            ]}
          />

          <div className="space-y-6 mt-8">
            <div className="border-l-4 border-green-500 pl-4 bg-green-500/5 p-4 rounded-r-lg">
              <h4 className="font-bold text-white">阶段 1：特征对齐 (Pre-training for Feature Alignment)</h4>
              <p className="text-sm text-slate-400 mt-2">
                <strong className="text-white">数据：</strong> CC3M 过滤后的 595K 图文对。<br/>
                <strong className="text-white">参数更新：</strong> <span className="text-red-400 font-mono">冻结</span> 视觉编码器和 LLM，<span className="text-green-400 font-bold">仅训练</span> 投影矩阵 W。<br/>
                <strong className="text-white">目的：</strong> 训练一个兼容的视觉 Tokenizer，让 LLM 能"看见"图片特征。
              </p>
            </div>
            
            <div className="border-l-4 border-indigo-500 pl-4 bg-indigo-500/5 p-4 rounded-r-lg">
              <h4 className="font-bold text-white">阶段 2：端到端微调 (Fine-tuning End-to-End)</h4>
              <p className="text-sm text-slate-400 mt-2">
                <strong className="text-white">数据：</strong> GPT-4 生成的 158K 多模态指令数据。<br/>
                <strong className="text-white">参数更新：</strong> <span className="text-red-400 font-mono">冻结</span> 视觉编码器，<span className="text-green-400 font-bold">同时更新</span> 投影矩阵 W 和 LLM 权重 φ。<br/>
                <strong className="text-white">目的：</strong> 赋予模型遵循多模态指令的能力和对话能力。
              </p>
            </div>
          </div>
          
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 mt-6">
            <h4 className="font-bold text-white mb-2">训练超参数</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-400"><strong className="text-white">阶段 1：</strong></p>
                <ul className="list-disc list-inside text-slate-500 ml-2">
                  <li>1 epoch，学习率 2e-3</li>
                  <li>Batch Size: 128</li>
                  <li>训练时间：~4 小时 (8×A100)</li>
                </ul>
              </div>
              <div>
                <p className="text-slate-400"><strong className="text-white">阶段 2：</strong></p>
                <ul className="list-disc list-inside text-slate-500 ml-2">
                  <li>3 epochs，学习率 2e-5</li>
                  <li>Batch Size: 32</li>
                  <li>训练时间：~10 小时 (8×A100)</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* 6. Experiments */}
        <Section title="6. 实验结果 (Experiments)" icon={<Layers size={20} />}>
          
          <h3 className="text-lg font-bold text-white mb-3">6.1 GPT-4 作为评估器（LLM-as-Judge）</h3>
          <p className="text-slate-400 mb-4 text-sm">
            论文首次提出使用 GPT-4 作为多模态模型的评估器，这一方法后来被广泛采用：
          </p>
          
          <div className="bg-slate-800 p-4 rounded-lg mb-4">
            <h4 className="font-bold text-white mb-2">评估流程</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded text-xs">1</span>
                <span className="text-slate-400">给定 <strong className="text-white">(图像描述, 问题, 参考答案, 模型答案)</strong></span>
              </div>
              <div className="flex items-start gap-2">
                <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded text-xs">2</span>
                <span className="text-slate-400">GPT-4 从准确性、相关性、详细程度等维度评分</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded text-xs">3</span>
                <span className="text-slate-400">计算 <strong className="text-white">相对分数 = 模型得分 / GPT-4 得分 × 100</strong></span>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <h3 className="font-bold text-white mb-2">LLaVA-Bench (COCO)</h3>
              <p className="text-slate-400 text-sm mb-2">
                基于 COCO 验证集的 30 张图像，每张 3 个问题（Conversation, Detail, Reasoning）。
              </p>
              <div className="bg-green-500/10 p-3 rounded text-sm border border-green-500/30">
                <span className="font-bold text-green-400">结果：</span> <span className="text-slate-300">相对于 GPT-4(text) 取得了 <span className="font-bold text-white">85.1%</span> 的相对分数</span>
              </div>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <h3 className="font-bold text-white mb-2">LLaVA-Bench (In-the-Wild)</h3>
              <p className="text-slate-400 text-sm mb-2">
                24 张更具挑战性的野外图像（室内/室外/meme/绘画/素描等）。
              </p>
              <div className="bg-green-500/10 p-3 rounded text-sm border border-green-500/30">
                <span className="font-bold text-green-400">更难：</span> <span className="text-slate-300">测试模型在 <span className="font-bold text-white">分布外</span> 图像上的泛化能力</span>
              </div>
            </div>
          </div>
          
          <h3 className="text-lg font-bold text-white mb-3">6.2 ScienceQA 结果</h3>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 mb-6">
            <p className="text-slate-400 text-sm mb-3">
              ScienceQA 是一个多模态科学推理基准，包含 21K 道选择题，涵盖自然科学、语言科学和社会科学。
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left text-slate-400">
                <thead className="text-xs text-slate-300 uppercase bg-slate-800">
                  <tr>
                    <th className="px-4 py-2">模型</th>
                    <th className="px-4 py-2">准确率</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-700">
                    <td className="px-4 py-2">Human</td>
                    <td className="px-4 py-2">88.40%</td>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="px-4 py-2">GPT-3.5 (CoT)</td>
                    <td className="px-4 py-2">75.17%</td>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="px-4 py-2">GPT-4 (CoT)</td>
                    <td className="px-4 py-2">82.69%</td>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="px-4 py-2 font-medium text-white">LLaVA (Standalone)</td>
                    <td className="px-4 py-2 text-green-400 font-bold">90.92%</td>
                  </tr>
                  <tr className="bg-green-500/10">
                    <td className="px-4 py-2 font-bold text-green-400">LLaVA + GPT-4 (Judge)</td>
                    <td className="px-4 py-2 font-bold text-green-400">92.53% 🏆</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <h3 className="text-lg font-bold text-white mb-3">6.3 消融实验关键发现</h3>
          <div className="space-y-3">
            <div className="bg-blue-500/10 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <h4 className="font-bold text-blue-400 mb-1">数据类型的影响</h4>
              <p className="text-sm text-slate-400">
                <strong className="text-white">Conversation + Detailed Description + Complex Reasoning</strong> 三种数据类型组合使用效果最佳。单独使用任一类型都会导致性能下降。
              </p>
              <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                <div className="bg-slate-800 p-2 rounded text-center">
                  <p className="text-slate-400">仅 Conv</p>
                  <p className="text-amber-400">81.7%</p>
                </div>
                <div className="bg-slate-800 p-2 rounded text-center">
                  <p className="text-slate-400">仅 Detail</p>
                  <p className="text-amber-400">75.2%</p>
                </div>
                <div className="bg-slate-800 p-2 rounded text-center">
                  <p className="text-slate-400">三者结合</p>
                  <p className="text-green-400 font-bold">85.1%</p>
                </div>
              </div>
            </div>
            <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-r-lg">
              <h4 className="font-bold text-amber-400 mb-1">Chain-of-Thought 的影响</h4>
              <p className="text-sm text-slate-400">
                在 Complex Reasoning 数据中，GPT-4 生成的回答包含 <strong className="text-white">思维链推理过程</strong>。
                消融实验表明，保留 CoT 比仅保留最终答案效果更好，模型能学会更好的推理能力。
              </p>
            </div>
            <div className="bg-green-500/10 border-l-4 border-green-500 p-4 rounded-r-lg">
              <h4 className="font-bold text-green-400 mb-1">视觉特征的选择</h4>
              <p className="text-sm text-slate-400">
                使用 <strong className="text-white">Grid Features（倒数第二层）</strong> 比使用 CLS Token 或最后一层特征效果更好，因为保留了更丰富的空间信息。
              </p>
            </div>
            <div className="bg-purple-500/10 border-l-4 border-purple-500 p-4 rounded-r-lg">
              <h4 className="font-bold text-purple-400 mb-1">两阶段训练的必要性</h4>
              <p className="text-sm text-slate-400">
                跳过阶段 1 直接进行端到端训练会导致收敛困难。<strong className="text-white">预训练对齐阶段</strong>对于稳定训练至关重要。
                论文发现先对齐再微调的策略比直接联合训练效果更好。
              </p>
            </div>
          </div>
        </Section>

        {/* 7. LLaVA vs Others */}
        <Section title="7. LLaVA 与其他 VLM 的对比" icon={<Layers size={20} />}>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-slate-400">
              <thead className="text-xs text-slate-300 uppercase bg-slate-800">
                <tr>
                  <th scope="col" className="px-4 py-3">模型</th>
                  <th scope="col" className="px-4 py-3">视觉-语言连接</th>
                  <th scope="col" className="px-4 py-3">LLM 是否微调</th>
                  <th scope="col" className="px-4 py-3">训练数据</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-slate-800/30 border-b border-slate-700">
                  <td className="px-4 py-3 font-medium text-slate-200">Flamingo</td>
                  <td className="px-4 py-3">Perceiver Resampler + Gated XATTN</td>
                  <td className="px-4 py-3 text-red-400">否（冻结）</td>
                  <td className="px-4 py-3">~2B 图文对</td>
                </tr>
                <tr className="bg-slate-800/30 border-b border-slate-700">
                  <td className="px-4 py-3 font-medium text-slate-200">BLIP-2</td>
                  <td className="px-4 py-3">Q-Former</td>
                  <td className="px-4 py-3 text-red-400">否（冻结）</td>
                  <td className="px-4 py-3">~129M 图文对</td>
                </tr>
                <tr className="bg-blue-500/10 border-b border-blue-500/30">
                  <td className="px-4 py-3 font-bold text-blue-400">LLaVA</td>
                  <td className="px-4 py-3 text-green-400">简单 Linear Projection</td>
                  <td className="px-4 py-3 text-green-400">是（微调）</td>
                  <td className="px-4 py-3 font-bold">~753K（595K+158K）</td>
                </tr>
                <tr className="bg-slate-800/30 border-b border-slate-700">
                  <td className="px-4 py-3 font-medium text-slate-200">MiniGPT-4</td>
                  <td className="px-4 py-3">Linear Projection</td>
                  <td className="px-4 py-3 text-red-400">否（冻结）</td>
                  <td className="px-4 py-3">~5K 高质量数据</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg mt-4">
            <h4 className="font-bold text-blue-400 mb-2">LLaVA 的独特优势</h4>
            <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
              <li><strong className="text-white">极简架构：</strong> 无需复杂的 Q-Former 或 Perceiver，仅用线性层连接</li>
              <li><strong className="text-white">端到端微调 LLM：</strong> 不冻结 LLM，使其真正理解视觉内容</li>
              <li><strong className="text-white">数据效率：</strong> 仅需 ~750K 数据，远少于 Flamingo 的 2B</li>
              <li><strong className="text-white">开源：</strong> 模型、数据、代码完全开源，推动了后续研究（LLaVA-1.5、LLaVA-NeXT 等）</li>
            </ul>
          </div>
        </Section>

        {/* 8. Conclusion */}
        <Section title="8. 总结与影响 (Conclusion)" icon={<FileText size={20} />}>
          <p className="mb-4">
            LLaVA 证明了<strong className="text-blue-400">视觉指令微调 (Visual Instruction Tuning)</strong> 的有效性。通过简单的线性投影层连接强大的视觉编码器和语言模型，并利用高质量的合成指令数据进行训练，LLaVA 成功构建了一个通用的多模态助手。
          </p>
          
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-5 rounded-lg border border-blue-500/30 mb-6">
            <h4 className="font-bold text-white mb-2">核心启示</h4>
            <p className="text-slate-400 text-sm">
              <strong className="text-blue-400">数据质量和指令格式的重要性可能优于复杂的模型架构设计。</strong>
              <br/>LLaVA 用最简单的 Linear Projection 超越了使用复杂 Q-Former 的 BLIP-2，关键在于高质量的 GPT-4 生成数据和端到端微调策略。
            </p>
          </div>
          
          <h3 className="text-lg font-bold text-white mb-3">LLaVA 的后续发展</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <h4 className="font-bold text-blue-400 mb-2">LLaVA-1.5</h4>
              <p className="text-xs text-slate-400">MLP 替代 Linear，更大分辨率，更强性能</p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <h4 className="font-bold text-green-400 mb-2">LLaVA-NeXT</h4>
              <p className="text-xs text-slate-400">动态高分辨率 (AnyRes)，视频理解</p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <h4 className="font-bold text-purple-400 mb-2">LLaVA-OneVision</h4>
              <p className="text-xs text-slate-400">统一图像/视频/多图，单模型多任务</p>
            </div>
          </div>
        </Section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-500 py-8 text-center text-sm border-t border-slate-800">
        <p>基于论文 "Visual Instruction Tuning" (arXiv:2304.08485) 生成</p>
      </footer>
    </div>
  );
};

export default LLaVA;

