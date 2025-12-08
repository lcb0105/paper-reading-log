import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Layers, Calculator, GraduationCap, Target, AlertTriangle, ExternalLink } from 'lucide-react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const MLLMRevolutionPaper = () => {
  const [activeSection, setActiveSection] = useState('intro');

  const navItems = [
    { id: 'intro', label: '1. 简介与背景' },
    { id: 'architecture', label: '2. 核心架构' },
    { id: 'formulas', label: '3. 重点公式详解' },
    { id: 'training', label: '4. 训练策略' },
    { id: 'tasks', label: '5. 任务与能力' },
    { id: 'evaluation', label: '6. 评估与挑战' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const SectionCard = ({ id, title, borderColor, children }) => (
    <section id={id} className={`bg-white rounded-lg shadow-md p-8 mb-8 border-l-4 ${borderColor}`}>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">{title}</h2>
      {children}
    </section>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 fixed w-full z-20 top-0 left-0 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition">
                <ArrowLeft size={20} />
                <span className="hidden sm:inline">返回首页</span>
              </Link>
              <span className="text-xl font-bold text-blue-600">MLLM Survey 详解</span>
            </div>
            <div className="flex items-center space-x-4">
              <a 
                href="https://arxiv.org/abs/2402.12451" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 flex items-center gap-2"
              >
                阅读原文 <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16 max-w-7xl mx-auto">
        {/* Sidebar Navigation */}
        <aside className="w-64 hidden lg:block fixed left-auto h-full overflow-y-auto py-8 pr-4">
          <nav className="space-y-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md transition ${
                  activeSection === item.id
                    ? 'text-blue-700 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="lg:pl-72 w-full py-8 px-4 sm:px-6">
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-4">
              多模态大语言模型革命
            </h1>
            <p className="text-xl text-gray-500">
              基于论文 <i>The Revolution of Multimodal Large Language Models: A Survey</i> 的深度解析
            </p>
            <div className="mt-4 flex justify-center flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">arXiv:2402.12451</span>
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-semibold">全面综述</span>
              <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-semibold">公式详解</span>
            </div>
          </div>

          {/* Section 1: Introduction */}
          <SectionCard id="intro" title="1. 简介与背景 (Introduction)" borderColor="border-blue-500">
            <p className="text-gray-700 leading-relaxed mb-4">
              多模态大语言模型（Multimodal Large Language Models, <strong>MLLMs</strong>）是生成式人工智能领域的重要进展。它们不仅仅是处理文本，而是将视觉（图像、视频）与文本模态无缝结合，利用大语言模型（LLM）强大的推理和指令遵循能力，实现对视觉世界的理解和交互。
            </p>
            <p className="text-gray-700 leading-relaxed">
              本论文综述了现有的基于视觉的 MLLM，分析了它们的架构选择（Visual Encoder, LLM, Adapter）、多模态对齐策略以及训练技术。著名的模型包括 <strong>GPT-4V, Gemini, LLaVA, Flamingo, BLIP-2</strong> 等。
            </p>
          </SectionCard>

          {/* Section 2: Architecture */}
          <SectionCard id="architecture" title="2. 核心架构 (Architecture)" borderColor="border-green-500">
            <p className="mb-4 text-gray-700">一个典型的 MLLM 包含三个主要组件：</p>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-bold text-lg mb-2 text-indigo-600">1. 视觉编码器</h3>
                <p className="text-sm text-gray-600">
                  负责将图像转换为特征向量。常用的有 CLIP (ViT-L, ViT-H) 和 EVA-CLIP。这些编码器通常在海量图文对上预训练，能提取语义丰富的视觉特征。通常在训练 MLLM 时保持<strong>冻结 (Frozen)</strong>。
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-bold text-lg mb-2 text-indigo-600">2. 语言模型 (LLM)</h3>
                <p className="text-sm text-gray-600">
                  负责推理和生成文本。常用的有 LLaMA, Vicuna, FlanT5 等。LLM 作为"大脑"，接收处理后的视觉特征和文本指令，进行自回归生成。
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-bold text-lg mb-2 text-indigo-600">3. 适配器 (Adapter)</h3>
                <p className="text-sm text-gray-600">
                  连接视觉和语言的关键模块。它将视觉特征映射到 LLM 的文本嵌入空间。形式多样，从简单的线性层到复杂的 Q-Former。
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">适配器类型详解</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Linear / MLP Projections:</strong> 如 LLaVA，使用简单的线性层或多层感知机将视觉特征维度投影到文本特征维度。</li>
                <li><strong>Q-Former (Query Transformer):</strong> 如 BLIP-2，使用一组可学习的 Query 向量，通过 Cross-Attention 提取视觉特征，压缩视觉信息。</li>
                <li><strong>Additional Cross-Attention:</strong> 如 Flamingo，在 LLM 的层之间插入新的 Cross-Attention 层，直接注入视觉信息。</li>
              </ul>
            </div>
          </SectionCard>

          {/* Section 3: Formulas */}
          <section id="formulas" className="bg-white rounded-lg shadow-md p-8 mb-8 border-l-4 border-blue-600 ring-4 ring-blue-50">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">3. 重点公式详解 (Mathematical Foundations)</h2>
            <p className="text-gray-700 mb-6">
              虽然综述论文本身较少定义全新公式，但要理解 MLLM 的工作原理，必须掌握以下三个核心数学机制。这些机制支撑了从 BLIP-2 到 LLaVA 的绝大多数模型。
            </p>

            {/* Formula 1: Cross Attention */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-gray-800 mb-3">3.1 交叉注意力机制 (Cross-Attention)</h3>
              <p className="text-gray-600 mb-3">
                这是 <strong>Q-Former</strong> (BLIP-2) 和 <strong>Flamingo</strong> 用于融合视觉信息的核心。不同于自注意力（Self-Attention），交叉注意力的 Query 来自文本或可学习向量，而 Key 和 Value 来自图像特征。
              </p>
              <div className="bg-white p-6 rounded-md border border-gray-200 shadow-sm overflow-x-auto my-4">
                <BlockMath math="\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V" />
              </div>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <p className="font-semibold text-gray-700 mb-2">公式参数解释：</p>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li><InlineMath math="Q" /> (Query): 来自语言模型的中间层状态（Flamingo）或一组可学习的查询向量（Q-Former）。</li>
                  <li><InlineMath math="K, V" /> (Key, Value): 来自视觉编码器（如 ViT）输出的图像特征 <InlineMath math="Z_v" />。</li>
                  <li><InlineMath math="d_k" />: 缩放因子，用于防止点积数值过大导致梯度消失。</li>
                </ul>
                <p className="mt-3 text-sm text-gray-600">
                  <strong>物理意义：</strong> 该公式计算了语言部分（或查询向量）应该关注图像的哪些区域（空间位置）。计算出的权重矩阵乘上 <InlineMath math="V" /> 后，即得到了与当前文本上下文最相关的视觉信息。
                </p>
              </div>
            </div>

            {/* Formula 2: Autoregressive Loss */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-gray-800 mb-3">3.2 自回归训练损失 (Autoregressive Loss)</h3>
              <p className="text-gray-600 mb-3">
                这是 MLLM 进行<strong>指令微调 (Instruction Tuning)</strong> 时最常用的损失函数。目标是最大化在给定图像 <InlineMath math="I" /> 和之前的文本序列 <InlineMath math="x_{<t}" /> 条件下，生成下一个 token <InlineMath math="x_t" /> 的概率。
              </p>
              <div className="bg-white p-6 rounded-md border border-gray-200 shadow-sm overflow-x-auto my-4">
                <BlockMath math="\mathcal{L} = - \sum_{t=1}^{T} \log P_\theta(x_t \mid x_{<t}, I)" />
              </div>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <p className="font-semibold text-gray-700 mb-2">公式拆解：</p>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li><InlineMath math="I" />: 输入图像的特征表示（经适配器处理后）。</li>
                  <li><InlineMath math="x_{<t}" />: 当前时刻 <InlineMath math="t" /> 之前的所有文本 token（包括指令 Prompt）。</li>
                  <li><InlineMath math="x_t" />: 当前时刻需要预测的真实 token（Ground Truth）。</li>
                  <li><InlineMath math="\theta" />: 模型的可训练参数（LLM 参数和/或适配器参数）。</li>
                </ul>
                <p className="mt-3 text-sm text-gray-600">
                  <strong>训练过程：</strong> 在 Visual Instruction Tuning 阶段（如 LLaVA），我们冻结视觉编码器，仅更新投影层和/或 LLM，使得模型学会根据图像内容回答复杂问题。
                </p>
              </div>
            </div>

            {/* Formula 3: Contrastive Loss */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-gray-800 mb-3">3.3 对比学习损失 (Contrastive Loss / ITC)</h3>
              <p className="text-gray-600 mb-3">
                用于视觉编码器（如 CLIP）的预训练，或 BLIP-2 第一阶段的 Image-Text Contrastive (ITC) 学习。这是一个对称的损失函数，目的是同时优化"图找文"和"文找图"的能力。
              </p>
              <div className="bg-white p-6 rounded-md border border-gray-200 shadow-sm overflow-x-auto my-4">
                <BlockMath math="\mathcal{L}_{\text{ITC}} = - \frac{1}{2} \left( \underbrace{\mathbb{E}_{(I, T) \sim D} \left[ \log \frac{\exp(\text{sim}(I, T) / \tau)}{\sum_{T'} \exp(\text{sim}(I, T') / \tau)} \right]}_{\text{Image-to-Text}} + \underbrace{\mathbb{E}_{(I, T) \sim D} \left[ \log \frac{\exp(\text{sim}(I, T) / \tau)}{\sum_{I'} \exp(\text{sim}(I', T) / \tau)} \right]}_{\text{Text-to-Image}} \right)" />
              </div>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200 space-y-4">
                <p className="font-semibold text-gray-700">深度拆解：对称的双向对齐</p>
                
                {/* Breakdown 1: Image-to-Text */}
                <div className="border-l-4 border-yellow-400 pl-3">
                  <h4 className="font-bold text-sm text-gray-900">1. 第一部分：图像找文本 (Image-to-Text Loss)</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>公式：</strong> 左边的求和部分，分母为 <InlineMath math="\sum_{T'}" />。
                    <br /><strong>物理意义：</strong> 给定一张图片 <InlineMath math="I" />，模型需要在当前 Batch 的所有文本中，准确找出与其匹配的那个正确描述 <InlineMath math="T" />。
                    <br /><strong>计算逻辑：</strong> 分母是在所有<strong>文本</strong>上进行归一化 (Softmax over texts)。这训练了模型分辨该图片"是什么"的能力。
                  </p>
                </div>

                {/* Breakdown 2: Text-to-Image */}
                <div className="border-l-4 border-green-400 pl-3">
                  <h4 className="font-bold text-sm text-gray-900">2. 第二部分：文本找图像 (Text-to-Image Loss)</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>公式：</strong> 右边的求和部分，分母为 <InlineMath math="\sum_{I'}" />。
                    <br /><strong>物理意义：</strong> 给定一段文本 <InlineMath math="T" />，模型需要在当前 Batch 的所有图片中，准确找出与其匹配的那张图片 <InlineMath math="I" />。
                    <br /><strong>计算逻辑：</strong> 分母是在所有<strong>图片</strong>上进行归一化 (Softmax over images)。这训练了模型在视觉库中进行检索的能力。
                  </p>
                </div>

                {/* Breakdown 3: Why Two Parts? */}
                <div className="border-l-4 border-blue-400 pl-3">
                  <h4 className="font-bold text-sm text-gray-900">3. 为什么需要两部分？</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    仅做单向对齐是不够的。比如，如果只做"图找文"，模型可能会把很多不同的图片都映射到同一个笼统的文本描述上（如"物体"）。
                    通过双向约束，强制图像特征和文本特征在嵌入空间中一一对应（互为最近邻），从而实现最鲁棒的对齐。
                    <br />系数 <InlineMath math="-\frac{1}{2}" /> 表示最终损失是这两个方向损失的平均值。
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Training */}
          <SectionCard id="training" title="4. 训练策略 (Training Methodologies)" borderColor="border-purple-500">
            <p className="text-gray-700 mb-4">MLLM 的训练通常分为两个阶段：</p>
            
            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-100 text-purple-600 font-bold">1</div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-gray-900">特征对齐预训练 (Feature Alignment / Pre-training)</h4>
                  <p className="mt-2 text-gray-600 text-sm">
                    <strong>目标：</strong> 让 LLM 能够"看懂"图像特征。<br />
                    <strong>数据：</strong> 大规模图像-文本对（如 CC3M, LAION），通常是粗糙的描述。<br />
                    <strong>操作：</strong> 通常冻结 LLM 和 Visual Encoder，仅训练 <strong>Adapter</strong>。此阶段模型能描述图像，但缺乏对话逻辑。
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-100 text-purple-600 font-bold">2</div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-gray-900">视觉指令微调 (Visual Instruction Tuning)</h4>
                  <p className="mt-2 text-gray-600 text-sm">
                    <strong>目标：</strong> 让模型具备遵循指令、多轮对话的能力。<br />
                    <strong>数据：</strong> 经过人工标注或 GPT-4 生成的高质量指令数据（如 LLaVA-Instruct），包含问答、推理、代码生成等。<br />
                    <strong>操作：</strong> 训练 Adapter 和/或 LLM。使模型从简单的"图像描述者"变为"智能助手"。
                  </p>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Section 5: Tasks */}
          <SectionCard id="tasks" title="5. 任务与能力 (Tasks & Capabilities)" borderColor="border-orange-500">
            <p className="text-gray-700 mb-6">
              随着 MLLM 的发展，其能力已远远超越了简单的图像描述。论文重点分析了以下四个前沿领域：
            </p>
            <div className="space-y-8">
              {/* Task 1: Visual Grounding */}
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
                <h3 className="text-xl font-bold text-orange-800 mb-3 flex items-center">
                  <span className="mr-2">📍</span> 5.1 视觉定位与指代 (Visual Grounding)
                </h3>
                <p className="text-gray-700 mb-4 text-sm">
                  这是指模型在像素级或区域级理解图像的能力。通常包含两个方向：
                  <strong>Referring (指代)</strong>：根据坐标区域描述内容；
                  <strong>Grounding (定位)</strong>：根据文本描述找到对应的坐标区域。
                </p>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-200">
                  <h4 className="font-bold text-gray-800 text-sm mb-2">核心实现范式：</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                    <li>
                      <span className="font-semibold text-orange-700">Region-as-Text (区域即文本):</span>
                      {' '}将边界框坐标（Bounding Box）离散化为特殊的文本 Token，直接由 LLM 自回归生成。
                      <br /><span className="text-xs text-gray-500">代表模型: Shikra, Kosmos-2, Qwen-VL</span>
                    </li>
                    <li>
                      <span className="font-semibold text-orange-700">Embedding-as-Region (嵌入即区域):</span>
                      {' '}LLM 输出特殊的 Embedding，将其送入解码器（如 SAM Mask Decoder）来生成精细的分割掩码。
                      <br /><span className="text-xs text-gray-500">代表模型: LISA, PixelLLM</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Task 2: Image Generation */}
              <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                <h3 className="text-xl font-bold text-indigo-800 mb-3 flex items-center">
                  <span className="mr-2">🎨</span> 5.2 图像生成与编辑 (Image Generation & Editing)
                </h3>
                <p className="text-gray-700 mb-4 text-sm">
                  通过将 MLLM 与扩散模型（如 Stable Diffusion）结合，实现"文生图"或"图生图"。LLM 充当控制器，理解复杂的指令并指导生成。
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-200">
                    <h4 className="font-bold text-gray-800 text-sm mb-2">连接机制</h4>
                    <p className="text-sm text-gray-600">
                      <strong>Feature Mapping:</strong> 训练一个映射器（Mapper），将 LLM 的输出 Embedding 转换为扩散模型的条件输入（GILL）。
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-200">
                    <h4 className="font-bold text-gray-800 text-sm mb-2">端到端微调</h4>
                    <p className="text-sm text-gray-600">
                      直接微调 LLM 或扩散模型的 U-Net，使其能够理解交错的图文序列（Interleaved Image-Text Generation）。
                      <br /><span className="text-xs text-gray-500">代表模型: Emu, MiniGPT-5, DreamLLM</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Task 3: Other Modalities */}
              <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center">
                  <span className="mr-2">🎥</span> 5.3 视频与多模态 (Video & Any-Modality)
                </h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="bg-green-200 text-green-800 text-xs font-bold px-2 py-1 rounded mr-2 mt-0.5">视频理解</span>
                    <span>
                      处理时间维度是关键。方法通常包括对帧特征进行平均池化，或使用 Video Q-Former 来聚合时序信息。部分模型（如 Video-LLaMA）还引入了音频编码器。
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-200 text-green-800 text-xs font-bold px-2 py-1 rounded mr-2 mt-0.5">3D 理解</span>
                    <span>
                      利用点云编码器（如 Point-BERT）或将 3D 场景投影为多视角 2D 图像（3D-LLM），使 LLM 能理解空间结构。
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-200 text-green-800 text-xs font-bold px-2 py-1 rounded mr-2 mt-0.5">统一模型</span>
                    <span>
                      如 <strong>ImageBind</strong> 或 <strong>NEXT-GPT</strong>，试图在一个统一的特征空间内处理图像、视频、音频、热成像等任意模态。
                    </span>
                  </li>
                </ul>
              </div>

              {/* Task 4: Domain Specific */}
              <div className="bg-gray-100 rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                  <span className="mr-2">🔬</span> 5.4 特定领域应用 (Domain Specific)
                </h3>
                <p className="text-gray-700 mb-4 text-sm">除了通用任务外，MLLM 正在迅速渗透到各个垂直领域，解决高度专业化的问题。</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Card 1: Documents */}
                  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                    <h4 className="font-bold text-gray-800 flex items-center mb-2">
                      <span className="bg-gray-100 p-1 rounded mr-2">📄</span> 文档与 OCR 分析
                    </h4>
                    <p className="text-xs text-gray-600 mb-3">
                      <strong>核心挑战：</strong> 传统 OCR 丢失布局信息，而 MLLM 旨在实现"无 OCR"的端到端理解，直接将图片转换为 Markdown/JSON 等结构化格式。
                    </p>
                    <div className="bg-gray-50 p-2 rounded text-xs text-gray-500">
                      <strong>代表模型：</strong> mPLUG-DocOwl, Kosmos-2.5, UReader<br />
                      <strong>能力：</strong> 图表理解、长文档阅读、信息提取
                    </div>
                  </div>

                  {/* Card 2: Medical */}
                  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                    <h4 className="font-bold text-gray-800 flex items-center mb-2">
                      <span className="bg-red-50 p-1 rounded mr-2 text-red-500">🏥</span> 医学影像分析
                    </h4>
                    <p className="text-xs text-gray-600 mb-3">
                      <strong>核心挑战：</strong> 缺乏大规模标注数据，且需要极高的准确性。通常利用 PMC-OA 等生物医学文献数据进行微调。
                    </p>
                    <div className="bg-gray-50 p-2 rounded text-xs text-gray-500">
                      <strong>代表模型：</strong> LLaVA-Med, PMC-VQA<br />
                      <strong>能力：</strong> 放射图诊断、病理报告生成、医学问答
                    </div>
                  </div>

                  {/* Card 3: Embodied AI */}
                  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                    <h4 className="font-bold text-gray-800 flex items-center mb-2">
                      <span className="bg-blue-50 p-1 rounded mr-2 text-blue-500">🤖</span> 具身智能 (Embodied AI)
                    </h4>
                    <p className="text-xs text-gray-600 mb-3">
                      <strong>核心挑战：</strong> 将"视觉感知"转化为"物理行动"。模型不仅要看懂环境，还要生成机器人的控制指令（Plan & Act）。
                    </p>
                    <div className="bg-gray-50 p-2 rounded text-xs text-gray-500">
                      <strong>代表模型：</strong> PaLM-E, EmbodiedGPT<br />
                      <strong>能力：</strong> 任务规划、机器人导航、机械臂操作
                    </div>
                  </div>

                  {/* Card 4: Autonomous Driving */}
                  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                    <h4 className="font-bold text-gray-800 flex items-center mb-2">
                      <span className="bg-yellow-50 p-1 rounded mr-2 text-yellow-500">🚗</span> 自动驾驶 (Autonomous Driving)
                    </h4>
                    <p className="text-xs text-gray-600 mb-3">
                      <strong>核心挑战：</strong> 解释复杂的交通场景并做出决策。MLLM 能够解释"为什么"要减速或变道，提供可解释性。
                    </p>
                    <div className="bg-gray-50 p-2 rounded text-xs text-gray-500">
                      <strong>代表模型：</strong> DriveGPT4, Dolphins<br />
                      <strong>能力：</strong> 路况理解、事故推理、驾驶建议
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Section 6: Evaluation */}
          <SectionCard id="evaluation" title="6. 评估与挑战 (Evaluation & Challenges)" borderColor="border-red-500">
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3">主要评估基准 (Benchmarks)</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th className="px-6 py-3">基准名称</th>
                      <th className="px-6 py-3">评估侧重点</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b">
                      <td className="px-6 py-4 font-medium text-gray-900">MME / MMBench</td>
                      <td className="px-6 py-4">综合感知与推理能力（Perception & Reasoning）。</td>
                    </tr>
                    <tr className="bg-white border-b">
                      <td className="px-6 py-4 font-medium text-gray-900">POPE</td>
                      <td className="px-6 py-4"><strong>物体幻觉 (Object Hallucination)</strong> 检测，判断模型是否捏造不存在的物体。</td>
                    </tr>
                    <tr className="bg-white border-b">
                      <td className="px-6 py-4 font-medium text-gray-900">MathVista</td>
                      <td className="px-6 py-4">视觉环境下的数学推理能力。</td>
                    </tr>
                    <tr className="bg-white border-b">
                      <td className="px-6 py-4 font-medium text-gray-900">ScienceQA</td>
                      <td className="px-6 py-4">多模态科学问答。</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">当前挑战与未来方向</h3>
              <ul className="list-decimal list-inside space-y-2 text-gray-700">
                <li><strong>幻觉问题 (Hallucination):</strong> MLLM 倾向于生成图像中不存在的内容。解决方法包括 RLHF 和构建专门的负样本数据（如 POPE）。</li>
                <li><strong>高分辨率图像支持:</strong> 大多数模型将图像压缩为低分辨率（如 224x224 或 336x336），导致细节丢失。未来的方向是支持任意分辨率（Any-resolution）。</li>
                <li><strong>计算开销:</strong> 视觉 Token 序列过长会显著增加推理成本。</li>
              </ul>
            </div>
          </SectionCard>

          {/* Footer */}
          <footer className="mt-12 border-t border-gray-200 pt-8 pb-12 text-center text-gray-500 text-sm">
            <p>基于 2024 年综述论文整理生成。涵盖 MLLM 的最新进展与核心技术细节。</p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default MLLMRevolutionPaper;








