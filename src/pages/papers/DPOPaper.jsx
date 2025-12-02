import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  XCircle,
  CheckCircle,
  ArrowUpRight,
  Scale,
  Zap,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const DPOPaper = () => {
  const [activeSection, setActiveSection] = useState('intro');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'rlhf-problem', 'dpo-theory', 'algorithm', 'experiments', 'conclusion'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'intro', label: '简介与背景' },
    { id: 'rlhf-problem', label: 'RLHF 的痛点' },
    { id: 'dpo-theory', label: 'DPO 核心理论' },
    { id: 'algorithm', label: '算法与梯度' },
    { id: 'experiments', label: '实验结果' },
    { id: 'conclusion', label: '总结' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      
      {/* 固定顶部导航栏 */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-sm z-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-medium hidden sm:inline">返回首页</span>
          </Link>
          
          <div className="font-bold text-gray-800 text-sm sm:text-base flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            DPO 深度解析
          </div>

          <div className="flex gap-1">
            {navItems.slice(1, 5).map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`px-2 py-1 rounded-md transition-all text-xs hidden sm:block ${
                  activeSection === id 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        
        {/* Hero Section */}
        <section id="intro" className="mb-16 scroll-mt-28">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
            NeurIPS 2023 获奖论文
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
            直接偏好优化 (DPO)：<br/>
            <span className="text-blue-600">你的语言模型其实是一个奖励模型</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            在大型语言模型（LLM）的对齐过程中，通常使用"基于人类反馈的强化学习"（RLHF）。然而，RLHF 流程复杂且不稳定。DPO 提出了一种革命性的方法：<strong>通过一个简单的分类损失函数，直接在偏好数据上优化策略，无需训练奖励模型，也无需强化学习。</strong>
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <XCircle className="text-red-500 w-5 h-5" />
                传统 RLHF
              </h3>
              <p className="text-sm text-gray-600">
                需要训练独立的奖励模型 (Reward Model)，然后使用 PPO 等强化学习算法更新策略。过程复杂，超参数多，训练不稳定。
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-blue-200 ring-2 ring-blue-100">
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <CheckCircle className="text-green-500 w-5 h-5" />
                DPO (本文方法)
              </h3>
              <p className="text-sm text-gray-600">
                利用数学变换，将 RL 目标转化为一个关于策略的直接损失函数。如同二分类任务一样简单，稳定且高效。
              </p>
            </div>
          </div>
        </section>

        <hr className="border-gray-200 my-12" />

        {/* RLHF Background */}
        <section id="rlhf-problem" className="mb-16 scroll-mt-28">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">RLHF 的背景与痛点</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            要理解 DPO 的精妙之处，我们首先需要回顾标准的 RLHF 流程。通常包含三个阶段：
          </p>
          
          <div className="space-y-6 mb-8">
            <div className="bg-white p-5 rounded-lg border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-2">1. SFT (监督微调)</h4>
              <p className="text-gray-600 text-sm">
                在高质量指令数据集上微调预训练模型，得到 <InlineMath math="\pi^{SFT}" />。
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-lg border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-2">2. 奖励建模 (Reward Modeling)</h4>
              <p className="text-gray-600 text-sm mb-3">
                让模型生成成对的回复 <InlineMath math="(y_w, y_l)" />，人类标注哪个更好（<InlineMath math="y_w \succ y_l" />）。训练一个奖励模型 <InlineMath math="r_\phi(x,y)" /> 来预测人类偏好。通常基于 Bradley-Terry 模型：
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-x-auto">
                <BlockMath math="\mathcal{L}_R(r_\phi, \mathcal{D}) = -\mathbb{E}_{(x, y_w, y_l) \sim \mathcal{D}} [\log \sigma(r_\phi(x, y_w) - r_\phi(x, y_l))]" />
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-lg border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-2">3. RL 微调 (RL Fine-tuning)</h4>
              <p className="text-gray-600 text-sm mb-3">
                使用强化学习（如 PPO）优化语言模型策略 <InlineMath math="\pi_\theta" />，最大化奖励同时通过 KL 散度约束防止模型偏离 <InlineMath math="\pi_{ref}" />：
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-4 overflow-x-auto">
                <BlockMath math="\max_{\pi_\theta} \mathbb{E}_{x \sim \mathcal{D}, y \sim \pi_\theta(y|x)} [r_\phi(x, y)] - \beta \mathbb{D}_{KL}[\pi_\theta(y|x) || \pi_{ref}(y|x)]" />
              </div>
            </div>
          </div>
          
          <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg">
            <h4 className="font-bold text-red-800 mb-2">问题所在</h4>
            <p className="text-red-900/80 text-sm">
              第 3 步非常困难。PPO 需要采样、估计价值函数、调整许多超参数，且计算成本高昂。DPO 的核心动机就是：<strong>能不能跳过显式的奖励模型和复杂的 RL 循环？</strong>
            </p>
          </div>
        </section>

        {/* DPO Theory Section */}
        <section id="dpo-theory" className="mb-16 scroll-mt-28">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">DPO 核心理论推导</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            DPO 的推导非常优雅。它利用了 RL 目标函数存在<strong>解析解（Closed-form solution）</strong>这一性质。
          </p>
          
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="bg-slate-900 p-4 border-b border-slate-700">
              <h3 className="text-white font-mono text-lg">数学推导：从 RLHF 到 DPO</h3>
            </div>
            
            <div className="p-6 md:p-8 space-y-8">
              {/* Step 1 */}
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-4">第一步：RL 目标的解析解</h4>
                <p className="text-gray-700 mb-3">
                  对于带有 KL 约束的奖励最大化问题：
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-3 overflow-x-auto">
                  <BlockMath math="\max_{\pi} \mathbb{E}_{y \sim \pi} [r(x,y)] - \beta \mathbb{D}_{KL}[\pi(y|x) || \pi_{ref}(y|x)]" />
                </div>
                <p className="text-gray-700 mb-3">
                  我们可以证明（详见论文附录 A.1），其最优策略 <InlineMath math="\pi^*" /> 有如下形式：
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-4 overflow-x-auto">
                  <BlockMath math="\pi^*(y|x) = \frac{1}{Z(x)} \pi_{ref}(y|x) \exp\left(\frac{1}{\beta} r(x,y)\right)" />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  其中 <InlineMath math="Z(x) = \sum_y \pi_{ref}(y|x) \exp(\frac{1}{\beta} r(x,y))" /> 是配分函数（归一化常数）。
                </p>
              </div>

              {/* Step 2 */}
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-4">第二步：奖励函数的重参数化 (The Magic Step)</h4>
                <p className="text-gray-700 mb-3">
                  通常我们很难计算 <InlineMath math="Z(x)" />。但是，我们可以对上面的等式两边取对数并重新排列，将奖励函数 <InlineMath math="r(x,y)" /> 表达为最优策略 <InlineMath math="\pi^*" /> 的函数：
                </p>
                <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto text-sm">
                  <BlockMath math="\begin{aligned} \log \pi^*(y|x) &= \log \pi_{ref}(y|x) + \frac{1}{\beta} r(x,y) - \log Z(x) \\ \frac{1}{\beta} r(x,y) &= \log \frac{\pi^*(y|x)}{\pi_{ref}(y|x)} + \log Z(x) \\ r(x,y) &= \beta \log \frac{\pi^*(y|x)}{\pi_{ref}(y|x)} + \beta \log Z(x) \end{aligned}" />
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
                  <h5 className="font-bold text-amber-800 mb-2">🔑 关键洞察</h5>
                  <p className="text-amber-900/80 text-sm">
                    我们现在有了一个用策略 <InlineMath math="\pi^*" /> 来表示奖励 <InlineMath math="r" /> 的公式。这意味着我们不需要显式的 <InlineMath math="r" /> 网络，策略本身就可以看作是奖励模型！
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-4">第三步：代入偏好模型</h4>
                <p className="text-gray-700 mb-3">
                  回忆一下 Bradley-Terry 偏好模型，人类偏好 <InlineMath math="y_w" /> 优于 <InlineMath math="y_l" /> 的概率取决于奖励差值：
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-3 overflow-x-auto">
                  <BlockMath math="p^*(y_w \succ y_l | x) = \sigma(r^*(x, y_w) - r^*(x, y_l))" />
                </div>
                <p className="text-gray-700 mb-3">
                  现在，我们将第二步推导出的 <InlineMath math="r(x,y)" /> 代入这个式子。注意，当我们计算 <InlineMath math="r(x, y_w) - r(x, y_l)" /> 时，<strong>配分函数项 <InlineMath math="\beta \log Z(x)" /> 会相互抵消！</strong>
                </p>
                <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto text-sm">
                  <BlockMath math="r^*(x, y_w) - r^*(x, y_l) = \beta \log \frac{\pi^*(y_w|x)}{\pi_{ref}(y_w|x)} - \beta \log \frac{\pi^*(y_l|x)}{\pi_{ref}(y_l|x)}" />
                </div>
              </div>

              {/* Step 4 */}
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-4">第四步：最终的 DPO 目标函数</h4>
                <p className="text-gray-700 mb-4">
                  既然偏好概率可以完全用策略 <InlineMath math="\pi" /> 表示，我们就可以直接最大化偏好数据的对数似然。我们将最优策略 <InlineMath math="\pi^*" /> 替换为我们要优化的参数化策略 <InlineMath math="\pi_\theta" />，得到最终的损失函数：
                </p>
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                  <h5 className="text-blue-800 font-bold mb-3 text-center uppercase tracking-wide text-sm">DPO Loss Function</h5>
                  <div className="overflow-x-auto">
                    <BlockMath math="\mathcal{L}_{DPO}(\pi_\theta; \pi_{ref}) = -\mathbb{E}_{(x, y_w, y_l) \sim \mathcal{D}} \left[ \log \sigma \left( \beta \log \frac{\pi_\theta(y_w|x)}{\pi_{ref}(y_w|x)} - \beta \log \frac{\pi_\theta(y_l|x)}{\pi_{ref}(y_l|x)} \right) \right]" />
                  </div>
                </div>
                <p className="text-gray-700 mt-4">
                  这就是 DPO 的核心。我们通过最小化这个损失函数，等价于在训练一个满足人类偏好的最优策略，而不需要训练奖励模型，也不需要 PPO。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Algorithm & Intuition */}
        <section id="algorithm" className="mb-16 scroll-mt-28">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">DPO 的直观理解与算法</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">梯度分析：它在做什么？</h3>
              <p className="text-gray-600 mb-4">
                对 DPO 损失函数求导，我们可以看到梯度的直观含义：
              </p>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4 overflow-x-auto text-sm">
                <BlockMath math="\nabla_\theta \mathcal{L}_{DPO} = -\beta \underbrace{\sigma(\hat{r}_l - \hat{r}_w)}_{\text{权重}} [\underbrace{\nabla \log \pi(y_w|x)}_{\text{增加好回复概率}} - \underbrace{\nabla \log \pi(y_l|x)}_{\text{降低坏回复概率}}]" />
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <ArrowUpRight className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span><strong>增加 <InlineMath math="y_w" /> 的概率</strong>，同时<strong>降低 <InlineMath math="y_l" /> 的概率</strong>。</span>
                </li>
                <li className="flex items-start gap-2">
                  <Scale className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span><strong>动态权重</strong>：权重项 <InlineMath math="\sigma(\hat{r}_l - \hat{r}_w)" /> 表示"模型的错误程度"。如果模型错误地认为 <InlineMath math="y_l" /> 比 <InlineMath math="y_w" /> 好，权重会变大，梯度更新会更猛烈。</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">DPO 算法流程</h3>
              <div className="relative pl-8 border-l-2 border-blue-200 space-y-6">
                <div className="relative">
                  <span className="absolute -left-[17px] bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</span>
                  <h4 className="font-bold text-gray-900 ml-4">数据收集</h4>
                  <p className="text-sm text-gray-500 ml-4">收集偏好数据集 <InlineMath math="\mathcal{D} = \{x, y_w, y_l\}" />，这与 RLHF 所需数据完全相同。</p>
                </div>
                <div className="relative">
                  <span className="absolute -left-[17px] bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</span>
                  <h4 className="font-bold text-gray-900 ml-4">模型初始化</h4>
                  <p className="text-sm text-gray-500 ml-4">初始化策略模型 <InlineMath math="\pi_\theta" />（通常是 SFT 模型）。同时保留一份冻结的参考模型 <InlineMath math="\pi_{ref}" />。</p>
                </div>
                <div className="relative">
                  <span className="absolute -left-[17px] bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</span>
                  <h4 className="font-bold text-gray-900 ml-4">计算损失</h4>
                  <div className="text-sm text-gray-500 ml-4 mt-1">
                    对于每个 batch：
                    <ul className="list-disc pl-4 mt-1 space-y-1">
                      <li><strong><InlineMath math="\pi_\theta" /> (当前策略)</strong>：计算 forward pass 并<strong>保留梯度</strong>。</li>
                      <li><strong><InlineMath math="\pi_{ref}" /> (参考策略)</strong>：计算 forward pass，<strong>不计算梯度</strong>。它在训练中参数冻结。</li>
                      <li>代入 DPO Loss 公式计算损失。</li>
                    </ul>
                  </div>
                </div>
                <div className="relative">
                  <span className="absolute -left-[17px] bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">4</span>
                  <h4 className="font-bold text-gray-900 ml-4">反向传播</h4>
                  <p className="text-sm text-gray-500 ml-4">更新 <InlineMath math="\pi_\theta" /> 的参数。无需任何 RL 采样或价值估计。</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experiments */}
        <section id="experiments" className="mb-16 scroll-mt-28">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">实验结果：DPO 真的有效吗？</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-3 text-center">RLHF 目标优化效率</h3>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <div className="text-center mb-4">
                    <div className="text-sm font-semibold text-gray-500 mb-2">Frontier: Reward vs KL</div>
                    <p className="text-xs text-gray-400">DPO 曲线位于 PPO 之上</p>
                  </div>
                  <div className="relative w-full h-24 border-l border-b border-gray-400">
                    <div className="absolute bottom-0 left-0 w-full h-full flex items-end justify-center gap-2">
                      <div className="w-8 h-1/4 bg-red-300 rounded-t opacity-70"></div>
                      <div className="w-8 h-2/4 bg-red-300 rounded-t opacity-70"></div>
                      <div className="w-8 h-3/4 bg-red-300 rounded-t opacity-70"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-full flex items-end justify-center gap-2 ml-2">
                      <div className="w-8 h-2/4 bg-yellow-400 rounded-t opacity-90"></div>
                      <div className="w-8 h-3/4 bg-yellow-400 rounded-t opacity-90"></div>
                      <div className="w-8 h-full bg-yellow-400 rounded-t opacity-90"></div>
                    </div>
                    <div className="absolute bottom-2 left-2 flex gap-4 text-xs">
                      <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-300 rounded"></span>PPO</span>
                      <span className="flex items-center gap-1"><span className="w-3 h-3 bg-yellow-400 rounded"></span>DPO</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  <strong>情感控制任务：</strong> DPO 在相同的 KL 散度约束下，能够获得比 PPO 更高的奖励。这意味着它在优化 RLHF 目标时效率更高（Pareto Frontier 更优）。
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-3 text-center">摘要与对话任务性能</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="flex justify-between text-sm mb-1">
                      <span>DPO (Temp 0.0)</span>
                      <span className="font-bold text-green-600">61% Win Rate</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '61%'}}></div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="flex justify-between text-sm mb-1">
                      <span>PPO (Best)</span>
                      <span className="font-bold text-blue-600">57% Win Rate</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '57%'}}></div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="flex justify-between text-sm mb-1">
                      <span>SFT</span>
                      <span className="font-bold text-gray-500">~40% Win Rate</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gray-400 h-2 rounded-full" style={{width: '40%'}}></div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  <strong>TL;DR 摘要任务：</strong> DPO 在 GPT-4 评估的胜率上超过了 PPO。且 DPO 对采样温度（Temperature）更鲁棒，不易退化。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="bg-slate-900 text-white rounded-2xl p-8 mb-16 scroll-mt-28">
          <h2 className="text-2xl font-bold mb-6">总结：为什么 DPO 很重要？</h2>
          <ul className="space-y-4 text-slate-300">
            <li className="flex items-start gap-3">
              <Zap className="w-6 h-6 text-yellow-400 flex-shrink-0" />
              <span><strong className="text-white">简单性：</strong> 将复杂的 RLHF 流程简化为简单的监督学习式分类损失。不再需要训练奖励模型，不再需要 PPO 循环。</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-green-400 flex-shrink-0" />
              <span><strong className="text-white">稳定性：</strong> 避免了强化学习中常见的超参数敏感和训练不稳定的问题。</span>
            </li>
            <li className="flex items-start gap-3">
              <Cpu className="w-6 h-6 text-blue-400 flex-shrink-0" />
              <span><strong className="text-white">高效性：</strong> 训练速度更快，内存占用更低（虽然 forward pass 次数增加，但省去了生成采样和额外的价值网络）。</span>
            </li>
          </ul>
          <div className="mt-6 pt-6 border-t border-slate-700 text-sm text-slate-400 italic">
            "Your Language Model is Secretly a Reward Model." —— DPO 揭示了语言模型与奖励模型之间的对偶性，为 LLM 对齐开辟了新的范式。
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm mb-2">
            基于论文: <em className="text-gray-700">Direct Preference Optimization: Your Language Model is Secretly a Reward Model</em>
          </p>
          <p className="text-gray-400 text-xs">Rafailov et al. (Stanford) | NeurIPS 2023</p>
        </div>
      </footer>
    </div>
  );
};

export default DPOPaper;



