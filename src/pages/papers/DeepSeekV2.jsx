import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Info, Brain, Network, Cpu, BarChart2, Menu, Bolt, Zap, Code } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const DeepSeekV2 = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 150) {
          current = section.getAttribute('id');
        }
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
      setActiveSection(id);
      setIsMobileMenuOpen(false);
    }
  };

  const NavItem = ({ id, icon, label }) => (
    <button
      onClick={() => scrollToSection(id)}
      className={`w-full flex items-center px-4 py-3 text-sm font-medium transition-colors rounded-l-md ${
        activeSection === id
          ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      <span className="mr-3">{icon}</span>
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white shadow-sm p-4 sticky top-0 z-50 flex justify-between items-center">
        <div className="flex items-center gap-3">
            <Link to="/" className="text-slate-500 hover:text-slate-800">
                <ArrowLeft size={20} />
            </Link>
            <h1 className="text-lg font-bold text-blue-800">DeepSeek-V2 解析</h1>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600">
          <Menu size={24} />
        </button>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-slate-900/50" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-white p-4 shadow-xl" onClick={e => e.stopPropagation()}>
            <nav className="space-y-2 mt-14">
              <button onClick={() => scrollToSection('overview')} className="block w-full text-left py-2 text-slate-700 hover:text-blue-600">论文概览</button>
              <button onClick={() => scrollToSection('mla')} className="block w-full text-left py-2 text-slate-700 hover:text-blue-600">MLA 架构 (核心)</button>
              <button onClick={() => scrollToSection('moe')} className="block w-full text-left py-2 text-slate-700 hover:text-blue-600">DeepSeekMoE</button>
              <button onClick={() => scrollToSection('training')} className="block w-full text-left py-2 text-slate-700 hover:text-blue-600">训练与对齐 (GRPO)</button>
              <button onClick={() => scrollToSection('evaluation')} className="block w-full text-left py-2 text-slate-700 hover:text-blue-600">评估结果</button>
            </nav>
          </div>
        </div>
      )}

      <div className="flex min-h-screen">
        {/* Sidebar Navigation (Desktop) */}
        <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-slate-200 fixed h-full overflow-y-auto z-40">
          <div className="p-6 pb-0">
            <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors mb-6 text-sm">
               <ArrowLeft size={16} />
               <span>返回目录</span>
            </Link>
            <h1 className="text-2xl font-bold text-blue-900 mb-2">DeepSeek-V2</h1>
            <p className="text-xs text-slate-500 mb-8">论文深度解析与公式推导</p>
          </div>
          
          <nav className="flex-1 space-y-1 pl-4">
            <NavItem id="overview" icon={<Info size={18} />} label="论文概览" />
            <NavItem id="mla" icon={<Brain size={18} />} label="MLA 注意力机制" />
            <NavItem id="moe" icon={<Network size={18} />} label="DeepSeekMoE" />
            <NavItem id="training" icon={<Cpu size={18} />} label="训练与对齐 (GRPO)" />
            <NavItem id="evaluation" icon={<BarChart2 size={18} />} label="评估结果" />
          </nav>

          <div className="p-6 border-t border-slate-100 bg-slate-50">
            <div className="text-xs text-slate-400">
              <div className="font-semibold text-slate-500 mb-1">Paper Info</div>
              arXiv:2405.04434v5<br/>
              DeepSeek-AI
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-72 p-6 lg:p-12 max-w-5xl mx-auto w-full">
            
            {/* Overview Section */}
            <section id="overview" className="mb-20 scroll-mt-24">
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 shadow-sm">
                    <h2 className="text-3xl font-bold text-blue-900 mb-6">DeepSeek-V2: 强大、经济且高效的 MoE 语言模型</h2>
                    <p className="text-lg text-slate-700 leading-relaxed mb-6">
                        DeepSeek-V2 是一款拥有 236B 总参数（每个 token 激活 21B 参数）的混合专家（MoE）模型，支持 128K 上下文长度。相比 DeepSeek 67B，它节省了 42.5% 的训练成本，减少了 93.3% 的 KV Cache，并将最大生成吞吐量提升了 5.76 倍。
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-100">
                            <h4 className="font-bold text-blue-600 mb-2 flex items-center gap-2">
                                <Brain size={18}/> 核心创新点 1: MLA
                            </h4>
                            <p className="text-sm text-slate-600">Multi-Head Latent Attention (多头潜在注意力)。通过低秩键值联合压缩，显著减少推理时的 KV Cache 显存占用。</p>
                        </div>
                        <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-100">
                            <h4 className="font-bold text-blue-600 mb-2 flex items-center gap-2">
                                <Network size={18}/> 核心创新点 2: DeepSeekMoE
                            </h4>
                            <p className="text-sm text-slate-600">高性能 MoE 架构。采用细粒度专家分割和共享专家隔离策略，以更低的成本实现更强的性能。</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* MLA Section */}
            <section id="mla" className="mb-20 scroll-mt-24">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-200">1. Multi-Head Latent Attention (MLA)</h2>
                <p className="text-slate-700 mb-6 text-lg">
                    传统的多头注意力机制 (MHA) 在推理时需要缓存大量的 Key 和 Value (KV Cache)，这成为了长文本推理的瓶颈。MLA 旨在通过<strong>低秩压缩</strong>来解决这个问题，同时保持优于 MQA/GQA 的性能。
                </p>

                <div className="mb-10">
                    <h3 className="font-bold text-xl text-slate-800 mb-4">1.1 核心公式：低秩键值联合压缩 (Low-Rank KV Joint Compression)</h3>
                    <p className="text-slate-600 mb-4">
                        MLA 不直接存储全量的 <InlineMath math="k_t" /> 和 <InlineMath math="v_t" />，而是将它们压缩进一个低维的潜在向量 <InlineMath math="c_t^{KV}" /> 中。
                    </p>
                    <div className="bg-slate-50 rounded-xl p-6 border-l-4 border-blue-500 my-6 overflow-x-auto">
                        <p className="font-mono text-xs text-blue-500 mb-4 uppercase tracking-wider">公式 (9) - (11): KV 压缩与上投影</p>
                        <div className="space-y-4 text-slate-800">
                            <BlockMath math="c_{t}^{KV} = W^{DKV}h_{t}" />
                            <BlockMath math="k_{t}^{C} = W^{UK}c_{t}^{KV}" />
                            <BlockMath math="v_{t}^{C} = W^{UV}c_{t}^{KV}" />
                        </div>
                    </div>
                    <ul className="space-y-2 text-slate-700 mb-6 pl-4 border-l-2 border-slate-200 ml-2">
                        <li><strong className="text-slate-900">h_t</strong>: 输入的 hidden state。</li>
                        <li><strong className="text-slate-900">c_t^KV</strong>: 压缩后的 KV 潜在向量（这是推理时唯一需要缓存的部分，极小）。</li>
                        <li><strong className="text-slate-900">W^DKV</strong>: 下投影矩阵 (Down-projection)。</li>
                        <li><strong className="text-slate-900">W^UK, W^UV</strong>: 上投影矩阵，分别用于生成 Key 和 Value。</li>
                        <li className="pt-2 text-blue-700 bg-blue-50/50 p-2 rounded"><strong>优势：</strong> 推理时，我们将 <InlineMath math="W^{UK}" /> 吸收进 <InlineMath math="W^Q" />，将 <InlineMath math="W^{UV}" /> 吸收进 <InlineMath math="W^O" />，从而不需要计算出显式的 <InlineMath math="k" /> 和 <InlineMath math="v" />，只需缓存极小的 <InlineMath math="c_{t}^{KV}" />。</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-xl text-slate-800 mb-4">1.2 核心公式：解耦旋转位置编码 (Decoupled RoPE)</h3>
                    <p className="text-slate-600 mb-4">
                        直接对压缩后的 KV 应用 RoPE 会导致矩阵无法合并（不满足结合律），破坏推理加速。DeepSeek-V2 提出了“解耦 RoPE”策略，使用额外的、携带位置信息的 Query 和 Key。
                    </p>
                    
                    <div className="bg-slate-50 rounded-xl p-6 border-l-4 border-blue-500 my-6 overflow-x-auto">
                        <p className="font-mono text-xs text-blue-500 mb-4 uppercase tracking-wider">公式 (14) - (17): 分离 RoPE 计算</p>
                        <div className="space-y-4 text-slate-800">
                            <BlockMath math="q_{t,i} = [\mathbf{q}_{t,i}^{C}; \mathbf{q}_{t,i}^{R}] = [W^{UQ}c_t^Q ; \text{RoPE}(W^{QR}c_t^Q)]" />
                            <BlockMath math="k_{t,i} = [\mathbf{k}_{t,i}^{C}; \mathbf{k}_{t}^{R}] = [W^{UK}c_t^{KV} ; \text{RoPE}(W^{KR}h_t)]" />
                        </div>
                    </div>

                    <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
                        <h4 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
                             <Bolt size={18} /> 💡 解释
                        </h4>
                        <ul className="list-disc ml-4 text-slate-700 text-sm space-y-2">
                            <li><strong>Content 部分 (<InlineMath math="C" />):</strong> 承载内容信息，不加 RoPE，可以进行矩阵合并优化。</li>
                            <li><strong>RoPE 部分 (<InlineMath math="R" />):</strong> 专门承载位置信息，维度较小，单独计算并拼接。</li>
                            <li>最终的 Attention Score 计算结合了这两部分：</li>
                        </ul>
                        <div className="mt-4 pt-4 border-t border-amber-200/50">
                             <BlockMath math="o_{t,i} = \sum_{j=1}^{t} \text{Softmax}_j \left( \frac{q_{t,i}^T k_{j,i}}{\sqrt{d_h + d_h^R}} \right) v_{j,i}^C" />
                        </div>
                    </div>
                </div>
            </section>

            {/* DeepSeekMoE Section */}
            <section id="moe" className="mb-20 scroll-mt-24">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-200">2. DeepSeekMoE 架构</h2>
                <p className="text-slate-700 mb-6 text-lg">
                    为了以经济的成本训练强模型，DeepSeek-V2 沿用了 DeepSeekMoE (arXiv:2401.06066) 的设计，即“细粒度专家” + “共享专家”。
                </p>

                <div className="mb-10">
                    <h3 className="font-bold text-xl text-slate-800 mb-4">2.1 混合专家计算公式</h3>
                    <div className="bg-slate-50 rounded-xl p-6 border-l-4 border-blue-500 my-6 overflow-x-auto">
                        <p className="font-mono text-xs text-blue-500 mb-4 uppercase tracking-wider">公式 (20): FFN 输出</p>
                        <BlockMath math="h'_t = u_t + \underbrace{\sum_{i=1}^{N_s} \text{FFN}_i^{(s)}(u_t)}_{\text{共享专家}} + \underbrace{\sum_{i=1}^{N_r} g_{i,t} \text{FFN}_i^{(r)}(u_t)}_{\text{路由专家}}" />
                    </div>
                    <ul className="space-y-2 text-slate-700 mb-6 pl-4 border-l-2 border-slate-200 ml-2">
                        <li><InlineMath math="u_t" />: FFN 输入。</li>
                        <li><InlineMath math="N_s" />: 共享专家数量（总是被激活，捕获通用知识）。</li>
                        <li><InlineMath math="N_r" />: 路由专家数量（细粒度，选择性激活）。</li>
                        <li><InlineMath math="g_{i,t}" />: 路由门控值，仅对 Top-K 专家非零。</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-xl text-slate-800 mb-4">2.2 负载均衡损失函数 (Auxiliary Losses)</h3>
                    <p className="text-slate-600 mb-4">为了确保专家训练充分且分布式计算效率高，设计了三种辅助 Loss。</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                            <h4 className="font-bold text-blue-800 mb-2">1. 专家级平衡损失 (<InlineMath math="\mathcal{L}_{ExpBal}" />)</h4>
                            <div className="bg-slate-50 p-3 rounded mb-3 text-center">
                                <InlineMath math="\mathcal{L}_{ExpBal} = \alpha_1 \sum_{i=1}^{N_r} f_i P_i" />
                            </div>
                            <p className="text-xs text-slate-500">防止 Routing Collapse（即所有 token 都只选少数几个专家），确保专家被均匀选择。</p>
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                            <h4 className="font-bold text-blue-800 mb-2">2. 设备级平衡损失 (<InlineMath math="\mathcal{L}_{DevBal}" />)</h4>
                            <div className="bg-slate-50 p-3 rounded mb-3 text-center">
                                 <InlineMath math="\mathcal{L}_{DevBal} = \alpha_2 \sum_{i=1}^{D} f'_i P'_i" />
                            </div>
                            <p className="text-xs text-slate-500">确保不同 GPU 设备上的计算负载均衡。</p>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                         <h4 className="font-bold text-blue-800 mb-2">3. 通信平衡损失 (<InlineMath math="\mathcal{L}_{CommBal}" />)</h4>
                         <div className="bg-slate-50 p-3 rounded mb-3 text-center">
                            <InlineMath math="\mathcal{L}_{CommBal} = \alpha_3 \sum_{i=1}^{D} f''_i P''_i" />
                         </div>
                         <p className="text-sm text-slate-600">
                             除了计算均衡，还要保证跨设备通信量均衡。DeepSeek-V2 还采用了 <strong>Device-Limited Routing</strong>，限制每个 token 最多只能发送到 <InlineMath math="M" /> 个设备，减少通信开销。
                         </p>
                    </div>
                </div>
            </section>

            {/* Training & Alignment Section */}
            <section id="training" className="mb-20 scroll-mt-24">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-200">3. 训练与对齐 (GRPO)</h2>
                
                <div className="mb-8">
                    <h3 className="font-bold text-xl text-slate-800 mb-4">3.1 预训练设置</h3>
                    <ul className="space-y-2 text-slate-700 ml-2">
                        <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></div><span><strong>数据量:</strong> 8.1T Tokens (高质量多源语料，更多中文数据)。</span></li>
                        <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></div><span><strong>上下文扩展:</strong> 使用 YaRN 将窗口从 4K 扩展到 128K。</span></li>
                        <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></div><span><strong>Tokenizer:</strong> 词表大小 100K (BBPE)。</span></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-xl text-slate-800 mb-4">3.2 强化学习：Group Relative Policy Optimization (GRPO)</h3>
                    <p className="text-slate-700 mb-6">
                        为了节省 RL 训练成本（避免训练一个与 Policy 模型同等大小的 Critic 模型），DeepSeek-V2 采用了 GRPO 算法。它不依赖 Critic 模型来估计价值，而是通过一组采样的输出的相对得分来计算优势。
                    </p>

                    <div className="bg-slate-50 rounded-xl p-6 border-l-4 border-blue-500 my-6 overflow-x-auto">
                        <p className="font-mono text-xs text-blue-500 mb-4 uppercase tracking-wider">公式 (32) & (34): GRPO 目标函数</p>
                        
                        <div className="mb-6">
                            <p className="mb-2 font-bold text-slate-700 text-sm">优势函数 (Advantage):</p>
                            <BlockMath math="A_i = \frac{r_i - \text{mean}(\{r_1, ..., r_G\})}{\text{std}(\{r_1, ..., r_G\})}" />
                            <p className="text-xs text-slate-500 mt-2 text-center">即：当前样本得分相对于该组样本平均分的标准化差异。</p>
                        </div>
                        
                        <div>
                            <p className="mb-2 font-bold text-slate-700 text-sm">目标函数:</p>
                            <BlockMath math="\mathcal{J}_{GRPO}(\theta) = \mathbb{E} \left[ \frac{1}{G} \sum_{i=1}^{G} \left( \min \left( \frac{\pi_\theta(o_i|q)}{\pi_{old}(o_i|q)} A_i, \text{clip}(...) A_i \right) - \beta D_{KL} \right) \right]" />
                        </div>
                    </div>

                    <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                        <h4 className="font-bold text-emerald-800 mb-2 flex items-center gap-2">
                            <Zap size={18} /> 为什么使用 GRPO?
                        </h4>
                        <p className="text-sm text-emerald-900/80">
                            传统的 PPO 需要一个巨大的 Value Model (Critic)。GRPO 通过对同一个问题采样一组输出 (<InlineMath math="G" /> 个)，利用组内的相对好坏来估算 Baseline，从而省去了 Critic 模型，大幅降低了 RLHF 的显存和计算资源消耗。
                        </p>
                    </div>
                </div>
            </section>

            {/* Evaluation Section */}
            <section id="evaluation" className="mb-20 scroll-mt-24">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-200">4. 评估结果</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Chart Placeholder */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="font-bold text-slate-800 mb-4">性能 vs 激活参数量</h3>
                        <div className="relative h-48 bg-slate-50 rounded flex flex-col items-center justify-center border border-dashed border-slate-300">
                            <BarChart2 className="text-slate-300 mb-2" size={40} />
                            <p className="text-sm text-slate-500 font-medium">MMLU 性能对比示意</p>
                            <p className="text-xs text-slate-400 mt-1 px-6 text-center">DeepSeek-V2 (21B 激活) 性能超过 Mixtral 8x22B</p>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="space-y-4">
                        <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-slate-200">
                            <div className="bg-blue-100 p-3 rounded-full text-blue-600 mr-4">
                                <Bolt size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">生成吞吐量</p>
                                <p className="text-xl font-bold text-slate-800">提升 5.76 倍</p>
                                <p className="text-xs text-slate-400">对比 DeepSeek 67B</p>
                            </div>
                        </div>
                        <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-slate-200">
                            <div className="bg-green-100 p-3 rounded-full text-green-600 mr-4">
                                <Cpu size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">KV Cache 显存占用</p>
                                <p className="text-xl font-bold text-slate-800">降低 93.3%</p>
                                <p className="text-xs text-slate-400">得益于 MLA 架构</p>
                            </div>
                        </div>
                        <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-slate-200">
                            <div className="bg-purple-100 p-3 rounded-full text-purple-600 mr-4">
                                <Code size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">编程与数学能力</p>
                                <p className="text-xl font-bold text-slate-800">Top-Tier</p>
                                <p className="text-xs text-slate-400">GSM8K, MATH, HumanEval 表现优异</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
                    <table className="min-w-full text-left">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">模型</th>
                                <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">总参数</th>
                                <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">激活参数</th>
                                <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">MMLU</th>
                                <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">GSM8K</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr className="bg-blue-50/30">
                                <td className="py-3 px-4 text-sm font-bold text-blue-900">DeepSeek-V2</td>
                                <td className="py-3 px-4 text-sm text-slate-600">236B</td>
                                <td className="py-3 px-4 text-sm text-slate-600">21B</td>
                                <td className="py-3 px-4 text-sm font-bold text-blue-600">78.5</td>
                                <td className="py-3 px-4 text-sm font-bold text-blue-600">79.2</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 text-sm text-slate-700">Mixtral 8x22B</td>
                                <td className="py-3 px-4 text-sm text-slate-500">141B</td>
                                <td className="py-3 px-4 text-sm text-slate-500">39B</td>
                                <td className="py-3 px-4 text-sm text-slate-500">77.6</td>
                                <td className="py-3 px-4 text-sm text-slate-500">77.8</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 text-sm text-slate-700">LLaMA 3 70B</td>
                                <td className="py-3 px-4 text-sm text-slate-500">70B</td>
                                <td className="py-3 px-4 text-sm text-slate-500">70B</td>
                                <td className="py-3 px-4 text-sm text-slate-500">78.9</td>
                                <td className="py-3 px-4 text-sm text-slate-500">83.0</td>
                            </tr>
                             <tr>
                                <td className="py-3 px-4 text-sm text-slate-700">Qwen1.5 72B</td>
                                <td className="py-3 px-4 text-sm text-slate-500">72B</td>
                                <td className="py-3 px-4 text-sm text-slate-500">72B</td>
                                <td className="py-3 px-4 text-sm text-slate-500">77.2</td>
                                <td className="py-3 px-4 text-sm text-slate-500">77.9</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
      </div>
    </div>
  );
};

export default DeepSeekV2;




















