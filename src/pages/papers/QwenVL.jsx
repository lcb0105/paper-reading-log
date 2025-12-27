import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Layers, Cpu, Database, Zap, BarChart3, Eye, Grid3X3, MessageSquare, Target, Check } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

// --- 通用组件 ---
const Section = ({ id, title, icon: Icon, children, className = "" }) => (
  <section id={id} className={`bg-white rounded-xl shadow-md p-8 mb-8 hover:shadow-lg transition-shadow ${className}`}>
    <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-4 flex items-center gap-3">
      {Icon && <Icon className="text-blue-600" size={24} />}
      {title}
    </h2>
    {children}
  </section>
);

const MathBlock = ({ children, title }) => (
  <div className="overflow-x-auto p-4 bg-slate-50 rounded-lg border border-slate-200 my-4">
    {title && <p className="font-bold mb-2 text-sm text-slate-500">{title}</p>}
    <BlockMath math={children} />
  </div>
);

const InfoBox = ({ title, children, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-50 border-blue-500 text-blue-800",
    yellow: "bg-yellow-50 border-yellow-500 text-yellow-800",
    green: "bg-green-50 border-green-500 text-green-800"
  };
  return (
    <div className={`border-l-4 p-4 rounded-r-lg my-4 ${colors[color]}`}>
      {title && <p className="font-bold mb-1">{title}</p>}
      <div className="text-sm">{children}</div>
    </div>
  );
};

// --- 主组件 ---
const QwenVL = () => {
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
      <header className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-blue-300 font-mono text-sm mb-2">arXiv:2308.12966v3 [cs.CV]</div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Qwen-VL 论文深度解析</h1>
          <p className="text-xl text-slate-300 leading-relaxed mb-2">
            通用视觉-语言模型：用于理解、定位、文本阅读及更多任务
          </p>
          <p className="text-slate-400">作者: Alibaba Group</p>
          <div className="flex flex-wrap gap-3 mt-6">
            <span className="text-sm bg-blue-500/20 text-blue-200 py-1.5 px-3 rounded-full border border-blue-400/30">Cross-Attention Adapter</span>
            <span className="text-sm bg-green-500/20 text-green-200 py-1.5 px-3 rounded-full border border-green-400/30">Visual Grounding</span>
            <span className="text-sm bg-purple-500/20 text-purple-200 py-1.5 px-3 rounded-full border border-purple-400/30">Three-Stage Training</span>
            <span className="text-sm bg-orange-500/20 text-orange-200 py-1.5 px-3 rounded-full border border-orange-400/30">OCR</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">

        {/* 1. 摘要与简介 */}
        <Section id="abstract" title="1. 摘要与简介" icon={BookOpen}>
          <p className="mb-4 leading-relaxed text-slate-700">
            目前的大型语言模型（LLM）虽然在文本任务上表现出色，但缺乏处理图像等多模态信息的能力。现有的开源视觉-语言模型（LVLM）往往在细粒度视觉理解（如物体定位、文本阅读）方面表现不佳。
          </p>
          <p className="mb-4 leading-relaxed text-slate-700">
            <strong className="text-slate-900">Qwen-VL 系列</strong>旨在解决这些问题。它基于 Qwen-7B，通过以下四个关键设计引入视觉能力：
          </p>

          <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Eye className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                <div>
                  <span className="font-semibold text-blue-600">视觉接收器 (Visual Receptor)：</span>
                  <span className="text-slate-600">基于 ViT 的视觉编码器。</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Grid3X3 className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                <div>
                  <span className="font-semibold text-blue-600">输入输出接口：</span>
                  <span className="text-slate-600">支持图像、文本和边界框（Bounding Box）的混合输入输出。</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                <div>
                  <span className="font-semibold text-blue-600">三阶段训练管道：</span>
                  <span className="text-slate-600">逐步注入视觉知识和细粒度理解能力。</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Database className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                <div>
                  <span className="font-semibold text-blue-600">多语言多模态清洗语料库：</span>
                  <span className="text-slate-600">确保数据的质量和多样性。</span>
                </div>
              </li>
            </ul>
          </div>

          <InfoBox title="论文核心贡献" color="blue">
            <p>Qwen-VL 不仅能看图说话，还能进行细粒度的<strong>视觉定位（Grounding）</strong>和<strong>文本阅读（OCR）</strong>。这使其成为一个真正的"全能型"视觉语言模型。</p>
          </InfoBox>
        </Section>

        {/* 2. 模型架构 */}
        <Section id="architecture" title="2. 模型架构 (Methodology)" icon={Layers}>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-lg border border-indigo-200">
              <h3 className="font-bold text-lg mb-2 text-indigo-700">1. 大型语言模型 (LLM)</h3>
              <p className="text-sm text-slate-600">
                基座模型采用 <strong>Qwen-7B</strong>。初始化时使用了 Qwen-7B 的预训练权重。
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-teal-50 p-5 rounded-lg border border-green-200">
              <h3 className="font-bold text-lg mb-2 text-green-700">2. 视觉编码器</h3>
              <p className="text-sm text-slate-600">
                采用 <strong>Vision Transformer (ViT)</strong> 架构，初始化权重来自 Openclip 的 <strong>ViT-bigG</strong>。图像被分割成 Patch（步幅为14）。
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-lg border border-purple-200">
              <h3 className="font-bold text-lg mb-2 text-purple-700">3. VL Adapter (关键)</h3>
              <p className="text-sm text-slate-600">
                <strong>位置感知视觉-语言适配器</strong>。用于压缩过长的图像特征序列，解决效率问题。
              </p>
            </div>
          </div>

          {/* 2.1 Adapter 数学解析 */}
          <div id="adapter-math" className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold mb-4 text-slate-800 flex items-center gap-2">
              <Cpu size={20} className="text-blue-600" />
              2.1 Adapter 核心原理与公式解析
            </h3>
            <p className="mb-4 text-slate-700">
              Qwen-VL 引入了一个单层的 <strong>Cross-Attention</strong> 模块作为 Adapter。为了处理高分辨率图像带来的长序列特征，该模块将图像特征压缩为<strong>固定长度的序列（256 个 Token）</strong>。
            </p>

            <div className="mb-6">
              <h4 className="font-semibold text-slate-800 mb-2">核心机制：Cross-Attention</h4>
              <p className="text-sm text-slate-600 mb-3">
                Adapter 使用一组可训练的嵌入向量作为 Queries，视觉编码器的输出作为 Keys 和 Values。
              </p>
              
              <MathBlock>{`\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V`}</MathBlock>

              <div className="space-y-3 mt-4 text-slate-700 text-sm">
                <p className="font-semibold">各变量定义：</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-mono text-xs">Q</span>
                    <div>
                      <strong>可学习的查询向量 (Learnable Queries)</strong>
                      <p className="text-slate-500">
                        <InlineMath math="Q \in \mathbb{R}^{L_{out} \times d}" />，其中 <InlineMath math="L_{out} = 256" />。
                        这是 Adapter 随机初始化的参数，无论输入图像多大，输出到 LLM 的视觉 Token 数量始终是 256。
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded font-mono text-xs">K, V</span>
                    <div>
                      <strong>图像特征 (Image Features)</strong>
                      <p className="text-slate-500">
                        <InlineMath math="K, V \in \mathbb{R}^{L_{in} \times d}" />，来自 ViT 的输出。
                        对于 448×448 的图像，Patch 步幅为 14，则 <InlineMath math="L_{in} = (448/14)^2 = 1024" />。
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-mono text-xs">d</span>
                    <span>特征维度。</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-slate-800 mb-2">位置感知 (Position-Aware) 机制</h4>
              <p className="text-sm text-slate-600 mb-3">
                为了防止在压缩过程中丢失空间位置信息（这对于定位任务至关重要），Qwen-VL 将 <strong>2D 绝对位置编码</strong>加入到了 Query-Key 对中。
              </p>
              
              <MathBlock title="位置感知注意力得分：">{`\\text{Attention Score} = \\frac{(Q + P_Q)(K + P_K)^T}{\\sqrt{d_k}}`}</MathBlock>

              <p className="text-sm text-slate-600 mt-2">
                其中 <InlineMath math="P_Q" /> 和 <InlineMath math="P_K" /> 分别代表 Query 和 Key 的位置嵌入。这种设计使得模型在压缩特征的同时，保留了图像的细粒度空间结构信息。
              </p>
            </div>

            <InfoBox title="为什么使用 Cross-Attention 而不是简单的 MLP？" color="yellow">
              <p>Cross-Attention 允许模型<strong>动态选择</strong>哪些视觉特征是重要的，而不是简单的线性映射。可学习的 Query 类似于 DETR 中的 Object Query，能够学习"应该关注图像的哪些部分"。</p>
            </InfoBox>
          </div>

          {/* 2.2 输入输出接口 */}
          <div id="io-interface">
            <h3 className="text-xl font-bold mb-4 text-slate-800 border-b pb-2">2.2 输入输出接口</h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-800 mb-2">图像输入 (Image Input)</h4>
                <p className="text-sm text-slate-600 mb-3">使用特殊 Token 包裹图像特征序列，以便 LLM 区分图像和文本。</p>
                <code className="block bg-slate-800 text-green-400 p-3 rounded text-sm font-mono">
                  &lt;img&gt; [图像特征序列] &lt;/img&gt;
                </code>
              </div>
              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-800 mb-2">边界框 (Bounding Box)</h4>
                <p className="text-sm text-slate-600 mb-3">为了提升细粒度理解，模型需要处理区域描述。坐标被归一化到 [0, 1000) 范围内。</p>
                <div className="bg-slate-100 p-3 rounded border border-slate-200">
                  <p className="text-xs text-slate-500 mb-1">格式：</p>
                  <p className="font-mono text-sm font-bold text-slate-800">
                    (X<sub>topleft</sub>, Y<sub>topleft</sub>), (X<sub>bottomright</sub>, Y<sub>bottomright</sub>)
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
              <h4 className="font-bold text-slate-800 mb-2">检测框与文本关联</h4>
              <p className="text-sm text-slate-600 mb-2">
                引入特殊 Token <code className="bg-slate-200 px-1.5 py-0.5 rounded text-blue-700">&lt;box&gt;</code> 和 <code className="bg-slate-200 px-1.5 py-0.5 rounded text-blue-700">&lt;/box&gt;</code> 来包裹坐标字符串。
                引入 <code className="bg-slate-200 px-1.5 py-0.5 rounded text-blue-700">&lt;ref&gt;</code> 和 <code className="bg-slate-200 px-1.5 py-0.5 rounded text-blue-700">&lt;/ref&gt;</code> 来标记边界框所指代的文本内容。
              </p>
              <InfoBox title="示例" color="yellow">
                <code className="font-mono">&lt;ref&gt;一只猫&lt;/ref&gt;&lt;box&gt;(200,150),(400,350)&lt;/box&gt;</code>
              </InfoBox>
            </div>
          </div>
        </Section>

        {/* 3. 三阶段训练 */}
        <Section id="training" title="3. 三阶段训练流程" icon={Zap}>
          <div className="relative border-l-4 border-blue-200 ml-4 space-y-8">
            
            {/* Stage 1 */}
            <div className="relative pl-8">
              <div className="absolute -left-3 top-0 bg-blue-500 h-6 w-6 rounded-full border-4 border-white flex items-center justify-center text-white text-xs font-bold">1</div>
              <h3 className="text-lg font-bold text-blue-800">第一阶段：预训练 (Pre-training)</h3>
              <div className="bg-white mt-3 p-5 rounded-lg shadow-sm border border-slate-100">
                <ul className="space-y-2 text-sm text-slate-700">
                  <li><strong>目标：</strong> 对齐视觉和语言特征。</li>
                  <li><strong>数据：</strong> 弱标签、网络爬取的图像-文本对（清洗后约 <strong>14 亿对</strong>）。包含 LAION-en/zh 等。</li>
                  <li><strong>模型状态：</strong> 冻结 LLM，仅优化 <span className="text-red-500 font-bold">Visual Encoder</span> 和 <span className="text-red-500 font-bold">VL Adapter</span>。</li>
                  <li><strong>输入分辨率：</strong> <InlineMath math="224 \times 224" />。</li>
                  <li><strong>损失函数：</strong> 文本 Token 的交叉熵损失。</li>
                </ul>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="relative pl-8">
              <div className="absolute -left-3 top-0 bg-indigo-500 h-6 w-6 rounded-full border-4 border-white flex items-center justify-center text-white text-xs font-bold">2</div>
              <h3 className="text-lg font-bold text-indigo-800">第二阶段：多任务预训练 (Multi-task Pre-training)</h3>
              <div className="bg-white mt-3 p-5 rounded-lg shadow-sm border border-slate-100">
                <ul className="space-y-2 text-sm text-slate-700">
                  <li><strong>目标：</strong> 引入高质量、细粒度的视觉-语言标注数据，提升特定任务能力（如 OCR、定位）。</li>
                  <li><strong>数据：</strong> 7 种任务的混合数据（Captioning, VQA, Grounding, OCR 等）。引入了交错（Interleaved）图像-文本数据。</li>
                  <li><strong>模型状态：</strong> <span className="text-green-600 font-bold">解锁 LLM</span>，训练整个模型（Full Model Training）。</li>
                  <li><strong>输入分辨率：</strong> 提升至 <InlineMath math="448 \times 448" />（减少下采样带来的信息丢失）。</li>
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Captioning</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">VQA</span>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Grounding</span>
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">OCR</span>
                  <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded">Referring</span>
                  <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded">Interleaved</span>
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Pure Text</span>
                </div>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="relative pl-8">
              <div className="absolute -left-3 top-0 bg-purple-500 h-6 w-6 rounded-full border-4 border-white flex items-center justify-center text-white text-xs font-bold">3</div>
              <h3 className="text-lg font-bold text-purple-800">第三阶段：监督微调 (Supervised Fine-tuning)</h3>
              <div className="bg-white mt-3 p-5 rounded-lg shadow-sm border border-slate-100">
                <ul className="space-y-2 text-sm text-slate-700">
                  <li><strong>目标：</strong> 增强指令跟随（Instruction Following）和对话能力，生成 <strong>Qwen-VL-Chat</strong>。</li>
                  <li><strong>数据：</strong> 指令微调数据（对话、多图推理、定位任务等），采用 ChatML 格式。</li>
                  <li><strong>模型状态：</strong> 冻结 Visual Encoder，优化 <span className="text-red-500 font-bold">LLM</span> 和 <span className="text-red-500 font-bold">Adapter</span>。</li>
                  <li><strong>交互能力：</strong> 此时模型学会了多图输入和多轮对话。</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 训练阶段对比表格 */}
          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-800">阶段</th>
                  <th className="px-4 py-3 text-left font-bold text-slate-800">分辨率</th>
                  <th className="px-4 py-3 text-left font-bold text-slate-800">可训练模块</th>
                  <th className="px-4 py-3 text-left font-bold text-slate-800">数据规模</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium">Stage 1: 预训练</td>
                  <td className="px-4 py-3">224×224</td>
                  <td className="px-4 py-3">ViT + Adapter</td>
                  <td className="px-4 py-3">~14 亿对</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="px-4 py-3 font-medium">Stage 2: 多任务预训练</td>
                  <td className="px-4 py-3 text-green-600 font-bold">448×448</td>
                  <td className="px-4 py-3 text-green-600 font-bold">全部解冻</td>
                  <td className="px-4 py-3">7 种任务混合</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium">Stage 3: SFT</td>
                  <td className="px-4 py-3">448×448</td>
                  <td className="px-4 py-3">LLM + Adapter</td>
                  <td className="px-4 py-3">指令数据</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        {/* 4. 实验评估 */}
        <Section id="evaluation" title="4. 实验与评估" icon={BarChart3}>
          <p className="mb-6 text-slate-700">
            Qwen-VL 在多个以视觉为中心的基准测试中展现了 <strong className="text-green-600">SOTA (State-of-the-Art)</strong> 性能，甚至超越了参数量更大的模型（如 Flamingo-80B）。
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-slate-200 text-sm rounded-lg overflow-hidden">
              <thead className="bg-slate-100">
                <tr>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-800">任务类别</th>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-800">数据集</th>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-800">Qwen-VL 表现</th>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-800">对比说明</th>
                </tr>
              </thead>
              <tbody className="text-slate-600 divide-y divide-slate-200">
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-semibold">图像描述 (Captioning)</td>
                  <td className="py-3 px-4">Flickr30K (Zero-shot)</td>
                  <td className="py-3 px-4 font-bold text-green-600">85.8 (CIDEr)</td>
                  <td className="py-3 px-4">超越 Flamingo-80B (82.8)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-semibold">通用问答 (General VQA)</td>
                  <td className="py-3 px-4">VQAv2</td>
                  <td className="py-3 px-4 font-bold text-green-600">79.5 (Acc)</td>
                  <td className="py-3 px-4">大幅领先 InstructBLIP (56.6)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-semibold">文本导向问答 (OCR VQA)</td>
                  <td className="py-3 px-4">DocVQA</td>
                  <td className="py-3 px-4 font-bold text-green-600">65.1 (ANLS)</td>
                  <td className="py-3 px-4">优于所有通用模型</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-semibold">指代理解 (Grounding)</td>
                  <td className="py-3 px-4">RefCOCO</td>
                  <td className="py-3 px-4 font-bold text-green-600">Top-tier 表现</td>
                  <td className="py-3 px-4">具备极强的细粒度定位能力</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
              <Target size={18} className="text-blue-600" />
              少样本学习 (Few-shot Learning)
            </h4>
            <p className="text-sm text-slate-600">
              Qwen-VL 在少样本场景（Few-shot）下也表现出色。例如在只需展示 <strong>2 张图（2-shot）</strong>的情况下，其在 VQAv2 等任务上的性能即超越了许多全量训练的模型。
            </p>
          </div>
        </Section>

        {/* 5. 总结 */}
        <Section id="conclusion" title="5. 总结与展望" icon={MessageSquare}>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
            <p className="leading-relaxed text-slate-800 mb-4">
              Qwen-VL 系列不仅是一个能"看"的模型，更是一个能"读"（OCR）和"找"（Grounding）的全能选手。
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Check className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                <div>
                  <strong className="text-slate-800">多语言支持：</strong>
                  <span className="text-slate-600">天然支持中文和英文，得益于多语言清洗语料库。</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                <div>
                  <strong className="text-slate-800">高分辨率输入：</strong>
                  <span className="text-slate-600">448×448 的分辨率使其在细粒度任务上优势明显。</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                <div>
                  <strong className="text-slate-800">多图交互：</strong>
                  <span className="text-slate-600">支持多张图像输入，能够进行图像比较和上下文分析。</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                <div>
                  <strong className="text-slate-800">固定 Token 预算：</strong>
                  <span className="text-slate-600">256 个视觉 Token 的设计在效率和性能之间取得了良好平衡。</span>
                </div>
              </li>
            </ul>
          </div>

          {/* 核心技术总结 */}
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">256</div>
              <div className="text-sm text-slate-600">固定视觉 Token 数</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">448²</div>
              <div className="text-sm text-slate-600">最高输入分辨率</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">14 亿</div>
              <div className="text-sm text-slate-600">预训练图文对</div>
            </div>
          </div>
        </Section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center">
        <p className="text-sm">基于 Qwen-VL 论文 (arXiv:2308.12966v3) 生成</p>
      </footer>
    </div>
  );
};

export default QwenVL;


