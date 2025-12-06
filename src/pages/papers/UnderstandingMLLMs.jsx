import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shapes, 
  Eye, 
  Plug, 
  ArrowLeft,
  Check,
  Star,
  ArrowDown,
  ArrowRight,
  Layers,
  BookOpen,
  Cpu,
  Database,
  Zap,
  ChevronDown,
  ChevronUp,
  Code,
  GitBranch,
  Settings,
  Image as ImageIcon
} from 'lucide-react';

// --- Components ---
const SectionCard = ({ children, className = "", borderColor = "border-gray-200" }) => (
  <div className={`bg-white rounded-2xl shadow-sm border ${borderColor} overflow-hidden transition-all hover:shadow-lg ${className}`}>
    {children}
  </div>
);

const ModelTag = ({ children, color = "gray" }) => {
  const colorMap = {
    green: "bg-green-100 text-green-800",
    blue: "bg-blue-100 text-blue-800",
    purple: "bg-purple-100 text-purple-800",
    gray: "bg-gray-200 text-gray-800",
    orange: "bg-orange-100 text-orange-800"
  };
  return (
    <span className={`text-[0.65rem] px-2 py-0.5 rounded-full font-semibold tracking-wide uppercase ${colorMap[color]}`}>
      {children}
    </span>
  );
};

const ModelCard = ({ name, company, tag, tagColor, description, details, borderColor = "border-l-gray-400" }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-gray-200 p-5 border-l-4 ${borderColor} hover:shadow-lg transition-shadow`}>
    <div className="flex justify-between items-start mb-2">
      <h3 className="font-bold text-lg text-gray-900">{name} {company && <span className="text-gray-500 font-normal text-sm">({company})</span>}</h3>
      <ModelTag color={tagColor}>{tag}</ModelTag>
    </div>
    <p className="text-sm text-gray-600 mb-3">{description}</p>
    <div className="bg-gray-50 p-3 rounded text-xs space-y-2">
      {details.map((detail, idx) => (
        <div key={idx} className="flex gap-2">
          <span className="font-semibold w-24 flex-shrink-0">{detail.label}:</span>
          <span dangerouslySetInnerHTML={{ __html: detail.value }} />
        </div>
      ))}
    </div>
  </div>
);

const Accordion = ({ title, children, defaultOpen = false, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-200 rounded-xl mb-4 overflow-hidden bg-white">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left font-medium text-gray-800 hover:bg-gray-50 transition-colors"
      >
        <span className="flex items-center gap-2">
          {Icon && <Icon size={18} className="text-indigo-600" />}
          {title}
        </span>
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

const CodeBlock = ({ code, language = "python" }) => (
  <div className="bg-slate-900 text-slate-100 p-4 rounded-lg text-xs font-mono overflow-x-auto">
    <pre>{code}</pre>
  </div>
);

// --- Main Component ---
const UnderstandingMLLMs = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-700">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-gray-600 hover:text-indigo-600 transition">
              <ArrowLeft size={20} />
            </Link>
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 text-white p-1.5 rounded-lg">
                <Shapes size={18} />
              </div>
              <h1 className="font-bold text-lg tracking-tight text-gray-900 hidden sm:block">
                Multimodal <span className="text-indigo-600">LLMs</span> Analysis
              </h1>
            </div>
          </div>
          <div className="flex gap-1 sm:gap-4 text-xs sm:text-sm font-medium text-gray-600 overflow-x-auto">
            <button onClick={() => scrollToSection('usecases')} className="hover:text-indigo-600 px-2 py-1 whitespace-nowrap transition">用例</button>
            <button onClick={() => scrollToSection('architecture')} className="hover:text-indigo-600 px-2 py-1 whitespace-nowrap transition">核心架构</button>
            <button onClick={() => scrollToSection('encoder')} className="hover:text-indigo-600 px-2 py-1 whitespace-nowrap transition">图像编码器</button>
            <button onClick={() => scrollToSection('training')} className="hover:text-indigo-600 px-2 py-1 whitespace-nowrap transition">训练策略</button>
            <button onClick={() => scrollToSection('models')} className="hover:text-indigo-600 px-2 py-1 whitespace-nowrap transition">10大模型</button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* Header */}
        <header className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wide border border-indigo-100">
            Based on Sebastian Raschka's Comprehensive Guide
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
            理解多模态大语言模型<br/>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">原理、架构与最新前沿</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            从 LLaVA 到 Llama 3.2，从统一嵌入到交叉注意力。本文全面解析多模态 LLM 如何通过 Vision Encoder 和 Projector 将像素世界融入文本推理，并深入对比 2024 年发布的 10 款前沿模型。
          </p>
        </header>

        {/* Section 0: Use Cases */}
        <section id="usecases" className="space-y-6 scroll-mt-24">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 bg-indigo-600 h-8 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">0. 什么是多模态 LLM？用例与应用</h2>
          </div>
          
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">核心定义</h3>
                <p className="text-gray-700 mb-4">
                  <strong>多模态 LLM (Multimodal LLMs)</strong> 是能够处理多种输入类型的大型语言模型，其中每种"模态"代表一种特定的数据类型——如文本（传统 LLM）、声音、图像、视频等。
                </p>
                <p className="text-gray-700">
                  简单来说，它们可以"看懂"图片并用文字描述，或者根据图片回答问题。
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">典型应用场景</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="bg-indigo-100 p-1.5 rounded text-indigo-700 mt-0.5"><ImageIcon size={16} /></div>
                    <div>
                      <div className="font-semibold text-gray-800">图像描述 (Image Captioning)</div>
                      <div className="text-sm text-gray-600">输入图片，模型生成描述文字</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-100 p-1.5 rounded text-purple-700 mt-0.5"><BookOpen size={16} /></div>
                    <div>
                      <div className="font-semibold text-gray-800">文档理解与 OCR</div>
                      <div className="text-sm text-gray-600">从 PDF 表格中提取信息并转换为 LaTeX/Markdown</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-green-100 p-1.5 rounded text-green-700 mt-0.5"><Zap size={16} /></div>
                    <div>
                      <div className="font-semibold text-gray-800">视觉问答 (VQA)</div>
                      <div className="text-sm text-gray-600">根据图片内容回答用户问题</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Core Architectures */}
        <section id="architecture" className="space-y-6 scroll-mt-24">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 bg-indigo-600 h-8 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">1. 两大核心架构范式</h2>
          </div>
          
          <p className="text-gray-600 mb-6">Sebastian Raschka 将当前构建多模态 LLM 的方法主要归纳为以下两类。虽然业界尚无统一定义，但可简称为 "decoder-only" 和 "cross-attention-based" 方法：</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Method A */}
            <SectionCard className="p-6 border-t-4 border-t-green-500">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900">Method A: 统一嵌入解码器架构</h3>
                <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">Unified Embedding</span>
              </div>
              
              {/* Architecture Diagram */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                <div className="text-xs text-gray-400 font-mono mb-2 text-center">数据流示意</div>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    <div className="px-3 py-2 bg-pink-100 text-pink-700 border border-pink-200 rounded text-xs font-medium">📷 Image</div>
                    <ArrowRight size={14} className="text-gray-300" />
                    <div className="px-3 py-2 bg-pink-50 text-pink-600 border border-pink-200 rounded text-xs">Vision Encoder</div>
                    <ArrowRight size={14} className="text-gray-300" />
                    <div className="px-3 py-2 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded text-xs">Projector</div>
                  </div>
                  <ArrowDown size={14} className="text-gray-300" />
                  <div className="flex items-center gap-1">
                    <span className="px-2 py-1 bg-pink-100 text-pink-700 border border-pink-200 rounded text-xs">[Img Tokens]</span>
                    <span className="text-gray-400 text-xs">⊕</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 border border-blue-200 rounded text-xs">[Text Tokens]</span>
                  </div>
                  <ArrowDown size={14} className="text-gray-300" />
                  <div className="px-4 py-2 bg-purple-100 text-purple-700 border border-purple-200 rounded text-xs font-bold">Standard Decoder LLM</div>
                </div>
              </div>

              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex gap-2">
                  <Check className="text-green-500 mt-1 flex-shrink-0" size={16} />
                  <span><strong>原理：</strong>图像通过编码器和投影层后，转换为与文本 token 相同维度的 embedding 向量，然后<strong>拼接 (Concatenate)</strong> 后输入 LLM。</span>
                </li>
                <li className="flex gap-2">
                  <Check className="text-green-500 mt-1 flex-shrink-0" size={16} />
                  <span><strong>优势：</strong>架构简单，无需修改 LLM 内部结构，易于实现和调试。</span>
                </li>
                <li className="flex gap-2">
                  <Check className="text-green-500 mt-1 flex-shrink-0" size={16} />
                  <span><strong>劣势：</strong>图像 token 占用上下文窗口（Context Window），高分辨率图像或多图推理时 Token 数量爆炸。</span>
                </li>
                <li className="flex gap-2">
                  <Star className="text-yellow-500 mt-1 flex-shrink-0" size={16} />
                  <span><strong>代表模型：</strong>LLaVA, Molmo, Pixtral, Qwen2-VL, MM1.5, Fuyu</span>
                </li>
              </ul>
            </SectionCard>

            {/* Method B */}
            <SectionCard className="p-6 border-t-4 border-t-blue-500">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900">Method B: 交叉注意力架构</h3>
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">Cross-Attention</span>
              </div>
              
              {/* Architecture Diagram */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                <div className="text-xs text-gray-400 font-mono mb-2 text-center">数据流示意</div>
                <div className="flex items-center justify-center gap-6">
                  {/* Left: Image Enc */}
                  <div className="text-center">
                    <div className="px-3 py-2 bg-pink-100 text-pink-700 border border-pink-200 rounded text-xs mb-2">📷 Image</div>
                    <ArrowDown size={14} className="mx-auto text-gray-300" />
                    <div className="px-3 py-1 bg-pink-50 text-pink-600 border border-pink-200 rounded text-xs my-1">Encoder</div>
                    <div className="h-0.5 w-12 bg-pink-300 mx-auto my-1"></div>
                    <div className="text-[10px] text-pink-600 font-bold bg-pink-50 px-2 py-1 rounded">K, V</div>
                  </div>
                  {/* Arrow */}
                  <div className="flex flex-col items-center">
                    <ArrowRight className="text-orange-400" size={20} />
                    <span className="text-[10px] text-orange-500 font-bold">Cross-Attn</span>
                  </div>
                  {/* Right: LLM */}
                  <div className="text-center">
                    <div className="px-3 py-2 bg-blue-100 text-blue-700 border border-blue-200 rounded text-xs mb-2">📝 Text</div>
                    <ArrowDown size={14} className="mx-auto text-gray-300" />
                    <div className="px-3 py-1 bg-blue-50 text-blue-600 border border-blue-200 rounded text-xs my-1">Q (Query)</div>
                    <ArrowDown size={14} className="mx-auto text-gray-300" />
                    <div className="px-3 py-1 bg-purple-100 text-purple-700 border border-purple-200 rounded text-xs font-bold">LLM Decoder</div>
                  </div>
                </div>
              </div>

              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex gap-2">
                  <Check className="text-blue-500 mt-1 flex-shrink-0" size={16} />
                  <span><strong>原理：</strong>图像不作为输入序列的一部分。LLM 的每一层（或部分层）通过新增的 <strong>Cross-Attention</strong> 模块查询图像特征（Q 来自文本，K/V 来自图像）。</span>
                </li>
                <li className="flex gap-2">
                  <Check className="text-blue-500 mt-1 flex-shrink-0" size={16} />
                  <span><strong>优势：</strong>计算效率更高，不占用 Token 上下文，更好保留纯文本能力（LLM 参数可冻结）。</span>
                </li>
                <li className="flex gap-2">
                  <Check className="text-blue-500 mt-1 flex-shrink-0" size={16} />
                  <span><strong>劣势：</strong>实现复杂，需要修改 Attention 机制，新增参数量较大。</span>
                </li>
                <li className="flex gap-2">
                  <Star className="text-yellow-500 mt-1 flex-shrink-0" size={16} />
                  <span><strong>代表模型：</strong>Flamingo, Llama 3.2, NVLM-X, IDEFICS, Aria</span>
                </li>
              </ul>
            </SectionCard>
          </div>

          {/* Cross-Attention Detail */}
          <div className="mt-8">
            <Accordion title="深入理解：Self-Attention vs Cross-Attention" icon={GitBranch} defaultOpen={false}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-gray-800 mb-3">Self-Attention（自注意力）</h4>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>在标准 Self-Attention 中，Q、K、V 都来自<strong>同一个输入</strong> x：</p>
                    <div className="bg-gray-50 p-2 rounded font-mono text-xs">
                      Q = x · W_q<br/>
                      K = x · W_k<br/>
                      V = x · W_v<br/>
                      Attention = softmax(QK^T / √d_k) · V
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <h4 className="font-bold text-blue-800 mb-3">Cross-Attention（交叉注意力）</h4>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>在 Cross-Attention 中，有<strong>两个不同的输入源</strong> x1 和 x2：</p>
                    <div className="bg-blue-50 p-2 rounded font-mono text-xs">
                      Q = x1 · W_q  <span className="text-blue-600"># 来自 Text (Decoder)</span><br/>
                      K = x2 · W_k  <span className="text-pink-600"># 来自 Image (Encoder)</span><br/>
                      V = x2 · W_v  <span className="text-pink-600"># 来自 Image (Encoder)</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">当 x1 = x2 时，Cross-Attention 退化为 Self-Attention。</p>
                  </div>
                </div>
              </div>
            </Accordion>
          </div>
        </section>

        {/* Section 2: Image Encoder Deep Dive */}
        <section id="encoder" className="space-y-6 scroll-mt-24">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 bg-indigo-600 h-8 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">2. 图像编码器技术深度解析</h2>
          </div>
          
          <p className="text-gray-600 mb-6">
            理解多模态 LLM 的关键在于理解图像是如何被转换为 LLM 能够处理的 token 序列。这个过程类似于文本的分词 (Tokenization)。
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* 2.1 ViT */}
            <SectionCard className="p-6">
              <div className="flex items-center gap-2 mb-3 text-pink-600">
                <Eye size={20} />
                <h3 className="font-bold text-gray-900">Vision Transformer (ViT)</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">最基础的图像编码架构，将图像"分词"为 Patches。</p>
              
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-4">
                <div className="text-xs text-gray-500 mb-2 font-medium">处理流程</div>
                <div className="flex flex-col gap-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded">1</span>
                    <span>图像分割为 16×16 或 14×14 的 Patches</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded">2</span>
                    <span>每个 Patch 展平为向量</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded">3</span>
                    <span>Linear Projection 投影到 embed_dim</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded">4</span>
                    <span>添加位置编码后输入 Transformer</span>
                  </div>
                </div>
              </div>
              
              <div className="text-xs bg-yellow-50 p-2 rounded border border-yellow-200">
                <strong>例子：</strong>224×224 图像 ÷ 16×16 patch = 14×14 = <strong>196 个 Tokens</strong>
              </div>
            </SectionCard>

            {/* 2.2 CLIP/SigLIP */}
            <SectionCard className="p-6">
              <div className="flex items-center gap-2 mb-3 text-blue-600">
                <Layers size={20} />
                <h3 className="font-bold text-gray-900">CLIP / SigLIP</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4"><strong>最主流选择。</strong>在海量图文对上用对比学习预训练的 ViT。</p>
              
              <div className="space-y-3">
                <div className="text-xs bg-blue-50 p-2 rounded border border-blue-200">
                  <span className="font-bold text-blue-800 block mb-1">CLIP (OpenAI)</span>
                  使用 InfoNCE 对比损失，在 4 亿图文对上预训练。
                </div>
                <div className="text-xs bg-green-50 p-2 rounded border border-green-200">
                  <span className="font-bold text-green-800 block mb-1">SigLIP (Google)</span>
                  使用 Sigmoid Loss 替代 Softmax，性能更优。<br/>
                  <span className="text-gray-500">被 Molmo, Janus, Baichuan-Omni, Aria 采用</span>
                </div>
                <div className="text-xs bg-purple-50 p-2 rounded border border-purple-200">
                  <span className="font-bold text-purple-800 block mb-1">OpenCLIP</span>
                  开源实现，社区广泛使用。
                </div>
              </div>
            </SectionCard>

            {/* 2.3 Projector */}
            <SectionCard className="p-6">
              <div className="flex items-center gap-2 mb-3 text-yellow-600">
                <Plug size={20} />
                <h3 className="font-bold text-gray-900">Projector / Adapter</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">将视觉编码器输出维度映射到 LLM 的 Embedding 维度。</p>
              
              <div className="space-y-3">
                <div className="text-xs bg-gray-50 p-2 rounded border border-gray-200">
                  <span className="font-bold text-gray-800 block mb-1">Linear Projector</span>
                  单层 <code className="bg-gray-100 px-1 rounded">nn.Linear</code>，最简单。
                </div>
                <div className="text-xs bg-orange-50 p-2 rounded border border-orange-200">
                  <span className="font-bold text-orange-800 block mb-1">MLP (推荐)</span>
                  2层 Linear + GELU。LLaVA 1.5 证明比单层效果好得多。NVLM 也使用 MLP。
                </div>
                <div className="text-xs bg-purple-50 p-2 rounded border border-purple-200">
                  <span className="font-bold text-purple-800 block mb-1">C-Abstractor / Perceiver</span>
                  使用 Attention 机制<strong>压缩</strong> Token 数量（如 Flamingo 的 Perceiver Resampler）。
                </div>
              </div>
            </SectionCard>
          </div>

          {/* Code Example */}
          <Accordion title="PyTorch 代码示例：Patch Projection 实现" icon={Code} defaultOpen={false}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-800 mb-2 text-sm">方法 1：显式 Linear 投影</h4>
                <CodeBlock code={`class PatchProjectionLayer(torch.nn.Module):
    def __init__(self, patch_size, num_channels, embed_dim):
        super().__init__()
        self.projection = torch.nn.Linear(
            patch_size * patch_size * num_channels, 
            embed_dim
        )

    def forward(self, x):
        # x: [batch, num_patches, channels, h, w]
        batch_size, num_patches, c, h, w = x.size()
        x = x.view(batch_size, num_patches, -1)  # Flatten
        x = self.projection(x)  # Project
        return x

# 使用示例
layer = PatchProjectionLayer(16, 3, 768)
patches = torch.rand(1, 196, 3, 16, 16)
output = layer(patches)  
# output.shape: [1, 196, 768]`} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-2 text-sm">方法 2：Conv2d 等效实现（更高效）</h4>
                <CodeBlock code={`# Conv2d 可以同时完成 patch 分割和投影
# kernel_size = stride = patch_size

layer = torch.nn.Conv2d(
    in_channels=3, 
    out_channels=768, 
    kernel_size=(16, 16), 
    stride=(16, 16)
)

image = torch.rand(1, 3, 224, 224)  # [B, C, H, W]
output = layer(image)  # [1, 768, 14, 14]

# 转换为序列形式
output = output.flatten(-2)  # [1, 768, 196]
output = output.transpose(-1, -2)  # [1, 196, 768]`} />
                <p className="text-xs text-gray-500 mt-2">Conv2d 在数学上与 Linear 等效，但计算更高效。</p>
              </div>
            </div>
          </Accordion>

          {/* Special Case: Fuyu */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mt-6">
            <div className="flex items-start gap-3">
              <div className="bg-amber-100 p-2 rounded-lg">
                <Zap className="text-amber-700" size={20} />
              </div>
              <div>
                <h4 className="font-bold text-amber-900 mb-2">特例：Fuyu - 无预训练编码器</h4>
                <p className="text-sm text-amber-800">
                  Fuyu 采用了极度简化的架构：<strong>不使用任何预训练的视觉编码器</strong>。它直接将 Image Patches 通过 Linear Projection 投影后输入 LLM，让模型从头学习图像表示。这大大简化了架构和训练流程，但需要更多的训练数据。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Training Strategy */}
        <section id="training" className="space-y-6 scroll-mt-24">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 bg-indigo-600 h-8 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">3. 训练策略与组件冻结</h2>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Settings size={20} className="text-indigo-600" />
              三大核心组件的训练状态
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">组件</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">预训练阶段</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">指令微调阶段</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">备注</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-3 font-medium">① Image Encoder</td>
                    <td className="px-4 py-3"><span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">通常冻结</span></td>
                    <td className="px-4 py-3"><span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">通常冻结</span></td>
                    <td className="px-4 py-3 text-gray-500 text-xs">CLIP/SigLIP 已有强大视觉表示</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">② Projector</td>
                    <td className="px-4 py-3"><span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">训练</span></td>
                    <td className="px-4 py-3"><span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">训练</span></td>
                    <td className="px-4 py-3 text-gray-500 text-xs">参数量小，学习容量有限</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">③ LLM Backbone</td>
                    <td className="px-4 py-3"><span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">通常冻结</span></td>
                    <td className="px-4 py-3"><span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">解冻训练</span></td>
                    <td className="px-4 py-3 text-gray-500 text-xs">第二阶段解冻以学习复杂推理</td>
                  </tr>
                  <tr className="bg-blue-50/50">
                    <td className="px-4 py-3 font-medium">Cross-Attention 层</td>
                    <td className="px-4 py-3"><span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">训练</span></td>
                    <td className="px-4 py-3"><span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">训练</span></td>
                    <td className="px-4 py-3 text-gray-500 text-xs">仅 Method B；全程解冻</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-bold text-green-800 mb-2 text-sm">典型两阶段训练流程</h4>
                <ol className="text-xs text-green-700 space-y-1 list-decimal list-inside">
                  <li><strong>预训练：</strong>大量图文对，训练 Projector，对齐视觉-文本表示</li>
                  <li><strong>指令微调：</strong>高质量对话数据，解冻 LLM，学习指令遵循</li>
                </ol>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h4 className="font-bold text-amber-800 mb-2 text-sm">Llama 3.2 的特殊策略</h4>
                <p className="text-xs text-amber-700">
                  <strong>反向策略：</strong>更新 Image Encoder，但<strong>冻结 LLM</strong>。
                  <br/>原因：保留纯文本能力，使 11B/90B 可作为 8B/70B 的 drop-in replacement。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Recent Models Review */}
        <section id="models" className="space-y-6 scroll-mt-24">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-1 bg-indigo-600 h-8 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-900">4. 十大前沿模型深度盘点</h2>
            </div>
            <span className="text-xs text-gray-500 italic">2024 年最新发布</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ModelCard 
              name="Llama 3.2"
              company="Meta"
              tag="Cross-Attention (B)"
              tagColor="blue"
              borderColor="border-l-blue-500"
              description="官方提供 11B 和 90B 多模态版本。采用独特的「冻结 LLM + 训练 Encoder」策略。"
              details={[
                { label: "策略独特", value: "训练时<strong>更新 Image Encoder</strong>，但保持 LLM 冻结（保留纯文本能力）。" },
                { label: "Encoder", value: "自研 <strong>ViT-H/14</strong> (630M params)，从头预训练 5 epochs。" },
                { label: "Cross-Attn", value: "每隔 <strong>4 个 Transformer Block</strong> 加一个 Cross-Attention 层。" },
                { label: "新增参数", value: "8B→+3B, 70B→+20B（Cross-Attention 层带来的额外参数）。" }
              ]}
            />
            <ModelCard 
              name="Molmo"
              company="AI2"
              tag="Unified (A)"
              tagColor="green"
              borderColor="border-l-green-500"
              description="完全开源（权重、数据 PixMo、代码），研究友好型模型。"
              details={[
                { label: "训练策略", value: "简单粗暴的<strong>全量统一训练</strong>（Encoder + Projector + LLM 全部解冻）。" },
                { label: "Encoder", value: "OpenAI CLIP 或 SigLIP。" },
                { label: "Base LLM", value: "OLMo-7B / OLMoE-1B-7B (MoE) / Qwen2-7B / Qwen2-72B。" },
                { label: "特点", value: "避免多阶段预训练，一次性训练所有参数。" }
              ]}
            />
            <ModelCard 
              name="NVLM"
              company="NVIDIA"
              tag="Comparison Study"
              tagColor="purple"
              borderColor="border-l-purple-500"
              description="最严谨的对比研究，含 NVLM-D (A), NVLM-X (B) 和 NVLM-H (Hybrid)。"
              details={[
                { label: "核心发现", value: "X 效率高；<strong>D 在 OCR 任务更强</strong>；H 结合两者优势。" },
                { label: "Base LLM", value: "<strong>Qwen2-72B-Instruct</strong>（使用 Instruct 版本）。" },
                { label: "Encoder", value: "<strong>InternViT-6B</strong> (Frozen)，参数量大。" },
                { label: "Projector", value: "MLP（多层感知机），而非单层 Linear。" }
              ]}
            />
            <ModelCard 
              name="Qwen2-VL"
              company="Alibaba"
              tag="Unified (A)"
              tagColor="green"
              borderColor="border-l-green-500"
              description="核心创新：Naive Dynamic Resolution，支持原生分辨率输入。"
              details={[
                { label: "动态分辨率", value: "移除绝对位置编码，引入 <strong>2D-RoPE (M-RoPE)</strong>，不进行简单缩放。" },
                { label: "三阶段训练", value: "1. Pretrain Encoder → 2. 全解冻 → 3. Freeze Encoder + 微调 LLM。" },
                { label: "Encoder", value: "自研 675M 参数 Vision Encoder。" },
                { label: "模型规格", value: "2B / 7B / 72B 多种尺寸。" }
              ]}
            />
            <ModelCard 
              name="Pixtral 12B"
              company="Mistral"
              tag="Unified (A)"
              tagColor="green"
              borderColor="border-l-green-500"
              description="Mistral 的首个多模态模型，支持原生可变图像尺寸。"
              details={[
                { label: "特点", value: "类似 Qwen2-VL，支持<strong>原生可变图像尺寸</strong>。" },
                { label: "Encoder", value: "<strong>从头训练</strong> 400M 参数 Vision Encoder（不使用 CLIP）。" },
                { label: "Base LLM", value: "Mistral NeMo 12B。" },
                { label: "无技术报告", value: "仅 Blog Post 发布。" }
              ]}
            />
            <ModelCard 
              name="MM1.5"
              company="Apple"
              tag="Unified (A)"
              tagColor="green"
              borderColor="border-l-green-500"
              description="涵盖 1B~30B 参数，含 Dense 和 MoE 版本，提供大量消融实验。"
              details={[
                { label: "OCR 增强", value: "引入<strong>坐标 Token (Coordinate Tokens)</strong> 表示 Bounding Boxes。" },
                { label: "研究价值", value: "提供大量关于 <strong>Data Mixture</strong>（数据配比）的消融实验。" },
                { label: "规格", value: "1B / 3B / 7B / 30B，含 MoE 变体。" }
              ]}
            />
            <ModelCard 
              name="Aria"
              company="Rhymes AI"
              tag="Cross-Attention + MoE"
              tagColor="blue"
              borderColor="border-l-blue-500"
              description="原生 Mixture-of-Experts 多模态模型，24.9B 总参数。"
              details={[
                { label: "MoE 架构", value: "24.9B 总参数，每个 Token 激活 <strong>3.5B</strong>。" },
                { label: "Encoder", value: "<strong>SigLIP</strong> (438M)。" },
                { label: "训练流程", value: "1. 从头训练 LLM backbone → 2. 预训练 LLM + Encoder。" }
              ]}
            />
            <ModelCard 
              name="Baichuan-Omni"
              company="Baichuan"
              tag="Unified (A)"
              tagColor="green"
              borderColor="border-l-green-500"
              description="7B 参数模型，采用三阶段训练法，支持多模态输入。"
              details={[
                { label: "AnyRes", value: "使用 <strong>AnyRes 模块</strong>处理高分辨率图像。" },
                { label: "三阶段训练", value: "1. 只训 Projector → 2. 训 Encoder → 3. <strong>全量微调</strong>。" },
                { label: "Encoder", value: "<strong>SigLIP</strong> Vision Encoder。" }
              ]}
            />
            <ModelCard 
              name="Emu3"
              company="BAAI"
              tag="Generation Focus"
              tagColor="orange"
              borderColor="border-l-orange-500"
              description="「Next-Token Prediction is All You Need」- 纯 Transformer 图像生成。"
              details={[
                { label: "颠覆性", value: "<strong>不用 Diffusion</strong>，直接用 Transformer Decoder 做图像生成。" },
                { label: "Tokenizer", value: "视觉 Tokenizer <strong>SBER-MoVQGAN</strong> 将图像离散化。" },
                { label: "对齐", value: "使用 <strong>DPO</strong> (Direct Preference Optimization) 对齐人类偏好。" },
                { label: "架构", value: "基于 Llama 2 架构，但完全从头训练。" }
              ]}
            />
            <ModelCard 
              name="Janus"
              company="DeepSeek"
              tag="Decoupled Encoding"
              tagColor="purple"
              borderColor="border-l-purple-500"
              description="统一「理解」和「生成」任务，采用解耦编码设计。"
              details={[
                { label: "解耦设计", value: "<strong>理解任务</strong>用 SigLIP (高维语义)；<strong>生成任务</strong>用 VQ Tokenizer (局部细节)。" },
                { label: "三阶段训练", value: "I. 训 Projector → II. 解冻 LLM → III. 解冻 SigLIP 全量微调。" },
                { label: "Base LLM", value: "DeepSeek-LLM 1.3B。" }
              ]}
            />
          </div>
        </section>

        {/* Section 5: NVLM Comparison */}
        <section id="comparison" className="bg-slate-900 text-white rounded-2xl p-8 scroll-mt-24">
          <h2 className="text-2xl font-bold mb-6 text-indigo-300">5. NVLM 深度对比结论：Method A vs Method B</h2>
          <p className="text-slate-300 mb-8 max-w-3xl">
            NVIDIA 的 NVLM 论文通过控制变量法，在<strong>相同 Base LLM (Qwen2-72B-Instruct)</strong> 下对比了两种架构。这是目前最严谨的 apples-to-apples 比较。
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-green-500 w-3 h-3 rounded-full"></span>
                <h3 className="font-bold text-green-400">NVLM-D (Method A)</h3>
              </div>
              <p className="text-slate-300 text-sm mb-3">Decoder-only / 统一嵌入</p>
              <div className="space-y-2">
                <div className="bg-slate-700/50 p-2 rounded text-xs">
                  <span className="text-green-400 font-bold">✓ OCR 任务更强</span>
                  <p className="text-slate-400 mt-1">图像 Token 直接进入 Attention，细粒度文字提取有优势</p>
                </div>
                <div className="bg-slate-700/50 p-2 rounded text-xs">
                  <span className="text-red-400">✗ Token 数量爆炸</span>
                  <p className="text-slate-400 mt-1">高分辨率图像占用大量 Context</p>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-blue-500 w-3 h-3 rounded-full"></span>
                <h3 className="font-bold text-blue-400">NVLM-X (Method B)</h3>
              </div>
              <p className="text-slate-300 text-sm mb-3">Cross-Attention 架构</p>
              <div className="space-y-2">
                <div className="bg-slate-700/50 p-2 rounded text-xs">
                  <span className="text-green-400 font-bold">✓ 计算效率极高</span>
                  <p className="text-slate-400 mt-1">图像不增加 Input Context Length</p>
                </div>
                <div className="bg-slate-700/50 p-2 rounded text-xs">
                  <span className="text-green-400 font-bold">✓ 纯文本能力保留好</span>
                  <p className="text-slate-400 mt-1">可冻结 LLM 参数，图文路径分离</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-5 border border-purple-700">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-purple-500 w-3 h-3 rounded-full"></span>
                <h3 className="font-bold text-purple-400">NVLM-H (Hybrid)</h3>
              </div>
              <p className="text-slate-300 text-sm mb-3">混合架构</p>
              <div className="space-y-2">
                <div className="bg-slate-700/50 p-2 rounded text-xs">
                  <span className="text-purple-400 font-bold">⚡ 结合两者优势</span>
                  <p className="text-slate-400 mt-1">Thumbnail 作为 input token + 动态 patches 通过 Cross-Attention</p>
                </div>
                <div className="bg-slate-700/50 p-2 rounded text-xs">
                  <span className="text-green-400">✓ 高分辨率细节</span>
                  <p className="text-slate-400 mt-1">Cross-Attention 捕捉高分辨率细节</p>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Table */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h4 className="font-bold text-slate-200 mb-4">总结：如何选择？</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-600">
                    <th className="text-left py-2 px-3">场景</th>
                    <th className="text-left py-2 px-3">推荐方法</th>
                    <th className="text-left py-2 px-3">原因</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-700">
                    <td className="py-2 px-3">OCR / 文档理解</td>
                    <td className="py-2 px-3"><span className="bg-green-900 text-green-300 px-2 py-0.5 rounded text-xs">Method A</span></td>
                    <td className="py-2 px-3 text-xs text-slate-400">细粒度文字提取有优势</td>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="py-2 px-3">高分辨率 / 多图推理</td>
                    <td className="py-2 px-3"><span className="bg-blue-900 text-blue-300 px-2 py-0.5 rounded text-xs">Method B</span></td>
                    <td className="py-2 px-3 text-xs text-slate-400">不占用 Context，计算更高效</td>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="py-2 px-3">保留纯文本能力</td>
                    <td className="py-2 px-3"><span className="bg-blue-900 text-blue-300 px-2 py-0.5 rounded text-xs">Method B</span></td>
                    <td className="py-2 px-3 text-xs text-slate-400">可冻结 LLM 参数</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">实现简单 / 快速迭代</td>
                    <td className="py-2 px-3"><span className="bg-green-900 text-green-300 px-2 py-0.5 rounded text-xs">Method A</span></td>
                    <td className="py-2 px-3 text-xs text-slate-400">无需修改 LLM 架构</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Conclusion Table */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 bg-indigo-600 h-8 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">6. 模型组件总览表</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm bg-white rounded-xl border border-gray-200 overflow-hidden">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">模型</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">方法</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">Image Encoder</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">Base LLM</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">Projector</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">Llama 3.2</td>
                  <td className="px-4 py-2"><ModelTag color="blue">Cross-Attn</ModelTag></td>
                  <td className="px-4 py-2 text-xs">ViT-H/14 (630M, 从头训练)</td>
                  <td className="px-4 py-2 text-xs">Llama 3.1 8B/70B</td>
                  <td className="px-4 py-2 text-xs">Adapter</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">Molmo</td>
                  <td className="px-4 py-2"><ModelTag color="green">Unified</ModelTag></td>
                  <td className="px-4 py-2 text-xs">CLIP / SigLIP</td>
                  <td className="px-4 py-2 text-xs">OLMo / Qwen2</td>
                  <td className="px-4 py-2 text-xs">Connector</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">NVLM</td>
                  <td className="px-4 py-2"><ModelTag color="purple">D/X/H</ModelTag></td>
                  <td className="px-4 py-2 text-xs">InternViT-6B (Frozen)</td>
                  <td className="px-4 py-2 text-xs">Qwen2-72B-Instruct</td>
                  <td className="px-4 py-2 text-xs">MLP</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">Qwen2-VL</td>
                  <td className="px-4 py-2"><ModelTag color="green">Unified</ModelTag></td>
                  <td className="px-4 py-2 text-xs">自研 ViT (675M)</td>
                  <td className="px-4 py-2 text-xs">Qwen2</td>
                  <td className="px-4 py-2 text-xs">-</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">Pixtral 12B</td>
                  <td className="px-4 py-2"><ModelTag color="green">Unified</ModelTag></td>
                  <td className="px-4 py-2 text-xs">自研 (400M, 从头训练)</td>
                  <td className="px-4 py-2 text-xs">Mistral NeMo 12B</td>
                  <td className="px-4 py-2 text-xs">-</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">MM1.5</td>
                  <td className="px-4 py-2"><ModelTag color="green">Unified</ModelTag></td>
                  <td className="px-4 py-2 text-xs">-</td>
                  <td className="px-4 py-2 text-xs">1B~30B (Dense/MoE)</td>
                  <td className="px-4 py-2 text-xs">+ Coord Tokens</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">Aria</td>
                  <td className="px-4 py-2"><ModelTag color="blue">Cross-Attn</ModelTag></td>
                  <td className="px-4 py-2 text-xs">SigLIP (438M)</td>
                  <td className="px-4 py-2 text-xs">24.9B MoE (3.5B/token)</td>
                  <td className="px-4 py-2 text-xs">-</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">Baichuan-Omni</td>
                  <td className="px-4 py-2"><ModelTag color="green">Unified</ModelTag></td>
                  <td className="px-4 py-2 text-xs">SigLIP + AnyRes</td>
                  <td className="px-4 py-2 text-xs">Baichuan 7B</td>
                  <td className="px-4 py-2 text-xs">Projector</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">Emu3</td>
                  <td className="px-4 py-2"><ModelTag color="orange">Generation</ModelTag></td>
                  <td className="px-4 py-2 text-xs">SBER-MoVQGAN (Tokenizer)</td>
                  <td className="px-4 py-2 text-xs">Llama 2 架构 (从头训练)</td>
                  <td className="px-4 py-2 text-xs">-</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">Janus</td>
                  <td className="px-4 py-2"><ModelTag color="purple">Decoupled</ModelTag></td>
                  <td className="px-4 py-2 text-xs">SigLIP (理解) + VQ (生成)</td>
                  <td className="px-4 py-2 text-xs">DeepSeek-LLM 1.3B</td>
                  <td className="px-4 py-2 text-xs">Projector</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm pb-12 pt-8 border-t border-gray-200">
          <p className="mb-2">Content synthesized from Sebastian Raschka's "Understanding Multimodal LLMs"</p>
          <p className="text-xs text-gray-400">包含 Llama 3.2, Molmo, NVLM, Qwen2-VL, Pixtral, MM1.5, Aria, Baichuan-Omni, Emu3, Janus 等模型分析</p>
        </footer>
      </main>
    </div>
  );
};

export default UnderstandingMLLMs;
