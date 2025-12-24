import React from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { Link } from 'react-router-dom';
import { ArrowLeft, Info, Cpu, Image, Layers, Zap, BarChart3, Lightbulb, Settings } from 'lucide-react';

const LLaVANeXT = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">
      {/* 返回按钮 */}
      <div className="fixed top-4 left-4 z-50">
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 bg-slate-900/80 backdrop-blur-md rounded-lg text-slate-300 hover:text-orange-400 transition-colors border border-slate-800"
        >
          <ArrowLeft size={16} />
          返回
        </Link>
      </div>

      {/* Header */}
      <header className="bg-gradient-to-r from-orange-900 to-amber-900 py-16 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
        <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
          <div className="inline-block px-3 py-1 bg-orange-700 rounded-full text-xs font-semibold tracking-wider mb-4 uppercase">
            LLaVA-VL Team / 2024
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            LLaVA-NeXT Ablations
          </h1>
          <h2 className="text-xl md:text-2xl font-light text-orange-200 mb-6">除了数据，还有什么影响视觉指令微调？</h2>
          <div className="mt-3 text-sm text-orange-300/70">
            深度解析：架构 · 视觉表示 · 训练策略
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 max-w-4xl py-8 space-y-8">
        
        {/* 导读 */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="bg-orange-500/20 text-orange-400 p-2 rounded-lg">
              <Info size={20} />
            </span>
            导读
          </h2>
          
          <p className="text-slate-300 leading-relaxed mb-4">
            LLaVA 系列（LLaVA-1.5, LLaVA-NeXT）的成功在很大程度上归功于<strong className="text-white">以数据为中心（Data-Centric）</strong>的方法。
            然而，除了数据质量之外，<strong className="text-orange-400">模型架构</strong>、<strong className="text-orange-400">视觉表示</strong>以及<strong className="text-orange-400">训练策略</strong>对最终性能有何影响？
          </p>
          
          <div className="bg-orange-500/10 border-l-4 border-orange-500 p-4 rounded-r-lg">
            <p className="text-slate-400 text-sm">
              本文档基于 LLaVA-NeXT 的<strong className="text-white">消融实验（Ablation Study）</strong>，详细剖析了这些被忽视的关键因素。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 text-center">
              <Cpu className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-white font-semibold">架构洞察</p>
              <p className="text-xs text-slate-400">LLM 与 Vision Encoder</p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 text-center">
              <Image className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-white font-semibold">视觉表示</p>
              <p className="text-xs text-slate-400">Higher-AnyRes 策略</p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 text-center">
              <Layers className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-white font-semibold">训练策略</p>
              <p className="text-xs text-slate-400">Stage 1.5 的重要性</p>
            </div>
          </div>
        </section>

        {/* 1. 架构洞察 */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="bg-blue-500/20 text-blue-400 p-2 rounded-lg">
              <Cpu size={20} />
            </span>
            1. 架构洞察 (Insights on Architectures)
          </h2>

          <p className="text-slate-400 mb-6">
            LLaVA 的架构由预训练的<strong className="text-white">大语言模型（LLM）</strong>和预训练的<strong className="text-white">视觉编码器（Vision Encoder）</strong>组成。
            研究发现，这两者的缩放行为（Scaling Behavior）截然不同。
          </p>

          {/* 1.1 LLM */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4 pb-2 border-b border-slate-700">
              1.1 语言模型 (LLM) 的影响
            </h3>
            
            <p className="text-slate-400 mb-4">
              实验对比了从 <InlineMath math="0.5B" /> 到 <InlineMath math="110B" /> 参数量的不同 LLM（如 Qwen-1.5, Yi, Vicuna 等）。
            </p>

            <div className="space-y-3 mb-4">
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                <h4 className="font-bold text-green-400 mb-2">✓ 更强的 LLM = 更强的多模态能力</h4>
                <p className="text-sm text-slate-400">
                  多模态性能与语言模型自身的性能呈<strong className="text-white">强正相关</strong>。
                  提升 LLM 的能力可以直接获得多模态任务上的"免费"提升。
                </p>
              </div>
              
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                <h4 className="font-bold text-green-400 mb-2">✓ 收敛速度</h4>
                <p className="text-sm text-slate-400">
                  更大的模型能更快地收敛到更低的训练损失（Training Loss）。
                </p>
              </div>
            </div>

            <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-r-lg">
              <h4 className="font-bold text-amber-400 mb-2">⚡ 学习率调整技巧（经验法则）</h4>
              <p className="text-sm text-slate-400">
                视觉编码器的学习率应始终比 LLM 解码器的学习率小 <strong className="text-white">5倍 到 10倍</strong>，以稳定训练过程。
              </p>
              <div className="bg-slate-900/50 p-3 rounded mt-2 font-mono text-sm">
                <span className="text-slate-500">// 示例配置</span><br/>
                <span className="text-blue-400">LLM lr:</span> <span className="text-green-400">2e-5</span><br/>
                <span className="text-blue-400">Vision Encoder lr:</span> <span className="text-green-400">2e-6</span>
              </div>
            </div>
          </div>

          {/* 1.2 Vision Encoder */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 pb-2 border-b border-slate-700">
              1.2 视觉编码器 (Vision Encoder) 的抉择
            </h3>
            
            <p className="text-slate-400 mb-4">
              对比了 CLIP, SigLIP, EVA-CLIP, SO400M 等多种视觉编码器。
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <h4 className="font-bold text-blue-400 mb-2">分辨率与 Token 数 {">"} 模型大小</h4>
                <p className="text-sm text-slate-400">
                  对于视觉编码器而言，简单的增加参数量（Model Size）带来的收益不如增加<strong className="text-white">输入分辨率</strong>和<strong className="text-white">预训练数据量</strong>明显。
                </p>
              </div>
              
              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <h4 className="font-bold text-green-400 mb-2">🏆 最佳性价比：SO400M</h4>
                <p className="text-sm text-slate-400">
                  Google 的 <strong className="text-white">SigLIP-SO400M (384×384)</strong> 展现了最佳的性价比。
                  优势：WebLI-10B 预训练 + 原生高分辨率支持。
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left text-slate-400">
                <thead className="text-xs text-slate-300 uppercase bg-slate-800">
                  <tr>
                    <th className="px-4 py-2">Vision Encoder</th>
                    <th className="px-4 py-2">分辨率</th>
                    <th className="px-4 py-2">预训练数据</th>
                    <th className="px-4 py-2">推荐度</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-700">
                    <td className="px-4 py-2 text-white">CLIP ViT-L/14</td>
                    <td className="px-4 py-2">224/336px</td>
                    <td className="px-4 py-2">400M pairs</td>
                    <td className="px-4 py-2 text-yellow-400">⭐⭐⭐</td>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="px-4 py-2 text-white">EVA-CLIP</td>
                    <td className="px-4 py-2">224px</td>
                    <td className="px-4 py-2">2B pairs</td>
                    <td className="px-4 py-2 text-yellow-400">⭐⭐⭐⭐</td>
                  </tr>
                  <tr className="bg-green-500/10">
                    <td className="px-4 py-2 text-green-400 font-bold">SigLIP-SO400M</td>
                    <td className="px-4 py-2 text-green-400">384px</td>
                    <td className="px-4 py-2 text-green-400">WebLI-10B</td>
                    <td className="px-4 py-2 text-green-400">⭐⭐⭐⭐⭐</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 2. 视觉表示与核心公式 */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="bg-green-500/20 text-green-400 p-2 rounded-lg">
              <Image size={20} />
            </span>
            2. 视觉表示与核心公式 (Visual Representations)
          </h2>

          <p className="text-slate-400 mb-6">
            这是本次消融实验中<strong className="text-orange-400">最核心的技术改进部分</strong>。
            LLaVA-NeXT 引入了动态分辨率策略（AnyRes），但为了处理更高分辨率的图像（如文档、长图），提出了 <strong className="text-white">Higher-AnyRes</strong>。
          </p>

          {/* 2.1 传统 AnyRes 局限 */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-3 pb-2 border-b border-slate-700">
              2.1 传统 AnyRes 的局限性
            </h3>
            
            <div className="bg-red-500/10 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-slate-400 text-sm">
                原始的 AnyRes 策略通常使用网格配置（Grid Configuration）如 <InlineMath math="\{2\times2, 1\times2, \dots\}" />，
                最大支持约 4 个网格。当图像分辨率超过 <InlineMath math="768 \times 768" /> 时，会被<strong className="text-red-400">强制缩放</strong>，导致细节丢失。
              </p>
            </div>
          </div>

          {/* 2.2 改进策略 */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-3 pb-2 border-b border-slate-700">
              2.2 改进策略：阈值双线性插值 (Thresholded Bilinear Interpolation)
            </h3>
            
            <div className="bg-green-500/10 border-l-4 border-green-500 p-4 rounded-r-lg mb-6">
              <h4 className="font-bold text-green-400 mb-2">核心思想</h4>
              <p className="text-slate-400 text-sm">
                如果总 Token 数超过了设定的阈值 <InlineMath math="\tau" />，则强制减少每个网格内的 Token 数量，
                通过<strong className="text-white">双线性插值</strong>将特征图下采样。
              </p>
            </div>

            <h4 className="font-bold text-white mb-3">公式推导与解释</h4>
            
            <p className="text-slate-400 mb-4">
              假设采用 AnyRes 策略，将图像划分为 <InlineMath math="a \times b" /> 的网格：
            </p>

            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 mb-4">
              <ul className="list-disc list-inside text-sm text-slate-400 space-y-2">
                <li><InlineMath math="a" />：宽度方向的网格数</li>
                <li><InlineMath math="b" />：高度方向的网格数</li>
                <li><InlineMath math="T" />：每个网格原本输出的视觉 Token 数量（例如 CLIP-336 通常为 <InlineMath math="24 \times 24 = 576" />）</li>
              </ul>
            </div>

            <p className="text-slate-400 mb-3">
              输入到 LLM 的<strong className="text-white">总视觉 Token 数</strong> <InlineMath math="L" /> 计算如下（包含一个全局概览图 global image）：
            </p>

            <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg mb-6 text-center">
              <BlockMath math="L = (a \times b + 1) \times T" />
            </div>

            <p className="text-slate-400 mb-3">
              为了防止 <InlineMath math="L" /> 过大导致显存爆炸或推理变慢，引入阈值 <InlineMath math="\tau" />。
              新的每个网格的 Token 数 <InlineMath math="T_{new}" /> 定义为：
            </p>

            <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg mb-6 text-center">
              <BlockMath math="T_{new} = \begin{cases} \dfrac{\tau}{a \times b + 1} & \text{if } L > \tau \\[10pt] T & \text{if } L \le \tau \end{cases}" />
            </div>

            <h4 className="font-bold text-white mb-3">详细解释</h4>

            <div className="space-y-4">
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                <h5 className="font-bold text-blue-400 mb-2">① 条件判断 (<InlineMath math="L > \tau" />)</h5>
                <p className="text-sm text-slate-400">
                  系统首先计算在当前网格配置 <InlineMath math="(a, b)" /> 下，总 Token 数 <InlineMath math="L" /> 是否超过了预设的计算预算 <InlineMath math="\tau" />。
                </p>
              </div>
              
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                <h5 className="font-bold text-green-400 mb-2">② 下采样操作</h5>
                <p className="text-sm text-slate-400">
                  如果超过预算，我们必须减少每个网格贡献的 Token 数。新的目标 Token 数被设定为 <InlineMath math="\frac{\tau}{a \times b + 1}" />。
                  这意味着我们通过<strong className="text-white">双线性插值 (Bilinear Interpolation)</strong> 将每个网格对应的特征图从原始尺寸调整到更小的尺寸。
                </p>
              </div>
              
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                <h5 className="font-bold text-purple-400 mb-2">③ 保持原样</h5>
                <p className="text-sm text-slate-400">
                  如果未超过预算，则保留原始的高保真度特征 <InlineMath math="T" />。
                </p>
              </div>
            </div>
          </div>

          {/* 2.3 实验结论 */}
          <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
            <h4 className="font-bold text-green-400 mb-2">2.3 实验结论</h4>
            <p className="text-slate-400 text-sm">
              通过这种策略，模型可以支持 <InlineMath math="6\times6" /> 甚至更多的网格，极大提升了对<strong className="text-white">文档 (DocVQA)</strong>、
              <strong className="text-white">图表 (ChartQA)</strong> 等需要高分辨率细节任务的性能，同时保持推理成本可控。
            </p>
          </div>
        </section>

        {/* 3. 训练策略 */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="bg-purple-500/20 text-purple-400 p-2 rounded-lg">
              <Layers size={20} />
            </span>
            3. 训练策略 (Training Strategies)
          </h2>

          <p className="text-slate-400 mb-6">
            除了架构，<strong className="text-white">什么时候教模型什么知识</strong>至关重要。
            论文将训练过程细分为三个阶段，重点强调了被忽视的 <strong className="text-red-400">Stage-1.5</strong>。
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-left text-slate-400">
              <thead className="text-xs text-slate-300 uppercase bg-slate-800">
                <tr>
                  <th className="px-4 py-3">阶段</th>
                  <th className="px-4 py-3">主要目标</th>
                  <th className="px-4 py-3">关键发现</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-700">
                  <td className="px-4 py-3 text-white font-bold">Stage 1</td>
                  <td className="px-4 py-3">语言-图像对齐</td>
                  <td className="px-4 py-3">仅训练 Connector。主要是让 LLM "看懂" 图像特征。</td>
                </tr>
                <tr className="border-b border-slate-700 bg-red-500/10">
                  <td className="px-4 py-3 text-red-400 font-bold">Stage 1.5</td>
                  <td className="px-4 py-3 text-red-400">高质量知识学习</td>
                  <td className="px-4 py-3">
                    <strong className="text-white">关键改进点。</strong> 摒弃海量低质量 Web 数据，转而使用高质量的合成数据。
                    建议：<strong className="text-green-400">全量微调</strong> 而非仅微调 Connector。
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-white font-bold">Stage 2</td>
                  <td className="px-4 py-3">视觉指令跟随</td>
                  <td className="px-4 py-3">传统的 SFT 阶段，使用复杂指令数据（如 LLaVA-Instruct）。</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-red-500/10 border-l-4 border-red-500 p-5 rounded-r-lg">
            <h3 className="font-bold text-red-400 mb-3 text-lg">Stage 1.5 的数据策略 ⚠️</h3>
            <p className="text-slate-400 mb-4">
              研究表明，在 Stage 1.5 阶段，使用 <strong className="text-white">LLaVA-NeXT-34B 重新生成的详细描述 (Re-captioned data)</strong> 
              训练整个模型，比使用原始的 noisy web captions 效果好得多。
            </p>
            <div className="bg-slate-900/50 p-4 rounded-lg">
              <h4 className="font-bold text-white mb-2">为什么 Stage 1.5 如此重要？</h4>
              <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                <li>在进入复杂的指令微调之前，先让模型在高质量的纯描述数据上<strong className="text-green-400">"打好基础"</strong></li>
                <li>全量参数微调比仅微调 Connector 效果更好</li>
                <li>高质量合成数据 {">"} 大量低质量 Web 数据</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 4. 总结与建议 */}
        <section className="bg-gradient-to-r from-orange-900/50 to-amber-900/50 rounded-xl p-6 border border-orange-800">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="bg-orange-500/20 text-orange-400 p-2 rounded-lg">
              <Lightbulb size={20} />
            </span>
            总结与建议：构建"下一代" LLaVA 的配方
          </h2>

          <div className="space-y-4">
            <div className="bg-slate-900/50 p-4 rounded-lg flex items-start gap-4">
              <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded font-bold text-lg">1</span>
              <div>
                <h4 className="font-bold text-white mb-1">选个好底子</h4>
                <p className="text-sm text-slate-400">
                  LLM 的强弱直接决定上限，且越大越好练。多模态性能与语言模型能力强正相关。
                </p>
              </div>
            </div>
            
            <div className="bg-slate-900/50 p-4 rounded-lg flex items-start gap-4">
              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded font-bold text-lg">2</span>
              <div>
                <h4 className="font-bold text-white mb-1">视觉求"大"不求"重"</h4>
                <p className="text-sm text-slate-400">
                  视觉编码器优先选择支持<strong className="text-white">高分辨率</strong>和经过<strong className="text-white">大量数据预训练</strong>的模型（如 SigLIP-SO400M），而非单纯追求参数量大。
                </p>
              </div>
            </div>
            
            <div className="bg-slate-900/50 p-4 rounded-lg flex items-start gap-4">
              <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded font-bold text-lg">3</span>
              <div>
                <h4 className="font-bold text-white mb-1">分辨率是关键</h4>
                <p className="text-sm text-slate-400">
                  使用 <strong className="text-orange-400">Higher-AnyRes</strong> 策略，配合 <strong className="text-orange-400">Thresholded Bilinear Interpolation</strong> 公式，
                  在算力允许范围内尽可能"看清"图片。
                </p>
              </div>
            </div>
            
            <div className="bg-slate-900/50 p-4 rounded-lg flex items-start gap-4">
              <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded font-bold text-lg">4</span>
              <div>
                <h4 className="font-bold text-white mb-1">高质量预热</h4>
                <p className="text-sm text-slate-400">
                  在指令微调前，加入一个全量参数微调的 <strong className="text-red-400">Stage 1.5</strong>，使用高质量的合成 Caption 数据清洗模型的知识库。
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-slate-900/50 p-4 rounded-lg border border-orange-500/30">
            <h4 className="font-bold text-orange-400 mb-2">🎯 核心结论</h4>
            <p className="text-slate-400 text-sm">
              要构建强大的多模态大模型，<strong className="text-white">不能仅仅盯着 SFT 数据</strong>。
              架构选择、视觉表示策略、训练阶段划分都是同样重要的因素。
            </p>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-500 py-8 text-center text-sm border-t border-slate-800">
        <p>基于 LLaVA-NeXT Ablations Blog Post 生成</p>
      </footer>
    </div>
  );
};

export default LLaVANeXT;

