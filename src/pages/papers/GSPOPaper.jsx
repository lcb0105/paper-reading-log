import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, AlertTriangle, Calculator, Cpu, BarChart, Info, ArrowRight, Zap, Target, Layers, CheckCircle } from 'lucide-react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const GSPOPaper = () => {
  const [activeSection, setActiveSection] = useState('');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'motivation', 'algorithm', 'moe', 'experiments'];
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-100 pb-12">
      
      {/* 1. 固定顶部导航栏 */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-sm z-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center text-slate-600 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-medium hidden sm:inline">返回首页</span>
          </Link>
          
          <div className="font-bold text-slate-800 text-sm sm:text-base truncate max-w-[200px] sm:max-w-md">
            Group Sequence Policy Optimization
          </div>

          <div className="flex gap-1 sm:gap-2">
            {[
              { id: 'motivation', icon: AlertTriangle, label: '痛点' },
              { id: 'algorithm', icon: Calculator, label: '算法' },
              { id: 'moe', icon: Cpu, label: 'MoE' },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`p-2 rounded-md transition-all ${
                  activeSection === id 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                }`}
                title={label}
              >
                <Icon className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* 2. Header 区域 */}
      <header className="pt-24 pb-12 px-4 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-blue-200 text-sm font-bold uppercase tracking-wider mb-2">Paper Analysis</div>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-blue-700/50 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-medium tracking-wide">
              Reinforcement Learning
            </span>
            <span className="bg-blue-700/50 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-medium tracking-wide">
              LLM Scaling
            </span>
            <span className="bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-medium tracking-wide text-emerald-200">
              Qwen Team
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
            Group Sequence Policy Optimization (GSPO)
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl leading-relaxed">
            Qwen3 背后的强化学习基石：一种基于序列级重要性比率的稳定、高效 RL 算法。
          </p>
          <div className="mt-6 flex items-center text-blue-300 text-sm">
            <BookOpen className="w-4 h-4 mr-2" />
            <span>arXiv:2507.18071v2</span>
          </div>
        </div>
      </header>

      {/* 3. Main 内容区域 */}
      <main className="max-w-4xl mx-auto px-4 -mt-8 relative z-10 space-y-8">
        
        {/* Section 1: Introduction */}
        <section id="intro" className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
            <div className="bg-blue-600 w-1.5 h-8 mr-3 rounded-full"></div>
            1. 核心摘要
          </h2>
          <div className="prose prose-slate max-w-none text-slate-600">
            <p className="mb-4">
              在大型语言模型（LLM）的强化学习（RL）阶段，稳定性是扩展计算量的关键前提。现有的 SOTA 算法如 <strong>GRPO (Group Relative Policy Optimization)</strong> 在训练超大模型或处理长序列任务时，容易出现严重的<strong>模型坍塌 (Model Collapse)</strong>。
            </p>
            <p className="mb-4">
              本文提出了 <strong>GSPO</strong>。与采用"Token 级"重要性比率的 GRPO 不同，GSPO 基于<strong>序列似然 (Sequence Likelihood)</strong> 定义重要性比率，并执行<strong>序列级</strong>的截断（Clipping）、奖励和优化。
            </p>
            <div className="bg-gradient-to-br from-blue-50 to-white p-5 rounded-xl border border-blue-100">
              <strong className="text-blue-900 block mb-3 flex items-center">
                <Target className="w-4 h-4 mr-2" />
                GSPO 的主要成果
              </strong>
              <ul className="space-y-2">
                {['极大地提高了训练稳定性，解决了长文本生成的模型坍塌问题', '在 AIME\'24、LiveCodeBench 等基准测试中优于 GRPO', '完美适配 Mixture-of-Experts (MoE) 模型，无需复杂的 "Routing Replay" 策略', '是最新 Qwen3 模型性能飞跃的算法基础'].map((item, idx) => (
                  <li key={idx} className="flex items-start text-sm">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-2 shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Motivation */}
        <section id="motivation" className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
            <div className="bg-red-500 w-1.5 h-8 mr-3 rounded-full"></div>
            2. 现有问题：GRPO 为何不稳定？
          </h2>

          <h3 className="font-bold text-lg text-slate-800 mt-2 mb-3">重要性采样 (Importance Sampling) 的误用</h3>
          <p className="text-slate-600 mb-4">
            GRPO 的核心问题在于其目标函数的定义是"病态的" (ill-posed)。RL 训练通常是 Off-policy 的（数据来自旧策略 <InlineMath math="\pi_{\theta_{old}}" />），因此需要重要性采样来修正分布偏差。GRPO 在<strong>每个 Token 位置 <InlineMath math="t" /></strong> 上应用重要性权重：
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4 overflow-x-auto">
            <BlockMath math="w_{i,t}(\theta) = \frac{\pi_{\theta}(y_{i,t}|x, y_{i, < t})}{\pi_{\theta_{old}}(y_{i,t}|x, y_{i, < t})}" />
          </div>
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-8">
            <p className="text-red-800 text-sm font-medium">
              <strong>致命缺陷：</strong> 这种 Token 级的权重仅基于单个样本 <InlineMath math="y_{i,t}" />，无法真正起到分布修正的作用。相反，它引入了高方差的噪声。
            </p>
          </div>

          {/* 灾难现场：模型坍缩解析 */}
          <div className="mb-8 border-2 border-orange-200 rounded-xl overflow-hidden bg-white">
            <div className="bg-orange-50 p-4 border-b border-orange-100 flex items-center gap-3">
              <span className="text-2xl">💥</span>
              <div>
                <h3 className="font-bold text-orange-900">灾难现场：什么是"模型坍缩" (Model Collapse)?</h3>
                <p className="text-xs text-orange-700/80 mt-0.5">
                  一种不可逆的训练失败状态，通常发生在长文本 CoT 训练后期。
                </p>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* 症状 */}
              <div>
                <h4 className="font-bold text-slate-800 text-sm mb-2 flex items-center">
                  <Info className="w-4 h-4 mr-2 text-slate-400" />
                  坍缩的症状
                </h4>
                <ul className="text-sm text-slate-600 space-y-1 ml-6 list-disc">
                  <li><strong>智力清零：</strong> 模型突然开始输出无意义的乱码或无限重复特定词汇。</li>
                  <li><strong>不可逆性 (Irreversible)：</strong> 一旦发生，即使回滚到之前的 Checkpoint 或调整学习率也往往无法挽救。</li>
                </ul>
              </div>

              {/* 死亡螺旋图解 */}
              <div>
                <h4 className="font-bold text-slate-800 text-sm mb-4">GRPO 导致坍缩的"死亡螺旋"：</h4>
                <div className="flex flex-col md:flex-row items-center justify-between text-center gap-4 text-sm">
                  {[
                    { title: "1. 源头", desc: "Token 级权重引入高方差噪声", color: "bg-slate-50 border-slate-200" },
                    { title: "2. 累积", desc: "在长思维链 (CoT) 中噪声随长度指数级累积", color: "bg-slate-50 border-slate-200" },
                    { title: "3. 放大", desc: "Clipping 机制反而扭曲并放大了梯度偏差", color: "bg-slate-50 border-slate-200" },
                    { title: "4. 崩塌", desc: "模型权重被破坏，能力归零", color: "bg-red-50 border-red-200 ring-2 ring-red-100" }
                  ].map((step, i) => (
                    <React.Fragment key={i}>
                      <div className={`p-3 rounded-lg border ${step.color} flex-1`}>
                        <div className={`text-xs font-bold mb-1 uppercase tracking-wider ${i === 3 ? 'text-red-600' : 'text-slate-500'}`}>{step.title}</div>
                        <div className={`text-xs ${i === 3 ? 'text-red-700 font-bold' : 'text-slate-600'}`}>{step.desc}</div>
                      </div>
                      {i < 3 && (
                        <div className="hidden md:block text-slate-400">→</div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 深入解析：为何 Token 级权重会引入高方差噪声 */}
          <div className="mb-8 bg-red-50 rounded-xl p-6 border border-red-100">
            <h3 className="font-bold text-red-900 mb-4 flex items-center">
              <Info className="w-5 h-5 mr-2" />
              深入解析：为何 Token 级权重会引入高方差噪声？
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-red-200 text-red-700 rounded-full flex items-center justify-center font-bold text-sm">1</div>
                <div>
                  <h4 className="font-bold text-red-800 text-sm">统计学上的"单样本"失效</h4>
                  <p className="text-slate-700 text-sm mt-1">
                    重要性采样依赖于大量样本（<InlineMath math="N \gg 1" />）来平均掉方差。然而，GRPO 在每个 Token 位置 <InlineMath math="t" /> 仅基于<strong>一次采样</strong>（即生成的那个 Token <InlineMath math="y_t" />）来计算权重。单样本估计缺乏平滑机制，导致方差极大。
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-red-200 text-red-700 rounded-full flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <h4 className="font-bold text-red-800 text-sm">概率比率的剧烈波动（敏感性）</h4>
                  <p className="text-slate-700 text-sm mt-1">
                    Token 的生成概率通常极小（如 <InlineMath math="10^{-4}" /> 级别）。新策略微小的参数更新可能导致概率发生数倍变化（例如从 0.001 变到 0.005），导致权重 <InlineMath math="w_{i,t}" /> 在 0.1 到 10 甚至更大范围内剧烈跳变，让梯度像"坐过山车"一样不稳定。
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-red-200 text-red-700 rounded-full flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <h4 className="font-bold text-red-800 text-sm">MoE 模型中的"专家抖动"放大器</h4>
                  <p className="text-slate-700 text-sm mt-1">
                    这是 Qwen3 遇到的核心痛点。如果新策略在某个 Token 处激活了不同的专家（Experts），概率可能出现断崖式下跌或暴涨。这会导致权重在 <InlineMath math="10^{-5}" /> 到 <InlineMath math="10^5" /> 之间极端震荡，即便是 Clip 机制也难以消除这种破坏性梯度。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 深入解析：Clipping 副作用 */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="font-bold text-amber-900 mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              深入解析：为何 Clipping 会扭曲并放大梯度偏差？
            </h3>
            <p className="text-sm text-slate-700 mb-4">
              Clipping 机制（将比率截断在 <InlineMath math="[1-\epsilon, 1+\epsilon]" />）的设计初衷是限制更新步幅。但在 GRPO 这种 Token 级高噪声环境下，它产生了严重的副作用：
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white p-4 rounded-lg border border-amber-100 shadow-sm">
                <h4 className="font-bold text-slate-900 text-sm mb-2">1. 将"随机噪声"固化为"系统偏差"</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  想象一组均值为 0 的高频随机噪声。如果没有 Clip，它们求和后可能会相互抵消。<strong>但是 Clip 介入了：</strong> 当噪声波动超过边界时，Clip 会将其强行锁定在边界上。这实际上是<strong>有选择地</strong>保留了部分方向的梯度，将相互抵消的噪声整形成了一个<strong>指向边界方向的恒定驱动力 (Bias)</strong>。
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-amber-100 shadow-sm">
                <h4 className="font-bold text-slate-900 text-sm mb-2">2. 长序列中的"积重难返"</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  在长思维链（CoT）中，序列包含数千个 Token。如果其中 10% 的 Token 因为 MoE 抖动触发了 Clip，这意味着有几百个 Token 在同时向模型施加一个<strong>方向错误但被 Clip 锁定为最大值</strong>的梯度。这种累积的偏差远大于稀疏的真实奖励信号（Reward），最终导致优化方向与真实目标完全脱节。
                </p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-amber-100 shadow-sm">
              <h4 className="font-bold text-slate-900 text-sm mb-2">3. 致命的"双向锁定"效应</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>是的，它会频繁锁定到下边界（以及上边界）。</strong> 在 MoE 场景下，如果新策略导致某个 Token 的概率断崖式下跌（例如 <InlineMath math="10^{-2} \to 10^{-6}" />），Ratio 会接近 0。此时 Clip 机制会将其<strong>强行锁定在下边界 <InlineMath math="1-\epsilon" /></strong>。<strong>后果：</strong> 你的梯度实际上变成了一串由 <InlineMath math="\epsilon" /> 决定的常数代码（例如 <InlineMath math="[1+\epsilon, 1-\epsilon, 1+\epsilon, \dots]" />）。这就像开车时，方向盘因为路面颠簸（噪声）自己乱动，而你设定的"安全限制"（Clip）反而把这些乱动当成了你想要猛打方向盘，并把方向盘<strong>死死锁在最大转向角度上</strong>。
              </p>
            </div>
          </div>

          <p className="mt-6 text-slate-600">
            此外，奖励（Reward）是给予整个序列的，而优化却在 Token 级别进行 Off-policy 修正，导致了<strong>优化目标与奖励单元的不匹配</strong>。
          </p>
        </section>

        {/* Section 3: Algorithm */}
        <section id="algorithm" className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Zap className="w-24 h-24" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
            <div className="bg-emerald-500 w-1.5 h-8 mr-3 rounded-full"></div>
            3. 解决方案：GSPO 算法详解
          </h2>
          
          <p className="text-slate-600 mb-6">
            <strong>GRPO 与 GSPO 的核心差异正是从"Token 级别"转向了"序列级别"</strong>。这一转变不仅是重要性采样计算方式的改变，更带动了 Clip 机制和梯度计算的全局对齐。
          </p>

          {/* 核心对比表格 */}
          <div className="overflow-hidden rounded-lg border border-slate-200 mb-8">
            <table className="w-full text-sm text-left text-slate-600">
              <thead className="text-xs text-slate-700 uppercase bg-slate-100">
                <tr>
                  <th className="px-6 py-3 w-1/4">对比维度</th>
                  <th className="px-6 py-3 w-1/3 text-red-600">GRPO (Token-Level)</th>
                  <th className="px-6 py-3 w-1/3 text-emerald-600">GSPO (Sequence-Level)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="bg-white hover:bg-slate-50/50">
                  <th className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap align-top">重要性比率</th>
                  <td className="px-6 py-4 align-top">
                    <div className="mb-1 overflow-x-auto"><InlineMath math="w_{i,t} = \frac{\pi_{new}(Token)}{\pi_{old}(Token)}" /></div>
                    <span className="text-xs text-slate-500">针对每个 Token 单独计算，波动极大。</span>
                  </td>
                  <td className="px-6 py-4 bg-emerald-50/30 align-top">
                    <div className="mb-1 overflow-x-auto"><InlineMath math="s_i = (\frac{\pi_{new}(Seq)}{\pi_{old}(Seq)})^{\frac{1}{|L|}}" /></div>
                    <span className="text-xs text-emerald-700">针对整个序列计算并归一化，平滑稳定。</span>
                  </td>
                </tr>
                <tr className="bg-white hover:bg-slate-50/50">
                  <th className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap align-top">截断机制</th>
                  <td className="px-6 py-4 align-top">
                    <strong className="block mb-1">Token 级截断</strong>
                    <span className="text-xs text-slate-500">某个 Token 偏离太远即被截断，丢失信息。</span>
                  </td>
                  <td className="px-6 py-4 bg-emerald-50/30 align-top">
                    <strong className="block mb-1 text-emerald-800">序列级截断</strong>
                    <span className="text-xs text-emerald-700">允许局部 Token 波动，只要整句语义不偏离。</span>
                  </td>
                </tr>
                <tr className="bg-white hover:bg-slate-50/50">
                  <th className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap align-top">梯度权重</th>
                  <td className="px-6 py-4 align-top">
                    <strong className="block mb-1">每个 Token 权重不同</strong>
                    <span className="text-xs text-slate-500">权重 <InlineMath math="w_{i,t}" /> 随位置剧烈抖动，引入高频噪声。</span>
                  </td>
                  <td className="px-6 py-4 bg-emerald-50/30 align-top">
                    <strong className="block mb-1 text-emerald-800">整句共享统一权重</strong>
                    <span className="text-xs text-emerald-700">权重 <InlineMath math="s_i" /> 是标量，平稳缩放整个序列的梯度。</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-lg text-blue-900 mb-3">3.1 序列级重要性比率 (The Ratio)</h3>
              <p className="text-slate-600 text-sm mb-3">
                GSPO 定义的重要性比率 <InlineMath math="s_i(\theta)" /> 反映了新旧策略在生成整个序列 <InlineMath math="y_i" /> 时的似然度差异。为了数值稳定，采用了长度归一化（几何平均）：
              </p>
              <div className="bg-slate-50 border-l-4 border-blue-500 rounded-r-lg p-4 overflow-x-auto">
                <BlockMath math="s_i(\theta) = \left( \frac{\pi_{\theta}(y_i|x)}{\pi_{\theta_{old}}(y_i|x)} \right)^{\frac{1}{|y_i|}} = \exp \left( \frac{1}{|y_i|} \sum_{t=1}^{|y_i|} \log \frac{\pi_{\theta}(y_{i,t}|x, y_{i, < t})}{\pi_{\theta_{old}}(y_{i,t}|x, y_{i, < t})} \right)" />
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg text-blue-900 mb-3">3.2 GSPO 目标函数 (The Objective)</h3>
              <p className="text-slate-600 text-sm mb-3">
                基于上述比率，GSPO 的优化目标如下（类似于 PPO，但针对整个 Group 的序列）：
              </p>
              <div className="bg-slate-50 border-l-4 border-blue-500 rounded-r-lg p-4 overflow-x-auto">
                <BlockMath math="\mathcal{J}_{GSPO}(\theta) = \mathbb{E}_{x \sim \mathcal{D}, \{y_i\}_{i=1}^G \sim \pi_{\theta_{old}}(\cdot|x)} \left[ \frac{1}{G} \sum_{i=1}^G \min \left( s_i(\theta) \hat{A}_i, \text{clip}(s_i(\theta), 1-\epsilon, 1+\epsilon) \hat{A}_i \right) \right]" />
              </div>
              <ul className="list-disc list-inside mt-3 space-y-2 text-sm text-slate-700">
                <li><InlineMath math="G" />：Group Size，即对同一个问题生成的回复数量。</li>
                <li><InlineMath math="\hat{A}_i" />：基于 Group 的优势估计（标准化后的奖励）：<InlineMath math="\frac{r_i - \text{mean}(r)}{\text{std}(r)}" />。</li>
                <li><strong>关键点</strong>：Clipping 发生在序列级别。如果整个序列偏离旧策略太远，则被截断，不再通过极端的梯度更新模型。</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg text-blue-900 mb-3">3.3 梯度分析 (Gradient Analysis)</h3>
              <p className="text-slate-600 text-sm mb-4">
                对比 GSPO 和 GRPO 的梯度，可以更清晰地看到本质区别：
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                  <h4 className="font-bold text-red-800 text-sm mb-2 text-center">GRPO 梯度 (Token-level)</h4>
                  <div className="overflow-x-auto">
                    <BlockMath math="\sum_{t=1}^{|y_i|} \mathbf{w_{i,t}(\theta)} \cdot \nabla_{\theta} \log \pi_{\theta}(y_{i,t}|\dots)" />
                  </div>
                  <p className="text-xs text-red-700 mt-2">
                    <strong>不稳定性来源：</strong> 权重 <InlineMath math="w_{i,t}" /> 施加在每个 Token 内部。不同 Token 的权重波动剧烈，导致梯度方向混乱。
                  </p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                  <h4 className="font-bold text-emerald-800 text-sm mb-2 text-center">GSPO 梯度 (Sequence-level)</h4>
                  <div className="overflow-x-auto">
                    <BlockMath math="\mathbf{s_i(\theta)} \cdot \sum_{t=1}^{|y_i|} \nabla_{\theta} \log \pi_{\theta}(y_{i,t}|\dots)" />
                  </div>
                  <p className="text-xs text-emerald-700 mt-2">
                    <strong>稳定性来源：</strong> 权重 <InlineMath math="s_i(\theta)" /> 是提取到求和符号外部的。同一个序列中的所有 Token 共享相同的权重，消除了 Token 级的高方差噪声。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: MoE */}
        <section id="moe" className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
            <div className="bg-purple-500 w-1.5 h-8 mr-3 rounded-full"></div>
            4. 对混合专家模型 (MoE) 的关键意义
          </h2>
          
          <p className="text-slate-600 mb-6">
            在 MoE 模型的 RL 训练中，稳定性问题尤为突出。
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold mr-3">1</div>
              <div>
                <h4 className="font-bold text-slate-800">MoE 的"专家抖动"问题</h4>
                <p className="text-slate-600 text-sm">
                  随着策略更新，同一个输入激活的专家（Experts）会发生变化。这导致 Token 级的概率比率 <InlineMath math="w_{i,t}" /> 剧烈波动（因为分母是旧策略的概率，分子是新策略的概率，激活路径不同会导致概率差异巨大）。
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold mr-3">2</div>
              <div>
                <h4 className="font-bold text-slate-800">旧方案：Routing Replay</h4>
                <p className="text-slate-600 text-sm">
                  为了解决 GRPO 在 MoE 上的问题，之前必须使用 "Routing Replay" 技术（强制新策略复用旧策略的专家路由）。这增加了计算开销，且限制了模型探索最优路由的能力。
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-emerald-200 rounded-full flex items-center justify-center text-emerald-700 font-bold mr-3">3</div>
              <div>
                <h4 className="font-bold text-emerald-800">GSPO 的完美解决</h4>
                <p className="text-slate-600 text-sm">
                  GSPO 关注的是<strong>序列整体似然</strong>。即使个别 Token 的专家路由发生了变化，整个序列的生成概率通常也是平滑变化的。因此，GSPO <strong>彻底摒弃了 Routing Replay</strong>，不仅稳定了 MoE 训练，还允许模型充分利用其容量。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Experiments */}
        <section id="experiments" className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
            <div className="bg-indigo-500 w-1.5 h-8 mr-3 rounded-full"></div>
            5. 实验结果与结论
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="font-bold text-center text-slate-700 mb-4 flex items-center justify-center">
                <BarChart className="w-4 h-4 mr-2" />
                训练稳定性对比
              </h3>
              <div className="h-40 flex items-end justify-center space-x-4 px-4 pb-2 border-b border-slate-200">
                {/* Simulated Bars */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 bg-red-400 h-12 rounded-t relative">
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-slate-500">GRPO</span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 bg-emerald-500 h-36 rounded-t relative shadow-lg shadow-emerald-500/20">
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-slate-500">GSPO</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-center mt-2 text-slate-500">
                GSPO 在训练计算量增加时保持 Reward 稳步上升，而 GRPO 容易出现波动或坍塌。
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="font-bold text-center text-slate-700 mb-4 flex items-center justify-center">
                <Layers className="w-4 h-4 mr-2" />
                有趣的数据：Clipping Fraction
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">GRPO Clip 比例</span>
                  <span className="font-mono text-red-500">0.13%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">GSPO Clip 比例</span>
                  <span className="font-mono text-emerald-600 font-bold">15.00%</span>
                </div>
                <div className="bg-white p-3 rounded border border-slate-200 text-xs text-slate-600 mt-2">
                  <strong className="block mb-1 text-slate-800">反直觉结论：</strong>
                  尽管 GSPO 丢弃了更多数据（Clip 掉离群的序列），但效率却更高。这证明了 GRPO 保留的那些 Token 级梯度包含大量有害噪声，而 GSPO 通过严格筛选高质量的序列信号，实现了更高效的"去伪存真"。
                </div>
              </div>
            </div>
          </div>

          {/* 结论 */}
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h3 className="font-bold text-blue-900 mb-3 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              结论
            </h3>
            <p className="text-slate-700 leading-relaxed">
              GSPO 是一种基于第一性原理（重要性采样）设计的算法。它通过对齐奖励单元（序列）与优化单元（序列），消除了 GRPO 的内在不稳定性。它是 Qwen3 强大推理能力的幕后功臣，也为未来大规模 RL 训练奠定了算法基础。
            </p>
          </div>
        </section>

      </main>

      {/* 4. Footer 区域 */}
      <footer className="mt-24 border-t border-slate-200 bg-slate-800 text-slate-400 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="mb-2">基于论文: <em className="text-slate-300">Group Sequence Policy Optimization</em> (arXiv:2507.18071v2)</p>
          <p className="text-sm">Authors: Chujie Zheng, et al. (Qwen Team, Alibaba Inc.)</p>
        </div>
      </footer>
    </div>
  );
};

export default GSPOPaper;
