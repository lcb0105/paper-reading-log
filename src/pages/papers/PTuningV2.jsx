import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { 
  ArrowLeft, 
  Lightbulb, 
  BookOpen,
  Layers,
  Settings,
  BarChart2,
  ChevronRight
} from 'lucide-react';

// 导航项
const navItems = [
  { id: 'intro', label: '1. 背景与动机' },
  { id: 'method', label: '2. 核心方法详解' },
  { id: 'attention', label: '2.2 注意力机制', indent: true },
  { id: 'relation', label: '2.3 与 Prefix-Tuning 关系', indent: true },
  { id: 'optimization', label: '3. 优化策略' },
  { id: 'ablation', label: '3.2 消融实验', indent: true },
  { id: 'multitask', label: '4. 多任务学习' },
  { id: 'experiment', label: '5. 实验结果' },
];

// 公式卡片组件
const FormulaCard = ({ label, children, description }) => (
  <div className="bg-white border border-slate-200 border-l-4 border-l-indigo-500 rounded-lg p-6 my-6 shadow-sm relative">
    {label && (
      <div className="absolute top-0 right-0 bg-slate-100 text-slate-500 text-xs px-2 py-1 rounded-bl-lg font-sans">
        {label}
      </div>
    )}
    <div className="overflow-x-auto">
      {children}
    </div>
    {description && (
      <p className="text-sm text-slate-600 mt-4">{description}</p>
    )}
  </div>
);

// 优化项组件
const OptimizationItem = ({ number, title, children }) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0 mt-1">
      <span className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 text-indigo-600 font-bold text-sm">
        {number}
      </span>
    </div>
    <div>
      <h4 className="text-lg font-bold text-slate-900">{title}</h4>
      <div className="mt-1 text-slate-600">{children}</div>
    </div>
  </div>
);

export default function PTuningV2() {
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
      const scrollPosition = window.scrollY + 150;
      
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto py-8 px-4 lg:py-12">
        
        {/* 左侧导航 */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-10 space-y-4">
            <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors mb-6">
              <ArrowLeft size={18} />
              <span>返回首页</span>
            </Link>
            <h5 className="font-bold text-slate-500 uppercase tracking-wider text-sm mb-3">Contents</h5>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-all ${
                    item.indent ? 'ml-4' : ''
                  } ${
                    activeSection === item.id
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-slate-700 hover:bg-white hover:text-blue-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* 主内容区 */}
        <main className="flex-1 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 md:p-12">
            
            {/* Header */}
            <header className="mb-12 border-b border-slate-200 pb-8">
              <div className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded mb-4">
                PAPER ANALYSIS
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                P-Tuning v2: Prompt Tuning Can Be Comparable to Fine-tuning Universally Across Scales and Tasks
              </h1>
              <div className="text-slate-600 italic">
                Xiao Liu, Kaixuan Ji, et al. (Tsinghua University)
              </div>
              
              {/* Abstract Box */}
              <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-6">
                <h3 className="text-blue-900 font-bold text-lg mb-2 flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2" />
                  核心结论 (Abstract)
                </h3>
                <p className="text-blue-900">
                  本文提出了 <strong>P-Tuning v2</strong>，这是一个基于 Deep Prompt Tuning 优化的方案。它打破了以往 Prompt Tuning 方法的局限性，证明了<strong>即使在较小的模型规模（如 300M）和困难的序列标注任务（如 NER）上，仅微调 0.1%-3% 的参数，也能达到与全参数微调（Fine-tuning）相当的性能。</strong>
                </p>
              </div>
            </header>

            {/* Section 1: 背景与动机 */}
            <section id="intro" className="scroll-mt-8">
              <h2 className="text-2xl font-bold text-slate-800 pl-4 border-l-4 border-blue-500 mb-6">
                1. 背景与动机 (Motivation)
              </h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 leading-relaxed mb-4">
                  传统的预训练语言模型应用通常采用 <strong>Fine-tuning (全参数微调)</strong>，但这需要更新所有参数，显存占用大，且每个任务都需要保存一份完整的模型副本。
                </p>
                <p className="text-slate-700 leading-relaxed mb-4">
                  <strong>P-Tuning (v1) / Lester et al. (Prompt Tuning)</strong> 提出只冻结主模型，仅训练输入层的连续提示（Continuous Prompts）。虽然节省了参数，但存在明显的<strong>缺乏通用性 (Lack of Universality)</strong> 问题：
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>
                    <strong className="text-slate-900">规模限制：</strong> 在中小模型（&lt;10B 参数，如 BERT-Large, RoBERTa）上，效果显著差于 Fine-tuning。
                  </li>
                  <li>
                    <strong className="text-slate-900">任务限制：</strong> 在"困难"的序列标注任务（如抽取式问答 QA、命名实体识别 NER）上表现很差。
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 2: 核心方法详解 */}
            <section id="method" className="mt-16 scroll-mt-8">
              <h2 className="text-2xl font-bold text-slate-800 pl-4 border-l-4 border-blue-500 mb-6">
                2. 核心方法详解 (Methodology & Formulas)
              </h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 leading-relaxed mb-4">
                  P-Tuning v2 的核心思想是 <strong>Deep Prompt Tuning（深度提示微调）</strong>。这不仅仅是在输入层加 Prompt，而是在网络的<strong>每一层</strong>都加入可训练的 Prompt 向量。
                </p>

                <h3 className="text-xl font-bold text-slate-700 mt-8 mb-4">2.1 数学模型对比</h3>
                <p className="text-slate-700 mb-4">
                  定义一个预训练语言模型，包含 <InlineMath math="L" /> 层 Transformer 层。输入序列为 <InlineMath math="x" />，对应的 Embedding 为 <InlineMath math="e(x)" />。
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {/* V1 Model */}
                  <div>
                    <h4 className="font-bold text-slate-500 uppercase text-xs mb-2">传统的 P-Tuning (v1)</h4>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                      <p className="text-sm text-slate-600 mb-3">
                        提示向量 <InlineMath math="P" /> 仅插入到输入层。
                      </p>
                      <div className="space-y-2 text-sm">
                        <BlockMath math="\mathbf{Input} = [P; e(x)]" />
                        <BlockMath math="H_1 = \text{Block}_1(\mathbf{Input})" />
                        <BlockMath math="H_l = \text{Block}_l(H_{l-1})" />
                      </div>
                    </div>
                    <p className="text-sm mt-2 text-red-600">缺陷：提示信息在深层容易丢失。</p>
                  </div>

                  {/* V2 Model */}
                  <div>
                    <h4 className="font-bold text-blue-600 uppercase text-xs mb-2">P-Tuning v2 (Deep Prompt)</h4>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <p className="text-sm text-slate-600 mb-3">
                        每层 <InlineMath math="l" /> 都有独立的提示向量 <InlineMath math="P_l" /> 作为前缀。
                      </p>
                      <div className="space-y-2 text-sm">
                        <BlockMath math="\text{Prefix}_l = P_l \in \mathbb{R}^{k \times d}" />
                        <BlockMath math="\text{Context}_l = [\text{Prefix}_l; H_{l-1}]" />
                        <BlockMath math="H_l = \text{Block}_l(\text{Context}_l)" />
                      </div>
                    </div>
                    <p className="text-sm mt-2 text-green-600">优势：直接干预每一层的表示。</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2.2: 注意力机制 */}
            <section id="attention" className="mt-12 scroll-mt-8">
              <h3 className="text-xl font-bold text-slate-700 mb-4">2.2 深度提示的注意力机制详解</h3>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 mb-4">
                  为了更深入理解这如何影响注意力（Attention）计算，我们需要深入 Transformer 的 <InlineMath math="Q, K, V" /> 公式。在 Deep Prompt Tuning (如 Prefix-Tuning) 中，实际上是修改了每一层的 Key 和 Value。
                </p>
                <p className="text-slate-700 mb-4">
                  对于第 <InlineMath math="l" /> 层，我们有固定的模型权重 <InlineMath math="W_q, W_k, W_v" />。对于原始输入 <InlineMath math="H_{l-1}" />，我们计算 <InlineMath math="Q, K, V" />。但对于 Prefix 部分 <InlineMath math="P_l" />，我们直接学习其对应的 Key 和 Value。
                </p>

                <FormulaCard label="Modified Attention">
                  <p className="text-slate-500 text-sm mb-3">对于某个注意力头 (Attention Head)：</p>
                  <BlockMath math="\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{Q K^T}{\sqrt{d_k}}\right) V" />
                  
                  <p className="text-slate-500 text-sm mt-6 mb-3">在 P-Tuning v2 中，Key 和 Value 序列被扩展了：</p>
                  <BlockMath math="K' = [K_{prompt}^{(l)}; K_{input}^{(l)}]" />
                  <BlockMath math="V' = [V_{prompt}^{(l)}; V_{input}^{(l)}]" />
                  
                  <p className="text-sm mt-4 text-slate-600">
                    其中，<InlineMath math="K_{prompt}^{(l)}" /> 和 <InlineMath math="V_{prompt}^{(l)}" /> 是直接由第 <InlineMath math="l" /> 层的可训练参数生成的。这样，模型在每一层计算注意力时，都会"看到"并参考这些特定于任务的提示信息。
                  </p>
                </FormulaCard>
              </div>
            </section>

            {/* Section 2.3: 与 Prefix-Tuning 的关系 */}
            <section id="relation" className="mt-12 scroll-mt-8">
              <h3 className="text-xl font-bold text-slate-700 mb-4">2.3 与 Prefix-Tuning 的关系与区别</h3>
              <div className="prose prose-slate max-w-none">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
                  <h4 className="font-bold text-amber-800 mb-3">💡 核心关系</h4>
                  <p className="text-amber-900 mb-0">
                    P-Tuning v2 <strong>并非概念上的全新方法</strong>，而是 <strong>Deep Prompt Tuning</strong> (Li and Liang, 2021; Qin and Eisner, 2021) 针对 NLU 任务优化的实现版本。Prefix-Tuning 原本是为<strong>生成任务 (NLG)</strong> 和<strong>知识探测</strong>设计的。
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
                    <h4 className="font-bold text-slate-700 mb-3">Prefix-Tuning (原版)</h4>
                    <ul className="text-sm text-slate-600 space-y-2">
                      <li>• 设计目标：<strong>生成任务 (NLG)</strong></li>
                      <li>• 使用 MLP 重参数化生成 Prompt</li>
                      <li>• 在 GPT-2/BART 上验证</li>
                      <li>• 关注文本生成质量</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
                    <h4 className="font-bold text-blue-700 mb-3">P-Tuning v2 (本文)</h4>
                    <ul className="text-sm text-blue-700 space-y-2">
                      <li>• 设计目标：<strong>理解任务 (NLU)</strong></li>
                      <li>• 可移除 MLP，直接训练 Embedding</li>
                      <li>• 在 BERT/RoBERTa/GLM 上验证</li>
                      <li>• 关注分类/序列标注准确率</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-slate-100 rounded-lg">
                  <h4 className="font-bold text-slate-800 mb-2">关键贡献：NLU 适配优化</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>1. 发现 MLP 重参数化在 NLU 任务上并非总是有效</li>
                    <li>2. 提出针对 NLU 的超参数调优策略（Prompt 长度、分类头设计）</li>
                    <li>3. 首次证明 Deep Prompt Tuning 在<strong>困难序列标注任务</strong>上的有效性</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3: 优化策略 */}
            <section id="optimization" className="mt-16 scroll-mt-8">
              <h2 className="text-2xl font-bold text-slate-800 pl-4 border-l-4 border-blue-500 mb-6">
                3. 关键优化策略 (Optimization)
              </h2>
              <p className="text-slate-700 mb-6">
                仅仅把 Prompt 加深是不够的，论文提出了几个针对 NLU 任务的关键优化细节。
              </p>

              <div className="space-y-8">
                <OptimizationItem number="1" title="移除重参数化 (Reparameterization)">
                  <p>
                    以前的方法（如 Prefix-Tuning）通常使用 MLP 来生成 Prompt Embedding (<InlineMath math="P = \text{MLP}(P')" />)。但本文发现这在 NLU 任务中<strong>并非总是有效</strong>。P-Tuning v2 视任务情况可移除 MLP，直接训练 Embedding。
                  </p>
                </OptimizationItem>

                <OptimizationItem number="2" title="提示长度 (Prompt Length)">
                  <p className="mb-2">
                    提示长度 <InlineMath math="k" /> 是敏感超参数：
                  </p>
                  <ul className="list-disc pl-6 text-sm text-slate-600">
                    <li>简单任务：短 Prompt (<InlineMath math="k < 20" />)</li>
                    <li>困难任务 (序列标注)：长 Prompt (<InlineMath math="k \approx 100" />)</li>
                  </ul>
                </OptimizationItem>

                <OptimizationItem number="3" title="分类头选择 (Classification Head)">
                  <p className="mb-3">
                    抛弃 Verbalizer，回归类似 BERT 的做法：<strong>在 [CLS] 或 Token 上直接接随机初始化的线性分类头 (Linear Head)</strong>。
                  </p>
                  <div className="bg-slate-100 p-4 rounded-lg">
                    <BlockMath math="P(y|x) = \text{softmax}(W_{head} \cdot H_{last})" />
                  </div>
                </OptimizationItem>

                <OptimizationItem number="4" title="为什么移除 Verbalizer？">
                  <p className="mb-2">
                    传统 Prompt Tuning 使用 <strong>Verbalizer</strong> 将标签映射到词汇表中的单词（如 positive → "good"），然后预测 [MASK] Token。但这种方法存在问题：
                  </p>
                  <ul className="list-disc pl-6 text-sm text-slate-600 space-y-1">
                    <li>对于<strong>序列标注任务</strong>（NER、QA），每个 Token 都需要分类，Verbalizer 不适用</li>
                    <li>标签空间复杂时（如 OntoNotes 的 18 种实体类型），难以找到合适的映射词</li>
                    <li>线性分类头更灵活，且与 Fine-tuning 的做法一致</li>
                  </ul>
                </OptimizationItem>
              </div>
            </section>

            {/* Section 3.2: 消融实验 */}
            <section id="ablation" className="mt-12 scroll-mt-8">
              <h3 className="text-xl font-bold text-slate-700 mb-4">3.2 消融实验详解 (Ablation Study)</h3>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 mb-6">
                  论文通过消融实验揭示了一个重要发现：<strong>最优超参数因任务类型而异</strong>，不存在"一刀切"的设置。
                </p>

                {/* MLP vs Embedding */}
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg border border-purple-200 mb-6">
                  <h4 className="font-bold text-purple-800 mb-4">🔬 MLP 重参数化 vs 直接 Embedding</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b-2 border-purple-300">
                          <th className="px-3 py-2 text-left text-purple-700">任务类型</th>
                          <th className="px-3 py-2 text-left text-purple-700">MLP 效果</th>
                          <th className="px-3 py-2 text-left text-purple-700">Embedding 效果</th>
                          <th className="px-3 py-2 text-left text-purple-700">推荐选择</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-purple-100">
                        <tr>
                          <td className="px-3 py-2 font-medium">RTE (NLI)</td>
                          <td className="px-3 py-2 text-green-600">✓ 更好</td>
                          <td className="px-3 py-2 text-slate-500">一般</td>
                          <td className="px-3 py-2">MLP</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 font-medium">CoNLL04 (NER)</td>
                          <td className="px-3 py-2 text-green-600">✓ 更好</td>
                          <td className="px-3 py-2 text-slate-500">一般</td>
                          <td className="px-3 py-2">MLP</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 font-medium">BoolQ (MQA)</td>
                          <td className="px-3 py-2 text-slate-500">相近</td>
                          <td className="px-3 py-2 text-slate-500">相近</td>
                          <td className="px-3 py-2">均可</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 font-medium">CoNLL12 (SRL)</td>
                          <td className="px-3 py-2 text-slate-500">较差</td>
                          <td className="px-3 py-2 text-green-600">✓ 更好</td>
                          <td className="px-3 py-2">Embedding</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-sm text-purple-700 mt-4">
                    💡 <strong>结论：</strong>MLP 重参数化的效果<strong>因任务而异</strong>，需要根据具体任务进行选择。
                  </p>
                </div>

                {/* Prompt Length */}
                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-lg border border-teal-200">
                  <h4 className="font-bold text-teal-800 mb-4">📏 Prompt 长度 (k) 的影响</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-teal-100">
                      <h5 className="font-bold text-teal-700 mb-2">简单分类任务</h5>
                      <p className="text-sm text-teal-600 mb-2">
                        (RTE, BoolQ, CB 等 SuperGLUE 任务)
                      </p>
                      <div className="text-2xl font-mono font-bold text-teal-800">
                        k &lt; 20
                      </div>
                      <p className="text-xs text-teal-600 mt-1">短 Prompt 即可达到最佳效果</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-teal-100">
                      <h5 className="font-bold text-teal-700 mb-2">困难序列标注任务</h5>
                      <p className="text-sm text-teal-600 mb-2">
                        (NER, QA, SRL 等)
                      </p>
                      <div className="text-2xl font-mono font-bold text-teal-800">
                        k ≈ 100
                      </div>
                      <p className="text-xs text-teal-600 mt-1">需要更长的 Prompt 捕捉复杂模式</p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-teal-100 rounded-lg">
                    <p className="text-sm text-teal-800">
                      <strong>发现：</strong>MLP 重参数化通常比 Embedding 更早达到最优效果（需要的 Prompt 长度更短）。
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: 多任务学习 */}
            <section id="multitask" className="mt-16 scroll-mt-8">
              <h2 className="text-2xl font-bold text-slate-800 pl-4 border-l-4 border-blue-500 mb-6">
                4. 多任务学习 (Multi-task Learning)
              </h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 mb-6">
                  P-Tuning v2 天然支持<strong>多任务共享 Prompt</strong>：多个相关任务可以共享同一套可训练的 Continuous Prompts，同时使用各自独立的线性分类头。
                </p>

                <FormulaCard label="Multi-task Architecture">
                  <p className="text-slate-500 text-sm mb-3">多任务设置下的参数共享策略：</p>
                  <BlockMath math="\text{Shared: } \{P_1, P_2, ..., P_L\} \text{ (每层的 Prompt)}" />
                  <BlockMath math="\text{Task-specific: } \{W_{head}^{(1)}, W_{head}^{(2)}, ...\} \text{ (分类头)}" />
                  <p className="text-sm mt-4 text-slate-600">
                    这种设计使得模型可以在相关任务间共享知识表示，同时保持各任务输出的独立性。
                  </p>
                </FormulaCard>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h4 className="font-bold text-green-800 mb-3">📊 多任务实验设置</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white p-4 rounded-lg border border-green-100">
                      <h5 className="font-bold text-green-700 mb-2">NER 多任务</h5>
                      <ul className="text-green-600 space-y-1">
                        <li>• CoNLL03</li>
                        <li>• OntoNotes 5.0</li>
                        <li>• CoNLL04</li>
                      </ul>
                      <p className="text-xs text-green-500 mt-2">共享 Prompt，独立分类头</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-green-100">
                      <h5 className="font-bold text-green-700 mb-2">QA 多任务</h5>
                      <ul className="text-green-600 space-y-1">
                        <li>• SQuAD 1.1</li>
                        <li>• SQuAD 2.0</li>
                      </ul>
                      <p className="text-xs text-green-500 mt-2">统一处理可回答/不可回答问题</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-green-100">
                      <h5 className="font-bold text-green-700 mb-2">SRL 多任务</h5>
                      <ul className="text-green-600 space-y-1">
                        <li>• CoNLL05</li>
                        <li>• CoNLL12</li>
                        <li>• PropBank</li>
                      </ul>
                      <p className="text-xs text-green-500 mt-2">语义角色标注任务共享</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5: 实验结果 */}
            <section id="experiment" className="mt-16 scroll-mt-8">
              <h2 className="text-2xl font-bold text-slate-800 pl-4 border-l-4 border-blue-500 mb-6">
                5. 实验结果 (Experiments)
              </h2>

              {/* 任务分类 */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-slate-700 mb-4">5.1 NLU 任务分类</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-5 rounded-lg border border-green-200">
                    <h4 className="font-bold text-green-800 mb-3">✅ 简单分类任务 (Simple Classification)</h4>
                    <p className="text-sm text-green-700 mb-3">对整个输入序列进行分类</p>
                    <ul className="text-sm text-green-600 space-y-1">
                      <li>• <strong>SuperGLUE:</strong> RTE, BoolQ, CB, WiC, WSC, MultiRC, COPA, ReCoRD</li>
                      <li>• 情感分析、文本蕴含、多项选择等</li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 p-5 rounded-lg border border-orange-200">
                    <h4 className="font-bold text-orange-800 mb-3">⚠️ 困难序列标注任务 (Hard Sequence Labeling)</h4>
                    <p className="text-sm text-orange-700 mb-3">对序列中每个 Token 进行分类</p>
                    <ul className="text-sm text-orange-600 space-y-1">
                      <li>• <strong>NER:</strong> CoNLL03, OntoNotes 5.0, CoNLL04</li>
                      <li>• <strong>QA:</strong> SQuAD 1.1, SQuAD 2.0</li>
                      <li>• <strong>SRL:</strong> CoNLL05, CoNLL12</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 模型规模实验 */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-slate-700 mb-4">5.2 跨模型规模实验</h3>
                <div className="overflow-hidden border border-slate-200 rounded-lg">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="border-b-2 border-slate-400 px-3 py-3 text-left font-bold">模型</th>
                        <th className="border-b-2 border-slate-400 px-3 py-3 text-center font-bold">参数量</th>
                        <th className="border-b-2 border-slate-400 px-3 py-3 text-center font-bold">Fine-tune</th>
                        <th className="border-b-2 border-slate-400 px-3 py-3 text-center font-bold">P-Tuning v1</th>
                        <th className="border-b-2 border-slate-400 px-3 py-3 text-center font-bold">P-Tuning v2</th>
                        <th className="border-b-2 border-slate-400 px-3 py-3 text-center font-bold">差距</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="px-3 py-3 font-medium">BERT-large</td>
                        <td className="px-3 py-3 text-center">330M</td>
                        <td className="px-3 py-3 text-center">~75</td>
                        <td className="px-3 py-3 text-center text-red-600">~60</td>
                        <td className="px-3 py-3 text-center text-green-600 font-bold">~74</td>
                        <td className="px-3 py-3 text-center text-green-600">≈ FT</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-3 font-medium">RoBERTa-large</td>
                        <td className="px-3 py-3 text-center">330M</td>
                        <td className="px-3 py-3 text-center">~78</td>
                        <td className="px-3 py-3 text-center text-red-600">~62</td>
                        <td className="px-3 py-3 text-center text-green-600 font-bold">~77</td>
                        <td className="px-3 py-3 text-center text-green-600">≈ FT</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-3 font-medium">GLM-xl</td>
                        <td className="px-3 py-3 text-center">2B</td>
                        <td className="px-3 py-3 text-center">~80</td>
                        <td className="px-3 py-3 text-center text-red-600">~68</td>
                        <td className="px-3 py-3 text-center text-green-600 font-bold">~79</td>
                        <td className="px-3 py-3 text-center text-green-600">≈ FT</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-3 font-medium">GLM-10B</td>
                        <td className="px-3 py-3 text-center">10B</td>
                        <td className="px-3 py-3 text-center">~82</td>
                        <td className="px-3 py-3 text-center text-amber-600">~80</td>
                        <td className="px-3 py-3 text-center text-green-600 font-bold">~82</td>
                        <td className="px-3 py-3 text-center text-green-600">= FT</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-500 mt-2">* 数据为 SuperGLUE 平均分数 (RTE, BoolQ, CB)。P-Tuning v1 仅在 10B 规模接近 Fine-tuning。</p>
              </div>

              {/* 序列标注任务结果 */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-slate-700 mb-4">5.3 困难序列标注任务详细结果</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* NER 结果 */}
                  <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                    <div className="bg-blue-600 text-white px-4 py-2 font-bold">NER (命名实体识别)</div>
                    <div className="p-4">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-200">
                            <th className="py-2 text-left">数据集</th>
                            <th className="py-2 text-center">Fine-tune</th>
                            <th className="py-2 text-center">P-Tuning v2</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr>
                            <td className="py-2">CoNLL03</td>
                            <td className="py-2 text-center">92.4</td>
                            <td className="py-2 text-center text-green-600 font-bold">92.1</td>
                          </tr>
                          <tr>
                            <td className="py-2">OntoNotes 5.0</td>
                            <td className="py-2 text-center">90.1</td>
                            <td className="py-2 text-center text-green-600 font-bold">89.7</td>
                          </tr>
                          <tr>
                            <td className="py-2">CoNLL04</td>
                            <td className="py-2 text-center">87.5</td>
                            <td className="py-2 text-center text-green-600 font-bold">87.2</td>
                          </tr>
                        </tbody>
                      </table>
                      <p className="text-xs text-slate-500 mt-2">F1 Score (RoBERTa-large)</p>
                    </div>
                  </div>

                  {/* QA 结果 */}
                  <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                    <div className="bg-purple-600 text-white px-4 py-2 font-bold">QA (抽取式问答)</div>
                    <div className="p-4">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-200">
                            <th className="py-2 text-left">数据集</th>
                            <th className="py-2 text-center">Fine-tune</th>
                            <th className="py-2 text-center">P-Tuning v2</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr>
                            <td className="py-2">SQuAD 1.1</td>
                            <td className="py-2 text-center">88.6</td>
                            <td className="py-2 text-center text-green-600 font-bold">88.4</td>
                          </tr>
                          <tr>
                            <td className="py-2">SQuAD 2.0</td>
                            <td className="py-2 text-center">81.5</td>
                            <td className="py-2 text-center text-green-600 font-bold">81.3</td>
                          </tr>
                        </tbody>
                      </table>
                      <p className="text-xs text-slate-500 mt-2">EM/F1 Score (RoBERTa-large)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 参数效率 */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-slate-700 mb-4">5.4 参数效率对比</h3>
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border border-indigo-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-4xl font-bold text-indigo-600">100%</div>
                      <div className="text-sm text-indigo-700 mt-1">Fine-tuning</div>
                      <div className="text-xs text-indigo-500">全部参数</div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-purple-600">0.1% - 3%</div>
                      <div className="text-sm text-purple-700 mt-1">P-Tuning v2</div>
                      <div className="text-xs text-purple-500">仅 Prompt 参数</div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-green-600">≈ 0</div>
                      <div className="text-sm text-green-700 mt-1">性能差距</div>
                      <div className="text-xs text-green-500">与 Fine-tuning 相当</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 核心对比图示 */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-red-50 to-red-100 p-5 rounded-lg border border-red-200">
                  <h4 className="font-bold text-red-800 mb-2">P-Tuning v1</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• 仅输入层 Prompt</li>
                    <li>• 小模型效果差</li>
                    <li>• 序列标注任务失败</li>
                    <li>• 需 10B+ 模型才有效</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-lg border border-blue-200">
                  <h4 className="font-bold text-blue-800 mb-2">P-Tuning v2</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• 每层 Deep Prompt</li>
                    <li>• 330M+ 模型通用</li>
                    <li>• NER/QA/SRL 成功</li>
                    <li>• NLU 任务优化</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-lg border border-green-200">
                  <h4 className="font-bold text-green-800 mb-2">核心优势</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• 0.1%-3% 参数</li>
                    <li>• 匹敌 Fine-tuning</li>
                    <li>• 多任务高效部署</li>
                    <li>• 可替代 Fine-tuning</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="mt-16 pt-8 border-t border-slate-200 text-center">
              <p className="text-sm text-slate-400">
                Analysis generated based on "P-Tuning v2: Prompt Tuning Can Be Comparable to Fine-tuning Universally Across Scales and Tasks"
              </p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}

