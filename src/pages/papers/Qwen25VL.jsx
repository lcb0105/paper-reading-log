import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Layers, Cpu, Zap, BarChart3, Eye, Video, FileText, Calculator, Check, Clock, ArrowUpDown, Grid3X3, Target, MonitorSmartphone, Scan, Table2, PenTool, Timer, Maximize2, Database, Sparkles, Box, Merge, Settings } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

// --- 通用组件 ---
const Section = ({ id, number, title, icon: Icon, children, className = "" }) => (
  <section id={id} className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-8 ${className}`}>
    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
      {number && (
        <span className="bg-teal-100 text-teal-700 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">
          {number}
        </span>
      )}
      {Icon && <Icon className="text-teal-600 mr-3" size={24} />}
      {title}
    </h2>
    {children}
  </section>
);

const MathBlock = ({ children, title }) => (
  <div className="overflow-x-auto py-4 px-6 bg-gray-50 rounded-lg border border-gray-200 my-4">
    {title && <p className="font-bold mb-2 text-sm text-gray-500">{title}</p>}
    <div className="text-center">
      <BlockMath math={children} />
    </div>
  </div>
);

const InfoBox = ({ title, children, color = "green" }) => {
  const colors = {
    green: "bg-green-50 text-green-800 border-green-500",
    blue: "bg-blue-50 text-blue-800 border-blue-500",
    teal: "bg-teal-50 text-teal-800 border-teal-500",
    purple: "bg-purple-50 text-purple-800 border-purple-500",
    yellow: "bg-yellow-50 text-yellow-800 border-yellow-500",
    orange: "bg-orange-50 text-orange-800 border-orange-500"
  };
  return (
    <div className={`p-4 rounded-lg border-l-4 my-4 ${colors[color]}`}>
      {title && <strong className="block mb-1">{title}</strong>}
      <div className="text-sm">{children}</div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description, color = "teal" }) => {
  const colors = {
    teal: "from-teal-50 to-cyan-50 border-teal-200 text-teal-700",
    purple: "from-purple-50 to-pink-50 border-purple-200 text-purple-700",
    blue: "from-blue-50 to-indigo-50 border-blue-200 text-blue-700",
    green: "from-green-50 to-emerald-50 border-green-200 text-green-700",
    orange: "from-orange-50 to-yellow-50 border-orange-200 text-orange-700"
  };
  return (
    <div className={`bg-gradient-to-br ${colors[color]} p-5 rounded-xl border`}>
      <div className="flex items-center gap-3 mb-2">
        <Icon size={20} />
        <h4 className="font-bold">{title}</h4>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

// --- 主组件 ---
const Qwen25VL = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-teal-100">
      
      {/* 返回按钮 */}
      <div className="fixed top-4 left-4 z-50">
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-lg text-gray-600 hover:text-teal-600 transition-colors border border-gray-200 shadow-sm"
        >
          <ArrowLeft size={16} />
          返回
        </Link>
      </div>

      {/* Header */}
      <header className="bg-gradient-to-r from-teal-700 via-cyan-700 to-blue-800 text-white py-16 px-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="text-sm font-semibold uppercase tracking-wider text-teal-200 mb-2">
            Technical Report (arXiv:2502.13923v1)
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Qwen2.5-VL 技术报告
          </h1>
          <p className="text-xl text-teal-100 max-w-2xl leading-relaxed">
            从细粒度感知到 Agent 交互：Window Attention + 绝对时间 MRoPE + 4.1T 预训练数据
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <span className="bg-teal-900/50 px-3 py-1 rounded-full text-sm border border-teal-400">Alibaba Qwen Team</span>
            <span className="bg-teal-900/50 px-3 py-1 rounded-full text-sm border border-teal-400">Window Attention</span>
            <span className="bg-teal-900/50 px-3 py-1 rounded-full text-sm border border-teal-400">Absolute Time MRoPE</span>
            <span className="bg-teal-900/50 px-3 py-1 rounded-full text-sm border border-teal-400">4.1T Tokens</span>
            <span className="bg-teal-900/50 px-3 py-1 rounded-full text-sm border border-teal-400">Visual Agent</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* 1. 核心摘要 */}
        <Section id="abstract" number="01" title="核心摘要与贡献">
          <p className="mb-4 text-gray-700 leading-relaxed">
            Qwen2.5-VL 是 Qwen 视觉语言系列的最新旗舰模型，在基础能力和创新功能方面都取得了显著进展。该模型提供 <strong>3B、7B、72B</strong> 三个版本，实现了从边缘 AI 到高性能计算的全场景覆盖。
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <FeatureCard 
              icon={FileText} 
              title="全能文档解析" 
              description="多场景、多语言文档处理：手写、表格、图表、化学公式、乐谱等"
              color="teal"
            />
            <FeatureCard 
              icon={Target} 
              title="精确对象定位" 
              description="边界框 (Bounding Box) 和点 (Point) 格式的精确定位与计数"
              color="blue"
            />
            <FeatureCard 
              icon={Video} 
              title="超长视频理解" 
              description="支持小时级视频理解，秒级事件定位 (Second-level Event Localization)"
              color="purple"
            />
            <FeatureCard 
              icon={MonitorSmartphone} 
              title="视觉 Agent 能力" 
              description="操作电脑和手机设备，执行推理、工具使用和真实任务"
              color="orange"
            />
          </div>

          <InfoBox title="核心技术贡献" color="teal">
            <ol className="list-decimal list-inside space-y-1">
              <li><strong>Window Attention</strong> - 在视觉编码器中实现窗口注意力，优化推理效率</li>
              <li><strong>动态 FPS 采样</strong> - 将动态分辨率扩展到时间维度，支持不同采样率的视频理解</li>
              <li><strong>绝对时间 MRoPE</strong> - 升级时间维度位置编码到绝对时间对齐，实现精确时间序列学习</li>
              <li><strong>4.1T 预训练数据</strong> - 从 1.2T 扩展到 4.1T tokens，大幅提升模型能力</li>
            </ol>
          </InfoBox>
        </Section>

        {/* 2. 架构创新 */}
        <Section id="architecture" number="02" title="模型架构创新">
          
          {/* Vision Encoder */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200 flex items-center gap-2">
              <Eye size={20} className="text-teal-600" />
              1. 视觉编码器 (Vision Encoder)
            </h3>
            <p className="text-gray-600 mb-4">
              Qwen2.5-VL 采用了重新设计的 <strong>Vision Transformer (ViT)</strong>，从头开始训练，专为处理动态分辨率图像优化。
            </p>
            
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-4">
              <h4 className="font-bold text-gray-800 mb-3">ViT 架构关键配置</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <Check className="text-teal-500 mt-0.5 flex-shrink-0" size={16} />
                  <span><strong>Patch 处理：</strong>输入图像被调整为 <code className="bg-white px-1.5 py-0.5 rounded text-sm font-mono border">28</code> 的倍数，然后分割成 <InlineMath math="14 \times 14" /> 的 Patch</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-teal-500 mt-0.5 flex-shrink-0" size={16} />
                  <span><strong>Window Attention：</strong>大部分层使用窗口注意力（最大窗口 <InlineMath math="112 \times 112" />），计算复杂度 <InlineMath math="O(N)" /></span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-teal-500 mt-0.5 flex-shrink-0" size={16} />
                  <span><strong>全注意力层：</strong>仅在层索引 <code className="bg-white px-1.5 py-0.5 rounded text-sm font-mono border">7, 15, 23, 31</code> 使用全注意力整合全局信息</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-teal-500 mt-0.5 flex-shrink-0" size={16} />
                  <span><strong>架构组件：</strong>采用 <strong>SwiGLU</strong> 激活函数 + <strong>RMSNorm</strong> 归一化，与 LLM 保持一致</span>
                </li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white p-4 rounded-lg border border-red-100">
                <strong className="text-red-600 block mb-2">Global Attention (Qwen2-VL)</strong>
                <p className="text-sm text-gray-600">
                  每个 Token 关注所有其他 Token<br/>
                  计算复杂度：<InlineMath math="O(N^2)" />
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-green-100">
                <strong className="text-green-600 block mb-2">Window Attention (Qwen2.5-VL)</strong>
                <p className="text-sm text-gray-600">
                  仅关注局部窗口 <InlineMath math="112 \times 112" /><br/>
                  计算复杂度：<InlineMath math="O(N)" />（线性）
                </p>
              </div>
            </div>

            <InfoBox color="yellow" title="为什么 Window Attention 有效？">
              论文指出，从零开始训练原生动态分辨率的 ViT 时，Window Attention 能够在保持原生分辨率的同时显著减少计算开销。这使得模型能够处理更高分辨率的图像而不会导致计算量爆炸。
            </InfoBox>
          </div>

          {/* Vision-Language Merger */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200 flex items-center gap-2">
              <Merge size={20} className="text-teal-600" />
              2. 视觉-语言融合 (MLP Merger)
            </h3>
            <p className="text-gray-600 mb-4">
              为了进一步压缩视觉序列长度，Qwen2.5-VL 引入了一个高效的压缩机制：
            </p>
            
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-4">
              <h4 className="font-bold text-gray-800 mb-3">2×2 Pooling + MLP 压缩流程</h4>
              <div className="text-center">
                <div className="inline-block text-left bg-white p-4 rounded-lg border border-gray-200">
                  <code className="text-sm text-gray-700 font-mono">
                    [Patch 1] [Patch 2]<br/>
                    [Patch 3] [Patch 4]
                  </code>
                </div>
                <div className="my-3 text-gray-400">↓ 2×2 分组 & 拼接</div>
                <div className="inline-block bg-teal-100 px-4 py-2 rounded-lg border border-teal-200">
                  <code className="text-sm text-teal-700 font-mono font-bold">Concat → 2-Layer MLP</code>
                </div>
                <div className="my-3 text-gray-400">↓ 映射到 LLM 嵌入维度</div>
                <div className="inline-block bg-green-100 px-4 py-2 rounded-lg border border-green-200">
                  <code className="text-sm text-green-700 font-mono font-bold">1 个压缩后 Token</code>
                </div>
              </div>
            </div>

            <InfoBox color="green" title="Token 压缩效果">
              模型将 <InlineMath math="2 \times 2" /> 的相邻 Patch 特征进行分组拼接，通过两层 MLP 映射到 LLM 的嵌入维度。这使得<strong>视觉 Token 数量减少了 75%</strong>，极大提高了长文本和长视频的处理效率。
            </InfoBox>
          </div>

          {/* Dynamic FPS */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200 flex items-center gap-2">
              <Timer size={20} className="text-teal-600" />
              3. 动态 FPS 采样 (Dynamic FPS Sampling)
            </h3>
            <p className="text-gray-600 mb-4">
              Qwen2.5-VL 将动态分辨率的概念从空间维度扩展到了<strong>时间维度</strong>，实现了动态帧率采样。
            </p>
            
            <div className="bg-teal-50 p-6 rounded-xl border border-teal-200">
              <h4 className="font-bold text-teal-800 mb-3">动态 FPS 采样的优势</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <Check className="text-teal-500 mt-0.5 flex-shrink-0" size={16} />
                  <span><strong>适应不同视频特性：</strong>快速动作场景使用高 FPS，静态场景使用低 FPS</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-teal-500 mt-0.5 flex-shrink-0" size={16} />
                  <span><strong>小时级视频理解：</strong>通过动态采样，可以处理超长视频而不会 Token 数量爆炸</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-teal-500 mt-0.5 flex-shrink-0" size={16} />
                  <span><strong>秒级事件定位：</strong>精确定位视频中的特定事件时间点</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Absolute Time MRoPE */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200 flex items-center gap-2">
              <Clock size={20} className="text-teal-600" />
              4. 绝对时间 MRoPE (Absolute Time MRoPE)
            </h3>
            <p className="text-gray-600 mb-4">
              Qwen2.5-VL 改进了旋转位置编码（RoPE），使其能够处理 3D 位置信息（时间、高度、宽度）。这是通过将特征向量的通道维度分解为三个部分来实现的。
            </p>
            
            {/* MROPE 公式 */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-200 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-purple-900">MROPE 核心公式</h4>
                <span className="text-xs font-mono bg-purple-200 text-purple-800 px-2 py-1 rounded">Key Innovation</span>
              </div>
              
              <MathBlock title="1. 分解 Query/Key 向量">
                {`\\mathbf{q} = [\\mathbf{q}_t, \\mathbf{q}_h, \\mathbf{q}_w]`}
              </MathBlock>
              
              <MathBlock title="2. 应用多模态旋转">
                {`\\text{MROPE}(\\mathbf{q}, t, h, w) = \\text{concat}\\big(\\text{RoPE}(\\mathbf{q}_t, \\text{ID}_t), \\text{RoPE}(\\mathbf{q}_h, \\text{ID}_h), \\text{RoPE}(\\mathbf{q}_w, \\text{ID}_w)\\big)`}
              </MathBlock>

              <p className="text-sm text-gray-600 mt-4">
                其中 <InlineMath math="\mathbf{q}_t, \mathbf{q}_h, \mathbf{q}_w" /> 分别对应时间、高度、宽度的特征分量，<InlineMath math="\text{ID}_t, \text{ID}_h, \text{ID}_w" /> 为对应的位置索引。
              </p>
            </div>

            {/* 绝对时间对齐 */}
            <div className="bg-teal-50 p-6 rounded-xl border border-teal-200 mb-4">
              <h4 className="font-bold text-teal-800 mb-3">绝对时间对齐 (Absolute Time Alignment)</h4>
              <p className="text-gray-700 mb-3">
                传统视频模型使用帧索引 <InlineMath math="i" /> 作为时间 ID，这丢失了视频的实际速率信息。Qwen2.5-VL 创新性地将 <InlineMath math="\text{ID}_t" /> 与<strong>绝对时间</strong>对齐：
              </p>
              
              <MathBlock>
                {`\\tau_k = \\frac{k}{v_{\\text{fps}}} \\quad \\Rightarrow \\quad \\text{ID}_t = \\lfloor \\tau_k \\times s \\rfloor`}
              </MathBlock>

              <p className="text-sm text-gray-600 mt-3">
                其中 <InlineMath math="\tau_k" /> 是第 <InlineMath math="k" /> 帧的绝对时间戳（秒），<InlineMath math="v_{\text{fps}}" /> 是视频帧率，<InlineMath math="s" /> 是时间缩放因子（用于将秒转换为整数 ID）。
              </p>
            </div>

            {/* 具体计算示例 */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 mb-4">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Calculator size={18} className="text-purple-600" />
                具体计算示例
              </h4>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-sm font-bold text-gray-700 mb-2">假设条件：</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 视频原始帧率：<InlineMath math="v_{\text{fps}} = 30" /> FPS（即原始视频每秒有 30 帧）</li>
                  <li>• 时间缩放因子：<InlineMath math="s = 1" />（即 1 秒 = 1 个 ID 单位）</li>
                  <li>• 动态采样：每秒采样 2 帧（从 30 帧中只选 2 帧送入模型）</li>
                </ul>
              </div>

              {/* k 的解释 */}
              <div className="bg-blue-50 p-4 rounded-lg mb-4 border border-blue-200">
                <p className="text-sm font-bold text-blue-800 mb-2">关于 <InlineMath math="k" /> 的解释：</p>
                <p className="text-sm text-gray-700 mb-2">
                  <InlineMath math="k" /> 是<strong>原始视频中的帧编号</strong>（从 0 开始）。
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  原始 30 FPS 视频的帧编号：0, 1, 2, 3, ..., 29（第 1 秒）, 30, 31, ..., 59（第 2 秒）, ...
                </p>
                <p className="text-sm text-gray-700">
                  <strong>为什么是 0, 15, 30...？</strong> 因为采样率是 2 FPS，即每秒只选 2 帧。原始 30 FPS 中每隔 15 帧取一帧：
                </p>
                <div className="mt-2 bg-white p-3 rounded border border-blue-100 font-mono text-xs">
                  原始帧：[0, 1, 2, ..., 14, <strong className="text-blue-600 text-sm">15</strong>, 16, ..., 29, <strong className="text-blue-600 text-sm">30</strong>, 31, ...]<br/>
                  采样帧：[<strong className="text-teal-600 text-sm">0</strong>, <strong className="text-teal-600 text-sm">15</strong>, <strong className="text-teal-600 text-sm">30</strong>, <strong className="text-teal-600 text-sm">45</strong>, ...] ← 送入模型的帧
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-purple-50">
                    <tr>
                      <th className="px-3 py-2 text-left font-bold text-purple-800">采样序号</th>
                      <th className="px-3 py-2 text-left font-bold text-purple-800">原始帧索引 <InlineMath math="k" /></th>
                      <th className="px-3 py-2 text-left font-bold text-purple-800">绝对时间 <InlineMath math="\tau_k = k/30" /></th>
                      <th className="px-3 py-2 text-left font-bold text-teal-700">时间 ID (绝对)</th>
                      <th className="px-3 py-2 text-left font-bold text-gray-500">传统 ID (相对)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="bg-white">
                      <td className="px-3 py-2 text-gray-500">第 1 帧</td>
                      <td className="px-3 py-2 font-mono font-bold">0</td>
                      <td className="px-3 py-2">0/30 = <strong>0.0 秒</strong></td>
                      <td className="px-3 py-2 font-bold text-teal-600">0</td>
                      <td className="px-3 py-2 text-gray-400">0</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-3 py-2 text-gray-500">第 2 帧</td>
                      <td className="px-3 py-2 font-mono font-bold">15</td>
                      <td className="px-3 py-2">15/30 = <strong>0.5 秒</strong></td>
                      <td className="px-3 py-2 font-bold text-teal-600">0</td>
                      <td className="px-3 py-2 text-gray-400">1</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-3 py-2 text-gray-500">第 3 帧</td>
                      <td className="px-3 py-2 font-mono font-bold">30</td>
                      <td className="px-3 py-2">30/30 = <strong>1.0 秒</strong></td>
                      <td className="px-3 py-2 font-bold text-teal-600">1</td>
                      <td className="px-3 py-2 text-gray-400">2</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-3 py-2 text-gray-500">第 4 帧</td>
                      <td className="px-3 py-2 font-mono font-bold">45</td>
                      <td className="px-3 py-2">45/30 = <strong>1.5 秒</strong></td>
                      <td className="px-3 py-2 font-bold text-teal-600">1</td>
                      <td className="px-3 py-2 text-gray-400">3</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-3 py-2 text-gray-500">第 5 帧</td>
                      <td className="px-3 py-2 font-mono font-bold">60</td>
                      <td className="px-3 py-2">60/30 = <strong>2.0 秒</strong></td>
                      <td className="px-3 py-2 font-bold text-teal-600">2</td>
                      <td className="px-3 py-2 text-gray-400">4</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-3 py-2 text-gray-500">第 6 帧</td>
                      <td className="px-3 py-2 font-mono font-bold">90</td>
                      <td className="px-3 py-2">90/30 = <strong>3.0 秒</strong></td>
                      <td className="px-3 py-2 font-bold text-teal-600">3</td>
                      <td className="px-3 py-2 text-gray-400">5</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <InfoBox color="purple" title="关键区别">
                <p><strong>传统方式：</strong>采样后的帧索引 0, 1, 2, 3... 均匀递增，模型无法知道帧之间的实际时间间隔。</p>
                <p className="mt-2"><strong>绝对时间对齐：</strong>时间 ID 基于真实时间戳计算，模型能感知到"第 0 帧在 0 秒，第 2 帧在 1 秒"。即使采样率变化，ID 间隔也能反映真实时间流逝。</p>
              </InfoBox>
            </div>

            {/* 动态 FPS 场景示例 */}
            <div className="bg-orange-50 p-6 rounded-xl border border-orange-200 mb-4">
              <h4 className="font-bold text-orange-800 mb-3">动态 FPS 采样场景</h4>
              <p className="text-sm text-gray-700 mb-3">
                在动态 FPS 采样中，不同片段可能使用不同的采样率。例如：
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white p-3 rounded-lg border border-orange-100">
                  <strong className="text-orange-700">快速动作片段 (0-5秒)</strong>
                  <p className="text-gray-600 mt-1">采样率：4 FPS → 采样 20 帧</p>
                  <p className="text-gray-600">时间 ID 间隔：0.25 秒/帧</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-orange-100">
                  <strong className="text-orange-700">静态场景 (5-15秒)</strong>
                  <p className="text-gray-600 mt-1">采样率：1 FPS → 采样 10 帧</p>
                  <p className="text-gray-600">时间 ID 间隔：1 秒/帧</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                通过绝对时间对齐，模型知道快速片段的帧之间时间更紧凑（ID 间隔小），静态片段的帧之间时间更稀疏（ID 间隔大），从而正确理解视频的时间节奏。
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-4">
              <h4 className="font-bold text-gray-800 mb-3">MRoPE 演进对比</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold">版本</th>
                      <th className="px-4 py-3 text-left font-bold">时间 ID 编码方式</th>
                      <th className="px-4 py-3 text-left font-bold">特点</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="bg-white">
                      <td className="px-4 py-3 font-medium">Qwen2-VL</td>
                      <td className="px-4 py-3">帧索引 <InlineMath math="\text{ID}_t = i" /></td>
                      <td className="px-4 py-3">相对帧位置，无法感知实际时间</td>
                    </tr>
                    <tr className="bg-teal-50">
                      <td className="px-4 py-3 font-medium text-teal-700">Qwen2.5-VL</td>
                      <td className="px-4 py-3 font-bold text-teal-700">绝对时间戳 <InlineMath math="\tau_k" /></td>
                      <td className="px-4 py-3 text-teal-700">感知真实时间流逝，秒级定位</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Native Dynamic Resolution ViT */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200 flex items-center gap-2">
              <Maximize2 size={20} className="text-teal-600" />
              5. 原生动态分辨率 ViT
            </h3>
            <p className="text-gray-600 mb-4">
              Qwen2.5-VL <strong>从零开始训练</strong>原生动态分辨率的 Vision Transformer，而非在固定分辨率预训练后再适配。
            </p>
            
            <InfoBox color="blue" title="原生训练 vs 适配训练">
              <p>传统方法：先用固定分辨率（如 224×224）预训练 ViT，再通过插值等方式适配到动态分辨率。</p>
              <p className="mt-2"><strong>Qwen2.5-VL 方法：</strong>直接在动态分辨率下从零训练 ViT，模型天生就能感知空间尺度和时间动态，无需依赖传统的归一化技术。</p>
            </InfoBox>
          </div>
        </Section>

        {/* 核心公式详解 */}
        <section id="formulas" className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl shadow-md border border-indigo-100">
          <h2 className="text-2xl font-bold text-indigo-900 mb-6 flex items-center gap-3">
            <Calculator className="text-indigo-600" size={28} />
            核心数学原理与公式
          </h2>
          <p className="mb-6 text-gray-700">
            Qwen2.5-VL 在 ViT 模块中采用了与 LLM 一致的架构组件，包括 SwiGLU 激活函数和 RMSNorm 归一化层，以提升训练稳定性和效率。
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* SwiGLU */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Zap size={18} className="text-orange-500" />
                SwiGLU 激活函数
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                ViT 模块中使用 SwiGLU 替代传统的 ReLU/GELU，以提升非线性表达能力。
              </p>
              <MathBlock>
                {`\\text{SwiGLU}(x) = \\text{Swish}(xW) \\otimes (xV)`}
              </MathBlock>
              <MathBlock>
                {`\\text{Swish}(z) = z \\cdot \\sigma(z)`}
              </MathBlock>
              <p className="text-xs text-gray-500 mt-2">
                其中 <InlineMath math="W, V" /> 是可学习的权重矩阵，<InlineMath math="\otimes" /> 表示逐元素乘法，<InlineMath math="\sigma" /> 是 Sigmoid 函数。
              </p>
            </div>

            {/* RMSNorm */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Settings size={18} className="text-blue-500" />
                RMSNorm 归一化
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                使用均方根归一化替代 LayerNorm，计算更高效且训练更稳定。
              </p>
              <MathBlock>
                {`\\bar{a}_i = \\frac{a_i}{\\text{RMS}(\\mathbf{a})} \\cdot g_i`}
              </MathBlock>
              <MathBlock>
                {`\\text{RMS}(\\mathbf{a}) = \\sqrt{\\frac{1}{n} \\sum_{j=1}^n a_j^2}`}
              </MathBlock>
              <p className="text-xs text-gray-500 mt-2">
                <InlineMath math="g_i" /> 是可学习的缩放参数。RMSNorm 省略了均值偏移（Mean centering），简化了计算。
              </p>
            </div>
          </div>
        </section>

        {/* 3. 细粒度感知能力 */}
        <Section id="perception" number="03" title="细粒度感知能力">
          
          {/* Document Parsing */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200 flex items-center gap-2">
              <FileText size={20} className="text-teal-600" />
              1. 全能文档解析 (Omni-Document Parsing)
            </h3>
            <p className="text-gray-600 mb-4">
              Qwen2.5-VL 将文本识别升级为<strong>全场景文档解析</strong>，能够处理各种复杂文档：
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <PenTool className="mx-auto text-teal-600 mb-2" size={28} />
                <strong className="block text-gray-800">手写文本</strong>
                <p className="text-xs text-gray-500">Handwriting</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <Table2 className="mx-auto text-blue-600 mb-2" size={28} />
                <strong className="block text-gray-800">表格</strong>
                <p className="text-xs text-gray-500">Tables</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <BarChart3 className="mx-auto text-purple-600 mb-2" size={28} />
                <strong className="block text-gray-800">图表</strong>
                <p className="text-xs text-gray-500">Charts & Diagrams</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <span className="text-2xl">🧪</span>
                <strong className="block text-gray-800 mt-1">化学公式</strong>
                <p className="text-xs text-gray-500">Chemical Formulas</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <span className="text-2xl">🎵</span>
                <strong className="block text-gray-800 mt-1">乐谱</strong>
                <p className="text-xs text-gray-500">Music Sheets</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <span className="text-2xl">📑</span>
                <strong className="block text-gray-800 mt-1">发票表单</strong>
                <p className="text-xs text-gray-500">Invoices & Forms</p>
              </div>
            </div>
          </div>

          {/* Object Grounding */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200 flex items-center gap-2">
              <Target size={20} className="text-teal-600" />
              2. 精确对象定位 (Object Grounding)
            </h3>
            <p className="text-gray-600 mb-4">
              Qwen2.5-VL 支持多种格式的精确对象定位：
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
                <h4 className="font-bold text-blue-800 mb-2">边界框 (Bounding Box)</h4>
                <code className="block bg-white p-3 rounded text-sm font-mono text-gray-800">
                  {"{"}"box": [x1, y1, x2, y2]{"}"}
                </code>
                <p className="text-xs text-gray-600 mt-2">支持绝对坐标和 JSON 格式输出</p>
              </div>
              <div className="bg-green-50 p-5 rounded-xl border border-green-200">
                <h4 className="font-bold text-green-800 mb-2">点定位 (Point)</h4>
                <code className="block bg-white p-3 rounded text-sm font-mono text-gray-800">
                  {"{"}"point": [x, y]{"}"}
                </code>
                <p className="text-xs text-gray-600 mt-2">精确指向物体中心或关键位置</p>
              </div>
            </div>
            
            <InfoBox color="green" title="对象计数能力">
              除了定位，Qwen2.5-VL 还能精确计数图像中的对象数量，这对于文档处理（如计算表格行数）和场景理解（如计数人群）非常重要。
            </InfoBox>
          </div>

          {/* Video Grounding */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200 flex items-center gap-2">
              <Video size={20} className="text-teal-600" />
              3. 细粒度视频定位 (Fine-grained Video Grounding)
            </h3>
            <p className="text-gray-600 mb-4">
              得益于绝对时间 MRoPE，Qwen2.5-VL 能够进行<strong>秒级事件定位</strong>：
            </p>
            
            <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
              <h4 className="font-bold text-purple-800 mb-3">视频定位示例</h4>
              <div className="space-y-3 text-sm">
                <div className="bg-white p-3 rounded border border-purple-100">
                  <strong className="text-purple-700">问题：</strong>视频中什么时候出现了红色汽车？
                </div>
                <div className="bg-white p-3 rounded border border-purple-100">
                  <strong className="text-green-700">回答：</strong>红色汽车在 <code className="bg-gray-100 px-1 rounded">00:01:23</code> 到 <code className="bg-gray-100 px-1 rounded">00:01:45</code> 之间出现
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 4. Agent 能力 */}
        <Section id="agent" number="04" title="视觉 Agent 能力">
          <p className="text-gray-700 mb-6">
            Qwen2.5-VL 不仅是一个视觉理解模型，更是一个能够在真实世界场景中执行任务的<strong>交互式视觉 Agent</strong>。
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl text-white">
              <div className="flex items-center gap-3 mb-3">
                <MonitorSmartphone size={24} className="text-teal-400" />
                <h4 className="font-bold text-lg">电脑操作</h4>
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• 理解屏幕内容和 UI 元素</li>
                <li>• 执行点击、输入等操作</li>
                <li>• 完成多步骤任务流程</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl text-white">
              <div className="flex items-center gap-3 mb-3">
                <Scan size={24} className="text-blue-400" />
                <h4 className="font-bold text-lg">手机操作</h4>
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• 识别移动端 UI 界面</li>
                <li>• 执行滑动、点击等手势</li>
                <li>• 跨应用任务执行</li>
              </ul>
            </div>
          </div>

          <InfoBox color="orange" title="强泛化能力">
            Qwen2.5-VL 在各种领域表现出强大的泛化能力，<strong>无需针对特定任务进行微调</strong>即可执行推理、工具使用和任务执行。
          </InfoBox>
        </Section>

        {/* 5. 训练细节 */}
        <Section id="training" number="05" title="训练流程与数据">
          
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200 flex items-center gap-2">
              <Database size={20} className="text-teal-600" />
              数据规模对比
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-100 p-6 rounded-xl border border-gray-200 text-center">
                <div className="text-4xl font-bold text-gray-500 mb-2">1.2T</div>
                <div className="text-sm text-gray-600">Qwen2-VL 预训练 Tokens</div>
              </div>
              <div className="bg-teal-100 p-6 rounded-xl border border-teal-200 text-center">
                <div className="text-4xl font-bold text-teal-700 mb-2">4.1T</div>
                <div className="text-sm text-teal-700">Qwen2.5-VL 预训练 Tokens</div>
                <div className="text-xs text-teal-600 mt-1">↑ 3.4x 增长</div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200">训练阶段</h3>
            
            <div className="relative border-l-4 border-teal-200 ml-4 space-y-8">
              {/* Stage 1 */}
              <div className="relative pl-8">
                <div className="absolute -left-3 top-0 bg-green-500 h-6 w-6 rounded-full border-4 border-white flex items-center justify-center text-white text-xs font-bold">1</div>
                <h4 className="text-lg font-bold text-gray-800">预训练 (Pre-training)</h4>
                <p className="text-sm text-green-600 font-semibold mb-1">数据量：约 4.1 Trillion tokens</p>
                <p className="text-gray-600 mt-2">
                  分三个子阶段进行：<br/>
                  <span className="text-sm">• <strong>阶段 I：</strong>仅训练 ViT</span><br/>
                  <span className="text-sm">• <strong>阶段 II：</strong>解冻所有参数，使用大规模图文数据</span><br/>
                  <span className="text-sm">• <strong>阶段 III：</strong>引入长视频和 Agent 数据，序列长度增至 32k</span>
                </p>
              </div>

              {/* Stage 2 */}
              <div className="relative pl-8">
                <div className="absolute -left-3 top-0 bg-blue-500 h-6 w-6 rounded-full border-4 border-white flex items-center justify-center text-white text-xs font-bold">2</div>
                <h4 className="text-lg font-bold text-gray-800">监督微调 (Supervised Fine-tuning)</h4>
                <p className="text-gray-600 mt-2">
                  使用 <strong>ChatML 格式</strong>的指令数据。数据混合了纯文本、多图、视频对话、文档解析和 Grounding 任务。通过严格的数据清洗和过滤管道保证质量。
                </p>
              </div>

              {/* Stage 3: DPO */}
              <div className="relative pl-8">
                <div className="absolute -left-3 top-0 bg-purple-500 h-6 w-6 rounded-full border-4 border-white flex items-center justify-center text-white text-xs font-bold">3</div>
                <h4 className="text-lg font-bold text-gray-800">直接偏好优化 (DPO)</h4>
                <p className="text-gray-600 mt-2">
                  Post-training 的最后一步。<strong>冻结 ViT 参数</strong>，仅优化 LLM 部分。使用人类偏好数据进行对齐，减少幻觉并提高安全性。
                </p>
              </div>
            </div>
          </div>

          <InfoBox color="purple" title="数据质量优化">
            论文强调在预训练和监督微调阶段都进行了大量的数据质量优化工作，这对于提升模型的细粒度感知能力至关重要。
          </InfoBox>
        </Section>

        {/* 6. 性能对比 */}
        <Section id="performance" number="06" title="实验结果与性能">
          <p className="text-gray-700 mb-6">
            Qwen2.5-VL-72B 在多个基准测试中达到或超越 <strong>GPT-4o</strong> 和 <strong>Claude 3.5 Sonnet</strong> 的水平。
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm text-left border border-gray-200 rounded-lg overflow-hidden">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th className="px-4 py-3">基准测试</th>
                  <th className="px-4 py-3">指标</th>
                  <th className="px-4 py-3 text-teal-700 font-bold">Qwen2.5-VL-72B</th>
                  <th className="px-4 py-3">GPT-4o (0513)</th>
                  <th className="px-4 py-3">Claude 3.5 Sonnet</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-white hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">MMMU</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">Multidiscipline</td>
                  <td className="px-4 py-3 font-bold text-green-600">70.2 ✓</td>
                  <td className="px-4 py-3">69.1</td>
                  <td className="px-4 py-3">68.3</td>
                </tr>
                <tr className="bg-teal-50 hover:bg-teal-100">
                  <td className="px-4 py-3 font-medium">MathVista</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">Math Reasoning</td>
                  <td className="px-4 py-3 font-bold text-green-600">74.8 ✓</td>
                  <td className="px-4 py-3">63.8</td>
                  <td className="px-4 py-3">67.7</td>
                </tr>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">DocVQA</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">Document Understanding</td>
                  <td className="px-4 py-3 font-bold text-green-600">96.4 ✓</td>
                  <td className="px-4 py-3">93.1</td>
                  <td className="px-4 py-3">95.2</td>
                </tr>
                <tr className="bg-teal-50 hover:bg-teal-100">
                  <td className="px-4 py-3 font-medium">Video-MME</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">Long Video</td>
                  <td className="px-4 py-3 font-bold text-teal-600">79.1</td>
                  <td className="px-4 py-3">77.2</td>
                  <td className="px-4 py-3">81.3</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 text-center italic mb-6">
            * 数据来源：Qwen2.5-VL 技术报告。Qwen2.5-VL 在文档理解和数学推理方面表现尤为突出。
          </p>

          {/* 模型版本对比 */}
          <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200">模型版本对比</h3>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border border-green-200 text-center">
              <div className="text-3xl font-bold text-green-700 mb-1">3B</div>
              <div className="text-sm text-gray-600 font-medium">Qwen2.5-VL-3B</div>
              <div className="text-xs text-gray-500 mt-2">边缘 AI / 移动设备</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-200 text-center">
              <div className="text-3xl font-bold text-blue-700 mb-1">7B</div>
              <div className="text-sm text-gray-600 font-medium">Qwen2.5-VL-7B</div>
              <div className="text-xs text-gray-500 mt-2">平衡性能与效率</div>
            </div>
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-5 rounded-xl border border-teal-200 text-center">
              <div className="text-3xl font-bold text-teal-700 mb-1">72B</div>
              <div className="text-sm text-gray-600 font-medium">Qwen2.5-VL-72B</div>
              <div className="text-xs text-gray-500 mt-2">旗舰 / 对标 GPT-4o</div>
            </div>
          </div>

          <InfoBox color="blue">
            <strong>小模型也很强：</strong>Qwen2.5-VL-7B 和 Qwen2.5-VL-3B 在同等规模模型中表现优异，即使在资源受限环境下也能提供强大能力。
          </InfoBox>
        </Section>

        {/* 7. 与 Qwen2-VL 对比 */}
        <Section id="comparison" title="与 Qwen2-VL 的关键改进" icon={Sparkles}>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-gray-800">特性</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-800">Qwen2-VL</th>
                  <th className="px-4 py-3 text-left font-bold text-teal-700">Qwen2.5-VL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium">视觉编码器注意力</td>
                  <td className="px-4 py-3">Global Attention</td>
                  <td className="px-4 py-3 text-green-600 font-bold">Window Attention</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-medium">时间位置编码</td>
                  <td className="px-4 py-3">帧索引 MRoPE</td>
                  <td className="px-4 py-3 text-green-600 font-bold">绝对时间 MRoPE (秒)</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium">视频采样</td>
                  <td className="px-4 py-3">固定 FPS</td>
                  <td className="px-4 py-3 text-green-600 font-bold">动态 FPS 采样</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-medium">预训练数据</td>
                  <td className="px-4 py-3">1.2T tokens</td>
                  <td className="px-4 py-3 text-green-600 font-bold">4.1T tokens (↑ 3.4x)</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium">ViT 训练方式</td>
                  <td className="px-4 py-3">适配训练</td>
                  <td className="px-4 py-3 text-green-600 font-bold">从零原生训练</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-medium">视频时长</td>
                  <td className="px-4 py-3">有限</td>
                  <td className="px-4 py-3 text-green-600 font-bold">小时级</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium">事件定位精度</td>
                  <td className="px-4 py-3">帧级</td>
                  <td className="px-4 py-3 text-green-600 font-bold">秒级</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-medium">Agent 能力</td>
                  <td className="px-4 py-3">基础</td>
                  <td className="px-4 py-3 text-green-600 font-bold">增强 (电脑/手机操作)</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium">最小模型</td>
                  <td className="px-4 py-3">2B</td>
                  <td className="px-4 py-3 text-green-600 font-bold">3B</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        {/* 核心技术总结 */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-teal-500 to-cyan-600 p-5 rounded-xl text-white text-center shadow-lg">
            <div className="text-3xl font-bold mb-1">4.1T</div>
            <div className="text-sm opacity-90">预训练 Tokens</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-5 rounded-xl text-white text-center shadow-lg">
            <div className="text-3xl font-bold mb-1">Window</div>
            <div className="text-sm opacity-90">Attention</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-5 rounded-xl text-white text-center shadow-lg">
            <div className="text-3xl font-bold mb-1">秒级</div>
            <div className="text-sm opacity-90">事件定位</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-red-600 p-5 rounded-xl text-white text-center shadow-lg">
            <div className="text-3xl font-bold mb-1">Agent</div>
            <div className="text-sm opacity-90">交互能力</div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="mb-2">Generated based on "Qwen2.5-VL Technical Report"</p>
          <p className="text-sm">arXiv:2502.13923v1 | Alibaba Qwen Team</p>
          <p className="text-xs mt-4 text-gray-500">
            <a href="https://github.com/QwenLM/Qwen2.5-VL" className="hover:text-teal-400 transition-colors">GitHub</a>
            {" · "}
            <a href="https://huggingface.co/Qwen" className="hover:text-teal-400 transition-colors">HuggingFace</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Qwen25VL;

