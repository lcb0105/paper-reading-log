import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Cpu, 
  Layers, 
  Maximize, 
  Video, 
  Zap, 
  ChevronRight, 
  Menu, 
  X,
  Brain,
  Eye,
  ArrowLeft,
  Home,
  AlertTriangle,
  Database,
  Settings,
  Target,
  Sparkles
} from 'lucide-react';

const VLMKnowledgeBase = () => {
  const [activeSection, setActiveSection] = useState('flamingo');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const sections = [
    {
      id: 'foundations',
      title: '基础架构 (Foundations)',
      icon: <Layers size={20} />,
      items: [
        { id: 'flamingo', title: 'Flamingo' },
        { id: 'blip2', title: 'BLIP-2' },
      ]
    },
    {
      id: 'instruction',
      title: '指令微调 (Instruction Tuning)',
      icon: <Brain size={20} />,
      items: [
        { id: 'instructblip', title: 'InstructBLIP' },
        { id: 'llava', title: 'LLaVA Series (1.5/NeXT)' },
        { id: 'minigpt4', title: 'MiniGPT-4 & LLaVAR' },
        { id: 'mimic', title: 'MIMIC-IT / SVIT' }
      ]
    },
    {
      id: 'advanced_arch',
      title: '架构创新 (Advanced Arch)',
      icon: <Cpu size={20} />,
      items: [
        { id: 'cogvlm', title: 'CogVLM' },
        { id: 'qwenvl', title: 'Qwen-VL' },
        { id: 'internlm', title: 'InternLM-XComposer' },
        { id: 'yivl', title: 'Yi-VL' }
      ]
    },
    {
      id: 'resolution',
      title: '高分辨率与效率 (Resolution & Efficiency)',
      icon: <Maximize size={20} />,
      items: [
        { id: 'monkey', title: 'Monkey' },
        { id: 'otterhd', title: 'OtterHD' },
        { id: 'llava_uhd', title: 'LLaVA-UHD' },
        { id: 'moe_llava', title: 'MoE-LLaVA' },
        { id: 'lavin', title: 'LaVIN (Efficient)' }
      ]
    },
    {
      id: 'omniverse',
      title: '全模态与视频 (Video & Omni)',
      icon: <Video size={20} />,
      items: [
        { id: 'nextgpt', title: 'NExT-GPT' },
        { id: 'llamavid', title: 'LLaMA-VID' }
      ]
    }
  ];

  const content = {
    flamingo: (
      <div className="space-y-6">
        <header className="border-b pb-4 border-gray-200">
          <h1 className="text-3xl font-bold text-indigo-900">Flamingo: Visual Language Model for Few-Shot Learning</h1>
          <p className="text-gray-600 mt-2">DeepMind 提出的里程碑式模型，通过"Perceiver Resampler"和"Gated Cross-Attention"解决了视觉特征与冻结 LLM 的融合问题。</p>
        </header>
        
        {/* 总体架构概述 */}
        <section className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border border-indigo-100">
          <h2 className="text-lg font-bold text-indigo-800 mb-3 flex items-center"><Sparkles className="mr-2" size={18}/> 总体架构流程</h2>
          <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-2">
            <li><strong>Perceiver Resampler</strong> 接收来自视觉编码器的时空特征（从图像或视频获取），输出<strong>固定数量</strong>的视觉标记。</li>
            <li>这些视觉标记通过新初始化的<strong>交叉注意力层</strong>对冻结的 LLM 进行条件化，这些层被插入到预训练 LM 层之间。</li>
            <li>新层为 LLM 提供了一种表达方式，将视觉信息纳入到<strong>下一个标记预测任务</strong>中。</li>
          </ol>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-indigo-700 mb-4 flex items-center"><Zap className="mr-2" size={20}/> 核心技术细节</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-gray-800 text-lg mb-2">1. 视觉编码器 (Vision Encoder)</h3>
              <p className="text-gray-700 text-sm mb-2">
                Flamingo 并没有直接使用现成的分类模型，而是使用了一个预训练并<strong>冻结</strong>的 <strong>Normalizer-Free ResNet (NFNet) F6</strong>。
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                <li><strong>预训练目标：</strong> 使用 <strong>Two-term Contrastive Loss</strong> (类似 CLIP) 在图像和文本对数据集上进行对比目标的预训练。</li>
                <li><strong>输出形式：</strong> 最终输出一个 <strong>2D 空间网格特征</strong>并被压平为 1D 序列。</li>
                <li><strong>视频处理：</strong> 对于视频输入，以 <strong>1 FPS</strong> 进行采样并独立编码，获得 <strong>3D 时空特征网格</strong>，随后加入学习到的<strong>时间嵌入 (Temporal Embeddings)</strong> 并压平。</li>
              </ul>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="font-bold text-indigo-900 text-lg mb-2">2. Perceiver Resampler (重采样器)</h3>
              <p className="text-gray-700 text-sm mb-2">
                这是一个<strong>核心模块</strong>，用于连接 Vision Encoder 和 LLM。它解决了视觉特征数量可变（取决于图像分辨率或视频帧数）的问题。
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                <li><strong>输入：</strong> 变长的时空视觉特征 (V)。</li>
                <li><strong>机制：</strong> 引入一组固定数量的<strong>学习到的潜在向量 (Learned Latent Queries)</strong>。这些 Queries 作为 Transformer 的输入，通过 <strong>Cross-Attention</strong> 去"查询"视觉特征。</li>
                <li><strong>输出：</strong> 无论输入多大，始终输出固定数量（如 <strong>64 个</strong>）的 Visual Tokens。</li>
                <li><strong>优势：</strong> 相比 MLP 或 Vanilla Transformer，计算复杂度大大降低，且能处理视频长序列。</li>
              </ul>
              <div className="mt-3 bg-white p-3 rounded border border-indigo-200 text-xs">
                <strong>技术细节：</strong>这个 Transformer 具有一组学习到的潜在向量作为 Query，而 Key 和 Value 则是由时空视觉特征与学习到的潜在向量的连接组成。
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-800 text-lg mb-2">3. GATED XATTN-DENSE (门控交叉注意力)</h3>
              <p className="text-gray-700 text-sm mb-2">
                为了在<strong>不破坏预训练 LLM 语言能力</strong>的前提下引入视觉信息，Flamingo 在冻结的 LM 层之间插入了新的 GATED XATTN-DENSE 层。
              </p>
              <div className="bg-gray-800 text-green-400 p-3 rounded font-mono text-xs overflow-x-auto my-2">
                {`# 伪代码逻辑
y = tanh(alpha_gate) * CrossAttention(query=x, key=visual, value=visual) + x
z = tanh(beta_gate) * FeedForward(y) + y`}
              </div>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                <li><strong>tanh 门控初始化：</strong> <code className="bg-gray-100 px-1 rounded">alpha</code> 和 <code className="bg-gray-100 px-1 rounded">beta</code> <strong>初始化为 0</strong>。这意味着在训练初期，网络输出仅由原始 LM 决定，视觉信息被屏蔽。</li>
                <li><strong>训练动态：</strong> 随着训练进行，门控值的绝对值逐渐增大，模型开始主动利用视觉信息。冻结的 LM 堆栈的所有层都会利用视觉信息。</li>
                <li><strong>深度趋势：</strong> 门控绝对值随着深度增加而增加，但激活的规模也可能随深度变化。</li>
              </ul>
            </div>
          </div>
        </section>
        
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-indigo-700 mb-4">多模态交错数据处理 (Interleaved Data)</h2>
          <p className="text-gray-700 text-sm mb-3">
            Flamingo 的一大特色是支持类似网页的"图文交错"输入。首先通过在文本中的视觉数据位置插入 <code className="bg-gray-100 px-1 rounded">&lt;image&gt;</code> 标签以及特殊标记 <code className="bg-gray-100 px-1 rounded">BOS</code>（序列开始）或 <code className="bg-gray-100 px-1 rounded">EOC</code>（块结束）来处理文本。
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
            <li><strong>Phi (Φ) 函数：</strong> 定义了文本与图像的依赖关系。对于文本序列中的第 t 个 token，它只能关注出现在它<strong>之前</strong>的最后一个图像/视频的 Visual Tokens。</li>
            <li><strong>Mask 策略：</strong> 如果该 token 之前没有图像，则 Cross-Attention 权重被 Mask 为 0。这种设计使得模型能够处理任意长度的图文对话流。</li>
          </ul>
        </section>

        <section className="bg-amber-50 p-6 rounded-lg border border-amber-200">
          <h2 className="text-lg font-bold text-amber-800 mb-3 flex items-center"><Database className="mr-2" size={18}/> 训练细节与消融实验</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
            <li><strong>数据集混合：</strong> M3W、ALIGN、LTIP、VTP，权重分别为 <code className="bg-gray-100 px-1 rounded">1.0, 0.2, 0.2, 0.03</code>（小规模实验后固定）。</li>
            <li><strong>M3W 的重要性：</strong> 去除交错图像文本数据集 M3W 导致性能下降<strong>超过 17%</strong>；去除传统配对图像文本对下降 <strong>9.8%</strong>。</li>
            <li><strong>冻结 LLM：</strong> 可防止灾难性遗忘。从头训练性能下降 <strong>-12.9%</strong>；微调预训练 LLM 也下降 <strong>-8.0%</strong>。</li>
          </ul>
        </section>
      </div>
    ),
    
    blip2: (
      <div className="space-y-6">
        <header className="border-b pb-4 border-gray-200">
          <h1 className="text-3xl font-bold text-indigo-900">BLIP-2: Bootstrapping Language-Image Pre-training</h1>
          <p className="text-gray-600 mt-2">通过两阶段预训练和 Q-Former，以极低的训练代价实现了视觉模型与大语言模型的高效对齐。</p>
        </header>
        
        <section className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h2 className="text-lg font-bold text-blue-800 mb-2">核心组件：Q-Former</h2>
          <p className="text-gray-700 text-sm mb-3">
            Q-Former 是一个轻量级 Transformer（仅 <strong>188M 参数</strong>，基于 <strong>BERT-base 初始化</strong>），包含两组 Transformer 子模块（共享 Self-Attention）：
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
            <li><strong>Image Transformer：</strong> 与视觉编码器进行交互。</li>
            <li><strong>Text Transformer：</strong> 既是文本编码器也是解码器。</li>
            <li><strong>Learned Queries：</strong> 一组可学习的 Query Embeddings（如 <strong>32 个</strong>），通过 Cross-Attention 与冻结的 Image Encoder 输出交互，提取视觉特征。</li>
          </ul>
          <div className="mt-3 bg-white p-3 rounded border border-blue-200 text-xs">
            <strong>关键洞察：</strong>无论多大的视觉 Backbone，最后都是 Query 长度的特征输出。例如 ViT-L/14 输出 257×1024，最后压缩为 <strong>32×768</strong> 的 Query 特征，大大降低计算量。
          </div>
        </section>
        
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-indigo-700 mb-4">两阶段训练详解</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-blue-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Stage 1: 视觉-语言表示学习</h3>
              <p className="text-xs text-gray-500 mb-2">连接冻结的 Image Encoder，<strong>不涉及 LLM</strong>。</p>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
                <li><strong>ITC (Image-Text Contrastive)：</strong> 对齐 Image Transformer 输出的 Query 表征和 Text Transformer 的 [CLS] 表征。</li>
                <li><strong>ITG (Image-grounded Text Generation)：</strong> 给定 Query 提取的视觉特征，生成文本。</li>
                <li><strong>ITM (Image-Text Matching)：</strong> 二分类任务，预测图像和文本是否匹配。使用了 <strong>Hard Negative Mining</strong> 策略。</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Stage 2: 视觉-语言生成学习</h3>
              <p className="text-xs text-gray-500 mb-2">连接<strong>冻结的 LLM</strong>，进行生成式预训练。</p>
              <div className="bg-gray-50 p-3 rounded text-sm text-gray-700">
                <p className="font-semibold mb-1">适配不同 LLM:</p>
                <ul className="list-disc pl-5 mb-2">
                  <li><strong>Decoder-only (如 OPT):</strong> Query 特征通过 FC 层线性映射到 LLM 维度，作为 <strong>Soft Prompts</strong> 输入。</li>
                  <li><strong>Encoder-Decoder (如 FlanT5):</strong> Query 特征与文本前缀一起输入 Encoder。</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-indigo-700 mb-4">训练细节与数据工程</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
            <li><strong>视觉编码器：</strong> 选用 CLIP ViT-L/14 和 ViT-G/14。特别注意使用了<strong>倒数第二层</strong>的特征，而非最后一层，因为最后一层对 [CLS] 聚合过于关注，丢失了空间细节。</li>
            <li><strong>CapFilt 数据清洗 (Bootstrapping)：</strong> 利用 BLIP 中的 Captioner 生成合成描述，再用 Filter 过滤噪声数据，从而扩充训练集。</li>
            <li><strong>数据集：</strong> COCO, VG, SBU, CC3M, CC12M, LAION400M (115M 子集) 等。</li>
            <li><strong>精度策略：</strong> <strong>冻结的参数使用 FP16</strong>，Q-Former 使用 <strong>FP32</strong> 训练。这使得计算量大幅降低。</li>
          </ul>
        </section>
      </div>
    ),
    
    instructblip: (
      <div className="space-y-6">
        <header className="border-b pb-4 border-gray-200">
          <h1 className="text-3xl font-bold text-indigo-900">InstructBLIP: Towards General-purpose VLMs</h1>
          <p className="text-gray-600 mt-2">解决了 BLIP-2 无法感知具体指令的痛点，通过指令微调让 Q-Former 提取"指令相关"的视觉特征。</p>
        </header>
        
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-indigo-700 mb-4">Q-Former 的指令感知改造</h2>
          <p className="text-gray-700 text-sm mb-4">
            在 BLIP-2 中，Q-Former 的输入只有 Learned Queries，提取的是<strong>通用的</strong>视觉特征。InstructBLIP 做出了关键改动：
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
            <li><strong>输入变化：</strong> 将文本指令 (Instruction) 也作为 Q-Former 的输入。</li>
            <li><strong>交互逻辑：</strong> Learned Queries 先通过 <strong>Self-Attention 与 Instruction 交互</strong>，理解"我在找什么"，然后再通过 <strong>Cross-Attention 与 Image Features 交互</strong>。</li>
            <li><strong>效果：</strong> 如果指令是"图中有几个人？"，Queries 会专注于人的特征；如果是"天空是什么颜色？"，Queries 会关注背景。</li>
          </ul>
        </section>
        
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-indigo-700 mb-4">推理策略与数据平衡</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">两种推理模式</h3>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
                <li><strong>生成式任务 (Image Captioning, Open VQA):</strong> LLM 直接生成文本。</li>
                <li><strong>分类任务 (Multi-choice VQA):</strong> 采用 ALBEF 的做法，生成固定的候选答案，并计算 <strong>Log-Likelihood</strong> 选择概率最高的答案。数据集包括 ScienceQA, IconQA, A-OKVQA, HatefulMemes, Visual Dialog 等。</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">数据重采样 (Data Balancing)</h3>
              <p className="text-sm text-gray-600">
                由于训练集大小差异巨大（从几千到几百万），为了防止模型过拟合小数据集或欠拟合大数据集，采样概率 p 设置为数据集大小 S 的平方根比例：
              </p>
              <div className="bg-gray-100 p-2 rounded mt-2 text-center">
                <code className="text-sm font-mono">p ∝ √S</code>
              </div>
            </div>
          </div>
        </section>
      </div>
    ),
    
    llava: (
      <div className="space-y-6">
        <header className="border-b pb-4 border-gray-200">
          <h1 className="text-3xl font-bold text-indigo-900">LLaVA Series: Visual Instruction Tuning</h1>
          <p className="text-gray-600 mt-2">证明了简单的 MLP 投影 + 高质量的指令微调数据 (GPT-4 辅助构造) 足以构建 SOTA 模型。</p>
        </header>
        
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-indigo-700 mb-2">LLaVA 1.0: 数据构造与基础架构</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-gray-800 text-sm">1. GPT-4-assisted Data Generation</h3>
                <p className="text-gray-600 text-sm">
                  利用 GPT-4 强大的纯文本能力，输入图像的 <strong>Captions</strong> 和 <strong>Bounding Boxes</strong>（作为文本上下文），让 GPT-4 生成对话、推理和详细描述数据。
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-sm">2. 两阶段训练</h3>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  <li><strong>Stage 1：对齐阶段</strong>，只训练 Projection Layer（Vision Encoder CLIP ViT-L 冻结）</li>
                  <li><strong>Stage 2：E2E Finetune</strong>，Vision Encoder 依然冻结</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-indigo-700 mb-2">LLaVA-1.5: Improved Baselines</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-gray-800 text-sm">关键改进</h3>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  <li><strong>MLP Adapter：</strong> 将 1.0 中的线性投影层升级为<strong>两层 MLP (GELU 激活)</strong>，增强特征映射能力。</li>
                  <li><strong>CLIP 分辨率：</strong> 升级为 <strong>CLIP-ViT-L-336px</strong>，输入分辨率从 224 提升至 336。</li>
                  <li><strong>学术任务数据：</strong> 加入 VQA (VQA-v2, GQA), OCR (TextVQA, OCRVQA), Region-level (Visual Genome, RefCOCO) 数据。</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-3 rounded border border-green-200">
                <h3 className="font-bold text-green-800 text-sm">Response Formatting Prompts</h3>
                <p className="text-green-700 text-xs">
                  针对 VQA 短回答问题，添加提示后缀：<br/>
                  <code className="bg-white px-1 rounded">"Answer the question using a single word or phrase."</code><br/>
                  这有效平衡了长短文本生成的倾向，无需对 VQA 数据进行额外处理。
                </p>
              </div>
            </div>
          </section>
          
          <section className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
            <h2 className="text-xl font-bold text-indigo-800 mb-2">LLaVA-NeXT (1.6): AnyRes 技术</h2>
            <p className="text-gray-700 text-sm mb-4">
              在不改变预训练 ViT 的情况下，支持超高分辨率（如 672×672, 336×1344, 1344×336）。
            </p>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-bold text-gray-800 text-sm mb-2">Dynamic High-Resolution (AnyRes)</h3>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                <li><strong>Grid Splitting：</strong> 将高分辨率图像切分为多个 336×336 的 Patch，分别通过 ViT 编码。</li>
                <li><strong>Global Context：</strong> 将原图 resize 到 336×336 得到一个全局特征，与切片特征<strong>拼接</strong>。</li>
                <li><strong>优势：</strong> 避免了直接插值 Position Embedding 带来的性能损失，同时保留了局部细节和全局视野。</li>
              </ul>
              <p className="text-xs text-gray-500 mt-2">
                <strong>数据效率极高：</strong>仅使用了不到 1M 的微调数据就达到了 SOTA 效果。使用 32× A100 约 1 天完成训练。
              </p>
            </div>
          </section>
          
          <section className="bg-red-50 p-4 rounded-lg border border-red-100">
            <h3 className="font-bold text-red-800 text-sm flex items-center"><AlertTriangle className="mr-2" size={16}/> 局限性 (Limitations)</h3>
            <ul className="list-disc pl-5 text-xs text-red-700 mt-2 space-y-1">
              <li>全图 Patch 导致训练迭代慢；视觉重采样器可减少 Token 数但收敛效果不如 LLaVA</li>
              <li>缺乏多图处理能力（缺乏指令数据和上下文长度限制）</li>
              <li>特定领域（如医疗）仍有幻觉风险，应谨慎使用</li>
              <li>问题解决能力在某些领域受限，需要更有能力的 LLM 和高质量针对性数据改善</li>
            </ul>
          </section>

          <section className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <h3 className="font-bold text-amber-800 text-sm">Open Problems: 数据效率与幻觉</h3>
            <ul className="list-disc pl-5 text-xs text-amber-700 mt-2 space-y-1">
              <li><strong>数据效率：</strong>仅使用 50% 样本，模型仍保持超过 98% 的完整数据集性能；30% 时 MMBench/ScienceQA/POPE 完全不降。</li>
              <li><strong>幻觉与分辨率：</strong>将输入分辨率提高到 448 时，幻觉显著减少。这表明 LMMs 可能对训练数据中的一些错误具有鲁棒性，但分辨率不足时会学会产生幻觉。</li>
            </ul>
          </section>
        </div>
      </div>
    ),
    
    cogvlm: (
      <div className="space-y-6">
        <header className="border-b pb-4 border-gray-200">
          <h1 className="text-3xl font-bold text-indigo-900">CogVLM: Visual Expert for Pretrained LMs</h1>
          <p className="text-gray-600 mt-2">针对"浅层对齐"导致的幻觉问题，提出了"Deep Fusion (深度融合)"方案，在 LLM 的每一层都进行模态交互。</p>
        </header>
        
        <section className="bg-red-50 p-6 rounded-lg border border-red-100">
          <h2 className="text-xl font-bold text-red-800 mb-4">核心痛点：浅层对齐 (Shallow Alignment)</h2>
          <p className="text-gray-700 text-sm mb-4">
            BLIP-2 或 LLaVA 仅在<strong>输入层</strong>将图像特征映射到文本空间。CogVLM 认为，随着网络层数加深，文本特征经过多层变换，分布发生变化，而图像特征如果没有随之变换，两者在深层会出现<strong>对齐偏差</strong>，导致幻觉。
          </p>
          <div className="bg-white p-3 rounded border border-red-200 text-xs text-gray-700">
            <strong>类比：</strong>灵感来自 P-tuning 和 LoRA 的对比。P-tuning 学习输入的任务前缀嵌入，而 LoRA 通过低秩矩阵适配每一层的模型权重。LoRA 效果更好且更稳定。在浅层对齐方法中，图像特征就像 P-tuning 中的前缀嵌入。
          </div>
        </section>
        
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-indigo-700 mb-4">解决方案：Visual Expert Module</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
            <li><strong>结构：</strong> 在 LLM 的<strong>每一层</strong> Transformer Layer 中，添加可训练的 Visual Expert 分支。</li>
            <li><strong>参数：</strong> Visual Expert 包含独立的 <strong>QKV 矩阵</strong> 和 <strong>MLP 层</strong>，专门用于变换图像特征。形状与预训练 LM 相同。</li>
            <li><strong>初始化：</strong> Visual Expert 的参数直接从 LLM 对应的 QKV/MLP 参数<strong>复制初始化</strong>，保证初始状态的一致性。</li>
            <li><strong>训练：</strong> <strong>冻结 LLM 原有参数</strong>，只训练 Visual Expert 和 Adapter。这类似于 LoRA 的思想，但参数量更大，效果更深。</li>
          </ul>
          <div className="mt-4 bg-gray-50 p-3 rounded border border-gray-200 text-xs">
            <strong>CogVLM-17B 组件：</strong>
            <ul className="list-disc pl-5 mt-1">
              <li>LLM: Frozen Vicuna-7B-v1.5（所有注意力操作应用因果掩码）</li>
              <li>ViT encoder: EVA2-CLIP-E（移除最后一层，因为它专注于 [CLS] 聚合）</li>
              <li>MLP adapter: 两层 SwiGLU MLP</li>
            </ul>
          </div>
        </section>
        
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-indigo-700 mb-4">预训练流程 (Pre-training)</h2>
          <ul className="list-decimal pl-5 space-y-2 text-gray-700 text-sm">
            <li>
              <strong>Stage 1: Image Captioning Loss</strong>
              <p className="text-gray-500 text-xs">使用 1.5B 图像文本对 (LAION-2B, COYO-700M)，训练 Next Token Prediction。</p>
            </li>
            <li>
              <strong>Stage 2: Mixture of Captioning & REC</strong>
              <p className="text-gray-500 text-xs">
                引入 <strong>Referring Expression Comprehension (REC)</strong> 任务。即给定物体的文本描述，预测其 Bounding Box。
              </p>
              <div className="bg-gray-100 p-2 rounded mt-1 text-xs">
                <strong>格式：</strong>"Question: Where is the [object]?" → "Answer: [x0, y0, x1, y1]"<br/>
                坐标值<strong>归一化到 0-999</strong>，表示在图像中的归一化位置。这赋予了模型极强的定位能力。
              </div>
            </li>
          </ul>
        </section>
      </div>
    ),
    
    qwenvl: (
      <div className="space-y-6">
        <header className="border-b pb-4 border-gray-200">
          <h1 className="text-3xl font-bold text-indigo-900">Qwen-VL: Versatile Vision-Language Model</h1>
          <p className="text-gray-600 mt-2">支持定位 (Localization)、文本阅读及多任务的通用模型，采用了三阶段训练策略。</p>
        </header>
        
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-indigo-700 mb-4">三阶段训练详解</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-indigo-200 pl-4">
              <h3 className="font-bold text-gray-800 text-sm">Stage 1: 预训练 (Pre-training)</h3>
              <ul className="list-disc pl-5 text-gray-600 text-xs mt-1 space-y-1">
                <li><strong>数据：</strong> 弱标记图文对 (LAION 等)，经过清洗（去除错误模式）。原始 50B 清洗后仅剩 14B（77.3% 英文，22.7% 中文）。</li>
                <li><strong>设置：</strong> 图像分辨率 <strong>224×224</strong>。<strong>冻结 LLM</strong>，只优化 Vision Encoder 和 VL Adapter。</li>
                <li><strong>目标：</strong> 最小化文本交叉熵。LR=2e-4，Batch=30720，50000 步。</li>
              </ul>
            </div>
            <div className="border-l-4 border-indigo-400 pl-4">
              <h3 className="font-bold text-gray-800 text-sm">Stage 2: 多任务预训练 (Multi-task Pre-training)</h3>
              <ul className="list-disc pl-5 text-gray-600 text-xs mt-1 space-y-1">
                <li><strong>数据：</strong> 高质量细粒度数据，图文交替数据。</li>
                <li><strong>设置：</strong> 图像分辨率提升至 <strong>448×448</strong>。<strong>解锁 LLM 全参数</strong>进行训练。</li>
                <li><strong>任务：</strong> 同时训练 <strong>7 个任务</strong>，增强模型对细节的捕捉能力。</li>
              </ul>
            </div>
            <div className="border-l-4 border-indigo-600 pl-4">
              <h3 className="font-bold text-gray-800 text-sm">Stage 3: 监督微调 (Supervised Fine-tuning)</h3>
              <ul className="list-disc pl-5 text-gray-600 text-xs mt-1 space-y-1">
                <li><strong>数据：</strong> 多模态指令数据 (Caption, VQA) + 对话数据，共 <strong>35 万</strong>。</li>
                <li><strong>设置：</strong> <strong>冻结 Vision Encoder</strong>，优化 LLM 和 Adapter。</li>
                <li><strong>能力：</strong> 注入指令跟随 (Instruction Following) 和对话交互能力。</li>
              </ul>
            </div>
          </div>
        </section>
        
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
           <h2 className="text-xl font-bold text-indigo-700 mb-2">架构特点</h2>
           <p className="text-gray-700 text-sm">
             使用 <strong>Position-aware Adapter</strong>，这使得模型不仅能理解图像内容，还能输出精确的检测框 (Bounding Box)，在 Grounding 任务上表现出色。模型有效地将这些能力转移到更广泛的语言和问题类型上。
           </p>
        </section>
      </div>
    ),
    
    monkey: (
      <div className="space-y-6">
        <header className="border-b pb-4 border-gray-200">
          <h1 className="text-3xl font-bold text-indigo-900">Monkey: High Resolution & Detailed Description</h1>
          <p className="text-gray-600 mt-2">无需从头预训练即可支持超高分辨率 (896×1344) 的高效方法，强调了"分辨率"和"文本标签"的重要性。</p>
        </header>
        
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-indigo-700 mb-4">分辨率提升策略：Sliding Window + LoRA</h2>
          <ul className="list-disc pl-5 space-y-3 text-gray-700 text-sm">
            <li><strong>切片处理 (Sliding Window)：</strong> 将高分辨率输入图像切分为多个小的 Patches（如 448×448），使用与 LMM 分辨率一致的滑动窗口。</li>
            <li><strong>独立 LoRA (Independent LoRA)：</strong> 所有的 Patches 共享同一个静态 ViT 编码器 (ViT-BigG, 2B params)，但每个 Patch 拥有<strong>独属的 LoRA 权重</strong>。</li>
            <li><strong>原理：</strong> 这允许模型针对图像的不同区域（左上、右下等）学习<strong>特定的细节敏感特征和空间上下文</strong>，而无需大幅增加参数量。训练时只训练 LoRA 部分。</li>
            <li><strong>全局特征：</strong> 原始图像也会被 resize 后提取全局特征，与局部特征一起送入 LLM，确保宏观语义不丢失。</li>
          </ul>
        </section>
        
        <section className="bg-green-50 p-6 rounded-lg border border-green-100">
          <h2 className="text-lg font-bold text-green-800 mb-2">多级详细描述生成 (Multi-level Description)</h2>
          <p className="text-gray-700 text-sm mb-2">
            传统的图像-文本对（如 COCO）描述过于简短，无法匹配高分辨率图像带来的丰富信息量。Monkey 提出了一套自动化的数据生成流程：
          </p>
          <ul className="list-disc pl-5 text-xs text-gray-700 space-y-1">
            <li><strong>工具链：</strong> 整合 BLIP-2 (整体描述), PP-OCR (文字识别), GRIT (物体检测), SAM (分割), ChatGPT (整合)。</li>
            <li><strong>结果：</strong> 为 CC3M 数据集中的 <strong>400K</strong> 图片生成了高度详细的描述，使得模型学会关注图像中的微小细节和物体关系。</li>
          </ul>
        </section>

        <section className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <h3 className="font-bold text-amber-800 text-sm">关键发现 (消融实验)</h3>
          <ul className="list-disc pl-5 text-xs text-amber-700 mt-2 space-y-1">
            <li>提高分辨率能提高模型性能</li>
            <li><strong>四个 LoRA</strong> 能够帮助模型获得图像中不同部分的独特特征，建立空间和上下文关系的理解</li>
            <li>相比直接插值扩大模型输入分辨率的方法，本文方法在时间和性能上更具优势</li>
            <li>将 LLaVA-1.5 输入分辨率从 224 扩大为 448，性能得到显著提升</li>
          </ul>
        </section>
      </div>
    ),
    
    moe_llava: (
      <div className="space-y-6">
        <header className="border-b pb-4 border-gray-200">
          <h1 className="text-3xl font-bold text-indigo-900">MoE-LLaVA: Mixture of Experts</h1>
          <p className="text-gray-600 mt-2">利用 MoE 架构实现稀疏激活：在拥有巨大参数量的同时，推理时的计算成本却保持恒定 (Constant Cost)。</p>
        </header>
        
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-indigo-700 mb-4">MoE-Tuning 三阶段训练</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-gray-800 text-sm">Stage 1: Adaptation</h3>
              <p className="text-gray-600 text-xs">仅训练 MLP Adapter，将图像 Token 映射到 LLM 空间（类似 LLaVA 第一阶段）。LLM 学习描述图像。<strong>MoE 层此阶段不应用于 LLM。</strong></p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-sm">Stage 2: Multi-modal Instruction Tuning (Dense)</h3>
              <p className="text-gray-600 text-xs">训练整个 LLM（此时还是 <strong>Dense 模型</strong>）成为 LVLM。引入复杂的推理和 OCR 任务。通常 LVLM 训练到此完成，但 MoE-LLaVA 利用此阶段权重作为第三阶段的初始化。</p>
            </div>
            <div className="bg-indigo-50 p-3 rounded">
              <h3 className="font-bold text-indigo-800 text-sm">Stage 3: Sparsification (稀疏化)</h3>
              <ul className="list-disc pl-5 text-gray-700 text-xs mt-1 space-y-1">
                <li><strong>初始化：</strong> <strong>多次复制 FFN 权重</strong>来初始化专家 (Experts)。</li>
                <li><strong>训练：</strong> 仅训练 MoE 层（<strong>Router 和 Experts</strong>）。</li>
                <li><strong>Top-k Routing：</strong> 比如设置 k=2，对于每个 Token，Router 只会激活得分最高的 <strong>2 个专家</strong>进行处理，其余专家保持静默。根据 Router 权重进行加权求和。</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <h3 className="font-bold text-purple-800 text-sm">核心优势</h3>
          <p className="text-purple-700 text-xs mt-1">
            仅有约 <strong>3B 个稀疏激活参数</strong>，MoE-LLaVA 在各种视觉理解数据集上表现出与 LLaVA-1.5-7B 相当的性能，甚至在物体幻觉基准测试中<strong>超越了 LLaVA-1.5-13B</strong>。这种建模方法形成了具有无限可能的稀疏路径，提供了广泛的能力。
          </p>
        </section>
      </div>
    ),
    
    nextgpt: (
      <div className="space-y-6">
        <header className="border-b pb-4 border-gray-200">
          <h1 className="text-3xl font-bold text-indigo-900">NExT-GPT: Any-to-Any Multimodal LLM</h1>
          <p className="text-gray-600 mt-2">端到端的任意模态输入输出系统，支持文本、图像、视频、音频的任意组合 (Any-to-Any)。</p>
        </header>
        
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-indigo-700 mb-4">系统架构流程</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-gray-800 text-sm">1. 多模态编码 (Multimodal Encoding)</h3>
              <p className="text-gray-600 text-sm">
                使用 <strong>ImageBind</strong> 作为统一的高性能编码器（跨六种模态的统一编码器）。通过<strong>线性投影层</strong>，将不同模态的输入投影为 LLM 可理解的类语言表示。
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-sm">2. LLM 推理与模态信号 (Signal Token)</h3>
              <p className="text-gray-600 text-sm">
                LLM（基于 <strong>Vicuna</strong>）不仅输出文本响应，还会输出特殊的 <strong>模态信号标记 (Modality Signal Tokens)</strong>。这些 Token 充当指令，告诉解码器"现在该生成图片了"或"该生成视频了"。
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-sm">3. 多模态生成 (Multimodal Generation)</h3>
              <p className="text-gray-600 text-sm">
                接收信号 Token 后，通过基于 Transformer 的输出投影层，映射给现成的<strong>条件扩散模型解码器</strong>：
              </p>
              <ul className="list-disc pl-5 text-xs text-gray-500 mt-1">
                <li>图像：Stable Diffusion</li>
                <li>视频：Zeroscope</li>
                <li>音频：AudioLDM</li>
              </ul>
            </div>
          </div>
        </section>
        
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-indigo-700 mb-4">轻量级对齐 (Lightweight Alignment)</h2>
          <p className="text-gray-700 text-sm mb-2">
            为了降低训练成本，<strong>并没有微调庞大的扩散模型</strong>，而是采用了对齐策略：
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
            <li><strong>编码端对齐：</strong> 使用"X-caption"对数据，强制 LLM 根据标注 caption 生成每个输入模态的 caption。</li>
            <li><strong>解码端对齐：</strong> 最小化 LLM 输出的"模态信号 Token"与扩散模型 Text Encoder 编码的"Ground Truth Caption"之间的距离。由于仅使用文本条件编码器（扩散模型的 Text Encoder 冻结），学习仅基于纯粹的字幕文本，<strong>无需任何视觉或音频资源</strong>。</li>
            <li><strong>MosIT (Modality-switching Instruction Tuning)：</strong> 专门设计了模态切换指令微调数据集，使用 GPT-4 在 100+ 主题下生成对话，增强模型在复杂交互中切换模态的能力。</li>
          </ul>
        </section>
      </div>
    ),
    
    llamavid: (
      <div className="space-y-6">
        <header className="border-b pb-4 border-gray-200">
          <h1 className="text-3xl font-bold text-indigo-900">LLaMA-VID: An Image is Worth 2 Tokens</h1>
          <p className="text-gray-600 mt-2">针对长视频处理的极致压缩策略，将每一帧压缩为 2 个 Token。</p>
        </header>
        
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-indigo-700 mb-4">双标记策略 (Dual-Token Strategy)</h2>
          <p className="text-gray-700 text-sm mb-4">
            传统 VLM 处理视频时，每帧生成数百个 Token，长视频会导致 Token 爆炸。LLaMA-VID 创新地使用<strong>两个 Token 代表一帧</strong>：
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-3 rounded border border-blue-200">
              <h3 className="font-bold text-blue-800 text-sm">1. Context Token (上下文标记)</h3>
              <p className="text-blue-700 text-xs">
                基于<strong>用户输入的文本查询</strong>生成。通过上下文注意力 (Context Attention)，文本查询从视觉嵌入中聚合与文本问题<strong>最相关的视觉背景信息</strong>。
              </p>
            </div>
            <div className="bg-purple-50 p-3 rounded border border-purple-200">
              <h3 className="font-bold text-purple-800 text-sm">2. Content Token (内容标记)</h3>
              <p className="text-purple-700 text-xs">
                封装每一帧本身的<strong>视觉线索</strong>（如物体细节），确保视觉信息的完整性。可选择性地将视觉嵌入降采样到各种 Token 大小甚至单个 Token。
              </p>
            </div>
          </div>
          <p className="text-gray-700 mt-4 bg-yellow-50 p-3 rounded border border-yellow-200 text-sm">
            <strong>效果：</strong> 这种压缩极大地减少了计算负担，使得模型能够支持长达 <strong>1 小时</strong> 的视频输入。
          </p>
        </section>
      </div>
    ),
    
    lavin: (
      <div className="space-y-6">
         <header className="border-b pb-4 border-gray-200">
          <h1 className="text-3xl font-bold text-indigo-900">LaVIN & MMA</h1>
          <p className="text-gray-600 mt-2">Cheap and Quick: 提出混合模态适配器 (MMA)，实现高效训练。</p>
        </header>
        
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-indigo-700 mb-4">Mixture-of-Modality Adaptation (MMA)</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
             <li><strong>轻量级适配器：</strong> 使用轻量级 Adapter 连接图像编码器和 LLM，而非全参数微调。端到端优化通过 Mixture of Modality Training (MMT)。</li>
             <li><strong>动态路由：</strong> 提出了一种路由算法，能够<strong>自动判断指令是纯文本还是多模态</strong>，从而调整推理路径。</li>
             <li><strong>极致效率：</strong> 相比 LLaVA，训练时间减少 <strong>71.4%</strong>，存储成本减少 <strong>99.9%</strong>。在 ScienceQA 上微调仅需 <strong>1.4 小时</strong> (8× A100)，仅更新 <strong>3.8M 参数</strong>。</li>
          </ul>
        </section>
      </div>
    ),
    
    yivl: (
       <div className="space-y-6">
         <header className="border-b pb-4 border-gray-200">
          <h1 className="text-3xl font-bold text-indigo-900">Yi-VL</h1>
          <p className="text-gray-600 mt-2">基于 LLaVA 架构，采用分阶段解冻的训练策略。</p>
        </header>
        
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-indigo-700 mb-2">三阶段训练</h2>
          <ul className="list-disc pl-5 space-y-3 text-gray-700 text-sm">
             <li>
               <strong>Stage 1:</strong> <strong>224×224</strong> 分辨率。<strong>冻结 LLM</strong>，训练 ViT 和 Projection。
               <p className="text-xs text-gray-500 mt-1">目标：增强 ViT 知识获取能力，实现 ViT 和 LLM 之间更好的对齐。使用 LAION-400M 的 <strong>1 亿</strong>图像-文本对。</p>
             </li>
             <li>
               <strong>Stage 2:</strong> 分辨率提升至 <strong>448×448</strong>。继续训练 ViT 和 Projection。
               <p className="text-xs text-gray-500 mt-1">目标：提升对复杂视觉细节的识别能力。使用约 <strong>2500 万</strong>图像-文本对。</p>
             </li>
             <li>
               <strong>Stage 3:</strong> <strong>全参数微调</strong> (ViT, Projection, LLM)。
               <p className="text-xs text-gray-500 mt-1">使用约 <strong>100 万</strong>图像-文本对 (GQA, VizWiz VQA, TextCaps, OCR-VQA, Visual Genome, LAION GPT4V 等) 进行多模态对话能力训练。单一来源最大数据贡献上限为 <strong>5 万对</strong>以确保数据平衡。</p>
             </li>
          </ul>
        </section>
       </div>
    ),
    
    llava_uhd: (
       <div className="space-y-6">
         <header className="border-b pb-4 border-gray-200">
          <h1 className="text-3xl font-bold text-indigo-900">LLaVA-UHD</h1>
          <p className="text-gray-600 mt-2">感知任意纵横比和高分辨率图像的 LMM。</p>
        </header>
        
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
           <h2 className="text-xl font-bold text-indigo-700 mb-4">三大核心组件</h2>
           <ul className="list-disc pl-5 space-y-3 text-gray-700 text-sm">
             <li>
               <strong>图像模块化策略 (Modular Visual Encoding)：</strong> 将原始分辨率图像划分为较小的<strong>可变大小切片 (Slices)</strong>。不同于简单的 Resize，这避免了形状扭曲和模糊。
               <p className="text-xs text-gray-500 mt-1">计算理想的切片数量，然后从可能的因式分解中选择最佳分区。使用 2D 插值 Position Embedding 以适应切片分辨率。</p>
             </li>
             <li>
               <strong>压缩模块 (Compression Layer)：</strong> 对每个切片的 Visual Tokens 使用共享的 <strong>Perceiver Resampler</strong> 进行压缩（如从 <strong>576 压缩到 64</strong> 个）。无论切片多少，计算开销可控。
               <p className="text-xs text-gray-500 mt-1">比 MLP 更适用于高分辨率图像，不受图像分辨率限制。</p>
             </li>
             <li>
               <strong>空间结构模式 (Spatial Schema)：</strong> 使用 <code className="bg-gray-100 px-1 rounded">,</code> (分隔列) 和 <code className="bg-gray-100 px-1 rounded">\n</code> (分隔行) 等特殊 Token，显式地告知 LLM 这些切片在原图中的相对位置。
             </li>
           </ul>
        </section>

        <section className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 className="font-bold text-green-800 text-sm">性能与效率</h3>
          <p className="text-green-700 text-xs mt-1">
            建立在分辨率为 336×336 的 LLaVA-1.5 架构上，LLaVA-UHD 支持高达 <strong>672×1088</strong> 的图像，在仅使用 <strong>94%</strong> 的推断计算量的情况下，在 TextVQA 上取得了 <strong>6.4%</strong> 的准确率提高。训练仅需 <strong>23 小时</strong>（8× A100）。
          </p>
        </section>
       </div>
    ),
    
    internlm: (
      <div className="space-y-6">
        <header className="border-b pb-4 border-gray-200">
          <h1 className="text-3xl font-bold text-indigo-900">InternLM-XComposer</h1>
          <p className="text-gray-600 mt-2">书生·浦语大模型，专注于高级图文理解和排版创作。</p>
        </header>
        
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-indigo-700 mb-2">组件详解</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
            <li><strong>Visual Encoder:</strong> 使用 <strong>EVA-CLIP</strong>。该模型通过掩码图像建模 (Masked Image Modeling) 增强了训练，能捕捉更细微的视觉差异。输入 224×224，以 stride 14 分为小 patch 后输入 Transformer。</li>
            <li><strong>Perceive Sampler:</strong> 类似于 BLIP-2 的 Q-Former。使用带有 Cross-Attention 的 <strong>BERT-base</strong>，将初始的 <strong>257 个</strong>图像嵌入压缩为 <strong>64 个</strong>优化嵌入。</li>
            <li><strong>LLM:</strong> <strong>InternLM-Chat-7B</strong>，具备强大的中英双语能力，特别是在中文语境下的图文创作表现优异。</li>
          </ul>
        </section>
      </div>
    ),
    
    otterhd: (
       <div className="space-y-6">
         <header className="border-b pb-4 border-gray-200">
          <h1 className="text-3xl font-bold text-indigo-900">OtterHD-8B</h1>
          <p className="text-gray-600 mt-2">基于 Fuyu-8B 演变，专为细粒度高分辨率输入设计。</p>
        </header>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <p className="text-gray-700 text-sm mb-4">
            OtterHD 解决了传统模型受限于<strong>固定大小视觉编码器</strong>的问题。
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
            <li><strong>灵活性：</strong> 具有处理<strong>灵活输入尺寸</strong>的能力，确保在各种推理需求下的多功能性。</li>
            <li><strong>MagnifierBench：</strong> 引入了一个专门的评估框架，审查模型对微小物体细节和空间关系的辨别能力。</li>
            <li><strong>优势：</strong> OtterHD 在此基准上大幅领先，证明了<strong>直接处理高分辨率输入</strong>（而非压缩或插值）对于细节捕捉的重要性。</li>
          </ul>
        </div>
       </div>
    ),
    
    mimic: (
      <div className="space-y-6">
         <header className="border-b pb-4 border-gray-200">
          <h1 className="text-3xl font-bold text-indigo-900">Data Engineering: MIMIC-IT & SVIT</h1>
          <p className="text-gray-600 mt-2">高质量的数据集和科学的采样策略是提升 VLM 性能的关键。</p>
        </header>
        
        <div className="grid md:grid-cols-2 gap-4">
          <section className="bg-white p-4 rounded border border-gray-100">
            <h2 className="font-bold text-indigo-700 mb-2">MIMIC-IT</h2>
            <p className="text-sm text-gray-600 mb-2">
              包含 <strong>280 万</strong>个多模态指令-回复对。核心特色是 <strong>In-Context Instruction Tuning</strong>。
            </p>
            <ul className="list-disc pl-5 mt-1 text-xs text-gray-600 space-y-1">
              <li><strong>多模态上下文：</strong> 允许一次输入<strong>多个图像或视频片段</strong>作为上下文（不同于 LLaVA-Instruct-150K 的单图）。</li>
              <li><strong>能力提升：</strong> 增强了模型的感知、推理和规划能力，使其能理解图像间的关联，实现零-shot 泛化。</li>
            </ul>
          </section>
          
          <section className="bg-white p-4 rounded border border-gray-100">
            <h2 className="font-bold text-indigo-700 mb-2">SVIT (Scaling up)</h2>
            <p className="text-sm text-gray-600 mb-2">
              构建了 <strong>420 万</strong>个数据点（160 万对话 QA + 160 万复杂推理 QA + 100 万引用 QA + 10.6 万详细描述）。
            </p>
            <div className="bg-amber-50 p-2 rounded border border-amber-200 mt-2">
              <h3 className="font-bold text-amber-800 text-xs">Core Set Selection (核心集选择算法)</h3>
              <ul className="list-disc pl-5 mt-1 text-xs text-amber-700 space-y-1">
                <li><strong>多样性 (Diversity)：</strong> 构建与 MME/MMBench 匹配的关键概念集，使用 GPT-4 生成关键词。通过与概念集的重叠衡量样本信息量，选择最具信息量的样本。</li>
                <li><strong>平衡性 (Balance)：</strong> 重新采样解决 "Yes/No" 回答比例失衡问题，防止模型倾向于只会回答 "Yes"。</li>
              </ul>
              <p className="text-xs text-amber-600 mt-1">结果：<strong>SVIT-core-150K</strong>（157,712 个样本），与 LLaVA-Instruct-150K 大小相同。</p>
            </div>
          </section>
        </div>
      </div>
    ),
    
    minigpt4: (
      <div className="space-y-6">
        <header className="border-b pb-4 border-gray-200">
          <h1 className="text-3xl font-bold text-indigo-900">MiniGPT-4 & LLaVAR</h1>
        </header>
        
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
           <h2 className="text-lg font-bold text-indigo-700 mb-2">MiniGPT-4</h2>
           <p className="text-gray-700 text-sm mb-4">
             MiniGPT-4 是这一波多模态浪潮的先驱之一。它证明了只需要一个简单的 <strong>Linear Layer</strong> 将冻结的视觉编码器 (BLIP-2 ViT-G) 与冻结的 LLM (Vicuna) 对齐，就能涌现出惊人的多模态对话能力（如解释梗图）。
           </p>
        </section>
        
        <section className="bg-green-50 p-6 rounded-lg border border-green-100">
           <h2 className="text-lg font-bold text-green-800 mb-2">LLaVAR (Text-Rich Image Understanding)</h2>
           <p className="text-gray-700 text-sm mb-2">
             专门针对<strong>文本丰富的图像</strong>（电影海报、书籍封面、文档）进行了增强。
           </p>
           <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
             <li><strong>数据收集：</strong> 使用 OCR 工具识别 LAION 数据集 <strong>422K</strong> 个文本丰富图像中的文本。</li>
             <li><strong>GPT-4 生成：</strong> 将 OCR 结果和 Caption 喂给 <strong>纯文本 GPT-4</strong>，让其生成 <strong>16K</strong> 个对话，每个对话包含针对这些文本丰富图像的问答对。</li>
             <li><strong>效果：</strong> 在文本相关的 VQA 任务上准确率提升了 <strong>20%</strong>。</li>
           </ul>
        </section>
      </div>
    )
  };

  const renderContent = () => {
    return content[activeSection] || <div className="p-10">Select a topic</div>;
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800 overflow-hidden">
      {/* Sidebar - Mobile Toggle */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-100 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <div className="p-4 flex justify-between items-center border-b border-slate-700">
          <span className="font-bold text-lg tracking-wide flex items-center">
            <Eye className="mr-2 text-indigo-400" /> VLM Docs
          </span>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden">
            <X size={20} />
          </button>
        </div>
        
        {/* Home Link */}
        <div className="px-4 py-3 border-b border-slate-700">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-slate-300 hover:text-indigo-400 transition-colors text-sm"
          >
            <Home size={16} />
            <span>返回首页</span>
          </Link>
        </div>
        
        <nav className="p-2 space-y-1 overflow-y-auto h-[calc(100vh-120px)] scrollbar-thin scrollbar-thumb-slate-700">
          {sections.map((section) => (
            <div key={section.id} className="mb-4">
              <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center">
                {section.icon}
                <span className="ml-2">{section.title}</span>
              </div>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      if (window.innerWidth < 768) setIsSidebarOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center justify-between group ${
                      activeSection === item.id 
                        ? 'bg-indigo-600 text-white' 
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {item.title}
                    {activeSection === item.id && <ChevronRight size={14} />}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Bar for Mobile */}
        <div className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center">
          <button onClick={() => setIsSidebarOpen(true)} className="mr-4 text-gray-600">
            <Menu size={24} />
          </button>
          <Link to="/" className="mr-4 text-gray-600 hover:text-indigo-600">
            <ArrowLeft size={20} />
          </Link>
          <span className="font-bold text-gray-800">VLM Knowledge Base</span>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default VLMKnowledgeBase;