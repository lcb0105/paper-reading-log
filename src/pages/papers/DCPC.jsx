import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { 
  ArrowLeft, 
  AlertTriangle,
  Layers,
  Target,
  Zap,
  FlaskConical,
  BookOpen,
  CheckCircle2
} from 'lucide-react';

// 导航项
const navItems = [
  { id: 'intro', label: '1. 核心问题：偏好偏差' },
  { id: 'methodology', label: '2. 方法论详解' },
  { id: 'preliminaries', label: '2.1 预备知识', indent: true },
  { id: 'similarity', label: '2.2 偏好敏感相似度', indent: true },
  { id: 'alignment', label: '2.3 跨层前缀对齐', indent: true },
  { id: 'pcm', label: '2.4 偏好修正模块 PCM', indent: true },
  { id: 'complexity', label: '2.5 样本复杂度定理', indent: true },
  { id: 'experiments', label: '3. 实验结果' },
  { id: 'closed-source', label: '3.2 闭源模型对比', indent: true },
  { id: 'adapter-agnostic', label: '3.3 适配器无关性', indent: true },
  { id: 'ood-transfer', label: '3.4 OOD 迁移', indent: true },
  { id: 'extensions', label: '3.5 扩展场景', indent: true },
  { id: 'appendices', label: '4. 附录' },
  { id: 'conclusion', label: '5. 总结' },
];

// 公式卡片组件
const FormulaCard = ({ label, children, explanation }) => (
  <div className="bg-white p-6 rounded shadow-sm border border-gray-100 mb-4">
    {label && <p className="font-semibold text-gray-600 mb-2">{label}</p>}
    <div className="overflow-x-auto py-2">
      {children}
    </div>
    {explanation && (
      <div className="mt-3 text-gray-700">
        {explanation}
      </div>
    )}
  </div>
);

export default function DCPC() {
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
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* 左侧导航 */}
          <aside className="hidden lg:block col-span-1">
            <div className="sticky top-10 space-y-4">
              <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-6">
                <ArrowLeft size={18} />
                <span>返回首页</span>
              </Link>
              <h5 className="font-bold text-gray-500 uppercase tracking-wider text-sm mb-3">目录</h5>
              <nav className="space-y-1 border-r border-gray-200 pr-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-all ${
                      item.indent ? 'ml-4 text-xs' : ''
                    } ${
                      activeSection === item.id
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:bg-white hover:text-blue-600'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* 主内容区 */}
          <main className="col-span-1 lg:col-span-3">
            
            {/* Header */}
            <header className="mb-10 border-b border-gray-200 pb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  🏆 NeurIPS 2025 · First Author
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                Whose Instructions Count? Resolving Preference Bias in Instruction Fine-Tuning
              </h1>
              <h2 className="text-xl md:text-2xl text-blue-600 font-medium mb-4">
                谁的指令说了算？解决指令微调中的偏好偏差
              </h2>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="text-sm text-blue-800">
                  <strong>核心摘要：</strong> 现有的指令微调（IFT）假设所有人工指令背后都有一个统一的"真理"。然而，不同标注者的风格、详略偏好往往不同，导致"偏好偏差"（Preference Bias）。这会破坏模型的鲁棒性。本文提出了 <strong>DCPC (Dynamic Cross-Layer Preference Correction)</strong>，通过检测冲突、跨层对齐和动态偏好修正来解决这一问题。
                </p>
              </div>
            </header>

            {/* Section 1: Introduction */}
            <section id="intro" className="mb-12 scroll-mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-amber-500" />
                1. 核心问题：偏好偏差 (Preference Bias)
              </h2>
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">
                  在大语言模型的指令微调中，我们通常假设训练数据是"干净"且"一致"的。但实际上，对于同一个任务，不同的标注者可能会给出风格迥异的答案（例如：简洁 vs 详细，正式 vs 口语化）。
                </p>
                <p className="mb-4">
                  这种现象被称为<strong>偏好偏差</strong>。当模型在这些存在冲突的数据上训练时，梯度更新会被拉向不同的方向，导致模型试图死记硬背（Overfitting）每个特定的风格，而不是学习一个共识（Consensus）。结果是模型的生成变得脆弱，泛化能力下降。
                </p>
                
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200 mt-6">
                  <h3 className="font-bold text-purple-800 mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    DCPC 的解决方案
                  </h3>
                  <p className="text-purple-900">
                    不依赖外部清洗或重新标注，而是在训练过程中<strong>动态地检测</strong>这种冲突，并在内部表示层（Hidden States）<strong>修正</strong>它。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: Methodology */}
            <section id="methodology" className="mb-12 scroll-mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2 flex items-center gap-2">
                <Layers className="w-6 h-6 text-blue-600" />
                2. 方法论详解 (Methodology)
              </h2>
              <div className="bg-yellow-50 p-4 rounded-lg mb-8 border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>阅读指南：</strong> 本章节是全篇的核心。我们将逐一拆解论文中的每一个数学公式，解释其变量含义、计算逻辑以及背后的物理直觉。
                </p>
              </div>

              {/* 2.1 Preliminaries */}
              <div id="preliminaries" className="mb-10 scroll-mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">2.1 预备知识：基于前缀的微调 (Prefix Adapters)</h3>
                <p className="mb-3 text-gray-700">DCPC 建立在 <strong>P-Tuning v2</strong> 的基础之上。这是一种参数高效微调（PEFT）方法。</p>
                
                <FormulaCard label="公式 (1)：前缀拼接">
                  <BlockMath math="\tilde{e}_{x}^{l}=[P^{l};e_{x}^{l}]" />
                  <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1 text-sm">
                    <li><strong className="text-gray-800"><InlineMath math="e_{x}^{l}" /></strong>: 输入序列 <InlineMath math="x" /> 在第 <InlineMath math="l" /> 层的原始隐藏层表示。</li>
                    <li><strong className="text-gray-800"><InlineMath math="P^{l}" /></strong>: 每一层引入的可学习的"前缀"（Prefix）矩阵。</li>
                    <li><strong className="text-gray-800"><InlineMath math="[;]" /></strong>: 拼接操作。我们将可学习的前缀拼接在原始输入的 Embedding 之前。</li>
                  </ul>
                </FormulaCard>

                <FormulaCard label="公式 (2)：Transformer 层处理">
                  <BlockMath math="h_{x}^{l}= \text{TransformerLayer}^l(\tilde{e}_{x}^{l})" />
                  <p className="text-gray-600 mt-2 text-sm">
                    拼接后的表示经过 Transformer 层的自注意力机制处理。P-Tuning v2 的局限性在于它是局部更新前缀，如果不同样本的偏好冲突（如语义相同但标签分布不同），这种局部更新会导致深层的表示发生漂移。
                  </p>
                </FormulaCard>
              </div>

              {/* 2.2 Preference-Sensitive Similarity */}
              <div id="similarity" className="mb-10 scroll-mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">2.2 偏好敏感相似度机制 (Preference-Sensitive Similarity)</h3>
                <p className="mb-3 text-gray-700">这是 DCPC 的第一个支柱：<strong>检测器</strong>。它的目的是找出那些"语义上非常接近，但预测标签分布却截然不同"的指令对 <InlineMath math="(x_A, x_B)" />。</p>

                <FormulaCard label="公式 (3)：语义接近度 (Semantic Proximity)">
                  <BlockMath math="s^{l}=\cos(e_{A}^{l},e_{B}^{l})=\frac{e_{A}^{l}\cdot e_{B}^{l}}{||e_{A}^{l}||\cdot||e_{B}^{l}||}" />
                  <div className="mt-3 text-gray-700 text-sm">
                    <p><strong>解释：</strong> 计算两个指令 <InlineMath math="x_A" /> 和 <InlineMath math="x_B" /> 在第 <InlineMath math="l" /> 层隐藏状态的余弦相似度。</p>
                    <p><strong>直觉：</strong> 如果 <InlineMath math="s^l" /> 接近 1，说明这两个指令在模型看来是语义相同的（或者是复述关系）。</p>
                  </div>
                </FormulaCard>

                <FormulaCard label="公式 (4)：偏好分歧 (Preference Divergence)">
                  <BlockMath math="d=\frac{1}{2}(D_{KL}(L_{A}||L_{B})+D_{KL}(L_{B}||L_{A}))" />
                  <div className="mt-3 text-gray-700 text-sm">
                    <ul className="list-disc list-inside space-y-1">
                      <li><strong className="text-gray-800"><InlineMath math="L_A, L_B" /></strong>: 模型针对指令 A 和 B 输出的软标签分布（Softmax 后的概率）。</li>
                      <li><strong className="text-gray-800"><InlineMath math="D_{KL}" /></strong>: KL 散度（Kullback-Leibler Divergence），衡量两个概率分布的差异。</li>
                      <li><strong className="text-gray-800"><InlineMath math="d" /></strong>: 对称化的 KL 散度。</li>
                    </ul>
                    <p className="mt-2"><strong>直觉：</strong> 如果 <InlineMath math="d" /> 很大，说明虽然输入可能相似，但模型认为它们对应的输出风格/偏好截然不同。</p>
                  </div>
                </FormulaCard>

                <FormulaCard label="公式 (5)：单层冲突评分 (Conflict Score)">
                  <BlockMath math="\alpha^{l}=\underbrace{\mathbb{I}[s^{l}\ge\tau_{cos}]}_{\text{语义门控}} \cdot s^{l} \cdot \underbrace{d}_{\text{偏好分歧}}" />
                  <div className="mt-3 text-gray-700 text-sm">
                    <p><strong>核心逻辑：</strong> 只有当语义足够相似（<InlineMath math="s^l" /> 超过阈值 <InlineMath math="\tau_{cos}" />）时，我们才关心它们的分歧。公式的意思是：<strong>在语义相似的前提下，分歧越大，冲突评分 <InlineMath math="\alpha^l" /> 越高。</strong></p>
                  </div>
                </FormulaCard>

                <FormulaCard label="公式 (6)：层级聚合模糊度 (Aggregated Ambiguity)">
                  <BlockMath math="L_{ambiguity}=\sum_{l=1}^{L}\beta^{l}\alpha^{l}, \quad \beta^{l}=\frac{\exp(\gamma l)}{\sum_{j=1}^{L}\exp(\gamma j)}" />
                  <div className="mt-3 text-gray-700 text-sm">
                    <ul className="list-disc list-inside space-y-1">
                      <li><strong className="text-gray-800"><InlineMath math="\beta^l" /></strong>: 每一层的权重。使用指数加权，<InlineMath math="\gamma > 0" />。这意味着<strong>更深层（Higher Layers）的权重更大</strong>。</li>
                      <li><strong>原因：</strong> 论文指出偏好漂移往往在深层被放大，所以深层的冲突更需要被关注。</li>
                      <li>如果 <InlineMath math="L_{ambiguity}" /> 超过阈值 <InlineMath math="\tau_{amb}" />，则触发后续的修正模块。</li>
                    </ul>
                  </div>
                </FormulaCard>
              </div>

              {/* 2.3 Cross-Layer Prefix Alignment */}
              <div id="alignment" className="mb-10 scroll-mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">2.3 跨层前缀对齐 (Cross-Layer Prefix Alignment)</h3>
                <p className="mb-3 text-gray-700">一旦检测到冲突，第一步修正手段是"拉近"两个指令在不同层之间的表示，强迫它们对齐。</p>

                <FormulaCard label="公式 (7)：前缀混合 (Prefix Mixing)">
                  <BlockMath math="C_{A}^{l}=P_{A}^{l}\oplus T_{B}^{l+1}, \quad C_{B}^{l}=P_{B}^{l}\oplus T_{A}^{l+1}" />
                  <div className="mt-3 text-gray-700 text-sm">
                    <p><strong>操作：</strong> 这是一个交叉混合操作。</p>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      <li><InlineMath math="P_A^l" />: 指令 A 在第 <InlineMath math="l" /> 层的前缀。</li>
                      <li><InlineMath math="T_B^{l+1}" />: 指令 B 在下一层（<InlineMath math="l+1" />）的 Token Embedding。</li>
                      <li><strong>目的：</strong> 让指令 A 的前缀去"看见"指令 B 的上下文，反之亦然。以此消除局部视角的偏差。</li>
                    </ul>
                  </div>
                </FormulaCard>

                <FormulaCard label="公式 (8)：对齐损失 (Alignment Loss)">
                  <BlockMath math="L_{align}=\frac{1}{L-1}\sum_{l=1}^{L-1}||C_{A}^{l}-C_{B}^{l}||_{2}^{2}" />
                  <div className="mt-3 text-gray-700 text-sm">
                    <p><strong>解释：</strong> 最小化混合后的表示 <InlineMath math="C_A" /> 和 <InlineMath math="C_B" /> 之间的欧几里得距离（均方误差）。这迫使两个冲突指令的表示在层级传递中趋向一致。</p>
                  </div>
                </FormulaCard>

                <FormulaCard label="公式 (9)：收缩定理 (Contraction Guarantee)">
                  <BlockMath math="d^{l+1} < L^{2}d^{l}" />
                  <div className="mt-3 text-gray-700 text-sm">
                    <p><strong>定理含义：</strong> 定理 1 证明了，只要学习率 <InlineMath math="\eta" /> 选择得当，通过公式 (8) 的一次梯度更新，两个表示之间的距离 <InlineMath math="d" /> 会按几何级数衰减（<InlineMath math="L^2 < 1" />）。这意味着对齐操作在数学上保证了表示的收敛。</p>
                  </div>
                </FormulaCard>
              </div>

              {/* 2.4 PCM */}
              <div id="pcm" className="mb-10 scroll-mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">2.4 偏好修正模块 (Preference Correction Module, PCM)</h3>
                <p className="mb-3 text-gray-700">对齐是为了拉近距离，而 PCM 是为了注入一个"共识"偏好，主动修正方向。</p>

                <FormulaCard label="公式 (10)：偏好分布采样">
                  <BlockMath math="p_{pref}=\text{softmax}(\mu+\sigma\odot\epsilon)\in\mathbb{R}^{K}" />
                  <div className="mt-3 text-gray-700 text-sm">
                    <p><strong>解释：</strong> PCM 是一个轻量级的辅助分类器。</p>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      <li>它预测一个高斯分布参数 <InlineMath math="(\mu, \sigma)" />。</li>
                      <li><InlineMath math="\epsilon \sim \mathcal{N}(0, I)" /> 是随机采样噪声。</li>
                      <li>通过重参数化技巧采样得到 <InlineMath math="p_{pref}" />，这代表了当前指令应该遵循的"潜在偏好分布"。</li>
                    </ul>
                  </div>
                </FormulaCard>

                <FormulaCard label="公式 (11)：生成修正前缀">
                  <BlockMath math="P_{new}=\mathcal{M}p_{pref}\in\mathbb{R}^{m}" />
                  <div className="mt-3 text-gray-700 text-sm">
                    <p><strong>解释：</strong> 将采样得到的偏好分布 <InlineMath math="p_{pref}" /> 乘以一个共享的元矩阵（Meta-Matrix）<InlineMath math="\mathcal{M}" />。生成的结果 <InlineMath math="P_{new}" /> 是一个新的前缀切片，将被注入回模型中，以此来动态调整 Hidden States。</p>
                  </div>
                </FormulaCard>

                <FormulaCard label="公式 (12) & (13)：KL 惩罚与总损失">
                  <BlockMath math="L_{KL}=D_{KL}(p_{pref}^{(A)}||p_{pref}^{(B)})" />
                  <div className="mt-4">
                    <BlockMath math="L_{total}=\lambda_{1}L_{ambiguity}+\lambda_{2}L_{align}+\lambda_{3}L_{KL}" />
                  </div>
                  <div className="mt-3 text-gray-700 text-sm">
                    <p><strong><InlineMath math="L_{KL}" />：</strong> 强制要求指令 A 和指令 B 生成的偏好分布 <InlineMath math="p_{pref}" /> 尽可能一致。这是为了达成"共识"。</p>
                    <p className="mt-2"><strong><InlineMath math="L_{total}" />：</strong> 最终的优化目标是三个部分的加权和：模糊度惩罚、对齐损失、偏好一致性损失。</p>
                  </div>
                </FormulaCard>
              </div>

              {/* 2.5 Complexity */}
              <div id="complexity" className="mb-10 scroll-mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">2.5 样本复杂度定理</h3>
                <FormulaCard label="公式 (14)：噪声下的样本复杂度">
                  <BlockMath math="\mathcal{R}(\hat{h})-\mathcal{R}^{*}\le\frac{8}{1-2\rho}\sqrt{\frac{D+\ln(2/\delta)}{n}}" />
                  <div className="mt-3 text-gray-700 text-sm">
                    <p><strong>定理 2 含义：</strong> 即使存在标签噪声（偏好偏差可视作一种类条件噪声，翻转率为 <InlineMath math="\rho" />），只要样本量 <InlineMath math="n" /> 足够大，DCPC 学习到的模型风险 <InlineMath math="\mathcal{R}(\hat{h})" /> 与最优风险 <InlineMath math="\mathcal{R}^*" /> 之间的差距是有界的。这从理论上保证了 DCPC 在噪声数据下的鲁棒性。</p>
                  </div>
                </FormulaCard>
              </div>
            </section>

            {/* Section 3: Experiments */}
            <section id="experiments" className="mb-12 scroll-mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2 flex items-center gap-2">
                <FlaskConical className="w-6 h-6 text-green-600" />
                3. 实验结果 (Experiments)
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-5 rounded-lg shadow border border-gray-200">
                  <h3 className="font-bold text-lg mb-2 text-blue-700">数据集设置</h3>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-2">
                    <li><strong>标准集：</strong> SuperGLUE (BoolQ, COPA, ReCoRD), GLUE (SST-2, RTE), Alpaca。</li>
                    <li><strong>偏好偏移集 (Shifted)：</strong> 为了模拟真实世界的偏差，作者构建了 BoolQ-PS, COPA-BS 等变体（例如用不同的语气重写答案，引入特定偏见）。</li>
                  </ul>
                </div>
                <div className="bg-white p-5 rounded-lg shadow border border-gray-200">
                  <h3 className="font-bold text-lg mb-2 text-green-700">核心结论</h3>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-2">
                    <li><strong>鲁棒性：</strong> 在偏好偏移数据集上，DCPC 显著优于 Full-FT 和 LoRA 等基线（Accuracy/F1 提升 4.0-6.7）。</li>
                    <li><strong>稳定性：</strong> 不同随机种子间的方差降低了 35%，说明模型不再随波逐流。</li>
                    <li><strong>GPT-Score：</strong> 在 Alpaca-IS 上提升了 +0.7，生成质量更好。</li>
                  </ul>
                </div>
              </div>

              <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-4 border-b text-left font-bold">Method</th>
                      <th className="py-3 px-4 border-b text-left font-bold">BoolQ-PS (Acc)</th>
                      <th className="py-3 px-4 border-b text-left font-bold">COPA-BS (Acc)</th>
                      <th className="py-3 px-4 border-b text-left font-bold">Alpaca-IS (Score)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-gray-600">
                      <td className="py-3 px-4 border-b">Full-FT</td>
                      <td className="py-3 px-4 border-b">82.4</td>
                      <td className="py-3 px-4 border-b">88.5</td>
                      <td className="py-3 px-4 border-b">8.7</td>
                    </tr>
                    <tr className="text-gray-600">
                      <td className="py-3 px-4 border-b">LoRA</td>
                      <td className="py-3 px-4 border-b">79.1</td>
                      <td className="py-3 px-4 border-b">86.9</td>
                      <td className="py-3 px-4 border-b">8.6</td>
                    </tr>
                    <tr className="bg-blue-50 font-bold text-blue-900">
                      <td className="py-3 px-4 border-b">DCPC (Ours)</td>
                      <td className="py-3 px-4 border-b">86.1</td>
                      <td className="py-3 px-4 border-b">91.7</td>
                      <td className="py-3 px-4 border-b">9.4</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs text-gray-500 p-3">* 数据来自论文 Table 2 (Backbone: LLaMA-2 7B)</p>
              </div>

              {/* 多模型规模结果 */}
              <div className="mt-8 bg-white p-6 rounded-lg shadow border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4">多模型规模实验 (Table E.3)</h3>
                <p className="text-sm text-gray-600 mb-4">DCPC 在不同规模的现代开源模型上均表现出一致的提升：</p>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm border">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border px-3 py-2 text-left">Backbone</th>
                        <th className="border px-3 py-2 text-center">Params</th>
                        <th className="border px-3 py-2 text-center">BoolQ-PS</th>
                        <th className="border px-3 py-2 text-center">COPA-BS</th>
                        <th className="border px-3 py-2 text-center">Alpaca-IS</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border px-3 py-2">LLaMA-2 7B</td>
                        <td className="border px-3 py-2 text-center">7B</td>
                        <td className="border px-3 py-2 text-center">78.0 → <strong className="text-blue-600">86.1</strong> <span className="text-green-600">(+8.1)</span></td>
                        <td className="border px-3 py-2 text-center">86.1 → <strong className="text-blue-600">91.7</strong> <span className="text-green-600">(+5.6)</span></td>
                        <td className="border px-3 py-2 text-center">8.4 → <strong className="text-blue-600">9.4</strong> <span className="text-green-600">(+1.0)</span></td>
                      </tr>
                      <tr>
                        <td className="border px-3 py-2">LLaMA-3 8B-Instruct</td>
                        <td className="border px-3 py-2 text-center">8B</td>
                        <td className="border px-3 py-2 text-center">88.3 → <strong className="text-blue-600">91.7</strong> <span className="text-green-600">(+3.4)</span></td>
                        <td className="border px-3 py-2 text-center">90.5 → <strong className="text-blue-600">93.9</strong> <span className="text-green-600">(+3.4)</span></td>
                        <td className="border px-3 py-2 text-center">9.3 → <strong className="text-blue-600">9.7</strong> <span className="text-green-600">(+0.4)</span></td>
                      </tr>
                      <tr>
                        <td className="border px-3 py-2">Qwen2.5-7B-Instruct</td>
                        <td className="border px-3 py-2 text-center">7B</td>
                        <td className="border px-3 py-2 text-center">89.2 → <strong className="text-blue-600">91.6</strong> <span className="text-green-600">(+2.4)</span></td>
                        <td className="border px-3 py-2 text-center">91.0 → <strong className="text-blue-600">93.3</strong> <span className="text-green-600">(+2.3)</span></td>
                        <td className="border px-3 py-2 text-center">9.2 → <strong className="text-blue-600">9.6</strong> <span className="text-green-600">(+0.4)</span></td>
                      </tr>
                      <tr>
                        <td className="border px-3 py-2">DeepSeek-V2 16B</td>
                        <td className="border px-3 py-2 text-center">16B</td>
                        <td className="border px-3 py-2 text-center">90.1 → <strong className="text-blue-600">92.7</strong> <span className="text-green-600">(+2.6)</span></td>
                        <td className="border px-3 py-2 text-center">91.6 → <strong className="text-blue-600">94.0</strong> <span className="text-green-600">(+2.4)</span></td>
                        <td className="border px-3 py-2 text-center">9.4 → <strong className="text-blue-600">9.8</strong> <span className="text-green-600">(+0.4)</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Section 3.2: Closed-Source Comparison */}
            <section id="closed-source" className="mb-12 scroll-mt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">3.2 闭源模型对比 (Zero-Shot)</h3>
              <p className="text-gray-700 mb-4 text-sm">
                为了将 DCPC 置于更广阔的背景下，论文在偏好偏移任务上与商业闭源模型进行了零样本对比（Table E.5）：
              </p>
              
              <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
                <table className="min-w-full text-sm border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-3 py-2 text-left">Model</th>
                      <th className="border px-3 py-2 text-center">BoolQ-PS</th>
                      <th className="border px-3 py-2 text-center">COPA-BS</th>
                      <th className="border px-3 py-2 text-center">ReCoRD-R</th>
                      <th className="border px-3 py-2 text-center">SST-2-P</th>
                      <th className="border px-3 py-2 text-center">Alpaca-IS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-gray-600">
                      <td className="border px-3 py-2">GPT-4o-mini</td>
                      <td className="border px-3 py-2 text-center">74.2</td>
                      <td className="border px-3 py-2 text-center">81.1</td>
                      <td className="border px-3 py-2 text-center">81.9</td>
                      <td className="border px-3 py-2 text-center">82.5</td>
                      <td className="border px-3 py-2 text-center">6.9</td>
                    </tr>
                    <tr className="text-gray-600">
                      <td className="border px-3 py-2">GPT-4o-full</td>
                      <td className="border px-3 py-2 text-center">75.8</td>
                      <td className="border px-3 py-2 text-center">83.9</td>
                      <td className="border px-3 py-2 text-center">83.7</td>
                      <td className="border px-3 py-2 text-center">85.3</td>
                      <td className="border px-3 py-2 text-center">7.8</td>
                    </tr>
                    <tr className="text-gray-600">
                      <td className="border px-3 py-2">Claude-3 Sonnet</td>
                      <td className="border px-3 py-2 text-center">74.9</td>
                      <td className="border px-3 py-2 text-center">82.0</td>
                      <td className="border px-3 py-2 text-center">81.8</td>
                      <td className="border px-3 py-2 text-center">83.4</td>
                      <td className="border px-3 py-2 text-center">7.9</td>
                    </tr>
                    <tr className="text-gray-600">
                      <td className="border px-3 py-2">Gemini 1.5 Pro</td>
                      <td className="border px-3 py-2 text-center">76.7</td>
                      <td className="border px-3 py-2 text-center">82.8</td>
                      <td className="border px-3 py-2 text-center">80.6</td>
                      <td className="border px-3 py-2 text-center">84.2</td>
                      <td className="border px-3 py-2 text-center">8.0</td>
                    </tr>
                    <tr className="text-gray-500">
                      <td className="border px-3 py-2">P-Tuning v2 (7B)</td>
                      <td className="border px-3 py-2 text-center">78.0</td>
                      <td className="border px-3 py-2 text-center">86.1</td>
                      <td className="border px-3 py-2 text-center">85.9</td>
                      <td className="border px-3 py-2 text-center">87.5</td>
                      <td className="border px-3 py-2 text-center">8.4</td>
                    </tr>
                    <tr className="bg-blue-50 font-bold text-blue-900">
                      <td className="border px-3 py-2">DCPC (7B) 🏆</td>
                      <td className="border px-3 py-2 text-center">86.1</td>
                      <td className="border px-3 py-2 text-center">91.7</td>
                      <td className="border px-3 py-2 text-center">91.9</td>
                      <td className="border px-3 py-2 text-center">92.8</td>
                      <td className="border px-3 py-2 text-center">9.4</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-green-800 text-sm">
                  <strong>🏆 关键发现：</strong> 仅 7B 参数的 DCPC 在偏好偏移任务上<strong>全面超越</strong> GPT-4o、Claude-3 Sonnet 和 Gemini 1.5 Pro 等闭源模型！这证明 DCPC 的偏好修正机制在处理风格冲突数据时具有独特优势。
                </p>
              </div>
            </section>

            {/* Section 3.3: Adapter-Agnostic */}
            <section id="adapter-agnostic" className="mb-12 scroll-mt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">3.3 适配器无关性 (Adapter-Agnostic Generality)</h3>
              <p className="text-gray-700 mb-4 text-sm">
                DCPC 的设计是<strong>适配器无关的</strong>——可以与 LoRA、Full-FT 等不同微调方式结合使用（Table E.4）：
              </p>
              
              <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
                <table className="min-w-full text-sm border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-3 py-2 text-left">Variant</th>
                      <th className="border px-3 py-2 text-center">Tunable Params</th>
                      <th className="border px-3 py-2 text-center">BoolQ-PS ↑</th>
                      <th className="border px-3 py-2 text-center">MMLU-CoT 5-shot ↑</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-gray-600">
                      <td className="border px-3 py-2">Baseline LoRA</td>
                      <td className="border px-3 py-2 text-center">10.0M</td>
                      <td className="border px-3 py-2 text-center">79.1</td>
                      <td className="border px-3 py-2 text-center">66.8</td>
                    </tr>
                    <tr className="text-blue-700">
                      <td className="border px-3 py-2">DCPC-LoRA</td>
                      <td className="border px-3 py-2 text-center">10.0M</td>
                      <td className="border px-3 py-2 text-center">84.2 <span className="text-green-600">(+5.1)</span></td>
                      <td className="border px-3 py-2 text-center">69.4 <span className="text-green-600">(+2.6)</span></td>
                    </tr>
                    <tr className="text-gray-600">
                      <td className="border px-3 py-2">Baseline Full-FT</td>
                      <td className="border px-3 py-2 text-center">7B</td>
                      <td className="border px-3 py-2 text-center">82.4</td>
                      <td className="border px-3 py-2 text-center">68.3</td>
                    </tr>
                    <tr className="text-blue-700">
                      <td className="border px-3 py-2">DCPC-Full-FT</td>
                      <td className="border px-3 py-2 text-center">7B</td>
                      <td className="border px-3 py-2 text-center">83.5 <span className="text-green-600">(+1.1)</span></td>
                      <td className="border px-3 py-2 text-center">69.1 <span className="text-green-600">(+0.8)</span></td>
                    </tr>
                    <tr className="bg-blue-50 font-bold text-blue-900">
                      <td className="border px-3 py-2">DCPC-Prefix (Ours)</td>
                      <td className="border px-3 py-2 text-center">9.6M</td>
                      <td className="border px-3 py-2 text-center">86.1</td>
                      <td className="border px-3 py-2 text-center">71.0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h4 className="font-bold text-purple-700 text-sm mb-1">DCPC-LoRA</h4>
                  <p className="text-xs text-purple-600">将跨层对齐应用于 ΔW 矩阵</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h4 className="font-bold text-purple-700 text-sm mb-1">DCPC-Full-FT</h4>
                  <p className="text-xs text-purple-600">将前缀逻辑应用于梯度更新</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-bold text-green-700 text-sm mb-1">DCPC-Prefix ✅</h4>
                  <p className="text-xs text-green-600">在偏好偏移下表现最强</p>
                </div>
              </div>
            </section>

            {/* Section 3.4: OOD Transfer */}
            <section id="ood-transfer" className="mb-12 scroll-mt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">3.4 零样本 OOD 迁移 (Out-of-Domain Transfer)</h3>
              <p className="text-gray-700 mb-4 text-sm">
                一个关键问题是：在偏好冲突数据上训练的模型，能否泛化到<strong>未见过的任务</strong>？论文在 Natural-Instructions v2 和 FLAN-2024 上进行了零样本评估（Table E.6）：
              </p>
              
              <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200 mb-4">
                <table className="min-w-full text-sm border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-3 py-2 text-left">Model</th>
                      <th className="border px-3 py-2 text-center">Training Data</th>
                      <th className="border px-3 py-2 text-center">NI-v2 Macro-F1 ↑</th>
                      <th className="border px-3 py-2 text-center">FLAN-24 Win-rate % ↑</th>
                      <th className="border px-3 py-2 text-center">Δ OOD</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-gray-500">
                      <td className="border px-3 py-2">Base (no FT)</td>
                      <td className="border px-3 py-2 text-center">—</td>
                      <td className="border px-3 py-2 text-center">63.2</td>
                      <td className="border px-3 py-2 text-center">69.0</td>
                      <td className="border px-3 py-2 text-center">—</td>
                    </tr>
                    <tr className="text-gray-600">
                      <td className="border px-3 py-2">Full-FT (clean)</td>
                      <td className="border px-3 py-2 text-center">原始数据</td>
                      <td className="border px-3 py-2 text-center">65.4</td>
                      <td className="border px-3 py-2 text-center">70.8</td>
                      <td className="border px-3 py-2 text-center">—</td>
                    </tr>
                    <tr className="text-red-600">
                      <td className="border px-3 py-2">Full-FT (shift)</td>
                      <td className="border px-3 py-2 text-center">偏好偏移数据</td>
                      <td className="border px-3 py-2 text-center">64.9</td>
                      <td className="border px-3 py-2 text-center">70.1</td>
                      <td className="border px-3 py-2 text-center text-red-600">-0.5 / -0.7</td>
                    </tr>
                    <tr className="text-gray-600">
                      <td className="border px-3 py-2">DCPC (clean)</td>
                      <td className="border px-3 py-2 text-center">原始数据</td>
                      <td className="border px-3 py-2 text-center">66.2</td>
                      <td className="border px-3 py-2 text-center">72.2</td>
                      <td className="border px-3 py-2 text-center">—</td>
                    </tr>
                    <tr className="bg-green-50 font-bold text-green-800">
                      <td className="border px-3 py-2">DCPC (shift) ✅</td>
                      <td className="border px-3 py-2 text-center">偏好偏移数据</td>
                      <td className="border px-3 py-2 text-center">66.9</td>
                      <td className="border px-3 py-2 text-center">73.0</td>
                      <td className="border px-3 py-2 text-center text-green-600">+0.7 / +0.8</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h4 className="font-bold text-amber-800 mb-2">💡 关键洞察：为什么 Full-FT 过拟合而 DCPC 不会？</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div className="bg-white p-3 rounded border border-amber-100">
                    <h5 className="font-medium text-red-700 text-sm mb-1">Full-FT 的问题</h5>
                    <p className="text-xs text-gray-600">将风格特异性吸收到<strong>主干权重</strong>中，使任务语义与标注者风格<strong>纠缠</strong>在一起。</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-amber-100">
                    <h5 className="font-medium text-green-700 text-sm mb-1">DCPC 的优势</h5>
                    <p className="text-xs text-gray-600">在<strong>前缀空间</strong>中修正冲突，通过跨层对齐和 PCM 将表示推向风格共识，同时保持主干冻结。这产生了更<strong>风格不变</strong>的特征。</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3.5: Extensions */}
            <section id="extensions" className="mb-12 scroll-mt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">3.5 扩展场景：对话、跨语言与多模态</h3>
              <p className="text-gray-700 mb-4 text-sm">
                DCPC 不仅限于单轮文本任务，还在<strong>对话</strong>、<strong>跨语言</strong>和<strong>多模态</strong>场景中展现了一致的提升（Table E.7）：
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                  <div className="text-2xl mb-2">💬</div>
                  <h4 className="font-bold text-blue-800 text-sm mb-1">对话 (MultiWOZ-2.4)</h4>
                  <p className="text-xs text-gray-600 mb-2">polite vs blunt 风格冲突</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">JGA</span>
                    <span className="font-bold text-blue-700">58.1 → 61.9 <span className="text-green-600">(+3.8)</span></span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                  <div className="text-2xl mb-2">🌍</div>
                  <h4 className="font-bold text-green-800 text-sm mb-1">跨语言 (XNLI en→zh/fr)</h4>
                  <p className="text-xs text-gray-600 mb-2">formal vs colloquial 风格冲突</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Acc</span>
                    <span className="font-bold text-green-700">79.4 → 82.3 <span className="text-green-600">(+2.9)</span></span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
                  <div className="text-2xl mb-2">🖼️</div>
                  <h4 className="font-bold text-purple-800 text-sm mb-1">多模态 (MM-Instructions)</h4>
                  <p className="text-xs text-gray-600 mb-2">telegraphic vs detailed 描述风格</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">CIDEr</span>
                    <span className="font-bold text-purple-700">93.7 → 96.8 <span className="text-green-600">(+3.1)</span></span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-gray-700 text-sm mb-2">🔬 技术细节</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• <strong>对话:</strong> LLaMA-2-7B + turn-wise prefixes</li>
                  <li>• <strong>跨语言:</strong> Qwen-2.5-7B</li>
                  <li>• <strong>多模态:</strong> CLIP-ViT-L (frozen) + LLaVA-7B</li>
                  <li>• <strong>DCPC 机制不变:</strong> 检测嵌入接近度 + 预测分歧 → 触发跨层对齐 + PCM 修正</li>
                  <li>• <strong>关键发现:</strong> 即使 CLIP 冻结，DCPC 仍可在语言侧解决冲突，同时尊重视觉接地</li>
                </ul>
              </div>
            </section>

            {/* Section 4: Appendices */}
            <section id="appendices" className="mb-12 scroll-mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-purple-600" />
                4. 附录 (Appendices)
              </h2>

              {/* Appendix A */}
              <div className="mb-8 bg-white p-6 rounded-lg shadow border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4">附录 A：玩具实验 (Toy Experiment)</h3>
                <p className="text-gray-700 mb-4 text-sm">为了验证偏好不一致性的存在，作者在 IMDB 情感分类数据集上进行了一个"玩具实验"。选取了两个语义极其相似但情感标签不同的句子：</p>
                <ul className="list-disc list-inside bg-gray-50 p-4 rounded text-sm text-gray-700 mb-4 border border-gray-200">
                  <li><strong>句子 A (Positive):</strong> &quot;The movie was enjoyable but not amazing.&quot;</li>
                  <li><strong>句子 B (Neutral):</strong> &quot;The film was okay, but nothing special.&quot;</li>
                </ul>
                <p className="text-gray-700 mb-3 text-sm">随着层数加深，虽然语义相似度（Cosine Similarity）保持较高，但标签分布的差异（KL Divergence）却急剧上升，证明了 P-Tuning v2 无法处理这种内在的偏好冲突。</p>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm text-center border">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border px-3 py-2">Layer</th>
                        <th className="border px-3 py-2">Cosine Sim (语义)</th>
                        <th className="border px-3 py-2">Edit Distance</th>
                        <th className="border px-3 py-2">KL Divergence (偏好)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="border px-3 py-2">1</td><td className="border px-3 py-2">0.98</td><td className="border px-3 py-2">10</td><td className="border px-3 py-2">0.05</td></tr>
                      <tr><td className="border px-3 py-2">5</td><td className="border px-3 py-2">0.87</td><td className="border px-3 py-2">50</td><td className="border px-3 py-2">0.22</td></tr>
                      <tr className="bg-red-50 font-bold"><td className="border px-3 py-2">12</td><td className="border px-3 py-2">0.15</td><td className="border px-3 py-2">210</td><td className="border px-3 py-2 text-red-600">0.78</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Appendix B */}
              <div className="mb-8 bg-white p-6 rounded-lg shadow border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4">附录 B：定理 1 证明细节 (层级收缩)</h3>
                <p className="text-gray-700 mb-2 text-sm">证明分为两步：</p>
                <ol className="list-decimal list-inside text-gray-700 space-y-3 text-sm">
                  <li>
                    <strong>梯度更新的影响：</strong> 定义前缀差 <InlineMath math="\theta^l = P_A^l - P_B^l" />。对齐损失的梯度更新会缩减这一差值：
                    <div className="bg-gray-50 p-3 rounded mt-2 overflow-x-auto">
                      <BlockMath math="||\theta_{new}^l||_2 = |1-4\eta| \cdot d^l" />
                    </div>
                  </li>
                  <li>
                    <strong>通过 Lipschitz 层的传播：</strong> 假设 Transformer 块是 <InlineMath math="L" />-Lipschitz 连续的 (<InlineMath math="L \in (0,1)" />)。
                    <div className="bg-gray-50 p-3 rounded mt-2 overflow-x-auto">
                      <BlockMath math="d^{l+1} \le L \cdot ||\theta_{new}^l||_2 = L|1-4\eta|d^l" />
                    </div>
                  </li>
                </ol>
                <p className="text-gray-700 mt-3 text-sm">当选择最佳学习率 <InlineMath math="\eta^* = \frac{1-L}{4}" /> 时，收缩因子变为 <InlineMath math="L^2 < 1" />，从而保证几何级数收敛。</p>
              </div>

              {/* Appendix C */}
              <div className="mb-8 bg-white p-6 rounded-lg shadow border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4">附录 C：定理 2 证明细节 (样本复杂度)</h3>
                <p className="text-gray-700 text-sm mb-3">
                  将偏好偏差建模为类条件噪声（Class-Conditional Noise, CCN），翻转率为 <InlineMath math="\rho < 0.5" />。证明基于无偏风险估计和 VC 维理论。
                </p>
                <div className="bg-gray-50 p-3 rounded border overflow-x-auto">
                  <BlockMath math="\mathcal{R}(\hat{h})-\mathcal{R}^{*}\le\frac{8}{1-2\rho}\sqrt{\frac{D+\ln(2/\delta)}{n}}" />
                </div>
                <p className="text-gray-700 mt-3 text-sm">其中 <InlineMath math="D" /> 是假设空间的伪维度。关键点在于，尽管存在噪声，只要样本量 <InlineMath math="n" /> 满足一定条件，经验风险最小化（ERM）产生的模型与最优模型的差距是可以被控制的。</p>
              </div>

              {/* Appendix D */}
              <div className="mb-8 bg-white p-6 rounded-lg shadow border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4">附录 D：详细实验设置与数据集构建</h3>
                <p className="text-gray-700 mb-4 text-sm">为了模拟真实的偏好偏差，作者构建了以下"Shifted"数据集变体：</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 border p-4 rounded">
                    <h4 className="font-bold text-blue-600 mb-1 text-sm">BoolQ-PreferenceShift (BoolQ-PS)</h4>
                    <p className="text-xs text-gray-600">使用 GPT-3.5 将 Yes/No 的回答重写为三种不同风格：Casual（随意）、Formal（正式）、Expressive（表达丰富），但保持语义不变。</p>
                  </div>
                  <div className="bg-gray-50 border p-4 rounded">
                    <h4 className="font-bold text-blue-600 mb-1 text-sm">COPA-BiasShift (COPA-BS)</h4>
                    <p className="text-xs text-gray-600">引入人为偏见，系统性地偏好"与人类相关"的原因，而不是自然原因，测试模型是否会过度拟合这种虚假偏好。</p>
                  </div>
                  <div className="bg-gray-50 border p-4 rounded">
                    <h4 className="font-bold text-blue-600 mb-1 text-sm">SST-2-PolarityShift (SST-2-P)</h4>
                    <p className="text-xs text-gray-600">引入极性偏移系数 δ，将部分正面评论的标签向中性偏移，或软化负面评论，模拟模棱两可的标注。</p>
                  </div>
                  <div className="bg-gray-50 border p-4 rounded">
                    <h4 className="font-bold text-blue-600 mb-1 text-sm">Alpaca-InstructionShift (Alpaca-IS)</h4>
                    <p className="text-xs text-gray-600">将回复重写为 Terse（简洁）、Elaborate（详尽）和 Conversational（对话式）三种风格，测试指令跟随的一致性。</p>
                  </div>
                </div>
              </div>

              {/* Appendix E */}
              <div className="mb-8 bg-white p-6 rounded-lg shadow border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4">附录 E：额外实验结果</h3>
                
                <h4 className="font-bold text-gray-700 mb-2 text-sm">1. 现代模型架构上的表现 (Modern Backbones)</h4>
                <p className="text-xs text-gray-600 mb-3">DCPC 在最新的开源模型上也表现出一致的提升：</p>
                <div className="overflow-x-auto mb-6">
                  <table className="min-w-full text-sm border bg-gray-50">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border px-3 py-2 text-left">Backbone</th>
                        <th className="border px-3 py-2 text-left">BoolQ-PS (Acc)</th>
                        <th className="border px-3 py-2 text-left">Alpaca-IS (Score)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="border px-3 py-2">LLaMA-3 8B</td><td className="border px-3 py-2">88.3 → <strong>91.7</strong> (+3.4)</td><td className="border px-3 py-2">9.3 → <strong>9.7</strong> (+0.4)</td></tr>
                      <tr><td className="border px-3 py-2">Qwen2.5 7B</td><td className="border px-3 py-2">89.2 → <strong>91.6</strong> (+2.4)</td><td className="border px-3 py-2">9.2 → <strong>9.6</strong> (+0.4)</td></tr>
                      <tr><td className="border px-3 py-2">DeepSeek-V2 16B</td><td className="border px-3 py-2">90.1 → <strong>92.7</strong> (+2.6)</td><td className="border px-3 py-2">9.4 → <strong>9.8</strong> (+0.4)</td></tr>
                    </tbody>
                  </table>
                </div>

                <h4 className="font-bold text-gray-700 mb-2 text-sm">2. 复杂任务与 OOD 迁移 (Complex Tasks & OOD)</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li><strong>代码理解 (CodeXGLUE):</strong> LLaMA-2 7B 上，DCPC 比 Full-FT 提升了 <strong>+2.3 BLEU</strong>。</li>
                  <li><strong>数学推理 (MATH):</strong> 准确率从 P-Tuning v2 的 71.8% 提升至 <strong>75.2%</strong>。</li>
                  <li><strong>OOD 迁移 (Zero-Shot):</strong> 在未见过的 FLAN-2024 任务集上，DCPC 训练的模型胜率比 Full-FT 高出 <strong>+2.9%</strong>，证明其学到了更通用的风格不变特征，而非死记硬背。</li>
                </ul>
              </div>
            </section>

            {/* Section 5: Conclusion */}
            <section id="conclusion" className="mb-12 scroll-mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                5. 总结 (Conclusion)
              </h2>
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">
                  论文《Whose Instructions Count?》揭示了指令微调中被长期忽视的"偏好偏差"隐患。DCPC 框架通过三个精巧的步骤——<strong>检测</strong>（相似度与KL散度对比）、<strong>对齐</strong>（跨层前缀混合）和<strong>修正</strong>（PCM模块）——在不引入人工清洗成本的前提下，动态解决了这一问题。
                </p>
                <p>
                  这不仅提升了模型在标准任务上的表现，更关键的是赋予了模型在面对风格冲突、含噪数据时极强的鲁棒性，为构建更可靠的 LLM 应用确立了新的 SOTA。
                </p>
              </div>

              {/* 方法总结卡片 */}
              <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
                <h3 className="font-bold text-purple-800 mb-4">DCPC 三步法总结</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-purple-100 text-center">
                    <div className="text-3xl mb-2">🔍</div>
                    <div className="font-bold text-purple-700 mb-1">Step 1: 检测</div>
                    <p className="text-xs text-gray-600">偏好敏感相似度机制</p>
                    <p className="text-xs text-gray-500 mt-1">语义相似 + 分布分歧 → 冲突评分</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-purple-100 text-center">
                    <div className="text-3xl mb-2">🔗</div>
                    <div className="font-bold text-purple-700 mb-1">Step 2: 对齐</div>
                    <p className="text-xs text-gray-600">跨层前缀混合</p>
                    <p className="text-xs text-gray-500 mt-1">交叉混合 + 对齐损失 → 几何收敛</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-purple-100 text-center">
                    <div className="text-3xl mb-2">✨</div>
                    <div className="font-bold text-purple-700 mb-1">Step 3: 修正</div>
                    <p className="text-xs text-gray-600">偏好修正模块 PCM</p>
                    <p className="text-xs text-gray-500 mt-1">采样偏好 + 元矩阵 → 注入共识</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="mt-12 pt-8 border-t border-gray-200 text-center">
              <p className="text-gray-500 italic text-sm">
                &quot;Not all instructions are created equal — and that&apos;s okay, as long as we know how to handle it.&quot;
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Generated based on the paper &quot;Whose Instructions Count? Resolving Preference Bias in Instruction Fine-Tuning&quot; (NeurIPS 2025)
              </p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}

