import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  HelpCircle,
  CheckCircle
} from 'lucide-react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const DoRAPaper = () => {
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
      const sections = ['intro', 'analysis', 'method', 'qa', 'experiment'];
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
      
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center text-slate-500 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="hidden sm:inline">返回首页</span>
          </Link>
          <span className="text-xl font-bold text-blue-600">DoRA 论文详解</span>
          <div className="hidden md:flex items-center space-x-4 text-sm font-medium text-slate-600">
            {['intro', 'analysis', 'method', 'qa', 'experiment'].map((id) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`hover:text-blue-600 transition ${activeSection === id ? 'text-blue-600' : ''}`}
              >
                {id === 'intro' ? '简介' : id === 'analysis' ? '分析' : id === 'method' ? '方法' : id === 'qa' ? 'Q&A' : '实验'}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-10 space-y-12">
        
        {/* Header */}
        <header className="text-center pb-10 border-b border-slate-200">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            DoRA: Weight-Decomposed Low-Rank Adaptation
          </h1>
          <p className="text-lg text-slate-500">
            权重分解低秩适应：弥合 PEFT 与全量微调之间的差距
          </p>
          <div className="mt-6 flex justify-center gap-2 flex-wrap">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">ICML 2024</span>
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">LLM Fine-tuning</span>
            <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">NVIDIA</span>
          </div>
        </header>

        {/* Introduction */}
        <section id="intro" className="scroll-mt-24">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="text-blue-500 mr-2">1.</span> 背景与动机
          </h2>
          <div className="text-base leading-relaxed space-y-4">
            <p>
              参数高效微调（PEFT）方法，如 <strong>LoRA (Low-Rank Adaptation)</strong>，因其低训练成本和无额外推理开销而广受欢迎。然而，研究发现 LoRA 与全量微调（Full Fine-Tuning, FT）之间仍存在精度差距。
            </p>
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
              <p className="text-amber-800 font-medium">
                核心问题：为什么 LoRA 的表现往往不如全量微调（FT）？这种差距仅仅是因为可训练参数量少吗？
              </p>
            </div>
            <p>
              DoRA 的作者提出了一种新的<strong>权重分解分析（Weight Decomposition Analysis）</strong>方法，揭示了 LoRA 和 FT 在学习模式上的根本差异，并据此提出了 DoRA，旨在结合 LoRA 的参数效率和 FT 的高学习能力。
            </p>
          </div>
        </section>

        {/* Analysis Section */}
        <section id="analysis" className="scroll-mt-24">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="text-blue-500 mr-2">2.</span> 核心洞察：LoRA vs FT
          </h2>
          <div className="text-base leading-relaxed space-y-4">
            <p>
              为了理解差异，作者借鉴了 <em>Weight Normalization</em> 的思想，将权重矩阵分解为<strong>幅度（Magnitude）</strong>和<strong>方向（Direction）</strong>两个部分。
            </p>
            
            <div className="bg-white border-l-4 border-blue-500 p-4 rounded-r-lg shadow-sm overflow-x-auto">
              <p className="text-sm text-slate-500 mb-2 font-mono">权重分解公式：</p>
              <BlockMath math="W = m \frac{V}{||V||_c}" />
            </div>
            
            <ul className="list-disc pl-6 space-y-2">
              <li><InlineMath math="W \in \mathbb{R}^{d \times k}" />：权重矩阵。</li>
              <li><InlineMath math="m \in \mathbb{R}^{1 \times k}" />：幅度向量（Magnitude vector）。</li>
              <li><InlineMath math="V \in \mathbb{R}^{d \times k}" />：方向矩阵（Directional matrix）。</li>
              <li><InlineMath math="||\cdot||_c" />：矩阵的列向量范数。</li>
            </ul>

            <h3 className="text-xl font-bold mt-8 mb-4">学习模式的差异详解</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
                <h4 className="font-bold text-red-500 mb-2 text-lg">LoRA：正比例关系</h4>
                <p className="text-sm mb-3">
                  在 LoRA 的更新中，幅度变化 (<InlineMath math="\Delta M" />) 和方向变化 (<InlineMath math="\Delta D" />) 倾向于呈<strong>正相关/线性关系</strong>。
                </p>
                <ul className="list-disc pl-4 text-sm space-y-1 text-slate-600">
                  <li><strong>现象：</strong> 当 LoRA 想要大幅度改变权重的方向时，它往往被迫同时也大幅度改变权重的幅度。</li>
                  <li><strong>限制：</strong> 很难执行"大幅度调整方向但保持幅度不变"这种微妙的操作。</li>
                  <li><strong>结果：</strong> 这种耦合限制了模型的搜索空间和学习能力。</li>
                </ul>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
                <h4 className="font-bold text-green-500 mb-2 text-lg">Full FT：负相关关系</h4>
                <p className="text-sm mb-3">
                  全量微调展现出更复杂的模式，通常呈现<strong>负相关</strong>。
                </p>
                <ul className="list-disc pl-4 text-sm space-y-1 text-slate-600">
                  <li><strong>现象：</strong> FT 可以在<strong>方向变化很大</strong>的同时，保持<strong>幅度变化很小</strong>。</li>
                  <li><strong>原因：</strong> 预训练权重通常已经具备很好的特征提取能力。下游微调时，模型往往只需要调整向量的方向来适应新任务。</li>
                  <li><strong>优势：</strong> 这种解耦的能力让 FT 更灵活，能够更精准地找到最优解。</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
              <h4 className="font-bold text-blue-800 mb-2">💡 总结：为什么"负相关"更优？</h4>
              <p className="text-slate-700 text-sm leading-relaxed">
                在预训练模型的基础上，大部分权重的模长（Magnitude）已经处于比较好的状态，微调的重点在于调整方向（Direction）以对齐新任务。
                <br/><br/>
                <strong>LoRA 的缺陷在于它把这两者"绑"在了一起</strong>，如果它想大改方向，往往会错误地同时也大改幅度。而 DoRA 通过显式解耦这两个分量，让模型可以像 FT 一样，独立地只改方向而不乱改幅度。
              </p>
            </div>
          </div>
        </section>

        {/* Method Section */}
        <section id="method" className="scroll-mt-24">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="text-blue-500 mr-2">3.</span> DoRA 方法详解
          </h2>
          <div className="text-base leading-relaxed space-y-6">
            <p>
              为了弥补 LoRA 的不足，DoRA 明确将微调过程分解为两个独立的部分：<strong>幅度 (<InlineMath math="m" />)</strong> 和 <strong>方向 (LoRA)</strong>。
            </p>

            {/* Core Formula */}
            <div className="bg-slate-800 text-white p-6 rounded-lg shadow-lg overflow-x-auto">
              <p className="text-xs uppercase tracking-widest text-slate-400 mb-3 font-bold">DoRA 核心公式</p>
              <BlockMath math="W' = \underline{m} \frac{V + \Delta V}{||V + \Delta V||_c} = \underline{m} \frac{W_0 + \underline{B}\underline{A}}{||W_0 + \underline{B}\underline{A}||_c}" />
              <p className="text-sm text-slate-300 mt-4">
                <span className="text-green-400 font-bold">下划线</span> 表示可训练参数。DoRA 仅训练向量 <InlineMath math="m" /> 和低秩矩阵 <InlineMath math="B, A" />。
              </p>
            </div>

            {/* Process Steps */}
            <div className="grid gap-6 md:grid-cols-3">
              {/* Step 1 */}
              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-lg font-bold text-blue-600 mb-3">Step 1: 初始化</h4>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                    <span><strong>方向 V:</strong> 使用预训练权重 <InlineMath math="W_0" />，保持冻结。</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                    <span><strong>幅度 m:</strong> 初始化为 <InlineMath math="||W_0||_c" />。</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                    <span><strong>LoRA:</strong> <InlineMath math="B=0" />, <InlineMath math="A" /> 高斯初始化。</span>
                  </li>
                </ul>
              </div>

              {/* Step 2 */}
              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-lg font-bold text-green-600 mb-3">Step 2: 训练</h4>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                    <span><strong>解耦更新:</strong> <InlineMath math="m" /> 调整幅度，LoRA 调整方向。</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                    <span><strong>参数效率:</strong> <InlineMath math="m" /> 只是 <InlineMath math="1 \times k" /> 向量，仅增加约 0.01%。</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                    <span><strong>稳定性:</strong> 分解带来更优的梯度特性。</span>
                  </li>
                </ul>
              </div>

              {/* Step 3 */}
              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-lg font-bold text-purple-600 mb-3">Step 3: 推理</h4>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                    <span><strong>无缝合并:</strong> 将 <InlineMath math="m" /> 和 <InlineMath math="BA" /> 合并回单一权重矩阵。</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                    <span><strong>零延迟:</strong> 推理时退化为标准 Linear 层，<span className="text-red-600 font-medium">无额外开销</span>。</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Gradient Analysis */}
            <div className="bg-slate-50 border-l-4 border-indigo-500 p-6 rounded-r-lg mt-8">
              <h3 className="text-xl font-bold text-indigo-900 mb-4">深入分析：梯度与工程优化</h3>
              <p className="mb-4 text-sm text-slate-700">理解 <InlineMath math="V'" /> 是理解显存开销的关键：</p>
              
              <div className="overflow-x-auto mb-6 bg-white p-4 rounded border border-indigo-100">
                <p className="text-xs font-bold text-slate-500 uppercase mb-2">公式定义</p>
                <p className="text-sm mb-3">
                  <span className="font-bold text-red-600">什么是 <InlineMath math="V'" />？</span> 
                  <InlineMath math="V'" /> 是当前的"总方向矩阵"：<InlineMath math="V' = W_0 + BA" />
                </p>
                <p className="text-xs font-bold text-slate-500 uppercase mb-2 mt-4">梯度公式</p>
                <BlockMath math="\nabla_{V'} \mathcal{L} = \frac{m}{||V'||_c} \left( I - \frac{V'V'^T}{||V'||_c^2} \right) \nabla_{W'} \mathcal{L}" />
              </div>

              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <span className="block font-bold text-indigo-600 mb-2 text-base">1. 数学特性：稳定性提升</span>
                  <ul className="space-y-2 text-slate-600 list-disc pl-4">
                    <li><strong>自动缩放:</strong> 因子 <InlineMath math="\frac{m}{||V'||_c}" /> 类似自适应学习率，加速收敛。</li>
                    <li><strong>投影:</strong> <InlineMath math="(I - \dots)" /> 将梯度投影到与权重方向垂直的空间，确保 LoRA 专注于调整"方向"。</li>
                  </ul>
                </div>
                
                <div className="bg-amber-50 p-4 rounded border border-amber-200">
                  <span className="block font-bold text-amber-700 mb-2 text-base">2. 工程优化：显存大杀器</span>
                  <ul className="space-y-2 text-slate-600 list-disc pl-4">
                    <li><strong className="text-amber-800">问题：</strong> 梯度公式中 <InlineMath math="||V'||_c" /> 需要对 <InlineMath math="V'" /> 求导，需要巨大计算图。</li>
                    <li><strong className="text-amber-800">优化：</strong> 将分母中的 <InlineMath math="||V'||_c" /> 视为<strong>常数</strong>（使用 <code>.detach()</code>）。</li>
                    <li><strong className="text-amber-800">结果：</strong> 节省约 24.4% 显存，且精度无损。</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* QA Section */}
        <section id="qa" className="bg-indigo-50 -mx-4 px-4 py-10 rounded-xl scroll-mt-24">
          <h2 className="text-2xl font-bold text-indigo-900 mb-6 flex items-center">
            <HelpCircle className="w-6 h-6 mr-2" />
            深入解析：参数定义与维度 (Q&A)
          </h2>
          
          <div className="space-y-4">
            {/* Q1 */}
            <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-green-500">
              <h3 className="font-bold text-lg text-slate-800 mb-2">Q1: m 是用"全量微调"还是 LoRA 微调？</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                <span className="bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded text-xs mr-2">结论</span>
                <strong><InlineMath math="m" /> 是使用"全量微调"（直接更新）的方式训练的，而不是 LoRA。</strong>
              </p>
              <ul className="mt-3 list-disc pl-5 text-sm text-slate-600 space-y-1">
                <li><strong>详细解释：</strong> <InlineMath math="m" /> 是一个独立的、可训练的向量参数。在训练过程中，我们会计算 <InlineMath math="m" /> 的梯度并直接更新它的每一个元素。</li>
                <li><strong>为什么不用 LoRA？</strong> <InlineMath math="m" /> 本身非常小（只有 <InlineMath math="1 \times k" />），占总参数不到 0.01%，因此没有必要对它再做低秩分解。</li>
              </ul>
            </div>

            {/* Q2 */}
            <div className="bg-white p-5 rounded-lg shadow-sm border border-indigo-100">
              <h3 className="font-bold text-lg text-slate-800 mb-2">Q2: V 是通过 LoRA 微调的吗？</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                <strong>是的。</strong> <InlineMath math="V" /> 代表方向矩阵。在 DoRA 中，基础方向 <InlineMath math="W_0" /> 被冻结，方向的增量 <InlineMath math="\Delta V" /> 完全由 LoRA 的低秩矩阵乘积 (<InlineMath math="B \times A" />) 提供。
              </p>
            </div>

            {/* Q3 */}
            <div className="bg-white p-5 rounded-lg shadow-sm border border-indigo-100">
              <h3 className="font-bold text-lg text-slate-800 mb-2">Q3: k 是什么？为什么 m 是 1×k？</h3>
              <div className="text-slate-600 text-sm leading-relaxed space-y-2">
                <p>
                  在论文符号 <InlineMath math="W \in \mathbb{R}^{d \times k}" /> 中，<strong><InlineMath math="k" /> 代表矩阵的列数</strong>。在权重归一化的上下文中，我们将每一列视为一个独立的<strong>权重向量</strong>（对应一个输出神经元）。
                </p>
                <div className="bg-slate-50 p-3 rounded border border-slate-200">
                  <p className="text-xs text-slate-500 mb-1 font-medium">形象理解：</p>
                  <p>假设 <InlineMath math="W" /> 有 <InlineMath math="k" /> 个神经元，每个神经元有 <InlineMath math="d" /> 个输入权重。我们需要给这 <InlineMath math="k" /> 个神经元每一个都分配一个独立的"模长/幅度"。因此，幅度向量 <InlineMath math="m" /> 的长度必须是 <InlineMath math="k" />。</p>
                </div>
              </div>
            </div>

            {/* Q4 */}
            <div className="bg-white p-5 rounded-lg shadow-sm border border-indigo-100">
              <h3 className="font-bold text-lg text-slate-800 mb-2">Q4: 列范数 (Column Norm) 是如何计算的？</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">
                列范数是指对矩阵的<strong>每一列</strong>分别计算欧几里得范数（<InlineMath math="L_2" /> Norm）。
              </p>
              <div className="bg-indigo-50 border border-indigo-200 p-3 rounded overflow-x-auto">
                <BlockMath math="||w_j||_c = \sqrt{\sum_{i=1}^{d} w_{i,j}^2}" />
              </div>
              <p className="text-xs text-slate-500 mt-2">其中 <InlineMath math="w_{i,j}" /> 表示矩阵第 <InlineMath math="i" /> 行第 <InlineMath math="j" /> 列的元素。结果是一个长度为 <InlineMath math="k" /> 的向量。</p>
            </div>

            {/* Q5 */}
            <div className="bg-white p-5 rounded-lg shadow-sm border border-indigo-100">
              <h3 className="font-bold text-lg text-slate-800 mb-2">Q5: 为什么把 ||V'||_c 视为常数能省显存？</h3>
              <div className="text-slate-600 text-sm leading-relaxed space-y-2">
                <p>
                  因为 <InlineMath math="||V'||_c" /> 的计算依赖于 <InlineMath math="V'" /> 中的每一个元素（也就是依赖于可训练参数 <InlineMath math="B" /> 和 <InlineMath math="A" />）。
                </p>
                <ul className="list-disc pl-5">
                  <li><strong>如果不优化：</strong> PyTorch 需要保留整个计算图，以便通过链式法则计算梯度。这需要保存大量的中间状态。</li>
                  <li><strong>优化后 (detach)：</strong> 告诉 PyTorch "不要计算这个范数项的导数"。这切断了从分母回传梯度的路径，极大减少了反向传播所需的内存。</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Experiments Section */}
        <section id="experiment" className="scroll-mt-24">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="text-blue-500 mr-2">4.</span> 实验结果
          </h2>
          <div className="text-base leading-relaxed space-y-4">
            <p>
              论文在常识推理（Commonsense Reasoning）、视觉指令微调（Visual Instruction Tuning）和图像/视频-文本理解等任务上进行了广泛测试。
            </p>
            
            <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase">模型 / 任务</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase">LoRA</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase">DoRA (Ours)</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase">提升</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200 text-sm">
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-900">LLaMA-7B (常识推理)</td>
                    <td className="px-4 py-3 text-slate-500">74.7%</td>
                    <td className="px-4 py-3 font-bold text-blue-600">78.1%</td>
                    <td className="px-4 py-3 text-green-600 font-bold">+3.4%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-900">LLaMA2-7B (常识推理)</td>
                    <td className="px-4 py-3 text-slate-500">77.6%</td>
                    <td className="px-4 py-3 font-bold text-blue-600">80.5%</td>
                    <td className="px-4 py-3 text-green-600 font-bold">+2.9%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-900">LLaVA-1.5-7B (视觉微调)</td>
                    <td className="px-4 py-3 text-slate-500">66.9%</td>
                    <td className="px-4 py-3 font-bold text-blue-600">67.6%</td>
                    <td className="px-4 py-3 text-green-600 font-bold">+0.7%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-500 text-center">* DoRA 在保持相同或更少参数量的情况下，性能显著优于 LoRA。</p>

            <h3 className="text-xl font-bold mt-8 mb-3">关键发现</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong>更接近全量微调：</strong> DoRA 的学习模式（幅度与方向更新的相关性）与 FT 极其相似，呈现负相关趋势。</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong>低秩鲁棒性：</strong> 即使将 Rank 减半，DoRA 的性能依然优于标准 Rank 的 LoRA。</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong>兼容性：</strong> DoRA 可以与其他 LoRA 变体（如 VeRA）结合，形成 DVoRA。</span>
              </div>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <footer className="mt-16 pt-10 border-t border-slate-200 text-center">
          <h2 className="text-2xl font-bold mb-4">总结</h2>
          <p className="text-base text-slate-600 max-w-2xl mx-auto mb-8">
            DoRA 通过解耦幅度和方向的更新，成功模拟了全量微调的学习行为。它不仅提升了模型在各类下游任务上的准确率，还保持了 LoRA 无推理延迟的优点，是目前微调大模型的一个极佳选择。
          </p>
          <div className="text-sm text-slate-400 pb-10">
            基于 "DoRA: Weight-Decomposed Low-Rank Adaptation" (Liu et al., ICML 2024) 制作
          </div>
        </footer>
      </main>
    </div>
  );
};

export default DoRAPaper;



