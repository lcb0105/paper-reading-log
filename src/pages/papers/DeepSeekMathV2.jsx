import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Shield, Brain, RefreshCw, Award, ChevronRight, 
  CheckCircle, AlertTriangle, Target, Search, BarChart3, 
  ChevronDown, ChevronUp, Database, Zap, ArrowRight, Layout, ArrowLeft, Lock
} from 'lucide-react';

const DeepSeekMathV2 = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const [activeMethodStep, setActiveMethodStep] = useState(0);

  const sections = [
    { id: 'intro', title: '背景与痛点', subtitle: 'Outcome vs Process', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'method', title: '核心方法', subtitle: 'Verifier & Generator', icon: <Brain className="w-5 h-5" /> },
    { id: 'synergy', title: '自动化飞轮', subtitle: 'Auto-Labeling', icon: <RefreshCw className="w-5 h-5" /> },
    { id: 'results', title: '实验结果', subtitle: 'SOTA Performance', icon: <BarChart3 className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* --- Floating Back Button (Added for Navigation) --- */}
      <div className="fixed top-6 left-6 z-50">
        <Link to="/" className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md border border-slate-200 rounded-full shadow-lg text-slate-600 hover:text-indigo-600 hover:scale-105 transition-all">
            <ArrowLeft size={18} />
            <span className="font-medium text-sm">Back</span>
        </Link>
      </div>

      {/* Hero Header */}
      <header className="relative bg-slate-900 text-white overflow-hidden pb-12 pt-20 px-6 shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
          <div className="absolute left-0 bottom-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="bg-indigo-500/20 border border-indigo-400/30 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-indigo-200">
                Paper Review
              </div>
              <span className="text-slate-400 text-sm font-mono">arXiv: DeepSeek-AI | 2025</span>
            </div>
            <div className="flex space-x-4 text-xs font-medium text-slate-400">
              <span className="flex items-center"><Database className="w-3 h-3 mr-1" /> 17.5k Cold Start Problems</span>
              <span className="flex items-center"><Zap className="w-3 h-3 mr-1" /> GRPO Training</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-indigo-200">
            DeepSeekMath-V2
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl font-light leading-relaxed">
            迈向 <span className="text-indigo-400 font-normal">自验证 (Self-Verifiable)</span> 的数学推理：<br/>
            从“盲目刷题”到“自我反思”的范式转变。
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {['Process Supervision', 'RLAIF', 'Theorem Proving', 'Test-time Compute'].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs text-slate-300">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Sticky Navigation */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto py-2 scrollbar-hide">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex-shrink-0 flex items-center space-x-3 px-5 py-3 rounded-lg transition-all duration-200 group ${
                  activeSection === section.id
                    ? 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200 shadow-sm'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className={`p-1.5 rounded-md transition-colors ${
                   activeSection === section.id ? 'bg-indigo-100' : 'bg-slate-100 group-hover:bg-slate-200'
                }`}>
                  {section.icon}
                </div>
                <div className="text-left">
                  <div className={`text-sm font-bold ${activeSection === section.id ? 'text-indigo-900' : ''}`}>
                    {section.title}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider opacity-70 font-medium">
                    {section.subtitle}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto p-6 md:p-10 min-h-[600px]">
        
        {/* SECTION 1: INTRODUCTION */}
        {activeSection === 'intro' && (
          <div className="animate-fadeIn space-y-8">
            <div className="grid md:grid-cols-12 gap-8">
              <div className="md:col-span-4 space-y-4">
                <h2 className="text-3xl font-bold text-slate-900">核心痛点</h2>
                <p className="text-slate-600 leading-relaxed">
                  大模型在数学领域的进展主要依赖于<span className="font-semibold text-slate-900">结果奖励 (Outcome Reward)</span>，即只看答案对错。这在 AIME 等填空题上效果显著，但在高等数学和定理证明中遇到了根本性瓶颈。
                </p>
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
                  <h4 className="flex items-center font-bold text-amber-800 mb-2">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    关键问题
                  </h4>
                  <p className="text-sm text-amber-900/80">
                    "Correct answers don't guarantee correct reasoning."
                    <br/>
                    答案正确不代表过程正确，这导致了严重的“幻觉”和逻辑漏洞。
                  </p>
                </div>
              </div>

              <div className="md:col-span-8 grid gap-6 md:grid-cols-2">
                {/* Traditional Approach Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Target className="w-24 h-24 text-red-500" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                    <span className="w-2 h-8 bg-red-500 rounded-full mr-3"></span>
                    传统模式：结果导向
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                      <div className="text-xs font-bold text-red-600 uppercase mb-1">主要缺陷 1</div>
                      <p className="text-sm text-slate-700">
                        <span className="font-semibold">False Positives (假阳性):</span><br/>
                        模型通过错误的逻辑推导出正确的数字。RL 会错误地奖励这种行为，导致模型学到“凑答案”的坏习惯。
                      </p>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                      <div className="text-xs font-bold text-red-600 uppercase mb-1">主要缺陷 2</div>
                      <p className="text-sm text-slate-700">
                        <span className="font-semibold">不适用证明题:</span><br/>
                        定理证明（Theorem Proving）往往没有数值答案，核心在于推导步骤的严密性。结果奖励在此失效。
                      </p>
                    </div>
                  </div>
                </div>

                {/* New Paradigm Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Shield className="w-24 h-24 text-emerald-500" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                    <span className="w-2 h-8 bg-emerald-500 rounded-full mr-3"></span>
                    DeepSeekMath-V2
                  </h3>
                  <div className="space-y-4">
                     <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                      <div className="text-xs font-bold text-emerald-600 uppercase mb-1">核心假设 1</div>
                      <p className="text-sm text-slate-700">
                        <span className="font-semibold">过程监督 (Process Supervision):</span><br/>
                        通过训练验证器（Verifier）来评估每一步推理的质量，而不仅仅是最后的结果。
                      </p>
                    </div>
                    <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                      <div className="text-xs font-bold text-emerald-600 uppercase mb-1">核心假设 2</div>
                      <p className="text-sm text-slate-700">
                        <span className="font-semibold">自验证 (Self-Verification):</span><br/>
                        如果一个证明经过大规模算力验证（Scaling Verification）仍找不出错，那它大概率是对的。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: METHODOLOGY */}
        {activeSection === 'method' && (
          <div className="animate-fadeIn space-y-10">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-3xl font-bold text-slate-900 mb-3">三阶段训练架构</h2>
              <p className="text-slate-500">
                DeepSeekMath-V2 构建了一个闭环系统，通过三个角色的相互博弈实现能力的螺旋上升。
              </p>
            </div>

            {/* Stepper Navigation */}
            <div className="flex justify-center mb-8">
              <div className="flex space-x-2 bg-slate-100 p-1 rounded-xl">
                {['验证器 (Verifier)', '元验证器 (Meta-Verifier)', '生成器 (Generator)'].map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveMethodStep(idx)}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeMethodStep === idx
                        ? 'bg-white text-indigo-700 shadow-sm ring-1 ring-black/5'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {idx + 1}. {step}
                  </button>
                ))}
              </div>
            </div>

            {/* Stepper Content */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden min-h-[400px]">
              <div className="grid md:grid-cols-2 h-full">
                {/* Left: Graphic/Code */}
                <div className="bg-slate-900 p-8 text-white flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                  
                  {activeMethodStep === 0 && (
                    <div className="relative z-10 animate-slideUp">
                      <div className="inline-block px-3 py-1 bg-blue-600 rounded-full text-xs font-bold mb-4">Step 1</div>
                      <h3 className="text-2xl font-bold mb-4">Training the Verifier</h3>
                      <div className="space-y-4 font-mono text-sm text-slate-300">
                        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                          <p className="text-purple-400">Input:</p>
                          <p>Problem X, Proof Y</p>
                          <p className="text-purple-400 mt-2">Output:</p>
                          <p>Analysis (Text) + Score (0, 0.5, 1)</p>
                        </div>
                        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                          <p className="text-green-400">Objective:</p>
                          <p>Align with expert scores (AoPS dataset)</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeMethodStep === 1 && (
                    <div className="relative z-10 animate-slideUp">
                      <div className="inline-block px-3 py-1 bg-purple-600 rounded-full text-xs font-bold mb-4">Step 2</div>
                      <h3 className="text-2xl font-bold mb-4">Meta-Verification</h3>
                      <p className="text-slate-300 mb-6">
                        防止验证器为了拿分而"不懂装懂" (Hallucination)。
                      </p>
                      <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 backdrop-blur-sm relative">
                        {/* Anchor Concept Visualization */}
                        <div className="absolute -top-3 -right-3 bg-yellow-500 text-slate-900 text-[10px] font-bold px-2 py-1 rounded shadow-lg flex items-center">
                          <Lock className="w-3 h-3 mr-1" />
                          HUMAN ANCHOR
                        </div>
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center font-bold">V</div>
                          <ArrowRight className="text-slate-500" />
                          <div className="flex-1 bg-slate-600 p-2 rounded text-xs text-center">评语: "这里错了"</div>
                          <ArrowRight className="text-slate-500" />
                          <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center font-bold shadow-lg shadow-purple-900/50">MV</div>
                        </div>
                        <p className="text-center text-xs text-slate-400">Meta-Verifier 检查评语是否合理</p>
                      </div>
                    </div>
                  )}

                  {activeMethodStep === 2 && (
                    <div className="relative z-10 animate-slideUp">
                      <div className="inline-block px-3 py-1 bg-emerald-600 rounded-full text-xs font-bold mb-4">Step 3</div>
                      <h3 className="text-2xl font-bold mb-4">Generative Reward</h3>
                      <p className="text-slate-300 mb-4">
                        迫使生成器在输出最终答案前，先进行<b>自我分析 (Z)</b>。
                      </p>
                       <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs border-l-2 border-emerald-500 shadow-inner">
                        <p className="text-slate-500 mb-2">// 混合奖励函数</p>
                        <p className="mb-2"><span className="text-indigo-400">Reward</span> = R_format · (α·<span className="text-yellow-400">R_proof</span> + β·<span className="text-emerald-400">R_self</span>)</p>
                        <p className="text-slate-500 mt-2">// 参数设定</p>
                        <p>α = 0.76 (证明本身质量)</p>
                        <p>β = 0.24 (自我认知准确度)</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right: Explanation Text */}
                <div className="p-8 flex flex-col justify-center">
                  {activeMethodStep === 0 && (
                    <div className="space-y-4">
                      <h4 className="text-xl font-bold text-slate-800">构建判卷系统</h4>
                      <p className="text-slate-600">
                        首先需要一个“老师”模型。研究团队爬取了 AoPS 的 <b>17,503</b> 道竞赛题，利用早期的 DeepSeek 模型生成证明，并由<b>人类数学专家</b>进行打分（0, 0.5, 1），构建了冷启动数据。
                      </p>
                      <ul className="space-y-2 text-sm text-slate-500 bg-slate-50 p-4 rounded-lg">
                        <li className="flex items-center"><ChevronRight className="w-4 h-4 text-indigo-500 mr-2"/> <b>1分:</b> 逻辑严密，无漏洞。</li>
                        <li className="flex items-center"><ChevronRight className="w-4 h-4 text-indigo-500 mr-2"/> <b>0.5分:</b> 大体正确，有细节错误。</li>
                        <li className="flex items-center"><ChevronRight className="w-4 h-4 text-indigo-500 mr-2"/> <b>0分:</b> 核心逻辑错误。</li>
                      </ul>
                    </div>
                  )}

                  {activeMethodStep === 1 && (
                    <div className="space-y-4">
                      <h4 className="text-xl font-bold text-slate-800">引入督导机制</h4>
                      <p className="text-slate-600">
                        直接训练验证器有一个大漏洞：模型发现只要预测分数准确就能拿奖励，于是开始<b>编造错误理由</b>。
                      </p>
                      <p className="text-slate-600">
                        <b>解决方案：</b> 引入 Meta-Verifier。它不看题目，专门看验证器的“评语”。如果验证器说“第三步错了”，元验证器会去核实第三步是否真的错了。
                      </p>
                      
                      <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 text-sm space-y-2">
                        <h5 className="font-bold text-amber-800 flex items-center">
                          <Lock className="w-3 h-3 mr-1" />
                          关键保障：人类锚点 (Anchor)
                        </h5>
                        <p className="text-slate-700">
                          元验证器的训练数据完全来自<b>人类专家</b>，且在后续迭代中保持标准不变。它就像一本“宪法”，防止验证器在自我进化中产生逻辑漂移 (Alignment Drift)。
                        </p>
                      </div>

                      <div className="flex items-center space-x-2 text-sm font-bold text-purple-700 bg-purple-50 p-3 rounded-lg border border-purple-100">
                        <Award className="w-4 h-4" />
                        <span>效果：评语质量从 0.85 提升至 0.96</span>
                      </div>
                    </div>
                  )}

                   {activeMethodStep === 2 && (
                    <div className="space-y-4">
                      <h4 className="text-xl font-bold text-slate-800">自我验证激励 (Incentive)</h4>
                      <p className="text-slate-600">
                        这是最精妙的博弈设计。通过 α (0.76) 和 β (0.24) 的权重分配，模型面临一个选择：
                      </p>
                      <div className="space-y-3">
                         <div className="flex p-3 bg-red-50 rounded-lg border border-red-100 opacity-60">
                           <span className="text-red-500 font-bold mr-2">Bad Strategy:</span>
                           <span className="text-sm text-slate-700">做错了还嘴硬。两边都拿不到分，惩罚最重。</span>
                         </div>
                         <div className="flex p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                           <span className="text-yellow-600 font-bold mr-2">Good Strategy:</span>
                           <span className="text-sm text-slate-700">做错了但诚实承认。能拿到 β 部分的分数，止损。</span>
                         </div>
                         <div className="flex p-3 bg-emerald-50 rounded-lg border border-emerald-100 shadow-sm">
                           <span className="text-emerald-600 font-bold mr-2">Best Strategy:</span>
                           <span className="text-sm text-slate-700"><b>在交卷前把错改完。</b> 这样 α 和 β 全拿，奖励最大化。</span>
                         </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: SYNERGY */}
        {activeSection === 'synergy' && (
          <div className="animate-fadeIn">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">全自动数据飞轮</h2>
              <p className="text-slate-600 max-w-3xl mx-auto">
                随着题目变难，人类标注变得不可行。DeepSeek 提出了一种<b>“用推理算力换取数据质量”</b>的自动化管线，在最后两轮迭代中完全取代了人类。
              </p>
            </div>

            <div className="relative">
              {/* Central Flow Line */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -z-10 hidden md:block transform -translate-y-1/2"></div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Step 1 */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-blue-500 relative group hover:-translate-y-1 transition-transform duration-300">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-slate-50">1</div>
                  <div className="mt-6 text-center">
                    <h3 className="text-lg font-bold text-slate-800 mb-2">大规模采样 (Scaling)</h3>
                    <div className="text-4xl font-black text-blue-100 mb-4">n<span className="text-lg text-slate-400 font-normal"> samples</span></div>
                    <p className="text-sm text-slate-600">
                      对同一个证明，让验证器独立检查 <b>n</b> 次。
                    </p>
                    <div className="mt-4 bg-blue-50 text-blue-800 text-xs py-2 px-3 rounded-full inline-block">
                      捕捉隐蔽漏洞
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-purple-500 relative group hover:-translate-y-1 transition-transform duration-300">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-slate-50">2</div>
                   <div className="mt-6 text-center">
                    <h3 className="text-lg font-bold text-slate-800 mb-2">元验证过滤</h3>
                    <div className="text-4xl font-black text-purple-100 mb-4">m<span className="text-lg text-slate-400 font-normal"> meta-reviews</span></div>
                    <p className="text-sm text-slate-600">
                      针对每一个找出的“差评”，生成 <b>m</b> 个元评估进行核实。
                    </p>
                    <div className="mt-4 bg-purple-50 text-purple-800 text-xs py-2 px-3 rounded-full inline-block">
                      Majority Voting (多数投票)
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-emerald-500 relative group hover:-translate-y-1 transition-transform duration-300">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-slate-50">3</div>
                   <div className="mt-6 text-center">
                    <h3 className="text-lg font-bold text-slate-800 mb-2">自动定性</h3>
                    <div className="text-4xl font-black text-emerald-100 mb-4">Label</div>
                    <p className="text-sm text-slate-600">
                      没有有效漏洞 = <b className="text-emerald-600">1分</b><br/>
                      有确认的漏洞 = <b className="text-red-500">0分</b>
                    </p>
                    <div className="mt-4 bg-emerald-50 text-emerald-800 text-xs py-2 px-3 rounded-full inline-block">
                      人类完全退出循环 (Human-out-of-loop)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-slate-900 rounded-xl p-8 text-white relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">为什么这很重要？</h3>
                  <p className="text-slate-300 max-w-xl">
                    这证明了 <b>Test-time Compute (推理时算力)</b> 可以转化为 <b>Training Data Quality (训练数据质量)</b>。系统通过消耗算力来自我净化数据，从而实现自我进化。
                  </p>
                </div>
                <div className="mt-6 md:mt-0 bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20">
                  <div className="text-3xl font-bold text-center text-emerald-400">100%</div>
                  <div className="text-xs text-center text-slate-300">Automated in late stages</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: RESULTS */}
        {activeSection === 'results' && (
          <div className="animate-fadeIn space-y-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">实验结果：统治级的表现</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Putnam Score Card */}
              <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
                <div className="relative z-10">
                  <h3 className="text-indigo-200 font-bold uppercase tracking-wider text-sm mb-1">Putnam 2024</h3>
                  <p className="text-xs text-indigo-300 mb-6">北美本科生最高难度数学竞赛</p>
                  
                  <div className="flex items-end space-x-2 mb-2">
                    <span className="text-6xl font-black text-white">118</span>
                    <span className="text-xl text-indigo-300 mb-2">/ 120</span>
                  </div>
                  
                  <div className="w-full bg-white/10 rounded-full h-2 mb-4">
                    <div className="bg-emerald-400 h-2 rounded-full" style={{ width: '98.3%' }}></div>
                  </div>

                  <div className="flex items-center justify-between text-sm bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                    <span className="text-indigo-200">Human Highest</span>
                    <span className="font-bold">90 Points</span>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-800">IMO 2025</h4>
                    <p className="text-xs text-slate-500">International Mathematical Olympiad</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-amber-500">Gold</div>
                    <div className="text-xs text-slate-400">5/6 Solved</div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-800">Geometry (几何)</h4>
                    <p className="text-xs text-slate-500">CNML-Level Problems</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-600">0.52</div>
                    <div className="text-xs text-slate-400">vs 0.17 (Gemini)</div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-800">Pass@1 vs Best@32</h4>
                    <p className="text-xs text-slate-500">IMO Shortlist 2024</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                       <span className="text-slate-400 line-through text-sm">0.27</span>
                       <ArrowRight className="w-4 h-4 text-slate-300" />
                       <span className="text-2xl font-bold text-indigo-600">0.42</span>
                    </div>
                    <div className="text-xs text-slate-400">With Self-Selection</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Insight Box */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
              <h3 className="text-lg font-bold text-indigo-900 mb-2 flex items-center">
                <Layout className="w-5 h-5 mr-2" />
                High-Compute Search (暴力美学)
              </h3>
              <p className="text-indigo-800 text-sm leading-relaxed">
                为了解决最难的题目，DeepSeekMath-V2 使用了一种类似进化算法的策略：
                初始化 <b>64 个证明</b>，每个证明经过 <b>64 次验证</b>。选出最好的，结合差评进行 <b>16 轮迭代修正</b>。
                <br/>
                结果：<span className="font-semibold">未解决的问题通常都能被生成器自己发现问题，而解决的问题通过了所有 64 次验证。</span>
              </p>
            </div>
          </div>
        )}

      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 mt-12 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <h5 className="text-white font-bold mb-4">About This Review</h5>
            <p>Generated for Penn Engineering Student studying LLM Reasoning & PEFT.</p>
          </div>
          <div>
            <h5 className="text-white font-bold mb-4">Core Concepts</h5>
            <ul className="space-y-2">
              <li>Reinforcement Learning (GRPO)</li>
              <li>Self-Verification</li>
              <li>Meta-Verification</li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold mb-4">References</h5>
            <p>DeepSeek-AI. (2025). <i>DeepSeekMath-V2: Towards Self-Verifiable Mathematical Reasoning</i>. arXiv.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DeepSeekMathV2;
