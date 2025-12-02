import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  Brain, 
  Target, 
  BarChart, 
  Lightbulb, 
  Layers, 
  Cpu, 
  Menu,
  X,
  Sigma,
  GraduationCap,
  CheckCircle,
  AlertTriangle,
  Zap
} from 'lucide-react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const DeepSeekMathPaper = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    { id: 'intro', title: '简介', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'pretraining', title: '数学预训练', icon: <Layers className="w-4 h-4" /> },
    { id: 'sft', title: '监督微调', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'rl-grpo', title: 'RL 与 GRPO', icon: <Brain className="w-4 h-4" /> },
    { id: 'unified', title: '统一范式', icon: <Sigma className="w-4 h-4" /> },
    { id: 'results', title: '实验结果', icon: <BarChart className="w-4 h-4" /> },
    { id: 'conclusion', title: '结论', icon: <Zap className="w-4 h-4" /> },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-purple-200">
      
      {/* 1. 固定顶部导航栏 */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 rounded-full hover:bg-slate-100 transition-colors group">
              <ArrowLeft className="w-5 h-5 text-slate-600 group-hover:text-purple-600" />
            </Link>
            <span className={`font-bold text-lg tracking-tight transition-opacity duration-300 ${
              isScrolled ? 'opacity-100 text-slate-900' : 'opacity-0 text-white'
            }`}>
              DeepSeekMath
            </span>
          </div>

          <div className="hidden md:flex gap-1 bg-slate-100/50 p-1 rounded-full backdrop-blur-sm border border-slate-200/50">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-purple-700 hover:bg-white rounded-full transition-all flex items-center gap-2"
              >
                {section.icon}
                {section.title}
              </button>
            ))}
          </div>

          <button 
            className="md:hidden p-2 text-slate-600 bg-white/50 rounded-lg backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-slate-100 p-4 md:hidden flex flex-col gap-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="w-full text-left px-4 py-3 text-sm font-medium text-slate-600 hover:bg-purple-50 hover:text-purple-700 rounded-lg flex items-center gap-3"
              >
                {section.icon}
                {section.title}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* 2. Header 区域 */}
      <header className="relative pt-32 pb-20 px-4 md:px-8 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs font-mono mb-6">
            <Cpu size={12} />
            <span>arXiv:2402.03300</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            DeepSeekMath: Pushing the Limits of Mathematical Reasoning
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            通过大规模高质量数学网络数据挖掘与创新的 GRPO 强化学习算法，将 7B 开源模型的数学推理能力推向闭源模型水平。
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10 flex flex-col items-center">
              <span className="text-2xl font-bold text-purple-300">51.7%</span>
              <span className="text-xs text-slate-400">MATH Acc (7B)</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10 flex flex-col items-center">
              <span className="text-2xl font-bold text-emerald-300">120B</span>
              <span className="text-xs text-slate-400">Math Tokens</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10 flex flex-col items-center">
              <span className="text-2xl font-bold text-sky-300">GRPO</span>
              <span className="text-xs text-slate-400">New RL Algo</span>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Main 内容区域 */}
      <main className="max-w-4xl mx-auto px-4 md:px-8 py-12 space-y-16">

        {/* Section 1: Introduction */}
        <section id="intro" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
            <h2 className="text-2xl font-bold text-slate-900">简介 (Introduction)</h2>
          </div>
          
          <p className="text-slate-600 leading-relaxed mb-6">
            DeepSeekMath 7B 是基于 DeepSeek-Coder-Base-v1.5 7B 继续预训练得到的模型。它在 Common Crawl 来源的 <strong>120B</strong> 数学相关 token 上进行了训练。
          </p>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">核心成就</h3>
            <ul className="space-y-3 text-slate-600">
              <li className="flex gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span><strong>MATH Benchmark:</strong> 获得了 <strong className="text-blue-600">51.7%</strong> 的准确率（DeepSeekMath-RL 7B），接近 Gemini-Ultra 和 GPT-4 的水平。</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span><strong>Self-Consistency:</strong> 在 64 个样本下，准确率达到 <strong className="text-blue-600">60.9%</strong>。</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <div>
                  <strong>关键驱动力:</strong>
                  <ol className="list-decimal pl-5 mt-2 space-y-1 text-sm">
                    <li>通过精心设计的数据选择流水线挖掘大规模网络数据（DeepSeekMath Corpus）。</li>
                    <li>引入 <strong>Group Relative Policy Optimization (GRPO)</strong>，一种相比 PPO 更高效的强化学习算法。</li>
                  </ol>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 2: Math Pre-training */}
        <section id="pretraining" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
            <h2 className="text-2xl font-bold text-slate-900">数学预训练 (Math Pre-training)</h2>
          </div>
          
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Target size={18} className="text-emerald-500" />
              2.1 数据收集流水线 (Iterative Pipeline)
            </h3>
            <p className="text-slate-600 mb-4">
              DeepSeekMath Corpus 包含 <strong>120B</strong> 高质量数学 token。该语料库是通过一个迭代式的流水线从 Common Crawl (CC) 中挖掘得到的。
            </p>
            <div className="relative pl-6 border-l-2 border-emerald-100 space-y-6">
              {[
                { title: "种子数据", desc: "使用 OpenWebMath 作为初始高质量种子。" },
                { title: "分类器训练", desc: "训练一个 FastText 模型来区分数学与非数学网页。" },
                { title: "召回与去重", desc: "从 Common Crawl 中召回网页，并进行去重。" },
                { title: "扩充与标注", desc: "识别包含大量数学内容的域（如 mathoverflow.net），手动标注 URL pattern，补充未被 fastText 召回的网页作为新的正样本。" },
                { title: "迭代更新", desc: "使用增强后的数据集更新 fastText 模型并重复上述过程（共迭代 4 次）。" }
              ].map((step, idx) => (
                <div key={idx} className="relative">
                  <span className="absolute -left-[29px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white shadow-sm"></span>
                  <h4 className="font-bold text-sm text-slate-900">{step.title}</h4>
                  <p className="text-sm text-slate-500">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Lightbulb size={18} className="text-amber-500" />
              2.2 预训练的关键发现 (Lessons Learnt)
            </h3>
            <p className="text-slate-600 mb-4">论文通过大量消融实验，得出了两个反直觉但重要的结论：</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-200">
                <h4 className="font-bold text-emerald-800 mb-2 flex items-center gap-2">
                  <CheckCircle size={16} />
                  代码训练有助于数学推理
                </h4>
                <p className="text-sm text-slate-600">
                  实验表明，在进行数学训练之前先进行代码训练（Code Training），或者混合代码数据训练，可以显著提升模型处理数学问题的能力。
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  这也是为什么 DeepSeekMath 选择基于 DeepSeek-Coder 初始化。
                </p>
              </div>
              <div className="bg-rose-50 p-5 rounded-xl border border-rose-200">
                <h4 className="font-bold text-rose-800 mb-2 flex items-center gap-2">
                  <AlertTriangle size={16} />
                  ArXiv 论文效果不如预期
                </h4>
                <p className="text-sm text-slate-600">
                  尽管 ArXiv 包含大量高深数学内容，但实验显示，单纯在 ArXiv 数据上训练对提升小学/竞赛级数学题（GSM8K, MATH）的推理能力效果甚微，甚至不如高质量的网络数据。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: SFT */}
        <section id="sft" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
            <h2 className="text-2xl font-bold text-slate-900">监督微调 (Supervised Fine-Tuning)</h2>
          </div>

          <p className="text-slate-600 mb-6">
            <strong>DeepSeekMath-Instruct 7B</strong> 使用了包含 Chain-of-Thought (CoT), Program-of-Thought (PoT) 和工具集成推理的混合数据进行微调。
          </p>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left">Benchmark</th>
                  <th className="px-6 py-3 text-left">DeepSeekMath-Instruct 7B</th>
                  <th className="px-6 py-3 text-left">Comparisons</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-bold text-slate-700">MATH</td>
                  <td className="px-6 py-4 text-blue-600 font-bold">46.8%</td>
                  <td className="px-6 py-4 text-slate-500">优于所有同尺寸开源模型，甚至超过 Qwen-72B (35.2%)</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-bold text-slate-700">GSM8K</td>
                  <td className="px-6 py-4 text-blue-600 font-bold">82.9%</td>
                  <td className="px-6 py-4 text-slate-500">强劲表现，但 RL 阶段提升更明显</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: RL & GRPO */}
        <section id="rl-grpo" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
            <h2 className="text-2xl font-bold text-slate-900">强化学习与 GRPO (Reinforcement Learning)</h2>
          </div>

          <p className="text-slate-600 mb-8">
            论文提出了一种名为 <strong>Group Relative Policy Optimization (GRPO)</strong> 的算法。这是一种 PPO 的变体，专门为了解决 PPO 在大语言模型推理任务中显存占用高、训练不稳定的问题。
          </p>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-8">
            <h3 className="text-xl font-bold text-purple-800 mb-4 border-b border-slate-100 pb-2">4.1 GRPO 核心原理</h3>
            
            <div className="mb-6">
              <h4 className="font-bold text-slate-800 mb-2">问题：PPO 的局限性</h4>
              <p className="text-sm text-slate-600 mb-4">
                PPO 需要训练一个与 Policy Model 等大的 Critic Model (Value Function) 来估计基线（Baseline），这导致显存和计算开销倍增。
              </p>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 overflow-x-auto">
                <p className="text-xs text-slate-500 mb-2">PPO 目标函数:</p>
                <BlockMath math="\mathcal{J}_{PPO}(\theta) = \mathbb{E}[q \sim P(Q), o \sim \pi_{\theta_{old}}(O|q)] \left[ \frac{1}{|o|} \sum_{t=1}^{|o|} \min \left( \frac{\pi_\theta(o_t | \dots)}{\pi_{\theta_{old}}(o_t | \dots)} A_t, \text{clip}(\dots) A_t \right) \right]" />
                <p className="text-xs text-slate-500 mt-2">其中 <InlineMath math="A_t" /> (优势函数) 依赖于价值函数 <InlineMath math="V_{\psi}" />。</p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-bold text-slate-800 mb-2">解决方案：GRPO</h4>
              <p className="text-sm text-slate-600 mb-4">
                GRPO <strong>摒弃了 Critic Model</strong>。它对于每一个问题 <InlineMath math="q" />，从旧策略 <InlineMath math="\pi_{\theta_{old}}" /> 中采样一组输出 <InlineMath math="\{o_1, o_2, \dots, o_G\}" />。然后通过组内分数的均值和标准差来计算基线。
              </p>
              
              <div className="bg-slate-900 text-slate-100 rounded-xl p-6 overflow-x-auto shadow-lg relative">
                <div className="absolute top-3 right-3 text-xs text-slate-500 font-mono">GRPO Objective</div>
                <BlockMath math="\mathcal{J}_{GRPO}(\theta) = \mathbb{E}_{q \sim P(Q), \{o_i\}_{i=1}^G \sim \pi_{\theta_{old}}(O|q)} \left[ \frac{1}{G} \sum_{i=1}^G \frac{1}{|o_i|} \sum_{t=1}^{|o_i|} \left\{ \min \left( \frac{\pi_\theta(o_{i,t}|\dots)}{\pi_{\theta_{old}}(o_{i,t}|\dots)} \hat{A}_{i,t}, \text{clip}(\dots) \hat{A}_{i,t} \right) - \beta \mathbb{D}_{KL}(\pi_\theta || \pi_{ref}) \right\} \right]" />
              </div>
            </div>

            {/* 深度解析 */}
            <div className="bg-amber-50 p-5 rounded-xl border border-amber-200 mb-6">
              <h5 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
                <Lightbulb size={16} />
                深度解析：为什么要对 G 求和？(<InlineMath math="\frac{1}{G}\sum" />)
              </h5>
              <p className="text-sm text-slate-700 leading-relaxed mb-3">
                在 PPO 中，我们评价一个动作好不好，是看 <InlineMath math="r - V(s)" />，其中 <InlineMath math="V(s)" /> 是 Critic 模型预测的"绝对"分数。而在 GRPO 中，我们没有 Critic 模型，所以我们采取了<strong>"相对"</strong>的评价方式：
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex gap-2">
                  <span className="text-amber-600 font-bold">1.</span>
                  <span><strong>同一问题，多次尝试：</strong> GRPO 对同一个问题 <InlineMath math="q" /> 采样 <InlineMath math="G" /> 组输出（例如 G=64）。</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-600 font-bold">2.</span>
                  <span><strong>组内平均作为 Baseline：</strong> 我们计算这组输出的平均奖励 <InlineMath math="\mu = \frac{1}{G}\sum r_i" />。</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-600 font-bold">3.</span>
                  <div>
                    <strong>优势取决于相对排名：</strong> 每个输出的优势不再是绝对值，而是它相对于这组平均值的表现：
                    <div className="bg-white p-3 rounded-lg border border-amber-100 mt-2 overflow-x-auto">
                      <BlockMath math="\hat{A}_{i} = \frac{r_i - \mu}{\sigma}" />
                    </div>
                    <p className="mt-2 text-slate-600">如果一个输出比这一组的平均水平好，它的优势就是正的（被鼓励）；如果比平均水平差，优势就是负的（被抑制）。</p>
                  </div>
                </li>
              </ul>
              <p className="text-sm text-slate-700 mt-3 font-semibold bg-white p-3 rounded-lg border border-amber-100">
                结论：公式中的 <InlineMath math="\frac{1}{G}\sum" /> 就是为了在 loss 层面平均这 G 个样本的贡献，而每个样本的优势 <InlineMath math="\hat{A}_{i,t}" /> 已经隐含了通过组内统计量（Mean/Std）计算出的 Baseline 信息。这使得 GRPO 无需 Critic 模型也能稳定训练。
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h4 className="font-bold text-indigo-700 mb-3 text-sm">优势函数 (Advantage)</h4>
                <p className="text-xs text-slate-500 mb-3">
                  基于组内奖励的相对标准化计算，如果一个输出比组内平均好，优势为正。
                </p>
                <div className="bg-white p-3 rounded-lg border border-slate-100 overflow-x-auto">
                  <BlockMath math="\hat{A}_{i,t} = \frac{r_i - \text{mean}(\{r_1, \dots, r_G\})}{\text{std}(\{r_1, \dots, r_G\})}" />
                </div>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h4 className="font-bold text-indigo-700 mb-3 text-sm">KL 散度 (Regularization)</h4>
                <p className="text-xs text-slate-500 mb-3">
                  直接在 Loss 中加入 KL 惩罚，而非 Reward 中，使用无偏估计器。
                </p>
                <div className="bg-white p-3 rounded-lg border border-slate-100 overflow-x-auto">
                  <BlockMath math="\mathbb{D}_{KL} = \frac{\pi_{ref}}{\pi_\theta} - \log \frac{\pi_{ref}}{\pi_\theta} - 1" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Unified Paradigm */}
        <section id="unified" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
            <h2 className="text-2xl font-bold text-slate-900">统一强化学习范式 (Unified Paradigm)</h2>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm mb-6">
            <div className="p-6 border-b border-slate-100">
              <p className="text-slate-600 text-sm mb-4">
                论文提出了一个统一的视角来理解 SFT, RFT (Rejection Sampling), DPO, PPO 和 GRPO。所有方法的梯度都可以统一表示为（Equation 5）：
              </p>
              <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-purple-500 overflow-x-auto">
                <BlockMath math="\nabla_\theta \mathcal{J}(\theta) = \mathbb{E}_{(q,o) \sim \mathcal{D}} \left[ \sum_{t=1}^{|o|} \text{GC}(q, o, t, \pi_{rf}) \nabla_\theta \log \pi_\theta(o_t | q, o_{<t}) \right]" />
              </div>
            </div>

            {/* Equation 5 深度拆解 */}
            <div className="p-6 bg-purple-50 border-b border-purple-100">
              <h4 className="font-bold text-purple-800 mb-4">Equation 5 深度拆解 (Deep Dive)</h4>
              <ul className="space-y-4 text-sm text-slate-700">
                <li>
                  <span className="font-bold text-slate-900">1. <InlineMath math="\nabla_\theta \mathcal{J}(\theta)" /> (梯度):</span>
                  <p className="ml-4 text-slate-600 mt-1">表示我们如何更新模型参数 θ 以最大化目标函数。</p>
                </li>
                <li>
                  <span className="font-bold text-slate-900">2. <InlineMath math="\mathbb{E}_{(q,o) \sim \mathcal{D}}" /> (数据期望):</span>
                  <div className="ml-4 text-slate-600 mt-1">
                    <p className="mb-2">数据源 <InlineMath math="\mathcal{D}" /> 是方法的第一个区别点：</p>
                    <ul className="list-disc pl-5 space-y-1 text-xs">
                      <li><strong>SFT:</strong> 来源于固定的人工标注数据集。</li>
                      <li><strong>Offline RL (RFT/DPO):</strong> 来源于从 SFT 模型采样的数据。</li>
                      <li><strong>Online RL (PPO/GRPO):</strong> 来源于从当前训练的 Policy 模型实时采样的数据（Exploration）。</li>
                    </ul>
                  </div>
                </li>
                <li>
                  <span className="font-bold text-slate-900">3. <InlineMath math="\text{GC}(q, o, t, \pi_{rf})" /> (梯度系数):</span>
                  <div className="ml-4 text-slate-600 mt-1">
                    <p className="mb-2">这是决定算法行为的<strong>核心权重</strong>，它决定了我们是"鼓励"还是"抑制"当前 Token 的生成：</p>
                    <ul className="list-disc pl-5 space-y-1 text-xs">
                      <li><strong>SFT:</strong> GC = 1。无条件鼓励所有数据（因为都是人工精选的）。</li>
                      <li><strong>RFT:</strong> GC = 1 (若答案正确), GC = 0 (若答案错误)。只学习对的，忽略错的，不进行负反馈。</li>
                      <li><strong>GRPO/PPO:</strong> GC = 优势函数 (Advantage)。如果结果比平均好，GC &gt; 0（正反馈）；如果比平均差，GC &lt; 0（负反馈）。<strong className="text-purple-700">这就是 RL 比 RFT 更高效的原因：它能从错误中学习（负反馈），并且能区分"好"和"更好"。</strong></li>
                    </ul>
                  </div>
                </li>
                <li>
                  <span className="font-bold text-slate-900">4. <InlineMath math="\nabla_\theta \log \pi_\theta" /> (策略梯度):</span>
                  <p className="ml-4 text-slate-600 mt-1">标准的对数概率梯度，用于调整神经网络权重以改变输出特定 Token 的概率。</p>
                </li>
              </ul>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-100 text-slate-500 font-medium border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3">方法</th>
                    <th className="px-6 py-3">数据来源 <InlineMath math="\mathcal{D}" /></th>
                    <th className="px-6 py-3">梯度系数 <InlineMath math="\text{GC}" /></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-bold text-slate-700">SFT</td>
                    <td className="px-6 py-4 text-slate-500">人工标注数据</td>
                    <td className="px-6 py-4 font-mono text-purple-600">1</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-bold text-slate-700">RFT / Online RFT</td>
                    <td className="px-6 py-4 text-slate-500">模型采样 (离线/在线)</td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-purple-600">𝟙(o)</span>
                      <br /><span className="text-xs text-slate-400">仅利用正确样本，无惩罚</span>
                    </td>
                  </tr>
                  <tr className="bg-purple-50/50 hover:bg-purple-50">
                    <td className="px-6 py-4 font-bold text-purple-700">GRPO (本文核心)</td>
                    <td className="px-6 py-4 text-slate-500">模型采样 (在线 Group)</td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-purple-600">Advantage + KL</span>
                      <br /><span className="text-xs text-slate-400">利用组内相对奖励，具备正负反馈</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 6: Results */}
        <section id="results" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">6</div>
            <h2 className="text-2xl font-bold text-slate-900">实验结果 (Experimental Results)</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6">MATH Benchmark (Acc %)</h3>
              <div className="space-y-4">
                {[
                  { name: "DeepSeekMath-RL", val: 51.7, color: "bg-purple-600", width: "100%" },
                  { name: "GPT-4 (Early)", val: 42.5, color: "bg-slate-400", width: "82%" },
                  { name: "Qwen-72B", val: 35.2, color: "bg-slate-300", width: "68%" },
                  { name: "Mistral-7B", val: 28.0, color: "bg-slate-200", width: "54%" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 text-sm">
                    <span className="w-32 font-medium text-slate-600">{item.name}</span>
                    <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${item.color} transition-all duration-1000 ease-out`}
                        style={{ width: item.width }}
                      ></div>
                    </div>
                    <span className="w-16 font-bold text-slate-800 text-right">{item.val}%</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4">为什么 RL 有效？</h3>
              <p className="text-sm text-slate-600 mb-4">
                论文通过对比 <strong>Pass@K</strong> (基础能力) 和 <strong>Maj@K</strong> (一致性投票) 发现：
              </p>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex gap-2">
                  <span className="text-blue-500">•</span>
                  <span>RL 主要提升了 <strong>Maj@K</strong>，而 Pass@K 提升较小。</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-500">•</span>
                  <span>这表明 RL 更多地是在<strong>对齐 (Alignment)</strong> 模型输出分布，使其更倾向于生成正确的推理路径，变得更加 Robust，而非单纯注入新知识。</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 7: Conclusion */}
        <section id="conclusion" className="scroll-mt-24 mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">7</div>
            <h2 className="text-2xl font-bold text-slate-900">结论 (Conclusion)</h2>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl">
            <p className="text-slate-700 leading-relaxed">
              DeepSeekMath 通过 <strong>大规模网络数学数据挖掘</strong> 和 <strong>GRPO 强化学习算法</strong>，将 7B 参数规模的开源模型数学能力推向了新的高度（MATH 51.7%）。这项工作证明了即使是小模型，通过高质量数据和先进的对齐算法，也能在特定领域达到甚至超越闭源大模型的水平。
            </p>
          </div>
        </section>

      </main>

      {/* 4. Footer 区域 */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="mb-4 font-medium text-slate-300">DeepSeekMath: Pushing the Limits of Mathematical Reasoning</p>
          <div className="flex justify-center gap-6 text-sm">
            <span>© DeepSeek-AI</span>
            <a href="https://arxiv.org/abs/2402.03300" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">arXiv Paper</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DeepSeekMathPaper;
