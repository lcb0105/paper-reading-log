import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Layers, Code, Activity, ArrowLeft, Cpu, GitBranch, MessageSquare, BarChart3, Zap, Eye, Target } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

const InfoBox = ({ title, children, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-50 border-blue-200 text-blue-800",
    green: "bg-green-50 border-green-200 text-green-800",
    purple: "bg-purple-50 border-purple-200 text-purple-800",
    yellow: "bg-yellow-50 border-yellow-200 text-yellow-800",
    red: "bg-red-50 border-red-200 text-red-800",
    teal: "bg-teal-50 border-teal-200 text-teal-800",
    indigo: "bg-indigo-50 border-indigo-200 text-indigo-800",
    pink: "bg-pink-50 border-pink-200 text-pink-800",
  };
  return (
    <div className={`p-4 rounded-lg border ${colors[color]} my-4`}>
      {title && <strong className="block mb-2">{title}</strong>}
      <div className="text-sm">{children}</div>
    </div>
  );
};

const Section = ({ id, children }) => (
  <section id={id} className="scroll-mt-8 mb-16">
    {children}
  </section>
);

export default function AttentionResiduals() {
  const [activeSection, setActiveSection] = useState('abstract');

  const navItems = [
    { id: 'abstract', label: '摘要', icon: BookOpen },
    { id: 'intro', label: '1. 引言', icon: MessageSquare },
    { id: 'motivation', label: '2. 动机', icon: GitBranch },
    { id: 'attn-res', label: '3. 注意力残差机制', icon: Layers },
    { id: 'infrastructure', label: '4. 基础设施设计', icon: Cpu },
    { id: 'experiments', label: '5. 实验结果', icon: BarChart3 },
    { id: 'analysis', label: '5.4 分析', icon: Eye },
    { id: 'discussions', label: '6. 讨论', icon: Code },
    { id: 'appendix', label: '附录: I/O 优化', icon: Activity },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPos = window.scrollY + 150;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Link to="/" className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-lg text-gray-600 hover:text-blue-600 transition-colors border border-gray-200 shadow-sm">
          <ArrowLeft size={16} />
          返回
        </Link>
      </div>

      <aside className="hidden md:block fixed left-0 top-0 w-64 h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white overflow-y-auto z-40">
        <div className="p-6 border-b border-slate-700">
          <Link to="/" className="text-slate-400 hover:text-white text-sm flex items-center gap-1 mb-3 transition-colors">
            <ArrowLeft size={14} />
            返回首页
          </Link>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
            Attention Residuals
          </h1>
          <p className="text-xs text-slate-400 mt-2">Kimi Team · arXiv 2603.15031</p>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                activeSection === item.id
                  ? 'bg-blue-600/30 text-blue-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <div className="md:ml-64">
        <div className="max-w-4xl mx-auto px-6 py-12">

          {/* Header */}
          <header className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              <Layers size={14} /> Kimi Team · March 2026
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Attention Residuals</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-4">
              用基于 Softmax 的深度注意力机制取代固定权重的残差累加，选择性聚合前序层表示
            </p>
            <a href="https://github.com/MoonshotAI/Attention-Residuals" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-700 hover:bg-slate-100 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
              GitHub 仓库
            </a>
          </header>

          {/* ==================== Abstract ==================== */}
          <Section id="abstract">
            <InfoBox title="摘要 (Abstract)" color="blue">
              <p className="mb-3">
                在现代大语言模型中，结合 PreNorm 的残差连接已成为标准配置。然而，它们通过<strong>固定的单位权重</strong>累加所有层的输出，导致隐藏状态随深度以 <InlineMath math="\mathcal{O}(L)" /> 增长，逐渐稀释每一层的相对贡献。
              </p>
              <p className="mb-3">
                我们提出<strong>注意力残差（Attention Residuals, AttnRes）</strong>，用基于 Softmax 的注意力机制取代固定累加。为大规模训练引入<strong>块注意力残差（Block AttnRes）</strong>，将内存和通信从 <InlineMath math="\mathcal{O}(Ld)" /> 降至 <InlineMath math="\mathcal{O}(Nd)" />。
              </p>
              <p>
                集成到 Kimi Linear 架构（48B 总参 / 3B 激活）并在 1.4T tokens 上预训练，AttnRes 缓解了 PreNorm 稀释问题，在<strong>所有评测任务</strong>上均优于基线。推理延迟开销 &lt;2%。
              </p>
            </InfoBox>

            {/* Contributions */}
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Layers size={18} className="text-blue-600" />
                  <h4 className="font-bold text-blue-800 text-sm">注意力残差</h4>
                </div>
                <p className="text-xs text-blue-700">Full AttnRes + Block AttnRes。统一结构化矩阵分析：标准残差 = 深度线性注意力，AttnRes = 深度 Softmax 注意力。</p>
              </div>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu size={18} className="text-green-600" />
                  <h4 className="font-bold text-green-800 text-sm">规模化基础设施</h4>
                </div>
                <p className="text-xs text-green-700">跨阶段缓存消除冗余传输 + 两阶段推理策略 + 在线 Softmax 合并。训练开销 &lt;4%，推理延迟 &lt;2%。</p>
              </div>
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 size={18} className="text-purple-600" />
                  <h4 className="font-bold text-purple-800 text-sm">全面评测</h4>
                </div>
                <p className="text-xs text-purple-700">Scaling Laws + 48B 模型下游基准 + 训练动态分析（幅度有界、梯度均匀、GPQA-Diamond +7.5）。</p>
              </div>
            </div>
          </Section>

          {/* ==================== Introduction ==================== */}
          <Section id="intro">
            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-2 mb-6">1. 引言 (Introduction)</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              标准的残差连接 <InlineMath math="h_l = h_{l-1} + f_{l-1}(h_{l-1})" /> 是现代 LLMs 的核心构建块。它通常被理解为一条<strong>梯度高速公路（Gradient Highway）</strong>，让梯度无损穿过变换层。然而，残差机制还扮演着一个鲜被关注的第二个角色：<strong>决定信息在深度上的聚合方式</strong>。
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              展开递推式可知，每层收到的是之前所有层输出的<strong>均匀加权求和</strong>。与序列混合和专家路由已引入可学习权重不同，这种深度方向的聚合仍由<strong>固定单位权重</strong>控制，没有选择性强调或抑制个别层贡献的机制。
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              实践中 PreNorm 已成主流范式，但其不加权的累加导致隐藏状态幅度随深度以 <InlineMath math="\mathcal{O}(L)" /> 增长，逐渐稀释每层的相对贡献。早期层的信息被埋没、无法选择性检索；实验表明相当比例的层可以被剪枝而损失极小。
            </p>

            <InfoBox title="核心洞察：线性注意力 → Softmax 注意力" color="purple">
              <p className="mb-2">
                我们观察到深度方向的信息累加与 RNN 在时间维度上的循环存在<strong>形式上的对偶性</strong>。
              </p>
              <p className="mb-2">
                标准残差连接及之前所有基于递推的变体（Highway、(m)HC 等）本质上都是<strong>深度方向的线性注意力</strong>；AttnRes 将其推广为<strong>深度方向的 Softmax 注意力</strong>——完成了在序列维度上已被证明具有变革性的"线性→Softmax"转变。
              </p>
              <p>
                AttnRes 用 <InlineMath math="h_l = \sum_i \alpha_{i \rightarrow l} \cdot v_i" /> 取代 <InlineMath math="h_l = \sum_i v_i" />，其中 <InlineMath math="\alpha_{i \rightarrow l}" /> 通过每层一个可学习伪查询 <InlineMath math="w_l \in \mathbb{R}^d" /> 计算。
              </p>
            </InfoBox>
          </Section>

          {/* ==================== Motivation ==================== */}
          <Section id="motivation">
            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-2 mb-6">2. 动机 (Motivation)</h2>

            <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-4">2.1 通过残差训练深度网络</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              残差学习允许梯度绕过层变换。具体来说，每一层更新隐藏状态：
            </p>
            <div className="my-6 p-4 bg-slate-100 rounded-lg overflow-x-auto">
              <BlockMath math="h_l = h_{l-1} + f_{l-1}(h_{l-1})" />
            </div>
            <p className="text-slate-700 leading-relaxed mb-4">
              展开递归式：<InlineMath math="h_l = h_1 + \sum_{i=1}^{l-1}f_i(h_i)" />。反向传播时，梯度为：
            </p>
            <div className="my-6 p-4 bg-slate-100 rounded-lg overflow-x-auto">
              <BlockMath math="\frac{\partial\mathcal{L}}{\partial h_l} = \frac{\partial\mathcal{L}}{\partial h_L} \cdot \prod_{j=l}^{L-1}\left(I + \frac{\partial f_j}{\partial h_j}\right)" />
            </div>
            <p className="text-slate-700 leading-relaxed mb-4">
              展开乘积后得到 <InlineMath math="I" /> 加上涉及层 Jacobian <InlineMath math="\partial f_j / \partial h_j" /> 的高阶项。单位矩阵始终保留，无论深度如何都提供直接的梯度路径。
            </p>

            {/* ===== PreNorm Dilution Deep Dive ===== */}
            <h3 className="text-xl font-semibold text-slate-800 mt-10 mb-4">2.2 PreNorm 稀释问题：为什么早期层信息会被埋没？</h3>

            <p className="text-slate-700 leading-relaxed mb-4">
              要理解这个问题，我们需要区分两种 Norm 放置方式，以及<strong>"残差流"本身</strong>发生了什么。
            </p>

            <div className="grid md:grid-cols-2 gap-4 my-6">
              <div className="p-5 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-bold text-red-800 mb-2">PostNorm（已被淘汰）</h4>
                <p className="text-sm text-red-700 mb-2">
                  <InlineMath math="h_l = \text{Norm}(h_{l-1} + f_{l-1}(h_{l-1}))" />
                </p>
                <p className="text-sm text-red-700">对残差流做 Norm → 幅度有界，但<strong>梯度经过反复 Norm 压缩后消失</strong>，深层网络无法训练。</p>
              </div>
              <div className="p-5 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-bold text-blue-800 mb-2">PreNorm（现代主流）</h4>
                <p className="text-sm text-blue-700 mb-2">
                  <InlineMath math="h_l = h_{l-1} + f_{l-1}(\text{Norm}(h_{l-1}))" />
                </p>
                <p className="text-sm text-blue-700">只对层输入做 Norm → 梯度高速公路畅通，但<strong>残差流本身不受约束</strong>，幅度失控增长。</p>
              </div>
            </div>

            <InfoBox title="直觉：PreNorm 下残差流就像一个「只进不出」的蓄水池" color="yellow">
              <p className="mb-3">
                PreNorm 的关键在于：<InlineMath math="\text{Norm}" /> 作用在层的<strong>输入端</strong>，而<strong>不是</strong>残差流上。这意味着残差流 <InlineMath math="h_l" /> 本身不受任何归一化约束，每一层都在往这个"池子"里不停倒水，但从不把水舀出来。
              </p>
              <p>
                想象你有一个水桶（残差流）。每层网络往里面倒入一杯水（<InlineMath math="f_l" /> 的输出）。第 1 层倒完后桶里有 1 杯水；第 100 层倒完后桶里有 100 杯水。<strong>但第 1 层那杯水还在桶里，只是被稀释到了 1/100。</strong>
              </p>
            </InfoBox>

            <h4 className="text-lg font-semibold text-slate-800 mt-8 mb-3">数学推导：为什么幅度以 O(L) 增长？</h4>
            <p className="text-slate-700 leading-relaxed mb-4">
              展开残差递推：
            </p>
            <div className="my-6 p-4 bg-slate-100 rounded-lg overflow-x-auto">
              <BlockMath math="h_l = \underbrace{h_1}_{\text{词嵌入}} + \underbrace{f_1(h_1)}_{\text{第 1 层输出}} + \underbrace{f_2(h_2)}_{\text{第 2 层输出}} + \cdots + \underbrace{f_{l-1}(h_{l-1})}_{\text{第 } l{-}1 \text{ 层输出}}" />
            </div>
            <p className="text-slate-700 leading-relaxed mb-4">
              关键观察：在 PreNorm 下，<InlineMath math="f_i" /> 的输入是 <InlineMath math="\text{Norm}(h_i)" />，其幅度被归一化到了常数量级。因此 <InlineMath math="f_i" /> 的输出幅度也大致恒定，记为 <InlineMath math="c" />。
            </p>

            <div className="my-6 p-5 bg-indigo-50 border border-indigo-200 rounded-lg">
              <h4 className="font-bold text-indigo-800 mb-3">逐层追踪（假设 <InlineMath math="\|f_i\| \approx c" />）</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-indigo-700">
                      <th className="py-2 px-3 text-left font-semibold">层数 <InlineMath math="l" /></th>
                      <th className="py-2 px-3 text-left font-semibold">残差流 <InlineMath math="\|h_l\|" /></th>
                      <th className="py-2 px-3 text-left font-semibold">新增贡献 <InlineMath math="\|f_l\|" /></th>
                      <th className="py-2 px-3 text-left font-semibold">第 1 层的相对贡献</th>
                    </tr>
                  </thead>
                  <tbody className="text-indigo-700">
                    <tr><td className="py-1.5 px-3 border-t border-indigo-100">1</td><td className="py-1.5 px-3 border-t border-indigo-100">~c</td><td className="py-1.5 px-3 border-t border-indigo-100">c</td><td className="py-1.5 px-3 border-t border-indigo-100 font-bold">100%</td></tr>
                    <tr><td className="py-1.5 px-3 border-t border-indigo-100">10</td><td className="py-1.5 px-3 border-t border-indigo-100">~10c</td><td className="py-1.5 px-3 border-t border-indigo-100">c</td><td className="py-1.5 px-3 border-t border-indigo-100">10%</td></tr>
                    <tr><td className="py-1.5 px-3 border-t border-indigo-100">50</td><td className="py-1.5 px-3 border-t border-indigo-100">~50c</td><td className="py-1.5 px-3 border-t border-indigo-100">c</td><td className="py-1.5 px-3 border-t border-indigo-100">2%</td></tr>
                    <tr className="font-bold"><td className="py-1.5 px-3 border-t border-indigo-100">128</td><td className="py-1.5 px-3 border-t border-indigo-100">~128c</td><td className="py-1.5 px-3 border-t border-indigo-100">c</td><td className="py-1.5 px-3 border-t border-indigo-100 text-red-600">&lt;1%</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-indigo-600">
                第 1 层的输出 <InlineMath math="f_1(h_1)" /> 始终留在残差流中，但它只占总幅度的 <InlineMath math="c / (l \cdot c) = 1/l" />——在 128 层网络中不到 1%。
              </p>
            </div>

            <h4 className="text-lg font-semibold text-slate-800 mt-8 mb-3">两难困境：深层如何发出声音？</h4>
            <p className="text-slate-700 leading-relaxed mb-4">
              这引发了一个更深层的问题。到了第 100 层，残差流 <InlineMath math="\|h_{100}\| \approx 100c" />。但 <InlineMath math="f_{100}" /> 的输入是 <InlineMath math="\text{Norm}(h_{100})" />，幅度被压回常数。<strong>所以 <InlineMath math="f_{100}" /> 的输出幅度也只有 <InlineMath math="c" /></strong>——它要把自己的 <InlineMath math="c" /> 加到一个已经 <InlineMath math="100c" /> 大的残差流里：
            </p>
            <div className="my-6 p-4 bg-red-50 border border-red-200 rounded-lg overflow-x-auto">
              <BlockMath math="\frac{\|f_{100}\|}{\|h_{100}\|} \approx \frac{c}{100c} = 1\%" />
            </div>
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>深层网络越深，每一层对残差流的边际影响就越小。</strong>这就解释了为什么实验中可以把相当比例的深层直接剪掉而模型性能几乎不受影响——它们的输出本来就被"淹没"在了巨大的残差流中。
            </p>

            <h4 className="text-lg font-semibold text-slate-800 mt-8 mb-3">核心问题：为什么权重全是 1 不行？</h4>
            <p className="text-slate-700 leading-relaxed mb-4">
              标准残差 <InlineMath math="h_l = \sum_{i} 1 \cdot v_i" /> 中，所有层输出的权重固定为 1。让我们看看这带来了什么问题：
            </p>

            <div className="space-y-4 my-6">
              <div className="p-5 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-bold text-yellow-800 mb-3">问题 ①：无法选择性检索</h4>
                <p className="text-sm text-yellow-700 mb-2">
                  假设第 3 层学会了一个关键的语法特征，第 50 层需要用它来做长距离依赖判断。但 <InlineMath math="h_{50}" /> 是前 49 层输出的等权求和——第 3 层的信号被其他 48 层的信号"稀释"了。第 50 层没有任何机制说"我只想要第 3 层的输出"。
                </p>
                <p className="text-sm text-yellow-700">
                  <strong>类比</strong>：这就像你在一个会议室里，50 个人同时说话，你想听第 3 个人说了什么，但所有声音以相同音量混在了一起。
                </p>
              </div>

              <div className="p-5 bg-orange-50 border border-orange-200 rounded-lg">
                <h4 className="font-bold text-orange-800 mb-3">问题 ②：不同层类型需要不同的聚合</h4>
                <p className="text-sm text-orange-700 mb-2">
                  Transformer 中 Attention 层和 MLP 层功能迥异：Attention 负责跨位置路由信息，MLP 负责局部特征变换。但标准残差下，Pre-Attention 和 Pre-MLP 层接收的是<strong>完全相同的</strong> <InlineMath math="h_{l-1}" />。
                </p>
                <p className="text-sm text-orange-700">
                  论文的实验验证了这一直觉（§5.4.2）：学习到的 AttnRes 权重显示 Pre-Attention 层维持<strong>更宽的深度感受野</strong>（需要跨层信息），而 Pre-MLP 层更<strong>依赖近期层输出</strong>（局部处理）。
                </p>
              </div>

              <div className="p-5 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-bold text-red-800 mb-3">问题 ③：信息丢失不可逆</h4>
                <p className="text-sm text-red-700 mb-2">
                  假设第 5 层的输出包含重要的细节信息，但第 6-20 层的累加恰好在某些维度上把它"抵消"了。到第 21 层，这个信息已经永久丢失，因为 <InlineMath math="h_{21}" /> 只是所有输出的固定求和——<strong>没有任何方式可以单独"取出"第 5 层的贡献</strong>。
                </p>
                <p className="text-sm text-red-700">
                  <strong>对比 AttnRes</strong>：<InlineMath math="h_{21} = \sum_i \alpha_{i \rightarrow 21} \cdot v_i" /> 中，模型可以给第 5 层分配高权重 <InlineMath math="\alpha_{5 \rightarrow 21} \gg 0" />，直接从 <InlineMath math="v_5 = f_5(h_5)" /> 中检索信息，绕过中间层的"污染"。
                </p>
              </div>
            </div>

            <InfoBox title="为什么 AttnRes 的加权求和能解决这些问题？" color="green">
              <p className="mb-3">对比两种聚合方式处理第 <InlineMath math="l" /> 层输入的区别：</p>
              <div className="overflow-x-auto mb-3">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-green-800">
                      <th className="py-2 px-3 text-left font-semibold border-b border-green-200"></th>
                      <th className="py-2 px-3 text-left font-semibold border-b border-green-200">标准残差（权重=1）</th>
                      <th className="py-2 px-3 text-left font-semibold border-b border-green-200">AttnRes（学习权重）</th>
                    </tr>
                  </thead>
                  <tbody className="text-green-700">
                    <tr>
                      <td className="py-2 px-3 border-b border-green-100 font-semibold">公式</td>
                      <td className="py-2 px-3 border-b border-green-100"><InlineMath math="h_l = \sum_i v_i" /></td>
                      <td className="py-2 px-3 border-b border-green-100"><InlineMath math="h_l = \sum_i \alpha_{i \rightarrow l} v_i" /></td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 border-b border-green-100 font-semibold">幅度控制</td>
                      <td className="py-2 px-3 border-b border-green-100">∥h_l∥ ∝ l（失控增长）</td>
                      <td className="py-2 px-3 border-b border-green-100">∥h_l∥ 有界（∑α=1 归一化）</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 border-b border-green-100 font-semibold">选择性</td>
                      <td className="py-2 px-3 border-b border-green-100">不可能——所有层等权</td>
                      <td className="py-2 px-3 border-b border-green-100">可以聚焦到任意源层</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 border-b border-green-100 font-semibold">输入依赖</td>
                      <td className="py-2 px-3 border-b border-green-100">无——固定权重</td>
                      <td className="py-2 px-3 border-b border-green-100">有——不同 token 可分配不同权重</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-semibold">词嵌入保护</td>
                      <td className="py-2 px-3">被 L 层输出淹没</td>
                      <td className="py-2 px-3">可持续分配高权重（实验验证）</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs">
                关键差异在于 <InlineMath math="\sum_i \alpha_{i \rightarrow l} = 1" /> 的 Softmax 归一化。这不仅控制了幅度增长，还引入了<strong>竞争性选择</strong>：权重总和为 1 意味着给某层更多权重必然压低其他层——这迫使模型学会"每层到底需要什么信息"。
              </p>
            </InfoBox>

            <h3 className="text-xl font-semibold text-slate-800 mt-10 mb-4">2.3 广义残差与 Highway 网络</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Highway Networks 引入了逐元素门控来实现自适应深度混合：
            </p>
            <div className="my-6 p-4 bg-slate-100 rounded-lg overflow-x-auto">
              <BlockMath math="h_l = (1-g_l) \odot h_{l-1} + g_l \odot f_{l-1}(h_{l-1})" />
            </div>

            <InfoBox title="统一递推形式" color="teal">
              <p className="mb-2">两者都是加权递推 <InlineMath math="h_l = \alpha_l \cdot h_{l-1} + \beta_l \cdot f_{l-1}(h_{l-1})" /> 的实例：</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>标准残差</strong>：<InlineMath math="\alpha_l = \beta_l = 1" /></li>
                <li><strong>Highway</strong>：<InlineMath math="\alpha_l = 1 - g_l, \quad \beta_l = g_l" /></li>
              </ul>
            </InfoBox>

            <InfoBox title="共同的根本缺陷" color="red">
              <p className="mb-2">不管是固定残差还是 Highway，每一层只能访问其<strong>直接前驱 <InlineMath math="h_{l-1}" /></strong>——这是将之前所有层输出强行压缩在一起的结果：</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li><strong>无选择性访问</strong>：不同类型的层（Attention vs MLP）接收相同的聚合状态，尽管可能需要不同的加权</li>
                <li><strong>不可逆信息丢失</strong>：聚合中丢失的信息在更深层无法选择性恢复</li>
                <li><strong>输出幅度膨胀</strong>：较深层必须学习越来越大的输出值才能在累加残差中获得影响力，可能导致训练不稳定</li>
              </ul>
            </InfoBox>
          </Section>

          {/* ==================== Attention Residuals ==================== */}
          <Section id="attn-res">
            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-2 mb-6">3. 注意力残差：时间与深度的统一</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              如同 Transformer 用注意力机制取代 RNN 解决了序列建模瓶颈，我们提出了针对<strong>深度</strong>维度的注意力机制：
            </p>
            <div className="my-6 p-4 bg-blue-50 border border-blue-200 rounded-lg overflow-x-auto">
              <BlockMath math="h_l = \alpha_{0\rightarrow l} \cdot h_1 + \sum_{i=1}^{l-1}\alpha_{i\rightarrow l} \cdot f_i(h_i), \quad \sum_{i=0}^{l-1}\alpha_{i\rightarrow l} = 1" />
            </div>
            <p className="text-slate-700 leading-relaxed mb-4">
              与可达数百万 Token 的序列长度不同，网络深度通常很浅（<InlineMath math="L < 1000" />），因此在深度维度上执行 <InlineMath math="\mathcal{O}(L^2)" /> 的注意力计算完全可行。
            </p>

            {/* Full AttnRes */}
            <h3 className="text-xl font-semibold text-slate-800 mt-10 mb-4" id="full-attn-res">3.1 全注意力残差 (Full Attention Residuals)</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              定义核函数 <InlineMath math="\phi(q, k) = \exp(q^\top \text{RMSNorm}(k))" />。对于每一层 <InlineMath math="l" />：
            </p>
            <div className="my-6 p-4 bg-slate-100 rounded-lg overflow-x-auto space-y-2">
              <BlockMath math="q_l = w_l, \quad k_i = v_i = \begin{cases} h_1 & i=0 \\ f_i(h_i) & 1\le i\le l-1 \end{cases}" />
              <BlockMath math="\alpha_{i\rightarrow l} = \frac{\phi(q_l,k_i)}{\sum_{j=0}^{l-1}\phi(q_l,k_j)}, \quad h_l = \sum_{i=0}^{l-1}\alpha_{i\rightarrow l} \cdot v_i" />
            </div>

            <InfoBox title="关键设计决策" color="purple">
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>伪查询 <InlineMath math="w_l" /> 与前向计算解耦</strong>：是可学习参数而非输入的函数。这意味着任意一组层的注意力权重可以并行计算而无需等待其顺序输出——这正是两阶段推理优化的基础。</li>
                <li><strong>RMSNorm 作用于 Keys</strong>：防止输出幅度极大的层主导 Softmax 权重。对 Block AttnRes 更为关键，因为块级表示累加了更多层的输出，幅度差异更大。</li>
                <li><strong>初始化 <InlineMath math="w_l = 0" /></strong>：确保初始注意力权重 <InlineMath math="\alpha_{i \rightarrow l}" /> 在所有源层上均匀分布，使 AttnRes 在训练开始时退化为等权平均，防止训练波动。</li>
              </ul>
            </InfoBox>

            <p className="text-slate-700 leading-relaxed mb-4 mt-6">
              <strong>开销分析</strong>：Full AttnRes 需要 <InlineMath math="\mathcal{O}(L^2d)" /> 算术运算和 <InlineMath math="\mathcal{O}(Ld)" /> 内存来存储层输出。<InlineMath math="\mathcal{O}(Ld)" /> 内存与反向传播已保留的激活完全重叠，因此在普通训练中<strong>无额外内存开销</strong>。但在大规模训练中使用激活重计算和流水线并行时，这些激活必须显式保留和跨阶段传输，此时内存和通信开销增长为 <InlineMath math="\mathcal{O}(Ld)" />。
            </p>

            {/* Block AttnRes */}
            <h3 className="text-xl font-semibold text-slate-800 mt-10 mb-4" id="block-attn-res">3.2 块注意力残差 (Block Attention Residuals)</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              将 <InlineMath math="L" /> 层划分为 <InlineMath math="N" /> 个块，每块大小 <InlineMath math="S = L/N" />。块内使用标准残差累加为单个表示，块间应用 Full Attention。
            </p>

            <div className="grid md:grid-cols-2 gap-4 my-6">
              <InfoBox title="块内累加 (Intra-Block)" color="green">
                <BlockMath math="b_n = \sum_{j\in\mathcal{B}_n}f_j(h_j)" />
                <p className="mt-2"><InlineMath math="b_n^i" /> 为块内前 <InlineMath math="i" /> 层的偏和。<InlineMath math="b_0 = h_1" /> 是词嵌入（始终作为源保留）。</p>
              </InfoBox>
              <InfoBox title="块间注意力 (Inter-Block)" color="teal">
                <BlockMath math="V = \begin{cases} [b_0, ..., b_{n-1}]^\top & i=1 \\ [b_0, ..., b_{n-1}, b_n^{i-1}]^\top & i\ge2 \end{cases}" />
                <p className="mt-2">内存 <InlineMath math="\mathcal{O}(L) \rightarrow \mathcal{O}(N)" />，计算 <InlineMath math="\mathcal{O}(L^2) \rightarrow \mathcal{O}(N^2)" />。</p>
              </InfoBox>
            </div>

            <InfoBox title="N 的插值效果" color="indigo">
              <ul className="list-disc pl-5 space-y-1">
                <li><InlineMath math="N = L" />：恢复 Full AttnRes</li>
                <li><InlineMath math="N = 1" />：退化为标准残差（词嵌入被隔离为 <InlineMath math="b_0" />）</li>
                <li><InlineMath math="N \approx 8" />：经验表明能恢复绝大部分收益</li>
              </ul>
            </InfoBox>

            {/* Complete pseudocode */}
            <h3 className="text-lg font-semibold text-slate-800 mt-8 mb-3">完整伪代码</h3>
            <div className="my-4 bg-slate-900 text-slate-100 p-5 rounded-lg text-sm font-mono overflow-x-auto">
              <pre className="whitespace-pre leading-relaxed">{`def block_attn_res(blocks, partial_block, proj, norm):
    """Inter-block attention: attend over block reps + partial sum"""
    V = torch.stack(blocks + [partial_block])  # [N+1, B, T, D]
    K = norm(V)
    logits = torch.einsum('d, n b t d -> n b t',
                          proj.weight.squeeze(), K)
    h = torch.einsum('n b t, n b t d -> b t d',
                     logits.softmax(0), V)
    return h

def forward(self, blocks, hidden_states):
    partial_block = hidden_states

    # ① Block AttnRes before Attention
    h = block_attn_res(blocks, partial_block,
                       self.attn_res_proj, self.attn_res_norm)

    # If at block boundary → start new block
    if self.layer_number % (self.block_size // 2) == 0:
        blocks.append(partial_block)
        partial_block = None

    # ② Self-Attention layer
    attn_out = self.attn(self.attn_norm(h))
    partial_block = partial_block + attn_out \\
                    if partial_block is not None else attn_out

    # ③ Block AttnRes before MLP
    h = block_attn_res(blocks, partial_block,
                       self.mlp_res_proj, self.mlp_res_norm)

    # ④ MLP layer
    mlp_out = self.mlp(self.mlp_norm(h))
    partial_block = partial_block + mlp_out

    return blocks, partial_block`}</pre>
            </div>
          </Section>

          {/* ==================== Infrastructure ==================== */}
          <Section id="infrastructure">
            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-2 mb-6">4. 基础设施设计 (Infrastructure Design)</h2>

            <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-4">4.1 训练 (Training)</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              小规模训练中 AttnRes 几乎无额外开销。大规模分布式训练中，流水线并行是主要挑战。
            </p>

            <p className="text-slate-700 leading-relaxed mb-4">
              考虑交错流水线调度（<InlineMath math="P" /> 个物理阶段，<InlineMath math="V" /> 个虚拟阶段），总 chunk 数 <InlineMath math="C = PV" />。朴素实现每次转换传输全部历史，通信成本为：
            </p>
            <div className="my-6 p-4 bg-slate-100 rounded-lg overflow-x-auto">
              <BlockMath math="\text{Comm}_{\text{naïve}} = \frac{C(C-1)}{2} N_p d" />
            </div>

            <InfoBox title="跨阶段缓存 (Cross-stage Caching)" color="indigo">
              <p className="mb-3">每个物理阶段在本地缓存之前虚拟阶段接收的块。<InlineMath math="v \ge 2" /> 时只需传输增量块：</p>
              <BlockMath math="\text{Comm}_{\text{cached}} = \underbrace{\frac{P(P-1)}{2} N_p d}_{\text{第一个虚拟阶段}} + \underbrace{(V-1) P^2 N_p d}_{\text{后续虚拟阶段}}" />
              <p className="mt-3">峰值每次转换成本从 <InlineMath math="\mathcal{O}(C)" /> 降至 <InlineMath math="\mathcal{O}(P)" />，实现 <InlineMath math="V\times" /> 改善。实测端到端训练开销 &lt;4%。</p>
            </InfoBox>

            <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-4">4.2 推理 (Inference)：两阶段计算策略</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              层级注意力计算类似于自回归解码，块表示充当共享的 KV cache。朴素实现每层完整扫描所有前序块，导致 <InlineMath math="\mathcal{O}(L \cdot N)" /> 次内存访问。由于伪查询 <InlineMath math="w_l" /> 与前向计算解耦，一个块内的 <InlineMath math="S" /> 个查询可以<strong>批量化为单次矩阵乘法</strong>。
            </p>

            <div className="grid md:grid-cols-2 gap-4 my-6">
              <div className="p-5 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-bold text-blue-800 mb-2">Phase 1：并行块间注意力</h4>
                <p className="text-sm text-blue-700 mb-2">
                  将块内所有 <InlineMath math="S" /> 层的查询批量化，对缓存的块表示执行单次 batched attention。返回输出和 Softmax 统计量（max 和 log-sum-exp）。
                </p>
                <p className="text-xs text-blue-600">内存读取从 S 次平摊到 1 次。</p>
              </div>
              <div className="p-5 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-bold text-green-800 mb-2">Phase 2：串行块内注意力</h4>
                <p className="text-sm text-green-700 mb-2">
                  顺序处理块内依赖（每层关注 evolving partial sum），通过<strong>在线 Softmax</strong> 将 Phase 2 结果与 Phase 1 合并。
                </p>
                <p className="text-xs text-green-600">合并是逐元素操作，天然适合与 RMSNorm 等操作 kernel fusion。</p>
              </div>
            </div>

            {/* Table 1: I/O comparison */}
            <h4 className="text-lg font-semibold text-slate-800 mt-8 mb-3">每层内存访问成本对比 (Table 1)</h4>
            <p className="text-sm text-slate-500 mb-3">典型参数：L=128, N=8, S=L/N=16, m=4</p>
            <div className="overflow-x-auto my-4">
              <table className="min-w-full bg-white border border-slate-200 shadow-sm rounded-lg overflow-hidden text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="py-2.5 px-4 border-b text-left font-semibold text-slate-700">方案</th>
                    <th className="py-2.5 px-4 border-b text-left font-semibold text-slate-700">Read</th>
                    <th className="py-2.5 px-4 border-b text-left font-semibold text-slate-700">Write</th>
                    <th className="py-2.5 px-4 border-b text-left font-semibold text-slate-700">Total I/O (典型值)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2.5 px-4 border-b text-slate-600">Standard Residuals</td>
                    <td className="py-2.5 px-4 border-b text-slate-600">2d</td>
                    <td className="py-2.5 px-4 border-b text-slate-600">d</td>
                    <td className="py-2.5 px-4 border-b text-slate-600 font-semibold">3d</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="py-2.5 px-4 border-b text-slate-600">mHC (m=4 streams)</td>
                    <td className="py-2.5 px-4 border-b text-slate-600" colSpan={2}>多项操作叠加</td>
                    <td className="py-2.5 px-4 border-b text-red-600 font-semibold">34d</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 border-b text-slate-600">AttnRes Full (amortized)</td>
                    <td className="py-2.5 px-4 border-b text-slate-600">(S+N-2)d</td>
                    <td className="py-2.5 px-4 border-b text-slate-600">2d</td>
                    <td className="py-2.5 px-4 border-b text-slate-600 font-semibold">24d</td>
                  </tr>
                  <tr className="bg-blue-50/30">
                    <td className="py-2.5 px-4 border-b text-blue-700 font-bold">AttnRes Block (amortized)</td>
                    <td className="py-2.5 px-4 border-b text-blue-700">(N/S + 3)d</td>
                    <td className="py-2.5 px-4 border-b text-blue-700">d</td>
                    <td className="py-2.5 px-4 border-b text-blue-700 font-bold">5.5d</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox title="内存高效预填充 (Memory-Efficient Prefilling)" color="green">
              <p className="mb-2">
                预填充时存储块表示需要 <InlineMath math="N \cdot T \cdot d" /> 元素（128K 序列 + 8 块 ≈ 15 GB）。通过沿序列维度在 <InlineMath math="P" /> 个 TP 设备上分片，Phase 1 可在本地分片上独立执行。Phase 2 的在线 Softmax 合并融入标准 TP all-reduce 通信路径（reduce-scatter → 本地合并 → all-gather），天然支持 kernel fusion。
              </p>
              <p>单设备内存降至 <InlineMath math="N \cdot (T/P) \cdot d" />：128K 上下文从 15 GB 降至约 1.9 GB/设备。结合 16K chunked prefill 进一步降至 &lt;0.3 GB/设备。</p>
            </InfoBox>
          </Section>

          {/* ==================== Experiments ==================== */}
          <Section id="experiments">
            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-2 mb-6">5. 实验结果 (Experiments)</h2>

            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>架构</strong>：基于 Kimi Linear（遵循 Moonlight / DeepSeek-V3 设计），交替使用 KDA 和 MLA 注意力层（3:1 比例），每层后接 MoE FFN。唯一修改是在残差连接上添加 AttnRes。每层仅增加 1 个 RMSNorm + 1 个伪查询向量 <InlineMath math="w_l \in \mathbb{R}^d" />，参数量可忽略。
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-4">5.1 Scaling Laws</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              扫描 5 种模型规模（194M–528M 激活参数），8192 token 上下文，cosine 学习率调度。所有变体共享相同超参（有利于基线的保守设置）。
            </p>

            {/* Table 2 */}
            <div className="overflow-x-auto my-6">
              <table className="min-w-full bg-white border border-slate-200 shadow-sm rounded-lg overflow-hidden text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="py-2.5 px-3 border-b text-left font-semibold text-slate-700">激活参数</th>
                    <th className="py-2.5 px-3 border-b text-left font-semibold text-slate-700">Tokens</th>
                    <th className="py-2.5 px-3 border-b text-center font-semibold text-slate-700">Baseline</th>
                    <th className="py-2.5 px-3 border-b text-center font-semibold text-slate-700">Block AttnRes</th>
                    <th className="py-2.5 px-3 border-b text-center font-semibold text-blue-700">Full AttnRes</th>
                    <th className="py-2.5 px-3 border-b text-center font-semibold text-slate-700">mHC(-lite)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['194M', '38.7B', '1.931', '1.909', '1.899', '1.906'],
                    ['241M', '45.4B', '1.895', '1.875', '1.874', '1.869'],
                    ['296M', '62.1B', '1.829', '1.809', '1.804', '1.807'],
                    ['436M', '87.9B', '1.766', '1.746', '1.737', '1.747'],
                    ['528M', '119.0B', '1.719', '1.693', '1.692', '1.694'],
                  ].map(([params, tokens, base, block, full, mhc], idx) => (
                    <tr key={idx} className={idx % 2 ? 'bg-slate-50/50' : ''}>
                      <td className="py-2.5 px-3 border-b text-slate-600">{params}</td>
                      <td className="py-2.5 px-3 border-b text-slate-600">{tokens}</td>
                      <td className="py-2.5 px-3 border-b text-slate-600 text-center">{base}</td>
                      <td className="py-2.5 px-3 border-b text-slate-600 text-center">{block}</td>
                      <td className="py-2.5 px-3 border-b text-blue-700 text-center font-semibold">{full}</td>
                      <td className="py-2.5 px-3 border-b text-slate-500 text-center">{mhc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid md:grid-cols-3 gap-3 my-6">
              <div className="p-4 bg-slate-100 rounded-lg text-center">
                <p className="text-xs text-slate-500 mb-1">Baseline</p>
                <p className="text-sm font-mono font-bold text-slate-700"><InlineMath math="1.891 \times C^{-0.057}" /></p>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
                <p className="text-xs text-blue-600 mb-1">Full AttnRes</p>
                <p className="text-sm font-mono font-bold text-blue-700"><InlineMath math="1.865 \times C^{-0.057}" /></p>
              </div>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                <p className="text-xs text-green-600 mb-1">Block AttnRes</p>
                <p className="text-sm font-mono font-bold text-green-700"><InlineMath math="1.870 \times C^{-0.058}" /></p>
              </div>
            </div>

            <InfoBox title="关键发现" color="green">
              <ul className="list-disc pl-5 space-y-1">
                <li>三种变体斜率相近，但 AttnRes 在整个算力范围内<strong>一致更优</strong></li>
                <li>Block AttnRes 等效 <strong>1.25×</strong> 算力增益</li>
                <li>Full 与 Block 的差距随规模收窄，在最大规模仅差 0.001</li>
                <li>Full AttnRes 优于 mHC，Block AttnRes 匹配 mHC 但每层 I/O 仅 5.5d vs 34d</li>
              </ul>
            </InfoBox>

            {/* 5.2 Main Results */}
            <h3 className="text-xl font-semibold text-slate-800 mt-10 mb-4">5.2 大规模实验：下游性能</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              基于完整 Kimi Linear 48B 配置：27 个 Transformer 块（54 层），256 个路由专家 + 1 个共享专家中激活 8 个，总参 48B / 激活 3B。Block AttnRes 使用每块 6 层，产生 9 个块 + 词嵌入共 10 个深度源。
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              训练采用 WSD 学习率调度 + Muon 优化器：(i) 1T tokens WSD 预训练 → (ii) ~400B 高质量 tokens 中训练。之后继续扩展至 32K 上下文（混合 KDA/MLA 中 MLA 使用 NoPE，无需 YaRN 等修改）。
            </p>

            {/* Table 3: Downstream benchmarks */}
            <div className="overflow-x-auto my-6">
              <table className="min-w-full bg-white border border-slate-200 shadow-sm rounded-lg overflow-hidden text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="py-2.5 px-4 border-b text-left font-semibold text-slate-700" colSpan={2}>评测基准</th>
                    <th className="py-2.5 px-4 border-b text-center font-semibold text-slate-700">Baseline</th>
                    <th className="py-2.5 px-4 border-b text-center font-semibold text-blue-700">AttnRes</th>
                    <th className="py-2.5 px-4 border-b text-center font-semibold text-green-700">Δ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-slate-100"><td className="py-2 px-4 border-b font-semibold text-slate-700" colSpan={5}>通用理解与推理</td></tr>
                  {[
                    ['MMLU', '73.5', '74.6', '+1.1'],
                    ['MMLU-Pro', '52.2', '52.2', '—'],
                    ['GPQA-Diamond', '36.9', '44.4', '+7.5'],
                    ['BBH', '76.3', '78.0', '+1.7'],
                    ['ARC-Challenge', '64.6', '65.7', '+1.1'],
                    ['HellaSwag', '83.2', '83.4', '+0.2'],
                    ['TriviaQA', '69.9', '71.8', '+1.9'],
                  ].map(([name, base, attn, delta]) => (
                    <tr key={name} className={delta === '+7.5' ? 'bg-green-50/50' : ''}>
                      <td className="py-2 px-4 border-b text-slate-600" colSpan={2}>{name}</td>
                      <td className="py-2 px-4 border-b text-slate-600 text-center">{base}</td>
                      <td className="py-2 px-4 border-b text-blue-700 text-center font-semibold">{attn}</td>
                      <td className={`py-2 px-4 border-b text-center font-semibold ${delta.startsWith('+') ? 'text-green-600' : 'text-slate-400'}`}>{delta}</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-100"><td className="py-2 px-4 border-b font-semibold text-slate-700" colSpan={5}>数学与代码</td></tr>
                  {[
                    ['GSM8K', '81.7', '82.4', '+0.7'],
                    ['MGSM', '64.9', '66.1', '+1.2'],
                    ['Math', '53.5', '57.1', '+3.6'],
                    ['CMath', '84.7', '85.1', '+0.4'],
                    ['HumanEval', '59.1', '62.2', '+3.1'],
                    ['MBPP', '72.0', '73.9', '+1.9'],
                  ].map(([name, base, attn, delta]) => (
                    <tr key={name} className={parseFloat(delta) >= 3 ? 'bg-green-50/50' : ''}>
                      <td className="py-2 px-4 border-b text-slate-600" colSpan={2}>{name}</td>
                      <td className="py-2 px-4 border-b text-slate-600 text-center">{base}</td>
                      <td className="py-2 px-4 border-b text-blue-700 text-center font-semibold">{attn}</td>
                      <td className={`py-2 px-4 border-b text-center font-semibold ${delta.startsWith('+') ? 'text-green-600' : 'text-slate-400'}`}>{delta}</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-100"><td className="py-2 px-4 border-b font-semibold text-slate-700" colSpan={5}>中文理解</td></tr>
                  {[
                    ['CMMLU', '82.0', '82.9', '+0.9'],
                    ['C-Eval', '79.6', '82.5', '+2.9'],
                  ].map(([name, base, attn, delta]) => (
                    <tr key={name}>
                      <td className="py-2 px-4 border-b text-slate-600" colSpan={2}>{name}</td>
                      <td className="py-2 px-4 border-b text-slate-600 text-center">{base}</td>
                      <td className="py-2 px-4 border-b text-blue-700 text-center font-semibold">{attn}</td>
                      <td className="py-2 px-4 border-b text-center font-semibold text-green-600">{delta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <InfoBox title="性能模式解读" color="purple">
              <p>提升在<strong>多步推理任务</strong>上最为显著（GPQA-Diamond +7.5, Math +3.6, HumanEval +3.1），这与"改善深度方向信息流有利于组合性任务"的假设一致——后层可以选择性地检索和构建在早期表示之上。知识导向基准（MMLU, TriviaQA）也有稳定增益。</p>
            </InfoBox>

            {/* 5.2 Training Dynamics */}
            <h3 className="text-xl font-semibold text-slate-800 mt-10 mb-4">5.2 训练动态分析</h3>
            <div className="grid md:grid-cols-3 gap-4 my-6">
              <div className="p-5 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-bold text-blue-800 mb-2">Validation Loss</h4>
                <p className="text-sm text-blue-700">AttnRes 全程一致更低的验证损失，在 decay 阶段差距进一步拉大。</p>
              </div>
              <div className="p-5 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-bold text-purple-800 mb-2">输出幅度有界</h4>
                <p className="text-sm text-purple-700">基线的输出幅度随层数单调递增（PreNorm 稀释）。Block AttnRes 在块边界处通过选择性聚合重置累加，形成<strong>有界周期模式</strong>。</p>
              </div>
              <div className="p-5 bg-indigo-50 border border-indigo-200 rounded-lg">
                <h4 className="font-bold text-indigo-800 mb-2">梯度更均匀</h4>
                <p className="text-sm text-indigo-700">基线固定权重=1，无法调节梯度流，导致浅层梯度极端大。AttnRes 可学习的 Softmax 权重引入源层间<strong>概率质量竞争</strong>，梯度分布更均匀。</p>
              </div>
            </div>

            {/* 5.3 Ablation */}
            <h3 className="text-xl font-semibold text-slate-800 mt-10 mb-4">5.3 消融实验 (Ablation Study)</h3>
            <p className="text-slate-700 leading-relaxed mb-4">在 16-head 模型（436M 激活参数）上进行消融，所有变体共享相同超参和算力预算。</p>

            <div className="overflow-x-auto my-6">
              <table className="min-w-full bg-white border border-slate-200 shadow-sm rounded-lg overflow-hidden text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="py-2.5 px-4 border-b text-left font-semibold text-slate-700">Variant</th>
                    <th className="py-2.5 px-4 border-b text-center font-semibold text-slate-700">Loss</th>
                    <th className="py-2.5 px-4 border-b text-left font-semibold text-slate-700">说明</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Baseline (PreNorm)', '1.766', '', false, ''],
                    ['DenseFormer', '1.767', '固定、输入无关的标量系数 → 无增益', false, ''],
                    ['mHC', '1.747', 'm 个并行流 + 学习混合矩阵', false, ''],
                    ['Full AttnRes', '1.737', '深度 Softmax 注意力', true, 'bg-blue-50/50'],
                    ['  + input-dependent query', '1.731', '将 w_l 改为 hidden state 的投影（需 d×d 参数）', false, ''],
                    ['  + input-independent mixing', '1.749', '去掉 Q/K，用可学习标量加权 → 退化', false, ''],
                    ['  + sigmoid', '1.741', 'sigmoid 替代 softmax → 缺少竞争性归一化', false, ''],
                    ['  w/o RMSNorm', '1.743', '大幅度层主导 softmax', false, ''],
                    ['SWA (W=1+8)', '1.764', '滑动窗口仅保留最近 8 层 + embedding', false, ''],
                    ['Block (S=4)', '1.746', '块级注意力', false, 'bg-green-50/30'],
                    ['  + multihead (H=16)', '1.752', '每个 head 独立的深度聚合 → 反而更差', false, ''],
                    ['  w/o RMSNorm', '1.750', '块表示幅度差异更大，RMSNorm 更关键', false, ''],
                  ].map(([variant, loss, note, highlight, bg], idx) => (
                    <tr key={idx} className={bg || (highlight ? 'bg-blue-50/50' : (idx % 2 ? 'bg-slate-50/30' : ''))}>
                      <td className={`py-2.5 px-4 border-b ${highlight ? 'text-blue-700 font-bold' : 'text-slate-600'}`}>{variant}</td>
                      <td className={`py-2.5 px-4 border-b text-center ${highlight ? 'text-blue-700 font-bold' : 'text-slate-600'}`}>{loss}</td>
                      <td className="py-2.5 px-4 border-b text-slate-500 text-xs">{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <InfoBox title="消融关键结论" color="yellow">
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>输入依赖性至关重要</strong>：DenseFormer（固定系数）无增益；input-independent mixing 也退化。内容感知的深度选择是核心。</li>
                <li><strong>Softmax 优于 Sigmoid</strong>：softmax 的竞争性归一化迫使更锐利的源层选择。</li>
                <li><strong>Multihead 深度聚合反而有害</strong>（1.752 vs 1.746）：最优的深度混合跨通道基本一致——当一层输出相关时，它整体上都是相关的。</li>
                <li><strong>SWA 远不如 Block AttnRes</strong>（1.764 vs 1.746）：选择性访问远处的层比关注许多近邻层更重要。</li>
                <li><strong>块大小 S=2,4,8 性能接近</strong>（均 ≈1.746），S=16,32 才趋向基线。实践中固定 ≈8 个块即可。</li>
              </ul>
            </InfoBox>
          </Section>

          {/* ==================== Analysis ==================== */}
          <Section id="analysis">
            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-2 mb-6">5.4 分析</h2>

            <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-4">5.4.1 最优架构：AttnRes 偏好更深网络</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              在固定算力（≈6.5×10¹⁹ FLOPs）和固定激活参数（≈2.3×10⁸）下，在 5×5 网格上枚举 25 种架构配置（<InlineMath math="d_{\text{model}}/L_b" /> × <InlineMath math="H/L_b" />，其中 <InlineMath math="L_b = L/2" /> 是 Transformer 块数）。
            </p>

            <div className="grid md:grid-cols-2 gap-4 my-6">
              <div className="p-5 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-bold text-yellow-800 mb-2">Baseline 最优点</h4>
                <p className="text-sm text-yellow-700"><InlineMath math="d_{\text{model}}/L_b \approx 60" />（较宽较浅）</p>
                <p className="text-sm text-yellow-700 mt-1">最优 Loss = <strong>1.847</strong></p>
              </div>
              <div className="p-5 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-bold text-blue-800 mb-2">AttnRes 最优点</h4>
                <p className="text-sm text-blue-700"><InlineMath math="d_{\text{model}}/L_b \approx 45" />（更深更窄）</p>
                <p className="text-sm text-blue-700 mt-1">最优 Loss = <strong>1.802</strong></p>
              </div>
            </div>

            <InfoBox title="深度偏好" color="purple">
              <p className="mb-2">AttnRes 在全部 25 种配置中均优于基线（差距 0.019–0.063）。更低的 <InlineMath math="d_{\text{model}}/L_b" /> 对应<strong>更深更窄</strong>的网络，说明 AttnRes 能更有效地利用额外深度。</p>
              <p className="text-xs">注：更深的模型通常推理延迟更高（顺序计算更多），此处仅作为诊断性实验揭示 AttnRes 从深度中获益最大。</p>
            </InfoBox>

            <h3 className="text-xl font-semibold text-slate-800 mt-10 mb-4">5.4.2 学习到的 AttnRes 模式</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              可视化 16-head 模型学习到的注意力权重 <InlineMath math="\alpha_{i \rightarrow l}" /> 热力图（行=当前层，列=源层），观察到三个关键模式：
            </p>

            <div className="space-y-4 my-6">
              <div className="p-5 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-bold text-blue-800 mb-2">① 局部性保留 (Preserved Locality)</h4>
                <p className="text-sm text-blue-700">每层最强烈地关注其<strong>直接前驱</strong>（对角线主导），但同时出现选择性的非对角线集中——例如第 4 层回溯到早期源，第 15-16 层在 block 设定下远距回溯。这些是模型学习到的<strong>跳跃连接</strong>。</p>
              </div>
              <div className="p-5 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-bold text-green-800 mb-2">② 层类型特化 (Layer Specialization)</h4>
                <p className="text-sm text-green-700">
                  词嵌入 <InlineMath math="h_1" /> 在全网络中保持<strong>非零权重</strong>，尤其在 Pre-Attention 层中更突出。Pre-MLP 输入更依赖近期表示（更锐利的对角线），而 Pre-Attention 输入保持更宽的感受野——这与 Attention 跨层路由信息、MLP 局部处理的功能分工一致。
                </p>
              </div>
              <div className="p-5 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-bold text-purple-800 mb-2">③ Block AttnRes 保留结构</h4>
                <p className="text-sm text-purple-700">对角线主导、词嵌入持续存在、层类型特化均从 Full 转移到了 Block 变体。Block 的权重分布更<strong>锐利和决定性</strong>，暗示块级压缩充当了隐式正则化。</p>
              </div>
            </div>
          </Section>

          {/* ==================== Discussions ==================== */}
          <Section id="discussions">
            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-2 mb-6">6. 讨论 (Discussions)</h2>

            <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-4">6.1 序列-深度对偶性 (Sequence-Depth Duality)</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              残差连接通过固定递推 <InlineMath math="h_l = h_{l-1} + f_{l-1}(h_{l-1})" /> 在深度上传播信息，正如 RNN 在时间上传播信息。TTT（Test-Time Training）将序列侧的每个递推步形式化为自监督损失的梯度下降：
            </p>
            <div className="my-6 p-4 bg-slate-100 rounded-lg overflow-x-auto">
              <BlockMath math="W_t = W_{t-1} - \eta \nabla\ell(W_{t-1}; x_t)" />
            </div>
            <p className="text-slate-700 leading-relaxed mb-4">
              当 <InlineMath math="f" /> 为线性时退化为 vanilla 线性注意力 <InlineMath math="S_t = S_{t-1} + k_t v_t^\top" />。标准残差在深度方向展现了相同的加法形式。这种对偶性扩展到更丰富的变体：
            </p>

            <div className="overflow-x-auto my-6">
              <table className="min-w-full bg-white border border-slate-200 shadow-sm rounded-lg overflow-hidden text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="py-2.5 px-4 border-b text-left font-semibold text-slate-700">序列侧</th>
                    <th className="py-2.5 px-4 border-b text-center font-semibold text-slate-700">↔</th>
                    <th className="py-2.5 px-4 border-b text-left font-semibold text-slate-700">深度侧</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="py-2 px-4 border-b text-slate-600">数据依赖门控 (RetNet, GLA)</td><td className="py-2 px-4 border-b text-center">↔</td><td className="py-2 px-4 border-b text-slate-600">Highway Networks</td></tr>
                  <tr className="bg-slate-50/50"><td className="py-2 px-4 border-b text-slate-600">Delta Rule (DeltaNet)</td><td className="py-2 px-4 border-b text-center">↔</td><td className="py-2 px-4 border-b text-slate-600">DDL (Deep Delta Learning)</td></tr>
                  <tr><td className="py-2 px-4 border-b text-slate-600">GLA (Gated Linear Attention)</td><td className="py-2 px-4 border-b text-center">↔</td><td className="py-2 px-4 border-b text-slate-600">MRLA</td></tr>
                  <tr className="bg-blue-50/50"><td className="py-2 px-4 border-b text-blue-700 font-bold">Softmax Attention</td><td className="py-2 px-4 border-b text-center">↔</td><td className="py-2 px-4 border-b text-blue-700 font-bold">AttnRes (本文)</td></tr>
                </tbody>
              </table>
            </div>

            <InfoBox title="先前残差 = 深度线性注意力" color="purple">
              <p>以 (m)HC 为例，展开其递推权重 <InlineMath math="M_{i \rightarrow l} = \beta_i^\top A_{i+1 \rightarrow l}^{\times} \alpha_l" />，其中 <InlineMath math="\alpha_l" /> 充当查询，<InlineMath math="\beta_i" /> 充当键，累积转移 <InlineMath math="A_{i+1 \rightarrow l}^{\times}" /> 充当深度相对位置算子。m 个并行流对应深度轴上的<strong>状态扩展</strong>，提升 M 的半可分秩。AttnRes 从<strong>深度线性注意力</strong>升级为<strong>深度 Softmax 注意力</strong>。</p>
            </InfoBox>

            <h3 className="text-xl font-semibold text-slate-800 mt-10 mb-4">6.2 残差连接作为结构化矩阵</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              所有残差变体都可形式化为深度混合矩阵 <InlineMath math="M \in \mathbb{R}^{L \times L}" />，其中 <InlineMath math="h_l = \sum_{i=0}^{l-1}M_{i\rightarrow l}v_i" />：
            </p>

            <div className="space-y-4 my-6">
              <div className="p-5 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-bold text-yellow-800 mb-2">Standard Residual → 全 1 下三角 (semiseparable rank = 1)</h4>
                <p className="text-sm text-yellow-700 mb-3"><InlineMath math="M_{i \rightarrow l} = 1" /> 对所有 <InlineMath math="i < l" />。</p>
                <div className="overflow-x-auto">
                  <BlockMath math={`\\begin{bmatrix} h_1 \\\\ h_2 \\\\ \\vdots \\\\ h_L \\end{bmatrix} = \\begin{bmatrix} 1 & & & \\\\ 1 & 1 & & \\\\ \\vdots & \\vdots & \\ddots & \\\\ 1 & 1 & \\cdots & 1 \\end{bmatrix} \\begin{bmatrix} v_0 \\\\ v_1 \\\\ \\vdots \\\\ v_{L-1} \\end{bmatrix}`} />
                </div>
              </div>

              <div className="p-5 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-bold text-purple-800 mb-2">Highway → 1-semiseparable (输入依赖权重，权重和为 1)</h4>
                <p className="text-sm text-purple-700">
                  定义累积进位乘积 <InlineMath math="\gamma_{i \rightarrow l}^{\times} := \prod_{j=i+1}^{l}(1-g_j)" />，则 <InlineMath math="M_{0 \rightarrow l} = \gamma_{1 \rightarrow l}^{\times}" />，<InlineMath math="M_{i \rightarrow l} = g_{i+1}\gamma_{i+1 \rightarrow l}^{\times}" />。是 stick-breaking attention 的深度实例。
                </p>
              </div>

              <div className="p-5 bg-indigo-50 border border-indigo-200 rounded-lg">
                <h4 className="font-bold text-indigo-800 mb-2">(m)HC → m-semiseparable (m 并行流)</h4>
                <p className="text-sm text-indigo-700 mb-2">
                  维护 <InlineMath math="m" /> 个并行流 <InlineMath math="H_l \in \mathbb{R}^{d \times m}" />，更新为 <InlineMath math="H_l = H_{l-1}A_l + f_{l-1}(H_{l-1}\alpha_{l-1})\beta_{l-1}^\top" />。
                </p>
                <p className="text-sm text-indigo-700">
                  展开得 <InlineMath math="M_{i \rightarrow l} = \beta_i^\top A_{i+1 \rightarrow l}^{\times} \alpha_l" />，其中 <InlineMath math="A_{i \rightarrow j}^{\times} = \prod_{k=i+1}^{j} A_k" />。m×m 转移矩阵使 M 的半可分秩为 m。
                </p>
              </div>

              <div className="p-5 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-bold text-blue-800 mb-2">Full AttnRes → Rank-L 密集矩阵</h4>
                <p className="text-sm text-blue-700">
                  <InlineMath math="M_{i \rightarrow l} = \alpha_{i \rightarrow l} \propto \exp(w_l^\top \text{RMSNorm}(k_i))" />。输入依赖的 key 使 M 成为密集的、满秩的 <InlineMath math="L" /> 秩矩阵。
                </p>
              </div>

              <div className="p-5 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-bold text-green-800 mb-2">Block AttnRes → Rank N 到 N+S</h4>
                <p className="text-sm text-green-700">
                  已完成块内的所有层共享同一块级 key/value <InlineMath math="b_n" />。当前块内每层额外关注 evolving partial sum <InlineMath math="b_n^{i-1}" />，引入每层一个额外的独立源。有效秩在 <InlineMath math="N" /> 到 <InlineMath math="N+S" /> 之间，插值于标准残差 (N=1) 和 Full AttnRes (N=L) 之间。
                </p>
              </div>
            </div>

            <InfoBox title="结构化矩阵视角的实践价值" color="teal">
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>分析洞察</strong>：输入依赖的 M 揭示了<strong>深度方向的 attention sink</strong>——某些层持续吸引高权重，与序列注意力中的 attention sink 现象对应</li>
                <li><strong>启发新设计</strong>：当核 <InlineMath math="\phi(q,k) = \varphi(q)^\top \varphi(k)" /> 可分解为特征映射时，深度注意力坍缩为递推——正是 MRLA-GLA 和 DDL-DeltaNet 对应关系的数学基础</li>
              </ul>
            </InfoBox>
          </Section>

          {/* ==================== Appendix ==================== */}
          <Section id="appendix">
            <div className="bg-slate-100 p-6 md:p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">附录 B: Full AttnRes 推理 I/O 优化推导</h2>
              <p className="text-sm text-slate-500 mb-6">注：这里的分块纯粹是推理调度技巧，不改变模型架构（不同于 Block AttnRes）。</p>

              <p className="text-slate-700 leading-relaxed mb-4">
                设 <InlineMath math="L" /> 层，隐藏维度 <InlineMath math="d" />，划分为 <InlineMath math="N" /> 个块，每块 <InlineMath math="S = L/N" /> 层。
              </p>

              <h3 className="text-lg font-bold text-slate-800 mt-6 mb-3">Phase 1：批量块间注意力</h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                第 <InlineMath math="n" /> 块的 <InlineMath math="S" /> 个查询是静态的，前面 <InlineMath math="(n-1)S" /> 个 KV 对只需读取一次：
              </p>
              <div className="my-4 p-4 bg-white rounded-lg overflow-x-auto">
                <BlockMath math="\text{Read}_{\text{inter}}^{(n)} = 2(n-1)Sd" />
              </div>
              <p className="text-slate-700 mb-3">所有 <InlineMath math="N" /> 块加总（利用 <InlineMath math="SN = L" />）：</p>
              <div className="my-4 p-4 bg-white rounded-lg overflow-x-auto">
                <BlockMath math="\text{Read}_{\text{inter}} = \sum_{n=1}^{N}2(n-1)Sd = dL(N-1), \quad \text{Write}_{\text{inter}} = Ld" />
              </div>

              <h3 className="text-lg font-bold text-slate-800 mt-6 mb-3">Phase 2：串行块内注意力</h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                层 <InlineMath math="t" /> 读取 <InlineMath math="t-1" /> 个块内 KV 对，单块读取成本：
              </p>
              <div className="my-4 p-4 bg-white rounded-lg overflow-x-auto">
                <BlockMath math="\text{Read}_{\text{intra}}^{(n)} = \sum_{t=1}^{S}2(t-1)d = S(S-1)d, \quad \text{Write}_{\text{intra}}^{(n)} = Sd" />
              </div>

              <h3 className="text-lg font-bold text-slate-800 mt-6 mb-3">平摊每层总 I/O</h3>
              <div className="my-4 p-4 bg-white rounded-lg overflow-x-auto space-y-2">
                <BlockMath math="\text{Read/layer} = \frac{dL(N-1) + N \cdot S(S-1)d}{L} = (N-1)d + (S-1)d = (S+N-2)d" />
                <BlockMath math="\text{Write/layer} = 2d" />
                <BlockMath math="\boxed{\text{Total I/O per layer} = (S + N)d}" />
              </div>
              <InfoBox title="结论" color="green">
                <p>通过批量化块间读取，每层 I/O 从朴素的 <InlineMath math="\mathcal{O}(Ld)" /> 降至 <InlineMath math="\mathcal{O}((S+N)d)" />。当 <InlineMath math="S = N = \sqrt{L}" /> 时取最小值 <InlineMath math="\mathcal{O}(\sqrt{L} \cdot d)" />。</p>
              </InfoBox>
            </div>
          </Section>

          <footer className="mt-12 pt-6 border-t border-slate-200 text-center text-sm text-slate-400">
            <p>基于 arXiv:2603.15031v1 论文内容生成</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
