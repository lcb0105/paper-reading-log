import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Layers, Code, Activity, GitBranch, Cpu, ArrowLeft, Zap, Eye, Image, Database, Box, Sparkles, MonitorSmartphone, Brain, AlertTriangle, Target } from 'lucide-react';
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
    pink: "bg-pink-50 border-pink-200 text-pink-800",
    indigo: "bg-indigo-50 border-indigo-200 text-indigo-800",
  };
  return (
    <div className={`p-4 rounded-lg border ${colors[color]} my-4`}>
      {title && <strong className="block mb-2">{title}</strong>}
      <div className="text-sm">{children}</div>
    </div>
  );
};

const FeatureCard = ({ title, description, color, icon: Icon }) => {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-100 text-blue-800",
    purple: "bg-purple-50 border-purple-100 text-purple-800",
    green: "bg-green-50 border-green-100 text-green-800",
  };
  const iconColors = {
    blue: "text-blue-600",
    purple: "text-purple-600",
    green: "text-green-600",
  };
  
  return (
    <div className={`p-5 rounded-lg border ${colorClasses[color]} transition-transform hover:-translate-y-1`}>
      {Icon && <Icon className={`${iconColors[color]} mb-3`} size={24} />}
      <h3 className="font-bold mb-2">{title}</h3>
      <p className="text-sm opacity-90">{description}</p>
    </div>
  );
};

const Section = ({ id, children }) => (
  <section id={id} className="scroll-mt-8 mb-16">
    {children}
  </section>
);

// --- Main Component ---
export default function KimiVLPaperDeepDive() {
  const [activeSection, setActiveSection] = useState('overview');

  const navItems = [
    { id: 'overview', label: '核心概览', icon: BookOpen },
    { id: 'architecture', label: '模型架构', icon: Layers },
    { id: 'tech-deep-dive', label: '关键技术', icon: Cpu },
    { id: 'formulas', label: '公式详解', icon: Code },
    { id: 'training', label: '训练流程', icon: GitBranch },
    { id: 'thinking', label: 'Thinking 版本', icon: Brain },
    { id: 'performance', label: '性能表现', icon: Activity },
    { id: 'limitations', label: '局限与展望', icon: AlertTriangle },
  ];

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
      {/* Mobile Back Button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Link to="/" className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-lg text-gray-600 hover:text-blue-600 transition-colors border border-gray-200 shadow-sm">
          <ArrowLeft size={16} />
          返回
        </Link>
      </div>

      {/* Sidebar Navigation */}
      <aside className="hidden md:block fixed left-0 top-0 w-64 h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white overflow-y-auto z-40">
        <div className="p-6 border-b border-slate-700">
          <Link to="/" className="text-slate-400 hover:text-white text-sm flex items-center gap-1 mb-3 transition-colors">
            <ArrowLeft size={14} />
            返回首页
          </Link>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
            Kimi-VL Deep Dive
          </h1>
          <p className="text-xs text-slate-400 mt-2">Moonshot AI 高效 MoE 视觉语言模型</p>
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
          <p className="font-mono">arXiv: 2504.07491v3</p>
          <p className="mt-1">Moonshot AI</p>
          <p className="mt-1">2025-04</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 min-h-screen">
        {/* Hero Header */}
        <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Kimi-VL 技术报告深度解析</h1>
            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              全面解读高效开源混合专家（MoE）视觉语言模型。<br/>
              仅需 2.8B 激活参数，实现卓越的多模态推理、长上下文理解与 Agent 能力。
            </p>
            <div className="mt-8 flex justify-center gap-3 flex-wrap">
              <span className="px-4 py-2 bg-blue-600/20 border border-blue-500 rounded-full text-blue-300 text-sm font-semibold">MoE 架构</span>
              <span className="px-4 py-2 bg-purple-600/20 border border-purple-500 rounded-full text-purple-300 text-sm font-semibold">128K 上下文</span>
              <span className="px-4 py-2 bg-green-600/20 border border-green-500 rounded-full text-green-300 text-sm font-semibold">原生分辨率 MoonViT</span>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-6 py-12">
          
          {/* Section 1: Overview */}
          <Section id="overview">
            <OverviewSection />
          </Section>

          {/* Section 2: Architecture */}
          <Section id="architecture">
            <ArchitectureSection />
          </Section>

          {/* Section 3: Tech Deep Dive */}
          <Section id="tech-deep-dive">
            <TechDeepDiveSection />
          </Section>

          {/* Section 4: Formulas */}
          <Section id="formulas">
            <FormulasSection />
          </Section>

          {/* Section 5: Training */}
          <Section id="training">
            <TrainingSection />
          </Section>

          {/* Section 6: Thinking */}
          <Section id="thinking">
            <ThinkingSection />
          </Section>

          {/* Section 7: Performance */}
          <Section id="performance">
            <PerformanceSection />
          </Section>

          {/* Section 8: Limitations */}
          <Section id="limitations">
            <LimitationsSection />
          </Section>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-slate-200 text-center text-slate-400 text-sm">
            <p>© 2025 基于 Kimi-VL 技术报告 (arXiv:2504.07491v3) 整理</p>
            <p className="mt-1">Moonshot AI</p>
          </footer>
        </div>
      </main>
    </div>
  );
}

// --- Content Sections ---

const OverviewSection = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 border-b pb-4">
      <span className="w-2 h-8 bg-blue-600 rounded"></span>
      核心概览
    </h2>
    
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        Kimi-VL 是 Moonshot AI 团队推出的开源视觉语言模型（VLM）。它通过高效的架构设计，在保持较低计算成本（<strong>激活参数仅 2.8B</strong>）的同时，实现了与旗舰模型相媲美的性能。
      </p>
      <p className="text-sm text-gray-600">
        相比现有的开源 VLM（如 Qwen2.5-VL、Gemma-3），Kimi-VL 采用了更高效、更可扩展的 <strong>MoE 架构</strong>；相比早期 MoE VLM（如 DeepSeek-VL2、Aria），Kimi-VL 在架构创新、能力覆盖和长链推理方面都有显著突破。
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-4">
      <FeatureCard 
        title="更加聪明 (Smart)"
        description="在 MMMU、MathVista、OSWorld 等多模态推理和 Agent 任务上表现强劲，媲美 GPT-4o-mini 等前沿模型。"
        color="blue"
        icon={Sparkles}
      />
      <FeatureCard 
        title="处理更长 (Long)"
        description="支持 128K 上下文窗口，在 LongVideoBench (64.5) 和 MMLongBench-Doc (35.1) 上显著领先同规模模型。"
        color="purple"
        icon={Database}
      />
      <FeatureCard 
        title="看得更清 (Clear)"
        description="MoonViT 原生分辨率编码器支持超高分辨率输入，InfoVQA 83.2、ScreenSpot-Pro 34.5 均超越 GPT-4o。"
        color="green"
        icon={Eye}
      />
    </div>

    {/* 模型规格 */}
    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
      <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Box size={18} /> 模型规格一览
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
          <p className="text-xs text-slate-500">LLM 总参数</p>
          <p className="font-bold text-slate-800">16B</p>
        </div>
        <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
          <p className="text-xs text-slate-500">LLM 激活参数</p>
          <p className="font-bold text-blue-600">2.8B</p>
        </div>
        <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
          <p className="text-xs text-slate-500">上下文长度</p>
          <p className="font-bold text-slate-800">128K</p>
        </div>
        <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
          <p className="text-xs text-slate-500">Vision Encoder</p>
          <p className="font-bold text-slate-800">MoonViT 400M</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-4">
        <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
          <p className="text-xs text-slate-500">MoonViT 初始化</p>
          <p className="font-bold text-slate-800">SigLIP-SO-400M</p>
        </div>
        <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
          <p className="text-xs text-slate-500">LLM 基座</p>
          <p className="font-bold text-slate-800">Moonlight MoE</p>
        </div>
        <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
          <p className="text-xs text-slate-500">位置编码</p>
          <p className="font-bold text-slate-800">2D RoPE</p>
        </div>
        <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
          <p className="text-xs text-slate-500">最大输入像素</p>
          <p className="font-bold text-purple-600">3.2M (Thinking)</p>
        </div>
      </div>
    </div>

    {/* 版本说明 */}
    <InfoBox title="模型版本说明" color="blue">
      <ul className="space-y-1">
        <li><strong>Kimi-VL-A3B-Instruct</strong>：基础指令微调版本，通用多模态理解</li>
        <li><strong>Kimi-VL-A3B-Thinking</strong>：初版长思维链版本，增强推理能力</li>
        <li><strong>Kimi-VL-A3B-Thinking-2506</strong>：最新版本，整合全部能力 + 更高效推理</li>
      </ul>
    </InfoBox>
  </div>
);

const ArchitectureSection = () => (
  <div className="space-y-8">
    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 border-b pb-4">
      <span className="w-2 h-8 bg-indigo-600 rounded"></span>
      模型架构详解
    </h2>
    
    <div className="grid md:grid-cols-2 gap-8">
      {/* 左侧：文本描述 */}
      <div className="space-y-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold mb-3 text-indigo-700">1. MoonViT 视觉编码器</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm">
            <li><strong>原生分辨率处理：</strong>摒弃了传统的固定分辨率裁剪，使用 NaViT 的 Packing 技术，支持任意比例和分辨率的图片。</li>
            <li><strong>参数量：</strong>400M 参数。</li>
            <li><strong>初始化：</strong>基于 SigLIP-SO-400M，通过 CoCa 风格训练进一步优化。</li>
            <li><strong>2D RoPE：</strong>引入 2D 旋转位置编码替代传统绝对位置编码，增强高分辨率下的空间感知。</li>
            <li><strong>最大输入：</strong>Thinking-2506 版本支持 3.2 million pixels。</li>
          </ul>
        </div>
        
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold mb-3 text-indigo-700">2. MLP 投影层 (Projector)</h3>
          <p className="text-gray-600 text-sm mb-2">连接视觉与语言的桥梁。包含两个关键操作：</p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm">
            <li><strong>Pixel Shuffle：</strong>2x2 的空间下采样，Token 数量减少 75%，通道维度扩展 4 倍。</li>
            <li><strong>两层 MLP：</strong>将视觉特征投影到 LLM 的嵌入空间，实现模态对齐。</li>
          </ul>
        </div>
        
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold mb-3 text-indigo-700">3. MoE 语言模型 (Moonlight)</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm">
            <li><strong>总参数：</strong>16B，采用 Mixture-of-Experts 架构。</li>
            <li><strong>激活参数：</strong>2.8B (仅 17.5% 激活)，推理极为高效。</li>
            <li><strong>架构特点：</strong>类似 DeepSeek-V3 的 MoE 设计，具备强大的语言理解和生成能力。</li>
            <li><strong>纯文本能力：</strong>与同规模纯文本 LLM 性能相当。</li>
          </ul>
        </div>
      </div>

      {/* 右侧：架构示意图 */}
      <div className="bg-slate-100 p-6 rounded-xl border border-dashed border-slate-300 flex flex-col items-center justify-center space-y-4">
        <div className="w-full max-w-xs p-4 bg-green-100 border-2 border-green-500 rounded-lg text-center font-bold text-green-800 shadow-md">
          Input Image (Any Resolution)
          <p className="text-xs font-normal mt-1">支持任意宽高比，无需 Resize/Crop</p>
        </div>
        <div className="text-2xl text-gray-400">↓</div>
        <div className="w-full max-w-xs p-5 bg-white border-2 border-gray-800 rounded-lg text-center shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-bl">2D RoPE</div>
          <h4 className="font-bold text-lg">MoonViT Encoder</h4>
          <p className="text-xs text-gray-500">400M | SigLIP Init | Native Resolution</p>
          <p className="text-xs text-blue-600 mt-1">NaViT Packing: 无 Padding</p>
        </div>
        <div className="text-2xl text-gray-400">↓</div>
        <div className="w-full max-w-xs p-3 bg-indigo-50 border-2 border-indigo-400 rounded-lg text-center font-mono text-sm shadow-md">
          MLP Projector
          <p className="text-xs text-gray-500 font-sans">(Pixel Shuffle 2x2 → Token 数 ÷4)</p>
        </div>
        <div className="text-2xl text-gray-400">↓</div>
        <div className="w-full max-w-xs p-5 bg-gradient-to-br from-purple-100 to-purple-50 border-2 border-purple-600 rounded-lg text-center shadow-xl">
          <h4 className="font-bold text-lg text-purple-900">Moonlight MoE Decoder</h4>
          <p className="text-xs text-purple-700">2.8B Activated / 16B Total</p>
          <p className="text-xs text-gray-600 mt-1">DeepSeek-V3 风格架构</p>
        </div>
      </div>
    </div>

    {/* 2D RoPE 详解 */}
    <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
      <h3 className="text-lg font-bold text-yellow-800 mb-3 flex items-center gap-2">
        <Zap size={18} /> 2D RoPE：高分辨率感知的关键
      </h3>
      <p className="text-sm text-gray-700 mb-3">
        传统 ViT 使用<strong>绝对位置编码</strong>，在处理不同分辨率图像时存在问题。Kimi-VL 引入 <strong>2D 旋转位置编码 (2D RoPE)</strong>：
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border border-yellow-100">
          <h4 className="font-bold text-yellow-700 mb-2">工作原理</h4>
          <p className="text-xs text-gray-600">
            将位置编码分解为<strong>水平 (x)</strong> 和<strong>垂直 (y)</strong> 两个独立的旋转分量，分别应用于 Query/Key 向量的不同维度。
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-yellow-100">
          <h4 className="font-bold text-yellow-700 mb-2">核心优势</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• 天然支持任意分辨率输入</li>
            <li>• 位置编码可外推到更大分辨率</li>
            <li>• 增强细粒度空间感知能力</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const TechDeepDiveSection = () => (
  <div className="space-y-8">
    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 border-b pb-4">
      <span className="w-2 h-8 bg-pink-600 rounded"></span>
      关键技术深度解析
    </h2>
    
    <p className="text-gray-600">
      Kimi-VL 高效处理高分辨率图像和减少计算开销的核心在于两个关键技术：<strong>NaViT 的 Packing 机制</strong> 和 <strong>Pixel Shuffle 下采样</strong>。
    </p>

    <div className="grid md:grid-cols-2 gap-6">
      {/* NaViT Packing */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center mb-4">
          <div className="bg-pink-100 p-2 rounded-lg mr-3">
            <Layers className="w-6 h-6 text-pink-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">1. NaViT Packing (Patch n' Pack)</h3>
        </div>
        
        <h4 className="font-bold text-sm text-gray-500 uppercase tracking-wide mb-2">传统问题 (Traditional ViT)</h4>
        <div className="text-sm text-gray-600 mb-4 bg-gray-50 p-3 rounded">
          传统 ViT 需要将所有图片 Resize 或 Crop 成固定的正方形（如 224x224）。
          <br/><span className="text-red-500">缺点：</span> 破坏长宽比，或者为了凑齐 Batch 引入大量无效的 Padding Token（填充零），浪费计算资源。
        </div>
        
        <h4 className="font-bold text-sm text-pink-600 uppercase tracking-wide mb-2">Kimi-VL 的解决方案</h4>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
          <li><strong>原生切片：</strong>无论图片比例如何，直接切成 Patch（图块）。长图切出的 Patch 多，小图切出的 Patch 少。</li>
          <li><strong>序列打包 (Packing)：</strong>将来自不同图片的所有 Patch 展平，像"俄罗斯方块"一样紧凑地拼接到同一个序列中，直到填满上下文长度。</li>
          <li><strong>无 Padding：</strong>几乎消除了无效的 Padding，计算效率极高，且保持了图片的原始纵横比。</li>
        </ul>
      </div>

      {/* Pixel Shuffle */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center mb-4">
          <div className="bg-indigo-100 p-2 rounded-lg mr-3">
            <Image className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">2. Pixel Shuffle 下采样</h3>
        </div>
        
        <h4 className="font-bold text-sm text-gray-500 uppercase tracking-wide mb-2">核心作用</h4>
        <div className="text-sm text-gray-600 mb-4 bg-gray-50 p-3 rounded">
          将空间维度（分辨率）转化为通道维度（深度）。<br/>
          <strong>结果：</strong>视觉 Token 数量减少 75% (变为 1/4)。
        </div>
        
        <h4 className="font-bold text-sm text-indigo-600 uppercase tracking-wide mb-2">数学变换过程</h4>
        <div className="flex items-center justify-between mb-4 bg-indigo-50 p-4 rounded-lg">
          <div className="text-center">
            <div className="grid grid-cols-2 gap-0.5 w-14 h-14 mx-auto mb-2">
              <div className="bg-blue-500 rounded-sm flex items-center justify-center text-white text-xs font-bold">1</div>
              <div className="bg-blue-500 rounded-sm flex items-center justify-center text-white text-xs font-bold">2</div>
              <div className="bg-blue-500 rounded-sm flex items-center justify-center text-white text-xs font-bold">3</div>
              <div className="bg-blue-500 rounded-sm flex items-center justify-center text-white text-xs font-bold">4</div>
            </div>
            <span className="text-xs text-gray-500">空间: 2x2<br/>通道: C</span>
          </div>
          <div className="text-2xl text-gray-400">→</div>
          <div className="text-center">
            <div className="w-8 h-14 mx-auto bg-purple-500 rounded flex flex-col items-center justify-center mb-2">
              <div className="w-5 h-2 bg-white/30 rounded-sm mb-0.5"></div>
              <div className="w-5 h-2 bg-white/30 rounded-sm mb-0.5"></div>
              <div className="w-5 h-2 bg-white/30 rounded-sm mb-0.5"></div>
              <div className="w-5 h-2 bg-white/30 rounded-sm"></div>
            </div>
            <span className="text-xs text-gray-500">空间: 1x1<br/>通道: 4C</span>
          </div>
        </div>
        
        <div className="text-sm text-gray-700 font-mono bg-gray-100 p-3 rounded border border-gray-200">
          1. 输入: [H, W, C]<br/>
          2. 变形: [H/2, 2, W/2, 2, C]<br/>
          3. 移位: [H/2, W/2, 2, 2, C]<br/>
          4. 合并: [H/2, W/2, 4*C]
        </div>
        <p className="text-xs text-gray-500 mt-2">
          通过将相邻的 2x2 像素块堆叠到通道深度中，图像的长宽各减半，Token 总数变为 <InlineMath math="\frac{H}{2} \times \frac{W}{2} = \frac{HW}{4}" />。
        </p>
      </div>
    </div>
  </div>
);

const FormulasSection = () => (
  <div className="space-y-10">
    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 border-b pb-4">
      <span className="w-2 h-8 bg-red-600 rounded"></span>
      重点公式深度解析
    </h2>
    
    <p className="text-gray-600">
      为了确保模型的多模态对齐能力和推理能力，Kimi-VL 在训练过程中精心设计了损失函数与强化学习目标。以下是对这两大核心公式的详细数学解释。
    </p>

    {/* Formula 1: ViT Training Loss */}
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-yellow-50 px-6 py-4 border-b border-yellow-200">
        <h3 className="text-xl font-bold text-gray-800">1. 视觉-语言对齐损失函数 (ViT Training)</h3>
        <p className="text-sm text-yellow-800 mt-1">
          该公式应用于 ViT 训练阶段，目的是让视觉编码器既能理解图像语义（对比学习），又能生成图像描述（生成学习）。
        </p>
      </div>
      <div className="p-6">
        <div className="bg-slate-50 py-6 rounded-lg border border-slate-200 overflow-x-auto mb-6">
          <div className="text-center">
            <BlockMath math="\mathcal{L} = \mathcal{L}_{siglip} + \lambda \mathcal{L}_{caption}" />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-start gap-3">
              <span className="font-mono font-bold bg-blue-100 px-2 py-1 rounded text-blue-700 text-sm"><InlineMath math="\mathcal{L}_{siglip}" /></span>
              <div>
                <strong className="text-gray-800">Sigmoid Loss for Language Image Pre-Training (SigLIP) 损失</strong>
                <p className="text-sm text-gray-600 mt-1">
                  这是一种改进的对比学习损失。它的作用是拉近匹配的图像-文本对在特征空间中的距离，推远不匹配的对。相比传统的 Softmax 对比损失，SigLIP 使用 Sigmoid 独立处理每个样本对，在大 batch size 下效率更高，更稳定。
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-start gap-3">
              <span className="font-mono font-bold bg-blue-100 px-2 py-1 rounded text-blue-700 text-sm"><InlineMath math="\mathcal{L}_{caption}" /></span>
              <div>
                <strong className="text-gray-800">图像描述生成损失 (Captioning Loss)</strong>
                <p className="text-sm text-gray-600 mt-1">
                  这是一个标准的交叉熵损失（Cross-Entropy Loss）。文本解码器基于图像特征进行"下一个词预测"（Next-Token Prediction）。这赋予了模型细粒度理解图像内容并转化为语言的能力。
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-start gap-3">
              <span className="font-mono font-bold bg-blue-100 px-2 py-1 rounded text-blue-700 text-sm"><InlineMath math="\lambda = 2" /></span>
              <div>
                <strong className="text-gray-800">权重系数</strong>
                <p className="text-sm text-gray-600 mt-1">
                  论文中设定 <InlineMath math="\lambda = 2" />。这意味着在联合优化过程中，模型更加侧重于生成能力的培养（Captioning），这对于后续作为 VLM 的基础至关重要。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Formula 2: RL Objective */}
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-blue-50 px-6 py-4 border-b border-blue-200">
        <h3 className="text-xl font-bold text-gray-800">2. 强化学习优化目标 (RL Objective)</h3>
        <p className="text-sm text-blue-800 mt-1">
          该公式用于 Kimi-VL-Thinking 版本的强化学习阶段。采用了在线策略镜像下降（Online Policy Mirror Descent）算法的变体，旨在通过推理链（CoT）提升模型的解题正确率。
        </p>
      </div>
      <div className="p-6">
        <div className="bg-slate-50 py-6 rounded-lg border border-slate-200 overflow-x-auto mb-6">
          <div className="text-center text-sm md:text-base">
            <BlockMath math="\max_{\theta} \mathbb{E}_{(x, y^*) \sim \mathcal{D}} \left[ \mathbb{E}_{(y, z) \sim \pi_{\theta}} [r(x, y, y^*)] - \tau \text{KL}(\pi_{\theta}(x) \| \pi_{\theta_{i}}(x)) \right]" />
          </div>
        </div>
        
        <h4 className="font-bold text-lg mb-4 text-gray-800">逐步拆解与解释：</h4>
        
        <div className="space-y-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h5 className="font-bold text-green-800 mb-2">最大化期望奖励</h5>
            <div className="bg-white p-3 rounded border border-green-100 font-mono text-sm mb-3 overflow-x-auto">
              <InlineMath math="\mathbb{E}_{(y, z) \sim \pi_{\theta}} [r(x, y, y^*)]" />
            </div>
            <p className="text-sm text-gray-700">
              这里 <InlineMath math="x" /> 是输入问题，<InlineMath math="y^*" /> 是标准答案（Ground Truth）。<InlineMath math="(y, z)" /> 是模型 <InlineMath math="\pi_{\theta}" /> 生成的答案 <InlineMath math="y" /> 和推理过程 <InlineMath math="z" />。
            </p>
            <p className="text-sm text-gray-700 mt-2">
              函数 <InlineMath math="r(x, y, y^*)" /> 是<strong>奖励函数</strong>，取值为 <InlineMath math="\{0, 1\}" />。如果生成的答案 <InlineMath math="y" /> 与标准答案 <InlineMath math="y^*" /> 一致，则奖励为 1，否则为 0。这直接鼓励模型做对题目。
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h5 className="font-bold text-purple-800 mb-2">KL 散度正则化项</h5>
            <div className="bg-white p-3 rounded border border-purple-100 font-mono text-sm mb-3 overflow-x-auto">
              <InlineMath math="- \tau \text{KL}(\pi_{\theta}(x) \| \pi_{\theta_{i}}(x))" />
            </div>
            <p className="text-sm text-gray-700">
              这一项是至关重要的约束。
            </p>
            <ul className="text-sm text-gray-700 mt-2 space-y-1 list-disc list-inside">
              <li><strong>KL(·||·)</strong>：KL 散度，用于衡量当前策略模型 <InlineMath math="\pi_{\theta}" /> 与上一轮迭代的旧策略模型 <InlineMath math="\pi_{\theta_{i}}" /> 之间的分布差异。</li>
              <li><strong><InlineMath math="\tau" /></strong>：正则化系数。</li>
              <li><strong>物理意义</strong>：我们在优化模型以获得更高奖励的同时，不希望模型参数发生剧烈的突变，导致训练崩溃或"遗忘"之前的能力。这个负项起到了"惩罚"作用，强迫新模型不要偏离旧模型太远，保证训练的稳定性（Trust Region）。</li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h5 className="font-bold text-yellow-800 mb-2">长度惩罚（额外机制）</h5>
            <p className="text-sm text-gray-700">
              虽然未直接写在主公式中，但论文提到在 <InlineMath math="r" /> 中还引入了基于长度的奖励惩罚，防止模型为了"看起来像在思考"而生成冗长且无意义的推理链（Overthinking）。
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TrainingSection = () => (
  <div className="space-y-8">
    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 border-b pb-4">
      <span className="w-2 h-8 bg-teal-600 rounded"></span>
      训练流程全景
    </h2>
    
    <div className="relative border-l-4 border-teal-200 ml-4 space-y-10">
      
      {/* Stage 1 */}
      <div className="relative pl-8">
        <span className="absolute -left-[14px] top-0 w-6 h-6 bg-teal-500 rounded-full border-4 border-white"></span>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">1. ViT 训练 (ViT Training)</h3>
          <p className="text-sm text-teal-600 font-semibold mb-2">数据量：~2.1T Tokens</p>
          <p className="text-gray-600 text-sm">
            训练 MoonViT。先使用 Image-Text 对进行 CoCa 风格的训练（2T），然后通过 0.1T 数据将 MoonViT 与 MoE LLM 对齐。
          </p>
        </div>
      </div>
      
      {/* Stage 2 */}
      <div className="relative pl-8">
        <span className="absolute -left-[14px] top-0 w-6 h-6 bg-teal-500 rounded-full border-4 border-white"></span>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">2. 联合预训练 (Joint Pre-training)</h3>
          <p className="text-sm text-teal-600 font-semibold mb-2">数据量：1.4T Tokens</p>
          <p className="text-gray-600 text-sm">
            混合纯文本数据和多模态数据。随着训练进行，逐渐增加多模态数据的比例。保持语言能力的同时注入视觉理解。
          </p>
        </div>
      </div>
      
      {/* Stage 3 */}
      <div className="relative pl-8">
        <span className="absolute -left-[14px] top-0 w-6 h-6 bg-teal-500 rounded-full border-4 border-white"></span>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">3. 联合冷却 (Joint Cooldown)</h3>
          <p className="text-sm text-teal-600 font-semibold mb-2">数据量：0.6T Tokens</p>
          <p className="text-gray-600 text-sm">
            使用高质量数据（合成数据、高质量学术数据）进行微调。这能显著提升数学推理、知识问答和代码能力。
          </p>
        </div>
      </div>
      
      {/* Stage 4 */}
      <div className="relative pl-8">
        <span className="absolute -left-[14px] top-0 w-6 h-6 bg-teal-500 rounded-full border-4 border-white"></span>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">4. 长上下文激活 (Long-context Activation)</h3>
          <p className="text-sm text-teal-600 font-semibold mb-2">上下文：8K → 128K</p>
          <p className="text-gray-600 text-sm mb-3">
            调整 RoPE 的基频。使用长文本、长视频、长文档数据进行训练。
          </p>
          <InfoBox color="teal" title="关于长视频处理">
            模型在这一阶段不仅学习长文本，还通过大量视频数据（Needle-in-a-Haystack 测试）确保视频帧在 128K 窗口内的召回率。NaViT 技术在此处发挥关键作用，确保不同长短的视频帧序列被高效处理。
          </InfoBox>
        </div>
      </div>
      
      {/* Stage 5 */}
      <div className="relative pl-8">
        <span className="absolute -left-[14px] top-0 w-6 h-6 bg-teal-500 rounded-full border-4 border-white"></span>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">5. 后训练 (Post-Training)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <h4 className="font-bold text-teal-700 mb-2">SFT (监督微调)</h4>
              <p className="text-sm text-gray-600">ChatML 格式，增强指令跟随和对话能力。分为 32K 和 128K 两个阶段。</p>
            </div>
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <h4 className="font-bold text-teal-700 mb-2">Thinking (RL 强化学习)</h4>
              <p className="text-sm text-gray-600">引入 Long-CoT（长思维链）。让模型学会 Planning（规划）、Evaluation（评估）、Reflection（反思）。通过 RL 进一步强化推理。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ThinkingSection = () => (
  <div className="space-y-8">
    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 border-b pb-4">
      <span className="w-2 h-8 bg-violet-600 rounded"></span>
      Kimi-VL-Thinking：长思维链推理
    </h2>
    
    <p className="text-gray-600">
      论文推出了 Kimi-VL 的 <strong>Thinking 版本</strong>，通过 Long Chain-of-Thought (Long-CoT) SFT 和强化学习 (RL) 训练，使模型具备更强的长链推理能力。
    </p>

    {/* 模型版本对比 */}
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Target size={18} className="text-violet-600" /> 模型版本演进
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h4 className="font-bold text-gray-700 mb-2">Kimi-VL-A3B-Instruct</h4>
          <p className="text-xs text-gray-600 mb-2">基础指令微调版本</p>
          <ul className="text-xs text-gray-500 space-y-1">
            <li>• 通用多模态理解</li>
            <li>• GUI Agent 能力</li>
            <li>• 长文档/长视频处理</li>
          </ul>
        </div>
        <div className="bg-violet-50 p-4 rounded-lg border border-violet-200">
          <h4 className="font-bold text-violet-700 mb-2">Kimi-VL-A3B-Thinking</h4>
          <p className="text-xs text-violet-600 mb-2">初版长思维链版本</p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Long-CoT SFT 训练</li>
            <li>• 强化学习优化</li>
            <li>• 显著提升推理能力</li>
          </ul>
        </div>
        <div className="bg-gradient-to-br from-violet-100 to-purple-100 p-4 rounded-lg border-2 border-violet-400">
          <h4 className="font-bold text-violet-800 mb-2">Kimi-VL-Thinking-2506</h4>
          <p className="text-xs text-violet-600 mb-2">最新整合版本 ⭐</p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Token 消耗减少 ~20%</li>
            <li>• 整合 Instruct 全部能力</li>
            <li>• 高分辨率 MoonViT (3.2M pixels)</li>
          </ul>
        </div>
      </div>
    </div>

    {/* Thinking 训练方法 */}
    <div className="bg-violet-50 p-6 rounded-xl border border-violet-200">
      <h3 className="text-lg font-bold text-violet-800 mb-4">Long-CoT 训练核心方法</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-violet-100">
          <h4 className="font-bold text-violet-700 mb-2 flex items-center gap-2">
            <span className="w-6 h-6 bg-violet-600 text-white rounded-full flex items-center justify-center text-xs">1</span>
            Planning (规划)
          </h4>
          <p className="text-sm text-gray-600">
            模型学会在开始解题前，先制定解题策略和步骤规划，而非直接作答。
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-violet-100">
          <h4 className="font-bold text-violet-700 mb-2 flex items-center gap-2">
            <span className="w-6 h-6 bg-violet-600 text-white rounded-full flex items-center justify-center text-xs">2</span>
            Evaluation (评估)
          </h4>
          <p className="text-sm text-gray-600">
            在推理过程中，模型会评估当前步骤是否正确，是否需要调整方向。
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-violet-100">
          <h4 className="font-bold text-violet-700 mb-2 flex items-center gap-2">
            <span className="w-6 h-6 bg-violet-600 text-white rounded-full flex items-center justify-center text-xs">3</span>
            Reflection (反思)
          </h4>
          <p className="text-sm text-gray-600">
            完成推理后，模型会回顾整个过程，检查错误并修正答案。
          </p>
        </div>
      </div>
    </div>

    {/* 2506 版本关键改进 */}
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Kimi-VL-Thinking-2506 关键改进</h3>
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="bg-green-100 p-2 rounded-lg">
            <Zap className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h4 className="font-bold text-gray-800">推理效率提升</h4>
            <p className="text-sm text-gray-600">
              平均输出 Token 长度减少约 <strong>20%</strong>（如 MMMU-val: 2.9K→2.4K，MathVision: 5.8K→4.4K），在保持性能的同时大幅降低推理成本。
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Eye className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-bold text-gray-800">高分辨率感知增强</h4>
            <p className="text-sm text-gray-600">
              对 MoonViT 进行持续训练，支持最大 <strong>3.2 million pixels</strong> 输入，在 V* Benchmark 达到 83.2%，ScreenSpot-Pro 达到 52.8%。
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="bg-purple-100 p-2 rounded-lg">
            <Database className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h4 className="font-bold text-gray-800">能力整合</h4>
            <p className="text-sm text-gray-600">
              将 Instruct 版本的感知、视频理解、长文档处理、OS Agent 能力全部整合到 Thinking 模型中，成为一个<strong>通用推理模型</strong>。
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Thinking 版本性能对比 */}
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left bg-white border border-gray-200 rounded-lg overflow-hidden">
        <thead className="text-xs text-gray-700 uppercase bg-violet-50">
          <tr>
            <th className="px-4 py-3">Benchmark</th>
            <th className="px-4 py-3">Instruct</th>
            <th className="px-4 py-3">Thinking</th>
            <th className="px-4 py-3 font-bold text-violet-700">Thinking-2506</th>
            <th className="px-4 py-3 text-gray-500">提升</th>
          </tr>
        </thead>
        <tbody className="text-xs">
          <tr className="border-b hover:bg-gray-50">
            <td className="px-4 py-3 font-medium">MMMU</td>
            <td className="px-4 py-3">58.7</td>
            <td className="px-4 py-3">61.9</td>
            <td className="px-4 py-3 font-bold text-violet-700">64.0</td>
            <td className="px-4 py-3 text-green-600">+2.1</td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-4 py-3 font-medium">MMMU-Pro</td>
            <td className="px-4 py-3">35.7</td>
            <td className="px-4 py-3">43.1</td>
            <td className="px-4 py-3 font-bold text-violet-700">46.3</td>
            <td className="px-4 py-3 text-green-600">+3.2</td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-4 py-3 font-medium">MathVision</td>
            <td className="px-4 py-3">26.5</td>
            <td className="px-4 py-3">36.8</td>
            <td className="px-4 py-3 font-bold text-violet-700">56.9</td>
            <td className="px-4 py-3 text-green-600">+20.1 🔥</td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-4 py-3 font-medium">MathVista</td>
            <td className="px-4 py-3">68.7</td>
            <td className="px-4 py-3">71.7</td>
            <td className="px-4 py-3 font-bold text-violet-700">80.1</td>
            <td className="px-4 py-3 text-green-600">+8.4</td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="px-4 py-3 font-medium">VideoMMMU</td>
            <td className="px-4 py-3">52.7</td>
            <td className="px-4 py-3">53.0</td>
            <td className="px-4 py-3 font-bold text-violet-700">65.2</td>
            <td className="px-4 py-3 text-green-600">+12.2 🔥</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-3 font-medium">ScreenSpot-Pro</td>
            <td className="px-4 py-3">35.4</td>
            <td className="px-4 py-3">—</td>
            <td className="px-4 py-3 font-bold text-violet-700">52.8</td>
            <td className="px-4 py-3 text-green-600">+17.4 🔥</td>
          </tr>
        </tbody>
      </table>
    </div>

    <InfoBox title="与其他 Thinking 模型对比" color="purple">
      <p className="mb-2">
        在 MathVision 基准上，Kimi-VL-Thinking-2506 (2.8B 激活参数) 达到 <strong>56.9%</strong>，超越了：
      </p>
      <ul className="list-disc list-inside space-y-1">
        <li>QVQ-72B-Preview: 38.1%</li>
        <li>Gemma-3 系列 (12B-27B): 18-32%</li>
        <li>Qwen2.5-VL-7B: 25.1%</li>
      </ul>
      <p className="mt-2 text-xs italic">
        这证明了 Long-CoT + RL 训练方法的有效性，使小规模模型也能具备强大的推理能力。
      </p>
    </InfoBox>
  </div>
);

const PerformanceSection = () => (
  <div className="space-y-8">
    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 border-b pb-4">
      <span className="w-2 h-8 bg-orange-600 rounded"></span>
      完整性能表现
    </h2>
    
    {/* Instruct 版本性能 */}
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Kimi-VL-A3B-Instruct 核心指标</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border border-gray-200 rounded-lg overflow-hidden">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-4 py-3">Benchmark</th>
              <th className="px-4 py-3">领域</th>
              <th className="px-4 py-3 font-bold text-orange-600">Kimi-VL</th>
              <th className="px-4 py-3 text-gray-400">GPT-4o</th>
              <th className="px-4 py-3 text-gray-400">Qwen2.5-VL-7B</th>
              <th className="px-4 py-3 text-gray-400">Gemma3-12B</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-900">MMMU</td>
              <td className="px-4 py-3">多学科推理</td>
              <td className="px-4 py-3 font-bold text-orange-600">58.7</td>
              <td className="px-4 py-3">69.1</td>
              <td className="px-4 py-3">58.6</td>
              <td className="px-4 py-3">52.5</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-900">MMBench-EN</td>
              <td className="px-4 py-3">通用理解</td>
              <td className="px-4 py-3 font-bold text-orange-600">82.9</td>
              <td className="px-4 py-3">83.1</td>
              <td className="px-4 py-3">83.2</td>
              <td className="px-4 py-3">74.6</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-900">MathVista</td>
              <td className="px-4 py-3">数学推理</td>
              <td className="px-4 py-3 font-bold text-orange-600">68.7</td>
              <td className="px-4 py-3">63.8</td>
              <td className="px-4 py-3">68.2</td>
              <td className="px-4 py-3">60.8</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-900">InfoVQA</td>
              <td className="px-4 py-3">OCR / 文档</td>
              <td className="px-4 py-3 font-bold text-orange-600">83.2</td>
              <td className="px-4 py-3">80.7</td>
              <td className="px-4 py-3">82.6</td>
              <td className="px-4 py-3">60.6</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-900">OCRBench</td>
              <td className="px-4 py-3">OCR</td>
              <td className="px-4 py-3 font-bold text-orange-600">864</td>
              <td className="px-4 py-3">815</td>
              <td className="px-4 py-3">864</td>
              <td className="px-4 py-3">702</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-900">LongVideoBench</td>
              <td className="px-4 py-3">长视频</td>
              <td className="px-4 py-3 font-bold text-orange-600">64.5</td>
              <td className="px-4 py-3">66.7</td>
              <td className="px-4 py-3">60.0</td>
              <td className="px-4 py-3">—</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-900">MMLongBench-Doc</td>
              <td className="px-4 py-3">长文档</td>
              <td className="px-4 py-3 font-bold text-orange-600">35.1</td>
              <td className="px-4 py-3">42.8</td>
              <td className="px-4 py-3">29.6</td>
              <td className="px-4 py-3">21.3</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-900">ScreenSpot-Pro</td>
              <td className="px-4 py-3">GUI Agent</td>
              <td className="px-4 py-3 font-bold text-orange-600">35.4</td>
              <td className="px-4 py-3">0.8</td>
              <td className="px-4 py-3">29.0</td>
              <td className="px-4 py-3">—</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-900">OSWorld</td>
              <td className="px-4 py-3">OS Agent</td>
              <td className="px-4 py-3 font-bold text-orange-600">19.3</td>
              <td className="px-4 py-3">12.2</td>
              <td className="px-4 py-3">12.2</td>
              <td className="px-4 py-3">—</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    {/* 性能亮点 */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <InfoBox title="GUI Agent 能力突出" color="green">
        <p>
          ScreenSpot-Pro 达到 35.4 分，远超 GPT-4o (0.8)。OSWorld 达到 19.3 分，击败所有竞品。MoonViT 的高分辨率原生处理是关键。
        </p>
      </InfoBox>
      <InfoBox title="长上下文领先" color="purple">
        <p>
          128K 上下文窗口使 Kimi-VL 在 MMLongBench-Doc (35.1) 和 LongVideoBench (64.5) 上显著领先同规模模型。
        </p>
      </InfoBox>
      <InfoBox title="OCR 能力强劲" color="blue">
        <p>
          OCRBench 达到 864，与 Qwen2.5-VL-7B 持平，超越 GPT-4o (815)。InfoVQA 83.2 超越所有竞品。
        </p>
      </InfoBox>
    </div>

    {/* 与同类 MoE VLM 对比 */}
    <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
      <h3 className="text-lg font-bold text-orange-800 mb-4">与其他 MoE VLM 对比</h3>
      <p className="text-sm text-gray-700 mb-4">
        相比其他早期 MoE 视觉语言模型，Kimi-VL 在多个关键维度具有显著优势：
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm bg-white rounded-lg overflow-hidden">
          <thead className="bg-orange-100">
            <tr>
              <th className="px-4 py-2 text-left">模型</th>
              <th className="px-4 py-2 text-left">上下文长度</th>
              <th className="px-4 py-2 text-left">Vision Encoder</th>
              <th className="px-4 py-2 text-left">Long-Thinking</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2 font-medium">DeepSeek-VL2</td>
              <td className="px-4 py-2 text-red-600">4K ❌</td>
              <td className="px-4 py-2">固定分辨率</td>
              <td className="px-4 py-2 text-red-600">不支持</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 font-medium">Aria</td>
              <td className="px-4 py-2">64K</td>
              <td className="px-4 py-2">固定分辨率</td>
              <td className="px-4 py-2 text-red-600">不支持</td>
            </tr>
            <tr className="bg-green-50">
              <td className="px-4 py-2 font-bold text-green-700">Kimi-VL</td>
              <td className="px-4 py-2 text-green-600 font-bold">128K ✓</td>
              <td className="px-4 py-2 text-green-600 font-bold">原生分辨率 MoonViT</td>
              <td className="px-4 py-2 text-green-600 font-bold">支持 ✓</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    {/* 效率对比 */}
    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
      <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Zap size={18} className="text-yellow-500" /> MoE 效率优势
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <p className="text-2xl font-bold text-blue-600">2.8B</p>
          <p className="text-xs text-slate-500">激活参数</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <p className="text-2xl font-bold text-purple-600">16B</p>
          <p className="text-xs text-slate-500">总参数</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <p className="text-2xl font-bold text-green-600">17.5%</p>
          <p className="text-xs text-slate-500">激活比例</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <p className="text-2xl font-bold text-orange-600">400M</p>
          <p className="text-xs text-slate-500">MoonViT 参数</p>
        </div>
      </div>
      <p className="text-sm text-slate-600 mt-4 text-center">
        MoE 架构使得 Kimi-VL 在保持 16B 总参数知识容量的同时，推理成本仅相当于 ~3B 模型。
      </p>
    </div>
  </div>
);

const LimitationsSection = () => (
  <div className="space-y-8">
    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 border-b pb-4">
      <span className="w-2 h-8 bg-red-600 rounded"></span>
      局限性与未来工作
    </h2>
    
    <p className="text-gray-600">
      尽管 Kimi-VL 在多项任务上表现出色，论文也坦诚地指出了模型目前存在的局限性和未来的改进方向。
    </p>

    {/* 当前局限性 */}
    <div className="bg-red-50 p-6 rounded-xl border border-red-200">
      <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center gap-2">
        <AlertTriangle size={20} /> 当前局限性
      </h3>
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg border border-red-100">
          <h4 className="font-bold text-gray-800 mb-2">1. 参数规模限制</h4>
          <p className="text-sm text-gray-600">
            虽然当前模型规模对于大多数标准任务表现有效，但对于<strong>高度专业化或领域特定的问题</strong>仍显不足。
            特别是强依赖语言能力的任务（如专业法律、医学推理），受限于 Attention 层仅相当于 3B 模型的参数量。
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-red-100">
          <h4 className="font-bold text-gray-800 mb-2">2. 推理能力未达上限</h4>
          <p className="text-sm text-gray-600">
            尽管 Thinking 版本推理能力已经很强，但距离<strong>理论上限</strong>仍有差距。
            对于需要多步推理或深层上下文理解的复杂任务，仍有提升空间。
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-red-100">
          <h4 className="font-bold text-gray-800 mb-2">3. 长上下文能力受限</h4>
          <p className="text-sm text-gray-600">
            虽然提供了 128K 上下文窗口，但由于 Attention 层参数有限（仅相当于 ~3B 模型），
            在<strong>极长序列或高信息密度场景</strong>下的能力仍然不足。
          </p>
        </div>
      </div>
    </div>

    {/* 未来工作 */}
    <div className="bg-teal-50 p-6 rounded-xl border border-teal-200">
      <h3 className="text-lg font-bold text-teal-800 mb-4">未来改进方向</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border border-teal-100">
          <h4 className="font-bold text-teal-700 mb-2">扩大模型规模</h4>
          <p className="text-sm text-gray-600">
            通过增加模型参数量，特别是 Attention 层的参数，来提升模型的知识容量和长上下文处理能力。
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-teal-100">
          <h4 className="font-bold text-teal-700 mb-2">扩展预训练数据</h4>
          <p className="text-sm text-gray-600">
            增加高质量的专业领域数据和多模态数据，以增强模型在特定领域的表现。
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-teal-100">
          <h4 className="font-bold text-teal-700 mb-2">优化后训练算法</h4>
          <p className="text-sm text-gray-600">
            改进 Long-CoT SFT 和 RL 训练方法，进一步提升推理效率和准确性。
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-teal-100">
          <h4 className="font-bold text-teal-700 mb-2">测试时扩展 (Test-time Scaling)</h4>
          <p className="text-sm text-gray-600">
            研究更有效的 Test-time Scaling 机制，在推理阶段动态调整计算资源分配。
          </p>
        </div>
      </div>
    </div>

    {/* 开源信息 */}
    <InfoBox title="开源资源" color="blue">
      <p className="mb-2">
        Kimi-VL 的代码和模型权重已在 GitHub 公开发布：
      </p>
      <p className="font-mono text-sm bg-white p-2 rounded border border-blue-200">
        https://github.com/MoonshotAI/Kimi-VL
      </p>
      <p className="mt-2 text-xs italic">
        包含 Instruct 版本和 Thinking 版本，支持社区进一步研究和应用开发。
      </p>
    </InfoBox>
  </div>
);

