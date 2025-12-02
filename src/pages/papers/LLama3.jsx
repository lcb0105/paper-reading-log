import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  Database, 
  Code, 
  Shield, 
  Zap, 
  Image as ImageIcon, 
  ChevronRight, 
  Menu, 
  X,
  Target,
  Layers,
  Scale,
  Brain
} from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

const Llama3 = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sections = [
    { id: 'intro', title: '引言与概览', icon: BookOpen },
    { id: 'pre-training', title: '预训练工程', icon: Database },
    { id: 'post-training', title: '后训练策略', icon: Code },
    { id: 'safety', title: '安全体系', icon: Shield },
    { id: 'inference', title: '推理优化', icon: Zap },
    { id: 'multimodal', title: '多模态扩展', icon: ImageIcon },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // 考虑到顶部固定导航栏的高度偏移
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(id);
      setIsMobileMenuOpen(false);
    }
  };

  // 监听滚动以更新当前激活的章节
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section.id);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* 1. 顶部固定导航栏 */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50 px-4 md:px-8 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <Link to="/" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600 hover:text-blue-600">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-lg font-bold text-slate-800 hidden md:block">The Llama 3 Herd of Models</h1>
          <span className="text-sm px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-mono hidden md:block">arXiv:2407.21783</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1 bg-slate-100/50 p-1 rounded-full border border-slate-200/50">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 flex items-center gap-1.5
                ${activeSection === section.id 
                  ? 'bg-white text-blue-600 shadow-sm ring-1 ring-slate-200' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'}`}
            >
              <section.icon size={14} />
              {section.title}
            </button>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="fixed top-16 left-0 right-0 bg-white border-b border-slate-200 z-40 p-4 md:hidden shadow-lg animate-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`p-3 text-sm font-medium rounded-lg flex items-center gap-2 border transition-colors
                  ${activeSection === section.id 
                    ? 'bg-blue-50 border-blue-200 text-blue-700' 
                    : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'}`}
              >
                <section.icon size={16} />
                {section.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 2. Header 区域 */}
      <header className="pt-24 pb-12 md:pt-32 md:pb-16 px-4 md:px-8 bg-gradient-to-b from-blue-50/50 to-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-6">
            <Brain size={14} />
            Foundation Model
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
            The Llama 3 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Herd of Models</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Meta 最新发布的开源基础模型系列。通过 15.6T 高质量 Token 训练，405B 旗舰版本采用标准稠密架构，在多语言、代码、推理及工具使用上对标 GPT-4。
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-500">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
              <Scale size={16} className="text-blue-500" />
              <span>405B 稠密参数</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
              <Database size={16} className="text-emerald-500" />
              <span>15.6T 训练数据</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
              <Layers size={16} className="text-purple-500" />
              <span>128K 上下文窗口</span>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Main 内容区域 */}
      <main className="max-w-4xl mx-auto px-4 md:px-8 pb-24 space-y-16">
        
        {/* Intro */}
        <section id="intro" className="scroll-mt-24">
          <SectionTitle icon={BookOpen} title="1. 引言与核心哲学" color="blue" />
          <div className="prose prose-slate max-w-none prose-lg">
            <p className="text-slate-600 mb-6">
              Llama 3 项目的核心理念是"简单性"与"大力出奇迹"。Meta 并没有选择混合专家 (MoE) 架构，而是坚持使用标准的<strong>稠密 Transformer (Dense Transformer)</strong>，通过极致的数据工程和规模化训练来突破性能极限。
            </p>
            <div className="grid md:grid-cols-3 gap-6 not-prose">
              <FeatureCard 
                title="数据 (Data)" 
                desc="15.6T Token，相比 Llama 2 提升 8 倍。更严格的数据清洗与去重。"
                borderColor="border-emerald-200"
                bgColor="bg-emerald-50"
              />
              <FeatureCard 
                title="规模 (Scale)" 
                desc="405B 参数量，训练消耗 3.8×10²⁵ FLOPs，利用 Scaling Laws 达到最优。"
                borderColor="border-blue-200"
                bgColor="bg-blue-50"
              />
              <FeatureCard 
                title="复杂性 (Complexity)" 
                desc="坚持简单架构以保证训练稳定性。SFT+DPO 的标准后训练流程。"
                borderColor="border-purple-200"
                bgColor="bg-purple-50"
              />
            </div>
          </div>
        </section>

        {/* Pre-training */}
        <section id="pre-training" className="scroll-mt-24">
          <SectionTitle icon={Database} title="2. 预训练工程 (Pre-training)" color="emerald" />
          <div className="space-y-8">
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Target size={20} className="text-emerald-600" />
                数据清洗流水线
              </h3>
              <ul className="space-y-3 text-slate-700">
                <ListItem>
                  <strong>HTML 解析器</strong>：自研解析器，<span className="text-red-500 font-semibold">删除所有 Markdown</span> 标记，保留数学公式和代码结构。
                </ListItem>
                <ListItem>
                  <strong>激进的行级去重</strong>：如果一行文字在整个数据集中出现超过 6 次，直接删除。这有效去除了导航栏和 Cookie 警告。
                </ListItem>
                <ListItem>
                  <strong>模型级质量过滤</strong>：使用基于 Llama 2 训练的分类器 (DistilRoberta) 来识别和保留高质量文本。
                </ListItem>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4">缩放定律 (Scaling Laws)</h3>
              <p className="text-slate-600 mb-4">
                Meta 拟合了幂律公式来预测给定算力预算 <InlineMath math="C" /> 下的最优训练 Token 数 <InlineMath math="N^*(C)" />：
              </p>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex justify-center mb-4">
                <BlockMath math="N^*(C) = A \cdot C^\alpha, \quad \alpha \approx 0.53" />
              </div>
              <p className="text-sm text-slate-500">
                这意味着对于给定的算力预算，增加数据量的收益略高于增加模型参数量。此外，Meta 在预训练的最后阶段进行了<strong>退火 (Annealing)</strong>：将学习率线性衰减至 0，并上采样高质量数据（代码、数学），使 8B 模型在 GSM8k 上提升了 24%。
              </p>
            </div>
          </div>
        </section>

        {/* Post-training */}
        <section id="post-training" className="scroll-mt-24">
          <SectionTitle icon={Code} title="3. 后训练策略 (Post-training)" color="purple" />
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-purple-50/50 p-6 rounded-xl border border-purple-100">
              <h4 className="font-bold text-purple-900 mb-2">拒绝采样 (Rejection Sampling)</h4>
              <p className="text-slate-700 text-sm leading-relaxed">
                对于同一个提示词，让模型生成 <InlineMath math="K" /> 个回答（如 <InlineMath math="K=30" />），利用奖励模型选出得分最高的一个作为 SFT 的训练数据。这实际上是让模型向“最好的自己”学习，实现自我进化。
              </p>
            </div>
            <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
              <h4 className="font-bold text-blue-900 mb-2">DPO 细节优化</h4>
              <p className="text-slate-700 text-sm leading-relaxed">
                在直接偏好优化 (DPO) 过程中，Meta 特意屏蔽了格式 Token（如 Header、Termination token）的损失计算。如果不这样做，模型可能会产生不稳定的格式输出或尾部重复。
              </p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-4">专项能力构建：代码与长文本</h4>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 text-slate-600 font-mono text-sm">Code</div>
                <div>
                  <h5 className="font-semibold text-slate-800">执行反馈 (Execution Feedback)</h5>
                  <p className="text-slate-600 text-sm mt-1">
                    模型生成的代码不仅要是文本，还必须能通过解释器运行和单元测试。只有能跑通的代码才会被纳入训练集。
                  </p>
                </div>
              </div>
              <div className="h-px bg-slate-100 w-full" />
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 text-slate-600 font-mono text-sm">Long</div>
                <div>
                  <h5 className="font-semibold text-slate-800">0.1% 的长文本魔法</h5>
                  <p className="text-slate-600 text-sm mt-1">
                    仅需在 SFT 数据集中混入 <strong>0.1%</strong> 的长文本合成数据，即可激活模型处理 128K 上下文的能力，且不影响短文本性能。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Safety */}
        <section id="safety" className="scroll-mt-24">
          <SectionTitle icon={Shield} title="4. 安全体系 (Safety)" color="red" />
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <p className="text-slate-700 mb-6">
              Meta 采取了纵深防御策略，从预训练数据过滤到系统级防御 (Llama Guard 3)。安全微调的核心在于平衡两个指标：
            </p>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 p-4 bg-white rounded-lg border border-red-100 shadow-sm">
                <div className="text-xs text-red-500 font-bold uppercase tracking-wider mb-1">指标 1</div>
                <div className="font-bold text-slate-800">违规率 (Violation Rate)</div>
                <div className="text-sm text-slate-500 mt-1">模型回答了不该回答的问题 (越低越好)</div>
              </div>
              <div className="flex-1 p-4 bg-white rounded-lg border border-red-100 shadow-sm">
                <div className="text-xs text-red-500 font-bold uppercase tracking-wider mb-1">指标 2</div>
                <div className="font-bold text-slate-800">错误拒绝率 (False Refusal Rate)</div>
                <div className="text-sm text-slate-500 mt-1">模型拒绝了本来无害的问题 (越低越好)</div>
              </div>
            </div>
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-900">
              <strong>💡 解决方案：边界数据 (Borderline Data)</strong><br/>
              训练模型识别“擦边球”提示词（如“如何杀死Linux进程” vs “如何杀人”）。这教会了模型辨别用户的真实意图，而不仅仅是关键词匹配。
            </div>
          </div>
        </section>

        {/* Inference */}
        <section id="inference" className="scroll-mt-24">
          <SectionTitle icon={Zap} title="5. 推理优化 (Inference)" color="yellow" />
          <p className="text-slate-600 mb-6">
            为了让 405B 这样的庞然大物在有限的硬件上高效运行，Meta 实施了 FP8 量化和流水线并行优化。
          </p>
          <div className="overflow-hidden bg-white shadow-sm rounded-xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">FP8 量化挑战</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">解决方案</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">首尾层敏感</td>
                  <td className="px-6 py-4 text-sm text-slate-600"><strong>不量化</strong>第一层和最后一层 Transformer，保持高精度。</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">激活值离群点 (Outliers)</td>
                  <td className="px-6 py-4 text-sm text-slate-600">设置动态缩放因子的上限 (Upper Bound = 1200)，防止数值溢出。</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">张量级精度不足</td>
                  <td className="px-6 py-4 text-sm text-slate-600">使用<strong>行级 (Row-wise)</strong> 量化而非张量级 (Tensor-wise) 量化。</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Multimodal */}
        <section id="multimodal" className="scroll-mt-24">
          <SectionTitle icon={ImageIcon} title="6. 视觉与多模态 (Multimodal)" color="indigo" />
          <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-xl p-8">
            <p className="text-slate-700 mb-6">
              Llama 3 并没有从零开始训练多模态，而是采用了<strong>组合式方法 (Compositional Approach)</strong>。通过“适配器 (Adapter)”将预训练好的图像/语音编码器“外挂”到语言模型上。
            </p>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1 space-y-4">
                <h4 className="font-bold text-indigo-900 flex items-center gap-2">
                  <ImageIcon size={18} /> 视觉架构
                </h4>
                <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
                  <li><strong>Image Encoder</strong>: 预训练的 ViT-H/14 (630M 参数)。</li>
                  <li><strong>Cross-Attention</strong>: 插入在语言模型的每 4 层之间，让文本层“看到”图像信息。</li>
                  <li><strong>视频支持</strong>: 引入时间聚合器 (Temporal Aggregator) 将视频帧压缩。</li>
                </ul>
              </div>
              <div className="hidden md:block w-px bg-indigo-100 self-stretch" />
              <div className="flex-1 space-y-4">
                <h4 className="font-bold text-indigo-900 flex items-center gap-2">
                  <span className="font-mono text-xs border border-indigo-300 rounded px-1">AUDIO</span> 语音架构
                </h4>
                <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
                  <li><strong>Encoder</strong>: Conformer 模型 (1B 参数)。</li>
                  <li><strong>Adapter</strong>: 卷积层 + Transformer，将语音特征映射为 Token。</li>
                  <li><strong>流式能力</strong>: 支持流式语音识别和翻译，无需微调 LLM 本体。</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* 4. Footer 区域 */}
      <footer className="bg-white border-t border-slate-200 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center text-slate-500">
          <p className="mb-4 font-medium text-slate-900">Llama 3 Technical Report Deep Dive</p>
          <div className="flex justify-center gap-4 text-sm mb-8">
            <a href="#" className="hover:text-blue-600 transition-colors">Original Paper</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600 transition-colors">Meta AI</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600 transition-colors">GitHub</a>
          </div>
          <p className="text-xs text-slate-400">
            Generated based on Meta Llama 3 Technical Report (arXiv:2407.21783)
          </p>
        </div>
      </footer>
    </div>
  );
};

// 辅助组件：章节标题
const SectionTitle = ({ icon: Icon, title, color = "blue" }) => {
  const colorMap = {
    blue: "text-blue-600 bg-blue-100",
    emerald: "text-emerald-600 bg-emerald-100",
    purple: "text-purple-600 bg-purple-100",
    red: "text-red-600 bg-red-100",
    yellow: "text-amber-600 bg-amber-100",
    indigo: "text-indigo-600 bg-indigo-100",
  };

  return (
    <div className="flex items-center gap-4 mb-8 pb-4 border-b border-slate-200">
      <div className={`p-3 rounded-xl ${colorMap[color]}`}>
        <Icon size={28} />
      </div>
      <h2 className="text-3xl font-bold text-slate-800">{title}</h2>
    </div>
  );
};

// 辅助组件：特性卡片
const FeatureCard = ({ title, desc, borderColor, bgColor }) => (
  <div className={`p-5 rounded-xl border ${borderColor} ${bgColor} transition-transform hover:-translate-y-1`}>
    <h3 className="font-bold text-slate-800 mb-2">{title}</h3>
    <p className="text-sm text-slate-600">{desc}</p>
  </div>
);

// 辅助组件：列表项
const ListItem = ({ children }) => (
  <li className="flex items-start gap-3">
    <ChevronRight size={18} className="mt-1 flex-shrink-0 text-emerald-500" />
    <span>{children}</span>
  </li>
);

export default Llama3;