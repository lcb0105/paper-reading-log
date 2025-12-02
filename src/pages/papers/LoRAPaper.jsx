import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  Zap,
  HardDrive,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const LoRAPaper = () => {
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
      const sections = ['intro', 'method', 'advantages', 'implementation', 'experiments', 'analysis', 'conclusion'];
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
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      
      {/* 固定顶部导航栏 */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-sm z-50 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-medium hidden sm:inline">返回首页</span>
          </Link>
          
          <div className="font-bold text-gray-800 text-sm sm:text-base flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            LoRA 论文详解
          </div>

          <div className="flex gap-1">
            {['method', 'advantages', 'experiments'].map((id) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`px-2 py-1 rounded-md transition-all text-xs hidden sm:block ${
                  activeSection === id 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                {id === 'method' ? '方法' : id === 'advantages' ? '优势' : '实验'}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        
        {/* Header */}
        <header id="intro" className="text-center mb-12 scroll-mt-28">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-900">
            LoRA: Low-Rank Adaptation of Large Language Models
          </h1>
          <p className="text-lg text-gray-600 mb-4">论文核心内容深度解析与公式推导</p>
          <div className="flex justify-center gap-4 text-sm text-gray-500">
            <span>Microsoft Corporation</span>
            <span>•</span>
            <span>ICLR 2022</span>
          </div>
        </header>

        {/* 1. Introduction */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">1. 核心问题与背景</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            在自然语言处理（NLP）领域，通常的范式是在大规模通用数据上预训练（Pre-training），然后针对特定任务进行微调（Fine-tuning）。然而，随着模型变得越来越大（例如 GPT-3 拥有 1750 亿参数），全参数微调（Full Fine-tuning）变得极不可行。
          </p>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
            <strong className="text-blue-800">痛点：</strong>
            <span className="text-blue-900"> 为每个下游任务部署一个独立的 175B 模型副本在存储和计算上都极其昂贵。</span>
          </div>
          
          <p className="text-gray-600 leading-relaxed">
            现有的解决方案（如 Adapter Layers 或 Prefix-Tuning）虽然减少了参数量，但往往引入了<strong>推理延迟（Inference Latency）</strong>或减少了模型的有效序列长度。<strong>LoRA (Low-Rank Adaptation)</strong> 提出了一种新的解决方案，在冻结预训练模型权重的条件下，向 Transformer 层注入可训练的秩分解矩阵。
          </p>
        </section>

        {/* 2. Method */}
        <section id="method" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 mb-8 scroll-mt-28">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2">2. LoRA 方法详解 (核心原理)</h2>
          
          <p className="text-gray-600 leading-relaxed mb-6">
            LoRA 的核心灵感来自于一项研究结论：过参数化的模型实际上位于一个较低的"内在维度"（Intrinsic Dimension）上。作者假设，在模型适应（Adaptation）过程中，<strong>权重的更新量 <InlineMath math="\Delta W" /> 也具有较低的"内在秩"（Intrinsic Rank）</strong>。
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 矩阵重参数化 (Matrix Reparametrization)</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            对于一个预训练的权重矩阵 <InlineMath math="W_0 \in \mathbb{R}^{d \times k}" />，LoRA 限制其更新量 <InlineMath math="\Delta W" /> 为低秩分解形式：
          </p>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 overflow-x-auto text-center">
            <BlockMath math="W_0 + \Delta W = W_0 + BA" />
          </div>
          
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li><InlineMath math="B \in \mathbb{R}^{d \times r}" /></li>
            <li><InlineMath math="A \in \mathbb{R}^{r \times k}" /></li>
            <li>秩 <InlineMath math="r \ll \min(d, k)" /> (例如 r 可以取 1, 2, 4 等极小值)</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 前向传播公式</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            在训练过程中，<InlineMath math="W_0" /> 被冻结（不接受梯度更新），只有 <InlineMath math="A" /> 和 <InlineMath math="B" /> 是可训练参数。对于输入 <InlineMath math="x" />，修改后的前向传播公式为：
          </p>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-4 mb-6 overflow-x-auto">
            <BlockMath math="h = W_0 x + \Delta W x = W_0 x + BAx" />
          </div>

          {/* Architecture Diagram */}
          <div className="flex justify-center my-8">
            <div className="bg-gray-50 p-6 border rounded-xl max-w-md w-full">
              <div className="flex items-center justify-center gap-8">
                {/* Left: Pretrained */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-32 bg-gradient-to-b from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg">
                    <div className="text-center">
                      <div>W₀</div>
                      <div className="text-[10px] opacity-80 mt-1">(冻结)</div>
                    </div>
                  </div>
                </div>
                
                {/* Plus */}
                <div className="text-2xl font-bold text-gray-400">+</div>
                
                {/* Right: LoRA */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-20 h-12 bg-gradient-to-b from-orange-400 to-orange-600 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg" style={{clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)'}}>
                    B
                  </div>
                  <div className="text-xs text-gray-500">r</div>
                  <div className="w-20 h-12 bg-gradient-to-b from-orange-400 to-orange-600 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg" style={{clipPath: 'polygon(0% 0%, 100% 0%, 85% 100%, 15% 100%)'}}>
                    A
                  </div>
                </div>
              </div>
              <p className="text-center text-gray-500 text-sm mt-4">
                图：LoRA 架构。蓝色为冻结参数，橙色为可训练低秩矩阵。
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">2.3 初始化与缩放 (Scaling)</h3>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li>
              <strong>初始化：</strong> 使用随机高斯分布初始化 <InlineMath math="A" />，使用全零矩阵初始化 <InlineMath math="B" />。这保证了在训练开始时 <InlineMath math="\Delta W = BA = 0" />，即模型行为与预训练模型完全一致。
            </li>
            <li>
              <strong>缩放系数 <InlineMath math="\alpha" />：</strong> 实际更新时会乘以一个缩放因子：
              <div className="bg-gray-50 rounded-lg p-3 mt-2 overflow-x-auto">
                <BlockMath math="h = W_0 x + \frac{\alpha}{r} BA x" />
              </div>
            </li>
          </ul>

          {/* Deep Dive: Initialization */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-6">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">2.4 深度解析：为什么 A 高斯初始化，B 全零初始化？（梯度视角）</h3>
            <p className="text-gray-700 mb-4">
              这是一个面试和深入研究中常被问到的问题。我们通过链式法则（Chain Rule）来分析不同初始化策略对梯度更新的影响。
            </p>
            
            <div className="bg-white rounded-lg p-4 mb-4 overflow-x-auto">
              <BlockMath math="\frac{\partial L}{\partial B} = \frac{\partial L}{\partial h_{lora}} \cdot (Ax)^T" />
              <BlockMath math="\frac{\partial L}{\partial A} = B^T \cdot \frac{\partial L}{\partial h_{lora}} \cdot x^T" />
            </div>

            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  情况 1：A 和 B 都初始化为 0
                </h4>
                <ul className="text-sm text-red-900/80 space-y-1">
                  <li>• <strong>前向传播：</strong> <InlineMath math="\Delta W = 0" />，初始状态正确。</li>
                  <li>• <strong>反向传播：</strong> 因为 A=0 和 B=0，两者梯度都为 0。</li>
                  <li>• <strong>结论：</strong> 梯度死锁，参数永远无法更新！</li>
                </ul>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-bold text-amber-800 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  情况 2：A 和 B 都随机初始化
                </h4>
                <ul className="text-sm text-amber-900/80 space-y-1">
                  <li>• <strong>梯度：</strong> 正常，可以训练。</li>
                  <li>• <strong>前向传播：</strong> <InlineMath math="\Delta W \neq 0" />，引入随机噪声。</li>
                  <li>• <strong>结论：</strong> 严重破坏预训练能力，训练初期不稳定！</li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  情况 3：LoRA 策略（A 高斯，B 全零）
                </h4>
                <ul className="text-sm text-green-900/80 space-y-1">
                  <li>• <strong>前向传播：</strong> <InlineMath math="\Delta W = 0 \cdot A = 0" />，完美保持初始能力。</li>
                  <li>• <strong>B 的梯度：</strong> 因为 A 非零，B 可以收到非零梯度。</li>
                  <li>• <strong>迭代：</strong> B 更新后不再为 0，A 的梯度也开始非零。</li>
                  <li>• <strong>结论：</strong> <strong className="text-green-700">既保证初始无损，又保证梯度流畅通！最优方案。</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Advantages */}
        <section id="advantages" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 mb-8 scroll-mt-28">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2">3. LoRA 的关键优势</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-white p-5 rounded-xl border border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-800">无推理延迟</h3>
              </div>
              <p className="text-sm text-gray-600">
                部署时可计算 <InlineMath math="W = W_0 + BA" />，直接存储合并后的权重。推理时执行标准矩阵乘法，速度与原模型一致。
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white p-5 rounded-xl border border-green-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <HardDrive className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-800">存储效率极高</h3>
              </div>
              <p className="text-sm text-gray-600">
                GPT-3 175B：Checkpoint 从 350GB 减少到约 35MB（减少 10,000 倍）。
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white p-5 rounded-xl border border-purple-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Zap className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-800">VRAM 占用低</h3>
              </div>
              <p className="text-sm text-gray-600">
                GPT-3 175B 训练：显存从 1.2TB 降低到 350GB（不需要存储 W₀ 的优化器状态）。
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-white p-5 rounded-xl border border-orange-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="font-bold text-gray-800">任务切换便捷</h3>
              </div>
              <p className="text-sm text-gray-600">
                只需替换小小的 BA 矩阵即可切换下游任务，无需重新加载整个模型。
              </p>
            </div>
          </div>
        </section>

        {/* 4. Implementation */}
        <section id="implementation" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 mb-8 scroll-mt-28">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2">4. Transformer 中的具体实现</h2>
          
          <p className="text-gray-600 leading-relaxed mb-4">
            Transformer 架构中的 Self-Attention 模块包含四个权重矩阵：<InlineMath math="W_q, W_k, W_v, W_o" />。
          </p>
          
          <p className="text-gray-600 leading-relaxed mb-4">
            论文实验表明，<strong>只对 Attention 权重应用 LoRA</strong> 是最高效的。作者主要在 <InlineMath math="W_q" /> 和 <InlineMath math="W_v" /> 上应用 LoRA：
          </p>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 overflow-x-auto text-center">
            <BlockMath math="\Delta W_q = B_q A_q, \quad \Delta W_v = B_v A_v" />
          </div>
          
          <p className="text-gray-600">
            MLP 层（前馈网络）通常被冻结不参与 LoRA 训练。
          </p>
        </section>

        {/* 5. Experiments */}
        <section id="experiments" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 mb-8 scroll-mt-28">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2">5. 实验与结果分析</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-4">5.1 性能对比</h3>
          <p className="text-gray-600 mb-4">
            在 RoBERTa、DeBERTa、GPT-2 和 GPT-3 上，LoRA 的表现均优于或持平于全参数微调。
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">方法</th>
                  <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">可训练参数量 (GPT-3)</th>
                  <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">WikiSQL</th>
                  <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">MNLI</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3 px-4 border-b font-medium text-gray-900">Fine-Tuning (全量)</td>
                  <td className="py-3 px-4 border-b text-gray-600">175.2 B (100%)</td>
                  <td className="py-3 px-4 border-b text-gray-600">73.8%</td>
                  <td className="py-3 px-4 border-b text-gray-600">89.5%</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b text-gray-900">Adapter (r=64)</td>
                  <td className="py-3 px-4 border-b text-gray-600">304.4 M</td>
                  <td className="py-3 px-4 border-b text-gray-600">72.6%</td>
                  <td className="py-3 px-4 border-b text-gray-600">91.5%</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="py-3 px-4 border-b font-bold text-blue-800">LoRA (r=4)</td>
                  <td className="py-3 px-4 border-b text-blue-800">4.7 M (0.002%)</td>
                  <td className="py-3 px-4 border-b font-bold text-blue-800">73.4%</td>
                  <td className="py-3 px-4 border-b font-bold text-blue-800">91.7%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-4">5.2 关于秩 r 的选择</h3>
          <p className="text-gray-600 mb-4">
            一个令人惊讶的发现是，<strong>极小的秩（如 r=1 或 r=2）就足够了</strong>。
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
            <li>只适应 <InlineMath math="W_q" /> 时，r=4 或 r=8 效果较好。</li>
            <li>同时适应 <InlineMath math="W_q" /> 和 <InlineMath math="W_v" /> 时，甚至 <strong>r=1</strong> 就能达到极佳的效果。</li>
          </ul>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
            这验证了论文的核心假设：大模型的微调更新量确实具有极低的"内在秩"。增加 r 并不能显著覆盖更有意义的子空间。
          </div>
        </section>

        {/* 6. Analysis */}
        <section id="analysis" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 mb-8 scroll-mt-28">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2">6. 深度解析：理解低秩更新</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-4">6.1 子空间相似性分析</h3>
          <p className="text-gray-600 mb-4">
            为了验证不同 r 学习到的特征是否一致，作者定义了基于格拉斯曼距离的子空间相似度度量 <InlineMath math="\phi" />：
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 overflow-x-auto text-center">
            <BlockMath math="\phi(A, B, i, j) = \frac{\|U_A^{iT} U_B^j\|_F^2}{\min(i, j)} \in [0, 1]" />
          </div>
          <p className="text-gray-600 mb-6">
            <strong>结论：</strong> r=8 和 r=64 的学习结果中，顶部奇异向量方向重叠度非常高。说明 top-1 或 top-2 的方向包含了绝大部分适应任务所需的信息。
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-4">6.2 <InlineMath math="\Delta W" /> 与 <InlineMath math="W" /> 的关系</h3>
          <p className="text-gray-600">
            实验发现：<InlineMath math="\Delta W" /> 倾向于放大 <InlineMath math="W" /> 中那些在预训练阶段<strong>未被强调（singular values 较小）</strong>但在下游任务中很重要的特征方向。放大系数在 r=4 时约为 20 倍。
          </p>
        </section>

        {/* 7. Conclusion */}
        <section id="conclusion" className="bg-slate-900 text-white rounded-2xl p-8 mb-8 scroll-mt-28">
          <h2 className="text-2xl font-bold mb-6">7. 总结</h2>
          <p className="text-slate-300 mb-6">
            LoRA 提出了一种极具开创性的微调范式。它不仅在工程上解决了大模型微调显存不足和存储困难的问题，还在理论上揭示了模型适应过程的低秩特性。
          </p>
          <ul className="space-y-3 text-slate-300">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <span><strong className="text-white">高效：</strong> 训练参数减少 10,000 倍。</span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <span><strong className="text-white">快速：</strong> 无推理延迟。</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <span><strong className="text-white">高性能：</strong> 效果匹敌全量微调。</span>
            </li>
          </ul>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            基于论文: Hu et al., "LoRA: Low-Rank Adaptation of Large Language Models", ICLR 2022
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LoRAPaper;



