import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  Cpu, 
  Code,
  FlaskConical,
  AlertTriangle,
  Eye,
  MessageSquare,
  Database,
  Settings,
  Zap,
  BarChart3,
  Target,
  Shield
} from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

const Section = ({ id, title, icon: Icon, children, className = "" }) => (
  <section id={id} className={`scroll-mt-24 mb-16 ${className}`}>
    <div className="flex items-center gap-3 mb-6">
      <div className="bg-violet-100 p-2 rounded-lg text-violet-600">
        <Icon size={24} />
      </div>
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
    </div>
    {children}
  </section>
);

const MathBlock = ({ children }) => (
  <div className="overflow-x-auto p-4 bg-white rounded-lg border border-slate-200 shadow-sm my-4">
    <BlockMath math={children} />
  </div>
);

const CLIP = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-violet-100 selection:text-violet-900">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-slate-500 hover:text-violet-600 transition-colors">
                <ArrowLeft size={20} />
              </Link>
              <div className="w-px h-6 bg-slate-200"></div>
              <span className="text-xl font-bold tracking-tight flex items-center gap-2">
                <span className="text-violet-600">CLIP</span> 论文精读
              </span>
            </div>
            <div className="hidden md:flex space-x-4 text-sm font-medium text-slate-600">
              <a href="#abstract" className="hover:text-violet-600 transition">核心思想</a>
              <a href="#dataset" className="hover:text-violet-600 transition">数据集</a>
              <a href="#architecture" className="hover:text-violet-600 transition">架构细节</a>
              <a href="#algorithm" className="hover:text-violet-600 transition">核心算法</a>
              <a href="#training" className="hover:text-violet-600 transition">训练细节</a>
              <a href="#zeroshot" className="hover:text-violet-600 transition">Zero-Shot</a>
              <a href="#robustness" className="hover:text-violet-600 transition">鲁棒性</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-violet-200 uppercase bg-white/10 rounded-full">
            OpenAI · CVPR · arXiv:2103.00020
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Learning Transferable Visual Models From Natural Language Supervision
          </h1>
          <p className="text-lg md:text-xl text-violet-200 max-w-2xl mx-auto leading-relaxed">
            通过对比学习，在 4 亿对（图像-文本）数据集上训练，实现强大的 Zero-Shot 迁移能力。
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12 space-y-8">

        {/* Abstract */}
        <Section id="abstract" title="摘要与核心思想" icon={BookOpen}>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <p className="mb-4 text-slate-700">
              传统的计算机视觉系统（如 ResNet on ImageNet）通常被训练来预测一组固定的预定义类别（如 1000 类）。这限制了模型的通用性和可用性，因为识别新物体需要额外的标注数据。
            </p>
            <p className="font-semibold text-slate-800 mb-2">CLIP 的突破在于：</p>
            <ul className="list-disc list-inside space-y-2 text-slate-700">
              <li><strong>自然语言监督：</strong> 不使用固定的类别标签（gold labels），而是直接从互联网上抓取的原始文本（raw text）中学习。</li>
              <li><strong>海量数据：</strong> 创建了一个包含 4 亿对（图像，文本）的数据集，称为 <strong>WIT</strong> (WebImageText)。</li>
              <li><strong>零样本迁移 (Zero-Shot Transfer)：</strong> 预训练后，通过自然语言作为提示（Prompt），模型可以直接迁移到 OCR、动作识别、地理定位等下游任务，无需针对特定数据集进行微调。</li>
            </ul>
          </div>

          {/* 效率对比 - 论文核心发现 */}
          <div className="mt-6 bg-green-50 p-5 rounded-xl border-l-4 border-green-500">
            <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
              <Zap size={18} /> 关键发现：对比学习比生成式方法快 4 倍
            </h4>
            <p className="text-sm text-green-700">
              论文发现，使用对比学习（预测匹配关系）比生成式方法（直接生成图像标题 Captioning）<strong>训练效率提高 4 倍</strong>。这使得在大规模数据集上训练成为可能。
            </p>
          </div>
        </Section>

        {/* Dataset - 新增重要章节 */}
        <Section id="dataset" title="WIT 数据集构建" icon={Database}>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-slate-800">WebImageText (WIT) - 4 亿对图像-文本数据</h3>
            <p className="text-slate-700 mb-4">
              现有的数据集如 MS-COCO (~100K 图像) 和 Visual Genome (~100K 图像) 规模太小。YFCC100M 虽然有 1 亿图像，但元数据质量参差不齐，清洗后只剩 1500 万对高质量数据。
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-violet-50 p-4 rounded-lg border border-violet-200">
                <div className="text-3xl font-bold text-violet-600 mb-1">400M</div>
                <div className="text-sm text-violet-800">图像-文本对数量</div>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                <div className="text-3xl font-bold text-indigo-600 mb-1">500K</div>
                <div className="text-sm text-indigo-800">搜索查询词数量</div>
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h4 className="font-semibold text-slate-800 mb-2">数据构建策略：</h4>
              <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                <li>从互联网上抓取图像及其关联的文本描述</li>
                <li>使用约 50 万个查询词进行搜索，每个查询词收集约 2 万对数据</li>
                <li>数据总量与 GPT-2 的训练数据 WebText 相当</li>
                <li>类别平衡：确保不同概念的覆盖率</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Architecture - 详细架构 */}
        <Section id="architecture" title="模型架构详解" icon={Cpu}>
          <div className="space-y-6">
            {/* 图像编码器 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-slate-800 flex items-center gap-2">
                <Eye size={20} className="text-violet-600" /> 图像编码器 (Image Encoder)
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* ResNet 变体 */}
                <div className="bg-violet-50 p-4 rounded-lg border border-violet-200">
                  <h4 className="font-bold text-violet-900 mb-3">ResNet 变体 (修改版)</h4>
                  <ul className="text-sm text-violet-800 space-y-2">
                    <li>• <strong>Attention Pooling</strong> 替代 Global Average Pooling</li>
                    <li>• <strong>Anti-aliased Rect-2 Blur</strong> 替代传统的 strided conv</li>
                    <li>• 在 stem 和 residual block 中使用</li>
                    <li>• 模型变体：RN50, RN101, RN50x4, RN50x16, RN50x64</li>
                  </ul>
                </div>
                
                {/* ViT 变体 */}
                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                  <h4 className="font-bold text-indigo-900 mb-3">Vision Transformer (ViT)</h4>
                  <ul className="text-sm text-indigo-800 space-y-2">
                    <li>• <strong>ViT-B/32</strong>: 12 层, 768 宽度, 12 heads</li>
                    <li>• <strong>ViT-B/16</strong>: 12 层, 768 宽度, 12 heads</li>
                    <li>• <strong>ViT-L/14</strong>: 24 层, 1024 宽度, 16 heads</li>
                    <li>• <strong>ViT-L/14-336px</strong>: 高分辨率版本</li>
                    <li>• 额外添加 Layer Normalization 在 patch 和 position embedding 之前</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 文本编码器 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-slate-800 flex items-center gap-2">
                <MessageSquare size={20} className="text-indigo-600" /> 文本编码器 (Text Encoder)
              </h3>
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                <h4 className="font-bold text-indigo-900 mb-3">Transformer 架构 (类似 GPT-2)</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-indigo-600">12</div>
                    <div className="text-xs text-indigo-700">Layers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-indigo-600">512</div>
                    <div className="text-xs text-indigo-700">Width</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-indigo-600">8</div>
                    <div className="text-xs text-indigo-700">Attention Heads</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-indigo-600">49408</div>
                    <div className="text-xs text-indigo-700">Vocabulary Size</div>
                  </div>
                </div>
                <ul className="text-sm text-indigo-800 mt-4 space-y-1">
                  <li>• 使用 BPE (Byte Pair Encoding) 分词，词汇表大小 49,408</li>
                  <li>• 最大序列长度：76 tokens（截断/填充）</li>
                  <li>• 使用 <strong>[EOS] token</strong> 的激活值作为文本表示（类似 BERT 的 [CLS]）</li>
                  <li>• Masked Self-Attention（因果注意力）</li>
                </ul>
              </div>
            </div>

            {/* 对比学习核心思想 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-slate-800">对比学习 vs 生成式方法</h3>
              <p className="text-slate-700 mb-3">
                之前的尝试（如 VirTex）试图直接生成图像的标题（Captioning），但这在计算上极其昂贵。CLIP 采用了一个更简单的代理任务：<strong>预测哪个文本与哪个图像匹配</strong>。
              </p>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <p className="text-slate-700">
                  给定一个 Batch 的 <InlineMath math="N" /> 个 (图像, 文本) 对，CLIP 预测 <InlineMath math="N \times N" /> 个可能的配对中，哪 <InlineMath math="N" /> 个是真实的。
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Algorithm */}
        <Section id="algorithm" title="核心算法与公式解析" icon={FlaskConical}>
          <p className="mb-6 text-slate-700">
            这是论文中最核心的部分。CLIP 的训练目标是最大化批次中 <InlineMath math="N" /> 个正样本对（真实的图像-文本对）的余弦相似度，同时最小化 <InlineMath math="N^2 - N" /> 个负样本对的相似度。我们使用<strong>对称交叉熵损失 (Symmetric Cross Entropy Loss)</strong>。
          </p>

          <div className="space-y-8">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 border-l-4 border-violet-500 pl-3 mb-4">步骤 1: 特征提取与编码</h3>
              <p className="text-slate-600 mb-4">首先，将图像 <InlineMath math="I" /> 和文本 <InlineMath math="T" /> 输入各自的编码器，得到高维特征表示。</p>
              <MathBlock>{"I_f = \\text{ImageEncoder}(I) \\in \\mathbb{R}^{N \\times d_i}"}</MathBlock>
              <MathBlock>{"T_f = \\text{TextEncoder}(T) \\in \\mathbb{R}^{N \\times d_t}"}</MathBlock>
              <div className="border-l-4 border-slate-300 pl-4 mt-4 text-slate-600 italic">
                其中 <InlineMath math="N" /> 是 Batch Size，<InlineMath math="d_i" /> 和 <InlineMath math="d_t" /> 分别是图像和文本特征的原始维度。
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 border-l-4 border-violet-500 pl-3 mb-4">步骤 2: 联合多模态嵌入与标准化</h3>
              <p className="text-slate-600 mb-4">
                为了在同一空间比较，我们需要将图像和文本特征投影到相同的维度 <InlineMath math="d_e" />，并进行 L2 标准化（Normalization）。
              </p>
              <MathBlock>{"I_e = \\frac{I_f W_i}{\\|I_f W_i\\|_2}, \\quad T_e = \\frac{T_f W_t}{\\|T_f W_t\\|_2}"}</MathBlock>
              <div className="border-l-4 border-slate-300 pl-4 mt-4 text-slate-600 italic">
                <ul className="space-y-1">
                  <li><InlineMath math="W_i \in \mathbb{R}^{d_i \times d_e}" /> 和 <InlineMath math="W_t \in \mathbb{R}^{d_t \times d_e}" /> 是可学习的线性投影矩阵。</li>
                  <li><InlineMath math="I_e, T_e \in \mathbb{R}^{N \times d_e}" /> 是最终用于对比的 Normalized Embeddings。</li>
                </ul>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 border-l-4 border-violet-500 pl-3 mb-4">步骤 3: 计算余弦相似度矩阵</h3>
              <p className="text-slate-600 mb-4">
                计算所有图像与所有文本之间的相似度。由于特征已经归一化，点积即为余弦相似度。结果乘以可学习的温度参数 <InlineMath math="e^\tau" /> 来控制 Softmax 的尖锐程度。
              </p>
              <MathBlock>{"\\text{Logits} = (I_e \\cdot T_e^\\top) \\cdot \\exp(\\tau)"}</MathBlock>
              <div className="border-l-4 border-slate-300 pl-4 mt-4 text-slate-600 italic">
                <InlineMath math="\text{Logits}" /> 是一个 <InlineMath math="N \times N" /> 的矩阵。<InlineMath math="\text{Logits}_{ij}" /> 表示第 <InlineMath math="i" /> 张图和第 <InlineMath math="j" /> 段文本的相似度得分。
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 border-l-4 border-violet-500 pl-3 mb-4">步骤 4: 对称损失函数 (Symmetric Loss)</h3>
              <p className="text-slate-600 mb-4">
                CLIP 同时优化两个方向的损失：
              </p>
              <ul className="list-disc list-inside text-slate-600 mb-4 space-y-1">
                <li><strong>图像到文本 (Image-to-Text)：</strong> 给定图像，预测正确的文本。</li>
                <li><strong>文本到图像 (Text-to-Image)：</strong> 给定文本，预测正确的图像。</li>
              </ul>
              <MathBlock>{"\\mathcal{L}_I = -\\frac{1}{N} \\sum_{i=1}^{N} \\log \\frac{\\exp(\\text{Logits}_{i,i})}{\\sum_{j=1}^{N} \\exp(\\text{Logits}_{i,j})}"}</MathBlock>
              <MathBlock>{"\\mathcal{L}_T = -\\frac{1}{N} \\sum_{i=1}^{N} \\log \\frac{\\exp(\\text{Logits}_{i,i})}{\\sum_{j=1}^{N} \\exp(\\text{Logits}_{j,i})}"}</MathBlock>
              <MathBlock>{"\\mathcal{L} = \\frac{\\mathcal{L}_I + \\mathcal{L}_T}{2}"}</MathBlock>
              <div className="border-l-4 border-slate-300 pl-4 mt-4 text-slate-600 italic">
                <ul className="space-y-1">
                  <li><InlineMath math="\mathcal{L}_I" />: 针对每一行（图像）做 Softmax Cross Entropy。目标是让对角线元素（正确配对）概率最大。</li>
                  <li><InlineMath math="\mathcal{L}_T" />: 针对每一列（文本）做 Softmax Cross Entropy。</li>
                  <li>最终损失是两者的平均值。</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* Pseudocode */}
        <Section id="pseudocode" title="伪代码实现 (Pseudocode)" icon={Code}>
          <p className="mb-4 text-slate-600">论文图 3 中提供的 Numpy 风格伪代码，清晰地展示了上述数学过程：</p>
          <div className="bg-slate-900 text-slate-100 p-6 rounded-xl overflow-x-auto shadow-lg text-sm font-mono leading-relaxed">
            <pre>{`# image_encoder - ResNet or Vision Transformer
# text_encoder  - CBOW or Text Transformer
# I[n, h, w, c] - aligned images mini-batch
# T[n, l]       - aligned texts mini-batch
# W_i[d_i, d_e] - learned proj of image to embed
# W_t[d_t, d_e] - learned proj of text to embed
# t             - learned temperature parameter

# 1. 提取特征
I_f = image_encoder(I)  # [n, d_i]
T_f = text_encoder(T)   # [n, d_t]

# 2. 联合多模态嵌入与归一化 (L2 Normalize)
I_e = l2_normalize(np.dot(I_f, W_i), axis=1)  # [n, d_e]
T_e = l2_normalize(np.dot(T_f, W_t), axis=1)  # [n, d_e]

# 3. 计算成对余弦相似度 (Scaled Pairwise Cosine Similarities)
# logits[i][j] 是第 i 个图和第 j 个文的相似度
logits = np.dot(I_e, T_e.T) * np.exp(t)  # [n, n]

# 4. 对称损失函数 (Symmetric Loss Function)
labels = np.arange(n)  # 对角线为真值
loss_i = cross_entropy_loss(logits, labels, axis=0)  # 图像维度的损失
loss_t = cross_entropy_loss(logits, labels, axis=1)  # 文本维度的损失
loss   = (loss_i + loss_t) / 2`}</pre>
          </div>
        </Section>

        {/* Training Details - 新增重要章节 */}
        <Section id="training" title="训练细节与超参数" icon={Settings}>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
            <h3 className="text-xl font-semibold mb-4 text-slate-800">核心训练超参数</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-violet-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-violet-600">32,768</div>
                <div className="text-xs text-violet-700 mt-1">Batch Size</div>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-indigo-600">32</div>
                <div className="text-xs text-indigo-700 mt-1">Training Epochs</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">0.2</div>
                <div className="text-xs text-purple-700 mt-1">Weight Decay</div>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-pink-600">2000</div>
                <div className="text-xs text-pink-700 mt-1">Warmup Steps</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* 温度参数 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-slate-800 mb-3">温度参数 τ (Temperature)</h4>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>• 初始化为 <InlineMath math="\log(1/0.07) = 2.66" /></li>
                <li>• 作为<strong>可学习参数</strong>直接优化</li>
                <li>• 最大值限制为 <strong>100</strong>（防止训练不稳定）</li>
                <li>• 控制 Softmax 分布的"尖锐程度"</li>
              </ul>
            </div>

            {/* 优化器 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-slate-800 mb-3">Adam 优化器配置</h4>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>• <InlineMath math="\beta_1 = 0.9" /></li>
                <li>• <InlineMath math="\beta_2 = 0.999" /> (ResNet) / <InlineMath math="0.98" /> (ViT)</li>
                <li>• <InlineMath math="\epsilon = 10^{-8}" /> (ResNet) / <InlineMath math="10^{-6}" /> (ViT)</li>
                <li>• 使用 Cosine Learning Rate Schedule</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-amber-50 p-5 rounded-xl border-l-4 border-amber-500">
            <h4 className="font-bold text-amber-800 mb-2">💡 大 Batch Size 的重要性</h4>
            <p className="text-sm text-amber-700">
              CLIP 使用了极大的 Batch Size (32,768)，这意味着每个正样本对有 32,767 个负样本。这种大批次对比学习对于学习高质量的表示至关重要，但也需要大量的 GPU 内存和分布式训练技术。
            </p>
          </div>
        </Section>

        {/* Zero-Shot Classification - 详细章节 */}
        <Section id="zeroshot" title="Zero-Shot 分类详解" icon={Target}>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
            <h3 className="text-xl font-semibold mb-4 text-slate-800">Zero-Shot 推理流程</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="bg-violet-100 text-violet-700 rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">1</div>
                <div>
                  <h4 className="font-semibold text-slate-800">构建文本提示</h4>
                  <p className="text-sm text-slate-600">将数据集的每个类别名嵌入提示模板，如 <code className="bg-slate-100 px-1.5 py-0.5 rounded text-violet-600">"A photo of a {'{class}'}"</code></p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-violet-100 text-violet-700 rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">2</div>
                <div>
                  <h4 className="font-semibold text-slate-800">编码所有类别文本</h4>
                  <p className="text-sm text-slate-600">用文本编码器计算所有 K 个类别的文本嵌入</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-violet-100 text-violet-700 rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">3</div>
                <div>
                  <h4 className="font-semibold text-slate-800">计算相似度并预测</h4>
                  <p className="text-sm text-slate-600">图像特征与所有文本特征计算余弦相似度，选择最高的作为预测类别</p>
                </div>
              </div>
            </div>
          </div>

          {/* 性能数据 */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-violet-500 to-purple-600 p-6 rounded-xl text-white text-center">
              <div className="text-4xl font-bold mb-1">76.2%</div>
              <div className="text-sm opacity-90">Zero-Shot ImageNet Top-1</div>
              <div className="text-xs opacity-75 mt-2">匹敌全监督 ResNet-50</div>
            </div>
            <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-6 rounded-xl text-white text-center">
              <div className="text-4xl font-bold mb-1">85.4%</div>
              <div className="text-sm opacity-90">Linear Probe ImageNet</div>
              <div className="text-xs opacity-75 mt-2">冻结特征 + 线性分类器</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-xl text-white text-center">
              <div className="text-4xl font-bold mb-1">30+</div>
              <div className="text-sm opacity-90">评估的下游数据集</div>
              <div className="text-xs opacity-75 mt-2">OCR/动作识别/地理定位等</div>
            </div>
          </div>

          {/* Prompt Engineering */}
          <div className="bg-violet-50 p-5 rounded-xl border-l-4 border-violet-500 mb-6">
            <h4 className="font-bold text-violet-800 mb-2">Prompt Engineering（提示工程）的重要性</h4>
            <p className="text-sm text-violet-700 mb-3">
              论文发现，简单的标签（如 "boxer"）可能产生歧义（是拳击手还是狗？）。使用提示模板可以显著提升准确率。
            </p>
            <div className="bg-white p-4 rounded-lg">
              <h5 className="font-semibold text-slate-800 mb-2">80 个提示模板集成 (Prompt Ensembling)</h5>
              <ul className="text-xs text-slate-600 space-y-1 font-mono">
                <li>"A photo of a {'{c}'}."</li>
                <li>"A blurry photo of a {'{c}'}."</li>
                <li>"A sculpture of a {'{c}'}."</li>
                <li>"A photo of the large {'{c}'}."</li>
                <li>... 等 80 个模板</li>
              </ul>
              <p className="text-sm text-violet-700 mt-2">
                集成多个模板的预测结果可以提升 <strong>3-5%</strong> 的准确率。
              </p>
            </div>
          </div>

          {/* 其他任务表现 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-slate-800">在其他任务上的 Zero-Shot 表现</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-bold text-blue-900 mb-2">动作识别 (Action Recognition)</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• UCF101: 匹配最佳 Linear Probe 结果</li>
                  <li>• Kinetics-700: 接近全监督 I3D 基线 (差距 &lt;1%)</li>
                  <li>• RareAct: 超越 S3D 模型 10 个百分点</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-bold text-green-900 mb-2">地理定位 (Geo-localization)</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• IM2GPS 测试集表现优异</li>
                  <li>• 750km 内准确率: 62.0%</li>
                  <li>• 2500km 内准确率: 79.3%</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* Robustness - 详细章节 */}
        <Section id="robustness" title="鲁棒性与分布偏移" icon={Shield}>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
            <h3 className="text-xl font-semibold mb-4 text-slate-800">ImageNet 变体上的表现对比</h3>
            <p className="text-slate-700 mb-4">
              这是 CLIP 最令人印象深刻的特性。传统 ImageNet 模型在分布偏移时性能大幅下降，但 CLIP 展现出惊人的鲁棒性。
            </p>
            
            {/* 性能表格 */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-4 py-2 text-left">数据集</th>
                    <th className="px-4 py-2 text-center">Zero-Shot CLIP</th>
                    <th className="px-4 py-2 text-center">Linear Probe CLIP</th>
                    <th className="px-4 py-2 text-center">SOTA 监督模型</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-4 py-2">ImageNet</td>
                    <td className="px-4 py-2 text-center">76.2%</td>
                    <td className="px-4 py-2 text-center font-semibold text-violet-600">85.4%</td>
                    <td className="px-4 py-2 text-center">88.3%</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="px-4 py-2">ImageNet-R (艺术风格)</td>
                    <td className="px-4 py-2 text-center font-semibold text-green-600">88.9%</td>
                    <td className="px-4 py-2 text-center">84.2%</td>
                    <td className="px-4 py-2 text-center">74.7%</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="px-4 py-2">ImageNet-Sketch</td>
                    <td className="px-4 py-2 text-center font-semibold text-green-600">60.2%</td>
                    <td className="px-4 py-2 text-center">57.4%</td>
                    <td className="px-4 py-2 text-center">47.6%</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="px-4 py-2">ObjectNet</td>
                    <td className="px-4 py-2 text-center font-semibold text-green-600">72.3%</td>
                    <td className="px-4 py-2 text-center">66.2%</td>
                    <td className="px-4 py-2 text-center">68.5%</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="px-4 py-2">ImageNet-A (对抗样本)</td>
                    <td className="px-4 py-2 text-center font-semibold text-green-600">77.2%</td>
                    <td className="px-4 py-2 text-center">75.3%</td>
                    <td className="px-4 py-2 text-center">84.9%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mt-2">* 绿色背景表示 Zero-Shot CLIP 超越监督学习 SOTA 的数据集</p>
          </div>

          <div className="bg-emerald-50 p-5 rounded-xl border-l-4 border-emerald-500">
            <h4 className="font-bold text-emerald-800 mb-2">🔑 核心发现</h4>
            <p className="text-sm text-emerald-700">
              Zero-Shot CLIP 在 7 个 ImageNet 鲁棒性测试中的 <strong>5 个</strong>数据集上超越了当前 SOTA。这表明 CLIP 学到的是更本质的视觉概念，而非仅仅拟合特定数据集的统计规律。其在 ImageNet-R（艺术风格渲染）上的表现尤其突出，可能是因为预训练数据中包含了大量创意内容。
            </p>
          </div>
        </Section>

        {/* Limitations */}
        <Section id="limitations" title="局限性与讨论" icon={AlertTriangle}>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
            <h3 className="text-lg font-semibold mb-4 text-slate-800">技术局限性</h3>
            <ul className="space-y-4 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1 font-bold">1</span>
                <div>
                  <strong>细粒度分类与计数：</strong>
                  <p className="text-sm text-slate-600 mt-1">CLIP 在区分非常相似的物体（如不同型号的汽车、飞机）或对物体进行计数等抽象任务上表现较弱。这些任务可能需要更精细的视觉特征。</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1 font-bold">2</span>
                <div>
                  <strong>真正的新任务 (Out-of-Distribution)：</strong>
                  <p className="text-sm text-slate-600 mt-1">虽然泛化能力强，但在完全未见过的数据类型（如 MNIST 手写数字，因为网络文本中很少有类似图像）上，Zero-Shot 性能仅 88%，甚至不如简单的 Logistic Regression。</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1 font-bold">3</span>
                <div>
                  <strong>数据效率问题：</strong>
                  <p className="text-sm text-slate-600 mt-1">Linear Probe 在只有 4 个样本/类时即可匹配 Zero-Shot 性能，说明 CLIP 的 Zero-Shot 能力虽强，但相比真正的 few-shot learning 仍有差距。</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1 font-bold">4</span>
                <div>
                  <strong>任务特定设计：</strong>
                  <p className="text-sm text-slate-600 mt-1">对于复杂任务（如复杂 OCR、医学影像、卫星图像），CLIP 的 Zero-Shot 能力有限，仍然需要任务特定的微调或设计。</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-slate-800">社会影响与偏见</h3>
            <ul className="space-y-4 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="text-amber-500 mt-1">⚠</span>
                <div>
                  <strong>数据偏见：</strong>
                  <p className="text-sm text-slate-600 mt-1">由于训练数据来自未经过滤的互联网，模型可能习得了社会偏见（性别、种族等）。论文使用 FairFace 数据集进行了测试，发现模型在人脸分类上存在明显的偏见问题。</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500 mt-1">⚠</span>
                <div>
                  <strong>监控与隐私：</strong>
                  <p className="text-sm text-slate-600 mt-1">CLIP 的通用性使其可能被用于面部识别和监控任务，引发隐私担忧。作者明确表示不建议将其用于此类应用。</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-6 bg-blue-50 p-5 rounded-xl border-l-4 border-blue-500">
            <h4 className="font-bold text-blue-800 mb-2">📌 未来方向</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 探索更高效的训练方法，减少对大批次的依赖</li>
              <li>• 改进细粒度识别和抽象推理能力</li>
              <li>• 开发更好的 few-shot 学习策略</li>
              <li>• 建立更完善的偏见检测和缓解机制</li>
            </ul>
          </div>
        </Section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="mb-4 text-white font-serif text-lg italic">"We demonstrate that the simple pre-training task of predicting which caption goes with which image is an efficient and scalable way to learn SOTA image representations from scratch."</p>
          <p className="text-sm">基于 CLIP 原始论文 (arXiv:2103.00020) 整理。</p>
        </div>
      </footer>

    </div>
  );
};

export default CLIP;









