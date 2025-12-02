import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  Layers, 
  Database, 
  Activity, 
  AlertTriangle, 
  Cpu,
  Maximize,
  List,
  Image,
  Brain,
  Cable,
  FileText,
  Target,
  Sliders,
  ShieldCheck,
  Copy,
  GitMerge,
  Wrench,
  Rocket,
  AlertCircle,
  CheckCircle2,
  ScanEye,
  Languages,
  Bot
} from 'lucide-react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const MLLMSurvey = () => {
  const [activeSection, setActiveSection] = useState('intro');

  const navItems = [
    { id: 'intro', label: '1. 引言与背景', icon: BookOpen },
    { id: 'arch', label: '2. 模型架构', icon: Layers },
    { id: 'training', label: '3. 训练策略与数据', icon: Database },
    { id: 'eval', label: '4. 评估体系', icon: Activity },
    { id: 'extensions', label: '5. 扩展方向', icon: Maximize },
    { id: 'hallucination', label: '6. 多模态幻觉', icon: AlertTriangle },
    { id: 'techniques', label: '7. 扩展技术', icon: Cpu },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const Section = ({ id, title, icon: Icon, children }) => (
    <section id={id} className="mb-16 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden scroll-mt-24">
      <div className="bg-gradient-to-r from-slate-50 to-white p-6 border-b border-slate-100 flex items-center gap-3">
        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
          {Icon && <Icon className="w-6 h-6" />}
        </div>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{title}</h2>
      </div>
      <div className="p-6 md:p-10 text-slate-700 leading-relaxed space-y-6">
        {children}
      </div>
    </section>
  );

  const SubHeading = ({ children, icon: Icon }) => (
    <h3 className="text-lg font-bold text-slate-900 mt-8 mb-4 flex items-center gap-2 pb-2 border-b border-slate-100">
      {Icon && <Icon className="w-5 h-5 text-indigo-500" />}
      {children}
    </h3>
  );

  const DetailBox = ({ title, items }) => (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-slate-300 transition">
      <h4 className="font-semibold text-slate-800 mb-3 text-sm uppercase tracking-wide">{title}</h4>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="text-sm flex gap-2">
            <span className="text-blue-500 mt-1">•</span>
            <span>
              {item.label && <strong className="text-slate-700 block sm:inline mr-1">{item.label}:</strong>}
              <span className="text-slate-600">{item.desc}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Sidebar Navigation */}
      <nav className="hidden md:block w-72 bg-white border-r border-slate-200 fixed h-screen overflow-y-auto">
        <div className="p-6">
          <Link to="/" className="flex items-center text-slate-500 hover:text-blue-600 transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>返回首页</span>
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-900 mb-1 flex items-center gap-2">
            <span className="bg-blue-600 text-white rounded p-1"><BookOpen size={20}/></span>
            MLLM Survey
          </h1>
          <p className="text-xs text-slate-500 font-medium ml-9 mb-8">Detailed Review</p>
          
          <div className="space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 text-left ${
                    activeSection === item.id 
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600 font-semibold' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}
          </div>
          <div className="mt-8 pt-8 border-t border-slate-100">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p className="text-xs text-blue-600 font-bold mb-1 uppercase tracking-wider">Source Paper</p>
              <p className="text-xs text-slate-700 italic mb-2">"A Survey on Multimodal Large Language Models"</p>
              <div className="flex items-center gap-2 text-[10px] text-slate-500 bg-white p-2 rounded border border-slate-100">
                <span className="font-mono">arXiv:2306.13549v4</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b p-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <Link to="/" className="text-slate-500">
          <ArrowLeft size={20} />
        </Link>
        <span className="font-bold text-lg text-slate-800 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600"/> MLLM Survey
        </span>
        <List size={20} className="text-slate-400" />
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-72 p-4 md:p-8 lg:p-12 max-w-5xl mx-auto w-full">
        
        {/* Header Banner */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold tracking-wide">SURVEY</span>
            <span className="text-slate-400 text-sm">Last Updated: 2024</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">多模态大语言模型综述</h1>
          <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
            详细解读 MLLM 的最新进展：从 CLIP 到 GPT-4V，全面覆盖架构演进、训练范式、前沿扩展及关键挑战。
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">Multimodal</span>
            <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">LLM</span>
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">Survey</span>
          </div>
        </div>

        {/* 1. Introduction */}
        <Section id="intro" title="1. 引言与背景 (Introduction)" icon={BookOpen}>
          <p>
            <strong>多模态大语言模型 (MLLM)</strong> 将大语言模型 (LLM) 强大的认知与推理能力扩展至多模态领域。与传统方法相比，MLLM 展现了惊人的<strong>涌现能力 (Emergent Capabilities)</strong>，例如基于图像创作故事、无 OCR 的数学推理等，这被视为通向通用人工智能 (AGI) 的潜在路径。
          </p>
          
          <SubHeading icon={Layers}>多模态研究的范式转变</SubHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DetailBox title="判别式 (Discriminative)" items={[
              { label: "代表模型", desc: "CLIP (Contrastive Language-Image Pre-training)" },
              { label: "核心机制", desc: "将视觉和文本投影到统一的表示空间，计算相似度。" },
              { label: "局限性", desc: "主要用于分类、检索，缺乏生成和复杂推理能力。" }
            ]} />
            <DetailBox title="生成式 (Generative)" items={[
              { label: "代表模型", desc: "OFA, MLLM (GPT-4V, LLaVA)" },
              { label: "核心机制", desc: "将多模态任务统一为序列到序列 (Seq2Seq) 的生成任务。" },
              { label: "MLLM 特征", desc: "基于十亿级 (Billion-scale) LLM；采用指令微调 (Instruction Tuning)。" }
            ]} />
          </div>
        </Section>

        {/* 2. Architecture */}
        <Section id="arch" title="2. 模型架构 (Architecture)" icon={Layers}>
          <p>
            MLLM 的通用架构由三个核心组件构成：<strong>模态编码器</strong> (眼睛/耳朵)、<strong>LLM 基座</strong> (大脑) 和 <strong>模态连接器</strong> (神经接口)。
          </p>
          
          <SubHeading icon={Image}>2.1 模态编码器 (Modality Encoder)</SubHeading>
          <p className="mb-4">负责将原始信号压缩为特征。实证研究表明，<strong>分辨率</strong>对性能的影响大于参数量和训练数据。</p>
          <DetailBox title="常用视觉编码器" items={[
            { label: "CLIP-ViT-L/14", desc: "最常用基线，分辨率 224/336，参数 304M。" },
            { label: "EVA-CLIP (ViT-G/14)", desc: "MiniGPT-4 使用，参数 1B，训练技术更优，性能更强。" },
            { label: "OpenCLIP-ConvNext-L", desc: "Osprey 使用，基于卷积架构，支持多级特征。" }
          ]} />
          <div className="mt-4 bg-amber-50 p-4 rounded-lg border border-amber-100 text-sm">
            <strong className="text-amber-800 block mb-1">分辨率提升策略：</strong>
            <ul className="list-disc pl-5 text-amber-800 space-y-1">
              <li><strong>直接缩放 (Direct Scaling):</strong> 如 Qwen-VL，直接微调高分辨率 (448) 编码器。</li>
              <li><strong>切片策略 (Patch-division):</strong> 如 Monkey/SPHINX，将大图切分为小块 (Patches) 输入编码器，保留局部细节和全局概览。</li>
            </ul>
          </div>

          <SubHeading icon={Brain}>2.2 预训练 LLM (Pre-trained LLM)</SubHeading>
          <p className="mb-4">作为推理核心。除了参数规模 (Scaling)，<strong>混合专家模型 (MoE)</strong> 架构正成为新趋势。</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DetailBox title="稠密模型 (Dense)" items={[
              { label: "LLaMA / LLaMA-2", desc: "开源界基石，主要基于英文语料。" },
              { label: "Vicuna", desc: "基于 LLaMA 进行指令微调，对话能力出色。" },
              { label: "Qwen (通义千问)", desc: "原生双语支持 (中/英)，性能强劲。" }
            ]} />
            <DetailBox title="稀疏模型 (MoE)" items={[
              { label: "核心优势", desc: "在不增加推理成本的情况下扩大总参数量。" },
              { label: "代表作", desc: "MM1, MoE-LLaVA (实证表明 MoE 在多项基准上优于同级稠密模型)。" }
            ]} />
          </div>

          <SubHeading icon={Cable}>2.3 模态接口 (Modality Interface)</SubHeading>
          <p>连接视觉特征与文本空间的桥梁，主要分为两类技术路线：</p>
          <div className="space-y-4 mt-4">
            <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50/50 rounded-r-lg">
              <h4 className="font-bold text-slate-800">Token-level Fusion (词元级融合)</h4>
              <p className="text-sm text-slate-600 mb-2">将视觉特征转化为 Token 序列，与文本 Token 拼接。</p>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li><strong>Q-Former (BLIP-2 风格):</strong> 使用可学习的 Query 提取特征，压缩 Token 数 (如 32 个)，参数量极小 (如 Qwen-VL 中仅占 {"<"}1%)。</li>
                <li><strong>MLP Projection (LLaVA 风格):</strong> 简单的线性层投影，保留更多信息但 Token 数较多 (如 256/576 个)，利于 OCR 等细粒度任务。</li>
              </ul>
            </div>
            <div className="border-l-4 border-purple-500 pl-4 py-2 bg-purple-50/50 rounded-r-lg">
              <h4 className="font-bold text-slate-800">Feature-level Fusion (特征级融合)</h4>
              <p className="text-sm text-slate-600 mb-2">在 LLM 层内部进行深度交互。</p>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li><strong>Flamingo:</strong> 在 LLM 层间插入 Gated Cross-Attention 层。</li>
                <li><strong>CogVLM:</strong> 在 Attention 层增加 Visual Expert 模块，实现深层视觉-语言对齐。</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* 3. Training Strategy */}
        <Section id="training" title="3. 训练策略与数据 (Training Strategy)" icon={Database}>
          <p>标准的 MLLM 训练流水线包含三个阶段：预训练 (对齐)、指令微调 (泛化) 和对齐微调 (偏好)。</p>

          <SubHeading icon={FileText}>3.1 预训练 (Pre-training)</SubHeading>
          <p className="text-sm mb-4">目标是对齐模态。通常冻结 LLM 和编码器，仅训练连接器 (Connector)。</p>
          <DetailBox title="数据类型详解" items={[
            { label: "粗粒度数据 (Coarse-grained)", desc: "Web 抓取的图文对 (如 CC-3M, LAION)。量大但含有噪声，文本通常较短 (alt-text)。" },
            { label: "细粒度数据 (Fine-grained)", desc: "如 ShareGPT4V，利用 GPT-4V 生成详细的图像描述。高质量数据能显著提升对齐效果。" }
          ]} />
          <div className="bg-slate-100 p-4 rounded-lg my-4 overflow-x-auto border border-slate-200">
            <p className="text-xs text-slate-500 mb-2 font-mono">Loss Function (Autoregressive):</p>
            <BlockMath math="\mathcal{L}(\theta)=-\sum_{i=1}^{N}\log p(\mathcal{R}_{i}|\mathcal{I},\mathcal{R}_{<i};\theta)" />
          </div>

          <SubHeading icon={Target}>3.2 指令微调 (Instruction Tuning)</SubHeading>
          <p className="text-sm mb-4">通过多样化的任务指令，激发模型的 Zero-shot 能力。</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border rounded-lg p-4">
              <h4 className="font-bold text-sm mb-2">数据构造方法</h4>
              <ul className="list-disc pl-5 text-sm space-y-2 text-slate-600">
                <li><strong>Data Adaptation:</strong> 将 VQA 数据集 (如 VQAv2) 转化为指令格式。</li>
                <li><strong>Self-Instruction:</strong> 如 <strong>LLaVA-Instruct</strong>，利用纯文本 GPT-4 根据 Image Caption 和 Box 坐标生成多轮对话数据。</li>
                <li><strong>Data Mixture:</strong> 混合纯文本指令数据，维持 LLM 的语言能力。</li>
              </ul>
            </div>
            <div className="bg-white border rounded-lg p-4">
              <h4 className="font-bold text-sm mb-2">关键发现</h4>
              <ul className="list-disc pl-5 text-sm space-y-2 text-slate-600">
                <li><strong>多样性 {">"} 数量:</strong> 任务覆盖面和 Prompt 的多样性比单纯增加数据量更重要。</li>
                <li><strong>视觉推理任务:</strong> 相比简单的 Captioning，包含复杂推理的数据更能提升模型能力。</li>
              </ul>
            </div>
          </div>

          <SubHeading icon={Sliders}>3.3 对齐微调 (Alignment Tuning)</SubHeading>
          <p className="text-sm mb-4">使用 RLHF 或 DPO 技术，使模型更诚实、无害。</p>
          <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-slate-700">RLHF (Reinforcement Learning from Human Feedback)</h4>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">InstructGPT 范式</span>
              </div>
              <p className="text-sm mb-3">包含三个步骤：SFT → 奖励模型训练 (Reward Modeling) → PPO 优化。</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs overflow-x-auto">
                <div>
                  <p className="font-mono text-slate-500 mb-1">Step 2: Reward Model Loss</p>
                  <BlockMath math="\mathcal{L}_{RM}=-\mathbb{E}[\log(\sigma(r(x,y_{w})-r(x,y_{l})))]" />
                </div>
                <div>
                  <p className="font-mono text-slate-500 mb-1">Step 3: PPO Optimization</p>
                  <BlockMath math="\mathcal{L}_{PPO}=\mathbb{E}[r(x,y) -\beta\cdot D_{KL}]" />
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-slate-700">DPO (Direct Preference Optimization)</h4>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">无奖励模型</span>
              </div>
              <p className="text-sm mb-2">直接在偏好数据上优化，去除了显式的奖励模型，训练更稳定。</p>
              <div className="text-xs overflow-x-auto">
                <BlockMath math="\mathcal{L}_{DPO} = -\mathbb{E}_{\mathcal{D}} \left[ \log \sigma \left( \beta \log \frac{\pi_\theta(y_w|x)}{\pi_{ref}(y_w|x)} - \beta \log \frac{\pi_\theta(y_l|x)}{\pi_{ref}(y_l|x)} \right) \right]" />
              </div>
            </div>
          </div>
        </Section>

        {/* 4. Evaluation */}
        <Section id="eval" title="4. 评估体系 (Evaluation)" icon={Activity}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Closed-set Evaluation (封闭集)
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                答案选项固定 (如选择题)，易于自动化评估准确率。
              </p>
              <DetailBox title="代表性基准" items={[
                { label: "MME", desc: "包含 14 个感知与认知子任务，手动设计指令以避免泄漏。" },
                { label: "MMBench", desc: "多维度能力评估，使用 CircularEval 策略缓解选项位置偏差。" },
                { label: "MMMU", desc: "专家级 AGI 基准，涵盖多学科 (科学、艺术等) 的复杂推理。" },
                { label: "MathVista", desc: "专注于视觉数学推理能力的评估。" }
              ]} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                Open-set Evaluation (开放集)
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                生成式回答，更接近真实对话场景，评估难度大。
              </p>
              <DetailBox title="评估方法" items={[
                { label: "Manual Scoring", desc: "人工打分，准确但昂贵且不可扩展。" },
                { label: "GPT Scoring", desc: "利用 LLM 打分。早期使用纯文本 GPT-4 (基于 Caption)，现在趋向于使用 GPT-4V (能直接看图) 以提高准确性。" },
                { label: "Case Study", desc: "通过具体案例 (如笑话理解、自动驾驶场景) 定性分析。" }
              ]} />
            </div>
          </div>
        </Section>

        {/* 5. Extensions (New Section) */}
        <Section id="extensions" title="5. 扩展方向 (Extensions)" icon={Maximize}>
          <p>MLLM 正从通用的图文理解向更细粒度、更多模态和更广阔的场景演进。</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="border border-slate-200 rounded-xl p-5 hover:border-blue-300 transition bg-white">
              <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <ScanEye size={18} className="text-blue-500"/> 粒度支持 (Granularity)
              </h4>
              <ul className="text-sm space-y-2 text-slate-600">
                <li><strong>Region Input:</strong> 如 <strong>Shikra</strong>，支持 Bounding Box 输入，用户可指定关注区域。</li>
                <li><strong>Pixel/Point Input:</strong> 如 <strong>Osprey</strong> 和 <strong>Ferret</strong>，支持点选 (Click) 或不规则形状输入，实现像素级理解。</li>
                <li><strong>Mask Output:</strong> 如 <strong>LISA</strong>，支持输出分割掩码 (Segmentation Mask)，实现推理分割。</li>
              </ul>
            </div>
            <div className="border border-slate-200 rounded-xl p-5 hover:border-blue-300 transition bg-white">
              <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <Languages size={18} className="text-green-500"/> 模态与语言 (Modality & Language)
              </h4>
              <ul className="text-sm space-y-2 text-slate-600">
                <li><strong>Audio/Video:</strong> 如 <strong>ImageBind</strong> (多模态联合嵌入) 和 <strong>NEXT-GPT</strong> (任意模态输入输出)。</li>
                <li><strong>Multilingual:</strong> 如 <strong>VisCPM</strong> 和 <strong>Qwen-VL</strong>，通过混合多语言数据训练，打破仅支持英文的限制。</li>
              </ul>
            </div>
            <div className="border border-slate-200 rounded-xl p-5 hover:border-blue-300 transition md:col-span-2 bg-white">
              <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <Bot size={18} className="text-purple-500"/> 场景扩展 (Scenario)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-slate-600">
                <div>
                  <strong>Mobile Deployment:</strong><br/>
                  如 <strong>MobileVLM</strong>，针对移动端优化的小型化模型。
                </div>
                <div>
                  <strong>GUI Agents:</strong><br/>
                  如 <strong>CogAgent</strong> 和 <strong>AppAgent</strong>，专门用于操作手机或电脑图形界面。
                </div>
                <div>
                  <strong>Domain Specific:</strong><br/>
                  如文档理解 (TextMonkey) 和医疗影像 (LLaVA-Med)。
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 6. Hallucination */}
        <Section id="hallucination" title="6. 多模态幻觉 (Multimodal Hallucination)" icon={AlertTriangle}>
          <p className="mb-4">
            幻觉是指 MLLM 生成的回答与图像内容不一致 (如无中生有)。这仍是当前的主要挑战。
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="flex-1 bg-red-50 p-4 rounded-lg border border-red-100">
              <h4 className="font-bold text-red-800 mb-2 text-sm">幻觉类型</h4>
              <ul className="list-disc pl-4 text-xs text-red-700 space-y-1">
                <li><strong>存在性幻觉:</strong> 描述不存在的物体。</li>
                <li><strong>属性幻觉:</strong> 颜色、形状、材质描述错误。</li>
                <li><strong>关系幻觉:</strong> 方位、动作关系错误。</li>
              </ul>
            </div>
            <div className="flex-1 bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h4 className="font-bold text-blue-800 mb-2 text-sm">评估方法</h4>
              <ul className="list-disc pl-4 text-xs text-blue-700 space-y-1">
                <li><strong>POPE:</strong> 判别式基准，询问物体是否存在 (Yes/No)。</li>
                <li><strong>CHAIR:</strong> 计算生成文本中幻觉物体的比例。</li>
                <li><strong>FaithScore:</strong> 细粒度评估，拆解句子为原子事实进行验证。</li>
              </ul>
            </div>
          </div>

          <SubHeading icon={ShieldCheck}>缓解策略 (Mitigation Strategies)</SubHeading>
          <div className="space-y-4">
            <DetailBox title="Pre-correction (数据干预)" items={[
              { label: "LRV-Instruction", desc: "引入包含'不存在'物体的负样本指令，打破模型总是回答'Yes'的倾向。" },
              { label: "LLaVA-RLHF", desc: "通过人类反馈强化诚实性。" }
            ]} />
            <DetailBox title="In-process (解码干预)" items={[
              { label: "VCD (Visual Contrastive Decoding)", desc: "原理：当图像加入噪声时，模型更依赖语言先验产生幻觉。VCD 通过对比原始图像输出和噪声图像输出的差异，惩罚单纯依赖语言先验的 Token。" },
              { label: "HallE-Switch", desc: "引入控制因子，在推理过程中抑制过度想象。" }
            ]} />
            <DetailBox title="Post-correction (后处理)" items={[
              { label: "Woodpecker", desc: "无需训练的框架。利用检测器提取物体，利用 GPT-3.5/4 根据视觉事实重写修正幻觉。" },
              { label: "LURE", desc: "训练专门的修正器 (Revisor) 来检测并修改不确定性高的描述。" }
            ]} />
          </div>
        </Section>

        {/* 7. Extended Techniques */}
        <Section id="techniques" title="7. 扩展技术 (Extended Techniques)" icon={Cpu}>
          <div className="space-y-10">
            {/* M-ICL */}
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                <Copy size={22} className="text-indigo-500"/>
                M-ICL: Multimodal In-Context Learning
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                通过在 Prompt 中提供少量图文示例 (Demonstrations)，让模型进行<strong>类比学习</strong>。这通常是 Training-free 的。
              </p>
              <div className="bg-slate-900 text-slate-300 p-5 rounded-xl font-mono text-xs overflow-x-auto shadow-lg">
                <div className="flex gap-4 flex-wrap">
                  <div className="opacity-50 border-r border-slate-700 pr-4">
                    <div className="text-slate-500 mb-1">// Context Example 1</div>
                    <div>{"<Img_A>"} Q:Count? A:2</div>
                  </div>
                  <div className="opacity-50 border-r border-slate-700 pr-4">
                    <div className="text-slate-500 mb-1">// Context Example 2</div>
                    <div>{"<Img_B>"} Q:Count? A:1</div>
                  </div>
                  <div className="text-white font-bold">
                    <div className="text-green-400 mb-1">// Target Query</div>
                    <div>{"<Img_C>"} Q:Count? A: <span className="animate-pulse">_</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* M-CoT */}
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                <GitMerge size={22} className="text-pink-500"/>
                M-CoT: Multimodal Chain of Thought
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                将复杂推理分解为中间步骤 (Rationale)。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 bg-white">
                  <h4 className="font-bold text-sm mb-2 text-slate-700">学习范式 (Paradigms)</h4>
                  <ul className="list-disc pl-4 text-xs text-slate-600 space-y-1">
                    <li><strong>Finetuning:</strong> 使用包含思维链的数据集 (如 ScienceQA) 微调。</li>
                    <li><strong>Zero-shot:</strong> 使用 Prompt 激发，如 "Let's think frame by frame"。</li>
                  </ul>
                </div>
                <div className="border rounded-lg p-4 bg-white">
                  <h4 className="font-bold text-sm mb-2 text-slate-700">链配置 (Configuration)</h4>
                  <ul className="list-disc pl-4 text-xs text-slate-600 space-y-1">
                    <li><strong>Structure:</strong> Single-chain (单链) vs Tree-shape (树状/多路推理)。</li>
                    <li><strong>Pattern:</strong> Infilling (填充逻辑缺口) vs Predicting (预测下一步)。</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* LAVR */}
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                <Wrench size={22} className="text-orange-500"/>
                LAVR: LLM-Aided Visual Reasoning
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                利用 LLM 调用外部工具或视觉专家模型解决任务 (如 MM-REACT, VisProg)。LLM 在其中扮演不同角色：
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 bg-orange-50 p-3 rounded text-center border border-orange-100">
                  <div className="font-bold text-orange-800 text-sm">Controller</div>
                  <div className="text-xs text-orange-600 mt-1">任务规划与工具调度</div>
                </div>
                <div className="flex-1 bg-orange-50 p-3 rounded text-center border border-orange-100">
                  <div className="font-bold text-orange-800 text-sm">Decision Maker</div>
                  <div className="text-xs text-orange-600 mt-1">多轮交互中的逻辑判断</div>
                </div>
                <div className="flex-1 bg-orange-50 p-3 rounded text-center border border-orange-100">
                  <div className="font-bold text-orange-800 text-sm">Semantics Refiner</div>
                  <div className="text-xs text-orange-600 mt-1">语言润色与整合</div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Challenges */}
        <section className="bg-slate-900 text-slate-300 rounded-2xl p-8 mb-12 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Rocket className="text-blue-400"/> 挑战与展望
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-white mb-3 border-b border-slate-700 pb-2">当前瓶颈</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2"><AlertCircle size={16} className="text-red-400 mt-0.5 flex-shrink-0"/> 长上下文 (Long Context) 处理能力受限。</li>
                <li className="flex gap-2"><AlertCircle size={16} className="text-red-400 mt-0.5 flex-shrink-0"/> 复杂指令遵循能力仍弱于闭源模型。</li>
                <li className="flex gap-2"><AlertCircle size={16} className="text-red-400 mt-0.5 flex-shrink-0"/> 安全性问题 (Prompt Injection, Adversarial Attacks)。</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3 border-b border-slate-700 pb-2">未来趋势</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-green-400 mt-0.5 flex-shrink-0"/> 具身智能 (Embodied AI) 的深入结合。</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-green-400 mt-0.5 flex-shrink-0"/> 更强的多模态对齐与推理能力。</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-green-400 mt-0.5 flex-shrink-0"/> 移动端轻量化与高效部署。</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-slate-500 text-sm pb-8">
          <p>基于 "A Survey on Multimodal Large Language Models" (arXiv:2306.13549) 制作</p>
        </footer>
      </main>
    </div>
  );
};

export default MLLMSurvey;
