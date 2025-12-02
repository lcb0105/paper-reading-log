import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Zap, Filter, TrendingUp, BookOpen } from 'lucide-react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const GatedAttention = () => {
  const [activeSection, setActiveSection] = useState('abstract');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['abstract', 'method', 'analysis', 'experiments'];
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
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link to="/" className="flex items-center text-gray-500 hover:text-indigo-600 transition-colors mb-2">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>返回首页</span>
          </Link>
          <h1 className="text-2xl font-bold text-indigo-700">论文深度解读</h1>
          <p className="text-sm text-gray-500">Gated Attention for Large Language Models: Non-linearity, Sparsity, and Attention-Sink-Free</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        {/* Abstract Summary */}
        <section id="abstract" className="mb-12 scroll-mt-24">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">核心摘要</h2>
            <p className="mb-4 leading-relaxed">
              门控机制（Gating）在深度学习中应用广泛（如 LSTM、SwiGLU），但在标准 Softmax 注意力机制内部的作用却鲜有研究。这篇来自 <strong>Qwen (通义千问) 团队</strong> 的论文通过对 30 多种变体、15B MoE 模型及 1.7B Dense 模型的广泛实验，得出了一个核心结论：
            </p>
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-lg">
              <p className="font-semibold text-lg text-emerald-800">
                🚀 核心发现：只需在缩放点积注意力（SDPA）的输出后，添加一个简单的"特定于头部的 Sigmoid 门控（Head-specific Sigmoid Gate）"，就能显著提升模型性能。
              </p>
            </div>
            <p className="mt-4">
              这种改进不仅提升了 PPL 和下游任务表现，还增强了<strong>训练稳定性</strong>（几乎消除了 Loss Spike），并消除了著名的<strong>"注意力汇聚（Attention Sink）"</strong>现象。
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded">Qwen Team</span>
              <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">Gated Attention</span>
              <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">Attention Sink Free</span>
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section id="method" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">1. 门控注意力层 (Gated Attention Layer) 的设计</h2>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-xl font-semibold text-indigo-600 mb-3">1.1 标准多头注意力回顾</h3>
            <p className="mb-3">
              首先，我们要理解标准的 Transformer 注意力层是如何工作的。给定输入 <InlineMath math="X \in \mathbb{R}^{n \times d}" />，我们将其投影为查询（Query）、键（Key）和值（Value）：
            </p>
            <div className="bg-gray-100 p-4 rounded-lg my-4 overflow-x-auto">
              <BlockMath math="Q = XW_Q, \quad K = XW_K, \quad V = XW_V" />
            </div>
            <p className="mb-3">
              接着进行缩放点积注意力（SDPA）计算：
            </p>
            <div className="bg-gray-100 p-4 rounded-lg my-4 overflow-x-auto">
              <BlockMath math="Y = \text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V" />
            </div>
            <p>
              最后，多头的输出拼接后经过一个输出层 <InlineMath math="W_O" /> 进行线性变换：<InlineMath math="O = YW_O" />。
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold text-indigo-600 mb-3">1.2 引入门控机制</h3>
            <p className="mb-4">
              论文提出的改进非常直观，即在 SDPA 的输出 <InlineMath math="Y" /> 上应用一个门控操作。公式如下：
            </p>
            <div className="bg-gray-100 p-4 rounded-lg my-4 overflow-x-auto">
              <BlockMath math="Y' = Y \odot \sigma(X W_\theta)" />
            </div>
            
            <h4 className="font-bold text-gray-800 mt-6 mb-2">🔎 深度解析：这里的输入 X 到底是什么？</h4>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="mb-3 font-semibold text-blue-900">
                回答：<InlineMath math="X" /> 是当前 Token 在进入 Attention 层之前的隐状态 (Hidden States after Pre-Normalization)。
              </p>
              <p className="mb-2 text-sm text-blue-800">
                虽然它不是投影后的 <InlineMath math="Q" /> 向量，但它是生成 <InlineMath math="Q" /> 的源头。流程如下：
              </p>
              <div className="bg-white p-3 rounded border border-blue-200 text-sm font-mono mb-3">
                <p>1. 输入 (Pre-Norm): X</p>
                <p>2. 生成 Query: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Q = X * W_q</p>
                <p>3. 生成 Gate: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Gate = Sigmoid(X * W_theta)</p>
                <p>4. 最终输出: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Output = Attention(Q,K,V) * Gate</p>
              </div>
            </div>

            {/* Deep Dive Box */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mt-6">
              <h3 className="text-xl font-bold text-amber-800 mb-4">🔑 核心解密：X 与 Q 的血缘关系</h3>
              <p className="mb-4 text-amber-900 font-medium">
                用户常问：为什么是 Query-Dependent？X 和 Q 到底是什么关系？
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">1. 数学关系：同源并行</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    <InlineMath math="Q" /> 实际上就是 <InlineMath math="X" /> 的一个线性投影（Linear Projection）。
                  </p>
                  <div className="bg-white p-2 rounded border border-amber-200 text-sm font-mono text-gray-600 mb-2">
                    <p>Q = X · W_q</p>
                    <p>Gate = σ(X · W_θ)</p>
                  </div>
                  <p className="text-sm text-gray-700">
                    <InlineMath math="X" /> 是"本体"。模型用矩阵 <InlineMath math="W_Q" /> 提取 <InlineMath math="X" /> 中用于<strong>匹配</strong>的特征（生成 <InlineMath math="Q" />），同时用矩阵 <InlineMath math="W_\theta" /> 提取 <InlineMath math="X" /> 中用于<strong>控制</strong>的特征（生成 Gate）。
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">2. 功能差异：意图 vs 决策</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 space-y-2">
                    <li>
                      <strong>Q (Query)</strong>：是用来和 K (Key) 做点积的。它的任务是"在历史中寻找相关内容"。
                    </li>
                    <li>
                      <strong>X (Input)</strong>：包含了 Token 的完整状态。有些 Token（如句号、无实义词）基于其自身状态 <InlineMath math="X" /> 就可以决定"我不需要看任何人"。
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-white p-4 rounded-lg border border-amber-200">
                <h4 className="font-bold text-amber-800 mb-2">💡 图书馆比喻</h4>
                <div className="space-y-3 text-sm text-gray-700">
                  <p>想象你（<strong>X</strong>）站在图书馆里：</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>生成 Q (Attention路径)</strong>：你想找书，于是问管理员"有没有关于历史的书？"。管理员（Softmax）必须给你推荐几本，哪怕全是烂书，也要凑够 100% 的推荐度。</li>
                    <li><strong>生成 Gate (门控路径)</strong>：你（X）突然意识到自己其实很累，想休息。于是你的大脑（Gate）决定："不管管理员推荐了什么书，我都不看"。</li>
                    <li><strong>结果</strong>：Gate 输出 0，你忽略了所有书。这就避免了被迫去读那些烂书（避免了 Attention Sink）。</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="mt-4 text-gray-600">
              <strong>最佳实践位置（<InlineMath math="G_1" />）：</strong> 论文尝试了在 Q/K/V 投影后、SDPA 后、以及最终 <InlineMath math="W_O" /> 输出后加入门控。实验证明，<strong>在 SDPA 输出之后 (<InlineMath math="G_1" /> 位置) 加入门控效果最好</strong>。
            </p>
          </div>
        </section>

        {/* Analysis Section */}
        <section id="analysis" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">2. 为什么它这么有效？(原理深度解析)</h2>
          <p className="mb-6">
            这不仅仅是"这就好用"的炼丹术，论文详细分析了两个关键的理论支撑：<strong>非线性增强</strong>与<strong>稀疏性引入</strong>。
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Factor 1: Non-linearity */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-bold text-indigo-700">因素一：打破低秩瓶颈的非线性</h3>
              </div>
              <p className="mb-4 text-sm text-gray-600">
                在标准 Transformer 中，Value 投影矩阵 <InlineMath math="W_V" /> 和输出矩阵 <InlineMath math="W_O" /> 是连续相乘的线性层。
              </p>
              <p className="mb-3 text-sm">
                如果不考虑 Softmax 带来的混合，第 <InlineMath math="i" /> 个 token 的输出可以近似看作：
              </p>
              <div className="bg-gray-50 p-2 rounded text-sm overflow-x-auto mb-3">
                <BlockMath math="O_i \approx \sum S_{ij} X_j (W_V W_O)" />
              </div>
              <p className="text-sm">
                这里的 <InlineMath math="W_V W_O" /> 本质上是一个<strong>低秩线性映射</strong>（因为 <InlineMath math="d_{head} < d_{model}" />）。
              </p>
              <div className="mt-4 bg-indigo-50 p-3 rounded text-sm">
                <strong>改进：</strong> 门控机制在 <InlineMath math="W_V" /> 和 <InlineMath math="W_O" /> 之间插入了非线性的 Sigmoid 激活，大大增加了该路径的非线性表达能力。
              </div>
            </div>

            {/* Factor 2: Sparsity */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-bold text-indigo-700">因素二：输入依赖的稀疏性</h3>
              </div>
              <p className="mb-4 text-sm text-gray-600">
                Sigmoid 函数 <InlineMath math="\sigma(x) = \frac{1}{1+e^{-x}}" /> 有一个特性：大部分输入会使其输出接近 0 或 1。
              </p>
              <p className="mb-3 text-sm">
                论文发现，训练后的模型在这个门控上的激活值非常<strong>稀疏</strong>（大部分接近 0）。这意味着门控像一个过滤器：
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>它根据<strong>当前的输入 <InlineMath math="X" /> (即 Query 端)</strong>，动态决定是否保留 Attention 的结果。</li>
                <li>这是一个<strong>Query-Dependent（依赖查询）</strong>的选择过程。</li>
                <li>如果当前 Token 认为上下文没有价值，门控可以直接将其"关掉"（置为 0）。</li>
              </ul>
            </div>
          </div>

          {/* Attention Sink */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-yellow-800 mb-4">✨ 消除"注意力汇聚 (Attention Sink)"现象</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-800 mb-2">什么是 Attention Sink？</h4>
                <p className="text-sm text-gray-700">
                  在标准 LLM 中，Softmax 强制所有分数的和为 1。当某个 token 在上下文中找不到相关信息时，它必须把注意力分数分配给某个地方。通常，模型会学会把这些"无处安放"的分数都扔给<strong>第一个 token</strong>（起始符）。
                  <br/><br/>
                  这导致第一个 token 拥有极高的注意力权重，即使它在语义上并不重要。这就是"注意力汇聚"。
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-2">门控如何解决它？</h4>
                <p className="text-sm text-gray-700">
                  引入门控后，模型不再需要利用 Attention Sink。
                  <br/><br/>
                  如果当前没有相关信息，Softmax 依然可能产生均匀分布或汇聚，<strong>但是！</strong> 门控层 <InlineMath math="\sigma(X W_\theta)" /> 可以简单地输出 <strong>0</strong>。
                  <br/><br/>
                  这样，最终输出 <InlineMath math="Y' \approx 0" />。模型学会了通过"关闭大门"来忽略无关信息，而不是通过"在第一个 token 上汇聚注意力"来应对。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Experiments */}
        <section id="experiments" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">3. 实验数据与结论</h2>
          
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm text-sm">
              <thead className="bg-indigo-100 text-indigo-900">
                <tr>
                  <th className="py-3 px-4 text-left">变体模型 (15B MoE)</th>
                  <th className="py-3 px-4 text-center">Avg PPL ↓</th>
                  <th className="py-3 px-4 text-center">MMLU ↑</th>
                  <th className="py-3 px-4 text-center">GSM8k ↑</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">Baseline (基线)</td>
                  <td className="py-3 px-4 text-center">6.026</td>
                  <td className="py-3 px-4 text-center">58.79</td>
                  <td className="py-3 px-4 text-center">52.92</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">门控在 Value 投影后 (<InlineMath math="G_2" />)</td>
                  <td className="py-3 px-4 text-center">5.820</td>
                  <td className="py-3 px-4 text-center">59.17</td>
                  <td className="py-3 px-4 text-center">53.97</td>
                </tr>
                <tr className="bg-green-50 hover:bg-green-100 border-l-4 border-green-500">
                  <td className="py-3 px-4 font-bold text-green-900">门控在 SDPA 输出后 (<InlineMath math="G_1" />)</td>
                  <td className="py-3 px-4 text-center font-bold">5.761</td>
                  <td className="py-3 px-4 text-center font-bold">60.82</td>
                  <td className="py-3 px-4 text-center font-bold">55.27</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mb-6">* 数据显示 SDPA 输出后的门控效果最佳，显著优于基线。</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h4 className="font-bold text-gray-800">📈 训练稳定性</h4>
              </div>
              <p className="text-sm text-gray-600">
                在大规模训练（3.5T tokens）中，基线模型在大 Learning Rate 下容易出现 Loss Spike（损失尖峰）。而使用了门控注意力的模型，<strong>训练曲线极其平滑</strong>，能够承受更大的学习率，从而加速收敛。
              </p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <h4 className="font-bold text-gray-800">🔭 长文本外推</h4>
              </div>
              <p className="text-sm text-gray-600">
                由于消除了 Attention Sink，模型在上下文长度扩展（Context Extension）任务（如 RULER Benchmark）上表现更好。基线模型依赖首个 token 作为"汇聚点"，这在长文本外推时容易失效，而门控模型则更加鲁棒。
              </p>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <footer className="bg-gray-800 text-gray-300 rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-4">总结</h2>
          <p className="max-w-2xl mx-auto">
            这篇论文揭示了在注意力机制中加入简单的 <strong className="text-white">Sigmoid 门控</strong> 具有巨大的潜力。它不仅通过引入非线性提升了模型表达能力，更关键的是通过引入输入依赖的稀疏性，从根本上改变了注意力的运作方式，使其不再需要依赖"注意力汇聚"来处理无关信息。对于致力于构建更稳定、更强大的大型语言模型的研究者来说，这是一个值得借鉴的架构改进。
          </p>
        </footer>
      </main>
    </div>
  );
};

export default GatedAttention;

