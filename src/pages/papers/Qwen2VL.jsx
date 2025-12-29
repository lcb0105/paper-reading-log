import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Layers, Cpu, Zap, BarChart3, Eye, Video, FileText, Calculator, Check, Clock, ArrowUpDown, Grid3X3 } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

// --- 通用组件 ---
const Section = ({ id, number, title, icon: Icon, children, className = "" }) => (
  <section id={id} className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-8 ${className}`}>
    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
      {number && (
        <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">
          {number}
        </span>
      )}
      {Icon && <Icon className="text-indigo-600 mr-3" size={24} />}
      {title}
    </h2>
    {children}
  </section>
);

const MathBlock = ({ children, title }) => (
  <div className="overflow-x-auto py-4 px-6 bg-gray-50 rounded-lg border border-gray-200 my-4">
    {title && <p className="font-bold mb-2 text-sm text-gray-500">{title}</p>}
    <div className="text-center">
      <BlockMath math={children} />
    </div>
  </div>
);

const InfoBox = ({ title, children, color = "green" }) => {
  const colors = {
    green: "bg-green-50 text-green-800 border-green-500",
    blue: "bg-blue-50 text-blue-800 border-blue-500",
    purple: "bg-purple-50 text-purple-800 border-purple-500",
    yellow: "bg-yellow-50 text-yellow-800 border-yellow-500"
  };
  return (
    <div className={`p-4 rounded-lg border-l-4 my-4 ${colors[color]}`}>
      {title && <strong className="block mb-1">{title}</strong>}
      <div className="text-sm">{children}</div>
    </div>
  );
};

const FormulaCard = ({ title, equation, label, children }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      {label && <span className="text-xs font-mono text-gray-400">{label}</span>}
    </div>
    <div className="py-4 border-b border-gray-100 mb-4">
      <BlockMath math={equation} />
    </div>
    {children}
  </div>
);

// --- 主组件 ---
const Qwen2VL = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-purple-100">
      
      {/* 返回按钮 */}
      <div className="fixed top-4 left-4 z-50">
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-lg text-gray-600 hover:text-purple-600 transition-colors border border-gray-200 shadow-sm"
        >
          <ArrowLeft size={16} />
          返回
        </Link>
      </div>

      {/* Header */}
      <header className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-16 px-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="text-sm font-semibold uppercase tracking-wider text-purple-200 mb-2">
            论文深度解析 (arXiv:2409.12191v2)
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Qwen2-VL: 增强视觉语言模型在任意分辨率下的感知能力
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl leading-relaxed">
            重新定义视觉处理范式：原生动态分辨率机制 (Naive Dynamic Resolution) 与多模态旋转位置编码 (M-ROPE) 的完美结合。
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <span className="bg-purple-900/50 px-3 py-1 rounded-full text-sm border border-purple-400">阿里巴巴 Qwen Team</span>
            <span className="bg-purple-900/50 px-3 py-1 rounded-full text-sm border border-purple-400">Vision-Language Model</span>
            <span className="bg-purple-900/50 px-3 py-1 rounded-full text-sm border border-purple-400">Dynamic Resolution</span>
            <span className="bg-purple-900/50 px-3 py-1 rounded-full text-sm border border-purple-400">M-RoPE</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* 1. 核心摘要 */}
        <Section id="abstract" number="01" title="核心摘要 (Abstract)">
          <p className="mb-4 text-gray-700 leading-relaxed">
            Qwen2-VL 是 Qwen-VL 模型的进阶版本，旨在解决传统大型视觉语言模型（LVLMs）在处理不同分辨率图像时的局限性。该模型系列（包含 <strong>2B, 7B, 72B</strong> 参数版本）引入了两项关键技术创新：
          </p>
          <ul className="space-y-3 text-gray-700 ml-4">
            <li className="flex items-start gap-3">
              <Eye className="text-indigo-500 mt-1 flex-shrink-0" size={20} />
              <div>
                <strong className="text-indigo-600">原生动态分辨率 (Naive Dynamic Resolution)：</strong>
                <span>允许模型处理任意分辨率的图像，将其动态转换为不同数量的视觉 Token，而非强制缩放到固定尺寸。</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Grid3X3 className="text-indigo-500 mt-1 flex-shrink-0" size={20} />
              <div>
                <strong className="text-indigo-600">多模态旋转位置编码 (M-ROPE)：</strong>
                <span>将位置编码分解为时间、高度和宽度三个部分，实现了文本、图像和视频位置信息的有效融合。</span>
              </div>
            </li>
          </ul>
          <InfoBox title="关键成果" color="green">
            Qwen2-VL-72B 在多个多模态基准测试中表现出与 <strong>GPT-4o</strong> 和 <strong>Claude 3.5 Sonnet</strong> 相当的竞争力，尤其在文档理解和长视频理解方面表现突出。
          </InfoBox>
        </Section>

        {/* 2. 架构创新 */}
        <Section id="architecture" number="02" title="模型架构与核心方法">
          
          {/* Dynamic Resolution */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200 flex items-center gap-2">
              <ArrowUpDown size={20} className="text-purple-600" />
              1. 原生动态分辨率 (Naive Dynamic Resolution)
            </h3>
            <p className="text-gray-600 mb-4">
              目前的 LVLM 通常使用固定的图像输入大小（如 224×224），这导致高分辨率图像细节丢失。Qwen2-VL 改变了这一现状：
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Check className="text-indigo-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <strong>动态处理：</strong>
                  <span className="text-gray-600">移除了绝对位置编码，引入 2D-RoPE。图像被处理为 "Patches"，并在推理阶段打包成一个序列。</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-indigo-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <strong>池化压缩：</strong>
                  <span className="text-gray-600">为了减少视觉 Token 数量，ViT 输出后使用 <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">2×2</code> 池化层，将相邻的 4 个 Token 压缩为 1 个。</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-indigo-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <strong>特殊标记：</strong>
                  <span className="text-gray-600">使用 <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">&lt;|vision_start|&gt;</code> 和 <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">&lt;|vision_end|&gt;</code> 标记图像内容的边界。</span>
                </div>
              </li>
            </ul>
          </div>

          {/* M-ROPE */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200 flex items-center gap-2">
              <Layers size={20} className="text-purple-600" />
              2. M-ROPE: 多模态旋转位置编码
            </h3>
            <p className="text-gray-600 mb-4">
              这是论文最大的创新点之一。传统的 1D-RoPE 只能处理一维序列，无法有效捕捉图像和视频的空间/时间关系。<strong>M-ROPE 将旋转位置编码解耦</strong>。
            </p>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-4">分解逻辑：</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-100">
                  <strong className="text-purple-600 block mb-2">文本 (Text)</strong>
                  <p className="text-gray-600">所有组件使用相同的 1D 位置 ID（类似传统 LLM）。</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                  <strong className="text-blue-600 block mb-2">图像 (Image)</strong>
                  <p className="text-gray-600">
                    <strong>时间 ID</strong> 保持不变。<br/>
                    <strong>高度 & 宽度 IDs</strong> 根据 Token 在图像中的空间位置变化。
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-red-100">
                  <strong className="text-red-600 block mb-2">视频 (Video)</strong>
                  <p className="text-gray-600">
                    <strong>时间 ID</strong> 随帧递增。<br/>
                    <strong>高度 & 宽度 IDs</strong> 随空间位置变化。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Unified Image/Video */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200 flex items-center gap-2">
              <Video size={20} className="text-purple-600" />
              3. 统一的图像与视频理解
            </h3>
            <p className="text-gray-600">
              Qwen2-VL 不再将视频视为独立的模态，而是视为连续的帧。通过整合 <strong>3D 卷积</strong>（深度为 2），模型可以处理 3D tube，这意味着可以处理更多的视频帧而不显著增加序列长度。
            </p>
          </div>
        </Section>

        {/* 3. 公式详解 */}
        <section id="formulas" className="bg-indigo-50 p-8 rounded-2xl shadow-md border border-indigo-100">
          <h2 className="text-2xl font-bold text-indigo-900 mb-6 flex items-center gap-3">
            <Calculator className="text-indigo-600" size={28} />
            核心公式详解
          </h2>
          <p className="mb-6 text-gray-700">
            为了深入理解 Qwen2-VL 的工作原理，我们需要详细分析其底层的数学表达，特别是 MoE（混合专家模型）的路由机制以及 M-ROPE 的概念性表达。
          </p>

          {/* Formula 1: MoE Routing */}
          <FormulaCard 
            title="1. MoE 门控路由概率 (Gating Probability)" 
            equation="p = \text{softmax}(G(x))"
            label="Eq. 1 (Appendix)"
          >
            <h4 className="font-bold text-gray-700 mb-2">详细解释：</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><InlineMath math="x" />：输入的 Token 表示向量。</li>
              <li><InlineMath math="G(x)" />：门控网络（Gating Network），通常是一个线性层，用于计算每个专家的得分。</li>
              <li><InlineMath math="\text{softmax}" />：归一化函数，将门控网络的输出得分转换为概率分布 <InlineMath math="p" />。</li>
              <li><strong>物理意义：</strong>该公式决定了对于当前的输入 Token，每个专家被选中的概率是多少。</li>
            </ul>
          </FormulaCard>

          {/* Formula 2: MoE Output */}
          <FormulaCard 
            title="2. MoE 加权输出 (Weighted Output)" 
            equation="y = \sum_{i \in \text{top}_k(p)} p_i E_i(x)"
            label="Eq. 2 (Appendix)"
          >
            <h4 className="font-bold text-gray-700 mb-2">详细解释：</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><InlineMath math="\text{top}_k(p)" />：从概率分布 <InlineMath math="p" /> 中选择概率最高的 <InlineMath math="k" /> 个专家的索引集合。</li>
              <li><InlineMath math="E_i(x)" />：第 <InlineMath math="i" /> 个专家网络（通常是 FFN）对输入 <InlineMath math="x" /> 的处理结果。</li>
              <li><InlineMath math="p_i" />：第 <InlineMath math="i" /> 个专家的门控概率权重。</li>
              <li><InlineMath math="y" />：最终的输出向量。</li>
              <li><strong>物理意义：</strong>模型的最终输出不是所有专家的总和，而是<strong>只有前 k 个最相关的专家</strong>参与计算，并根据其相关性（概率 <InlineMath math="p_i" />）进行加权求和。</li>
            </ul>
          </FormulaCard>

          {/* Conceptual Formula: M-ROPE */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">3. M-ROPE 的数学概念化 (Conceptual Formulation)</h3>
            <p className="text-gray-600 text-sm mb-4">
              虽然论文正文主要以文字描述 M-ROPE，但我们可以将其数学逻辑形式化，以便理解其如何在三维空间（时间、高、宽）中运作。
            </p>
            <div className="py-4 border-b border-gray-100 mb-4 text-center">
              <BlockMath math="\text{RoPE}(x, \mathbf{pos}) = x \cdot R_{\Theta, \mathbf{pos}}" />
              <p className="text-sm text-gray-500 mt-2">其中位置向量 <InlineMath math="\mathbf{pos}" /> 被分解为：</p>
              <BlockMath math="\mathbf{pos}_{video} = \{t, h, w\}" />
            </div>

            <h4 className="font-bold text-gray-700 mb-3">不同模态下的位置 ID 赋值逻辑：</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left text-gray-600 border border-gray-200 rounded-lg overflow-hidden">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                  <tr>
                    <th className="px-4 py-3">模态</th>
                    <th className="px-4 py-3">时间 ID (<InlineMath math="t" />)</th>
                    <th className="px-4 py-3">高度 ID (<InlineMath math="h" />)</th>
                    <th className="px-4 py-3">宽度 ID (<InlineMath math="w" />)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-medium">文本 (Text)</td>
                    <td className="px-4 py-3"><InlineMath math="m" /> (序列索引)</td>
                    <td className="px-4 py-3"><InlineMath math="m" /></td>
                    <td className="px-4 py-3"><InlineMath math="m" /></td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 font-medium">图像 (Image)</td>
                    <td className="px-4 py-3"><InlineMath math="C" /> (常数)</td>
                    <td className="px-4 py-3">row_idx</td>
                    <td className="px-4 py-3">col_idx</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-medium">视频 (Video)</td>
                    <td className="px-4 py-3">frame_idx</td>
                    <td className="px-4 py-3">row_idx</td>
                    <td className="px-4 py-3">col_idx</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              * M-ROPE 通过将旋转矩阵的维度切分，分别应用上述三种 ID，使得模型能够感知 Token 在时间流、垂直空间和水平空间中的绝对和相对位置。
            </p>
          </div>
        </section>

        {/* 4. 训练流程 */}
        <Section id="training" number="03" title="三阶段训练流程">
          <div className="relative border-l-4 border-purple-200 ml-4 space-y-8">
            {/* Stage 1 */}
            <div className="relative pl-8">
              <div className="absolute -left-3 top-0 bg-purple-500 h-6 w-6 rounded-full border-4 border-white flex items-center justify-center text-white text-xs font-bold">1</div>
              <h4 className="text-lg font-bold text-gray-800">阶段 I: 仅训练 ViT (Vision Transformer)</h4>
              <p className="text-gray-600 mt-2">
                利用海量图像-文本对，主要目的是优化视觉编码器以适应语义理解。此时 <strong className="text-red-500">LLM 部分是冻结的</strong>。
              </p>
            </div>

            {/* Stage 2 */}
            <div className="relative pl-8">
              <div className="absolute -left-3 top-0 bg-purple-600 h-6 w-6 rounded-full border-4 border-white flex items-center justify-center text-white text-xs font-bold">2</div>
              <h4 className="text-lg font-bold text-gray-800">阶段 II: 全参数训练</h4>
              <p className="text-gray-600 mt-2">
                <strong className="text-green-600">解冻所有参数</strong>。使用更多样化的数据（包括 OCR、图文混排文章、视频对话等），训练数据量达到 <strong>8000 亿 Token</strong>。
              </p>
            </div>

            {/* Stage 3 */}
            <div className="relative pl-8">
              <div className="absolute -left-3 top-0 bg-purple-800 h-6 w-6 rounded-full border-4 border-white flex items-center justify-center text-white text-xs font-bold">3</div>
              <h4 className="text-lg font-bold text-gray-800">阶段 III: 指令微调 (Instruction Tuning)</h4>
              <p className="text-gray-600 mt-2">
                冻结 ViT，仅微调 LLM。使用 ChatML 格式的指令数据，涵盖多模态对话、Agent 交互等任务，增强指令跟随能力。
              </p>
            </div>
          </div>

          {/* 训练阶段对比表格 */}
          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-gray-800">阶段</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-800">可训练模块</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-800">数据类型</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium">Stage 1: ViT 预训练</td>
                  <td className="px-4 py-3 text-red-500 font-bold">仅 ViT</td>
                  <td className="px-4 py-3">图像-文本对</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-medium">Stage 2: 全参数训练</td>
                  <td className="px-4 py-3 text-green-600 font-bold">全部解冻</td>
                  <td className="px-4 py-3">OCR、图文混排、视频对话 (800B tokens)</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium">Stage 3: 指令微调</td>
                  <td className="px-4 py-3 text-blue-600 font-bold">仅 LLM</td>
                  <td className="px-4 py-3">ChatML 指令数据</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        {/* 5. 性能表现 */}
        <Section id="performance" number="04" title="实验结果与性能">
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm text-left text-gray-500 border border-gray-200 rounded-lg overflow-hidden">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th className="px-6 py-3">基准测试 (Benchmark)</th>
                  <th className="px-6 py-3 font-bold text-indigo-700">Qwen2-VL-72B</th>
                  <th className="px-6 py-3">GPT-4o</th>
                  <th className="px-6 py-3">Claude 3.5 Sonnet</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-white hover:bg-gray-50">
                  <th className="px-6 py-4 font-medium text-gray-900">MMMU (专家级多模态)</th>
                  <td className="px-6 py-4 font-bold text-indigo-600">64.5</td>
                  <td className="px-6 py-4">69.1</td>
                  <td className="px-6 py-4">68.3</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-gray-100">
                  <th className="px-6 py-4 font-medium text-gray-900">DocVQA (文档理解)</th>
                  <td className="px-6 py-4 font-bold text-green-600">96.5 ✓</td>
                  <td className="px-6 py-4">92.8</td>
                  <td className="px-6 py-4">95.2</td>
                </tr>
                <tr className="bg-white hover:bg-gray-50">
                  <th className="px-6 py-4 font-medium text-gray-900">MathVista (数学推理)</th>
                  <td className="px-6 py-4 font-bold text-green-600">70.5 ✓</td>
                  <td className="px-6 py-4">63.8</td>
                  <td className="px-6 py-4">67.7</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-gray-100">
                  <th className="px-6 py-4 font-medium text-gray-900">RealWorldQA (现实世界问答)</th>
                  <td className="px-6 py-4 font-bold text-green-600">77.8 ✓</td>
                  <td className="px-6 py-4">75.4</td>
                  <td className="px-6 py-4 text-xs italic text-gray-400">(Not reported)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <InfoBox color="blue">
            Qwen2-VL 在文档理解 (DocVQA) 和数学视觉推理 (MathVista) 上展现了<strong>超越 SOTA（包括 GPT-4o）</strong>的性能，证明了动态分辨率对细节捕捉的重要性。
          </InfoBox>

          {/* 核心技术总结 */}
          <div className="mt-8 grid md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-200 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">72B</div>
              <div className="text-sm text-gray-600">最大参数量</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-teal-50 p-4 rounded-lg border border-green-200 text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">800B</div>
              <div className="text-sm text-gray-600">训练 Token 数</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">3D</div>
              <div className="text-sm text-gray-600">M-RoPE 位置编码</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-4 rounded-lg border border-orange-200 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-1">2×2</div>
              <div className="text-sm text-gray-600">Token 池化压缩</div>
            </div>
          </div>
        </Section>

        {/* 与 Qwen-VL 对比 */}
        <Section id="comparison" title="与 Qwen-VL 的关键改进" icon={Zap}>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-gray-800">特性</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-800">Qwen-VL</th>
                  <th className="px-4 py-3 text-left font-bold text-indigo-700">Qwen2-VL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium">视觉输入分辨率</td>
                  <td className="px-4 py-3">固定 448×448</td>
                  <td className="px-4 py-3 text-green-600 font-bold">任意分辨率 (动态)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-medium">位置编码</td>
                  <td className="px-4 py-3">2D 绝对位置编码</td>
                  <td className="px-4 py-3 text-green-600 font-bold">M-RoPE (3D 分解)</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium">视觉 Token 数</td>
                  <td className="px-4 py-3">固定 256</td>
                  <td className="px-4 py-3 text-green-600 font-bold">动态（按图像大小）</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-medium">视频理解</td>
                  <td className="px-4 py-3">不支持</td>
                  <td className="px-4 py-3 text-green-600 font-bold">原生支持 (3D 卷积)</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium">VL Adapter</td>
                  <td className="px-4 py-3">Cross-Attention</td>
                  <td className="px-4 py-3 text-green-600 font-bold">2×2 Pooling + 3D Conv</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="mb-2">Generated based on "Qwen2-VL: Enhancing Vision-Language Model's Perception of the World at Any Resolution"</p>
          <p className="text-sm">arXiv:2409.12191v2 [cs.CV]</p>
        </div>
      </footer>
    </div>
  );
};

export default Qwen2VL;

