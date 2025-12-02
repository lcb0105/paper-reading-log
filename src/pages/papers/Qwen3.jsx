import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Brain, Cpu, Layers, Zap, BarChart3 } from 'lucide-react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const Qwen3 = () => {
  const [activeSection, setActiveSection] = useState('intro');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'architecture', 'pretraining', 'posttraining', 'evaluation'];
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
    { id: 'intro', label: '简介' },
    { id: 'architecture', label: '架构与公式' },
    { id: 'pretraining', label: '预训练' },
    { id: 'posttraining', label: '后训练与思考模式' },
    { id: 'evaluation', label: '评估结果' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center text-gray-500 hover:text-indigo-600 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">返回首页</span>
          </Link>
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Qwen3 技术详解
          </span>
          <div className="hidden md:flex space-x-1 items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                  activeSection === item.id
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-28 pb-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
            Qwen3 系列大语言模型
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            融合思考模式与非思考模式的统一架构 | 从 0.6B 到 235B 参数规模 | 119 种语言支持
          </p>
          <div className="flex justify-center gap-2 flex-wrap">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">MoE 架构</span>
            <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">36T Tokens 预训练</span>
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">思考预算机制</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* 1. Introduction */}
        <section id="intro" className="mb-16 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-6">1. 简介</h2>
          <p className="mb-4 leading-relaxed">
            Qwen3 是 Qwen 模型家族的最新版本，旨在提升性能、效率和多语言能力。该系列包含 <strong>Dense（稠密）</strong> 和 <strong>MoE（混合专家）</strong> 两种架构，参数规模从 0.6B 到 235B 不等。
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg">
            <p className="font-bold text-blue-800">核心创新：统一的思考模式 (Unified Framework)</p>
            <p className="text-blue-700 mt-1">
              Qwen3 将"思考模式"（用于复杂多步推理）和"非思考模式"（用于快速响应）集成在同一个模型中，用户可以通过 <code className="bg-blue-100 px-1 rounded">thinking budget</code>（思考预算）动态控制推理深度，无需在不同模型之间切换。
            </p>
          </div>
          <p>
            旗舰模型 <strong>Qwen3-235B-A22B</strong> 是一个 MoE 模型，拥有 2350 亿总参数，但每次推理仅激活 220 亿参数，确保了高性能与推理效率的平衡。
          </p>
        </section>

        {/* 2. Architecture */}
        <section id="architecture" className="mb-16 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-6">2. 模型架构与数学公式</h2>
          <p className="mb-4">
            Qwen3 延续了 Qwen2.5 的设计理念，并引入了关键改进以增强稳定性。基础架构采用 Transformer 解码器架构。
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-4 text-gray-700">2.1 核心组件公式解析</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <Layers className="w-5 h-5 text-indigo-600" />
                <h4 className="font-bold text-lg">Attention 机制与 QK-Norm</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                为了确保大规模训练的稳定性，Qwen3 移除了 QKV-bias，并引入了 <strong>QK-Norm</strong>。在计算注意力得分之前，对 Query 和 Key 向量应用 RMSNorm。
              </p>
              <div className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
                <BlockMath math="Q' = \text{RMSNorm}(Q), \quad K' = \text{RMSNorm}(K)" />
                <BlockMath math="\text{Attention}(Q, K, V) = \text{Softmax}\left(\frac{Q' (K')^T}{\sqrt{d_k}}\right) V" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-indigo-600" />
                <h4 className="font-bold text-lg">SwiGLU 激活函数</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                前馈神经网络（FFN）采用 SwiGLU 变体，相比标准 ReLU 具有更好的性能。
              </p>
              <div className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
                <BlockMath math="\text{SwiGLU}(x) = \text{Swish}(xW_g) \otimes (xW_1)" />
                <BlockMath math="\text{FFN}(x) = \text{SwiGLU}(x) W_2" />
                <p className="text-xs text-gray-500 mt-2">其中 <InlineMath math="\otimes" /> 为逐元素乘法，Swish 为 <InlineMath math="\beta=1" /> 的 SiLU。</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <Cpu className="w-5 h-5 text-indigo-600" />
                <h4 className="font-bold text-lg">RoPE 旋转位置编码</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                使用旋转位置编码（RoPE）处理序列位置信息。
              </p>
              <div className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
                <BlockMath math="f_{q,k}(x_m, m) = R_{\Theta, m}^d x_m" />
                <p className="text-xs text-gray-500 mt-2">通过旋转矩阵 <InlineMath math="R" /> 将绝对位置 <InlineMath math="m" /> 注入到向量中，实现相对位置感知。</p>
              </div>
            </div>
          </div>

          {/* MoE Section */}
          <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-100 mb-8">
            <h4 className="font-bold text-xl mb-4 text-blue-800">MoE 路由与负载均衡详解</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-bold text-md text-gray-700 mb-2">1. 细粒度专家路由 (Routing)</h5>
                <p className="text-sm text-gray-600 mb-3">
                  Qwen3 沿用了 Qwen2.5-MoE 的细粒度专家分割。对于输入 Token <InlineMath math="x" />，路由器计算每个专家的概率得分，并选择 Top-K 个专家进行激活。
                </p>
                <div className="bg-white p-3 rounded border border-gray-200 text-sm overflow-x-auto">
                  <BlockMath math="s = x \cdot W_r" />
                  <BlockMath math="p = \text{Softmax}(s)" />
                  <BlockMath math="\mathcal{E} = \text{TopK}(p, k)" />
                  <BlockMath math="y = \sum_{i \in \mathcal{E}} p_i \cdot E_i(x)" />
                </div>
                <ul className="text-xs text-gray-500 mt-2 list-disc pl-4 space-y-1">
                  <li><InlineMath math="x" />: 输入的 hidden state 向量。</li>
                  <li><InlineMath math="W_r" />: 路由器的权重矩阵。</li>
                  <li><InlineMath math="\mathcal{E}" />: 被选中的 <InlineMath math="k" /> 个专家的索引集合 (Qwen3 中 <InlineMath math="k=8" />, 总专家 <InlineMath math="N=128" />)。</li>
                </ul>
              </div>

              <div>
                <h5 className="font-bold text-md text-gray-700 mb-2">2. 全局 Batch 负载均衡</h5>
                <p className="text-sm text-gray-600 mb-3">
                  为了防止"专家坍缩"（即少数专家处理大部分 Token），Qwen3 引入了辅助损失函数 <InlineMath math="\mathcal{L}_{aux}" />。
                </p>
                <div className="bg-white p-3 rounded border border-gray-200 text-sm overflow-x-auto">
                  <BlockMath math="\mathcal{L}_{aux} = \alpha \cdot N \cdot \sum_{i=1}^{N} f_i \cdot P_i" />
                </div>
                <ul className="text-xs text-gray-500 mt-2 list-disc pl-4 space-y-1">
                  <li><InlineMath math="N" />: 专家总数 (128)。</li>
                  <li><InlineMath math="f_i" />: 全局 Batch 中被分配给专家 <InlineMath math="i" /> 的实际比例。</li>
                  <li><InlineMath math="P_i" />: 全局 Batch 中专家 <InlineMath math="i" /> 的平均路由概率。</li>
                </ul>
              </div>
            </div>

            {/* f vs P comparison */}
            <div className="mt-6 bg-amber-50 p-5 rounded-lg border border-amber-200">
              <h5 className="font-bold text-md text-amber-800 mb-3">直观对比：<InlineMath math="f_i" /> 与 <InlineMath math="P_i" /> 的数值差异</h5>
              <p className="text-sm text-gray-600 mb-4">
                <span className="font-semibold">它们会不一样吗？</span> <span className="text-red-600 font-bold">一定会。</span>
                <br />根本原因在于：<strong><InlineMath math="P_i" /> 是软概率（Softmax，连续），而 <InlineMath math="f_i" /> 是硬选择（Top-K，离散）。</strong>
              </p>
              <div className="bg-white p-4 rounded border border-gray-200 text-sm">
                <p className="font-bold mb-2 text-gray-800">举例：假设只有1个 Token，3个专家，选择 Top-1。</p>
                <div className="grid grid-cols-3 gap-4 text-center text-xs">
                  <div className="border-r border-gray-200">
                    <p className="text-gray-500">路由器输出 (Logits)</p>
                    <p className="font-mono mt-1">专家 A: 0.40</p>
                    <p className="font-mono">专家 B: 0.35</p>
                    <p className="font-mono">专家 C: 0.25</p>
                  </div>
                  <div className="border-r border-gray-200">
                    <p className="text-blue-600 font-bold">预期负载 <InlineMath math="P" /></p>
                    <p className="font-mono mt-1 text-blue-600">P_A = 0.40</p>
                    <p className="font-mono text-blue-600">P_B = 0.35</p>
                    <p className="font-mono text-blue-600">P_C = 0.25</p>
                  </div>
                  <div>
                    <p className="text-green-600 font-bold">实际负载 <InlineMath math="f" /></p>
                    <p className="font-mono mt-1 text-green-600 font-bold">f_A = 1.0</p>
                    <p className="font-mono text-gray-400">f_B = 0.0</p>
                    <p className="font-mono text-gray-400">f_C = 0.0</p>
                  </div>
                </div>
                <p className="text-gray-600 text-xs mt-4 pt-3 border-t border-gray-100">
                  <strong>结论：</strong> 尽管 <InlineMath math="P_B" /> (0.35) 和 <InlineMath math="P_A" /> (0.40) 非常接近，但在硬选择机制下，<InlineMath math="f" /> 值出现了天壤之别。这就是为什么我们需要负载均衡损失函数来强迫分布对齐。
                </p>
              </div>
            </div>

            {/* Loss function analysis */}
            <div className="mt-6 bg-white p-5 rounded-lg border border-purple-100 shadow-sm">
              <h5 className="font-bold text-md text-purple-800 mb-3">辅助损失函数在不同情况下的数值表现</h5>
              <div className="overflow-x-auto">
                <table className="text-sm w-full text-center border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 border">场景</th>
                      <th className="p-2 border">分布特征</th>
                      <th className="p-2 border">损失值</th>
                      <th className="p-2 border">解释</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border font-bold text-green-600">完美均衡</td>
                      <td className="p-2 border text-xs"><InlineMath math="f_i \approx \frac{1}{N}, P_i \approx \frac{1}{N}" /></td>
                      <td className="p-2 border font-bold text-green-600"><InlineMath math="\alpha" /></td>
                      <td className="p-2 border text-xs">损失函数达到最小值</td>
                    </tr>
                    <tr>
                      <td className="p-2 border font-bold text-red-600">专家坍缩</td>
                      <td className="p-2 border text-xs"><InlineMath math="f_1=1, P_1=1" />，其余为 0</td>
                      <td className="p-2 border font-bold text-red-600"><InlineMath math="\alpha \cdot N" /></td>
                      <td className="p-2 border text-xs">损失是理想状态的 N 倍 (128 倍)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-4 text-gray-700">2.2 模型参数规格</h3>
          <div className="overflow-x-auto mb-4">
            <p className="mb-2 font-medium">表 1: Dense 模型规格</p>
            <table className="text-sm w-full border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-2 border text-left">模型</th>
                  <th className="p-2 border">层数</th>
                  <th className="p-2 border">注意力头 (Q/KV)</th>
                  <th className="p-2 border">Tie Embedding</th>
                  <th className="p-2 border">上下文长度</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="p-2 border">Qwen3-0.6B</td><td className="p-2 border text-center">28</td><td className="p-2 border text-center">16 / 8</td><td className="p-2 border text-center">是</td><td className="p-2 border text-center">32K</td></tr>
                <tr className="bg-gray-50"><td className="p-2 border">Qwen3-1.7B</td><td className="p-2 border text-center">28</td><td className="p-2 border text-center">16 / 8</td><td className="p-2 border text-center">是</td><td className="p-2 border text-center">32K</td></tr>
                <tr><td className="p-2 border">Qwen3-4B</td><td className="p-2 border text-center">36</td><td className="p-2 border text-center">32 / 8</td><td className="p-2 border text-center">是</td><td className="p-2 border text-center">128K</td></tr>
                <tr className="bg-gray-50"><td className="p-2 border">Qwen3-8B</td><td className="p-2 border text-center">36</td><td className="p-2 border text-center">32 / 8</td><td className="p-2 border text-center">否</td><td className="p-2 border text-center">128K</td></tr>
                <tr><td className="p-2 border">Qwen3-14B</td><td className="p-2 border text-center">40</td><td className="p-2 border text-center">40 / 8</td><td className="p-2 border text-center">否</td><td className="p-2 border text-center">128K</td></tr>
                <tr className="bg-gray-50"><td className="p-2 border font-bold">Qwen3-32B</td><td className="p-2 border text-center">64</td><td className="p-2 border text-center">64 / 8</td><td className="p-2 border text-center">否</td><td className="p-2 border text-center">128K</td></tr>
              </tbody>
            </table>
          </div>

          <div className="overflow-x-auto">
            <p className="mb-2 font-medium">表 2: MoE 模型规格</p>
            <table className="text-sm w-full border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-2 border text-left">模型</th>
                  <th className="p-2 border">层数</th>
                  <th className="p-2 border">总专家数 / 激活专家数</th>
                  <th className="p-2 border">总参数量 / 激活参数量</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="p-2 border">Qwen3-30B-A3B</td><td className="p-2 border text-center">48</td><td className="p-2 border text-center">128 / 8</td><td className="p-2 border text-center">30B / 3B</td></tr>
                <tr className="bg-gray-50"><td className="p-2 border font-bold">Qwen3-235B-A22B</td><td className="p-2 border text-center">94</td><td className="p-2 border text-center">128 / 8</td><td className="p-2 border text-center">235B / 22B</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. Pre-training */}
        <section id="pretraining" className="mb-16 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-6">3. 预训练 (Pre-training)</h2>
          <p className="mb-4">
            预训练使用了约 <strong>36 万亿 (36 Trillion)</strong> Token 的数据，覆盖 119 种语言。
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm relative">
              <div className="absolute top-0 right-0 bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-bl">Stage 1</div>
              <h3 className="font-bold text-lg mt-2">通用预训练</h3>
              <p className="text-sm mt-2 text-gray-600">
                训练约 30T Tokens，序列长度 4,096。侧重于语言能力和通用世界知识。
              </p>
            </div>
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm relative">
              <div className="absolute top-0 right-0 bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-bl">Stage 2</div>
              <h3 className="font-bold text-lg mt-2">推理增强</h3>
              <p className="text-sm mt-2 text-gray-600">
                增加 STEM、代码、逻辑推理和合成数据的比例。训练约 5T Tokens。加速学习率衰减。
              </p>
            </div>
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm relative">
              <div className="absolute top-0 right-0 bg-green-100 text-green-600 text-xs px-2 py-1 rounded-bl">Stage 3</div>
              <h3 className="font-bold text-lg mt-2">长上下文</h3>
              <p className="text-sm mt-2 text-gray-600">
                扩展序列长度至 32,768。使用 YARN 和 DCA 技术。将 RoPE 基频从 10,000 提升至 1,000,000。
              </p>
            </div>
          </div>
        </section>

        {/* 4. Post-training */}
        <section id="posttraining" className="mb-16 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-6">4. 后训练：思考模式融合</h2>
          <p className="mb-6">
            Qwen3 的后训练流程是其最大的亮点，通过四阶段训练实现了"思考"与"非思考"能力的融合，并利用强到弱蒸馏（Strong-to-Weak Distillation）提升小模型性能。
          </p>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div className="relative pl-12 mb-8">
              <div className="absolute left-0 top-1 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
              <h4 className="font-bold text-lg">Stage 1: Long-CoT 冷启动 (Cold Start)</h4>
              <p className="text-gray-600 text-sm mt-1">
                使用 QwQ-32B 生成长思维链数据，经过严格过滤（去除非推理、简单查询、错误答案），构建高质量的推理冷启动数据集。
              </p>
            </div>

            <div className="relative pl-12 mb-8">
              <div className="absolute left-0 top-1 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
              <h4 className="font-bold text-lg">Stage 2: 推理强化学习 (Reasoning RL)</h4>
              <p className="text-gray-600 text-sm mt-1">
                使用 GRPO (Group Relative Policy Optimization) 算法。通过大量的 Rollout 和 Verify 循环，提升模型在数学和代码任务上的推理能力。
              </p>
            </div>

            <div className="relative pl-12 mb-8">
              <div className="absolute left-0 top-1 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
              <h4 className="font-bold text-lg">Stage 3: 思考模式融合 (Thinking Mode Fusion)</h4>
              <p className="text-gray-600 text-sm mt-1">
                关键步骤。通过混合"思考数据"和"非思考数据"（指令遵循、多语言翻译、角色扮演）进行 SFT。
                引入 <code className="bg-gray-100 px-1 rounded">/think</code> 和 <code className="bg-gray-100 px-1 rounded">/no_think</code> 标记，训练模型根据用户指令动态切换模式。
              </p>
            </div>

            <div className="relative pl-12">
              <div className="absolute left-0 top-1 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
              <h4 className="font-bold text-lg">Stage 4: 通用强化学习 (General RL)</h4>
              <p className="text-gray-600 text-sm mt-1">
                针对指令遵循、格式遵循、人类偏好对齐、Agent 能力和特定场景（如 RAG）进行全面的 RLHF。使用了基于规则和基于模型的多种奖励函数。
              </p>
            </div>
          </div>

          {/* Distillation */}
          <div className="bg-gray-100 p-6 rounded-lg mt-8">
            <h3 className="font-bold text-xl mb-3">强到弱蒸馏 (Strong-to-Weak Distillation)</h3>
            <p className="text-sm mb-4">
              为了避免对每个小模型都进行昂贵的四阶段训练，Qwen3 采用了蒸馏策略。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded shadow-sm">
                <h5 className="font-semibold text-sm">Off-policy Distillation</h5>
                <p className="text-xs text-gray-500 mt-1">结合教师模型在 think 和 no_think 模式下的输出进行 SFT。</p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <h5 className="font-semibold text-sm">On-policy Distillation</h5>
                <p className="text-xs text-gray-500 mt-1">
                  学生模型生成序列，通过最小化 KL 散度向教师模型对齐 logits。
                </p>
                <div className="mt-2 overflow-x-auto">
                  <BlockMath math="\mathcal{L}_{\text{distill}} = D_{KL}(\pi_{\text{teacher}} || \pi_{\text{student}})" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Evaluation */}
        <section id="evaluation" className="mb-16 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-6">5. 性能评估</h2>
          <p className="mb-4">
            评估涵盖通用任务、数学/STEM、编程、多语言等领域。Qwen3 在思考模式和非思考模式下均表现出色。
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">旗舰模型对比 (Qwen3-235B vs SOTA)</h3>
          <div className="overflow-x-auto mb-6">
            <table className="text-sm w-full text-center border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-2 border text-left">Benchmark</th>
                  <th className="p-2 border">Qwen3-235B (Think)</th>
                  <th className="p-2 border">DeepSeek-R1</th>
                  <th className="p-2 border">OpenAI o1</th>
                  <th className="p-2 border">Qwen3-235B (Non-Think)</th>
                  <th className="p-2 border">GPT-4o</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="p-2 border text-left font-medium">MMLU-Redux</td><td className="p-2 border">92.7</td><td className="p-2 border">92.9</td><td className="p-2 border">92.8</td><td className="p-2 border">89.2</td><td className="p-2 border">87.0</td></tr>
                <tr className="bg-gray-50"><td className="p-2 border text-left font-medium">MATH-500</td><td className="p-2 border font-bold text-green-600">98.8</td><td className="p-2 border">97.3</td><td className="p-2 border">96.4</td><td className="p-2 border">91.2</td><td className="p-2 border">77.2</td></tr>
                <tr><td className="p-2 border text-left font-medium">AIME '24</td><td className="p-2 border font-bold text-green-600">92.0</td><td className="p-2 border">79.8</td><td className="p-2 border">74.3</td><td className="p-2 border">39.2</td><td className="p-2 border">11.1</td></tr>
                <tr className="bg-gray-50"><td className="p-2 border text-left font-medium">LiveCodeBench</td><td className="p-2 border font-bold text-green-600">70.7</td><td className="p-2 border">64.3</td><td className="p-2 border">63.9</td><td className="p-2 border">35.3</td><td className="p-2 border">32.7</td></tr>
                <tr><td className="p-2 border text-left font-medium">Arena-Hard</td><td className="p-2 border">95.6</td><td className="p-2 border">92.3</td><td className="p-2 border">92.1</td><td className="p-2 border font-bold text-blue-600">96.1</td><td className="p-2 border">85.3</td></tr>
              </tbody>
            </table>
            <p className="text-xs text-gray-500 mt-2">* Qwen3-235B (Think) 在数学和代码任务上超越了 DeepSeek-R1 和 OpenAI o1。</p>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-3">Qwen3-32B (Dense) 的越级表现</h3>
          <p className="mb-2 text-sm text-gray-600">Qwen3-32B 在思考模式下超越了之前的 QwQ-32B，并在多项基准上对标 OpenAI o3-mini。</p>
          <div className="bg-gray-50 p-4 rounded border border-gray-200">
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li><strong>MATH-500:</strong> Qwen3-32B (Think) 达到 <strong className="text-green-600">98.0</strong>，远超 QwQ-32B (90.0)。</li>
              <li><strong>AIME '24:</strong> 得分 <strong className="text-green-600">79.5</strong>，而 QwQ-32B 为 76.8。</li>
              <li><strong>LiveCodeBench:</strong> 达到 <strong className="text-green-600">66.4</strong>，接近 DeepSeek-R1 (64.3) 的水平。</li>
            </ul>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-6">6. 总结</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Qwen3 系列通过创新的<strong>"思考模式融合"</strong>和高效的<strong>"强到弱蒸馏"</strong>，成功在单一模型中集成了强大的推理能力和通用的指令遵循能力。其旗舰 MoE 模型在激活参数仅为 22B 的情况下，实现了与行业顶尖闭源模型（如 o1, GPT-4o）相媲美甚至超越的性能。此外，广泛的语言覆盖（119种）和灵活的 Dense/MoE 尺寸选择，使其成为当前最强大的开源模型家族之一。
          </p>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">基于 Qwen3 Technical Report (Yang et al., 2025) 整理制作。</p>
          <p className="text-gray-500 text-xs mt-2">© 2025 Qwen Team & Open Source Community</p>
        </div>
      </footer>
    </div>
  );
};

export default Qwen3;

