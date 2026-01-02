import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Layers, Code, Activity, GitBranch, Lightbulb, ArrowRight, ArrowLeft, CheckCircle, XCircle, Zap, Eye, Image, Settings, TrendingUp, AlertTriangle, Box, Database, FlaskConical } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

// --- Helper Components ---
const InfoBox = ({ title, children, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-50 border-blue-200 text-blue-800",
    green: "bg-green-50 border-green-200 text-green-800",
    purple: "bg-purple-50 border-purple-200 text-purple-800",
    yellow: "bg-yellow-50 border-yellow-200 text-yellow-800",
    red: "bg-red-50 border-red-200 text-red-800",
    teal: "bg-teal-50 border-teal-200 text-teal-800",
  };
  return (
    <div className={`p-4 rounded-lg border ${colors[color]} my-4`}>
      {title && <strong className="block mb-2">{title}</strong>}
      <div className="text-sm">{children}</div>
    </div>
  );
};

const ComponentCard = ({ title, tech, desc, color, details }) => {
  const colorClasses = {
    blue: "border-blue-200 bg-blue-50 text-blue-900",
    purple: "border-purple-200 bg-purple-50 text-purple-900",
    slate: "border-slate-200 bg-slate-50 text-slate-900",
    green: "border-green-200 bg-green-50 text-green-900",
  };
  
  return (
    <div className={`p-5 rounded-lg border ${colorClasses[color]} shadow-sm`}>
      <h4 className="font-bold text-lg mb-1">{title}</h4>
      <span className="inline-block px-2 py-0.5 rounded text-xs font-mono bg-white border border-opacity-20 mb-3 opacity-80">
        {tech}
      </span>
      <p className="text-sm opacity-90 leading-relaxed mb-2">{desc}</p>
      {details && (
        <ul className="text-xs opacity-75 space-y-1 mt-2 border-t pt-2 border-current border-opacity-20">
          {details.map((d, i) => <li key={i}>• {d}</li>)}
        </ul>
      )}
    </div>
  );
};

const ResultBar = ({ label, value, max = 100, color, text }) => (
  <div className="mb-3">
    <div className="flex justify-between text-xs font-semibold mb-1 text-slate-700">
      <span>{label}</span>
      <span>{text ? `${text}: ` : ''}{value}</span>
    </div>
    <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
      <div className={`h-2.5 rounded-full ${color}`} style={{ width: `${(value / max) * 100}%` }}></div>
    </div>
  </div>
);

const Section = ({ id, children }) => (
  <section id={id} className="scroll-mt-8 mb-16">
    {children}
  </section>
);

// --- Main Application Component ---
export default function JanusPaperDeepDive() {
  const [activeSection, setActiveSection] = useState('intro');

  const navItems = [
    { id: 'intro', label: '论文概览', icon: BookOpen },
    { id: 'motivation', label: '核心动机', icon: Lightbulb },
    { id: 'architecture', label: 'Janus 架构', icon: Layers },
    { id: 'formulas', label: '关键公式详解', icon: Code },
    { id: 'training', label: '训练流程', icon: GitBranch },
    { id: 'ablation', label: '消融实验', icon: FlaskConical },
    { id: 'results', label: '实验结果', icon: Activity },
  ];

  // 监听滚动，高亮当前章节
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPos = window.scrollY + 150;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* 返回按钮 (Mobile) */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Link to="/" className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-lg text-gray-600 hover:text-blue-600 transition-colors border border-gray-200 shadow-sm">
          <ArrowLeft size={16} />
          返回
        </Link>
      </div>

      {/* Sidebar Navigation - Fixed */}
      <aside className="hidden md:block fixed left-0 top-0 w-64 h-screen bg-slate-900 text-white overflow-y-auto z-40">
        <div className="p-6 border-b border-slate-700">
          <Link to="/" className="text-slate-400 hover:text-white text-sm flex items-center gap-1 mb-3 transition-colors">
            <ArrowLeft size={14} />
            返回首页
          </Link>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
            Janus Deep Dive
          </h1>
          <p className="text-xs text-slate-400 mt-2">DeepSeek-AI 统一多模态模型</p>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeSection === item.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-6 mt-auto text-xs text-slate-500 border-t border-slate-800">
          <p className="font-mono">arXiv: 2410.13848v1</p>
          <p className="mt-1">DeepSeek-AI & HKU</p>
          <p className="mt-1">2024-10</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="md:ml-64 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-12">
          
          {/* Section 1: Intro */}
          <Section id="intro">
            <IntroSection />
          </Section>

          {/* Section 2: Motivation */}
          <Section id="motivation">
            <MotivationSection />
          </Section>

          {/* Section 3: Architecture */}
          <Section id="architecture">
            <ArchitectureSection />
          </Section>

          {/* Section 4: Formulas */}
          <Section id="formulas">
            <FormulasSection />
          </Section>

          {/* Section 5: Training */}
          <Section id="training">
            <TrainingSection />
          </Section>

          {/* Section 6: Ablation */}
          <Section id="ablation">
            <AblationSection />
          </Section>

          {/* Section 7: Results */}
          <Section id="results">
            <ResultsSection />
          </Section>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-slate-200 text-center text-slate-400 text-sm">
            <p>© 2024 基于 Janus 论文 (arXiv:2410.13848v1) 整理</p>
            <p className="mt-1">DeepSeek-AI · The University of Hong Kong · Peking University</p>
          </footer>
        </div>
      </main>
    </div>
  );
}

// --- Content Sections ---

const IntroSection = () => (
  <div className="space-y-6">
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl">
      <div className="text-xs opacity-75 mb-2">DeepSeek-AI · The University of Hong Kong · Peking University</div>
      <h2 className="text-2xl md:text-3xl font-bold mb-2">Janus: Decoupling Visual Encoding for Unified Multimodal Understanding and Generation</h2>
      <p className="text-blue-100 italic text-sm">解耦视觉编码的统一多模态理解与生成框架</p>
    </div>
    
    {/* 核心贡献一览 */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-center">
        <Eye className="mx-auto text-blue-600 mb-2" size={28} />
        <h4 className="font-bold text-blue-800 text-sm">视觉编码解耦</h4>
        <p className="text-xs text-blue-600 mt-1">理解与生成使用独立编码器</p>
      </div>
      <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 text-center">
        <Box className="mx-auto text-purple-600 mb-2" size={28} />
        <h4 className="font-bold text-purple-800 text-sm">统一 Transformer</h4>
        <p className="text-xs text-purple-600 mt-1">单一 LLM 处理所有任务</p>
      </div>
      <div className="bg-green-50 p-4 rounded-lg border border-green-100 text-center">
        <TrendingUp className="mx-auto text-green-600 mb-2" size={28} />
        <h4 className="font-bold text-green-800 text-sm">SOTA 性能</h4>
        <p className="text-xs text-green-600 mt-1">1.3B 超越 7B 专用模型</p>
      </div>
    </div>

    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-2 mb-4">
        <BookOpen size={20} className="text-blue-600"/> 摘要速览
      </h3>
      <p className="text-slate-700 leading-relaxed mb-4">
        这篇论文主要解决了一个在统一多模态模型中存在的<strong>关键矛盾</strong>：<strong>多模态理解（Understanding）</strong>和<strong>视觉生成（Generation）</strong>对视觉特征的粒度要求截然不同。
      </p>
      <ul className="list-disc pl-5 space-y-2 text-slate-700">
        <li>
          <strong>主要创新：</strong> 提出了 <strong>Janus</strong> 框架，通过<strong>解耦（Decoupling）</strong>视觉编码路径，让理解和生成任务各自使用最适合的编码方式，但最终统一由一个自回归 Transformer 处理。
        </li>
        <li>
          <strong>核心优势：</strong> 解决了理解与生成在单一视觉编码器下的冲突，灵活性高，性能超越了以往的统一模型（如 Chameleon），甚至在某些任务上击败了专用模型。
        </li>
        <li>
          <strong>名字寓意：</strong> Janus 是罗马神话中的<strong>双面神</strong>，一面看过去，一面看未来。这里象征着模型同时具备"理解"与"生成"两幅面孔，却共用一个大脑。
        </li>
      </ul>
    </div>

    {/* 模型规格 */}
    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
      <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Settings size={18} /> 模型规格一览
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
          <p className="text-xs text-slate-500">总参数量</p>
          <p className="font-bold text-slate-800">1.3B</p>
        </div>
        <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
          <p className="text-xs text-slate-500">图像分辨率</p>
          <p className="font-bold text-slate-800">384×384</p>
        </div>
        <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
          <p className="text-xs text-slate-500">LLM 基座</p>
          <p className="font-bold text-slate-800">DeepSeek-LLM</p>
        </div>
        <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
          <p className="text-xs text-slate-500">Vision Encoder</p>
          <p className="font-bold text-slate-800">SigLIP + VQ</p>
        </div>
      </div>
    </div>

    <InfoBox title="论文核心贡献" color="teal">
      <ol className="list-decimal list-inside space-y-1">
        <li><strong>首次提出</strong>在统一多模态理解与生成框架中解耦视觉编码的重要性</li>
        <li>证明解耦策略可以<strong>同时提升</strong>理解和生成性能，而非相互妥协</li>
        <li>提供了一个<strong>高度灵活、可扩展</strong>的框架，未来可支持点云、EEG、音频等更多模态</li>
      </ol>
    </InfoBox>
  </div>
);

const MotivationSection = () => (
  <div className="space-y-8">
    <h2 className="text-2xl font-bold text-slate-800 border-b pb-4">为什么需要 Janus？(核心动机)</h2>
    
    {/* 问题背景 */}
    <div className="bg-slate-100 p-6 rounded-xl">
      <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
        <AlertTriangle className="text-yellow-600" size={20} />
        问题背景：统一模型的困境
      </h3>
      <p className="text-sm text-slate-700 mb-4">
        近年来，研究者们尝试将多模态理解和视觉生成统一到<strong>同一个模型</strong>中。主要有两种思路：
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <h4 className="font-bold text-sm text-slate-700 mb-2">思路一：外挂扩散模型</h4>
          <p className="text-xs text-slate-600">如 Emu，使用 LLM 输出作为扩散模型的条件。但严格来说，视觉生成由外部模型完成，LLM 本身<strong>不具备直接生成图像的能力</strong>。</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <h4 className="font-bold text-sm text-slate-700 mb-2">思路二：统一 Transformer</h4>
          <p className="text-xs text-slate-600">如 Chameleon，使用<strong>单一视觉编码器</strong>同时服务理解和生成。但不同任务对特征粒度的需求不同，导致<strong>性能妥协</strong>。</p>
        </div>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-red-50 p-6 rounded-xl border border-red-100">
        <div className="flex items-center gap-2 mb-4 text-red-700 font-bold">
          <XCircle size={24} />
          <h3>单一编码器的本质冲突</h3>
        </div>
        <p className="text-sm text-slate-700 mb-4">
          多模态理解和视觉生成对<strong>特征表示的需求</strong>截然不同：
        </p>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded border border-red-200">
            <div className="flex items-center gap-2 text-blue-700 font-bold text-sm mb-2">
              <Eye size={16} /> 理解任务 (Understanding)
            </div>
            <ul className="list-disc pl-4 text-xs text-slate-600 space-y-1">
              <li>需要<strong>高层语义信息</strong> (High-level semantics)</li>
              <li>关注"这是什么"、"在做什么"等抽象概念</li>
              <li>不太关心像素级的细节（如纹理、边缘）</li>
              <li>涉及复杂的<strong>语义推理</strong></li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded border border-red-200">
            <div className="flex items-center gap-2 text-purple-700 font-bold text-sm mb-2">
              <Image size={16} /> 生成任务 (Generation)
            </div>
            <ul className="list-disc pl-4 text-xs text-slate-600 space-y-1">
              <li>需要<strong>低层细节信息</strong> (Low-level details)</li>
              <li>关注纹理、边缘、精确的空间结构</li>
              <li>需要能够<strong>重建原始像素</strong>的编码</li>
              <li>要求细粒度的空间表达能力</li>
            </ul>
          </div>
        </div>
        <p className="text-xs text-red-600 mt-4 italic">
          <strong>结论：</strong> 将这两种需求统一到同一个表示空间中会产生冲突，往往导致理解性能显著下降。
        </p>
      </div>

      <div className="bg-green-50 p-6 rounded-xl border border-green-100">
        <div className="flex items-center gap-2 mb-4 text-green-700 font-bold">
          <CheckCircle size={24} />
          <h3>Janus 的解决方案：解耦</h3>
        </div>
        <p className="text-sm text-slate-700 mb-4">
          Janus 提出<strong>解耦视觉编码（Decoupling Visual Encoding）</strong>策略：
        </p>
        <div className="bg-white p-4 rounded border border-green-200 text-sm mb-4">
          <strong>双路径策略：</strong>
          <ul className="list-disc pl-4 mt-2 space-y-2 text-slate-600">
            <li>
              <strong className="text-blue-700">理解路径：</strong> 使用 <code className="bg-blue-100 px-1 rounded">SigLIP</code> 编码器
              <p className="text-xs text-slate-500 mt-1">提取高维语义特征，擅长图文对齐</p>
            </li>
            <li>
              <strong className="text-purple-700">生成路径：</strong> 使用 <code className="bg-purple-100 px-1 rounded">VQ Tokenizer</code>
              <p className="text-xs text-slate-500 mt-1">将图像编码为离散 ID 序列，保留空间细节</p>
            </li>
            <li>
              <strong className="text-slate-700">统一处理：</strong> 两个路径的输出都投影到同一个 LLM 的输入空间
            </li>
          </ul>
        </div>
        <InfoBox color="green" title="核心优势">
          <ul className="list-disc list-inside space-y-1">
            <li>消除了特征粒度的冲突</li>
            <li>两项任务都能使用最适合的编码方式</li>
            <li>框架高度灵活，易于扩展</li>
          </ul>
        </InfoBox>
      </div>
    </div>

    {/* 扩展性 */}
    <div className="bg-teal-50 p-6 rounded-xl border border-teal-200">
      <h3 className="font-bold text-teal-800 mb-3 flex items-center gap-2">
        <Zap size={18} /> 扩展性：面向未来的架构设计
      </h3>
      <p className="text-sm text-slate-700 mb-3">
        解耦策略不仅解决了当前问题，还为模型的<strong>未来扩展</strong>提供了便利：
      </p>
      <div className="flex flex-wrap gap-2">
        {['点云 (Point Cloud)', 'EEG 信号', '音频 (Audio)', '视频 (Video)', '触觉数据'].map((item, i) => (
          <span key={i} className="px-3 py-1 bg-white rounded-full text-xs text-teal-700 border border-teal-200">{item}</span>
        ))}
      </div>
      <p className="text-xs text-teal-600 mt-3 italic">
        每种新模态只需添加独立的编码器，然后统一由 Transformer 处理，无需修改核心架构。
      </p>
    </div>
  </div>
);

const ArchitectureSection = () => (
  <div className="space-y-8">
    <h2 className="text-2xl font-bold text-slate-800 border-b pb-4">Janus 架构详解</h2>
    
    {/* 架构图 */}
    <div className="bg-slate-100 p-8 rounded-xl">
      <h4 className="text-center font-bold text-slate-600 mb-6 text-sm">Janus 整体架构</h4>
      <div className="w-full max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        {/* 顶部：统一 Transformer */}
        <div className="bg-slate-800 text-white p-4 rounded-lg mb-6 text-center">
          <h4 className="font-bold">统一 Transformer (Unified LLM)</h4>
          <p className="text-xs text-slate-300 mt-1">DeepSeek-LLM-1.3B · 自回归预测下一个 Token</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch">
          {/* Understanding Path */}
          <div className="flex-1 flex flex-col items-center">
            <div className="w-full bg-blue-50 border border-blue-200 rounded-lg p-4 mb-2">
              <div className="text-center">
                <div className="bg-blue-600 text-white p-2 rounded-lg text-sm font-bold mb-2">
                  Understanding Encoder
                </div>
                <span className="text-xs bg-blue-100 px-2 py-0.5 rounded text-blue-700">SigLIP-L/16-384</span>
              </div>
              <ArrowRight className="rotate-90 text-blue-300 mx-auto my-2" size={20} />
              <div className="bg-blue-500 text-white p-2 rounded text-xs text-center">
                Understanding Adaptor (MLP)
              </div>
            </div>
            <div className="text-xs text-blue-600 font-medium">↑ 高维语义特征</div>
            <div className="mt-2 bg-blue-100 text-blue-800 p-2 rounded text-xs text-center">
              输入图像 (理解)
            </div>
          </div>

          {/* Text Path */}
          <div className="flex-1 flex flex-col items-center">
            <div className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 mb-2">
              <div className="text-center">
                <div className="bg-slate-700 text-white p-2 rounded-lg text-sm font-bold mb-2">
                  Text Tokenizer
                </div>
                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-600">标准 LLM 词表</span>
              </div>
              <div className="h-12"></div>
            </div>
            <div className="text-xs text-slate-600 font-medium">↑ 文本 Embeddings</div>
            <div className="mt-2 bg-slate-100 text-slate-800 p-2 rounded text-xs text-center">
              文本指令
            </div>
          </div>

          {/* Generation Path */}
          <div className="flex-1 flex flex-col items-center">
            <div className="w-full bg-purple-50 border border-purple-200 rounded-lg p-4 mb-2">
              <div className="text-center">
                <div className="bg-purple-600 text-white p-2 rounded-lg text-sm font-bold mb-2">
                  Generation Encoder
                </div>
                <span className="text-xs bg-purple-100 px-2 py-0.5 rounded text-purple-700">VQ Tokenizer</span>
              </div>
              <ArrowRight className="rotate-90 text-purple-300 mx-auto my-2" size={20} />
              <div className="bg-purple-500 text-white p-2 rounded text-xs text-center">
                Generation Adaptor (MLP)
              </div>
            </div>
            <div className="text-xs text-purple-600 font-medium">↑ 离散图像 ID 序列</div>
            <div className="mt-2 bg-purple-100 text-purple-800 p-2 rounded text-xs text-center">
              输入/输出图像 (生成)
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* 组件详解 */}
    <h3 className="text-xl font-bold text-slate-800">核心组件详解</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ComponentCard 
        title="Understanding Encoder" 
        tech="SigLIP-Large-Patch16-384"
        desc="负责提取图像的宏观语义。SigLIP 是一种类似 CLIP 的视觉-语言对比学习模型，使用 Sigmoid 损失替代 Softmax，更擅长图文对齐任务。"
        color="blue"
        details={[
          "输入分辨率: 384×384",
          "Patch Size: 16×16",
          "输出: 576 个 token (24×24)",
          "特征维度: 高维语义表示"
        ]}
      />
      <ComponentCard 
        title="Generation Encoder" 
        tech="VQ Tokenizer (from LlamaGen)"
        desc="将图像编码为离散的 Codebook ID 序列。VQ (Vector Quantization) 方法能够保留重建图像所需的空间细节信息。"
        color="purple"
        details={[
          "来源: LlamaGen 预训练模型",
          "Codebook 大小: 16384",
          "下采样率: 16×",
          "输出: 576 个离散 ID (24×24)"
        ]}
      />
      <ComponentCard 
        title="Unified LLM" 
        tech="DeepSeek-LLM-1.3B"
        desc="所有模态的特征最终都被映射到 LLM 的输入空间。LLM 负责自回归地预测下一个 token（无论是文本还是图像代码）。"
        color="slate"
        details={[
          "参数量: 1.3B",
          "架构: Decoder-only Transformer",
          "统一处理: 文本 + 视觉理解 + 视觉生成"
        ]}
      />
      <ComponentCard 
        title="Adaptors (适配器)" 
        tech="MLP Layers"
        desc="连接编码器与 LLM 的桥梁。将不同编码器的输出投影到 LLM 的输入维度，实现模态对齐。"
        color="green"
        details={[
          "Understanding Adaptor: 2层 MLP",
          "Generation Adaptor: 2层 MLP",
          "Image Head: 预测 VQ Token ID"
        ]}
      />
    </div>

    {/* 关键设计决策 */}
    <InfoBox title="关键设计决策" color="yellow">
      <ul className="space-y-2">
        <li>
          <strong>为什么选择 SigLIP？</strong>
          <p className="text-xs text-slate-600 mt-1">SigLIP 使用 Sigmoid 损失进行对比学习，避免了 Softmax 的全局归一化，在图文对齐任务上表现更好，且训练更稳定。</p>
        </li>
        <li>
          <strong>为什么选择 VQ Tokenizer？</strong>
          <p className="text-xs text-slate-600 mt-1">VQ 方法将图像编码为离散 ID，与 LLM 的 token 预测范式天然兼容。来自 LlamaGen 的预训练 VQ Tokenizer 已经证明了其强大的重建能力。</p>
        </li>
        <li>
          <strong>为什么不共享编码器？</strong>
          <p className="text-xs text-slate-600 mt-1">理解需要高层语义，生成需要低层细节。强迫两者共享同一编码器会导致特征空间的冲突，论文通过消融实验证明了解耦的优越性。</p>
        </li>
      </ul>
    </InfoBox>
  </div>
);

const FormulasSection = () => (
  <div className="space-y-10">
    <h2 className="text-2xl font-bold text-slate-800 border-b pb-4">关键公式详解</h2>

    {/* Formula 1: Training Objective */}
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
        <h3 className="font-bold text-slate-700">1. 统一训练目标 (Autoregressive Loss)</h3>
        <span className="text-xs bg-blue-100 px-2 py-1 rounded text-blue-700">核心公式</span>
      </div>
      <div className="p-6">
        <p className="text-slate-600 mb-4">
          Janus 是一个<strong>纯粹的自回归模型</strong>。无论是理解任务（输出文本）还是生成任务（输出图像ID），都统一使用<strong>交叉熵损失函数</strong>进行下一个 Token 预测：
        </p>
        <div className="bg-blue-50 py-6 rounded-lg border border-blue-100 overflow-x-auto">
          <div className="text-center">
            <BlockMath math="\mathcal{L} = -\sum_{i=1}^N \log P_{\theta}(x_i | x_{<i})" />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3 text-sm">
            <h4 className="font-semibold text-slate-900">变量解析：</h4>
            <ul className="space-y-2 text-slate-600">
              <li className="flex gap-2 items-start">
                <span className="font-mono font-bold bg-slate-100 px-2 py-0.5 rounded text-xs"><InlineMath math="x" /></span>
                <span>整个输入序列（图像特征 + 文本 / 文本 + 图像ID）</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="font-mono font-bold bg-slate-100 px-2 py-0.5 rounded text-xs"><InlineMath math="x_i" /></span>
                <span>当前需要预测的目标 Token</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="font-mono font-bold bg-slate-100 px-2 py-0.5 rounded text-xs"><InlineMath math="x_{<i}" /></span>
                <span>之前的所有上下文</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="font-mono font-bold bg-slate-100 px-2 py-0.5 rounded text-xs"><InlineMath math="\theta" /></span>
                <span>模型参数</span>
              </li>
            </ul>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 text-sm mb-2">统一范式的优势</h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• 理解和生成共享同一个训练目标</li>
              <li>• 无需额外的任务特定损失函数</li>
              <li>• 简化了多任务学习的复杂性</li>
              <li>• 便于扩展到更多模态和任务</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    {/* Formula 2: CFG */}
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
        <h3 className="font-bold text-slate-700">2. 无分类器引导 (Classifier-Free Guidance)</h3>
        <span className="text-xs bg-purple-100 px-2 py-1 rounded text-purple-700">推理策略</span>
      </div>
      <div className="p-6">
        <p className="text-slate-600 mb-4">
          在<strong>视觉生成</strong>推理时，为了更好地遵循文本指令，Janus 采用了 <strong>CFG</strong> 策略。这通过混合"有条件预测"和"无条件预测"的 Logits 来增强文本与生成图像的相关性：
        </p>
        <div className="bg-purple-50 py-6 rounded-lg border border-purple-100 overflow-x-auto">
          <div className="text-center">
            <BlockMath math="l_{g} = l_{u} + s \cdot (l_{c} - l_{u})" />
          </div>
        </div>
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3 text-sm">
              <h4 className="font-semibold text-slate-900">变量解析：</h4>
              <ul className="space-y-2 text-slate-600">
                <li className="flex gap-2 items-start">
                  <span className="font-mono font-bold bg-purple-100 px-2 py-0.5 rounded text-xs"><InlineMath math="l_g" /></span>
                  <span><strong>引导后的 Logit</strong> - 最终用于采样</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="font-mono font-bold bg-purple-100 px-2 py-0.5 rounded text-xs"><InlineMath math="l_c" /></span>
                  <span><strong>条件 Logit</strong> - 含文本提示词</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="font-mono font-bold bg-purple-100 px-2 py-0.5 rounded text-xs"><InlineMath math="l_u" /></span>
                  <span><strong>无条件 Logit</strong> - 空文本提示</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="font-mono font-bold bg-purple-100 px-2 py-0.5 rounded text-xs"><InlineMath math="s" /></span>
                  <span><strong>引导尺度</strong> - 默认值 = 5</span>
                </li>
              </ul>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-800 text-sm mb-2">直观理解</h4>
              <p className="text-xs text-purple-700 mb-2">
                可以将 <InlineMath math="l_c - l_u" /> 理解为"<strong>文本提示词带来的影响</strong>"。
              </p>
              <ul className="text-xs text-purple-700 space-y-1">
                <li>• <InlineMath math="s = 1" />：正常采样，无引导</li>
                <li>• <InlineMath math="s > 1" />：放大文本影响，图像更符合描述</li>
                <li>• <InlineMath math="s" /> 过大：可能导致过饱和或失真</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Formula 3: Image Token Sequence */}
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
        <h3 className="font-bold text-slate-700">3. 图像 Token 序列化</h3>
        <span className="text-xs bg-green-100 px-2 py-1 rounded text-green-700">编码方式</span>
      </div>
      <div className="p-6">
        <p className="text-slate-600 mb-4">
          VQ Tokenizer 将 2D 图像编码为 1D 离散序列：
        </p>
        <div className="bg-green-50 py-4 px-6 rounded-lg border border-green-100 overflow-x-auto">
          <div className="text-center">
            <BlockMath math="\text{Image} \xrightarrow{\text{VQ Encoder}} z_{1:N} \in \{1, 2, ..., K\}^N" />
          </div>
        </div>
        <div className="mt-4 text-sm text-slate-600">
          <ul className="space-y-1">
            <li>• <InlineMath math="N = 576" /> (24×24)：token 序列长度</li>
            <li>• <InlineMath math="K = 16384" />：Codebook 大小</li>
            <li>• 采用 raster-scan 顺序（从左到右，从上到下）展平</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const TrainingSection = () => (
  <div className="space-y-8">
    <h2 className="text-2xl font-bold text-slate-800 border-b pb-4">三阶段训练流程</h2>
    
    <p className="text-slate-600">
      Janus 采用渐进式的三阶段训练策略，逐步解锁模型的各项能力：
    </p>

    <div className="relative border-l-4 border-slate-200 ml-4 space-y-8">
      
      {/* Stage 1 */}
      <div className="relative pl-8">
        <span className="absolute -left-[12px] top-0 h-6 w-6 rounded-full bg-blue-500 border-4 border-white flex items-center justify-center text-white text-xs font-bold">1</span>
        <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
          <h3 className="text-lg font-bold text-blue-700 mb-1">Stage I: 适配器与图像头训练</h3>
          <p className="text-sm text-slate-500 mb-4">Training Adaptors and Image Head</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-sm text-slate-700 mb-2">🔒 冻结参数</h4>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• LLM 主体 (DeepSeek-LLM-1.3B)</li>
                <li>• Understanding Encoder (SigLIP)</li>
                <li>• Generation Encoder (VQ Tokenizer)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-slate-700 mb-2">🔓 训练参数</h4>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• Understanding Adaptor</li>
                <li>• Generation Adaptor</li>
                <li>• Image Head (预测 VQ Token ID)</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 bg-white p-3 rounded-lg border border-blue-100 text-xs text-slate-600">
            <strong>目的：</strong> 打通视觉空间与语言空间，让 LLM 初步"看懂"视觉特征，并能"输出"图像 Token。
          </div>
        </div>
      </div>

      {/* Stage 2 */}
      <div className="relative pl-8">
        <span className="absolute -left-[12px] top-0 h-6 w-6 rounded-full bg-purple-500 border-4 border-white flex items-center justify-center text-white text-xs font-bold">2</span>
        <div className="bg-purple-50 p-5 rounded-xl border border-purple-200">
          <h3 className="text-lg font-bold text-purple-700 mb-1">Stage II: 统一预训练</h3>
          <p className="text-sm text-slate-500 mb-4">Unified Pretraining</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-sm text-slate-700 mb-2">🔓 解冻 LLM</h4>
              <p className="text-xs text-slate-600">LLM 主体开始参与训练，学习多模态联合表示。</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-slate-700 mb-2">📊 数据混合</h4>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• 纯文本数据</li>
                <li>• 多模态理解数据 (Image-Text Pairs)</li>
                <li>• 视觉生成数据 (ImageNet, T2I)</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 bg-white p-3 rounded-lg border border-purple-100 text-xs text-slate-600">
            <strong>训练策略：</strong> 先进行简单的 ImageNet 类条件生成，再进行通用的文生图 (Text-to-Image) 训练。这种课程学习有助于模型稳定收敛。
          </div>
        </div>
      </div>

      {/* Stage 3 */}
      <div className="relative pl-8">
        <span className="absolute -left-[12px] top-0 h-6 w-6 rounded-full bg-green-500 border-4 border-white flex items-center justify-center text-white text-xs font-bold">3</span>
        <div className="bg-green-50 p-5 rounded-xl border border-green-200">
          <h3 className="text-lg font-bold text-green-700 mb-1">Stage III: 有监督微调 (SFT)</h3>
          <p className="text-sm text-slate-500 mb-4">Supervised Fine-tuning</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-sm text-slate-700 mb-2">🎯 训练目标</h4>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• 增强指令遵循 (Instruction Following)</li>
                <li>• 提升对话能力</li>
                <li>• 改善生成图像质量</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-slate-700 mb-2">📝 训练数据</h4>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• 问答对 (VQA)</li>
                <li>• 对话数据 (Conversation)</li>
                <li>• 指令生成的图像数据 (T2I SFT)</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 bg-white p-3 rounded-lg border border-green-100 text-xs text-slate-600">
            <strong>训练细节：</strong>
            <ul className="mt-1 space-y-1">
              <li>• 训练除 Generation Encoder 外的所有参数</li>
              <li>• 对 System Prompt 和 User Prompt 进行掩码 (Masking)</li>
              <li>• 只计算模型回复部分的 Loss</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    {/* 训练数据统计 */}
    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
      <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Database size={18} /> 训练数据规模
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
          <p className="text-xs text-slate-500">Stage I</p>
          <p className="font-bold text-slate-800">~10M samples</p>
        </div>
        <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
          <p className="text-xs text-slate-500">Stage II (理解)</p>
          <p className="font-bold text-slate-800">多源 Image-Text</p>
        </div>
        <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
          <p className="text-xs text-slate-500">Stage II (生成)</p>
          <p className="font-bold text-slate-800">ImageNet + T2I</p>
        </div>
        <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
          <p className="text-xs text-slate-500">Stage III</p>
          <p className="font-bold text-slate-800">高质量 SFT 数据</p>
        </div>
      </div>
    </div>
  </div>
);

const AblationSection = () => (
  <div className="space-y-8">
    <h2 className="text-2xl font-bold text-slate-800 border-b pb-4">消融实验：解耦的必要性</h2>
    
    <p className="text-slate-600">
      论文通过严谨的消融实验，验证了<strong>解耦视觉编码</strong>策略的有效性。
    </p>

    {/* 实验设置 */}
    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
      <h3 className="font-bold text-slate-800 mb-4">实验设置：共享 vs 解耦</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border border-red-200">
          <h4 className="font-bold text-red-700 text-sm mb-2">Baseline: 共享编码器</h4>
          <ul className="text-xs text-slate-600 space-y-1">
            <li>• 理解和生成使用同一个 VQ Tokenizer</li>
            <li>• 类似 Chameleon/Show-o 的设计</li>
            <li>• 编码器需要同时满足两种需求</li>
          </ul>
        </div>
        <div className="bg-white p-4 rounded-lg border border-green-200">
          <h4 className="font-bold text-green-700 text-sm mb-2">Janus: 解耦编码器</h4>
          <ul className="text-xs text-slate-600 space-y-1">
            <li>• 理解使用 SigLIP，生成使用 VQ</li>
            <li>• 各取所长，无需妥协</li>
            <li>• 独立编码，统一处理</li>
          </ul>
        </div>
      </div>
    </div>

    {/* 实验结果 */}
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="font-bold text-slate-800 mb-4">消融实验结果</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-4 py-3 text-left font-bold text-slate-700 border-b">设置</th>
              <th className="px-4 py-3 text-center font-bold text-slate-700 border-b">MMBench</th>
              <th className="px-4 py-3 text-center font-bold text-slate-700 border-b">POPE</th>
              <th className="px-4 py-3 text-center font-bold text-slate-700 border-b">GenEval</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-3 text-slate-600">共享 VQ (Baseline)</td>
              <td className="px-4 py-3 text-center text-red-600">~60</td>
              <td className="px-4 py-3 text-center text-red-600">~75</td>
              <td className="px-4 py-3 text-center text-slate-600">~58</td>
            </tr>
            <tr className="bg-green-50">
              <td className="px-4 py-3 font-bold text-green-700">Janus (解耦)</td>
              <td className="px-4 py-3 text-center font-bold text-green-700">69.4</td>
              <td className="px-4 py-3 text-center font-bold text-green-700">87.0</td>
              <td className="px-4 py-3 text-center font-bold text-green-700">61</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-xs text-slate-500 italic">
        * 表中数据来自论文消融实验。解耦策略在理解任务上带来显著提升（+9~12分），同时生成任务也有改善。
      </div>
    </div>

    {/* 关键发现 */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InfoBox title="发现 1：理解性能大幅提升" color="blue">
        <p>
          使用专门的 SigLIP 编码器后，多模态理解任务的性能显著提升。这是因为 SigLIP 的高层语义表示更适合需要推理的理解任务。
        </p>
      </InfoBox>
      <InfoBox title="发现 2：生成性能同步改善" color="purple">
        <p>
          解耦后，生成任务可以使用更适合的 VQ 编码，不再需要向理解任务妥协，因此生成质量也有所提升。
        </p>
      </InfoBox>
    </div>

    <InfoBox title="为什么 VQ 编码器不适合理解任务？" color="yellow">
      <ul className="list-disc list-inside space-y-1">
        <li>VQ Tokenizer 的设计目标是<strong>重建图像</strong>，保留的是低层细节信息</li>
        <li>它没有经过图文对比学习，缺乏<strong>语义对齐</strong>能力</li>
        <li>对于"这是什么"这类问题，像素级细节反而是噪声</li>
        <li>SigLIP 经过大规模图文对比预训练，天然具备语义理解能力</li>
      </ul>
    </InfoBox>
  </div>
);

const ResultsSection = () => (
  <div className="space-y-8">
    <h2 className="text-2xl font-bold text-slate-800 border-b pb-4">实验结果与性能对比</h2>
    
    <p className="text-slate-600">
      Janus (1.3B) 在多模态理解和视觉生成两个领域都展现了<strong>超越预期</strong>的性能，证明了解耦策略的有效性。
    </p>

    {/* 理解任务结果 */}
    <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
      <h3 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
        <Eye size={20} /> 多模态理解 (Understanding) 性能
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm bg-white rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-100">
              <th className="px-4 py-3 text-left font-bold text-blue-800">模型</th>
              <th className="px-4 py-3 text-center font-bold text-blue-800">参数量</th>
              <th className="px-4 py-3 text-center font-bold text-blue-800">MMBench</th>
              <th className="px-4 py-3 text-center font-bold text-blue-800">SEED-Bench</th>
              <th className="px-4 py-3 text-center font-bold text-blue-800">POPE</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-3 text-slate-600">Show-o</td>
              <td className="px-4 py-3 text-center text-slate-500">1.3B</td>
              <td className="px-4 py-3 text-center">58.0</td>
              <td className="px-4 py-3 text-center">-</td>
              <td className="px-4 py-3 text-center">73.8</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-3 text-slate-600">Chameleon</td>
              <td className="px-4 py-3 text-center text-slate-500">7B</td>
              <td className="px-4 py-3 text-center">-</td>
              <td className="px-4 py-3 text-center">-</td>
              <td className="px-4 py-3 text-center">-</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-3 text-slate-600">LLaVA-v1.5</td>
              <td className="px-4 py-3 text-center text-slate-500">7B</td>
              <td className="px-4 py-3 text-center">64.3</td>
              <td className="px-4 py-3 text-center">58.6</td>
              <td className="px-4 py-3 text-center">85.9</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-3 text-slate-600">Qwen-VL-Chat</td>
              <td className="px-4 py-3 text-center text-slate-500">7B</td>
              <td className="px-4 py-3 text-center">60.6</td>
              <td className="px-4 py-3 text-center">58.2</td>
              <td className="px-4 py-3 text-center">-</td>
            </tr>
            <tr className="bg-green-50 font-bold">
              <td className="px-4 py-3 text-green-700">Janus (Ours)</td>
              <td className="px-4 py-3 text-center text-green-600">1.3B</td>
              <td className="px-4 py-3 text-center text-green-700">69.4 ✓</td>
              <td className="px-4 py-3 text-center text-green-700">63.7 ✓</td>
              <td className="px-4 py-3 text-center text-green-700">87.0 ✓</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs text-blue-600 mt-3 italic">
        ✓ Janus (1.3B) 在所有理解基准上<strong>超越了 7B 参数量的专用模型</strong>，证明了解耦策略的强大效果。
      </p>
    </div>

    {/* 生成任务结果 */}
    <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
      <h3 className="font-bold text-purple-800 mb-4 flex items-center gap-2">
        <Image size={20} /> 视觉生成 (Generation) 性能
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm bg-white rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-purple-100">
              <th className="px-4 py-3 text-left font-bold text-purple-800">模型</th>
              <th className="px-4 py-3 text-center font-bold text-purple-800">类型</th>
              <th className="px-4 py-3 text-center font-bold text-purple-800">GenEval ↑</th>
              <th className="px-4 py-3 text-center font-bold text-purple-800">COCO FID ↓</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-3 text-slate-600">DALL-E 2</td>
              <td className="px-4 py-3 text-center text-slate-500">Diffusion</td>
              <td className="px-4 py-3 text-center">52%</td>
              <td className="px-4 py-3 text-center">10.39</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-3 text-slate-600">SDXL</td>
              <td className="px-4 py-3 text-center text-slate-500">Diffusion</td>
              <td className="px-4 py-3 text-center">55%</td>
              <td className="px-4 py-3 text-center">-</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-3 text-slate-600">LlamaGen</td>
              <td className="px-4 py-3 text-center text-slate-500">Autoregressive</td>
              <td className="px-4 py-3 text-center">-</td>
              <td className="px-4 py-3 text-center">9.45</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-3 text-slate-600">Show-o</td>
              <td className="px-4 py-3 text-center text-slate-500">Unified</td>
              <td className="px-4 py-3 text-center">53%</td>
              <td className="px-4 py-3 text-center">9.24</td>
            </tr>
            <tr className="bg-green-50 font-bold">
              <td className="px-4 py-3 text-green-700">Janus (Ours)</td>
              <td className="px-4 py-3 text-center text-green-600">Unified</td>
              <td className="px-4 py-3 text-center text-green-700">61% ✓</td>
              <td className="px-4 py-3 text-center text-green-700">8.53 ✓</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs text-purple-600 mt-3 italic">
        ✓ Janus 在语义一致性 (GenEval) 和图像质量 (FID) 上都超越了 DALL-E 2 和 SDXL 等专用生成模型。
      </p>
    </div>

    {/* 可视化对比 */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Activity size={18} className="text-blue-600"/> 理解能力对比
        </h3>
        <div className="space-y-3">
          <ResultBar label="Janus (1.3B)" value={87.0} color="bg-blue-600" text="POPE" />
          <ResultBar label="LLaVA-v1.5 (7B)" value={85.9} color="bg-slate-400" text="POPE" />
          <ResultBar label="Show-o (1.3B)" value={73.8} color="bg-slate-300" text="POPE" />
        </div>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Layers size={18} className="text-purple-600"/> 生成能力对比
        </h3>
        <div className="space-y-3">
          <ResultBar label="Janus" value={61} max={100} color="bg-purple-600" text="GenEval %" />
          <ResultBar label="SDXL" value={55} max={100} color="bg-slate-400" text="GenEval %" />
          <ResultBar label="DALL-E 2" value={52} max={100} color="bg-slate-300" text="GenEval %" />
        </div>
      </div>
    </div>

    {/* 总结 */}
    <InfoBox title="核心结论" color="teal">
      <ul className="list-disc list-inside space-y-1">
        <li><strong>解耦是关键：</strong> 让理解和生成各自使用最适合的编码方式，消除特征空间冲突</li>
        <li><strong>小模型大能力：</strong> 1.3B 参数的 Janus 超越了 7B 专用模型，证明了设计的高效性</li>
        <li><strong>真正的统一：</strong> 不是外挂扩散模型，而是单一 Transformer 同时完成理解和生成</li>
        <li><strong>面向未来：</strong> 高度灵活的架构设计，易于扩展到更多模态</li>
      </ul>
    </InfoBox>
  </div>
);
