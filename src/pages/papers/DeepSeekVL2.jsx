import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Info, Layers, Cpu, Database, Zap, BarChart3, Brain, Grid3X3, Plug, Calculator, Lightbulb, Check, ArrowRight, Image, MessageSquare, Target, TrendingUp } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

// --- 通用组件 ---
const Section = ({ id, title, icon: Icon, iconBg = "bg-blue-500", children }) => (
  <section id={id} className="bg-white rounded-xl shadow-md p-8 mb-8 hover:shadow-lg transition-shadow">
    <div className="flex items-center mb-6">
      <div className={`${iconBg} text-white rounded-lg p-3 mr-4`}>
        <Icon size={24} />
      </div>
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
    </div>
    {children}
  </section>
);

const MathBlock = ({ children, title }) => (
  <div className="overflow-x-auto p-4 bg-white rounded-lg border-l-4 border-blue-500 shadow-sm my-4">
    {title && <p className="font-bold mb-2 text-sm text-slate-500">{title}</p>}
    <BlockMath math={children} />
  </div>
);

const InfoBox = ({ title, children }) => (
  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mt-3 rounded-r-lg">
    <div className="font-bold text-amber-800 mb-1 flex items-center gap-2">
      <Lightbulb size={16} />
      {title}
    </div>
    <div className="text-amber-900 text-sm">{children}</div>
  </div>
);

const StepNumber = ({ num }) => (
  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-sm font-bold mr-2">
    {num}
  </span>
);

// --- 主组件 ---
const DeepSeekVL2 = () => {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans selection:bg-blue-100">
      
      {/* 返回按钮 */}
      <div className="fixed top-4 left-4 z-50">
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-lg text-slate-600 hover:text-blue-600 transition-colors border border-slate-200 shadow-sm"
        >
          <ArrowLeft size={16} />
          返回
        </Link>
      </div>

      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-blue-400 font-mono text-sm mb-2">arXiv:2412.10302v1 [cs.CV]</div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">DeepSeek-VL2 论文深度解析</h1>
          <p className="text-xl text-slate-300 leading-relaxed mb-6">
            面向高级多模态理解的混合专家（MoE）视觉语言模型
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="text-sm bg-blue-500/20 text-blue-200 py-1.5 px-3 rounded-full border border-blue-400/30">MoE Architecture</span>
            <span className="text-sm bg-green-500/20 text-green-200 py-1.5 px-3 rounded-full border border-green-400/30">Dynamic Tiling</span>
            <span className="text-sm bg-purple-500/20 text-purple-200 py-1.5 px-3 rounded-full border border-purple-400/30">Multi-head Latent Attention</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">

        {/* 1. 引言与概览 */}
        <Section id="intro" title="1. 引言与概览" icon={Info} iconBg="bg-blue-500">
          <p className="mb-4 leading-7 text-slate-700">
            DeepSeek-VL2 是 DeepSeek-VL 的继任者，旨在通过两个关键升级显著提升性能和效率：
          </p>
          <ul className="list-disc list-inside space-y-2 mb-6 text-slate-700 ml-4">
            <li><strong className="text-slate-900">视觉组件升级：</strong> 引入<strong className="text-blue-600">动态分块（Dynamic Tiling）</strong>视觉编码策略，以处理不同宽高比的高分辨率图像。</li>
            <li><strong className="text-slate-900">语言组件升级：</strong> 利用 DeepSeekMoE 模型和<strong className="text-purple-600">多头潜在注意力（MLA）</strong>机制，压缩 Key-Value 缓存，实现高效推理。</li>
          </ul>
          
          {/* 模型变体 */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200 text-center">
              <div className="text-xs text-slate-500 mb-1">Tiny</div>
              <div className="text-3xl font-bold text-blue-600">1.0B</div>
              <div className="text-xs text-slate-400">Activated Params</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-teal-50 p-4 rounded-lg border border-green-200 text-center">
              <div className="text-xs text-slate-500 mb-1">Small</div>
              <div className="text-3xl font-bold text-green-600">2.8B</div>
              <div className="text-xs text-slate-400">Activated Params</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200 text-center">
              <div className="text-xs text-slate-500 mb-1">Standard</div>
              <div className="text-3xl font-bold text-purple-600">4.5B</div>
              <div className="text-xs text-slate-400">Activated Params</div>
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-3 text-center">
            *激活参数量；总参数量分别为 3B、16B、27B
          </p>
        </Section>

        {/* 1.5 与 DeepSeek-VL 的架构演进对比 */}
        <Section id="comparison" title="1.5 与 DeepSeek-VL 的架构演进" icon={TrendingUp} iconBg="bg-orange-500">
          <p className="mb-6 text-slate-700">
            DeepSeek-VL2 相比前代 DeepSeek-VL 进行了全面的架构升级，以下是核心差异对比：
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-800">组件</th>
                  <th className="px-4 py-3 text-left font-bold text-slate-800">DeepSeek-VL</th>
                  <th className="px-4 py-3 text-left font-bold text-slate-800">DeepSeek-VL2</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium text-slate-900">视觉编码器</td>
                  <td className="px-4 py-3 text-slate-600">
                    <strong>混合编码器</strong><br/>
                    SigLIP-L (384×384) + SAM-B (1024×1024)
                  </td>
                  <td className="px-4 py-3 text-green-700">
                    <strong>单一编码器 + 动态分块</strong><br/>
                    SigLIP-SO400M (384×384) × N tiles
                  </td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">分辨率策略</td>
                  <td className="px-4 py-3 text-slate-600">固定 1024×1024</td>
                  <td className="px-4 py-3 text-green-700">动态分块，最多 9 块 (最高 1152×1152)</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium text-slate-900">语言模型</td>
                  <td className="px-4 py-3 text-slate-600">DeepSeek-LLM (Dense)</td>
                  <td className="px-4 py-3 text-green-700">DeepSeekMoE + MLA</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">KV Cache</td>
                  <td className="px-4 py-3 text-slate-600">标准 Multi-Head Attention</td>
                  <td className="px-4 py-3 text-green-700">MLA 压缩，显存降低 93.3%</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium text-slate-900">视觉 Token 数</td>
                  <td className="px-4 py-3 text-slate-600">576 (固定)</td>
                  <td className="px-4 py-3 text-green-700">211 ~ 1,981 (动态)</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">多图支持</td>
                  <td className="px-4 py-3 text-slate-600">有限支持</td>
                  <td className="px-4 py-3 text-green-700">原生多图对话</td>
                </tr>
              </tbody>
            </table>
          </div>

          <InfoBox title="为什么放弃混合编码器（SigLIP + SAM）？">
            <p className="mb-2">DeepSeek-VL 使用 SigLIP + SAM 混合编码器来同时捕捉语义和细节。但这种设计存在问题：</p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>固定分辨率限制：</strong> 1024×1024 对极端宽高比图像效率低下</li>
              <li><strong>冗余计算：</strong> 两个编码器处理同一图像，计算量翻倍</li>
              <li><strong>特征对齐困难：</strong> 两个编码器的特征空间不同，融合有挑战</li>
            </ul>
            <p className="mt-2">VL2 通过<strong>动态分块 + 全局缩略图</strong>策略，用单一编码器同时实现语义理解和细节捕捉，更加高效。</p>
          </InfoBox>
        </Section>

        {/* 2. 模型架构详解 */}
        <Section id="architecture" title="2. 模型架构详解" icon={Layers} iconBg="bg-indigo-500">
          <p className="mb-6 text-slate-700">
            模型由三个核心模块组成：<strong>视觉编码器（Vision Encoder）</strong>、<strong>视觉-语言适配器（VL Adaptor）</strong>和<strong>混合专家语言模型（MoE LLM）</strong>。整体架构基于 LLaVA 风格。
          </p>

          {/* 架构流程图 */}
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-8">
            <h4 className="font-bold text-slate-800 mb-4 text-center">整体架构流程</h4>
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
              <div className="bg-green-100 border border-green-300 px-4 py-2 rounded-lg text-green-800 font-medium">
                <Image size={16} className="inline mr-1" />
                输入图像
              </div>
              <ArrowRight className="text-slate-400" size={20} />
              <div className="bg-blue-100 border border-blue-300 px-4 py-2 rounded-lg text-blue-800 font-medium">
                Dynamic Tiling
              </div>
              <ArrowRight className="text-slate-400" size={20} />
              <div className="bg-indigo-100 border border-indigo-300 px-4 py-2 rounded-lg text-indigo-800 font-medium">
                SigLIP-SO400M
              </div>
              <ArrowRight className="text-slate-400" size={20} />
              <div className="bg-purple-100 border border-purple-300 px-4 py-2 rounded-lg text-purple-800 font-medium">
                Pixel Shuffle 2×2
              </div>
              <ArrowRight className="text-slate-400" size={20} />
              <div className="bg-pink-100 border border-pink-300 px-4 py-2 rounded-lg text-pink-800 font-medium">
                MLP Adaptor
              </div>
              <ArrowRight className="text-slate-400" size={20} />
              <div className="bg-red-100 border border-red-300 px-4 py-2 rounded-lg text-red-800 font-medium">
                <Brain size={16} className="inline mr-1" />
                DeepSeekMoE
              </div>
            </div>
          </div>

          {/* 2.0 视觉编码器 */}
          <div id="vision-encoder" className="mb-10">
            <h3 className="text-xl font-bold mb-4 text-blue-700 flex items-center gap-2">
              <Image size={20} />
              视觉编码器：SigLIP-SO400M
            </h3>
            <p className="mb-4 text-slate-700">
              DeepSeek-VL2 使用 <strong>SigLIP-SO400M</strong> 作为视觉编码器，这是 Google 提出的改进版 CLIP 模型。
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-800 mb-2">模型规格</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• 输入分辨率：<strong>384 × 384</strong></li>
                  <li>• Patch Size：<strong>14 × 14</strong></li>
                  <li>• 输出特征：<strong>27 × 27 × 1152</strong></li>
                  <li>• 参数量：<strong>400M</strong></li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-800 mb-2">SigLIP vs CLIP</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• 使用 <strong>Sigmoid 损失</strong>替代 Softmax 对比损失</li>
                  <li>• 无需全局 Batch 同步，训练更高效</li>
                  <li>• 更好的 Zero-shot 分类性能</li>
                  <li>• SO400M 变体在 WebLI 数据集上训练</li>
                </ul>
              </div>
            </div>

            <MathBlock title="特征提取过程：">{`I_{tile} \\in \\mathbb{R}^{384 \\times 384 \\times 3} \\xrightarrow{\\text{SigLIP}} F_{tile} \\in \\mathbb{R}^{27 \\times 27 \\times 1152}`}</MathBlock>
            <p className="text-sm text-slate-500">
              解释：每个 384×384 的图块经过 SigLIP 编码后，得到 27×27 的特征网格（因为 384/14 ≈ 27），每个位置的特征维度为 1152。
            </p>
          </div>

          {/* 2.1 动态分块 */}
          <div id="dynamic-tiling" className="mb-10 border-t border-slate-200 pt-8">
            <h3 className="text-xl font-bold mb-4 text-blue-700 flex items-center gap-2">
              <Grid3X3 size={20} />
              核心创新：动态分块 (Dynamic Tiling) 原理
            </h3>
            <p className="mb-4 text-slate-700">
              传统的固定分辨率编码（如 <InlineMath math="1024 \times 1024" />）在处理极端宽高比图像时效率低下且会导致图像变形。DeepSeek-VL2 采用动态策略，基于基础分辨率 <InlineMath math="384 \times 384" /> 将图像切分为多个图块（Tiles）。
            </p>

            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-6">
              <h4 className="font-bold text-slate-800 mb-2">1. 候选分辨率集合 <InlineMath math="C_R" /></h4>
              <p className="text-sm text-slate-600 mb-3">
                为了适应不同的宽高比，模型定义了一组候选分辨率集合 <InlineMath math="C_R" />。每个候选分辨率对应一个 <InlineMath math="m \times n" /> 的网格，其中 <InlineMath math="m" /> 是行数，<InlineMath math="n" /> 是列数。
              </p>
              <MathBlock>{`C_{R} = \\{(m \\times 384, n \\times 384) \\mid m, n \\in \\mathbb{N}^+, mn \\le 9\\}`}</MathBlock>
              <ul className="list-disc list-inside text-sm text-slate-700 space-y-1 ml-4 mb-4">
                <li><InlineMath math="m" />: 垂直方向的块数（Height blocks）</li>
                <li><InlineMath math="n" />: 水平方向的块数（Width blocks）</li>
                <li><InlineMath math="384" />: 基础视觉编码器 (SigLIP-SO400M) 的输入分辨率</li>
                <li><InlineMath math="mn \le 9" />: 限制最大图块数量为 9 个，以平衡性能与显存</li>
              </ul>
            </div>

            {/* 算法步骤与示例 */}
            <div id="algorithm-example" className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
              <h4 className="font-bold text-indigo-900 mb-4 text-lg flex items-center gap-2">
                <Calculator size={20} />
                具体算法与示例 (Algorithm & Example)
              </h4>
              
              <div className="mb-6">
                <h5 className="font-bold text-indigo-800 mb-3">算法步骤：</h5>
                <ol className="space-y-4 text-sm text-slate-700">
                  <li className="flex items-start">
                    <StepNumber num="1" />
                    <span><strong>输入：</strong> 原始图像 <InlineMath math="I" />，尺寸为 <InlineMath math="(H_{input}, W_{input})" />。</span>
                  </li>
                  <li className="flex items-start">
                    <StepNumber num="2" />
                    <span><strong>遍历：</strong> 遍历集合 <InlineMath math="C_R" /> 中所有的候选分辨率 <InlineMath math="(H_c, W_c)" />，其中 <InlineMath math="H_c = m \cdot 384, W_c = n \cdot 384" />。</span>
                  </li>
                  <li className="flex items-start flex-col">
                    <div className="flex items-start">
                      <StepNumber num="3" />
                      <div>
                        <strong>调整尺寸 (Resize)：</strong> 将原始图像等比例缩放，使其能够完全放入候选分辨率 <InlineMath math="(H_c, W_c)" /> 的框内。
                        <div className="mt-2 text-slate-600">
                          计算缩放比例：<InlineMath math="s = \min(\frac{H_c}{H_{input}}, \frac{W_c}{W_{input}})" />
                        </div>
                        <div className="text-slate-600">
                          缩放后尺寸：<InlineMath math="H_{new} = H_{input} \cdot s, \quad W_{new} = W_{input} \cdot s" />
                        </div>
                      </div>
                    </div>
                    <InfoBox title="为什么使用 Min 而不是 Max？">
                      <p className="mb-2">为了<strong>"完整包含，不被裁剪"</strong>。</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li><strong>如果用 Max：</strong> 我们会基于"短边"去填满目标框，这会导致图像的"长边"超出目标框的范围，<strong>图像会被裁剪，信息丢失</strong>。</li>
                        <li><strong>如果用 Min：</strong> 我们基于"长边"去适应目标框，确保长边刚好塞进去，而短边则会留有空隙（这就是 Padding 的来源）。<strong>这保证了图像的 100% 内容都在框内。</strong></li>
                      </ul>
                    </InfoBox>
                  </li>
                  <li className="flex items-start">
                    <StepNumber num="4" />
                    <div>
                      <strong>计算填充 (Padding)：</strong> 计算候选分辨率区域中未被图像覆盖的面积（即填充区域）。
                      <div className="mt-1 text-slate-600">
                        公式：<InlineMath math="Padding = (H_c \times W_c) - (H_{new} \times W_{new})" />
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <StepNumber num="5" />
                    <span><strong>选择：</strong> 选择 <InlineMath math="Padding" /> 值最小的那个候选分辨率 <InlineMath math="(m_{best}, n_{best})" />。</span>
                  </li>
                </ol>
              </div>

              {/* 计算示例 */}
              <div className="border-t border-indigo-200 pt-4">
                <h5 className="font-bold text-indigo-800 mb-3">计算示例：</h5>
                <p className="text-sm text-slate-600 mb-3">
                  假设输入图像尺寸为：<strong>1000 × 500</strong> (宽 × 高，宽高比 2:1)。注意：在算法中我们通常用 H × W 表示，即输入 H=500, W=1000。
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                    <span className="font-bold text-red-500">候选 A: 1×1 网格</span>
                    <div className="mt-2 text-slate-600 space-y-1">
                      <div>目标尺寸：384 × 384</div>
                      <div>宽高比：1:1</div>
                      <div className="font-medium text-slate-800">使用 Min 缩放：</div>
                      <div><InlineMath math="W_{scale} = 384/1000 = 0.384" /> (更小)</div>
                      <div><InlineMath math="H_{scale} = 384/500 = 0.768" /></div>
                      <div>取 <InlineMath math="s=0.384" />。</div>
                      <div>新尺寸：192 × 384 (高 × 宽)</div>
                      <div className="font-bold text-red-600">填充面积：50% 区域为空</div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-green-500">
                    <span className="font-bold text-green-600 flex items-center gap-2">
                      候选 B: 1×2 网格 <Check size={16} className="text-green-500" />
                    </span>
                    <div className="mt-2 text-slate-600 space-y-1">
                      <div>目标尺寸：384 × 768 (H=384, W=768)</div>
                      <div>宽高比：2:1 (W:H)</div>
                      <div className="font-medium text-slate-800">使用 Min 缩放：</div>
                      <div><InlineMath math="H_{scale} = 384/500 = 0.768" /></div>
                      <div><InlineMath math="W_{scale} = 768/1000 = 0.768" /></div>
                      <div>两者相等，<InlineMath math="s=0.768" />。</div>
                      <div>完美匹配！缩放后为 384 × 768</div>
                      <div className="font-bold text-green-600">填充面积：0（最优解）</div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-3 italic">
                  *在这个例子中，模型会选择 1×2 的切分方式，即垂直方向1块，水平方向2块。
                </p>
              </div>
            </div>
          </div>

          {/* 2.2 VL Adaptor */}
          <div id="adaptor" className="mb-10 border-t border-slate-200 pt-8">
            <h3 className="text-xl font-bold mb-4 text-blue-700 flex items-center gap-2">
              <Plug size={20} />
              视觉-语言适配器 (VL Adaptor)
            </h3>
            <p className="mb-4 text-slate-700">
              适配器负责将视觉特征压缩并投影到语言模型的嵌入空间。核心操作是 <strong>Pixel Shuffle</strong> 下采样。
            </p>

            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
              <h4 className="font-bold text-slate-800 mb-2">1. 像素重组 (Pixel Shuffle) 详解</h4>
              <p className="text-sm text-slate-600 mb-4">
                Pixel Shuffle 是一种高效的空间下采样方法，通过将相邻像素"折叠"到通道维度来减少空间分辨率。
              </p>

              <MathBlock title="Pixel Shuffle 2×2 变换公式：">{`F_{in} \\in \\mathbb{R}^{H \\times W \\times C} \\xrightarrow{\\text{PixelShuffle}_{2\\times2}} F_{out} \\in \\mathbb{R}^{\\frac{H}{2} \\times \\frac{W}{2} \\times 4C}`}</MathBlock>

              <div className="bg-white p-4 rounded-lg border border-slate-200 my-4">
                <h5 className="font-bold text-slate-700 mb-2">具体计算过程：</h5>
                <div className="text-sm text-slate-600 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-mono text-xs">输入</span>
                    <span>27 × 27 × 1152（来自 SigLIP）</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded font-mono text-xs">Pad</span>
                    <span>填充到 28 × 28 × 1152（使尺寸可被 2 整除）</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded font-mono text-xs">Shuffle</span>
                    <span>28/2 × 28/2 × (1152×4) = 14 × 14 × 4608</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded font-mono text-xs">MLP</span>
                    <span>投影到 LLM 隐藏维度（如 2048）</span>
                  </div>
                </div>
              </div>

              <InfoBox title="为什么使用 Pixel Shuffle 而不是平均池化？">
                <p><strong>Pixel Shuffle 保留了所有信息</strong>，只是重新排列；而平均池化会丢失细节。这对于 OCR 等需要细节的任务至关重要。</p>
              </InfoBox>

              <h4 className="font-bold text-slate-800 mb-2">2. 特殊 Token 注入与总数计算</h4>
              <p className="text-sm text-slate-600 mb-3">
                为了让 LLM 理解 2D 空间结构，引入了特殊 Token：<code className="bg-slate-200 px-1.5 py-0.5 rounded text-blue-700">&lt;tile_newline&gt;</code> 和 <code className="bg-slate-200 px-1.5 py-0.5 rounded text-blue-700">&lt;view_separator&gt;</code>。
              </p>

              <MathBlock title="总视觉 Token 数量计算公式：">{`N_{tokens} = 210 + 1 + m_{i} \\times 14 \\times (n_{i} \\times 14 + 1)`}</MathBlock>

              <h4 className="font-bold text-slate-800 mb-2 text-sm uppercase tracking-wide">公式详细拆解：</h4>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 font-mono px-2 py-1 rounded mr-3 whitespace-nowrap">210</span>
                  <span>
                    <strong>全局缩略图部分：</strong> 来自 14 × 14 的特征网格。为了保持一致性，也在每一行末尾添加了 1 个换行符。
                    <br />计算：14 × (14 + 1) = 210。
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 font-mono px-2 py-1 rounded mr-3 whitespace-nowrap">1</span>
                  <span>
                    <strong>视图分隔符：</strong> <code className="bg-slate-200 px-1 rounded text-blue-700">&lt;view_separator&gt;</code>，用于分隔全局视图和局部视图。
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 font-mono px-2 py-1 rounded mr-3 whitespace-nowrap text-xs">公式部分</span>
                  <span>
                    <strong>局部图块部分：</strong> <InlineMath math="m_i \times n_i" /> 个图块被排列成 2D 网格。
                    <br />总体高度（行数）为 <InlineMath math="m_i \times 14" />。
                    <br />每一行包含 <InlineMath math="n_i" /> 个图块的宽度（即 <InlineMath math="n_i \times 14" /> 个 Token），并在该行的最末尾添加 1 个 <code className="bg-slate-200 px-1 rounded text-blue-700">&lt;tile_newline&gt;</code>。
                    <br />即：<InlineMath math="m_i \times 14 \times (n_i \times 14 + 1)" />。
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* 2.3 LLM */}
          <div id="llm" className="border-t border-slate-200 pt-8 mb-10">
            <h3 className="text-xl font-bold mb-4 text-blue-700 flex items-center gap-2">
              <Brain size={20} />
              DeepSeekMoE LLM
            </h3>
            <p className="mb-4 text-slate-700">
              DeepSeek-VL2 采用了 DeepSeek-V2 的语言模型架构，核心特点包括：
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-5 border border-slate-200 rounded-lg shadow-sm">
                <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  MLA (Multi-head Latent Attention)
                </h4>
                <p className="text-sm text-slate-600">
                  <strong>多头潜在注意力</strong>：通过将 Key-Value (KV) 缓存压缩为潜在向量（Latent Vector），显著降低了推理时的显存占用，并提高了吞吐量。
                </p>
              </div>
              <div className="bg-white p-5 border border-slate-200 rounded-lg shadow-sm">
                <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  MoE (Mixture-of-Experts)
                </h4>
                <p className="text-sm text-slate-600">
                  <strong>混合专家模型</strong>：使用细粒度的专家分割和共享专家（Shared Experts）策略。这允许模型拥有巨大的参数总量（如 27B），但推理时仅激活少量参数（如 4.1B），兼顾性能与效率。
                </p>
              </div>
            </div>

            {/* MLA 详细原理 */}
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h4 className="font-bold text-purple-900 mb-3">MLA 核心原理详解</h4>
              <p className="text-sm text-purple-800 mb-4">
                传统 Multi-Head Attention 需要为每个 Token 缓存完整的 Key 和 Value 向量。MLA 通过<strong>低秩压缩</strong>将 KV Cache 压缩到潜在空间。
              </p>

              <MathBlock title="KV Cache 压缩公式：">{`c_t^{KV} = W^{DKV} h_t \\quad \\text{where} \\quad c_t^{KV} \\in \\mathbb{R}^{d_c}, \\quad d_c \\ll d_h \\cdot n_h`}</MathBlock>

              <div className="grid md:grid-cols-3 gap-3 mt-4 text-sm">
                <div className="bg-white p-3 rounded border border-purple-200">
                  <div className="font-bold text-purple-700">传统 MHA</div>
                  <div className="text-purple-600">KV Cache = <InlineMath math="2 \times n_h \times d_h" /></div>
                  <div className="text-xs text-purple-500 mt-1">每层每 Token</div>
                </div>
                <div className="bg-white p-3 rounded border border-purple-200">
                  <div className="font-bold text-purple-700">MLA</div>
                  <div className="text-purple-600">KV Cache = <InlineMath math="d_c + d_r" /></div>
                  <div className="text-xs text-purple-500 mt-1">压缩后的潜在向量</div>
                </div>
                <div className="bg-white p-3 rounded border border-green-200">
                  <div className="font-bold text-green-700">压缩比</div>
                  <div className="text-green-600 font-bold">~93.3%</div>
                  <div className="text-xs text-green-500 mt-1">KV Cache 显存节省</div>
                </div>
              </div>

              <InfoBox title="MLA 的核心洞察">
                <p>注意力机制中的 Key 和 Value 存在大量冗余。MLA 发现可以将它们压缩到一个低维潜在向量 <InlineMath math="c^{KV}" />，在推理时再解压回原始维度，几乎不损失性能。</p>
              </InfoBox>
            </div>
          </div>

          {/* 2.4 视觉定位能力 */}
          <div id="grounding" className="border-t border-slate-200 pt-8">
            <h3 className="text-xl font-bold mb-4 text-blue-700 flex items-center gap-2">
              <Target size={20} />
              视觉定位能力 (Visual Grounding)
            </h3>
            <p className="mb-4 text-slate-700">
              DeepSeek-VL2 支持<strong>视觉定位任务</strong>，即根据文本描述在图像中定位目标物体。模型使用特定的输入输出格式：
            </p>

            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
              <h4 className="font-bold text-slate-800 mb-3">Grounding 格式规范</h4>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded border border-slate-200">
                  <div className="font-medium text-slate-700 mb-2">输入格式（用户指令）：</div>
                  <code className="bg-slate-100 px-3 py-2 rounded text-sm block">
                    Locate <span className="text-blue-600">&lt;ref&gt;</span>the red car<span className="text-blue-600">&lt;/ref&gt;</span> in the image.
                  </code>
                </div>

                <div className="bg-white p-4 rounded border border-slate-200">
                  <div className="font-medium text-slate-700 mb-2">输出格式（模型回答）：</div>
                  <code className="bg-slate-100 px-3 py-2 rounded text-sm block">
                    <span className="text-green-600">[[0.123, 0.456, 0.789, 0.654]]</span>
                  </code>
                  <p className="text-xs text-slate-500 mt-2">
                    格式：<InlineMath math="[[x_1, y_1, x_2, y_2]]" />，坐标归一化到 [0, 1] 范围
                  </p>
                </div>

                <div className="bg-white p-4 rounded border border-slate-200">
                  <div className="font-medium text-slate-700 mb-2">多目标定位：</div>
                  <code className="bg-slate-100 px-3 py-2 rounded text-sm block">
                    <span className="text-green-600">[[0.1, 0.2, 0.3, 0.4], [0.5, 0.6, 0.7, 0.8]]</span>
                  </code>
                  <p className="text-xs text-slate-500 mt-2">
                    当图像中存在多个匹配目标时，返回多个边界框
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 3. 数据构建策略 */}
        <Section id="data" title="3. 数据构建策略" icon={Database} iconBg="bg-green-500">
          <p className="mb-4 text-slate-700">DeepSeek-VL2 的强大能力源于其全面且高质量的数据构建流程，涵盖三个阶段：</p>
          
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4 py-3 bg-green-50 rounded-r-lg">
              <h3 className="font-bold text-green-900">1. 视觉-语言对齐数据 (VL Alignment)</h3>
              <p className="text-sm text-green-800">使用 <strong>ShareGPT4V</strong> (1.2M 样本) 来训练 MLP 连接器，连接视觉编码器和 LLM。</p>
            </div>

            <div className="border-l-4 border-green-500 pl-4 py-3 bg-green-50 rounded-r-lg">
              <h3 className="font-bold text-green-900">2. 视觉-语言预训练数据 (VL Pretraining)</h3>
              <p className="text-sm text-green-800 mb-2"><strong>比例：</strong> 70% VL 数据 + 30% 纯文本数据。</p>
              <ul className="list-disc list-inside text-sm text-green-800 space-y-1">
                <li><strong>交错图文数据：</strong> WikiHow, WIT, OBELICS, Wanjuan (中文补充)。</li>
                <li><strong>图像描述 (Captioning)：</strong> 重新生成了大规模的高质量 Caption，利用 OCR 提示和元数据作为 Prompt。</li>
                <li><strong>OCR 数据：</strong> LaTeX OCR, RenderedText, 及内部文档数据。</li>
                <li><strong>视觉问答 (QA)：</strong> 通用 VQA, 图表/文档理解 (PubTabNet, FinTabNet), 代码生成 (Websight)。</li>
                <li><strong>视觉定位 (Grounding)：</strong> 构建了 "Locate &lt;ref&gt;...&lt;/ref&gt;" 格式的数据，要求模型输出归一化的坐标框 <code className="bg-green-200 px-1 rounded">[[x1, y1, x2, y2]]</code>。</li>
              </ul>
            </div>

            <div className="border-l-4 border-green-500 pl-4 py-3 bg-green-50 rounded-r-lg">
              <h3 className="font-bold text-green-900">3. 监督微调数据 (SFT)</h3>
              <p className="text-sm text-green-800">
                结合了开源数据和高质量的内部数据。特别针对 OCR 质量差、回答过短或幻觉问题进行了清洗和重生成。增强了逻辑推理、数学、图表理解以及视觉定位的能力。
              </p>
            </div>
          </div>
        </Section>

        {/* 4. 训练方法 */}
        <Section id="training" title="4. 训练方法" icon={Zap} iconBg="bg-purple-500">
          <p className="text-slate-700 mb-4">
            采用三阶段训练管道。值得注意的是，在预训练和微调阶段，<strong className="text-purple-700">视觉编码器也是解冻并参与训练的</strong>，这与许多保持视觉编码器冻结的方法不同。
          </p>
          
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-slate-600 border border-slate-200 rounded-lg overflow-hidden">
              <thead className="text-xs text-slate-700 uppercase bg-slate-100">
                <tr>
                  <th className="px-6 py-3 border-b">阶段</th>
                  <th className="px-6 py-3 border-b">目标</th>
                  <th className="px-6 py-3 border-b">可训练参数</th>
                  <th className="px-6 py-3 border-b">数据量</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">1. 对齐 (Alignment)</td>
                  <td className="px-6 py-4">建立视觉与语言特征的连接</td>
                  <td className="px-6 py-4">Vision Encoder, Adaptor (LLM 冻结)</td>
                  <td className="px-6 py-4">~1.2M 样本</td>
                </tr>
                <tr className="bg-white border-b hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">2. 预训练 (Pre-training)</td>
                  <td className="px-6 py-4">学习广泛的多模态知识</td>
                  <td className="px-6 py-4"><strong className="text-purple-600">全部参数解冻</strong></td>
                  <td className="px-6 py-4">~800B Tokens</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">3. 微调 (SFT)</td>
                  <td className="px-6 py-4">指令跟随与对话能力</td>
                  <td className="px-6 py-4"><strong className="text-purple-600">全部参数解冻</strong></td>
                  <td className="px-6 py-4">高质量 SFT 数据</td>
                </tr>
              </tbody>
            </table>
          </div>

          <InfoBox title="与 DeepSeek-VL 的训练策略差异">
            <p>DeepSeek-VL 在预训练阶段冻结视觉编码器，而 VL2 选择<strong>全程解冻</strong>。这使得视觉编码器能够更好地适应多模态任务，但也需要更大的计算资源。</p>
          </InfoBox>
        </Section>

        {/* 5. 评估结果 */}
        <Section id="evaluation" title="5. 评估结果" icon={BarChart3} iconBg="bg-red-500">
          
          {/* 详细 Benchmark 表格 */}
          <h3 className="font-bold text-lg mb-4 text-slate-800">5.1 多模态基准测试详细结果</h3>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-3 py-2 text-left font-bold text-slate-800">基准测试</th>
                  <th className="px-3 py-2 text-center font-bold text-slate-800">VL2-Tiny (1.0B)</th>
                  <th className="px-3 py-2 text-center font-bold text-slate-800">VL2-Small (2.8B)</th>
                  <th className="px-3 py-2 text-center font-bold text-slate-800">VL2 (4.5B)</th>
                  <th className="px-3 py-2 text-center font-bold text-slate-800">GPT-4o</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="bg-white">
                  <td className="px-3 py-2 font-medium">MMMU (val)</td>
                  <td className="px-3 py-2 text-center">41.5</td>
                  <td className="px-3 py-2 text-center">49.1</td>
                  <td className="px-3 py-2 text-center font-bold text-green-600">51.1</td>
                  <td className="px-3 py-2 text-center text-slate-500">69.1</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="px-3 py-2 font-medium">MMStar</td>
                  <td className="px-3 py-2 text-center">48.8</td>
                  <td className="px-3 py-2 text-center">54.5</td>
                  <td className="px-3 py-2 text-center font-bold text-green-600">57.3</td>
                  <td className="px-3 py-2 text-center text-slate-500">63.9</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-3 py-2 font-medium">OCRBench</td>
                  <td className="px-3 py-2 text-center">72.7</td>
                  <td className="px-3 py-2 text-center">80.9</td>
                  <td className="px-3 py-2 text-center font-bold text-green-600">83.7</td>
                  <td className="px-3 py-2 text-center text-slate-500">73.6</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="px-3 py-2 font-medium">DocVQA (test)</td>
                  <td className="px-3 py-2 text-center">88.9</td>
                  <td className="px-3 py-2 text-center">93.8</td>
                  <td className="px-3 py-2 text-center font-bold text-green-600">95.1</td>
                  <td className="px-3 py-2 text-center text-slate-500">92.8</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-3 py-2 font-medium">ChartQA (test)</td>
                  <td className="px-3 py-2 text-center">77.0</td>
                  <td className="px-3 py-2 text-center">84.0</td>
                  <td className="px-3 py-2 text-center font-bold text-green-600">86.0</td>
                  <td className="px-3 py-2 text-center text-slate-500">85.7</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="px-3 py-2 font-medium">RefCOCO (val)</td>
                  <td className="px-3 py-2 text-center">88.3</td>
                  <td className="px-3 py-2 text-center">93.4</td>
                  <td className="px-3 py-2 text-center font-bold text-green-600">93.6</td>
                  <td className="px-3 py-2 text-center text-slate-500">-</td>
                </tr>
              </tbody>
            </table>
          </div>

          <InfoBox title="关键发现：在 OCR 任务上超越 GPT-4o">
            <p>DeepSeek-VL2 在 OCRBench (83.7 vs 73.6) 和 DocVQA (95.1 vs 92.8) 上<strong>超越了 GPT-4o</strong>。这得益于动态分块策略对高分辨率图像的有效处理，使模型能够清晰识别文档中的细小文字。</p>
          </InfoBox>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-slate-800">5.2 总体性能分析</h3>
              <p className="text-slate-700 mb-4 text-sm leading-relaxed">
                DeepSeek-VL2 在多个基准测试中展现了 SOTA (State-of-the-Art) 或极具竞争力的性能。得益于 MoE 架构，它在保持较少激活参数的同时，性能超越了许多更大规模的密集模型。
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>OCR 相关：</strong> 在 OCRBench, DocVQA, ChartQA 上表现优异，得益于动态分块策略对高分辨率的支持。</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>通用 VQA：</strong> 在 MMMU, MMStar 等基准上超越同级别开源模型。</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>视觉定位：</strong> 在 RefCOCO 系列基准上取得了最佳结果。</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>多图理解：</strong> 原生支持多图对话，在多图推理任务上表现出色。</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-4 text-center">模型规格对比</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
                  <span className="font-medium text-slate-700">DeepSeek-VL2-Tiny</span>
                  <div className="text-right">
                    <div className="font-bold text-blue-600">1.0B</div>
                    <div className="text-xs text-slate-400">/ 3B Total</div>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
                  <span className="font-medium text-slate-700">DeepSeek-VL2-Small</span>
                  <div className="text-right">
                    <div className="font-bold text-green-600">2.8B</div>
                    <div className="text-xs text-slate-400">/ 16B Total</div>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
                  <span className="font-medium text-slate-700">DeepSeek-VL2</span>
                  <div className="text-right">
                    <div className="font-bold text-purple-600">4.5B</div>
                    <div className="text-xs text-slate-400">/ 27B Total</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 多图对话支持 */}
          <div className="mt-8 bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="font-bold text-green-900 mb-4 flex items-center gap-2">
              <MessageSquare size={20} />
              5.3 多图像对话支持
            </h3>
            <p className="text-sm text-green-800 mb-4">
              DeepSeek-VL2 原生支持<strong>多图像输入</strong>，可以在同一对话中处理多张图片并进行对比、分析和推理。
            </p>
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-800 mb-2">多图对话示例：</h4>
              <div className="text-sm text-slate-600 space-y-2">
                <div className="flex items-start gap-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-medium">用户</span>
                  <span>请比较这两张图片中的建筑风格有什么不同？[图片1] [图片2]</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">模型</span>
                  <span>第一张图片展示的是哥特式建筑，特点是尖拱、飞扶壁和高耸的塔尖；第二张图片是巴洛克风格，以华丽的装饰、曲线造型和圆顶为特征...</span>
                </div>
              </div>
            </div>
          </div>

          {/* 关键优势总结 */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
            <h3 className="font-bold text-slate-800 mb-4">核心技术优势总结</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="font-bold text-blue-700 mb-2">动态分块</div>
                <p className="text-slate-600">自适应不同宽高比，高效处理高分辨率图像，减少信息丢失</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="font-bold text-purple-700 mb-2">MoE + MLA</div>
                <p className="text-slate-600">大参数量 + 低激活成本 + 压缩 KV 缓存 = 高效推理</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="font-bold text-green-700 mb-2">全程解冻训练</div>
                <p className="text-slate-600">视觉编码器与 LLM 联合优化，提升多模态融合效果</p>
              </div>
            </div>
          </div>
        </Section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center">
        <p className="text-sm">基于 DeepSeek-VL2 论文 (arXiv:2412.10302v1) 生成</p>
      </footer>
    </div>
  );
};

export default DeepSeekVL2;

