import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  Info,
  Lightbulb,
  CheckCircle
} from 'lucide-react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const LoRAFAPaper = () => {
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
      const sections = ['intro', 'method', 'math', 'experiments'];
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
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      
      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 bg-slate-900 text-white shadow-lg z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center text-slate-300 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-medium hidden sm:inline">返回首页</span>
          </Link>
          
          <span className="font-bold text-xl tracking-tight">Paper Review: LoRA-FA</span>

          <div className="hidden md:flex items-center space-x-4 text-sm font-medium">
            {['intro', 'method', 'math', 'experiments'].map((id) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`hover:text-blue-400 transition ${activeSection === id ? 'text-blue-400' : ''}`}
              >
                {id === 'intro' ? '简介' : id === 'method' ? '方法' : id === 'math' ? '公式' : '实验'}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="bg-gradient-to-b from-slate-900 to-slate-800 text-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            LoRA-FA: 显存高效的低秩适应<br/>用于大语言模型微调
          </h1>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            MEMORY-EFFICIENT LOW-RANK ADAPTATION FOR LARGE LANGUAGE MODELS FINE-TUNING
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
            <span className="bg-slate-700 px-3 py-1 rounded-full">Longteng Zhang 等</span>
            <span className="bg-slate-700 px-3 py-1 rounded-full">arXiv:2308.03303</span>
            <span className="bg-slate-700 px-3 py-1 rounded-full">HKBU & HKUST</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        
        {/* 1. 背景与核心问题 */}
        <section id="intro" className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200 mb-8 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 border-b pb-4">1. 背景与核心问题</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">现有问题 (The Problem)</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                虽然 LoRA (Low-Rank Adaptation) 通过减少可训练参数大幅降低了显存需求，但它在<strong>激活值显存 (Activation Memory)</strong> 方面仍然存在瓶颈。
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2">
                <li><strong>LoRA 机制：</strong> 冻结预训练权重 <InlineMath math="W" />，训练低秩矩阵 <InlineMath math="A" /> 和 <InlineMath math="B" />。</li>
                <li><strong>瓶颈：</strong> 为了计算矩阵 <InlineMath math="A" /> 的梯度，前向传播时必须存储高维的输入 <InlineMath math="X" />。对于大模型（如 LLaMA-65B），这需要巨大的显存。</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">LoRA-FA 的解决方案</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                论文提出了 <strong>LoRA-FA (Frozen-A)</strong>：
              </p>
              <div className="bg-sky-50 border-l-4 border-sky-500 p-4 rounded-r-lg">
                <ul className="space-y-2 font-medium text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong>冻结</strong> 投影降维矩阵 <InlineMath math="A" /> (Projection-down)。</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong>仅更新</strong> 投影升维矩阵 <InlineMath math="B" /> (Projection-up)。</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong>结果：</strong> 只需要存储低维的 <InlineMath math="XA" /> 来计算 <InlineMath math="B" /> 的梯度。</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 2. 核心方法 */}
        <section id="method" className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200 mb-8 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 border-b pb-4">2. LoRA-FA 方法详解</h2>
          
          <p className="text-slate-600 mb-6">
            LoRA-FA 的核心思想是在微调过程中，让权重的变化受限在一个固定的低秩空间内。这是通过随机初始化 <InlineMath math="A" /> 并将其冻结来实现的。
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-gray-50 rounded-lg border text-center">
              <h4 className="font-bold text-red-500 mb-2">Full Fine-tuning</h4>
              <p className="text-sm text-gray-500">更新所有参数 <InlineMath math="W" /></p>
              <p className="text-xs text-gray-400 mt-2">显存消耗极大</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border text-center">
              <h4 className="font-bold text-blue-500 mb-2">Standard LoRA</h4>
              <p className="text-sm text-gray-500">冻结 <InlineMath math="W" />，更新 <InlineMath math="A" /> 和 <InlineMath math="B" /></p>
              <p className="text-xs text-gray-400 mt-2">需存储 X 用于更新 A</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200 text-center">
              <h4 className="font-bold text-green-600 mb-2">LoRA-FA (Ours)</h4>
              <p className="text-sm text-gray-600">冻结 <InlineMath math="W" /> 和 <InlineMath math="A" />，仅更新 <InlineMath math="B" /></p>
              <p className="text-xs text-green-600 mt-2 font-medium">只需存储低维 XA</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-slate-800 mb-4">初始化策略</h3>
          <ul className="list-disc list-inside text-slate-700 space-y-2">
            <li>矩阵 <InlineMath math="A \in \mathbb{R}^{d \times r}" />：从正态分布中随机初始化（通常是满秩的）。</li>
            <li>矩阵 <InlineMath math="B \in \mathbb{R}^{r \times d}" />：初始化为零矩阵。</li>
            <li>这就保证了初始状态下 <InlineMath math="\Delta W = AB = 0" />，模型输出与预训练模型一致。</li>
          </ul>
        </section>

        {/* 3. 数学原理 */}
        <section id="math" className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200 mb-8 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 border-b pb-4">3. 数学原理与公式推导</h2>
          
          <p className="text-slate-600 mb-6">
            让我们通过数学公式深入理解 LoRA-FA 的工作机制和显存优势。
          </p>

          <h3 className="text-lg font-bold text-slate-800 mb-3">3.1 标准 LoRA 公式</h3>
          <p className="text-slate-600 mb-3">对于一个线性层，LoRA 添加了一个旁路：</p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 overflow-x-auto">
            <BlockMath math="Y = XW + \alpha XAB" />
          </div>
          <p className="text-sm text-slate-500 mb-6">
            其中 <InlineMath math="W \in \mathbb{R}^{d_{in} \times d_{out}}" /> 是预训练权重，<InlineMath math="X" /> 是输入，<InlineMath math="A" /> 和 <InlineMath math="B" /> 是秩为 <InlineMath math="r" /> 的矩阵。
          </p>

          {/* 深度解析：显存消耗 */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-indigo-900 mb-4 flex items-center">
              <Info className="w-6 h-6 mr-2" />
              深度解析：为什么更新 A 极其消耗显存？
            </h3>
            
            <p className="text-indigo-800 mb-4">
              在反向传播中，计算权重的梯度遵循链式法则：<strong>权重的梯度 = 输入的转置 × 输出梯度的链式传递</strong>。
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {/* 矩阵 A 的梯度 */}
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-400">
                <h4 className="font-bold text-gray-800 mb-2">更新矩阵 A (LoRA)</h4>
                <div className="bg-gray-50 rounded p-3 mb-3 overflow-x-auto text-sm">
                  <BlockMath math="\frac{\partial L}{\partial A} = \underbrace{X^T}_{\text{输入}} \cdot (\frac{\partial L}{\partial Y} B^T)" />
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li><strong>必需存储：</strong> 原始输入 <InlineMath math="X" /></li>
                  <li><strong>维度：</strong> <InlineMath math="b \times s \times d" /> (例如 4096)</li>
                  <li><strong>显存占用：</strong> <span className="text-red-600 font-bold">巨大</span></li>
                </ul>
              </div>

              {/* 矩阵 B 的梯度 */}
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-400">
                <h4 className="font-bold text-gray-800 mb-2">更新矩阵 B (LoRA-FA)</h4>
                <div className="bg-gray-50 rounded p-3 mb-3 overflow-x-auto text-sm">
                  <BlockMath math="\frac{\partial L}{\partial B} = \underbrace{(XA)^T}_{\text{输入}} \cdot \frac{\partial L}{\partial Y}" />
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li><strong>必需存储：</strong> 低秩投影 <InlineMath math="XA" /></li>
                  <li><strong>维度：</strong> <InlineMath math="b \times s \times r" /> (例如 8)</li>
                  <li><strong>显存占用：</strong> <span className="text-green-600 font-bold">微小</span></li>
                </ul>
              </div>
            </div>
            
            <p className="text-indigo-800 mt-4 text-sm">
              <strong>结论：</strong> 因为 <InlineMath math="d" /> (如 4096) 远大于 <InlineMath math="r" /> (如 8)，存储 <InlineMath math="X" /> 比存储 <InlineMath math="XA" /> 多消耗几百倍的显存。LoRA-FA 通过冻结 <InlineMath math="A" />，无需计算其梯度，从而无需缓存巨大的 <InlineMath math="X" />。
            </p>
          </div>

          <h3 className="text-lg font-bold text-slate-800 mb-3">3.2 LoRA-FA 的权重更新空间</h3>
          <p className="text-slate-600 mb-3">
            在 LoRA-FA 中，<InlineMath math="A" /> 是固定的。权重的变化量 <InlineMath math="\Delta W" /> 可以表示为：
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 overflow-x-auto">
            <BlockMath math="\Delta W = AB = Q\bar{B} = \sum_{i=1}^{r} Q_{:,i}\bar{B}_{i,:}" />
          </div>

          {/* 几何直觉 */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-6">
            <h4 className="font-bold text-slate-800 text-lg mb-4 flex items-center">
              <Lightbulb className="w-5 h-5 mr-2 text-amber-500" />
              几何直觉：这句话到底是什么意思？
            </h4>
            
            <div className="space-y-4">
              <div>
                <h5 className="font-bold text-slate-700 mb-2">1. 什么是"列空间" (Column Space)？</h5>
                <p className="text-sm text-slate-600 leading-relaxed">
                  想象矩阵 <InlineMath math="A" /> 由 <InlineMath math="r" /> 个列向量组成。所谓"列空间"，就是这 <InlineMath math="r" /> 个向量所能张成的所有可能的空间。<br/>
                  <strong>比喻：</strong> 你在玩一个只有"上、下、左、右"按键的游戏。无论怎么按，你只能在二维平面（列空间）里移动，绝对飞不到天上去（三维空间）。
                </p>
              </div>
              <div>
                <h5 className="font-bold text-slate-700 mb-2">2. 为什么说 ΔW 是 A 的"线性组合"？</h5>
                <p className="text-sm text-slate-600 leading-relaxed">
                  这是矩阵乘法的定义。当我们计算 <InlineMath math="\Delta W = A \times B" /> 时，<InlineMath math="\Delta W" /> 中的每一列，实际上都是 <InlineMath math="A" /> 中各列的加权求和。这意味着：<strong>权重的更新量 <InlineMath math="\Delta W" /> 无法逃脱 <InlineMath math="A" /> 所画下的那个圈（子空间）。</strong>
                </p>
              </div>
              <div>
                <h5 className="font-bold text-slate-700 mb-2">3. QR 分解在这里的作用是什么？</h5>
                <p className="text-sm text-slate-600 leading-relaxed">
                  论文提到 <InlineMath math="A=QR" />，其中 <InlineMath math="Q" /> 是一组标准正交基。核心含义是：<strong>LoRA-FA 固定了更新的"方向" (<InlineMath math="A" /> 或 <InlineMath math="Q" />)，只允许我们调整在这个方向上走的"步长" (<InlineMath math="B" /> 或 <InlineMath math="\bar{B}" />)。</strong>
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-bold text-slate-800 mb-3">3.3 显存分析对比</h3>
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
            <h4 className="font-bold text-amber-700 mb-3">显存分析</h4>
            <div className="text-slate-700 text-sm space-y-2">
              <p><strong>标准 LoRA：</strong> 需要计算 <InlineMath math="dA = X^T dY B^T" />。必须存储 <strong><InlineMath math="X" /></strong> (维度 <InlineMath math="b \times s \times d" />)。</p>
              <p><strong>LoRA-FA：</strong> 不需要计算 <InlineMath math="dA" />。只需存储 <strong><InlineMath math="XA" /></strong> (维度 <InlineMath math="b \times s \times r" />)。</p>
              <p><strong>结论：</strong> 因为 <InlineMath math="r \ll d" /> (例如 r=4, d=4096)，LoRA-FA 的激活值显存占用大幅降低。</p>
            </div>
          </div>
        </section>

        {/* 4. 实验结果 */}
        <section id="experiments" className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200 mb-8 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 border-b pb-4">4. 实验结果与分析</h2>
          
          <p className="text-slate-600 mb-6">
            作者在 RoBERTa (NLU 任务), T5 (翻译任务), 和 LLaMA (MMLU 基准) 上进行了广泛的实验。
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="min-w-full text-sm text-left text-gray-500 border border-gray-200 rounded-lg overflow-hidden">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th className="px-4 py-3">模型与任务</th>
                  <th className="px-4 py-3">方法</th>
                  <th className="px-4 py-3">可训练参数</th>
                  <th className="px-4 py-3">性能</th>
                  <th className="px-4 py-3">显存 (GB)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b">
                  <td className="px-4 py-3 font-medium text-gray-900" rowSpan={3}>LLaMA-7B<br/>(MMLU 5-shot)</td>
                  <td className="px-4 py-3">Full FT</td>
                  <td className="px-4 py-3">6426.3M</td>
                  <td className="px-4 py-3">37.6</td>
                  <td className="px-4 py-3 text-red-500 font-bold">OOM</td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-4 py-3">LoRA</td>
                  <td className="px-4 py-3">152.5M</td>
                  <td className="px-4 py-3">37.2</td>
                  <td className="px-4 py-3">29.4</td>
                </tr>
                <tr className="bg-blue-50 border-b font-semibold">
                  <td className="px-4 py-3 text-blue-700">LoRA-FA</td>
                  <td className="px-4 py-3 text-blue-700">83M</td>
                  <td className="px-4 py-3 text-blue-700">37.4</td>
                  <td className="px-4 py-3 text-blue-700">27.5</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">性能表现</h3>
              <p className="text-slate-600 text-sm">
                实验结果表明，LoRA-FA 在大多数任务上都达到了与全参数微调和标准 LoRA <strong>极其接近甚至相当</strong>的性能。在某些任务（如 T5-large 翻译）中，LoRA-FA 甚至略微优于标准 LoRA。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">显存效率</h3>
              <p className="text-slate-600 text-sm">
                在 LLaMA-7B 实验中，LoRA-FA 将总显存消耗从 LoRA 的 29.4GB 降低到了 <strong>27.5GB</strong>。在 RoBERTa-large 上，显存从 22.5GB 降至 <strong>15.7GB</strong>，降幅显著。
              </p>
            </div>
          </div>
        </section>

        {/* 总结 */}
        <section className="bg-slate-900 text-slate-300 p-8 rounded-xl text-center">
          <h2 className="text-2xl font-bold text-white mb-4">总结</h2>
          <p className="max-w-2xl mx-auto leading-relaxed">
            LoRA-FA 提供了一种极其简单却有效的优化策略：通过冻结低秩适应中的投影降维矩阵 <InlineMath math="A" />，在几乎不损失性能的前提下，显著降低了微调大语言模型所需的激活值显存。它证明了模型权重的更新即使被限制在一个固定的随机低秩空间内，依然足以让 LLM 适应新的下游任务。
          </p>
        </section>

      </main>

      {/* Footer */}
      <footer className="text-center text-slate-400 py-8 text-sm border-t border-slate-200 bg-white">
        <p>基于论文: "LoRA-FA: Memory-Efficient Low-Rank Adaptation for Large Language Models Fine-Tuning"</p>
      </footer>
    </div>
  );
};

export default LoRAFAPaper;



