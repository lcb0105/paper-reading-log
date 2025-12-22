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
  CheckCircle,
  Star,
  Lightbulb,
  LayoutGrid
} from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

const Section = ({ id, title, icon: Icon, children, className = "" }) => (
  <section id={id} className={`scroll-mt-24 mb-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm ${className}`}>
    <div className="flex items-center gap-3 mb-6 border-b pb-3 border-slate-200">
      <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
        <Icon size={24} />
      </div>
      <h2 className="text-2xl font-bold text-indigo-900">{title}</h2>
    </div>
    {children}
  </section>
);

const MathBlock = ({ children, label }) => (
  <div className="overflow-x-auto p-4 bg-slate-50 rounded-lg border border-slate-200 my-4">
    {label && <p className="text-xs text-slate-500 mb-2 font-mono uppercase tracking-widest">{label}</p>}
    <div className="text-center py-4">
      <BlockMath math={children} />
    </div>
  </div>
);

const InstructBLIP = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-slate-500 hover:text-indigo-600 transition-colors">
                <ArrowLeft size={20} />
              </Link>
              <div className="w-px h-6 bg-slate-200"></div>
              <span className="text-xl font-bold tracking-tight flex items-center gap-2">
                <BookOpen size={20} className="text-indigo-600" />
                <span className="text-indigo-600">InstructBLIP</span> 论文精读
              </span>
            </div>
            <div className="hidden md:flex space-x-3 text-sm font-medium text-slate-600">
              <a href="#overview" className="hover:text-indigo-600 transition">概览</a>
              <a href="#architecture" className="hover:text-indigo-600 transition">架构</a>
              <a href="#formula" className="hover:text-indigo-600 transition">核心公式</a>
              <a href="#data" className="hover:text-indigo-600 transition">数据策略</a>
              <a href="#results" className="hover:text-indigo-600 transition">实验结果</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-indigo-200 uppercase bg-indigo-800/50 rounded-full">
            Salesforce Research · NeurIPS 2023 · arXiv:2305.06500
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            迈向通用的视觉-语言指令微调模型
          </h1>
          <p className="text-lg md:text-xl text-indigo-200 max-w-2xl mx-auto leading-relaxed italic">
            InstructBLIP: Towards General-purpose Vision-Language Models with Instruction Tuning
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12 space-y-8">

        {/* Overview */}
        <Section id="overview" title="1. 核心概览" icon={LayoutGrid}>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-3 text-slate-800">主要挑战</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                尽管大语言模型（LLM）通过指令微调（Instruction Tuning）在 NLP 领域取得了巨大的成功，但构建通用的<strong>视觉-语言模型</strong>仍然面临挑战。主要原因是视觉输入带来的丰富输入分布和任务多样性。以往的多任务学习方法（Multitask Learning）在未见过的任务上泛化能力较差。
              </p>
            </div>
            <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-200">
              <h3 className="text-lg font-semibold mb-3 text-indigo-800">InstructBLIP 的解决方案</h3>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>全面微调研究：</strong>收集了 26 个数据集，将其转换为指令微调格式。</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>架构创新：</strong>提出了"指令感知"（Instruction-aware）的 Query Transformer (Q-Former)。</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>SOTA 性能：</strong>在 13 个未见过的（held-out）数据集上实现了最先进的 Zero-shot 性能。</span>
                </li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Architecture */}
        <Section id="architecture" title="2. 模型架构：指令感知的 Q-Former" icon={Cpu}>
          <p className="mb-6 text-slate-600">
            InstructBLIP 基于 BLIP-2 架构改进。虽然图像编码器（Image Encoder）和 LLM 都是冻结的（Frozen），但 InstructBLIP 对 Q-Former 进行了关键的修改。
          </p>
          
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              {/* BLIP-2 的问题 */}
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Zap size={18} className="text-yellow-500" />
                  传统 BLIP-2 的问题
                </h4>
                <p className="text-sm text-slate-600">
                  BLIP-2 的 Q-Former 提取视觉特征时是<strong>指令无关</strong>的（Instruction-agnostic）。无论用户问什么问题（例如"这是什么颜色？"或"图中有几个人？"），输入给 LLM 的视觉特征都是固定的一套。
                </p>
              </div>
              
              {/* InstructBLIP 的创新 */}
              <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-200">
                <h4 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
                  <Star size={18} className="text-indigo-500" />
                  InstructBLIP 的创新
                </h4>
                <p className="text-sm text-indigo-800">
                  <strong>指令感知视觉特征提取 (Instruction-aware Visual Feature Extraction)</strong>：<br /><br />
                  文本指令不仅仅输入给 LLM，同时也输入给 <strong>Q-Former</strong>。指令通过 Self-Attention 层与查询嵌入（Query Embeddings）交互。这使得 Q-Former 能够根据任务需求，从图像编码器中提取特定的视觉特征。
                </p>
              </div>
            </div>
            
            {/* 数据流向示意图 */}
            <div className="flex flex-col items-center justify-center space-y-4 bg-slate-100 p-8 rounded-xl border-2 border-dashed border-slate-300">
              <div className="text-center font-bold text-slate-400 mb-2">数据流向示意图</div>
              
              {/* Image Encoder */}
              <div className="w-52 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center shadow-md font-mono text-sm">
                Frozen Image Encoder
              </div>
              <div className="text-slate-400">↓</div>
              
              {/* Q-Former Block */}
              <div className="w-72 p-4 bg-yellow-100 border-2 border-yellow-400 rounded-lg shadow-sm">
                <div className="text-center font-bold text-yellow-800 mb-3">Instruction-aware Q-Former</div>
                <div className="flex justify-between items-center text-xs space-x-2">
                  <div className="bg-white p-2 rounded border border-yellow-200 text-center flex-1">
                    Learnable Queries
                  </div>
                  <div className="text-slate-500 font-bold">+</div>
                  <div className="bg-green-100 p-2 rounded border border-green-300 text-center flex-1 font-bold text-green-800">
                    Instruction Text
                  </div>
                </div>
                <div className="mt-2 text-xs text-center text-slate-500">
                  (Self-Attention Interaction)
                </div>
              </div>
              <div className="text-slate-400">↓</div>
              
              {/* LLM */}
              <div className="w-52 h-12 bg-indigo-600 text-white rounded-lg flex items-center justify-center shadow-md font-mono text-sm">
                Frozen LLM
              </div>
            </div>
          </div>

          {/* 与 BLIP-2 的对比 */}
          <div className="bg-gradient-to-r from-slate-50 to-indigo-50 p-6 rounded-xl border border-slate-200 mt-6">
            <h4 className="font-bold text-slate-800 mb-4">🔍 BLIP-2 vs InstructBLIP 对比</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border">
                <h5 className="font-semibold text-slate-700 mb-2">BLIP-2</h5>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Q-Former 只接收图像信息</li>
                  <li>• 视觉特征与任务无关</li>
                  <li>• 所有问题使用相同的视觉表示</li>
                </ul>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                <h5 className="font-semibold text-indigo-700 mb-2">InstructBLIP</h5>
                <ul className="text-sm text-indigo-800 space-y-1">
                  <li>• Q-Former 同时接收<strong>图像 + 指令</strong></li>
                  <li>• 视觉特征根据任务动态调整</li>
                  <li>• 不同问题提取不同的视觉信息</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* Formula */}
        <Section id="formula" title="3. 重点公式：平衡采样策略" icon={Target}>
          <p className="mb-6 text-slate-600">
            在指令微调过程中，由于不同数据集的大小差异巨大（例如有些有几十万条，有些只有几千条），直接混合训练会导致模型在小数据集上过拟合，在大数据集上欠拟合。为了解决这个问题，论文提出了一种<strong>平衡采样策略</strong>。
          </p>
          
          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4 border-l-4 border-red-500 pl-3">采样概率计算公式</h3>
            <MathBlock>
              {String.raw`p_{d}=\frac{\sqrt{S_{d}}}{\sum_{i=1}^{D}\sqrt{S_{i}}}`}
            </MathBlock>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* 变量解释 */}
            <div>
              <h4 className="font-bold text-slate-800 mb-4">公式变量详细解释：</h4>
              <div className="space-y-4">
                <div className="flex items-start bg-slate-50 p-3 rounded-lg">
                  <span className="font-mono font-bold text-red-600 mr-3 w-12 flex-shrink-0">
                    <InlineMath math="p_d" />
                  </span>
                  <span className="text-slate-700 text-sm">
                    <strong>采样概率 (Probability)：</strong><br />
                    表示在训练过程中，从第 <InlineMath math="d" /> 个数据集中选取样本的概率。
                  </span>
                </div>
                <div className="flex items-start bg-slate-50 p-3 rounded-lg">
                  <span className="font-mono font-bold text-blue-600 mr-3 w-12 flex-shrink-0">
                    <InlineMath math="S_d" />
                  </span>
                  <span className="text-slate-700 text-sm">
                    <strong>数据集大小 (Size)：</strong><br />
                    表示第 <InlineMath math="d" /> 个数据集中训练样本的总数量。
                  </span>
                </div>
                <div className="flex items-start bg-slate-50 p-3 rounded-lg">
                  <span className="font-mono font-bold text-green-600 mr-3 w-12 flex-shrink-0">
                    <InlineMath math="D" />
                  </span>
                  <span className="text-slate-700 text-sm">
                    <strong>数据集总数 (Total Datasets)：</strong><br />
                    参与训练的数据集总个数（在本论文中，<InlineMath math="D=13" /> 个 Held-in 数据集）。
                  </span>
                </div>
                <div className="flex items-start bg-slate-50 p-3 rounded-lg">
                  <span className="font-mono font-bold text-purple-600 mr-3 w-12 flex-shrink-0">
                    <InlineMath math="\sqrt{\cdot}" />
                  </span>
                  <span className="text-slate-700 text-sm">
                    <strong>平方根平滑 (Square Root Smoothing)：</strong><br />
                    这是公式的核心。不对 <InlineMath math="S_d" /> 直接归一化，而是取平方根。
                  </span>
                </div>
              </div>
            </div>
            
            {/* 原理解析 */}
            <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
              <h4 className="font-bold text-yellow-900 mb-4 flex items-center gap-2">
                <Lightbulb size={18} />
                原理深度解析
              </h4>
              <div className="space-y-4 text-sm text-yellow-800 leading-relaxed">
                <div>
                  <strong>为什么要取平方根？</strong><br />
                  如果直接按大小比例采样 (<InlineMath math="p_d \propto S_d" />)，大数据集会主导训练，导致模型忽略小任务。
                  如果均匀采样 (<InlineMath math="p_d = 1/D" />)，大数据集又会因为训练次数太少而欠拟合。
                </div>
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <strong>平方根的作用</strong>是一种折中方案：它降低了大数据集的权重，同时提升了小数据集的权重，但仍保持了大小有序性。
                </div>
                <hr className="border-yellow-300" />
                <div>
                  <strong>手动调整：</strong><br />
                  除了该公式，作者还进行了微调：
                  <ul className="list-disc list-inside mt-2 ml-2 space-y-1">
                    <li>降低了 <strong>A-OKVQA</strong> 的权重（因为它是多选题）。</li>
                    <li>增加了 <strong>OKVQA</strong> 的权重（因为它需要生成开放式文本）。</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 数学推导示例 */}
          <div className="bg-slate-800 text-white p-6 rounded-xl mt-6">
            <h4 className="font-bold text-blue-400 mb-4">📐 采样概率示例</h4>
            <p className="text-sm text-slate-300 mb-4">
              假设有两个数据集：Dataset A (100,000 样本) 和 Dataset B (10,000 样本)
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-700 p-4 rounded-lg">
                <p className="text-slate-400 mb-2">直接比例采样：</p>
                <p className="text-red-400">
                  <InlineMath math="p_A = \frac{100000}{110000} \approx 90.9\%" />
                </p>
                <p className="text-red-400">
                  <InlineMath math="p_B = \frac{10000}{110000} \approx 9.1\%" />
                </p>
                <p className="text-xs text-slate-500 mt-2">小数据集几乎被忽略</p>
              </div>
              <div className="bg-slate-700 p-4 rounded-lg">
                <p className="text-slate-400 mb-2">平方根采样：</p>
                <p className="text-green-400">
                  <InlineMath math="p_A = \frac{316.2}{416.4} \approx 75.9\%" />
                </p>
                <p className="text-green-400">
                  <InlineMath math="p_B = \frac{100}{416.4} \approx 24.1\%" />
                </p>
                <p className="text-xs text-slate-500 mt-2">小数据集权重显著提升</p>
              </div>
            </div>
          </div>
        </Section>

        {/* Data Strategy */}
        <Section id="data" title="4. 数据策略与指令模板" icon={Database}>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-2">数据规模</h3>
              <div className="text-4xl font-extrabold text-indigo-600 mb-2">26</div>
              <p className="text-sm text-slate-500">
                个数据集被转化为指令格式。<br />
                分为 <strong>11</strong> 个任务类别。
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 col-span-2">
              <h3 className="font-bold text-slate-800 mb-3">训练集与测试集划分 (Held-in vs Held-out)</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 bg-green-50 p-3 rounded-lg border border-green-200">
                  <span className="block text-xs font-bold text-green-700 uppercase">Held-in (训练用)</span>
                  <span className="block text-sm text-green-900 mt-1">13 个数据集，包括 MSCOCO, TextCaps, VQAv2, OKVQA 等。</span>
                </div>
                <div className="flex-1 bg-red-50 p-3 rounded-lg border border-red-200">
                  <span className="block text-xs font-bold text-red-700 uppercase">Held-out (测试泛化性)</span>
                  <span className="block text-sm text-red-900 mt-1">13 个数据集。重点测试模型在<strong>未见过的数据</strong>上的 Zero-shot 能力。</span>
                </div>
              </div>
            </div>
          </div>

          {/* 任务类别 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 mb-6">
            <h4 className="font-bold text-slate-800 mb-4">11 个任务类别</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: 'Image Captioning', icon: '📝' },
                { name: 'Visual QA', icon: '❓' },
                { name: 'Image-Text Matching', icon: '🔗' },
                { name: 'Visual Reasoning', icon: '🧠' },
                { name: 'Visual Grounding', icon: '📍' },
                { name: 'OCR', icon: '🔤' },
                { name: 'Video QA', icon: '🎬' },
                { name: 'Knowledge-based QA', icon: '📚' },
                { name: 'Visual Entailment', icon: '⚖️' },
                { name: 'Visual Dialog', icon: '💬' },
                { name: 'Scene Understanding', icon: '🌄' },
              ].map((task, idx) => (
                <div key={idx} className="bg-slate-50 p-3 rounded-lg text-center text-sm">
                  <span className="text-xl">{task.icon}</span>
                  <p className="text-slate-700 mt-1">{task.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 指令模板示例 */}
          <div className="bg-slate-800 text-slate-200 p-6 rounded-xl font-mono text-sm">
            <div className="mb-3 text-slate-400 border-b border-slate-700 pb-2">指令模板示例 (Instruction Templates)</div>
            <div className="space-y-3">
              <p><span className="text-yellow-400">&lt;Image&gt;</span> Based on the image, respond to this question with a short answer: <span className="text-green-400">&#123;Question&#125;</span>. Answer:</p>
              <p><span className="text-yellow-400">&lt;Image&gt;</span> What could have happened based on the current scene?</p>
              <p><span className="text-yellow-400">&lt;Image&gt;</span> Write a description for the photo.</p>
              <p><span className="text-yellow-400">&lt;Image&gt;</span> Describe the image in detail focusing on <span className="text-green-400">&#123;aspect&#125;</span>.</p>
            </div>
          </div>
        </Section>

        {/* Results */}
        <Section id="results" title="5. 实验结果与总结" icon={BarChart3}>
          {/* Zero-shot 性能对比 */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Zero-shot 性能对比（Held-out 数据集）</h3>
            <p className="text-slate-600 mb-4 text-sm">
              InstructBLIP 在所有 13 个 Held-out 数据集上均达到了 SOTA 性能，显著超越了 BLIP-2 和 Flamingo。
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-bold text-slate-800">模型</th>
                    <th className="px-4 py-3 text-center font-bold text-slate-800">GQA</th>
                    <th className="px-4 py-3 text-center font-bold text-slate-800">ScienceQA</th>
                    <th className="px-4 py-3 text-center font-bold text-slate-800">VizWiz</th>
                    <th className="px-4 py-3 text-center font-bold text-slate-800">iVQA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-medium text-slate-900">Flamingo-80B</td>
                    <td className="px-4 py-3 text-center text-slate-600">31.8</td>
                    <td className="px-4 py-3 text-center text-slate-600">35.2</td>
                    <td className="px-4 py-3 text-center text-slate-600">31.6</td>
                    <td className="px-4 py-3 text-center text-slate-600">32.7</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-medium text-slate-900">BLIP-2 (Vicuna-7B)</td>
                    <td className="px-4 py-3 text-center text-slate-600">38.6</td>
                    <td className="px-4 py-3 text-center text-slate-600">50.6</td>
                    <td className="px-4 py-3 text-center text-slate-600">18.3</td>
                    <td className="px-4 py-3 text-center text-slate-600">33.7</td>
                  </tr>
                  <tr className="bg-indigo-50 font-semibold">
                    <td className="px-4 py-3 text-indigo-900">InstructBLIP (Vicuna-7B)</td>
                    <td className="px-4 py-3 text-center text-indigo-700 font-bold">49.2</td>
                    <td className="px-4 py-3 text-center text-indigo-700 font-bold">60.5</td>
                    <td className="px-4 py-3 text-center text-indigo-700 font-bold">34.5</td>
                    <td className="px-4 py-3 text-center text-indigo-700 font-bold">52.2</td>
                  </tr>
                  <tr className="bg-green-50 font-semibold">
                    <td className="px-4 py-3 text-green-900">InstructBLIP (Vicuna-13B)</td>
                    <td className="px-4 py-3 text-center text-green-700 font-bold">49.5</td>
                    <td className="px-4 py-3 text-center text-green-700 font-bold">63.1</td>
                    <td className="px-4 py-3 text-center text-green-700 font-bold">33.4</td>
                    <td className="px-4 py-3 text-center text-green-700 font-bold">55.3</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 性能提升统计 */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-xl mb-6">
            <h4 className="font-bold text-xl mb-4">📈 性能提升统计</h4>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-3xl font-bold">+10.6</div>
                <div className="text-sm text-indigo-200">GQA vs BLIP-2</div>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-3xl font-bold">+9.9</div>
                <div className="text-sm text-indigo-200">ScienceQA vs BLIP-2</div>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-3xl font-bold">+16.2</div>
                <div className="text-sm text-indigo-200">VizWiz vs BLIP-2</div>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-3xl font-bold">+18.5</div>
                <div className="text-sm text-indigo-200">iVQA vs BLIP-2</div>
              </div>
            </div>
          </div>

          {/* 消融实验 */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-3">消融实验 (Ablation Study)</h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>
                    <strong>移除指令感知特征：</strong>性能显著下降，证明了让 Q-Former 理解指令对于提取正确视觉特征至关重要（例如空间推理任务）。
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>
                    <strong>移除数据平衡：</strong>导致训练不稳定，整体性能受损，证明了平方根采样策略的有效性。
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>
                    <strong>增加指令多样性：</strong>每个任务使用多个模板（而非单一模板）进一步提升泛化能力。
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-3">下游任务微调 (Finetuning)</h3>
              <p className="text-sm text-slate-600 mb-3">
                InstructBLIP 也是一个更好的权重初始化模型。在多个任务上微调后，均达到了 SOTA：
              </p>
              <ul className="text-sm text-slate-600 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">SOTA</span>
                  <span>ScienceQA: 88.5% (微调后)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">SOTA</span>
                  <span>OCR-VQA: 72.3% (微调后)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">高效</span>
                  <span>只需微调 Q-Former（188M 参数）</span>
                </li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Summary */}
        <section className="bg-slate-800 text-white p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-6 text-center">💡 核心总结</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-700 p-5 rounded-lg text-center">
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="font-bold text-indigo-400 mb-2">指令感知 Q-Former</h4>
              <p className="text-sm text-slate-300">根据任务动态提取视觉特征</p>
            </div>
            <div className="bg-slate-700 p-5 rounded-lg text-center">
              <div className="text-3xl mb-3">⚖️</div>
              <h4 className="font-bold text-indigo-400 mb-2">平衡采样策略</h4>
              <p className="text-sm text-slate-300">平方根采样解决数据不平衡</p>
            </div>
            <div className="bg-slate-700 p-5 rounded-lg text-center">
              <div className="text-3xl mb-3">🚀</div>
              <h4 className="font-bold text-indigo-400 mb-2">SOTA Zero-shot</h4>
              <p className="text-sm text-slate-300">13 个未见任务全部最优</p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="mb-4 text-white font-serif text-lg italic">"Towards General-purpose Vision-Language Models with Instruction Tuning"</p>
          <p className="text-sm">基于 InstructBLIP 原始论文 (arXiv:2305.06500v2) 整理</p>
        </div>
      </footer>

    </div>
  );
};

export default InstructBLIP;





