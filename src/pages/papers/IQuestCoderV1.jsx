import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Cpu, 
  GitBranch, 
  Calculator, 
  BarChart2, 
  ArrowRight, 
  Layers, 
  Zap, 
  Code, 
  Brain,
  Menu,
  X,
  ArrowLeft
} from 'lucide-react';

// --- Components ---
const Section = ({ id, title, icon: Icon, children, className = "" }) => (
  <section id={id} className={`py-16 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-20 ${className}`}>
    <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-4">
      <div className="p-2 bg-blue-600 rounded-lg text-white">
        <Icon size={24} />
      </div>
      <h2 className="text-3xl font-bold text-slate-800 tracking-tight">{title}</h2>
    </div>
    {children}
  </section>
);

const Card = ({ title, children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-300 overflow-hidden ${className}`}>
    {title && (
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
        <h3 className="font-semibold text-slate-700 text-lg">{title}</h3>
      </div>
    )}
    <div className="p-6">
      {children}
    </div>
  </div>
);

const MathFormula = ({ label, formula, explanation, variables }) => (
  <div className="my-8 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
    <div className="bg-slate-800 text-white px-4 py-2 text-sm font-mono flex justify-between items-center">
      <span>{label}</span>
      <span className="text-slate-400 text-xs">Scaling Law Model</span>
    </div>
    <div className="p-8 text-center overflow-x-auto bg-white border-b border-slate-100">
      <div className="text-2xl md:text-3xl font-serif text-slate-800 tracking-wide" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
        {formula}
      </div>
    </div>
    <div className="p-6">
      <p className="text-slate-600 mb-4 font-medium leading-relaxed">{explanation}</p>
      {variables && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          {variables.map((v, idx) => (
            <div key={idx} className="flex items-baseline gap-2">
              <span className="font-mono font-bold text-blue-700 whitespace-nowrap">{v.symbol}</span>
              <span className="text-slate-500">:</span>
              <span className="text-slate-700">{v.desc}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

const Navbar = ({ activeSection, scrollToSection, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const navItems = [
    { id: 'overview', label: '核心概览' },
    { id: 'pipeline', label: '训练流程' },
    { id: 'formulas', label: '核心公式' },
    { id: 'compute-optimal', label: '配比推导' },
    { id: 'architecture', label: '模型架构' },
    { id: 'evaluation', label: '实验结果' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors">
            <ArrowLeft size={20} />
            <span className="hidden sm:inline">返回首页</span>
          </Link>
          <div className="flex items-center gap-2 font-bold text-xl text-slate-800">
            <div className="bg-blue-600 text-white p-1.5 rounded">IQ</div>
            <span>IQuest-Coder-V1</span>
          </div>
        </div>
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeSection === item.id 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-slate-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-2 shadow-lg absolute w-full">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="block w-full text-left px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 font-medium"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

// --- Main Content ---
export default function IQuestCoderV1() {
  const [activeSection, setActiveSection] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Navbar 
        activeSection={activeSection} 
        scrollToSection={scrollToSection}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Hero Header */}
      <header className="pt-32 pb-20 px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-200 text-sm font-medium mb-6">
            Technical Report Analysis
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            IQuest-Coder-V1 <br/>
            <span className="text-blue-400">代码智能的新进化</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            超越静态代码表示，提出 Code-Flow 多阶段训练范式。
            <br className="hidden md:block"/>
            全系覆盖 7B / 14B / 40B 及 Loop 循环架构版本。
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <Cpu size={18} className="text-blue-300" />
              <span>40B Loop Architecture</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <GitBranch size={18} className="text-green-300" />
              <span>Code-Flow Pipeline</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <Brain size={18} className="text-purple-300" />
              <span>Thinking & Instruct Paths</span>
            </div>
          </div>
        </div>
      </header>

      {/* Overview Section */}
      <Section id="overview" title="核心概览与贡献" icon={BookOpen}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="prose prose-slate lg:prose-lg text-slate-600">
            <p>
              IQuest-Coder-V1 系列是一组全新的代码大型语言模型（LLMs），旨在弥合开源模型与顶尖闭源模型（如 Claude 3.5 Sonnet）之间的差距。
            </p>
            <p>
              为了解决现有模型在长程推理和复杂多文件代码库导航中的不足，团队提出了 <strong>Code-Flow（代码流）</strong> 多阶段训练范式，通过进化的视角捕捉软件逻辑的动态演变。
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Zap size={20} /> 模型家族矩阵
            </h4>
            <ul className="space-y-3">
              {[
                { name: "IQuest-Coder-V1-7B", desc: "高效边缘端部署，基础代码能力" },
                { name: "IQuest-Coder-V1-14B", desc: "性能与资源的平衡选择" },
                { name: "IQuest-Coder-V1-40B", desc: "旗舰模型，SOTA 级代码智能表现" },
                { name: "IQuest-Coder-V1-40B-Loop", desc: "循环架构变体，优化推理时的显存占用与容量权衡" }
              ].map((model, i) => (
                <li key={i} className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm">
                  <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800">{model.name}</span>
                    <p className="text-sm text-slate-500">{model.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-6 text-slate-800">技术报告三大核心发现 (Findings)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              id: 1,
              title: "动态优于静态",
              text: "代码仓库的演变数据（Commit Flow）相比于仅使用静态的快照文件，能为任务规划提供更优质的信号。"
            },
            {
              id: 2,
              title: "逻辑支架作用",
              text: "在高质量代码退火之后、后训练之前，注入 32k 长度的推理和 Agent 轨迹数据，能作为关键的逻辑支架，稳定模型在分布偏移下的表现。"
            },
            {
              id: 3,
              title: "思考路径的涌现",
              text: "Thinking Path (RL) 激发了长程任务（如 SWE）中的自主错误恢复能力，这是标准指令微调路径中所缺失的。"
            }
          ].map((f) => (
            <Card key={f.id} className="border-t-4 border-t-blue-500">
              <div className="text-blue-600 font-bold mb-2">Finding {f.id}</div>
              <h4 className="font-bold text-slate-800 mb-2">{f.title}</h4>
              <p className="text-sm text-slate-600">{f.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Pipeline Section */}
      <Section id="pipeline" title="Code-Flow 训练全流程" icon={GitBranch} className="bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-8 top-8 bottom-8 w-1 bg-slate-100 hidden md:block"></div>
            <div className="space-y-12">
              {/* Stage 1 */}
              <div className="relative md:pl-24">
                <div className="hidden md:flex absolute left-0 top-0 w-16 h-16 bg-blue-100 text-blue-600 rounded-full items-center justify-center font-bold z-10 border-4 border-white shadow-sm">
                  01
                </div>
                <Card title="Stage 1: Pre-training & Annealing (预训练与退火)">
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1 bg-slate-50 p-4 rounded-lg">
                        <h5 className="font-bold text-slate-700 mb-2">通用与代码混合预训练</h5>
                        <p className="text-sm text-slate-600">使用海量通用数据与代码数据构建基础表征。</p>
                      </div>
                      <div className="flex items-center justify-center text-slate-300">
                        <ArrowRight size={20} />
                      </div>
                      <div className="flex-1 bg-green-50 p-4 rounded-lg border border-green-100">
                        <h5 className="font-bold text-green-800 mb-2">高质量代码退火</h5>
                        <p className="text-sm text-green-700">在特定筛选的高质量代码语料上进行 Annealing，为后续逻辑任务做准备。</p>
                      </div>
                    </div>
                    <div className="text-sm text-slate-500 pt-2 border-t border-slate-100 mt-4">
                      <strong>关键技术：</strong> 数据清洗、去重、AST 解析校验、FIM (Fill-In-the-Middle) 训练。
                    </div>
                  </div>
                </Card>
              </div>

              {/* Stage 2 */}
              <div className="relative md:pl-24">
                <div className="hidden md:flex absolute left-0 top-0 w-16 h-16 bg-purple-100 text-purple-600 rounded-full items-center justify-center font-bold z-10 border-4 border-white shadow-sm">
                  02
                </div>
                <Card title="Stage 2: Mid-Training (中阶段训练)">
                  <p className="text-slate-600 mb-4">
                    连接静态知识与 Agent 行动的桥梁。分为两个关键子阶段：
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-purple-100 bg-purple-50/50 rounded-lg">
                      <div className="font-bold text-purple-700 mb-1">Phase 1: 32k Context</div>
                      <p className="text-xs text-slate-600">聚焦推理 (Reasoning) 与 Agent 轨迹数据。</p>
                    </div>
                    <div className="p-4 border border-purple-100 bg-purple-50/50 rounded-lg">
                      <div className="font-bold text-purple-700 mb-1">Phase 2: 128k Context</div>
                      <p className="text-xs text-slate-600">扩展至仓库级 (Repo-scale) 规模，注入长上下文逻辑。</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Stage 3 */}
              <div className="relative md:pl-24">
                <div className="hidden md:flex absolute left-0 top-0 w-16 h-16 bg-orange-100 text-orange-600 rounded-full items-center justify-center font-bold z-10 border-4 border-white shadow-sm">
                  03
                </div>
                <Card title="Stage 3: Post-Training (双路径后训练)">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-indigo-50 to-white p-5 rounded-lg border border-indigo-100">
                      <div className="flex items-center gap-2 mb-3">
                        <Brain className="text-indigo-600" size={20} />
                        <h4 className="font-bold text-indigo-900">Thinking Path (思考路径)</h4>
                      </div>
                      <ul className="text-sm space-y-2 text-indigo-800">
                        <li>• <strong>SFT:</strong> 包含显式思维链 (Thinking Data)</li>
                        <li>• <strong>RL:</strong> 推理驱动的强化学习 (Reasoning-driven RL)</li>
                        <li>• <strong>目标:</strong> 复杂的长程推理、错误自我修正</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-to-br from-teal-50 to-white p-5 rounded-lg border border-teal-100">
                      <div className="flex items-center gap-2 mb-3">
                        <Code className="text-teal-600" size={20} />
                        <h4 className="font-bold text-teal-900">Instruct Path (指令路径)</h4>
                      </div>
                      <ul className="text-sm space-y-2 text-teal-800">
                        <li>• <strong>SFT:</strong> 通用与代码指令微调</li>
                        <li>• <strong>RL:</strong> 指令遵循优化 (Instruction RL)</li>
                        <li>• <strong>目标:</strong> 通用编程助手、日常问答</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Formulas Section - CRITICAL */}
      <Section id="formulas" title="核心公式详解：多语言 Scaling Law" icon={Calculator}>
        <div className="mb-8 p-6 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded-r-lg">
          <p>
            为了在有限的 Token 预算下优化多语言代码训练，IQuest 团队提出了包含语言占比显式参数的 Scaling Law。
            这一公式打破了将所有编程语言视为同质数据的传统假设。
          </p>
        </div>

        {/* Formula 1 */}
        <MathFormula 
          label="Equation (1): Multilingual Scaling Law"
          formula={
            <>
              <span className="italic font-serif">L</span>(
              <span className="italic font-serif">N</span>, 
              <span className="italic font-serif">D</span>; 
              <span className="italic font-serif font-bold">p</span>) 
              {' = '} 
              <span className="italic font-serif">A</span> · 
              <span className="italic font-serif">N</span>
              <sup className="text-base">-α<sub className="text-xs ml-0.5">N</sub>(p)</sup> 
              {' + '} 
              <span className="italic font-serif">B</span> · 
              <span className="italic font-serif">D</span>
              <sub className="text-base align-sub mr-1">x</sub>
              <sup className="text-base">-α<sub className="text-xs ml-0.5">D</sub>(p)</sup> 
              {' + '} 
              <span className="italic font-serif">L</span>
              <sub className="text-base">∞</sub>(
              <span className="italic font-serif font-bold">p</span>)
            </>
          }
          explanation="这是扩展后的 Scaling Law 公式，它不再仅仅依赖于参数量 N 和数据量 D，而是明确引入了语言分布向量 p。这意味着不同编程语言的混合比例会直接影响模型的 Loss 收敛特性。"
          variables={[
            { symbol: "L(...)", desc: "模型的 Loss (损失值)" },
            { symbol: "N", desc: "模型参数量 (Model Parameters)" },
            { symbol: "D", desc: "训练数据量 (Data Size)" },
            { symbol: "p", desc: "语言分布向量 (p1, ..., pK)，表示各语言占比" },
            { symbol: "Dx", desc: "有效数据项 (Effective Data Term)，见公式 (2)" },
            { symbol: "αN(p), αD(p)", desc: "加权平均后的参数与数据指数衰减率" }
          ]}
        />

        {/* Formula 2 */}
        <MathFormula 
          label="Equation (2): Effective Data with Cross-Lingual Transfer"
          formula={
            <>
              <span className="italic font-serif">D</span>
              <sub className="text-base">x</sub> 
              {' = '}
              <span className="italic font-serif">D</span>
              <sub className="text-base">all</sub>
              {' ('} 1 + γ 
              <span className="mx-2 text-2xl inline-block align-middle">∑</span>
              <sub className="text-xs relative -top-3 right-4 italic">Li ≠ Lj</sub>
              <span className="italic font-serif">p</span>
              <sub className="text-xs">Li</sub>
              <span className="italic font-serif">p</span>
              <sub className="text-xs">Lj</sub>
              <span className="italic font-serif">τ</span>
              <sub className="text-xs">ij</sub>
              {' )'}
            </>
          }
          explanation="此公式定义了「有效数据量」。在多语言训练中，不仅本语言的数据有贡献，其他语言的数据也能通过「跨语言迁移」带来收益。例如，训练 Python 可能辅助 Java 的理解。"
          variables={[
            { symbol: "Dall", desc: "总数据量" },
            { symbol: "γ (gamma)", desc: "调节系数" },
            { symbol: "τij (tau)", desc: "语言 i 到语言 j 的迁移系数 (Transfer Coefficient)" },
            { symbol: "pLi, pLj", desc: "语言 i 和 j 的混合比例" },
            { symbol: "意义", desc: "量化了语言多样性带来的数据增广效应" }
          ]}
        />

        {/* Formula 3 */}
        <MathFormula 
          label="Equation (3): Final Optimized Scaling Law"
          formula={
            <>
              <span className="italic font-serif">L</span>
              <sup className="text-base">*</sup>(
              <span className="italic font-serif">N</span>, 
              <span className="italic font-serif">D</span>) 
              {' = '}
              <span className="italic font-serif">A</span>
              <sup className="text-base">*</sup> · 
              <span className="italic font-serif">N</span>
              <sup className="text-base">-α<sub className="text-xs ml-0.5">N</sub>*</sup> 
              {' + '} 
              <span className="italic font-serif">B</span>
              <sup className="text-base">*</sup> · 
              <span className="italic font-serif">D</span>
              <sup className="text-base">-α<sub className="text-xs ml-0.5">D</sub>*</sup> 
              {' + '} 
              <span className="italic font-serif">L</span>
              <sub className="text-base">∞</sub>
              <sup className="text-base">*</sup>
            </>
          }
          explanation="在最优的多语言分配策略下拟合出的最终 Scaling Law。通过实验，团队得出了特定的参数值 (α*D ≈ 0.6859, α*N ≈ 0.2186)，指导了后续模型规模与数据量的配比。"
          variables={[
            { symbol: "α*D", desc: "拟合后的数据指数，约为 0.6859" },
            { symbol: "α*N", desc: "拟合后的参数指数，约为 0.2186" },
            { symbol: "L*∞", desc: "不可约减损失 (Irreducible Loss)，约为 0.2025" }
          ]}
        />
      </Section>

      {/* Compute-Optimal Section - NEW */}
      <Section id="compute-optimal" title="Compute-Optimal 配比推导" icon={Calculator} className="bg-white">
        <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
          <h3 className="font-bold text-blue-900 mb-3 text-lg">核心问题：给定固定计算预算 C，如何分配模型参数 N 和数据量 D？</h3>
          <p className="text-blue-800">
            在实际训练中，计算资源（FLOPs）是有限的。Compute-Optimal 训练的目标是：在固定计算预算下，找到 N 和 D 的最优配比，使模型 Loss 最小。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Step 1 */}
          <Card title="Step 1: 计算约束条件" className="border-t-4 border-t-blue-500">
            <div className="space-y-4">
              <p className="text-slate-600">
                训练一个 Transformer 模型的计算量（FLOPs）近似为：
              </p>
              <div className="bg-slate-100 p-4 rounded-lg text-center font-mono text-lg">
                <span className="text-blue-700 font-bold">C ≈ 6 × N × D</span>
              </div>
              <div className="text-sm text-slate-500 space-y-1">
                <p>• <strong>C</strong>: 总计算量 (FLOPs)</p>
                <p>• <strong>N</strong>: 模型参数量</p>
                <p>• <strong>D</strong>: 训练数据量 (Tokens)</p>
                <p>• <strong>6</strong>: 每个参数每个 Token 的计算开销系数</p>
              </div>
            </div>
          </Card>

          {/* Step 2 */}
          <Card title="Step 2: 最小化 Loss 的优化问题" className="border-t-4 border-t-purple-500">
            <div className="space-y-4">
              <p className="text-slate-600">
                使用拉格朗日乘数法求解约束优化问题：
              </p>
              <div className="bg-slate-100 p-4 rounded-lg space-y-2 font-mono text-sm">
                <div className="text-purple-700">min L*(N, D) = A*·N<sup>-α*N</sup> + B*·D<sup>-α*D</sup></div>
                <div className="text-slate-500">subject to: C = 6ND</div>
              </div>
              <p className="text-sm text-slate-500">
                对 N 和 D 分别求偏导并令其为零，得到最优配比关系。
              </p>
            </div>
          </Card>
        </div>

        {/* Key Derivation */}
        <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white p-8 rounded-xl mb-8">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Calculator size={24} /> 核心推导结果
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div className="text-sm text-blue-200 mb-2">最优参数量缩放</div>
              <div className="text-2xl font-mono font-bold mb-3">
                N* ∝ C<sup className="text-lg">a</sup>
              </div>
              <div className="text-sm text-slate-300">
                其中 <span className="font-mono bg-blue-500/30 px-2 py-0.5 rounded">a = α*D / (α*N + α*D)</span>
              </div>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div className="text-sm text-purple-200 mb-2">最优数据量缩放</div>
              <div className="text-2xl font-mono font-bold mb-3">
                D* ∝ C<sup className="text-lg">b</sup>
              </div>
              <div className="text-sm text-slate-300">
                其中 <span className="font-mono bg-purple-500/30 px-2 py-0.5 rounded">b = α*N / (α*N + α*D)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Numerical Calculation */}
        <Card title="Step 3: 代入 IQuest 实验拟合参数" className="border-t-4 border-t-green-500">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-lg text-center">
                <div className="text-sm text-slate-500 mb-1">α*D</div>
                <div className="text-2xl font-mono font-bold text-blue-600">0.6859</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg text-center">
                <div className="text-sm text-slate-500 mb-1">α*N</div>
                <div className="text-2xl font-mono font-bold text-purple-600">0.2186</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg text-center">
                <div className="text-sm text-slate-500 mb-1">α*D + α*N</div>
                <div className="text-2xl font-mono font-bold text-slate-700">0.9045</div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <h4 className="font-bold text-slate-800 mb-4">计算最优缩放指数：</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
                  <div className="font-mono text-sm text-blue-600 mb-2">
                    a = 0.6859 / 0.9045
                  </div>
                  <div className="text-3xl font-bold text-blue-700">a ≈ 0.758</div>
                  <p className="text-sm text-blue-600 mt-2">参数量应随计算预算的 0.758 次方增长</p>
                </div>
                <div className="bg-purple-50 p-5 rounded-lg border border-purple-200">
                  <div className="font-mono text-sm text-purple-600 mb-2">
                    b = 0.2186 / 0.9045
                  </div>
                  <div className="text-3xl font-bold text-purple-700">b ≈ 0.242</div>
                  <p className="text-sm text-purple-600 mt-2">数据量应随计算预算的 0.242 次方增长</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Practical Example */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h4 className="font-bold text-yellow-800 mb-4 flex items-center gap-2">
            <Zap size={20} /> 实际应用示例
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-yellow-100 text-yellow-800">
                <tr>
                  <th className="px-4 py-2 text-left">计算预算变化</th>
                  <th className="px-4 py-2 text-left">参数量 N 变化</th>
                  <th className="px-4 py-2 text-left">数据量 D 变化</th>
                  <th className="px-4 py-2 text-left">实际意义</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-yellow-200">
                <tr className="bg-white">
                  <td className="px-4 py-3 font-mono">C → 10C</td>
                  <td className="px-4 py-3 font-mono text-blue-600">N → 10<sup>0.758</sup> ≈ 5.7N</td>
                  <td className="px-4 py-3 font-mono text-purple-600">D → 10<sup>0.242</sup> ≈ 1.75D</td>
                  <td className="px-4 py-3 text-slate-600">预算增 10 倍，参数增 5.7 倍，数据增 1.75 倍</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-mono">C → 100C</td>
                  <td className="px-4 py-3 font-mono text-blue-600">N → 100<sup>0.758</sup> ≈ 33N</td>
                  <td className="px-4 py-3 font-mono text-purple-600">D → 100<sup>0.242</sup> ≈ 3D</td>
                  <td className="px-4 py-3 text-slate-600">预算增 100 倍，参数增 33 倍，数据仅增 3 倍</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Insight */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
          <h4 className="font-bold text-green-800 mb-4">💡 关键洞察：代码领域应更侧重增加模型参数</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-semibold text-green-700 mb-2">IQuest 发现 (代码领域)</h5>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• a ≈ 0.758 (参数缩放指数)</li>
                <li>• b ≈ 0.242 (数据缩放指数)</li>
                <li>• <strong>比例 a:b ≈ 3:1</strong></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-slate-700 mb-2">Chinchilla 发现 (通用领域)</h5>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• a ≈ 0.5 (参数缩放指数)</li>
                <li>• b ≈ 0.5 (数据缩放指数)</li>
                <li>• <strong>比例 a:b ≈ 1:1</strong></li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-sm text-green-800 bg-green-100 p-3 rounded-lg">
            <strong>结论：</strong>在代码智能任务中，相比于收集更多数据，增加模型参数带来的收益更高（约 3 倍）。这可能是因为代码的逻辑结构需要更深的模型容量来捕捉，而代码数据的多样性相对有限。
          </p>
        </div>
      </Section>

      {/* Architecture Section */}
      <Section id="architecture" title="架构创新：LoopCoder" icon={Layers} className="bg-white">
        <div className="mb-8 p-6 bg-indigo-50 border border-indigo-200 rounded-xl">
          <p className="text-indigo-800">
            <strong>LoopCoder</strong> 是 IQuest-Coder-V1-40B-Loop 的核心架构创新。通过循环执行共享参数的 Transformer 块，
            在保持模型容量的同时显著降低部署成本，优化推理时的显存占用与容量权衡。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-800">双迭代循环机制</h3>
            
            <div className="grid gap-4">
              <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                  <h4 className="font-bold text-blue-900">Iteration 1: Position-Shifted Processing</h4>
                </div>
                <ul className="text-sm text-blue-800 space-y-2 ml-10">
                  <li>• 输入 Embedding 通过共享的 Transformer 层</li>
                  <li>• 生成 <strong>position-shifted hidden states</strong></li>
                  <li>• 缓存所有 Key-Value 对供第二次迭代使用</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 p-5 rounded-lg border border-purple-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <h4 className="font-bold text-purple-900">Iteration 2: Dual Attention Fusion</h4>
                </div>
                <ul className="text-sm text-purple-800 space-y-2 ml-10">
                  <li>• <strong>Global Attention</strong>: Query 关注 Iter 1 的全部 KV 对（全局上下文精炼）</li>
                  <li>• <strong>Local Attention</strong>: Query 仅关注 Iter 2 的前序 Token（保持因果性）</li>
                  <li>• 通过 <strong>Learned Gating</strong> 动态融合两种注意力输出</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full bg-slate-900 text-slate-300 p-6 rounded-xl font-mono text-sm shadow-xl">
            <div className="flex justify-between border-b border-slate-700 pb-2 mb-4">
              <span>LoopCoder Architecture</span>
              <span className="text-green-400">Active</span>
            </div>
            <div className="space-y-4">
              <div className="p-3 border border-slate-700 rounded bg-slate-800/50">
                <div className="text-xs text-slate-500 mb-1">Input Sequence</div>
                <div className="h-2 w-3/4 bg-slate-600 rounded animate-pulse"></div>
              </div>
              
              <div className="flex justify-center text-slate-500">↓</div>
              
              <div className="border-2 border-dashed border-blue-500/50 p-4 rounded relative">
                <div className="absolute -top-3 left-4 bg-slate-900 px-2 text-blue-400 text-xs">Shared Transformer Blocks</div>
                
                <div className="flex gap-2 mb-2">
                  <div className="flex-1 h-8 bg-blue-900/40 border border-blue-700 rounded flex items-center justify-center text-xs">Iter 1</div>
                  <div className="flex-1 h-8 bg-purple-900/40 border border-purple-700 rounded flex items-center justify-center text-xs">Iter 2</div>
                </div>
                <div className="text-xs text-center text-slate-400">Global + Local Attn Gate</div>
              </div>
              
              <div className="flex justify-center text-slate-500">↓</div>
              
              <div className="p-3 border border-slate-700 rounded bg-slate-800/50">
                <div className="text-xs text-slate-500 mb-1">Output Logits</div>
                <div className="h-2 w-full bg-green-900/50 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Gating Mechanism Detail */}
        <Card title="门控机制 (Learned Gating) 详解" className="border-t-4 border-t-orange-500 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-slate-800 mb-3">门控公式</h4>
              <div className="bg-slate-100 p-4 rounded-lg font-mono text-sm space-y-2">
                <div className="text-slate-700">g = σ(W<sub>g</sub> · Q<sub>iter2</sub>)</div>
                <div className="text-slate-700">Output = g · Attn<sub>global</sub> + (1-g) · Attn<sub>local</sub></div>
              </div>
              <p className="text-sm text-slate-500 mt-3">
                门控值 g 由第二次迭代的 Query 表示计算，动态决定全局与局部注意力的混合比例。
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-3">设计优势</h4>
              <ul className="text-sm text-slate-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span><strong>参数共享</strong>：两次迭代共享 Transformer 参数，减少显存占用</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span><strong>容量保持</strong>：等效于更深的网络，保持模型容量</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span><strong>自适应融合</strong>：模型学习何时依赖全局 vs 局部上下文</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* FIM Training */}
        <Card title="Fill-In-the-Middle (FIM) 训练" className="border-t-4 border-t-teal-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-slate-600 mb-4">
                FIM 是代码模型预训练中的关键技术，使模型能够根据上下文填充中间缺失的代码段，
                模拟真实的代码补全场景。
              </p>
              <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                <h5 className="font-bold text-teal-800 mb-2">训练格式</h5>
                <div className="font-mono text-xs bg-white p-3 rounded border border-teal-100 space-y-1">
                  <div className="text-slate-500">{"<PRE>"} prefix_code {"<SUF>"} suffix_code {"<MID>"}</div>
                  <div className="text-teal-600">middle_code_to_generate</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <h5 className="font-bold text-slate-800 mb-3">数据处理流程</h5>
              <ul className="text-sm text-slate-600 space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-xs">1</div>
                  <span>AST 解析校验代码语法正确性</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-xs">2</div>
                  <span>代码去重（文件级 + 仓库级）</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-xs">3</div>
                  <span>随机选择分割点生成 FIM 样本</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-xs">4</div>
                  <span>混合 FIM 与完整代码样本训练</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </Section>

      {/* Evaluation Section */}
      <Section id="evaluation" title="实验结果与性能" icon={BarChart2}>
        <p className="mb-8 text-slate-600">
          IQuest-Coder-V1-40B 及其 Loop 变体在多个关键代码基准测试中展现了 SOTA (State-of-the-art) 级别的性能，不仅超越了同量级开源模型，在部分指标上甚至媲美 Claude 4.5 Sonnet 等闭源模型。
        </p>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card title="SWE-Bench Verified" className="border-t-4 border-t-green-500">
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-bold text-slate-800">81.4%</span>
              <span className="text-sm text-green-600 font-bold mb-1">Top Tier</span>
            </div>
            <p className="text-sm text-slate-500">
              解决真实 GitHub Issue，展现强大的软件工程 Agent 能力。
            </p>
          </Card>
          <Card title="LiveCodeBench v6" className="border-t-4 border-t-blue-500">
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-bold text-slate-800">55.7%</span>
              <span className="text-sm text-blue-600 font-bold mb-1">Pass@1</span>
            </div>
            <p className="text-sm text-slate-500">
              抗污染实时代码竞赛，Thinking 模式强大解题逻辑。
            </p>
          </Card>
          <Card title="CRUXEval" className="border-t-4 border-t-purple-500">
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-bold text-slate-800">98.9%</span>
              <span className="text-sm text-purple-600 font-bold mb-1">Output</span>
            </div>
            <p className="text-sm text-slate-500">
              代码执行预测，模型深刻理解代码行为。
            </p>
          </Card>
          <Card title="Terminal-Bench" className="border-t-4 border-t-orange-500">
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-bold text-slate-800">Top</span>
              <span className="text-sm text-orange-600 font-bold mb-1">Agent</span>
            </div>
            <p className="text-sm text-slate-500">
              终端环境 AI Agent 能力基准测试。
            </p>
          </Card>
        </div>

        {/* Detailed Benchmark Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Agentic Tasks */}
          <Card title="🤖 Agentic 软件工程任务" className="border-t-4 border-t-green-500">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-green-50 text-green-700">
                  <tr>
                    <th className="px-3 py-2 text-left">Benchmark</th>
                    <th className="px-3 py-2 text-right">Score</th>
                    <th className="px-3 py-2 text-left">说明</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr><td className="px-3 py-2">SWE-Bench Verified</td><td className="px-3 py-2 text-right font-bold text-green-600">81.4%</td><td className="px-3 py-2 text-xs text-slate-500">真实 GitHub Issue 修复</td></tr>
                  <tr><td className="px-3 py-2">SWE-Bench Lite</td><td className="px-3 py-2 text-right font-bold">72.3%</td><td className="px-3 py-2 text-xs text-slate-500">精简版 SWE 任务</td></tr>
                  <tr><td className="px-3 py-2">Terminal-Bench</td><td className="px-3 py-2 text-right font-bold">Top</td><td className="px-3 py-2 text-xs text-slate-500">终端环境 Agent</td></tr>
                  <tr><td className="px-3 py-2">TAU-Bench (Airline)</td><td className="px-3 py-2 text-right font-bold">55.0%</td><td className="px-3 py-2 text-xs text-slate-500">工具调用任务</td></tr>
                  <tr><td className="px-3 py-2">TAU-Bench (Retail)</td><td className="px-3 py-2 text-right font-bold">61.0%</td><td className="px-3 py-2 text-xs text-slate-500">工具调用任务</td></tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* Competitive Programming */}
          <Card title="🏆 竞技编程任务" className="border-t-4 border-t-blue-500">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-blue-50 text-blue-700">
                  <tr>
                    <th className="px-3 py-2 text-left">Benchmark</th>
                    <th className="px-3 py-2 text-right">Score</th>
                    <th className="px-3 py-2 text-left">说明</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr><td className="px-3 py-2">LiveCodeBench v6</td><td className="px-3 py-2 text-right font-bold text-blue-600">55.7%</td><td className="px-3 py-2 text-xs text-slate-500">实时代码竞赛 (Thinking)</td></tr>
                  <tr><td className="px-3 py-2">HumanEval+</td><td className="px-3 py-2 text-right font-bold">90.2%</td><td className="px-3 py-2 text-xs text-slate-500">Python 代码生成</td></tr>
                  <tr><td className="px-3 py-2">MBPP+</td><td className="px-3 py-2 text-right font-bold">77.8%</td><td className="px-3 py-2 text-xs text-slate-500">Python 基础题目</td></tr>
                  <tr><td className="px-3 py-2">BigCodeBench</td><td className="px-3 py-2 text-right font-bold">71.4%</td><td className="px-3 py-2 text-xs text-slate-500">多语言大规模代码</td></tr>
                  <tr><td className="px-3 py-2">Polyglot</td><td className="px-3 py-2 text-right font-bold">Top</td><td className="px-3 py-2 text-xs text-slate-500">多语言编程能力</td></tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Model Comparison Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-8">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
            <h4 className="font-bold text-slate-700">模型横向对比 (核心代码生成指标)</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Model</th>
                  <th className="px-4 py-3">HumanEval+</th>
                  <th className="px-4 py-3">MBPP+</th>
                  <th className="px-4 py-3">BigCodeBench</th>
                  <th className="px-4 py-3">CRUXEval-O</th>
                  <th className="px-4 py-3">Safety</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-700">Qwen2.5-Coder-32B</td>
                  <td className="px-4 py-3">86.6</td>
                  <td className="px-4 py-3">77.8</td>
                  <td className="px-4 py-3">57.4</td>
                  <td className="px-4 py-3">-</td>
                  <td className="px-4 py-3">69.7</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-700">DeepSeek-V3.2</td>
                  <td className="px-4 py-3">88.4</td>
                  <td className="px-4 py-3">77.2</td>
                  <td className="px-4 py-3">64.9</td>
                  <td className="px-4 py-3">-</td>
                  <td className="px-4 py-3">-</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-700">Claude 4.5 Sonnet</td>
                  <td className="px-4 py-3">-</td>
                  <td className="px-4 py-3">-</td>
                  <td className="px-4 py-3">-</td>
                  <td className="px-4 py-3">-</td>
                  <td className="px-4 py-3">-</td>
                </tr>
                <tr className="bg-blue-50/50 hover:bg-blue-50">
                  <td className="px-4 py-3 font-bold text-blue-700">IQuest-Coder-40B-Instruct</td>
                  <td className="px-4 py-3 font-bold">90.2</td>
                  <td className="px-4 py-3 font-bold">77.8</td>
                  <td className="px-4 py-3 font-bold">71.4</td>
                  <td className="px-4 py-3 font-bold">98.9</td>
                  <td className="px-4 py-3 font-bold">85.0</td>
                </tr>
                <tr className="bg-purple-50/50 hover:bg-purple-50">
                  <td className="px-4 py-3 font-bold text-purple-700">IQuest-Coder-40B-Thinking</td>
                  <td className="px-4 py-3">-</td>
                  <td className="px-4 py-3">-</td>
                  <td className="px-4 py-3">-</td>
                  <td className="px-4 py-3">-</td>
                  <td className="px-4 py-3 font-bold text-purple-600">94.3</td>
                </tr>
                <tr className="bg-green-50/50 hover:bg-green-50">
                  <td className="px-4 py-3 font-bold text-green-700">IQuest-Coder-40B-Loop</td>
                  <td className="px-4 py-3 font-bold">90.0+</td>
                  <td className="px-4 py-3 font-bold">77.5+</td>
                  <td className="px-4 py-3 font-bold">70.0+</td>
                  <td className="px-4 py-3 font-bold">98.5+</td>
                  <td className="px-4 py-3 font-bold">84.0+</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-4 text-xs text-slate-400 bg-slate-50">
            * 数据来源：Technical Report. Loop 变体在保持性能的同时显著降低部署成本。
          </div>
        </div>

        {/* Safety Evaluation */}
        <Card title="🛡️ 安全性评估" className="border-t-4 border-t-red-500 mb-8">
          <p className="text-slate-600 mb-4">
            IQuest-Coder 在代码安全性方面表现出色，在多个安全基准测试中达到业界领先水平。
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "WildGuard", score: "94.3%", desc: "安全风险检测" },
              { name: "HarmBench", score: "High", desc: "有害内容防护" },
              { name: "XSTest", score: "Pass", desc: "安全边界测试" },
              { name: "Overall Safety", score: "85.0%", desc: "综合安全评分" }
            ].map((item, i) => (
              <div key={i} className="bg-red-50 p-4 rounded-lg text-center border border-red-100">
                <div className="text-2xl font-bold text-red-600">{item.score}</div>
                <div className="text-sm font-medium text-red-800">{item.name}</div>
                <div className="text-xs text-red-600/70">{item.desc}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* White-Box Release */}
        <div className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white p-8 rounded-xl">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <GitBranch size={28} /> 白盒开放链 (White-Box Release)
          </h3>
          <p className="text-indigo-200 mb-6">
            IQuest 团队开放了从预训练到最终后训练的完整 checkpoint 链，为社区提供研究代码智能形成过程的白盒资源。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { stage: "Stage 1", name: "Pre-training Base", desc: "通用+代码混合预训练" },
              { stage: "Stage 2", name: "Code Annealing", desc: "高质量代码退火" },
              { stage: "Stage 3", name: "Mid-training", desc: "推理+Agent 轨迹注入" },
              { stage: "Stage 4", name: "Post-training", desc: "Thinking / Instruct 双路径" }
            ].map((item, i) => (
              <div key={i} className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <div className="text-xs text-indigo-300 mb-1">{item.stage}</div>
                <div className="font-bold text-white mb-1">{item.name}</div>
                <div className="text-xs text-indigo-200">{item.desc}</div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-indigo-300">
            💡 这种透明的开放方式使研究者能够深入研究各阶段对最终代码智能的贡献，推动领域发展。
          </p>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center gap-2 mb-4 text-white font-bold text-xl">
            <div className="bg-blue-600 p-1 rounded">IQ</div>
            <span>IQuest-Coder</span>
          </div>
          <p className="mb-6 max-w-2xl mx-auto text-sm">
            本页面基于 IQuest Coder Team 发布的 "IQuest-Coder-V1 Technical Report" 制作。
            旨在通过可视化与中文解读，帮助开发者更好地理解这一前沿代码模型系列。
          </p>
          <div className="text-xs text-slate-500">
            &copy; 2025 IQuest Coder Team Analysis. Generated by AI Assistant.
          </div>
        </div>
      </footer>
    </div>
  );
}

