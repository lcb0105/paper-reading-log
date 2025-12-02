import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  Brain, 
  Network, 
  Cpu, 
  Database, 
  Zap, 
  BarChart3, 
  GraduationCap,
  CheckCircle,
  Ruler,
  Info,
  Menu,
  X
} from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

const Qwen2 = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sections = [
    { id: 'intro', title: '1. 简介与模型家族', icon: Info },
    { id: 'architecture', title: '2. 核心架构设计', icon: Brain },
    { id: 'moe', title: '3. MoE 混合专家模型', icon: Network },
    { id: 'long-context', title: '4. 长文本机制', icon: Ruler },
    { id: 'pre-training', title: '5. 预训练', icon: BookOpen },
    { id: 'post-training', title: '6. 后训练', icon: GraduationCap },
    { id: 'evaluation', title: '7. 评估表现', icon: BarChart3 },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPosition && 
            (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section.id);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-slate-200 z-50 px-4 py-3 flex items-center justify-between">
        <Link to="/" className="p-2 text-slate-500 hover:text-indigo-600">
          <ArrowLeft size={20} />
        </Link>
        <span className="font-bold text-slate-800">Qwen2 技术报告</span>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-14 left-0 right-0 bg-white border-b border-slate-200 z-40 p-4 shadow-lg">
          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${activeSection === section.id 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <section.icon size={16} />
                {section.title}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Sidebar Navigation (Desktop) */}
      <nav className="hidden md:block fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-200 p-6 overflow-y-auto z-10">
        <div className="mb-8">
          <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors text-sm mb-6">
            <ArrowLeft size={16} />
            <span>返回目录</span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">
            Qwen2 <span className="text-indigo-600">Technical Report</span>
          </h1>
          <p className="text-xs text-slate-500 mt-2">深度精读笔记</p>
        </div>
        
        <ul className="space-y-1">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => scrollToSection(section.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                  ${activeSection === section.id 
                    ? 'bg-indigo-50 text-indigo-600 shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
              >
                <section.icon size={16} />
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="md:ml-64 p-6 md:p-12 max-w-5xl mx-auto pt-20 md:pt-6">
        
        {/* Header */}
        <header className="mb-16 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-900">
            Qwen2 技术报告深度解析
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            本文详细拆解了阿里巴巴 Qwen 团队发布的 Qwen2 系列模型技术细节。涵盖了从 
            <span className="font-bold text-indigo-600"> Dense </span>到
            <span className="font-bold text-indigo-600"> MoE </span>的架构创新、
            <span className="font-bold text-indigo-600"> 7T tokens </span>的数据工程以及
            <span className="font-bold text-indigo-600"> DPO </span>对齐策略。
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">
            <span className="px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm text-sm font-mono text-slate-500">
              arXiv:2407.10671
            </span>
            <span className="px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm text-sm font-mono text-slate-500">
              Model Scope & Hugging Face
            </span>
          </div>
        </header>

        {/* Section 1: Introduction */}
        <section id="intro" className="mb-20 scroll-mt-24">
          <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center">
            <span className="bg-indigo-100 text-indigo-600 rounded-lg p-2 mr-3">
              <Info size={24} />
            </span>
            1. 简介与模型家族
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <p className="mb-4 text-slate-600">
              Qwen2 是一个包含多种尺寸的语言模型系列，旨在覆盖从端侧设备到云端服务器的全场景需求。它基于 Transformer 架构，采用 Next-Token Prediction 进行训练。
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-indigo-600 font-bold text-lg">0.5B & 1.5B</div>
                <div className="text-sm text-slate-500">端侧模型</div>
                <p className="text-xs mt-2 text-slate-600">专为手机、耳机、智能眼镜等便携设备设计。</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-indigo-600 font-bold text-lg">7B</div>
                <div className="text-sm text-slate-500">黄金尺寸</div>
                <p className="text-xs mt-2 text-slate-600">适合消费级显卡运行，平衡了性能与成本。</p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200 ring-2 ring-indigo-100">
                <div className="text-indigo-700 font-bold text-lg">
                  72B <span className="text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full ml-1">Flagship</span>
                </div>
                <div className="text-sm text-indigo-500">旗舰模型</div>
                <p className="text-xs mt-2 text-slate-600">综合能力最强，在 MMLU 等榜单超越 Llama-3-70B。</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 col-span-1 md:col-span-2 lg:col-span-3">
                <div className="text-purple-700 font-bold text-lg">57B-A14B (MoE)</div>
                <div className="text-sm text-purple-500">混合专家模型</div>
                <p className="text-xs mt-2 text-slate-600">总参数 57B，但在推理时每次仅激活 14B 参数。既有大模型的知识容量，又有小模型的推理速度。</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Architecture */}
        <section id="architecture" className="mb-20 scroll-mt-24">
          <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center">
            <span className="bg-indigo-100 text-indigo-600 rounded-lg p-2 mr-3">
              <Brain size={24} />
            </span>
            2. 核心架构设计 (Dense Model)
          </h2>
          <div className="text-slate-600 space-y-6">
            <p>Qwen2 密集模型基于 Transformer 架构，但在关键组件上进行了优化以提升推理效率和稳定性。</p>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <strong className="text-slate-800">GQA (Grouped Query Attention)</strong>
                  <p className="text-sm mt-1">取代了传统的多头注意力 (MHA)。GQA 让多个 Query 头共享一组 Key-Value 头。这样显著减少了推理时的 <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">KV Cache</code> 显存占用，并提高了吞吐量。</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <strong className="text-slate-800">SwiGLU & RoPE</strong>
                  <p className="text-sm mt-1">沿用了高效的激活函数 SwiGLU 和旋转位置编码 (Rotary Positional Embeddings)。</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <strong className="text-slate-800">Tokenizer</strong>
                  <p className="text-sm mt-1">使用字节级 BPE，词表大小约为 <strong>152K</strong>。高压缩率设计使其对多语言支持更加友好。</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 3: MoE */}
        <section id="moe" className="mb-20 scroll-mt-24">
          <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center">
            <span className="bg-indigo-100 text-indigo-600 rounded-lg p-2 mr-3">
              <Network size={24} />
            </span>
            3. MoE 混合专家模型详解
          </h2>
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">细粒度专家与路由机制</h3>
            <p className="text-slate-600 mb-6">
              Qwen2-57B-A14B 采用了<strong>细粒度专家 (Fine-grained Experts)</strong> 设计。与传统的 MoE（如 Mixtral 8x7B）相比，Qwen2 拆分出更多的小专家（64个路由专家），并同时激活更多数量（8个）。这使得专家的组合更加灵活。
            </p>
            
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-6">
              <h4 className="font-bold text-slate-800 mb-2">路由公式 (Mathematical Formulation)</h4>
              <p className="text-sm text-slate-500 mb-4">
                每个 Token <InlineMath math="x" /> 被输入到门控网络 <InlineMath math="G" /> 中，计算分配给各个专家的概率 <InlineMath math="p" />：
              </p>
              
              <div className="overflow-x-auto mb-4 text-slate-800">
                <BlockMath math="p = \text{softmax}(G(x))" />
              </div>
              
              <p className="text-sm text-slate-500 mb-2">
                最终的输出 <InlineMath math="y" /> 是被选中的 Top-k 专家的加权和：
              </p>
              <div className="overflow-x-auto text-slate-800">
                <BlockMath math="y = \sum_{i \in \text{top}_k(p)} p_i E_i(x)" />
              </div>
              
              <div className="text-xs text-slate-400 mt-4 italic">
                其中 <InlineMath math="E_i(x)" /> 代表第 <InlineMath math="i" /> 个专家网络的输出，<InlineMath math="p_i" /> 是对应的门控权重。
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 mb-4">初始化策略：Upcycling (升级)</h3>
            <p className="text-slate-600">
              Qwen2 MoE 是从 7B 密集模型"升级"而来的。为了保证专家之间的差异性（Diversity），通过复制 FFN 层并对参数进行 <strong>Shuffle（打乱）</strong>，且对 <strong>50%</strong> 的参数进行了随机重初始化。
            </p>
          </div>
        </section>

        {/* Section 4: Long Context */}
        <section id="long-context" className="mb-20 scroll-mt-24">
          <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center">
            <span className="bg-indigo-100 text-indigo-600 rounded-lg p-2 mr-3">
              <Ruler size={24} />
            </span>
            4. 长文本机制：DCA 与 YARN
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100">
              <h3 className="text-xl font-bold text-blue-800 mb-2">DCA (Dual Chunk Attention)</h3>
              <p className="text-sm text-blue-600 font-semibold mb-4">解决"读了后面忘前面"的位置感问题</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                将长序列切分为块（Chunk）。当输入较短时，退化为原始 Attention。当输入超长时，DCA 通过捕捉<strong>块内 (Intra-chunk)</strong> 和 <strong>跨块 (Inter-chunk)</strong> 的相对位置信息，确保模型在长距离下依然能准确定位。
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-100">
              <h3 className="text-xl font-bold text-purple-800 mb-2">YARN</h3>
              <p className="text-sm text-purple-600 font-semibold mb-4">解决"没见过这么长"的外推问题</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                全称 <em>Yet Another RoPE extensioN</em>。通过对注意力权重进行<strong>重缩放 (Rescaling)</strong>，配合 RoPE 基频的调整（从 10k 提升至 1M），让模型能够处理比预训练长度更长的序列（外推至 128k tokens）。
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Pre-training */}
        <section id="pre-training" className="mb-20 scroll-mt-24">
          <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center">
            <span className="bg-indigo-100 text-indigo-600 rounded-lg p-2 mr-3">
              <BookOpen size={24} />
            </span>
            5. 预训练 (Pre-training)
          </h2>
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 z-0"></div>
            
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-slate-900 mb-4">数据工程：质量 &gt; 数量</h3>
              <p className="text-slate-600 mb-4">
                Qwen2 的训练数据量达到了 <strong>7 Trillion (7万亿)</strong> tokens。团队做了一个有趣的实验：他们尝试放宽过滤标准，构建了一个 12T 的数据集，但发现模型效果并未显著提升。因此，最终选择了质量更高的 7T 数据集。
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600">
                <li><strong>内容扩充：</strong> 显著增加了<span className="text-indigo-600 font-bold">代码</span>和<span className="text-indigo-600 font-bold">数学</span>数据，旨在提升模型的逻辑推理能力。</li>
                <li><strong>多语言：</strong> 覆盖约 30 种语言。</li>
                <li><strong>合成数据：</strong> 利用旧版 Qwen 模型过滤低质数据并合成高质量数据。</li>
              </ul>
              <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 text-sm">
                <strong>注意：</strong> 0.5B 小模型是一个特例，它使用了 12T 数据进行训练。这是为了通过"过度训练"榨干小参数模型的潜力。
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Post-training */}
        <section id="post-training" className="mb-20 scroll-mt-24">
          <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center">
            <span className="bg-indigo-100 text-indigo-600 rounded-lg p-2 mr-3">
              <GraduationCap size={24} />
            </span>
            6. 后训练：可扩展的自动化对齐
          </h2>
          
          <p className="text-slate-600 mb-8">
            Qwen2 摒弃了大规模人工标注，转而采用<strong>自动化合成数据</strong>进行 SFT 和 RLHF。这一过程被称为"Scalable Alignment"。
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="border border-slate-200 rounded-xl p-6 bg-white">
              <h3 className="font-bold text-slate-800 mb-4 border-b pb-2">数据合成策略 (Synthesis)</h3>
              <div className="space-y-4">
                <div>
                  <span className="font-bold text-indigo-600">拒绝采样 (Rejection Sampling)</span>
                  <p className="text-sm text-slate-500">针对数学题。让模型生成多条路径，保留答案正确的路径作为正样本。</p>
                </div>
                <div>
                  <span className="font-bold text-indigo-600">执行反馈 (Execution Feedback)</span>
                  <p className="text-sm text-slate-500">针对代码。让模型生成代码和测试用例。能跑通测试用例的代码被视为高质量数据。</p>
                </div>
                <div>
                  <span className="font-bold text-indigo-600">指令进化 (Instruction Evolution)</span>
                  <p className="text-sm text-slate-500">让模型自我增加约束条件，把简单的指令变得更复杂。</p>
                </div>
              </div>
            </div>
            
            <div className="border border-slate-200 rounded-xl p-6 bg-white">
              <h3 className="font-bold text-slate-800 mb-4 border-b pb-2">DPO (Direct Preference Optimization)</h3>
              <p className="text-slate-600 text-sm mb-4">
                相比于传统的 PPO，DPO 省去了独立的 Critic 模型和显式的 Reward 模型（在梯度更新时）。
              </p>
              <div className="bg-slate-50 p-4 rounded text-sm text-slate-700">
                <div className="mb-2 font-bold">DPO 损失函数原理：</div>
                <p className="mb-2">直接优化策略模型 <InlineMath math="\pi_{\theta}" />，使得：</p>
                <div className="my-3 text-center text-indigo-600 font-mono">
                  P(Win) &gt; P(Lose)
                </div>
                <p className="text-slate-500">无需训练价值网络，计算效率更高，显存占用更低。</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Evaluation */}
        <section id="evaluation" className="mb-24 scroll-mt-24">
          <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center">
            <span className="bg-indigo-100 text-indigo-600 rounded-lg p-2 mr-3">
              <BarChart3 size={24} />
            </span>
            7. 评估表现 (Key Benchmarks)
          </h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
              <thead>
                <tr className="bg-slate-50 text-slate-600 text-left text-sm uppercase tracking-wider">
                  <th className="py-3 px-6 font-semibold">Benchmark</th>
                  <th className="py-3 px-6 font-semibold">领域</th>
                  <th className="py-3 px-6 font-semibold text-indigo-600">Qwen2-72B</th>
                  <th className="py-3 px-6 font-semibold">Llama-3-70B</th>
                  <th className="py-3 px-6 font-semibold text-purple-600">Qwen2-72B-Instruct</th>
                </tr>
              </thead>
              <tbody className="text-slate-700 text-sm divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-6 font-medium">MMLU</td>
                  <td className="py-3 px-6">综合知识</td>
                  <td className="py-3 px-6 font-bold text-indigo-600">84.2</td>
                  <td className="py-3 px-6">79.5</td>
                  <td className="py-3 px-6 text-purple-600">82.3</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-6 font-medium">GSM8K</td>
                  <td className="py-3 px-6">小学数学</td>
                  <td className="py-3 px-6 font-bold text-indigo-600">89.5</td>
                  <td className="py-3 px-6">83.0</td>
                  <td className="py-3 px-6 text-purple-600">93.2</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-6 font-medium">HumanEval</td>
                  <td className="py-3 px-6">代码生成</td>
                  <td className="py-3 px-6 font-bold text-indigo-600">64.6</td>
                  <td className="py-3 px-6">48.2</td>
                  <td className="py-3 px-6 text-purple-600">86.0</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-6 font-medium">C-Eval</td>
                  <td className="py-3 px-6">中文综合</td>
                  <td className="py-3 px-6 font-bold text-indigo-600">91.0</td>
                  <td className="py-3 px-6">65.2</td>
                  <td className="py-3 px-6 text-purple-600">-</td>
                </tr>
                <tr className="hover:bg-slate-50 bg-purple-50/30">
                  <td className="py-3 px-6 font-medium">MT-Bench</td>
                  <td className="py-3 px-6">对话质量</td>
                  <td className="py-3 px-6 text-slate-400">-</td>
                  <td className="py-3 px-6">8.95</td>
                  <td className="py-3 px-6 font-bold text-purple-600">9.12</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 text-sm text-slate-500 bg-slate-50 p-4 rounded-lg">
            <strong>其他亮点：</strong> 在"大海捞针" (Needle in a Haystack) 测试中，Qwen2-72B 在 128k 长度范围内实现了近乎 100% 的准确率。且经过严格的污染分析（Contamination Analysis），证明这些分数并非来自训练集的数据泄露。
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-slate-400 text-sm py-8 border-t border-slate-200">
          <p>Based on Qwen2 Technical Report (arXiv:2407.10671) | Generated by AI Assistant</p>
        </footer>
      </main>
    </div>
  );
};

export default Qwen2;
