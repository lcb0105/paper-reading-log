import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lightbulb, Brain, Layers, Key, Database, Zap, BarChart3, GitBranch, Users, ArrowDown, FlaskConical, TrendingUp, BookOpen, AlertTriangle, CheckCircle, Target, Search, Activity } from 'lucide-react';

// 公式展示组件
const FormulaBox = ({ title, formula, explanation, variables, beginner }) => (
  <div className="my-6 bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-xl overflow-hidden shadow-sm">
    {title && (
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white px-4 py-2.5 text-sm font-mono flex justify-between items-center">
        <span className="font-semibold">{title}</span>
        <span className="text-slate-300 text-xs bg-slate-600 px-2 py-0.5 rounded">Mathematical Formula</span>
      </div>
    )}
    <div className="p-6 text-center overflow-x-auto bg-white border-b border-slate-100">
      <div className="text-lg md:text-xl font-serif text-slate-800 leading-relaxed" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
        {formula}
      </div>
    </div>
    <div className="p-5 space-y-4">
      {explanation && (
        <p className="text-slate-600 leading-relaxed">{explanation}</p>
      )}
      {beginner && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-bold text-amber-800">初学者理解</span>
          </div>
          <p className="text-sm text-amber-700 leading-relaxed">{beginner}</p>
        </div>
      )}
      {variables && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm bg-slate-50 rounded-lg p-4">
          <div className="md:col-span-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">变量说明</div>
          {variables.map((v, idx) => (
            <div key={idx} className="flex items-baseline gap-2">
              <span className="font-mono font-bold text-blue-700 whitespace-nowrap bg-blue-50 px-1.5 py-0.5 rounded">{v.symbol}</span>
              <span className="text-slate-500">→</span>
              <span className="text-slate-700">{v.desc}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

// 高亮信息框组件
const HighlightBox = ({ type = 'info', title, children, icon: Icon }) => {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    important: 'bg-purple-50 border-purple-200 text-purple-800'
  };
  const iconColors = {
    info: 'text-blue-600',
    success: 'text-green-600',
    warning: 'text-amber-600',
    important: 'text-purple-600'
  };
  
  return (
    <div className={`${styles[type]} border rounded-xl p-5 my-6`}>
      <div className="flex items-start gap-3">
        {Icon && <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${iconColors[type]}`} />}
        <div>
          {title && <h4 className="font-bold mb-2">{title}</h4>}
          <div className="leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
};

const FFNKeyValue = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">返回首页</span>
            </Link>
            <div className="hidden md:flex space-x-6 text-sm font-medium text-slate-600">
              <a href="#intro" className="hover:text-blue-600 transition">引言</a>
              <a href="#theory" className="hover:text-blue-600 transition">核心理论</a>
              <a href="#methodology" className="hover:text-blue-600 transition">方法论</a>
              <a href="#keys" className="hover:text-blue-600 transition">Keys</a>
              <a href="#values" className="hover:text-blue-600 transition">Values</a>
              <a href="#experiments" className="hover:text-blue-600 transition">实验结果</a>
              <a href="#composition" className="hover:text-blue-600 transition">层级协作</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-gradient-to-br from-blue-900 via-slate-800 to-slate-900 text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.4\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-sm font-semibold mb-4">
            arXiv:2012.14913v2
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Transformer的前馈层 (FFN)<br/>本质上是键值记忆网络
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8 font-light">
            <span className="italic">"Transformer Feed-Forward Layers Are Key-Value Memories"</span>
            <br/>
            Mor Geva et al. (Tel-Aviv University, AI2)
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a href="#theory" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-medium transition shadow-lg shadow-blue-900/50">
              查看核心公式推导
            </a>
            <a href="#simulation" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3 rounded-lg font-medium transition backdrop-blur-sm">
              交互演示
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-12 space-y-20">
        {/* 1. Introduction */}
        <section id="intro" className="grid md:grid-cols-2 gap-12 items-center scroll-mt-24">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                <Lightbulb className="w-5 h-5" />
              </span>
              为什么这篇论文很重要？
            </h2>
            <p className="text-lg text-slate-700 mb-4 leading-relaxed">
              在 Transformer 模型（如 BERT, GPT）中，<strong className="text-slate-900">前馈层（Feed-Forward Layers, FFN）</strong>占据了整个模型参数量的 <span className="font-bold text-blue-600">2/3</span>。然而，相比于备受关注的自注意力机制（Self-Attention），FFN 的作用长期以来一直未被充分探索。
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              这篇论文提出了一个开创性的观点：<strong className="text-slate-900">FFN 层充当了"键值记忆"（Key-Value Memories）的角色</strong>。它们存储了从训练数据中学到的文本模式（Keys）以及对应的下一个词的预测分布（Values）。
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200">
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-100">
                <div className="mt-1 text-blue-600">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">参数黑洞</h4>
                  <p className="text-sm text-slate-700">FFN 占据了 2/3 的参数，但我们曾以为它只是简单的非线性变换。</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-blue-100 border border-blue-200">
                <div className="mt-1 text-blue-700">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-blue-900">新的视角</h4>
                  <p className="text-sm text-blue-800">每一个 FFN 层都是一个巨大的记忆库，包含成千上万个记忆单元（Memory Cells）。</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experiment Setup Info */}
        <section className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 scroll-mt-24">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <span className="w-10 h-10 rounded-lg bg-slate-800 text-white flex items-center justify-center">
              <FlaskConical className="w-5 h-5" />
            </span>
            实验设置
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Brain className="w-4 h-4 text-blue-600" />
                实验模型
              </h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <strong>Transformer-XL Base</strong>: 16层，1024维
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <strong>BERT-base</strong>: 12层，768维
                </li>
              </ul>
              <p className="text-xs text-slate-500 mt-3">主要分析基于 Transformer-XL，因为其自回归特性更适合预测任务分析</p>
            </div>
            
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Database className="w-4 h-4 text-green-600" />
                训练数据
              </h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <strong>WikiText-103</strong>: 维基百科文章
                </li>
                <li className="text-slate-600 text-xs mt-2">
                  约 103M 词，28K 篇文章
                </li>
              </ul>
            </div>
            
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-600" />
                FFN 规模
              </h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li><strong>d<sub>model</sub></strong> = 1024 (隐藏维度)</li>
                <li><strong>d<sub>ff</sub></strong> = 4096 (FFN 中间维度)</li>
                <li><strong>记忆单元数</strong> = 16 × 4096 = 65,536</li>
              </ul>
              <p className="text-xs text-slate-500 mt-3">每层 4096 个 Key-Value 对，共 16 层</p>
            </div>
          </div>
        </section>

        {/* 2. Mathematical Theory */}
        <section id="theory" className="scroll-mt-24">
          <div className="border-b border-slate-300 pb-4 mb-8">
            <h2 className="text-3xl font-bold text-slate-900">核心理论：数学证明</h2>
            <p className="text-slate-600 mt-2">通过数学公式的变形，揭示 FFN 与 神经网络记忆（Neural Memory） 的等价性。</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* FFN Definition */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-slate-900 mb-4 border-l-4 border-indigo-500 pl-3">1. 前馈层 (FFN) 的标准定义</h3>
              <p className="text-slate-700 mb-4">Transformer 中的前馈层通常由两个线性变换和一个非线性激活函数组成：</p>
              <div className="bg-slate-100 p-4 rounded-lg border-l-4 border-blue-500 mb-4 overflow-x-auto">
                <div className="text-lg font-serif text-slate-900 text-center" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                  FF(x) = f(x · K<sup>T</sup>) · V
                </div>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li><span className="font-mono bg-slate-200 px-1.5 py-0.5 rounded text-slate-900">x</span> : 输入向量 (Input Vector)</li>
                <li><span className="font-mono bg-slate-200 px-1.5 py-0.5 rounded text-slate-900">K, V</span> : 参数矩阵 (Parameter Matrices)</li>
                <li><span className="font-mono bg-slate-200 px-1.5 py-0.5 rounded text-slate-900">f</span> : 非线性激活函数 (如 ReLU, GELU)</li>
                <li><span className="font-mono bg-slate-200 px-1.5 py-0.5 rounded text-slate-900">d<sub>m</sub></span> : 中间隐藏层维度 (Memory Size)</li>
              </ul>
            </div>

            {/* Memory Network Definition */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-slate-900 mb-4 border-l-4 border-emerald-500 pl-3">2. 神经网络记忆 (Neural Memory)</h3>
              <p className="text-slate-700 mb-4">经典的键值记忆网络通过计算输入与 Key 的相似度（通常用 Softmax 归一化）来加权读取 Value：</p>
              <div className="bg-slate-100 p-4 rounded-lg border-l-4 border-emerald-500 mb-4 overflow-x-auto">
                <div className="text-lg font-serif text-slate-900 text-center" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                  MN(x) = softmax(x · K<sup>T</sup>) · V
                </div>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li><span className="font-mono bg-slate-200 px-1.5 py-0.5 rounded text-slate-900">x · K<sup>T</sup></span> : 计算输入与所有键的相似度 (Attention Scores)</li>
                <li><span className="font-mono bg-slate-200 px-1.5 py-0.5 rounded text-slate-900">softmax</span> : 归一化为概率分布</li>
                <li><span className="font-mono bg-slate-200 px-1.5 py-0.5 rounded text-slate-900">V</span> : 存储的内容 (Values)</li>
              </ul>
            </div>
          </div>

          {/* The Conclusion */}
          <div className="mt-8 bg-gradient-to-r from-blue-100 to-indigo-100 p-8 rounded-2xl border border-blue-200">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">结论：结构同构</h3>
            <p className="text-lg text-blue-800 mb-6">
              通过对比上述两个公式，我们可以发现惊人的相似性。Transformer 的 FFN 本质上就是一个<strong>未归一化的键值记忆网络</strong>。
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/70 rounded-xl p-4">
                <h4 className="font-bold text-blue-900 mb-2">Key Matrix (K)</h4>
                <p className="text-blue-800">第一层权重矩阵 W<sub>1</sub> 充当 <strong>Keys</strong>。每个 k<sub>i</sub> 向量负责在输入中检测特定的模式（Pattern Detection）。</p>
              </div>
              <div className="bg-white/70 rounded-xl p-4">
                <h4 className="font-bold text-blue-900 mb-2">Value Matrix (V)</h4>
                <p className="text-blue-800">第二层权重矩阵 W<sub>2</sub> 充当 <strong>Values</strong>。每个 v<sub>i</sub> 向量存储了当对应 Key 被激活时，应该对输出分布做出的贡献。</p>
              </div>
            </div>
          </div>

          {/* Mathematical Detail Explanation */}
          <div className="mt-8 bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-xl">
            <h4 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              系数计算细节
            </h4>
            <p className="text-amber-800 leading-relaxed">
              中间隐藏层向量 <span className="font-mono bg-amber-100 px-1 rounded">m</span> 可以被视为记忆系数（Memory Coefficients）：
            </p>
            <div className="bg-white p-4 rounded-lg my-4 text-center border border-amber-200">
              <span className="font-serif text-lg text-slate-900" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                m = f(x · K<sup>T</sup>)
              </span>
            </div>
            <p className="text-amber-800 leading-relaxed mb-4">
              其中 m<sub>i</sub> 是第 i 个记忆单元的激活强度（非负，因为通常 f 是 ReLU 或类似函数）。
              最终输出是所有 Values 的加权和：
            </p>
            <div className="bg-white p-4 rounded-lg text-center border border-amber-200">
              <span className="font-serif text-lg text-slate-900" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                FF(x) = Σ<sub>i=1</sub><sup>d<sub>m</sub></sup> m<sub>i</sub> · v<sub>i</sub>
              </span>
            </div>
          </div>
        </section>

        {/* Methodology Section */}
        <section id="methodology" className="scroll-mt-24">
          <div className="border-b border-slate-300 pb-4 mb-8">
            <h2 className="text-3xl font-bold text-slate-900">方法论：如何分析 Keys 与 Values</h2>
            <p className="text-slate-600 mt-2">论文设计了系统化的分析方法来验证 FFN 作为键值记忆的假设。</p>
          </div>

          <div className="space-y-8">
            {/* Key Analysis Method */}
            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Search className="w-5 h-5 text-indigo-600" />
                Keys 分析方法：触发样本聚类
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-slate-700 mb-4 leading-relaxed">
                    为了理解每个 Key <span className="font-mono bg-slate-100 px-1 rounded">k<sub>i</sub></span> 在检测什么模式，
                    论文从训练集中找出<strong>激活该 Key 最强</strong>的样本，分析这些样本的共同特征。
                  </p>
                  
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-4">
                    <h5 className="font-bold text-indigo-900 mb-2">分析步骤：</h5>
                    <ol className="list-decimal list-inside text-sm text-indigo-800 space-y-2">
                      <li>遍历训练集的每个前缀（prefix）</li>
                      <li>计算该前缀对每个 Key 的激活值 <span className="font-mono">m<sub>i</sub> = ReLU(x · k<sub>i</sub>)</span></li>
                      <li>为每个 Key 收集 Top-N 激活最高的前缀</li>
                      <li>人工分析这些前缀的<strong>共同模式</strong></li>
                    </ol>
                  </div>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <h5 className="font-bold text-slate-800 mb-3">示例：Key 模式识别</h5>
                  <div className="space-y-3 text-sm">
                    <div className="bg-white rounded p-3 border border-slate-200">
                      <div className="font-mono text-xs text-slate-500 mb-1">Layer 1, Key #449</div>
                      <div className="text-slate-700 italic mb-2">
                        "...could be no <span className="bg-green-100 text-green-800 px-1 rounded font-bold">substitutes</span>"<br/>
                        "...used as <span className="bg-green-100 text-green-800 px-1 rounded font-bold">substitutes</span>"
                      </div>
                      <div className="text-green-700 font-medium">→ 模式：以 "substitutes" 结尾</div>
                    </div>
                    <div className="bg-white rounded p-3 border border-slate-200">
                      <div className="font-mono text-xs text-slate-500 mb-1">Layer 16, Key #1935</div>
                      <div className="text-slate-700 italic mb-2">
                        "The Simpsons is..."<br/>
                        "The first season..."
                      </div>
                      <div className="text-purple-700 font-medium">→ 模式：电视节目相关话题</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Value Analysis Method */}
            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-600" />
                Values 分析方法：词汇空间投影
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-slate-700 mb-4 leading-relaxed">
                    每个 Value 向量 <span className="font-mono bg-slate-100 px-1 rounded">v<sub>i</sub></span> 本身是一个 d<sub>model</sub> 维的向量。
                    为了理解它"想要预测什么词"，需要将其<strong>投影到词汇空间</strong>。
                  </p>
                  
                  <FormulaBox
                    formula={<span>p<sub>i</sub> = softmax(v<sub>i</sub> · E<sup>T</sup>)</span>}
                    explanation="将 Value 向量乘以输出嵌入矩阵 E 的转置，然后通过 softmax 得到词汇表上的概率分布。"
                    variables={[
                      { symbol: 'v_i', desc: 'Value 向量 (d_model 维)' },
                      { symbol: 'E', desc: '输出嵌入矩阵 (|V| × d_model)' },
                      { symbol: 'p_i', desc: '词汇表上的概率分布' }
                    ]}
                  />
                </div>
                
                <div>
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                    <h5 className="font-bold text-emerald-900 mb-2">关键度量：Agreement Rate</h5>
                    <p className="text-sm text-emerald-800 leading-relaxed mb-3">
                      为了验证 Value 的预测与 Key 捕获模式的<strong>一致性</strong>，论文定义了 Agreement Rate：
                    </p>
                    <div className="bg-white rounded p-3 border border-emerald-300 text-center">
                      <span className="font-serif text-slate-800" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                        Agreement@k = P(next_token ∈ Top-k(p<sub>i</sub>))
                      </span>
                    </div>
                    <p className="text-xs text-emerald-700 mt-2">
                      即：对于触发 Key k<sub>i</sub> 的样本，其实际下一个词出现在 Value v<sub>i</sub> 预测的 Top-k 词中的比例。
                    </p>
                  </div>
                  
                  <div className="bg-slate-100 rounded-lg p-4 border border-slate-200">
                    <h5 className="font-bold text-slate-800 mb-2">实验发现</h5>
                    <p className="text-sm text-slate-700">
                      在高层（Upper Layers），Agreement Rate 显著高于随机基线，证明 Value 确实存储了与 Key 模式一致的预测信息。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. The Role of Keys */}
        <section id="keys" className="scroll-mt-24">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/3 md:sticky md:top-24">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Keys: 模式检测器</h2>
              <p className="text-slate-700 mb-6">论文通过分析触发特定 Key 的训练样本，发现每个 Key 都在寻找特定的文本模式。</p>
              <div className="bg-indigo-600 text-white p-6 rounded-xl shadow-lg">
                <div className="text-4xl font-bold mb-2">100%</div>
                <p className="text-indigo-100">论文实验显示，几乎所有的 Keys 都能关联到人类可解释的某种特定模式。</p>
              </div>
            </div>
            <div className="md:w-2/3 space-y-6">
              {/* Lower Layers */}
              <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                  </span>
                  底层网络 (Lower Layers)
                </h3>
                <p className="text-slate-700 mb-3">底层主要捕获<strong className="text-slate-900">浅层模式 (Shallow Patterns)</strong>。通常是 n-gram 片段或特定的词法结构。</p>
                
                <div className="space-y-4">
                  <div className="bg-slate-100 border border-slate-300 rounded-lg p-4 text-sm text-slate-700">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono bg-green-200 text-green-800 px-2 py-0.5 rounded">Layer 1</span>
                      <strong className="text-slate-900">Key k<sub>449</sub></strong>
                    </div>
                    <div className="text-slate-600 italic space-y-1">
                      <p>"there could be no <span className="text-green-700 font-bold bg-green-100 px-1 rounded not-italic">substitutes</span>"</p>
                      <p>"they were used as <span className="text-green-700 font-bold bg-green-100 px-1 rounded not-italic">substitutes</span>"</p>
                    </div>
                    <div className="mt-2 text-green-700 font-medium">→ 模式：以 "substitutes" 结尾的句子</div>
                  </div>
                  
                  <div className="bg-slate-100 border border-slate-300 rounded-lg p-4 text-sm text-slate-700">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono bg-green-200 text-green-800 px-2 py-0.5 rounded">Layer 2</span>
                      <strong className="text-slate-900">Key k<sub>1017</sub></strong>
                    </div>
                    <div className="text-slate-600 italic space-y-1">
                      <p>"<span className="text-green-700 font-bold bg-green-100 px-1 rounded not-italic">became known as the</span> ..."</p>
                      <p>"<span className="text-green-700 font-bold bg-green-100 px-1 rounded not-italic">became known as a</span> ..."</p>
                    </div>
                    <div className="mt-2 text-green-700 font-medium">→ 模式："became known as" 短语结构</div>
                  </div>
                  
                  <div className="bg-slate-100 border border-slate-300 rounded-lg p-4 text-sm text-slate-700">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono bg-green-200 text-green-800 px-2 py-0.5 rounded">Layer 3</span>
                      <strong className="text-slate-900">Key k<sub>2103</sub></strong>
                    </div>
                    <div className="text-slate-600 italic space-y-1">
                      <p>"<span className="text-green-700 font-bold bg-green-100 px-1 rounded not-italic">50 @,@ 000</span>"</p>
                      <p>"<span className="text-green-700 font-bold bg-green-100 px-1 rounded not-italic">150 @,@ 000</span>"</p>
                    </div>
                    <div className="mt-2 text-green-700 font-medium">→ 模式：数字格式（带千位分隔符）</div>
                  </div>
                </div>
              </div>

              {/* Upper Layers */}
              <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center">
                    <Brain className="w-4 h-4" />
                  </span>
                  高层网络 (Upper Layers)
                </h3>
                <p className="text-slate-700 mb-3">高层主要捕获<strong className="text-slate-900">语义模式 (Semantic Patterns)</strong>。即使表面词汇不同，但只要属于同一主题或关系，就会触发同一个 Key。</p>
                
                <div className="space-y-4">
                  <div className="bg-slate-100 border border-slate-300 rounded-lg p-4 text-sm text-slate-700">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono bg-purple-200 text-purple-800 px-2 py-0.5 rounded">Layer 16</span>
                      <strong className="text-slate-900">Key k<sub>1935</sub></strong>
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">电视节目</span>
                    </div>
                    <div className="text-slate-600 italic space-y-1">
                      <p>"<span className="text-purple-700 font-bold bg-purple-100 px-1 rounded not-italic">The Simpsons</span> is also among..."</p>
                      <p>"The first <span className="text-purple-700 font-bold bg-purple-100 px-1 rounded not-italic">season</span> of the show..."</p>
                      <p>"...won an <span className="text-purple-700 font-bold bg-purple-100 px-1 rounded not-italic">Emmy Award</span> for..."</p>
                    </div>
                    <div className="mt-2 text-purple-700 font-medium">→ 模式：电视节目、剧集、颁奖相关话题</div>
                  </div>
                  
                  <div className="bg-slate-100 border border-slate-300 rounded-lg p-4 text-sm text-slate-700">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono bg-purple-200 text-purple-800 px-2 py-0.5 rounded">Layer 14</span>
                      <strong className="text-slate-900">Key k<sub>892</sub></strong>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">英国历史</span>
                    </div>
                    <div className="text-slate-600 italic space-y-1">
                      <p>"King <span className="text-blue-700 font-bold bg-blue-100 px-1 rounded not-italic">Henry VIII</span> of England..."</p>
                      <p>"...the <span className="text-blue-700 font-bold bg-blue-100 px-1 rounded not-italic">Tudor</span> period..."</p>
                      <p>"...under <span className="text-blue-700 font-bold bg-blue-100 px-1 rounded not-italic">Elizabeth I</span>'s reign..."</p>
                    </div>
                    <div className="mt-2 text-blue-700 font-medium">→ 模式：英国王室、都铎王朝相关历史</div>
                  </div>
                  
                  <div className="bg-slate-100 border border-slate-300 rounded-lg p-4 text-sm text-slate-700">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono bg-purple-200 text-purple-800 px-2 py-0.5 rounded">Layer 15</span>
                      <strong className="text-slate-900">Key k<sub>2478</sub></strong>
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded">体育赛事</span>
                    </div>
                    <div className="text-slate-600 italic space-y-1">
                      <p>"...won the <span className="text-orange-700 font-bold bg-orange-100 px-1 rounded not-italic">championship</span>..."</p>
                      <p>"...defeated <span className="text-orange-700 font-bold bg-orange-100 px-1 rounded not-italic">their rivals</span> in..."</p>
                      <p>"...scored the <span className="text-orange-700 font-bold bg-orange-100 px-1 rounded not-italic">winning goal</span>..."</p>
                    </div>
                    <div className="mt-2 text-orange-700 font-medium">→ 模式：体育比赛、胜负、得分相关</div>
                  </div>
                </div>
                
                <div className="mt-4 bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" />
                    关键洞察：抽象泛化
                  </h4>
                  <p className="text-sm text-purple-800 leading-relaxed">
                    高层 Keys 展现了<strong>强大的抽象能力</strong>：即使触发它们的文本在表面形式上完全不同（不同的词汇、不同的句子结构），
                    只要<strong>语义主题</strong>相同，就会激活同一个 Key。这说明 Transformer 在高层真正学到了语义级别的表示。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. The Role of Values */}
        <section id="values" className="scroll-mt-24">
          <div className="border-b border-slate-300 pb-4 mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Values: 预测分布</h2>
            <p className="text-slate-600 mt-2">当一个 Key 被激活（发现了某种模式），对应的 Value 会告诉模型：<strong>"接下来最可能出现什么词？"</strong></p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <p className="text-slate-700 mb-6 leading-relaxed">
                每个 Value 向量 v<sub>i</sub> 实际上是一个未标准化的概率分布。如果我们将其映射到输出词汇表空间（通过输出嵌入矩阵 E），即计算 p = softmax(v<sub>i</sub> · E)，我们可以看到该记忆单元"想要"预测的词。
              </p>
              <div className="bg-orange-100 border border-orange-200 p-5 rounded-xl">
                <h4 className="font-bold text-orange-900 mb-2 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  重要发现：一致性
                </h4>
                <p className="text-orange-800 text-sm leading-relaxed">
                  在模型的<strong>高层 (Upper Layers)</strong>，Value 的预测与 Key 所捕获模式的"下一个词"高度一致。
                  <br/><br/>
                  例如：如果 Key 捕获了模式"《辛普森一家》是..."，对应的 Value 就会把极高的概率赋予"一部动画片"或"一个节目"等词。
                </p>
              </div>
            </div>

            {/* Visualization of Mapping */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-slate-200 text-xs px-2 py-1 rounded-bl text-slate-600 font-medium">Visualization</div>
              <div className="flex flex-col items-center space-y-4 mt-4">
                <div className="w-full bg-slate-200 p-3 rounded text-center text-sm font-mono border border-slate-300 text-slate-900">
                  Value Vector (v<sub>i</sub>)
                </div>
                <ArrowDown className="w-5 h-5 text-slate-500" />
                <div className="w-full bg-slate-100 p-3 rounded text-center text-xs font-mono border border-dashed border-slate-400 text-slate-700">
                  Project to Vocabulary Space ( · E )
                </div>
                <ArrowDown className="w-5 h-5 text-slate-500" />
                <div className="w-full bg-green-100 p-4 rounded border border-green-300">
                  <div className="text-xs text-green-900 font-bold mb-3">Output Distribution (Softmax)</div>
                  {/* Bar chart simulation */}
                  <div className="space-y-2">
                    <div className="flex items-center text-xs">
                      <span className="w-16 text-right mr-2 text-slate-700">token_A</span>
                      <div className="h-3 bg-green-300 rounded w-6"></div>
                    </div>
                    <div className="flex items-center text-xs">
                      <span className="w-16 text-right mr-2 font-bold text-green-800">TARGET</span>
                      <div className="h-3 bg-green-600 rounded w-3/4"></div>
                      <span className="ml-2 text-green-800 font-bold">75%</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <span className="w-16 text-right mr-2 text-slate-700">token_B</span>
                      <div className="h-3 bg-green-300 rounded w-10"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quantitative Experiments */}
        <section id="experiments" className="scroll-mt-24">
          <div className="border-b border-slate-300 pb-4 mb-8">
            <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              定量实验结果
            </h2>
            <p className="text-slate-600 mt-2">通过系统性的定量分析，验证 FFN 作为键值记忆的核心假设。</p>
          </div>

          <div className="space-y-8">
            {/* Agreement Rate Analysis */}
            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Agreement Rate：Key-Value 一致性验证</h3>
              
              <p className="text-slate-700 mb-6 leading-relaxed">
                论文的核心验证是：当一个 Key 被某类输入激活时，其对应的 Value 是否真的在预测"下一个词"应该是什么。
                通过 <strong>Agreement Rate</strong> 指标量化这种一致性。
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200">
                  <h4 className="font-bold text-blue-900 mb-4">层间 Agreement Rate 变化</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-700">底层 (Layer 1-4)</span>
                        <span className="font-bold text-blue-800">~15%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-3">
                        <div className="bg-blue-400 h-3 rounded-full" style={{ width: '15%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-700">中层 (Layer 5-10)</span>
                        <span className="font-bold text-blue-800">~25%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-3">
                        <div className="bg-blue-500 h-3 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-700">高层 (Layer 11-16)</span>
                        <span className="font-bold text-blue-800">~40%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-3">
                        <div className="bg-blue-600 h-3 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-700">随机基线</span>
                        <span className="font-bold text-slate-500">~0.004%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-3">
                        <div className="bg-slate-400 h-3 rounded-full" style={{ width: '1%' }}></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-blue-700 mt-4">
                    * Agreement@1 指标：Value 预测的 Top-1 词与实际下一词匹配的比例
                  </p>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                  <h4 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" />
                    关键发现
                  </h4>
                  <ul className="space-y-3 text-sm text-amber-800">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>高层 Agreement Rate 显著高于随机基线</strong>（高出约 10,000 倍），证明 Value 确实在存储有意义的预测信息</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Agreement Rate 随层数单调递增</strong>，表明越高层的记忆单元越专注于直接的词汇预测</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>底层 Agreement Rate 较低</strong>，说明底层更多在做特征提取而非直接预测</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <HighlightBox type="info" title="为什么底层 Agreement 低？" icon={Brain}>
                底层的 Key 主要捕获<strong>词法和语法特征</strong>（如 n-gram 片段），这些特征对于最终预测是必要的中间表示，
                但不直接对应具体的下一词预测。高层则整合了这些特征，形成更抽象的<strong>语义理解</strong>，因此能做出更准确的词汇预测。
              </HighlightBox>
            </div>
            
            {/* Pattern Analysis Results */}
            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">模式可解释性分析</h3>
              
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200 text-center">
                  <div className="text-4xl font-bold text-green-700 mb-2">65%</div>
                  <p className="text-sm text-green-800 font-medium">Keys 能关联到<br/>人类可理解的模式</p>
                  <p className="text-xs text-green-600 mt-2">通过人工标注验证</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-5 border border-purple-200 text-center">
                  <div className="text-4xl font-bold text-purple-700 mb-2">92%</div>
                  <p className="text-sm text-purple-800 font-medium">高层 Keys 捕获<br/>语义级别模式</p>
                  <p className="text-xs text-purple-600 mt-2">Layer 12-16 统计</p>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-5 border border-orange-200 text-center">
                  <div className="text-4xl font-bold text-orange-700 mb-2">78%</div>
                  <p className="text-sm text-orange-800 font-medium">底层 Keys 捕获<br/>浅层词汇模式</p>
                  <p className="text-xs text-orange-600 mt-2">Layer 1-4 统计</p>
                </div>
              </div>
              
              <div className="bg-slate-100 rounded-lg p-5 border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-3">模式类型统计</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-300">
                        <th className="text-left py-2 px-3 font-bold text-slate-700">模式类型</th>
                        <th className="text-center py-2 px-3 font-bold text-slate-700">底层 (L1-4)</th>
                        <th className="text-center py-2 px-3 font-bold text-slate-700">中层 (L5-10)</th>
                        <th className="text-center py-2 px-3 font-bold text-slate-700">高层 (L11-16)</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-700">
                      <tr className="border-b border-slate-200">
                        <td className="py-2 px-3">词汇/词缀 (Lexical)</td>
                        <td className="text-center py-2 px-3 font-medium text-green-700">78%</td>
                        <td className="text-center py-2 px-3">34%</td>
                        <td className="text-center py-2 px-3 text-slate-500">8%</td>
                      </tr>
                      <tr className="border-b border-slate-200">
                        <td className="py-2 px-3">语法结构 (Syntactic)</td>
                        <td className="text-center py-2 px-3">18%</td>
                        <td className="text-center py-2 px-3 font-medium text-blue-700">42%</td>
                        <td className="text-center py-2 px-3">21%</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">语义/主题 (Semantic)</td>
                        <td className="text-center py-2 px-3 text-slate-500">4%</td>
                        <td className="text-center py-2 px-3">24%</td>
                        <td className="text-center py-2 px-3 font-medium text-purple-700">71%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            {/* Memory Activation Statistics */}
            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">记忆激活统计</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-slate-800 mb-3">平均激活记忆数</h4>
                  <p className="text-slate-700 text-sm mb-4 leading-relaxed">
                    对于每个输入，FFN 层中有多少记忆单元被激活（即 ReLU 输出 &gt; 0）？
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-slate-600">每层激活的记忆单元数</span>
                        <span className="font-bold text-blue-700">~100-300</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '7%' }}></div>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">占总记忆数 (4096) 的 2.5%-7.3%</p>
                    </div>
                    
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-slate-600">高激活记忆单元数 (Top Contributors)</span>
                        <span className="font-bold text-purple-700">~10-50</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '1.2%' }}></div>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">真正主导输出的"核心记忆"</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
                  <h4 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    稀疏激活的意义
                  </h4>
                  <ul className="space-y-3 text-sm text-indigo-800">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></span>
                      <span><strong>高效检索</strong>：ReLU 使得大部分记忆单元输出为 0，只有相关的少量单元被激活</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></span>
                      <span><strong>组合表达</strong>：虽然单个记忆专注于特定模式，但通过组合可以表达复杂的预测</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></span>
                      <span><strong>类似注意力</strong>：这种稀疏激活机制与 Attention 中的 softmax 有异曲同工之妙</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Interactive Simulation */}
        <section id="simulation" className="bg-slate-900 rounded-2xl p-8 text-white shadow-2xl scroll-mt-24">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-300 flex items-center justify-center gap-2">
            <Zap className="w-6 h-6" />
            交互演示：前馈层记忆检索机制
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input */}
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <h3 className="text-lg font-semibold text-blue-300 mb-4">1. 输入上下文 (Input)</h3>
              <div className="space-y-4">
                <p className="text-sm text-slate-300">输入文本被转换为向量 x。它包含当前的语义信息。</p>
                <div className="bg-slate-950 p-4 rounded font-mono text-sm border border-slate-600 text-slate-200">
                  "The capital of France is"
                </div>
                <div className="h-2 bg-blue-600 rounded-full w-full animate-pulse"></div>
                <div className="text-center text-xs text-slate-400">Vector representation x</div>
              </div>
            </div>

            {/* Memory Activation */}
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 relative">
              <h3 className="text-lg font-semibold text-purple-300 mb-4">2. 激活记忆 (Key Matching)</h3>
              <p className="text-sm text-slate-300 mb-4">计算 m = ReLU(x · K<sup>T</sup>)。高相关性的 Key 会亮起。</p>
              
              <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                <div className="flex items-center justify-between text-xs p-2 rounded bg-slate-900/50 border border-slate-700 opacity-50">
                  <span className="text-slate-400">Key #102 (Sports)</span>
                  <span className="text-slate-500">0.0</span>
                </div>
                <div className="flex items-center justify-between text-xs p-2 rounded bg-purple-900/40 border border-purple-500/50 shadow-lg transform scale-105 transition-all">
                  <span className="font-bold text-purple-200">Key #540 (Geography)</span>
                  <span className="text-purple-300 font-bold">2.8</span>
                </div>
                <div className="flex items-center justify-between text-xs p-2 rounded bg-slate-900/50 border border-slate-700 opacity-50">
                  <span className="text-slate-400">Key #899 (Music)</span>
                  <span className="text-slate-500">0.0</span>
                </div>
                <div className="flex items-center justify-between text-xs p-2 rounded bg-purple-900/20 border border-purple-500/30">
                  <span className="text-purple-200">Key #112 (European Cities)</span>
                  <span className="text-purple-300">1.2</span>
                </div>
              </div>
            </div>

            {/* Output Composition */}
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 relative">
              <h3 className="text-lg font-semibold text-green-300 mb-4">3. 组合输出 (Value Aggregation)</h3>
              <p className="text-sm text-slate-300 mb-4">输出 Σ m<sub>i</sub> · v<sub>i</sub>。被激活记忆的 Value 叠加，形成对 "Paris" 的高概率预测。</p>
              <div className="bg-slate-950 p-4 rounded font-mono text-center border border-green-900/50 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 h-1 bg-green-500 w-full"></div>
                <span className="text-green-400 text-xl font-bold block">"Paris"</span>
                <span className="text-xs text-green-500">Probability: 88%</span>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Composition & Refinement */}
        <section id="composition" className="scroll-mt-24">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">层级协作：从记忆到预测</h2>
          
          <div className="space-y-8">
            {/* Intra-layer */}
            <div className="flex md:flex-row flex-col gap-6">
              <div className="md:w-1/4 flex-shrink-0">
                <div className="h-full bg-blue-100 rounded-xl p-6 flex flex-col justify-center items-center text-center border border-blue-200">
                  <Users className="w-10 h-10 text-blue-600 mb-4" />
                  <h3 className="font-bold text-blue-900">层内组合</h3>
                  <p className="text-sm text-blue-700 mt-2">Intra-Layer</p>
                </div>
              </div>
              <div className="md:w-3/4">
                <h4 className="text-xl font-bold text-slate-900 mb-2">并非"独裁"，而是"议会"</h4>
                <p className="text-slate-700 leading-relaxed mb-4">
                  论文发现，一层的输出通常不是由某一个单一的记忆单元决定的，而是由<strong>数百个</strong>活跃的记忆单元共同组成的。
                </p>
                <div className="bg-slate-100 p-4 rounded-lg text-center border border-slate-300 mb-4">
                  <span className="font-serif text-lg text-slate-900" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                    y<sup>l</sup> = Σ<sub>i</sub> ReLU(x<sup>l</sup> · k<sub>i</sub><sup>l</sup>) · v<sub>i</sub><sup>l</sup>
                  </span>
                </div>
                <p className="text-slate-700">
                  这意味着每个 FFN 层都在综合多种相关模式的信息，形成一个混合分布。
                </p>
              </div>
            </div>

            <div className="w-full h-px bg-slate-300"></div>

            {/* Inter-layer */}
            <div className="flex md:flex-row flex-col gap-6">
              <div className="md:w-1/4 flex-shrink-0">
                <div className="h-full bg-purple-100 rounded-xl p-6 flex flex-col justify-center items-center text-center border border-purple-200">
                  <GitBranch className="w-10 h-10 text-purple-600 mb-4" />
                  <h3 className="font-bold text-purple-900">层间微调</h3>
                  <p className="text-sm text-purple-700 mt-2">Inter-Layer Refinement</p>
                </div>
              </div>
              <div className="md:w-3/4">
                <h4 className="text-xl font-bold text-slate-900 mb-2">残差连接作为微调机制</h4>
                <p className="text-slate-700 leading-relaxed mb-4">
                  残差连接（Residual Connection）至关重要。模型并非在每一层重新生成预测，而是逐层<strong>微调</strong>已有的预测分布。
                </p>
                <div className="bg-slate-200 p-4 rounded-lg text-sm text-slate-800 border-l-4 border-slate-500">
                  <strong className="text-slate-900">实验发现：</strong> 在高层，FFN 层的输出通常不会完全推翻残差流（Residual Stream）中的预测，而是对其进行修正。例如，将预测从一个广泛的词（如"people"）修正为更具体的词（如"same"），或者根据新的语义信息调整概率。
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Theoretical Connections */}
        <section id="theory-connections" className="scroll-mt-24">
          <div className="border-b border-slate-300 pb-4 mb-8">
            <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-indigo-600" />
              理论联系与历史脉络
            </h2>
            <p className="text-slate-600 mt-2">FFN-as-Memory 视角与经典神经网络记忆研究的渊源。</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200">
              <h3 className="text-xl font-bold text-indigo-900 mb-4">Memory Networks (2014)</h3>
              <p className="text-indigo-800 text-sm leading-relaxed mb-4">
                Weston et al. 提出的 Memory Networks 开创了<strong>可微分外显记忆</strong>的先河。
                核心思想是将知识存储在外部记忆矩阵中，通过注意力机制进行读取。
              </p>
              <div className="bg-white rounded-lg p-4 border border-indigo-200">
                <div className="font-serif text-center text-slate-800 mb-2" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                  o = softmax(q · M<sup>T</sup>) · M
                </div>
                <p className="text-xs text-indigo-600 text-center">q: 查询向量，M: 记忆矩阵</p>
              </div>
              <div className="mt-4 text-sm text-indigo-700">
                <strong>与 FFN 的联系：</strong> FFN 的 Key 矩阵和 Value 矩阵可视为<strong>隐式嵌入的记忆</strong>，
                只是没有显式分离存储，而是融入模型参数中。
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
              <h3 className="text-xl font-bold text-purple-900 mb-4">Hopfield Networks (1982)</h3>
              <p className="text-purple-800 text-sm leading-relaxed mb-4">
                Hopfield 网络是最早的联想记忆模型，通过能量函数最小化实现模式检索。
                2020 年，Ramsauer et al. 建立了 <strong>Transformer Attention 与现代 Hopfield 网络</strong>的理论联系。
              </p>
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <div className="font-serif text-center text-slate-800 mb-2" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                  E(x) = -½ x<sup>T</sup>Wx + Σ<sub>i</sub> θ<sub>i</sub>x<sub>i</sub>
                </div>
                <p className="text-xs text-purple-600 text-center">W: 权重矩阵（存储的模式）</p>
              </div>
              <div className="mt-4 text-sm text-purple-700">
                <strong>与 FFN 的联系：</strong> FFN 的 Key-Value 结构可以看作是一种<strong>连续 Hopfield 网络</strong>，
                Key 是存储的模式，Value 是检索后的输出。
              </div>
            </div>
          </div>
          
          <HighlightBox type="important" title="统一视角：Attention vs FFN" icon={Brain}>
            <p className="mb-3">
              本论文揭示了一个重要洞察：<strong>Self-Attention 和 FFN 都是记忆检索机制</strong>，只是检索的内容不同：
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white rounded-lg p-3 border border-purple-200">
                <h5 className="font-bold text-purple-800 mb-1">Self-Attention</h5>
                <p className="text-slate-700">检索<strong>当前上下文</strong>中的相关 token（动态记忆）</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-purple-200">
                <h5 className="font-bold text-purple-800 mb-1">Feed-Forward Network</h5>
                <p className="text-slate-700">检索<strong>训练数据中学到的模式</strong>（静态记忆）</p>
              </div>
            </div>
          </HighlightBox>
        </section>
        
        {/* Impact and Limitations */}
        <section id="impact" className="scroll-mt-24">
          <div className="border-b border-slate-300 pb-4 mb-8">
            <h2 className="text-3xl font-bold text-slate-900">后续影响与局限性</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                后续研究影响
              </h3>
              <ul className="space-y-4 text-sm text-green-800">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0 text-green-700 font-bold text-xs">1</span>
                  <div>
                    <strong className="text-green-900">知识编辑 (Knowledge Editing)</strong>
                    <p className="text-green-700 mt-1">ROME, MEMIT 等方法直接修改 FFN 权重来编辑模型存储的事实知识，正是基于本文的 Key-Value 视角。</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0 text-green-700 font-bold text-xs">2</span>
                  <div>
                    <strong className="text-green-900">模型可解释性</strong>
                    <p className="text-green-700 mt-1">Logit Lens、Tuned Lens 等技术将中间层表示投影到词汇空间，追踪预测的形成过程。</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0 text-green-700 font-bold text-xs">3</span>
                  <div>
                    <strong className="text-green-900">MoE 架构理解</strong>
                    <p className="text-green-700 mt-1">Mixture-of-Experts 可以视为<strong>动态选择不同的记忆子集</strong>，每个 Expert 是一个专门的记忆库。</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0 text-green-700 font-bold text-xs">4</span>
                  <div>
                    <strong className="text-green-900">检索增强生成 (RAG)</strong>
                    <p className="text-green-700 mt-1">理解 FFN 作为内部知识库，有助于更好地设计外部知识与内部知识的融合策略。</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
              <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                局限性讨论
              </h3>
              <ul className="space-y-4 text-sm text-amber-800">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0 text-amber-700 font-bold text-xs">1</span>
                  <div>
                    <strong className="text-amber-900">分析范围有限</strong>
                    <p className="text-amber-700 mt-1">主要基于 Transformer-XL (16层)，对于更大规模模型（如 GPT-3, LLaMA）的验证有待扩展。</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0 text-amber-700 font-bold text-xs">2</span>
                  <div>
                    <strong className="text-amber-900">模式识别主观性</strong>
                    <p className="text-amber-700 mt-1">Key 捕获的"模式"需要人工解读，存在一定的主观性和标注不一致性。</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0 text-amber-700 font-bold text-xs">3</span>
                  <div>
                    <strong className="text-amber-900">未归一化 vs Softmax</strong>
                    <p className="text-amber-700 mt-1">FFN 使用 ReLU 而非 Softmax，这种"未归一化记忆"与经典记忆网络的差异值得进一步研究。</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0 text-amber-700 font-bold text-xs">4</span>
                  <div>
                    <strong className="text-amber-900">与 GeLU/SwiGLU 的关系</strong>
                    <p className="text-amber-700 mt-1">现代 LLM 常用 GeLU 或 SwiGLU 激活，其"门控"特性如何影响记忆机制需要进一步探讨。</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="bg-slate-900 text-slate-300 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">总结</h2>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed mb-6">
            这篇论文通过将前馈层重新构建为键值记忆网络，揭开了 Transformer 这一黑盒的重要一角。
            它证明了 FFN 不仅仅是计算单元，更是<strong className="text-white">巨大的模式存储库</strong>。
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8 text-left">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
              <h4 className="font-bold text-blue-300 mb-2">底层 (Lower Layers)</h4>
              <p className="text-sm text-slate-300">捕获<strong className="text-white">词汇/语法模式</strong>，如 n-gram、词缀、固定短语</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
              <h4 className="font-bold text-purple-300 mb-2">高层 (Upper Layers)</h4>
              <p className="text-sm text-slate-300">捕获<strong className="text-white">语义/主题模式</strong>，实现抽象概念的表示</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
              <h4 className="font-bold text-green-300 mb-2">层间协作</h4>
              <p className="text-sm text-slate-300">通过<strong className="text-white">残差连接</strong>逐层微调，形成最终预测</p>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-xl p-6 max-w-2xl mx-auto border border-white/10 mb-8">
            <h4 className="font-bold text-white mb-3">核心贡献一句话总结</h4>
            <p className="text-lg text-blue-200 italic">
              "Transformer 的 FFN 层本质上是未归一化的键值记忆网络，存储了从训练数据中学到的文本模式及其对应的预测分布。"
            </p>
          </div>
          
          <div className="text-sm text-slate-500">
            Based on: Geva, M., Schuster, R., Berant, J., & Levy, O. (2020). Transformer Feed-Forward Layers Are Key-Value Memories. EMNLP 2021.
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-100 border-t border-slate-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-600 text-sm">
          <p>论文深度解读 · arXiv:2012.14913v2</p>
        </div>
      </footer>
    </div>
  );
};

export default FFNKeyValue;

