import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Book, Database, Cpu, BarChart2, MessageSquare, Shield, ArrowRight, ArrowLeft, CheckCircle, Brain, Code, Zap, Calculator, Sigma, MoveHorizontal, GitMerge } from 'lucide-react';

const DeepSeekLLM = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewSection />;
      case 'scaling':
        return <ScalingLawsSection />;
      case 'training':
        return <TrainingSection />;
      case 'alignment':
        return <AlignmentSection />;
      case 'evaluation':
        return <EvaluationSection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-slate-900 text-white pt-8 pb-12 px-4 sm:px-6 lg:px-8 border-b border-blue-500 relative">
        <div className="absolute top-6 left-6">
             <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
               <ArrowLeft size={20} />
               <span className="hidden md:inline">返回目录</span>
            </Link>
        </div>
        <div className="max-w-7xl mx-auto mt-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-blue-600 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">论文解析</span>
            <span className="text-slate-400 text-sm">arXiv:2401.02954v1</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            DeepSeek LLM: <span className="text-blue-400">以长期主义扩展开源语言模型</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            深入探索 DeepSeek LLM (7B & 67B) 的扩展定律、架构创新与卓越性能。
            揭示如何通过大规模数据与精细化调整，在代码、数学和推理领域超越 LLaMA-2 70B。
          </p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 md:space-x-8 overflow-x-auto py-4 hide-scrollbar">
            <NavButton id="overview" label="项目概览" icon={<Book size={18} />} activeTab={activeTab} setActiveTab={setActiveTab} />
            <NavButton id="scaling" label="扩展定律" icon={<BarChart2 size={18} />} activeTab={activeTab} setActiveTab={setActiveTab} />
            <NavButton id="training" label="预训练与架构" icon={<Cpu size={18} />} activeTab={activeTab} setActiveTab={setActiveTab} />
            <NavButton id="alignment" label="对齐策略" icon={<MessageSquare size={18} />} activeTab={activeTab} setActiveTab={setActiveTab} />
            <NavButton id="evaluation" label="性能评估" icon={<Zap size={18} />} activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="transition-all duration-300 ease-in-out">
          {renderContent()}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 mt-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="mb-4">基于 DeepSeek-AI 团队论文 "Scaling Open-Source Language Models with Longtermism"</p>
          <p className="text-sm">Generated for educational purposes based on uploaded content.</p>
        </div>
      </footer>
    </div>
  );
};

// Components

const NavButton = ({ id, label, icon, activeTab, setActiveTab }) => (
  <button
    onClick={() => setActiveTab(id)}
    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
      activeTab === id
        ? 'bg-blue-600 text-white shadow-md'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`}
  >
    {icon}
    {label}
  </button>
);

const OverviewSection = () => (
  <div className="space-y-12">
    <section>
      <h2 className="text-3xl font-bold text-slate-900 mb-6">核心亮点</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <FeatureCard 
          icon={<Brain className="text-purple-500" size={32} />}
          title="双模型配置"
          description="推出了 7B 和 67B 两种规模的模型。67B 模型在多项基准测试中超越了 LLaMA-2 70B，尤其是在代码、数学和推理方面。"
        />
        <FeatureCard 
          icon={<Database className="text-blue-500" size={32} />}
          title="2万亿 Token 数据"
          description="构建了包含 2 Trillion tokens 的高质量数据集，涵盖中英文，通过去重、过滤和重组策略显著提升了数据质量。"
        />
        <FeatureCard 
          icon={<BarChart2 className="text-green-500" size={32} />}
          title="扩展定律 (Scaling Laws)"
          description="深入研究了超参数、数据与模型规模的扩展规律，提出了新的模型/数据最优分配策略。"
        />
      </div>
    </section>

    <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
      <h2 className="text-2xl font-bold mb-4">为什么叫"长期主义" (Longtermism)?</h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        论文强调，DeepSeek LLM 不仅仅是为了发布一个模型，而是为了探索开源大语言模型的未来扩展路径。
        通过重新审视 Scaling Laws（扩展定律），团队致力于解决早期研究中关于模型与数据规模扩展的结论分歧。
        这种基础性研究为未来更大规模模型的训练奠定了坚实的理论基础。
      </p>
      <div className="flex flex-wrap gap-4 mt-6">
        <Badge text="开源贡献" color="blue" />
        <Badge text="从零训练" color="indigo" />
        <Badge text="中英双语" color="emerald" />
        <Badge text="代码与数学增强" color="orange" />
      </div>
    </section>
  </div>
);

const ScalingLawsSection = () => (
  <div className="space-y-10">
    <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
      <h3 className="text-xl font-bold text-blue-900 mb-2">核心发现</h3>
      <p className="text-blue-800">
        研究发现，数据质量越高，增加计算预算时应更多地分配给模型规模的扩大，而非仅仅增加数据量。
      </p>
    </div>

    {/* Formula 1: Hyperparameters */}
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Calculator size={20} className="text-blue-600" /> 超参数扩展公式
      </h3>
      <p className="text-slate-600 mb-4">
        通过拟合实验数据，团队得出了最优 Batch Size 和学习率与计算预算 C 的关系。
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        <FormulaBox 
          title="最优 Batch Size (B_opt)"
          formula="B_opt = 0.2920 × C^0.3271"
          desc="计算预算增加，Batch Size 显著增加。"
        />
        <FormulaBox 
          title="最优 Learning Rate (η_opt)"
          formula="η_opt = 0.3118 × C^-0.1250"
          desc="计算预算增加，学习率缓慢减小。"
        />
      </div>
    </div>

    {/* Formula 2: Model Scale Representation */}
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Sigma size={20} className="text-purple-600" /> 模型规模的新定义 (M)
      </h3>
      <p className="text-slate-600 mb-4">
        为了更准确地衡量计算成本，DeepSeek 提出了使用 <strong>非 Embedding FLOPs/token</strong> 来表示模型规模 M，而非传统的参数量 N。
      </p>
      
      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-4 font-mono text-center">
        <div className="text-lg md:text-xl font-bold text-slate-800 mb-2">
          M = 72 n<sub>layer</sub> d<sub>model</sub><sup>2</sup> + 12 n<sub>layer</sub> d<sub>model</sub> l<sub>seq</sub>
        </div>
        <div className="text-sm text-slate-500 mt-4 flex flex-wrap justify-center gap-4">
           <span>n<sub>layer</sub>: 层数</span>
           <span>d<sub>model</sub>: 隐藏层维度</span>
           <span>l<sub>seq</sub>: 序列长度</span>
        </div>
      </div>
      
      <div className="flex items-start gap-3 mt-4 text-sm text-slate-600 bg-yellow-50 p-4 rounded border border-yellow-100">
         <ArrowRight className="text-yellow-600 mt-1 shrink-0" size={16} />
         <p>
           相比于传统的 6N 近似 (C ≈ 6ND)，使用 M (C = MD) 能更精确地拟合扩展曲线，特别是在处理不同词表大小或架构时误差更小。
         </p>
      </div>
    </div>

    {/* Formula 3: Optimal Allocation */}
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <GitMerge size={20} className="text-emerald-600" /> 最优模型/数据分配
      </h3>
      <p className="text-slate-600 mb-4">
        基于高质量数据，DeepSeek 发现应分配更多算力给模型规模。
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        <FormulaBox 
          title="最优模型规模 (M_opt)"
          formula="M_opt = 0.1715 × C^0.5243"
          desc="幂指数 a ≈ 0.52，表明模型增长略快于数据。"
          color="emerald"
        />
        <FormulaBox 
          title="最优数据量 (D_opt)"
          formula="D_opt = 5.8316 × C^0.4757"
          desc="幂指数 b ≈ 0.48。"
          color="emerald"
        />
      </div>
      <p className="text-xs text-slate-400 mt-4 text-center">
        * C 代表 Compute Budget (计算预算)
      </p>
    </div>
  </div>
);

const TrainingSection = () => (
  <div className="space-y-12">
    <section>
      <h2 className="text-3xl font-bold mb-6">模型架构细节</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="p-4 font-bold border-b">参数 / 模型</th>
              <th className="p-4 font-bold border-b text-blue-600">DeepSeek 7B</th>
              <th className="p-4 font-bold border-b text-purple-600">DeepSeek 67B</th>
            </tr>
          </thead>
          <tbody className="text-slate-600 divide-y divide-slate-100">
            <tr>
              <td className="p-4 font-medium text-slate-900">层数 (Layers)</td>
              <td className="p-4">30</td>
              <td className="p-4">95 (更深的网络结构)</td>
            </tr>
            <tr>
              <td className="p-4 font-medium text-slate-900">隐藏层维度 (d_model)</td>
              <td className="p-4">4096</td>
              <td className="p-4">8192</td>
            </tr>
            <tr>
              <td className="p-4 font-medium text-slate-900">注意力头数 (Heads)</td>
              <td className="p-4">32</td>
              <td className="p-4">64</td>
            </tr>
            <tr>
              <td className="p-4 font-medium text-slate-900">注意力机制</td>
              <td className="p-4">Multi-Head Attention (MHA)</td>
              <td className="p-4">Grouped-Query Attention (GQA)</td>
            </tr>
            <tr>
              <td className="p-4 font-medium text-slate-900">上下文长度</td>
              <td className="p-4">4096</td>
              <td className="p-4">4096</td>
            </tr>
            <tr>
              <td className="p-4 font-medium text-slate-900">训练数据量</td>
              <td className="p-4">2.0 Trillion Tokens</td>
              <td className="p-4">2.0 Trillion Tokens</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-slate-500 italic">
        注：67B 模型采用了 GQA（分组查询注意力）来优化推理成本，并通过增加深度（95层）而非仅仅增加宽度来扩展参数，这有助于提升性能。
      </p>
    </section>

    <section className="grid md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-2xl font-bold mb-4">预训练数据工程</h3>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full">
          <ol className="relative border-l border-slate-200 ml-3 space-y-8">
            <TimelineItem 
              title="去重 (Deduplication)"
              desc="采用了激进的去重策略。研究发现，对整个 Common Crawl 语料库进行全局去重，比单独处理每个 dump 移除的重复文档多出4倍（从 22.2% 提升至 89.8% 的去重率）。"
            />
            <TimelineItem 
              title="过滤 (Filtering)"
              desc="结合语言学和语义评估，从微观和宏观角度严格把控数据质量，提升信息密度。"
            />
            <TimelineItem 
              title="重组 (Remixing)"
              desc="调整不同数据源的比例，解决数据不平衡问题，增加代表性不足的领域数据。"
            />
          </ol>
        </div>
      </div>
      
      <div>
        <h3 className="text-2xl font-bold mb-4">基础设施与优化</h3>
        <div className="bg-slate-800 text-slate-200 p-6 rounded-xl h-full flex flex-col justify-center space-y-4">
          <div className="flex items-start gap-3">
            <Zap className="text-yellow-400 mt-1" />
            <div>
              <h4 className="font-bold text-white">HAI-LLM 框架</h4>
              <p className="text-sm opacity-80">高效轻量级训练框架，集成数据并行、张量并行、序列并行和 1F1B 流水线并行。</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <BarChart2 className="text-green-400 mt-1" />
            <div>
              <h4 className="font-bold text-white">Multi-step 学习率调度器</h4>
              <p className="text-sm opacity-80">
                不同于常见的 Cosine 调度器，DeepSeek 采用多步（Multi-step）调度。
                <br/>好处：方便在不同阶段复用检查点进行持续训练（Continual Training），且性能与 Cosine 相当。
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="text-blue-400 mt-1" />
            <div>
              <h4 className="font-bold text-white">Flash Attention</h4>
              <p className="text-sm opacity-80">利用 Flash Attention 技术提升硬件利用率，优化训练速度。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const AlignmentSection = () => (
  <div className="space-y-12">
    <div className="text-center max-w-3xl mx-auto mb-8">
      <h2 className="text-3xl font-bold mb-4">对齐：从 Base 到 Chat</h2>
      <p className="text-lg text-slate-600">
        通过监督微调 (SFT) 和直接偏好优化 (DPO)，DeepSeek LLM 获得了强大的对话能力，并在保持基座模型能力的同时减少了幻觉和重复。
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-12 items-start">
      <div className="bg-indigo-50 p-8 rounded-2xl">
        <h3 className="text-2xl font-bold text-indigo-900 mb-4">1. 监督微调 (SFT)</h3>
        <ul className="space-y-4 text-indigo-800">
          <li className="flex gap-3">
            <span className="font-bold bg-indigo-200 w-8 h-8 flex items-center justify-center rounded-full shrink-0">1</span>
            <span>收集了约 150 万条中英文指令数据，涵盖有用性（Helpfulness）和无害性（Harmlessness）。</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold bg-indigo-200 w-8 h-8 flex items-center justify-center rounded-full shrink-0">2</span>
            <span>数学 (46.6%) 和代码 (22.2%) 数据占据很大比例，显著提升了模型在这些领域的表现。</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold bg-indigo-200 w-8 h-8 flex items-center justify-center rounded-full shrink-0">3</span>
            <span><strong>分阶段微调策略：</strong> 为了解决数学/代码数据可能导致的"重复"问题（Repetition），采用了两阶段微调。第二阶段主要使用对话数据，成功降低了重复率。</span>
          </li>
        </ul>
      </div>

      <div className="bg-emerald-50 p-8 rounded-2xl">
        <h3 className="text-2xl font-bold text-emerald-900 mb-4">2. 直接偏好优化 (DPO)</h3>
        <ul className="space-y-4 text-emerald-800">
          <li className="flex gap-3">
            <span className="font-bold bg-emerald-200 w-8 h-8 flex items-center justify-center rounded-full shrink-0">1</span>
            <span>利用 DPO 算法进一步对齐人类偏好，提升开放式生成能力。</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold bg-emerald-200 w-8 h-8 flex items-center justify-center rounded-full shrink-0">2</span>
            <span>构建了包含有用性和无害性的偏好对数据。</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold bg-emerald-200 w-8 h-8 flex items-center justify-center rounded-full shrink-0">3</span>
            <span><strong>结果：</strong> DPO 显著增强了 Chat 模型在开放式对话（如 MT-Bench, AlignBench）中的表现，且未损害标准基准测试的成绩。</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

const EvaluationSection = () => (
  <div className="space-y-10">
    <section>
      <h2 className="text-3xl font-bold mb-6">与 LLaMA-2 70B 的对比</h2>
      <p className="text-slate-600 mb-6">
        DeepSeek LLM 67B 在多个关键领域显著优于同量级的开源标杆 LLaMA-2 70B，尤其是在<strong>数学</strong>、<strong>代码</strong>和<strong>中文能力</strong>上。
      </p>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Code & Math Chart Simulation */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h4 className="font-bold text-slate-700 mb-4 border-b pb-2">代码与数学能力 (Accuracy %)</h4>
          <div className="space-y-4">
            <ProgressBar label="GSM8K (数学)" deepseek={63.4} llama={58.4} />
            <ProgressBar label="MATH (高难数学)" deepseek={18.7} llama={13.5} />
            <ProgressBar label="HumanEval (代码)" deepseek={42.7} llama={28.7} />
            <ProgressBar label="MBPP (代码)" deepseek={57.4} llama={45.6} />
          </div>
          <div className="mt-4 flex gap-4 text-xs text-slate-500 justify-end">
             <div className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-600 rounded-sm"></div> DeepSeek 67B</div>
             <div className="flex items-center gap-1"><div className="w-3 h-3 bg-slate-300 rounded-sm"></div> LLaMA-2 70B</div>
          </div>
        </div>

        {/* General Reasoning Chart Simulation */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h4 className="font-bold text-slate-700 mb-4 border-b pb-2">通用推理与中文能力 (Accuracy %)</h4>
          <div className="space-y-4">
            <ProgressBar label="MMLU (综合知识)" deepseek={71.3} llama={69.0} />
            <ProgressBar label="BBH (困难推理)" deepseek={68.7} llama={62.9} />
            <ProgressBar label="C-Eval (中文)" deepseek={66.1} llama={55.5} />
            <ProgressBar label="CMMLU (中文)" deepseek={70.8} llama={53.1} />
          </div>
          <p className="text-xs text-slate-400 mt-4 text-right">* 数据来源：论文 Table 5 (Base Models)</p>
        </div>
      </div>
    </section>

    <section className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
      <h2 className="text-2xl font-bold mb-6">开放式问答评估 (Chat Model)</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-3 text-slate-800">英文开放能力 (MT-Bench)</h3>
          <p className="text-slate-600 mb-4">
            DeepSeek 67B Chat 在 MT-Bench 上得分为 <strong>8.35</strong>，经过 DPO 后提升至 <strong>8.76</strong>。
            <br/><br/>
            这一成绩：
            <span className="block mt-2 font-medium text-green-600">✓ 优于 LLaMA-2 70B Chat (6.86)</span>
            <span className="block font-medium text-green-600">✓ 优于 GPT-3.5-turbo (8.39)</span>
            <span className="block font-medium text-blue-600">≈ 接近 GPT-4 (9.0~9.2)</span>
          </p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-3 text-slate-800">中文开放能力 (AlignBench)</h3>
          <p className="text-slate-600 mb-4">
            在 AlignBench 评测中，DeepSeek 67B Chat 超越了当时的 ChatGPT 和其他开源中文模型，仅次于 GPT-4。
            <br/><br/>
            特别是在<strong>中文推理</strong>及<strong>数学逻辑</strong>子项上表现优异。
          </p>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Shield className="text-green-600" /> 安全性评估
      </h2>
      <p className="text-slate-700 leading-relaxed bg-green-50 p-6 rounded-lg border border-green-100">
        安全性是 DeepSeek LLM 开发的重要考量。团队构建了包含 2400 个测试用例的安全测试集，涵盖歧视、违法行为、侵权等多个类别。
        在 "Do-Not-Answer" 数据集测试中，DeepSeek 67B Chat 获得了 <strong>97.8</strong> 的高分，表明其具备很强的拒绝回答恶意诱导问题的能力，优于 ChatGPT (97.7) 和 GPT-4 (96.5)。
      </p>
    </section>
  </div>
);

// Helper Components

const FormulaBox = ({ title, formula, desc, color = 'blue' }) => {
  const bgMap = {
    blue: 'bg-blue-50 border-blue-100',
    emerald: 'bg-emerald-50 border-emerald-100',
  };
  
  return (
    <div className={`${bgMap[color] || bgMap.blue} p-4 rounded-lg border flex flex-col justify-between`}>
      <div>
        <div className="text-sm font-semibold text-slate-500 mb-2">{title}</div>
        <div className="text-lg font-mono font-bold text-slate-800 bg-white/60 p-2 rounded mb-2">
          {formula}
        </div>
      </div>
      <div className="text-xs text-slate-600 mt-1">
        {desc}
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </div>
);

const Badge = ({ text, color }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800',
    indigo: 'bg-indigo-100 text-indigo-800',
    emerald: 'bg-emerald-100 text-emerald-800',
    orange: 'bg-orange-100 text-orange-800',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${colorClasses[color] || colorClasses.blue}`}>
      {text}
    </span>
  );
};

const ListItem = ({ text }) => (
  <li className="flex items-start gap-3">
    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></div>
    <span className="text-slate-700">{text}</span>
  </li>
);

const TimelineItem = ({ title, desc }) => (
  <li className="mb-10 ml-4">
    <div className="absolute w-3 h-3 bg-blue-500 rounded-full mt-1.5 -left-1.5 border border-white"></div>
    <h4 className="text-lg font-semibold text-slate-900">{title}</h4>
    <p className="mb-4 text-base font-normal text-slate-500">{desc}</p>
  </li>
);

const ProgressBar = ({ label, deepseek, llama }) => (
  <div>
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <span className="text-sm font-bold text-blue-600">+{((deepseek - llama)).toFixed(1)}%</span>
    </div>
    <div className="w-full bg-slate-200 rounded-full h-2.5 mb-1 relative">
      <div className="bg-slate-300 h-2.5 rounded-full absolute top-0 left-0" style={{ width: `${llama}%` }}></div>
      <div className="bg-blue-600 h-2.5 rounded-full absolute top-0 left-0 opacity-80" style={{ width: `${deepseek}%` }}></div>
    </div>
    <div className="flex justify-between text-xs text-slate-500 px-1">
      <span>LLaMA-2: {llama}</span>
      <span className="font-bold text-blue-700">DeepSeek: {deepseek}</span>
    </div>
  </div>
);

export default DeepSeekLLM;


























