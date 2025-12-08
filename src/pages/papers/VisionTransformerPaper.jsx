import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { 
  ArrowLeft, FileText, Image, Calculator, Scale, LineChart,
  Layers, Grid3X3, ChevronRight, Settings, Database, Eye, Zap
} from 'lucide-react';

// 符号定义表格组件
const SymbolTable = () => (
  <div className="mb-8">
    <h3 className="text-lg font-bold text-gray-800 mb-3">关键符号定义</h3>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b text-left">符号</th>
            <th className="py-2 px-4 border-b text-left">维度/类型</th>
            <th className="py-2 px-4 border-b text-left">含义</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b font-mono text-blue-600"><InlineMath math="x" /></td>
            <td className="py-2 px-4 border-b"><InlineMath math="\mathbb{R}^{H \times W \times C}" /></td>
            <td className="py-2 px-4 border-b">原始输入图像 (高 × 宽 × 通道)</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b font-mono text-blue-600"><InlineMath math="P" /></td>
            <td className="py-2 px-4 border-b">Scalar</td>
            <td className="py-2 px-4 border-b">Patch 的边长 (通常为 16 或 32)</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b font-mono text-blue-600"><InlineMath math="N" /></td>
            <td className="py-2 px-4 border-b"><InlineMath math="HW / P^2" /></td>
            <td className="py-2 px-4 border-b">Patch 的总数量 (即 Transformer 的序列长度)</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b font-mono text-blue-600"><InlineMath math="D" /></td>
            <td className="py-2 px-4 border-b">Scalar</td>
            <td className="py-2 px-4 border-b">Latent Vector Size (Transformer 内部的隐层维度)</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

// 数学公式块组件
const MathBlock = ({ children }) => (
  <div className="overflow-x-auto p-4 bg-slate-50 rounded-lg my-4 border-l-4 border-blue-500">
    <BlockMath math={children} />
  </div>
);

// 符号解释项组件
const SymbolExplanation = ({ symbol, title, children }) => (
  <div className="flex items-start gap-3 mb-4">
    <span className="bg-blue-100 text-blue-800 font-mono px-2 py-1 rounded mt-1 shrink-0">
      <InlineMath math={symbol} />
    </span>
    <div>
      <strong>{title}</strong>
      <p className="text-sm mt-1 text-gray-600">{children}</p>
    </div>
  </div>
);

// 侧边导航项
const navItems = [
  { id: 'abstract', label: '摘要与背景' },
  { id: 'model-overview', label: '模型总览 (Model Overview)' },
  { id: 'model-variants', label: 'ViT 变体配置' },
  { id: 'math-deep-dive', label: '数学原理详解 (重点)', isHeader: true },
  { id: 'math-equation-1', label: '公式 (1): 输入嵌入', isSubItem: true },
  { id: 'math-equation-2-3', label: '公式 (2)-(3): 编码器', isSubItem: true },
  { id: 'math-equation-4', label: '公式 (4): 分类头', isSubItem: true },
  { id: 'attention-mechanism', label: 'Self-Attention 机制', isSubItem: true },
  { id: 'hybrid-architecture', label: '混合架构 (Hybrid)' },
  { id: 'fine-tuning', label: '微调与高分辨率' },
  { id: 'position-embedding', label: '位置编码分析' },
  { id: 'inductive-bias', label: '归纳偏置 (Inductive Bias)' },
  { id: 'attention-distance', label: '注意力距离分析' },
  { id: 'experiments', label: '实验结论' },
  { id: 'datasets', label: '预训练数据集' },
];

const VisionTransformerPaper = () => {
  const [activeSection, setActiveSection] = useState('abstract');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id], div[id^="math-equation"]');
      let current = 'abstract';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 150) {
          current = section.getAttribute('id');
        }
      });
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* 顶部导航栏 */}
      <header className="bg-white shadow-sm fixed w-full z-50 top-0 left-0 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-gray-500 hover:text-blue-600 transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <Layers className="text-blue-600" size={24} />
            <span className="text-xl font-bold text-gray-900 tracking-wide">ViT 论文深度解析</span>
          </div>
          <div className="text-sm text-gray-500 hidden md:block">
            基于: An Image is Worth 16x16 Words (ICLR 2021)
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
        {/* 左侧侧边栏导航 */}
        <aside className="hidden lg:block w-64 flex-shrink-0 h-[calc(100vh-8rem)] sticky top-24 overflow-y-auto pr-4">
          <nav className="space-y-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  const element = document.getElementById(item.id);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  item.isSubItem ? 'pl-6 text-xs text-gray-500' : 'text-gray-600'
                } ${
                  activeSection === item.id
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* 主要内容区域 */}
        <main className="flex-1 min-w-0">
          {/* 标题区 */}
          <div className="mb-10 border-b pb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              An Image is Worth 16x16 Words: <br />
              <span className="text-blue-600">Transformers for Image Recognition at Scale</span>
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              本文提出了一种纯 Transformer 架构，无需依赖 CNN，通过将图像分割为 Patch 序列直接进行分类任务。在大规模数据集预训练下，ViT 展现出了超越 ResNet 的性能。
            </p>
            <div className="flex gap-4 mt-4 text-sm">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">ICLR 2021</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Google Research</span>
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">Alexey Dosovitskiy et al.</span>
            </div>
          </div>

          {/* 摘要与背景 */}
          <section id="abstract" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <FileText className="mr-3 text-blue-500" size={24} /> 摘要与背景
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="mb-4 text-gray-700 leading-7">
                Transformer 已经是 NLP（自然语言处理）领域的标准架构。但在计算机视觉（CV）中，卷积神经网络（CNN）仍然占据主导地位。以往的工作大多尝试将 Attention 机制与 CNN 结合，或者替换 CNN 的某些组件。
              </p>
              <p className="text-gray-700 leading-7 font-medium border-l-4 border-yellow-400 pl-4 bg-yellow-50 py-2">
                <strong>核心思想：</strong> 本文证明了对 CNN 的依赖是不必要的。将图像拆分为 Patch 序列，直接输入到标准的 Transformer 编码器中，在大规模预训练（JFT-300M, ImageNet-21k）后，能够在图像分类任务上取得优异成绩，且训练计算成本更低。
              </p>
            </div>
          </section>

          {/* 模型总览 */}
          <section id="model-overview" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Image className="mr-3 text-blue-500" size={24} /> 模型架构总览
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-bold text-lg mb-3 border-b pb-2">处理流程</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li><strong>分块 (Patching)：</strong> 将 2D 图像 <InlineMath math="H \times W" /> 切分为固定大小的 <InlineMath math="P \times P" /> 小块。</li>
                  <li><strong>展平与映射 (Flatten & Project)：</strong> 将每个 Patch 展平为 1D 向量，并通过线性层映射到维度 <InlineMath math="D" />。</li>
                  <li><strong>位置编码 (Position Embedding)：</strong> 加入位置信息，保留空间结构感。</li>
                  <li><strong>分类 Token (Class Token)：</strong> 增加一个可学习的 [class] token 用于最终分类。</li>
                  <li><strong>Transformer Encoder：</strong> 标准的 MSA + MLP 堆叠结构。</li>
                  <li><strong>MLP Head：</strong> 用于最终输出分类结果。</li>
                </ol>
              </div>
              
              {/* 可视化 Patching 过程 */}
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 flex flex-col items-center justify-center">
                <h3 className="font-bold text-sm text-gray-500 mb-4 w-full text-left">可视化概念：Patching</h3>
                <div className="flex items-center gap-4">
                  {/* 原始图像 */}
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded flex items-center justify-center text-white font-bold shadow">
                    Image
                  </div>
                  <ChevronRight className="text-gray-400" />
                  {/* 切分后的 Patches */}
                  <div className="grid grid-cols-3 gap-1 p-1 bg-gray-200 rounded">
                    <div className="w-6 h-6 bg-blue-300"></div><div className="w-6 h-6 bg-blue-400"></div><div className="w-6 h-6 bg-purple-300"></div>
                    <div className="w-6 h-6 bg-blue-400"></div><div className="w-6 h-6 bg-purple-400"></div><div className="w-6 h-6 bg-purple-300"></div>
                    <div className="w-6 h-6 bg-purple-300"></div><div className="w-6 h-6 bg-purple-400"></div><div className="w-6 h-6 bg-purple-500"></div>
                  </div>
                  <ChevronRight className="text-gray-400" />
                  <div className="h-24 w-8 border-2 border-dashed border-gray-400 rounded flex flex-col items-center justify-center text-xs text-gray-500 bg-white">
                    <span>Seq</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3 text-center">每个 Patch 被视为 NLP 中的一个 "Word" (Token)</p>
              </div>
            </div>
          </section>

          {/* ViT 变体配置 */}
          <section id="model-variants" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Settings className="mr-3 text-blue-500" size={24} /> ViT 模型变体配置
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-700 mb-4">
                论文提出了三种规模的 ViT 变体，命名规则借鉴 BERT（Base/Large/Huge）。模型名称格式为 <strong>ViT-L/16</strong>，表示 Large 变体 + 16×16 Patch Size。
              </p>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-2 px-4 border-b text-left">Model</th>
                      <th className="py-2 px-4 border-b text-left">Layers (L)</th>
                      <th className="py-2 px-4 border-b text-left">Hidden Size (D)</th>
                      <th className="py-2 px-4 border-b text-left">MLP Size</th>
                      <th className="py-2 px-4 border-b text-left">Heads</th>
                      <th className="py-2 px-4 border-b text-left">Params</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 border-b font-medium">ViT-Base</td>
                      <td className="py-2 px-4 border-b">12</td>
                      <td className="py-2 px-4 border-b">768</td>
                      <td className="py-2 px-4 border-b">3072</td>
                      <td className="py-2 px-4 border-b">12</td>
                      <td className="py-2 px-4 border-b">86M</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b font-medium">ViT-Large</td>
                      <td className="py-2 px-4 border-b">24</td>
                      <td className="py-2 px-4 border-b">1024</td>
                      <td className="py-2 px-4 border-b">4096</td>
                      <td className="py-2 px-4 border-b">16</td>
                      <td className="py-2 px-4 border-b">307M</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="py-2 px-4 border-b font-medium text-blue-700">ViT-Huge</td>
                      <td className="py-2 px-4 border-b">32</td>
                      <td className="py-2 px-4 border-b">1280</td>
                      <td className="py-2 px-4 border-b">5120</td>
                      <td className="py-2 px-4 border-b">16</td>
                      <td className="py-2 px-4 border-b">632M</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800 mb-2">Patch Size 影响</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• <strong>P=16:</strong> 224×224 图像 → 14×14 = 196 patches</li>
                    <li>• <strong>P=32:</strong> 224×224 图像 → 7×7 = 49 patches</li>
                    <li>• 更小的 Patch = 更长序列 = 更高计算成本</li>
                  </ul>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800 mb-2">序列长度计算</h4>
                  <div className="text-center my-2">
                    <InlineMath math="N = \frac{H \times W}{P^2} = \frac{224 \times 224}{16^2} = 196" />
                  </div>
                  <p className="text-sm text-gray-600">加上 [CLS] token，总序列长度为 197</p>
                </div>
              </div>
            </div>
          </section>

          {/* 数学深度解析 */}
          <section id="math-deep-dive" className="mb-12 scroll-mt-24">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-2 flex items-center">
                <Calculator className="mr-2" size={24} /> 数学原理深度解析
              </h2>
              <p className="text-blue-800">
                本节将详细拆解论文中的四个核心公式，包括维度变换和每一项的物理含义。
              </p>
            </div>

            {/* 符号定义表 */}
            <SymbolTable />

            {/* 公式 1 */}
            <div id="math-equation-1" className="mb-10 scroll-mt-28">
              <h3 className="text-xl font-bold text-gray-800 mb-2">公式 (1): 嵌入层 (Linear Projection of Flattened Patches)</h3>
              <p className="text-gray-600 mb-3">这是 ViT 的入口，负责将 2D 图像转换为 Transformer 可以处理的 1D 向量序列。</p>
              
              <MathBlock>
                {`z_0 = [x_{\\text{class}}; \\ x_p^1 E; \\ x_p^2 E; \\ \\cdots; \\ x_p^N E] + E_{pos}`}
              </MathBlock>
              
              <div className="space-y-4 text-gray-700">
                <SymbolExplanation symbol="x_p^i" title="第 i 个图像块 (Patch)：">
                  原始图像 <InlineMath math="x" /> 被重塑为序列 <InlineMath math="x_p \in \mathbb{R}^{N \times (P^2 \cdot C)}" />。
                  例如，若 <InlineMath math="P=16, C=3" />，则每个 patch 是一个 <InlineMath math="16 \times 16 \times 3 = 768" /> 维的向量。
                </SymbolExplanation>
                
                <SymbolExplanation symbol="E" title="线性映射矩阵 (Linear Projection)：">
                  维度为 <InlineMath math="E \in \mathbb{R}^{(P^2 \cdot C) \times D}" />。
                  它将每个扁平化的 patch 映射到维度 <InlineMath math="D" />。这相当于一个全连接层（或大步幅卷积）。
                </SymbolExplanation>

                <SymbolExplanation symbol="x_{\\text{class}}" title="可学习的分类 Token：">
                  这是一个可学习的向量，预置到 Patch 序列的最前面。其目的是在经过 Transformer 层层处理后，其对应的输出状态 <InlineMath math="z_L^0" /> 将作为整个图像的特征表示（类似于 BERT 中的 [CLS]）。
                </SymbolExplanation>

                <SymbolExplanation symbol="E_{pos}" title="位置嵌入 (Position Embeddings)：">
                  维度为 <InlineMath math="E_{pos} \in \mathbb{R}^{(N+1) \times D}" />。
                  由于 Transformer 的 Self-Attention 是置换不变的（无法区分 patch 的位置），必须加上位置编码。论文使用标准的可学习 1D 位置编码。
                </SymbolExplanation>
              </div>
            </div>

            {/* 公式 2 & 3 */}
            <div id="math-equation-2-3" className="mb-10 scroll-mt-28">
              <h3 className="text-xl font-bold text-gray-800 mb-2">公式 (2) & (3): Transformer 编码器块</h3>
              <p className="text-gray-600 mb-3">这是网络的主体，由 <InlineMath math="L" /> 层堆叠而成。ViT 采用了 Pre-Norm 结构（即 LayerNorm 在 MSA/MLP 之前）。</p>
              
              <MathBlock>
                {`z'_l = \\text{MSA}(\\text{LN}(z_{l-1})) + z_{l-1}, \\quad l=1 \\dots L`}
              </MathBlock>
              <MathBlock>
                {`z_l = \\text{MLP}(\\text{LN}(z'_l)) + z'_l, \\quad l=1 \\dots L`}
              </MathBlock>

              <div className="grid md:grid-cols-2 gap-8 mt-4">
                <div>
                  <h4 className="font-bold text-blue-700 mb-2">MSA (Multiheaded Self-Attention)</h4>
                  <p className="text-sm text-gray-700 leading-6">
                    多头自注意力机制。它允许模型在处理当前 patch 时，参考图像中所有其他 patch 的信息（全局感受野）。
                    <br />输入的序列长度为 <InlineMath math="N+1" />，输出保持不变。
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-blue-700 mb-2">MLP (Multi-Layer Perceptron)</h4>
                  <p className="text-sm text-gray-700 leading-6">
                    包含两个全连接层，中间使用 GELU 激活函数。
                    <br />维度变化通常是 <InlineMath math="D \to 4D \to D" />。
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-blue-700 mb-2">LN (Layer Norm)</h4>
                  <p className="text-sm text-gray-700 leading-6">
                    层归一化。在 ViT 中，LN 应用于每个块的输入之前（Pre-Norm），这有助于深层网络的训练稳定性。
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-blue-700 mb-2">残差连接 (<InlineMath math="+ z_{l-1}" />)</h4>
                  <p className="text-sm text-gray-700 leading-6">
                    经典的 ResNet 结构，确保梯度能够有效反向传播，防止梯度消失。
                  </p>
                </div>
              </div>
            </div>

            {/* 公式 4 */}
            <div id="math-equation-4" className="mb-10 scroll-mt-28">
              <h3 className="text-xl font-bold text-gray-800 mb-2">公式 (4): 最终分类</h3>
              
              <MathBlock>
                {`y = \\text{LN}(z_L^0)`}
              </MathBlock>

              <p className="text-gray-700">
                在第 <InlineMath math="L" /> 层输出后，我们只取序列中的<strong>第一个向量</strong>（即对应 [class] token 的位置 <InlineMath math="0" /> 的向量 <InlineMath math="z_L^0" />）。
                <br />对其进行 Layer Norm 处理后，接入一个 MLP Head（预训练时）或线性层（微调时）以获得最终的类别 <InlineMath math="y" />。
              </p>
            </div>

            {/* Attention 细节 */}
            <div id="attention-mechanism" className="mb-10 scroll-mt-28">
              <h3 className="text-xl font-bold text-gray-800 mb-2">附录：标准 Attention 计算 (Scaled Dot-Product)</h3>
              <p className="text-gray-600 mb-2">虽然正文没有详细列出，但这是 MSA 的基础。</p>
              
              <MathBlock>
                {`\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V`}
              </MathBlock>
              
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm mt-4 bg-gray-50 p-4 rounded">
                <li><strong><InlineMath math="Q, K, V" />:</strong> Query, Key, Value 矩阵，由输入 <InlineMath math="z" /> 线性投影得到。</li>
                <li><strong><InlineMath math="QK^T" />:</strong> 计算所有 Patch 之间的两两相似度（Attention Score）。这是一张 <InlineMath math="N \times N" /> 的图，表示图像中任意两个位置的相关性。</li>
                <li><strong><InlineMath math="\sqrt{d_k}" />:</strong> 缩放因子。防止点积结果过大导致 Softmax 梯度消失。</li>
              </ul>
            </div>
          </section>

          {/* 混合架构 */}
          <section id="hybrid-architecture" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Layers className="mr-3 text-blue-500" size={24} /> 混合架构 (Hybrid Architecture)
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-700 mb-4">
                论文还提出了一种<strong>混合架构</strong>：不直接从原始图像提取 Patch，而是使用 CNN（如 ResNet）提取的特征图作为输入。
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-700 mb-2">纯 ViT 流程</h4>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>Raw Image → Patch Embedding → Transformer</p>
                    <p className="text-xs">直接将原始像素块展平后映射</p>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-bold text-blue-700 mb-2">Hybrid 流程</h4>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>Raw Image → CNN → Feature Map → Transformer</p>
                    <p className="text-xs">CNN 特征图的每个 1×1 位置作为一个 "patch"</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-3 text-sm text-yellow-800">
                <strong>💡 实验发现：</strong> 在小计算量下，Hybrid 模型略优于纯 ViT；但随着模型规模增大，纯 ViT 逐渐追上并超越 Hybrid，说明大规模训练可以弥补归纳偏置的缺失。
              </div>
            </div>
          </section>

          {/* 微调与高分辨率 */}
          <section id="fine-tuning" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Zap className="mr-3 text-blue-500" size={24} /> 微调与高分辨率处理
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-bold text-lg mb-3">高分辨率微调策略</h3>
              <p className="text-gray-700 mb-4">
                ViT 在预训练时通常使用较低分辨率（224×224），但在微调时使用更高分辨率（384×384 或 512×512）可以提升性能。
              </p>
              <div className="bg-slate-50 p-4 rounded-lg mb-4">
                <h4 className="font-bold text-gray-800 mb-2">位置编码插值</h4>
                <p className="text-sm text-gray-600 mb-2">
                  当输入分辨率改变时，序列长度也随之改变。为保持预训练位置编码的有效性，论文采用<strong>2D 插值</strong>：
                </p>
                <ol className="text-sm text-gray-600 list-decimal list-inside space-y-1">
                  <li>将原始 1D 位置编码重塑为 2D 网格（如 14×14）</li>
                  <li>使用双线性插值扩展到新的网格大小（如 24×24）</li>
                  <li>重新展平为 1D 序列</li>
                </ol>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-green-700">224²</p>
                  <p className="text-xs text-gray-600">预训练分辨率</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-blue-700">384²</p>
                  <p className="text-xs text-gray-600">标准微调分辨率</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-purple-700">512²</p>
                  <p className="text-xs text-gray-600">高分辨率微调</p>
                </div>
              </div>
            </div>
          </section>

          {/* 位置编码分析 */}
          <section id="position-embedding" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Grid3X3 className="mr-3 text-blue-500" size={24} /> 位置编码分析
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-700 mb-4">
                论文对比了不同的位置编码方案，发现<strong>性能差异很小</strong>，但学习到的位置编码展现出有趣的空间结构。
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">位置编码类型对比</h4>
                  <table className="w-full text-sm border border-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-2 px-3 text-left">类型</th>
                        <th className="py-2 px-3 text-left">描述</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 px-3 font-medium">无位置编码</td>
                        <td className="py-2 px-3 text-gray-600">性能下降明显 (约 3%)</td>
                      </tr>
                      <tr className="border-b bg-blue-50">
                        <td className="py-2 px-3 font-medium">1D 可学习</td>
                        <td className="py-2 px-3 text-gray-600">论文默认选择 ✓</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-3 font-medium">2D 可学习</td>
                        <td className="py-2 px-3 text-gray-600">与 1D 几乎无差异</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium">相对位置编码</td>
                        <td className="py-2 px-3 text-gray-600">与 1D 几乎无差异</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800 mb-3">学习到的位置编码特征</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    可视化位置编码的相似性矩阵发现：
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• <strong>行列结构：</strong> 同行/同列的 patch 编码更相似</li>
                    <li>• <strong>距离感知：</strong> 距离越近的 patch 编码越相似</li>
                    <li>• <strong>自发学习：</strong> 即使只用 1D 编码，模型也能学到 2D 空间关系</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 归纳偏置与比较 */}
          <section id="inductive-bias" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Scale className="mr-3 text-blue-500" size={24} /> 归纳偏置 (Inductive Bias)
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-bold text-lg mb-2">ViT vs CNN</h3>
              <div className="text-gray-700 mb-4">
                <strong>CNN</strong> 具有很强的归纳偏置：
                <ul className="list-disc list-inside ml-4 mb-2">
                  <li><strong>局部性 (Locality)：</strong> 像素只和周围像素相关。</li>
                  <li><strong>平移等变性 (Translation Equivariance)：</strong> 无论物体在图像哪里，特征提取方式相同。</li>
                </ul>
              </div>
              <div className="text-gray-700">
                <strong>ViT</strong> 的归纳偏置<strong>非常少</strong>：
                <ul className="list-disc list-inside ml-4">
                  <li>ViT 的 Self-Attention 是全局的（Global），一开始就能看到全图。</li>
                  <li>2D 邻域结构仅在切分 Patch 和位置编码初始化时被使用，其余时间模型必须自己从数据中学习空间关系。</li>
                </ul>
              </div>
              <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-3 text-sm text-yellow-800">
                <strong>💡 结论：</strong> 这解释了为什么 ViT 在中等数据集（如 ImageNet-1k）上表现不如 ResNet（因为缺少归纳偏置导致过拟合），但在超大数据集（JFT-300M）上表现更好（因为大数据让模型学习到了比人为设计的 CNN 更优的模式）。
              </div>
            </div>
          </section>

          {/* 注意力距离分析 */}
          <section id="attention-distance" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Eye className="mr-3 text-blue-500" size={24} /> 注意力距离分析 (Attention Distance)
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-700 mb-4">
                论文分析了不同层中注意力的"距离"——类似于 CNN 中的感受野概念。通过计算每个 Query 与所有其他位置的加权平均距离来衡量。
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800 mb-3">浅层 (Lower Layers)</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• 注意力距离<strong>高度可变</strong></li>
                    <li>• 部分 Head 关注局部区域（类似 CNN）</li>
                    <li>• 部分 Head 已经具有全局视野</li>
                    <li>• 体现了多头注意力的多样性</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800 mb-3">深层 (Deeper Layers)</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• 几乎所有 Head 都具有<strong>全局注意力</strong></li>
                    <li>• 注意力距离趋于一致（约覆盖半幅图像）</li>
                    <li>• 与 CNN 需要堆叠很多层才能获得全局感受野形成对比</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 bg-green-50 border-l-4 border-green-400 p-3 text-sm text-green-800">
                <strong>🔍 Attention Rollout 可视化：</strong> 通过递归乘以各层的注意力权重矩阵，可以可视化 [CLS] token 对输入图像各位置的关注程度。结果显示 ViT 能够关注到语义上相关的图像区域。
              </div>
            </div>
          </section>

          {/* 实验结果 */}
          <section id="experiments" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <LineChart className="mr-3 text-blue-500" size={24} /> 实验结果亮点
            </h2>
            
            <div className="space-y-6">
              {/* 主要结果表 */}
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-3">多数据集性能对比</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm text-left text-gray-600">
                    <thead className="bg-gray-100 text-gray-700">
                      <tr>
                        <th className="px-3 py-2">Model</th>
                        <th className="px-3 py-2">ImageNet</th>
                        <th className="px-3 py-2">ImageNet-ReaL</th>
                        <th className="px-3 py-2">CIFAR-100</th>
                        <th className="px-3 py-2">VTAB (19 tasks)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="px-3 py-2 font-medium">BiT-L (ResNet152x4)</td>
                        <td className="px-3 py-2">87.54%</td>
                        <td className="px-3 py-2">90.54%</td>
                        <td className="px-3 py-2">93.51%</td>
                        <td className="px-3 py-2">76.29%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-3 py-2 font-medium">ViT-L/16 (I21k)</td>
                        <td className="px-3 py-2">85.30%</td>
                        <td className="px-3 py-2">88.62%</td>
                        <td className="px-3 py-2">93.25%</td>
                        <td className="px-3 py-2">72.72%</td>
                      </tr>
                      <tr className="border-b bg-blue-50">
                        <td className="px-3 py-2 font-medium text-blue-700">ViT-H/14 (JFT)</td>
                        <td className="px-3 py-2 font-bold text-blue-700">88.55%</td>
                        <td className="px-3 py-2 font-bold text-blue-700">90.72%</td>
                        <td className="px-3 py-2 font-bold text-blue-700">94.55%</td>
                        <td className="px-3 py-2 font-bold text-blue-700">77.63%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="font-bold text-gray-800 mb-2">计算效率对比</h3>
                  <table className="w-full text-sm text-left text-gray-600">
                    <thead className="bg-gray-100 text-gray-700">
                      <tr>
                        <th className="px-3 py-2">Model</th>
                        <th className="px-3 py-2">TPU-v3 Core-days</th>
                        <th className="px-3 py-2">效率</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="px-3 py-2 font-medium">BiT-L</td>
                        <td className="px-3 py-2">9,900</td>
                        <td className="px-3 py-2 text-red-600">基准</td>
                      </tr>
                      <tr className="border-b bg-green-50">
                        <td className="px-3 py-2 font-medium text-green-700">ViT-H/14</td>
                        <td className="px-3 py-2">2,500</td>
                        <td className="px-3 py-2 text-green-600 font-bold">4× 更快</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="mt-3 text-xs text-gray-500">ViT 以更少的计算资源达到更高精度。</p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="font-bold text-gray-800 mb-2">Scaling Laws (扩展定律)</h3>
                  <p className="text-sm text-gray-700 leading-6">
                    论文发现 ViT 的性能随着计算量的增加而稳步提升，没有出现饱和迹象。
                  </p>
                  <div className="mt-3 bg-slate-50 p-3 rounded">
                    <p className="text-xs text-gray-600">
                      <strong>关键发现：</strong>
                    </p>
                    <ul className="text-xs text-gray-600 mt-1 space-y-1">
                      <li>• 相同计算量下，ViT 优于 ResNet</li>
                      <li>• 性能随模型/数据规模持续提升</li>
                      <li>• 未出现明显的性能饱和</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 预训练数据集 */}
          <section id="datasets" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Database className="mr-3 text-blue-500" size={24} /> 预训练数据集
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800 mb-2">ImageNet-1k</h4>
                  <p className="text-2xl font-bold text-gray-700">1.3M</p>
                  <p className="text-xs text-gray-500">图像 / 1000 类</p>
                  <p className="text-sm text-gray-600 mt-2">
                    中等规模。ViT 在此数据集单独训练时表现不如 CNN。
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-bold text-blue-800 mb-2">ImageNet-21k</h4>
                  <p className="text-2xl font-bold text-blue-700">14M</p>
                  <p className="text-xs text-gray-500">图像 / 21,843 类</p>
                  <p className="text-sm text-gray-600 mt-2">
                    公开可用。ViT 在此规模开始展现优势。
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h4 className="font-bold text-purple-800 mb-2">JFT-300M</h4>
                  <p className="text-2xl font-bold text-purple-700">300M</p>
                  <p className="text-xs text-gray-500">图像 / 18,291 类</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Google 内部数据集。ViT 在此规模达到 SOTA。
                  </p>
                </div>
              </div>
              <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-3 text-sm text-yellow-800">
                <strong>💡 核心结论：</strong> 预训练数据规模是 ViT 成功的关键。数据量从 1M → 14M → 300M 增长时，ViT 相对于 CNN 的优势越来越明显，证明了"大规模训练可以克服归纳偏置缺失"的假设。
              </div>
            </div>
          </section>

          {/* 底部 */}
          <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
            <p>Generated based on "An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale"</p>
            <p className="mt-2">
              <Link to="/" className="text-blue-600 hover:underline">← 返回主页</Link>
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default VisionTransformerPaper;

