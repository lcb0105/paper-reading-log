import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Lightbulb, 
  Database, 
  Brain, 
  Zap, 
  BarChart, 
  BookOpen 
} from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

const LlamaDeepDive = () => {
  // 滚动到锚点辅助函数
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-sky-100 selection:text-sky-900">
      
      {/* --- 顶部导航栏 --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200 shadow-sm py-3">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {/* 返回按钮 */}
            <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-sky-600 transition-colors">
               <ArrowLeft size={20} />
               <span className="hidden md:inline font-medium">返回目录</span>
            </Link>
            <div className="w-px h-6 bg-slate-200 hidden md:block"></div>
            
            {/* 论文标题 */}
            <div className="flex items-center gap-2">
              <BookOpen size={20} className="text-sky-600" />
              <span className="text-lg font-bold text-slate-800 tracking-tight">
                LLaMA 论文精读
              </span>
            </div>
          </div>

          {/* 桌面端目录导航 */}
          <div className="hidden md:flex space-x-6 text-sm font-medium text-slate-600">
            {['intro', 'data', 'architecture', 'optimization', 'results'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item)}
                className="hover:text-sky-600 transition capitalize"
              >
                {item === 'intro' ? '核心理念' : 
                 item === 'data' ? '数据配方' :
                 item === 'architecture' ? '模型架构' :
                 item === 'optimization' ? '高效优化' : '实验结果'}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* --- Header --- */}
      <header className="bg-gradient-to-br from-slate-900 to-slate-800 text-white pt-32 pb-20">
        <div className="container mx-auto px-6 text-center max-w-4xl">
            <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-sky-200 uppercase bg-white/10 rounded-full">
                Paper: arXiv:2302.13971v1
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight font-serif">
                LLaMA: Open and Efficient Foundation Language Models
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                打破"参数至上"的迷信，用公开数据和极致的工程优化，重新定义大模型训练范式。
            </p>
        </div>
      </header>

      {/* --- Main Content --- */}
      <main className="container mx-auto px-6 py-12 max-w-5xl space-y-20">

        {/* 1. Introduction */}
        <section id="intro" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-sky-100 p-2 rounded-lg text-sky-600">
                  <Lightbulb size={24} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 font-serif">1. 核心理念与背景</h2>
            </div>
            <div className="prose prose-lg text-slate-600 max-w-none">
                <p>
                    在 LLaMA 之前，AI 领域普遍遵循 DeepMind 提出的 <strong>Chinchilla Scaling Laws</strong>，该定律旨在寻找给定训练算力下的"最优模型大小"。然而，LLaMA 团队指出这忽略了一个关键点：<strong>推理预算 (Inference Budget)</strong>。
                </p>
                <div className="grid md:grid-cols-2 gap-6 my-8">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Chinchilla 范式</h3>
                        <p className="text-sm">关注训练最优。建议 10B 模型训练 200B Token。</p>
                        <div className="mt-4 text-xs bg-slate-100 p-2 rounded text-center">训练快，但模型大，推理慢</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-sky-200 shadow-sm ring-1 ring-sky-500/20 bg-sky-50/50">
                        <h3 className="text-lg font-bold text-sky-900 mb-2">LLaMA 范式</h3>
                        <p className="text-sm">关注推理最优。建议 7B 模型训练 1T+ Token。</p>
                        <div className="mt-4 text-xs bg-sky-100 p-2 rounded text-center text-sky-800">训练久，但模型小，推理快且便宜</div>
                    </div>
                </div>
                <p>
                    <strong>LLaMA 的核心策略：</strong> 使用比传统 Scaling Laws 建议多得多的数据量（Trillions of tokens）去"过度训练"较小的模型，从而在推理阶段获得极致的性价比。
                </p>
            </div>
        </section>

        <hr className="border-slate-200" />

        {/* 2. Data */}
        <section id="data" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-yellow-100 p-2 rounded-lg text-yellow-600">
                  <Database size={24} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 font-serif">2. 数据配方 (Pre-training Data)</h2>
            </div>
            <p className="text-lg text-slate-600 mb-8">
                LLaMA 坚持只使用<strong>公开可用的数据</strong>，总训练量达到 <strong>1.4T Tokens</strong>。
            </p>
            
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="grid md:grid-cols-7 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                    <div className="p-4 col-span-2 hover:bg-slate-50 transition">
                        <div className="text-xs font-bold text-slate-400 uppercase mb-1">67%</div>
                        <div className="font-bold text-slate-800">CommonCrawl</div>
                        <p className="text-sm text-slate-500 mt-2">2017-2020年的网页数据。经过 CCNet 管道清洗：去重、语言识别、质量过滤（利用维基百科引用作为分类器）。</p>
                    </div>
                    <div className="p-4 hover:bg-slate-50 transition">
                        <div className="text-xs font-bold text-slate-400 uppercase mb-1">15%</div>
                        <div className="font-bold text-slate-800">C4</div>
                        <p className="text-sm text-slate-500 mt-2">Colossal Clean Crawled Corpus。增加数据的多样性。</p>
                    </div>
                    <div className="p-4 hover:bg-slate-50 transition">
                        <div className="text-xs font-bold text-slate-400 uppercase mb-1">4.5%</div>
                        <div className="font-bold text-slate-800">GitHub</div>
                        <p className="text-sm text-slate-500 mt-2">Apache/BSD/MIT 许可的开源代码。文件级去重。</p>
                    </div>
                    <div className="p-4 hover:bg-slate-50 transition">
                        <div className="text-xs font-bold text-slate-400 uppercase mb-1">4.5%</div>
                        <div className="font-bold text-slate-800">Wikipedia</div>
                        <p className="text-sm text-slate-500 mt-2">涵盖20种语言。去除了超链接和样板。</p>
                    </div>
                    <div className="p-4 hover:bg-slate-50 transition">
                        <div className="text-xs font-bold text-slate-400 uppercase mb-1">4.5%</div>
                        <div className="font-bold text-slate-800">Books</div>
                        <p className="text-sm text-slate-500 mt-2">Gutenberg Project & Books3。长文本叙事能力。</p>
                    </div>
                    <div className="p-4 col-span-1 hover:bg-slate-50 transition">
                        <div className="text-xs font-bold text-slate-400 uppercase mb-1">2.5%</div>
                        <div className="font-bold text-slate-800">ArXiv</div>
                        <p className="text-sm text-slate-500 mt-2">科学论文 LaTeX。处理公式与定义。</p>
                    </div>
                </div>
            </div>
            
            <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="text-sm text-blue-800">
                    <strong>💡 Tokenizer 细节：</strong> 使用 BPE 算法 (SentencePiece)。特别之处在于将<strong>所有数字拆分为单个数字</strong>（例如 <code>2023</code> → <code>2</code>, <code>0</code>, <code>2</code>, <code>3</code>），这显著提升了数学推理能力。
                </p>
            </div>
        </section>

        <hr className="border-slate-200" />

        {/* 3. Architecture */}
        <section id="architecture" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                  <Brain size={24} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 font-serif">3. 模型架构 (Architecture)</h2>
            </div>
            <p className="text-lg text-slate-600 mb-8">
                LLaMA 基于 Transformer 架构，但缝合了三项关键改进。以下是这三项技术的详细数学原理解析。
            </p>

            <div className="space-y-12">
                {/* 3.1 Pre-normalization */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-slate-800">① Pre-normalization (RMSNorm)</h3>
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">灵感来源: GPT-3</span>
                    </div>
                    <p className="text-slate-600 mb-4">
                        为了提高训练稳定性，LLaMA 对每个 Transformer 子层的<strong>输入</strong>进行归一化，而不是输出。使用的是 <strong>RMSNorm (均方根层归一化)</strong>。
                    </p>
                    
                    <div className="bg-slate-50 rounded-lg p-6 border border-slate-200 overflow-x-auto">
                        <p className="text-sm text-slate-500 mb-2 font-mono">公式定义：</p>
                        <BlockMath math="\bar{a}_i = \frac{a_i}{\text{RMS}(a)} g_i" />
                        <p className="text-sm text-slate-500 my-2 font-mono">其中 RMS (Root Mean Square) 计算如下：</p>
                        <BlockMath math="\text{RMS}(a) = \sqrt{\frac{1}{n} \sum_{i=1}^{n} a_i^2 + \epsilon}" />
                    </div>
                    <ul className="list-disc list-inside mt-4 text-slate-600 space-y-2">
                        <li><strong><InlineMath math="a_i" /></strong>: 输入向量的第 <InlineMath math="i" /> 个元素。</li>
                        <li><strong><InlineMath math="g_i" /></strong>: 可学习的缩放参数（gain parameter）。</li>
                        <li><strong>区别</strong>: 相比传统的 LayerNorm，RMSNorm <strong>去掉了均值中心化 (re-centering)</strong> 的过程（即不减去均值 <InlineMath math="\mu" />），只进行缩放。这减少了计算量，且效果相当甚至更好。</li>
                    </ul>
                </div>

                {/* 3.2 SwiGLU */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-slate-800">② SwiGLU 激活函数</h3>
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">灵感来源: PaLM</span>
                    </div>
                    <p className="text-slate-600 mb-4">
                        LLaMA 替换了传统的 ReLU，使用了 <strong>SwiGLU</strong>。这是一种门控线性单元（Gated Linear Unit）的变体。
                    </p>

                    <div className="bg-slate-50 rounded-lg p-6 border border-slate-200 overflow-x-auto">
                        <p className="text-sm text-slate-500 mb-2 font-mono">标准 Transformer FFN (Feed Forward Network) 使用 ReLU:</p>
                        <BlockMath math="\text{FFN}_{\text{ReLU}}(x, W_1, W_2) = \max(0, xW_1 + b_1)W_2 + b_2" />
                        
                        <p className="text-sm text-slate-500 mt-6 mb-2 font-mono">LLaMA 使用 SwiGLU:</p>
                        <BlockMath math="\text{FFN}_{\text{SwiGLU}}(x, W, V, W_2) = (\text{Swish}_{\beta}(xW) \otimes (xV)) W_2" />
                        
                        <p className="text-sm text-slate-500 mt-4 mb-2 font-mono">其中 Swish 激活函数定义为：</p>
                        <BlockMath math="\text{Swish}_{\beta}(x) = x \cdot \sigma(\beta x)" />
                    </div>
                    <ul className="list-disc list-inside mt-4 text-slate-600 space-y-2">
                        <li><strong><InlineMath math="\otimes" /></strong>: 逐元素乘法（Element-wise multiplication）。</li>
                        <li><strong>结构变化</strong>: SwiGLU 有两个线性变换路径 (<InlineMath math="xW" /> 和 <InlineMath math="xV" />)，一个经过激活函数，一个不经过，然后相乘。这起到了"门控"的作用。</li>
                        <li><strong>维度调整</strong>: 为了保持参数量与原版 Transformer 一致，LLaMA 将隐藏层维度从 <InlineMath math="4d" /> 调整为 <InlineMath math="\frac{2}{3} 4d" />。</li>
                    </ul>
                </div>

                {/* 3.3 RoPE */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 ring-2 ring-purple-500/10">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-slate-800">③ Rotary Embeddings (RoPE)</h3>
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">灵感来源: GPT-Neo</span>
                    </div>
                    <p className="text-slate-600 mb-4">
                        这是最复杂的数学部分。LLaMA 移除了绝对位置编码，使用了<strong>旋转位置编码 (RoPE)</strong>。它通过将词向量在复数空间中进行旋转来注入位置信息，使得模型能自然地捕捉词之间的<strong>相对距离</strong>。
                    </p>

                    <div className="bg-slate-50 rounded-lg p-6 border border-slate-200 overflow-x-auto">
                        <p className="text-sm text-slate-500 mb-2 font-mono">核心思想：对向量中的每两个元素 <InlineMath math="(x_1, x_2)" /> 进行 2D 平面旋转。</p>
                        <p className="text-sm text-slate-500 mb-2 font-mono">假设位置为 <InlineMath math="m" />，旋转角度为 <InlineMath math="\theta" />，则变换后的向量为：</p>
                        
                        <BlockMath math="\begin{pmatrix} x'_1 \\ x'_2 \end{pmatrix} = \begin{pmatrix} \cos m\theta & -\sin m\theta \\ \sin m\theta & \cos m\theta \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \end{pmatrix}" />

                        <p className="text-sm text-slate-500 mt-6 mb-2 font-mono">对于整个嵌入向量 <InlineMath math="x" />，应用到所有成对的维度上（矩阵形式）：</p>
                        <BlockMath math="f_{q,k}(x_m, m) = R_{\Theta, m}^d x_m" />
                        <p className="text-sm text-slate-500 mt-2">其中 <InlineMath math="R_{\Theta, m}^d" /> 是一个稀疏的分块对角矩阵，包含了一系列的旋转操作。</p>
                    </div>
                    <ul className="list-disc list-inside mt-4 text-slate-600 space-y-2">
                        <li><strong>相对位置属性</strong>: RoPE 的数学性质保证了 <InlineMath math="q_m^T k_n" />（Attention分数）只依赖于 <InlineMath math="(m-n)" />，即相对距离，而不是绝对位置 <InlineMath math="m" /> 或 <InlineMath math="n" />。</li>
                        <li><strong>外推性</strong>: 这种编码方式使得模型在处理比训练时更长的序列时，具有更好的鲁棒性（Long Context）。</li>
                    </ul>
                </div>
            </div>
        </section>

        <hr className="border-slate-200" />

        {/* 4. Optimization */}
        <section id="optimization" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-green-100 p-2 rounded-lg text-green-600">
                  <Zap size={24} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 font-serif">4. 高效实现与优化</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
                {/* Optimizer */}
                <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">AdamW 优化器</h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-600">
                        <li><strong>超参数</strong>: <InlineMath math="\beta_1 = 0.9, \beta_2 = 0.95" /></li>
                        <li><strong>权重衰减 (Weight Decay)</strong>: <InlineMath math="0.1" /></li>
                        <li><strong>梯度裁剪 (Gradient Clipping)</strong>: <InlineMath math="1.0" /></li>
                        <li><strong>Warmup</strong>: 2,000 steps</li>
                        <li><strong>学习率调度</strong>: Cosine Schedule，最终降至峰值的 10%。</li>
                    </ul>
                </div>

                {/* Engineering */}
                <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">工程效率 (xformers)</h3>
                    <div className="prose text-slate-600 text-sm">
                        <p>LLaMA 使用了 <strong>Flash Attention</strong> (Dao et al.) 的高效实现：</p>
                        <ol className="list-decimal list-inside space-y-1 mt-2">
                            <li><strong>不存储 Attention 矩阵</strong>：传统的 <InlineMath math="N \times N" /> 矩阵太占显存，Flash Attention 边算边扔。</li>
                            <li><strong>不计算 Masked 分数</strong>：因果语言模型中被遮蔽的部分直接跳过计算。</li>
                            <li><strong>Checkpointing</strong>：手动重写反向传播，只保存昂贵的激活值，减少显存占用。</li>
                        </ol>
                        <div className="mt-2 font-mono text-green-700 bg-green-50 p-2 rounded inline-block">
                            Result: 380 tokens/sec/GPU (A100)
                        </div>
                    </div>
                </div>
            </div>

            {/* Carbon Footprint */}
            <div className="mt-8 bg-slate-100 rounded-xl p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-2">🌍 碳足迹 (Carbon Footprint)</h3>
                <p className="text-slate-600 text-sm mb-4">
                    训练 65B 模型使用了 2048 张 A100 GPU 耗时 5 个月。能耗计算公式如下：
                </p>
                <div className="bg-white p-4 rounded border border-slate-200 overflow-x-auto">
                    <BlockMath math="Wh = \text{GPU-h} \times \text{Power}_{\text{GPU}} \times \text{PUE}" />
                </div>
                <p className="text-xs text-slate-500 mt-2">
                    其中 PUE (Power Usage Effectiveness) 设为 1.1。总排放约为 1,015 吨 <InlineMath math="CO_2eq" />。作者指出，开源模型避免了重复训练，本身就是一种环保。
                </p>
            </div>
        </section>

        <hr className="border-slate-200" />

        {/* 5. Results & Conclusion */}
        <section id="results" className="scroll-mt-24 mb-20">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-red-100 p-2 rounded-lg text-red-600">
                  <BarChart size={24} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 font-serif">5. 核心结论与实验结果</h2>
            </div>
            
            <div className="bg-white border-l-4 border-red-500 shadow-md rounded-r-xl p-6 mb-8">
                <h3 className="text-xl font-bold text-slate-900 mb-2">🏆 关键战役：LLaMA-13B vs GPT-3</h3>
                <p className="text-slate-700">
                    <strong>LLaMA-13B</strong> (130亿参数) 在大多数基准测试中击败了 <strong>GPT-3</strong> (1750亿参数)。
                    <br />
                    <span className="text-sm text-slate-500">这意味着参数量缩小了 10 倍以上，但性能更强，推理成本大幅降低。</span>
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-6 rounded-xl">
                    <h4 className="font-bold text-slate-800 mb-4">常识推理 (Common Sense)</h4>
                    <p className="text-sm text-slate-600">LLaMA-65B 在 PIQA, SIQA, HellaSwag 等测试中优于 Chinchilla-70B 和 PaLM-540B。</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl">
                    <h4 className="font-bold text-slate-800 mb-4">代码与数学</h4>
                    <p className="text-sm text-slate-600">虽然未专门微调，但在 HumanEval 和 GSM8k 上表现优异，得益于特殊的 Tokenizer 处理和高质量数据。</p>
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-xl font-bold text-slate-800 mb-4">⚠️ 局限性与安全性</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-600">
                    <li><strong>毒性 (Toxicity)</strong>: RealToxicityPrompts 测试显示，模型越大，生成的毒性内容可能越多（65B &gt; 7B）。</li>
                    <li><strong>偏见 (Bias)</strong>: WinoGender 测试显示模型存在性别职业刻板印象（如认为"护士"多为女性）。</li>
                    <li><strong>幻觉 (Hallucination)</strong>: TruthfulQA 得分虽高于 GPT-3，但仍有 ~43% 的概率产生错误信息。</li>
                </ul>
            </div>
        </section>

      </main>

      {/* --- Footer --- */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="container mx-auto px-6 text-center">
            <p className="mb-4 text-white font-serif text-lg">"We hope that releasing these models to the research community will accelerate the development of large language models."</p>
            <p className="text-sm">基于 LLaMA 原始论文整理。Formulas rendered with KaTeX.</p>
        </div>
      </footer>
    </div>
  );
};

export default LlamaDeepDive;
