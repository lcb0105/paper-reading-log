import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  AlertTriangle, 
  GitMerge, 
  BarChart2, 
  Lightbulb,
  XCircle,
  CheckCircle,
  HelpCircle,
  Cpu,
  Activity,
  Repeat,
  TrendingUp,
  Users,
  Building,
  Calendar
} from 'lucide-react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const ASPOPaper = () => {
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
      const sections = ['intro', 'problem', 'method', 'gradients', 'experiments'];
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
    { id: 'intro', label: '引言与背景', icon: BookOpen },
    { id: 'problem', label: '核心问题分析', icon: AlertTriangle },
    { id: 'method', label: 'ASPO 方法详解', icon: GitMerge },
    { id: 'gradients', label: '梯度分析', icon: Activity },
    { id: 'experiments', label: '实验结果', icon: BarChart2 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      
      {/* 固定顶部导航栏 */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-sm z-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center text-slate-600 hover:text-sky-600 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-medium hidden sm:inline">返回首页</span>
          </Link>
          
          <div className="font-bold text-slate-800 text-sm sm:text-base">
            ASPO 论文详解
          </div>

          <div className="flex gap-1">
            {navItems.slice(1, 4).map(({ id, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`p-2 rounded-md transition-all ${
                  activeSection === id 
                    ? 'bg-sky-100 text-sky-700' 
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        
        {/* Header Section */}
        <header id="intro" className="mb-16 scroll-mt-28">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-sky-600 uppercase bg-sky-100 rounded-full">
            Paper Analysis
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            ASPO: Asymmetric Importance Sampling Policy Optimization
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-6">
            非对称重要性采样策略优化
          </p>
          
          <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-8 border-b pb-8 border-slate-200">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-slate-400" />
              <span>Jiakang Wang, Runze Liu, et al.</span>
            </div>
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-slate-400" />
              <span>Kuaishou Tech & Tsinghua Univ.</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Oct 2025</span>
            </div>
          </div>

          {/* 核心摘要 */}
          <div className="bg-sky-50 border-l-4 border-sky-500 p-6 rounded-r-xl">
            <h3 className="font-bold text-sky-900 mb-3 flex items-center gap-2 text-lg">
              <Lightbulb className="w-5 h-5" />
              核心摘要
            </h3>
            <p className="text-sky-900/80 leading-relaxed text-justify">
              现有的 LLM 强化学习方法（如 GRPO）直接沿用了 PPO 的 Token 级截断机制。本文发现这一机制在基于结果的强化学习（OSRL）中存在严重缺陷：<strong>正优势（Positive Advantage）样本的重要性采样（IS）比率存在错配</strong>。
            </p>
            <p className="text-sky-900/80 leading-relaxed text-justify mt-3">
              这种错配导致模型过度放大高概率 Token 的权重（导致熵崩塌和过拟合），而抑制了低概率 Token 的更新（阻碍探索）。为了解决这个问题，本文提出了 <strong>ASPO</strong>，通过简单有效的策略：<strong>反转正优势 Token 的 IS 比率</strong>，并结合软双重截断（Soft Dual-Clipping），显著提升了训练稳定性和推理性能。
            </p>
          </div>
        </header>

        {/* Problem Section */}
        <section id="problem" className="mb-16 scroll-mt-28">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-100 text-sky-600 text-sm font-bold">01</span>
            核心问题：GRPO 中的 IS 权重错配
          </h2>
          
          <p className="mb-4 text-slate-700 leading-relaxed text-lg">
            GRPO (Group Relative Policy Optimization) 是目前 LLM OSRL 的主流方法。其目标函数沿用了 PPO 的截断机制：
          </p>
          
          <div className="bg-white border border-slate-200 rounded-lg p-4 mb-6 overflow-x-auto shadow-sm">
            <BlockMath math="\mathcal{J}_{GRPO}(\theta) = \mathbb{E} \left[ \frac{1}{G} \sum_{i=1}^{G} \min \left( r_t^i \hat{A}_t^i, \text{clip}(r_t^i, 1-\epsilon, 1+\epsilon) \hat{A}_t^i \right) \right]" />
          </div>
          
          <p className="mb-4 text-slate-700 leading-relaxed">
            其中 <InlineMath math="r_t^i" /> 是重要性采样（Importance Sampling, IS）比率，用于衡量新旧策略的偏离程度：
          </p>
          
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-8 overflow-x-auto w-fit mx-auto">
            <BlockMath math="r_t^i = \frac{\pi_{\theta}(o_t^i | q, o_{<t}^i)}{\pi_{\theta_{old}}(o_t^i | q, o_{<t}^i)}" />
          </div>

          <h3 className="text-xl font-bold text-slate-800 mt-10 mb-4 flex items-center gap-2">
            深入分析：正负样本的不对称性
          </h3>
          <p className="mb-6 text-slate-700 leading-relaxed">
            论文作者指出，在 OSRL 中，IS 比率 <InlineMath math="r_t^i" /> 实际上充当了 Token 级别的<strong>训练权重</strong>。然而，PPO 的机制在处理"正优势样本"（<InlineMath math="\hat{A} > 0" />，即表现好的回答）时，权重的分配是反直觉的。
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Positive Case - Problem */}
            <div className="bg-rose-50 border-l-4 border-rose-500 p-5 rounded-r-xl">
              <h4 className="font-bold text-rose-800 mb-3 text-lg border-b border-rose-200 pb-2">
                正优势样本 (<InlineMath math="\hat{A} > 0" />)：反直觉错配
              </h4>
              <p className="text-rose-900 text-sm mb-4 font-medium">问题：奖励了"自信"，惩罚了"探索"</p>
              <ul className="space-y-3 text-rose-900/80 text-sm">
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>
                    <strong>高概率 Token (<InlineMath math="\pi_\theta \gg \pi_{old}" />)：</strong><br/>
                    <InlineMath math="r_t" /> 很大 → 权重很大。<br/>
                    即使模型已经很确定这个词了，PPO 依然给它巨大的更新步长，导致<strong>过拟合</strong>和<strong>熵崩塌</strong>。
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>
                    <strong>低概率 Token (<InlineMath math="\pi_\theta \ll \pi_{old}" />)：</strong><br/>
                    <InlineMath math="r_t" /> 很小 → 权重很小。<br/>
                    这些是模型目前还"犹豫"但实际上正确的词，PPO 却抑制了它们的学习，导致<strong>探索不足</strong>。
                  </span>
                </li>
              </ul>
            </div>

            {/* Negative Case - OK */}
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-5 rounded-r-xl">
              <h4 className="font-bold text-emerald-800 mb-3 text-lg border-b border-emerald-200 pb-2">
                负优势样本 (<InlineMath math="\hat{A} < 0" />)：符合预期
              </h4>
              <p className="text-emerald-900 text-sm mb-4 font-medium">状态：正常 (PPO 逻辑有效)</p>
              <ul className="space-y-3 text-emerald-900/80 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>
                    <strong>期望行为：</strong> 目标是降低坏 Token 的概率 (<InlineMath math="\pi_\theta < \pi_{old}" />)，因此 <InlineMath math="r_t" /> 应该<strong>变小</strong> (e.g., 1.0 → 0.5)。
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>
                    <strong>防止过度打压 (Clipping)：</strong> 如果 <InlineMath math="r_t" /> 变得<strong>过小</strong> ({'<'} <InlineMath math="1-\epsilon" />)，PPO 会进行截断。这防止了模型因为一次惩罚就彻底"封杀"该 Token，保持了策略更新的稳定性。
                  </span>
                </li>
              </ul>
            </div>
          </div>
          
          <p className="text-slate-600 italic text-center bg-slate-50 p-4 rounded-lg">
            "理想情况下，对于正样本，我们应该给那些目前信心不足（低概率）的 Token 更大的权重让其快速学会；而对已掌握的 Token 减少关注。"
          </p>
        </section>

        {/* Method Section */}
        <section id="method" className="mb-16 scroll-mt-28">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-100 text-sky-600 text-sm font-bold">02</span>
            ASPO 方法详解
          </h2>
          
          <p className="mb-6 text-slate-700 leading-relaxed text-lg">
            ASPO (Asymmetric Importance Sampling Policy Optimization) 的核心思想非常直接且优雅：<strong>非对称地处理正负样本，反转正样本的 IS 比率。</strong>
          </p>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-600">1</div>
                <h3 className="text-lg font-bold text-slate-800">Token Masking (保留原截断)</h3>
              </div>
              <p className="text-slate-600">首先，依然使用 PPO 的 <InlineMath math="\epsilon" /> 截断逻辑作为第一道防线，过滤掉那些极端的更新。</p>
            </div>

            {/* Step 2 - Core Innovation */}
            <div className="bg-sky-50 border-2 border-sky-200 rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center font-bold text-white">2</div>
                <h3 className="text-lg font-bold text-sky-800">Weight Flipping (权重反转) - 核心创新</h3>
              </div>
              <p className="text-slate-700 mb-4 leading-relaxed">
                对于正优势样本 (<InlineMath math="\hat{A}_t^i > 0" />)，ASPO 使用 IS 权重的倒数逻辑来构建新的比率 <InlineMath math="\hat{r}_t^i" />。这使得低概率 Token 获得更大的权重，高概率 Token 获得更小的权重。
              </p>
              
              <div className="bg-white border border-sky-100 rounded-lg p-4 mb-6 overflow-x-auto">
                <BlockMath math="\hat{r}_t^i = \begin{cases} r_t^i & \text{if } \hat{A}_t^i \le 0 \quad \text{(负样本保持不变)} \\ \frac{\pi_{\theta_{old}}(o_t^i | \cdot) \pi_{\theta}(o_t^i | \cdot)}{\text{sg}(\pi_{\theta}^2(o_t^i | \cdot))} & \text{if } \hat{A}_t^i > 0 \quad \text{(正样本反转)} \end{cases}" />
              </div>
              
              {/* Deep Dive Explanation */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
                <h4 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  深度解析：为什么公式设计得这么复杂？为什么不直接取倒数？
                </h4>
                <div className="text-amber-900/90 text-sm space-y-4">
                  <p>
                    这是一个非常关键的数学技巧。如果我们为了"低概率高权重"而直接取倒数 <InlineMath math="1/r = \pi_{old} / \pi" />，会发生严重的梯度错误：
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white/70 p-4 rounded border border-amber-200">
                      <span className="font-bold text-rose-600 block mb-2">❌ 错误做法：直接取倒数</span>
                      <p className="mb-1">目标：<InlineMath math="J \propto \frac{\pi_{old}}{\pi} \cdot A" /></p>
                      <p className="mb-1">梯度：<InlineMath math="\nabla J \propto -\frac{\pi_{old}}{\pi^2} \nabla \pi" /></p>
                      <p className="text-xs text-rose-700 mt-2"><strong>后果：</strong> 梯度是<strong>负的</strong>！这意味着对于好样本 (A&gt;0)，模型反而会试图<strong>降低</strong>该 Token 的概率。</p>
                    </div>
                    <div className="bg-white/70 p-4 rounded border border-amber-200">
                      <span className="font-bold text-emerald-600 block mb-2">✅ ASPO 做法：Stop Gradient</span>
                      <p className="mb-1">目标：<InlineMath math="J \propto \frac{\pi_{old} \cdot \pi}{\text{sg}(\pi^2)} \cdot A" /></p>
                      <p className="mb-1">梯度：<InlineMath math="\nabla J \propto \frac{\pi_{old}}{\text{sg}(\pi^2)} \nabla \pi" /></p>
                      <p className="text-xs text-emerald-700 mt-2"><strong>后果：</strong> 分母被锁死为常数，梯度方向由分子中的 <InlineMath math="\pi" /> 决定（正向）。最终效果：<strong>方向正确（增加概率），且数值约为 1/r（权重反转）。</strong></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-600">3</div>
                <h3 className="text-lg font-bold text-slate-800">Soft Dual-Clipping (软双重截断)</h3>
              </div>
              <p className="text-slate-700 mb-4">
                由于反转了权重，原来的极小值可能变成极大值。ASPO 引入了软截断机制（Soft Clipping），限制权重的数值范围（防止梯度爆炸），但<strong>保留梯度流</strong>（不像硬截断那样直接把梯度置零）。
              </p>
              <div className="bg-slate-50 rounded-lg p-4 overflow-x-auto text-center">
                <BlockMath math="\mathcal{L} = \text{sg}(\text{clip}(\hat{r}_t, 1-\epsilon, 1+\epsilon)) \cdot \log \pi_\theta \cdot \hat{A}_t" />
              </div>
              
              {/* Tech Insider */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-5 mt-4">
                <h4 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
                  <Cpu className="w-5 h-5" />
                  技术内幕：软截断 vs 硬截断
                </h4>
                <div className="text-purple-900/90 text-sm space-y-3">
                  <p>这个公式 <code className="bg-purple-100 px-1 rounded">sg(clip) * log_prob * A</code> 到底妙在哪里？</p>
                  <ul className="space-y-3">
                    <li>
                      <strong>硬截断 (Hard Clipping / PPO):</strong><br/>
                      公式：<InlineMath math="L = \text{clip}(r) \cdot A" /><br/>
                      <span className="text-rose-700">问题：</span> 当 r 被截断变成常数时，对常数求导结果为 <strong>0</strong>。这意味着一旦触发截断，模型就<strong>停止学习</strong>这个样本了（梯度消失）。
                    </li>
                    <li>
                      <strong>软截断 (Soft Clipping / ASPO):</strong><br/>
                      公式：<InlineMath math="L = \text{sg}(\text{clip}(r)) \cdot \log\pi \cdot A" /><br/>
                      <span className="text-emerald-700">优势：</span> <code className="bg-purple-100 px-1 rounded">log_prob</code> 提供更新方向，<code className="bg-purple-100 px-1 rounded">sg(clip)</code> 提供更新步长。即使 r 很大被截断了，它只是变成了一个固定的<strong>权重系数</strong>。模型依然会<strong>沿着正确的方向更新</strong>，只是更新力度被限制住了。
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gradient Analysis Section */}
        <section id="gradients" className="mb-16 scroll-mt-28">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-100 text-sky-600 text-sm font-bold">03</span>
            梯度视角的数学证明
          </h2>
          
          <p className="mb-6 text-slate-700 leading-relaxed text-lg">
            通过对比 GRPO 和 ASPO 的梯度公式，我们可以清楚地看到 ASPO 是如何实现"自我调节"的。
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* GRPO Gradient */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 hover:border-rose-200 transition-colors">
              <h4 className="font-bold text-slate-500 uppercase tracking-wider text-xs mb-3">GRPO Gradient</h4>
              <div className="bg-slate-50 rounded-lg p-4 mb-4 overflow-x-auto">
                <BlockMath math="\nabla_\theta \mathcal{J}_{GRPO} \propto \mathbb{E} \left[ \frac{\pi_{\theta}}{\pi_{\theta_{old}}} \nabla_\theta \log \pi_{\theta} \hat{A} \right]" />
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                注意系数 <span className="font-mono text-rose-600 bg-rose-50 px-1 rounded"><InlineMath math="\frac{\pi_{\theta}}{\pi_{\theta_{old}}}" /></span>。<br/>
                当 <InlineMath math="\pi_{\theta}" /> (当前概率) 增大时，梯度也会<strong>增大</strong>。这意味着模型会疯狂强化那些它已经很确信的 Token，导致"富者越富"的马太效应，最终熵崩塌。
              </p>
            </div>

            {/* ASPO Gradient */}
            <div className="bg-white p-6 rounded-xl border-2 border-sky-200 shadow-lg">
              <h4 className="font-bold text-sky-600 uppercase tracking-wider text-xs mb-3">ASPO Gradient</h4>
              <div className="bg-sky-50/50 rounded-lg p-4 mb-4 overflow-x-auto">
                <BlockMath math="\nabla_\theta \mathcal{J}_{ASPO} \propto \mathbb{E} \left[ \frac{\pi_{\theta_{old}}}{\pi_{\theta}} \nabla_\theta \log \pi_{\theta} \hat{A} \right]" />
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                注意系数变成了 <span className="font-mono text-sky-600 bg-sky-50 px-1 rounded"><InlineMath math="\frac{\pi_{\theta_{old}}}{\pi_{\theta}}" /></span>。<br/>
                当 <InlineMath math="\pi_{\theta}" /> 增大时，梯度会<strong>减小</strong>。这不仅防止了过拟合，还意味着当模型对某个正确答案"信心不足"时，会获得更大的梯度去学习它。这是一种自动的<strong>探索激励机制</strong>。
              </p>
            </div>
          </div>
        </section>

        {/* Experiments Section */}
        <section id="experiments" className="mb-16 scroll-mt-28">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-100 text-sky-600 text-sm font-bold">04</span>
            实验结果验证
          </h2>
          
          <p className="mb-8 text-slate-700 text-lg">
            ASPO 在数学推理（Math）和代码生成（Coding）任务上均取得了显著优于基线的效果，并且训练过程更加稳定。
          </p>

          {/* Results Table */}
          <div className="overflow-hidden border border-slate-200 rounded-xl shadow-sm mb-10">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <h3 className="font-bold text-slate-700">基准测试对比 (Average Scores)</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Method</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Math Benchmarks</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Code Benchmarks</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">DeepSeek-R1-1.5B (Base)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">46.8</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">17.0</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">DAPO (GRPO variant)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">53.5</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">26.8</td>
                  </tr>
                  <tr className="bg-sky-50/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-sky-700 flex items-center gap-2">
                      ASPO (Ours)
                      <span className="bg-sky-100 text-sky-800 text-xs px-2 py-0.5 rounded-full">SOTA</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-sky-700">59.3 <span className="text-emerald-600 text-xs ml-1">(+5.8)</span></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-sky-700">31.0 <span className="text-emerald-600 text-xs ml-1">(+4.2)</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mb-4 text-indigo-600">
                <Activity className="w-5 h-5" />
              </div>
              <h5 className="text-base font-bold text-slate-800 mb-2">训练稳定性</h5>
              <p className="text-slate-600 text-sm leading-relaxed">
                ASPO 的熵（Entropy）下降曲线非常平缓，避免了 GRPO 常见的早期模式坍塌现象，模型保持了更长时间的探索能力。
              </p>
            </div>
            <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-4 text-amber-600">
                <Repeat className="w-5 h-5" />
              </div>
              <h5 className="text-base font-bold text-slate-800 mb-2">低重复率</h5>
              <p className="text-slate-600 text-sm leading-relaxed">
                生成的重复 Token 比例显著低于 GRPO/DAPO。这证明模型没有陷入局部最优，输出更加多样化。
              </p>
            </div>
            <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mb-4 text-emerald-600">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h5 className="text-base font-bold text-slate-800 mb-2">高难度任务表现</h5>
              <p className="text-slate-600 text-sm leading-relaxed">
                在 AIME24, MATH-500 等高难度数学数据集上，ASPO 展现出了超越其他 OSRL 方法的强大推理能力。
              </p>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-slate-800 mb-6">总结</h2>
          <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
            <p className="text-slate-700 mb-4 leading-relaxed">
              ASPO 揭示了现有 OSRL 范式中一个被长期忽视的缺陷：PPO 并不适合直接用于 Token 级别的稀疏奖励场景。
            </p>
            <p className="text-slate-700 leading-relaxed font-medium">
              通过简单地<strong>反转正优势样本的重要性采样比率</strong>，ASPO 成功地将模型的注意力重新分配给了那些"有潜力但未完全掌握"的 Token，从而实现了更鲁棒、更高效的推理模型训练。
            </p>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-800 text-slate-400 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="mb-2">基于论文: <em className="text-slate-300">ASPO: Asymmetric Importance Sampling Policy Optimization</em></p>
          <p className="text-sm">Wang et al., 2025 (Kuaishou Technology & Tsinghua University)</p>
        </div>
      </footer>
    </div>
  );
};

export default ASPOPaper;



