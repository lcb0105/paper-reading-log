import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Info, Eye, Brain, Settings, Database, Scissors, FlaskConical, Grid3X3, Layers, Cpu, Zap, Menu } from 'lucide-react';

const EfficientMLLMsPaper = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { id: 'intro', label: '引言与背景', icon: Info },
    { id: 'vision-encoder', label: '- 视觉编码器', indent: true },
    { id: 'projector', label: '- 投影器', indent: true },
    { id: 'compression', label: '- Token 压缩技术', indent: true },
    { id: 'efficient-vision', label: '高效视觉技术详解', icon: Eye },
    { id: 'efficient-llm', label: '高效 LLM 技术详解', icon: Brain },
    { id: 'training', label: '训练与微调策略', icon: Settings },
    { id: 'data', label: '数据与基准', icon: Database },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
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
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-md p-4 sticky top-0 z-50 flex justify-between items-center">
        <h1 className="text-lg font-bold text-blue-800">Efficient MLLMs Survey</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-600 focus:outline-none">
          <Menu size={24} />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar Navigation */}
        <aside className={`${sidebarOpen ? 'block' : 'hidden'} lg:block w-full lg:w-64 bg-white shadow-xl fixed lg:sticky top-0 h-screen overflow-y-auto z-40 transition-transform`}>
          <div className="p-6">
            <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition mb-4">
              <ArrowLeft size={18} />
              <span>返回首页</span>
            </Link>
            <h2 className="text-xl font-bold text-blue-700 mb-2">Efficient MLLMs</h2>
            <p className="text-xs text-gray-500 mb-6 font-mono">arXiv:2405.10739v2</p>
            <nav className="space-y-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-4 py-3 text-sm font-medium rounded-l-md transition-colors flex items-center ${
                    item.indent ? 'pl-8' : ''
                  } ${
                    activeSection === item.id
                      ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.icon && <item.icon size={14} className="mr-2" />}
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="p-6 mt-auto border-t border-gray-100">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-sm font-semibold text-blue-800 mb-1">深度解析版</h4>
              <p className="text-xs text-blue-600">包含具体的模型案例（MobileVLM, Honeybee, SPHINX-X）及技术细节（Mamba, MoE, Pruning）。</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 lg:ml-0 overflow-x-hidden">
          {/* Hero Section */}
          <header id="intro" className="mb-12 bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full mb-2">深度综述</span>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">高效多模态大语言模型 (Efficient MLLMs)</h1>
                <p className="text-gray-500">Efficient Multimodal Large Language Models: A Survey</p>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                <p className="text-sm text-gray-600 font-medium">重点覆盖</p>
                <p className="text-xs text-gray-500">轻量化架构 | 视觉压缩 | 高效训练 | 应用场景</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              多模态大模型 (MLLMs) 的发展受限于其庞大的计算开销。本文深入探讨了如何通过<strong>轻量化架构 (Lightweight Architectures)</strong>、<strong>视觉 Token 压缩 (Vision Token Compression)</strong> 以及<strong>高效训练策略</strong>，在边缘设备上实现高性能的多模态理解。
            </p>
          </header>

          {/* Section 1: Vision Encoder */}
          <section id="vision-encoder" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2 inline-block">1. 视觉编码器 (Vision Encoder)</h2>
            <p className="text-gray-600 mb-6 text-sm">视觉编码器负责将图像压缩为特征 Embedding。由于其参数量相对 LLM 较小，主流高效 MLLM 仍多沿用强大的预训练模型，但也出现了轻量化和多视角的尝试。</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                  <span className="bg-blue-100 text-blue-700 h-6 w-6 rounded-full flex items-center justify-center text-xs mr-2">A</span>
                  主流选择
                </h3>
                <p className="text-sm text-gray-600 mb-3">大多数高效 MLLM 为了保证语义对齐，首选 CLIP 或 SigLIP 系列。</p>
                <ul className="text-xs text-gray-500 space-y-2">
                  <li><strong>CLIP ViT-L/14:</strong> MobileVLM, LLaVA-Phi 使用。</li>
                  <li><strong>SigLIP-SO:</strong> TinyLLaVA, Bunny 使用，收敛更快，性能更优。</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                  <span className="bg-green-100 text-green-700 h-6 w-6 rounded-full flex items-center justify-center text-xs mr-2">B</span>
                  创新架构
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700">多编码器融合 (Multi-Encoder)</h4>
                    <p className="text-xs text-gray-500">
                      <span className="font-bold">Cobra / SPHINX-X:</span> 同时使用 <strong>DINOv2</strong> (擅长低层空间特征) 和 <strong>CLIP/SigLIP</strong> (擅长高层语义)。实验证明，不同归纳偏置的编码器互补能显著提升性能。
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700">轻量级编码器</h4>
                    <p className="text-xs text-gray-500">
                      <span className="font-bold">ViTamin:</span> 专为 VL 任务设计的轻量级模型。436M 参数的 ViTamin-XL 在 ImageNet 零样本准确率上击败了 4.4B 参数的 EVA-E。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Projector */}
          <section id="projector" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2 inline-block">2. 视觉-语言投影器 (Projector)</h2>
            <p className="text-gray-600 mb-6 text-sm">投影器是连接视觉特征 Z<sub>v</sub> 和文本空间 H<sub>q</sub> 的桥梁 H<sub>v</sub> = P(Z<sub>v</sub>)。高效设计旨在减少视觉 Token 数量并保留局部细节。</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="text-blue-600 mb-2 flex items-center gap-1"><Zap size={16} /> MLP-based</div>
                <h4 className="font-bold text-sm mb-1">简单映射</h4>
                <p className="text-xs text-gray-500">
                  <strong>LLaVA, TinyLLaVA:</strong> 使用简单的线性层或 MLP。虽然简单，但保留了所有的视觉 Token，计算成本随分辨率增加而剧增。
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="text-purple-600 mb-2 flex items-center gap-1"><Layers size={16} /> Attention-based</div>
                <h4 className="font-bold text-sm mb-1">Q-Former / Resampler</h4>
                <p className="text-xs text-gray-500">
                  <strong>BLIP-2, MiniCPM-V:</strong> 使用可学习的 Query 来压缩视觉特征，将大量特征压缩为固定数量（如 32 或 64 个）的 Token。
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="text-red-600 mb-2 flex items-center gap-1"><Cpu size={16} /> CNN-based</div>
                <h4 className="font-bold text-sm mb-1">LDPv2</h4>
                <p className="text-xs text-gray-500">
                  <strong>MobileVLM v2:</strong> 提出 LDPv2，包含点卷积、平均池化和 PEG 模块。相比 MLP 参数减少 99.8%，且处理速度更快。
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="text-amber-600 mb-2 flex items-center gap-1"><Grid3X3 size={16} /> Hybrid (Honeybee)</div>
                <h4 className="font-bold text-sm mb-1">C/D-Abstractor</h4>
                <p className="text-xs text-gray-500">
                  <strong>Honeybee:</strong>
                  <br />• <strong>C-Abstractor:</strong> 基于 ResNet，建模局部上下文。
                  <br />• <strong>D-Abstractor:</strong> 基于 Deformable Attention，保留空间信息。
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Token Compression */}
          <section id="compression" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2 inline-block">3. 视觉 Token 压缩与结构优化</h2>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
              <h3 className="text-lg font-bold text-blue-900 mb-2">为什么需要压缩？</h3>
              <p className="text-sm text-blue-800">
                提高图像分辨率是提升细粒度识别（如 OCR、人群计数）的关键，但这会导致视觉 Token 数量呈平方级增长（例如 336x336 图像生成 576 个 Token，而高分图可能生成数千个），极大拖慢推理速度。
              </p>
            </div>
            <div className="space-y-6">
              {/* Method 1 */}
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl mr-4 flex-shrink-0">1</div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800">多视角与动态分辨率 (LLaVA-UHD)</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>核心思想：</strong> 将高分辨率图像切分为多个不同大小的"切片(Slice)"，而不是强行缩放。
                    <br />
                    <strong>LLaVA-UHD:</strong> 包含一个压缩模块和一个空间 Schema。它支持任意纵横比，并且可以用 94% 的计算量支持 6 倍大的分辨率。
                  </p>
                </div>
              </div>
              {/* Method 2 */}
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-lg bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-xl mr-4 flex-shrink-0">2</div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800">双路编码与挖掘 (Mini-Gemini)</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>核心思想：</strong> "双塔"结构。
                    <br />
                    <strong>Mini-Gemini:</strong> 一路低分辨率编码器生成 Visual Query，一路高分辨率编码器生成 Candidates。通过 <strong>Patch Info Mining</strong> 机制，用低分特征去高分特征中"挖掘"细节，兼顾效率与细节。
                  </p>
                </div>
              </div>
              {/* Method 3 */}
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-xl mr-4 flex-shrink-0">3</div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800">无参数缩放 (S²-Wrapper)</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>核心思想：</strong> 多尺度插值。
                    <br />
                    <strong>Scale on Scales:</strong> 将大图拆分处理，并通过插值将特征图恢复到常规尺寸。这种方法无需从头训练新参数，即可让预训练的小模型拥有处理多尺度信息的能力。
                  </p>
                </div>
              </div>
            </div>

            {/* Efficient Structures Table */}
            <div className="mt-8">
              <h3 className="font-bold text-gray-800 mb-4">高效替代架构 (Efficient Structures)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-600 border border-gray-200 rounded-lg">
                  <thead className="bg-gray-100 uppercase text-xs font-bold text-gray-700">
                    <tr>
                      <th className="px-4 py-3">架构类型</th>
                      <th className="px-4 py-3">代表模型</th>
                      <th className="px-4 py-3">技术亮点</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr>
                      <td className="px-4 py-3 font-semibold text-blue-600">MoE (混合专家)</td>
                      <td className="px-4 py-3">MoE-LLaVA, MM1-MoE</td>
                      <td className="px-4 py-3">
                        通过稀疏激活（Sparse Activation），模型参数量巨大（如 3B+），但推理时仅激活部分参数（计算量极低）。<br />
                        <span className="text-xs text-gray-400">MoE-LLaVA 提出了 MoE-Tuning 三阶段训练策略。</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-green-600">Mamba / SSM</td>
                      <td className="px-4 py-3">Cobra, VL-Mamba</td>
                      <td className="px-4 py-3">
                        利用状态空间模型 (SSM) 实现<strong>线性时间复杂度</strong>推理（Transformer 是平方级）。<br />
                        <span className="text-xs text-gray-400">Cobra 仅用 43% 的参数量达到了 LLaVA 的性能，且速度更快。</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-purple-600">推理加速</td>
                      <td className="px-4 py-3">FastV, VTW</td>
                      <td className="px-4 py-3">
                        <strong>Token 丢弃：</strong> FastV 发现深层网络中视觉 Token 冗余，推理时直接丢弃。<br />
                        <strong>推测解码 (SPD)：</strong> 使用纯语言模型作为草稿模型加速生成。
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 4: Efficient Vision Techniques */}
          <section id="efficient-vision" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2 inline-block">4. 高效视觉技术详解</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pruning */}
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-3 text-lg flex items-center">
                  <Scissors className="text-red-500 mr-2" size={20} />
                  剪枝 (Pruning)
                </h3>
                <p className="text-sm text-gray-600 mb-3">移除不重要的权重或组件。</p>
                <div className="space-y-2">
                  <div className="bg-gray-50 p-2 rounded text-xs text-gray-700">
                    <span className="font-bold block">非结构化剪枝 (Unstructured):</span> 移除单个权重，不考虑结构。如 <strong>DynamicViT</strong> 通过预测模块动态稀疏化 Token。
                  </div>
                  <div className="bg-gray-50 p-2 rounded text-xs text-gray-700">
                    <span className="font-bold block">结构化剪枝 (Structured):</span> 移除整个 Attention Head 或 Layer。如 <strong>X-Pruner</strong> 学习可解释的 Mask 来剪枝。
                  </div>
                </div>
              </div>
              {/* Distillation */}
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-3 text-lg flex items-center">
                  <FlaskConical className="text-indigo-500 mr-2" size={20} />
                  知识蒸馏 (Distillation)
                </h3>
                <p className="text-sm text-gray-600 mb-3">大模型教小模型。</p>
                <div className="space-y-2">
                  <div className="bg-gray-50 p-2 rounded text-xs text-gray-700">
                    <span className="font-bold block">同构蒸馏 (Homomorphic):</span> 架构相同。如 <strong>TinyViT</strong> 在预训练时存储 Teacher 的 Logits 进行蒸馏。
                  </div>
                  <div className="bg-gray-50 p-2 rounded text-xs text-gray-700">
                    <span className="font-bold block">异构蒸馏 (Heteromorphic):</span> 架构不同（如 CNN 到 ViT）。如 <strong>DearKD</strong> 两阶段蒸馏。
                  </div>
                </div>
              </div>
              {/* Quantization */}
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 md:col-span-2">
                <h3 className="font-bold text-gray-800 mb-3 text-lg flex items-center">
                  <Grid3X3 className="text-green-500 mr-2" size={20} />
                  量化 (Quantization)
                </h3>
                <p className="text-sm text-gray-600 mb-3">将 FP32 压缩为 INT8 或更低。</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded text-xs text-gray-700">
                    <span className="font-bold text-sm block mb-1">PTQ (训练后量化):</span> 不需要重新训练。<strong>PTQ4ViT</strong> 提出了 Twin Uniform Quantization 来减少 Softmax/GELU 后的误差。
                  </div>
                  <div className="bg-gray-50 p-3 rounded text-xs text-gray-700">
                    <span className="font-bold text-sm block mb-1">QAT (量化感知训练):</span> 训练中模拟量化。<strong>Quantformer</strong> 利用熵信息保持 Attention Rank 的一致性。
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Efficient LLM Techniques */}
          <section id="efficient-llm" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2 inline-block">5. 高效 LLM 技术详解</h2>
            
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-4">Attention 机制优化</h3>
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 text-center">
                  <div className="p-4">
                    <div className="text-xs text-gray-400 mb-1">传统方法</div>
                    <div className="font-bold text-sm">Multi-Head (MHA)</div>
                    <div className="mt-2 text-xs text-left text-gray-500">每个 Query Head 都有独立的 Key/Value Head。显存占用大。</div>
                  </div>
                  <div className="p-4 bg-blue-50">
                    <div className="text-xs text-blue-500 mb-1">高效平衡 (Llama-2)</div>
                    <div className="font-bold text-sm text-blue-900">Grouped-Query (GQA)</div>
                    <div className="mt-2 text-xs text-left text-blue-800"><strong>速度与性能的最佳平衡点</strong>。将 Query 分组，每组共享一个 Key/Value Head。</div>
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-gray-400 mb-1">极致速度</div>
                    <div className="font-bold text-sm">Multi-Query (MQA)</div>
                    <div className="mt-2 text-xs text-left text-gray-500">所有 Query 共享同一个 Key/Value Head。极快，但性能有损。</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-4">参数高效微调 (PEFT)</h3>
              <ul className="space-y-3">
                <li className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm flex flex-col md:flex-row md:items-center">
                  <span className="font-bold text-indigo-600 mr-3 w-32">LoRA-FA:</span>
                  <span className="text-sm text-gray-600">冻结 LoRA 的第一个矩阵，仅训练第二个，参数量减半。</span>
                </li>
                <li className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm flex flex-col md:flex-row md:items-center">
                  <span className="font-bold text-indigo-600 mr-3 w-32">LOMO:</span>
                  <span className="text-sm text-gray-600">低内存优化器，将梯度计算与参数更新融合，大幅降低显存峰值。</span>
                </li>
                <li className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm flex flex-col md:flex-row md:items-center">
                  <span className="font-bold text-indigo-600 mr-3 w-32">LLM-Adapters:</span>
                  <span className="text-sm text-gray-600">在 Transformer 层之间插入轻量级 Adapter 模块。</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 6: Training Strategies */}
          <section id="training" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2 inline-block">6. 训练与微调策略</h2>
            <p className="text-sm text-gray-600 mb-4">除了架构，训练策略的创新也是提效的关键。</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-100">
                <h3 className="font-bold text-yellow-800 mb-3">LaVIN: 混合模态适应 (MMA)</h3>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>痛点：</strong> 全量微调或甚至 LoRA 微调在 MLLM 上依然昂贵。
                  <br />
                  <strong>方案：</strong> Mixture-of-Modality Adaptation (MMA)。通过极轻量的 Adapter 桥接 LLM 和视觉任务。
                </p>
                <div className="bg-white bg-opacity-60 p-2 rounded text-xs text-yellow-900 font-mono">
                  成本：仅需 1.4 小时训练时间 + 3.8M 可训练参数。
                </div>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <h3 className="font-bold text-blue-800 mb-3">SPHINX-X: 单阶段全能训练</h3>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>痛点：</strong> 传统多阶段训练（预训练-&gt;SFT）繁琐且容易遗忘。
                  <br />
                  <strong>方案：</strong> 抛弃多阶段，将所有数据转换为多轮对话格式，解冻所有参数（除 Vision Encoder），进行单阶段联合训练。
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 md:col-span-2">
                <h3 className="font-bold text-gray-800 mb-2">Efficient Attention Skipping (EAS)</h3>
                <p className="text-sm text-gray-600">
                  一种参数和计算高效的迁移学习方法，在微调下游任务时，有选择地跳过部分 Attention 计算，以减少冗余。
                </p>
              </div>
            </div>
          </section>

          {/* Section 7: Data & Benchmarks */}
          <section id="data" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2 inline-block">7. 数据与基准 (Data & Benchmarks)</h2>
            
            {/* Data Generation */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
              <h3 className="font-bold text-gray-800 mb-3">数据生成新范式：ShareGPT4V</h3>
              <p className="text-sm text-gray-600 mb-3">
                使用 GPT-4V 生成高质量 Caption 的成本极高。<strong>ShareGPT4V</strong> 采用了一种高效策略：
              </p>
              <div className="flex flex-col md:flex-row items-center text-xs text-gray-500 gap-2">
                <div className="bg-gray-100 px-3 py-2 rounded">1. 用 100K GPT-4V 数据训练一个 Captioner</div>
                <span className="hidden md:block">→</span>
                <div className="bg-gray-100 px-3 py-2 rounded">2. 用该 Captioner 扩展生成 1.2M 高质量数据</div>
                <span className="hidden md:block">→</span>
                <div className="bg-gray-100 px-3 py-2 rounded">3. 用于预训练</div>
              </div>
            </div>

            {/* Benchmarks Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
              <table className="w-full text-sm text-left text-gray-600">
                <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-700">
                  <tr>
                    <th className="px-6 py-3">模型</th>
                    <th className="px-6 py-3">LLM Backbone</th>
                    <th className="px-6 py-3">VQA v2</th>
                    <th className="px-6 py-3">GQA</th>
                    <th className="px-6 py-3">MMBench</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-6 py-3 font-medium text-blue-600">MobileVLM</td>
                    <td className="px-6 py-3">MobileLLaMA (2.7B)</td>
                    <td className="px-6 py-3">59.6</td>
                    <td className="px-6 py-3">59.0</td>
                    <td className="px-6 py-3">-</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 font-medium text-blue-600">TinyLLaVA</td>
                    <td className="px-6 py-3">Phi-2 (2.7B)</td>
                    <td className="px-6 py-3">79.9</td>
                    <td className="px-6 py-3">62.0</td>
                    <td className="px-6 py-3">66.9</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 font-medium text-blue-600">MoE-LLaVA</td>
                    <td className="px-6 py-3">Phi-2 (2.7B) / MoE</td>
                    <td className="px-6 py-3">70.3</td>
                    <td className="px-6 py-3">62.6</td>
                    <td className="px-6 py-3">68.0</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-3 font-medium text-gray-500">LLaVA-1.5 (基准)</td>
                    <td className="px-6 py-3">Vicuna-13B</td>
                    <td className="px-6 py-3">80.0</td>
                    <td className="px-6 py-3">63.3</td>
                    <td className="px-6 py-3">67.7</td>
                  </tr>
                </tbody>
              </table>
              <div className="p-4 text-xs text-gray-400 text-center">
                注：TinyLLaVA 和 MoE-LLaVA 在参数量远小于 LLaVA-1.5 (13B) 的情况下，在部分指标上已实现超越。
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-gray-800 text-white rounded-2xl p-8 mt-12 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h2 className="text-xl font-bold">Efficient MLLM Survey</h2>
                <p className="text-gray-400 text-sm mt-1">深度解析版 - 2024</p>
              </div>
              <div className="text-right text-xs text-gray-500">
                基于论文: arXiv:2405.10739v2<br />
                Generated by AI Assistant
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default EfficientMLLMsPaper;

