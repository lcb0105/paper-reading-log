import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  Layers, 
  Database, 
  Activity,
  Rocket,
  Target,
  Cpu,
  Brain,
  Image,
  Volume2,
  Video,
  Sparkles,
  Lightbulb,
  Beaker,
  GraduationCap,
  Smartphone,
  Bot,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const MMLLMsPaper = () => {
  const [activeSection, setActiveSection] = useState('intro');

  const navItems = [
    { id: 'intro', label: '1. 引言', icon: BookOpen },
    { id: 'architecture', label: '2. 模型架构', icon: Layers },
    { id: 'formulas', label: '3. 核心公式', icon: Activity },
    { id: 'generator', label: '↳ 生成器深度解析', icon: Beaker },
    { id: 'pipeline', label: '4. 训练流程', icon: Database },
    { id: 'sota', label: '5. 最新模型', icon: Rocket },
    { id: 'benchmarks', label: '6. 性能评估', icon: Target },
    { id: 'future', label: '7. 未来方向', icon: Lightbulb },
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

  const FormulaBox = ({ title, formula, items }) => (
    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 my-6">
      <h3 className="text-xl font-bold text-slate-800 mb-4">{title}</h3>
      <div className="my-4 text-center overflow-x-auto">
        <BlockMath math={formula} />
      </div>
      <ul className="space-y-2 mt-4">
        {items.map((item, idx) => (
          <li key={idx} className="flex gap-2 text-slate-700">
            <span className="text-blue-500">•</span>
            <span dangerouslySetInnerHTML={{ __html: item }} />
          </li>
        ))}
      </ul>
    </div>
  );

  const ComponentCard = ({ title, description, examples, color = 'indigo' }) => {
    const colorClasses = {
      indigo: 'text-indigo-600',
      blue: 'text-blue-600',
      green: 'text-green-600',
      purple: 'text-purple-600',
    };
    return (
      <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
        <h3 className={`text-lg font-bold ${colorClasses[color]} mb-2`}>{title}</h3>
        <p className="text-sm text-slate-600 mb-3">{description}</p>
        {examples && (
          <p className="text-xs text-slate-500">
            <strong>常见选择：</strong>{examples}
          </p>
        )}
      </div>
    );
  };

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
              <h1 className="text-xl font-bold">📄 MM-LLMs 论文解析</h1>
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
                  {item.label.replace(/^\d+\.\s*/, '').replace(/^↳\s*/, '')}
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
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-6 text-left">
            <p className="text-sm text-blue-800">
              <strong>论文标题：</strong> MM-LLMs: Recent Advances in MultiModal Large Language Models<br />
              <strong>核心内容：</strong> 综述了多模态大语言模型（MM-LLMs）的最新进展，分析了126个模型，总结了架构设计、训练配方及未来趋势。
            </p>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            MM-LLMs: 多模态大语言模型最新进展深度解析
          </h1>
          <div className="flex justify-center flex-wrap gap-2 mt-6">
            <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">MM-LLMs</span>
            <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">126 Models</span>
            <span className="bg-purple-100 text-purple-800 text-sm font-semibold px-3 py-1 rounded-full">Any-to-Any</span>
            <span className="bg-amber-100 text-amber-800 text-sm font-semibold px-3 py-1 rounded-full">LDM</span>
          </div>
        </header>

        {/* Section 1: Introduction */}
        <Section id="intro" title="1. 引言 (Introduction)" icon={BookOpen}>
          <p>
            过去一年中，多模态大语言模型（MM-LLMs）取得了实质性进展。其核心思想是利用现成的高性能大语言模型（LLMs）作为<strong>认知中枢</strong>，通过低成本的训练策略，使其支持多模态（MM）输入或输出。这种方法不仅保留了LLM固有的推理和决策能力，还赋能了多样化的多模态任务。
          </p>
          <p>
            MM-LLMs 的发展经历了从<strong>多模态理解</strong>（如 BLIP-2, LLaVA）到<strong>特定模态输出</strong>（如 GILL, AudioPaLM），再到现在的<strong>任意模态到任意模态</strong>（Any-to-Any，如 NEXT-GPT, Gemini）的演变。
          </p>

          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">👁️</div>
              <h4 className="font-bold text-blue-800">多模态理解</h4>
              <p className="text-sm text-slate-600 mt-1">BLIP-2, LLaVA, MiniGPT-4</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">🎨</div>
              <h4 className="font-bold text-purple-800">特定模态输出</h4>
              <p className="text-sm text-slate-600 mt-1">GILL, AudioPaLM</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">🔄</div>
              <h4 className="font-bold text-green-800">Any-to-Any</h4>
              <p className="text-sm text-slate-600 mt-1">NEXT-GPT, Gemini</p>
            </div>
          </div>
        </Section>

        {/* Section 2: Architecture */}
        <Section id="architecture" title="2. 模型架构 (Model Architecture)" icon={Layers}>
          <p>
            论文提出了一种通用的模型架构框架，将其解构为<strong>五个核心组件</strong>。这种模块化设计使得研究者可以针对不同模态灵活选择组件。
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <ComponentCard
              title="1. 模态编码器 (Modality Encoder)"
              description={<>负责将不同的模态输入（图像 <InlineMath math="I_X" />、视频、音频等）编码为相应的特征 <InlineMath math="F_X" />。</>}
              examples="ViT, CLIP ViT, ImageBind, Audio-Former"
            />
            <ComponentCard
              title="2. 输入投影器 (Input Projector)"
              description={<>将编码后的特征 <InlineMath math="F_X" /> 对齐到文本特征空间 <InlineMath math="T" />，生成 Prompt <InlineMath math="P_X" />。这是"多模态理解"的关键。</>}
              examples="Linear Projector, MLP, Q-Former"
            />
            <ComponentCard
              title="3. LLM 骨干 (LLM Backbone)"
              description={<>核心大脑。处理各种模态的表征，进行语义理解和推理。输出文本 <InlineMath math="t" /> 或其他模态的信号 Token <InlineMath math="S_X" />。</>}
              examples="LLaMA, Vicuna, Flan-T5, Qwen"
            />
            <ComponentCard
              title="4. 输出投影器 (Output Projector)"
              description={<>将 LLM 输出的信号 Token <InlineMath math="S_X" /> 映射为模态生成器可理解的特征 <InlineMath math="H_X" />。</>}
              examples="Tiny Transformer, MLP"
            />
          </div>

          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 mt-6">
            <h3 className="text-lg font-bold text-indigo-700 mb-2">5. 模态生成器 (Modality Generator)</h3>
            <p className="text-sm text-slate-600">
              负责生成最终的多模态内容（如画图、生成音频）。通常使用现成的潜在扩散模型（LDM）。
              <br /><strong>常见选择：</strong>Stable Diffusion, AudioLDM, Zeroscope
            </p>
          </div>
        </Section>

        {/* Section 3: Formulas */}
        <Section id="formulas" title="3. 核心公式详细解释 (Key Formulas)" icon={Activity}>
          <p>
            论文通过数学公式形式化定义了 MM-LLMs 的工作流程。以下是对文中五个核心公式的逐一解析。
          </p>

          <FormulaBox
            title="公式 1：模态编码 (Modality Encoding)"
            formula="F_X = \text{ME}_X(I_X)"
            items={[
              '<strong>含义：</strong>这是数据进入模型的第一步。',
              '<strong>I<sub>X</sub></strong>：表示模态 X 的原始输入（例如一张图片、一段音频波形）。',
              '<strong>ME<sub>X</sub></strong>：表示特定模态的编码器（Modality Encoder）。通常使用预训练好的模型，如 CLIP 的 ViT。',
              '<strong>F<sub>X</sub></strong>：输出的模态特征向量。此时 F<sub>X</sub> 还在该模态自己的特征空间中，LLM 还无法直接"看懂"。'
            ]}
          />

          <FormulaBox
            title="公式 2：多模态理解优化 (Optimization for Understanding)"
            formula="\arg \min_{\Theta_{X \to T}} \mathcal{L}_{\text{txt-gen}} (\text{LLM}(P_X, F_T), t)"
            items={[
              '<strong>含义：</strong>这个公式描述了<strong>训练输入投影器</strong>的过程。让 LLM 能够理解视觉/音频特征。',
              '<strong>P<sub>X</sub></strong>：这是最关键的变量，代表<strong>Prompt（提示）</strong>。通过投影器 Θ<sub>X→T</sub>，将模态特征 F<sub>X</sub> 转换为了 LLM 可以理解的软提示（Soft Prompt）。',
              '<strong>F<sub>T</sub></strong>：文本特征（Text Features），即用户输入的文本指令。',
              '<strong>t</strong>：Ground Truth，即期望 LLM 输出的正确文本回应。',
              '<strong>L<sub>txt-gen</sub></strong>：标准的文本生成损失函数（通常是 Cross-Entropy Loss）。',
              '<strong>解释：</strong>我们固定住 LLM 和 Encoder 不动，只调整投影器 Θ<sub>X→T</sub> 的参数，使得 LLM 看到图片转换来的 P<sub>X</sub> 和用户的问题 F<sub>T</sub> 后，能说出正确答案 t。'
            ]}
          />

          <FormulaBox
            title="公式 3：LLM 前向推理 (LLM Inference)"
            formula="t, S_X = \text{LLM}(P_X, F_T)"
            items={[
              '<strong>含义：</strong>描述 LLM 接收到多模态输入后的输出行为。',
              '<strong>P<sub>X</sub>, F<sub>T</sub></strong>：分别是模态提示（如图片内容）和文本提示（如"请生成一张图"）。',
              '<strong>t</strong>：LLM 生成的直接文本回复。',
              '<strong>S<sub>X</sub></strong>：LLM 生成的<strong>信号 Token (Signal Tokens)</strong>。这是关键创新点。如果用户要求生成图片，LLM 不会直接生成像素，而是生成一组特殊的 Token S<sub>X</sub>，告诉后面的模块"我要画图了，内容是..."'
            ]}
          />

          <FormulaBox
            title="公式 4：多模态生成对齐 (Alignment for Generation)"
            formula="\arg \min_{\Theta_{T \to X}} \mathcal{L}_{\text{mse}} (H_X, \tau_X(t))"
            items={[
              '<strong>含义：</strong>训练输出投影器，让 LLM 的"语言"翻译成生成模型（如 Stable Diffusion）的"语言"。',
              '<strong>S<sub>X</sub></strong>：LLM 输出的信号 Token。',
              '<strong>H<sub>X</sub></strong>：映射后的特征，将作为条件输入给生成模型。',
              '<strong>τ<sub>X</sub>(t)</strong>：这是生成模型自带的文本编码器（如 CLIP Text Encoder）对描述文本 t 的编码结果。',
              '<strong>L<sub>mse</sub></strong>：均方误差损失（Mean Squared Error）。',
              '<strong>解释：</strong>我们希望 LLM 输出的 S<sub>X</sub> 经过投影后得到的 H<sub>X</sub>，尽可能接近生成模型原本能够理解的文本特征 τ<sub>X</sub>(t)。这样就实现了从 LLM 空间到生成模型空间的对齐。'
            ]}
          />

          <FormulaBox
            title="公式 5：多模态生成损失 (Generation Loss)"
            formula="\mathcal{L}_{X\text{-gen}} := \mathbb{E}_{\epsilon \sim \mathcal{N}(0,1), t} \left\| \epsilon - \epsilon_\theta(z_t, t, H_X) \right\|_2^2"
            items={[
              '<strong>含义：</strong>这是标准的潜在扩散模型（LDM）训练损失，用于训练生成能力。',
              '<strong>ε</strong>：添加的高斯噪声。',
              '<strong>ε<sub>θ</sub></strong>：去噪网络（如 U-Net），负责预测噪声。',
              '<strong>z<sub>t</sub></strong>：时刻 t 的加噪潜变量。',
              '<strong>H<sub>X</sub></strong>：这是关键条件。来自公式 4 中 LLM 输出并经过投影的特征。',
              '<strong>解释：</strong>这个公式表明，最终的图像/视频生成是受到 LLM 的输出 H<sub>X</sub> 控制的。通过最小化预测噪声和实际噪声的差异，模型学会了根据 LLM 的指令生成高质量的多模态内容。'
            ]}
          />
        </Section>

        {/* Section: Generator Deep Dive */}
        <Section id="generator" title="深度解析：模态生成器的工作原理" icon={Beaker}>
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-6">
            <p className="text-indigo-800 font-medium">
              这部分内容描述的是 <strong>模态生成器（Modality Generator）</strong> 如何利用 <strong>潜在扩散模型（LDMs）</strong> 将 LLM 的"想法"转化成具体的图像或视频。这是 MM-LLM 实现"不仅能看，还能画"的关键技术细节。
            </p>
          </div>

          <div className="space-y-6">
            {/* Part 1 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="text-xl font-bold text-indigo-700 mb-4">1. 为什么会有 z₀ 和 zₜ？（潜在空间的概念）</h3>
              <p className="text-slate-700">
                在处理图像生成时，直接对像素（Pixel）进行操作是非常昂贵的（一张 512×512 的图片有 26 万个像素点）。因此，论文中使用了 <strong>VAE（变分自编码器）</strong>。
              </p>
              <ul className="space-y-3 mt-4">
                <li className="flex gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <div>
                    <strong>压缩 (z₀)：</strong>在训练开始前，真实的图像（Ground Truth）首先被送入一个预训练好的 VAE 编码器。VAE 把巨大的像素图片压缩成一个更小、更稠密的向量，这个向量就是<strong>潜在特征 (Latent Feature) z₀</strong>。
                    <p className="text-sm text-slate-500 mt-1 ml-4">通俗理解：z₀ 是图片的"压缩饼干"，保留了图片的核心信息，但体积小得多，方便计算。</p>
                  </div>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <div>
                    <strong>加噪 (zₜ)：</strong>扩散模型的核心逻辑是"学习如何把噪音变回图片"。训练时，我们向 z₀ 中添加随机的高斯噪声 ε。随着时间步 t 的增加，噪音越来越多，最终 z₀ 变成了一个完全杂乱无章的噪音向量 <strong>zₜ</strong>。
                  </div>
                </li>
              </ul>
            </div>

            {/* Part 2 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="text-xl font-bold text-indigo-700 mb-4">2. 去噪与条件输入：LLM 如何指挥生成器？</h3>
              <p className="text-slate-700 mb-4">
                这是整个架构中最精妙的地方：LLM 的意志是如何介入画图过程的？
              </p>
              <ul className="space-y-3">
                <li className="flex gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <div>
                    <strong>去噪网络 (UNet)：</strong>我们使用一个预训练好的 UNet (ε<sub>X</sub>)。它的任务是看一眼充满噪音的 zₜ，然后预测出"刚才加进去的噪音长什么样"。如果能预测出噪音，把噪音减掉，就能还原出图片。
                  </div>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <div>
                    <strong>条件输入 (H<sub>X</sub>) —— 关键的指挥棒：</strong>UNet 在去噪时不是瞎猜，它需要提示。在 MM-LLM 中，Output Projector 输出的特征向量 H<sub>X</sub> 扮演了提示词（Condition）的角色。
                    <p className="text-sm text-slate-500 mt-1 ml-4">通俗理解：UNet 正面对着一团乱码（zₜ）发愁，这时候 LLM 通过 H<sub>X</sub> 告诉它："这里面原本藏着一只猫"。有了这个提示，UNet 就能更有方向性地把掩盖"猫"的噪音找出来。</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Part 3 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="text-xl font-bold text-indigo-700 mb-4">3. 损失函数详解与梯度回传</h3>
              <div className="bg-slate-50 p-4 rounded-lg my-4 overflow-x-auto">
                <BlockMath math="\mathcal{L}_{X\text{-gen}} := \mathbb{E}_{\epsilon\sim\mathcal{N}(0,1),t} \left\| \epsilon - \epsilon_X(z_t, t, H_X) \right\|^2_2" />
              </div>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <span className="text-blue-500">•</span>
                  <span><strong>ε (真值)：</strong>这是我们实际上添加到图片里的真实噪声。</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-500">•</span>
                  <span><strong>ε<sub>X</sub>(zₜ, t, H<sub>X</sub>) (预测值)：</strong>这是 UNet 根据当前噪音图 zₜ、时间步 t 以及 LLM 的指令 H<sub>X</sub>，预测出来的估计噪声。</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-500">•</span>
                  <span><strong>||...||²₂ (MSE Loss)：</strong>均方误差。意思是："真实噪声"和"预测噪声"之间的差距要越小越好。</span>
                </li>
              </ul>

              <h4 className="mt-6 font-bold text-slate-800">梯度回传的奥秘：</h4>
              <p className="text-slate-700 mt-2">
                论文中提到，这个损失函数不仅优化生成器，更重要的是优化 <strong>Input Projector (Θ<sub>X→T</sub>)</strong> 和 <strong>Output Projector (Θ<sub>T→X</sub>)</strong>。
              </p>
              <div className="bg-slate-50 p-4 rounded-lg mt-3 text-sm text-slate-600">
                <strong>逻辑链条：</strong> 生成图片质量差 → 责怪 UNet → UNet 抱怨条件 H<sub>X</sub> 不清晰 → 梯度回传给 Output Projector ("翻译准一点！") → 穿过 LLM → 甚至回传给 Input Projector ("你最开始给 LLM 看的图就不对！")。
                <br />本质上，这是一个强有力的<strong>监督信号</strong>，强迫整个系统学会更精准地传递多模态信息。
              </div>
            </div>

            {/* Part 4 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="text-xl font-bold text-indigo-700 mb-4">4. "训练" vs "生成"：拆积木与捏泥巴</h3>
              <p className="text-slate-700 mb-4">
                您刚才描述的"把原始图片加噪，然后再去噪还原"主要是<strong>训练阶段</strong>发生的事情。真正的<strong>生成阶段</strong>逻辑虽然相通，但有一点关键区别。
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-rose-50 p-5 rounded-xl border border-rose-200">
                  <h4 className="text-rose-700 font-bold mb-3">训练阶段 (Training)</h4>
                  <p className="text-sm text-slate-700 font-medium mb-2">像"拆积木后再拼回去"</p>
                  <ul className="space-y-1 text-sm text-slate-600">
                    <li>• 拿一张真的"猫"图 (z₀)。</li>
                    <li>• 加噪破坏成乱码 (zₜ)。</li>
                    <li>• 要求模型把它还原回原来的"猫"。</li>
                    <li className="font-medium text-rose-700">目的：练出"从混乱中寻找秩序"的能力。</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-5 rounded-xl border border-green-200">
                  <h4 className="text-green-700 font-bold mb-3">生成阶段 (Inference)</h4>
                  <p className="text-sm text-slate-700 font-medium mb-2">像"凭空捏泥巴"</p>
                  <ul className="space-y-1 text-sm text-slate-600">
                    <li>• <strong>不再使用原图。</strong></li>
                    <li>• 凭空生成一团<strong>纯随机噪音</strong>。</li>
                    <li>• LLM 发出指令 H<sub>X</sub> ("这里有只猫")。</li>
                    <li className="font-medium text-green-700">模型利用练好的能力，把随机噪音"雕刻"成一只全新的猫。</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Section 4: Training Pipeline */}
        <Section id="pipeline" title="4. 训练流程 (Training Pipeline)" icon={Database}>
          <div className="space-y-8">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-xl">
              <h3 className="flex items-center text-lg font-bold text-blue-700 mb-2">
                <span className="bg-blue-100 text-blue-800 py-1 px-2 rounded mr-2 text-sm">阶段 1</span>
                多模态预训练 (MM PT)
              </h3>
              <p className="text-slate-700">
                <strong>目标：</strong>实现模态间的对齐。
              </p>
              <p className="text-slate-600 mt-2">
                通常利用 X-Text 数据集（如图像-文本对），训练 Input Projector 和 Output Projector。在这个阶段，LLM 骨干通常是冻结的，仅优化投影器参数，使不同模态的分布靠拢。
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-xl">
              <h3 className="flex items-center text-lg font-bold text-green-700 mb-2">
                <span className="bg-green-100 text-green-800 py-1 px-2 rounded mr-2 text-sm">阶段 2</span>
                多模态指令微调 (MM IT)
              </h3>
              <p className="text-slate-700">
                <strong>目标：</strong>赋予模型遵循指令的能力，增强交互性。
              </p>
              <p className="text-slate-600 mt-2">
                使用 SFT（监督微调）和 RLHF（人类反馈强化学习）。数据格式通常转化为指令形式，例如：
              </p>
              <code className="bg-slate-100 text-rose-600 px-2 py-1 rounded text-sm mt-2 inline-block">
                &lt;Image&gt; 请描述这张图片的内容。
              </code>
              <p className="text-slate-600 mt-2">
                这一阶段使得 MM-LLMs 能够泛化到未见过的任务（Zero-shot）。
              </p>
            </div>
          </div>
        </Section>

        {/* Section 5: SOTA Models */}
        <Section id="sota" title="5. 最新模型 (SOTA MM-LLMs)" icon={Rocket}>
          <p className="mb-6">论文将 126 个 SOTA 模型进行了分类，主要分为两大类（功能维度和设计维度）：</p>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-100">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold text-slate-600">类别</th>
                  <th className="py-3 px-4 text-left font-semibold text-slate-600">代表模型</th>
                  <th className="py-3 px-4 text-left font-semibold text-slate-600">特点</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-3 px-4 font-medium text-blue-600">多模态理解</td>
                  <td className="py-3 px-4 text-sm text-slate-700">BLIP-2, LLaVA, MiniGPT-4, Qwen-VL</td>
                  <td className="py-3 px-4 text-sm text-slate-600">侧重于输入理解（图片转文本）。架构：Encoder + LLM。</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-purple-600">多模态生成</td>
                  <td className="py-3 px-4 text-sm text-slate-700">GILL, MiniGPT-5, Emu, NEXT-GPT</td>
                  <td className="py-3 px-4 text-sm text-slate-600">支持输出图像、音频等。包含 Output Projector 和 Modality Generator。</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-green-600">工具使用</td>
                  <td className="py-3 px-4 text-sm text-slate-700">Visual ChatGPT, HuggingGPT</td>
                  <td className="py-3 px-4 text-sm text-slate-600">LLM 作为控制器，调用外部工具（专家模型）解决复杂任务。</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-rose-600">端到端</td>
                  <td className="py-3 px-4 text-sm text-slate-700">LLaVA, Gemini, GPT-4, CogVLM</td>
                  <td className="py-3 px-4 text-sm text-slate-600">整个模型进行联合训练（Joint Training）。目前绝大多数主流模型属于此类。</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        {/* Section 6: Benchmarks */}
        <Section id="benchmarks" title="6. 性能评估 (Benchmarks)" icon={Target}>
          <p className="mb-6">
            论文在 18 个主流视觉-语言基准上对比了模型性能（如 OKVQA, GQA, VizWiz 等）。
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-amber-50 p-5 rounded-xl border border-amber-200">
              <h4 className="font-bold text-amber-800 mb-3">🏆 主要发现</h4>
              <ul className="space-y-2 text-sm text-amber-900">
                <li>• <strong>LLaVA-1.5</strong> 和 <strong>VILA</strong> 在多个基准测试中表现优异，证明了高质量数据和简单架构的有效性。</li>
                <li>• <strong>Qwen-VL</strong> 在细粒度视觉理解（如定位）方面表现出色。</li>
                <li>• <strong>MiniGPT-v2</strong> 在推理密集型任务（如 OKVQA）中表现最好。</li>
              </ul>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-800 mb-3">🔧 关键训练配方</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• <strong>高分辨率：</strong>提高图像分辨率（如 336×336 或 448×448）能显著提升细节感知能力。</li>
                <li>• <strong>高质量数据：</strong>混合使用 Image-Text Pair 和交错图文数据（Interleaved Data）至关重要。</li>
                <li>• <strong>参数高效微调 (PEFT)：</strong>仅微调少量参数（如 LoRA）即可达到全参数微调的效果。</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Section 7: Future Directions */}
        <Section id="future" title="7. 未来方向 (Future Directions)" icon={Lightbulb}>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-5 h-5 text-blue-500" />
                <strong className="text-blue-600">1. 更通用和智能的模型</strong>
              </div>
              <span className="text-slate-600 text-sm">扩展更多模态（如网页、热力图、3D），并增强生成质量。</span>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="w-5 h-5 text-blue-500" />
                <strong className="text-blue-600">2. 更具挑战性的基准测试</strong>
              </div>
              <span className="text-slate-600 text-sm">现有基准测试可能已包含在训练数据中，需要构建更复杂、涵盖多学科推理的测试集（如 MMMU）。</span>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="flex items-center gap-2 mb-2">
                <Smartphone className="w-5 h-5 text-blue-500" />
                <strong className="text-blue-600">3. 移动/轻量化部署</strong>
              </div>
              <span className="text-slate-600 text-sm">开发像 MobileVLM 这样适合移动端和 IoT 设备的高效模型。</span>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="flex items-center gap-2 mb-2">
                <Bot className="w-5 h-5 text-blue-500" />
                <strong className="text-blue-600">4. 具身智能 (Embodied AI)</strong>
              </div>
              <span className="text-slate-600 text-sm">将 MM-LLMs 应用于机器人，使其能感知环境、规划任务并执行操作。</span>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="flex items-center gap-2 mb-2">
                <RefreshCw className="w-5 h-5 text-blue-500" />
                <strong className="text-blue-600">5. 持续学习 (Continual Learning)</strong>
              </div>
              <span className="text-slate-600 text-sm">解决灾难性遗忘问题，使模型能低成本地更新知识。</span>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-blue-500" />
                <strong className="text-blue-600">6. 缓解幻觉 (Hallucination)</strong>
              </div>
              <span className="text-slate-600 text-sm">减少模型"看图说话"时编造不存在物体的现象，提高可信度。</span>
            </div>
          </div>
        </Section>

        {/* Footer */}
        <footer className="text-center text-slate-500 text-sm mt-16 pb-8 border-t border-slate-200 pt-8">
          <p>Based on: <em>"MM-LLMs: Recent Advances in MultiModal Large Language Models"</em></p>
        </footer>
      </div>
    </div>
  );
};

export default MMLLMsPaper;

