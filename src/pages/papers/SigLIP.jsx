import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const SigLIP = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-700" style={{ fontFamily: "'Segoe UI', 'Microsoft YaHei', sans-serif", lineHeight: 1.7 }}>
      {/* Hero Section */}
      <div className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <svg className="absolute bottom-0 right-0 transform translate-x-1/3 translate-y-1/4 opacity-10" width="404" height="404" fill="none" viewBox="0 0 404 404">
            <rect width="404" height="404" fill="currentColor" />
          </svg>
        </div>
        <div className="relative max-w-5xl mx-auto py-20 px-6 lg:px-8 text-center">
          {/* Back Button */}
          <Link 
            to="/" 
            className="absolute left-6 top-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>返回首页</span>
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Sigmoid Loss for Language Image Pre-Training
          </h1>
          <p className="text-xl md:text-2xl font-light text-slate-300 max-w-3xl mx-auto">
            SigLIP：用更简单的 Sigmoid 损失重新定义多模态预训练
          </p>
          <div className="mt-8 flex justify-center gap-4 text-sm font-medium flex-wrap">
            <span className="bg-blue-600 px-4 py-1.5 rounded-full shadow-lg">ICCV 2023</span>
            <span className="bg-slate-700 px-4 py-1.5 rounded-full shadow-lg">Google DeepMind</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Abstract */}
        <section className="bg-white rounded-2xl shadow-md p-8 mb-8 border-t-4 border-blue-500">
          <h2 className="text-2xl font-bold mb-4 text-slate-900 flex items-center">
            <span className="w-1.5 h-6 bg-blue-500 rounded mr-3"></span>
            核心摘要
          </h2>
          <p className="mb-4 text-slate-700">
            本文提出了 <strong>Sigmoid 损失 (SigLIP)</strong> 来替代标准的 Softmax 对比学习损失（如 CLIP）。SigLIP 将对比学习问题重新定义为成对的二分类问题。
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="font-bold text-blue-800 mb-2">🚀 核心优势</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                <li><strong>内存解耦：</strong> 显存消耗不再随全局 Batch Size 平方增长。</li>
                <li><strong>极速训练：</strong> 仅需 4 个 TPUv4 芯片，2 天即可达到 84.5% ImageNet 0-shot 准确率。</li>
                <li><strong>小 Batch 友好：</strong> 在 32k Batch Size 以下显著优于 Softmax。</li>
              </ul>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="font-bold text-blue-800 mb-2">📊 关键结论</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                <li><strong>Batch Size 饱和：</strong> 即使支持 100 万 Batch，性能在 <strong>32k</strong> 左右就已饱和。</li>
                <li><strong>鲁棒性：</strong> 对标签噪声（Label Noise）有更强的抵抗力。</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Softmax vs Sigmoid Comparison */}
        <section className="bg-white rounded-2xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-slate-900 flex items-center">
            <span className="w-1.5 h-6 bg-blue-500 rounded mr-3"></span>
            1. Softmax vs Sigmoid：从公式到本质差异
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Softmax Loss */}
            <div className="bg-red-50 p-6 rounded-xl border border-red-200">
              <h3 className="text-lg font-bold text-red-800 mb-3">❌ 传统 Softmax 对比损失 (CLIP)</h3>
              <div className="bg-white p-4 rounded-lg mb-4 overflow-x-auto">
                <BlockMath math="L_{\text{softmax}} = -\frac{1}{B}\sum_{i=1}^{B} \log \frac{e^{x_i \cdot y_i / \tau}}{\sum_{j=1}^{B} e^{x_i \cdot y_j / \tau}}" />
              </div>
              <ul className="text-sm text-red-700 space-y-2">
                <li>⚠️ <strong>全局归一化</strong>：分母需要所有负样本的相似度求和</li>
                <li>⚠️ <strong>数值稳定性</strong>：需要减去最大值防止溢出，额外一次遍历</li>
                <li>⚠️ <strong>分布式通信</strong>：需要 <code className="bg-red-100 px-1 rounded">AllGather</code> 收集所有设备的 Embedding</li>
                <li>⚠️ <strong>内存 O(B²)</strong>：必须存储完整的相似度矩阵</li>
              </ul>
            </div>
            
            {/* Sigmoid Loss */}
            <div className="bg-green-50 p-6 rounded-xl border border-green-200">
              <h3 className="text-lg font-bold text-green-800 mb-3">✅ Sigmoid 对比损失 (SigLIP)</h3>
              <div className="bg-white p-4 rounded-lg mb-4 overflow-x-auto">
                <BlockMath math="L_{\text{sigmoid}} = -\frac{1}{B^2}\sum_{i,j} \log \sigma(z_{ij} \cdot (t \cdot x_i \cdot y_j + b))" />
              </div>
              <ul className="text-sm text-green-700 space-y-2">
                <li>✅ <strong>独立二分类</strong>：每对样本独立计算，无需全局视图</li>
                <li>✅ <strong>天然稳定</strong>：Sigmoid 输出在 (0,1) 之间，无需额外稳定化</li>
                <li>✅ <strong>简化通信</strong>：可分块计算，只需局部 Embedding</li>
                <li>✅ <strong>内存可控</strong>：分块后仅需 O(b²)，b 为 chunk 大小</li>
              </ul>
            </div>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
            <p className="text-sm text-amber-900">
              <strong>🔑 核心洞察：</strong>Softmax 强制所有样本的预测概率加和为 1（互斥关系），而 Sigmoid 对每一对独立打分（共存关系）。
              这意味着 Sigmoid 可以同时认为多个样本都是正样本，更符合真实世界中"一图多描述"的情况。
            </p>
          </div>
        </section>

        {/* Method: Deep Dive */}
        <section className="bg-white rounded-2xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-slate-900 flex items-center">
            <span className="w-1.5 h-6 bg-blue-500 rounded mr-3"></span>
            2. 详解 Sigmoid 损失公式与参数
          </h2>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500 my-6 overflow-x-auto">
            <BlockMath math="L = -\frac{1}{|B|^2} \sum_{i=1}^{|B|} \sum_{j=1}^{|B|} \log \frac{1}{1 + e^{z_{ij}(-t \cdot x_i \cdot y_j - b)}}" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-slate-50 p-4 rounded-lg">
              <h4 className="font-bold text-slate-800 mb-2 flex items-center">
                <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded mr-2">z_ij</span>
                标签 (Ground Truth)
              </h4>
              <p className="text-sm text-slate-600">
                正样本对（<InlineMath math="i=j" />）：<InlineMath math="z_{ij} = 1" /><br/>
                负样本对（<InlineMath math="i \neq j" />）：<InlineMath math="z_{ij} = -1" />
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <h4 className="font-bold text-slate-800 mb-2 flex items-center">
                <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded mr-2">t</span>
                温度参数 (Learnable)
              </h4>
              <p className="text-sm text-slate-600">
                可学习的缩放因子，控制 Logits 的尖锐程度。初始化为 <InlineMath math="t = e^{\log 10} = 10" />
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <h4 className="font-bold text-slate-800 mb-2 flex items-center">
                <span className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded mr-2">b</span>
                偏置项 (Learnable)
              </h4>
              <p className="text-sm text-slate-600">
                可学习的偏移量，初始化为 <InlineMath math="b = -10" />，强制初始预测倾向于"不匹配"
              </p>
            </div>
          </div>
        </section>

        {/* Critical: Initialization Deep Dive */}
        <section className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-md p-8 mb-8 border border-red-200">
          <h2 className="text-2xl font-bold mb-6 text-red-900 flex items-center">
            <span className="w-1.5 h-6 bg-red-500 rounded mr-3"></span>
            3. 🚨 为什么初始化极其重要？（深度剖析）
          </h2>
          
          <div className="bg-white p-6 rounded-xl mb-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">问题根源：正负样本极度不平衡</h3>
            <p className="text-slate-700 mb-4">
              在一个 Batch Size = B 的训练批次中，相似度矩阵的维度是 <InlineMath math="B \times B" />：
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-green-800 font-medium">✅ 正样本对数量</p>
                <p className="text-3xl font-bold text-green-600"><InlineMath math="B" /></p>
                <p className="text-sm text-green-700">（对角线上的 B 对）</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <p className="text-red-800 font-medium">❌ 负样本对数量</p>
                <p className="text-3xl font-bold text-red-600"><InlineMath math="B^2 - B" /></p>
                <p className="text-sm text-red-700">（非对角线的所有对）</p>
              </div>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-300">
              <p className="text-amber-900">
                <strong>📊 数值示例：</strong>当 <InlineMath math="B = 32000" /> 时：
              </p>
              <ul className="text-sm text-amber-800 mt-2">
                <li>• 正样本：32,000 对</li>
                <li>• 负样本：32,000² - 32,000 = <strong>1,023,968,000 对</strong>（超过 10 亿！）</li>
                <li>• 负正比例：<strong>31,999 : 1</strong></li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl mb-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">灾难场景：随机初始化会发生什么？</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="bg-red-500 text-white text-sm px-2 py-1 rounded shrink-0">Step 1</span>
                <div>
                  <p className="text-slate-700">
                    随机初始化时，<InlineMath math="x_i \cdot y_j \approx 0" />（L2 归一化后的随机向量近乎正交）。
                    如果 <InlineMath math="b = 0, t = 1" />，则 Logit = 0，Sigmoid 输出 = 0.5。
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="bg-red-500 text-white text-sm px-2 py-1 rounded shrink-0">Step 2</span>
                <div>
                  <p className="text-slate-700">
                    模型预测所有 <InlineMath math="B^2" /> 个配对都有 <strong>50% 概率是正样本</strong>。
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="bg-red-500 text-white text-sm px-2 py-1 rounded shrink-0">Step 3</span>
                <div>
                  <p className="text-slate-700">
                    但实际上只有 <InlineMath math="B" /> 个是正样本！模型对 <InlineMath math="B^2 - B" /> 个负样本都预测错误（假阳性）。
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="bg-red-600 text-white text-sm px-2 py-1 rounded shrink-0">💥 结果</span>
                <div>
                  <p className="text-red-700 font-medium">
                    初始 Loss 爆炸 → 梯度爆炸 → 训练直接崩溃或收敛极慢
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl">
            <h3 className="text-lg font-bold text-slate-800 mb-4">🎯 解决方案：先验偏置初始化</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-bold text-blue-800 mb-2">Bias <InlineMath math="b = -10" /></h4>
                <p className="text-sm text-slate-700 mb-2">
                  强制初始 Logit 为负值：<InlineMath math="\text{logit} = t \cdot 0 + b = -10" />
                </p>
                <p className="text-sm text-slate-700">
                  Sigmoid(-10) ≈ 0.00005，即模型初始预测"所有配对都不匹配"
                </p>
                <p className="text-xs text-blue-600 mt-2 font-medium">
                  ✅ 这符合真实分布：绝大多数配对确实不匹配！
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-bold text-purple-800 mb-2">Temperature <InlineMath math="t' = \log 10" /></h4>
                <p className="text-sm text-slate-700 mb-2">
                  实际温度 <InlineMath math="t = e^{t'} = 10" />（用 log 参数化确保 t &gt; 0）
                </p>
                <p className="text-sm text-slate-700">
                  较大的初始温度让分布更平滑，避免训练初期的过度自信
                </p>
                <p className="text-xs text-purple-600 mt-2 font-medium">
                  ✅ 随着训练进行，t 会自动调整到合适的值
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Training Recipe & Tricks */}
        <section className="bg-slate-100 rounded-2xl shadow-md p-8 mb-8 border border-slate-200">
          <h2 className="text-2xl font-bold mb-6 text-slate-800 flex items-center">
            <span className="w-1.5 h-6 bg-blue-500 rounded mr-3"></span>
            4. 关键训练技巧与稳定性 (Recipe)
          </h2>
          <p className="text-slate-600 mb-6">论文不仅仅提出了 Loss，还分享了许多使得大模型训练更稳定、更高效的工程技巧。</p>
          
          {/* Weight Decay Deep Dive */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-red-200 mb-6">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">🚫</span>
              <h3 className="text-xl font-bold text-red-800">为什么必须禁用 Weight Decay？（深度剖析）</h3>
            </div>
            
            <div className="mb-6">
              <h4 className="font-bold text-slate-800 mb-2">背景：SigLiT (Locked-image Tuning)</h4>
              <p className="text-sm text-slate-700 mb-3">
                SigLiT 是一种高效的训练策略：<strong>冻结预训练好的视觉编码器</strong>（如 ViT-g/14），只训练文本编码器和对齐层。
                这样可以用极少的计算资源（4 个 TPUv4 芯片）达到 84.5% ImageNet 零样本准确率。
              </p>
              <div className="bg-slate-50 p-3 rounded-lg">
                <p className="text-xs text-slate-600 font-mono">
                  SigLiT = Sigmoid Loss + Locked-image Tuning（冻结图像编码器 + 训练文本编码器）
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-bold text-red-800 mb-2">❌ 启用 Weight Decay 的后果</h4>
                <p className="text-sm text-slate-700 mb-2">
                  Weight Decay 的本质是在每一步将权重向 0 推：
                </p>
                <div className="bg-white p-2 rounded text-sm overflow-x-auto">
                  <BlockMath math="W_{t+1} = W_t - \eta \nabla L - \lambda W_t" />
                </div>
                <ul className="text-sm text-red-700 mt-3 space-y-1">
                  <li>• 预训练权重包含丰富的视觉特征</li>
                  <li>• Weight Decay 会逐渐将这些权重"衰减"为 0</li>
                  <li>• 即使冻结梯度，WD 仍会生效！</li>
                  <li className="font-medium">• 结果：特征表示能力迅速退化</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-bold text-green-800 mb-2">✅ 正确做法：禁用 WD</h4>
                <p className="text-sm text-slate-700 mb-2">
                  对于冻结的预训练编码器，应当：
                </p>
                <ul className="text-sm text-green-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>禁用 Weight Decay（设置 <code className="bg-green-100 px-1 rounded">wd=0</code>）</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>保持冻结状态（设置 <code className="bg-green-100 px-1 rounded">requires_grad=False</code>）</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>只对新初始化的参数（文本编码器）应用 WD</span>
                  </li>
                </ul>
                <p className="text-xs text-green-600 mt-3 font-medium">
                  论文实验：禁用 WD 后，性能提升 2-3%
                </p>
              </div>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg border border-amber-300">
              <p className="text-sm text-amber-900">
                <strong>⚠️ 常见误解：</strong>很多人认为"冻结 = 完全不变"，但 Weight Decay 是直接作用于权重的正则化，
                即使没有梯度更新，AdamW 的 WD 项仍会修改权重。这是使用 AdamW 时的重要陷阱！
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Trick 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-2">⚖️</span>
                <h3 className="font-bold text-slate-800">训练稳定性：调整 AdamW β₂</h3>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                在大 Batch Size 训练中，梯度范数可能会出现尖峰（Spikes）。论文建议：
              </p>
              <div className="bg-slate-50 p-3 rounded-lg mb-3">
                <p className="text-sm font-mono text-slate-700">
                  <InlineMath math="\beta_2" />: 0.999 → <strong className="text-blue-600">0.95</strong>
                </p>
              </div>
              <p className="text-sm text-slate-600">
                <strong>原理：</strong><InlineMath math="\beta_2" /> 控制二阶矩估计的指数衰减率。
                较小的 <InlineMath math="\beta_2" /> 意味着更短的"记忆"，能更快适应梯度变化，从尖峰中快速恢复。
              </p>
              <p className="text-xs text-green-600 mt-2 font-medium">✅ 显著减少训练不稳定性</p>
            </div>
            
            {/* Trick 3: Chunked Implementation */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-2">🧩</span>
                <h3 className="font-bold text-slate-800">内存优化：分块实现 (Chunked)</h3>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                Sigmoid Loss 的一个关键优势是<strong>可加性</strong>：总损失 = 各块损失之和。
              </p>
              <div className="bg-slate-50 p-3 rounded-lg mb-3 overflow-x-auto">
                <BlockMath math="L = \sum_{c_i} \sum_{c_j} L_{c_i, c_j}" />
              </div>
              <p className="text-sm text-slate-600 mb-2">
                将 B×B 矩阵分成多个 b×b 小块，逐块计算并累加：
              </p>
              <div className="flex items-center justify-center gap-4 text-sm">
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded">内存 O(B²)</span>
                <span className="text-slate-400">→</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded">内存 O(b²)</span>
              </div>
              <p className="text-xs text-slate-500 mt-3">
                例：B=32k, b=4k → 内存减少 64 倍！
              </p>
            </div>
          </div>
        </section>

        {/* SigLIP vs SigLiT */}
        <section className="bg-white rounded-2xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-slate-900 flex items-center">
            <span className="w-1.5 h-6 bg-blue-500 rounded mr-3"></span>
            5. SigLIP vs SigLiT：两种训练范式
          </h2>
          
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="px-4 py-3 text-left font-semibold">特性</th>
                  <th className="px-4 py-3 text-left font-semibold text-blue-700">SigLIP（从头训练）</th>
                  <th className="px-4 py-3 text-left font-semibold text-purple-700">SigLiT（锁定图像调优）</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-3 font-medium">图像编码器</td>
                  <td className="px-4 py-3">随机初始化，完全训练</td>
                  <td className="px-4 py-3">使用预训练权重，冻结</td>
                </tr>
                <tr className="border-b bg-slate-50">
                  <td className="px-4 py-3 font-medium">文本编码器</td>
                  <td className="px-4 py-3">随机初始化，完全训练</td>
                  <td className="px-4 py-3">随机初始化，完全训练</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3 font-medium">计算资源</td>
                  <td className="px-4 py-3">较高（32 TPUv4, 5天）</td>
                  <td className="px-4 py-3 text-green-700 font-medium">极低（4 TPUv4, 2天）</td>
                </tr>
                <tr className="border-b bg-slate-50">
                  <td className="px-4 py-3 font-medium">ImageNet 0-shot</td>
                  <td className="px-4 py-3">73.4%（B/16）</td>
                  <td className="px-4 py-3 text-green-700 font-medium">84.5%（g/14）</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">适用场景</td>
                  <td className="px-4 py-3">资源充足，需要完全控制</td>
                  <td className="px-4 py-3">资源有限，快速迭代</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <p className="text-sm text-purple-900">
              <strong>💡 SigLiT 的价值：</strong>证明了高质量预训练视觉编码器的知识可以通过简单的对齐训练迁移到新的文本空间。
              这为资源受限的研究者提供了一条可行的路径，无需从头训练 ViT。
            </p>
          </div>
        </section>

        {/* Batch Size Study */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-md p-8 mb-8 border border-blue-200">
          <h2 className="text-2xl font-bold mb-6 text-blue-900 flex items-center">
            <span className="w-1.5 h-6 bg-blue-500 rounded mr-3"></span>
            6. Batch Size 深度研究：32k 是甜蜜点
          </h2>
          
          <p className="text-slate-700 mb-6">
            论文将 Batch Size 推到了极限（100 万），揭示了一个重要发现：<strong>更大的 Batch Size 并不总是更好</strong>。
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg text-center">
              <p className="text-4xl font-bold text-blue-600">32k</p>
              <p className="text-sm text-slate-600 mt-1">最佳 Batch Size</p>
              <p className="text-xs text-slate-500">性能接近饱和</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <p className="text-4xl font-bold text-green-600">&lt;16k</p>
              <p className="text-sm text-slate-600 mt-1">Sigmoid 显著优于 Softmax</p>
              <p className="text-xs text-slate-500">小 Batch 场景首选</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <p className="text-4xl font-bold text-amber-600">1M</p>
              <p className="text-sm text-slate-600 mt-1">极限测试</p>
              <p className="text-xs text-slate-500">几乎无额外收益</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl">
            <h3 className="font-bold text-slate-800 mb-3">关键实验发现</h3>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start">
                <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded mr-2 mt-0.5">1</span>
                <span><strong>Sigmoid 在小 Batch 时优势明显：</strong>Batch Size &lt; 16k 时，Sigmoid 显著优于 Softmax，差距可达 2-3%</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded mr-2 mt-0.5">2</span>
                <span><strong>大 Batch 时两者趋同：</strong>Batch Size &gt; 32k 后，Sigmoid 和 Softmax 性能差异缩小</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded mr-2 mt-0.5">3</span>
                <span><strong>收益递减：</strong>从 32k 到 1M，ImageNet 0-shot 仅提升约 0.5%，不值得额外的计算成本</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded mr-2 mt-0.5">4</span>
                <span><strong>负正比例研究：</strong>固定正样本数量，增加负样本（更大 Batch）的边际效益很小</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Multilingual & Robustness */}
        <section className="bg-white rounded-2xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-slate-900 flex items-center">
            <span className="w-1.5 h-6 bg-blue-500 rounded mr-3"></span>
            7. 多语言扩展 (mSigLIP) 与 数据噪声鲁棒性
          </h2>
          
          <div className="space-y-8">
            {/* Multilingual */}
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                多语言预训练 (mSigLIP)
              </h3>
              <p className="text-slate-600 mb-4">
                模型在 WebLI 数据集的 <strong>100+ 种语言</strong>子集上进行了训练，覆盖 36 种语言的评测基准 Crossmodal-3600。
              </p>
              
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 mb-4">
                <h4 className="font-bold text-blue-800 mb-3">🔧 Bottleneck 技巧：解决大词汇表内存问题</h4>
                <p className="text-sm text-slate-700 mb-3">
                  多语言需要巨大的词汇表（250k tokens），直接使用会导致 Embedding 层参数爆炸：
                </p>
                <div className="bg-white p-3 rounded-lg mb-3 overflow-x-auto">
                  <BlockMath math="\text{参数量} = V \times D = 250000 \times 1024 \approx 256M" />
                </div>
                <p className="text-sm text-slate-700 mb-2">
                  <strong>解决方案：</strong>引入 Bottleneck 维度 <InlineMath math="K" />（如 K=96）：
                </p>
                <div className="bg-white p-3 rounded-lg overflow-x-auto">
                  <BlockMath math="E_{\text{new}} = E_{V \times K} \cdot W_{K \times D}" />
                </div>
                <p className="text-sm text-slate-600 mt-2">
                  参数量：250k × 96 + 96 × 1024 ≈ <strong>24M + 98k</strong>（减少 10 倍！）
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded text-sm text-green-900">
                <strong>📊 实验发现：</strong>即使在多语言环境下，Batch Size 超过 <strong>32k</strong> 也没有带来明显的性能提升。
                这再次验证了 32k 是对比学习的"甜蜜点"。
              </div>
            </div>

            {/* Robustness */}
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                数据噪声鲁棒性
              </h3>
              <p className="text-slate-600 mb-4">
                网络抓取的图像-文本对通常包含大量噪声（图文不符）。论文通过人为添加噪声来测试模型鲁棒性：
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="bg-slate-50 p-4 rounded-lg text-center">
                  <p className="text-2xl mb-1">🖼️</p>
                  <p className="font-medium text-slate-700">替换图像</p>
                  <p className="text-xs text-slate-500">随机替换 Batch 中的图像</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg text-center">
                  <p className="text-2xl mb-1">📝</p>
                  <p className="font-medium text-slate-700">替换文本</p>
                  <p className="text-xs text-slate-500">随机替换 Batch 中的文本</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg text-center">
                  <p className="text-2xl mb-1">🔀</p>
                  <p className="font-medium text-slate-700">打乱配对</p>
                  <p className="text-xs text-slate-500">随机打乱图文对应关系</p>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-sm text-green-900 mb-2">
                  <strong>✅ 结果：Sigmoid Loss 在所有噪声设置下均优于 Softmax Loss</strong>
                </p>
                <p className="text-sm text-slate-700">
                  <strong>原因分析：</strong>Sigmoid 对每一对独立打分，不会像 Softmax 那样被强制归一化影响。
                  Softmax 必须在所有负样本中找到一个"最像正样本"的，当存在噪声时容易被误导；
                  而 Sigmoid 只关心当前这一对是否匹配，对其他样本的噪声不敏感。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SOTA Comparison */}
        <section className="bg-white rounded-2xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-slate-900 flex items-center">
            <span className="w-1.5 h-6 bg-blue-500 rounded mr-3"></span>
            8. 与 SOTA 模型的性能对比
          </h2>
          <p className="text-slate-600 mb-6">以下是论文中的关键实验结果对比（来自 Table 1 和 Table 3）。</p>
          
          {/* SigLiT Results Table */}
          <h3 className="text-lg font-bold text-slate-800 mb-3">SigLiT & SigLIP 核心结果（Table 1）</h3>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full text-sm text-left border-collapse">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-3 font-semibold">方法</th>
                  <th className="px-4 py-3 font-semibold">图像编码器</th>
                  <th className="px-4 py-3 font-semibold">文本编码器</th>
                  <th className="px-4 py-3 font-semibold">Batch Size</th>
                  <th className="px-4 py-3 font-semibold">#TPUv4</th>
                  <th className="px-4 py-3 font-semibold">天数</th>
                  <th className="px-4 py-3 font-semibold">ImageNet 0-shot</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-purple-50 border-b border-purple-100">
                  <td className="px-4 py-3 font-medium text-purple-700">SigLiT</td>
                  <td className="px-4 py-3">⊗ B/8 (冻结)</td>
                  <td className="px-4 py-3">L*</td>
                  <td className="px-4 py-3">32k</td>
                  <td className="px-4 py-3 font-bold text-green-600">4</td>
                  <td className="px-4 py-3">1</td>
                  <td className="px-4 py-3 font-bold">79.8%</td>
                </tr>
                <tr className="bg-purple-50 border-b border-purple-100">
                  <td className="px-4 py-3 font-medium text-purple-700">SigLiT</td>
                  <td className="px-4 py-3">⊗ g/14 (冻结)</td>
                  <td className="px-4 py-3">L</td>
                  <td className="px-4 py-3">20k</td>
                  <td className="px-4 py-3 font-bold text-green-600">4</td>
                  <td className="px-4 py-3">2</td>
                  <td className="px-4 py-3 font-bold text-green-600">84.5%</td>
                </tr>
                <tr className="bg-blue-50 border-b border-blue-100">
                  <td className="px-4 py-3 font-medium text-blue-700">SigLIP</td>
                  <td className="px-4 py-3">⊗ B/16 (冻结)</td>
                  <td className="px-4 py-3">B</td>
                  <td className="px-4 py-3">16k</td>
                  <td className="px-4 py-3">16</td>
                  <td className="px-4 py-3">3</td>
                  <td className="px-4 py-3">71.0%</td>
                </tr>
                <tr className="bg-blue-50 border-b border-blue-100">
                  <td className="px-4 py-3 font-medium text-blue-700">SigLIP</td>
                  <td className="px-4 py-3">B/16 (训练)</td>
                  <td className="px-4 py-3">B</td>
                  <td className="px-4 py-3">32k</td>
                  <td className="px-4 py-3">32</td>
                  <td className="px-4 py-3">2</td>
                  <td className="px-4 py-3">72.1%</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="px-4 py-3 font-medium text-blue-700">SigLIP</td>
                  <td className="px-4 py-3">B/16 (训练)</td>
                  <td className="px-4 py-3">B</td>
                  <td className="px-4 py-3">32k</td>
                  <td className="px-4 py-3">32</td>
                  <td className="px-4 py-3">5</td>
                  <td className="px-4 py-3">73.4%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mb-6">* L* 是 12 层变体。⊗ 表示使用预训练权重，冻结不更新。</p>

          {/* Comparison with SOTA */}
          <h3 className="text-lg font-bold text-slate-800 mb-3">与其他 SOTA 模型对比</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border-collapse">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-3 font-semibold">模型</th>
                  <th className="px-4 py-3 font-semibold">架构</th>
                  <th className="px-4 py-3 font-semibold">分辨率</th>
                  <th className="px-4 py-3 font-semibold">ImageNet</th>
                  <th className="px-4 py-3 font-semibold">ImageNet-v2</th>
                  <th className="px-4 py-3 font-semibold">COCO I2T</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b">
                  <td className="px-4 py-3 font-medium text-gray-900">OpenAI CLIP</td>
                  <td className="px-4 py-3">L/14</td>
                  <td className="px-4 py-3">224</td>
                  <td className="px-4 py-3">75.5%</td>
                  <td className="px-4 py-3">69.8%</td>
                  <td className="px-4 py-3">56.3%</td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-4 py-3 font-medium text-gray-900">OpenCLIP</td>
                  <td className="px-4 py-3">L/14</td>
                  <td className="px-4 py-3">224</td>
                  <td className="px-4 py-3">74.0%</td>
                  <td className="px-4 py-3">66.6%</td>
                  <td className="px-4 py-3">46.1%</td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-4 py-3 font-medium text-gray-500">EVA-CLIP</td>
                  <td className="px-4 py-3">L/14</td>
                  <td className="px-4 py-3">196</td>
                  <td className="px-4 py-3">79.8%</td>
                  <td className="px-4 py-3">72.2%</td>
                  <td className="px-4 py-3">63.7%</td>
                </tr>
                <tr className="bg-blue-50 border-b border-blue-100">
                  <td className="px-4 py-3 font-bold text-blue-700">SigLIP</td>
                  <td className="px-4 py-3 font-medium">L/16</td>
                  <td className="px-4 py-3">256</td>
                  <td className="px-4 py-3 font-bold">80.5%</td>
                  <td className="px-4 py-3 font-bold">73.0%</td>
                  <td className="px-4 py-3 font-bold">69.5%</td>
                </tr>
                <tr className="bg-blue-50 border-b border-blue-100">
                  <td className="px-4 py-3 font-bold text-blue-700">SigLIP</td>
                  <td className="px-4 py-3 font-medium">L/16</td>
                  <td className="px-4 py-3">384</td>
                  <td className="px-4 py-3 font-bold text-green-600">82.0%</td>
                  <td className="px-4 py-3 font-bold">74.9%</td>
                  <td className="px-4 py-3 font-bold">70.2%</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="px-4 py-3 font-bold text-green-700">SigLIP</td>
                  <td className="px-4 py-3 font-medium">SO-400M</td>
                  <td className="px-4 py-3">224</td>
                  <td className="px-4 py-3 font-bold">81.1%</td>
                  <td className="px-4 py-3 font-bold">73.8%</td>
                  <td className="px-4 py-3 font-bold">66.2%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3 text-right">注：SO-400M (Shape-Optimized 400M) 是高效架构，参数量仅 400M 但性能优异。</p>
        </section>

        {/* Conclusion */}
        <section className="text-center py-12 bg-slate-100 rounded-xl mt-8">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">总结与展望</h2>
          <p className="max-w-3xl mx-auto text-slate-600 mb-8 leading-relaxed">
            SigLIP 不仅通过数学上的简化解决了分布式训练的痛点，更通过大量的工程实验（如 SigLiT、mSigLIP）证明了在有限资源下也能训练出 SOTA 级别的模型。它打破了"对比学习必须依赖超大 Batch Size"的迷思，并将 Batch Size 的甜蜜点定格在 32k。
          </p>
          <div className="flex justify-center space-x-4 flex-wrap gap-y-3">
            <a 
              href="https://arxiv.org/abs/2303.15343" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md inline-flex items-center gap-2"
            >
              阅读原始论文 (arXiv)
              <ExternalLink size={16} />
            </a>
            <a 
              href="https://github.com/google-research/big_vision" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white text-slate-700 font-medium rounded-lg hover:bg-gray-50 border border-gray-300 transition shadow-sm inline-flex items-center gap-2"
            >
              查看 Big Vision 代码库
              <ExternalLink size={16} />
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-200 py-8 mt-12">
        <div className="max-w-5xl mx-auto px-6 text-center text-sm text-slate-500">
          <p>Based on the paper: "Sigmoid Loss for Language Image Pre-Training" (ICCV 2023)</p>
          <p className="mt-2">Google DeepMind • Zhai et al.</p>
        </div>
      </footer>
    </div>
  );
};

export default SigLIP;

