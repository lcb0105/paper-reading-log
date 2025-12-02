import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  Brain, 
  Shield, 
  Zap, 
  MessageSquare, 
  Target, 
  Award,
  ChevronRight,
  Menu,
  X,
  Code
} from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

const Llama2 = () => {
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 滚动监听，用于更新当前激活的章节导航
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'pretraining', 'finetuning', 'rlhf', 'safety', 'conclusion'];
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

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const NavButton = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => scrollToSection(id)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium
        ${activeSection === id 
          ? 'bg-blue-100 text-blue-700 shadow-sm' 
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
    >
      <Icon size={16} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* 1. 固定顶部导航栏 */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                <ArrowLeft size={20} />
              </Link>
              <h1 className="text-lg font-bold text-slate-800 hidden md:block">Llama 2: Open Foundation and Fine-Tuned Chat Models</h1>
              <h1 className="text-lg font-bold text-slate-800 md:hidden">Llama 2 Deep Dive</h1>
            </div>
            
            {/* 桌面端导航 */}
            <div className="hidden md:flex space-x-1">
              <NavButton id="intro" icon={BookOpen} label="引言" />
              <NavButton id="pretraining" icon={Brain} label="预训练" />
              <NavButton id="finetuning" icon={Zap} label="微调" />
              <NavButton id="rlhf" icon={Target} label="RLHF" />
              <NavButton id="safety" icon={Shield} label="安全性" />
            </div>

            {/* 移动端菜单按钮 */}
            <button 
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* 移动端下拉菜单 */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 py-2 shadow-lg">
            <div className="flex flex-col space-y-1">
              <NavButton id="intro" icon={BookOpen} label="引言" />
              <NavButton id="pretraining" icon={Brain} label="预训练" />
              <NavButton id="finetuning" icon={Zap} label="微调" />
              <NavButton id="rlhf" icon={Target} label="RLHF" />
              <NavButton id="safety" icon={Shield} label="安全性" />
            </div>
          </div>
        )}
      </nav>

      {/* 2. Header 区域 */}
      <header className="pt-24 pb-12 px-4 bg-gradient-to-b from-blue-50 to-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold tracking-wide">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
            <span>arXiv: 2307.09288v2</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Llama 2: 开源基础模型与对话模型的<span className="text-blue-600">进化之路</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Meta 发布的 Llama 2 系列模型（7B-70B）打破了开源与闭源的界限。
            本文详细披露了从预训练到 RLHF 微调的全过程，以及在安全性上的开创性工作。
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <div className="px-4 py-1.5 bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-600 shadow-sm">
              <span className="text-blue-600 font-bold">2T</span> Tokens
            </div>
            <div className="px-4 py-1.5 bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-600 shadow-sm">
              <span className="text-blue-600 font-bold">4096</span> Context
            </div>
            <div className="px-4 py-1.5 bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-600 shadow-sm">
              <span className="text-blue-600 font-bold">RLHF</span> Aligned
            </div>
          </div>
        </div>
      </header>

      {/* 3. Main 内容区域 */}
      <main className="max-w-4xl mx-auto px-4 py-12 space-y-16">
        
        {/* Section 1: Introduction */}
        <section id="intro" className="scroll-mt-24 space-y-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <BookOpen size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">1. 引言与核心贡献</h2>
          </div>
          <div className="prose prose-slate max-w-none text-slate-600 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-lg leading-relaxed mb-6">
              Llama 2 的发布旨在弥补开源模型与 ChatGPT 等闭源产品级模型在<strong>有用性（Helpfulness）</strong>和<strong>安全性（Safety）</strong>上的差距。
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-2 flex items-center">
                  <Brain size={18} className="mr-2 text-blue-500"/> Base Model
                </h3>
                <p className="text-sm">预训练基座模型，单纯的文本续写者。包含 7B, 13B, 70B 参数版本。</p>
              </div>
              <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                <h3 className="font-bold text-blue-900 mb-2 flex items-center">
                  <MessageSquare size={18} className="mr-2 text-blue-600"/> Llama 2-Chat
                </h3>
                <p className="text-sm text-blue-800">经过 SFT 和 RLHF 深度微调的对话模型，专门优化了指令遵循和对话能力。</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Pretraining */}
        <section id="pretraining" className="scroll-mt-24 space-y-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
              <Brain size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">2. 预训练 (Pretraining)</h2>
          </div>
          
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4">相比 Llama 1 的关键升级</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800">数据量增加 40%：</span>
                    <span className="text-slate-600">从 1.4T 增加到 <span className="font-mono font-bold text-purple-600">2.0 Trillion</span> Tokens。采用了数据上采样（Up-sampling）策略，增加 factual 来源的权重以减少幻觉。</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800">上下文长度翻倍：</span>
                    <span className="text-slate-600">从 2048 提升至 <span className="font-mono font-bold text-purple-600">4096</span>，提升了长文档处理和多轮对话记忆能力。</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800">GQA (Grouped-Query Attention)：</span>
                    <span className="text-slate-600">在 34B 和 70B 模型中引入，显著提升了推理速度（Inference Speed）并降低了显存占用。</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-slate-50 px-8 py-6">
              <p className="text-sm text-slate-500 font-mono">
                架构细节：Pre-normalization (RMSNorm), SwiGLU activation, Rotary Positional Embeddings (RoPE).
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Fine-tuning */}
        <section id="finetuning" className="scroll-mt-24 space-y-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
              <Zap size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">3. 微调 (Fine-tuning)</h2>
          </div>

          <div className="space-y-6">
            {/* SFT */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-3">SFT (有监督微调)</h3>
              <p className="text-slate-600 mb-4">
                {/* 修复了 ">>" 语法错误 */}
                Meta 的核心发现是：<strong>质量 &gt;&gt; 数量</strong>。他们放弃了数百万条低质量公开数据，转而使用了 <strong>27,540 条</strong> 高质量的人工标注数据。这足以教会模型对话的格式和风格。
              </p>
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-100 text-sm text-amber-900">
                💡 <strong>技术细节：</strong> 在计算 Loss 时，使用了 <code>User Prompt Masking</code>，即只计算模型回答部分的损失，不计算用户提问部分的损失。
              </div>
            </div>

            {/* GAtt */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Brain size={100} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Ghost Attention (GAtt)</h3>
              <p className="text-slate-600">
                为了解决多轮对话中模型"忘记人设"的问题，Meta 发明了 GAtt。这是一种数据增强技术，将 System Message（如"扮演拿破仑"）拼接到每一轮用户指令后进行训练，但在计算 Loss 时将其 Mask 掉。这让模型学会了在长对话中持续关注初始指令。
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: RLHF */}
        <section id="rlhf" className="scroll-mt-24 space-y-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
              <Target size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">4. RLHF (人类反馈强化学习)</h2>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">核心策略</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border border-slate-200 rounded-lg">
                  <div className="font-bold text-slate-800 mb-2">双奖励模型 (Two Reward Models)</div>
                  <p className="text-sm text-slate-600">
                    分别训练 <strong>Helpfulness RM</strong> 和 <strong>Safety RM</strong>，以解决有用性与安全性的冲突。
                  </p>
                </div>
                <div className="p-4 border border-slate-200 rounded-lg">
                  <div className="font-bold text-slate-800 mb-2">两种优化算法</div>
                  <p className="text-sm text-slate-600">
                    前期使用 <strong>Rejection Sampling</strong> (广度探索)，后期结合 <strong>PPO</strong> (深度优化)。
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900 border-l-4 border-emerald-500 pl-3">核心公式解析</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-700 mb-2">1. 带间隔的排序损失 (Margin Ranking Loss)</h4>
                  <p className="text-sm text-slate-500 mb-2">用于训练奖励模型。引入 Margin 项 <InlineMath math="m(r)" /> 来区分"显著更好"和"稍微好点"。</p>
                  <div className="bg-slate-100 p-4 rounded-lg overflow-x-auto border border-slate-200 text-slate-800">
                    <BlockMath math="\mathcal{L}_{ranking} = -\log(\sigma(r_{\theta}(x, y_c) - r_{\theta}(x, y_r) - m(r)))" />
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-700 mb-2">2. PPO 最终奖励函数</h4>
                  <p className="text-sm text-slate-500 mb-2">
                    在优化 Chat 模型时，不仅要最大化奖励 <InlineMath math="R_c" />，还要减去 KL 散度以防止模型偏离初始分布（Reward Hacking）。
                  </p>
                  <div className="bg-slate-100 p-4 rounded-lg overflow-x-auto border border-slate-200 text-slate-800">
                    <BlockMath math="R(g | p) = \tilde{R}_c(g | p) - \beta D_{KL}(\pi_{\theta}(g | p) \| \pi_0(g | p))" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Safety */}
        <section id="safety" className="scroll-mt-24 space-y-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-red-100 text-red-600 rounded-lg">
              <Shield size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">5. 安全性 (Safety)</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2">Pretraining 阶段</h3>
              <p className="text-sm text-slate-600">
                未进行过度的数据过滤（No aggressive filtering），以保留模型对仇恨言论的识别能力，并在后续微调中通过少量样本进行纠正。
              </p>
            </div>
            <div className="col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2">Safety Fine-Tuning</h3>
              <p className="text-sm text-slate-600">
                包含<strong>有监督安全微调</strong>、<strong>安全 RLHF</strong> 以及 <strong>Context Distillation</strong>（上下文蒸馏，将安全提示内化到模型中）。
              </p>
            </div>
            <div className="col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2">Red Teaming</h3>
              <p className="text-sm text-slate-600">
                组织了 350+ 名专家进行红队测试，覆盖网络安全、生物武器、法律等领域，通过对抗性攻击发现并修复漏洞。
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Conclusion */}
        <section id="conclusion" className="scroll-mt-24 pb-12">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg">
            <div className="flex items-center space-x-3 mb-4">
              <Award size={28} className="text-yellow-300" />
              <h2 className="text-2xl font-bold">总结与展望</h2>
            </div>
            <p className="text-blue-100 text-lg leading-relaxed mb-6">
              Llama 2 不仅是一个高性能的开源模型家族，更是一份关于"如何构建安全、有用的大模型"的详细技术报告。
              Meta 通过公开 SFT 数据策略、RLHF 细节和安全性方法，极大地推动了开源社区的发展。
              它证明了通过精细的数据工程和强化学习，开源模型可以在对话质量上追平闭源商业模型。
            </p>
            <div className="flex items-center space-x-2 text-sm text-blue-200 font-mono">
              <span>Next: Llama 3 & Future Architectures</span>
              <ChevronRight size={16} />
            </div>
          </div>
        </section>

      </main>

      {/* 4. Footer 区域 */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-2 mb-4 text-slate-100">
            <Brain size={20} />
            <span className="font-bold text-lg">Paper Deep Dive Series</span>
          </div>
          <p className="mb-4">Generated based on Meta AI's "Llama 2: Open Foundation and Fine-Tuned Chat Models"</p>
          <p className="text-sm text-slate-500">
            arXiv:2307.09288 • Learning Purpose Only
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Llama2;