import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { ArrowLeft, Book, Database, Cpu, Box, Zap, Code, Calculator, Menu, Layers, Activity, Type, Wrench, Scale, MessageSquare } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

const Qwen1 = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 150) {
          current = section.getAttribute('id');
        }
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
      setActiveSection(id);
      setIsMobileMenuOpen(false);
    }
  };

  const NavItem = ({ id, label, isHighlight }) => (
    <button
      onClick={() => scrollToSection(id)}
      className={`w-full flex items-center px-4 py-3 text-sm font-medium transition-colors rounded-l-md ${
        activeSection === id
          ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      } ${isHighlight ? 'text-blue-600' : ''}`}
    >
      {/* <span className="mr-3">{icon}</span> */}
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white shadow-sm p-4 sticky top-0 z-50 flex justify-between items-center">
        <div className="flex items-center gap-3">
            <Link to="/" className="text-slate-500 hover:text-slate-800">
                {/* <ArrowLeft size={20} /> */}
                <span>←</span>
            </Link>
            <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">Qwen 论文精读</h1>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600">
          {/* <Menu size={24} /> */}
          <span>☰</span>
        </button>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-slate-900/50" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-white p-4 shadow-xl" onClick={e => e.stopPropagation()}>
            <nav className="space-y-2 mt-14">
              <button onClick={() => scrollToSection('intro')} className="block w-full text-left py-2 text-slate-700 hover:text-blue-600">1. 引言与概览</button>
              <button onClick={() => scrollToSection('pretraining')} className="block w-full text-left py-2 text-slate-700 hover:text-blue-600">2. 预训练 (Pretraining)</button>
              <button onClick={() => scrollToSection('architecture')} className="block w-full text-left py-2 text-blue-600 font-bold">3. 核心架构与公式 ★</button>
              <button onClick={() => scrollToSection('context')} className="block w-full text-left py-2 text-slate-700 hover:text-blue-600">4. 长文本扩展技术</button>
              <button onClick={() => scrollToSection('alignment')} className="block w-full text-left py-2 text-slate-700 hover:text-blue-600">5. 对齐 (SFT & RLHF)</button>
              <button onClick={() => scrollToSection('specialized')} className="block w-full text-left py-2 text-slate-700 hover:text-blue-600">6. 代码与数学模型</button>
            </nav>
          </div>
        </div>
      )}

      <div className="flex min-h-screen">
        {/* Sidebar Navigation (Desktop) */}
        <aside className="hidden lg:flex flex-col w-72 bg-slate-900 text-white fixed h-full overflow-y-auto z-40">
          <div className="p-6 pb-0 border-b border-slate-700">
            <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 text-sm">
               {/* <ArrowLeft size={16} /> */}
               <span>←</span>
               <span>返回目录</span>
            </Link>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400 mb-2">Qwen 论文精读</h1>
            <p className="text-slate-400 text-xs mb-6">基于 Qwen Technical Report</p>
          </div>
          
          <nav className="flex-1 space-y-1 py-4 px-2">
             {/* Custom NavItem style for dark sidebar */}
            {[
                { id: 'intro', label: '1. 引言与概览' },
                { id: 'pretraining', label: '2. 预训练' },
                { id: 'architecture', label: '3. 核心架构 ★', highlight: true },
                { id: 'context', label: '4. 长文本扩展' },
                { id: 'alignment', label: '5. 对齐 (SFT & RLHF)' },
                { id: 'specialized', label: '6. 代码与数学' },
            ].map(item => (
                <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium transition-colors rounded-md mb-1 ${
                        activeSection === item.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    } ${item.highlight && activeSection !== item.id ? 'text-blue-300' : ''}`}
                >
                    {/* <span className="mr-3">{item.icon}</span> */}
                    {item.label}
                </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-72 p-6 lg:p-12 max-w-5xl mx-auto w-full">
            
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white mb-12 shadow-lg">
                <h2 className="text-3xl font-bold mb-4">像专家一样读懂大模型</h2>
                <p className="text-lg opacity-90">
                    本文档基于 <span className="font-mono bg-white/20 px-2 py-1 rounded text-sm">arXiv:2309.16609v1</span>，深入浅出地拆解 Qwen 模型的每一个技术细节。无论你是初学者还是研究人员，这里都有你需要的内容。
                </p>
            </div>

            {/* 1. 引言 */}
            <section id="intro" className="mb-20 scroll-mt-24">
                <div className="flex items-center gap-4 mb-6">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xl font-bold font-mono">01</span>
                    <h2 className="text-3xl font-bold text-slate-900">引言：Qwen 家族谱系</h2>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                    <p className="mb-6 leading-relaxed text-slate-700 text-lg">
                        Qwen (通义千文) 是阿里巴巴团队发布的一系列大型语言模型。这个名字来源于“千问”，寓意模型能够处理成千上万种不同的查询。Qwen 不是一个单一的模型，而是一个包含不同参数规模（1.8B, 7B, 14B）的家族。
                    </p>
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                            <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                                {/* <Brain size={20} className="text-blue-500"/> */}
                                Base Model (基座模型)
                            </h3>
                            <p className="text-sm text-slate-600 leading-relaxed">类似于读了万卷书的“书呆子”。拥有海量知识，但不懂得如何对话。它是 Qwen 系列的地基。</p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:border-green-300 transition-colors">
                            <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                                {/* <MessageSquare size={20} className="text-green-500"/> */}
                                Chat Model (聊天模型)
                            </h3>
                            <p className="text-sm text-slate-600 leading-relaxed">经过“对齐”训练的“客服专家”。不仅懂知识，还懂礼貌、懂指令，甚至会使用工具。</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. 预训练 */}
            <section id="pretraining" className="mb-20 scroll-mt-24">
                <div className="flex items-center gap-4 mb-6">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xl font-bold font-mono">02</span>
                    <h2 className="text-3xl font-bold text-slate-900">预训练：模型的知识来源</h2>
                </div>
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800">
                            {/* <Database className="text-blue-500" /> */}
                            数据 (Data) - 3万亿 Token 的盛宴
                        </h3>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            Qwen 使用了高达 <span className="bg-blue-50 text-blue-700 px-1 font-semibold rounded">3 Trillion (3万亿)</span> token 的数据进行预训练。这包括网络文本、百科全书、书籍和代码。
                        </p>
                        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                             <p className="text-sm font-bold text-slate-700 mb-2">关键步骤：</p>
                             <ul className="list-disc list-inside space-y-1 text-slate-600 text-sm ml-2">
                                <li><strong>多语言支持：</strong> 包含大量英文和中文数据。</li>
                                <li><strong>数据清洗：</strong> 就像做菜前要洗菜。使用 MinHash 和 LSH 算法进行去重，并使用分类器过滤掉低质量内容。</li>
                                <li><strong>去污染 (Decontamination)：</strong> 确保训练数据里不包含考试题，防止模型“作弊”。</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800">
                            {/* <Type className="text-purple-500" /> */}
                            分词 (Tokenization) - 更高效的编码
                        </h3>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            Qwen 使用了基于 <span className="bg-purple-50 text-purple-700 px-1 font-semibold rounded">BPE (Byte Pair Encoding)</span> 的分词方法，词表大小达到了约 <strong>152K</strong>。
                        </p>
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                            <p className="text-blue-900 text-sm">
                                <strong>为什么大词表很重要？</strong><br/>
                                相比 LLaMA (约32K)，Qwen 的词表大得多。这意味着它能用更少的 token 表达同样的中文句子。这不仅节省显存，还能让模型在同样的长度限制下“读”进更多内容。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. 核心架构与公式 (重点) */}
            <section id="architecture" className="mb-20 scroll-mt-24">
                <div className="flex items-center gap-4 mb-6">
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-xl font-bold font-mono">03</span>
                    <h2 className="text-3xl font-bold text-slate-900">核心架构与数学公式解析</h2>
                </div>
                <p className="text-slate-600 mb-8 text-lg">Qwen 基于 Transformer 架构，但参考 LLaMA 做了关键改进。这里我们将通过公式详细拆解它的“大脑结构”。</p>

                {/* 嵌入层与位置编码 */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 mb-8">
                    <h3 className="text-xl font-bold mb-4 text-purple-900 flex items-center gap-2">
                        {/* <Zap size={20}/> */}
                        1. 位置编码：RoPE (Rotary Positional Embedding)
                    </h3>
                    <p className="text-slate-700 mb-6">
                        为了让模型知道每个词的先后顺序，Qwen 使用了旋转位置编码。它通过绝对位置的编码方式，实现了相对位置的感知。
                    </p>
                    <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-4 overflow-x-auto">
                        <p className="text-sm text-slate-500 mb-4 font-mono">RoPE 的核心思想是将向量在二维平面上进行旋转：</p>
                        <BlockMath math="f_{q,m} = (W_q x_m) e^{im\theta}" />
                        <p className="text-sm text-slate-500 mt-4 text-center">其中 <InlineMath math="m"/> 是位置，<InlineMath math="\theta"/> 是旋转角度。这使得两个位置 <InlineMath math="m"/> 和 <InlineMath math="n"/> 之间的关系只依赖于它们的距离 <InlineMath math="m-n"/>。</p>
                    </div>
                    <p className="text-slate-700 text-sm mt-2 bg-purple-50 p-3 rounded border border-purple-100 inline-block">
                        <strong>Qwen 的改进：</strong> 使用 FP32 (高精度) 来计算这个旋转矩阵的逆频率，而不是 BF16，以保证高精度。
                    </p>
                </div>

                {/* 激活函数 SwiGLU */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 mb-8">
                    <h3 className="text-xl font-bold mb-4 text-purple-900 flex items-center gap-2">
                        {/* <Layers size={20}/> */}
                        2. 激活函数：SwiGLU
                    </h3>
                    <p className="text-slate-700 mb-6">
                        Qwen 放弃了传统的 ReLU 或 GeLU，采用了效果更好的 SwiGLU。这是一种“门控线性单元”。
                    </p>
                    <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-6 overflow-x-auto text-slate-800">
                        <BlockMath math="\text{SwiGLU}(x) = \text{Swish}_{\beta}(xW) \otimes (xV)" />
                    </div>
                    <p className="text-slate-700 mb-2">其中，Swish 函数定义为：</p>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-6 overflow-x-auto text-slate-800">
                        <BlockMath math="\text{Swish}_{\beta}(x) = x \cdot \sigma(\beta x)" />
                    </div>
                    <div className="bg-slate-50 p-4 rounded border border-slate-100">
                        <p className="text-sm text-slate-600 leading-relaxed">
                            <span className="font-bold text-slate-800">通俗解释：</span> 
                            想象 <InlineMath math="xW"/> 是信息内容，<InlineMath math="xV"/> 是一个“门”(Gate)。Swish 函数决定了门开多大。<InlineMath math="\otimes"/> 代表逐元素相乘。这种机制让模型能更精细地控制信息的流动。为了配合这个改动，FFN 的维度被调整为隐藏层大小的 <InlineMath math="8/3"/>。
                        </p>
                    </div>
                </div>

                {/* 归一化 RMSNorm */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-xl font-bold mb-4 text-purple-900 flex items-center gap-2">
                        {/* <Activity size={20}/> */}
                        3. 归一化：RMSNorm
                    </h3>
                    <p className="text-slate-700 mb-6">
                        为了提高训练稳定性，Qwen 使用 RMSNorm (均方根归一化) 代替了传统的 LayerNorm。
                    </p>
                    <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-6 overflow-x-auto text-slate-800">
                        <BlockMath math="\bar{a}_i = \frac{a_i}{\text{RMS}(a)} g_i, \quad \text{where } \text{RMS}(a) = \sqrt{\frac{1}{d} \sum_{j=1}^{d} a_j^2}" />
                    </div>
                    <p className="text-sm text-slate-600">
                        <strong>重点：</strong> 相比 LayerNorm，RMSNorm 少减去了一个均值 <InlineMath math="\mu"/>，计算更简单，但在深层网络中效果往往更好。它通过除以均方根来标准化激活值的尺度。
                    </p>
                </div>
            </section>

            {/* 4. 长文本扩展 */}
            <section id="context" className="mb-20 scroll-mt-24">
                <div className="flex items-center gap-4 mb-6">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-xl font-bold font-mono">04</span>
                    <h2 className="text-3xl font-bold text-slate-900">长文本扩展技术</h2>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                    <p className="text-slate-700 mb-6 text-lg">
                        Qwen 在训练时上下文长度为 2048，但在推理时可以扩展到 8192 甚至更长。这是如何做到的？不需要重新训练，而是使用了推理时的数学技巧。
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <div className="border border-green-200 bg-green-50 p-6 rounded-xl">
                            <h4 className="font-bold text-green-900 mb-3">1. NTK-aware Interpolation</h4>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                动态调整 RoPE 的基数 (Base)。
                                <br/><br/>
                                <strong>原理：</strong> 就像把一把尺子刻度变密，而不是把尺子拉长。这能防止高频信息丢失，让模型能“看”懂从未见过的长位置编码。
                            </p>
                        </div>
                        <div className="border border-green-200 bg-green-50 p-6 rounded-xl">
                            <h4 className="font-bold text-green-900 mb-3">2. LogN-Scaling</h4>
                            <p className="text-sm text-slate-700 leading-relaxed mb-3">
                                当上下文变长时，注意力机制中的熵会变化。Qwen 使用 LogN 因子修正注意力分数：
                            </p>
                            <div className="bg-white/60 p-2 rounded text-center overflow-x-auto">
                                <BlockMath math="\text{Attn Scale} = \frac{\log(L_{new})}{\log(L_{train})}" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. 对齐 */}
            <section id="alignment" className="mb-20 scroll-mt-24">
                <div className="flex items-center gap-4 mb-6">
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-xl font-bold font-mono">05</span>
                    <h2 className="text-3xl font-bold text-slate-900">对齐：SFT 与 RLHF</h2>
                </div>
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-slate-800">
                             {/* <Wrench size={20} className="text-blue-500"/> */}
                             SFT (有监督微调)
                        </h3>
                        <p className="text-slate-700 leading-relaxed">
                            使用 <strong>ChatML</strong> 格式数据。关键在于 <span className="bg-blue-50 text-blue-700 px-1 rounded font-medium">Loss Masking</span>（损失掩码）：在计算 Loss 时，只计算模型回答的部分，不计算用户提问的部分。这教会了模型“如何回答”，而不是“如何提问”。
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-slate-800">
                            {/* <Scale size={20} className="text-red-500"/> */}
                            RLHF (人类反馈强化学习)
                        </h3>
                        <p className="text-slate-700 mb-4">
                            为了让模型更符合人类偏好，Qwen 使用了 PPO 算法。
                        </p>
                        <div className="bg-slate-50 p-5 rounded-lg border border-slate-200 mb-4">
                            <h4 className="font-bold text-slate-800 text-sm mb-3">对抗“对齐税” (Alignment Tax)</h4>
                            <p className="text-sm text-slate-600 mb-3">
                                强化学习有时会让模型变“笨”（比如数学能力下降）。Qwen 的解决方案是在 PPO 训练中混入预训练数据：
                            </p>
                            <div className="bg-white p-3 rounded border border-slate-100 mb-3 overflow-x-auto">
                                <BlockMath math="L_{total} = L_{PPO} + \gamma L_{pretrain}" />
                            </div>
                            <p className="text-sm text-slate-600">通过加上原始的预训练损失 <InlineMath math="L_{pretrain}"/>，强迫模型在学习做人的同时，不忘记书本知识。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. 专才模型 */}
            <section id="specialized" className="mb-20 scroll-mt-24">
                <div className="flex items-center gap-4 mb-6">
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-lg text-xl font-bold font-mono">06</span>
                    <h2 className="text-3xl font-bold text-slate-900">专业化：代码与数学</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Code */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-2 mb-4">
                            {/* <Code className="text-slate-700" size={24}/> */}
                            <h3 className="text-xl font-bold text-slate-800">Code-Qwen</h3>
                        </div>
                        <ul className="space-y-3 text-slate-700 text-sm">
                            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div><span><strong>策略：</strong> 不是从头练，而是在 Qwen 基座上继续预训练。</span></li>
                            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div><span><strong>数据：</strong> 90B Token 的纯代码数据。</span></li>
                            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div><span><strong>上下文：</strong> 扩展至 <strong>8192</strong>，因为代码文件通常很长。</span></li>
                            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div><span><strong>结果：</strong> 既懂人话又懂代码，不像某些只懂代码的模型那样“偏科”。</span></li>
                        </ul>
                    </div>

                    {/* Math */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-2 mb-4">
                            {/* <Calculator className="text-slate-700" size={24}/> */}
                            <h3 className="text-xl font-bold text-slate-800">Math-Qwen</h3>
                        </div>
                        <ul className="space-y-3 text-slate-700 text-sm">
                            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0"></div><span><strong>策略：</strong> SFT 微调。</span></li>
                            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0"></div><span><strong>技巧：</strong> <strong>Loss Masking</strong>。题目中的数字是随机的，预测它们没意义。训练时只计算“推理步骤”和“答案”的 Loss。</span></li>
                            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0"></div><span><strong>结果：</strong> 14B 模型在数学榜单上逼近了 GPT-3.5。</span></li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* 脚注/总结 */}
            <footer className="mt-20 border-t border-slate-200 pt-10 pb-20 text-center text-slate-500 text-sm">
                <p>Generated based on Qwen Technical Report (arXiv:2309.16609v1)</p>
            </footer>

        </main>
      </div>
    </div>
  );
};

export default Qwen1;
