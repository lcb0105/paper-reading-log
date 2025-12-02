import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowDown, 
  Github, 
  MessageCircle, 
  Code2, 
  Check, 
  X, 
  Cpu, 
  Info 
} from 'lucide-react';
import 'katex/dist/katex.min.css';
import katex from 'katex';

// Math Renderer Component
const MathText = ({ text }) => {
  const containerRef = React.useRef(null);

  useEffect(() => {
    if (containerRef.current) {
       // Simple split for $...$
       const parts = text.split(/\$(.*?)\$/);
       let html = '';
       
       parts.forEach((part, index) => {
         if (index % 2 === 1) {
           try {
             html += katex.renderToString(part, {
               throwOnError: false,
               displayMode: false
             });
           } catch (e) {
             html += `<code class="text-red-500">$${part}$</code>`;
           }
         } else {
           html += part;
         }
       });
       
       containerRef.current.innerHTML = html;
    }
  }, [text]);
  
  return <span ref={containerRef} />;
};

const DeepSeekProverV2 = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-500/30">
      
      {/* --- Navigation (Adapted for Project) --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors">
               <ArrowLeft size={20} />
               <span className="hidden md:inline">返回目录</span>
            </Link>
            <div className="w-px h-6 bg-slate-200 hidden md:block"></div>
            
            <div className="flex items-center gap-2">
               <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                  DeepSeek-Prover-V2
               </span>
               <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-mono hidden sm:inline-block">Paper Analysis</span>
            </div>
          </div>
          
          <div className="hidden md:flex space-x-6 text-sm font-medium text-slate-600">
              <a href="#intro" className="hover:text-indigo-600 transition-colors">简介</a>
              <a href="#challenge" className="hover:text-indigo-600 transition-colors">核心挑战</a>
              <a href="#method" className="hover:text-indigo-600 transition-colors">方法论</a>
              <a href="#results" className="hover:text-indigo-600 transition-colors">实验结果</a>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section id="intro" className="pt-32 pb-20 md:pt-40 md:pb-28 px-6 bg-gradient-to-b from-indigo-50 to-white overflow-hidden relative">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-slate-900">
                  像数学家一样<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">思考与证明</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed">
                  深度解读 DeepSeek-Prover-V2：<br/>
                  通过<strong>强化学习</strong>与<strong>子目标分解</strong>推进形式化数学推理
              </p>
              <div className="flex justify-center gap-4">
                  <a href="#method" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center gap-2">
                      探索核心技术 <ArrowDown size={18} />
                  </a>
                  <a href="https://github.com/deepseek-ai/DeepSeek-Prover-V2" target="_blank" rel="noreferrer" className="bg-white text-slate-700 border border-slate-300 px-6 py-3 rounded-lg font-medium hover:bg-slate-50 transition-all flex items-center gap-2">
                      <Github size={18} /> View Code
                  </a>
              </div>
          </div>
      </section>

      {/* --- Challenge Section --- */}
      <section id="challenge" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-4 text-slate-900">核心挑战：跨越“直觉”与“严谨”的鸿沟</h2>
                  <p className="text-slate-600 max-w-2xl mx-auto">
                      大模型很擅长聊天做题，但要让它们写出计算机能验证的严谨数学证明（Lean 4 代码），难度呈指数级上升。
                  </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                  {/* Informal Card */}
                  <div className="p-8 rounded-2xl bg-orange-50 border border-orange-100">
                      <div className="flex items-center gap-3 mb-4">
                          <div className="p-3 bg-orange-100 rounded-lg text-orange-600">
                              <MessageCircle size={24} />
                          </div>
                          <h3 className="text-xl font-bold text-orange-900">非形式化推理 (Informal)</h3>
                      </div>
                      <p className="text-slate-700 mb-4">
                          就像我们平时的解题过程。依赖直觉、跳跃性思维和模糊的自然语言。
                      </p>
                      <ul className="space-y-2 text-sm text-slate-600">
                          <li className="flex items-start gap-2"><X size={16} className="text-red-500 mt-1"/> 容易产生“幻觉”</li>
                          <li className="flex items-start gap-2"><X size={16} className="text-red-500 mt-1"/> 步骤可能不严谨</li>
                          <li className="flex items-start gap-2"><Check size={16} className="text-green-500 mt-1"/> 擅长宏观规划</li>
                      </ul>
                  </div>

                  {/* Formal Card */}
                  <div className="p-8 rounded-2xl bg-blue-50 border border-blue-100">
                      <div className="flex items-center gap-3 mb-4">
                          <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                              <Code2 size={24} />
                          </div>
                          <h3 className="text-xl font-bold text-blue-900">形式化证明 (Formal)</h3>
                      </div>
                      <p className="text-slate-700 mb-4">
                          使用 Lean 4 等语言编写代码。每一行都必须通过编译器的严格逻辑检查。
                      </p>
                      <ul className="space-y-2 text-sm text-slate-600">
                          <li className="flex items-start gap-2"><Check size={16} className="text-green-500 mt-1"/> 100% 正确，无歧义</li>
                          <li className="flex items-start gap-2"><Check size={16} className="text-green-500 mt-1"/> 计算机可验证</li>
                          <li className="flex items-start gap-2"><X size={16} className="text-red-500 mt-1"/> 极难编写，细节繁琐</li>
                      </ul>
                  </div>
              </div>
          </div>
      </section>

      {/* --- Method Section --- */}
      <section id="method" className="py-20 bg-slate-50">
          <div className="max-w-6xl mx-auto px-6">
              <div className="mb-16">
                  <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm">Our Solution</span>
                  <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6 text-slate-900">递归子目标分解：分而治之</h2>
                  <p className="text-lg text-slate-600 max-w-3xl">
                      DeepSeek-Prover-V2 不强求一次性写出完整证明。它模仿人类数学家，采用<strong>“大模型拆解，小模型填空”</strong>的策略。
                  </p>
              </div>

              <div className="relative">
                  {/* Connecting Line (Desktop) */}
                  <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-indigo-100 -z-10 transform -translate-y-1/2"></div>

                  <div className="grid md:grid-cols-3 gap-8">
                      {/* Step 1 */}
                      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center relative z-10 hover:-translate-y-1 transition-transform duration-300">
                          <div className="w-16 h-16 mx-auto bg-indigo-600 text-white rounded-full flex items-center justify-center mb-4 shadow-lg shadow-indigo-200">
                              <span className="text-2xl font-bold">1</span>
                          </div>
                          <h3 className="text-lg font-bold mb-2 text-slate-900">DeepSeek-V3 规划</h3>
                          <p className="text-slate-500 text-sm">
                              <strong>"架构师"</strong><br/>
                              大模型分析题目，用自然语言写出证明草稿，并将草稿翻译成带有 <code>sorry</code>（占位符）的 Lean 代码骨架。
                          </p>
                      </div>

                      {/* Step 2 */}
                      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center relative z-10 hover:-translate-y-1 transition-transform duration-300">
                          <div className="w-16 h-16 mx-auto bg-purple-600 text-white rounded-full flex items-center justify-center mb-4 shadow-lg shadow-purple-200">
                              <span className="text-2xl font-bold">2</span>
                          </div>
                          <h3 className="text-lg font-bold mb-2 text-slate-900">7B 模型 递归求解</h3>
                          <p className="text-slate-500 text-sm">
                              <strong>"工匠"</strong><br/>
                              专门优化的小模型（7B）负责具体的“填坑”工作。它逐个证明被拆分出来的简单子目标（Subgoals）。
                          </p>
                      </div>

                      {/* Step 3 */}
                      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center relative z-10 hover:-translate-y-1 transition-transform duration-300">
                          <div className="w-16 h-16 mx-auto bg-emerald-600 text-white rounded-full flex items-center justify-center mb-4 shadow-lg shadow-emerald-200">
                              <span className="text-2xl font-bold">3</span>
                          </div>
                          <h3 className="text-lg font-bold mb-2 text-slate-900">合成完整证明</h3>
                          <p className="text-slate-500 text-sm">
                              <strong>"完工"</strong><br/>
                              将小模型生成的代码片段填回骨架，形成完整的、可通过编译器验证的形式化证明。
                          </p>
                      </div>
                  </div>
              </div>
              
              {/* Training Box */}
              <div className="mt-12 bg-indigo-900 rounded-2xl p-8 text-white">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Cpu className="text-indigo-300" size={24}/> 训练秘籍：冷启动 + 强化学习
                  </h3>
                  <div className="grid md:grid-cols-2 gap-8 text-indigo-100">
                      <div>
                          <h4 className="font-bold text-white mb-2">1. 合成冷启动数据</h4>
                          <p className="text-sm leading-relaxed opacity-90">
                              利用上述流水线，自动生成大量“自然语言思考 + 完整 Lean 代码”的高质量配对数据。这解决了形式化证明领域数据极度匮乏的问题。
                          </p>
                      </div>
                      <div>
                          <h4 className="font-bold text-white mb-2">2. GRPO 强化学习</h4>
                          <p className="text-sm leading-relaxed opacity-90">
                              使用 Group Relative Policy Optimization 算法。如果代码能通过编译并证明定理，给予奖励。同时引入<strong>一致性奖励</strong>，强迫模型严格按照思维链的计划行事，防止“想一套，写一套”。
                          </p>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* --- Example Section --- */}
      <section id="example" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                      <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Case Study</span>
                      <h2 className="text-3xl font-bold mt-4 mb-6 text-slate-900">从草稿到代码：数学归纳法实例</h2>
                      <p className="text-slate-600 mb-6 text-lg">
                          <MathText text="证明目标：对于任意整数 $n \ge 4$，都有 $n^2 \le n!$。" />
                      </p>
                      
                      <div className="space-y-6">
                          <div className="flex gap-4">
                              <div className="mt-1"><div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-sm">A</div></div>
                              <div>
                                  <h4 className="font-bold text-slate-900">自然语言草稿 (Sketch)</h4>
                                  <p className="text-sm text-slate-600 mt-1">
                                      "为了证明这一点，我们可以使用数学归纳法。<br/>
                                      1. 基础情况：验证 n=4。<br/>
                                      2. 归纳步骤：假设 k 成立，证明 k+1 也成立。"
                                  </p>
                              </div>
                          </div>

                          <div className="flex gap-4">
                              <div className="mt-1"><div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center font-bold text-sm">B</div></div>
                              <div>
                                  <h4 className="font-bold text-slate-900">Lean 4 骨架 (Structure)</h4>
                                  <p className="text-sm text-slate-600 mt-1">
                                      DeepSeek-V3 声明了 <code>base_case</code> 和 <code>inductive_step</code> 两个引理，但用 <code>sorry</code> 留空。
                                  </p>
                              </div>
                          </div>

                          <div className="flex gap-4">
                              <div className="mt-1"><div className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center font-bold text-sm">C</div></div>
                              <div>
                                  <h4 className="font-bold text-slate-900">完整代码 (Final Code)</h4>
                                  <p className="text-sm text-slate-600 mt-1">
                                      7B 模型填充了具体的战术代码（如 <code>simp</code>, <code>nlinarith</code>），最后组合完成。
                                  </p>
                              </div>
                          </div>
                      </div>
                  </div>

                  {/* Code Block */}
                  <div className="bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-700">
                      <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span className="ml-2 text-xs text-slate-400 font-mono">induction_proof.lean</span>
                      </div>
                      <div className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-slate-300">
                          <span className="text-purple-400">theorem</span> <span className="text-blue-400">induction_ineq</span> (n : ℕ) (h₀ : 4 ≤ n) : n^2 ≤ n! := <span className="text-purple-400">by</span><br/>
                          &nbsp;&nbsp;<span className="text-slate-500">-- 1. 基础情况 (由 7B 模型填充)</span><br/>
                          &nbsp;&nbsp;<span className="text-purple-400">have</span> base_case : 4^2 ≤ 4! := <span className="text-purple-400">by</span><br/>
                          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-400">simp</span> [Nat.factorial]<br/>
                          <br/>
                          &nbsp;&nbsp;<span className="text-slate-500">-- 2. 归纳步骤 (由 7B 模型填充)</span><br/>
                          &nbsp;&nbsp;<span className="text-purple-400">have</span> inductive_step : ∀ k ≥ 4, k^2 ≤ k! → (k+1)^2 ≤ (k+1)! := <span className="text-purple-400">by</span><br/>
                          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-400">intro</span> k h₁ h₂<br/>
                          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-400">simp_all</span> [Nat.factorial]<br/>
                          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-400">nlinarith</span> <span className="text-slate-500">-- 非线性算术求解</span><br/>
                          <br/>
                          &nbsp;&nbsp;<span className="text-slate-500">-- 3. 最终组合 (架构整合)</span><br/>
                          &nbsp;&nbsp;<span className="text-purple-400">have</span> final_proof : ∀ n ≥ 4, n^2 ≤ n! := <span className="text-purple-400">by</span><br/>
                          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-400">intro</span> n hn<br/>
                          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-400">induction'</span> hn <span className="text-purple-400">with</span> k hk<br/>
                          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">case</span> refl =&gt; <span className="text-yellow-400">exact</span> base_case<br/>
                          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">case</span> step =&gt;<br/>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-400">apply</span> inductive_step k hk<br/>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-400">exact</span> <span className="text-purple-400">by</span> assumption<br/>
                          <br/>
                          &nbsp;&nbsp;<span className="text-yellow-400">apply</span> final_proof<br/>
                          &nbsp;&nbsp;<span className="text-yellow-400">exact</span> h₀
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* --- Results Section --- */}
      <section id="results" className="py-20 bg-slate-50">
          <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-4 text-slate-900">SOTA：最先进的性能表现</h2>
                  <p className="text-slate-600">DeepSeek-Prover-V2 在多个数学证明基准测试中刷新了记录。</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
                      <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">MiniF2F-test</h3>
                      <div className="text-5xl font-bold text-indigo-600 mb-2">88.9%</div>
                      <div className="text-sm text-slate-600 bg-indigo-50 inline-block px-3 py-1 rounded-full">Pass@8192</div>
                      <p className="mt-4 text-slate-500 text-sm">高中奥数级别测试。刷新了开源模型的最高分记录。</p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
                      <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">PutnamBench</h3>
                      <div className="text-5xl font-bold text-purple-600 mb-2">47<span className="text-2xl text-slate-400">/658</span></div>
                      <div className="text-sm text-slate-600 bg-purple-50 inline-block px-3 py-1 rounded-full">Solved Problems</div>
                      <p className="mt-4 text-slate-500 text-sm">全美最难本科生数学竞赛。解决 47 题是该领域的重大突破。</p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
                      <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">ProverBench (AIME)</h3>
                      <div className="text-5xl font-bold text-emerald-600 mb-2">6<span className="text-2xl text-slate-400">/15</span></div>
                      <div className="text-sm text-slate-600 bg-emerald-50 inline-block px-3 py-1 rounded-full">Formal Proofs</div>
                      <p className="mt-4 text-slate-500 text-sm">2024-25 AIME 真题。接近非形式化模型 DeepSeek-V3 的水平 (8/15)。</p>
                  </div>
              </div>

              <div className="mt-12 bg-blue-50 border border-blue-100 rounded-xl p-6 flex items-start gap-4">
                  <Info className="text-blue-600 flex-shrink-0 mt-1" size={24}/>
                  <div>
                      <h4 className="font-bold text-blue-900">什么是 "SOTA" ?</h4>
                      <p className="text-blue-800 text-sm mt-1">
                          State-of-the-Art，指当前技术水平的最高点。该论文表明，在形式化数学证明领域，DeepSeek-Prover-V2 已经达到了目前全球领先的水平，正在缩小 AI 与人类顶级数学竞赛选手之间的差距。
                      </p>
                  </div>
              </div>
          </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-white border-t border-slate-200 py-12">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                  <div className="font-bold text-xl text-slate-900">DeepSeek-AI</div>
                  <p className="text-slate-500 text-sm mt-2">Advancing the frontier of AI reasoning.</p>
              </div>
              <div className="flex gap-6 text-slate-600 text-sm font-medium">
                  <a href="#" className="hover:text-indigo-600">Paper (ArXiv)</a>
                  <a href="#" className="hover:text-indigo-600">GitHub</a>
                  <a href="#" className="hover:text-indigo-600">HuggingFace</a>
              </div>
          </div>
      </footer>
    </div>
  );
};

export default DeepSeekProverV2;
