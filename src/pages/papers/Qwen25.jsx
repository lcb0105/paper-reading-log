import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const Qwen25 = () => {
  const [activeSection, setActiveSection] = useState('abstract');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['abstract', 'models', 'architecture', 'pretraining', 'posttraining', 'evaluation'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'abstract', label: '摘要与简介' },
    { id: 'models', label: '模型系列规格' },
    { id: 'architecture', label: '核心架构 & Tokenizer' },
    { id: 'pretraining', label: '预训练 (Pre-training)' },
    { id: 'posttraining', label: '后训练 (Post-training)' },
    { id: 'evaluation', label: '评估结果' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col fixed h-full z-10">
          <div className="p-6 border-b border-gray-100">
            <Link to="/" className="flex items-center text-gray-500 hover:text-indigo-600 transition-colors mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span>返回首页</span>
            </Link>
            <h1 className="text-2xl font-bold text-indigo-600">Qwen2.5</h1>
            <p className="text-xs text-gray-500 mt-1">Technical Report Analysis</p>
          </div>
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-4 py-2 text-sm font-medium rounded-l transition-colors ${
                  activeSection === item.id
                    ? 'bg-indigo-50 text-indigo-600 border-r-2 border-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="p-4 border-t border-gray-100">
            <p className="text-xs text-gray-400">Based on 2025 Technical Report</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-64 min-h-screen">
          <div className="max-w-4xl mx-auto px-8 py-12">
            
            {/* Header */}
            <header className="mb-12 text-center">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Qwen2.5 技术报告深度解读</h1>
              <p className="text-lg text-gray-600">更强的预训练数据、更大规模的SFT与先进的RL策略</p>
              <div className="mt-4 flex justify-center gap-2 flex-wrap">
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">18T Tokens</span>
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">128K Context</span>
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-purple-100 text-purple-800">GRPO</span>
              </div>
            </header>

            {/* Section: Abstract */}
            <section id="abstract" className="mb-16 scroll-mt-8">
              <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-6">1. 摘要与核心亮点</h2>
              <p className="mb-4 text-gray-700 leading-relaxed">
                Qwen2.5 是 Qwen 系列的最新迭代，旨在满足多样化的需求。相比前代，它在预训练和后训练阶段都有显著提升。最核心的升级在于将预训练数据集从 7 万亿 (7T) token 扩展到了 <strong>18 万亿 (18T) token</strong>，为常识、专家知识和推理能力奠定了坚实基础。
              </p>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 my-6">
                <h3 className="text-lg font-semibold mb-3">关键特性概览：</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li><strong>规模更优 (Better in Size)：</strong> 覆盖 0.5B 到 72B 参数，新增 3B, 14B, 32B 等高性价比尺寸。</li>
                  <li><strong>数据更优 (Better in Data)：</strong> 预训练数据量增至 18T tokens，包含更多知识、代码和数学内容。</li>
                  <li><strong>使用更优 (Better in Use)：</strong> 支持结构化数据输出，工具调用能力增强，生成长度扩展至 8K，Context 支持高达 1M (Turbo版)。</li>
                </ul>
              </div>
            </section>

            {/* Section: Models */}
            <section id="models" className="mb-16 scroll-mt-8">
              <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-6">2. 模型系列规格</h2>
              <p className="mb-4">Qwen2.5 提供了丰富的 Dense（稠密）模型和 MoE（混合专家）模型选择。</p>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-4 text-left font-semibold text-gray-600">模型</th>
                      <th className="py-3 px-4 text-left font-semibold text-gray-600">层数</th>
                      <th className="py-3 px-4 text-left font-semibold text-gray-600">注意力头 (Q/KV)</th>
                      <th className="py-3 px-4 text-left font-semibold text-gray-600">上下文/生成长度</th>
                      <th className="py-3 px-4 text-left font-semibold text-gray-600">协议</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 px-4">0.5B / 1.5B</td>
                      <td className="py-3 px-4">24 / 28</td>
                      <td className="py-3 px-4">14/2 & 12/2</td>
                      <td className="py-3 px-4">32K / 8K</td>
                      <td className="py-3 px-4 text-green-600">Apache 2.0</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">3B</td>
                      <td className="py-3 px-4">36</td>
                      <td className="py-3 px-4">16/2</td>
                      <td className="py-3 px-4">32K / 8K</td>
                      <td className="py-3 px-4 text-blue-600">Qwen Research</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">7B / 14B / 32B</td>
                      <td className="py-3 px-4">28 / 48 / 64</td>
                      <td className="py-3 px-4">Varied</td>
                      <td className="py-3 px-4">128K / 8K</td>
                      <td className="py-3 px-4 text-green-600">Apache 2.0</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="py-3 px-4 font-bold">72B</td>
                      <td className="py-3 px-4">80</td>
                      <td className="py-3 px-4">64/8</td>
                      <td className="py-3 px-4">128K / 8K</td>
                      <td className="py-3 px-4 text-blue-600">Qwen License</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-500 mt-2">* 注：Qwen2.5-Turbo 支持高达 1M tokens 上下文。</p>
            </section>

            {/* Section: Architecture */}
            <section id="architecture" className="mb-16 scroll-mt-8">
              <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-6">3. 核心架构与 Tokenizer</h2>
              
              <h3 className="text-xl font-semibold mt-6 mb-4">基础架构</h3>
              <p className="mb-4">采用基于 Transformer 的 Decoder-only 架构。关键组件包括：</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                <li><strong>GQA (Grouped Query Attention):</strong> 优化推理时的 KV Cache 效率。</li>
                <li><strong>SwiGLU Activation:</strong> 增强非线性表达能力。</li>
                <li><strong>RoPE (Rotary Positional Embeddings):</strong> 更好的位置编码。</li>
                <li><strong>QKV Bias & RMSNorm:</strong> 提升训练稳定性（Pre-normalization）。</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-4">Tokenizer</h3>
              <p className="mb-4">
                沿用 Qwen 系列的 Tokenizer，基于字节级 BPE (BBPE)。
              </p>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2">
                <p><strong>词表大小：</strong> <InlineMath math="151,643" /> 个 token。</p>
                <p><strong>控制 Token：</strong> 扩展至 22 个（此前为 3 个），新增工具调用专用 token，增强了 Agent 能力。</p>
              </div>
            </section>

            {/* Section: Pre-training */}
            <section id="pretraining" className="mb-16 scroll-mt-8">
              <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-6">4. 预训练 (Pre-training)</h2>
              
              <h3 className="text-xl font-semibold mt-4 mb-4">数据升级</h3>
              <p className="mb-4">
                数据量从 Qwen2 的 7T 增加到 Qwen2.5 的 <strong>18T tokens</strong>。
                包含来自 Qwen2.5-Math 和 Qwen2.5-Coder 的高质量合成数据。
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-4">数据过滤逻辑 (重点公式)</h3>
              <p className="mb-2">为了防止测试集泄露 (Test Data Leakage)，采用了基于 N-gram 的严格过滤机制。如果训练数据中的序列 <InlineMath math="s_t" /> 与测试集中的序列 <InlineMath math="s_e" /> 存在重叠，且满足以下两个条件，该训练数据将被剔除：</p>
              
              <div className="bg-slate-50 p-4 rounded-lg my-4 overflow-x-auto">
                <BlockMath math="|LCS(s_t, s_e)| \ge 13" />
                <p className="text-center text-gray-500 my-2">且</p>
                <BlockMath math="|LCS(s_t, s_e)| \ge 0.6 \times \min(|s_t|, |s_e|)" />
              </div>
              
              <div className="bg-blue-50 border border-blue-200 p-5 rounded-lg mt-4">
                <h4 className="font-bold text-blue-800 mb-3">公式含义详解：</h4>
                <ul className="space-y-3 text-sm text-blue-900">
                  <li>
                    <strong><InlineMath math="s_t" /> 和 <InlineMath math="s_e" />：</strong> 分别代表 <span className="font-bold">训练序列 (Training sequence)</span> 和 <span className="font-bold">评估/测试序列 (Evaluation sequence)</span>。
                  </li>
                  <li>
                    <strong><InlineMath math="LCS(s_t, s_e)" />：</strong> 代表两个序列之间的 <span className="font-bold">最长公共子序列 (Longest Common Subsequence)</span>。用来衡量两段文本的相似程度。
                  </li>
                  <li>
                    <strong>条件一：<InlineMath math="|LCS(s_t, s_e)| \ge 13" /></strong>
                    <br />
                    <span className="text-gray-600">这是一个绝对阈值。重叠的内容必须至少有 13 个 token 的长度。这过滤掉了偶然的短语重叠。</span>
                  </li>
                  <li>
                    <strong>条件二：<InlineMath math="|LCS(s_t, s_e)| \ge 0.6 \times \min(|s_t|, |s_e|)" /></strong>
                    <br />
                    <span className="text-gray-600">这是一个相对比例阈值。重叠的部分必须占较短序列长度的 <strong>60%</strong> 以上。防止在极长的训练文档中因为包含了一句简短的测试问题而被错误剔除。</span>
                  </li>
                  <li className="font-semibold text-red-600 mt-2">
                    结论：只有当上述两个条件同时满足时，该训练样本才会被判定为"已泄露"并被删除。
                  </li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold mt-8 mb-4">长文本训练策略</h3>
              <p className="mb-4">
                <strong>双阶段训练：</strong>
              </p>
              <ol className="list-decimal pl-6 space-y-1 text-gray-700 mb-4">
                <li>初始阶段：上下文长度 4,096 tokens。</li>
                <li>扩展阶段：上下文长度增加至 32,768 tokens。</li>
              </ol>
              <p className="mb-4">
                <strong>RoPE 频率调整：</strong> 使用 ABF (Attention Base Frequency) 技术，将 RoPE 的 Base Frequency 从 <InlineMath math="10,000" /> 提升至 <InlineMath math="1,000,000" /> (对于 Qwen2.5-Turbo 甚至更高)。
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-4">长文本推理外推技术详解</h3>
              <p className="mb-4 text-gray-700">为了在推理时增强模型处理超长序列的能力（实现高达 4 倍的长度外推，使得 Turbo 模型可处理 1M tokens），Qwen2.5 结合了以下两项关键技术：</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {/* YARN Card */}
                <div className="bg-white p-5 rounded-lg border border-purple-200 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-purple-700 text-lg mb-2">
                    1. YaRN (Yet Another RoPE extensioN)
                  </h4>
                  <p className="text-sm text-gray-600 mb-3 italic">解决 RoPE 的位置外推问题，缓解注意力熵。</p>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                    <li><strong>核心问题：</strong> 传统的 RoPE 模型在处理超过训练长度的序列时，注意力分布会变得"平坦"或混乱。</li>
                    <li><strong>非均匀插值：</strong> YaRN 根据维度的频率（波长）进行区分，不对所有维度均匀地进行线性插值。</li>
                    <li><strong>高频保护：</strong> 对应<span className="font-semibold text-purple-800">局部信息</span>的高频维度不进行插值。</li>
                    <li><strong>低频插值：</strong> 对应<span className="font-semibold text-purple-800">全局长距离信息</span>的低频维度进行插值。</li>
                    <li><strong>效果：</strong> 有效修正了注意力分布的"温度"，用极少的微调数据即可实现稳定的长度扩展。</li>
                  </ul>
                </div>

                {/* DCA Card */}
                <div className="bg-white p-5 rounded-lg border border-indigo-200 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-indigo-700 text-lg mb-2">
                    2. DCA (Dual Chunk Attention)
                  </h4>
                  <p className="text-sm text-gray-600 mb-3 italic">分治策略处理超长序列，优化相对位置计算。</p>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                    <li><strong>核心问题：</strong> 超长序列带来的 <InlineMath math="O(N^2)" /> 计算复杂度和相对位置编码失效。</li>
                    <li><strong>分块机制：</strong> 将长序列切分为多个较小的 Chunks。</li>
                    <li><strong>块内注意力：</strong> 块内部使用标准注意力，捕捉细腻的局部依赖。</li>
                    <li><strong>块间注意力：</strong> 处理跨块的长距离依赖。DCA 巧妙地调整跨块的相对位置编码（Re-indexing）。</li>
                    <li><strong>优势：</strong> 无需重新进行大规模训练即可支持 100k+ token，且兼容 Flash Attention 加速。</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section: Post-training */}
            <section id="posttraining" className="mb-16 scroll-mt-8">
              <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-6">5. 后训练 (Post-training)</h2>
              <p className="mb-4">后训练阶段包括监督微调 (SFT) 和两阶段强化学习 (RL)。</p>

              <h3 className="text-xl font-semibold text-indigo-700 mt-6 mb-4">5.1 监督微调 (SFT)</h3>
              <p className="mb-2">数据量超过 <strong>100 万 (1M+)</strong> 条高质量样本。重点增强领域：</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-white p-3 rounded border border-gray-200">
                  <strong>长序列生成：</strong> 输出长度扩展至 8K。
                </div>
                <div className="bg-white p-3 rounded border border-gray-200">
                  <strong>数学能力：</strong> 引入 Qwen2.5-Math 的思维链 (CoT) 数据。
                </div>
                <div className="bg-white p-3 rounded border border-gray-200">
                  <strong>代码能力：</strong> 多语言 Agent 协作生成的代码指令，覆盖 40+ 编程语言。
                </div>
                <div className="bg-white p-3 rounded border border-gray-200">
                  <strong>结构化理解：</strong> 增强对表格、JSON 等结构化数据的处理和推理。
                </div>
              </div>
              <div className="mt-4 p-4 bg-gray-100 rounded text-sm text-gray-600">
                <strong>训练参数：</strong> 2个 Epoch，学习率从 <InlineMath math="7 \times 10^{-6}" /> 衰减至 <InlineMath math="7 \times 10^{-7}" />，Weight Decay 为 0.1。
              </div>

              <h3 className="text-xl font-semibold text-indigo-700 mt-8 mb-4">5.2 强化学习 (RL)</h3>
              <p className="mb-4">采用了 Offline 和 Online 结合的两阶段 RL 策略。</p>
              
              <div className="space-y-6">
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-gray-800 mb-2">阶段一：Offline RL (DPO)</h4>
                  <p className="text-gray-700">
                    针对那些拥有标准答案但难以用 Reward Model 评分的任务（如数学、代码、逻辑推理）。
                    <br />
                    利用 SFT 模型重采样，通过<strong>执行反馈 (Execution Feedback)</strong> 和答案匹配筛选正负样本对，进行 <strong>DPO (Direct Preference Optimization)</strong> 训练。
                  </p>
                </div>
                
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-gray-800 mb-2">阶段二：Online RL (GRPO)</h4>
                  <p className="text-gray-700">
                    针对人类偏好对齐（真实性、有用性、安全性等）。
                    <br />
                    使用 <strong>GRPO (Group Relative Policy Optimization)</strong> 算法。
                  </p>
                  <div className="mt-3 p-3 bg-gray-50 rounded">
                    <p className="text-sm text-gray-600">
                      <strong>Reward Model 标准：</strong> 真实性 (Truthfulness)、有用性 (Helpfulness)、简洁性 (Conciseness)、相关性 (Relevance)、无害性 (Harmlessness)、去偏见 (Debiasing)。
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section: Evaluation */}
            <section id="evaluation" className="mb-16 scroll-mt-8">
              <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-6">6. 评估结果</h2>
              
              <h3 className="text-xl font-semibold mb-4">Base Model 表现</h3>
              <p className="mb-4">Qwen2.5-72B 在多项基准测试中表现优异，甚至能够媲美 Llama-3-405B（参数量为其 5 倍）。</p>
              
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full text-sm text-center bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                    <tr>
                      <th className="py-2 px-4 text-left">Benchmark</th>
                      <th className="py-2 px-4">Qwen2.5-72B</th>
                      <th className="py-2 px-4">Llama-3-405B</th>
                      <th className="py-2 px-4">Qwen2-72B</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr><td className="py-2 px-4 text-left font-medium">MMLU (General)</td><td>86.1</td><td>85.2</td><td>84.2</td></tr>
                    <tr><td className="py-2 px-4 text-left font-medium">GSM8K (Math)</td><td>91.5</td><td>89.0</td><td>89.0</td></tr>
                    <tr><td className="py-2 px-4 text-left font-medium">HumanEval (Code)</td><td>59.1</td><td>61.0</td><td>64.6</td></tr>
                    <tr><td className="py-2 px-4 text-left font-medium">MATH</td><td className="font-bold text-indigo-600">62.1</td><td>53.8</td><td>50.9</td></tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-semibold mt-8 mb-4">Instruct Model 表现</h3>
              <p className="mb-4">Qwen2.5-72B-Instruct 在对齐任务和复杂指令遵循上表现突出。</p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-6">
                <li><strong>MATH:</strong> 83.1 (大幅超越 Llama-3.1-405B 的 69.0)</li>
                <li><strong>Arena-Hard:</strong> 81.2 (大幅超越前代的 69.3)</li>
                <li><strong>LiveCodeBench:</strong> 55.5 (优于 Llama-3.1-405B 的 41.6)</li>
              </ul>

              <h3 className="text-xl font-semibold mt-8 mb-4">长文本能力 (Long Context)</h3>
              <p className="mb-2">在 <strong>RULER</strong> 和 <strong>LV-Eval</strong> 基准测试中，结合了 DCA 和 YARN 的 Qwen2.5 模型在 128K 长度下保持了极高的性能。</p>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 mt-2">
                <p className="text-green-800">
                  <strong>Passkey Retrieval:</strong> Qwen2.5-Turbo 在 <strong>1M tokens</strong> 的长度下实现了 100% 的大海捞针准确率。
                </p>
              </div>
            </section>

            {/* Footer */}
            <footer className="mt-20 pt-10 border-t border-gray-200 text-center text-gray-500 text-sm pb-10">
              <p>基于 Qwen2.5 Technical Report (2025) 制作</p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Qwen25;


