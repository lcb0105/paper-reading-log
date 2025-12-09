import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  Cpu, 
  Database,
  Layers,
  Target,
  Sparkles,
  BarChart3,
  Zap,
  GitBranch,
  Box,
  Brain
} from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

const Section = ({ id, title, icon: Icon, children, className = "", dark = false }) => (
  <section id={id} className={`scroll-mt-24 mb-8 ${dark ? 'bg-slate-800 text-white' : 'bg-white'} p-6 rounded-xl border ${dark ? 'border-slate-700' : 'border-slate-200'} shadow-sm ${className}`}>
    <div className="flex items-center gap-3 mb-6 border-b pb-3 border-slate-200">
      <div className={`p-2 rounded-lg ${dark ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'}`}>
        <Icon size={24} />
      </div>
      <h2 className={`text-2xl font-bold ${dark ? 'text-white' : 'text-blue-900'}`}>{title}</h2>
    </div>
    {children}
  </section>
);

const MathBlock = ({ children, label }) => (
  <div className="overflow-x-auto p-4 bg-white rounded-lg border-l-4 border-blue-500 shadow-sm my-4">
    {label && <p className="text-xs text-slate-500 mb-2 font-mono uppercase tracking-widest">{label}</p>}
    <BlockMath math={children} />
  </div>
);

const BLIP2 = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-slate-500 hover:text-blue-600 transition-colors">
                <ArrowLeft size={20} />
              </Link>
              <div className="w-px h-6 bg-slate-200"></div>
              <span className="text-xl font-bold tracking-tight flex items-center gap-2">
                <span className="text-blue-600">BLIP-2</span> 论文精读
              </span>
            </div>
            <div className="hidden md:flex space-x-2 text-sm font-medium text-slate-600">
              <a href="#abstract" className="hover:text-blue-600 transition">摘要</a>
              <a href="#data" className="hover:text-blue-600 transition">数据集</a>
              <a href="#qformer" className="hover:text-blue-600 transition">Q-Former</a>
              <a href="#attention-mask" className="hover:text-blue-600 transition">Attention Mask</a>
              <a href="#stage1" className="hover:text-blue-600 transition">第一阶段</a>
              <a href="#stage2" className="hover:text-blue-600 transition">第二阶段</a>
              <a href="#emerging" className="hover:text-blue-600 transition">涌现能力</a>
              <a href="#results" className="hover:text-blue-600 transition">实验结果</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-200 uppercase bg-blue-800/50 rounded-full">
            Salesforce Research · CVPR 2023 · arXiv:2301.12597
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            BLIP-2: 利用冻结图像编码器和大型语言模型的引导式语言-图像预训练
          </h1>
          <p className="text-lg md:text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed italic">
            Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Language Models
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12 space-y-8">

        {/* Abstract */}
        <Section id="abstract" title="核心摘要" icon={BookOpen}>
          <p className="text-slate-700 mb-4">
            视觉-语言预训练（VLP）的成本日益高昂。BLIP-2 提出了一种通用且高效的预训练策略，通过引导（bootstrapping）现成的<strong>冻结（frozen）</strong>图像编码器和大型语言模型（LLM）来解决这一问题。
          </p>
          
          <div className="bg-sky-50 border-l-4 border-sky-500 p-4 rounded-r-lg">
            <h3 className="font-bold text-sky-800 mb-3">BLIP-2 的核心贡献：</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-sky-600 mt-1">•</span>
                <span>提出了 <strong>Q-Former (Querying Transformer)</strong>，一个轻量级的 Transformer，用于填补视觉和语言模态之间的鸿沟。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-600 mt-1">•</span>
                <span>采用了<strong>两阶段预训练</strong>策略：
                  <ol className="ml-6 mt-1 space-y-1">
                    <li>1. <strong>第一阶段</strong>：基于冻结图像编码器的视觉-语言表征学习。</li>
                    <li>2. <strong>第二阶段</strong>：基于冻结 LLM 的视觉到语言生成学习。</li>
                  </ol>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-600 mt-1">•</span>
                <span>在参数量远少于现有方法（如 Flamingo80B）的情况下，取得了 SOTA 性能。</span>
              </li>
            </ul>
          </div>
        </Section>

        {/* Introduction */}
        <Section id="intro" title="介绍与动机" icon={Zap}>
          <p className="text-slate-700 mb-4">
            现有的 SOTA 视觉-语言模型通常需要进行端到端的大规模训练，计算成本极高。同时，单一模态（纯视觉、纯语言）的模型已经非常强大。BLIP-2 的目标是<strong>不仅利用现有的视觉模型，还要利用强大的 LLM（具有 Zero-shot 能力）</strong>，并且在预训练过程中保持它们<strong>参数冻结</strong>，以减少计算量并避免灾难性遗忘。
          </p>
          
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
            <h4 className="font-bold text-amber-800 mb-2">🔑 挑战</h4>
            <p className="text-sm text-amber-700">
              冻结的 LLM 在其单模态训练中未见过图像，直接将视觉特征输入 LLM 效果不佳。需要一个"桥梁"来对齐视觉特征和文本空间。
            </p>
          </div>
        </Section>

        {/* Pre-training Data - 新增 */}
        <Section id="data" title="预训练数据集" icon={Database}>
          <p className="text-slate-700 mb-4">
            BLIP-2 的第一阶段预训练使用了与 BLIP 相同的数据集，共计约 <strong>129M</strong> 张图像：
          </p>
          
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-800">数据集</th>
                  <th className="px-4 py-3 text-center font-bold text-slate-800">图像数量</th>
                  <th className="px-4 py-3 text-left font-bold text-slate-800">类型</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="bg-green-50">
                  <td className="px-4 py-3 font-semibold text-green-800">COCO</td>
                  <td className="px-4 py-3 text-center">113K</td>
                  <td className="px-4 py-3 text-slate-600">人工标注</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="px-4 py-3 font-semibold text-green-800">Visual Genome</td>
                  <td className="px-4 py-3 text-center">100K</td>
                  <td className="px-4 py-3 text-slate-600">人工标注</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-slate-800">CC3M</td>
                  <td className="px-4 py-3 text-center">3M</td>
                  <td className="px-4 py-3 text-slate-600">网络爬取</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-slate-800">CC12M</td>
                  <td className="px-4 py-3 text-center">12M</td>
                  <td className="px-4 py-3 text-slate-600">网络爬取</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-slate-800">SBU</td>
                  <td className="px-4 py-3 text-center">1M</td>
                  <td className="px-4 py-3 text-slate-600">网络爬取</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="px-4 py-3 font-semibold text-blue-800">LAION-400M (子集)</td>
                  <td className="px-4 py-3 text-center font-bold">115M</td>
                  <td className="px-4 py-3 text-slate-600">大规模网络数据</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-amber-50 p-4 rounded-xl border-l-4 border-amber-500">
            <h4 className="font-bold text-amber-800 mb-2">💡 CapFilt 数据增强</h4>
            <p className="text-sm text-amber-700">
              与 BLIP 一样，BLIP-2 使用 CapFilt 方法对网络爬取的数据进行清洗和扩充，生成高质量的合成描述并过滤噪声文本。
            </p>
          </div>
        </Section>

        {/* Q-Former Architecture */}
        <Section id="qformer" title="模型架构：Q-Former" icon={Cpu}>
          <p className="text-slate-700 mb-4">
            <strong>Q-Former (Querying Transformer)</strong> 是 BLIP-2 的核心组件。它是一个轻量级的 Transformer，包含两部分子模块，共享自注意力层（Self-Attention）：
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-violet-50 p-4 rounded-lg border border-violet-200">
              <h4 className="font-bold text-violet-900 mb-2">图像 Transformer</h4>
              <p className="text-sm text-violet-800">与冻结的图像编码器交互，提取视觉特征。通过 Cross-Attention 层查询图像编码器的输出。</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
              <h4 className="font-bold text-indigo-900 mb-2">文本 Transformer</h4>
              <p className="text-sm text-indigo-800">既可以作为文本编码器，也可以作为文本解码器。与图像 Transformer 共享 Self-Attention 层。</p>
            </div>
          </div>

          {/* Q-Former 架构细节 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Q-Former 架构细节</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-slate-700 mb-2">初始化</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• 基于 <strong>BERT-base</strong> 的权重初始化</li>
                  <li>• 总参数量：<strong>188M</strong></li>
                  <li>• 隐藏维度：<strong>768</strong></li>
                  <li>• 12 层 Transformer</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-700 mb-2">Cross-Attention 层</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• 在每个 Transformer 块中插入</li>
                  <li>• 位置：Self-Attention 和 FFN 之间</li>
                  <li>• <strong>随机初始化</strong>（非 BERT 权重）</li>
                  <li>• 仅 Query 可以通过 CA 看到图像</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 图像编码器选择 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">图像编码器选择</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-violet-50 p-4 rounded-lg border border-violet-200">
                <h4 className="font-bold text-violet-900 mb-2">ViT-L/14 (CLIP)</h4>
                <ul className="text-sm text-violet-800 space-y-1">
                  <li>• 来自 OpenAI CLIP</li>
                  <li>• 输入分辨率：224×224</li>
                  <li>• 输出特征：257 × 1024</li>
                  <li>• 预训练：图文对比学习</li>
                </ul>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                <h4 className="font-bold text-indigo-900 mb-2">ViT-g/14 (EVA-CLIP)</h4>
                <ul className="text-sm text-indigo-800 space-y-1">
                  <li>• 来自 EVA-CLIP（更强）</li>
                  <li>• 输入分辨率：224×224</li>
                  <li>• 输出特征：257 × 1408</li>
                  <li>• <strong>1B 参数</strong></li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-4">
              <strong>注意：</strong> 移除了 ViT 最后一层，使用倒数第二层的输出作为图像特征。论文发现这样可以提供更好的视觉表征。
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
              <Box size={18} className="text-blue-600" /> Learnable Queries (可学习查询)
            </h3>
            <p className="text-slate-700 mb-3">
              Q-Former 引入了一组可学习的 Query 向量（Learnable Queries）。这些 Query 通过 Cross-Attention 层与图像编码器的输出进行交互。
            </p>
            
            <MathBlock>
              {String.raw`\mathbf{Z} \in \mathbb{R}^{N \times D}`}
            </MathBlock>
            
            <p className="text-sm text-slate-600">
              其中 <InlineMath math="N" /> 是 Query 的数量（通常为 <strong>32</strong>），<InlineMath math="D" /> 是维度（<strong>768</strong>）。这组 Query 起到了<strong>信息瓶颈 (Information Bottleneck)</strong> 的作用，迫使模型从庞大的图像特征中仅提取与文本最相关的信息。
            </p>
            
            <div className="bg-blue-50 p-4 rounded-lg mt-4 border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-800 mb-2">为什么是 32 个 Query？</h4>
              <p className="text-sm text-blue-700">
                32 个 Query 输出的特征维度远小于图像编码器的输出（如 257 × 1408），形成<strong>信息瓶颈</strong>。这迫使模型只提取对文本生成最重要的视觉信息，同时大幅减少了输入到 LLM 的 token 数量（从 257 减少到 32），显著降低了计算成本。
              </p>
            </div>
          </div>
        </Section>

        {/* Attention Masking 策略 - 新增 */}
        <Section id="attention-mask" title="三种 Attention Masking 策略" icon={Layers}>
          <p className="text-slate-700 mb-6">
            Q-Former 的关键设计是通过<strong>不同的 Attention Mask</strong> 控制 Query 和 Text 之间的交互方式，从而实现不同的预训练目标。
          </p>
          
          <div className="space-y-6">
            {/* Uni-modal Mask */}
            <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-200">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-indigo-600 text-white text-sm font-bold px-3 py-1 rounded">ITC</span>
                <h4 className="font-bold text-indigo-900">Uni-modal Self-Attention Mask</h4>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-indigo-800 mb-2">
                    <strong>特点：</strong> Query 和 Text <strong>互不可见</strong>
                  </p>
                  <ul className="text-sm text-indigo-700 space-y-1">
                    <li>• Query 只能看到其他 Query</li>
                    <li>• Text 只能看到其他 Text</li>
                    <li>• 防止信息泄露</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded-lg border text-xs font-mono">
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-indigo-100 p-2 rounded">Query ↔ Query ✓</div>
                    <div className="bg-red-100 p-2 rounded">Query ↔ Text ✗</div>
                    <div className="bg-red-100 p-2 rounded">Text ↔ Query ✗</div>
                    <div className="bg-indigo-100 p-2 rounded">Text ↔ Text ✓</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Causal Mask */}
            <div className="bg-green-50 p-5 rounded-xl border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-green-600 text-white text-sm font-bold px-3 py-1 rounded">ITG</span>
                <h4 className="font-bold text-green-900">Multi-modal Causal Self-Attention Mask</h4>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-green-800 mb-2">
                    <strong>特点：</strong> Text 可以看到 Query，但<strong>因果遮蔽</strong>未来 Text
                  </p>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Query 可以相互看到</li>
                    <li>• Text 可以看到所有 Query</li>
                    <li>• Text 只能看到之前的 Text（因果）</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded-lg border text-xs font-mono">
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-green-100 p-2 rounded">Query ↔ Query ✓</div>
                    <div className="bg-red-100 p-2 rounded">Query → Text ✗</div>
                    <div className="bg-green-100 p-2 rounded">Text → Query ✓</div>
                    <div className="bg-yellow-100 p-2 rounded">Text → Text (因果)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bi-directional Mask */}
            <div className="bg-pink-50 p-5 rounded-xl border border-pink-200">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-pink-600 text-white text-sm font-bold px-3 py-1 rounded">ITM</span>
                <h4 className="font-bold text-pink-900">Bi-directional Self-Attention Mask</h4>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-pink-800 mb-2">
                    <strong>特点：</strong> Query 和 Text <strong>完全互通</strong>
                  </p>
                  <ul className="text-sm text-pink-700 space-y-1">
                    <li>• 所有 token 都能相互看到</li>
                    <li>• 实现深度的图文融合</li>
                    <li>• 用于细粒度匹配判断</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded-lg border text-xs font-mono">
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-pink-100 p-2 rounded">Query ↔ Query ✓</div>
                    <div className="bg-pink-100 p-2 rounded">Query ↔ Text ✓</div>
                    <div className="bg-pink-100 p-2 rounded">Text ↔ Query ✓</div>
                    <div className="bg-pink-100 p-2 rounded">Text ↔ Text ✓</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Stage 1 */}
        <Section id="stage1" title="第一阶段：视觉-语言表征学习" icon={GitBranch}>
          <p className="text-slate-700 mb-6">
            在这一阶段，Q-Former 连接到冻结的图像编码器。目标是训练 Query 提取包含文本信息的视觉表征。使用了<strong>三个联合优化的目标函数</strong>。
          </p>

          {/* ITC */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-indigo-600 text-white text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center">1</span>
              <h3 className="text-xl font-bold text-indigo-700">图像-文本对比学习 (ITC)</h3>
            </div>
            
            <p className="text-slate-700 mb-2">
              <strong>目的：</strong> 对齐图像表征和文本表征，最大化它们的互信息。
            </p>
            <p className="text-slate-700 mb-3">
              <strong>机制：</strong> 对于每个 Query 输出 <InlineMath math="z_i" /> 和文本特征 <InlineMath math="t" />（[CLS] token），计算相似度。由于有多个 Query，选择与文本相似度最高的一个作为图像-文本相似度。
            </p>
            
            <MathBlock label="相似度计算">
              {String.raw`s(I, T) = \max_{k \in \{1...K\}} (z_k^\top t)`}
            </MathBlock>
            
            <MathBlock label="ITC 损失函数">
              {String.raw`\mathcal{L}_{ITC} = -\frac{1}{2} \left( \log \frac{\exp(s(I, T) / \tau)}{\sum_{T' \in \mathcal{B}} \exp(s(I, T') / \tau)} + \log \frac{\exp(s(T, I) / \tau)}{\sum_{I' \in \mathcal{B}} \exp(s(T, I') / \tau)} \right)`}
            </MathBlock>
            
            <div className="bg-slate-50 p-4 rounded-lg mt-4">
              <h4 className="font-semibold text-slate-800 mb-2">符号说明：</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• <InlineMath math="z_k" />: 第 <InlineMath math="k" /> 个 Query 的输出视觉特征</li>
                <li>• <InlineMath math="t" />: 文本的 [CLS] 嵌入</li>
                <li>• <InlineMath math="\tau" />: 温度系数 (temperature parameter)</li>
                <li>• <InlineMath math="\mathcal{B}" />: 当前 Batch 中的样本集合（使用 In-batch negatives）</li>
                <li>• <strong>Attention Mask</strong>: <code className="bg-slate-200 px-1.5 py-0.5 rounded text-indigo-600 text-xs">Uni-modal Mask</code>，Query 和 Text 互不可见，防止信息泄露</li>
              </ul>
            </div>
          </div>

          {/* ITG */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-green-600 text-white text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center">2</span>
              <h3 className="text-xl font-bold text-green-700">基于图像的文本生成 (ITG)</h3>
            </div>
            
            <p className="text-slate-700 mb-2">
              <strong>目的：</strong> 训练 Q-Former 在给定图像条件下生成文本的能力。这迫使 Query 必须捕获用于生成文本的所有视觉细节。
            </p>
            <p className="text-slate-700 mb-3">
              <strong>机制：</strong> 这是一个典型的语言建模任务（Language Modeling）。
            </p>
            
            <MathBlock label="ITG 损失函数">
              {String.raw`\mathcal{L}_{ITG} = - \sum_{i=1}^{L} \log P(y_i | y_{\lt i}, \mathbf{Z})`}
            </MathBlock>
            
            <div className="bg-slate-50 p-4 rounded-lg mt-4">
              <h4 className="font-semibold text-slate-800 mb-2">符号说明：</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• <InlineMath math="y" />: 文本序列，<InlineMath math="L" /> 为长度</li>
                <li>• <InlineMath math="y_{\lt i}" />: 表示 <InlineMath math="i" /> 之前的文本 Token 序列</li>
                <li>• <InlineMath math="\mathbf{Z}" />: Query 输出的视觉特征集合</li>
                <li>• <strong>Attention Mask</strong>: <code className="bg-slate-200 px-1.5 py-0.5 rounded text-green-600 text-xs">Multi-modal Causal Mask</code>
                  <ul className="ml-4 mt-1">
                    <li>- Query 可以相互看到（Self-attention）</li>
                    <li>- Text token 可以看到所有的 Query 和之前的 Text token，但不能看到未来的 Text token</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          {/* ITM */}
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-pink-600 text-white text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center">3</span>
              <h3 className="text-xl font-bold text-pink-800">图像-文本匹配 (ITM) 深度解析</h3>
            </div>
            
            <p className="text-slate-700 mb-4">
              <strong>任务定义：</strong> 这是一个<strong>二分类任务</strong>。模型需要判断给定的图像 <InlineMath math="I" /> 和文本 <InlineMath math="T" /> 是否匹配（匹配为 1，不匹配为 0）。
            </p>
            
            <MathBlock label="ITM 损失函数">
              {String.raw`\mathcal{L}_{ITM} = \text{CrossEntropy}(\underbrace{\text{mean}(\phi(\mathbf{Z}))}_{\text{预测 Logits}}, \underbrace{y_{label}}_{\text{真实标签}})`}
            </MathBlock>
            
            <div className="space-y-4 mt-6">
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-semibold text-slate-800 mb-2">1. 输入特征 <InlineMath math="\mathbf{Z}" /></h4>
                <p className="text-sm text-slate-600">
                  <InlineMath math="\mathbf{Z} = \{z_1, z_2, ..., z_N\}" /> 是 Q-Former 输出的 <InlineMath math="N" /> 个 Query 嵌入向量。此时，使用了 <strong>Bi-directional Attention Mask（双向注意力）</strong>，意味着每个 <InlineMath math="z_i" /> 都能看到所有的文本 token。因此，这里的 <InlineMath math="\mathbf{Z}" /> 已经深度融合了图像和文本的特征。
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-semibold text-slate-800 mb-2">2. 线性分类 <InlineMath math="\phi(\cdot)" /></h4>
                <p className="text-sm text-slate-600">
                  <InlineMath math="\phi" /> 是一个线性层（Linear Layer），它将每个 768 维的 Query 向量映射到 2 维的 logits（分别对应匹配和不匹配的得分）。
                  <br />
                  <InlineMath math="\phi(z_i) \in \mathbb{R}^2" />
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-semibold text-slate-800 mb-2">3. 聚合策略 mean</h4>
                <p className="text-sm text-slate-600 mb-2">
                  我们有 <InlineMath math="N" /> 个 Query，也就有 <InlineMath math="N" /> 个预测结果。BLIP-2 并没有只取某一个 Query 的结果，而是将所有 Query 的 logits <strong>取平均值</strong>。
                </p>
                <MathBlock>
                  {String.raw`\text{score} = \frac{1}{N} \sum_{i=1}^{N} \phi(z_i)`}
                </MathBlock>
                <p className="text-sm text-slate-600">
                  这样做可以让所有的 Query 共同投票，增加预测的鲁棒性。
                </p>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 mt-4">
              <h4 className="font-bold text-yellow-800 mb-2">关键技术：Hard Negative Mining（困难负样本挖掘）</h4>
              <p className="text-sm text-yellow-700">
                如果只使用随机采样的负样本（不匹配的图文对），任务会过于简单。BLIP-2 借鉴了 ALBEF 的策略，选择那些<strong>在该模型下对比相似度较高</strong>的负样本（即模型认为很像但实际不匹配的样本）进行训练，从而迫使模型学习更细微的差异。
              </p>
            </div>
          </div>
        </Section>

        {/* Stage 2 */}
        <Section id="stage2" title="第二阶段：视觉到语言生成学习" icon={Brain}>
          <p className="text-slate-700 mb-6">
            在这一阶段，Q-Former（包含已训练好的 Query）连接到冻结的 <strong>LLM</strong>。目标是让 Q-Former 的输出能够被 LLM "理解"，从而实现视觉到语言的生成。
          </p>
          
          {/* 连接方式详解 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">连接架构</h3>
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold text-slate-700 mb-2">1. 全连接投影层</h4>
                <p className="text-sm text-slate-600">
                  将 Q-Former 输出的 32 个 Query 向量（768 维）投影到 LLM 的输入嵌入空间：
                </p>
                <MathBlock>
                  {String.raw`\mathbf{H} = \text{FC}(\mathbf{Z}) \in \mathbb{R}^{32 \times d_{LLM}}`}
                </MathBlock>
                <p className="text-xs text-slate-500 mt-2">
                  其中 <InlineMath math="d_{LLM}" /> 是 LLM 的隐藏维度（如 OPT-2.7B 为 2560，Flan-T5-XL 为 2048）
                </p>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold text-slate-700 mb-2">2. Soft Visual Prompts</h4>
                <p className="text-sm text-slate-600">
                  投影后的向量作为 <strong>Soft Visual Prompts</strong> 拼接到文本 token 嵌入的前面：
                </p>
                <div className="bg-white p-3 rounded border mt-2 font-mono text-xs text-center">
                  [Visual Prompt (32 tokens)] + [Text Embeddings] → LLM
                </div>
              </div>
            </div>
          </div>

          {/* 两种 LLM 类型 */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-orange-50 p-5 rounded-xl border border-orange-200">
              <h4 className="font-bold text-orange-800 mb-3">Decoder-only LLM (OPT)</h4>
              <p className="text-sm text-orange-700 mb-3">
                使用标准的<strong>语言建模损失</strong>（LM Loss）：
              </p>
              <MathBlock>
                {String.raw`\mathcal{L}_{LM} = -\sum_{i=1}^{L} \log P(y_i | \mathbf{H}, y_{\lt i})`}
              </MathBlock>
              <ul className="text-xs text-orange-600 space-y-1 mt-3">
                <li>• OPT-2.7B, OPT-6.7B</li>
                <li>• 自回归生成文本</li>
                <li>• 适合开放式生成任务</li>
              </ul>
            </div>
            
            <div className="bg-teal-50 p-5 rounded-xl border border-teal-200">
              <h4 className="font-bold text-teal-800 mb-3">Encoder-Decoder LLM (Flan-T5)</h4>
              <p className="text-sm text-teal-700 mb-3">
                使用<strong>前缀语言建模损失</strong>（Prefix LM Loss）：
              </p>
              <MathBlock>
                {String.raw`\mathcal{L}_{PrefixLM} = -\sum_{i=1}^{L} \log P(y_i | \mathbf{H}, x, y_{\lt i})`}
              </MathBlock>
              <ul className="text-xs text-teal-600 space-y-1 mt-3">
                <li>• Flan-T5-XL, Flan-T5-XXL</li>
                <li>• 经过指令微调</li>
                <li>• 更好的 Zero-shot 能力</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 p-5 rounded-xl border-l-4 border-blue-500">
            <h4 className="font-bold text-blue-800 mb-2">💡 为什么选择 Flan-T5？</h4>
            <p className="text-sm text-blue-700">
              Flan-T5 经过了<strong>指令微调（Instruction Tuning）</strong>，具有更强的 Zero-shot 泛化能力和遵循指令的能力。论文发现，使用 Flan-T5 作为 LLM 能够实现更好的 Zero-shot VQA 性能，并且能够遵循复杂的自然语言指令进行图像描述。
            </p>
          </div>
        </Section>

        {/* Zero-shot 涌现能力 - 新增 */}
        <Section id="emerging" title="Zero-shot 涌现能力" icon={Sparkles}>
          <p className="text-slate-700 mb-6">
            得益于 LLM 的强大推理能力和 Q-Former 的有效视觉-语言对齐，BLIP-2 展现出多种<strong>涌现能力（Emerging Capabilities）</strong>：
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-purple-800 mb-3">🧠 视觉知识推理</h4>
              <div className="bg-slate-50 p-3 rounded-lg text-sm">
                <p className="text-slate-600 mb-2"><strong>问：</strong> 这张图片中的动物是什么？它通常生活在哪里？</p>
                <p className="text-purple-700"><strong>答：</strong> 这是一只北极熊，通常生活在北极地区...</p>
              </div>
              <p className="text-xs text-slate-500 mt-2">结合视觉理解和世界知识进行推理</p>
            </div>
            
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-green-800 mb-3">💬 视觉对话</h4>
              <div className="bg-slate-50 p-3 rounded-lg text-sm">
                <p className="text-slate-600 mb-1"><strong>用户：</strong> 图片里有什么？</p>
                <p className="text-green-700 mb-1"><strong>BLIP-2：</strong> 一只猫坐在窗台上</p>
                <p className="text-slate-600 mb-1"><strong>用户：</strong> 它在做什么？</p>
                <p className="text-green-700"><strong>BLIP-2：</strong> 它正在看窗外...</p>
              </div>
              <p className="text-xs text-slate-500 mt-2">支持多轮对话的视觉理解</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
            <h4 className="font-bold text-purple-900 mb-4">📝 遵循自然语言指令的图像描述生成</h4>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-slate-600 mb-2"><strong>Prompt：</strong> "Describe this image in detail."</p>
                <p className="text-sm text-purple-700">→ 生成详细的图像描述</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-slate-600 mb-2"><strong>Prompt：</strong> "What is unusual about this image?"</p>
                <p className="text-sm text-purple-700">→ 分析图像中不寻常的元素</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-slate-600 mb-2"><strong>Prompt：</strong> "Write a short story based on this image."</p>
                <p className="text-sm text-purple-700">→ 基于图像创作故事</p>
              </div>
            </div>
          </div>
        </Section>

        {/* Results */}
        <Section id="results" title="实验结果" icon={BarChart3}>
          {/* VQA 结果 */}
          <h3 className="text-lg font-bold text-slate-800 mb-4">视觉问答 (VQA) - Zero-shot</h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-800">模型</th>
                  <th className="px-4 py-3 text-center font-bold text-slate-800">可训练参数</th>
                  <th className="px-4 py-3 text-center font-bold text-slate-800">VQAv2</th>
                  <th className="px-4 py-3 text-center font-bold text-slate-800">GQA</th>
                  <th className="px-4 py-3 text-center font-bold text-slate-800">OK-VQA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium text-slate-900">Flamingo-9B</td>
                  <td className="px-4 py-3 text-center text-slate-600">1.6B</td>
                  <td className="px-4 py-3 text-center text-slate-600">51.8</td>
                  <td className="px-4 py-3 text-center text-slate-600">-</td>
                  <td className="px-4 py-3 text-center text-slate-600">44.7</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium text-slate-900">Flamingo-80B</td>
                  <td className="px-4 py-3 text-center text-slate-600">10.2B</td>
                  <td className="px-4 py-3 text-center text-slate-600">56.3</td>
                  <td className="px-4 py-3 text-center text-slate-600">-</td>
                  <td className="px-4 py-3 text-center text-slate-600">50.6</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="px-4 py-3 font-semibold text-blue-900">BLIP-2 (ViT-L + OPT-6.7B)</td>
                  <td className="px-4 py-3 text-center text-blue-700">188M</td>
                  <td className="px-4 py-3 text-center text-blue-700">52.6</td>
                  <td className="px-4 py-3 text-center text-blue-700">36.4</td>
                  <td className="px-4 py-3 text-center text-blue-700">36.4</td>
                </tr>
                <tr className="bg-green-50 font-semibold">
                  <td className="px-4 py-3 text-green-900">BLIP-2 (ViT-g + FlanT5-XXL)</td>
                  <td className="px-4 py-3 text-center text-green-700">188M</td>
                  <td className="px-4 py-3 text-center text-green-600 font-bold">65.0</td>
                  <td className="px-4 py-3 text-center text-green-600 font-bold">44.7</td>
                  <td className="px-4 py-3 text-center text-green-600 font-bold">45.9</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Image Captioning */}
          <h3 className="text-lg font-bold text-slate-800 mb-4 mt-8">图像描述生成 (Image Captioning)</h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-800">模型</th>
                  <th className="px-4 py-3 text-center font-bold text-slate-800" colSpan="2">COCO (Karpathy test)</th>
                  <th className="px-4 py-3 text-center font-bold text-slate-800" colSpan="2">NoCaps (val)</th>
                </tr>
                <tr className="bg-slate-50">
                  <th className="px-4 py-2"></th>
                  <th className="px-4 py-2 text-center text-xs text-slate-600">Zero-shot</th>
                  <th className="px-4 py-2 text-center text-xs text-slate-600">Fine-tuned</th>
                  <th className="px-4 py-2 text-center text-xs text-slate-600">Zero-shot</th>
                  <th className="px-4 py-2 text-center text-xs text-slate-600">Fine-tuned</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium text-slate-900">Flamingo-80B</td>
                  <td className="px-4 py-3 text-center text-slate-600">84.3</td>
                  <td className="px-4 py-3 text-center text-slate-600">-</td>
                  <td className="px-4 py-3 text-center text-slate-600">-</td>
                  <td className="px-4 py-3 text-center text-slate-600">-</td>
                </tr>
                <tr className="bg-green-50 font-semibold">
                  <td className="px-4 py-3 text-green-900">BLIP-2 (ViT-g + FlanT5-XXL)</td>
                  <td className="px-4 py-3 text-center text-green-600 font-bold">107.5</td>
                  <td className="px-4 py-3 text-center text-green-600 font-bold">145.8</td>
                  <td className="px-4 py-3 text-center text-green-600 font-bold">121.6</td>
                  <td className="px-4 py-3 text-center text-green-600 font-bold">124.8</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Image-Text Retrieval */}
          <h3 className="text-lg font-bold text-slate-800 mb-4 mt-8">图文检索 (Image-Text Retrieval)</h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-800">模型</th>
                  <th className="px-4 py-3 text-center font-bold text-slate-800" colSpan="2">COCO (5K test)</th>
                  <th className="px-4 py-3 text-center font-bold text-slate-800" colSpan="2">Flickr30K</th>
                </tr>
                <tr className="bg-slate-50">
                  <th className="px-4 py-2"></th>
                  <th className="px-4 py-2 text-center text-xs text-slate-600">TR@1</th>
                  <th className="px-4 py-2 text-center text-xs text-slate-600">IR@1</th>
                  <th className="px-4 py-2 text-center text-xs text-slate-600">TR@1</th>
                  <th className="px-4 py-2 text-center text-xs text-slate-600">IR@1</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium text-slate-900">BLIP</td>
                  <td className="px-4 py-3 text-center text-slate-600">82.4</td>
                  <td className="px-4 py-3 text-center text-slate-600">65.1</td>
                  <td className="px-4 py-3 text-center text-slate-600">97.4</td>
                  <td className="px-4 py-3 text-center text-slate-600">87.6</td>
                </tr>
                <tr className="bg-green-50 font-semibold">
                  <td className="px-4 py-3 text-green-900">BLIP-2 (ViT-g)</td>
                  <td className="px-4 py-3 text-center text-green-600 font-bold">83.7</td>
                  <td className="px-4 py-3 text-center text-green-600 font-bold">66.6</td>
                  <td className="px-4 py-3 text-center text-green-600 font-bold">97.6</td>
                  <td className="px-4 py-3 text-center text-green-600 font-bold">89.4</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="bg-green-50 p-5 rounded-xl border-l-4 border-green-500 mb-6">
            <h4 className="font-bold text-green-800 mb-2">💡 核心结论</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• 可训练参数减少 <strong>54 倍</strong>（188M vs 10.2B），Zero-shot VQAv2 提升 <strong>8.7%</strong></li>
              <li>• Zero-shot COCO Captioning 超越 Flamingo-80B <strong>23.2</strong> CIDEr</li>
              <li>• Flan-T5 作为 LLM 显著优于 OPT（得益于指令微调）</li>
              <li>• ViT-g (EVA-CLIP) 优于 ViT-L (CLIP)</li>
            </ul>
          </div>

          {/* 计算效率对比 */}
          <div className="bg-slate-800 p-6 rounded-xl text-white">
            <h4 className="font-bold text-blue-400 mb-4">⚡ 计算效率对比</h4>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="bg-slate-700 p-4 rounded-lg">
                <div className="text-3xl font-bold text-green-400 mb-1">54×</div>
                <div className="text-sm text-slate-300">参数量减少</div>
                <div className="text-xs text-slate-400 mt-1">188M vs 10.2B</div>
              </div>
              <div className="bg-slate-700 p-4 rounded-lg">
                <div className="text-3xl font-bold text-blue-400 mb-1">16×</div>
                <div className="text-sm text-slate-300">预训练数据减少</div>
                <div className="text-xs text-slate-400 mt-1">129M vs 2.1B</div>
              </div>
              <div className="bg-slate-700 p-4 rounded-lg">
                <div className="text-3xl font-bold text-purple-400 mb-1">9天</div>
                <div className="text-sm text-slate-300">预训练时间</div>
                <div className="text-xs text-slate-400 mt-1">16× A100 GPUs</div>
              </div>
            </div>
          </div>
        </Section>

        {/* Summary */}
        <Section id="summary" title="总结" icon={Target} dark={true}>
          <p className="text-slate-300">
            BLIP-2 证明了通过轻量级的 Q-Former 和两阶段预训练策略，可以有效地利用现成的冻结图像编码器和大型语言模型。这种方法不仅大幅降低了训练成本，还成功地将 LLM 的强大推理和生成能力迁移到了多模态领域。
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-slate-700 p-4 rounded-lg">
              <h4 className="font-bold text-blue-400 mb-2">Q-Former</h4>
              <p className="text-sm text-slate-300">轻量级桥梁，连接视觉与语言</p>
            </div>
            <div className="bg-slate-700 p-4 rounded-lg">
              <h4 className="font-bold text-blue-400 mb-2">冻结策略</h4>
              <p className="text-sm text-slate-300">复用预训练模型，避免灾难性遗忘</p>
            </div>
            <div className="bg-slate-700 p-4 rounded-lg">
              <h4 className="font-bold text-blue-400 mb-2">两阶段训练</h4>
              <p className="text-sm text-slate-300">先对齐表征，再连接 LLM</p>
            </div>
          </div>
        </Section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="mb-4 text-white font-serif text-lg italic">"BLIP-2 bridges the modality gap with a lightweight Querying Transformer."</p>
          <p className="text-sm">基于 BLIP-2 原始论文 (arXiv:2301.12597v3) 整理</p>
        </div>
      </footer>

    </div>
  );
};

export default BLIP2;

