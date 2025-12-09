import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  Cpu, 
  Database,
  Layers,
  Target,
  Filter,
  Sparkles,
  BarChart3,
  MessageSquare,
  Eye,
  Link2
} from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

const Section = ({ id, title, icon: Icon, children, className = "", highlight = false }) => (
  <section id={id} className={`scroll-mt-24 mb-12 ${className}`}>
    <div className={`flex items-center gap-3 mb-6 ${highlight ? 'pb-3 border-b-4 border-blue-500' : ''}`}>
      <div className={`p-2 rounded-lg ${highlight ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'}`}>
        <Icon size={24} />
      </div>
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
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

const BLIP = () => {
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
                <span className="text-blue-600">BLIP</span> 论文精读
              </span>
            </div>
            <div className="hidden md:flex space-x-3 text-sm font-medium text-slate-600">
              <a href="#intro" className="hover:text-blue-600 transition">核心问题</a>
              <a href="#data" className="hover:text-blue-600 transition">数据集</a>
              <a href="#architecture" className="hover:text-blue-600 transition">MED架构</a>
              <a href="#objectives" className="hover:text-blue-600 transition">预训练目标</a>
              <a href="#capfilt" className="hover:text-blue-600 transition">CapFilt</a>
              <a href="#video" className="hover:text-blue-600 transition">视频迁移</a>
              <a href="#results" className="hover:text-blue-600 transition">实验结果</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-300 uppercase bg-blue-900/50 rounded-full">
            Salesforce Research · ICML 2022 · arXiv:2201.12086
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            BLIP: 统一视觉-语言理解与生成
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Bootstrapping Language-Image Pre-training for Unified Vision-Language Understanding and Generation
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12 space-y-8">

        {/* 1. Introduction & Motivation */}
        <Section id="intro" title="核心痛点与解决方案" icon={BookOpen}>
          <div className="grid md:grid-cols-2 gap-6">
            {/* 痛点 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-red-600 mb-4">现有 VLP 模型的两大局限</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div>
                    <span className="font-bold text-slate-800">模型视角的局限性</span>
                    <p className="text-sm text-slate-600 mt-1">现有模型要么基于<strong>编码器</strong>（适合理解任务，如检索），要么基于<strong>编码器-解码器</strong>（适合生成任务，如描述）。难以在两类任务上都表现出色。</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div>
                    <span className="font-bold text-slate-800">数据视角的噪声问题</span>
                    <p className="text-sm text-slate-600 mt-1">大多数方法依赖网络爬取的图像-文本对（Alt-text），这些文本往往<strong>包含大量噪声</strong>，不能准确描述图像内容。</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 解决方案 */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <h3 className="text-xl font-bold text-blue-800 mb-4">BLIP 的回应</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Layers size={20} className="text-blue-600 mt-1 shrink-0" />
                  <div>
                    <span className="font-bold text-blue-900">MED 架构</span>
                    <p className="text-sm text-blue-800 mt-1">Multimodal Mixture of Encoder-Decoder：一个多任务模型，可同时充当单模态编码器、图文匹配编码器和图文生成解码器。</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Filter size={20} className="text-blue-600 mt-1 shrink-0" />
                  <div>
                    <span className="font-bold text-blue-900">CapFilt 机制</span>
                    <p className="text-sm text-blue-800 mt-1">利用微调后的模型<strong>生成</strong>高质量合成描述，并<strong>过滤</strong>掉噪声描述，实现数据引导（Bootstrapping）。</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Pre-training Data */}
        <Section id="data" title="预训练数据集" icon={Database}>
          <p className="text-slate-700 mb-6">
            BLIP 使用了多个数据集进行预训练，包括人工标注的高质量数据和网络爬取的大规模数据：
          </p>
          
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-800">数据集</th>
                  <th className="px-4 py-3 text-center font-bold text-slate-800">图像数量</th>
                  <th className="px-4 py-3 text-center font-bold text-slate-800">文本数量</th>
                  <th className="px-4 py-3 text-left font-bold text-slate-800">数据类型</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="bg-green-50">
                  <td className="px-4 py-3 font-semibold text-green-800">COCO</td>
                  <td className="px-4 py-3 text-center">113K</td>
                  <td className="px-4 py-3 text-center">567K</td>
                  <td className="px-4 py-3 text-slate-600">人工标注（高质量）</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="px-4 py-3 font-semibold text-green-800">Visual Genome</td>
                  <td className="px-4 py-3 text-center">100K</td>
                  <td className="px-4 py-3 text-center">769K</td>
                  <td className="px-4 py-3 text-slate-600">人工标注（高质量）</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-slate-800">SBU Captions</td>
                  <td className="px-4 py-3 text-center">860K</td>
                  <td className="px-4 py-3 text-center">860K</td>
                  <td className="px-4 py-3 text-slate-600">网络爬取</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-slate-800">CC3M</td>
                  <td className="px-4 py-3 text-center">3M</td>
                  <td className="px-4 py-3 text-center">3M</td>
                  <td className="px-4 py-3 text-slate-600">网络爬取（Alt-text）</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-slate-800">CC12M</td>
                  <td className="px-4 py-3 text-center">10M</td>
                  <td className="px-4 py-3 text-center">10M</td>
                  <td className="px-4 py-3 text-slate-600">网络爬取（Alt-text）</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="px-4 py-3 font-semibold text-blue-800">LAION-115M</td>
                  <td className="px-4 py-3 text-center font-bold">115M</td>
                  <td className="px-4 py-3 text-center font-bold">115M</td>
                  <td className="px-4 py-3 text-slate-600">大规模网络数据</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-amber-50 p-4 rounded-xl border-l-4 border-amber-500">
            <h4 className="font-bold text-amber-800 mb-2">💡 数据规模对比</h4>
            <p className="text-sm text-amber-700">
              BLIP 使用了从 <strong>14M</strong>（COCO+VG+CC3M+SBU+CC12M）到 <strong>129M</strong>（加入 LAION）不等的数据规模进行实验。论文发现，<strong>CapFilt 数据清洗带来的增益远大于单纯增加数据量</strong>。
            </p>
          </div>
        </Section>

        {/* 2. Model Architecture */}
        <Section id="architecture" title="模型架构: MED (Multimodal Mixture of Encoder-Decoder)" icon={Cpu}>
          {/* 图像编码器详情 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
            <h3 className="text-xl font-semibold mb-4 text-slate-800 flex items-center gap-2">
              <Eye size={20} className="text-violet-600" /> 图像编码器 (Vision Transformer)
            </h3>
            <p className="text-slate-700 mb-4">
              BLIP 使用预训练的 <strong>ViT</strong> 作为图像编码器，有两种规模：
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-violet-50 p-4 rounded-lg border border-violet-200">
                <h4 className="font-bold text-violet-900 mb-2">ViT-B/16 (Base)</h4>
                <ul className="text-sm text-violet-800 space-y-1">
                  <li>• Patch Size: 16×16</li>
                  <li>• 隐藏维度: 768</li>
                  <li>• 预训练: ImageNet-1K</li>
                  <li>• 输入分辨率: 224×224 / 384×384</li>
                </ul>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                <h4 className="font-bold text-indigo-900 mb-2">ViT-L/16 (Large)</h4>
                <ul className="text-sm text-indigo-800 space-y-1">
                  <li>• Patch Size: 16×16</li>
                  <li>• 隐藏维度: 1024</li>
                  <li>• 预训练: ImageNet-1K</li>
                  <li>• 用于更强的性能表现</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-slate-700 mb-6">
            文本端采用 <strong>MED 架构</strong>，在预训练期间联合优化三个目标，对应三种功能模式：
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            {/* 单模态编码器 */}
            <div className="bg-white border-2 border-indigo-200 rounded-xl p-5 hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare size={20} />
              </div>
              <h3 className="font-bold text-lg text-slate-800 mb-2">1. 单模态编码器</h3>
              <p className="text-xs text-indigo-600 font-semibold mb-3">Unimodal Encoder</p>
              <p className="text-sm text-slate-600 mb-3">分别编码图像和文本。文本端类似 BERT，在文本前添加 <code className="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-600 text-xs">[CLS]</code> token。</p>
              <div className="bg-indigo-50 px-3 py-2 rounded text-xs text-indigo-800">
                用于 <strong>对比学习 (ITC)</strong>
              </div>
            </div>

            {/* 图像引导文本编码器 */}
            <div className="bg-white border-2 border-pink-200 rounded-xl p-5 hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 bg-pink-100 text-pink-600 rounded-lg flex items-center justify-center mb-4">
                <Link2 size={20} />
              </div>
              <h3 className="font-bold text-lg text-slate-800 mb-2">2. 图像引导文本编码器</h3>
              <p className="text-xs text-pink-600 font-semibold mb-3">Image-grounded Text Encoder</p>
              <p className="text-sm text-slate-600 mb-3">在每个 Self-Attention 层和 FFN 之间插入 <strong>Cross-Attention</strong> 层注入视觉信息。使用 <code className="bg-slate-100 px-1.5 py-0.5 rounded text-pink-600 text-xs">[Encode]</code> token。</p>
              <div className="bg-pink-50 px-3 py-2 rounded text-xs text-pink-800">
                用于 <strong>图文匹配 (ITM)</strong>
              </div>
            </div>

            {/* 图像引导文本解码器 */}
            <div className="bg-white border-2 border-green-200 rounded-xl p-5 hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                <Sparkles size={20} />
              </div>
              <h3 className="font-bold text-lg text-slate-800 mb-2">3. 图像引导文本解码器</h3>
              <p className="text-xs text-green-600 font-semibold mb-3">Image-grounded Text Decoder</p>
              <p className="text-sm text-slate-600 mb-3">将双向 Self-Attention 替换为<strong>因果（Causal）</strong>Self-Attention。使用 <code className="bg-slate-100 px-1.5 py-0.5 rounded text-green-600 text-xs">[Decode]</code> token。</p>
              <div className="bg-green-50 px-3 py-2 rounded text-xs text-green-800">
                用于 <strong>语言建模 (LM)</strong>
              </div>
            </div>
          </div>

          {/* 参数共享说明 */}
          <div className="mt-6 bg-amber-50 p-4 rounded-xl border-l-4 border-amber-500">
            <h4 className="font-bold text-amber-800 mb-2">💡 参数共享策略</h4>
            <p className="text-sm text-amber-700">
              三种功能模式<strong>共享</strong> Self-Attention 层和 FFN 层的参数，只有 Cross-Attention 层是独立的。这种设计既保持了模型的灵活性，又大幅减少了参数量。
            </p>
          </div>
        </Section>

        {/* 3. Pre-training Objectives */}
        <Section id="objectives" title="预训练目标详解" icon={Target} highlight={true}>
          <p className="text-slate-600 mb-8">BLIP 在预训练期间联合优化三个目标函数。这是理解模型如何学习图文对齐的核心。</p>

          {/* ITC Loss */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-indigo-600 text-white text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center">I</span>
              <h3 className="text-xl font-bold text-indigo-800">图像-文本对比损失 (ITC)</h3>
            </div>
            
            <p className="text-slate-700 mb-4">
              <strong>目标</strong>: 对齐视觉和语言的特征空间。让配对的"图"和"文"在向量空间里靠得近，不配对的离得远。
            </p>

            <MathBlock label="总公式">
              {String.raw`\mathcal{L}_{ITC} = (1 - \alpha) \mathcal{L}_{ce}(p, y) + \alpha \mathcal{L}_{ce}(p, q)`}
            </MathBlock>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-2">第一项：Ground Truth 学习</h4>
                <p className="text-sm text-slate-600 mb-2">标准的对比学习损失（类似 CLIP）</p>
                <div className="bg-white p-2 rounded border text-xs">
                  <InlineMath math="p" />: 预测的匹配概率分布 (Softmax)
                </div>
                <div className="bg-white p-2 rounded border text-xs mt-2">
                  <InlineMath math="y" />: One-hot 硬标签（只有配对位置为 1）
                </div>
              </div>

              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-indigo-900">第二项：动量蒸馏</h4>
                  <span className="text-xs bg-indigo-200 text-indigo-800 px-2 py-0.5 rounded font-semibold">核心改进</span>
                </div>
                <p className="text-sm text-indigo-800 mb-2">引入"动量教师"产生软标签</p>
                <div className="bg-white p-2 rounded border text-xs">
                  <InlineMath math="q" />: 动量编码器产生的概率分布
                </div>
                <p className="text-xs text-indigo-700 mt-2">
                  动量编码器更新缓慢，产生的特征更稳定。如果 Batch 中有其他相似图片，会给予较高概率（如 0.3）而非硬标签的 0。
                </p>
              </div>
            </div>

            <div className="mt-4 bg-slate-100 p-3 rounded-lg">
              <p className="text-sm text-slate-700">
                <strong>相似度计算：</strong> <InlineMath math="p(I|T) = \frac{\exp(s(I,T)/\tau)}{\sum_{I' \in \mathcal{B}} \exp(s(I',T)/\tau)}" />，其中 <InlineMath math="s(I,T)" /> 是图文特征的余弦相似度，<InlineMath math="\tau" /> 是温度参数。
              </p>
            </div>

            {/* 动量蒸馏详解 */}
            <div className="mt-6 bg-indigo-50 p-5 rounded-xl border border-indigo-200">
              <h4 className="font-bold text-indigo-900 mb-3">🔄 动量模型 (Momentum Model) 详解</h4>
              <p className="text-sm text-indigo-800 mb-3">
                动量模型是在线模型的<strong>指数移动平均 (EMA)</strong>版本，更新公式如下：
              </p>
              <MathBlock label="动量更新">
                {String.raw`\theta_m \leftarrow m \cdot \theta_m + (1-m) \cdot \theta`}
              </MathBlock>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-white p-3 rounded-lg border">
                  <h5 className="font-semibold text-indigo-800 mb-2">符号说明</h5>
                  <ul className="text-xs text-slate-600 space-y-1">
                    <li>• <InlineMath math="\theta_m" />: 动量模型参数</li>
                    <li>• <InlineMath math="\theta" />: 在线模型参数</li>
                    <li>• <InlineMath math="m = 0.995" />: 动量系数</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded-lg border">
                  <h5 className="font-semibold text-indigo-800 mb-2">为什么有效？</h5>
                  <ul className="text-xs text-slate-600 space-y-1">
                    <li>• 动量模型更新<strong>缓慢且稳定</strong></li>
                    <li>• 产生的软标签可以识别<strong>伪负样本</strong></li>
                    <li>• 避免硬标签对相似样本的错误惩罚</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* ITM Loss */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-pink-600 text-white text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center">II</span>
              <h3 className="text-xl font-bold text-pink-800">图像-文本匹配损失 (ITM)</h3>
            </div>
            
            <p className="text-slate-700 mb-4">
              <strong>目标</strong>: 精细化的二分类任务。与 ITC 仅看全局特征不同，ITM 允许图像和文本 token 进行深度的 Cross-Attention 交互，判断是否真正匹配。
            </p>

            <MathBlock label="总公式">
              {String.raw`\mathcal{L}_{ITM} = \mathbb{E}_{(I,T) \sim \mathcal{D}} \left[ H(y_{itm}, p_{itm}(I,T)) \right]`}
            </MathBlock>

            <div className="overflow-x-auto mt-6">
              <table className="w-full text-sm">
                <thead className="bg-pink-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-bold text-pink-900 w-1/5">符号</th>
                    <th className="px-4 py-3 text-left font-bold text-pink-900">详细解释</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-4 py-3 font-mono text-pink-700"><InlineMath math="\mathbb{E}" /></td>
                    <td className="px-4 py-3 text-slate-600">期望 (Expectation)：在整个数据集上计算损失的平均值</td>
                  </tr>
                  <tr className="bg-pink-50/50">
                    <td className="px-4 py-3 font-mono text-pink-700"><InlineMath math="(I,T) \sim \mathcal{D}" /></td>
                    <td className="px-4 py-3 text-slate-600"><strong>困难样本采样</strong>：专门挑选 ITC 相似度高但实际不匹配的图文对（如图是"金毛"，文是"拉布拉多"）</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-pink-700"><InlineMath math="H(\cdot, \cdot)" /></td>
                    <td className="px-4 py-3 text-slate-600">交叉熵损失：<InlineMath math="H(y, p) = -(y \log p + (1-y) \log(1-p))" /></td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-pink-700"><InlineMath math="y_{itm}" /></td>
                    <td className="px-4 py-3 text-slate-600">真实标签：原配对为 1，负样本为 0</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-pink-700"><InlineMath math="p_{itm}(I,T)" /></td>
                    <td className="px-4 py-3 text-slate-600">预测匹配概率：来自 [Encode] token 输出，经二分类层和 Softmax</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 bg-pink-50 p-4 rounded-lg border-l-4 border-pink-500">
              <h4 className="font-bold text-pink-900 mb-2">为什么要用 Hard Negative Mining?</h4>
              <p className="text-sm text-pink-800">
                如果随机选负样本，绝大多数是毫无关系的（图是"猫"，文是"飞机"），模型很容易得分，梯度接近 0。<strong>通过挑选"最像正确答案"的错误样本</strong>，BLIP 迫使模型关注细微差异，学到更鲁棒的对齐。
              </p>
            </div>
          </div>

          {/* LM Loss */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-green-600 text-white text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center">III</span>
              <h3 className="text-xl font-bold text-green-800">语言建模损失 (LM)</h3>
            </div>
            
            <p className="text-slate-700 mb-4">
              <strong>目标</strong>: 训练解码器根据图像生成文本。这是标准的<strong>自回归（Autoregressive）</strong>生成任务，最大化生成真实描述的概率。
            </p>

            <MathBlock label="总公式">
              {String.raw`\mathcal{L}_{LM} = - \sum_{t=1}^{L} \log P(y_t \mid y_{\lt t}, I)`}
            </MathBlock>

            <div className="overflow-x-auto mt-6">
              <table className="w-full text-sm">
                <thead className="bg-green-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-bold text-green-900 w-1/5">符号</th>
                    <th className="px-4 py-3 text-left font-bold text-green-900">详细解释</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-4 py-3 font-mono text-green-700"><InlineMath math="\sum_{t=1}^{L}" /></td>
                    <td className="px-4 py-3 text-slate-600">对句子中每个 token 逐个计算损失求和，<InlineMath math="L" /> 是句子长度</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-green-700"><InlineMath math="\log P(\cdot)" /></td>
                    <td className="px-4 py-3 text-slate-600">对数似然：前面的负号将"最大化概率"变为"最小化损失"</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-green-700"><InlineMath math="y_t" /></td>
                    <td className="px-4 py-3 text-slate-600">时间步 t 需要预测的真实 token (Ground Truth)</td>
                  </tr>
                  <tr className="bg-green-50/50">
                    <td className="px-4 py-3 font-mono text-green-700"><InlineMath math="y_{\lt t}" /></td>
                    <td className="px-4 py-3 text-slate-600"><strong>上文</strong>：模型只能看到之前的单词 <InlineMath math="(y_1, \ldots, y_{t-1})" />，通过 <strong>Causal Mask</strong> 实现</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-green-700"><InlineMath math="I" /></td>
                    <td className="px-4 py-3 text-slate-600">图像特征：通过 Cross-Attention 注入，对所有时间步<strong>全局可见</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <h4 className="font-bold text-green-900 mb-2">生成过程示例</h4>
                <div className="text-sm text-slate-600 bg-white p-3 rounded border font-mono text-xs space-y-1">
                  <p>目标句子: "a cute cat"</p>
                  <p className="text-green-700">• t=1: [Decode] + 图 → 预测 "a"</p>
                  <p className="text-green-700">• t=2: "a" + 图 → 预测 "cute"</p>
                  <p className="text-green-700">• t=3: "a cute" + 图 → 预测 "cat"</p>
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <h4 className="font-bold text-green-900 mb-2">Label Smoothing (标签平滑)</h4>
                <p className="text-sm text-slate-600 mb-2">不要求模型 100% 确信下一个词是 <InlineMath math="y_t" /></p>
                <div className="bg-white p-2 rounded border text-xs text-slate-600">
                  <strong>操作：</strong> One-hot [0, 1, 0] → 平滑 [0.05, 0.9, 0.05]
                  <br />
                  <strong>目的：</strong> 防止在噪声 Web 数据上过拟合，提高泛化能力
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 4. CapFilt */}
        <Section id="capfilt" title="CapFilt: 数据的引导与净化" icon={Filter}>
          <p className="text-lg text-slate-700 mb-6">
            这是 BLIP 最具创新性的部分。作者认为，网络爬取的图像-文本对虽然量大，但<strong>充满噪声</strong>（Alt-text 往往与图像内容不符）。BLIP 提出"自举"（Bootstrapping）方法来净化数据。
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Captioner */}
            <div className="bg-white border-2 border-amber-400 rounded-xl p-6 relative">
              <div className="absolute top-0 right-0 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">生成器</div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                <Sparkles size={20} className="text-amber-500" /> Captioner
              </h3>
              <p className="text-sm text-slate-600 mb-4">基于预训练的 <strong>Image-grounded Text Decoder</strong>，在高质量数据集（如 COCO）上微调。</p>
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <strong className="text-amber-800">任务：</strong>
                <p className="text-sm text-amber-700 mt-1">给定网络图像 <InlineMath math="I_w" />，生成高质量的合成描述 <InlineMath math="T_s" /></p>
              </div>
            </div>

            {/* Filter */}
            <div className="bg-white border-2 border-indigo-400 rounded-xl p-6 relative">
              <div className="absolute top-0 right-0 bg-indigo-400 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">过滤器</div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                <Filter size={20} className="text-indigo-500" /> Filter
              </h3>
              <p className="text-sm text-slate-600 mb-4">基于预训练的 <strong>Image-grounded Text Encoder</strong>，在 COCO 上微调 ITC 和 ITM 任务。</p>
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                <strong className="text-indigo-800">任务：</strong>
                <p className="text-sm text-indigo-700 mt-1">检查原始文本 <InlineMath math="T_w" /> 和合成文本 <InlineMath math="T_s" /> 是否与图像匹配。ITM 预测"不匹配"则丢弃。</p>
              </div>
            </div>
          </div>

          {/* Nucleus Sampling */}
          <div className="bg-purple-50 p-5 rounded-xl border border-purple-200 mb-6">
            <h4 className="font-bold text-purple-800 mb-3">🎲 Nucleus Sampling (核采样) vs Beam Search</h4>
            <p className="text-sm text-purple-800 mb-3">
              论文发现，Captioner 使用 <strong>Nucleus Sampling</strong> 生成的描述比 Beam Search 更加多样化，带来更大的性能提升：
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border">
                <h5 className="font-semibold text-purple-900 mb-2">Nucleus Sampling (p=0.9)</h5>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li>• 从累积概率 ≤ p 的 token 中采样</li>
                  <li>• 生成<strong>多样化</strong>的描述</li>
                  <li>• 更好地覆盖图像的不同方面</li>
                  <li className="text-green-600 font-semibold">✓ BLIP 推荐使用</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <h5 className="font-semibold text-slate-700 mb-2">Beam Search</h5>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li>• 每步选择概率最高的 k 个序列</li>
                  <li>• 生成<strong>确定性</strong>的描述</li>
                  <li>• 描述相似，多样性低</li>
                  <li className="text-slate-500">用于推理阶段</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 结果 */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h4 className="font-bold text-green-800 mb-3">🎯 CapFilt 的结果</h4>
            <p className="text-slate-700 mb-3">通过 CapFilt，BLIP 创造了一个<strong>更清洁、规模更大</strong>的数据集：</p>
            <div className="bg-white p-4 rounded-lg border border-green-300 font-mono text-sm overflow-x-auto">
              <BlockMath math="\mathcal{D}_{new} = \{(I_w, T_w) | \text{Filter}=1\} \cup \{(I_w, T_s) | \text{Filter}=1\} \cup \mathcal{D}_{human}" />
            </div>
            <p className="text-sm text-green-700 mt-3">
              实验表明，经过"净化"和"扩充"的数据集带来的性能提升，比<strong>单纯增加数据量</strong>要显著得多。
            </p>
          </div>
        </Section>

        {/* Zero-shot Video Transfer */}
        <Section id="video" title="Zero-shot 视频-语言迁移" icon={Eye}>
          <p className="text-slate-700 mb-6">
            BLIP 展现了强大的泛化能力，可以<strong>无需任何视频数据微调</strong>直接迁移到视频-语言任务：
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-slate-800 mb-3">Text-to-Video 检索</h4>
              <p className="text-sm text-slate-600 mb-3">
                给定文本查询，从视频库中检索相关视频。BLIP 通过对视频帧取平均特征来处理：
              </p>
              <div className="bg-slate-50 p-3 rounded border text-xs">
                <strong>方法：</strong> 均匀采样 N 帧 → 分别编码 → 平均池化得到视频特征
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-slate-800 mb-3">Video Question Answering</h4>
              <p className="text-sm text-slate-600 mb-3">
                根据视频内容回答问题。同样通过帧采样处理：
              </p>
              <div className="bg-slate-50 p-3 rounded border text-xs">
                <strong>方法：</strong> 对采样帧分别计算答案概率 → 选择平均概率最高的答案
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-5 rounded-xl border-l-4 border-blue-500">
            <h4 className="font-bold text-blue-800 mb-2">💡 为什么 BLIP 能 Zero-shot 迁移到视频？</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• <strong>统一的多任务架构</strong>：MED 在预训练时就学会了理解和生成，具备通用能力</li>
              <li>• <strong>大规模图文预训练</strong>：学到的视觉-语言对齐可以泛化到视频帧</li>
              <li>• <strong>CapFilt 数据清洗</strong>：高质量的训练数据带来更好的泛化性</li>
            </ul>
          </div>
        </Section>

        {/* 5. Results */}
        <Section id="results" title="实验结论" icon={BarChart3}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-800">任务</th>
                  <th className="px-4 py-3 text-left font-bold text-slate-800">表现 (SOTA 比较)</th>
                  <th className="px-4 py-3 text-left font-bold text-slate-800">关键因素</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="bg-white hover:bg-slate-50">
                  <td className="px-4 py-4 font-semibold text-slate-900">图文检索 (Retrieval)</td>
                  <td className="px-4 py-4 text-green-600 font-semibold">Recall@1 提升 +2.7% (COCO)</td>
                  <td className="px-4 py-4 text-slate-600">ITC 和 ITM 的联合训练</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50">
                  <td className="px-4 py-4 font-semibold text-slate-900">图像描述 (Captioning)</td>
                  <td className="px-4 py-4 text-green-600 font-semibold">CIDEr 提升 +2.8%</td>
                  <td className="px-4 py-4 text-slate-600">LM 损失 + CapFilt 的多样化合成文本</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50">
                  <td className="px-4 py-4 font-semibold text-slate-900">视觉问答 (VQA)</td>
                  <td className="px-4 py-4 text-green-600 font-semibold">VQA Score 提升 +1.6%</td>
                  <td className="px-4 py-4 text-slate-600">将 VQA 视为生成任务而非分类任务</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50">
                  <td className="px-4 py-4 font-semibold text-slate-900">零样本视频迁移</td>
                  <td className="px-4 py-4 text-green-600 font-semibold">表现强劲 (Text-to-Video)</td>
                  <td className="px-4 py-4 text-slate-600">统一架构具有极强泛化能力</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-slate-500 italic text-right">* 数据基于论文发表时与当时 SOTA 模型（ALBEF, SimVLM）的对比</p>

          <div className="mt-6 bg-blue-50 p-5 rounded-xl border-l-4 border-blue-500">
            <h4 className="font-bold text-blue-800 mb-2">💡 核心贡献总结</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• <strong>MED 架构</strong>：统一的编码器-解码器，同时支持理解和生成任务</li>
              <li>• <strong>CapFilt</strong>：利用模型自身能力进行数据清洗和扩充</li>
              <li>• <strong>动量蒸馏</strong>：更稳定的对比学习训练</li>
              <li>• <strong>多任务联合训练</strong>：ITC + ITM + LM 相互促进</li>
            </ul>
          </div>
        </Section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="mb-4 text-white font-serif text-lg italic">"BLIP effectively utilizes the noisy web data by bootstrapping the captions."</p>
          <p className="text-sm">基于 BLIP 原始论文 (arXiv:2201.12086) 整理</p>
        </div>
      </footer>

    </div>
  );
};

export default BLIP;
