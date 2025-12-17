import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Image as ImageIcon, 
  Video, 
  Mic, 
  Cpu, 
  Layers, 
  ArrowRight, 
  ArrowLeft,
  Activity, 
  GitMerge, 
  ShieldAlert, 
  BrainCircuit,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Database,
  Zap
} from 'lucide-react';

// --- Components ---
const Section = ({ id, title, icon: Icon, children, className = "" }) => (
  <section id={id} className={`py-12 md:py-20 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-20 ${className}`}>
    <div className="flex items-center gap-3 mb-8">
      {Icon && <div className="p-3 bg-blue-100 text-blue-600 rounded-xl"><Icon size={28} /></div>}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h2>
    </div>
    {children}
  </section>
);

const Card = ({ title, children, className = "", highlight = false }) => (
  <div className={`bg-white rounded-2xl shadow-sm border ${highlight ? 'border-blue-200 ring-2 ring-blue-50' : 'border-gray-100'} hover:shadow-md transition-shadow duration-300 overflow-hidden ${className}`}>
    {title && <div className={`px-6 py-4 border-b ${highlight ? 'bg-blue-50/50 border-blue-100 text-blue-800' : 'bg-gray-50/50 border-gray-50 text-gray-800'} font-semibold`}>{title}</div>}
    <div className="p-6 text-gray-600 leading-relaxed">
      {children}
    </div>
  </div>
);

const ComparisonTable = ({ headers, rows }) => (
  <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
    <table className="w-full text-left text-sm text-gray-600">
      <thead className="bg-gray-50 text-gray-900 font-semibold">
        <tr>
          {headers.map((h, i) => (
            <th key={i} className="px-4 py-3 border-b border-gray-200 whitespace-nowrap">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {rows.map((row, i) => (
          <tr key={i} className="hover:bg-gray-50/50 transition-colors">
            {row.map((cell, j) => (
              <td key={j} className="px-4 py-3 align-top">
                {typeof cell === 'string' && cell.includes('\n') ? (
                  cell.split('\n').map((line, idx) => <div key={idx} className={idx > 0 ? "mt-1 text-xs text-gray-400" : ""}>{line}</div>)
                ) : cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Accordion = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-200 rounded-xl mb-4 overflow-hidden bg-white">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left font-medium text-gray-800 hover:bg-gray-50 transition-colors"
      >
        <span className="flex items-center gap-2">{title}</span>
        {isOpen ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
      </button>
      {isOpen && (
        <div className="p-4 border-t border-gray-100 text-gray-600 bg-gray-50/30">
          {children}
        </div>
      )}
    </div>
  );
};

// --- Content Data ---
const ArchitectureData = [
  {
    title: "1. 多模态输入编码器 (Input Encoder)",
    content: (
      <>
        <p className="mb-2">将不同模态转换为特征向量：</p>
        <ul className="list-disc pl-4 space-y-1 text-sm">
          <li><strong>视觉:</strong> ViT-G/14, CLIP (ViT-L/14), ResNet。</li>
          <li><strong>音频:</strong> Whisper, HuBERT, BEATs。</li>
          <li><strong>通用编码器:</strong> 如 <span className="font-semibold text-blue-600">ImageBind</span>，致力于将六种模态（图像、文本、音频、深度、热力图、IMU）映射到同一嵌入空间。</li>
        </ul>
      </>
    ),
    icon: <Cpu size={20} />
  },
  {
    title: "2. 特征融合机制 (Feature Fusion)",
    content: (
      <>
        <p className="mb-2">连接编码器与 LLM 的桥梁：</p>
        <ul className="list-disc pl-4 space-y-1 text-sm">
          <li><strong>Linear Layer:</strong> 简单高效（如 LLaVA），保留更多空间信息。</li>
          <li><strong>Q-Former:</strong> 引入可学习的 Query (如 BLIP-2)，压缩视觉 Token 数量，提取最相关的特征。</li>
          <li><strong>Cross-Attention:</strong> 在层级间进行深度交互（如 Flamingo）。</li>
        </ul>
      </>
    ),
    icon: <GitMerge size={20} />
  },
  {
    title: "3. 训练范式 (Training Paradigms)",
    content: (
      <>
        <p className="mb-2">典型的两阶段训练：</p>
        <ol className="list-decimal pl-4 space-y-1 text-sm">
          <li><strong>预训练 (Pre-training):</strong> 使用海量图像-文本对（如 LAION-5B），冻结 LLM 和视觉编码器，仅训练对齐层（Projector）。目标是特征对齐。</li>
          <li><strong>指令微调 (Instruction Tuning):</strong> 使用高质量对话数据，微调 LLM（或使用 LoRA），赋予模型理解复杂指令的能力。</li>
        </ol>
      </>
    ),
    icon: <Database size={20} />
  }
];

// --- Main Component ---
const MLLMComprehensiveReview = () => {
  const [activeTab, setActiveTab] = useState('image');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const NavLink = ({ to, label }) => (
    <button 
      onClick={() => scrollToSection(to)}
      className="text-gray-600 hover:text-blue-600 font-medium transition-colors px-4 py-2 block w-full text-left md:w-auto"
    >
      {label}
    </button>
  );

  // 修复：Tailwind 需要完整的类名，不能动态拼接
  const getTabClasses = (tabId, tabColor) => {
    const colorMap = {
      blue: {
        active: 'bg-blue-600 text-white border-blue-600 shadow-lg scale-105',
        inactive: 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
      },
      purple: {
        active: 'bg-purple-600 text-white border-purple-600 shadow-lg scale-105',
        inactive: 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
      },
      orange: {
        active: 'bg-orange-600 text-white border-orange-600 shadow-lg scale-105',
        inactive: 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
      }
    };
    return activeTab === tabId ? colorMap[tabColor].active : colorMap[tabColor].inactive;
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 selection:bg-blue-100 selection:text-blue-800">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition">
                <ArrowLeft size={20} />
                <span className="hidden sm:inline">返回</span>
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">M</div>
                <span className="font-bold text-xl tracking-tight text-gray-900">MLLM Review</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-1">
              <NavLink to="intro" label="背景" />
              <NavLink to="architecture" label="架构与训练" />
              <NavLink to="tasks" label="核心任务详解" />
              <NavLink to="comparison" label="模型对比" />
              <NavLink to="challenges" label="挑战" />
            </div>
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-600">
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200 absolute w-full shadow-lg">
            <div className="flex flex-col p-4 space-y-2">
              <NavLink to="intro" label="背景" />
              <NavLink to="architecture" label="架构与训练" />
              <NavLink to="tasks" label="核心任务详解" />
              <NavLink to="comparison" label="模型对比" />
              <NavLink to="challenges" label="挑战" />
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 px-4 text-center bg-gradient-to-b from-blue-50 to-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
            arXiv:2408.01319v1 · Comprehensive Review
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            多模态大语言模型综述
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mt-2">
              架构、性能与挑战
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            从 LLaVA 到 Sora，深度解析 MLLM 如何通过模态对齐、指令微调与特征融合，重塑 AI 对图像、视频与音频的理解与生成能力。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => scrollToSection('architecture')} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 flex items-center gap-2">
              深入架构原理 <ArrowRight size={18} />
            </button>
            <button onClick={() => scrollToSection('comparison')} className="bg-white text-gray-700 border border-gray-200 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
              查看模型对比
            </button>
          </div>
        </div>
      </header>

      {/* Introduction */}
      <Section id="intro" title="引言与核心概念" icon={BookOpen}>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-br from-white to-blue-50/50">
            <h3 className="text-xl font-bold text-gray-900 mb-4">为什么需要 MLLM?</h3>
            <p className="mb-4 text-gray-700">
              现实世界的数据是多模态的（文本、图像、声音同步）。传统的单模态模型无法处理复杂的交互任务。
            </p>
            <p className="text-gray-700">
              <strong>MLLM (Multimodal Large Language Models)</strong> 的核心思想是利用 LLM 强大的推理能力作为"大脑"，通过适配器将其他模态的数据映射到 LLM 的文本空间，从而实现统一的理解和生成。
            </p>
          </Card>
          <Card>
            <h3 className="text-xl font-bold text-gray-900 mb-4">关键任务概览</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="mt-1 bg-green-100 p-1.5 rounded text-green-700"><ImageIcon size={16} /></div>
                <div>
                  <div className="font-semibold">视觉 (Vision)</div>
                  <div className="text-sm text-gray-600">细粒度识别、视觉问答 (VQA)、图像描述、目标定位 (Grounding)。</div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="mt-1 bg-purple-100 p-1.5 rounded text-purple-700"><Video size={16} /></div>
                <div>
                  <div className="font-semibold">视频 (Video)</div>
                  <div className="text-sm text-gray-600">时空动作识别、长视频理解、视频生成 (Video Generation)。</div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="mt-1 bg-orange-100 p-1.5 rounded text-orange-700"><Mic size={16} /></div>
                <div>
                  <div className="font-semibold">音频 (Audio)</div>
                  <div className="text-sm text-gray-600">语音识别 (ASR)、语音合成 (TTS)、通用音频理解。</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Architecture */}
      <Section id="architecture" title="架构原理与训练策略" icon={Layers}>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {ArchitectureData.map((item, index) => (
            <Card key={index} title={item.title} className="h-full" highlight={index === 2}>
              <div className="mb-4 text-blue-600">{item.icon}</div>
              {item.content}
            </Card>
          ))}
        </div>
        
        <div className="bg-gray-900 rounded-3xl p-8 text-white shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <BrainCircuit size={200} />
          </div>
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Activity size={24} className="text-green-400" />
            端到端训练流程详解
          </h3>
          <div className="space-y-8 relative z-10">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4">
                <div className="font-bold text-green-400 mb-1">Step 1: 模态对齐</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Feature Alignment</div>
              </div>
              <div className="md:w-3/4 bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                <p className="text-gray-300 text-sm mb-2">
                  <span className="font-mono text-yellow-400">冻结 (Frozen):</span> LLM, Visual Encoder <br/>
                  <span className="font-mono text-green-400">训练 (Trainable):</span> Projector (e.g., Linear, Q-Former)
                </p>
                <p className="text-gray-400 text-xs">
                  目标：让图像特征 V<sub>image</sub> 在 LLM 看来就像文本特征 V<sub>text</sub>。使用大量图文对（如 CC3M, LAION）。
                </p>
              </div>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4">
                <div className="font-bold text-blue-400 mb-1">Step 2: 指令微调</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Instruction Tuning</div>
              </div>
              <div className="md:w-3/4 bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                <p className="text-gray-300 text-sm mb-2">
                  <span className="font-mono text-yellow-400">冻结 (Frozen):</span> Visual Encoder <br/>
                  <span className="font-mono text-green-400">训练 (Trainable):</span> LLM (Full or LoRA), Projector
                </p>
                <p className="text-gray-400 text-xs">
                  目标：增强对话和遵循指令的能力。使用高质量指令数据（如 LLaVA-Instruct, ShareGPT）。
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Tasks Detail */}
      <Section id="tasks" title="核心任务与代表模型" icon={BrainCircuit}>
        <div className="flex flex-wrap gap-3 mb-8">
          {[
            { id: 'image', label: '图像任务 (Image)', icon: ImageIcon, color: 'blue' },
            { id: 'video', label: '视频任务 (Video)', icon: Video, color: 'purple' },
            { id: 'audio', label: '音频任务 (Audio)', icon: Mic, color: 'orange' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 border ${getTabClasses(tab.id, tab.color)}`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm min-h-[500px]">
          {activeTab === 'image' && (
            <div className="space-y-8">
              <div className="flex items-center gap-4 bg-blue-50 p-4 rounded-xl border border-blue-100">
                <Database className="text-blue-600" />
                <div className="text-sm text-gray-700">
                  <strong>关键数据集：</strong> COCO, Visual Genome, LAION-5B, LLaVA-Instruct-150K.
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
                    图像理解模型详解
                  </h3>
                  
                  <Accordion title="LLaVA 系列演进 (LLaVA Evolution)" defaultOpen={true}>
                    <div className="space-y-3 text-sm">
                      <p><strong>LLaVA:</strong> 简单的线性投影层 (Linear Projection)，验证了将视觉特征直接映射到 LLM 的有效性。</p>
                      <p><strong>LLaVA-1.5:</strong> 引入了 MLP 投影层（两层），大幅提升了性能；使用了更高分辨率的输入 (336px)；整合了学术任务数据 (VQA, OCR)。</p>
                      <p><strong>LLaVA-NeXT (1.6):</strong> 支持动态高分辨率（AnyRes），进一步增强逻辑推理和 OCR 能力。</p>
                    </div>
                  </Accordion>
                  <Accordion title="Qwen-VL & Grounding">
                    <div className="space-y-2 text-sm">
                      <p><strong>特点：</strong> Qwen-VL 不仅能描述图像，还能进行<strong>视觉定位 (Visual Grounding)</strong>。</p>
                      <p>它通过引入特殊的 &lt;box&gt; 和 &lt;ref&gt; 标记，使模型能够输出边界框坐标，从而精确定位图中的物体。</p>
                    </div>
                  </Accordion>
                  <Accordion title="MiniGPT-4">
                    <div className="space-y-2 text-sm">
                      <p><strong>创新：</strong> 使用了 Vicuna LLM 和 BLIP-2 的视觉编码器。</p>
                      <p><strong>发现：</strong> 仅使用预训练数据会导致生成内容不仅流畅但充满幻觉。第二阶段使用少量高质量对话数据的微调对于消除幻觉至关重要。</p>
                    </div>
                  </Accordion>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-2 h-8 bg-cyan-500 rounded-full"></span>
                    图像生成与编辑
                  </h3>
                  
                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 mb-4">
                    <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-2">
                      <Zap size={16} className="text-yellow-500" />
                      生成式 MLLM (Generative MLLMs)
                    </h4>
                    <p className="text-sm text-gray-600">
                      传统的生成模型（如 Stable Diffusion）通常与理解模型是分离的。
                      <br/>
                      <strong>最新趋势 (如 MM-Interleaved, Emu):</strong> 尝试在一个模型中同时实现"理解"和"生成"。
                      <br/>
                      <span className="block mt-2 font-medium text-gray-700">关键技术：</span>
                      将图像生成任务视为"预测视觉 Token"，或使用扩散解码器 (Diffusion Decoder) 接收 LLM 的输出嵌入。
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                      <h5 className="font-bold text-gray-800">CogView & CogCom</h5>
                      <p className="text-xs text-gray-500 mt-1">强调详细的指令遵循和多轮图像编辑能力。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'video' && (
            <div className="space-y-8">
               <div className="flex items-center gap-4 bg-purple-50 p-4 rounded-xl border border-purple-100">
                <Database className="text-purple-600" />
                <div className="text-sm text-gray-700">
                  <strong>关键数据集：</strong> WebVid-2M, MSRVTT, ActivityNet, VideoChat-Instruct.
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">视频理解挑战与方案</h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    视频理解的难点在于<strong>时空建模 (Spatial-Temporal Modeling)</strong>。模型不仅要看懂每一帧，还要理解帧之间的因果和时间关系。
                  </p>
                  
                  <Accordion title="Video-LLaMA (多模态分支)" defaultOpen={true}>
                    <p className="text-sm">
                      <strong>双分支设计：</strong>
                      <br/>1. <strong>视觉分支：</strong> 提取帧特征，使用 Video Q-Former 聚合时间信息。
                      <br/>2. <strong>音频分支：</strong> 使用 ImageBind 编码音频，通过 Audio Q-Former 对齐。
                      <br/>这使得模型能同时"看"和"听"视频。
                    </p>
                  </Accordion>
                  
                  <Accordion title="Video-ChatGPT & VideoChat2">
                    <p className="text-sm mb-2">
                      <strong>Video-ChatGPT:</strong> 利用时空注意力机制 (Spatial-Temporal Attention) 处理视频序列。
                    </p>
                    <p className="text-sm">
                      <strong>VideoChat2:</strong> 提出了渐进式多阶段训练，从图像理解迁移到视频理解，使用了更丰富的指令微调数据 (MVBench)。
                    </p>
                  </Accordion>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">视频生成 (Video Generation)</h3>
                  
                  <div className="bg-gray-900 text-white p-5 rounded-2xl mb-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-20"><Video size={64} /></div>
                    <h4 className="font-bold text-lg mb-2">Sora & World Models</h4>
                    <p className="text-sm text-gray-300">
                      Sora (OpenAI) 展示了惊人的长视频一致性。它采用了 <strong>DiT (Diffusion Transformer)</strong> 架构。
                      <br/>
                      <strong>核心概念：</strong> 将视频压缩为 Spacetime Patches (时空补丁)，像处理文本 Token 一样处理视频补丁。这被认为是构建"世界模型"的一步。
                    </p>
                  </div>
                  <div className="border border-gray-200 p-4 rounded-xl">
                    <h5 className="font-bold text-gray-800">NeXT-GPT (Any-to-Any)</h5>
                    <p className="text-sm text-gray-600 mt-2">
                      真正的全能选手。输入和输出均可是任意模态。
                      <br/><strong>技术点：</strong> 使用了模态特定的解码器 (如 Stable Diffusion, AudioLDM)，并通过 LLM 输出的控制信号来调度这些解码器。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'audio' && (
            <div className="space-y-8">
              <div className="flex items-center gap-4 bg-orange-50 p-4 rounded-xl border border-orange-100">
                <Database className="text-orange-600" />
                <div className="text-sm text-gray-700">
                  <strong>关键数据集：</strong> LibriSpeech, AudioSet, WavCaps, GigaSpeech.
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">音频理解与多任务学习</h3>
                  
                  <Card title="Qwen-Audio" className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>通用音频理解：</strong> 不仅做语音识别 (ASR)，还能识别环境音、音乐等。
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>多任务训练：</strong> 涵盖 30+ 任务。通过统一的标签格式解决不同数据集的冲突。
                    </p>
                  </Card>
                  
                  <Card title="SALMONN">
                    <p className="text-sm text-gray-600">
                      <strong>双编码器架构：</strong> 同时使用 Whisper (主要用于语音) 和 BEATs (主要用于非语音音频) 编码器。这使得模型具有"通用听觉能力"，能理解语音中的背景音。
                    </p>
                  </Card>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">音频生成与交互</h3>
                  
                  <Accordion title="SpeechGPT: 模态链技术" defaultOpen={true}>
                    <p className="text-sm mb-2">
                      <strong>Chain-of-Modality:</strong> SpeechGPT 提出了一种独特的指令微调策略。
                    </p>
                    <p className="text-sm text-gray-600">
                      它通过<strong>离散单元 (Discrete Units)</strong> 将语音离散化，使其能像文本 Token 一样被 LLM 预测。模型先生成文本思考，再生成语音单元，实现了内在的跨模态思考能力。
                    </p>
                  </Accordion>
                  <Accordion title="AudioPaLM">
                    <p className="text-sm">
                      Google 的工作。将文本 Token 和音频 Token 混合在一个 Transformer 解码器中训练。能够实现高质量的语音到语音翻译 (S2ST)，并保留说话人的音色。
                    </p>
                  </Accordion>
                </div>
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* Comparison */}
      <Section id="comparison" title="模型横向对比数据" icon={Activity}>
        <div className="space-y-10">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <ImageIcon size={20} className="text-blue-500" /> 
              图像 MLLM 详细对比 (Based on Table I)
            </h3>
            <ComparisonTable 
              headers={['模型', '发布时间', '基座 LLM', '视觉编码器', '对齐模块', '训练硬件']}
              rows={[
                ['MiniGPT-4', '2023.4', 'Vicuna (7B/13B)', 'ViT-G/14 + Q-Former', 'Linear Layer', '8× A100'],
                ['LLaVA-1.5', '2023.10', 'Vicuna-1.5', 'CLIP ViT-L/336px', 'MLP (2-layer)', '8× A100'],
                ['InstructBLIP', '2023.5', 'FlanT5 / Vicuna', 'ViT-G/14', 'Q-Former', '16× A100'],
                ['Qwen-VL-Chat', '2023.8', 'Qwen-7B', 'CLIP ViT-L/14', 'Cross-Attention', '-'],
                ['Yi-VL', '2024.1', 'Yi-34B', 'CLIP ViT-L/14', 'Linear Layer', '128× A100'],
              ]}
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Video size={20} className="text-purple-500" />
              视频 MLLM 详细对比 (Based on Table II)
            </h3>
            <ComparisonTable 
              headers={['模型', '语言模型', '视觉/音频模型', '对齐模块', '关键数据集']}
              rows={[
                ['Video-LLaMA', 'Vicuna', 'ImageBind + BLIP-2', 'Q-Former', 'Webvid-2M, CC595K'],
                ['VideoChat2', 'Vicuna', 'UMT-L', 'Q-Former', 'MVBench, WebVid'],
                ['PandaGPT', 'Vicuna', 'ImageBind', 'Linear Layer', 'LLaVA data'],
                ['NeXT-GPT', 'Vicuna', 'ImageBind', 'Linear (Projection)', 'MosIT (自建)'],
              ]}
            />
          </div>
        </div>
      </Section>

      {/* Challenges */}
      <Section id="challenges" title="当前局限性与未来展望" icon={ShieldAlert}>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card title="幻觉问题 (Hallucination)" className="bg-red-50/50 border-red-100">
            <p className="text-sm text-gray-700">
              模型经常"看到"图片中不存在的物体。这源于预训练数据中的噪音以及 LLM 自身的幻觉倾向。
              <br/><strong>解决方向：</strong> RLHF (基于人类反馈的强化学习), DPO。
            </p>
          </Card>
          
          <Card title="计算成本 (Computational Cost)" className="bg-orange-50/50 border-orange-100">
            <p className="text-sm text-gray-700">
              处理高分辨率图像和长视频需要极长的 Context Window。训练 Yi-VL 这样的模型需要 128 张 A100 GPU。
              <br/><strong>解决方向：</strong> 稀疏注意力机制, Token 压缩。
            </p>
          </Card>
          <Card title="解释性 (Interpretability)" className="bg-yellow-50/50 border-yellow-100">
            <p className="text-sm text-gray-700">
              跨模态融合是一个"黑盒"。我们难以得知模型是真正"理解"了视频，还是仅仅利用了文本偏见。
            </p>
          </Card>
          <Card title="安全与伦理 (Safety)" className="bg-blue-50/50 border-blue-100">
            <p className="text-sm text-gray-700">
              生成的 Deepfake 内容难以辨别。多模态越狱 (Jailbreak) 攻击（如通过图片隐藏恶意指令）也是新威胁。
            </p>
          </Card>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 mb-2">Based on the paper</p>
          <h4 className="text-lg font-bold text-gray-900 mb-4">A Comprehensive Review of Multimodal Large Language Models</h4>
          <p className="text-sm text-gray-400">
            Performance and Challenges Across Different Tasks • 2024
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MLLMComprehensiveReview;














