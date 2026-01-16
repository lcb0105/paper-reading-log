import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lightbulb, Brain, Target, BarChart3, Zap, CheckCircle, TrendingUp, Database, Activity, FlaskConical, BookOpen, GitBranch, Layers, MapPin, AlertTriangle, Settings } from 'lucide-react';

// 公式展示组件
const FormulaBox = ({ title, formula, explanation, variables }) => (
  <div className="my-6 bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-xl overflow-hidden shadow-sm">
    {title && (
      <div className="bg-gradient-to-r from-indigo-800 to-blue-700 text-white px-4 py-2.5 text-sm font-mono flex justify-between items-center">
        <span className="font-semibold">{title}</span>
        <span className="text-indigo-200 text-xs bg-indigo-600 px-2 py-0.5 rounded">Mathematical Formula</span>
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
      {variables && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm bg-slate-50 rounded-lg p-4">
          <div className="md:col-span-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">变量说明</div>
          {variables.map((v, idx) => (
            <div key={idx} className="flex items-baseline gap-2">
              <span className="font-mono font-bold text-indigo-700 whitespace-nowrap bg-indigo-50 px-1.5 py-0.5 rounded">{v.symbol}</span>
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
    important: 'bg-indigo-50 border-indigo-200 text-indigo-800'
  };
  const iconColors = {
    info: 'text-blue-600',
    success: 'text-green-600',
    warning: 'text-amber-600',
    important: 'text-indigo-600'
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

const GeometryOfTruth = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">返回首页</span>
            </Link>
            <div className="hidden md:flex space-x-6 text-sm font-medium text-slate-600">
              <a href="#abstract" className="hover:text-indigo-600 transition">核心摘要</a>
              <a href="#datasets" className="hover:text-indigo-600 transition">数据集</a>
              <a href="#localization" className="hover:text-indigo-600 transition">定位分析</a>
              <a href="#probing" className="hover:text-indigo-600 transition">探针方法</a>
              <a href="#intervention" className="hover:text-indigo-600 transition">因果干预</a>
              <a href="#generalization" className="hover:text-indigo-600 transition">泛化实验</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-gradient-to-br from-indigo-700 via-blue-800 to-slate-900 text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.4\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-sm font-semibold mb-4">
            arXiv:2310.06824 · COLM 2024
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            真理的几何学<br/>
            <span className="text-indigo-300">The Geometry of Truth</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6 font-light">
            大型语言模型中真/假数据集表征的涌现线性结构
          </p>
          <div className="flex justify-center gap-3 flex-wrap text-sm">
            <span className="bg-indigo-600/50 px-4 py-1.5 rounded-full border border-indigo-400/30">Samuel Marks</span>
            <span className="bg-indigo-600/50 px-4 py-1.5 rounded-full border border-indigo-400/30">Max Tegmark</span>
            <span className="bg-indigo-600/50 px-4 py-1.5 rounded-full border border-indigo-400/30">MIT & Northeastern</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-12 space-y-16">
        {/* Abstract & Core Contribution */}
        <section id="abstract" className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 scroll-mt-24">
          <h2 className="text-3xl font-bold text-indigo-700 mb-6 flex items-center gap-3">
            <span className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </span>
            核心摘要
          </h2>
          
          <p className="text-slate-700 mb-6 leading-relaxed text-lg">
            大型语言模型（LLMs）虽然能力强大，但也容易输出虚假信息。这篇论文通过构建高质量的简单真/假陈述数据集，深入研究了LLM内部如何表征"真理"。
          </p>
          
          <HighlightBox type="important" title="🔑 核心发现" icon={Lightbulb}>
            <p className="font-semibold">
              在足够大的规模下，LLMs 会<strong>线性地表征</strong>事实陈述的真假。这意味着在模型的高维空间中，存在一个<strong>"真理方向"（Truth Direction）</strong>，沿着这个方向可以区分真与假。
            </p>
          </HighlightBox>
          
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <h4 className="font-bold text-blue-900">可视化证据</h4>
              </div>
              <p className="text-sm text-blue-800">简单的 PCA（主成分分析）可视化即可揭示清晰的线性结构。</p>
            </div>
            
            <div className="bg-green-50 rounded-xl p-5 border border-green-200">
              <div className="flex items-center gap-2 mb-3">
                <GitBranch className="w-5 h-5 text-green-600" />
                <h4 className="font-bold text-green-900">泛化能力</h4>
              </div>
              <p className="text-sm text-green-800">在一个数据集上训练的线性探针可以泛化到结构和主题完全不同的数据集。</p>
            </div>
            
            <div className="bg-purple-50 rounded-xl p-5 border border-purple-200">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-purple-600" />
                <h4 className="font-bold text-purple-900">因果干预</h4>
              </div>
              <p className="text-sm text-purple-800">Mass-Mean Probing 识别的方向在因果上更具影响力。</p>
            </div>
          </div>
        </section>

        {/* Datasets */}
        <section id="datasets" className="scroll-mt-24">
          <div className="border-b border-slate-300 pb-4 mb-8">
            <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Database className="w-8 h-8 text-indigo-600" />
              1. 数据集构建 (Datasets)
            </h2>
            <p className="text-slate-600 mt-2">为了分离"真理"本身与"常见度"或"句子结构"，作者构建了严格控制的 curated datasets。</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                简单事实 (Simple Facts)
              </h3>
              <div className="space-y-3">
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                  <code className="text-sm font-mono text-blue-700">cities</code>
                  <p className="text-sm text-slate-600 mt-1">"The city of [city] is in [country]."</p>
                  <p className="text-xs text-slate-500">1496 条样本</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                  <code className="text-sm font-mono text-blue-700">sp_en_trans</code>
                  <p className="text-sm text-slate-600 mt-1">"The Spanish word '[word]' means '[English word]'."</p>
                  <p className="text-xs text-slate-500">354 条样本</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                  <code className="text-sm font-mono text-blue-700">larger_than</code>
                  <p className="text-sm text-slate-600 mt-1">"x is larger than y." (51-99 的数字比较)</p>
                  <p className="text-xs text-slate-500">1980 条样本</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                结构变体 (Structural Variations)
              </h3>
              <div className="space-y-3">
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                  <code className="text-sm font-mono text-purple-700">neg_cities</code>
                  <p className="text-sm text-slate-600 mt-1">加入 "not" 进行否定</p>
                  <p className="text-xs text-slate-500">测试否定理解能力</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                  <code className="text-sm font-mono text-purple-700">cities_conj / cities_disj</code>
                  <p className="text-sm text-slate-600 mt-1">两个陈述的合取 (and) / 析取 (or)</p>
                  <p className="text-xs text-slate-500">测试逻辑组合能力</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                  <code className="text-sm font-mono text-purple-700">likely</code>
                  <p className="text-sm text-slate-600 mt-1">非事实文本（高/低概率）</p>
                  <p className="text-xs text-slate-500">对照组：测试是否只拟合"概率高低"</p>
                </div>
              </div>
            </div>
          </div>
          
          <HighlightBox type="warning" title="为什么需要 likely 数据集？" icon={Lightbulb}>
            <p>
              如果探针只是在检测"文本看起来是否合理"（高概率 vs 低概率），而非"事实是否为真"，
              那么它应该也能区分 <code className="bg-amber-100 px-1 rounded">likely</code> 数据集中的样本。
              实验发现，真理探针<strong>无法</strong>区分 likely 数据集，证明它确实在检测"真理"而非"概率"。
            </p>
          </HighlightBox>
        </section>

        {/* Localization Section */}
        <section id="localization" className="scroll-mt-24">
          <div className="border-b border-slate-300 pb-4 mb-8">
            <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <MapPin className="w-8 h-8 text-indigo-600" />
              2. 定位分析：真理编码在哪里？
            </h2>
            <p className="text-slate-600 mt-2">论文深入分析了真理信息在模型内部的<strong>空间位置</strong>（Token）和<strong>深度位置</strong>（Layer）。</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Token Position */}
            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </span>
                Token 位置分析
              </h3>
              <p className="text-slate-700 mb-4 text-sm leading-relaxed">
                真理信息<strong>不是均匀分布</strong>在所有 token 位置。论文发现主要集中在：
              </p>
              
              <div className="space-y-3">
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <div className="font-bold text-orange-800 mb-1">Subject 的最后一个 Token</div>
                  <p className="text-sm text-orange-700">
                    例如 "The city of <span className="bg-orange-200 px-1 rounded font-mono">Beijing</span> is in China"
                  </p>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="font-bold text-blue-800 mb-1">句子的最后一个 Token</div>
                  <p className="text-sm text-blue-700">
                    例如 "The city of Beijing is in <span className="bg-blue-200 px-1 rounded font-mono">China</span>."
                  </p>
                </div>
              </div>
              
              <p className="text-xs text-slate-500 mt-3">
                * 这与 Transformer 的因果注意力机制一致：后面的 token 可以聚合前面的信息
              </p>
            </div>
            
            {/* Layer Analysis */}
            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </span>
                Layer 深度分析
              </h3>
              <p className="text-slate-700 mb-4 text-sm leading-relaxed">
                真理表征在<strong>中间到后期层</strong>最为明显：
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 w-20">早期层</span>
                  <div className="flex-1 bg-slate-200 rounded-full h-3">
                    <div className="bg-slate-400 h-3 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                  <span className="text-xs text-slate-500">弱</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 w-20">中期层</span>
                  <div className="flex-1 bg-slate-200 rounded-full h-3">
                    <div className="bg-indigo-500 h-3 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                  <span className="text-xs text-slate-500">强</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 w-20">后期层</span>
                  <div className="flex-1 bg-slate-200 rounded-full h-3">
                    <div className="bg-indigo-600 h-3 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                  <span className="text-xs text-slate-500">最强</span>
                </div>
              </div>
              
              <div className="mt-4 bg-purple-50 rounded-lg p-3 border border-purple-200">
                <p className="text-sm text-purple-800">
                  <strong>LLaMA-2-70B</strong> 在 Layer 20-30（共32层）表现最佳
                </p>
              </div>
            </div>
          </div>
          
          <HighlightBox type="info" title="定位的意义" icon={Lightbulb}>
            <p>
              了解真理信息的<strong>精确位置</strong>对于因果干预至关重要。
              论文发现，只需干预<strong>少数几个 hidden states</strong>（特定层的特定 token 位置）就能有效改变模型对真假的判断，
              而非需要干预整个模型。这暗示真理信息是<strong>高度局部化</strong>的。
            </p>
          </HighlightBox>
        </section>

        {/* Visualization */}
        <section id="visualization" className="scroll-mt-24">
          <div className="border-b border-slate-300 pb-4 mb-8">
            <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-indigo-600" />
              3. 可视化：真理的涌现
            </h2>
            <p className="text-slate-600 mt-2">通过 PCA 可视化，揭示 LLM 内部的线性真理结构。</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 mb-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">PCA 可视化示意</h3>
            <p className="text-slate-700 mb-4">
              对 LLM 的残差流（Residual Stream）激活值进行主成分分析，随着模型规模增加，线性结构逐渐清晰。
            </p>
            
            {/* Conceptual Visualization */}
            <div className="bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl p-8 border border-slate-200">
              <div className="flex items-center justify-center gap-16">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center mb-3">
                    <span className="text-blue-700 font-bold">TRUE</span>
                  </div>
                  <p className="text-sm text-slate-600">真实陈述聚类</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-32 h-0.5 bg-gradient-to-r from-blue-500 to-red-500 relative">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-xs text-slate-500">
                      真理方向 θ
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-slate-400">← 线性可分 →</div>
                </div>
                
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center mb-3">
                    <span className="text-red-700 font-bold">FALSE</span>
                  </div>
                  <p className="text-sm text-slate-600">虚假陈述聚类</p>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-slate-600 italic mt-4 text-center">
              在 LLaMA-2-70B 中，不同主题的数据集（如城市位置和数字大小）的真假方向往往是<strong>对齐的</strong>，
              这表明模型学习到了抽象的"真理"概念。
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
              <h4 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                规模涌现 (Scale Emergence)
              </h4>
              <ul className="space-y-2 text-sm text-green-800">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></span>
                  <span><strong>LLaMA-2-7B</strong>: 线性结构开始出现</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></span>
                  <span><strong>LLaMA-2-13B</strong>: 线性分离更加清晰</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></span>
                  <span><strong>LLaMA-2-70B</strong>: 跨数据集方向高度对齐</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200">
              <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                跨数据集泛化
              </h4>
              <p className="text-sm text-blue-800 mb-3">
                在 <code className="bg-blue-100 px-1 rounded">cities</code> 上训练的探针，
                可以成功分类 <code className="bg-blue-100 px-1 rounded">sp_en_trans</code> 和 <code className="bg-blue-100 px-1 rounded">larger_than</code>。
              </p>
              <p className="text-sm text-blue-700">
                → 证明存在<strong>通用的真理方向</strong>，而非针对特定主题的特征。
              </p>
            </div>
          </div>
        </section>

        {/* Core Mathematics: Probing */}
        <section id="probing" className="scroll-mt-24">
          <div className="border-b border-slate-300 pb-4 mb-8">
            <h2 className="text-3xl font-bold text-indigo-800 flex items-center gap-3">
              <Brain className="w-8 h-8 text-indigo-600" />
              4. 探针方法对比与核心理论
            </h2>
            <p className="text-slate-600 mt-2">论文比较了多种探针技术，并解释为什么简单的均值差方法更有效。</p>
          </div>
          
          {/* Probing Methods Comparison */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 mb-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4 border-l-4 border-slate-500 pl-3">
              4.0 探针方法概览
            </h3>
            <p className="text-slate-700 mb-4">论文对比了以下四种主要探针技术：</p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-bold text-blue-900 mb-2">LR (Logistic Regression)</h4>
                <p className="text-sm text-blue-800 mb-2">标准逻辑回归，最大化分类准确率</p>
                <div className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded inline-block">
                  寻找：最优决策边界
                </div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h4 className="font-bold text-green-900 mb-2">MM (Mass-Mean)</h4>
                <p className="text-sm text-green-800 mb-2">直接计算两类样本均值的差向量</p>
                <div className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded inline-block">
                  寻找：特征方向
                </div>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <h4 className="font-bold text-purple-900 mb-2">CCS (Contrast Consistent Search)</h4>
                <p className="text-sm text-purple-800 mb-2">Burns et al. (2023) 提出的无监督方法</p>
                <div className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded inline-block">
                  利用一致性约束
                </div>
              </div>
              
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                <h4 className="font-bold text-amber-900 mb-2">CRC (Contrastive Representation)</h4>
                <p className="text-sm text-amber-800 mb-2">对比学习风格的聚类方法</p>
                <div className="text-xs text-amber-600 bg-amber-100 px-2 py-1 rounded inline-block">
                  无监督聚类
                </div>
              </div>
            </div>
            
            <div className="bg-slate-100 rounded-lg p-4 border border-slate-200">
              <h4 className="font-bold text-slate-800 mb-3">方法对比结果（LLaMA-2-70B）</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-300">
                      <th className="text-left py-2 px-3 font-bold text-slate-700">方法</th>
                      <th className="text-center py-2 px-3 font-bold text-slate-700">分类准确率</th>
                      <th className="text-center py-2 px-3 font-bold text-slate-700">因果 NIE</th>
                      <th className="text-center py-2 px-3 font-bold text-slate-700">跨数据集泛化</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700">
                    <tr className="border-b border-slate-200">
                      <td className="py-2 px-3">LR</td>
                      <td className="text-center py-2 px-3 font-medium text-blue-700">~95%</td>
                      <td className="text-center py-2 px-3">中等</td>
                      <td className="text-center py-2 px-3">良好</td>
                    </tr>
                    <tr className="border-b border-slate-200 bg-green-50">
                      <td className="py-2 px-3 font-bold text-green-800">MM ⭐</td>
                      <td className="text-center py-2 px-3 font-medium text-green-700">~94%</td>
                      <td className="text-center py-2 px-3 font-bold text-green-700">最高</td>
                      <td className="text-center py-2 px-3 font-bold text-green-700">最佳</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-2 px-3">CCS</td>
                      <td className="text-center py-2 px-3">~88%</td>
                      <td className="text-center py-2 px-3">较低</td>
                      <td className="text-center py-2 px-3">较差</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">CRC</td>
                      <td className="text-center py-2 px-3">~90%</td>
                      <td className="text-center py-2 px-3">中等</td>
                      <td className="text-center py-2 px-3">中等</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-500 mt-3">
                ⭐ Mass-Mean 虽然分类准确率略低，但在<strong>因果干预</strong>和<strong>跨数据集泛化</strong>上表现最好
              </p>
            </div>
          </div>
          
          {/* LR Limitation */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 mb-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4 border-l-4 border-amber-500 pl-3">
              4.1 逻辑回归的局限性
            </h3>
            <p className="text-slate-700 mb-4 leading-relaxed">
              假设真理沿着方向 <span className="font-mono bg-slate-100 px-1 rounded">θ<sub>t</sub></span> 线性分布，
              但数据中还存在另一个特征方向 <span className="font-mono bg-slate-100 px-1 rounded">θ<sub>f</sub></span>（例如句子的长度或词频），
              且 θ<sub>f</sub> 与 θ<sub>t</sub> 不正交。
            </p>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-amber-800">
                <strong>问题：</strong>为了最大化分类间隔，逻辑回归会试图消除 θ<sub>f</sub> 的干扰，
                导致找到的方向<strong>偏离真实的 θ<sub>t</sub></strong>。
              </p>
            </div>
          </div>
          
          {/* Mass-Mean Definition */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 mb-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4 border-l-4 border-indigo-500 pl-3">
              4.2 Mass-Mean (MM) Probing 的定义
            </h3>
            <p className="text-slate-700 mb-4">
              Mass-Mean 方法直接计算"真"样本均值与"假"样本均值的<strong>差向量</strong>。这是最直观的"真理方向"。
            </p>
            
            <FormulaBox
              title="Mass-Mean 探针方向"
              formula={<span>θ<sub>mm</sub> = μ<sup>+</sup> − μ<sup>−</sup></span>}
              explanation="直接计算两类样本激活向量的均值差，无需任何优化过程。"
              variables={[
                { symbol: 'μ⁺', desc: '所有"真"样本激活向量的均值' },
                { symbol: 'μ⁻', desc: '所有"假"样本激活向量的均值' },
                { symbol: 'θ_mm', desc: '均值差方向（真理方向）' }
              ]}
            />
          </div>
          
          {/* IID Correction */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 mb-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4 border-l-4 border-green-500 pl-3">
              4.3 IID 数据的修正 (Mahalanobis Whitening)
            </h3>
            <p className="text-slate-700 mb-4">
              如果数据是独立同分布的（IID），可以利用协方差矩阵 Σ 来进一步优化决策边界。
              这等价于<strong>线性判别分析 (LDA)</strong>。
            </p>
            
            <FormulaBox
              title="修正后的探针公式"
              formula={<span>p<sub>mm</sub><sup>iid</sup>(x) = σ(θ<sub>mm</sub><sup>T</sup> Σ<sup>−1</sup> x)</span>}
              explanation="Σ⁻¹ 起到了白化 (Whitening) 的作用：先将数据变换到各向同性空间（消除特征间相关性），然后再投影到均值差方向。"
              variables={[
                { symbol: 'σ', desc: 'Sigmoid 函数' },
                { symbol: 'Σ⁻¹', desc: '协方差矩阵的逆（白化变换）' },
                { symbol: 'x', desc: '输入样本的激活向量' }
              ]}
            />
          </div>
          
          {/* Theorem */}
          <div className="bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl p-6 border border-slate-300 mb-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4 border-l-4 border-purple-500 pl-3">
              4.4 理论证明：高斯分布下的等价性
            </h3>
            
            <div className="bg-white rounded-lg p-5 border border-slate-200 mb-4">
              <p className="font-bold text-slate-800 mb-3">定理 F.1（附录 F）：</p>
              <p className="text-slate-700 mb-4">
                假设数据分布服从高斯分布 N(±θ, Σ)，那么逻辑回归找到的方向 θ<sub>lr</sub> 与 Mass-Mean 方向的关系为：
              </p>
              <div className="bg-slate-50 p-4 rounded-lg text-center border border-slate-200">
                <span className="font-serif text-xl text-slate-800" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                  θ<sub>lr</sub> ∝ Σ<sup>−1</sup> θ
                </span>
              </div>
            </div>
            
            <HighlightBox type="info" title="解读" icon={Lightbulb}>
              <p>
                逻辑回归本质上是在寻找最优的<strong>决策边界</strong>（Decision Boundary），
                而 Mass-Mean 旨在寻找<strong>特征方向</strong>（Feature Direction）。
              </p>
              <p className="mt-2">
                当我们需要进行因果干预时，我们更关心的是代表"真理"本身的特征方向 θ，
                而不是分类边界。这就是为什么 <strong>Mass-Mean 在因果干预实验中表现更好</strong>。
              </p>
            </HighlightBox>
          </div>
          
          {/* Linear Concept Erasure */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4 border-l-4 border-cyan-500 pl-3">
              4.5 理论联系：Linear Concept Erasure (附录 G)
            </h3>
            <p className="text-slate-700 mb-4 leading-relaxed">
              论文还揭示了 Mass-Mean 方向与<strong>线性概念擦除</strong>（Linear Concept Erasure）的深刻联系。
            </p>
            
            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-5 mb-4">
              <p className="font-bold text-cyan-900 mb-3">定理 G.1（Belrose et al., 2023）：</p>
              <p className="text-cyan-800 text-sm leading-relaxed">
                如果我们想要<strong>完全移除</strong>数据中关于某个二分类标签的线性可恢复信息，
                需要投影掉的方向正好是<strong>均值差方向</strong> δ = μ⁺ − μ⁻。
              </p>
            </div>
            
            <FormulaBox
              title="最优擦除投影的核空间"
              formula={<span>ker P = span(δ) , where δ = μ<sup>+</sup> − μ<sup>−</sup></span>}
              explanation="任何能够消除线性可恢复信息的秩-1 投影 P，其核空间必然由均值差向量张成。"
              variables={[
                { symbol: 'P', desc: '消除信息的投影矩阵' },
                { symbol: 'δ', desc: '均值差向量（被擦除的方向）' },
                { symbol: 'ker', desc: '核空间（被投影掉的子空间）' }
              ]}
            />
            
            <HighlightBox type="success" title="含义" icon={CheckCircle}>
              <p>
                Mass-Mean 方向不仅是最直观的"真理方向"，还是<strong>信息论意义上</strong>最优的方向：
                它恰好包含了关于真/假标签的<strong>全部线性可恢复信息</strong>。
                擦除这个方向就能完全移除模型对真假的线性判断能力。
              </p>
            </HighlightBox>
          </div>
        </section>

        {/* Causal Intervention */}
        <section id="intervention" className="scroll-mt-24">
          <div className="border-b border-slate-300 pb-4 mb-8">
            <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Zap className="w-8 h-8 text-indigo-600" />
              5. 因果干预实验 (Causal Intervention)
            </h2>
            <p className="text-slate-600 mt-2">仅仅能分类并不代表找到了因果机制。通过"手术式"干预验证真理方向的因果性。</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 mb-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">实验设置</h3>
            <p className="text-slate-700 mb-4">
              给定一个输入 x（例如一个错误陈述），在其特定的隐藏层位置加上或减去探针方向向量 θ：
            </p>
            
            <FormulaBox
              title="干预公式"
              formula={<span>x̃ = x ± α · θ<sub>probe</sub></span>}
              explanation="通过在激活向量上添加/减去真理方向的倍数，观察模型输出的变化。"
              variables={[
                { symbol: 'x', desc: '原始激活向量' },
                { symbol: 'α', desc: '干预强度系数' },
                { symbol: 'θ_probe', desc: '探针识别的真理方向' },
                { symbol: 'x̃', desc: '干预后的激活向量' }
              ]}
            />
          </div>
          
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 mb-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">归一化间接效应 (NIE)</h3>
            <p className="text-slate-700 mb-4">
              为了量化干预的效果，使用 NIE 指标。NIE 越接近 1，说明干预越成功。
            </p>
            
            <FormulaBox
              title="NIE 计算公式"
              formula={
                <span>
                  NIE = (P(TRUE)<sub>intervened</sub> − P(TRUE)<sub>baseline</sub>) / (P(TRUE)<sub>target</sub> − P(TRUE)<sub>baseline</sub>)
                </span>
              }
              explanation="衡量干预使模型输出从基线状态向目标状态移动的程度。NIE=1 表示完美干预。"
              variables={[
                { symbol: 'P(TRUE)_intervened', desc: '干预后模型预测"真"的概率' },
                { symbol: 'P(TRUE)_baseline', desc: '原始模型预测"真"的概率' },
                { symbol: 'P(TRUE)_target', desc: '目标状态（真实标签）的概率' }
              ]}
            />
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              实验结果
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <h4 className="font-bold text-green-800 mb-2">Mass-Mean 优于 Logistic Regression</h4>
                <p className="text-sm text-green-700 leading-relaxed">
                  在因果干预任务中，Mass-Mean 探针识别的方向通常比逻辑回归更有影响力。
                  这验证了数学推测：LR 找到的是<strong>分类边界</strong>，而 MM 更接近<strong>特征本质</strong>。
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <h4 className="font-bold text-green-800 mb-2">跨数据集泛化性</h4>
                <p className="text-sm text-green-700 leading-relaxed">
                  在 <code className="bg-green-100 px-1 rounded">cities</code> 数据集上训练的探针，
                  可以成功干预 <code className="bg-green-100 px-1 rounded">sp_en_trans</code> 数据集的输出。
                  证明真理方向具有<strong>跨领域通用性</strong>。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Generalization Experiments */}
        <section id="generalization" className="scroll-mt-24">
          <div className="border-b border-slate-300 pb-4 mb-8">
            <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-indigo-600" />
              6. 泛化实验详解
            </h2>
            <p className="text-slate-600 mt-2">探针能否泛化到不同主题和结构的数据？这是验证"通用真理方向"存在的关键。</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Transfer Accuracy */}
            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">6.1 跨数据集分类泛化</h3>
              <p className="text-slate-700 mb-4 text-sm">
                在 A 数据集上训练，在 B 数据集上测试：
              </p>
              
              <div className="space-y-3">
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-green-800">cities → sp_en_trans</span>
                    <span className="font-bold text-green-700">91%</span>
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '91%' }}></div>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-green-800">cities → larger_than</span>
                    <span className="font-bold text-green-700">87%</span>
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-blue-800">cities → neg_cities</span>
                    <span className="font-bold text-blue-700">82%</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </div>
                
                <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-amber-800">cities → likely</span>
                    <span className="font-bold text-amber-700">~50%</span>
                  </div>
                  <div className="w-full bg-amber-200 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                  <p className="text-xs text-amber-600 mt-1">≈ 随机猜测，证明探针不是在检测"概率"</p>
                </div>
              </div>
            </div>
            
            {/* Negation Understanding */}
            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">6.2 否定句理解能力</h3>
              <p className="text-slate-700 mb-4 text-sm">
                模型能否正确处理 "not" 带来的真值翻转？
              </p>
              
              <div className="space-y-4">
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <p className="text-sm text-slate-700 mb-2">
                    <strong>测试：</strong>在 cities 上训练，在 neg_cities 上测试
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600 text-sm">LLaMA-2-7B:</span>
                    <span className="font-mono bg-red-100 text-red-700 px-2 py-0.5 rounded text-sm">~60%</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-slate-600 text-sm">LLaMA-2-70B:</span>
                    <span className="font-mono bg-green-100 text-green-700 px-2 py-0.5 rounded text-sm">~82%</span>
                  </div>
                </div>
                
                <HighlightBox type="success" title="规模涌现" icon={TrendingUp}>
                  <p className="text-sm">
                    更大的模型能更好地理解否定。70B 模型的真理方向"知道" 
                    <code className="bg-green-100 px-1 rounded mx-1">not</code> 
                    会翻转陈述的真值。
                  </p>
                </HighlightBox>
              </div>
            </div>
          </div>
          
          {/* Logical Composition */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 mb-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">6.3 逻辑组合泛化 (Conjunction & Disjunction)</h3>
            <p className="text-slate-700 mb-4">
              测试模型是否理解逻辑组合的真值表：
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                <h4 className="font-bold text-indigo-800 mb-3">合取 (AND)</h4>
                <p className="text-sm text-indigo-700 mb-2">
                  "It is the case both that [A] and that [B]"
                </p>
                <div className="bg-white rounded p-2 text-xs font-mono text-center border border-indigo-200">
                  TRUE ∧ TRUE = TRUE<br/>
                  TRUE ∧ FALSE = FALSE
                </div>
                <p className="text-xs text-indigo-600 mt-2">
                  探针能正确分类 ~75% 的合取陈述
                </p>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <h4 className="font-bold text-purple-800 mb-3">析取 (OR)</h4>
                <p className="text-sm text-purple-700 mb-2">
                  "It is the case either that [A] or that [B]"
                </p>
                <div className="bg-white rounded p-2 text-xs font-mono text-center border border-purple-200">
                  FALSE ∨ FALSE = FALSE<br/>
                  TRUE ∨ FALSE = TRUE
                </div>
                <p className="text-xs text-purple-600 mt-2">
                  探针能正确分类 ~70% 的析取陈述
                </p>
              </div>
            </div>
            
            <HighlightBox type="warning" title="局限性" icon={AlertTriangle}>
              <p>
                逻辑组合的泛化效果不如简单主题迁移。这暗示 LLM 的"真理表征"可能更多是
                <strong>语义层面</strong>的，而非<strong>逻辑层面</strong>的。
                模型可能没有完全内化布尔逻辑的组合规则。
              </p>
            </HighlightBox>
          </div>
          
          {/* Scale Analysis */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200">
            <h3 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              6.4 规模涌现分析
            </h3>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-indigo-200 text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">7B</div>
                <p className="text-sm text-slate-600 mb-2">LLaMA-2-7B</p>
                <ul className="text-xs text-left text-slate-600 space-y-1">
                  <li>• 线性结构开始出现</li>
                  <li>• 否定理解较差</li>
                  <li>• 跨主题泛化有限</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-indigo-200 text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">13B</div>
                <p className="text-sm text-slate-600 mb-2">LLaMA-2-13B</p>
                <ul className="text-xs text-left text-slate-600 space-y-1">
                  <li>• 线性分离更清晰</li>
                  <li>• 否定理解改善</li>
                  <li>• 跨主题泛化增强</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-indigo-300 text-center ring-2 ring-indigo-400">
                <div className="text-3xl font-bold text-indigo-700 mb-2">70B</div>
                <p className="text-sm text-slate-600 mb-2">LLaMA-2-70B</p>
                <ul className="text-xs text-left text-slate-600 space-y-1">
                  <li>• <strong>跨数据集方向高度对齐</strong></li>
                  <li>• 否定理解良好</li>
                  <li>• 因果干预最有效</li>
                </ul>
              </div>
            </div>
            
            <p className="text-sm text-indigo-800 mt-4 text-center">
              → 真理的线性表征是一种<strong>涌现能力</strong>，随规模增加而增强
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <section className="bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white rounded-3xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6 text-center">7. 结论与意义</h2>
          
          <p className="text-lg text-center text-slate-300 mb-8 max-w-3xl mx-auto">
            这篇论文有力地反驳了"LLM 只是随机鹦鹉"的观点。
            在足够大的规模下，LLM 确实发展出了对"事实性"的统一线性表征。
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            <div className="bg-white/10 backdrop-blur rounded-xl p-5 border border-white/20">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🌟</span>
                <div>
                  <h4 className="font-bold text-white mb-2">抽象概念的涌现</h4>
                  <p className="text-sm text-slate-300">
                    模型不再只是记忆单独的事实，而是学习到了跨领域、跨结构的"真"与"假"的抽象概念。
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-xl p-5 border border-white/20">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🛠️</span>
                <div>
                  <h4 className="font-bold text-white mb-2">更简单的探针往往更好</h4>
                  <p className="text-sm text-slate-300">
                    复杂的分类器（如 LR 或 CCS）可能过度拟合数据集的特定统计特征，
                    而简单的均值差（Mass-Mean）往往更稳健，更接近因果机制。
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-xl p-6 max-w-2xl mx-auto border border-white/10 text-center">
            <h4 className="font-bold text-white mb-3">核心贡献一句话总结</h4>
            <p className="text-lg text-indigo-200 italic">
              "在大规模 LLM 中，事实陈述的真假被线性编码在一个通用的'真理方向'上，
              简单的 Mass-Mean 方法比复杂分类器更能捕捉这种因果结构。"
            </p>
          </div>
          
          <div className="text-center mt-8 text-sm text-slate-500">
            Based on: Marks, S., & Tegmark, M. (2024). The Geometry of Truth. COLM 2024. arXiv:2310.06824
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-100 border-t border-slate-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-600 text-sm">
          <p>论文深度解读 · arXiv:2310.06824v3</p>
        </div>
      </footer>
    </div>
  );
};

export default GeometryOfTruth;

