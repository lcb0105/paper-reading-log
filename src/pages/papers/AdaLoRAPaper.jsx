import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search,
  CheckCircle
} from 'lucide-react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const AdaLoRAPaper = () => {
  const [activeSection, setActiveSection] = useState('abstract');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['abstract', 'motivation', 'method', 'experiments', 'conclusion'];
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
    <div className="min-h-screen bg-slate-50 text-slate-700 font-sans">
      
      {/* Header */}
      <header className="bg-slate-900 text-white pt-20 pb-12">
        <nav className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md z-50 border-b border-slate-800">
          <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center text-slate-300 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-medium hidden sm:inline">返回首页</span>
            </Link>
            <div className="hidden md:flex space-x-4 text-sm">
              {['motivation', 'method', 'experiments'].map((id) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`px-2 py-1 rounded transition-colors ${
                    activeSection === id ? 'text-blue-400' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {id === 'motivation' ? '动机' : id === 'method' ? '方法' : '实验'}
                </button>
              ))}
            </div>
          </div>
        </nav>
        
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">AdaLoRA: 自适应参数预算分配的参数高效微调</h1>
          <p className="text-lg text-slate-300">ADALORA: ADAPTIVE BUDGET ALLOCATION FOR PARAMETER-EFFICIENT FINE-TUNING</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium">
            <span className="bg-blue-600 px-3 py-1 rounded-full">ICLR 2023</span>
            <span className="bg-slate-700 px-3 py-1 rounded-full">PEFT</span>
            <span className="bg-slate-700 px-3 py-1 rounded-full">NLP</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10">
        
        {/* Abstract Section */}
        <section id="abstract" className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 mb-8 scroll-mt-24">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-slate-200">1. 核心摘要 (Abstract)</h2>
          <p className="leading-relaxed mb-4">
            在微调大型预训练语言模型（PLM）时，全量微调的成本过高。现有的低秩适应方法（如 LoRA）虽然减少了参数量，但通常将参数预算<strong>均匀分配</strong>给所有模块，忽略了不同层和模块（如前馈网络 vs 自注意力机制）重要性的差异。
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
            <strong className="text-blue-800">AdaLoRA 的核心贡献：</strong>
            <ul className="list-disc ml-5 mt-2 space-y-1 text-slate-700">
              <li>提出以 <strong>SVD（奇异值分解）</strong> 形式参数化增量更新。</li>
              <li>根据<strong>重要性得分</strong>动态分配参数预算。</li>
              <li>通过修剪不重要的奇异值来减少预算，同时利用正交正则化避免了昂贵的精确 SVD 计算。</li>
            </ul>
          </div>
        </section>

        {/* Motivation Section */}
        <section id="motivation" className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 mb-8 scroll-mt-24">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-slate-200">2. 动机与背景 (Motivation)</h2>
          
          <h3 className="text-xl font-semibold mb-3 text-slate-800">LoRA 的局限性</h3>
          <p className="mb-4">
            LoRA (Low-Rank Adaptation) 将权重更新 <InlineMath math="\Delta" /> 建模为两个低秩矩阵的乘积：
          </p>
          <div className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto">
            <BlockMath math="W = W^{(0)} + \Delta = W^{(0)} + BA" />
          </div>
          <p className="mb-4">
            其中 <InlineMath math="r" /> 是预先设定的秩。LoRA 的问题在于它对所有层和模块使用<strong>相同的秩 <InlineMath math="r" /></strong>。然而，研究表明：
          </p>
          <ul className="list-disc ml-5 mb-4 space-y-2">
            <li>微调 FFN（前馈网络）通常比微调 Self-Attention 效果更好。</li>
            <li>模型顶层的权重矩阵通常比底层更重要。</li>
          </ul>
          <p>
            因此，<strong>自适应地分配预算</strong>（即对重要的模块使用更高的秩，不重要的模块使用更低的秩）是提升性能的关键。
          </p>
        </section>

        {/* Methodology Section */}
        <section id="method" className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 mb-8 scroll-mt-24">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2 border-slate-200">3. AdaLoRA 方法详解 (Methodology)</h2>
          
          {/* 3.1 SVD 参数化 */}
          <h3 className="text-xl font-semibold mb-3 text-blue-700">3.1 SVD 参数化 (SVD-based Adaptation)</h3>
          <p className="mb-3">为了方便控制秩，AdaLoRA 不使用矩阵乘积 <InlineMath math="BA" />，而是直接模拟 SVD 分解的形式：</p>
          <div className="bg-slate-100 border-l-4 border-slate-400 rounded-r-lg p-4 mb-4 overflow-x-auto">
            <BlockMath math="W = W^{(0)} + \Delta = W^{(0)} + P\Lambda Q" />
          </div>
          <ul className="list-disc ml-5 mb-6 text-sm text-slate-600 space-y-1">
            <li><InlineMath math="P \in \mathbb{R}^{d_1 \times r}" />：左奇异向量矩阵。</li>
            <li><InlineMath math="Q \in \mathbb{R}^{r \times d_2}" />：右奇异向量矩阵。</li>
            <li><InlineMath math="\Lambda \in \mathbb{R}^{r \times r}" />：对角矩阵，包含奇异值 <InlineMath math="\{\lambda_i\}_{1\le i\le r}" />。</li>
          </ul>

          {/* 3.2 正交正则化 */}
          <h3 className="text-xl font-semibold mb-3 text-blue-700">3.2 正交正则化 (Orthogonal Regularization)</h3>
          <p className="mb-3">为了避免在训练过程中频繁进行高成本的 SVD 计算，AdaLoRA 引入正则化项强制 <InlineMath math="P" /> 和 <InlineMath math="Q" /> 保持正交性：</p>
          <div className="bg-slate-100 border-l-4 border-slate-400 rounded-r-lg p-4 mb-4 overflow-x-auto">
            <BlockMath math="R(P,Q) = ||P^{\top}P - I||_{F}^{2} + ||QQ^{\top} - I||_{F}^{2}" />
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
            <h4 className="font-bold text-sm text-slate-600 mb-2">公式详细解读：</h4>
            <ul className="list-disc ml-5 space-y-2 text-sm text-slate-600">
              <li><span className="font-semibold text-blue-600"><InlineMath math="|| \cdot ||_{F}^{2}" /> (Frobenius 范数平方)</span>：矩阵中所有元素的平方和，用于衡量两个矩阵之间的距离。</li>
              <li><span className="font-semibold text-blue-600"><InlineMath math="I" /> (单位矩阵)</span>：代表完美的正交性。对于标准正交矩阵 <InlineMath math="U" />，有 <InlineMath math="U^{\top}U = I" />。</li>
              <li><span className="font-semibold text-blue-600"><InlineMath math="P^{\top}P - I" /></span>：衡量矩阵 <InlineMath math="P" /> 的列向量是否正交且归一化。</li>
            </ul>
          </div>

          {/* 3.3 重要性分配 */}
          <h3 className="text-xl font-semibold mb-3 text-blue-700">3.3 基于重要性的秩分配 (Rank Allocation)</h3>
          <p className="mb-3">AdaLoRA 将参数分为三元组 <InlineMath math="\mathcal{G}_{k,i} = \{P_{k,*i}, \lambda_{k,i}, Q_{k,i*}\}" />。综合重要性得分 <InlineMath math="S_{k,i}" /> 定义为：</p>
          <div className="bg-slate-100 border-l-4 border-slate-400 rounded-r-lg p-4 mb-4 overflow-x-auto">
            <BlockMath math="S_{k,i} = s(\lambda_{k,i}) + \frac{1}{d_1}\sum_{j=1}^{d_1}s(P_{k,ji}) + \frac{1}{d_2}\sum_{j=1}^{d_2}s(Q_{k,ij})" />
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
            <p className="mb-2 text-sm"><strong>该公式的物理含义：</strong>一个三元组的重要性由三部分组成：</p>
            <ol className="list-decimal ml-5 space-y-1 text-sm text-slate-600">
              <li><span className="font-semibold text-blue-600"><InlineMath math="s(\lambda_{k,i})" /></span>：奇异值本身的重要性。</li>
              <li><span className="font-semibold text-blue-600"><InlineMath math="\frac{1}{d_1}\sum s(P)" /></span>：对应的左奇异向量所有元素的平均重要性。</li>
              <li><span className="font-semibold text-blue-600"><InlineMath math="\frac{1}{d_2}\sum s(Q)" /></span>：对应的右奇异向量所有元素的平均重要性。</li>
            </ol>
          </div>

          <p className="mb-3">其中 <InlineMath math="s(\cdot)" /> 是单个参数的重要性评分，使用<strong>平滑灵敏度</strong>和<strong>不确定性</strong>的乘积：</p>
          <div className="bg-slate-100 border-l-4 border-slate-400 rounded-r-lg p-4 mb-4 overflow-x-auto">
            <BlockMath math="s^{(t)}(w_{ij}) = \overline{I}^{(t)}(w_{ij}) \cdot \overline{U}^{(t)}(w_{ij})" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-bold text-sm text-blue-600 mb-2">1. 基础灵敏度 (Sensitivity)</h4>
              <div className="overflow-x-auto mb-2">
                <BlockMath math="I(w_{ij}) = |w_{ij} \nabla_{w_{ij}}\mathcal{L}|" />
              </div>
              <p className="text-xs text-slate-500">
                基于一阶泰勒展开，估算如果将该参数置零，Loss 会变化多少。
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-bold text-sm text-blue-600 mb-2">2. 平滑灵敏度 (Smoothed)</h4>
              <div className="overflow-x-auto mb-2">
                <BlockMath math="\overline{I}^{(t)} = \beta_1 \overline{I}^{(t-1)} + (1-\beta_1)I^{(t)}" />
              </div>
              <p className="text-xs text-slate-500">
                使用指数移动平均 (EMA) 来平滑 mini-batch 带来的梯度噪声。
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
            <h4 className="font-bold text-sm text-blue-600 mb-2">3. 不确定性度量 (Uncertainty)</h4>
            <div className="overflow-x-auto mb-2">
              <BlockMath math="\overline{U}^{(t)} = \beta_2 \overline{U}^{(t-1)} + (1-\beta_2)|I^{(t)} - \overline{I}^{(t)}|" />
            </div>
            <p className="text-xs text-slate-500">
              衡量灵敏度的波动程度。如果一个参数的灵敏度剧烈波动，说明模型对其依赖尚不稳定，需要通过 <strong>UCB</strong> 思想给予更高的保留权重，以防止过早剪枝。
            </p>
          </div>

          {/* Deep Dive Q&A Box */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-8">
            <h4 className="text-lg font-bold text-green-800 mb-3 flex items-center">
              <Search className="w-5 h-5 mr-2" />
              深度解析：EMA 如何保证连续性？
            </h4>
            <p className="mb-3 text-sm font-semibold text-green-900">
              答案：通过 <strong>EMA（指数移动平均）</strong> 建立了跨 Batch 的强连续性。
            </p>
            
            <h5 className="text-sm font-bold text-green-800 mt-4 mb-2">数学证明：为什么它包含了"全局"历史信息？</h5>
            <p className="text-sm text-green-800 mb-2">
              把平滑灵敏度公式不断递归展开：
            </p>
            <div className="overflow-x-auto bg-green-100/50 p-3 rounded border border-green-200 mb-3 text-sm">
              <BlockMath math="\overline{I}^{(t)} = (1-\beta_1)I^{(t)} + \beta_1(1-\beta_1)I^{(t-1)} + \beta_1^2(1-\beta_1)I^{(t-2)} + \dots" />
            </div>
            <p className="text-sm text-green-800">
              <strong>结论：</strong> <InlineMath math="\overline{I}^{(t)}" /> 实际上是<strong>过去所有 Batch</strong> 的加权和。虽然当前 Batch 的贡献最大，但之前所有 Batch 的信息都以 <InlineMath math="\beta_1" /> 的衰减率保存在了这个数值中。
            </p>
          </div>

          {/* 3.4 全局预算调度 */}
          <h3 className="text-xl font-semibold mb-3 text-blue-700">3.4 全局预算调度 (Global Budget Scheduler)</h3>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <h4 className="font-bold text-sm text-amber-800 mb-1">📢 <InlineMath math="b^{(t)}" /> 的定义：总秩和 (Total Rank Sum)</h4>
            <p className="text-sm text-amber-900">
              <InlineMath math="b^{(t)}" /> 是指在第 <InlineMath math="t" /> 步时，模型中所有增量矩阵的秩的总和：<InlineMath math="b^{(t)} = \sum_{k=1}^{n} r_k^{(t)}" />
            </p>
          </div>

          <p className="mb-3">预算 <InlineMath math="b^{(t)}" /> 遵循立方衰减策略，分为三个阶段：</p>
          <div className="bg-slate-100 border-l-4 border-slate-400 rounded-r-lg p-4 mb-6 overflow-x-auto text-sm">
            <BlockMath math="b^{(t)} = \begin{cases} b^{(0)} & 0 \le t < t_i \\ b^{(T)} + (b^{(0)} - b^{(T)})(1 - \frac{t - t_i}{T - t_i - t_f})^3 & t_i \le t < T - t_f \\ b^{(T)} & \text{otherwise} \end{cases}" />
          </div>

          <div className="space-y-3">
            <div className="bg-white p-4 rounded-lg border-l-4 border-yellow-400 border border-slate-200">
              <h4 className="font-bold text-sm text-slate-700">第一阶段：热身期 (Warm-up)</h4>
              <p className="text-xs text-slate-500 mt-1">时间范围：<InlineMath math="0 \le t < t_i" /></p>
              <p className="text-sm mt-2 text-slate-600">
                <strong>预算：</strong> 保持初始高预算 <InlineMath math="b^{(0)}" />（通常是目标预算的 1.5 倍）。<br/>
                <strong>目的：</strong> 让模型在初始阶段有足够的自由度去探索参数空间。
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-blue-400 border border-slate-200">
              <h4 className="font-bold text-sm text-slate-700">第二阶段：立方衰减期 (Cubic Decay)</h4>
              <p className="text-xs text-slate-500 mt-1">时间范围：<InlineMath math="t_i \le t < T - t_f" /></p>
              <p className="text-sm mt-2 text-slate-600">
                <strong>预算：</strong> 按照立方函数 <InlineMath math="(1-\tau)^3" /> 的趋势平滑下降。<br/>
                <strong>物理含义：</strong> 先快后慢，模型会先快速剔除冗余参数，接近终点时剪枝速度变得非常缓慢（软着陆）。
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-400 border border-slate-200">
              <h4 className="font-bold text-sm text-slate-700">第三阶段：微调修复期 (Final Fine-tuning)</h4>
              <p className="text-xs text-slate-500 mt-1">时间范围：<InlineMath math="t \ge T - t_f" /></p>
              <p className="text-sm mt-2 text-slate-600">
                <strong>预算：</strong> 固定为最终目标预算 <InlineMath math="b^{(T)}" />。<br/>
                <strong>目的：</strong> 停止剪枝，让剩余参数适应当前结构，修复因剪枝带来的微小性能损失。
              </p>
            </div>
          </div>
        </section>

        {/* Experiments Section */}
        <section id="experiments" className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 mb-8 scroll-mt-24">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2 border-slate-200">4. 实验结果与分析 (Experiments)</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-bold text-lg mb-2">NLU 任务 (GLUE)</h3>
              <p className="text-sm mb-4">在 DeBERTaV3-base 上，AdaLoRA 在不同预算下均优于基线。特别是在<strong>极低预算 (0.3M 参数)</strong> 下，AdaLoRA 的优势最为明显，例如在 RTE 数据集上比最佳基线高出 1.8%。</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">QA 任务 (SQuAD)</h3>
              <p className="text-sm mb-4">在 SQuAD v1.1 和 v2.0 上，AdaLoRA 在 F1 分数上始终优于 LoRA 和 Adapter。Adapter 类方法在预算减少时性能急剧下降，而 AdaLoRA 表现稳健。</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-2">为什么 AdaLoRA 有效？</h3>
            <p className="mb-4">通过分析 AdaLoRA 分配的秩分布（Rank Distribution），论文发现：</p>
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <span><strong>FFN 模块</strong>获得了比 Attention 模块更多的秩（预算）。</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <span><strong>高层网络 (Top Layers)</strong> 获得了比底层更多的秩。</span>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-600">这与直觉一致：高层网络通常包含更多任务特定的语义信息，而 FFN 通常被认为是存储知识的关键区域。</p>
          </div>
        </section>

        {/* Conclusion Section */}
        <section id="conclusion" className="bg-slate-800 text-white rounded-xl p-6 md:p-8 mb-8 scroll-mt-24">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-slate-600">5. 结论 (Conclusion)</h2>
          <p className="leading-relaxed">
            AdaLoRA 提出了一种基于 SVD 参数化和重要性感知预算分配的微调方法。通过动态地将参数预算分配给对模型性能贡献最大的模块，AdaLoRA 在保持参数高效的同时，显著提升了模型在下游任务上的性能，特别是在低参数预算的限制下。
          </p>
        </section>

      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-slate-500 text-sm border-t border-slate-200 bg-white">
        <p>基于 ICLR 2023 论文 "AdaLoRA: Adaptive Budget Allocation for Parameter-Efficient Fine-Tuning" 制作</p>
      </footer>
    </div>
  );
};

export default AdaLoRAPaper;



