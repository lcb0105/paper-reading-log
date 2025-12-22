import React from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const EVA_CLIP = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">
      {/* 返回按钮 */}
      <div className="fixed top-4 left-4 z-50">
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 bg-slate-900/80 backdrop-blur-md rounded-lg text-slate-300 hover:text-blue-400 transition-colors border border-slate-800"
        >
          <ArrowLeft size={16} />
          返回
        </Link>
      </div>

      {/* Header */}
      <header className="bg-slate-900 py-12 border-b border-slate-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">EVA-CLIP: 大规模 CLIP 训练技术的改进</h1>
          <p className="text-xl text-slate-400">论文深度解析与公式推导</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <span className="bg-blue-600 px-3 py-1 rounded-full">CVPR 2023 (相关工作)</span>
            <span className="bg-slate-700 px-3 py-1 rounded-full">BAAI (智源研究院)</span>
            <span className="bg-slate-700 px-3 py-1 rounded-full">多模态学习</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 max-w-4xl py-8 space-y-8">
        {/* Abstract Section */}
        <section className="bg-slate-900 rounded-xl p-8 border border-slate-800">
          <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-700 pb-2">1. 核心摘要 (Abstract)</h2>
          <p className="leading-relaxed mb-4">
            CLIP (Contrastive Language-Image Pre-training) 是一种强大的视觉-语言基础模型，但在大规模训练时面临计算成本高和训练不稳定的挑战。
          </p>
          <p className="leading-relaxed mb-4">
            本论文提出了 <strong className="text-blue-400">EVA-CLIP</strong>，通过引入一系列新的表示学习、优化和增强技术，显著提升了 CLIP 训练的效率和效果。其中最大的模型 <strong className="text-blue-400">5.0B 参数的 EVA-02-CLIP-E/14+</strong> 在仅观看 90 亿样本的情况下，实现了 <strong className="text-green-400">82.0%</strong> 的 ImageNet-1K 零样本 Top-1 准确率，超越了以往计算成本更高的模型。
          </p>
          <div className="bg-blue-500/10 border-l-4 border-blue-500 p-4 rounded-r-lg">
            <strong className="text-blue-400">核心突破点：</strong> 更好的初始化策略 (EVA)、更适合大 Batch 的优化器 (LAMB)、以及极高的训练效率 (Flash Attention + Token Dropping)。
          </div>
        </section>

        {/* Methodology Section */}
        <section className="bg-slate-900 rounded-xl p-8 border border-slate-800">
          <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-700 pb-2">2. 核心方法 (Approach)</h2>
          <p className="mb-4">EVA-CLIP 的成功并非源于单一技术的改进，而是三个关键维度的组合拳：</p>
          
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 hover:border-blue-500/50 transition">
              <h3 className="text-lg font-bold text-blue-400 mb-2">1. 更好的初始化 (Better Initialization)</h3>
              <p className="text-sm text-slate-400">
                使用预训练的 <strong className="text-white">EVA</strong> 模型权重初始化 CLIP 的视觉编码器。EVA 结合了掩码图像建模 (MIM) 的几何结构捕捉能力和对比学习的高层语义能力。这不仅加速了收敛，还提升了特征表示的质量。
              </p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 hover:border-blue-500/50 transition">
              <h3 className="text-lg font-bold text-blue-400 mb-2">2. LAMB 优化器 (LAMB Optimizer)</h3>
              <p className="text-sm text-slate-400">
                为了应对极大的 Batch Size（如 32k 甚至更高），EVA-CLIP 弃用了 AdamW，转而使用 LAMB 优化器。LAMB 通过自适应的逐层学习率更新，在大批量训练下更加稳定且收敛更快。
              </p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 hover:border-blue-500/50 transition md:col-span-2">
              <h3 className="text-lg font-bold text-blue-400 mb-2">3. 训练效率优化 (Efficiency)</h3>
              <p className="text-sm text-slate-400">
                引入了 <strong className="text-white">Flash Attention</strong> 加速计算，并采用了 FLIP 策略，即在训练过程中随机 <strong className="text-white">Mask 掉 50% 的输入 Token</strong>。这使得计算复杂度减半，且并未明显降低性能。
              </p>
            </div>
          </div>
        </section>

        {/* Detailed Formulas Section */}
        <section className="bg-slate-900 rounded-xl p-8 border border-slate-800">
          <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-700 pb-2">3. 公式详解 (Formulas & Explanations)</h2>
          
          {/* 3.1 Contrastive Loss */}
          <h3 className="text-xl font-semibold text-white mt-6 mb-3">3.1 CLIP 对比损失函数深度解析</h3>
          <p className="mb-4">
            CLIP 采用的是 InfoNCE Loss 的对称版本。其核心目标是拉近"图片-文本"正样本对在特征空间中的距离，同时推远负样本对。
          </p>
          
          <h4 className="text-lg font-medium text-slate-200 mt-4">步骤 1: 特征计算与归一化</h4>
          <p className="mb-2">假设一个 Batch 有 <InlineMath math="N" /> 个样本。输入图片 <InlineMath math="I_i" /> 和文本 <InlineMath math="T_i" /> 经过编码器后得到特征向量，必须先进行 L2 归一化（Normalize），确保它们位于单位超球面上：</p>
          <div className="bg-slate-800 p-4 rounded-lg my-4 overflow-x-auto">
            <BlockMath math="\hat{v}_{I_i} = \frac{f_I(I_i)}{\left\|f_I(I_i)\right\|}, \quad \hat{v}_{T_i} = \frac{f_T(T_i)}{\left\|f_T(T_i)\right\|}" />
          </div>
          
          <h4 className="text-lg font-medium text-slate-200 mt-4">步骤 2: 相似度矩阵计算</h4>
          <p className="mb-2">计算所有图片与所有文本之间的余弦相似度，并乘以温度系数 <InlineMath math="e^{\tau}" />。温度系数用于控制分布的尖锐程度。</p>
          <div className="bg-slate-800 p-4 rounded-lg my-4 overflow-x-auto">
            <BlockMath math="\text{Logits}_{i,j} = \hat{v}_{I_i} \cdot \hat{v}_{T_j} \cdot e^\tau" />
          </div>
          <ul className="list-disc list-inside mb-4 pl-4 text-sm text-slate-400 space-y-2">
            <li>当 <InlineMath math="i=j" /> 时，是<strong className="text-green-400">正样本对</strong>（正确的图文匹配）。</li>
            <li>当 <InlineMath math="i \neq j" /> 时，是<strong className="text-red-400">负样本对</strong>（错误的图文匹配）。</li>
            <li><InlineMath math="e^\tau" /> 通常是可学习参数，CLIP 中通常初始化较大，让模型聚焦于区分难分样本。</li>
          </ul>
          
          <h4 className="text-lg font-medium text-slate-200 mt-4">步骤 3: 双向 Cross Entropy Loss</h4>
          <p className="mb-2">CLIP 的独特性在于它是<strong className="text-blue-400">双向</strong>的：既要让图片找对文本（Image-to-Text），也要让文本找对图片（Text-to-Image）。</p>
          
          <div className="grid md:grid-cols-2 gap-4 my-4">
            <div className="bg-slate-800 p-4 rounded-lg">
              <p className="text-center font-semibold mb-2 text-white">图像 → 文本 损失</p>
              <div className="overflow-x-auto text-center">
                <BlockMath math="L_{I \to T} = - \frac{1}{N} \sum_{i=1}^{N} \log \frac{\exp(\text{Logits}_{i,i})}{\sum_{j=1}^{N} \exp(\text{Logits}_{i,j})}" />
              </div>
              <p className="text-xs text-slate-500 mt-2">对于第 <InlineMath math="i" /> 张图，正确文本 <InlineMath math="T_i" /> 的预测概率应最大化。</p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg">
              <p className="text-center font-semibold mb-2 text-white">文本 → 图像 损失</p>
              <div className="overflow-x-auto text-center">
                <BlockMath math="L_{T \to I} = - \frac{1}{N} \sum_{i=1}^{N} \log \frac{\exp(\text{Logits}_{i,i})}{\sum_{j=1}^{N} \exp(\text{Logits}_{j,i})}" />
              </div>
              <p className="text-xs text-slate-500 mt-2">对于第 <InlineMath math="i" /> 段文本，正确图片 <InlineMath math="I_i" /> 的预测概率应最大化。</p>
            </div>
          </div>
          
          <div className="bg-slate-800 p-4 rounded-lg my-4 overflow-x-auto text-center">
            <BlockMath math="L_{\text{total}} = \frac{1}{2} (L_{I \to T} + L_{T \to I})" />
          </div>

          {/* 3.2 Optimization */}
          <h3 className="text-xl font-semibold text-white mt-10 mb-3">3.2 优化器深度对比：AdamW vs LAMB</h3>
          <p className="mb-4">
            为什么 EVA-CLIP 在大 Batch（如 32k）训练时选择了 LAMB 而不是主流的 AdamW？
          </p>
          
          {/* AdamW */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 my-4">
            <h4 className="text-lg font-bold text-slate-200 mb-3">1. AdamW (Adaptive Moment Estimation with Weight Decay)</h4>
            <p className="mb-2 text-sm">AdamW 是当前 NLP 和 CV 的主流优化器，它结合了动量和自适应学习率。对于参数 <InlineMath math="\theta_t" />，更新规则如下：</p>
            
            <p className="font-semibold text-sm mt-3">动量更新 (Momentum):</p>
            <div className="overflow-x-auto text-center my-2 text-sm bg-slate-800 p-3 rounded">
              <BlockMath math="m_t = \beta_1 m_{t-1} + (1-\beta_1) g_t" />
              <BlockMath math="v_t = \beta_2 v_{t-1} + (1-\beta_2) g_t^2" />
            </div>
            
            <p className="font-semibold text-sm mt-3">参数更新 (Update Rule):</p>
            <div className="bg-slate-800 p-4 rounded-lg my-2 overflow-x-auto text-center">
              <BlockMath math="\theta_{t+1} = \theta_t - \eta \left( \frac{\hat{m}_t}{\sqrt{\hat{v}_t} + \epsilon} + \lambda \theta_t \right)" />
            </div>
            
            {/* Symbol Explanation */}
            <div className="mt-4 bg-slate-900/50 p-4 rounded border border-slate-600">
              <h5 className="font-bold text-slate-300 mb-3 text-sm">🔰 初学者公式符号详解 (Symbol Guide)</h5>
              <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
                <div className="font-bold text-blue-400 text-right"><InlineMath math="\theta_t" /></div>
                <div className="text-slate-400"><strong>当前参数</strong>：模型在第 t 步时的权重（模型现在的"脑子"）。</div>
                
                <div className="font-bold text-blue-400 text-right"><InlineMath math="g_t" /></div>
                <div className="text-slate-400"><strong>梯度 (Gradient)</strong>：当前位置的坡度，告诉模型该往哪个方向下山。</div>
                
                <div className="font-bold text-blue-400 text-right"><InlineMath math="m_t" /></div>
                <div className="text-slate-400"><strong>一阶动量 (Momentum)</strong>：类似于<strong>"惯性"</strong>。它记录了过去梯度的平均方向，防止方向乱变，让下山更平稳。</div>
                
                <div className="font-bold text-blue-400 text-right"><InlineMath math="v_t" /></div>
                <div className="text-slate-400"><strong>二阶动量 (Variance)</strong>：记录了梯度的剧烈程度。如果地形平坦（v_t小），就走快点；如果地形陡峭崎岖（v_t大），就走慢点。</div>
                
                <div className="font-bold text-blue-400 text-right"><InlineMath math="\eta" /></div>
                <div className="text-slate-400"><strong>学习率 (Learning Rate)</strong>：步长。决定了这一步迈多大。</div>
                
                <div className="font-bold text-blue-400 text-right"><InlineMath math="\beta_1, \beta_2" /></div>
                <div className="text-slate-400"><strong>衰减率 (Decay Rates)</strong>：遗忘系数。决定了我们多大程度上保留过去的惯性。通常 β₁=0.9, β₂=0.999。</div>
                
                <div className="font-bold text-blue-400 text-right"><InlineMath math="\epsilon" /></div>
                <div className="text-slate-400"><strong>平滑项 (Epsilon)</strong>：一个极小的数（如 10⁻⁸），仅用于防止分母为 0 导致计算报错。</div>
                
                <div className="font-bold text-blue-400 text-right"><InlineMath math="\lambda" /></div>
                <div className="text-slate-400"><strong>权重衰减 (Weight Decay)</strong>：正则化项。惩罚过大的参数值，防止模型"死记硬背"（过拟合）。</div>
              </div>
            </div>
            
            <div className="bg-red-500/10 border border-red-500/30 p-3 rounded text-sm text-red-300 mt-4">
              <strong>缺陷：</strong> AdamW 的更新步长 <InlineMath math="\frac{\hat{m}_t}{\sqrt{\hat{v}_t}}" /> 是逐元素（element-wise）计算的。当 Batch Size 极大时，梯度的方差变大，导致某些层的更新步长相对于权重的模长（Norm）过大，容易引起训练震荡或发散。
            </div>
          </div>
          
          {/* LAMB */}
          <div className="bg-blue-500/5 border border-blue-500/30 rounded-lg p-6 my-4">
            <h4 className="text-lg font-bold text-blue-400 mb-3">2. LAMB (Layer-wise Adaptive Moments optimizer for Batch training)</h4>
            <p className="mb-2 text-sm">LAMB 是专为大 Batch 设计的。它的核心思想是：<strong className="text-white">不仅要看梯度的大小，还要看这层参数本身的大小</strong>。它引入了"信任比率 (Trust Ratio)"机制。</p>
            
            <p className="font-semibold text-sm mt-3">第一步：计算 Adam 风格的更新量 <InlineMath math="u_t" />:</p>
            <div className="overflow-x-auto text-center my-2 text-sm bg-slate-800 p-3 rounded">
              <BlockMath math="u_t = \frac{\hat{m}_t}{\sqrt{\hat{v}_t} + \epsilon} + \lambda \theta_t" />
            </div>
            
            <p className="font-semibold text-sm mt-3">第二步：计算层级信任比率 <InlineMath math="\phi" /> (关键差异):</p>
            <div className="bg-slate-800 p-4 rounded-lg my-2 overflow-x-auto text-center">
              <BlockMath math="\phi = \frac{\left\| \theta_t \right\|}{\left\| u_t \right\|}" />
              <BlockMath math="\theta_{t+1} = \theta_t - \eta \cdot \phi \cdot u_t" />
            </div>
            
            <ul className="list-disc list-inside mt-4 text-sm text-slate-400 space-y-2">
              <li><strong className="text-white">原理解释：</strong> <InlineMath math="\phi" /> 是参数模长 <InlineMath math="\left\| \theta_t \right\|" /> 与更新量模长 <InlineMath math="\left\| u_t \right\|" /> 的比值。</li>
              <li><strong className="text-white">作用：</strong> 无论梯度多大或多小，LAMB 强制将更新步长归一化到与参数本身的大小成比例。
                <ul className="list-disc list-inside pl-6 mt-1 text-slate-500 text-xs">
                  <li>如果某层参数很大，更新步长可以大一点。</li>
                  <li>如果某层参数很小，更新步长就必须小一点，防止一步跨太大把权重"毁了"。</li>
                </ul>
              </li>
              <li><strong className="text-green-400">结论：</strong> 这使得 LAMB 可以安全地使用比 AdamW 大得多的学习率（Learning Rate），从而在超大 Batch Size 下加速收敛且保持稳定。</li>
            </ul>
          </div>
        </section>

        {/* Experiments Section */}
        <section className="bg-slate-900 rounded-xl p-8 border border-slate-800">
          <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-700 pb-2">4. 实验结果 (Experiments)</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-slate-400">
              <thead className="text-xs text-slate-300 uppercase bg-slate-800">
                <tr>
                  <th scope="col" className="px-6 py-3">模型 (Model)</th>
                  <th scope="col" className="px-6 py-3">参数量 (Params)</th>
                  <th scope="col" className="px-6 py-3">训练样本量 (Seen Samples)</th>
                  <th scope="col" className="px-6 py-3">IN-1K Zero-shot Top-1</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-slate-800/30 border-b border-slate-700">
                  <td className="px-6 py-4 font-medium text-slate-200">OpenAI CLIP-L/14</td>
                  <td className="px-6 py-4">428M</td>
                  <td className="px-6 py-4">13B</td>
                  <td className="px-6 py-4">75.5%</td>
                </tr>
                <tr className="bg-slate-800/30 border-b border-slate-700">
                  <td className="px-6 py-4 font-medium text-slate-200">OpenCLIP-G/14</td>
                  <td className="px-6 py-4">2.5B</td>
                  <td className="px-6 py-4">39B</td>
                  <td className="px-6 py-4">80.1%</td>
                </tr>
                <tr className="bg-blue-500/10 border-b border-blue-500/30">
                  <td className="px-6 py-4 font-bold text-blue-400">EVA-02-CLIP-L/14+</td>
                  <td className="px-6 py-4 font-bold text-blue-400">428M</td>
                  <td className="px-6 py-4 font-bold text-blue-400">6B (仅需1/6样本)</td>
                  <td className="px-6 py-4 font-bold text-green-400">80.4%</td>
                </tr>
                <tr className="bg-blue-500/10 border-b border-blue-500/30">
                  <td className="px-6 py-4 font-bold text-blue-400">EVA-02-CLIP-E/14+</td>
                  <td className="px-6 py-4 font-bold text-blue-400">5.0B</td>
                  <td className="px-6 py-4 font-bold text-blue-400">9B</td>
                  <td className="px-6 py-4 font-bold text-green-400">82.0%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-400">
            <strong className="text-white">分析：</strong> EVA-CLIP 在参数量更小或训练数据更少的情况下，依然实现了 SOTA 性能。尤其是 EVA-02-CLIP-L/14+，以 OpenAI CLIP-L 相同的模型大小，达到了 OpenCLIP-G（大6倍模型）的性能水平。
          </p>
        </section>

        {/* EVA vs EVA-CLIP 对比 */}
        <section className="bg-slate-900 rounded-xl p-8 border border-slate-800">
          <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-700 pb-2">5. EVA vs EVA-CLIP：核心差异</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-slate-400">
              <thead className="text-xs text-slate-300 uppercase bg-slate-800">
                <tr>
                  <th scope="col" className="px-6 py-3">维度</th>
                  <th scope="col" className="px-6 py-3">EVA (MIM 预训练)</th>
                  <th scope="col" className="px-6 py-3">EVA-CLIP (对比学习)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-slate-800/30 border-b border-slate-700">
                  <td className="px-6 py-4 font-medium text-slate-200">目标</td>
                  <td className="px-6 py-4">重建被遮挡图像的 CLIP 特征</td>
                  <td className="px-6 py-4">对齐图像-文本嵌入空间</td>
                </tr>
                <tr className="bg-slate-800/30 border-b border-slate-700">
                  <td className="px-6 py-4 font-medium text-slate-200">训练数据</td>
                  <td className="px-6 py-4">仅需图像 (ImageNet-21K)</td>
                  <td className="px-6 py-4">需要图像-文本对 (2B+ pairs)</td>
                </tr>
                <tr className="bg-slate-800/30 border-b border-slate-700">
                  <td className="px-6 py-4 font-medium text-slate-200">损失函数</td>
                  <td className="px-6 py-4">负余弦相似度 (MIM)</td>
                  <td className="px-6 py-4">对称交叉熵 (InfoNCE)</td>
                </tr>
                <tr className="bg-slate-800/30 border-b border-slate-700">
                  <td className="px-6 py-4 font-medium text-slate-200">文本能力</td>
                  <td className="px-6 py-4">❌ 无文本理解</td>
                  <td className="px-6 py-4">✅ 支持 Zero-Shot 分类</td>
                </tr>
                <tr className="bg-slate-800/30 border-b border-slate-700">
                  <td className="px-6 py-4 font-medium text-slate-200">关系</td>
                  <td className="px-6 py-4" colSpan="2" className="text-center px-6 py-4 text-blue-400">
                    EVA 作为 EVA-CLIP 视觉编码器的<strong>初始化权重</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="bg-green-500/10 border-l-4 border-green-500 p-4 rounded-r-lg mt-6">
            <strong className="text-green-400">协同关系：</strong> EVA 通过 MIM 学习到的<strong>局部几何特征</strong>，与 CLIP 对比学习获得的<strong>全局语义对齐能力</strong>形成互补。用 EVA 初始化 CLIP 可以显著加速收敛并提升最终性能。
          </div>
        </section>

        {/* Conclusion */}
        <section className="bg-slate-900 rounded-xl p-8 border border-slate-800">
          <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-700 pb-2">6. 结论 (Conclusion)</h2>
          <p className="leading-relaxed">
            EVA-CLIP 通过高效的训练流程和强大的初始化策略，证明了我们不需要仅仅通过暴力堆砌计算资源来提升 CLIP 的性能。结合 Masked Image Modeling 的初始化 (EVA)、大批量优化器 (LAMB) 以及计算加速技巧 (FLIP/Flash Attention)，EVA-CLIP 为多模态基础模型的训练提供了一条高效可行的路径。
          </p>
          <div className="mt-6 p-4 bg-slate-800 rounded-lg text-center">
            <p className="font-semibold text-slate-300">资源链接</p>
            <p className="text-blue-400 mt-2">Code & Models: github.com/baaivision/EVA/CLIP</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-500 py-8 text-center text-sm border-t border-slate-800">
        <p>基于 arXiv:2303.15389v1 论文内容生成</p>
      </footer>
    </div>
  );
};

export default EVA_CLIP;

