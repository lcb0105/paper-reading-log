import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Cpu, FlaskConical, Layers, Database, Zap, Target, AlertTriangle, Users, BarChart3, FileText, Eye } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

// --- 通用组件 ---
const Section = ({ id, title, icon: Icon, children, className = "" }) => (
  <section id={id} className={`bg-white rounded-xl shadow-md p-8 mb-8 hover:shadow-lg transition-shadow ${className}`}>
    <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-4 flex items-center gap-3">
      {Icon && <Icon className="text-blue-600" size={24} />}
      {title}
    </h2>
    {children}
  </section>
);

const MathBlock = ({ children }) => (
  <div className="overflow-x-auto p-4 bg-slate-50 rounded-lg border-l-4 border-blue-500 my-4">
    <BlockMath math={children} />
  </div>
);

const HighlightBox = ({ title, children, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-50 border-blue-500 text-blue-800",
    green: "bg-green-50 border-green-500 text-green-800",
    purple: "bg-purple-50 border-purple-500 text-purple-800",
    amber: "bg-amber-50 border-amber-500 text-amber-800"
  };
  return (
    <div className={`border-l-4 p-4 rounded-r-lg my-4 ${colors[color]}`}>
      {title && <p className="font-bold mb-2">{title}</p>}
      {children}
    </div>
  );
};

// --- 主组件 ---
const DeepSeekVL = () => {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans selection:bg-blue-100">
      
      {/* 返回按钮 */}
      <div className="fixed top-4 left-4 z-50">
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-lg text-slate-600 hover:text-blue-600 transition-colors border border-slate-200 shadow-sm"
        >
          <ArrowLeft size={16} />
          返回
        </Link>
      </div>

      {/* Header */}
      <header className="bg-slate-900 text-white py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px'}}></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-blue-400 font-bold tracking-widest uppercase mb-2">Paper Explanation</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">DeepSeek-VL: 迈向真实世界的视觉-语言理解</h1>
          <p className="text-xl text-gray-300 font-light">
            <span className="font-semibold">论文原名：</span> DeepSeek-VL: Towards Real-World Vision-Language Understanding<br/>
            <span className="font-semibold">作者机构：</span> DeepSeek-AI
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="px-4 py-1.5 bg-blue-600 rounded-full text-sm font-medium">Hybrid Vision Encoder</span>
            <span className="px-4 py-1.5 bg-slate-700 rounded-full text-sm font-medium">1024×1024 高分辨率</span>
            <span className="px-4 py-1.5 bg-slate-700 rounded-full text-sm font-medium">SigLIP + SAM</span>
            <span className="px-4 py-1.5 bg-slate-700 rounded-full text-sm font-medium">arXiv 2024</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">

        {/* 1. 摘要与核心理念 */}
        <Section title="1. 摘要与核心理念" icon={BookOpen}>
          <p className="text-lg leading-relaxed mb-4 text-slate-700">
            DeepSeek-VL 是一款开源的视觉-语言（VL）模型，专为<strong className="text-slate-900">现实世界的视觉和语言理解应用</strong>而设计。传统的开源模型往往在基准测试中表现出色，但在实际用户体验（如处理高分辨率图表、复杂截图）上与 GPT-4V 等闭源模型存在差距。
          </p>

          {/* 模型版本信息 */}
          <div className="grid grid-cols-2 gap-4 my-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200 text-center">
              <div className="text-3xl font-bold text-blue-600">1.3B</div>
              <div className="text-sm text-blue-800">轻量版模型</div>
              <div className="text-xs text-slate-500 mt-1">适合边缘部署</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200 text-center">
              <div className="text-3xl font-bold text-purple-600">7B</div>
              <div className="text-sm text-purple-800">标准版模型</div>
              <div className="text-xs text-slate-500 mt-1">性能最优</div>
            </div>
          </div>

          <p className="text-lg leading-relaxed mb-4 text-slate-700">
            该论文的核心贡献围绕三个关键维度展开：
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li><strong className="text-slate-900">数据构建 (Data Construction)：</strong> 强调多样性、可扩展性和对现实场景（网页截图、PDF、OCR、图表）的覆盖。</li>
            <li><strong className="text-slate-900">模型架构 (Model Architecture)：</strong> 引入混合视觉编码器（Hybrid Vision Encoder），在固定 Token 预算下高效处理 <InlineMath math="1024 \times 1024" /> 高分辨率图像。</li>
            <li><strong className="text-slate-900">训练策略 (Training Strategy)：</strong> 在多模态预训练中通过保留大量纯文本数据，防止 LLM 的语言能力退化。</li>
          </ul>

          <HighlightBox title="关键发现：混合编码器的优势" color="green">
            <p className="text-sm">
              传统单一编码器（如 CLIP）在语义理解上表现出色，但对细节（如 OCR 文字、小物体）存在"盲区"。
              DeepSeek-VL 通过结合 <strong>SigLIP（语义）</strong> 和 <strong>SAM（细节）</strong>，
              在固定 576 Token 预算下实现了语义与细节的双重捕捉。
            </p>
          </HighlightBox>
        </Section>

        {/* 1.5 开源模型与闭源模型差距分析 */}
        <Section title="1.5 开源与闭源模型差距的深层原因" icon={AlertTriangle}>
          <p className="text-slate-600 mb-4">
            论文深入分析了为什么大多数开源多模态模型在真实场景中与 GPT-4V、Gemini 等闭源模型存在显著差距：
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 rounded-full font-bold text-sm">1</span>
              <div>
                <strong className="text-red-800">过度依赖指令微调</strong>
                <p className="text-sm text-red-700 mt-1">
                  许多开源方案将大量计算资源分配给指令微调阶段。然而，训练强大语言模型的经验表明，<strong>广泛的预训练</strong>对于发展通用智能至关重要。
                  要让多模态模型拥有丰富的世界知识，应强调利用广泛的视觉-语言数据进行全面预训练。
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-orange-100 text-orange-600 rounded-full font-bold text-sm">2</span>
              <div>
                <strong className="text-orange-800">学术数据集堆砌</strong>
                <p className="text-sm text-orange-700 mt-1">
                  常见做法是在指令微调期间混合各种学术数据集。虽然这种方法可能产生良好的基准测试结果，
                  但往往<strong>无法提供真实的实际使用体验</strong>。学术数据集与真实用户场景存在分布偏差。
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-yellow-100 text-yellow-600 rounded-full font-bold text-sm">3</span>
              <div>
                <strong className="text-yellow-800">分辨率过低</strong>
                <p className="text-sm text-yellow-700 mt-1">
                  大多数现有模型使用相对较低的分辨率（如 <InlineMath math="336 \times 336" /> 或 <InlineMath math="448 \times 448" />）。
                  复杂的真实场景（如 OCR、细小物体辨别）需要<strong>高分辨率处理能力</strong>。
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full font-bold text-sm">4</span>
              <div>
                <strong className="text-purple-800">语言能力退化</strong>
                <p className="text-sm text-purple-700 mt-1">
                  一些模型虽然利用了预训练，但往往忽视了语言技能的保留。长时间的多模态训练后，
                  <strong>语言能力经常出现退化（Catastrophic Forgetting）</strong>。
                  理想的通用模型应该在发展新模态能力的同时，保持原有的语言能力。
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* 2. 数据构建 */}
        <Section title="2. 数据构建 (Data Construction)" icon={Database}>
          <p className="text-slate-600 mb-6">
            论文强调，高质量、多样化的数据是构建强大多模态模型的基础。数据构建分为两个关键部分：
          </p>

          {/* 2.1 预训练数据 */}
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Eye size={20} className="text-blue-600" />
            2.1 视觉-语言预训练数据
          </h3>
          <p className="text-slate-600 mb-4">
            预训练数据强调<strong className="text-slate-900">多样性、可扩展性和对真实场景的覆盖</strong>：
          </p>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="font-bold text-slate-800 mb-2">📄 文档类</div>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• 网页截图</li>
                <li>• PDF 文档</li>
                <li>• 学术论文</li>
              </ul>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="font-bold text-slate-800 mb-2">📊 数据可视化</div>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• 图表 (Charts)</li>
                <li>• 表格 (Tables)</li>
                <li>• 信息图表</li>
              </ul>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="font-bold text-slate-800 mb-2">🔤 文本识别</div>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• OCR 场景</li>
                <li>• 手写识别</li>
                <li>• 多语言文本</li>
              </ul>
            </div>
          </div>

          {/* 2.2 Use Case Taxonomy */}
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <FileText size={20} className="text-green-600" />
            2.2 Use Case Taxonomy（用例分类法）
          </h3>
          <HighlightBox title="核心创新：从真实用户场景构建指令数据" color="green">
            <p className="text-sm mb-2">
              不同于简单堆砌学术数据集，论文从<strong>真实用户场景</strong>出发，构建了一套用例分类体系（Use Case Taxonomy）。
              根据这个分类体系构建指令微调数据集，显著提升了模型在实际应用中的用户体验。
            </p>
          </HighlightBox>

          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden mt-4">
            <div className="bg-slate-100 px-4 py-2 font-bold text-slate-800">真实用例分类</div>
            <div className="p-4 grid md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>转换任务（Convert）：表格转 Markdown、图表转数据</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>描述任务（Describe）：图像描述、内容总结</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span>解释任务（Explain）：代码解释、流程图解读</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                <span>问答任务（QA）：基于图像的问答</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span>OCR 任务：文字识别与提取</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                <span>推理任务（Reasoning）：逻辑推理、数学解题</span>
              </div>
            </div>
          </div>

          <HighlightBox title="与学术数据集的关键区别" color="amber">
            <p className="text-sm">
              学术数据集（如 VQAv2、COCO Caption）通常具有固定的任务格式和标注风格，
              而<strong>真实用户的需求更加多样化和开放式</strong>。
              Use Case Taxonomy 确保模型在各种真实场景下都能提供有用的回答。
            </p>
          </HighlightBox>
        </Section>

        {/* 3. 模型架构详解 */}
        <Section id="architecture" title="3. 模型架构详解 (Architecture)" icon={Cpu}>
          <p className="mb-4 text-slate-600">
            DeepSeek-VL 的架构设计核心在于解决<strong className="text-slate-900">高分辨率图像处理</strong>与<strong className="text-slate-900">计算效率</strong>之间的矛盾。大多数现有模型使用 <InlineMath math="336 \times 336" /> 左右的分辨率，难以看清密集文本（OCR）或细小物体。
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div>
              <h3 className="text-xl font-bold text-blue-700 mb-3">混合视觉编码器 (Hybrid Vision Encoder)</h3>
              <p className="text-sm text-slate-600 mb-4">
                模型结合了两个视觉编码器，分别负责不同的任务：
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-green-100 text-green-600 rounded-full mr-3 font-bold text-sm">1</span>
                  <div>
                    <strong className="block text-slate-800">SigLIP-L (语义理解)</strong>
                    <span className="text-slate-500 text-sm">处理低分辨率 (<InlineMath math="384 \times 384" />) 图像。CLIP 系列模型擅长提取高级语义特征，但在细节定位上存在"盲区"。</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full mr-3 font-bold text-sm">2</span>
                  <div>
                    <strong className="block text-slate-800">SAM-B (细节捕捉)</strong>
                    <span className="text-slate-500 text-sm">处理高分辨率 (<InlineMath math="1024 \times 1024" />) 图像。使用 Segment Anything Model (SAM) 的 ViTDet 编码器，擅长捕捉底层细节和空间位置。</span>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
              <h3 className="text-xl font-bold text-blue-700 mb-3">视觉-语言适配器 (VL Adaptor)</h3>
              <p className="text-slate-600 mb-4">
                使用两层混合 MLP (Multi-Layer Perceptron) 将视觉特征映射到 LLM 的输入空间。
              </p>
              <div className="text-center py-4">
                <div className="inline-block bg-white p-4 shadow rounded border border-gray-200">
                  <span className="block text-xs text-gray-400 mb-2">Architecture Flow</span>
                  <div className="font-mono text-sm space-y-1">
                    <div>Image → [SigLIP + SAM]</div>
                    <div className="text-slate-400">↓</div>
                    <div>Concat Features</div>
                    <div className="text-slate-400">↓</div>
                    <div>2-Layer MLP</div>
                    <div className="text-slate-400">↓</div>
                    <div>LLM (DeepSeek-LLM)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 4. 核心公式与维度变换详解 */}
        <Section id="formulas" title="4. 核心公式与维度变换详解" icon={Target} className="border-l-8 border-blue-600">
          <p className="mb-4 text-slate-700">
            本节将论文中关于混合视觉编码器的处理流程转化为具体的数学公式和张量变换步骤。这是 DeepSeek-VL 高效处理 1024 分辨率图像的关键。
          </p>

          <h3 className="text-xl font-bold text-slate-700 mt-6 mb-2">4.1 SAM-B 编码器的特征变换</h3>
          
          <HighlightBox title="目标：" color="blue">
            <p>将 <InlineMath math="1024 \times 1024" /> 的高分辨率图像压缩为适量的 Token，同时保留细节。</p>
          </HighlightBox>

          <p className="mb-2 font-semibold text-slate-800">步骤 1：原始特征提取</p>
          <MathBlock>{`I_{high} \\in \\mathbb{R}^{1024 \\times 1024 \\times 3}`}</MathBlock>
          <MathBlock>{`F_{SAM} = \\text{Encoder}_{SAM}(I_{high})`}</MathBlock>
          <MathBlock>{`F_{SAM} \\in \\mathbb{R}^{64 \\times 64 \\times 256}`}</MathBlock>
          <p className="text-sm text-gray-500 mb-4">解释：输入图像 <InlineMath math="I_{high}" /> 经过 SAM-B 编码器，输出特征图 <InlineMath math="F_{SAM}" />。此时特征图空间尺寸为 <InlineMath math="64 \times 64" />，通道数为 256。</p>

          <p className="mb-2 font-semibold text-slate-800">步骤 2：插值与卷积下采样 (关键步骤)</p>
          <p className="text-sm mb-2 text-slate-600">为了与最终的 Token 预算匹配，模型先插值放大，再通过卷积降维。</p>
          <MathBlock>{`F'_{SAM} = \\text{Interpolate}(F_{SAM}, \\text{size}=(96, 96))`}</MathBlock>
          <MathBlock>{`F'_{SAM} \\in \\mathbb{R}^{96 \\times 96 \\times 256}`}</MathBlock>
          <MathBlock>{`F''_{SAM} = \\text{Conv2d}_{\\text{stride}=2}(F'_{SAM})`}</MathBlock>
          <MathBlock>{`F''_{SAM} \\in \\mathbb{R}^{24 \\times 24 \\times 1024}`}</MathBlock>
          <p className="text-sm text-gray-500 mb-4">
            解释：1. 首先将 <InlineMath math="64 \times 64" /> 插值到 <InlineMath math="96 \times 96" />。
            2. 然后使用步长为 2 的卷积层。空间尺寸变为 <InlineMath math="96 / 2 = 48" /> (注意：论文原文此处描述为 <InlineMath math="24 \times 24" />，这通常意味着使用了两层步长为2的卷积，或者单层步长为4的变换，根据论文描述 "two convolutional layers with a stride of 2"，即 <InlineMath math="96 \to 48 \to 24" />)。
            3. 最终特征维度被投影到 1024。
          </p>

          <p className="mb-2 font-semibold text-slate-800">步骤 3：特征展平 (Flattening)</p>
          <MathBlock>{`T_{high} = \\text{Reshape}(F''_{SAM})`}</MathBlock>
          <MathBlock>{`T_{high} \\in \\mathbb{R}^{(24 \\times 24) \\times 1024} = \\mathbb{R}^{576 \\times 1024}`}</MathBlock>
          <p className="text-sm text-gray-500 mb-4">解释：SAM 分支最终贡献了 <strong className="text-slate-800">576 个 Token</strong>。</p>

          <h3 className="text-xl font-bold text-slate-700 mt-6 mb-2">4.2 特征融合 (Fusion)</h3>
          <p className="text-slate-600 mb-4">SigLIP 分支处理 <InlineMath math="384 \times 384" /> 图像，也生成 576 个 Token（通常是 <InlineMath math="24 \times 24" /> 的 patch grid）。</p>
          <MathBlock>{`T_{low} = \\text{Encoder}_{SigLIP}(I_{low}) \\in \\mathbb{R}^{576 \\times 1024}`}</MathBlock>
          <MathBlock>{`T_{final} = \\text{Concat}(T_{high}, T_{low}, \\text{dim}=\\text{channel})`}</MathBlock>
          <MathBlock>{`T_{final} \\in \\mathbb{R}^{576 \\times 2048}`}</MathBlock>
          <p className="text-sm text-gray-500">
            解释：两个编码器的特征在通道维度拼接（论文中提到 "concatenated with the high-resolution features"）。这意味着对于每个空间位置，模型同时拥有语义信息（SigLIP）和细节信息（SAM）。最终输入 LLM 的是 576 个 Token，每个 Token 维度为 2048。
          </p>
        </Section>

        {/* 5. 训练策略 */}
        <Section title="5. 训练策略 (Training Pipeline)" icon={FlaskConical}>
          <div className="space-y-6">
            
            {/* Stage 1 */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/4">
                <div className="bg-gray-100 p-3 rounded font-bold text-center">Stage 1</div>
                <div className="text-center text-sm text-gray-500 mt-1">VL Adaptor Warmup</div>
              </div>
              <div className="w-full md:w-3/4 text-slate-700">
                <p><strong>冻结：</strong> 视觉编码器 (Vision Encoder)、语言模型 (LLM)。</p>
                <p><strong>训练：</strong> 仅训练 VL Adaptor。</p>
                <p><strong>目的：</strong> 建立视觉特征与语言语义的基本对齐。</p>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="flex flex-col md:flex-row gap-4 border-t pt-4">
              <div className="w-full md:w-1/4">
                <div className="bg-blue-100 text-blue-800 p-3 rounded font-bold text-center">Stage 2 (核心)</div>
                <div className="text-center text-sm text-gray-500 mt-1">Joint VL Pretraining</div>
              </div>
              <div className="w-full md:w-3/4 text-slate-700">
                <p><strong>冻结：</strong> 视觉编码器。</p>
                <p><strong>训练：</strong> VL Adaptor + LLM。</p>
                <p className="font-semibold text-slate-800 mt-2">关键策略：竞争动力学管理</p>
                <p className="text-sm text-gray-600 mt-2">
                  如果在预训练中只使用多模态数据，LLM 的语言能力会急剧下降（Catastrophic Forgetting）。
                  论文提出的解决方案是保持高比例的纯文本数据。
                </p>
                <MathBlock>{`\\text{Ratio}_{\\text{Language}} : \\text{Ratio}_{\\text{Multimodal}} \\approx 7 : 3`}</MathBlock>
                <p className="text-sm text-gray-600">
                  此外，引入 <strong>Modality Warm-up</strong> 策略：从纯文本开始，逐渐增加视觉-语言数据的比例。
                </p>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="flex flex-col md:flex-row gap-4 border-t pt-4">
              <div className="w-full md:w-1/4">
                <div className="bg-gray-100 p-3 rounded font-bold text-center">Stage 3</div>
                <div className="text-center text-sm text-gray-500 mt-1">Supervised Fine-tuning</div>
              </div>
              <div className="w-full md:w-3/4 text-slate-700">
                <p><strong>训练：</strong> LLM, VL Adaptor, 以及 SigLIP 视觉编码器（SAM 保持冻结）。</p>
                <p><strong>数据：</strong> 使用构建的指令微调数据集（包含 Taxonomy 分类的真实案例）。</p>
              </div>
            </div>
          </div>
        </Section>

        {/* 6. 实验结果 */}
        <Section title="6. 实验结果 (Evaluation)" icon={BarChart3}>
          <h3 className="text-xl font-bold text-slate-800 mb-4">6.1 多模态基准测试</h3>
          <p className="text-slate-600 mb-4">
            DeepSeek-VL 在多个权威多模态基准上进行了全面评估：
          </p>
          
          {/* Benchmark 表格 */}
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-800">基准测试</th>
                  <th className="px-4 py-3 text-center font-bold text-slate-800">DeepSeek-VL-7B</th>
                  <th className="px-4 py-3 text-center font-bold text-slate-800">LLaVA-Next-7B</th>
                  <th className="px-4 py-3 text-center font-bold text-slate-800">Yi-VL-6B</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium">MMMU (val)</td>
                  <td className="px-4 py-3 text-center font-bold text-green-600">36.6</td>
                  <td className="px-4 py-3 text-center">35.3</td>
                  <td className="px-4 py-3 text-center">39.1</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="px-4 py-3 font-medium">CMMMU (val)</td>
                  <td className="px-4 py-3 text-center font-bold text-green-600">32.2</td>
                  <td className="px-4 py-3 text-center">-</td>
                  <td className="px-4 py-3 text-center">-</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium">MMBench (test)</td>
                  <td className="px-4 py-3 text-center font-bold text-green-600">73.2</td>
                  <td className="px-4 py-3 text-center">67.4</td>
                  <td className="px-4 py-3 text-center">68.4</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="px-4 py-3 font-medium">SeedBench (Image)</td>
                  <td className="px-4 py-3 text-center font-bold text-green-600">70.4</td>
                  <td className="px-4 py-3 text-center">64.8</td>
                  <td className="px-4 py-3 text-center">67.5</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mb-4">6.2 语言能力保留</h3>
          <HighlightBox title="关键发现：多模态训练后语言能力不退化" color="green">
            <p className="text-sm">
              许多多模态模型在训练后语言能力（如 MMLU、GSM8K）会严重下降。
              DeepSeek-VL 通过<strong>7:3 的文本/多模态数据配比</strong>和<strong>Modality Warm-up 策略</strong>，
              成功保持了与原始 DeepSeek-LLM 相当的语言性能。
            </p>
          </HighlightBox>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-slate-700">MMLU</span>
                <span className="text-green-600 font-bold">64.3%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width: '64.3%'}}></div>
              </div>
              <p className="text-xs text-slate-500 mt-1">接近原始 DeepSeek-LLM-7B 水平</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-slate-700">GSM8K</span>
                <span className="text-green-600 font-bold">64.1%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width: '64.1%'}}></div>
              </div>
              <p className="text-xs text-slate-500 mt-1">数学推理能力保持良好</p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">6.3 人工评估 (Human Evaluation)</h3>
          <p className="text-slate-600 mb-4">
            论文进行了人工评估，验证模型在真实用户场景下的表现：
          </p>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
            <p className="text-blue-800 text-sm">
              在涵盖 <strong>OCR、图表理解、代码解释、创意写作</strong>等多种真实任务的人工评估中，
              DeepSeek-VL-7B 展现了优秀的用户体验，在多数场景下优于同规模的开源模型，
              并在部分任务上接近 GPT-4V 的表现。
            </p>
          </div>
        </Section>

        {/* 7. 消融实验 */}
        <Section title="7. 消融实验 (Ablation Study)" icon={FlaskConical}>
          <p className="text-slate-600 mb-6">
            论文通过消融实验验证了各设计选择的有效性：
          </p>

          <div className="space-y-4">
            {/* 消融 1：混合编码器 */}
            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
              <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded text-sm font-bold">1</span>
                混合视觉编码器 vs 单一编码器
              </h4>
              <p className="text-sm text-slate-600 mb-3">
                对比使用单一 SigLIP 或单一 SAM 与混合编码器的效果：
              </p>
              <div className="grid grid-cols-3 gap-3 text-center text-sm">
                <div className="bg-red-50 p-3 rounded border border-red-200">
                  <div className="font-bold text-red-600">仅 SigLIP</div>
                  <div className="text-red-800 text-xs mt-1">高级语义 ✓ / 细节 ✗</div>
                </div>
                <div className="bg-orange-50 p-3 rounded border border-orange-200">
                  <div className="font-bold text-orange-600">仅 SAM</div>
                  <div className="text-orange-800 text-xs mt-1">细节 ✓ / 语义 ✗</div>
                </div>
                <div className="bg-green-50 p-3 rounded border border-green-200">
                  <div className="font-bold text-green-600">SigLIP + SAM</div>
                  <div className="text-green-800 text-xs mt-1">语义 ✓ + 细节 ✓</div>
                </div>
              </div>
              <HighlightBox color="blue">
                <p className="text-sm">
                  <strong>结论：</strong> 混合编码器在 OCR、图表理解等需要细节的任务上显著优于单一编码器，
                  同时保持了在语义理解任务上的性能。
                </p>
              </HighlightBox>
            </div>

            {/* 消融 2：预训练数据配比 */}
            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
              <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 flex items-center justify-center bg-purple-100 text-purple-600 rounded text-sm font-bold">2</span>
                预训练数据配比的影响
              </h4>
              <p className="text-sm text-slate-600 mb-3">
                探索不同的纯文本与多模态数据配比对模型性能的影响：
              </p>
              <MathBlock>{`\\text{最优配比} = \\text{Language} : \\text{Multimodal} \\approx 7 : 3`}</MathBlock>
              <HighlightBox color="purple">
                <p className="text-sm">
                  <strong>结论：</strong> 保持约 70% 的纯文本数据对于防止语言能力退化至关重要。
                  配比过低会导致 MMLU 等语言基准显著下降，配比过高则限制多模态能力的发展。
                </p>
              </HighlightBox>
            </div>

            {/* 消融 3：Modality Warm-up */}
            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
              <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 flex items-center justify-center bg-green-100 text-green-600 rounded text-sm font-bold">3</span>
                Modality Warm-up 策略
              </h4>
              <p className="text-sm text-slate-600 mb-3">
                验证渐进式引入多模态数据的效果：
              </p>
              <div className="flex items-center justify-center gap-2 text-sm my-4">
                <div className="bg-slate-100 px-3 py-2 rounded">100% 文本</div>
                <span className="text-slate-400">→</span>
                <div className="bg-blue-100 px-3 py-2 rounded">85% 文本 + 15% VL</div>
                <span className="text-slate-400">→</span>
                <div className="bg-purple-100 px-3 py-2 rounded">70% 文本 + 30% VL</div>
              </div>
              <HighlightBox color="green">
                <p className="text-sm">
                  <strong>结论：</strong> 从纯文本开始，逐渐增加多模态数据比例，比直接使用固定比例训练更稳定，
                  能有效缓解模态间的竞争动力学问题。
                </p>
              </HighlightBox>
            </div>
          </div>
        </Section>

        {/* 8. 总结与局限 */}
        <Section title="8. 总结与局限 (Conclusion)" icon={Layers} className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
          <h3 className="text-xl font-bold text-slate-800 mb-4">核心贡献</h3>
          <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6">
            <li><strong className="text-slate-900">混合视觉编码器：</strong> SigLIP + SAM 的组合在固定 Token 预算下实现了语义与细节的双重捕捉</li>
            <li><strong className="text-slate-900">Use Case Taxonomy：</strong> 从真实用户场景构建指令数据，提升实际应用体验</li>
            <li><strong className="text-slate-900">语言能力保留：</strong> 7:3 数据配比 + Modality Warm-up 成功防止了语言能力退化</li>
            <li><strong className="text-slate-900">开源贡献：</strong> 发布 1.3B 和 7B 两个版本，推动社区发展</li>
          </ul>

          <h3 className="text-xl font-bold text-slate-800 mb-4">局限与未来方向</h3>
          <div className="bg-white/50 p-4 rounded-lg border border-blue-200">
            <ul className="list-disc list-inside space-y-2 text-slate-700 text-sm">
              <li>虽然在逻辑推理上优于开源模型，但与 GPT-4V 等闭源模型仍有差距</li>
              <li>高分辨率处理增加了计算开销</li>
              <li><strong className="text-blue-700">未来计划：</strong> 通过引入 <strong>MoE (Mixture of Experts)</strong> 技术扩大模型规模，进一步缩小与闭源模型的差距</li>
            </ul>
          </div>
        </Section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center mt-12">
        <p className="text-sm">基于 DeepSeek-VL 论文 (arXiv:2403.05525v2) 生成</p>
      </footer>
    </div>
  );
};

export default DeepSeekVL;

