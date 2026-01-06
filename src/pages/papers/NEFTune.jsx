import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { 
  ArrowLeft, 
  Lightbulb, 
  Code,
  BarChart3,
  Brain,
  ChevronRight
} from 'lucide-react';

// 导航项
const navItems = [
  { id: 'abstract', label: '1. 核心摘要' },
  { id: 'methodology', label: '2. 核心方法详解' },
  { id: 'freelb', label: '2.2 与 FreeLB 的关系', indent: true },
  { id: 'experiment', label: '3. 实验结果' },
  { id: 'openllm', label: '3.2 OpenLLM 基准', indent: true },
  { id: 'rlhf', label: '3.3 与 RLHF 结合', indent: true },
  { id: 'analysis', label: '4. 深度分析' },
  { id: 'ablation', label: '4.2 消融实验', indent: true },
  { id: 'examples', label: '5. 生成样例对比' },
];

// 公式卡片组件
const FormulaCard = ({ label, children, description }) => (
  <div className="bg-white border border-slate-200 border-l-4 border-l-blue-500 rounded-lg p-6 my-6 shadow-sm relative">
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

// 变量解释卡片
const VariableCard = ({ symbol, title, description }) => (
  <div className="bg-slate-50 p-4 rounded-lg">
    <span className="text-lg font-mono font-bold text-purple-700">
      <InlineMath math={symbol} />
    </span>
    <p className="text-sm text-slate-600 mt-2">
      <strong>{title}</strong><br />
      {description}
    </p>
  </div>
);

// 结果卡片
const ResultCard = ({ title, icon, bgColor, borderColor, textColor, children }) => (
  <div className={`${bgColor} p-4 rounded border-l-4 ${borderColor}`}>
    <h4 className={`font-bold ${textColor} flex items-center gap-2`}>
      {icon}
      {title}
    </h4>
    <p className={`text-sm ${textColor.replace('800', '700')}`}>{children}</p>
  </div>
);

export default function NEFTune() {
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
                NEFTune: Noisy Embeddings Improve Instruction Finetuning
              </h1>
              <p className="text-xl text-slate-600 mb-4">
                NEFTune：噪声嵌入如何显著提升指令微调效果
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                <span>Neel Jain et al.</span>
                <span>•</span>
                <span>arXiv:2310.05914v2</span>
                <span>•</span>
                <span>ICLR 2024</span>
              </div>
            </header>

            {/* Section 1: 核心摘要 */}
            <section id="abstract" className="scroll-mt-8">
              <h2 className="text-2xl font-bold text-slate-800 pl-4 border-l-4 border-blue-500 mb-6">
                1. 核心摘要 (Abstract)
              </h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 leading-relaxed mb-4">
                  大语言模型（LLM）的指令微调（Instruction Finetuning）通常依赖于精心策划的小型数据集。这篇论文提出了一个极其简单却效果惊人的增强技术——<strong>NEFTune (Noisy Embedding Instruction Fine Tuning)</strong>。
                </p>

                <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-6">
                  <h3 className="text-blue-900 font-bold text-lg mb-2 flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2" />
                    核心成果
                  </h3>
                  <p className="text-blue-900 mb-0">
                    仅仅通过在训练过程中的<strong>嵌入向量（Embedding Vectors）</strong>上添加随机噪声，LLaMA-2-7B 模型在 AlpacaEval 上的表现从 <strong className="text-blue-700">29.79%</strong> 飙升至 <strong className="text-blue-700">64.69%</strong>，提升了约 <strong className="text-blue-700">35 个百分点</strong>。且这种方法不需要额外的计算资源或数据。
                  </p>
                </div>

                <p className="text-slate-700 leading-relaxed">
                  这听起来像是 LLM 微调领域的"免费午餐"。研究表明，这种方法不仅提升了对话质量，还保持了模型在事实性问答基准上的能力。
                </p>
              </div>
            </section>

            {/* Section 2: 核心方法详解 */}
            <section id="methodology" className="mt-16 scroll-mt-8">
              <h2 className="text-2xl font-bold text-slate-800 pl-4 border-l-4 border-blue-500 mb-6">
                2. 核心方法详解 (Methodology)
              </h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-lg text-slate-700 mb-6">
                  NEFTune 的核心在于对模型的<strong>嵌入层（Embedding Layer）</strong>输出进行扰动。通常，模型将输入的 tokens 转换为嵌入向量后直接传入后续的 Transformer 层。NEFTune 在这一步插入了一个噪声项。
                </p>

                <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                  <h3 className="text-2xl font-semibold mb-4 text-blue-700">NEFTune 噪声注入公式</h3>
                  
                  <p className="text-slate-600 mb-4">
                    对于每一个训练样本的嵌入矩阵，NEFTune 执行以下操作：
                  </p>

                  <FormulaCard label="Core Formula">
                    <BlockMath math="X'_{emb} = X_{emb} + \frac{\alpha}{\sqrt{Ld}} \epsilon" />
                  </FormulaCard>

                  <div className="space-y-6 mt-8">
                    <h4 className="text-xl font-bold text-slate-800 border-l-4 border-purple-500 pl-3">公式详细拆解与解释</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <VariableCard 
                        symbol="X_{emb}"
                        title="原始嵌入向量"
                        description="这是将输入的 token 序列通过 Embedding 层查找表后得到的张量。维度通常为 [B, L, d]，其中 B 是 batch size。"
                      />
                      
                      <VariableCard 
                        symbol="\epsilon"
                        title="噪声向量"
                        description="从均匀分布 Uniform(-1, 1) 中采样的随机噪声张量。它与原始嵌入具有相同的维度。"
                      />

                      <VariableCard 
                        symbol="\alpha"
                        title="噪声缩放因子 (Tunable Parameter)"
                        description="这是 NEFTune 中主要的可调超参数。论文中通常尝试 α ∈ {5, 10, 15}。它控制了整体噪声的强度。"
                      />

                      <VariableCard 
                        symbol="L"
                        title="序列长度 (Sequence Length)"
                        description="当前训练样本的 token 数量。如果在 batch 中序列长度不一致，这个 L 针对每个序列是独立的。"
                      />

                      <VariableCard 
                        symbol="d"
                        title="嵌入维度 (Embedding Dimension)"
                        description="模型的隐藏层维度（例如 LLaMA-7B 中 d=4096）。"
                      />
                      
                      <div className="bg-blue-50 p-4 rounded-lg col-span-1 md:col-span-2 border border-blue-100">
                        <span className="text-lg font-mono font-bold text-blue-700">
                          缩放因子 <InlineMath math="\frac{\alpha}{\sqrt{Ld}}" /> 的意义
                        </span>
                        <p className="text-sm text-slate-700 mt-2">
                          为什么不仅仅使用 <InlineMath math="\alpha" />？<br /><br />
                          这个缩放规则借鉴自对抗机器学习文献（如 FreeLB）。添加的噪声向量的<strong>期望欧几里得范数（Expected Euclidean Magnitude）</strong>约为 <InlineMath math="\frac{\alpha}{\sqrt{3}}" />。
                          <br /><br />
                          除以 <InlineMath math="\sqrt{Ld}" /> 是为了归一化。随着序列长度 <InlineMath math="L" /> 或模型维度 <InlineMath math="d" /> 的增加，整个张量的能量（范数）会增加。为了保持施加的扰动相对于原始信号的强度一致，必须根据 <InlineMath math="L" /> 和 <InlineMath math="d" /> 进行缩放。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 算法伪代码 */}
                <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Code className="w-5 h-5 text-slate-600" />
                    算法伪代码 (Algorithm 1)
                  </h3>
                  <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`# 输入: 数据集 D, 模型参数 θ, 缩放参数 α
Initialize θ from pretrained model

repeat
    Sample batch (X_i, Y_i) ~ D
    X_emb ← Embed(X_i)
    ε ~ Uniform(-1, 1)                    # 生成噪声
    X'_emb ← X_emb + (α / √(L*d)) * ε    # 注入噪声 ← 关键步骤
    Y_pred ← f_/emb(X'_emb)               # 前向传播（使用噪声嵌入）
    θ ← Optimizer(θ, Loss(Y_pred, Y_i))
until stopping criteria met`}</pre>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2.2: 与 FreeLB 的关系 */}
            <section id="freelb" className="mt-12 scroll-mt-8">
              <h3 className="text-xl font-bold text-slate-700 mb-4">2.2 与 FreeLB 等对抗学习方法的关系</h3>
              <div className="prose prose-slate max-w-none">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
                  <h4 className="font-bold text-amber-800 mb-3">💡 噪声缩放规则的来源</h4>
                  <p className="text-amber-900 mb-0">
                    NEFTune 的缩放规则 <InlineMath math="\frac{\alpha}{\sqrt{Ld}}" /> 借鉴自<strong>对抗机器学习文献</strong>，特别是 FreeLB (Zhu et al., 2019) 和图对抗训练 (Kong et al., 2022)。
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-red-50 p-5 rounded-lg border border-red-200">
                    <h4 className="font-bold text-red-700 mb-3">FreeLB (对抗训练)</h4>
                    <ul className="text-sm text-red-700 space-y-2">
                      <li>• 先添加小 <strong>Gaussian 噪声</strong></li>
                      <li>• 然后用<strong>梯度步</strong>找到最大化损失的扰动</li>
                      <li>• 计算成本高（需要额外前向/反向传播）</li>
                      <li>• 目标：提升 MLM 模型鲁棒性</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-5 rounded-lg border border-green-200">
                    <h4 className="font-bold text-green-700 mb-3">NEFTune (随机噪声)</h4>
                    <ul className="text-sm text-green-700 space-y-2">
                      <li>• 直接添加 <strong>Uniform(-1,1) 随机噪声</strong></li>
                      <li>• <strong>非对抗性</strong>，无需额外计算</li>
                      <li>• 零额外计算开销</li>
                      <li>• 目标：提升指令微调泛化能力</li>
                    </ul>
                  </div>
                </div>

                <FormulaCard label="噪声范数分析">
                  <p className="text-slate-600 mb-3">均匀分布噪声的期望欧几里得范数：</p>
                  <BlockMath math="\mathbb{E}[\|\epsilon\|_2] \approx \frac{\alpha}{\sqrt{3}}" />
                  <p className="text-sm text-slate-500 mt-3">
                    对于 <InlineMath math="\epsilon \sim \text{Uniform}(-1, 1)" />，每个元素的方差为 <InlineMath math="\frac{1}{3}" />，
                    因此整个向量范数的期望约为 <InlineMath math="\frac{\alpha}{\sqrt{3}}" />。
                  </p>
                </FormulaCard>

                <div className="mt-6 p-4 bg-slate-100 rounded-lg">
                  <h4 className="font-bold text-slate-800 mb-2">关键区别总结</h4>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-300">
                        <th className="text-left py-2 text-slate-600">方法</th>
                        <th className="text-left py-2 text-slate-600">噪声类型</th>
                        <th className="text-left py-2 text-slate-600">额外成本</th>
                        <th className="text-left py-2 text-slate-600">适用场景</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="py-2 font-medium">FreeLB</td>
                        <td className="py-2">对抗性 (梯度优化)</td>
                        <td className="py-2 text-red-600">高</td>
                        <td className="py-2">预训练 MLM</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium">NEFTune</td>
                        <td className="py-2">随机 Uniform</td>
                        <td className="py-2 text-green-600">无</td>
                        <td className="py-2">指令微调</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Section 3: 实验结果 */}
            <section id="experiment" className="mt-16 scroll-mt-8">
              <h2 className="text-2xl font-bold text-slate-800 pl-4 border-l-4 border-blue-500 mb-6">
                3. 实验结果 (Experiments)
              </h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 mb-6">
                  作者在 LLaMA-1, LLaMA-2, OPT 等多个模型以及 Alpaca, Evol-Instruct, ShareGPT 等多个指令数据集上进行了测试。
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* 柱状图 - 修复后的版本 */}
                  <div className="bg-white p-6 rounded-xl shadow border border-slate-200">
                    <h3 className="font-bold text-center mb-6 text-slate-800 flex items-center justify-center gap-2">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                      AlpacaEval 胜率对比 (LLaMA-2-7B)
                    </h3>
                    
                    {/* 改进后的柱状图 */}
                    <div className="space-y-6">
                      {/* Alpaca 对比 */}
                      <div>
                        <div className="flex justify-between text-sm text-slate-600 mb-2">
                          <span className="font-medium">Alpaca (标准微调)</span>
                          <span className="font-bold text-slate-500">29.8%</span>
                        </div>
                        <div className="h-8 bg-slate-200 rounded-lg overflow-hidden">
                          <div 
                            className="h-full bg-slate-400 rounded-lg flex items-center justify-end pr-2 text-white text-xs font-bold"
                            style={{ width: '29.8%' }}
                          >
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm text-slate-600 mb-2">
                          <span className="font-medium">Alpaca + NEFTune</span>
                          <span className="font-bold text-blue-600">64.7%</span>
                        </div>
                        <div className="h-8 bg-slate-200 rounded-lg overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-end pr-2 text-white text-xs font-bold shadow-lg"
                            style={{ width: '64.7%' }}
                          >
                            +34.9%
                          </div>
                        </div>
                      </div>

                      {/* Evol-Instruct 对比 */}
                      <div className="pt-4 border-t border-slate-100">
                        <div className="flex justify-between text-sm text-slate-600 mb-2">
                          <span className="font-medium">Evol-Instruct (标准微调)</span>
                          <span className="font-bold text-slate-500">70.3%</span>
                        </div>
                        <div className="h-8 bg-slate-200 rounded-lg overflow-hidden">
                          <div 
                            className="h-full bg-slate-400 rounded-lg flex items-center justify-end pr-2 text-white text-xs font-bold"
                            style={{ width: '70.3%' }}
                          >
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm text-slate-600 mb-2">
                          <span className="font-medium">Evol-Instruct + NEFTune</span>
                          <span className="font-bold text-blue-600">79.6%</span>
                        </div>
                        <div className="h-8 bg-slate-200 rounded-lg overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-end pr-2 text-white text-xs font-bold shadow-lg"
                            style={{ width: '79.6%' }}
                          >
                            +9.3%
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 mt-4 text-center">* 数据来源：Table 1 of the paper</p>
                  </div>

                  {/* 结果总结 */}
                  <div className="space-y-4">
                    <ResultCard
                      title="对话质量大幅提升"
                      icon="✅"
                      bgColor="bg-green-50"
                      borderColor="border-green-500"
                      textColor="text-green-800"
                    >
                      在所有测试的数据集上，使用 NEFTune 训练的模型的 AlpacaEval 胜率都有显著提升（平均提升约 15%）。即使是经过 RLHF 的 LLaMA-2-Chat 模型，在使用 NEFTune 进一步微调后也能获得提升。
                    </ResultCard>

                    <ResultCard
                      title="保持核心能力"
                      icon="✅"
                      bgColor="bg-indigo-50"
                      borderColor="border-indigo-500"
                      textColor="text-indigo-800"
                    >
                      在 OpenLLM Leaderboard (ARC, HellaSwag, MMLU, TruthfulQA) 的测试中，NEFTune 模型的表现与基线模型持平。这意味着<strong>对话能力的提升并没有以牺牲事实知识或推理能力为代价</strong>。
                    </ResultCard>

                    {/* 详细结果表格 */}
                    <div className="bg-white p-4 rounded-lg border border-slate-200 mt-4">
                      <h4 className="font-bold text-slate-700 mb-3 text-sm">更多模型结果 (AlpacaEval)</h4>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-200">
                            <th className="text-left py-2 text-slate-600">Model + Data</th>
                            <th className="text-center py-2 text-slate-600">Base</th>
                            <th className="text-center py-2 text-slate-600">+NEFT</th>
                            <th className="text-center py-2 text-slate-600">提升</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr>
                            <td className="py-2">LLaMA-2-7B + Alpaca</td>
                            <td className="text-center py-2">29.8%</td>
                            <td className="text-center py-2 text-blue-600 font-bold">64.7%</td>
                            <td className="text-center py-2 text-green-600">+34.9%</td>
                          </tr>
                          <tr>
                            <td className="py-2">LLaMA-2-7B + Evol-Instruct</td>
                            <td className="text-center py-2">70.4%</td>
                            <td className="text-center py-2 text-blue-600 font-bold">79.6%</td>
                            <td className="text-center py-2 text-green-600">+9.2%</td>
                          </tr>
                          <tr>
                            <td className="py-2">LLaMA-2-7B + ShareGPT</td>
                            <td className="text-center py-2">68.0%</td>
                            <td className="text-center py-2 text-blue-600 font-bold">78.1%</td>
                            <td className="text-center py-2 text-green-600">+10.1%</td>
                          </tr>
                          <tr>
                            <td className="py-2">LLaMA-2-7B + OpenPlatypus</td>
                            <td className="text-center py-2">45.8%</td>
                            <td className="text-center py-2 text-blue-600 font-bold">53.2%</td>
                            <td className="text-center py-2 text-green-600">+7.4%</td>
                          </tr>
                          <tr>
                            <td className="py-2">LLaMA-1-7B + Alpaca</td>
                            <td className="text-center py-2">22.2%</td>
                            <td className="text-center py-2 text-blue-600 font-bold">50.6%</td>
                            <td className="text-center py-2 text-green-600">+28.4%</td>
                          </tr>
                          <tr>
                            <td className="py-2">OPT-6.7B + Alpaca</td>
                            <td className="text-center py-2">17.3%</td>
                            <td className="text-center py-2 text-blue-600 font-bold">31.2%</td>
                            <td className="text-center py-2 text-green-600">+13.9%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* 模型预训练差异说明 */}
                <div className="mt-8 bg-slate-50 p-6 rounded-lg border border-slate-200">
                  <h4 className="font-bold text-slate-800 mb-3">模型预训练差异</h4>
                  <p className="text-sm text-slate-600 mb-4">
                    论文测试的三个模型系列在预训练 Token 数量上有显著差异，这影响了基线性能：
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-white p-3 rounded-lg border border-slate-200">
                      <div className="text-2xl font-bold text-slate-700">180B</div>
                      <div className="text-sm text-slate-500">OPT-6.7B</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-slate-200">
                      <div className="text-2xl font-bold text-slate-700">1T</div>
                      <div className="text-sm text-slate-500">LLaMA-1-7B</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-blue-300">
                      <div className="text-2xl font-bold text-blue-600">2T</div>
                      <div className="text-sm text-slate-500">LLaMA-2-7B</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3.2: OpenLLM Leaderboard */}
            <section id="openllm" className="mt-12 scroll-mt-8">
              <h3 className="text-xl font-bold text-slate-700 mb-4">3.2 OpenLLM Leaderboard 基准测试</h3>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 mb-4">
                  一个关键问题是：NEFTune 是否在提升对话能力的同时损害了模型的<strong>事实知识和推理能力</strong>？论文在 OpenLLM Leaderboard 的四个基准上进行了测试：
                </p>

                <div className="overflow-hidden border border-slate-200 rounded-lg">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="border-b-2 border-slate-400 px-4 py-3 text-left font-bold">基准</th>
                        <th className="border-b-2 border-slate-400 px-4 py-3 text-center font-bold">LLaMA-2 Alpaca</th>
                        <th className="border-b-2 border-slate-400 px-4 py-3 text-center font-bold">+NEFTune</th>
                        <th className="border-b-2 border-slate-400 px-4 py-3 text-center font-bold">差异</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="px-4 py-3 font-medium">ARC (推理)</td>
                        <td className="px-4 py-3 text-center">52.73</td>
                        <td className="px-4 py-3 text-center">53.24</td>
                        <td className="px-4 py-3 text-center text-green-600">+0.51</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium">HellaSwag (常识)</td>
                        <td className="px-4 py-3 text-center">77.60</td>
                        <td className="px-4 py-3 text-center">77.55</td>
                        <td className="px-4 py-3 text-center text-slate-500">-0.05</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium">MMLU (知识)</td>
                        <td className="px-4 py-3 text-center">45.93</td>
                        <td className="px-4 py-3 text-center">45.76</td>
                        <td className="px-4 py-3 text-center text-slate-500">-0.17</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium">TruthfulQA (真实性)</td>
                        <td className="px-4 py-3 text-center">41.16</td>
                        <td className="px-4 py-3 text-center">42.07</td>
                        <td className="px-4 py-3 text-center text-green-600">+0.91</td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="px-4 py-3 font-bold">平均</td>
                        <td className="px-4 py-3 text-center font-bold">54.36</td>
                        <td className="px-4 py-3 text-center font-bold">54.66</td>
                        <td className="px-4 py-3 text-center text-green-600 font-bold">+0.30</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-green-800 text-sm mb-0">
                    <strong>结论：</strong>NEFTune 模型在所有 OpenLLM 基准上的表现与基线模型<strong>基本持平甚至略有提升</strong>。
                    这证明对话质量的大幅提升<strong>不是以牺牲事实知识为代价</strong>的 —— 这真的是一顿"免费午餐"！
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3.3: 与 RLHF 结合 */}
            <section id="rlhf" className="mt-12 scroll-mt-8">
              <h3 className="text-xl font-bold text-slate-700 mb-4">3.3 与 RLHF 模型的结合</h3>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 mb-4">
                  一个自然的问题是：NEFTune 是否对已经经过 RLHF 训练的高质量模型（如 LLaMA-2-Chat）仍然有效？
                </p>

                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg border border-purple-200">
                  <h4 className="font-bold text-purple-800 mb-4">LLaMA-2-Chat + NEFTune 实验</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-lg border border-purple-100">
                      <div className="text-sm text-slate-600 mb-1">LLaMA-2-Chat-7B 原始</div>
                      <div className="text-3xl font-bold text-slate-700">71.4%</div>
                      <div className="text-xs text-slate-500">AlpacaEval 胜率</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-purple-100">
                      <div className="text-sm text-slate-600 mb-1">+ ShareGPT + NEFTune</div>
                      <div className="text-3xl font-bold text-purple-600">79.5%</div>
                      <div className="text-xs text-green-600 font-medium">+8.1% 提升</div>
                    </div>
                  </div>
                  <p className="text-sm text-purple-700 mt-4 mb-0">
                    即使是已经经过 RLHF 精心对齐的 LLaMA-2-Chat 模型，通过 NEFTune 在 ShareGPT 数据上进一步微调，
                    仍然能获得<strong>显著的性能提升</strong>。这表明 NEFTune 的正则化效果与 RLHF 是互补的。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4: 深度分析 */}
            <section id="analysis" className="mt-16 scroll-mt-8">
              <h2 className="text-2xl font-bold text-slate-800 pl-4 border-l-4 border-blue-500 mb-6">
                4. 深度分析：为什么有效？ (Analysis)
              </h2>
              <div className="prose prose-slate max-w-none">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 md:col-span-2">
                    <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                      <Brain className="w-5 h-5 text-purple-600" />
                      防止过拟合 (Overfitting)
                    </h3>
                    <p className="text-slate-600 mb-4">
                      论文作者假设，标准的指令微调容易导致模型过度拟合特定的指令格式、措辞细节或文本长度。
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-slate-600">
                      <li><strong>Training Loss:</strong> NEFTune 模型的训练损失（Training Loss）显著高于普通模型（因为噪声增加了任务难度）。</li>
                      <li><strong>Test Loss:</strong> 但 NEFTune 在测试集上的损失（Test Loss）略低于普通模型。</li>
                      <li>这表明 NEFTune 作为一个<strong>正则化器 (Regularizer)</strong>，阻止了模型仅仅"记住"指令数据的具体分布，从而提高了泛化能力。</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                    <h3 className="text-xl font-bold text-yellow-800 mb-3">不仅仅是变长了</h3>
                    <p className="text-sm text-yellow-700">
                      NEFTune 模型生成的回复通常比基线模型更长。虽然长度与 AlpacaEval 的分数有很强的相关性，但作者通过实验证明：
                      <br /><br />
                      <em>仅仅强迫基线模型生成长回复（通过 Prompt 或修改 EOS token），并不能达到 NEFTune 的性能水平。</em>
                      <br /><br />
                      这意味着 NEFTune 带来的不仅是冗长，还有内容的连贯性和质量。
                    </p>
                  </div>
                </div>

                {/* 正则化效果可视化 */}
                <div className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg border border-purple-200">
                  <h3 className="text-lg font-bold text-purple-800 mb-4">正则化效果解释</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-lg border border-purple-100">
                      <h4 className="font-bold text-slate-700 mb-2">标准微调</h4>
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="text-sm text-slate-600">Training Loss</div>
                          <div className="text-2xl font-bold text-green-600">↓ 低</div>
                        </div>
                        <div className="text-2xl text-slate-300">→</div>
                        <div>
                          <div className="text-sm text-slate-600">Test Loss</div>
                          <div className="text-2xl font-bold text-red-600">↑ 高</div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 mt-2">过拟合特定指令格式</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-purple-100">
                      <h4 className="font-bold text-slate-700 mb-2">NEFTune 微调</h4>
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="text-sm text-slate-600">Training Loss</div>
                          <div className="text-2xl font-bold text-amber-600">↑ 较高</div>
                        </div>
                        <div className="text-2xl text-slate-300">→</div>
                        <div>
                          <div className="text-sm text-slate-600">Test Loss</div>
                          <div className="text-2xl font-bold text-green-600">↓ 较低</div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 mt-2">噪声增加任务难度，提升泛化</p>
                    </div>
                  </div>
                </div>

                {/* α 参数选择指南 */}
                <div className="mt-8 bg-slate-50 p-6 rounded-lg border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">超参数 α 选择指南</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg text-center border border-slate-200">
                      <div className="text-3xl font-bold text-blue-600">5</div>
                      <div className="text-sm text-slate-600 mt-1">保守选择</div>
                      <div className="text-xs text-slate-400">小幅提升，安全</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg text-center border-2 border-blue-500">
                      <div className="text-3xl font-bold text-blue-600">10</div>
                      <div className="text-sm text-slate-600 mt-1">推荐值</div>
                      <div className="text-xs text-slate-400">平衡性能与稳定</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg text-center border border-slate-200">
                      <div className="text-3xl font-bold text-blue-600">15</div>
                      <div className="text-sm text-slate-600 mt-1">激进选择</div>
                      <div className="text-xs text-slate-400">更强正则化</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4.2: 消融实验 */}
            <section id="ablation" className="mt-12 scroll-mt-8">
              <h3 className="text-xl font-bold text-slate-700 mb-4">4.2 消融实验详解</h3>
              <div className="prose prose-slate max-w-none">
                
                {/* α 敏感性分析 */}
                <div className="bg-white p-6 rounded-lg border border-slate-200 mb-6">
                  <h4 className="font-bold text-slate-800 mb-4">α 值敏感性分析</h4>
                  <p className="text-sm text-slate-600 mb-4">
                    论文在 LLaMA-2-7B + Alpaca 上测试了不同 α 值的效果：
                  </p>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>α = 5</span>
                        <span className="font-bold">55.0%</span>
                      </div>
                      <div className="h-6 bg-slate-200 rounded overflow-hidden">
                        <div className="h-full bg-blue-400 rounded" style={{ width: '55%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>α = 10</span>
                        <span className="font-bold text-blue-600">64.7%</span>
                      </div>
                      <div className="h-6 bg-slate-200 rounded overflow-hidden">
                        <div className="h-full bg-blue-600 rounded" style={{ width: '64.7%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>α = 15</span>
                        <span className="font-bold">58.0%</span>
                      </div>
                      <div className="h-6 bg-slate-200 rounded overflow-hidden">
                        <div className="h-full bg-blue-400 rounded" style={{ width: '58%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>α = 0 (baseline)</span>
                        <span className="font-bold text-slate-500">29.8%</span>
                      </div>
                      <div className="h-6 bg-slate-200 rounded overflow-hidden">
                        <div className="h-full bg-slate-400 rounded" style={{ width: '29.8%' }}></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-3">
                    α = 10 在大多数情况下表现最好。过小的 α 提升有限，过大的 α 可能引入过多噪声导致性能下降。
                  </p>
                </div>

                {/* 长度控制实验 */}
                <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 mb-6">
                  <h4 className="font-bold text-yellow-800 mb-3">长度控制实验：不仅仅是变长了</h4>
                  <p className="text-sm text-yellow-700 mb-4">
                    NEFTune 模型生成的回复确实比基线模型更长，而 AlpacaEval 分数与长度高度相关。
                    但作者通过实验证明，<strong>强迫基线模型生成长回复并不能达到 NEFTune 的性能</strong>：
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="bg-white p-3 rounded-lg border border-yellow-200">
                      <div className="text-lg font-bold text-slate-700">29.8%</div>
                      <div className="text-xs text-slate-500">标准 Alpaca</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-yellow-200">
                      <div className="text-lg font-bold text-amber-600">39.8%</div>
                      <div className="text-xs text-slate-500">Alpaca + "详细回答" Prompt</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-green-300">
                      <div className="text-lg font-bold text-green-600">64.7%</div>
                      <div className="text-xs text-slate-500">Alpaca + NEFTune</div>
                    </div>
                  </div>
                  <p className="text-xs text-yellow-700 mt-3">
                    仅仅通过 Prompt 让模型生成更长的回复，只能从 29.8% → 39.8%，远低于 NEFTune 的 64.7%。
                    这证明 NEFTune 带来的是<strong>内容质量和连贯性的提升</strong>，而非单纯的冗长。
                  </p>
                </div>

                {/* 损失曲线分析 */}
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg border border-purple-200">
                  <h4 className="font-bold text-purple-800 mb-3">训练/测试损失对比</h4>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium text-slate-700 mb-2">Training Loss</h5>
                      <div className="flex items-end gap-4 h-24">
                        <div className="flex flex-col items-center">
                          <div className="bg-slate-400 w-12 rounded-t" style={{ height: '40%' }}></div>
                          <div className="text-xs text-slate-500 mt-1">Base</div>
                          <div className="text-xs font-bold">~1.0</div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="bg-blue-500 w-12 rounded-t" style={{ height: '70%' }}></div>
                          <div className="text-xs text-slate-500 mt-1">NEFT</div>
                          <div className="text-xs font-bold text-amber-600">~1.3</div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 mt-2">NEFTune 训练损失更高（任务更难）</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-slate-700 mb-2">Test Loss</h5>
                      <div className="flex items-end gap-4 h-24">
                        <div className="flex flex-col items-center">
                          <div className="bg-slate-400 w-12 rounded-t" style={{ height: '60%' }}></div>
                          <div className="text-xs text-slate-500 mt-1">Base</div>
                          <div className="text-xs font-bold text-red-600">较高</div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="bg-blue-500 w-12 rounded-t" style={{ height: '45%' }}></div>
                          <div className="text-xs text-slate-500 mt-1">NEFT</div>
                          <div className="text-xs font-bold text-green-600">较低</div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 mt-2">NEFTune 测试损失更低（泛化更好）</p>
                    </div>
                  </div>
                  <p className="text-sm text-purple-700 mt-4">
                    这是<strong>正则化效果</strong>的经典表现：训练时增加难度，但提高了泛化能力。
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5: 生成样例对比 */}
            <section id="examples" className="mt-16 scroll-mt-8">
              <h2 className="text-2xl font-bold text-slate-800 pl-4 border-l-4 border-blue-500 mb-6">
                5. 生成样例对比 (Examples)
              </h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 mb-6">
                  以下是论文中展示的 LLaMA-2-7B + Evol-Instruct 模型的生成对比案例：
                </p>

                {/* 示例 1 */}
                <div className="bg-white p-6 rounded-lg border border-slate-200 mb-6">
                  <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">Question 1</span>
                    What if Vincent van Gogh had been a successful artist during his lifetime?
                  </h4>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                      <div className="text-xs text-slate-500 mb-2 font-medium">❌ 标准微调</div>
                      <p className="text-sm text-slate-700">
                        As an AI language model, I don&apos;t have personal beliefs or opinions but based on historical facts and researches, it is believed that Van Gogh would not have experienced mental illness as he was recognized for his artistic talent in his early years before developing psychiatric problems later in life...
                      </p>
                      <div className="text-xs text-red-500 mt-2">回答较短，缺乏深度分析</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="text-xs text-green-600 mb-2 font-medium">✅ NEFTune</div>
                      <p className="text-sm text-slate-700">
                        1) Van Gogh would likely have continued to create art throughout his life... He may have experimented more with different styles and themes...
                        <br /><br />
                        2) His relationships with others might also have changed. With money and fame comes social status...
                        <br /><br />
                        3) Unfortunately, mental illness can be difficult to treat...
                        <br /><br />
                        4) Ultimately, whether or not Van Gogh became a successful artist during his lifetime wouldn&apos;t necessarily change the impact he made on modern art history...
                      </p>
                      <div className="text-xs text-green-600 mt-2">结构化回答，多角度分析</div>
                    </div>
                  </div>
                </div>

                {/* 示例 2 */}
                <div className="bg-white p-6 rounded-lg border border-slate-200 mb-6">
                  <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">Question 2</span>
                    What are the names of some famous actors that started their careers on Broadway?
                  </h4>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                      <div className="text-xs text-slate-500 mb-2 font-medium">❌ 标准微调</div>
                      <p className="text-sm text-slate-700 font-mono">
                        1. Meryl Streep<br />
                        2. Robert De Niro<br />
                        3. Al Pacino<br />
                        4. Kevin Spacey<br />
                        5. Nathan Lane<br />
                        ...
                      </p>
                      <div className="text-xs text-red-500 mt-2">只列出名字，没有详细信息</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="text-xs text-green-600 mb-2 font-medium">✅ NEFTune</div>
                      <p className="text-sm text-slate-700">
                        <strong>1. Al Pacino</strong> - He made his stage debut in 1967&apos;s &quot;Does a Tiger Wear a Necktie?&quot; and went on to star in several other Broadway productions...
                        <br /><br />
                        <strong>2. Meryl Streep</strong> - She began her career on Broadway in 1975 with the play &quot;Julia,&quot; followed by roles in &quot;Lost in Yonkers&quot; (1991)...
                        <br /><br />
                        <strong>3. James Earl Jones</strong> - The actor first appeared on Broadway in 1957&apos;s &quot;The Long Dream&quot;...
                      </p>
                      <div className="text-xs text-green-600 mt-2">每位演员都有详细的作品信息</div>
                    </div>
                  </div>
                </div>

                {/* 失败案例 */}
                <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                  <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">Failure Case</span>
                    数学计算仍有局限
                  </h4>
                  <p className="text-sm text-red-700 mb-3">
                    问题：Given that f(x) = 5x³ - 2x + 3, find the value of f(2).
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded border border-red-200">
                      <div className="text-xs text-slate-500 mb-1">标准微调答案</div>
                      <div className="font-mono text-red-600">22 ❌</div>
                    </div>
                    <div className="bg-white p-3 rounded border border-red-200">
                      <div className="text-xs text-slate-500 mb-1">NEFTune 答案</div>
                      <div className="font-mono text-red-600">45 ❌</div>
                    </div>
                  </div>
                  <p className="text-xs text-red-600 mt-3">
                    正确答案应为 5×8 - 4 + 3 = 39。两个模型都计算错误。
                    <strong>NEFTune 主要提升对话质量，对精确计算能力的提升有限。</strong>
                  </p>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="mt-16 pt-8 border-t border-slate-200 text-center">
              <p className="text-slate-500 italic">
                "It seems that regularization deserves to be revisited in the LLM setting."
              </p>
              <p className="text-sm text-slate-400 mt-2">
                Analysis generated based on arXiv:2310.05914v2
              </p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}

