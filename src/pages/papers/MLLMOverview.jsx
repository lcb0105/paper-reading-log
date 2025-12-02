import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Layers, Cpu, Code, Database, AlertTriangle, Menu, X, FileText, ArrowLeft } from 'lucide-react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- Components ---
const Section = ({ id, title, icon: Icon, children }) => (
  <section id={id} className="mb-12 scroll-mt-24">
    <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-200">
      {Icon && <Icon className="w-8 h-8 text-blue-600" />}
      <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
    </div>
    <div className="text-gray-700 leading-relaxed space-y-4">
      {children}
    </div>
  </section>
);

const Card = ({ title, sub, children }) => (
  <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow">
    <h3 className="text-xl font-bold text-blue-700 mb-2">{title}</h3>
    {sub && <div className="text-sm text-gray-500 mb-3 italic">{sub}</div>}
    <div className="text-gray-600 space-y-2">
      {children}
    </div>
  </div>
);

const TimelineItem = ({ year, title, desc }) => (
  <div className="relative pl-8 pb-8 border-l-2 border-blue-200 last:border-0 last:pb-0">
    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow-sm"></div>
    <div className="font-bold text-blue-600 mb-1">{year}</div>
    <h4 className="font-bold text-gray-800 text-lg mb-2">{title}</h4>
    <p className="text-gray-600">{desc}</p>
  </div>
);

// --- Main Component ---
export default function MLLMOverview() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const navItems = [
    { id: 'abstract', label: '摘要与引言', icon: FileText },
    { id: 'history', label: '发展历程', icon: BookOpen },
    { id: 'technical', label: '关键技术 (公式篇)', icon: Code },
    { id: 'models', label: '核心算法与模型', icon: Layers },
    { id: 'tasks', label: '应用与数据集', icon: Database },
    { id: 'challenges', label: '挑战与未来', icon: AlertTriangle },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-50">
        <Link to="/" className="text-gray-500 hover:text-blue-600">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="font-bold text-lg">多模态大模型综述</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
          {sidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky top-0 h-screen w-64 bg-white border-r border-gray-200 z-40 transform transition-transform duration-300 overflow-y-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        `}>
          <div className="p-6">
            <Link to="/" className="flex items-center text-gray-500 hover:text-blue-600 transition-colors mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="text-sm">返回首页</span>
            </Link>
            <h1 className="text-2xl font-extrabold text-blue-700 leading-tight mb-2">
              MLLMs Survey
            </h1>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-8">
              论文深度解析
            </p>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors group"
                >
                  <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{item.label}</span>
                </a>
              ))}
            </nav>
          </div>
          <div className="p-6 mt-auto border-t border-gray-100">
            <div className="text-xs text-gray-400">
              Based on arXiv:2311.13165v1<br/>
              By Jiayang Wu et al.
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-12 max-w-5xl mx-auto">
          
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 lg:p-12 text-white mb-16 shadow-xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">多模态大语言模型综述</h1>
            <p className="text-xl text-blue-100 leading-relaxed max-w-3xl">
              深度解析图像、文本、音频等多模态数据的融合与处理。
              从 GPT-4 到 LLaVA，探索人工智能如何通过多模态感知理解世界。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">Survey</span>
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">Large Language Models</span>
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">Multimodal</span>
            </div>
          </div>

          {/* Abstract */}
          <Section id="abstract" title="摘要与引言" icon={FileText}>
            <p>
              虽然最新的大语言模型（LLMs）如 GPT-3、BERT 在文本任务上表现出色，但它们通常难以理解和处理其他数据类型（如图像、音频）。
              <strong>多模态模型（Multimodal Models）</strong>通过结合多种模态解决了这一限制，实现了对多样化数据的更全面理解。
            </p>
            <p>
              本综述论文（arXiv:2311.13165v1）系统地定义了多模态概念，梳理了历史发展脉络，介绍了主流科技公司（如 Microsoft, OpenAI, Google）的产品，并提供了详细的技术指南、算法汇总以及数据集资源。
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
              <h4 className="font-bold text-blue-800 mb-2">为什么需要多模态？</h4>
              <p className="text-sm text-blue-800">
                纯文本模型缺乏对视觉信号的感知能力。多模态感知是实现<strong>通用人工智能（AGI）</strong>的基础，对于知识获取和与现实世界交互至关重要。研究表明，原生支持多模态感知能显著提升常识推理能力。
              </p>
            </div>
          </Section>

          {/* History */}
          <Section id="history" title="发展历程" icon={BookOpen}>
            <p className="mb-8">多模态研究主要经历了四个阶段，从早期的单模态处理到如今的大规模预训练模型。</p>
            <div className="ml-4">
              <TimelineItem 
                year="1980 - 2000" 
                title="单模态处理 (Processing Single Modal)" 
                desc="主要依赖基础计算能力。例如面部识别（PCA）、语音识别（HMMs）。" 
              />
              <TimelineItem 
                year="2000 - 2010" 
                title="模态转换 (Modal Data Conversion)" 
                desc="侧重人机交互。AMI 项目（会议记录）、CALO 项目（Siri 前身）、SSP 项目（非语言信号分析）。" 
              />
              <TimelineItem 
                year="2010 - 2020" 
                title="模态融合 (Modal Data Fusion)" 
                desc="深度学习引入。Ngiam 提出多模态深度学习算法，DBMs 用于建模模态间依赖。2016年出现了基于语义注意力的神经图像字幕生成。" 
              />
              <TimelineItem 
                year="2020 - 至今" 
                title="大规模多模态模型 (Large-scale Multimodal)" 
                desc="CLIP 打破固定标签限制；DALL-E 2 生成图像；BEiT-3、KOSMOS-1、PaLM-E 等模型无需任务特定微调即可表现出色。" 
              />
            </div>
          </Section>

          {/* Technical Points - The Formula Section */}
          <Section id="technical" title="关键技术点与数学原理" icon={Code}>
            <p className="mb-6">
              多模态大模型的核心在于如何将不同模态的数据映射到统一的语义空间，并进行有效的融合与学习。以下是论文中涉及的关键技术及其数学表述。
            </p>

            {/* 1. Knowledge Representation */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">1. 知识表示 (Knowledge Representation)</h3>
              <p className="mb-4">
                <strong>文本：</strong> 使用 Word2Vec 或子词（Subword）分词（如 BPE）将文本转化为 Token Embedding。
              </p>
              <p className="mb-4">
                <strong>图像 (Image Tokenization)：</strong> 现代模型（如 ViT）通常使用 Patch-based 方法。给定图像 <InlineMath math="x \in \mathbb{R}^{H \times W \times C}" />，将其分割为 <InlineMath math="N" /> 个 Patch <InlineMath math="x_p" />。
              </p>
              <div className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <p className="text-sm text-gray-500 mb-2 font-mono font-bold">Vision Transformer (ViT) Patch Embedding 公式:</p>
                <BlockMath math="\mathbf{z}_0 = [\mathbf{x}_p^1\mathbf{E}; \mathbf{x}_p^2\mathbf{E}; \cdots; \mathbf{x}_p^N\mathbf{E}] + \mathbf{E}_{pos}" />
                <div className="text-xs text-gray-600 mt-3 space-y-1">
                  <p><strong>详细解释：</strong></p>
                  <ul className="list-disc pl-5">
                    <li><InlineMath math="\mathbf{x}_p^i" />: 第 <InlineMath math="i" /> 个被展平的图像块 (Patch)。</li>
                    <li><InlineMath math="\mathbf{E}" />: 可学习的<strong>线性投影矩阵</strong>。它将每个图像块映射到一个固定的 <InlineMath math="D" /> 维向量空间，类似于文本中的 Word Embedding。</li>
                    <li><InlineMath math="\mathbf{E}_{pos}" />: <strong>位置嵌入 (Position Embeddings)</strong>。因为 Transformer 结构本身不包含处理序列顺序的归纳偏置 (Inductive Bias)，必须显式加入位置信息，模型才能理解图像块之间的空间关系。</li>
                    <li><InlineMath math="\mathbf{z}_0" />: 最终输入到 Transformer Encoder 的序列嵌入。</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2. Model Architecture */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">2. 模型架构基础：Transformer</h3>
              <p className="mb-4">
                无论是文本还是图像，目前主流的基础架构均为 Transformer。其核心是<strong>自注意力机制 (Self-Attention)</strong>。
              </p>
              <div className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <p className="text-sm text-gray-500 mb-2 font-mono font-bold">Scaled Dot-Product Attention:</p>
                <BlockMath math="\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V" />
                <div className="text-xs text-gray-600 mt-3 space-y-1">
                  <p><strong>详细解释：</strong></p>
                  <ul className="list-disc pl-5">
                     <li><InlineMath math="Q, K, V" />: 分别代表 <strong>Query (查询)</strong>, <strong>Key (键)</strong>, <strong>Value (值)</strong> 矩阵。它们由输入向量通过不同的线性变换得到。</li>
                     <li><InlineMath math="QK^T" />: 点积操作计算 Query 和 Key 之间的相似度，即<strong>注意力分数</strong>。</li>
                     <li><InlineMath math="\sqrt{d_k}" />: <strong>缩放因子</strong>。当维度 <InlineMath math="d_k" /> 较大时，点积结果会非常大，导致 Softmax 函数进入梯度极小的区域（梯度消失）。除以 <InlineMath math="\sqrt{d_k}" /> 可以稳定训练。</li>
                     <li><InlineMath math="\text{softmax}" />: 将分数归一化为概率分布，表示对不同信息的关注程度。</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 3. Learning Objectives */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">3. 学习目标 (Learning Objectives)</h3>
              <p className="mb-4">
                多模态预训练通常采用以下几种目标函数的组合：
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-5 border border-gray-200 rounded-lg">
                  <h4 className="font-bold text-blue-700 mb-2">图像-文本对比学习 (ITC)</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    如 CLIP 模型使用。目标是最大化配对样本的互信息。
                  </p>
                  <div className="bg-gray-50 p-2 rounded text-center mb-3 overflow-x-auto">
                    <BlockMath math="\mathcal{L}_{ITC} = -\log \frac{\exp(\langle v_i, t_i \rangle / \tau)}{\sum_{j} \exp(\langle v_i, t_j \rangle / \tau)}" />
                  </div>
                  <div className="text-xs text-gray-500">
                    <ul className="list-disc pl-4 space-y-1">
                      <li><InlineMath math="\langle v_i, t_i \rangle" />: 第 <InlineMath math="i" /> 对图像特征 <InlineMath math="v_i" /> 和文本特征 <InlineMath math="t_i" /> 的余弦相似度。</li>
                      <li><InlineMath math="\tau" />: <strong>温度系数 (Temperature)</strong>，控制 Softmax 分布的平滑程度。</li>
                      <li><strong>分子</strong>: 正样本对（配对数据）的相似度得分。</li>
                      <li><strong>分母</strong>: 正样本与 Batch 内所有负样本（不配对数据）的相似度总和。</li>
                      <li><strong>目标</strong>: 拉近配对数据距离，推开不配对数据。</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-white p-5 border border-gray-200 rounded-lg">
                  <h4 className="font-bold text-blue-700 mb-2">掩码语言建模 (MLM)</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    类似于 BERT，但利用视觉线索恢复文本。
                  </p>
                  <div className="bg-gray-50 p-2 rounded text-center mb-3 overflow-x-auto">
                     <BlockMath math="\mathcal{L}_{MLM} = -\sum \log P(w_m | w_{\setminus m}, v)" />
                  </div>
                  <div className="text-xs text-gray-500">
                    <ul className="list-disc pl-4 space-y-1">
                      <li><InlineMath math="w_m" />: 被 Mask (掩盖) 掉的词 Token。</li>
                      <li><InlineMath math="w_{\setminus m}" />: 未被掩盖的剩余文本上下文。</li>
                      <li><InlineMath math="v" />: 对应的视觉特征 (Visual Features)。</li>
                      <li><strong>目标</strong>: 模型需要综合利用<strong>文本上下文</strong>和<strong>图像信息</strong>来预测缺失的词，从而学习模态间的深层对齐关系。</li>
                    </ul>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                其他常见目标还包括 <strong>MVM (Masked Visual Modeling)</strong> 和 <strong>TM (Image-Text Matching)</strong>。
              </p>
            </div>
            
             {/* 4. Information Fusion */}
             <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">4. 信息融合 (Information Fusion)</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>
                  <strong>Fusion Encoder (融合编码器)</strong>: 使用 Cross-Attention 让模态间进行深层交互（如 ALBEF）。适用于精细推理任务。
                </li>
                <li>
                  <strong>Dual Encoder (双编码器)</strong>: 分别编码图像和文本，最后通过简单点积计算相似度（如 CLIP）。适用于检索任务，速度快。
                </li>
              </ul>
            </div>
          </Section>

          {/* Algorithms */}
          <Section id="models" title="核心算法与模型" icon={Layers}>
            <p className="mb-6 text-gray-600">
              论文将算法分为<strong>基础模型 (Foundation Model)</strong> 和 <strong>大规模预训练模型 (Large-scale Pre-trained Models)</strong>。
            </p>
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-l-4 border-indigo-500 pl-3">基础架构</h3>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Card title="Transformer" sub="2017 - Google">
                颠覆了传统深度学习，引入自注意力机制。权重共享特性使其非常适合多模态任务。
              </Card>
              <Card title="ViT (Vision Transformer)" sub="2020 - Google">
                将图像切分为 Patches 序列，完全替代 CNN。桥接了 CV 和 NLP 的架构鸿沟。
              </Card>
              <Card title="BEiT" sub="2021 - Microsoft">
                CV 界的 BERT。引入了离散视觉嵌入聚合和 MIM (Masked Image Modeling) 进行生成式预训练。
              </Card>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-l-4 border-purple-500 pl-3">大规模多模态模型 (SOTA)</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card title="CLIP" sub="OpenAI (2021)">
                <ul className="list-disc pl-4 text-sm space-y-1">
                  <li><strong>核心思想：</strong> 利用大规模图像-文本对进行对比学习。</li>
                  <li><strong>优势：</strong> 零样本（Zero-shot）分类能力极强，摆脱了固定标签集的限制。</li>
                  <li><strong>应用：</strong> DALL-E 2 的基石。</li>
                </ul>
              </Card>
              <Card title="BLIP-2" sub="Salesforce (2023)">
                <ul className="list-disc pl-4 text-sm space-y-1">
                  <li><strong>核心组件：</strong> Q-Former (Querying Transformer)。</li>
                  <li><strong>机制：</strong> 冻结图像编码器和 LLM，仅训练 Q-Former 作为桥梁。</li>
                  <li><strong>公式逻辑：</strong> 通过一组可学习的 Query 向量从冻结的视觉特征中提取信息。</li>
                </ul>
              </Card>
              <Card title="LLaVA" sub="2023">
                <ul className="list-disc pl-4 text-sm space-y-1">
                  <li><strong>特点：</strong> 视觉指令微调 (Visual Instruction Tuning)。</li>
                  <li><strong>数据：</strong> 使用 GPT-4 生成多轮对话、推理数据。</li>
                  <li><strong>架构：</strong> 连接 CLIP 视觉编码器和 Vicuna 语言模型。</li>
                </ul>
              </Card>
              <Card title="MiniGPT-4" sub="2023">
                <ul className="list-disc pl-4 text-sm space-y-1">
                  <li><strong>复现：</strong> 基于 BLIP-2 和 Vicuna。</li>
                  <li><strong>训练：</strong> 只训练一个线性投影层将视觉特征对齐到 LLM 文本空间。</li>
                  <li><strong>能力：</strong> 能够识别图像中的幽默元素，甚至根据草图编写网站代码。</li>
                </ul>
              </Card>
              <Card title="Visual ChatGPT" sub="Microsoft (2023)">
                <ul className="list-disc pl-4 text-sm space-y-1">
                  <li><strong>Prompt Manager：</strong> 管理 ChatGPT 与多个视觉基础模型（VFM）的交互。</li>
                  <li><strong>多步推理：</strong> 允许用户通过文本发送复杂的视觉指令（如"把图中的猫换成狗"）。</li>
                </ul>
              </Card>
            </div>
          </Section>

          {/* Tasks & Datasets */}
          <Section id="tasks" title="应用与数据集" icon={Database}>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-xl text-gray-800 mb-4">主要应用任务</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-600 bg-blue-50 px-2 rounded">Image Captioning</span>
                    <span className="text-gray-600">为图像生成描述，辅助视障人士。</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-600 bg-blue-50 px-2 rounded">Text-to-Image</span>
                    <span className="text-gray-600">如 DALL-E 2，根据文本提示生成艺术画作。</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-600 bg-blue-50 px-2 rounded">VQA</span>
                    <span className="text-gray-600">视觉问答，不仅需要识别物体，还需逻辑推理。</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-600 bg-blue-50 px-2 rounded">Emotion Rec</span>
                    <span className="text-gray-600">多模态情感计算（音频+面部表情+生理信号）。</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-xl text-gray-800 mb-4">常用数据集</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm text-left text-gray-600 bg-white border rounded-lg">
                    <thead className="bg-gray-100 text-gray-700 font-bold uppercase">
                      <tr>
                        <th className="px-4 py-2">名称</th>
                        <th className="px-4 py-2">模态</th>
                        <th className="px-4 py-2">规模</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-2">COCO</td>
                        <td className="px-4 py-2">Image-Text</td>
                        <td className="px-4 py-2">567K</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">Visual Genome</td>
                        <td className="px-4 py-2">Image-Text</td>
                        <td className="px-4 py-2">5.4M</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">WebVid-2M</td>
                        <td className="px-4 py-2">Video-Text</td>
                        <td className="px-4 py-2">2.5M</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">MSR-VTT</td>
                        <td className="px-4 py-2">Video/Audio</td>
                        <td className="px-4 py-2">10K</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Section>

          {/* Challenges */}
          <Section id="challenges" title="挑战与未来方向" icon={AlertTriangle}>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-amber-50 border border-amber-200 p-5 rounded-lg">
                <h4 className="font-bold text-amber-800 mb-2">1. 模态扩展 (Modalities Expansion)</h4>
                <p className="text-sm text-amber-900">
                  目前的模型主要集中在图文。未来需要扩展到更多异构数据，如触觉、嗅觉、EEG脑电波、CT/MRI医疗影像等，以实现更精准的感知。
                </p>
              </div>
              <div className="bg-amber-50 border border-amber-200 p-5 rounded-lg">
                <h4 className="font-bold text-amber-800 mb-2">2. 灾难性遗忘 (Catastrophic Forgetting)</h4>
                <p className="text-sm text-amber-900">
                  当大语言模型针对特定模态微调时，可能会丧失原有的语言能力。解决方案包括冻结 LLM 参数（如 BLIP-2）或使用更大的骨干网络。
                </p>
              </div>
              <div className="bg-amber-50 border border-amber-200 p-5 rounded-lg">
                <h4 className="font-bold text-amber-800 mb-2">3. 训练成本与效率</h4>
                <p className="text-sm text-amber-900">
                  多模态训练计算量巨大。如何通过动态路由（Dynamic Routing）、权重共享等技术加速训练是关键挑战。
                </p>
              </div>
              <div className="bg-amber-50 border border-amber-200 p-5 rounded-lg">
                <h4 className="font-bold text-amber-800 mb-2">4. 迈向通用人工智能 (Towards AGI)</h4>
                <p className="text-sm text-amber-900">
                  需要解决多模态对齐、协同学习（Co-learning）以及终身学习（Lifelong Learning）的问题，让模型像人类一样从经验中持续学习。
                </p>
              </div>
            </div>
          </Section>

          {/* Footer */}
          <footer className="text-center text-gray-400 py-12 border-t mt-12">
            <p>基于 arXiv:2311.13165v1 论文制作 © 2023</p>
          </footer>
        </main>
      </div>
    </div>
  );
}
