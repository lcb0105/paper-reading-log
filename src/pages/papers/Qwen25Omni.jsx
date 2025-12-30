import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, CheckCircle, Brain, MessageSquare, Clock, Video, Mic, Volume2, FileText, Layers, ArrowRight, Zap, Timer, SlidersHorizontal, Image, Eye, Split, Shuffle, Radio, Music, Box, GitMerge, Cpu, BarChart3, Award } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

// --- 通用组件 ---
const Section = ({ id, number, title, icon: Icon, children, className = "" }) => (
  <section id={id} className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-8 ${className}`}>
    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
      {number && (
        <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">
          {number}
        </span>
      )}
      {Icon && <Icon className="text-blue-600 mr-3" size={24} />}
      {title}
    </h2>
    {children}
  </section>
);

const MathBlock = ({ children, title }) => (
  <div className="overflow-x-auto py-4 px-6 bg-gray-50 rounded-lg border-l-4 border-blue-500 my-4 shadow-sm">
    {title && <p className="font-bold mb-2 text-sm text-gray-500">{title}</p>}
    <div className="text-center">
      <BlockMath math={children} />
    </div>
  </div>
);

const InfoBox = ({ title, children, color = "blue" }) => {
  const colors = {
    green: "bg-green-50 text-green-800 border-green-500",
    blue: "bg-blue-50 text-blue-800 border-blue-500",
    teal: "bg-teal-50 text-teal-800 border-teal-500",
    purple: "bg-purple-50 text-purple-800 border-purple-500",
    yellow: "bg-yellow-50 text-yellow-800 border-yellow-500",
    orange: "bg-orange-50 text-orange-800 border-orange-500",
    red: "bg-red-50 text-red-800 border-red-500"
  };
  return (
    <div className={`p-4 rounded-lg border-l-4 my-4 ${colors[color]}`}>
      {title && <strong className="block mb-1">{title}</strong>}
      <div className="text-sm">{children}</div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description, color = "blue" }) => {
  const colors = {
    blue: "from-blue-50 to-indigo-50 border-blue-200 text-blue-700",
    green: "from-green-50 to-emerald-50 border-green-200 text-green-700",
    purple: "from-purple-50 to-pink-50 border-purple-200 text-purple-700",
    orange: "from-orange-50 to-yellow-50 border-orange-200 text-orange-700",
    teal: "from-teal-50 to-cyan-50 border-teal-200 text-teal-700"
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

// 流式演示组件
const StreamingDemo = () => {
  const TimeChunk = ({ label, content, isActive, isDashed }) => (
    <div className={`border-2 ${isDashed ? 'border-dashed border-slate-400' : isActive ? 'border-blue-500 bg-blue-100' : 'border-slate-300 bg-slate-100'} 
      px-4 py-3 rounded-lg min-w-[90px] text-center font-mono text-sm`}>
      {label && <span className="block text-xs uppercase opacity-70 mb-1">{label}</span>}
      <span className={isActive ? 'font-bold text-blue-700' : 'text-slate-600'}>{content}</span>
    </div>
  );

  return (
    <div className="bg-slate-800 text-white p-8 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-6 flex items-center">
        <span className="bg-blue-500 w-2 h-8 mr-3 rounded-full"></span>
        案例演示: "Hello, how is the weather?"
      </h3>
      
      <p className="text-slate-300 text-sm mb-6">
        展示 AI <strong>生成语音</strong> 时的流式处理过程：边生成边播放，无需等待完整回答。
      </p>

      {/* Step 1 */}
      <div className="mb-8">
        <div className="text-xs text-blue-300 mb-3 font-mono font-bold">STEP 1: 生成第 1 个时间块 (0-2s)</div>
        <div className="flex items-center gap-2 flex-wrap">
          <TimeChunk content="Past" isDashed />
          <ArrowRight className="text-slate-400" size={20} />
          <TimeChunk label="Current" content='"Hello,"' isActive />
          <ArrowRight className="text-slate-400" size={20} />
          <TimeChunk label="Lookahead" content='"how..."' isDashed />
          <span className="text-slate-500">...</span>
        </div>
        <p className="text-xs text-slate-400 mt-3">
          模型正在生成 "Hello"。它只需"偷看"后面的 "how" 的开头（<strong>Lookahead</strong>），就能确定 "Hello" 的语调，而不需要知道整句话结尾是 "weather"。
        </p>
      </div>

      {/* Step 2 */}
      <div>
        <div className="text-xs text-blue-300 mb-3 font-mono font-bold">STEP 2: 生成第 2 个时间块 (2-4s)</div>
        <div className="flex items-center gap-2 flex-wrap">
          <TimeChunk label="Lookback" content='"Hello,"' />
          <ArrowRight className="text-slate-400" size={20} />
          <TimeChunk label="Current" content='"how is"' isActive />
          <ArrowRight className="text-slate-400" size={20} />
          <TimeChunk label="Lookahead" content='"the..."' isDashed />
        </div>
        <p className="text-xs text-slate-400 mt-3">
          窗口滑动。现在生成 "how is"。模型<strong>回看</strong> "Hello" 保持声音一致性，<strong>前瞻</strong> "the" 保持连贯性。此时用户已经听到了 "Hello"，体验无缝连接。
        </p>
      </div>
    </div>
  );
};

// --- 主组件 ---
const Qwen25Omni = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-blue-100">
      
      {/* 返回按钮 */}
      <div className="fixed top-4 left-4 z-50">
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-lg text-gray-600 hover:text-blue-600 transition-colors border border-gray-200 shadow-sm"
        >
          <ArrowLeft size={16} />
          返回
        </Link>
      </div>

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white py-16 px-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block bg-blue-500/30 text-blue-100 text-xs font-semibold px-3 py-1 rounded-full mb-4 border border-blue-400/50">
            最新发布 2025-03-27 · arXiv:2503.20215v1
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Qwen2.5-Omni 技术报告详解
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl leading-relaxed">
            打破模态壁垒：全模态感知与毫秒级流式语音交互的统一架构
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <span className="bg-blue-900/50 px-3 py-1 rounded-full text-sm border border-blue-400">Thinker-Talker</span>
            <span className="bg-blue-900/50 px-3 py-1 rounded-full text-sm border border-blue-400">TMROPE</span>
            <span className="bg-blue-900/50 px-3 py-1 rounded-full text-sm border border-blue-400">Streaming</span>
            <span className="bg-blue-900/50 px-3 py-1 rounded-full text-sm border border-blue-400">End-to-End</span>
            <span className="bg-blue-900/50 px-3 py-1 rounded-full text-sm border border-blue-400">DPO</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* 1. 摘要与核心理念 */}
        <Section id="abstract" number="01" title="摘要与核心理念">
          <p className="mb-4 text-gray-700 leading-relaxed">
            <strong>Qwen2.5-Omni</strong> 是一个端到端的多模态模型，旨在感知多种模态（文本、图像、音频、视频），并同时以<strong>流式（Streaming）</strong>的方式生成文本和自然的语音响应。
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* 核心挑战 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4 text-red-500 flex items-center">
                <AlertTriangle className="mr-2" size={20} />
                核心挑战
              </h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                <li><strong>模态联合训练：</strong> 如何系统地联合训练文本、图像、视频、音频，实现相互增强？</li>
                <li><strong>音画同步：</strong> 视频中音频和视觉信号的时间对齐问题</li>
                <li><strong>输出干扰：</strong> 文本和语音 Token 训练时如何避免相互干扰？</li>
                <li><strong>延迟瓶颈：</strong> 如何实现极低延迟的实时流式交互？</li>
              </ul>
            </div>

            {/* 解决方案 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4 text-green-600 flex items-center">
                <CheckCircle className="mr-2" size={20} />
                解决方案
              </h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                <li><strong>Block-wise 分块处理：</strong> 解耦长序列多模态数据，感知交给编码器，建模交给 LLM</li>
                <li><strong>TMRoPE：</strong> 时间对齐的多模态旋转位置编码，实现音画同步</li>
                <li><strong>Thinker-Talker：</strong> 解耦推理与语音生成，端到端联合训练</li>
                <li><strong>滑动窗口 DiT：</strong> 限制感受野，最小化首包延迟</li>
              </ul>
            </div>
          </div>

          <InfoBox title="核心设计哲学" color="blue">
            <p className="mb-2">论文的核心思想是<strong>"分工协作"</strong>：</p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>多模态编码器</strong> → 负责感知（Perception）：将原始音频/视频转换为语义表征</li>
              <li><strong>大语言模型 (LLM)</strong> → 负责建模（Modeling）：处理长序列，进行推理</li>
              <li><strong>共享注意力机制</strong> → 负责融合（Fusion）：通过共享 Attention 增强不同模态间的融合</li>
            </ul>
            <p className="mt-2 text-xs text-gray-600 italic">
              这种分工使得模型可以充分利用 LLM 的强大建模能力，同时通过专门的编码器高效处理多模态输入。
            </p>
          </InfoBox>
        </Section>

        {/* 2. 核心架构: Thinker-Talker */}
        <Section id="architecture" number="02" title="核心架构: Thinker-Talker">
          <p className="mb-4 text-gray-700 leading-relaxed">
            这种设计灵感来源于<strong>人类的神经系统</strong>：不同的器官（眼睛、耳朵、嘴巴）产生不同的信号，但通过同一个神经网络（大脑）协调运作。
          </p>

          <h3 className="font-bold text-xl mb-6 text-center text-gray-800">仿生学设计：大脑与嘴巴的协同</h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Thinker */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center mb-4">
                <span className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mr-3">
                  <Brain size={20} />
                </span>
                <h4 className="font-bold text-blue-900 text-lg">Thinker (思考者)</h4>
              </div>
              <p className="text-sm text-gray-700 mb-3"><strong>角色：大脑 - 大语言模型</strong></p>
              <p className="text-sm text-gray-600 mb-3">
                负责理解所有输入（文本、音视频）并进行推理。它生成高层的<strong>隐藏状态表征 (Hidden States)</strong>，这些表征包含了"说什么"以及"怎么说（语气、情感）"的信息。
              </p>
              <div className="bg-white p-3 rounded-lg border border-blue-200 text-xs">
                <strong>技术细节：</strong>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>基于 Transformer 的自回归语言模型</li>
                  <li>接收多模态编码器的输出作为输入</li>
                  <li>通过共享 Attention 融合不同模态</li>
                  <li>生成离散文本 Token + 连续隐藏状态</li>
                </ul>
              </div>
            </div>

            {/* Talker */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
              <div className="flex items-center mb-4">
                <span className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold mr-3">
                  <MessageSquare size={20} />
                </span>
                <h4 className="font-bold text-green-900 text-lg">Talker (表达者)</h4>
              </div>
              <p className="text-sm text-gray-700 mb-3"><strong>角色：嘴巴 - 双轨自回归模型</strong></p>
              <p className="text-sm text-gray-600 mb-3">采用<strong>双重输入 (Dual-track)</strong> 机制：</p>
              <ul className="list-disc list-inside text-sm text-gray-600 mb-3 space-y-1">
                <li><strong>Track A:</strong> Hidden Representations - 来自 Thinker 的高层语义+情感信息</li>
                <li><strong>Track B:</strong> Text Tokens - 来自 Thinker 的离散文本，确保发音准确</li>
              </ul>
              <div className="bg-white p-3 rounded-lg border border-green-200 text-xs">
                <strong>为什么需要 Text Token?</strong><br/>
                仅靠 Hidden State 可能会导致"语义相似但发音不同"的词（如 synonyms）发音混淆。Text Token 就像提词器，强制 Talker 发音准确，消除歧义。
              </div>
            </div>
          </div>

          <InfoBox title="端到端联合训练 (End-to-End Joint Training)" color="purple">
            <p className="mb-2"><strong>关键设计：</strong> Thinker 和 Talker 进行端到端联合训练和推理，而不是独立训练后拼接。</p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>梯度回传：</strong> Talker 的损失可以回传到 Thinker，使两者协同优化</li>
              <li><strong>信息流动：</strong> Thinker 的 Hidden States 直接传递给 Talker，无需额外的对齐模块</li>
              <li><strong>各司其职：</strong> 每个组件专注于生成不同的信号（文本 vs 语音），避免干扰</li>
            </ul>
          </InfoBox>

          <InfoBox title="Thinker-Talker 工作流程" color="blue">
            <div className="flex items-center justify-center gap-2 text-sm flex-wrap">
              <span className="px-3 py-1 bg-blue-200 rounded-lg font-bold">多模态输入</span>
              <ArrowRight size={16} />
              <span className="px-3 py-1 bg-blue-300 rounded-lg font-bold">Thinker 理解推理</span>
              <ArrowRight size={16} />
              <span className="px-3 py-1 bg-green-200 rounded-lg font-bold">Hidden States + Text Tokens</span>
              <ArrowRight size={16} />
              <span className="px-3 py-1 bg-green-300 rounded-lg font-bold">Talker 生成 Audio Tokens</span>
              <ArrowRight size={16} />
              <span className="px-3 py-1 bg-purple-200 rounded-lg font-bold">DiT 转波形</span>
            </div>
          </InfoBox>

          {/* Talker 详细流程 */}
          <div className="mt-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h4 className="font-bold text-lg mb-4 flex items-center text-gray-800">
              <Music className="mr-2 text-green-600" size={20} />
              Talker 语音生成流程
            </h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2 font-bold">1</div>
                <p className="font-bold text-sm mb-1">双轨自回归</p>
                <p className="text-xs text-gray-500">结合 Hidden States 和 Text Tokens 生成 Speech Tokens</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2 font-bold">2</div>
                <p className="font-bold text-sm mb-1">DiT 解码</p>
                <p className="text-xs text-gray-500">Diffusion Transformer 将 Speech Tokens 转换为波形</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2 font-bold">3</div>
                <p className="font-bold text-sm mb-1">流式输出</p>
                <p className="text-xs text-gray-500">滑动窗口限制感受野，边生成边播放</p>
              </div>
            </div>
          </div>
        </Section>

        {/* 3. TMROPE */}
        <Section id="tmrope" number="03" title="关键创新: TMRoPE (Time-aligned Multimodal RoPE)">
          <p className="mb-4 text-gray-700 leading-relaxed">
            在处理视频时，必须解决<strong>"我在画面第几秒看到了什么，同时也听到了什么"</strong>的对齐问题。TMRoPE 将绝对时间嵌入到了位置编码中，实现音画精确同步。
          </p>

          <MathBlock title="TMRoPE 将特征向量 x 的维度分解为三个正交的子空间：">
            {`\\text{TMRoPE}(\\mathbf{x}, t, h, w) = \\text{concat}(
            \\underbrace{\\mathbf{x}_t \\cdot R_{\\Theta, t}}_{\\text{时间流}}, \\quad
            \\underbrace{\\mathbf{x}_h \\cdot R_{\\Theta, h}}_{\\text{空间高度}}, \\quad
            \\underbrace{\\mathbf{x}_w \\cdot R_{\\Theta, w}}_{\\text{空间宽度}}
            )`}
          </MathBlock>

          <InfoBox title="TMRoPE 时间对齐原理" color="purple">
            <p className="mb-2">
              其中 <InlineMath math="t" /> 代表<strong>绝对时间</strong>（1 unit = 40ms = 0.04秒）。
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>对于视频，每一帧的时间 ID <InlineMath math="t" /> 随播放进度增加</li>
              <li><InlineMath math="h, w" /> 负责描述画面内的物体位置（空间维度）</li>
              <li>这样模型可以精确知道"第 2.5 秒时画面中有什么，同时听到什么声音"</li>
            </ul>
          </InfoBox>

          {/* 交错结构 */}
          <div className="bg-orange-50 p-6 rounded-xl border border-orange-200 mb-6">
            <h4 className="font-bold text-lg mb-4 flex items-center text-orange-800">
              <Shuffle className="mr-2" size={20} />
              交错结构 (Interleaved Structure) - 视频序列的组织方式
            </h4>
            <p className="text-sm text-gray-700 mb-4">
              为了同步视频和音频的时间戳，论文将<strong>音频帧和视频帧以交错 (interleaved) 方式按时间顺序组织</strong>：
            </p>
            
            {/* 可视化交错结构 */}
            <div className="bg-white p-4 rounded-lg border border-orange-200 mb-4">
              <p className="text-xs text-gray-500 mb-3 text-center">视频序列的时间排列示意</p>
              <div className="flex items-center justify-center gap-1 flex-wrap font-mono text-xs">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">V₀</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">A₀</span>
                <span className="text-gray-400">→</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">V₁</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">A₁</span>
                <span className="text-gray-400">→</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">V₂</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">A₂</span>
                <span className="text-gray-400">→</span>
                <span className="text-gray-400">...</span>
              </div>
              <div className="flex justify-center gap-4 mt-3 text-xs">
                <span className="flex items-center"><span className="w-3 h-3 bg-blue-100 rounded mr-1"></span>视频帧 (V)</span>
                <span className="flex items-center"><span className="w-3 h-3 bg-purple-100 rounded mr-1"></span>音频帧 (A)</span>
              </div>
            </div>

            <ul className="text-sm text-gray-700 space-y-2">
              <li><strong>时间同步：</strong> 同一时刻的音频和视频帧相邻排列，共享相同的时间位置编码 <InlineMath math="t" /></li>
              <li><strong>统一处理：</strong> 音频和视频通过同一个 LLM 的 Attention 机制进行融合</li>
              <li><strong>时序建模：</strong> 时间维度 <InlineMath math="t" /> 保证了模型理解"先后顺序"和"同时发生"的概念</li>
            </ul>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <FeatureCard 
              icon={Timer} 
              title="时间维度 t" 
              description="绝对时间戳，40ms 为一个单位，音频和视频共享相同的时间编码"
              color="purple"
            />
            <FeatureCard 
              icon={Layers} 
              title="高度维度 h" 
              description="空间位置编码，仅用于视觉模态，描述物体垂直位置"
              color="blue"
            />
            <FeatureCard 
              icon={SlidersHorizontal} 
              title="宽度维度 w" 
              description="空间位置编码，仅用于视觉模态，描述物体水平位置"
              color="teal"
            />
          </div>

          <InfoBox title="为什么 40ms？" color="yellow">
            <p>
              40ms 对应<strong>25 FPS (帧/秒)</strong>的视频帧率，是标准视频格式的常用帧率。选择 40ms 作为时间基本单位，使得：
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>每个视频帧自然对应一个时间单位</li>
              <li>音频可以按相同的时间分辨率切分</li>
              <li>时间精度足够支持精确的音画同步</li>
            </ul>
          </InfoBox>
        </Section>

        {/* 4. 多模态编码器架构 */}
        <Section id="encoders" number="04" title="多模态编码器: Block-wise 流式处理">
          <p className="mb-4 text-gray-700 leading-relaxed">
            为了支持<strong>流式多模态输入</strong>，音频和视觉编码器都采用了<strong>分块处理 (Block-wise Processing)</strong>方法。这种策略有效地解耦了长序列多模态数据的处理。
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* 音频编码器 */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <span className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center mr-3">
                  <Mic size={20} />
                </span>
                <h4 className="font-bold text-purple-900 text-lg">音频编码器</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-2">
                <li><strong>分块大小：</strong> 2 秒音频 = 1 Block</li>
                <li><strong>处理方式：</strong> 每接收 2 秒音频立即编码，无需等待完整输入</li>
                <li><strong>输出：</strong> 音频特征序列，带有时间位置编码</li>
              </ul>
              <div className="mt-4 bg-purple-50 p-3 rounded-lg text-xs">
                <strong>流式优势：</strong> 用户正在说话时，模型已经在处理前面的内容
              </div>
            </div>

            {/* 视觉编码器 */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <span className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center mr-3">
                  <Eye size={20} />
                </span>
                <h4 className="font-bold text-blue-900 text-lg">视觉编码器</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-2">
                <li><strong>分块方式：</strong> 按时间切分视频帧序列</li>
                <li><strong>处理方式：</strong> 每个 Block 独立编码，然后传递给 LLM</li>
                <li><strong>输出：</strong> 视觉特征序列，带有空间 + 时间位置编码</li>
              </ul>
              <div className="mt-4 bg-blue-50 p-3 rounded-lg text-xs">
                <strong>流式优势：</strong> 视频播放时实时处理，无需缓存整个视频
              </div>
            </div>
          </div>

          <InfoBox title="分工协作的关键洞察" color="teal">
            <p className="mb-2">论文的核心设计思想是<strong>"感知与建模分离"</strong>：</p>
            <div className="grid md:grid-cols-2 gap-4 mt-3">
              <div className="bg-white p-3 rounded-lg border border-teal-200">
                <p className="font-bold text-sm text-teal-700 mb-1">多模态编码器的职责</p>
                <p className="text-xs text-gray-600">将原始信号（音频波形、像素）转换为语义特征表示，处理<strong>感知 (Perception)</strong> 任务</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-teal-200">
                <p className="font-bold text-sm text-teal-700 mb-1">大语言模型 (LLM) 的职责</p>
                <p className="text-xs text-gray-600">处理长序列特征，进行<strong>推理 (Reasoning)</strong> 和<strong>生成 (Generation)</strong></p>
              </div>
            </div>
            <p className="mt-3 text-xs text-gray-600 italic">
              这种分工通过<strong>共享注意力机制 (Shared Attention)</strong>增强不同模态间的融合，使模型能够理解"看到的"和"听到的"之间的关系。
            </p>
          </InfoBox>
        </Section>

        {/* 5. 流式设计 */}
        <Section id="streaming" number="05" title="深度解析: 流式设计 (Streaming)" className="border-2 border-blue-200">
          <p className="mb-6 text-gray-700 text-lg leading-relaxed">
            流式交互的核心目标是<strong>降低首包延迟 (Initial Package Delay)</strong>，即让用户感觉"刚说完话，AI 马上就开口回答"，而不是等待 AI 思考完整个段落。Qwen2.5-Omni 在输入和输出两端都使用了"分块 (Block-wise)"策略。
          </p>

          {/* 核心机制 */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* 输入端 */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-bl-lg font-bold">输入端</div>
              <h4 className="font-bold text-lg mb-4 flex items-center">
                <Mic className="mr-2 text-blue-600" size={20} />
                分块预填充 (Chunked-prefills)
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                <strong className="text-red-500">问题：</strong> 传统模型需要等用户说完一整句话（比如10秒）才开始处理，延迟极高。<br/>
                <strong className="text-green-600">解法：</strong> 将输入按时间切片（例如每 2 秒一个 Block）。
              </p>
              <ul className="text-sm text-gray-600 list-disc list-inside bg-gray-50 p-3 rounded-lg space-y-1">
                <li><strong>音频编码器：</strong> 每接收 2秒 音频就立即编码，存入记忆</li>
                <li><strong>视觉编码器：</strong> 同样按时间块处理视频流</li>
              </ul>
            </div>

            {/* 输出端 */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-green-100 text-green-600 text-xs px-3 py-1 rounded-bl-lg font-bold">输出端</div>
              <h4 className="font-bold text-lg mb-4 flex items-center">
                <Volume2 className="mr-2 text-green-600" size={20} />
                滑动窗口 DiT (Sliding Window)
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                <strong className="text-red-500">问题：</strong> 生成语音通常需要全局上下文，导致无法边生成边播放。<br/>
                <strong className="text-green-600">解法：</strong> 限制模型的"视野"（Receptive Field）。
              </p>
              <ul className="text-sm text-gray-600 list-disc list-inside bg-gray-50 p-3 rounded-lg space-y-1">
                <li><strong>Lookback (回看)：</strong> 只看过去 2 个 Block 的信息</li>
                <li><strong>Lookahead (前瞻)：</strong> 只预读未来 1 个 Block 的信息</li>
                <li><strong>结果：</strong> 只要生成了少量 Token，就可以立即转码为波形播放</li>
              </ul>
            </div>
          </div>

          {/* 案例演示 */}
          <StreamingDemo />

          <InfoBox title="延迟优化总结" color="green">
            <ul className="list-disc list-inside space-y-1">
              <li><strong>输入端分块：</strong> 不等用户说完就开始处理，节省等待时间</li>
              <li><strong>输出端滑动窗口：</strong> 不等全部生成完就开始播放，实现"边说边听"</li>
              <li><strong>最终效果：</strong> 用户说完话后几乎立即听到 AI 回答，延迟降至毫秒级</li>
            </ul>
          </InfoBox>
        </Section>

        {/* 6. 训练流程与 DPO */}
        <Section id="training" number="06" title="训练流程与 DPO">
          <p className="mb-4 text-gray-700 leading-relaxed">
            为了让 Talker 能够生成高质量语音，引入了 <strong>DPO (Direct Preference Optimization)</strong> 算法。这是一种不依赖奖励模型的强化学习方法。
          </p>

          <MathBlock title="DPO 损失函数">
            {`\\mathcal{L}_{DPO} = -\\mathbb{E}_{(x,y_{w},y_{l})\\sim\\mathcal{D}} \\left[ 
            \\log \\sigma \\left( 
            \\beta \\log \\frac{\\mathcal{P}_{\\theta}(y_{w}|x)}{\\mathcal{P}_{ref}(y_{w}|x)} - 
            \\beta \\log \\frac{\\mathcal{P}_{\\theta}(y_{l}|x)}{\\mathcal{P}_{ref}(y_{l}|x)} 
            \\right) 
            \\right]`}
          </MathBlock>

          <InfoBox title="人话解释" color="blue">
            <p className="mb-2">
              我们给模型一对样本：<InlineMath math="y_w" />（好听、准确的语音）和 <InlineMath math="y_l" />（含糊、错误的语音）。
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>DPO 强迫模型<strong>提高</strong>生成 <InlineMath math="y_w" /> 的概率</li>
              <li>同时<strong>压低</strong> <InlineMath math="y_l" /> 的概率</li>
              <li>相比传统的 RLHF，这更稳定且计算效率更高（无需训练奖励模型）</li>
            </ul>
          </InfoBox>

          <div className="grid md:grid-cols-3 gap-4">
            <FeatureCard 
              icon={CheckCircle} 
              title="无需奖励模型" 
              description="直接从偏好数据优化，跳过 RM 训练步骤"
              color="green"
            />
            <FeatureCard 
              icon={Zap} 
              title="训练更稳定" 
              description="避免 PPO 中的奖励 hacking 问题"
              color="orange"
            />
            <FeatureCard 
              icon={Clock} 
              title="计算效率高" 
              description="只需对数概率计算，无需采样和价值估计"
              color="blue"
            />
          </div>
        </Section>

        {/* 7. 实验评估 */}
        <Section id="evaluation" number="07" title="实验评估与 SOTA 对比">
          <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-4 px-6 text-left font-bold text-gray-700 border-b">维度</th>
                  <th className="py-4 px-6 text-left font-bold text-gray-700 border-b">关键结论</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-blue-600 flex items-center">
                    <FileText className="mr-2" size={16} />
                    纯文本 (Text)
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    优于 Qwen2-7B，在 MMLU-Pro, GSM8K 等硬核基准上表现强劲
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-purple-600 flex items-center">
                    <Mic className="mr-2" size={16} />
                    音频理解 (Audio)
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    ASR 和音频推理 (MMAU) 均达到 <strong>SOTA</strong>，显著优于 Qwen2-Audio
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-green-600 flex items-center">
                    <Volume2 className="mr-2" size={16} />
                    语音生成 (Speech)
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    字错误率 (WER) 极低。在 seed-tts-eval 上击败了专门的 TTS 模型如 MaskGCT
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-orange-600 flex items-center">
                    <Video className="mr-2" size={16} />
                    视频理解
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    支持音画同步理解，TMROPE 实现精确时间对齐
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <InfoBox title="综合评价" color="teal">
            <p>
              Qwen2.5-Omni 是首个真正意义上的<strong>端到端全模态模型</strong>：统一感知（文本+图像+音频+视频）与生成（文本+语音），且实现了<strong>实时流式交互</strong>。Thinker-Talker 架构解耦了"思考"和"表达"，既保证了推理质量，又实现了毫秒级响应。
            </p>
          </InfoBox>
        </Section>

      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-200 py-10 text-center text-gray-400 text-sm bg-white">
        <p>© 2025 Generated based on Qwen2.5-Omni Technical Report (arXiv:2503.20215v1)</p>
      </footer>
    </div>
  );
};

export default Qwen25Omni;

