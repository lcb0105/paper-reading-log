import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  Brain, 
  Target, 
  Scale, 
  BarChart, 
  MessageSquare, 
  GitBranch,
  CheckCircle,
  AlertTriangle,
  Rocket,
  Shield,
  Zap,
  HelpCircle
} from 'lucide-react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const InstructGPTPaper = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* 1. 固定顶部导航栏 */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50 h-16">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">返回首页</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-500">
            <span className="bg-slate-100 px-2 py-1 rounded">arXiv:2203.02155</span>
            <span className="px-2">InstructGPT</span>
          </div>

          <div className="flex gap-2">
            {[
              { id: 'abstract', label: '摘要' },
              { id: 'intro', label: '背景' },
              { id: 'method', label: 'RLHF' },
              { id: 'results', label: '结果' },
              { id: 'discussion', label: '讨论' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* 2. Header 区域 */}
      <header className="pt-32 pb-20 bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 text-indigo-300 mb-6">
              <BookOpen size={20} />
              <span className="font-mono text-sm tracking-wider">论文深度解析</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
              Training language models to follow instructions with human feedback
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-6">
              通过人类反馈训练语言模型以遵循指令 (InstructGPT)
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8 text-slate-300 text-sm">
              <span className="flex items-center gap-2">
                📅 2022 年
              </span>
              <span className="flex items-center gap-2">
                👥 OpenAI (Ouyang et al.)
              </span>
              <span className="bg-indigo-500/20 px-3 py-1 rounded-full border border-indigo-500/30 text-indigo-300">
                RLHF
              </span>
              <span className="bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30 text-blue-300">
                PPO
              </span>
              <span className="bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30 text-emerald-300">
                Alignment
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Main 内容区域 */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* 核心摘要 */}
          <section id="abstract" className="scroll-mt-24 bg-white rounded-xl shadow-sm border-l-4 border-yellow-400 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">核心摘要</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              单纯增加语言模型（LM）的参数量并不能让它们更好地遵循用户意图。大型模型常常会生成不真实、有毒或毫无帮助的内容。这篇论文提出了 <strong className="text-slate-900">InstructGPT</strong>，通过<strong className="text-slate-900">人类反馈强化学习 (RLHF)</strong> 技术将模型与用户意图对齐。
            </p>
            
            <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2 font-bold text-yellow-800 mb-2">
                <Rocket size={18} />
                关键结论
              </div>
              <p className="text-yellow-800 leading-relaxed">
                在人类评估中，<strong>13亿参数</strong>的 InstructGPT 模型优于 <strong>1750亿参数</strong>的 GPT-3 模型。这证明了 RLHF 在提升模型对齐能力方面的巨大潜力——不仅参数量重要，训练方法同样关键。
              </p>
            </div>
          </section>

          {/* Section 1: Introduction */}
          <section id="intro" className="scroll-mt-24 bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                <Target size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">核心问题与背景</h2>
            </div>
            
            <div className="text-slate-600 leading-relaxed">
              <p className="mb-6">
                大型语言模型 (LLM) 经常生成不真实、有毒或对用户无帮助的内容。这是因为语言模型的训练目标（预测下一个 token）与用户意图（安全、有帮助地遵循指令）是<strong className="text-slate-900">未对齐 (Misaligned)</strong> 的。
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <AlertTriangle size={18} className="text-amber-500" />
                    未对齐的表现
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>编造事实 (Hallucinations)</li>
                    <li>生成偏见或有毒内容</li>
                    <li>无法理解复杂指令</li>
                  </ul>
                </div>
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <CheckCircle size={18} className="text-emerald-500" />
                    对齐的目标 (3H)
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li><strong>Helpful</strong>: 帮助用户解决问题</li>
                    <li><strong>Honest</strong>: 不编造信息</li>
                    <li><strong>Harmless</strong>: 不造成伤害</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Methodology */}
          <section id="method" className="scroll-mt-24 bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                <GitBranch size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">方法论：RLHF 的三个步骤</h2>
            </div>

            <p className="text-slate-600 mb-8">
              论文采用了经典的三个阶段来微调 GPT-3，使其演变为 InstructGPT。
            </p>

            <div className="space-y-10">
              {/* Step 1 */}
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm mr-3">1</span>
                  有监督微调 (Supervised Fine-Tuning, SFT)
                </h3>
                <div className="space-y-4 text-slate-600">
                  <p>
                    <strong className="text-slate-800">数据来源：</strong> 收集用户提交给 OpenAI API 的 Prompt（指令），并由人类标注员撰写高质量的理想回复（Demonstrations）。
                  </p>
                  <p>
                    <strong className="text-slate-800">过程：</strong> 使用这些 <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-medium">{'{Prompt, Demo}'}</span> 数据对预训练的 GPT-3 进行标准的有监督学习微调。
                  </p>
                  <p className="text-sm text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200">
                    ❌ <strong>局限性：</strong> 数据收集成本高，难以覆盖所有情况，且并未直接优化人类的偏好排序。
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm mr-3">2</span>
                  训练奖励模型 (Reward Model, RM)
                </h3>
                <div className="space-y-4 text-slate-600">
                  <p>
                    <strong className="text-slate-800">数据来源：</strong> 收集一组 Prompt，让模型生成多个不同的回复（outputs）。人类标注员对这些回复进行<strong className="text-slate-800">排名</strong>（Ranking），而不是直接写答案。
                  </p>
                  <p>
                    <strong className="text-slate-800">过程：</strong> 训练一个奖励模型（从 SFT 模型初始化，去掉最后的 unembedding 层），输入是 Prompt 和回复，输出是一个标量奖励值（Scalar Reward）。
                  </p>
                  
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm mt-4">
                    <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 text-sm font-bold text-slate-700">
                      📐 RM 损失函数详解
                    </div>
                    <p className="px-4 pt-4 text-sm text-slate-600">
                      RM 的目标是最大化人类喜欢的回复与不喜欢的回复之间的分差。论文使用成对比较（Pairwise Comparison）的损失函数：
                    </p>
                    <div className="p-4 overflow-x-auto border-l-4 border-blue-500 bg-slate-50 mx-4 my-4 rounded-r-lg">
                      <BlockMath math="\text{loss}(\theta) = -\frac{1}{\binom{K}{2}} E_{(x,y_w,y_l)\sim D}[\log(\sigma(r_\theta(x,y_w) - r_\theta(x,y_l)))]" />
                    </div>
                    <div className="px-4 pb-4">
                      <ul className="list-disc list-inside text-sm text-slate-600 space-y-1 bg-slate-50 p-4 rounded-lg">
                        <li><InlineMath math="r_\theta(x,y)" />: 奖励模型对提示 <InlineMath math="x" /> 和回复 <InlineMath math="y" /> 的打分</li>
                        <li><InlineMath math="y_w" />: 在成对比较中，人类<strong>更喜欢 (won)</strong> 的回复</li>
                        <li><InlineMath math="y_l" />: 在成对比较中，人类<strong>较不喜欢 (lost)</strong> 的回复</li>
                        <li><InlineMath math="K" />: 每个 Prompt 对应生成的回复数量（标注员对 K 个回复进行排序，生成 <InlineMath math="\binom{K}{2}" /> 对比较）</li>
                        <li><InlineMath math="\sigma" />: Sigmoid 函数，将分差映射到 (0,1) 概率区间</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="border-l-4 border-emerald-500 pl-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm mr-3">3</span>
                  强化学习微调 (Reinforcement Learning, PPO)
                </h3>
                <div className="space-y-4 text-slate-600">
                  <p>
                    <strong className="text-slate-800">数据来源：</strong> 大量的 Prompts（不需要人工标签）。
                  </p>
                  <p>
                    <strong className="text-slate-800">过程：</strong> 使用 <strong className="text-slate-800">PPO (Proximal Policy Optimization)</strong> 算法微调 SFT 模型。RM 作为环境给予奖励，模型作为 Agent 优化策略以最大化奖励。
                  </p>

                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm mt-4">
                    <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 text-sm font-bold text-slate-700">
                      📐 PPO 目标函数详解 (含 PPO-ptx)
                    </div>
                    <p className="px-4 pt-4 text-sm text-slate-600">
                      为了防止模型为了"讨好"奖励模型而遗忘原始的语言能力（即 Alignment Tax），论文在目标函数中加入了两项约束：KL 散度惩罚和预训练数据混合。
                    </p>
                    <div className="p-4 overflow-x-auto border-l-4 border-blue-500 bg-slate-50 mx-4 my-4 rounded-r-lg">
                      <BlockMath math="\text{objective}(\phi) = E_{(x,y)\sim D_{\pi^{RL}_{\phi}}} \left[ r_\theta(x,y) - \beta \log \left( \frac{\pi^{RL}_{\phi}(y|x)}{\pi^{SFT}(y|x)} \right) \right] + \gamma E_{x\sim D_{pretrain}} [\log(\pi^{RL}_{\phi}(x))]" />
                    </div>
                    <div className="px-4 pb-4 space-y-3">
                      <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                        <h4 className="font-bold text-indigo-900 text-sm mb-2">第一部分：RL 奖励与 KL 惩罚</h4>
                        <ul className="list-disc list-inside text-sm text-indigo-800 space-y-1">
                          <li><InlineMath math="r_\theta(x,y)" />: 奖励模型给出的分数</li>
                          <li><InlineMath math="\beta \log (\dots)" />: <strong>KL 散度惩罚项</strong>。计算当前 RL 策略 <InlineMath math="\pi^{RL}_{\phi}" /> 与原始 SFT 策略 <InlineMath math="\pi^{SFT}" /> 之间的距离。防止模型在优化奖励时偏离初始模型太远，避免 Reward Hacking。</li>
                        </ul>
                      </div>
                      <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                        <h4 className="font-bold text-emerald-900 text-sm mb-2">第二部分：预训练混合 (PPO-ptx)</h4>
                        <p className="text-sm text-emerald-800">
                          <InlineMath math="\gamma E_{x\sim D_{pretrain}} [\dots]" />: 在原始预训练数据集上的对数似然。这一项确保模型在微调过程中不会丧失通用的语言生成能力（如阅读理解、摘要等），解决了<strong>"对齐税 (Alignment Tax)"</strong>问题。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Results */}
          <section id="results" className="scroll-mt-24 bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                <BarChart size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">实验结果与分析</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                <div className="flex items-center gap-2 font-bold text-blue-900 mb-3">
                  <Scale size={20} />
                  偏好评估
                </div>
                <p className="text-sm text-blue-800 leading-relaxed">
                  在人类评估中，1.3B 参数的 InstructGPT 输出质量被认为优于 175B 的 GPT-3。175B 的 InstructGPT 则以压倒性优势（<strong>85% 的胜率</strong>）击败了 GPT-3。这表明 RLHF 能够极大地提升模型的主观可用性。
                </p>
              </div>

              <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-100">
                <div className="flex items-center gap-2 font-bold text-emerald-900 mb-3">
                  <CheckCircle size={20} />
                  真实性 (Truthfulness)
                </div>
                <p className="text-sm text-emerald-800 leading-relaxed">
                  在 TruthfulQA 基准测试中，InstructGPT 生成真实且丰富信息的频率约为 GPT-3 的<strong>两倍</strong>。在封闭域任务中，"幻觉"（编造事实）率从 <strong>41% 降至 21%</strong>。
                </p>
              </div>

              <div className="bg-rose-50 p-5 rounded-xl border border-rose-100">
                <div className="flex items-center gap-2 font-bold text-rose-900 mb-3">
                  <Shield size={20} />
                  毒性 (Toxicity)
                </div>
                <p className="text-sm text-rose-800 leading-relaxed">
                  当收到"由尊重的语气"指令时，InstructGPT 的毒性输出比 GPT-3 减少了约 <strong>25%</strong>。但在未提示的情况下，两者表现相近。注意：模型并未显著减少偏见 (Bias)。
                </p>
              </div>

              <div className="bg-purple-50 p-5 rounded-xl border border-purple-100">
                <div className="flex items-center gap-2 font-bold text-purple-900 mb-3">
                  <Zap size={20} />
                  对齐税 (Alignment Tax)
                </div>
                <p className="text-sm text-purple-800 leading-relaxed">
                  直接进行 RLHF 可能会导致模型在公共 NLP 任务（如 SQuAD,翻译）上的性能下降。通过加入 <strong>PPO-ptx</strong>（预训练数据混合），论文成功地在保持对齐效果的同时，减轻了这种性能衰退。
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Discussion */}
          <section id="discussion" className="scroll-mt-24 bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                <HelpCircle size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">讨论与局限性</h2>
            </div>

            <ul className="space-y-4 text-slate-600">
              <li className="flex gap-3">
                <span className="text-amber-500 mt-1">•</span>
                <div>
                  <strong className="text-slate-800">对齐的目标是谁？</strong>
                  <p className="mt-1">目前的对齐是基于标注员群体的偏好，这些标注员主要是受过训练的英语使用者。这可能无法代表更广泛的全球用户群体。</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-500 mt-1">•</span>
                <div>
                  <strong className="text-slate-800">简单的错误仍然存在</strong>
                  <p className="mt-1">即使是 InstructGPT 仍可能犯简单的逻辑错误，或者在指令的前提错误时被误导（盲从）。</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-500 mt-1">•</span>
                <div>
                  <strong className="text-slate-800">安全性</strong>
                  <p className="mt-1">虽然毒性降低了，但模型并未完全免疫恶意使用。</p>
                </div>
              </li>
            </ul>
          </section>

        </div>
      </main>

      {/* 4. Footer 区域 */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2 font-medium text-slate-300">
            Training language models to follow instructions with human feedback
          </p>
          <p className="text-sm mb-4 text-slate-500">
            Based on the paper by OpenAI (2022)
          </p>
          <a 
            href="https://arxiv.org/abs/2203.02155" 
            target="_blank" 
            rel="noreferrer" 
            className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            View on arXiv →
          </a>
        </div>
      </footer>
    </div>
  );
};

export default InstructGPTPaper;
