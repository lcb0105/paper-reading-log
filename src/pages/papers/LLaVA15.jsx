import React from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { Link } from 'react-router-dom';
import { ArrowLeft, Info, Calculator, Database, BarChart3, Zap, Grid3X3, FileText } from 'lucide-react';

const LLaVA15 = () => {
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
      <header className="bg-gradient-to-r from-blue-900 to-indigo-900 py-16 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
        <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
          <div className="inline-block px-3 py-1 bg-blue-700 rounded-full text-xs font-semibold tracking-wider mb-4 uppercase">
            arXiv 2310 / CVPR 2024
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Improved Baselines with Visual Instruction Tuning
          </h1>
          <h2 className="text-xl md:text-2xl font-light text-blue-200 mb-6">LLaVA-1.5 论文深度解析</h2>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-200">
            <span>Haotian Liu*</span>
            <span>Chunyuan Li*</span>
            <span>Yuheng Li</span>
            <span>Yong Jae Lee</span>
          </div>
          <div className="mt-3 text-xs text-blue-300/70">University of Wisconsin-Madison | Microsoft Research</div>
          <div className="mt-4">
            <a href="https://llava-vl.github.io" target="_blank" rel="noreferrer" className="text-sm font-medium text-blue-400 hover:underline">
              官方项目主页 →
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 max-w-4xl py-8 space-y-8">
        
        {/* 1. 核心摘要 */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="bg-blue-500/20 text-blue-400 p-2 rounded-lg">
              <Info size={20} />
            </span>
            核心摘要 (Abstract)
          </h2>
          
          <p className="text-slate-300 leading-relaxed mb-6">
            LLaVA-1.5 是对大型多模态模型（LMM）设计选择的<strong className="text-white">系统性研究</strong>。作者发现，原版 LLaVA 中简单的全连接视觉-语言连接器（Connector）实际上非常强大且数据效率极高。通过对 LLaVA 进行简单的修改，作者建立了一个更强的基线模型，在 <strong className="text-blue-400">11 个基准测试</strong>中达到了最先进（SoTA）的水平。
          </p>
          
          <div className="bg-blue-500/10 border-l-4 border-blue-500 p-4 rounded-r-lg">
            <p className="font-bold text-blue-400 mb-3">LLaVA-1.5 的三个关键改进：</p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded text-xs font-bold">1</span>
                <div>
                  <span className="font-semibold text-white">MLP 连接器：</span>
                  <span className="text-slate-400"> 将线性投影层升级为两层 MLP（多层感知机）。</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded text-xs font-bold">2</span>
                <div>
                  <span className="font-semibold text-white">分辨率提升：</span>
                  <span className="text-slate-400"> 使用 CLIP-ViT-L-336px 视觉编码器，支持更高分辨率输入。</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded text-xs font-bold">3</span>
                <div>
                  <span className="font-semibold text-white">学术任务导向数据：</span>
                  <span className="text-slate-400"> 引入 VQA 数据集，并使用特定的"响应格式提示词"。</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6 text-center">
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <p className="text-2xl font-bold text-green-400">1.2M</p>
              <p className="text-xs text-slate-400">训练数据量</p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <p className="text-2xl font-bold text-blue-400">~1 天</p>
              <p className="text-xs text-slate-400">训练时间 (8×A100)</p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <p className="text-2xl font-bold text-purple-400">11</p>
              <p className="text-xs text-slate-400">基准测试 SOTA</p>
            </div>
          </div>
        </section>

        {/* 2. 技术架构与公式详解 */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="bg-indigo-500/20 text-indigo-400 p-2 rounded-lg">
              <Calculator size={20} />
            </span>
            技术架构与公式详解
          </h2>

          {/* MLP Connector */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-3 pb-2 border-b border-slate-700">
              1. MLP 视觉-语言连接器
            </h3>
            <p className="text-slate-400 mb-4">
              原版 LLaVA 使用单个线性层将图像特征投影到语言模型的词嵌入空间。LLaVA-1.5 受到自监督学习中 MLP 投影头成功的启发，将其升级为<strong className="text-white">两层 MLP</strong>。这一改变增强了视觉特征与语言空间对齐的表示能力。
            </p>
            
            <div className="bg-slate-800/50 border-l-4 border-blue-500 p-5 rounded-r-lg">
              <p className="text-sm text-slate-500 mb-3 font-mono">数学定义：</p>
              <p className="text-slate-400 mb-4 text-sm">
                令 <InlineMath math="\mathbf{Z}_v" /> 为视觉编码器（CLIP）输出的图像特征，<InlineMath math="\mathbf{H}_q" /> 为投影后输入到 LLM 的特征。
              </p>
              
              <div className="space-y-4">
                <div>
                  <p className="text-white font-semibold mb-2">原版 LLaVA（线性投影）:</p>
                  <div className="bg-slate-900 p-3 rounded text-center">
                    <BlockMath math="\mathbf{H}_q = \mathbf{W} \cdot \mathbf{Z}_v + \mathbf{b}" />
                  </div>
                </div>
                
                <div>
                  <p className="text-green-400 font-semibold mb-2">LLaVA-1.5（两层 MLP）:</p>
                  <div className="bg-slate-900 p-3 rounded text-center">
                    <BlockMath math="\mathbf{H}_q = \mathbf{W}_2 \cdot \sigma(\mathbf{W}_1 \cdot \mathbf{Z}_v + \mathbf{b}_1) + \mathbf{b}_2" />
                  </div>
                </div>
              </div>
              
              <div className="mt-4 bg-slate-900/50 p-3 rounded text-sm">
                <p className="text-slate-400">
                  <strong className="text-white">符号说明：</strong>
                </p>
                <ul className="list-disc list-inside text-slate-500 mt-2 space-y-1">
                  <li><InlineMath math="\sigma" /> 是激活函数（GELU）</li>
                  <li><InlineMath math="\mathbf{W}_1, \mathbf{W}_2" /> 是可学习的权重矩阵</li>
                  <li>非线性变换允许建立更复杂的跨模态映射关系</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Resolution Scaling */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-3 pb-2 border-b border-slate-700">
              2. 输入分辨率缩放 (LLaVA-1.5-HD)
            </h3>
            <p className="text-slate-400 mb-4">
              为了让 LLM 更清晰地"看"到图像细节，LLaVA-1.5 将输入图像分辨率提升至 <InlineMath math="336^2" />。
              对于更高分辨率的需求，论文提出了<strong className="text-white">分割-编码-合并 (Split-Encode-Merge)</strong> 策略。
            </p>
            
            <div className="bg-slate-800/50 border-l-4 border-green-500 p-5 rounded-r-lg">
              <p className="text-sm text-slate-500 mb-3 font-mono">LLaVA-1.5-HD 处理逻辑：</p>
              
              <div className="space-y-4">
                <div>
                  <p className="text-white font-semibold mb-2">Step 1: 图像分割</p>
                  <p className="text-slate-400 text-sm mb-2">
                    给定高分辨率图像 <InlineMath math="I_{hr}" />，分割成 N 个图像块，每块分辨率为 <InlineMath math="336 \times 336" />：
                  </p>
                  <div className="bg-slate-900 p-3 rounded text-center">
                    <BlockMath math="\mathcal{P} = \{ p_1, p_2, ..., p_N \}" />
                  </div>
                </div>
                
                <div>
                  <p className="text-white font-semibold mb-2">Step 2: 独立编码</p>
                  <p className="text-slate-400 text-sm mb-2">
                    视觉编码器 <InlineMath math="f_{enc}" /> 独立处理每个块：
                  </p>
                  <div className="bg-slate-900 p-3 rounded text-center">
                    <BlockMath math="\mathbf{F}_{grid} = \text{Concat}(f_{enc}(p_1), f_{enc}(p_2), ..., f_{enc}(p_N))" />
                  </div>
                </div>
                
                <div>
                  <p className="text-white font-semibold mb-2">Step 3: 全局上下文</p>
                  <p className="text-slate-400 text-sm mb-2">
                    避免分割导致的上下文丢失，同时处理降采样后的全图：
                  </p>
                  <div className="bg-slate-900 p-3 rounded text-center">
                    <BlockMath math="\mathbf{F}_{global} = f_{enc}(I_{global})" />
                  </div>
                </div>
                
                <div>
                  <p className="text-green-400 font-semibold mb-2">最终输入特征:</p>
                  <div className="bg-slate-900 p-3 rounded text-center">
                    <BlockMath math="\mathbf{H}_{input} = \text{Concat}(\mathbf{F}_{global}, \mathbf{F}_{grid})" />
                  </div>
                </div>
              </div>
              
              <div className="mt-4 bg-green-500/10 border border-green-500/30 p-3 rounded text-sm">
                <p className="text-green-400">
                  <strong>关键优势：</strong> 无需为高分辨率重新训练视觉编码器，同时兼顾局部细节和全局视野。
                </p>
              </div>
            </div>
          </div>

          {/* Why MLP is better */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-3 pb-2 border-b border-slate-700">
              3. 为什么 MLP 比 Linear 更好？
            </h3>
            
            <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg mb-4">
              <h4 className="font-bold text-blue-400 mb-2">核心洞察</h4>
              <p className="text-slate-400 text-sm">
                论文受到自监督学习（如 SimCLR、MoCo）中<strong className="text-white">非线性投影头（Projection Head）</strong>成功经验的启发。
                在对比学习中，添加非线性层可以学习到更好的表示，同样的原理也适用于跨模态对齐。
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                <h5 className="font-bold text-white mb-2">Linear Projection 的局限</h5>
                <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                  <li>只能学习<strong className="text-white">线性映射</strong></li>
                  <li>视觉空间和语言空间的对齐是<strong className="text-red-400">非线性</strong>的</li>
                  <li>表达能力有限</li>
                </ul>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                <h5 className="font-bold text-white mb-2">MLP 的优势</h5>
                <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                  <li>GELU 激活引入<strong className="text-green-400">非线性变换</strong></li>
                  <li>两层结构增加了<strong className="text-green-400">表示容量</strong></li>
                  <li>更好地对齐复杂的跨模态关系</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-r-lg mt-4">
              <h4 className="font-bold text-amber-400 mb-2">消融实验结果</h4>
              <p className="text-sm text-slate-400">
                论文中的消融实验表明，MLP 连接器相比 Linear 在多个基准上带来<strong className="text-white"> 1-3% 的提升</strong>，
                尤其在需要细粒度视觉理解的任务（如 TextVQA）上提升更明显。
              </p>
            </div>
          </div>

          {/* Visual Token Analysis */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-3 pb-2 border-b border-slate-700">
              4. 视觉 Token 数量分析
            </h3>
            
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 mb-4">
              <p className="text-slate-400 text-sm mb-3">
                CLIP ViT-L/14 将图像分割成 <InlineMath math="14 \times 14" /> 的 patch，不同分辨率产生不同数量的视觉 Token：
              </p>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-slate-400">
                  <thead className="text-xs text-slate-300 uppercase bg-slate-800">
                    <tr>
                      <th className="px-4 py-2">分辨率</th>
                      <th className="px-4 py-2">Patch Grid</th>
                      <th className="px-4 py-2">视觉 Tokens</th>
                      <th className="px-4 py-2">说明</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-700">
                      <td className="px-4 py-2">224 × 224</td>
                      <td className="px-4 py-2">16 × 16</td>
                      <td className="px-4 py-2">256</td>
                      <td className="px-4 py-2 text-slate-500">原版 LLaVA</td>
                    </tr>
                    <tr className="border-b border-slate-700 bg-green-500/5">
                      <td className="px-4 py-2 text-green-400">336 × 336</td>
                      <td className="px-4 py-2">24 × 24</td>
                      <td className="px-4 py-2 text-green-400 font-bold">576</td>
                      <td className="px-4 py-2 text-green-400">LLaVA-1.5</td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td className="px-4 py-2">672 × 672</td>
                      <td className="px-4 py-2">48 × 48</td>
                      <td className="px-4 py-2">2304</td>
                      <td className="px-4 py-2 text-slate-500">LLaVA-1.5-HD (4 grids)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
              <h4 className="font-bold text-purple-400 mb-2">为什么 336px 是最佳选择？</h4>
              <p className="text-sm text-slate-400">
                336px 是 CLIP ViT-L/14 原生支持的最大分辨率（通过位置编码插值）。
                相比 224px，它提供了 <strong className="text-white">2.25× 更多的视觉 Token</strong>，
                显著提升了细节感知能力，同时不会过度增加计算负担。
              </p>
            </div>
          </div>

          {/* Architecture Comparison */}
          <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-700">
            <h4 className="font-bold text-white mb-3">LLaVA vs LLaVA-1.5 架构对比</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left text-slate-400">
                <thead className="text-xs text-slate-300 uppercase bg-slate-800">
                  <tr>
                    <th className="px-4 py-2">组件</th>
                    <th className="px-4 py-2">LLaVA</th>
                    <th className="px-4 py-2 text-green-400">LLaVA-1.5</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-700">
                    <td className="px-4 py-2 text-white">Vision Encoder</td>
                    <td className="px-4 py-2">CLIP ViT-L/14 (224px)</td>
                    <td className="px-4 py-2 text-green-400">CLIP ViT-L/14 (336px)</td>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="px-4 py-2 text-white">视觉 Tokens</td>
                    <td className="px-4 py-2">256</td>
                    <td className="px-4 py-2 text-green-400">576</td>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="px-4 py-2 text-white">Connector</td>
                    <td className="px-4 py-2">Linear Projection</td>
                    <td className="px-4 py-2 text-green-400">2-Layer MLP (GELU)</td>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="px-4 py-2 text-white">LLM</td>
                    <td className="px-4 py-2">Vicuna-13B</td>
                    <td className="px-4 py-2">Vicuna-7B / 13B</td>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="px-4 py-2 text-white">训练数据</td>
                    <td className="px-4 py-2">~750K</td>
                    <td className="px-4 py-2 text-green-400">~1.2M (含 VQA)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 3. 两阶段训练策略 */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="bg-purple-500/20 text-purple-400 p-2 rounded-lg">
              <Zap size={20} />
            </span>
            两阶段训练策略
          </h2>

          <p className="text-slate-400 mb-6">
            LLaVA-1.5 沿用 LLaVA 的两阶段训练范式，但在数据和超参数上进行了优化：
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-500/10 border border-green-500/30 p-5 rounded-lg">
              <h3 className="font-bold text-green-400 mb-3 text-lg">Stage 1: 特征对齐预训练</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">数据：</span>
                  <span className="text-white">558K 图文对（LCS-558K）</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">冻结：</span>
                  <span className="text-white">Vision Encoder + LLM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">训练：</span>
                  <span className="text-green-400">仅 MLP Connector</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Epoch：</span>
                  <span className="text-white">1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">学习率：</span>
                  <span className="text-white">1e-3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Batch Size：</span>
                  <span className="text-white">256</span>
                </div>
              </div>
              <p className="text-slate-500 text-xs mt-3">
                目的：让 MLP 学会将视觉特征映射到语言空间
              </p>
            </div>
            
            <div className="bg-blue-500/10 border border-blue-500/30 p-5 rounded-lg">
              <h3 className="font-bold text-blue-400 mb-3 text-lg">Stage 2: 端到端微调</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">数据：</span>
                  <span className="text-white">665K 混合数据</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">冻结：</span>
                  <span className="text-white">Vision Encoder</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">训练：</span>
                  <span className="text-blue-400">MLP + LLM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Epoch：</span>
                  <span className="text-white">1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">学习率：</span>
                  <span className="text-white">2e-5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Batch Size：</span>
                  <span className="text-white">128</span>
                </div>
              </div>
              <p className="text-slate-500 text-xs mt-3">
                目的：赋予模型指令跟随和多模态对话能力
              </p>
            </div>
          </div>

          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
            <h4 className="font-bold text-white mb-3">Stage 2 训练数据构成（共 665K）</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left text-slate-400">
                <thead className="text-xs text-slate-300 uppercase bg-slate-800">
                  <tr>
                    <th className="px-3 py-2">数据集</th>
                    <th className="px-3 py-2">数量</th>
                    <th className="px-3 py-2">类型</th>
                    <th className="px-3 py-2">格式提示</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-700">
                    <td className="px-3 py-2 text-white">LLaVA-Instruct</td>
                    <td className="px-3 py-2">158K</td>
                    <td className="px-3 py-2">GPT-4 生成对话</td>
                    <td className="px-3 py-2 text-slate-500">-</td>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="px-3 py-2 text-white">ShareGPT</td>
                    <td className="px-3 py-2">40K</td>
                    <td className="px-3 py-2">纯文本对话</td>
                    <td className="px-3 py-2 text-slate-500">-</td>
                  </tr>
                  <tr className="border-b border-slate-700 bg-green-500/5">
                    <td className="px-3 py-2 text-green-400">VQAv2</td>
                    <td className="px-3 py-2">83K</td>
                    <td className="px-3 py-2">视觉问答</td>
                    <td className="px-3 py-2 text-green-400">✓ Short Answer</td>
                  </tr>
                  <tr className="border-b border-slate-700 bg-green-500/5">
                    <td className="px-3 py-2 text-green-400">GQA</td>
                    <td className="px-3 py-2">72K</td>
                    <td className="px-3 py-2">视觉推理</td>
                    <td className="px-3 py-2 text-green-400">✓ Short Answer</td>
                  </tr>
                  <tr className="border-b border-slate-700 bg-green-500/5">
                    <td className="px-3 py-2 text-green-400">OKVQA</td>
                    <td className="px-3 py-2">9K</td>
                    <td className="px-3 py-2">知识问答</td>
                    <td className="px-3 py-2 text-green-400">✓ Short Answer</td>
                  </tr>
                  <tr className="border-b border-slate-700 bg-green-500/5">
                    <td className="px-3 py-2 text-green-400">OCRVQA</td>
                    <td className="px-3 py-2">80K</td>
                    <td className="px-3 py-2">文字识别</td>
                    <td className="px-3 py-2 text-green-400">✓ Short Answer</td>
                  </tr>
                  <tr className="border-b border-slate-700 bg-green-500/5">
                    <td className="px-3 py-2 text-green-400">TextCaps</td>
                    <td className="px-3 py-2">22K</td>
                    <td className="px-3 py-2">图像描述</td>
                    <td className="px-3 py-2 text-slate-500">-</td>
                  </tr>
                  <tr className="border-b border-slate-700 bg-green-500/5">
                    <td className="px-3 py-2 text-green-400">Visual Genome</td>
                    <td className="px-3 py-2">86K</td>
                    <td className="px-3 py-2">区域描述</td>
                    <td className="px-3 py-2 text-slate-500">-</td>
                  </tr>
                  <tr className="bg-green-500/5">
                    <td className="px-3 py-2 text-green-400">RefCOCO</td>
                    <td className="px-3 py-2">115K</td>
                    <td className="px-3 py-2">区域定位</td>
                    <td className="px-3 py-2 text-slate-500">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              <span className="text-green-400">绿色</span> 表示 LLaVA-1.5 新增的学术任务数据
            </p>
          </div>
        </section>

        {/* 4. 数据策略 */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="bg-green-500/20 text-green-400 p-2 rounded-lg">
              <Database size={20} />
            </span>
            数据与格式化策略
          </h2>

          <h3 className="text-lg font-bold text-white mb-3">响应格式提示 (Response Format Prompting)</h3>
          <p className="text-slate-400 text-sm mb-4">
            论文发现 InstructBLIP 等模型在处理简短回答（Short-form）和长对话（Long-form）之间存在平衡问题。
            <strong className="text-white">原因分析：</strong>InstructBLIP 在大量 VQA 数据上训练，倾向于输出简短答案；
            而原版 LLaVA 在对话数据上训练，倾向于输出详细回答。
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
              <p className="text-blue-400 font-semibold mb-2 text-sm">强制简短回答</p>
              <div className="font-mono text-xs">
                <p className="text-slate-300">
                  <strong className="text-amber-400">User:</strong> What is the color of the shirt?
                </p>
                <p className="text-blue-400 mt-1 mb-1">Answer the question using a single word or phrase.</p>
                <p className="text-slate-300">
                  <strong className="text-green-400">LLaVA:</strong> Yellow.
                </p>
              </div>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
              <p className="text-purple-400 font-semibold mb-2 text-sm">允许详细回答</p>
              <div className="font-mono text-xs">
                <p className="text-slate-300">
                  <strong className="text-amber-400">User:</strong> What is the color of the shirt?
                </p>
                <p className="text-slate-500 mt-1 mb-1">(无格式提示)</p>
                <p className="text-slate-300">
                  <strong className="text-green-400">LLaVA:</strong> The person in the image is wearing a bright yellow shirt...
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-500/10 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
            <h4 className="font-bold text-blue-400 mb-2">LLaVA vs InstructBLIP：能力差异的根源</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-white font-semibold mb-1">InstructBLIP 擅长：</p>
                <ul className="list-disc list-inside text-slate-400">
                  <li>VQA 等简短回答任务</li>
                  <li>在 Q-Former 上大量预训练</li>
                </ul>
              </div>
              <div>
                <p className="text-white font-semibold mb-1">LLaVA 擅长：</p>
                <ul className="list-disc list-inside text-slate-400">
                  <li>多轮对话、详细描述</li>
                  <li>指令跟随和推理</li>
                </ul>
              </div>
            </div>
            <p className="text-green-400 text-sm mt-3">
              <strong>LLaVA-1.5 的解决方案：</strong> 通过响应格式提示，在同一模型中平衡两种能力！
            </p>
          </div>
          
          <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-r-lg">
            <h4 className="font-bold text-amber-400 mb-2">数据效率的关键发现</h4>
            <p className="text-sm text-slate-400 mb-2">
              论文进行了数据效率实验，发现：
            </p>
            <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
              <li>随机下采样 <strong className="text-white">50%</strong> 数据：性能几乎无损</li>
              <li>随机下采样 <strong className="text-white">75%</strong> 数据：性能仅下降 1-2%</li>
              <li>说明 LLaVA-1.5 的训练数据存在<strong className="text-green-400">冗余</strong>，未来可通过更智能的数据选择进一步优化</li>
            </ul>
          </div>
        </section>

        {/* 4. 实验结果 */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="bg-red-500/20 text-red-400 p-2 rounded-lg">
              <BarChart3 size={20} />
            </span>
            主要实验结论
          </h2>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-left text-slate-400">
              <thead className="text-xs text-slate-300 uppercase bg-slate-800">
                <tr>
                  <th className="px-4 py-3">Benchmark</th>
                  <th className="px-4 py-3">LLaVA (Original)</th>
                  <th className="px-4 py-3 text-blue-400 font-bold">LLaVA-1.5 (13B)</th>
                  <th className="px-4 py-3">InstructBLIP (13B)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-700 hover:bg-slate-800/50">
                  <td className="px-4 py-3 font-semibold text-white">VQAv2</td>
                  <td className="px-4 py-3 text-slate-500">-</td>
                  <td className="px-4 py-3 font-bold text-blue-400">80.0</td>
                  <td className="px-4 py-3">49.5</td>
                </tr>
                <tr className="border-b border-slate-700 hover:bg-slate-800/50">
                  <td className="px-4 py-3 font-semibold text-white">GQA</td>
                  <td className="px-4 py-3 text-slate-500">-</td>
                  <td className="px-4 py-3 font-bold text-blue-400">63.3</td>
                  <td className="px-4 py-3">49.5</td>
                </tr>
                <tr className="border-b border-slate-700 hover:bg-slate-800/50">
                  <td className="px-4 py-3 font-semibold text-white">MM-Vet</td>
                  <td className="px-4 py-3">25.5</td>
                  <td className="px-4 py-3 font-bold text-blue-400">36.1</td>
                  <td className="px-4 py-3">25.6</td>
                </tr>
                <tr className="border-b border-slate-700 hover:bg-slate-800/50">
                  <td className="px-4 py-3 font-semibold text-white">MME</td>
                  <td className="px-4 py-3">809.6</td>
                  <td className="px-4 py-3 font-bold text-blue-400">1531.3</td>
                  <td className="px-4 py-3">1212.8</td>
                </tr>
                <tr className="border-b border-slate-700 hover:bg-slate-800/50">
                  <td className="px-4 py-3 font-semibold text-white">TextVQA</td>
                  <td className="px-4 py-3 text-slate-500">-</td>
                  <td className="px-4 py-3 font-bold text-blue-400">61.3</td>
                  <td className="px-4 py-3">50.7</td>
                </tr>
                <tr className="hover:bg-slate-800/50">
                  <td className="px-4 py-3 font-semibold text-white">POPE (Acc)</td>
                  <td className="px-4 py-3 text-slate-500">-</td>
                  <td className="px-4 py-3 font-bold text-blue-400">85.9</td>
                  <td className="px-4 py-3">-</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/30">
              <h4 className="font-bold text-orange-400 mb-2 flex items-center gap-2">
                <Zap size={16} />
                零样本格式泛化
              </h4>
              <p className="text-sm text-slate-400">
                虽然 LLaVA-1.5 仅在有限的指令格式上训练，但它能够泛化到<strong className="text-white">未见过的格式指令</strong>（如 JSON 输出），展现强大的指令遵循能力。
              </p>
            </div>
            <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
              <h4 className="font-bold text-purple-400 mb-2 flex items-center gap-2">
                <Grid3X3 size={16} />
                减少幻觉 (Hallucination)
              </h4>
              <p className="text-sm text-slate-400">
                通过提高输入分辨率和引入更准确的数据，LLaVA-1.5 在 <strong className="text-white">POPE 基准测试</strong>中显示出显著降低的幻觉率。
              </p>
            </div>
          </div>
        </section>

        {/* 5. 消融实验 */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="bg-amber-500/20 text-amber-400 p-2 rounded-lg">
              <Grid3X3 size={20} />
            </span>
            消融实验与关键发现
          </h2>

          <h3 className="text-lg font-bold text-white mb-3">1. 连接器类型消融</h3>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-left text-slate-400">
              <thead className="text-xs text-slate-300 uppercase bg-slate-800">
                <tr>
                  <th className="px-4 py-2">Connector</th>
                  <th className="px-4 py-2">VQAv2</th>
                  <th className="px-4 py-2">GQA</th>
                  <th className="px-4 py-2">MME</th>
                  <th className="px-4 py-2">MM-Vet</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-700">
                  <td className="px-4 py-2 text-white">Linear</td>
                  <td className="px-4 py-2">78.5</td>
                  <td className="px-4 py-2">61.6</td>
                  <td className="px-4 py-2">1476.9</td>
                  <td className="px-4 py-2">31.4</td>
                </tr>
                <tr className="bg-green-500/10">
                  <td className="px-4 py-2 text-green-400 font-bold">MLP (2-layer)</td>
                  <td className="px-4 py-2 font-bold text-green-400">80.0</td>
                  <td className="px-4 py-2 font-bold text-green-400">63.3</td>
                  <td className="px-4 py-2 font-bold text-green-400">1531.3</td>
                  <td className="px-4 py-2 font-bold text-green-400">36.1</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-slate-400 text-sm mb-6">
            <strong className="text-green-400">结论：</strong> MLP 在所有任务上都优于 Linear，平均提升 <strong className="text-white">2-5%</strong>。
          </p>

          <h3 className="text-lg font-bold text-white mb-3">2. 分辨率消融</h3>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-left text-slate-400">
              <thead className="text-xs text-slate-300 uppercase bg-slate-800">
                <tr>
                  <th className="px-4 py-2">分辨率</th>
                  <th className="px-4 py-2">视觉 Tokens</th>
                  <th className="px-4 py-2">TextVQA</th>
                  <th className="px-4 py-2">POPE (Acc)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-700">
                  <td className="px-4 py-2 text-white">224px</td>
                  <td className="px-4 py-2">256</td>
                  <td className="px-4 py-2">55.1</td>
                  <td className="px-4 py-2">83.2</td>
                </tr>
                <tr className="bg-green-500/10">
                  <td className="px-4 py-2 text-green-400 font-bold">336px</td>
                  <td className="px-4 py-2">576</td>
                  <td className="px-4 py-2 font-bold text-green-400">61.3</td>
                  <td className="px-4 py-2 font-bold text-green-400">85.9</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-slate-400 text-sm mb-6">
            <strong className="text-green-400">结论：</strong> 提升分辨率显著改善 <strong className="text-white">TextVQA（+6.2%）</strong> 和 <strong className="text-white">幻觉降低（+2.7%）</strong>。
          </p>

          <h3 className="text-lg font-bold text-white mb-3">3. LLaVA-1.5 vs Q-Former 深度对比</h3>
          <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg mb-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold text-white mb-2">Q-Former (BLIP-2/InstructBLIP)</h4>
                <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                  <li>需要大量预训练数据（<strong className="text-red-400">129M+</strong>）</li>
                  <li>固定输出 32 个 query tokens</li>
                  <li>训练复杂，调参困难</li>
                  <li>可能丢失细粒度视觉信息</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-white mb-2">MLP Connector (LLaVA-1.5)</h4>
                <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                  <li>仅需 <strong className="text-green-400">558K</strong> 预训练数据</li>
                  <li>保留所有 576 个视觉 tokens</li>
                  <li>结构简单，易于训练</li>
                  <li>保留完整的空间信息</li>
                </ul>
              </div>
            </div>
            <p className="text-green-400 text-sm mt-3">
              <strong>论文核心发现：</strong> 简单的 MLP 连接器 + 更多视觉 tokens 可以超越复杂的 Q-Former！
            </p>
          </div>
        </section>

        {/* 6. 开放问题探索 */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="bg-cyan-500/20 text-cyan-400 p-2 rounded-lg">
              <FileText size={20} />
            </span>
            开放问题探索
          </h2>

          <p className="text-slate-400 mb-4">
            论文还对 LMM 领域的一些开放问题进行了初步探索：
          </p>

          <div className="space-y-4">
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <h4 className="font-bold text-white mb-2">1. 组合能力 (Compositional Capabilities)</h4>
              <p className="text-sm text-slate-400">
                训练数据中的<strong className="text-white">长文本语言推理（ShareGPT）</strong>与<strong className="text-white">短视觉推理（VQA）</strong>可以组合，
                使模型在多模态问题上展现出更强的写作能力。
              </p>
              <div className="bg-slate-900/50 p-3 rounded mt-2 text-xs">
                <p className="text-slate-500">实验发现：仅训练 ShareGPT 文本数据也能提升多模态对话质量，说明语言能力可以正向迁移。</p>
              </div>
            </div>
            
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <h4 className="font-bold text-white mb-2">2. 数据粒度与幻觉的关系</h4>
              <p className="text-sm text-slate-400">
                <strong className="text-red-400">警告：</strong> 盲目增加细粒度数据（如密集 caption）可能导致<strong className="text-white">幻觉增加</strong>。
                数据质量和粒度需要与模型能力匹配。
              </p>
              <div className="bg-red-500/10 border border-red-500/30 p-3 rounded mt-2 text-xs">
                <p className="text-red-400">论文发现：使用过多区域级标注数据反而会让模型更容易"编造"不存在的对象。</p>
              </div>
            </div>
            
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <h4 className="font-bold text-white mb-2">3. 高分辨率与幻觉降低</h4>
              <p className="text-sm text-slate-400">
                提高输入分辨率不仅提升了细节感知，还<strong className="text-green-400">显著降低了幻觉</strong>。
                模型能够"看得更清楚"，因此更少地"编造"细节。
              </p>
              <div className="bg-green-500/10 border border-green-500/30 p-3 rounded mt-2 text-xs">
                <p className="text-green-400">POPE 幻觉评估：224px → 336px 准确率从 83.2% 提升到 85.9%</p>
              </div>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <h4 className="font-bold text-white mb-2">4. 全连接 vs Resampler 的深层思考</h4>
              <p className="text-sm text-slate-400">
                Q-Former 等 Resampler 的设计初衷是<strong className="text-white">压缩视觉信息</strong>以节省计算。
                但 LLaVA-1.5 证明：
              </p>
              <ul className="list-disc list-inside text-sm text-slate-400 mt-2 space-y-1">
                <li>现代 LLM 有足够能力处理更多视觉 tokens</li>
                <li>保留完整信息比压缩更重要</li>
                <li>简单设计更容易训练和调试</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 6. 总结 */}
        <section className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 rounded-xl p-6 border border-blue-800">
          <h2 className="text-2xl font-bold text-white mb-4">核心启示</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-900/50 p-4 rounded-lg">
              <h4 className="font-bold text-blue-400 mb-2">✅ 简单即有效</h4>
              <p className="text-sm text-slate-400">
                MLP 连接器 + 高分辨率 + 学术数据 = 11 项 SOTA
              </p>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-lg">
              <h4 className="font-bold text-green-400 mb-2">✅ 数据效率极高</h4>
              <p className="text-sm text-slate-400">
                仅需 1.2M 公开数据，1 天内在单节点完成训练
              </p>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-lg">
              <h4 className="font-bold text-purple-400 mb-2">✅ 易于复现</h4>
              <p className="text-sm text-slate-400">
                完全使用公开数据，代码和模型全部开源
              </p>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-lg">
              <h4 className="font-bold text-amber-400 mb-2">✅ 格式提示重要</h4>
              <p className="text-sm text-slate-400">
                明确的响应格式指令可平衡长/短回答能力
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-500 py-8 text-center text-sm border-t border-slate-800">
        <p>基于论文 "Improved Baselines with Visual Instruction Tuning" (arXiv:2310.03744) 生成</p>
      </footer>
    </div>
  );
};

export default LLaVA15;

