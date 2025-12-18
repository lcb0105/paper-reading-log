import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const EVA = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-700" style={{ fontFamily: "'Segoe UI', 'Microsoft YaHei', sans-serif", lineHeight: 1.6 }}>
      {/* Navigation */}
      <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
              <ArrowLeft size={20} />
              <span>返回首页</span>
            </Link>
            <div className="font-bold text-xl">EVA 论文解析</div>
            <div className="hidden md:flex space-x-6 text-sm">
              <a href="#intro" className="hover:text-blue-300 transition">简介</a>
              <a href="#method" className="hover:text-blue-300 transition">核心方法</a>
              <a href="#architecture" className="hover:text-blue-300 transition">架构与数据</a>
              <a href="#experiments" className="hover:text-blue-300 transition">实验结果</a>
              <a href="#evaclip" className="hover:text-blue-300 transition">EVA-CLIP</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded mb-4">CVPR / arXiv 2022</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">EVA: Exploring the Limits of Masked Visual Representation Learning at Scale</h1>
          <p className="text-xl text-slate-600 mb-6">探索大规模掩码视觉表示学习的极限</p>
          <div className="text-sm text-slate-500">
            BAAI (北京智源人工智能研究院) 等机构联合发布
          </div>
          <div className="mt-8 p-4 bg-slate-50 rounded-lg text-left border border-slate-200 shadow-sm">
            <p className="font-bold text-slate-800 mb-2">🚀 核心一句话：</p>
            <p>EVA 是一个拥有 10 亿参数的 Vanilla ViT 模型，它完全基于<strong>公开数据</strong>，通过预测被掩码（Masked）掉的图像区域对应的 <strong>CLIP 视觉特征</strong>进行预训练，在多项下游任务中刷新了 SOTA。</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10 space-y-16">
        {/* Introduction */}
        <section id="intro">
          <h2 className="text-3xl font-bold mb-6 flex items-center text-slate-900">
            <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg mr-3">1</span>
            背景与动机
          </h2>
          <div className="prose max-w-none text-slate-700 space-y-4">
            <p>
              在自然语言处理（NLP）领域，扩大模型规模（Scaling up）带来了革命性的进步。视觉领域虽然也尝试了掩码图像建模（MIM），但现有的十亿级参数视觉模型通常严重依赖于<strong>有监督训练</strong>（如 JFT-3B 这种私有数据集）。
            </p>
            <p>
              EVA 的目标非常明确：<strong>能否仅使用公开数据，通过纯粹的 MIM 任务，训练出一个高性能的十亿级参数视觉基础模型？</strong>
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <h4 className="font-bold mb-2">💡 关键创新点：</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>摒弃像素重建：</strong> 像素级信息过于低级，难以捕捉高层语义。</li>
                <li><strong>摒弃 Tokenizer：</strong> 类似 BEiT 的离散 Token 需要额外的训练步骤，EVA 证明这不是必须的。</li>
                <li><strong>回归 CLIP 特征：</strong> EVA 直接回归（Regress）对齐过图文信息的 CLIP 视觉特征。这结合了 MIM 的几何结构捕捉能力和 CLIP 的高层语义能力。</li>
              </ul>
            </div>

            {/* Why CLIP Features */}
            <div className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-200">
              <h4 className="font-bold text-purple-800 mb-3">🔬 深度分析：为什么选择 CLIP 连续特征？</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white p-4 rounded-lg">
                  <h5 className="font-bold text-red-700 mb-2">❌ 像素重建</h5>
                  <ul className="text-slate-600 space-y-1">
                    <li>• 信息过于低级</li>
                    <li>• 难以捕捉高层语义</li>
                    <li>• 对噪声敏感</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h5 className="font-bold text-orange-700 mb-2">⚠️ 离散 Token (BEiT)</h5>
                  <ul className="text-slate-600 space-y-1">
                    <li>• 需要额外训练 Tokenizer</li>
                    <li>• 量化误差损失信息</li>
                    <li>• 训练流程复杂</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h5 className="font-bold text-green-700 mb-2">✅ CLIP 连续特征</h5>
                  <ul className="text-slate-600 space-y-1">
                    <li>• 图文对齐的高层语义</li>
                    <li>• 无信息损失</li>
                    <li>• 端到端训练</li>
                  </ul>
                </div>
              </div>
              <p className="text-sm text-slate-600 mt-4">
                <strong>论文洞察：</strong>CLIP 特征已经将图像与自然语言对齐，包含了丰富的语义信息。直接回归这些连续特征比离散化更简洁高效，
                且避免了 Tokenizer 带来的额外训练成本和量化误差。
              </p>
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section id="method">
          <h2 className="text-3xl font-bold mb-6 flex items-center text-slate-900">
            <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg mr-3">2</span>
            核心方法与公式深度解析
          </h2>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold mb-4 text-slate-800">预训练核心公式：负余弦相似度</h3>
            <p className="mb-4 text-slate-700">
              EVA 的训练本质上是一个"学生模仿老师"的过程。学生（EVA）只看图片的局部，却要猜出老师（CLIP）看到整张图后对该局部的理解。
            </p>

            {/* Formula Display */}
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 shadow-inner mb-8 overflow-x-auto">
              <div className="text-center py-4">
                <BlockMath math="\mathcal{L} = - \sum_{i \in \mathcal{M}} \frac{\phi(z_i) \cdot y_i}{\| \phi(z_i) \|_2 \cdot \| y_i \|_2}" />
              </div>
              <div className="text-center text-sm text-slate-500 mt-2">
                （公式 1：EVA 预训练损失函数）
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="space-y-8">
              {/* Term 1: The Mask Set */}
              <div className="flex gap-4">
                <div className="w-16 pt-2 font-mono text-xl font-bold text-blue-600 text-right shrink-0">
                  <InlineMath math="\mathcal{M}" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-slate-800">掩码索引集合 (Masked Indices)</h4>
                  <p className="text-slate-600 mb-2">
                    <InlineMath math="i \in \mathcal{M}" /> 表示我们<strong>只计算</strong>被掩盖掉的那些 Patch 的损失。
                  </p>
                  <ul className="list-disc pl-5 text-sm text-slate-500 space-y-1">
                    <li>EVA 使用约 <strong>40%</strong> 的掩码率。</li>
                    <li>未被掩盖的部分充当"提示 (Context)"，模型利用这些提示来推断掩盖区域的内容。</li>
                    <li>这种机制强迫模型学习图像的上下文关联，而不是死记硬背。</li>
                  </ul>
                </div>
              </div>

              {/* Term 2: The Target */}
              <div className="flex gap-4">
                <div className="w-16 pt-2 font-mono text-xl font-bold text-blue-600 text-right shrink-0">
                  <InlineMath math="y_i" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-slate-800">目标特征 (Target Feature)</h4>
                  <p className="text-slate-600 mb-2">
                    这是"正确答案"。它来自 <strong>Teacher 模型</strong>（OpenAI CLIP-L/14）。
                  </p>
                  <div className="bg-orange-50 p-3 rounded border border-orange-100 text-sm">
                    <strong>⚠️ 关键细节：</strong> Teacher 模型看到的是<strong>完整的原图</strong> <InlineMath math="x" />，而不是被掩盖的图。因此 <InlineMath math="y_i" /> 包含了关于该 Patch 的全局上下文信息和语义信息。
                  </div>
                </div>
              </div>

              {/* Term 3: The Prediction */}
              <div className="flex gap-4">
                <div className="w-16 pt-2 font-mono text-xl font-bold text-blue-600 text-right shrink-0">
                  <InlineMath math="z_i" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-slate-800">预测输出 (Raw Prediction)</h4>
                  <p className="text-slate-600 mb-2">
                    这是 <strong>Student 模型</strong>（EVA）的直接输出。
                  </p>
                  <ul className="list-disc pl-5 text-sm text-slate-500 space-y-1">
                    <li>Student 模型接收的是<strong>掩码图</strong> <InlineMath math="x_{\text{masked}}" />。</li>
                    <li>在位置 <InlineMath math="i" />，输入的是一个可学习的特殊 Token [MASK]。</li>
                    <li><InlineMath math="z_i" /> 是 ViT 最后一层的输出向量。</li>
                  </ul>
                </div>
              </div>

              {/* Term 4: The Projection */}
              <div className="flex gap-4">
                <div className="w-16 pt-2 font-mono text-xl font-bold text-blue-600 text-right shrink-0">
                  <InlineMath math="\phi(\cdot)" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-slate-800">投影变换 (Projection Head)</h4>
                  <p className="text-slate-600 mb-2">
                    EVA 的输出维度可能与 CLIP 的特征维度不一致，因此需要映射。
                  </p>
                  <div className="font-mono bg-slate-100 p-2 rounded text-sm mb-2 overflow-x-auto">
                    <InlineMath math="\phi(z_i) = \text{Linear}(\text{LayerNorm}(z_i))" />
                  </div>
                  <p className="text-sm text-slate-600">包含两个步骤：先做层归一化 (LayerNorm)，再通过一个线性全连接层映射到 CLIP 的特征空间维度。</p>
                </div>
              </div>

              {/* Term 5: The Loss Logic */}
              <div className="flex gap-4">
                <div className="w-16 pt-2 font-mono text-xl font-bold text-blue-600 text-right shrink-0">Loss</div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-slate-800">为什么要除以范数？(Normalization)</h4>
                  <p className="text-slate-600 mb-2">
                    公式中的分母 <InlineMath math="\| \phi(z_i) \|_2 \cdot \| y_i \|_2" /> 是对两个向量进行 L2 归一化。
                  </p>
                  <ul className="list-disc pl-5 text-sm text-slate-500 space-y-2">
                    <li>这意味着我们计算的是<strong>余弦相似度 (Cosine Similarity)</strong>。</li>
                    <li><strong>为什么不是 MSE (均方误差)？</strong> MSE 关注数值的绝对距离，而余弦相似度关注向量的<strong>方向</strong>（语义一致性）。对于高维语义特征（如 CLIP 特征），方向通常比幅度更能代表语义类别。</li>
                    <li>前面的负号 <InlineMath math="-" /> 是因为我们要<strong>最大化</strong>相似度，等价于<strong>最小化</strong>负相似度。</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Masking Strategy */}
            <div className="mt-8 bg-amber-50 p-6 rounded-xl border border-amber-200">
              <h3 className="font-bold text-lg mb-4 text-amber-900">🎭 掩码策略：Block-wise Masking</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-slate-700 mb-3">
                    EVA 采用与 BEiT 相同的 <strong>Block-wise Masking</strong> 策略，而非随机掩码：
                  </p>
                  <ul className="text-sm text-slate-600 space-y-2">
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">•</span>
                      <span>将图像划分为若干连续的块（Block），整块掩盖</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">•</span>
                      <span>掩码率约为 <strong>40%</strong>（而非 MAE 的 75%）</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">•</span>
                      <span>块状掩码比随机掩码更难预测，需要更强的语义理解</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-sm text-slate-800 mb-2">为什么不是 75%？</h4>
                  <p className="text-sm text-slate-600">
                    MAE 使用 75% 高掩码率是因为像素重建是低级任务，需要更难的设定。
                    而 EVA 预测的是高层语义特征，40% 的掩码率已经足够困难且能保留足够的上下文信息。
                  </p>
                </div>
              </div>
            </div>

            {/* Process Flow Visualization */}
            <div className="mt-10 pt-8 border-t border-slate-200">
              <h3 className="font-bold text-lg mb-4 text-slate-800">⚙️ 完整计算流程图解</h3>
              <div className="space-y-4">
                <div className="border-l-2 border-slate-300 pl-6 relative">
                  <div className="absolute -left-1.5 top-1 w-3 h-3 bg-slate-400 rounded-full"></div>
                  <h5 className="font-bold text-sm">步骤 1: 输入准备</h5>
                  <p className="text-sm text-slate-600">一张图片 <InlineMath math="x" /> 被复制成两份。</p>
                </div>
                <div className="border-l-2 border-slate-300 pl-6 relative">
                  <div className="absolute -left-1.5 top-1 w-3 h-3 bg-slate-400 rounded-full"></div>
                  <h5 className="font-bold text-sm">步骤 2: 路径分流</h5>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="bg-blue-50 p-3 rounded">
                      <span className="text-xs font-bold text-blue-800 block mb-1">Teacher 路径 (CLIP)</span>
                      <span className="text-xs text-slate-600">输入<strong>完整图片</strong> <InlineMath math="x" /> → 提取特征 <InlineMath math="y" /></span>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <span className="text-xs font-bold text-green-800 block mb-1">Student 路径 (EVA)</span>
                      <span className="text-xs text-slate-600">应用 Mask 得到 <InlineMath math="x_{\text{masked}}" /> → 预测特征 <InlineMath math="z" /> → 投影 <InlineMath math="\phi(z)" /></span>
                    </div>
                  </div>
                </div>
                <div className="border-l-2 border-slate-300 pl-6 relative">
                  <div className="absolute -left-1.5 top-1 w-3 h-3 bg-slate-400 rounded-full"></div>
                  <h5 className="font-bold text-sm">步骤 3: 归一化与对比</h5>
                  <p className="text-sm text-slate-600">
                    取出 Mask 位置对应的 <InlineMath math="y_i" /> 和 <InlineMath math="\phi(z_i)" />。对两者分别进行 L2 归一化（除以各自的模长）。
                  </p>
                </div>
                <div className="border-l-2 border-slate-300 pl-6 relative">
                  <div className="absolute -left-1.5 top-1 w-3 h-3 bg-slate-400 rounded-full"></div>
                  <h5 className="font-bold text-sm">步骤 4: 计算点积</h5>
                  <p className="text-sm text-slate-600">
                    计算归一化后的向量点积（即余弦相似度）。求和并取负作为最终 Loss。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture & Data */}
        <section id="architecture">
          <h2 className="text-3xl font-bold mb-6 flex items-center text-slate-900">
            <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg mr-3">3</span>
            模型架构与数据规模
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Architecture */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h3 className="font-bold text-xl mb-4 text-slate-800">🏗️ 模型架构 (Vanilla ViT)</h3>
              <p className="text-sm text-slate-600 mb-4">EVA 没有使用复杂的层级结构（如 Swin），而是使用了标准的 ViT 巨型架构，这有利于扩展性。</p>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between border-b pb-2">
                  <span>模型参数量</span>
                  <span className="font-mono font-bold">1.0 Billion (10亿)</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>Patch Size</span>
                  <span className="font-mono font-bold">14 x 14</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>层数 (Layers)</span>
                  <span className="font-mono font-bold">40</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>隐藏层维度 (Hidden Dim)</span>
                  <span className="font-mono font-bold">1408</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>注意力头数 (Heads)</span>
                  <span className="font-mono font-bold">16</span>
                </li>
              </ul>
            </div>

            {/* Data */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h3 className="font-bold text-xl mb-4 text-slate-800">💾 预训练数据 (29.6M)</h3>
              <p className="text-sm text-slate-600 mb-4">关键在于只使用<strong>公开可访问</strong>的数据集，不使用私有数据。</p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-200 px-3 py-2 text-left">数据集</th>
                    <th className="border border-slate-200 px-3 py-2 text-left">用途</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-200 px-3 py-2 font-semibold">ImageNet-21K</td>
                    <td className="border border-slate-200 px-3 py-2">学术界标准大规模图像集</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-3 py-2 font-semibold">CC12M & CC3M</td>
                    <td className="border border-slate-200 px-3 py-2">网络爬取的图像（仅使用图像）</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-3 py-2 font-semibold">Object365</td>
                    <td className="border border-slate-200 px-3 py-2">高质量物体检测数据集</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-3 py-2 font-semibold">COCO & ADE20K</td>
                    <td className="border border-slate-200 px-3 py-2">标准视觉任务数据集（仅训练集）</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Training Hyperparameters */}
          <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-xl mb-4 text-slate-800">⚙️ 预训练超参数详情</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-sm text-slate-700 mb-3">训练配置</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between border-b pb-2">
                    <span>训练轮数 (Epochs)</span>
                    <span className="font-mono font-bold text-blue-600">150</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span>Batch Size</span>
                    <span className="font-mono font-bold">4096</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span>输入分辨率</span>
                    <span className="font-mono font-bold">224 × 224</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span>掩码率</span>
                    <span className="font-mono font-bold">40%</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span>Teacher 模型</span>
                    <span className="font-mono font-bold">OpenAI CLIP-L/14</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-700 mb-3">优化器设置</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between border-b pb-2">
                    <span>优化器</span>
                    <span className="font-mono font-bold">AdamW</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span>基础学习率</span>
                    <span className="font-mono font-bold">1.5e-3</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span>Weight Decay</span>
                    <span className="font-mono font-bold">0.05</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span>Warmup Epochs</span>
                    <span className="font-mono font-bold">10</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span>学习率调度</span>
                    <span className="font-mono font-bold">Cosine Decay</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-4 bg-slate-50 p-4 rounded-lg">
              <p className="text-sm text-slate-600">
                <strong>💡 关键发现：</strong>仅需 30M 图像和 150 epochs（约 4.4B 图像总计），就能训练出 SOTA 级别的 1B 参数视觉模型。
                这远少于其他十亿级模型所需的数据量（如 JFT-3B 需要 30 亿带标签图像）。
              </p>
            </div>
          </div>
        </section>

        {/* Experiments */}
        <section id="experiments">
          <h2 className="text-3xl font-bold mb-6 flex items-center text-slate-900">
            <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg mr-3">4</span>
            实验结果：量变引起质变
          </h2>
          
          <p className="mb-6 text-slate-700">EVA 在多个下游任务上刷新了纪录，但最引人注目的发现是关于模型扩展带来的质变。</p>
          
          {/* Comprehensive Results Table */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
            <h3 className="font-bold text-lg mb-4 text-slate-800">📊 全面性能对比（Table 1 from Paper）</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-200 px-3 py-2 text-left">任务</th>
                    <th className="border border-slate-200 px-3 py-2 text-center">之前最佳</th>
                    <th className="border border-slate-200 px-3 py-2 text-center text-blue-700 font-bold">EVA</th>
                    <th className="border border-slate-200 px-3 py-2 text-center text-green-600">提升</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-200 px-3 py-2 font-semibold">ImageNet-1K (Fine-tune)</td>
                    <td className="border border-slate-200 px-3 py-2 text-center">89.6% (BEiT-3)</td>
                    <td className="border border-slate-200 px-3 py-2 text-center font-bold text-blue-700">89.7%</td>
                    <td className="border border-slate-200 px-3 py-2 text-center text-green-600">+0.1</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="border border-slate-200 px-3 py-2 font-semibold">ImageNet-1K (Linear Probe)</td>
                    <td className="border border-slate-200 px-3 py-2 text-center">82.3% (iBOT)</td>
                    <td className="border border-slate-200 px-3 py-2 text-center font-bold text-blue-700">86.5%</td>
                    <td className="border border-slate-200 px-3 py-2 text-center text-green-600 font-bold">+4.2</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-3 py-2 font-semibold">ImageNet-1K (Zero-shot)</td>
                    <td className="border border-slate-200 px-3 py-2 text-center">78.0% (OpenCLIP-H)</td>
                    <td className="border border-slate-200 px-3 py-2 text-center font-bold text-blue-700">78.5%</td>
                    <td className="border border-slate-200 px-3 py-2 text-center text-green-600">+0.5</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-3 py-2 font-semibold">Kinetics-400</td>
                    <td className="border border-slate-200 px-3 py-2 text-center">87.8% (Text4Vis)</td>
                    <td className="border border-slate-200 px-3 py-2 text-center font-bold text-blue-700">89.7%</td>
                    <td className="border border-slate-200 px-3 py-2 text-center text-green-600 font-bold">+1.9</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-3 py-2 font-semibold">Kinetics-600</td>
                    <td className="border border-slate-200 px-3 py-2 text-center">88.3% (MaskFeat)</td>
                    <td className="border border-slate-200 px-3 py-2 text-center font-bold text-blue-700">89.8%</td>
                    <td className="border border-slate-200 px-3 py-2 text-center text-green-600 font-bold">+1.5</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-3 py-2 font-semibold">Kinetics-700</td>
                    <td className="border border-slate-200 px-3 py-2 text-center">80.4%</td>
                    <td className="border border-slate-200 px-3 py-2 text-center font-bold text-blue-700">82.9%</td>
                    <td className="border border-slate-200 px-3 py-2 text-center text-green-600 font-bold">+2.5</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-3 py-2 font-semibold">COCO Detection (test)</td>
                    <td className="border border-slate-200 px-3 py-2 text-center">64.5 (Group DETRv2)</td>
                    <td className="border border-slate-200 px-3 py-2 text-center font-bold text-blue-700">64.7</td>
                    <td className="border border-slate-200 px-3 py-2 text-center text-green-600">+0.2</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-3 py-2 font-semibold">COCO Segmentation (val)</td>
                    <td className="border border-slate-200 px-3 py-2 text-center">54.5 (Mask DINO)</td>
                    <td className="border border-slate-200 px-3 py-2 text-center font-bold text-blue-700">55.0</td>
                    <td className="border border-slate-200 px-3 py-2 text-center text-green-600">+0.5</td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="border border-slate-200 px-3 py-2 font-semibold">LVIS Segmentation</td>
                    <td className="border border-slate-200 px-3 py-2 text-center">49.2 (LVIS 2021 冠军)</td>
                    <td className="border border-slate-200 px-3 py-2 text-center font-bold text-blue-700">55.0</td>
                    <td className="border border-slate-200 px-3 py-2 text-center text-green-600 font-bold">+5.8 🔥</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-3 py-2 font-semibold">COCO-Stuff (Semantic Seg)</td>
                    <td className="border border-slate-200 px-3 py-2 text-center">52.3 (ViT-Adapter)</td>
                    <td className="border border-slate-200 px-3 py-2 text-center font-bold text-blue-700">53.4</td>
                    <td className="border border-slate-200 px-3 py-2 text-center text-green-600">+1.1</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mt-3">
              注：所有结果均使用公开数据 / 学术资源获得。时间戳：2022 年 11 月 10 日。
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Result 1 */}
            <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-lg border border-indigo-100">
              <h4 className="font-bold text-indigo-900 mb-2">🏆 ImageNet-1K 分类</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Fine-tune</span>
                  <span className="text-2xl font-bold text-indigo-600">89.7%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Linear Probe</span>
                  <span className="text-xl font-bold text-indigo-500">86.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Zero-shot</span>
                  <span className="text-xl font-bold text-indigo-500">78.5%</span>
                </div>
              </div>
              <p className="text-sm text-slate-600 mt-3">Linear Probe 提升 <strong>+4.2%</strong>，说明 EVA 学到了更好的通用表示。</p>
            </div>

            {/* Result 2 */}
            <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-lg border border-green-100">
              <h4 className="font-bold text-green-900 mb-2">🎥 视频动作识别 (Kinetics)</h4>
              <div className="flex space-x-4">
                <div>
                  <div className="text-2xl font-bold text-green-600">89.7%</div>
                  <div className="text-xs text-slate-500">Kinetics-400 (+1.9)</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">89.8%</div>
                  <div className="text-xs text-slate-500">Kinetics-600 (+1.5)</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">82.9%</div>
                  <div className="text-xs text-slate-500">Kinetics-700 (+2.5)</div>
                </div>
              </div>
              <p className="text-sm text-slate-600 mt-3">EVA 在视频领域同样出色，无需视频预训练。</p>
            </div>
          </div>

          {/* LVIS vs COCO Breakdown */}
          <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
            <h3 className="text-xl font-bold text-yellow-900 mb-3">🔥 关键发现：LVIS 实例分割的突破</h3>
            <p className="text-slate-700 mb-4">
              通常模型在 <strong>COCO</strong> (80类，常见物体) 上的表现远好于 <strong>LVIS</strong> (1200+类，长尾分布，稀有物体)。
              但是，EVA 展现出了惊人的泛化能力：
            </p>
            <div className="flex flex-col md:flex-row md:items-center justify-around bg-white p-4 rounded shadow-sm">
              <div className="text-center mb-4 md:mb-0">
                <div className="text-sm text-slate-500">COCO val AP<sup>mask</sup></div>
                <div className="text-3xl font-bold text-slate-800">55.0</div>
              </div>
              <div className="text-2xl text-slate-300 font-bold hidden md:block">≈</div>
              <div className="text-center text-red-600 font-bold md:hidden my-2">几乎相等！</div>
              <div className="text-center">
                <div className="text-sm text-slate-500">LVIS val AP<sup>mask</sup></div>
                <div className="text-3xl font-bold text-blue-600">55.0</div>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-4">
              <strong>解释：</strong> 这种"几乎消除差距"的现象表明，当模型规模（EVA 1B）和预训练质量（通过学习 CLIP 特征）达到一定程度时，模型获得了强大的<strong>语义泛化能力</strong>，能够像处理常见物体一样处理长尾/稀有物体。这就是论文所说的"量变引起质变"。
            </p>
          </div>

          {/* Emergent Abilities */}
          <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
            <h3 className="text-xl font-bold text-purple-900 mb-4">🌟 量变引起质变：涌现能力分析</h3>
            <p className="text-slate-700 mb-4">
              论文的一个核心发现是：<strong>扩大 EVA 规模会带来其他模型没有的质变</strong>。这种"涌现能力"类似于大语言模型中观察到的现象。
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold text-slate-800 mb-2">📈 LVIS 长尾识别</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• 之前最佳：49.2 AP（LVIS 2021 竞赛冠军）</li>
                  <li>• EVA：<strong>55.0 AP (+5.8)</strong></li>
                  <li>• COCO vs LVIS 差距：<strong>从 ~6 AP 降到 0</strong></li>
                </ul>
                <p className="text-xs text-purple-600 mt-2">长尾问题几乎被"解决"</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold text-slate-800 mb-2">🎯 为什么会发生？</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• CLIP 特征包含丰富的语义先验</li>
                  <li>• 1B 参数提供足够的表示能力</li>
                  <li>• MIM 学习了强大的视觉结构</li>
                  <li>• 三者结合产生"涌现"效果</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* EVA-CLIP */}
        <section id="evaclip">
          <h2 className="text-3xl font-bold mb-6 flex items-center text-slate-900">
            <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg mr-3">5</span>
            EVA 作为多模态枢纽 (EVA-CLIP)
          </h2>
          <div className="prose max-w-none text-slate-700">
            <p>
              EVA 不仅仅是一个视觉编码器，它还可以作为多模态模型的<strong>初始化权重</strong>。
            </p>
            <p>
              论文提出了 <strong>EVA-CLIP</strong>：
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>方法：</strong> 使用预训练好的 EVA 初始化 CLIP 的视觉塔（Vision Tower）。</li>
              <li><strong>优势：</strong>
                <ul className="pl-4 list-disc mt-2 space-y-1">
                  <li><strong>训练更稳定：</strong> 避免了从头训练大模型时的发散问题。</li>
                  <li><strong>收敛更快：</strong> 极大地减少了需要的计算资源和样本数量。</li>
                  <li><strong>性能更强：</strong> 即使训练数据量少于 OpenCLIP-H (2B vs 1.1B 参数)，EVA-CLIP 在零样本分类上也取得了更好的效果。</li>
                </ul>
              </li>
            </ul>
          </div>

          {/* EVA-CLIP Details */}
          <div className="mt-6 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-lg mb-4 text-slate-800">📊 EVA-CLIP 详细对比</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-200 px-3 py-2 text-left">模型</th>
                    <th className="border border-slate-200 px-3 py-2 text-center">视觉参数</th>
                    <th className="border border-slate-200 px-3 py-2 text-center">训练数据</th>
                    <th className="border border-slate-200 px-3 py-2 text-center">ImageNet 0-shot</th>
                    <th className="border border-slate-200 px-3 py-2 text-center">平均 0-shot</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-200 px-3 py-2">OpenAI CLIP-L/14</td>
                    <td className="border border-slate-200 px-3 py-2 text-center">0.3B</td>
                    <td className="border border-slate-200 px-3 py-2 text-center">400M (私有)</td>
                    <td className="border border-slate-200 px-3 py-2 text-center">75.5%</td>
                    <td className="border border-slate-200 px-3 py-2 text-center">-</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-3 py-2">OpenCLIP-H</td>
                    <td className="border border-slate-200 px-3 py-2 text-center">1.0B</td>
                    <td className="border border-slate-200 px-3 py-2 text-center">2B (LAION)</td>
                    <td className="border border-slate-200 px-3 py-2 text-center">78.0%</td>
                    <td className="border border-slate-200 px-3 py-2 text-center">73.1%</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="border border-slate-200 px-3 py-2 font-bold text-blue-700">EVA-CLIP</td>
                    <td className="border border-slate-200 px-3 py-2 text-center font-bold">1.0B</td>
                    <td className="border border-slate-200 px-3 py-2 text-center font-bold text-green-600">1.1B (LAION)</td>
                    <td className="border border-slate-200 px-3 py-2 text-center font-bold text-blue-700">78.5%</td>
                    <td className="border border-slate-200 px-3 py-2 text-center font-bold text-blue-700">75.7%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-sm text-green-800">
                <strong>💡 关键发现：</strong>EVA-CLIP 使用的训练数据（1.1B）比 OpenCLIP-H（2B）少 <strong>45%</strong>，
                但在 ImageNet 零样本和 12 个数据集平均零样本上都取得了更好的性能。这证明了 EVA 作为初始化权重的巨大价值。
              </p>
            </div>
          </div>

          {/* EVA-CLIP Advantages */}
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="text-2xl mb-2">🔒</div>
              <h4 className="font-bold text-blue-800 mb-1">训练更稳定</h4>
              <p className="text-sm text-slate-600">避免从头训练大模型时的发散问题</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="text-2xl mb-2">⚡</div>
              <h4 className="font-bold text-green-800 mb-1">收敛更快</h4>
              <p className="text-sm text-slate-600">极大减少计算资源和样本数量</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="text-2xl mb-2">🏆</div>
              <h4 className="font-bold text-purple-800 mb-1">性能更强</h4>
              <p className="text-sm text-slate-600">零样本分类超越 OpenCLIP-H</p>
            </div>
          </div>

          {/* Why EVA works for CLIP */}
          <div className="mt-6 bg-amber-50 p-6 rounded-xl border border-amber-200">
            <h3 className="font-bold text-lg mb-3 text-amber-900">🔄 为什么 EVA 能加速 CLIP 训练？</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-bold text-slate-800 mb-2">EVA 的预训练目标</h4>
                <p className="text-slate-600">
                  EVA 学习预测 CLIP 的视觉特征，这意味着 EVA 已经"理解"了 CLIP 的表示空间。
                  当用 EVA 初始化 CLIP 的视觉塔时，模型已经处于一个良好的初始状态。
                </p>
              </div>
              <div>
                <h4 className="font-bold text-slate-800 mb-2">收敛优势</h4>
                <p className="text-slate-600">
                  从 EVA 开始训练，模型只需学习文本-图像对齐的微调，而不是从随机初始化开始学习所有视觉特征。
                  这大大减少了所需的训练样本和计算量。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mt-16 pt-10 border-t border-slate-200">
          <h3 className="text-2xl font-bold mb-4 text-slate-900">总结</h3>
          <div className="bg-slate-100 p-6 rounded-xl">
            <p className="mb-4 text-slate-700">
              EVA 证明了：<strong>简单的架构（Vanilla ViT）+ 正确的预训练目标（Masked CLIP Feature Prediction）+ 足够的公开数据 = SOTA 性能。</strong>
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <a 
                href="https://arxiv.org/abs/2211.07636" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
              >
                阅读论文 (arXiv)
                <ExternalLink size={14} />
              </a>
              <a 
                href="https://github.com/baaivision/EVA" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition text-sm"
              >
                GitHub 仓库
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
          <p className="text-slate-500 text-sm mt-4">
            Based on arXiv:2211.07636v2
          </p>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-6 text-center text-sm">
          <p>EVA: Exploring the Limits of Masked Visual Representation Learning at Scale</p>
          <p className="mt-1">BAAI (北京智源人工智能研究院) • CVPR 2022</p>
        </div>
      </footer>
    </div>
  );
};

export default EVA;

