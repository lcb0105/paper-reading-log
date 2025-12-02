import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Cpu, 
  Zap, 
  BarChart2, 
  Layers, 
  Terminal, 
  ChevronRight, 
  Menu,
  Brain,
  Code,
  Globe,
  Award,
  Sigma,
  AlertTriangle,
  CheckCircle2,
  ArrowLeft,
  X
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
} from 'recharts';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- Benchmark Data ---
const reasoningData = [
  { name: 'AIME 2025 (Pass@1)', DeepSeekV3_2: 93.1, GPT5: 94.6, Gemini3: 95.0, fullMark: 100 },
  { name: 'HMMT Feb 2025', DeepSeekV3_2: 92.5, GPT5: 88.3, Gemini3: 97.5, fullMark: 100 },
  { name: 'GPQA Diamond', DeepSeekV3_2: 82.4, GPT5: 85.7, Gemini3: 91.9, fullMark: 100 },
  { name: 'LiveCodeBench', DeepSeekV3_2: 83.3, GPT5: 84.5, Gemini3: 90.7, fullMark: 100 },
];

const codingData = [
  { name: 'Codeforces Rating', DeepSeekV3_2: 2386, GPT5: 2537, Gemini3: 2708 },
];

const agentData = [
  { name: 'SWE Verified', DeepSeekV3_2: 73.1, GPT5: 74.9, Gemini3: 77.2 },
  { name: 'Terminal Bench', DeepSeekV3_2: 46.4, GPT5: 35.2, Gemini3: 42.8 },
  { name: 'Tool Decathlon', DeepSeekV3_2: 35.2, GPT5: 29.0, Gemini3: 36.4 },
];

// --- Components ---
// Section Container
const Section = ({ id, title, icon, children }) => (
  <section id={id} className="mb-12 scroll-mt-24">
    <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-2">
      <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
        {icon}
      </div>
      <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{title}</h2>
    </div>
    <div className="text-gray-700 leading-relaxed text-lg">
      {children}
    </div>
  </section>
);

// Formula Box Component
const FormulaBox = ({ title, latex, explanation, symbolMap, deepDive }) => (
  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6 shadow-sm hover:shadow-md transition-shadow">
    <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
      <span className="font-bold text-gray-700 text-sm flex items-center gap-2">
        <Sigma size={16} className="text-blue-500" />
        {title}
      </span>
    </div>
    <div className="p-5">
      <div className="mb-4 overflow-x-auto">
        <BlockMath math={latex} />
      </div>
      <div className="text-sm text-gray-600 bg-blue-50/50 p-3 rounded-lg border border-blue-50">
        <span className="font-semibold text-blue-800 block mb-1">物理含义：</span>
        {explanation}
      </div>
      
      {deepDive && (
        <div className="mt-4 bg-orange-50 p-3 rounded-lg border border-orange-100 text-sm">
           <span className="font-semibold text-orange-800 block mb-1 flex items-center gap-1">
             <Brain size={14} /> 深度解析：
           </span>
           {deepDive}
        </div>
      )}
      {symbolMap && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wide">参数详解</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {Object.entries(symbolMap).map(([symbol, desc]) => (
              <div key={symbol} className="flex items-start gap-3 bg-gray-50 p-2 rounded-lg">
                <span className="font-medium text-blue-600 shrink-0 bg-white px-2 py-0.5 rounded border border-blue-100">
                  <InlineMath math={symbol} />
                </span>
                <span className="text-gray-600">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

// Navigation Item
const NavItem = ({ active, onClick, label, icon }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      active 
        ? 'bg-blue-600 text-white shadow-md' 
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
    {active && <ChevronRight className="ml-auto w-4 h-4" />}
  </button>
);

// Main App Component
export default function DeepSeekV32() {
  const [activeSection, setActiveSection] = useState('abstract');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-800">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-sm z-50 px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-gray-500 hover:text-blue-600">
          <ArrowLeft size={20} />
        </Link>
        <span className="font-bold text-xl text-blue-900">DeepSeek-V3.2 解析</span>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-md hover:bg-gray-100">
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className={`fixed lg:sticky top-0 h-screen w-72 bg-white border-r border-gray-200 z-40 transform transition-transform duration-300 lg:translate-x-0 overflow-y-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-6 border-b border-gray-100">
            <Link to="/" className="flex items-center text-gray-500 hover:text-blue-600 transition-colors mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="text-sm">返回首页</span>
            </Link>
            <h1 className="text-2xl font-bold text-blue-900">DeepSeek-V3.2</h1>
            <p className="text-sm text-gray-500 mt-1">Pushing the Frontier</p>
          </div>
          <nav className="p-4 space-y-2">
            <NavItem active={activeSection === 'abstract'} onClick={() => scrollTo('abstract')} label="摘要与简介" icon={<BookOpen size={18} />} />
            <NavItem active={activeSection === 'architecture'} onClick={() => scrollTo('architecture')} label="DSA 架构详解" icon={<Cpu size={18} />} />
            <NavItem active={activeSection === 'rl'} onClick={() => scrollTo('rl')} label="RL 扩展框架" icon={<Zap size={18} />} />
            <NavItem active={activeSection === 'agent'} onClick={() => scrollTo('agent')} label="智能体与合成数据" icon={<Terminal size={18} />} />
            <NavItem active={activeSection === 'benchmarks'} onClick={() => scrollTo('benchmarks')} label="性能评估" icon={<BarChart2 size={18} />} />
          </nav>
          
          <div className="p-6 mt-auto">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <h4 className="font-bold text-blue-800 text-sm mb-2">Key Highlight</h4>
              <p className="text-xs text-blue-700">DeepSeek-V3.2-Speciale 在 IMO 2025 和 IOI 2025 中均获得金牌水平表现。</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-12 max-w-5xl mx-auto mt-12 lg:mt-0">
          
          {/* Header */}
          <header className="mb-16 text-center">
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
              Technical Report Breakdown
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              DeepSeek-V3.2: 推动开源大模型的边界
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              解析 DeepSeek 团队如何通过稀疏注意力机制 (DSA)、可扩展的强化学习框架 (Scalable RL) 以及大规模智能体任务合成流水线，实现与 GPT-5 和 Gemini-3.0-Pro 媲美的性能。
            </p>
          </header>

          {/* Abstract Section */}
          <Section id="abstract" title="核心突破" icon={<Layers />}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4"><Cpu /></div>
                <h3 className="font-bold text-lg mb-2">DeepSeek Sparse Attention (DSA)</h3>
                <p className="text-sm text-gray-600">引入高效注意力机制，大幅降低计算复杂度，同时在长上下文场景中保持模型性能。</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-lg flex items-center justify-center mb-4"><Zap /></div>
                <h3 className="font-bold text-lg mb-2">可扩展 RL 框架</h3>
                <p className="text-sm text-gray-600">通过稳健的强化学习协议和扩展后训练（Post-training）算力，实现推理能力的飞跃。</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mb-4"><Terminal /></div>
                <h3 className="font-bold text-lg mb-2">Agent 任务合成</h3>
                <p className="text-sm text-gray-600">通过系统化生成 1800+ 环境和 85k 复杂 Prompt，解决了开源模型在 Agent 场景下的短板。</p>
              </div>
            </div>
          </Section>

          {/* Architecture Section */}
          <Section id="architecture" title="DSA 架构详解" icon={<Cpu />}>
             {/* Image Diagram Area */}
            <div className="mb-8 border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
              <div className="w-full bg-gray-50 flex justify-center py-6 border-b border-gray-200">
                <img 
                  src={`${import.meta.env.BASE_URL}deepseek-sparse-attention.png`}
                  alt="DeepSeek-V3.2 DSA Architecture Diagram" 
                  className="max-w-full h-auto max-h-[500px] object-contain px-4"
                />
              </div>
              <div className="p-4 bg-gray-50 text-xs text-gray-500 text-center border-t border-gray-200">
                Figure 2: DSA 架构图。左侧为核心注意力路径（灰色），右侧为索引选择路径（绿色）。
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <FormulaBox 
                title="Eq 1: 索引分数 (Indexer Score)"
                latex={`I_{t,s}=\\sum_{j=1}^{H^{I}}w_{t,j}^{I}\\cdot \\text{ReLU}(q_{t,j}^{I}\\cdot k_{s}^{I})`}
                explanation={
                  <>
                    采用 <strong>ReLU</strong> 激活函数而非 Softmax，极大提高了计算吞吐量，并支持 FP8 低精度计算。
                  </>
                }
                symbolMap={{
                  "t": "当前 Query Token 的位置索引",
                  "s": "历史 Key Token 的位置索引",
                  "I_{t,s}": "Token t 对 Token s 的相关性索引分数",
                  "H^I": "索引器(Indexer)的注意力头数",
                  "q^I": "索引器 Query 向量 (从隐藏层 h_t 投影而来)",
                  "k^I": "索引器 Key 向量 (从隐藏层 h_s 投影而来)",
                  "w_{t,j}^I": "第 j 个头的聚合权重 (可学习参数)"
                }}
              />
              <FormulaBox 
                title="Eq 3: 索引器训练目标 (KL Loss)"
                latex={`\\mathcal{L}^{I}=\\sum_{t}\\mathbb{D}_{KL}(p_{t,S} || \\text{Softmax}(I_{t,S}))`}
                explanation={
                  <>
                    使用 Dense Attention（全注意力）作为 Teacher 来蒸馏训练 Indexer。
                    目标是让 Indexer 的分数分布 <InlineMath math="\\text{Softmax}(I_{t,S})" /> 尽可能接近主模型的注意力分布 <InlineMath math="p_{t,S}" />。
                  </>
                }
                symbolMap={{
                  "\\mathcal{L}^I": "索引器训练损失函数",
                  "\\mathbb{D}_{KL}": "KL 散度 (Kullback-Leibler Divergence)",
                  "p_{t,S}": "主模型 Dense Attention 的归一化注意力分布 (Teacher)",
                  "S": "参与计算的 Token 集合 (Warm-up 时为全集)",
                  "I_{t,S}": "索引器预测的分数分布 (Student)"
                }}
              />
            </div>
          </Section>

          {/* RL Framework Section */}
          <Section id="rl" title="可扩展 RL 框架 (GRPO)" icon={<Zap />}>
            <p className="mb-6">
              DeepSeek-V3.2 对 <strong>GRPO (Group Relative Policy Optimization)</strong> 进行了关键的稳定性改进。
            </p>
            <FormulaBox 
              title="Eq 5: GRPO 完整目标函数"
              latex={`\\mathcal{J}_{GRPO}(\\theta) = \\mathbb{E}_{q \\sim P(Q), \\{o_i\\} \\sim \\pi_{old}} \\left[ \\frac{1}{G} \\sum_{i=1}^G \\frac{1}{|o_i|} \\sum_{t=1}^{|o_i|} \\left( \\min(...) - \\beta \\mathbb{D}_{KL}(\\pi_\\theta || \\pi_{ref}) \\right) \\right]`}
              explanation={
                <>
                  GRPO 的核心是不需要独立的 Value Network (Critic)。
                  它通过对同一个 prompt <InlineMath math="q" /> 采样一组输出 <InlineMath math="\\{o_1, ..., o_G\\}" />，
                  并使用<strong>组内平均奖励</strong>作为 Baseline 来计算优势 <InlineMath math="\\hat{A}_{i,t}" />。
                </>
              }
              symbolMap={{
                "\\mathcal{J}_{GRPO}": "RL 优化目标函数",
                "\\theta": "当前策略模型的参数",
                "G": "组大小 (Group Size, 采样数)",
                "o_i": "第 i 个生成的输出序列",
                "|o_i|": "输出序列 o_i 的长度 (Token 数)",
                "\\hat{A}_{i,t}": "标准化后的优势 (Advantage) = (Reward - MeanReward) / StdDev",
                "\\beta": "KL 散度惩罚系数 (控制策略偏离程度)",
                "\\pi_{ref}": "参考策略 (通常是 SFT 模型)，防止模型遗忘通用能力"
              }}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <FormulaBox 
                title="Eq 6: 重要性采样比率"
                latex={`r_{i,t}(\\theta) = \\frac{\\pi_{\\theta}(o_{i,t}|q, o_{i,<t})}{\\pi_{old}(o_{i,t}|q, o_{i,<t})}`}
                explanation={
                  <>
                    PPO 算法的核心组件。衡量当前策略 <InlineMath math="\\pi_\\theta" /> 相对于采样策略 <InlineMath math="\\pi_{old}" /> 的变化幅度。
                    如果比率远离 1，说明策略更新步长过大，需要被 Clip。
                  </>
                }
                symbolMap={{
                   "r_{i,t}": "重要性采样比率 (Ratio)",
                   "\\pi_\\theta": "当前正在更新的策略",
                   "\\pi_{old}": "用于采样数据的旧策略",
                   "o_{i,<t}": "当前 Token 之前的上下文"
                }}
              />
              
              <FormulaBox 
                title="Eq 8 & 9: Off-Policy 掩码"
                latex={`M_{i,t} = \\mathbb{I}(\\neg (\\hat{A}_{i,t} < 0 \\land \\mathbb{D}_{KL} > \\delta))`}
                explanation={
                  <>
                    当样本表现不好（Advantage {"<"} 0）且策略差异过大（KL {">"} <InlineMath math="\\delta" />）时，
                    将掩码 <InlineMath math="M_{i,t}" /> 设为 0，即<strong>不对此样本进行梯度更新</strong>。
                    这防止了模型基于"过时且错误"的经验进行错误学习。
                  </>
                }
                symbolMap={{
                   "M_{i,t}": "二进制掩码 (0: 忽略, 1: 学习)",
                   "\\mathbb{I}": "指示函数 (条件满足为1，否则为0)",
                   "\\delta": "策略散度阈值 (Threshold)"
                }}
              />
            </div>

            <FormulaBox 
              title="Eq 7: 无偏 KL 估计器 (Unbiased KL Estimator)"
              latex={`\\mathbb{D}_{KL} \\approx \\frac{\\pi_{\\theta}}{\\pi_{old}} \\left( -\\log \\frac{\\pi_{ref}}{\\pi_{\\theta}} - 1 \\right) + 1`}
              explanation={
                <>
                   DeepSeek 修正了传统的 K3 估计器，利用<strong>重要性采样</strong>获得 KL 散度的无偏估计。
                   这对于保证 RL 训练在大规模算力下的稳定性至关重要。
                </>
              }
              deepDive={
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle size={16} className="text-red-500 mt-1 shrink-0"/>
                    <div>
                      <span className="font-bold text-gray-800">传统 K3 的问题：</span>
                      <span>
                        K3 估计器形式近似为 <InlineMath math="\\log \\frac{\\pi_\\theta}{\\pi_{ref}}" />。
                        当新策略概率 <InlineMath math="\\pi_\\theta \\to 0" /> 时，<InlineMath math="\\log \\pi_\\theta \\to -\\infty" />。
                        这意味着如果模型偶尔采样到一个在当前策略下极不可能的 Token，梯度会变得无限大（爆炸），导致训练崩溃。
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-green-600 mt-1 shrink-0"/>
                    <div>
                      <span className="font-bold text-gray-800">DeepSeek 的解决方案：</span>
                      <span>
                        引入重要性采样比率 <InlineMath math="\\frac{\\pi_\\theta}{\\pi_{old}}" /> 作为系数。
                        现在优化目标变成了类似 <InlineMath math="x \\log x" /> 的形式（其中 <InlineMath math="x = \\pi_\\theta" />）。
                        根据极限法则，当 <InlineMath math="x \\to 0" /> 时，<InlineMath math="x \\log x \\to 0" />。
                        <br/>
                        <strong>物理意义：</strong> 当某个 Token 在当前策略下概率极低时，系数 <InlineMath math="\\frac{\\pi_\\theta}{\\pi_{old}}" /> 会自动将梯度"拉回"零，而不是让 <InlineMath math="\\log" /> 项通过负无穷大去炸毁梯度。这极大地降低了方差。
                      </span>
                    </div>
                  </div>
                </div>
              }
              symbolMap={{
                "\\mathbb{D}_{KL}": "估计的 KL 散度值",
                "\\pi_\\theta": "当前策略在 Token t 的概率",
                "\\pi_{old}": "采样策略在 Token t 的概率",
                "\\pi_{ref}": "参考策略 (SFT) 在 Token t 的概率"
              }}
            />
          </Section>

          {/* Agentic Pipeline Section */}
          <Section id="agent" title="智能体与合成流水线" icon={<Terminal />}>
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Thinking in Tool-Use</h3>
              <p className="mb-4">
                DeepSeek-V3.2 创新性地将"思考"（Reasoning/CoT）引入到工具调用（Tool-use）场景中。
                不同于 DeepSeek-R1 在每轮对话丢弃思考内容，V3.2 采用了专门的 <strong>Thinking Context Management</strong>。
              </p>
              <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-lg">
                <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                  <Brain size={16}/> 上下文管理策略
                </h4>
                <ul className="list-disc list-inside text-indigo-800 text-sm space-y-1">
                  <li><strong>历史思考保留：</strong> 只有当新的<strong>用户消息</strong>出现时，才丢弃之前的思考内容。</li>
                  <li><strong>工具交互保留：</strong> 如果只是工具返回结果（Tool Output），则思考内容保留，模型继续基于上下文推理。</li>
                  <li><strong>工具历史持久化：</strong> 即使删除了思考痕迹，工具调用和结果的历史始终保留。</li>
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">大规模任务合成 (Synthesis)</h3>
              <p className="mb-4">
                为了解决 Agent 训练数据匮乏的问题，团队开发了自动化流水线，生成了 1,827 个环境和 85,000 个复杂 Prompt。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 p-4 rounded-lg bg-white">
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><Globe size={16}/> Search Agent</h4>
                  <p className="text-xs text-gray-500">
                    基于长尾实体构建 QA 对。包含问题构建 Agent、多模型回答生成 Agent 和 搜索验证 Agent。
                    确保答案的事实可靠性 (Factual Reliability)。
                  </p>
                </div>
                <div className="border border-gray-200 p-4 rounded-lg bg-white">
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><Code size={16}/> Code Agent</h4>
                  <p className="text-xs text-gray-500">
                    挖掘 GitHub 上的 Issue-PR 对。构建自动化环境搭建 Agent，确保 Issue 可复现。
                    通过 JUnit 测试用例验证修复结果（F2P/P2F 检测）。
                  </p>
                </div>
              </div>
            </div>
          </Section>

          {/* Benchmarks Section */}
          <Section id="benchmarks" title="性能评估" icon={<BarChart2 />}>
            <p className="mb-6">
               DeepSeek-V3.2 在多个推理和 Agent 基准测试中表现出色，尤其是高算力版本 <strong>DeepSeek-V3.2-Speciale</strong>，在数学竞赛中超越了 GPT-5。
            </p>
            <div className="space-y-12">
              {/* Reasoning Chart */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold mb-6 text-center text-gray-800">Reasoning Benchmarks (Pass@1)</h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={reasoningData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="name" tick={{fontSize: 12}} />
                      <YAxis domain={[0, 100]} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        cursor={{fill: '#f3f4f6'}}
                      />
                      <Legend />
                      <Bar dataKey="DeepSeekV3_2" fill="#3b82f6" name="DeepSeek-V3.2" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="GPT5" fill="#9ca3af" name="GPT-5-High" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Gemini3" fill="#cbd5e1" name="Gemini-3.0-Pro" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Coding Chart */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold mb-6 text-center text-gray-800">Coding Capabilities (Codeforces Rating)</h3>
                <div className="h-[200px] w-full">
                   <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={codingData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                      <XAxis type="number" domain={[0, 3000]} />
                      <YAxis dataKey="name" type="category" hide />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="DeepSeekV3_2" fill="#3b82f6" name="DeepSeek-V3.2" radius={[0, 4, 4, 0]} barSize={30} />
                      <Bar dataKey="GPT5" fill="#9ca3af" name="GPT-5-High" radius={[0, 4, 4, 0]} barSize={30} />
                      <Bar dataKey="Gemini3" fill="#cbd5e1" name="Gemini-3.0-Pro" radius={[0, 4, 4, 0]} barSize={30} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Agent Chart */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                   <h3 className="text-lg font-bold mb-4 text-center text-gray-800">Agent Benchmarks</h3>
                   <div className="h-[250px] w-full text-xs">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={agentData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="DeepSeekV3_2" fill="#3b82f6" name="DeepSeek-V3.2" />
                        <Bar dataKey="GPT5" fill="#9ca3af" name="GPT-5-High" />
                        <Bar dataKey="Gemini3" fill="#cbd5e1" name="Gemini-3.0-Pro" />
                      </BarChart>
                    </ResponsiveContainer>
                   </div>
                   <p className="text-xs text-gray-500 mt-4 text-center">
                     DeepSeek-V3.2 在 SWE Verified 上表现出惊人的竞争力，且在 Tool Decathlon 等长尾 Agent 任务上显著优于 GPT-5。
                   </p>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border border-orange-100 shadow-sm flex flex-col justify-center items-center text-center">
                   <div className="p-4 bg-yellow-100 rounded-full text-yellow-600 mb-4">
                     <Award size={32} />
                   </div>
                   <h3 className="text-xl font-bold text-gray-800 mb-2">竞赛金牌水平</h3>
                   <p className="text-gray-600 mb-4 text-sm">
                     DeepSeek-V3.2-Speciale 在高算力推理模式下：
                   </p>
                   <ul className="text-left space-y-2 text-sm font-medium text-gray-700 bg-white/50 p-4 rounded-lg w-full">
                     <li className="flex justify-between border-b border-gray-200 pb-1">
                       <span>IMO 2025 (数学)</span>
                       <span className="text-yellow-600 font-bold">Gold Medal</span>
                     </li>
                     <li className="flex justify-between border-b border-gray-200 pb-1">
                       <span>IOI 2025 (信息学)</span>
                       <span className="text-yellow-600 font-bold">Gold Medal</span>
                     </li>
                     <li className="flex justify-between">
                       <span>ICPC World Finals</span>
                       <span className="text-gray-600 font-bold">Rank 2 (Speciale)</span>
                     </li>
                   </ul>
                </div>
              </div>
            </div>
          </Section>

          {/* Conclusion */}
          <footer className="mt-16 pt-8 border-t border-gray-200">
             <h3 className="text-2xl font-bold text-gray-900 mb-4">结论与展望</h3>
             <div className="bg-gray-100 p-6 rounded-xl text-gray-700 space-y-4">
               <p>
                 DeepSeek-V3.2 成功证明了开源模型可以通过架构创新 (DSA) 和激进的后训练算力扩展 (Scalable RL)，在复杂的推理和 Agent 任务上追平甚至超越最强的闭源模型。
               </p>
               <p>
                 <strong>局限性：</strong> 尽管推理能力强大，但在世界知识的广度上仍落后于万亿参数的闭源模型（由于预训练 FLOPs 较少）。Token 效率在 Speciale 模式下较低（需要更长的 CoT）。
               </p>
               <p>
                 <strong>未来工作：</strong> 进一步扩大预训练规模以补充知识短板；优化推理链的"智能密度"以提高 Token 效率。
               </p>
             </div>
             <div className="mt-8 text-center text-gray-400 text-sm">
               Based on DeepSeek-AI Research Paper • Visualization by DeepSeek Explainer
             </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

