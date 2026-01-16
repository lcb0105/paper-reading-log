import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Brain, Zap, Target, Microscope, CheckCircle, Lightbulb, Database, Cpu, Eye, GitBranch, BarChart3, Settings, Info } from 'lucide-react';

const ReflectiveWords = () => {
  const [activeSection, setActiveSection] = useState('overview');

  // 导航项
  const navItems = [
    { id: 'overview', label: '摘要概览' },
    { id: 'background', label: '1. 研究背景' },
    { id: 'preliminaries', label: '2. 预备知识' },
    { id: 'feature-extraction', label: '3. 特征提取方法' },
    { id: 'causal-analysis', label: '4. 因果分析' },
    { id: 'theory', label: '5. 理论基础' },
    { id: 'experiments', label: '6. 实验设置与结果' },
    { id: 'conclusion', label: '7. 结论与意义' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
  };

  // 公式组件
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

  // 高亮框组件
  const HighlightBox = ({ children, color = 'blue', icon: Icon }) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-500 from-blue-50 to-blue-100',
      green: 'bg-green-50 border-green-500 from-green-50 to-green-100',
      amber: 'bg-amber-50 border-amber-500 from-amber-50 to-amber-100',
      purple: 'bg-purple-50 border-purple-500 from-purple-50 to-purple-100',
      cyan: 'bg-cyan-50 border-cyan-500 from-cyan-50 to-cyan-100',
    };
    return (
      <div className={`bg-gradient-to-r ${colors[color]} border-l-4 p-4 my-4 rounded-r-lg shadow-sm`}>
        {Icon && (
          <div className="flex items-center gap-2 mb-2">
            <Icon className="w-4 h-4" />
          </div>
        )}
        {children}
      </div>
    );
  };

  // 初学者提示组件
  const BeginnerTip = ({ children, title = "初学者提示" }) => (
    <div className="my-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 bg-amber-100 rounded-lg">
          <Lightbulb className="w-4 h-4 text-amber-600" />
        </div>
        <span className="text-sm font-bold text-amber-800">{title}</span>
      </div>
      <div className="text-sm text-amber-700 leading-relaxed pl-8">
        {children}
      </div>
    </div>
  );

  // 概念卡片组件
  const ConceptCard = ({ icon: Icon, title, children, color = "blue" }) => {
    const colorClasses = {
      blue: "from-blue-500 to-blue-600",
      green: "from-green-500 to-green-600",
      purple: "from-purple-500 to-purple-600",
      amber: "from-amber-500 to-amber-600",
      cyan: "from-cyan-500 to-cyan-600",
    };
    return (
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className={`bg-gradient-to-r ${colorClasses[color]} p-3 flex items-center gap-2`}>
          <Icon className="w-5 h-5 text-white" />
          <h4 className="font-bold text-white">{title}</h4>
        </div>
        <div className="p-4 text-sm text-slate-600 leading-relaxed">
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* 顶部导航 */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-slate-200 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">返回首页</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 text-xs font-medium rounded-full">ACL 2026 Submission</span>
              <span className="px-2 py-1 bg-gradient-to-r from-amber-100 to-amber-200 text-amber-700 text-xs font-medium rounded-full">🥈 Second Author</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-20">
        {/* 左侧导航 */}
        <aside className="hidden lg:block w-64 fixed left-0 top-20 bottom-0 overflow-y-auto border-r border-slate-200 bg-white/70 backdrop-blur-sm">
          <div className="p-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">📚 目录导航</h3>
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 font-medium border-l-2 border-blue-500'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* 论文信息卡片 */}
            <div className="mt-6 p-4 bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl border border-slate-200">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">📄 论文信息</h4>
              <div className="space-y-2 text-xs text-slate-600">
                <div><span className="font-medium">状态：</span>ACL 2026 在审</div>
                <div><span className="font-medium">领域：</span>模型可解释性</div>
                <div><span className="font-medium">模型：</span>DeepSeek-R1, QwQ 等</div>
                <div><span className="font-medium">数据集：</span>GSM8K, MATH-500, MBPP</div>
              </div>
            </div>
          </div>
        </aside>

        {/* 主内容区 */}
        <main className="lg:ml-64 px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
          {/* 标题区 */}
          <header className="mb-12 text-center">
            <div className="flex justify-center gap-2 mb-4 flex-wrap">
              <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 text-sm font-medium rounded-full">AI Interpretability</span>
              <span className="px-3 py-1 bg-gradient-to-r from-green-100 to-green-200 text-green-700 text-sm font-medium rounded-full">Reasoning Models</span>
              <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 text-sm font-medium rounded-full">Causal Analysis</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
              大型推理模型中的反思性词语：<br/>
              <span className="text-blue-600">真实能力</span>还是<span className="text-amber-600">机械记忆</span>？
            </h1>
            <p className="text-lg text-slate-600 mb-4 italic">
              Are Reflective Words in Large Reasoning Models a Sign of Genuine Capability or Memorized Patterns?
            </p>
            <div className="flex justify-center gap-4 text-sm text-slate-500">
              <span>📝 Anonymous ACL 2026 Submission</span>
              <span>🥈 Second Author Work</span>
            </div>
          </header>

          {/* 摘要概览 */}
          <section id="overview" className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">摘要概览</h2>
              </div>

              <p className="text-slate-700 leading-relaxed mb-6 text-lg">
                最近的<strong>大型推理模型（LRMs）</strong>，如 OpenAI o1、DeepSeek-R1 和 QwQ-32B-Preview，
                在数学和逻辑推理任务中表现出强大的能力。它们在<strong>思维链（Chain of Thought, CoT）</strong>中展现出
                类似人类的<strong>自我验证</strong>和<strong>反思</strong>行为。
              </p>

              <HighlightBox color="blue">
                <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <span className="text-xl">🔍</span> 核心研究问题
                </h4>
                <p className="text-slate-700 leading-relaxed">
                  当模型输出 "<span className="font-mono bg-white px-2 py-0.5 rounded border text-blue-600">Wait, let me double-check...</span>" 
                  或 "<span className="font-mono bg-white px-2 py-0.5 rounded border text-blue-600">Hmm, that doesn't seem right...</span>" 这样的反思性词语时，
                  这究竟是<strong className="text-blue-700">真正的内部推理机制在运作</strong>，还是仅仅是
                  <strong className="text-amber-700">对训练数据中类似表达的机械模仿</strong>？
                </p>
              </HighlightBox>

              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200 hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-3">🔬</div>
                  <h4 className="font-bold text-slate-800 mb-2">特征提取</h4>
                  <p className="text-sm text-slate-600">通过<strong>均值差分法</strong>从模型内部表示中提取<strong>自我反思特征向量</strong></p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl border border-green-200 hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-3">⚡</div>
                  <h4 className="font-bold text-slate-800 mb-2">因果验证</h4>
                  <p className="text-sm text-slate-600">证明这些特征<strong>因果性地</strong>影响反思性词汇的输出，而非简单相关</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl border border-purple-200 hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-3">🎛️</div>
                  <h4 className="font-bold text-slate-800 mb-2">可控干预</h4>
                  <p className="text-sm text-slate-600">通过操纵这些特征，可<strong>灵活调节</strong>模型的反思强度</p>
                </div>
              </div>

              <BeginnerTip title="一句话总结">
                这篇论文证明了：LRM 说 "Wait, let me think again" 不是在"装"，而是真的在"想"！
                研究者找到了控制模型"想多少"的开关。
              </BeginnerTip>
            </div>
          </section>

          {/* 研究背景 */}
          <section id="background" className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl">
                  <GitBranch className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">1. 研究背景与动机</h2>
              </div>

              <h3 className="text-lg font-bold text-blue-600 mb-4">🚀 大型推理模型（LRM）的崛起</h3>
              
              <p className="text-slate-700 leading-relaxed mb-4">
                2024-2025年，一类新型的语言模型引发了 AI 领域的巨大关注——<strong>大型推理模型（Large Reasoning Models, LRMs）</strong>。
                与传统的 LLM 不同，这些模型经过<strong>强化学习优化</strong>，能够在回答问题时展开<strong>长思维链（Long Chain of Thought）</strong>进行深度推理。
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    代表性 LRM 模型
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-center gap-2">
                      <span className="font-mono bg-slate-200 px-2 py-0.5 rounded text-xs">OpenAI o1</span>
                      <span>首个公开的推理模型</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="font-mono bg-slate-200 px-2 py-0.5 rounded text-xs">DeepSeek-R1</span>
                      <span>开源推理模型标杆</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="font-mono bg-slate-200 px-2 py-0.5 rounded text-xs">QwQ-32B-Preview</span>
                      <span>阿里推理模型</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="font-mono bg-slate-200 px-2 py-0.5 rounded text-xs">DeepSeek-R1-Distill</span>
                      <span>蒸馏版推理模型</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    LRM 的核心特点
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>✅ 将复杂问题分解为子问题</li>
                    <li>✅ 展开长达数千 token 的推理</li>
                    <li>✅ 使用类似人类的反思语气</li>
                    <li>✅ 自我验证和纠错能力</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-lg font-bold text-blue-600 mb-4">💭 LRM 中的"人类化"表达</h3>
              
              <p className="text-slate-700 leading-relaxed mb-4">
                最引人注目的是，LRM 在推理过程中会产生<strong>类似人类的反思性表达</strong>：
              </p>

              <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-6 mb-6 font-mono text-sm">
                <div className="text-green-400 mb-2">// LRM 的典型推理输出示例</div>
                <div className="space-y-2 text-slate-300">
                  <p><span className="text-blue-400">"Let me solve this step by step..."</span></p>
                  <p><span className="text-amber-400">"Wait, I think I made an error. Let me recalculate..."</span></p>
                  <p><span className="text-purple-400">"Hmm, that doesn't match. Let me try a different approach..."</span></p>
                  <p><span className="text-green-400">"After double-checking, the answer should be..."</span></p>
                </div>
              </div>

              <HighlightBox color="amber">
                <h4 className="font-bold text-slate-800 mb-2">🤔 研究动机：真实 vs 表演</h4>
                <p className="text-slate-700 text-sm leading-relaxed">
                  这些表达让人不禁思考：模型真的在"反思"吗？还是只是学会了在特定位置插入这些"听起来像在思考"的词语？
                  如果只是后者，那么 LRM 的推理能力可能只是一种<strong>语言层面的模仿</strong>，而非真正的<strong>认知能力</strong>。
                </p>
              </HighlightBox>

              <h3 className="text-lg font-bold text-blue-600 mb-4 mt-8">📚 相关研究：线性语义特征</h3>
              
              <p className="text-slate-700 leading-relaxed mb-4">
                近期的模型可解释性研究发现，LLM 在其激活空间中编码了<strong>线性语义特征</strong>。
                这意味着许多认知行为可以用高维空间中的<strong>向量方向</strong>来表示和控制。
              </p>

              <div className="grid md:grid-cols-3 gap-3 mb-4">
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 text-center">
                  <div className="text-2xl mb-1">🚫</div>
                  <div className="text-sm font-medium text-blue-800">拒绝回答</div>
                  <div className="text-xs text-blue-600">Refusal Features</div>
                </div>
                <div className="bg-red-50 p-3 rounded-lg border border-red-200 text-center">
                  <div className="text-2xl mb-1">⚠️</div>
                  <div className="text-sm font-medium text-red-800">越狱攻击</div>
                  <div className="text-xs text-red-600">Jailbreak Features</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg border border-green-200 text-center">
                  <div className="text-2xl mb-1">💡</div>
                  <div className="text-sm font-medium text-green-800">知识召回</div>
                  <div className="text-xs text-green-600">Knowledge-Recall</div>
                </div>
              </div>

              <BeginnerTip>
                简单理解：研究者发现可以在模型的"大脑"里找到代表不同行为的"开关方向"。
                这篇论文要找的就是控制"反思行为"的那个方向。
              </BeginnerTip>
            </div>
          </section>

          {/* 预备知识 */}
          <section id="preliminaries" className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-xl">
                  <Info className="w-6 h-6 text-cyan-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">2. 预备知识（初学者必读）</h2>
              </div>

              <p className="text-slate-600 mb-6 italic">
                这部分为没有背景知识的读者解释论文中涉及的关键概念。
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <ConceptCard icon={Brain} title="什么是思维链（CoT）？" color="blue">
                  <p className="mb-2">
                    <strong>Chain of Thought (CoT)</strong> 是让模型"说出思考过程"的技术。
                  </p>
                  <p className="mb-2">
                    <strong>普通回答</strong>："答案是 42"
                  </p>
                  <p>
                    <strong>CoT 回答</strong>："首先，我需要计算 X... 然后，根据公式... 所以答案是 42"
                  </p>
                </ConceptCard>

                <ConceptCard icon={Eye} title="什么是隐藏状态？" color="green">
                  <p className="mb-2">
                    <strong>隐藏状态（Hidden State）</strong>是 Transformer 模型在处理文本时，每一层内部产生的向量表示。
                  </p>
                  <p>
                    可以把它理解为模型的"内心想法"——虽然我们看不到最终输出，但这些向量记录了模型正在"想什么"。
                  </p>
                </ConceptCard>

                <ConceptCard icon={Target} title="什么是均值差分法？" color="purple">
                  <p className="mb-2">
                    <strong>Difference-in-Means</strong> 是一种简单但强大的特征提取方法。
                  </p>
                  <p>
                    核心思想：比较两类样本的<strong>平均表示</strong>，差值方向就是区分它们的特征方向。
                    类似于找"男性平均脸"和"女性平均脸"，两者相减就得到"性别方向"。
                  </p>
                </ConceptCard>

                <ConceptCard icon={Microscope} title="什么是 Logit Lens？" color="amber">
                  <p className="mb-2">
                    <strong>Logit Lens</strong> 是一种"偷看"模型内部想法的技术。
                  </p>
                  <p>
                    它将模型中间层的向量直接投影到词汇表空间，让我们看到"这个向量想输出什么词"。
                    就像给模型的思维过程装上"实时字幕"。
                  </p>
                </ConceptCard>
              </div>

              <div className="mt-6 bg-gradient-to-r from-slate-100 to-slate-50 rounded-xl p-6 border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-slate-600" />
                  PCA 可视化
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  <strong>主成分分析（PCA）</strong>是一种降维技术，可以将高维数据（如数千维的隐藏状态）
                  压缩到 2D/3D 空间进行可视化。如果两类数据点在 PCA 图中分开，说明它们在原始高维空间中也是可分的。
                </p>
              </div>
            </div>
          </section>

          {/* 特征提取 */}
          <section id="feature-extraction" className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-gradient-to-br from-green-100 to-green-200 rounded-xl">
                  <Microscope className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">3. 核心方法：提取"自我反思特征"</h2>
              </div>

              <p className="text-slate-700 leading-relaxed mb-6">
                研究者使用<strong>均值差分（Difference-in-Means）</strong>方法，从四个 LRM 模型中提取代表自我反思的内部特征。
              </p>

              <h3 className="text-lg font-bold text-blue-600 mb-4">📋 方法步骤详解</h3>

              <div className="space-y-4 mb-6">
                {/* 步骤 1 */}
                <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-5 border border-slate-200">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl flex items-center justify-center font-bold shadow-md">1</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800 mb-2">推理片段化（Reasoning Segments）</h4>
                      <p className="text-slate-600 text-sm mb-3">
                        使用 <strong>GPT-4o</strong> 将模型的完整回答分解为多个独立的推理片段 {`{s₁, s₂, ..., sₙ}`}。
                        每个片段代表模型的一次解题尝试或方法探索。
                      </p>
                      <div className="bg-white rounded-lg p-3 border border-slate-200 text-xs">
                        <div className="font-mono text-slate-500 mb-1">// GPT-4o 分段示例</div>
                        <div className="text-slate-700">
                          <strong>Segment 1:</strong> 直接算术方法 → <strong>Segment 2:</strong> 代数重构 → <strong>Segment 3:</strong> 语义分析...
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 步骤 2 */}
                <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-5 border border-slate-200">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl flex items-center justify-center font-bold shadow-md">2</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800 mb-2">片段二元分类</h4>
                      <p className="text-slate-600 text-sm mb-3">
                        根据片段结束后模型的行为，将所有片段分为两类：
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-lg border border-amber-200">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-3 h-3 bg-amber-500 rounded-full"></span>
                            <span className="font-mono text-amber-800 font-bold text-sm">S_Check-point</span>
                          </div>
                          <p className="text-sm text-slate-600">
                            片段结束后，模型<strong>继续反思</strong>、验证或尝试新方法
                          </p>
                          <div className="mt-2 text-xs text-amber-700 bg-amber-50 rounded px-2 py-1">
                            "Wait, let me try another approach..."
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                            <span className="font-mono text-green-800 font-bold text-sm">S_Termination</span>
                          </div>
                          <p className="text-sm text-slate-600">
                            片段结束后，模型<strong>直接给出最终答案</strong>
                          </p>
                          <div className="mt-2 text-xs text-green-700 bg-green-50 rounded px-2 py-1">
                            "Therefore, the answer is 42."
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 步骤 3 */}
                <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-5 border border-slate-200">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl flex items-center justify-center font-bold shadow-md">3</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800 mb-2">提取关键位置的隐藏状态</h4>
                      <p className="text-slate-600 text-sm mb-3">
                        在每个片段的<strong>最后一个 Token</strong> 位置提取第 l 层的隐藏状态 h⁽ˡ⁾(s)。
                      </p>
                      <HighlightBox color="cyan">
                        <p className="text-sm text-slate-700">
                          <strong>为什么是最后一个 Token？</strong> 因为这是模型做出决策的<strong>关键时刻</strong>——
                          它需要决定是"继续反思"还是"直接回答"。此刻的隐藏状态包含了最丰富的决策信息。
                        </p>
                      </HighlightBox>
                    </div>
                  </div>
                </div>
              </div>

              <FormulaBox
                title="公式 1：自我反思特征向量提取"
                formula="f⁽ˡ⁾ = (1/|S_Check-point|) Σ_{s∈S_Check-point} h⁽ˡ⁾(s) − (1/|S_Termination|) Σ_{s∈S_Termination} h⁽ˡ⁾(s)"
                explanation="计算两类片段在第 l 层隐藏状态的均值差，得到指向「自我反思」状态的特征向量方向。"
                beginner="想象高维空间中有两团点云：一团代表「继续反思」，一团代表「直接回答」。计算两团的重心（平均位置），连接重心的向量就是「反思方向」。一个点越靠近「反思重心」，模型就越倾向于继续反思。"
                variables={[
                  { symbol: 'f⁽ˡ⁾', desc: '第 l 层的自我反思特征向量' },
                  { symbol: 'S_Check-point', desc: '导致继续反思的片段集合' },
                  { symbol: 'S_Termination', desc: '导致直接回答的片段集合' },
                  { symbol: 'h⁽ˡ⁾(s)', desc: '片段 s 末尾 token 的第 l 层隐藏状态' },
                ]}
              />

              <h3 className="text-lg font-bold text-blue-600 mb-4 mt-8">📊 PCA 可视化验证</h3>
              
              <p className="text-slate-700 mb-4">
                为了验证提取的特征是否有效，研究者使用 PCA 将高维隐藏状态降至 2D 进行可视化：
              </p>

              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-slate-800">PCA 可视化结果示意</h4>
                  <span className="text-xs text-slate-500">GSM8K / MATH-500 / MBPP</span>
                </div>
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <div className="flex items-center justify-center gap-8 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
                      <span className="text-sm text-slate-600">S_Check-point（反思）</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-slate-600">S_Termination（终止）</span>
                    </div>
                  </div>
                  <div className="h-32 bg-gradient-to-r from-amber-50 via-slate-50 to-green-50 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300 relative">
                    <div className="absolute left-1/4 top-1/2 transform -translate-y-1/2">
                      <div className="w-8 h-8 bg-amber-200 rounded-full opacity-60"></div>
                      <div className="w-6 h-6 bg-amber-300 rounded-full opacity-60 -mt-4 ml-3"></div>
                      <div className="w-5 h-5 bg-amber-400 rounded-full opacity-60 -mt-2 -ml-1"></div>
                    </div>
                    <div className="border-l-2 border-dashed border-slate-400 h-full absolute left-1/2"></div>
                    <div className="absolute right-1/4 top-1/2 transform -translate-y-1/2">
                      <div className="w-8 h-8 bg-green-200 rounded-full opacity-60"></div>
                      <div className="w-6 h-6 bg-green-300 rounded-full opacity-60 -mt-4 ml-3"></div>
                      <div className="w-5 h-5 bg-green-400 rounded-full opacity-60 -mt-2 -ml-1"></div>
                    </div>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-slate-500">
                      逻辑回归边界
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mt-3 text-center">
                  两类数据点被<strong>逻辑回归边界</strong>清晰分开，蓝色箭头为自我反思特征方向
                </p>
              </div>

              <BeginnerTip title="关键洞察">
                如果两类片段的隐藏状态在高维空间中<strong>混在一起不可分</strong>，那说明模型内部没有区分"反思"和"终止"的机制。
                但实验显示它们<strong>清晰可分</strong>，证明模型确实在内部表示层面区分了这两种状态！
              </BeginnerTip>
            </div>
          </section>

          {/* 因果分析 */}
          <section id="causal-analysis" className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl">
                  <Zap className="w-6 h-6 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">4. 因果分析：从相关到因果</h2>
              </div>

              <HighlightBox color="amber">
                <h4 className="font-bold text-slate-800 mb-2">🔑 关键问题</h4>
                <p className="text-slate-700 text-sm">
                  提取出特征向量后，我们需要回答：这个特征是否<strong>真正导致</strong>了反思行为？
                  还是只是一个<strong>相关但无因果</strong>的指标？
                </p>
              </HighlightBox>

              <h3 className="text-lg font-bold text-blue-600 mb-4 mt-6">🔍 内部视角：Logit Lens 分析</h3>
              
              <p className="text-slate-700 mb-4">
                研究者使用 <strong>Logit Lens</strong> 技术分析 MLP 层的值向量（Value Vector），发现：
              </p>

              <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-6 mb-6">
                <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  MLP 值向量中存储的反思性词汇
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['Wait', 'Double-check', 'However', 'Actually', 'Let me', 'Hmm', 'Recall', 'No', 'Check', 'Verify'].map(word => (
                    <span key={word} className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm rounded-full font-mono">
                      "{word}"
                    </span>
                  ))}
                </div>
                <p className="text-slate-300 text-sm mt-4">
                  当自我反思特征 f⁽ˡ⁾ 被激活时，这些值向量的激活值<strong className="text-green-400">显著增加</strong>
                </p>
              </div>

              <h3 className="text-lg font-bold text-blue-600 mb-4">🧪 外部视角：干预实验</h3>
              
              <p className="text-slate-700 mb-4">
                为了建立<strong>因果关系</strong>而非仅仅相关，研究者进行了<strong>干预实验</strong>——
                人为操纵模型内部状态，观察行为变化：
              </p>

              <FormulaBox
                title="公式 2：线性特征干预"
                formula="h'⁽ˡ⁾(s) ← h⁽ˡ⁾(s) − β · f⁽ˡ⁾"
                explanation="通过在隐藏状态上加减自我反思特征向量，可以直接控制模型的反思行为。"
                beginner="想象一个滑块：向左拨（β < 0）增强反思，向右拨（β > 0）抑制反思。这就像直接调节模型大脑中的「反思开关」。如果调节后行为真的改变了，就证明这个特征确实在控制反思！"
                variables={[
                  { symbol: "h'⁽ˡ⁾(s)", desc: '干预后的隐藏状态' },
                  { symbol: 'h⁽ˡ⁾(s)', desc: '原始隐藏状态' },
                  { symbol: 'f⁽ˡ⁾', desc: '自我反思特征向量' },
                  { symbol: 'β', desc: '干预强度系数（正=抑制，负=增强）' },
                ]}
              />

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl border border-green-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 bg-green-200 rounded-lg">
                      <Brain className="w-5 h-5 text-green-700" />
                    </div>
                    <h4 className="font-bold text-green-800">β &lt; 0（增强反思）</h4>
                  </div>
                  <ul className="text-sm text-green-700 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✅</span>
                      <span>准确率轻微<strong>提升 2-3%</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-amber-600">⏱️</span>
                      <span>推理时间<strong>增加 30-50%</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-600">💭</span>
                      <span>模型"想得更多、更深"</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-orange-100 p-6 rounded-xl border border-red-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 bg-red-200 rounded-lg">
                      <Zap className="w-5 h-5 text-red-700" />
                    </div>
                    <h4 className="font-bold text-red-800">β &gt; 0（抑制反思）</h4>
                  </div>
                  <ul className="text-sm text-red-700 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">⚡</span>
                      <span>推理时间<strong>减少 20-30%</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-600">❌</span>
                      <span>准确率<strong>下降 5-8%</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-amber-600">🏃</span>
                      <span>模型变得"冲动"、"草率"</span>
                    </li>
                  </ul>
                </div>
              </div>

              <BeginnerTip title="因果验证的意义">
                干预实验是科学研究中验证因果关系的黄金标准。就像要证明"吃药导致病好"，不能只看"吃药的人病好了"（相关），
                还要做"随机给药/不给药"的对照实验（因果）。这里的干预实验证明了：<strong>操纵反思特征 → 改变反思行为</strong>，
                因此反思特征是反思行为的<strong>因</strong>而非仅仅是<strong>相关</strong>。
              </BeginnerTip>
            </div>
          </section>

          {/* 理论基础 */}
          <section id="theory" className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">5. 理论基础：Transformer 内部机制</h2>
              </div>

              <p className="text-slate-700 leading-relaxed mb-6">
                为了深入理解上述方法的底层逻辑，我们需要了解 Transformer 模型中 <strong className="text-purple-700">MLP 层</strong>的工作原理。
                这部分内容是理解"为什么干预能影响模型行为"的关键。
              </p>

              {/* Transformer 结构概览 */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-8 border border-indigo-200">
                <h3 className="text-lg font-bold text-indigo-800 mb-4">🏗️ Transformer 层结构回顾</h3>
                <p className="text-slate-700 text-sm mb-4">
                  每一层 Transformer 由两个主要模块组成：<strong>注意力层（Attention）</strong>和 <strong>MLP 层</strong>。
                </p>
                <div className="bg-white rounded-lg p-4 border border-indigo-200">
                  <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm">
                    <div className="bg-blue-100 px-4 py-2 rounded-lg border border-blue-300 text-blue-800 font-medium">
                      输入 X^l
                    </div>
                    <span className="text-slate-400">→</span>
                    <div className="bg-green-100 px-4 py-2 rounded-lg border border-green-300 text-green-800 font-medium">
                      + Attention (A^l)
                    </div>
                    <span className="text-slate-400">→</span>
                    <div className="bg-purple-100 px-4 py-2 rounded-lg border border-purple-300 text-purple-800 font-medium">
                      + MLP (M^l)
                    </div>
                    <span className="text-slate-400">→</span>
                    <div className="bg-amber-100 px-4 py-2 rounded-lg border border-amber-300 text-amber-800 font-medium">
                      输出 X^(l+1)
                    </div>
                  </div>
                  <p className="text-center text-xs text-slate-500 mt-3">
                    信息通过残差连接（+）逐层累加传递
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-bold text-blue-700 mb-4">📐 MLP 的键值记忆机制</h3>
              
              <p className="text-slate-700 mb-4">
                研究表明，Transformer 的 MLP 层可以被视为<strong className="text-blue-700">键值（Key-Value）记忆网络</strong>。
                这是理解"知识如何存储在模型中"的重要视角。
              </p>

              {/* 公式 3：MLP 输出 */}
              <div className="my-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl overflow-hidden shadow-md">
                <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white px-5 py-3 flex justify-between items-center">
                  <span className="font-bold">公式 3：MLP 输出计算</span>
                  <span className="text-blue-200 text-xs bg-blue-800 px-2 py-1 rounded">Key-Value Memory</span>
                </div>
                <div className="p-6 bg-white border-b border-blue-100">
                  <div className="text-xl md:text-2xl font-serif text-slate-800 text-center py-4" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                    M<sup>l</sup> = f(W<sub>K</sub><sup>l</sup> · γ(x<sup>l</sup> + A<sup>l</sup>)) · W<sub>V</sub><sup>l</sup> = m<sup>l</sup> · W<sub>V</sub><sup>l</sup>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="bg-blue-100 rounded-lg p-4 border border-blue-200">
                    <h5 className="font-bold text-blue-900 mb-2">📖 公式含义</h5>
                    <p className="text-blue-800 text-sm leading-relaxed">
                      MLP 首先用 <strong>Key 矩阵 W<sub>K</sub></strong> 计算输入与存储知识的匹配程度（系数 m），
                      然后用这些系数加权 <strong>Value 矩阵 W<sub>V</sub></strong> 中存储的知识。
                    </p>
                  </div>
                  
                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="w-5 h-5 text-amber-600" />
                      <span className="font-bold text-amber-800">初学者比喻</span>
                    </div>
                    <p className="text-amber-900 text-sm leading-relaxed">
                      🏛️ 把 MLP 想象成一个<strong>智能图书馆</strong>：
                    </p>
                    <ul className="text-amber-800 text-sm mt-2 space-y-1 pl-4">
                      <li>• <strong>W<sub>K</sub>（Key 矩阵）</strong>= 图书馆的检索系统，根据你的查询决定哪些书相关</li>
                      <li>• <strong>W<sub>V</sub>（Value 矩阵）</strong>= 书架上的书籍内容，存储实际的知识</li>
                      <li>• <strong>m（系数）</strong>= 每本书的相关性评分</li>
                      <li>• <strong>输出</strong>= 按评分加权取出书中的知识</li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-slate-100 p-3 rounded-lg border border-slate-200">
                      <span className="font-mono font-bold text-blue-700 block">M<sup>l</sup></span>
                      <span className="text-xs text-slate-600">第 l 层 MLP 输出</span>
                    </div>
                    <div className="bg-slate-100 p-3 rounded-lg border border-slate-200">
                      <span className="font-mono font-bold text-green-700 block">W<sub>K</sub><sup>l</sup></span>
                      <span className="text-xs text-slate-600">Key 矩阵（检索）</span>
                    </div>
                    <div className="bg-slate-100 p-3 rounded-lg border border-slate-200">
                      <span className="font-mono font-bold text-purple-700 block">W<sub>V</sub><sup>l</sup></span>
                      <span className="text-xs text-slate-600">Value 矩阵（存储）</span>
                    </div>
                    <div className="bg-slate-100 p-3 rounded-lg border border-slate-200">
                      <span className="font-mono font-bold text-amber-700 block">m<sup>l</sup></span>
                      <span className="text-xs text-slate-600">系数/激活值</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 公式 4：值向量分解 */}
              <div className="my-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl overflow-hidden shadow-md">
                <div className="bg-gradient-to-r from-green-700 to-emerald-700 text-white px-5 py-3 flex justify-between items-center">
                  <span className="font-bold">公式 4：值向量线性组合</span>
                  <span className="text-green-200 text-xs bg-green-800 px-2 py-1 rounded">核心洞察</span>
                </div>
                <div className="p-6 bg-white border-b border-green-100">
                  <div className="text-xl md:text-2xl font-serif text-slate-800 text-center py-4" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                    M<sup>l</sup> = Σ<sub>j=1</sub><sup>n</sup> m<sub>j</sub><sup>l</sup> · v<sub>j</sub><sup>l</sup>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="bg-green-100 rounded-lg p-4 border border-green-200">
                    <h5 className="font-bold text-green-900 mb-2">📖 公式含义</h5>
                    <p className="text-green-800 text-sm leading-relaxed">
                      MLP 的输出是所有<strong>值向量 v<sub>j</sub></strong> 的<strong>加权求和</strong>。
                      每个值向量存储特定的知识或概念，其权重由对应的系数 m<sub>j</sub> 决定。
                    </p>
                  </div>
                  
                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="w-5 h-5 text-amber-600" />
                      <span className="font-bold text-amber-800">这就是关键！</span>
                    </div>
                    <p className="text-amber-900 text-sm leading-relaxed">
                      🎯 <strong>展开来写</strong>：M<sup>l</sup> = m<sub>1</sub>·v<sub>1</sub> + m<sub>2</sub>·v<sub>2</sub> + ... + m<sub>n</sub>·v<sub>n</sub>
                    </p>
                    <p className="text-amber-800 text-sm mt-2 leading-relaxed">
                      如果 <strong>v<sub>42</sub></strong> 这个值向量专门存储了「Wait」这个概念，
                      那么当 <strong>m<sub>42</sub></strong> 的激活值很高时，「Wait」概念就会被强烈地注入到模型输出中！
                    </p>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <h5 className="font-bold text-purple-900 mb-2">🔬 论文发现</h5>
                    <p className="text-purple-800 text-sm leading-relaxed">
                      研究者通过 Logit Lens 分析发现，确实存在一些特定的 v<sub>j</sub> 向量，
                      它们专门存储了 <span className="font-mono bg-purple-200 px-1 rounded">"Wait"</span> 
                      <span className="font-mono bg-purple-200 px-1 rounded">"Check"</span> 
                      <span className="font-mono bg-purple-200 px-1 rounded">"However"</span> 等反思性词汇。
                      当自我反思特征被激活时，这些向量的系数 m<sub>j</sub> 显著增加！
                    </p>
                  </div>
                </div>
              </div>

              {/* 公式 5：残差连接 */}
              <div className="my-8 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl overflow-hidden shadow-md">
                <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-5 py-3 flex justify-between items-center">
                  <span className="font-bold">公式 5：残差连接（信息流动）</span>
                  <span className="text-amber-200 text-xs bg-amber-700 px-2 py-1 rounded">干预原理</span>
                </div>
                <div className="p-6 bg-white border-b border-amber-100">
                  <div className="text-xl md:text-2xl font-serif text-slate-800 text-center py-4" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                    X<sup>(l+1)</sup> = X<sup>l</sup> + M<sup>l</sup> + A<sup>l</sup>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="bg-amber-100 rounded-lg p-4 border border-amber-200">
                    <h5 className="font-bold text-amber-900 mb-2">📖 公式含义</h5>
                    <p className="text-amber-800 text-sm leading-relaxed">
                      这是 Transformer 的<strong>残差连接</strong>公式：下一层的输入等于当前层输入加上 MLP 输出和注意力输出。
                      信息通过这种「加法」方式逐层累积和传递。
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-amber-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="w-5 h-5 text-amber-600" />
                      <span className="font-bold text-amber-800">为什么干预能生效？</span>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-slate-200">
                      <p className="text-slate-700 text-sm leading-relaxed mb-3">
                        🌊 把信息流想象成一条<strong>河流</strong>：
                      </p>
                      <ul className="text-slate-700 text-sm space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">1.</span>
                          <span>信息从第 1 层流向第 L 层（L 可能是 32、64 层）</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">2.</span>
                          <span>每层都往河里「注入」一些新信息（M<sup>l</sup> 和 A<sup>l</sup>）</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">3.</span>
                          <span>如果我们在第 15 层修改了 X<sup>15</sup>（减去反思特征向量）</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">4.</span>
                          <span>这个修改会「顺流而下」，影响第 16、17、...、L 层的所有计算</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">5.</span>
                          <span><strong>最终影响模型输出！</strong></span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-bold text-blue-700 mb-4 mt-8">🔬 Logit Lens：窥探内部向量的含义</h3>
              
              <p className="text-slate-700 mb-4">
                那么，我们怎么知道某个值向量 v<sub>j</sub> 代表什么概念呢？答案是 <strong className="text-blue-700">Logit Lens</strong> 技术。
              </p>

              {/* 公式 6：Logit Lens */}
              <div className="my-8 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl overflow-hidden shadow-md">
                <div className="bg-gradient-to-r from-purple-700 to-pink-700 text-white px-5 py-3 flex justify-between items-center">
                  <span className="font-bold">公式 6：Logit Lens 投影</span>
                  <span className="text-purple-200 text-xs bg-purple-800 px-2 py-1 rounded">解码内部表示</span>
                </div>
                <div className="p-6 bg-white border-b border-purple-100">
                  <div className="text-xl md:text-2xl font-serif text-slate-800 text-center py-4" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                    Projection = E · v<sub>j</sub><sup>l</sup>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="bg-purple-100 rounded-lg p-4 border border-purple-200">
                    <h5 className="font-bold text-purple-900 mb-2">📖 公式含义</h5>
                    <p className="text-purple-800 text-sm leading-relaxed">
                      将内部向量 v<sub>j</sub> 乘以 <strong>Unembedding 矩阵 E</strong>，
                      得到一个词汇表大小的向量，表示"这个内部向量对应词汇表中每个词的概率"。
                    </p>
                  </div>
                  
                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="w-5 h-5 text-amber-600" />
                      <span className="font-bold text-amber-800">通俗理解</span>
                    </div>
                    <p className="text-amber-900 text-sm leading-relaxed">
                      🔍 <strong>E 矩阵</strong>是模型的「翻译器」，负责把内部向量翻译成人类可读的词汇。
                    </p>
                    <p className="text-amber-800 text-sm mt-2 leading-relaxed">
                      把任意内部向量 v 乘以 E，就能看到<strong>「这个向量想说什么词」</strong>：
                    </p>
                    <div className="bg-white rounded-lg p-3 mt-3 border border-amber-200 font-mono text-sm">
                      <div className="text-slate-600">v<sub>42</sub> × E = </div>
                      <div className="mt-1 text-slate-800">
                        Top-5: <span className="text-purple-600">"Wait"</span>(0.23), 
                        <span className="text-purple-600">"Hold"</span>(0.18), 
                        <span className="text-purple-600">"Check"</span>(0.15), 
                        <span className="text-purple-600">"Hmm"</span>(0.12), 
                        <span className="text-purple-600">"Actually"</span>(0.09)
                      </div>
                    </div>
                    <p className="text-amber-800 text-sm mt-2">
                      ↑ 如果结果显示 Top 词是反思性词汇，说明 v<sub>42</sub> 在模型内部代表「反思」概念！
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-slate-100 p-3 rounded-lg border border-slate-200">
                      <span className="font-mono font-bold text-purple-700 block">E</span>
                      <span className="text-sm text-slate-600">Unembedding 矩阵</span>
                      <span className="text-xs text-slate-500 block">维度: (d_model × vocab_size)</span>
                    </div>
                    <div className="bg-slate-100 p-3 rounded-lg border border-slate-200">
                      <span className="font-mono font-bold text-blue-700 block">v<sub>j</sub><sup>l</sup></span>
                      <span className="text-sm text-slate-600">第 l 层第 j 个值向量</span>
                      <span className="text-xs text-slate-500 block">维度: (d_model,)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 完整因果链条 */}
              <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl p-6 border-2 border-indigo-300 mt-8">
                <h4 className="font-bold text-indigo-900 mb-4 flex items-center gap-2 text-lg">
                  🔗 完整因果链条：从特征到输出
                </h4>
                <div className="bg-white rounded-lg p-4 border border-indigo-200">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
                      <p className="text-blue-800 text-sm"><strong>自我反思特征 f<sup>l</sup> 被激活</strong>（在某层隐藏状态中检测到）</p>
                    </div>
                    <div className="flex justify-center">
                      <span className="text-indigo-400 text-xl">↓</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
                      <p className="text-green-800 text-sm">与「Wait」「Check」等词相关的<strong>值向量 v<sub>j</sub> 的系数 m<sub>j</sub> 增加</strong></p>
                    </div>
                    <div className="flex justify-center">
                      <span className="text-indigo-400 text-xl">↓</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
                      <p className="text-purple-800 text-sm"><strong>MLP 输出 M<sup>l</sup></strong> 中这些反思概念的权重增大</p>
                    </div>
                    <div className="flex justify-center">
                      <span className="text-indigo-400 text-xl">↓</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                      <span className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold text-sm">4</span>
                      <p className="text-amber-800 text-sm">通过<strong>残差连接</strong>传递到后续所有层</p>
                    </div>
                    <div className="flex justify-center">
                      <span className="text-indigo-400 text-xl">↓</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                      <span className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm">5</span>
                      <p className="text-red-800 text-sm">模型<strong>生成反思性词汇</strong>：「Wait, let me double-check...」</p>
                    </div>
                  </div>
                </div>
              </div>

              <BeginnerTip title="总结：为什么干预特征能控制反思？">
                <p>因为整个系统是<strong>线性可加的</strong>：</p>
                <ul className="mt-2 space-y-1">
                  <li>• 我们修改隐藏状态 X（减去反思特征向量 f）</li>
                  <li>• → 改变了与反思词汇相关的值向量的激活系数 m</li>
                  <li>• → 改变了 MLP 输出中反思概念的权重</li>
                  <li>• → 通过残差连接影响最终输出</li>
                  <li>• → 模型生成的反思词汇变少或变多！</li>
                </ul>
              </BeginnerTip>
            </div>
          </section>

          {/* 实验设置与结果 */}
          <section id="experiments" className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-xl">
                  <Settings className="w-6 h-6 text-cyan-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">6. 实验设置与结果</h2>
              </div>

              <h3 className="text-lg font-bold text-blue-700 mb-4">🔧 实验配置</h3>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-100 rounded-xl p-5 border border-slate-300">
                  <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-slate-700" />
                    实验环境
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700 font-medium">GPU</span>
                      <span className="font-mono bg-white text-slate-900 px-2 py-1 rounded border border-slate-300">4× NVIDIA A800 80GB</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700 font-medium">Temperature</span>
                      <span className="font-mono bg-white text-slate-900 px-2 py-1 rounded border border-slate-300">0.6</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700 font-medium">Top-p</span>
                      <span className="font-mono bg-white text-slate-900 px-2 py-1 rounded border border-slate-300">0.95</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700 font-medium">Max Length</span>
                      <span className="font-mono bg-white text-slate-900 px-2 py-1 rounded border border-slate-300">32,768 tokens</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-100 rounded-xl p-5 border border-slate-300">
                  <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Brain className="w-4 h-4 text-slate-700" />
                    评测模型
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 p-2 bg-white rounded border border-slate-300">
                      <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                      <span className="text-slate-800 font-medium">DeepSeek-R1-Distill-Qwen-7B</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-white rounded border border-slate-300">
                      <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                      <span className="text-slate-800 font-medium">DeepSeek-R1-Distill-Qwen-32B</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-white rounded border border-slate-300">
                      <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></span>
                      <span className="text-slate-800 font-medium">QwQ-32B-Preview</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-white rounded border border-slate-300">
                      <span className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0"></span>
                      <span className="text-slate-800 font-medium">DeepSeek-R1-Distill-LLaMA-70B</span>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-bold text-blue-700 mb-4">📊 数据集与统计</h3>

              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse bg-white">
                  <thead>
                    <tr className="bg-slate-200">
                      <th className="border border-slate-300 px-4 py-3 text-left font-bold text-slate-900">数据集</th>
                      <th className="border border-slate-300 px-4 py-3 text-center font-bold text-slate-900">任务类型</th>
                      <th className="border border-slate-300 px-4 py-3 text-center font-bold text-slate-900">Termination 片段<br/><span className="text-xs font-normal text-slate-600">平均 Token 数</span></th>
                      <th className="border border-slate-300 px-4 py-3 text-center font-bold text-slate-900">Check-point 片段<br/><span className="text-xs font-normal text-slate-600">平均 Token 数</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-slate-50">
                      <td className="border border-slate-300 px-4 py-3 font-medium text-slate-900">GSM8K</td>
                      <td className="border border-slate-300 px-4 py-3 text-center text-slate-800">小学数学</td>
                      <td className="border border-slate-300 px-4 py-3 text-center font-mono font-bold text-green-700">52.3</td>
                      <td className="border border-slate-300 px-4 py-3 text-center font-mono font-bold text-amber-700">38.7</td>
                    </tr>
                    <tr className="bg-slate-50 hover:bg-slate-100">
                      <td className="border border-slate-300 px-4 py-3 font-medium text-slate-900">MATH-500</td>
                      <td className="border border-slate-300 px-4 py-3 text-center text-slate-800">竞赛数学</td>
                      <td className="border border-slate-300 px-4 py-3 text-center font-mono font-bold text-green-700">67.8</td>
                      <td className="border border-slate-300 px-4 py-3 text-center font-mono font-bold text-amber-700">44.2</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="border border-slate-300 px-4 py-3 font-medium text-slate-900">MBPP</td>
                      <td className="border border-slate-300 px-4 py-3 text-center text-slate-800">Python 编程</td>
                      <td className="border border-slate-300 px-4 py-3 text-center font-mono font-bold text-green-700">41.6</td>
                      <td className="border border-slate-300 px-4 py-3 text-center font-mono font-bold text-amber-700">29.5</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <BeginnerTip title="有趣的发现">
                Termination 片段平均比 Check-point 片段<strong>更长</strong>！这说明当模型决定给出最终答案时，
                它倾向于写出更完整、详细的解答；而在反思过程中，它更简洁地提出疑问或尝试新方向。
              </BeginnerTip>

              <h3 className="text-lg font-bold text-blue-700 mb-4 mt-8">📈 干预实验量化结果</h3>

              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse bg-white">
                  <thead>
                    <tr className="bg-slate-200">
                      <th className="border border-slate-300 px-4 py-3 text-left font-bold text-slate-900">干预类型</th>
                      <th className="border border-slate-300 px-4 py-3 text-center font-bold text-slate-900">β 值</th>
                      <th className="border border-slate-300 px-4 py-3 text-center font-bold text-slate-900">准确率变化</th>
                      <th className="border border-slate-300 px-4 py-3 text-center font-bold text-slate-900">推理 Token 数变化</th>
                      <th className="border border-slate-300 px-4 py-3 text-center font-bold text-slate-900">效果描述</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-green-100 hover:bg-green-200">
                      <td className="border border-slate-300 px-4 py-3 font-bold text-green-900">增强反思</td>
                      <td className="border border-slate-300 px-4 py-3 text-center font-mono font-bold text-slate-900">-1.0</td>
                      <td className="border border-slate-300 px-4 py-3 text-center font-bold text-green-800">+2~3%</td>
                      <td className="border border-slate-300 px-4 py-3 text-center font-bold text-amber-800">+30~50%</td>
                      <td className="border border-slate-300 px-4 py-3 text-center text-slate-800">更谨慎、更准确</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="border border-slate-300 px-4 py-3 font-medium text-slate-900">原始模型</td>
                      <td className="border border-slate-300 px-4 py-3 text-center font-mono text-slate-800">0</td>
                      <td className="border border-slate-300 px-4 py-3 text-center text-slate-600">baseline</td>
                      <td className="border border-slate-300 px-4 py-3 text-center text-slate-600">baseline</td>
                      <td className="border border-slate-300 px-4 py-3 text-center text-slate-600">—</td>
                    </tr>
                    <tr className="bg-red-100 hover:bg-red-200">
                      <td className="border border-slate-300 px-4 py-3 font-bold text-red-900">抑制反思</td>
                      <td className="border border-slate-300 px-4 py-3 text-center font-mono font-bold text-slate-900">+1.0</td>
                      <td className="border border-slate-300 px-4 py-3 text-center font-bold text-red-800">-5~8%</td>
                      <td className="border border-slate-300 px-4 py-3 text-center font-bold text-green-800">-20~30%</td>
                      <td className="border border-slate-300 px-4 py-3 text-center text-slate-800">更快速、更冲动</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-100 border-l-4 border-green-600 p-4 rounded-r-lg">
                  <h4 className="font-bold text-green-900 mb-2">✅ 特征线性可分性</h4>
                  <p className="text-sm text-green-800">
                    PCA 可视化显示两类隐藏状态在高维空间中<strong>清晰可分</strong>，
                    逻辑回归分类器准确率达 <strong>85%+</strong>
                  </p>
                </div>
                <div className="bg-purple-100 border-l-4 border-purple-600 p-4 rounded-r-lg">
                  <h4 className="font-bold text-purple-900 mb-2">🎯 层选择性</h4>
                  <p className="text-sm text-purple-800">
                    自我反思特征主要集中在模型的<strong>中高层（Layer 15-25）</strong>，
                    底层更多编码语法和表面特征
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 结论 */}
          <section id="conclusion" className="mb-16">
            <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl shadow-lg p-8 border border-green-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-gradient-to-br from-green-200 to-green-300 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-green-700" />
                </div>
                <h2 className="text-2xl font-bold text-green-900">7. 结论与意义</h2>
              </div>

              <div className="bg-white rounded-xl p-6 mb-6 border border-green-300 shadow-sm">
                <p className="text-green-900 text-xl font-medium text-center">
                  🎉 <strong>核心结论</strong>：大型推理模型中的反思性词语是<br/>
                  <span className="text-2xl text-green-700 font-bold">真实能力的标志</span>，而非机械记忆！
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-4 bg-white p-5 rounded-xl border border-green-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl">✅</div>
                  <div>
                    <h4 className="font-bold text-green-900 text-lg">真实性验证</h4>
                    <p className="text-slate-700">
                      模型的反思行为由<strong className="text-green-700">特定的、可提取的内部线性特征</strong>控制，
                      而非随机生成或简单模仿训练数据中的文本模式
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white p-5 rounded-xl border border-green-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl">✅</div>
                  <div>
                    <h4 className="font-bold text-green-900 text-lg">因果性验证</h4>
                    <p className="text-slate-700">
                      通过干预实验证明了<strong className="text-green-700">因果关系</strong>：操纵这些特征会直接改变模型的反思行为，
                      而非仅仅是统计相关
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white p-5 rounded-xl border border-green-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl">✅</div>
                  <div>
                    <h4 className="font-bold text-green-900 text-lg">可控性验证</h4>
                    <p className="text-slate-700">
                      可以通过调整这些特征来灵活控制模型是<strong className="text-green-700">"深思熟虑"</strong>还是<strong className="text-green-700">"快速回答"</strong>，
                      这对解决模型"过度思考"或"思考不足"具有重要工程意义
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-green-300 shadow-sm">
                <h4 className="font-bold text-green-900 mb-4 flex items-center gap-2">
                  <span className="text-xl">🚀</span> 潜在应用场景
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h5 className="font-bold text-slate-800 mb-2">推理效率优化</h5>
                    <p className="text-sm text-slate-700">
                      在简单问题上<strong className="text-green-700">抑制过度反思</strong>，减少不必要的推理步骤，加速推理速度
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h5 className="font-bold text-slate-800 mb-2">推理质量提升</h5>
                    <p className="text-sm text-slate-700">
                      在复杂问题上<strong className="text-green-700">增强反思</strong>，让模型更谨慎地检验答案，提高准确率
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h5 className="font-bold text-slate-800 mb-2">自适应推理</h5>
                    <p className="text-sm text-slate-700">
                      根据问题难度<strong className="text-green-700">动态调节</strong>反思强度，实现效率和质量的最佳平衡
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h5 className="font-bold text-slate-800 mb-2">模型可解释性</h5>
                    <p className="text-sm text-slate-700">
                      为理解 LRM 的推理机制提供<strong className="text-green-700">可操作的视角</strong>，推动 AI 可解释性研究
                    </p>
                  </div>
                </div>
              </div>

              <BeginnerTip title="一句话总结这篇论文的贡献">
                这篇论文不仅回答了"LRM 的反思是真的吗"（是真的！），
                还找到了控制反思强度的"开关"，让我们能够根据需要让模型"多想想"或"快点答"！
              </BeginnerTip>
            </div>
          </section>

          {/* 页脚 */}
          <footer className="text-center pb-8">
            <div className="bg-gradient-to-r from-slate-100 to-slate-50 rounded-xl p-6 border border-slate-200">
              <p className="text-slate-600 mb-2">
                论文解读基于 ACL 2026 匿名投稿论文
              </p>
              <p className="text-slate-500 text-sm">
                "Are Reflective Words in Large Reasoning Models a Sign of Genuine Capability or Memorized Patterns?"
              </p>
              <div className="flex justify-center gap-4 mt-4">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">🥈 Second Author Work</span>
              </div>
            </div>
          </footer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReflectiveWords;
