import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  Layers, 
  Database, 
  Eye,
  Maximize,
  MessageSquare,
  Puzzle,
  Video,
  Stethoscope,
  AlertTriangle,
  Box,
  FileText,
  Sparkles,
  Edit,
  Search,
  Target
} from 'lucide-react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const VITPaper = () => {
  const [activeSection, setActiveSection] = useState('intro');

  const navItems = [
    { id: 'intro', label: '1. 背景与范式', icon: BookOpen },
    { id: 'foundations', label: '2. 基础架构与数据', icon: Layers },
    { id: 'discriminative', label: '3. 判别式任务', icon: Search },
    { id: 'generative', label: '4. 生成式任务', icon: Sparkles },
    { id: 'reasoning', label: '5. 推理任务', icon: MessageSquare },
    { id: 'domains', label: '6. 特定领域', icon: Puzzle },
    { id: 'challenges', label: '7. 挑战与展望', icon: AlertTriangle },
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

  const HighlightBox = ({ title, children, color = 'blue' }) => {
    const colorClasses = {
      blue: 'bg-blue-50 border-blue-200',
      green: 'bg-green-50 border-green-200',
      purple: 'bg-purple-50 border-purple-200',
      amber: 'bg-amber-50 border-amber-200',
      rose: 'bg-rose-50 border-rose-200',
    };
    return (
      <div className={`${colorClasses[color]} border rounded-xl p-5 my-4`}>
        {title && <h4 className="font-bold text-slate-800 mb-3">{title}</h4>}
        {children}
      </div>
    );
  };

  const ModelCard = ({ title, description, features, color = 'purple' }) => {
    const colorClasses = {
      purple: 'bg-purple-50 border-purple-100',
      green: 'bg-green-50 border-green-100',
      blue: 'bg-blue-50 border-blue-100',
    };
    const titleColorClasses = {
      purple: 'text-purple-900',
      green: 'text-green-900',
      blue: 'text-blue-900',
    };
    return (
      <div className={`${colorClasses[color]} border rounded-xl p-5`}>
        <h4 className={`${titleColorClasses[color]} font-bold mb-2`}>{title}</h4>
        <p className="text-sm text-slate-600 mb-3">{description}</p>
        <ul className="space-y-1">
          {features.map((f, i) => (
            <li key={i} className="text-sm flex gap-2">
              <span className="text-blue-500">•</span>
              <span dangerouslySetInnerHTML={{ __html: f }} />
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const DomainCard = ({ icon: Icon, title, challenge, models }) => (
    <div className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition bg-white">
      <div className="flex items-center gap-2 mb-3">
        {Icon && <Icon className="w-5 h-5 text-blue-500" />}
        <h4 className="font-bold text-slate-800">{title}</h4>
      </div>
      <p className="text-sm text-slate-500 mb-3"><strong>挑战：</strong>{challenge}</p>
      {models.map((m, i) => (
        <p key={i} className="text-sm mb-2">
          <strong className="text-slate-700">{m.name}：</strong>
          <span className="text-slate-600">{m.desc}</span>
        </p>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 text-slate-800">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-blue-900 text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 text-blue-200 hover:text-white transition">
                <ArrowLeft size={20} />
                <span>返回</span>
              </Link>
              <h1 className="text-xl font-bold">📄 Visual Instruction Tuning</h1>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-1 rounded-full transition ${
                    activeSection === item.id
                      ? 'bg-blue-500 text-white'
                      : 'text-blue-200 hover:bg-blue-800'
                  }`}
                >
                  {item.label.split('.')[1]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <header className="text-center mb-12 bg-white rounded-2xl shadow-sm p-8 border border-slate-200">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            面向通用多模态模型的视觉指令微调：深度综述
          </h1>
          <p className="text-lg text-slate-500 italic mb-6">
            Visual Instruction Tuning towards General-Purpose Multimodal Model: A Survey
          </p>
          <div className="flex justify-center flex-wrap gap-2">
            <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">通用多模态模型 (GPMM)</span>
            <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">大语言模型 (LLM)</span>
            <span className="bg-purple-100 text-purple-800 text-sm font-semibold px-3 py-1 rounded-full">指令微调 (Instruction Tuning)</span>
            <span className="bg-amber-100 text-amber-800 text-sm font-semibold px-3 py-1 rounded-full">计算机视觉</span>
          </div>
        </header>

        {/* Section 1: Introduction */}
        <Section id="intro" title="1. 引言与背景演变" icon={BookOpen}>
          <p>
            计算机视觉（CV）的长期目标是构建能够像人类一样感知、分析和交互的系统。随着深度学习的发展，CV 任务范式经历了从"传统单一任务"到"基于指令的通用任务"的重大转变。
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-rose-800 mb-4 flex items-center gap-2">
                🛑 传统视觉任务范式
              </h3>
              <p className="text-sm text-slate-700 mb-4">
                在传统范式中，每个视觉任务通常由<strong>专用的模型</strong>独立解决。任务指令是<strong>隐式</strong>地设计在模型架构中的。例如：
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex gap-2">
                  <span className="text-rose-500">•</span>
                  <span><strong>分割任务：</strong>需要设计专门的分割头（Segmentation Head），输出掩码。</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-rose-500">•</span>
                  <span><strong>检测任务：</strong>需要设计检测头（Detection Head），输出 <InlineMath math="\{N, x_1, y_1, x_2, y_2\}" /> 格式的坐标。</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-rose-500">•</span>
                  <span><strong>生成任务：</strong>需要专门的解码器生成 RGB 图像。</span>
                </li>
              </ul>
              <div className="mt-4 p-3 bg-rose-100 rounded-lg">
                <p className="font-semibold text-rose-700 mb-2">局限性：</p>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li>• <strong>任务特定 (Task-specific)：</strong>缺乏通用性，不同任务间无法协同。</li>
                  <li>• <strong>接口固定 (Fixed Interface)：</strong>缺乏交互性，无法理解用户的自然语言指令。</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                🚀 基于指令的新范式
              </h3>
              <p className="text-sm text-slate-700 mb-4">
                受到 NLP 领域指令微调（Instruction Tuning）的启发，视觉指令微调（VIT）通过将<strong>自然语言</strong>作为任务指令，微调大型视觉模型。
              </p>
              <div className="bg-white border border-blue-100 rounded-lg p-4">
                <p className="font-semibold text-blue-900 mb-2">通用多模态模型 (GPMM) 的优势：</p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-blue-500">•</span>
                    <span><strong>统一接口：</strong>所有的任务（分类、检测、描述、编辑）都通过"图像+文本指令"作为输入，文本作为输出。</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500">•</span>
                    <span><strong>交互性强：</strong>用户可以用自然语言任意指定任务意图（如"检测图中的所有猫"）。</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500">•</span>
                    <span><strong>计算高效：</strong>利用预训练的 LLM 和 Vision Encoder，只需微调少量参数或适配器。</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* Section 2: Foundations */}
        <Section id="foundations" title="2. 视觉指令微调基础" icon={Layers}>
          <p>VIT 的实现依赖于三个核心支柱：<strong>数据构建</strong>、<strong>网络架构</strong>和<strong>训练目标</strong>。</p>

          <SubHeading icon={Database}>2.1 视觉指令跟随数据构建 (Data Construction)</SubHeading>
          <p>
            高质量的数据是 VIT 的关键。数据通常表示为三元组：
          </p>
          <div className="my-4 text-center">
            <BlockMath math="\mathcal{D} = \{ \text{Instruction}, \text{Input (Image, Text)}, \text{Output} \}" />
          </div>
          <p>
            由于缺乏大规模的人工标注指令数据，研究者通常利用 <strong>GPT-4</strong> 等大语言模型将现有的公开数据集（如 COCO Caption, VQA 数据集）扩展为指令数据。
          </p>

          <HighlightBox title="数据生成流程示例" color="amber">
            <ol className="space-y-2 text-sm">
              <li><strong>1. 原始数据：</strong>图像 + 简短的 Caption 或 VQA 对。</li>
              <li><strong>2. Prompt 设计：</strong>向 GPT-4 提供图像的符号表示（如 Bounding Box 坐标、类别列表）和任务要求。</li>
              <li><strong>3. 生成扩展：</strong>GPT-4 生成多样化的指令（Instruction）和对应的详细回答（Output）。</li>
            </ol>
          </HighlightBox>

          <p><strong>数据类型主要分为：</strong></p>
          <ul className="space-y-2 ml-4">
            <li className="flex gap-2">
              <span className="text-blue-500">•</span>
              <span><strong>单轮指令 (Single-turn)：</strong>简单的图像描述或问答。例如 MiniGPT-4, DetGPT。</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-500">•</span>
              <span><strong>多轮对话 (Multi-turn)：</strong>模拟人类与 AI 的连续交互，涉及推理和上下文理解。例如 LLaVA-Instruct-158k, MIMIC-IT。</span>
            </li>
          </ul>

          <SubHeading icon={Layers}>2.2 通用网络架构 (Network Architectures)</SubHeading>
          <p>大多数 VIT 模型遵循"<strong>视觉编码器 + 适配器 + 大语言模型</strong>"的架构设计。</p>

          <div className="space-y-4 mt-6">
            <div className="border border-slate-200 rounded-xl p-5 bg-white">
              <h4 className="text-blue-800 font-bold mb-3">1. 视觉编码器 (Vision Encoder)</h4>
              <p className="text-sm text-slate-600 mb-3">负责将图像转换为视觉特征向量。主流选择包括：</p>
              <ul className="space-y-1 text-sm text-slate-600">
                <li>• <strong>CLIP ViT：</strong>提供丰富的语义特征，适用于图像描述和理解（如 LLaVA）。</li>
                <li>• <strong>SAM-ViT：</strong>来自 Segment Anything Model，提供细粒度的视觉特征，适用于分割和定位任务（如 LISA）。</li>
                <li>• <strong>Point-BERT：</strong>专门用于处理 3D 点云数据。</li>
              </ul>
            </div>

            <div className="border border-slate-200 rounded-xl p-5 bg-white">
              <h4 className="text-blue-800 font-bold mb-3">2. 适配器 (Adapter)</h4>
              <p className="text-sm text-slate-600 mb-3">连接视觉与语言的桥梁，将视觉特征映射到 LLM 的词嵌入空间（Word Embedding Space）。常见形式：</p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <strong>• 线性投影 (Linear Projection)：</strong>简单高效，如 LLaVA 使用的 MLP。
                  <div className="my-2">
                    <BlockMath math="\mathbf{H}_v = \mathbf{W} \cdot \mathbf{Z}_v" />
                  </div>
                </li>
                <li>• <strong>Q-Former：</strong>来自 BLIP-2，使用可学习的 Query Token 提取指令相关的视觉特征，压缩视觉信息。</li>
              </ul>
            </div>

            <div className="border border-slate-200 rounded-xl p-5 bg-white">
              <h4 className="text-blue-800 font-bold mb-3">3. 大语言模型 (LLM)</h4>
              <p className="text-sm text-slate-600">
                作为"大脑"，接收文本指令和对齐后的视觉特征，进行推理并生成回答。主流选择包括 LLaMA, Vicuna, OPT, Flan-T5 等。
              </p>
            </div>
          </div>

          <SubHeading icon={Target}>2.3 训练目标与流程 (Objective)</SubHeading>
          <p>训练通常分为<strong>两个阶段</strong>：</p>
          <ol className="space-y-3 ml-4 my-4">
            <li>
              <strong>1. 预训练 (Feature Alignment)：</strong>
              <span className="text-slate-600">冻结视觉编码器和 LLM，仅训练适配器（Adapter），使视觉特征与语言特征对齐。使用大规模图像-文本对（如 CC3M）。</span>
            </li>
            <li>
              <strong>2. 指令微调 (Instruction Tuning)：</strong>
              <span className="text-slate-600">冻结视觉编码器，训练适配器和 LLM（或仅 LLM 的 LoRA 参数）。使用高质量的指令跟随数据（如 LLaVA-Instruct）。</span>
            </li>
          </ol>

          <p><strong>损失函数</strong>为标准的自回归交叉熵损失：</p>
          <div className="my-4">
            <BlockMath math="\mathcal{L} = - \sum_{i=1}^{L} \log P(x_i | x_{<i}, \mathbf{X}_{\text{instruction}}, \mathbf{X}_{\text{image}})" />
          </div>
        </Section>

        {/* Section 3: Discriminative Tasks */}
        <Section id="discriminative" title="3. 判别式任务 (Discriminative Tasks)" icon={Search}>
          <p>这类任务要求模型对图像内容进行<strong>分类、定位或分割</strong>。</p>

          <SubHeading icon={Eye}>3.1 图像分类 (Image Classification)</SubHeading>
          <p><strong>代表工作：Instruction-ViT</strong></p>
          <p className="text-slate-600">
            Instruction-ViT 将分类任务转化为指令微调问题。它引入了多模态 Prompt（包含文本类别信息和图像信息）。通过 Transformer 的自注意力机制，融合 Prompt 特征和图像特征。训练时，优化 <code className="bg-slate-100 px-1 rounded">[CLS]</code> token 与 Prompt token 之间的相似度，从而引导模型学习类别特征。
          </p>

          <SubHeading icon={Maximize}>3.2 图像分割 (Image Segmentation)</SubHeading>
          <p><strong>代表工作：LISA (Large Language Instructed Segmentation Assistant)</strong></p>
          <p className="text-slate-600 mb-4">
            LISA 提出了"推理分割" (Reasoning Segmentation) 任务。与传统分割不同，它要求模型理解隐含意图的复杂指令（例如："分割出富含维生素C的食物"）。
          </p>

          <HighlightBox title="LISA 的核心设计：Embedding-as-Mask" color="blue">
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• 引入一个新的特殊 Token <code className="bg-blue-100 px-1 rounded">&lt;SEG&gt;</code>。</li>
              <li>• LLM 输出该 Token 的 Embedding <InlineMath math="\hat{h}_{seg}" />。</li>
              <li>• 将 <InlineMath math="\hat{h}_{seg}" /> 与视觉骨干网络生成的特征图进行点积，解码出分割掩码。</li>
              <li>• 实现了端到端的训练能力，无需额外的分割头。</li>
            </ul>
          </HighlightBox>

          <SubHeading icon={Target}>3.3 目标检测 (Object Detection)</SubHeading>
          <p><strong>代表工作：VisionLLM, DetGPT, Shikra</strong></p>
          <ul className="space-y-3 mt-4">
            <li className="flex gap-3">
              <span className="text-blue-500 font-bold">•</span>
              <span>
                <strong>VisionLLM：</strong>
                <span className="text-slate-600">将检测任务定义为语言指令驱动的开放式任务。它设计了"指令感知图像 Tokenizer"，根据语言指令提取特定的视觉信息，然后由 LLM 解码出目标位置（转化为离散的 Token 序列）。</span>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-500 font-bold">•</span>
              <span>
                <strong>DetGPT：</strong>
                <span className="text-slate-600">提出了"推理式目标检测"。用户可以用自然语言描述意图（如"我想要喝冷饮"），模型需要推理出需要检测的物体（如"冰箱"、"杯子"），然后调用检测器定位。</span>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-500 font-bold">•</span>
              <span>
                <strong>Shikra：</strong>
                <span className="text-slate-600">致力于解决多模态大模型的<strong>指代对话 (Referential Dialogue)</strong> 能力。它不仅能理解输入的坐标（如 <code className="bg-slate-100 px-1 rounded">[x1, y1, x2, y2]</code>），还能在输出中直接生成坐标，无需额外的词表或位置编码器，实现了坐标与自然语言的无缝融合。</span>
              </span>
            </li>
          </ul>

          <SubHeading icon={Eye}>3.4 视觉定位 (Visual Grounding)</SubHeading>
          <p><strong>代表工作：Ferret, BuboGPT</strong></p>
          <p className="text-slate-600">视觉定位要求模型将文本描述精确链接到图像区域。</p>
          <ul className="space-y-2 mt-3">
            <li className="flex gap-2">
              <span className="text-blue-500">•</span>
              <span>
                <strong>Ferret：</strong>
                <span className="text-slate-600">提出了一种混合区域表示方法（Hybrid Region Representation）。它不仅支持点和框，还支持自由形状（Free-form shapes）。通过"空间感知视觉采样器"提取区域特征，使得模型能够理解细粒度的空间指令。</span>
              </span>
            </li>
          </ul>
        </Section>

        {/* Section 4: Generative Tasks */}
        <Section id="generative" title="4. 生成式任务 (Generative Tasks)" icon={Sparkles}>
          <p>这类任务涉及<strong>图像的生成和编辑</strong>，通常需要 LLM 与生成模型（如 Stable Diffusion）的结合。</p>

          <SubHeading icon={Sparkles}>4.1 图像生成 (Image Generation)</SubHeading>
          <p><strong>代表工作：GPT4Tools, TextBind</strong></p>
          <p className="text-slate-600">
            GPT4Tools 通过指令微调使 LLM 能够熟练使用各种多模态工具（Tools）。它构建了一个包含工具调用指令的数据集，并通过 LoRA 微调 LLM。当用户指令需要生成图像时，LLM 会输出调用生成工具（如 ControlNet, Stable Diffusion）的 API 命令及参数。
          </p>

          <SubHeading icon={Edit}>4.2 图像编辑 (Image Editing)</SubHeading>
          <p><strong>代表工作：LLaVA-Interactive</strong></p>
          <p className="text-slate-600">
            LLaVA-Interactive 强调多模态交互。它允许用户通过绘制 Bounding Box、提供草图或自然语言指令来编辑图像。例如，用户可以框选图像中的一只狗，并说"把它变成一只猫"，系统会结合视觉特征和语言指令，调用图像编辑模型完成操作。
          </p>
        </Section>

        {/* Section 5: Complex Reasoning Tasks */}
        <Section id="reasoning" title="5. 复杂推理任务 (Complex Reasoning Tasks)" icon={MessageSquare}>
          <p>这是通用多模态模型的核心能力，涵盖了对图像内容的<strong>深度理解、常识推理和问答</strong>。</p>

          <SubHeading>5.1 图像描述与问答 (Captioning & VQA)</SubHeading>
          <p><strong>代表工作：LLaVA, InstructBLIP, mPLUG-Owl</strong></p>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <ModelCard
              title="LLaVA (Large Language and Vision Assistant)"
              description="LLaVA 是该领域的开创性工作之一。它验证了直接将视觉特征映射到 LLM 语义空间的可行性。"
              color="purple"
              features={[
                '<strong>架构：</strong>CLIP ViT-L/14 + 线性投影层 + Vicuna LLM。',
                '<strong>数据：</strong>利用 GPT-4 生成了 LLaVA-Instruct-158k 数据集。',
                '<strong>训练：</strong>两阶段训练（特征对齐 + 端到端微调）。',
                '<strong>LLaVA-1.5：</strong>引入了 MLP 投影层，显著提升了性能。'
              ]}
            />
            <ModelCard
              title="InstructBLIP"
              description="InstructBLIP 侧重于更高效的指令感知特征提取。"
              color="green"
              features={[
                '<strong>Q-Former：</strong>使用指令（Instruction）作为 Q-Former 的文本输入。',
                '通过 Cross-Attention，Q-Former 能够根据指令从图像中提取最相关的特征。',
                '<strong>优势：</strong>在特定任务（如 VQA）上表现出色，因为提取的特征更具针对性。'
              ]}
            />
          </div>

          <SubHeading>5.2 视觉助手 (Visual Assistant)</SubHeading>
          <p><strong>代表工作：CogVLM, Otter</strong></p>
          <ul className="space-y-3 mt-4">
            <li className="flex gap-3">
              <span className="text-blue-500 font-bold">•</span>
              <span>
                <strong>CogVLM：</strong>
                <span className="text-slate-600">提出了"视觉专家模块" (Visual Expert Module)。在 LLM 的每一层中添加了可训练的 QKV 矩阵和 MLP，专门用于处理视觉特征。这实现了视觉和语言特征在深层网络中的<strong>深度融合 (Deep Fusion)</strong>，而非仅仅在输入端拼接。</span>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-500 font-bold">•</span>
              <span>
                <strong>Otter：</strong>
                <span className="text-slate-600">基于 OpenFlamingo，专注于<strong>上下文学习 (In-Context Learning)</strong>。通过 MIMIC-IT 数据集训练，Otter 能够理解多张图像和多轮对话的上下文关系，支持"少样本"指令跟随。</span>
              </span>
            </li>
          </ul>
        </Section>

        {/* Section 6: Domain Specific */}
        <Section id="domains" title="6. 特定领域应用 (Domain Specific Applications)" icon={Puzzle}>
          <p>VIT 的思想也被广泛应用于<strong>视频、3D、医疗</strong>等特定领域，解决领域特有的挑战。</p>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <DomainCard
              icon={Video}
              title="🎥 视频理解 (Video)"
              challenge="如何处理时间维度和时空关系。"
              models={[
                { name: 'Video-ChatGPT', desc: '使用 CLIP 提取帧特征，通过平均池化融合时空特征，微调 LLM 进行视频问答。' },
                { name: 'Video-LLaMA', desc: '引入了"视频 Q-Former"和"音频 Q-Former"，分别处理视觉和听觉信息，实现了音视频联合理解。' }
              ]}
            />
            <DomainCard
              icon={Box}
              title="🧊 3D 视觉 (3D Vision)"
              challenge="3D 数据（点云）的稀疏性和结构复杂性。"
              models={[
                { name: 'PointLLM', desc: '使用 Point-BERT 等编码器提取点云特征，映射到 LLM 空间。支持用户对 3D 物体进行旋转、描述和问答。' },
                { name: 'LAMM', desc: '提出了涵盖 2D 图像和 3D 点云的综合数据集和基准，推动了 3D 视觉语言模型的发展。' }
              ]}
            />
            <DomainCard
              icon={Stethoscope}
              title="🏥 医疗健康 (Medical)"
              challenge="专业知识门槛高，数据隐私。"
              models={[
                { name: 'LLaVA-Med', desc: '使用 PubMed Central 的生物医学图像-文本对进行微调，能够在一天内将通用模型转化为医疗助手。' },
                { name: 'OphGLM', desc: '专注于眼科领域，集成了眼底图像诊断模型和 LLM，能够生成专业的诊断报告。' }
              ]}
            />
            <DomainCard
              icon={FileText}
              title="📄 文档理解 (Document)"
              challenge="细微文字识别，布局理解。"
              models={[
                { name: 'mPLUG-DocOwl', desc: '针对 OCR-free 的文档理解，能够处理图表、网页截图和扫描文档，无需依赖外部 OCR 引擎，直接端到端理解像素信息。' }
              ]}
            />
          </div>
        </Section>

        {/* Section 7: Challenges */}
        <Section id="challenges" title="7. 挑战与未来展望" icon={AlertTriangle}>
          <p className="mb-6">尽管 VIT 取得了巨大进展，但仍面临诸多挑战：</p>

          <div className="space-y-4">
            <HighlightBox color="rose">
              <h4 className="font-bold text-rose-800 mb-2">🔮 幻觉问题 (Object Hallucination)</h4>
              <p className="text-sm text-slate-600">
                模型倾向于生成与图像不符的描述（例如描述不存在的物体）。这通常源于 LLM 的过度自信或训练数据中的偏差。未来需要更鲁棒的对齐策略（如 RLHF）来缓解。
              </p>
            </HighlightBox>

            <HighlightBox color="amber">
              <h4 className="font-bold text-amber-800 mb-2">📊 评估体系 (Evaluation)</h4>
              <p className="text-sm text-slate-600">
                现有的评估（如 GPT-4 打分）虽然方便，但存在主观性和不稳定性。传统的 VQA 准确率又难以衡量开放式对话的质量。社区急需更全面、客观的评估基准（如 MMBench, SeedBench）。
              </p>
            </HighlightBox>

            <HighlightBox color="blue">
              <h4 className="font-bold text-blue-800 mb-2">🔬 多模态对齐的粒度 (Granularity of Alignment)</h4>
              <p className="text-sm text-slate-600">
                目前大多数模型主要进行图像级（Image-level）对齐，缺乏细粒度的区域级（Region-level）或像素级（Pixel-level）对齐，限制了模型在精细任务（如定位、分割）上的表现。
              </p>
            </HighlightBox>

            <HighlightBox color="purple">
              <h4 className="font-bold text-purple-800 mb-2">📐 长上下文与高分辨率 (Long Context & High-Res)</h4>
              <p className="text-sm text-slate-600">
                处理长视频或包含密集文本的高分辨率图像（如 4K 文档）对计算资源要求极高。需要探索更高效的 Tokenizer 和稀疏注意力机制。
              </p>
            </HighlightBox>
          </div>
        </Section>

        {/* Footer */}
        <footer className="text-center text-slate-500 text-sm mt-16 pb-8 border-t border-slate-200 pt-8">
          <p>Based on: <em>"Visual Instruction Tuning towards General-Purpose Multimodal Model: A Survey" (2023)</em></p>
        </footer>
      </div>
    </div>
  );
};

export default VITPaper;









