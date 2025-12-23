import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Cpu, 
  Layers, 
  Zap, 
  Brain, 
  BarChart3, 
  ArrowRight, 
  CheckCircle2, 
  Database,
  Network,
  Scale,
  Code,
  Sigma,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Components ---

const Section = ({ id, title, icon: Icon, children, className = "" }) => (
  <section id={id} className={`py-12 md:py-16 border-b border-slate-800 ${className}`}>
    <div className="flex items-center gap-3 mb-8">
      <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
        <Icon size={24} />
      </div>
      <h2 className="text-3xl font-bold text-slate-100">{title}</h2>
    </div>
    {children}
  </section>
);

const Card = ({ title, children, className = "" }) => (
  <div className={`bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-blue-500/30 transition-colors ${className}`}>
    {title && <h3 className="text-xl font-semibold text-slate-200 mb-4">{title}</h3>}
    {children}
  </div>
);

const StatCard = ({ label, value, sub, highlight = false }) => (
  <div className={`p-6 rounded-xl border ${highlight ? 'bg-blue-600/10 border-blue-500/50' : 'bg-slate-900 border-slate-800'}`}>
    <div className="text-slate-400 text-sm font-medium mb-1">{label}</div>
    <div className={`text-3xl font-bold ${highlight ? 'text-blue-400' : 'text-slate-100'}`}>{value}</div>
    {sub && <div className="text-slate-500 text-xs mt-2">{sub}</div>}
  </div>
);

const Badge = ({ text, type = "default" }) => {
  const styles = {
    default: "bg-slate-800 text-slate-300",
    blue: "bg-blue-900/30 text-blue-300 border border-blue-800",
    green: "bg-emerald-900/30 text-emerald-300 border border-emerald-800",
    purple: "bg-purple-900/30 text-purple-300 border border-purple-800",
  };
  return (
    <span className={`px-2 py-1 rounded-md text-xs font-medium ${styles[type]}`}>
      {text}
    </span>
  );
};

// --- Diagrams & Visualizations ---

const MoEDiagram = () => (
  <div className="relative w-full h-64 bg-slate-950 rounded-lg border border-slate-800 overflow-hidden flex flex-col items-center justify-center p-4">
    <div className="absolute top-4 text-xs text-slate-500 uppercase tracking-widest">DeepSeekMoE Routing</div>
    
    <div className="flex w-full justify-between items-center max-w-lg mt-6">
      {/* Input */}
      <div className="flex flex-col items-center gap-2">
        <div className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-600 flex items-center justify-center text-slate-300 shadow-lg z-10">
          Token
        </div>
        <span className="text-xs text-slate-400">Input</span>
      </div>

      {/* Router Logic */}
      <div className="flex-1 px-4 relative">
         {/* Lines */}
         <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path d="M 0 30 C 50 30, 50 10, 100 10" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
            <path d="M 0 30 C 50 30, 50 90, 100 90" fill="none" stroke="#64748b" strokeWidth="1" opacity="0.3" />
            <path d="M 0 30 C 50 30, 50 50, 100 50" fill="none" stroke="#3b82f6" strokeWidth="2" />
         </svg>
         
         <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 border border-blue-500/50 px-3 py-1 rounded-full text-xs text-blue-300 z-20 shadow-xl">
            Score + Bias
         </div>
      </div>

      {/* Experts */}
      <div className="flex flex-col gap-2 z-10">
        <div className="flex items-center gap-2 p-2 rounded bg-emerald-900/20 border border-emerald-800/50">
           <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
           <span className="text-xs text-emerald-300 font-mono">Shared Expert</span>
        </div>
        <div className="flex items-center gap-2 p-2 rounded bg-blue-900/20 border border-blue-600">
           <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
           <span className="text-xs text-blue-300 font-mono">Routed Exp A</span>
        </div>
        <div className="flex items-center gap-2 p-2 rounded bg-slate-800/50 border border-slate-700 opacity-50">
           <div className="w-2 h-2 rounded-full bg-slate-600"></div>
           <span className="text-xs text-slate-400 font-mono">Routed Exp B</span>
        </div>
      </div>
    </div>
    <div className="mt-6 text-center">
      <p className="text-xs text-slate-400">无辅助损失策略：动态调整 <span className="text-blue-400 font-mono">Bias</span> 来平衡负载</p>
    </div>
  </div>
);

const MTPDiagram = () => (
  <div className="w-full h-auto bg-slate-950 rounded-lg border border-slate-800 p-6">
     <div className="flex items-center justify-center gap-4 text-sm mb-6">
        <span className="text-slate-500 uppercase tracking-widest text-xs">Multi-Token Prediction</span>
     </div>
     <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
        {/* Main Model */}
        <div className="flex flex-col items-center gap-2">
           <div className="h-24 w-32 bg-slate-800 rounded-lg border border-slate-600 flex items-center justify-center relative">
              <span className="text-slate-300 font-bold">Main Model</span>
              <span className="absolute -bottom-3 bg-slate-700 text-[10px] px-2 rounded text-slate-300">61 Layers</span>
           </div>
           <div className="h-8 w-1 bg-slate-600"></div>
           <div className="px-3 py-1 bg-blue-600 rounded text-white text-sm font-mono">Token T+1</div>
        </div>

        {/* Connection */}
        <div className="hidden md:flex flex-col items-center justify-center -mt-12">
           <div className="w-16 h-[2px] bg-slate-600 relative">
             <ArrowRight className="absolute -right-2 -top-2.5 text-slate-600" size={16} />
           </div>
           <span className="text-[10px] text-slate-500 mt-1">Embedding T+2</span>
        </div>

        {/* MTP Module */}
        <div className="flex flex-col items-center gap-2 mt-4 md:mt-0">
           <div className="h-24 w-32 bg-indigo-900/20 rounded-lg border border-indigo-500/50 border-dashed flex items-center justify-center relative">
              <span className="text-indigo-300 font-bold">MTP Module</span>
              <span className="absolute -bottom-3 bg-indigo-900 text-[10px] px-2 rounded text-indigo-300">1 Layer</span>
           </div>
           <div className="h-8 w-1 bg-indigo-500/50"></div>
           <div className="px-3 py-1 bg-indigo-600 rounded text-white text-sm font-mono">Token T+2</div>
        </div>
     </div>
     <div className="mt-4 text-center">
        <p className="text-xs text-slate-400 max-w-md mx-auto">
           MTP 模块极其轻量（仅1层），利用主模型的“深思熟虑”快速推测下一个 Token。
           <br/>
           <span className="text-emerald-400">推理时加速 1.8x</span>
        </p>
     </div>
  </div>
);

// --- Main App Component ---

const DeepSeekV3 = () => {
  const [activeTab, setActiveTab] = useState("architecture");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'overview', label: '概览' },
    { id: 'architecture', label: '核心架构' },
    { id: 'infrastructure', label: '基础设施' },
    { id: 'training', label: '训练流程' },
    { id: 'evaluation', label: '性能评估' },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-blue-500/30">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800 py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
               <ArrowLeft size={20} />
               <span className="hidden md:inline">返回目录</span>
            </Link>
            <div className="w-px h-6 bg-slate-800 hidden md:block"></div>
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">DS</span>
                </div>
                <span className="text-xl font-bold text-slate-100 tracking-tight">DeepSeek<span className="text-blue-500">-V3</span></span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors"
              >
                {item.label}
              </button>
            ))}
            <a href="https://github.com/deepseek-ai/DeepSeek-V3" target="_blank" rel="noreferrer" className="bg-slate-100 text-slate-900 px-4 py-2 rounded-full text-sm font-bold hover:bg-white transition-colors">
              论文 PDF
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-slate-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900 border-b border-slate-800 p-4 flex flex-col gap-4 shadow-2xl">
            {navItems.map(item => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-left text-slate-300 py-2 border-b border-slate-800 last:border-0"
              >
                {item.label}
              </button>
            ))}
            <Link to="/" className="text-left text-slate-300 py-2 border-b border-slate-800">返回目录</Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-10"></div>
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            开源最强 MoE 模型技术详解
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            以极致工程<br/>
            重塑 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">AGI 成本边界</span>
          </h1>
          <p className="text-xl text-slate-400 mb-10 leading-relaxed">
            6710亿参数，单Token激活370亿。以 $557万 的超低成本，实现比肩 GPT-4o 的性能。<br/>
            DeepSeek-V3 不仅仅是模型的胜利，更是系统工程的奇迹。
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <StatCard label="总参数量" value="671B" />
            <StatCard label="激活参数" value="37B" sub="MoE 架构" highlight />
            <StatCard label="训练成本" value="$5.57M" sub="2.788M H800 Hours" />
            <StatCard label="上下文" value="128K" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 max-w-5xl">
        
        {/* Overview Section */}
        <Section id="overview" title="核心亮点概览" icon={Zap}>
          <div className="grid md:grid-cols-3 gap-6">
            <Card title="架构创新" className="bg-gradient-to-br from-slate-900 to-blue-900/20">
              <ul className="space-y-3 text-slate-400 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-blue-400 shrink-0 mt-0.5" />
                  <span><b>MLA (Multi-head Latent Attention)</b>：极致压缩 KV Cache，推理显存占用极低。</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-blue-400 shrink-0 mt-0.5" />
                  <span><b>DeepSeekMoE</b>：细粒度专家 + 共享专家，知识分配更精准。</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-blue-400 shrink-0 mt-0.5" />
                  <span><b>MTP</b>：多 Token 预测，提升模型逻辑并加速推理。</span>
                </li>
              </ul>
            </Card>
            <Card title="工程奇迹" className="bg-gradient-to-br from-slate-900 to-emerald-900/20">
              <ul className="space-y-3 text-slate-400 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span><b>FP8 混合精度训练</b>：业界首次在超大规模模型上成功验证，效率翻倍。</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span><b>DualPipe</b>：计算与通信完美重叠，跨节点通信零损耗。</span>
                </li>
              </ul>
            </Card>
            <Card title="顶级性能" className="bg-gradient-to-br from-slate-900 to-purple-900/20">
              <ul className="space-y-3 text-slate-400 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-purple-400 shrink-0 mt-0.5" />
                  <span><b>开源最强</b>：全面超越 Llama-3.1-405B 和 Qwen2.5。</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-purple-400 shrink-0 mt-0.5" />
                  <span><b>比肩闭源</b>：数学、代码能力媲美 GPT-4o 和 Claude 3.5。</span>
                </li>
              </ul>
            </Card>
          </div>
        </Section>

        {/* Architecture Section */}
        <Section id="architecture" title="核心架构详解" icon={Brain}>
          <div className="flex flex-col gap-8">
            <div className="flex gap-2 p-1 bg-slate-900 rounded-lg w-fit">
               {['MoE & 负载均衡', 'MTP 多预测'].map(tab => (
                 <button
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                     activeTab === tab 
                     ? 'bg-blue-600 text-white shadow-lg' 
                     : 'text-slate-400 hover:text-white'
                   }`}
                 >
                   {tab}
                 </button>
               ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {activeTab === 'MoE & 负载均衡' && (
                  <>
                    <div>
                      <h3 className="text-xl font-bold text-blue-400 mb-2">DeepSeekMoE + 无辅助损失负载均衡</h3>
                      <p className="text-slate-400 mb-4">
                        为了解决传统 MoE 中为了平衡负载而牺牲性能的问题，V3 首创了<b>无辅助损失（Auxiliary-Loss-Free）</b>策略。
                      </p>
                      <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-3">
                         <div className="flex items-start gap-3">
                            <div className="mt-1 min-w-[20px] h-5 rounded bg-slate-800 flex items-center justify-center text-xs text-slate-500">1</div>
                            <p className="text-sm text-slate-300"><b>路由分离：</b> 选择专家时，使用 <code className="bg-slate-800 px-1 rounded text-blue-300">Score + Bias</code>。Bias 动态反映负载，如果专家太忙，Bias 降低，减少被选中的概率。</p>
                         </div>
                         <div className="flex items-start gap-3">
                            <div className="mt-1 min-w-[20px] h-5 rounded bg-slate-800 flex items-center justify-center text-xs text-slate-500">2</div>
                            <p className="text-sm text-slate-300"><b>纯粹学习：</b> 专家计算权重时，只使用 <code className="bg-slate-800 px-1 rounded text-blue-300">Raw Score</code>。这意味着梯度反向传播只优化能力，不被负载干扰。</p>
                         </div>
                      </div>
                    </div>
                  </>
                )}
                {activeTab === 'MTP 多预测' && (
                  <>
                     <div>
                      <h3 className="text-xl font-bold text-indigo-400 mb-2">MTP (Multi-Token Prediction)</h3>
                      <p className="text-slate-400 mb-4">
                        模型不仅预测下一个词，还预测下下个词。这迫使模型在当前步骤就进行“预规划”。
                      </p>
                      <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-3">
                         <div className="flex items-start gap-3">
                            <div className="mt-1 min-w-[20px] h-5 rounded bg-slate-800 flex items-center justify-center text-xs text-slate-500">1</div>
                            <p className="text-sm text-slate-300"><b>变聪明：</b> 训练时，MTP Loss 通过梯度回传，强迫主模型将未来的语义信息编码进当前的隐藏状态中。</p>
                         </div>
                         <div className="flex items-start gap-3">
                            <div className="mt-1 min-w-[20px] h-5 rounded bg-slate-800 flex items-center justify-center text-xs text-slate-500">2</div>
                            <p className="text-sm text-slate-300"><b>变快：</b> 推理时，MTP 模块作为一个“投机者”一次生成两个 Token，通过主模型验证后即可实现 1.8倍 加速。</p>
                         </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              <div className="flex items-center justify-center">
                 {activeTab === 'MoE & 负载均衡' ? <MoEDiagram /> : <MTPDiagram />}
              </div>
            </div>
          </div>
        </Section>

        {/* Infrastructure Section */}
        <Section id="infrastructure" title="基础设施与工程优化" icon={Cpu}>
          <div className="grid md:grid-cols-2 gap-6">
            <Card title="FP8 混合精度训练" className="border-emerald-500/20">
              <div className="flex items-center gap-2 mb-4">
                 <Badge text="业界首创" type="green" />
                 <Badge text="成本降低" type="default" />
              </div>
              <p className="text-slate-400 text-sm mb-4">
                通过极其精细的工程手段，解决了 FP8 精度不足的问题，实现了训练效率翻倍。
              </p>
              <div className="space-y-4">
                <div className="p-3 bg-slate-950 rounded border border-slate-800">
                  <h4 className="text-emerald-400 font-bold text-sm mb-1">1. 细粒度量化</h4>
                  <p className="text-xs text-slate-500">不搞“一刀切”。每 1x128 个元素单独缩放，隔离离群值（Outliers）的影响。</p>
                </div>
                <div className="p-3 bg-slate-950 rounded border border-slate-800">
                   <h4 className="text-emerald-400 font-bold text-sm mb-1">2. 提升累加精度</h4>
                   <p className="text-xs text-slate-500">Tensor Core 算一会儿，搬到 CUDA Core (FP32) 累加。利用接力跑策略，兼顾速度与精度。</p>
                </div>
              </div>
            </Card>

            <Card title="DualPipe 流水线并行" className="border-blue-500/20">
               <div className="flex items-center gap-2 mb-4">
                 <Badge text="通信零损耗" type="blue" />
              </div>
              <p className="text-slate-400 text-sm mb-4">
                针对跨节点 MoE 训练通信量大的痛点，设计了计算与通信完全重叠的流水线。
              </p>
              <div className="relative h-40 bg-slate-950 rounded border border-slate-800 overflow-hidden flex items-center justify-center">
                 {/* Abstract visual of overlapping blocks */}
                 <div className="absolute flex gap-1">
                    <div className="w-12 h-16 bg-blue-600 rounded flex items-center justify-center text-xs text-white z-10 shadow-lg">计算</div>
                    <div className="w-12 h-16 bg-slate-700 rounded flex items-center justify-center text-xs text-slate-400 -ml-6 mt-4 z-0 opacity-50">通信</div>
                 </div>
                 <div className="absolute flex gap-1 left-24">
                    <div className="w-12 h-16 bg-blue-600 rounded flex items-center justify-center text-xs text-white z-10 shadow-lg">计算</div>
                    <div className="w-12 h-16 bg-slate-700 rounded flex items-center justify-center text-xs text-slate-400 -ml-6 mt-4 z-0 opacity-50">通信</div>
                 </div>
                 <p className="absolute bottom-2 text-[10px] text-slate-500">Communication Hidden Behind Computation</p>
              </div>
              <div className="mt-4 p-3 bg-slate-950 rounded border border-slate-800">
                   <h4 className="text-blue-400 font-bold text-sm mb-1">Warp 专职化</h4>
                   <p className="text-xs text-slate-500">从 GPU 中划拨 20 个 SM 专门做通信“搬运工”，确保计算核心不被打断。</p>
              </div>
            </Card>
          </div>
        </Section>

        {/* Training Pipeline */}
        <Section id="training" title="训练流水线" icon={Layers}>
          <div className="relative border-l-2 border-slate-800 ml-3 space-y-12 py-4">
            
            {/* Step 1 */}
            <div className="relative pl-8">
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-slate-950 border-2 border-blue-500 rounded-full"></div>
              <h3 className="text-lg font-bold text-slate-100">1. 预训练 (Pre-Training)</h3>
              <p className="text-sm text-slate-500 mb-2">14.8T Tokens | 128K 词表 | FIM 补全</p>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                <p className="text-slate-300 text-sm">
                  使用了 14.8万亿 token 的高质量数据。特别加强了 <span className="text-blue-400">数学</span> 和 <span className="text-blue-400">代码</span> 样本。
                  引入了无辅助损失策略，实现了专家的高度专业化（Specialization）。
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative pl-8">
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-slate-950 border-2 border-purple-500 rounded-full"></div>
              <h3 className="text-lg font-bold text-slate-100">2. 长文本扩展 (Context Extension)</h3>
              <p className="text-sm text-slate-500 mb-2">4K → 32K → 128K</p>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                <p className="text-slate-300 text-sm">
                  使用 YaRN 方法进行两阶段微调。在“大海捞针”测试中，128K 长度内准确率达到 100%。
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative pl-8">
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-slate-950 border-2 border-emerald-500 rounded-full"></div>
              <h3 className="text-lg font-bold text-slate-100">3. 后训练 (Post-Training)</h3>
              <p className="text-sm text-slate-500 mb-2">SFT + RL (GRPO)</p>
              <div className="bg-gradient-to-r from-emerald-900/10 to-transparent p-4 rounded-lg border border-emerald-900/30">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                     <Brain size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-300 text-sm">知识蒸馏 (Distillation)</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      利用 <b>DeepSeek-R1</b> 的推理数据进行微调。V3 成功继承了 R1 的强大逻辑能力，但在输出风格上更加简洁。
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-emerald-900/30">
                   <h4 className="font-bold text-emerald-300 text-sm">GRPO 算法</h4>
                   <p className="text-xs text-slate-400 mt-1">
                      摒弃了昂贵的 Critic 模型，直接通过一组输出的相对优劣来优化策略，大幅降低了 RL 阶段的成本。
                   </p>
                </div>
              </div>
            </div>

          </div>
        </Section>

        {/* Evaluation */}
        <Section id="evaluation" title="性能评估" icon={BarChart3}>
           <div className="space-y-8">
              <div>
                 <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
                    <Code size={18} /> 代码与数学能力 (Pass@1)
                 </h3>
                 <div className="space-y-4">
                    {/* Chart Item */}
                    <div>
                       <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400">MATH-500 (数学)</span>
                       </div>
                       <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden relative">
                          <div className="absolute top-0 left-0 h-full bg-blue-500" style={{width: '90.2%'}}></div>
                          <div className="absolute top-0 left-0 h-full bg-slate-600 opacity-30" style={{width: '74.6%'}}></div>
                          <div className="absolute top-0 right-2 text-[10px] text-white font-bold leading-4 z-10">DS-V3: 90.2</div>
                       </div>
                       <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                          <span>GPT-4o: 74.6</span>
                          <span>Claude-3.5: 78.3</span>
                       </div>
                    </div>

                    <div>
                       <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400">LiveCodeBench (代码)</span>
                       </div>
                       <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden relative">
                          <div className="absolute top-0 left-0 h-full bg-blue-500" style={{width: '40.5%'}}></div>
                          <div className="absolute top-0 right-2 text-[10px] text-white font-bold leading-4 z-10">DS-V3: 40.5</div>
                       </div>
                       <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                          <span>Qwen2.5-72B: 31.1</span>
                          <span>Llama-3.1-405B: 28.4</span>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                 <div className="bg-slate-900 p-4 rounded border border-slate-800">
                    <h4 className="text-slate-200 font-bold mb-2">MMLU (知识)</h4>
                    <div className="text-3xl font-bold text-blue-400">88.5</div>
                    <div className="text-xs text-slate-500 mt-1">GPT-4o: 87.2 | Llama-3.1: 88.6</div>
                    <p className="text-xs text-slate-400 mt-2">稳居开源第一梯队，与闭源模型差距极小。</p>
                 </div>
                 <div className="bg-slate-900 p-4 rounded border border-slate-800">
                    <h4 className="text-slate-200 font-bold mb-2">Chinese SimpleQA</h4>
                    <div className="text-3xl font-bold text-emerald-400">64.8</div>
                    <div className="text-xs text-slate-500 mt-1">GPT-4o: 59.3 | Qwen2.5: 48.4</div>
                    <p className="text-xs text-slate-400 mt-2">中文事实性知识能力超越 GPT-4o。</p>
                 </div>
              </div>
           </div>
        </Section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 text-center">
        <div className="container mx-auto">
          <p className="text-slate-500 text-sm">
            基于 DeepSeek-V3 Technical Report 整理制作
          </p>
          <p className="text-slate-600 text-xs mt-2">
            Generated by AI Assistant • 2025
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DeepSeekV3;






























