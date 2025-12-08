import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, 
  Search, 
  MessageSquare, 
  Image as ImageIcon,
  Edit3,
  AlertTriangle,
  ShieldCheck,
  Zap,
  CheckCircle,
  Menu,
  X,
  ArrowLeft
} from 'lucide-react';

// --- Components ---
const MethodCard = ({ title, children, className = "" }) => (
  <div className={`bg-white p-6 rounded-lg border border-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${className}`}>
    <h4 className="font-bold text-slate-800 mb-2">{title}</h4>
    {children}
  </div>
);

const DetailBox = ({ findingTag, children }) => (
  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mt-2 text-sm text-slate-700">
    {findingTag && (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 mb-2">
        {findingTag}
      </span>
    )}
    <p>{children}</p>
  </div>
);

// --- Main Component ---
const MechInterpSurvey = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let current = 'intro';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 150) {
          current = section.getAttribute('id');
        }
      });
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsSidebarOpen(false);
  };

  const navItems = [
    { id: 'intro', label: '1. 引言与核心定义' },
    { id: 'taxonomy', label: '2. 分类体系 (Taxonomy)' },
    { id: 'models', label: '3. 模型架构深度解析' },
    { id: 'llm-methods', label: '4. 源自 LLM 的解释方法' },
    { id: 'mm-methods', label: '5. 多模态特有方法' },
    { id: 'applications', label: '6. 关键下游应用' },
    { id: 'challenges', label: '7. 挑战与展望' },
  ];

  const NavLink = ({ id, label, isSubItem = false }) => (
    <button
      onClick={() => handleNavClick(id)}
      className={`block w-full text-left px-4 py-2 text-sm font-medium rounded-md transition-colors ${
        activeSection === id 
          ? 'bg-blue-100 text-blue-700 border-r-4 border-blue-600' 
          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      } ${isSubItem ? 'text-xs pl-8 py-1' : ''}`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white border-b border-slate-200 p-4 sticky top-0 z-50 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-slate-600 hover:text-blue-600">
            <ArrowLeft size={20} />
          </Link>
          <span className="font-bold text-lg text-slate-800">论文深度解读</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-slate-600 focus:outline-none">
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </header>

      <div className="flex min-h-screen">
        {/* Sidebar Navigation */}
        <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 overflow-y-auto ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}>
          <div className="p-6">
            <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-4 transition-colors">
              <ArrowLeft size={18} />
              <span className="text-sm">返回首页</span>
            </Link>
            <div className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Paper Analysis</div>
            <h1 className="text-xl font-bold text-slate-900 mb-2 leading-tight">
              多模态基础模型的<br/>机械可解释性综述
            </h1>
            <p className="text-xs text-slate-500 mb-6">arXiv:2502.17516v1</p>
            
            <nav className="space-y-1">
              {navItems.map(item => (
                <NavLink key={item.id} id={item.id} label={item.label} />
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:ml-72 flex-1 w-full max-w-5xl mx-auto p-6 lg:p-12">
          
          {/* Intro Section */}
          <section id="intro" className="mb-16 scroll-mt-24">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-100 rounded-full">
              Abstract & Introduction
            </span>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-6">引言：机械可解释性的新前沿</h2>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
              <p className="text-lg text-slate-700 mb-6">
                随着基础模型的兴起，机器学习研究正在经历变革。虽然大型语言模型（LLM）的可解释性已取得显著进展，但<strong>多模态基础模型（MMFMs）</strong>——包括对比视觉语言模型（如CLIP）、生成式VLMs（如LLaVA）和文生图模型（如Stable Diffusion）——带来了超越单模态框架的独特挑战。
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-slate-50 p-5 rounded-lg border-l-4 border-indigo-500">
                  <h4 className="font-bold text-indigo-900 mb-2">核心定义 (Murdoch et al., 2019)</h4>
                  <p className="text-sm text-slate-700">
                    <strong>机械可解释性 (Mechanistic Interpretability)</strong> 指提取和阐明模型已学到的相关知识、机制、特征和关系的过程（无论是编码在参数中还是从输入模式中涌现），以解释模型"如何"以及"为什么"产生特定的输出。
                  </p>
                </div>
                <div className="bg-slate-50 p-5 rounded-lg border-l-4 border-rose-500">
                  <h4 className="font-bold text-rose-900 mb-2">多模态的独特挑战</h4>
                  <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                    <li><strong>跨模态交互：</strong>如何解释视觉特征与文本特征的融合机制？</li>
                    <li><strong>视觉语义的模糊性：</strong>相比离散的文本Token，连续的视觉嵌入更难赋予明确的语义标签。</li>
                    <li><strong>架构复杂性：</strong>涉及多种编码器（Vision Encoder, Text Encoder）和桥接模块（Q-Former, MLP）。</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Taxonomy Section */}
          <section id="taxonomy" className="mb-16 scroll-mt-24">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white mr-4">
                <Layers size={20} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">分类体系 (Taxonomy)</h2>
            </div>
            <p className="mb-6 text-slate-600">
              为了系统化现有研究，论文提出了一个<strong>三维分类法</strong>，这也是理解整篇综述的骨架。
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Dimension 1 */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 relative z-10">维度 1: 模型家族</h3>
                <p className="text-xs text-slate-500 mb-3 relative z-10">根据生成能力和模态交互方式分类</p>
                <ul className="space-y-2 text-sm text-slate-600 relative z-10">
                  <li className="flex items-start"><span className="font-semibold mr-2">1.</span> 非生成式 VLM (Contrastive, e.g., CLIP)</li>
                  <li className="flex items-start"><span className="font-semibold mr-2">2.</span> 生成式 VLM (Multimodal LLM, e.g., LLaVA)</li>
                  <li className="flex items-start"><span className="font-semibold mr-2">3.</span> 文生图模型 (Diffusion, e.g., Stable Diffusion)</li>
                </ul>
              </div>
              
              {/* Dimension 2 */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 relative z-10">维度 2: 解释技术来源</h3>
                <p className="text-xs text-slate-500 mb-3 relative z-10">区分技术的起源</p>
                <ul className="space-y-2 text-sm text-slate-600 relative z-10">
                  <li className="flex items-start"><span className="font-semibold mr-2">1.</span> <strong>LLM 适配方法：</strong> 如线性探测、因果追踪、Logit Lens。</li>
                  <li className="flex items-start"><span className="font-semibold mr-2">2.</span> <strong>多模态特有方法：</strong> 如交叉注意力分析、视觉特征文本化、网络解剖。</li>
                </ul>
              </div>
              
              {/* Dimension 3 */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 relative z-10">维度 3: 下游应用</h3>
                <p className="text-xs text-slate-500 mb-3 relative z-10">解释性带来的实际价值</p>
                <ul className="space-y-2 text-sm text-slate-600 relative z-10">
                  <li className="flex items-start"><CheckCircle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />模型编辑与控制</li>
                  <li className="flex items-start"><CheckCircle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />幻觉检测与缓解</li>
                  <li className="flex items-start"><CheckCircle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />安全、隐私与去偏</li>
                  <li className="flex items-start"><CheckCircle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />改善组合性 (Compositionality)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Models Section */}
          <section id="models" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">3. 模型架构深度解析</h2>
            <div className="space-y-6">
              {/* Non-Generative */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center mb-3">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3"><Search className="text-blue-600" size={20} /></div>
                  <h3 className="text-xl font-bold text-slate-800">非生成式 VLM (Contrastive VLMs)</h3>
                </div>
                <p className="text-slate-600 mb-4">主要用于图像-文本检索和零样本分类。</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-slate-50 p-4 rounded-lg">
                  <div>
                    <strong className="block text-slate-900 mb-1">典型架构：</strong>
                    <span className="text-slate-600">双塔结构（Two-Tower）。一个视觉编码器（如ViT）和一个文本编码器（如Transformer）。</span>
                  </div>
                  <div>
                    <strong className="block text-slate-900 mb-1">关键机制：</strong>
                    <span className="text-slate-600">对比损失（Contrastive Loss）。将成对的图像和文本映射到同一特征空间的临近位置。</span>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <strong className="block text-slate-900 mb-1">代表模型：</strong>
                    <span className="text-slate-600">CLIP, ALIGN, SigCLIP, FILIP</span>
                  </div>
                </div>
              </div>

              {/* Generative VLM */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center mb-3">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3"><MessageSquare className="text-purple-600" size={20} /></div>
                  <h3 className="text-xl font-bold text-slate-800">生成式 VLM (Multimodal LLMs)</h3>
                </div>
                <p className="text-slate-600 mb-4">具备视觉理解和文本生成能力，常用于VQA和Image Captioning。</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-slate-50 p-4 rounded-lg">
                  <div>
                    <strong className="block text-slate-900 mb-1">核心组件：</strong>
                    <ul className="list-disc list-inside text-slate-600 pl-1">
                      <li><strong>视觉编码器：</strong>通常是冻结的CLIP-ViT。</li>
                      <li><strong>LLM：</strong>负责推理和生成（如Llama, Vicuna）。</li>
                      <li><strong>桥接模块 (Bridge)：</strong>最关键的解释对象。</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="block text-slate-900 mb-1">桥接机制：</strong>
                    <ul className="list-disc list-inside text-slate-600 pl-1">
                      <li><strong>MLP Projection：</strong>如 LLaVA，简单的线性投影。</li>
                      <li><strong>Q-Former：</strong>如 BLIP-2，通过Query Transformer提取视觉特征。</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Text-to-Image */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center mb-3">
                  <div className="bg-orange-100 p-2 rounded-lg mr-3"><ImageIcon className="text-orange-600" size={20} /></div>
                  <h3 className="text-xl font-bold text-slate-800">文生图模型 (Diffusion Models)</h3>
                </div>
                <p className="text-slate-600 mb-4">基于扩散概率模型，将噪声还原为图像。</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-slate-50 p-4 rounded-lg">
                  <div>
                    <strong className="block text-slate-900 mb-1">架构细节：</strong>
                    <ul className="list-disc list-inside text-slate-600 pl-1">
                      <li><strong>U-Net / DiT：</strong>用于去噪的核心网络。</li>
                      <li><strong>Text Encoder：</strong>通常使用CLIP或T5来编码提示词。</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="block text-slate-900 mb-1">解释重点：</strong>
                    <span className="text-slate-600"><strong>Cross-Attention 层</strong>。这是文本条件（Prompt）注入到图像生成过程的入口，控制着"画什么"和"画在哪里"。</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* LLM Adapted Methods */}
          <section id="llm-methods" className="mb-16 scroll-mt-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-slate-900">4. 源自 LLM 的解释方法：适配与新发现</h2>
              <span className="px-3 py-1 text-xs font-semibold bg-purple-100 text-purple-700 rounded-full">适配与迁移</span>
            </div>
            
            {/* 4.1 & 4.2 */}
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-slate-800 mb-4 border-l-4 border-purple-500 pl-4">A. 诊断工具：探测与透镜</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <MethodCard title="1. 线性探测 (Linear Probing)">
                  <p className="text-sm text-slate-600 mb-3">通过在冻结层上训练简单分类器来检测特定概念（如句法、语义）的存在。</p>
                  <DetailBox findingTag="关键发现：层级角色的差异">
                    在LLM中，高层通常编码抽象语义。但在多模态模型中，研究发现<strong>中间层 (Intermediate Layers)</strong> 往往最有效地捕捉跨模态交互和全局语义，而顶层可能更关注局部细节或受文本偏见影响。
                  </DetailBox>
                </MethodCard>

                <MethodCard title="2. Logit 透镜 (Logit Lens)">
                  <p className="text-sm text-slate-600 mb-3">将中间层输出直接映射到词汇表，观察模型的"思考过程"。</p>
                  <DetailBox findingTag="创新变体：Attention Lens">
                    用于<strong>幻觉检测</strong>。研究表明，当模型产生幻觉（如描述不存在的物体）时，其对应的Token在关键层表现出较弱的注意力模式，且在Logit空间的预测轨迹会出现异常偏移。
                  </DetailBox>
                </MethodCard>
              </div>
            </div>

            {/* 4.3 & 4.4 */}
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-slate-800 mb-4 border-l-4 border-purple-500 pl-4">B. 因果干预与表征分解</h3>
              <div className="bg-white p-6 rounded-lg border border-slate-200 mb-6">
                <h4 className="font-bold text-slate-800 mb-2">3. 因果追踪 (Causal Tracing)</h4>
                <p className="text-sm text-slate-600 mb-4">通过向中间变量添加噪声再恢复，定位对输出有决定性影响的组件（如特定层或神经元）。</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-3 rounded">
                    <strong className="block text-xs font-bold text-slate-500 uppercase">LLM 中的发现</strong>
                    <p className="text-sm text-slate-700">事实性知识通常集中在中间层的 MLP 模块（FFN作为键值记忆）。</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded border border-purple-200">
                    <strong className="block text-xs font-bold text-purple-600 uppercase">多模态模型中的发现</strong>
                    <p className="text-sm text-slate-700">在文生图模型中，视觉属性（如风格）分散在U-Net的各个层中，但在<strong>条件文本编码器</strong>中可以精确定位到特定层。这为精确的模型编辑提供了可能。</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-2">4. 表征分解 (Representation Decomposition)</h4>
                <p className="text-sm text-slate-600 mb-3">利用Transformer的加性残差流特性，将输出分解为各层 Attention 和 MLP 的线性组合。</p>
                <DetailBox findingTag="技术细节">
                  这种方法在分析CLIP时尤为有效。研究者（如Gandelsman et al.）通过分解，将图像的最终[CLS] Token表示拆解为各个Attention Head的贡献，从而识别出哪些Head负责捕捉"颜色"、"位置"或"类别"信息。
                </DetailBox>
              </div>
            </div>

            {/* 4.5 & 4.6 & 4.7 */}
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4 border-l-4 border-purple-500 pl-4">C. 控制与细粒度分析</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MethodCard title="5. 通用任务向量 (Task Vectors)" className="!p-5">
                  <p className="text-xs text-slate-600">通过算术操作（如 <code className="bg-slate-100 px-1 rounded">V_new = V_base + alpha * V_task</code>）来干预模型行为。在多模态中，可用于控制生成图像的属性强度（如"更像梵高风格"）。</p>
                </MethodCard>
                <MethodCard title="6. 稀疏自编码器 (SAE)" className="!p-5">
                  <p className="text-xs text-slate-600"><strong>字典学习：</strong>无监督地将密集的激活向量分解为稀疏的、可解释的"概念方向"。这解决了"多义神经元"（Polysemanticity）问题，即一个神经元响应多个无关概念的现象。</p>
                </MethodCard>
                <MethodCard title="7. 神经元级分析" className="!p-5">
                  <p className="text-xs text-slate-600">寻找"多模态神经元"（Multimodal Neurons）。例如，在CLIP中发现了对"蜘蛛侠"这一概念在图像和文本模态下都能激活的单一神经元。</p>
                </MethodCard>
              </div>
            </div>
          </section>

          {/* Multimodal Specific Methods */}
          <section id="mm-methods" className="mb-16 scroll-mt-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-slate-900">5. 多模态特有方法：创新技术</h2>
              <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">原生与创新</span>
            </div>
            <div className="space-y-8">
              {/* Text Explanations */}
              <div className="border-l-4 border-green-500 pl-6 py-2">
                <h3 className="text-xl font-bold text-slate-800 mb-2">1. 内部嵌入的文本解释 (Text-Explanations)</h3>
                <p className="text-slate-600 mb-2">
                  视觉嵌入通常是一串难以理解的浮点数。研究者开发了方法将其"翻译"为人类语言。
                </p>
                <div className="bg-green-50 p-4 rounded-md mt-2">
                  <strong className="text-green-900 text-sm block mb-1">代表技术：TextSpan (Gandelsman et al., 2024)</strong>
                  <p className="text-sm text-green-800">
                    利用一个大规模的文本语料库，通过计算文本嵌入与模型内部组件（如Attention Head输出）的相似度，自动为该组件贴上标签。例如，发现第5层的第3个Head主要负责检测"红色物体"。
                  </p>
                </div>
              </div>

              {/* Network Dissection */}
              <div className="border-l-4 border-green-500 pl-6 py-2">
                <h3 className="text-xl font-bold text-slate-800 mb-2">2. 网络解剖 (Network Dissection)</h3>
                <p className="text-slate-600 mb-2">
                  传统的网络解剖将神经元激活图与分割数据集的类别Mask进行IoU匹配。
                </p>
                <div className="bg-slate-100 p-4 rounded-md mt-2">
                  <strong className="text-slate-900 text-sm block mb-1">多模态升级版：MILAN / DnD</strong>
                  <p className="text-sm text-slate-700">
                    现代方法不再依赖预定义的类别标签，而是利用<strong>生成式 VLM</strong>（如GPT-4V）直接观察高激活的图像区域，并生成自然语言描述。这使得我们可以发现模型学到的任何细粒度概念，而不局限于数据集的标签。
                  </p>
                </div>
              </div>

              {/* Cross-Attention */}
              <div className="border-l-4 border-green-500 pl-6 py-2">
                <h3 className="text-xl font-bold text-slate-800 mb-2">3. 交叉注意力机制分析 (Cross-Attention)</h3>
                <p className="text-slate-600 mb-2">
                  这是文生图模型可解释性的核心。Cross-Attention 矩阵 <code className="bg-slate-100 px-1 rounded">A = Softmax(Q_img * K_text^T)</code> 连接了图像的空间位置（Q）和文本的语义（K）。
                </p>
                <ul className="list-disc list-inside text-sm text-slate-700 mt-2 bg-white border border-slate-200 p-4 rounded-lg shadow-sm">
                  <li className="mb-2"><strong>空间布局控制：</strong>注意力图直接决定了Prompt中的单词（如"cat"）出现在图像的哪个位置。</li>
                  <li className="mb-2"><strong>属性绑定：</strong>通过分析注意力图，可以诊断"属性泄露"问题（例如"红色的车和蓝色的球"生成成"蓝色的车"）。</li>
                  <li><strong>应用：Prompt-to-Prompt 编辑。</strong>通过固定交叉注意力图，可以在更改Prompt（"换成一只狗"）的同时保持原图的构图和背景不变。</li>
                </ul>
              </div>

              {/* Data Attribution */}
              <div className="border-l-4 border-green-500 pl-6 py-2">
                <h3 className="text-xl font-bold text-slate-800 mb-2">4. 训练数据归因 (Training Data Attribution)</h3>
                <p className="text-slate-600 mb-2">
                  试图回答："是哪张训练图片导致模型生成了这个结果？" 这在版权保护和偏见分析中至关重要。
                </p>
                <div className="bg-slate-100 p-4 rounded-md mt-2 text-sm text-slate-700">
                  <strong>挑战与方案：</strong>
                  扩散模型的训练过程包含多个时间步（Timesteps），使得传统的影响函数（Influence Functions）计算量爆炸。
                  <ul className="list-disc list-inside mt-1 ml-2 text-slate-600">
                    <li><strong>TRAK：</strong> 将神经网络近似为线性模型来快速估算影响。</li>
                    <li><strong>Unlearning-based：</strong> 通过"遗忘"生成的图像并观察Loss变化来反推影响最大的训练样本。</li>
                  </ul>
                </div>
              </div>

              {/* Feature Visualizations */}
              <div className="border-l-4 border-green-500 pl-6 py-2">
                <h3 className="text-xl font-bold text-slate-800 mb-2">5. 特征可视化 (Feature Visualization)</h3>
                <p className="text-slate-600">
                  除了Grad-CAM等传统热力图方法，多模态领域还发展出了<strong>多模态交互可视化</strong>。例如，可视化VQA任务中，模型在回答问题时是如何在图像不同区域和问题文本不同单词之间分配注意力的。
                </p>
              </div>
            </div>
          </section>

          {/* Applications */}
          <section id="applications" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">6. 下游应用：解释性的价值落地</h2>
            <p className="mb-6 text-slate-600">机械可解释性不仅是为了"理解"，更是为了"控制"和"改进"。以下是具体的应用场景：</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* App 1 */}
              <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-indigo-200 rounded-full mr-3"><Edit3 className="text-indigo-700 w-5 h-5" /></div>
                  <h3 className="font-bold text-indigo-900">模型编辑 (Model Editing)</h3>
                </div>
                <p className="text-sm text-indigo-800 mb-3">
                  <strong>场景：</strong> 修正过时知识或改变生成风格。
                </p>
                <p className="text-xs text-indigo-600 bg-white p-3 rounded border border-indigo-100">
                  <strong>案例：</strong> 研究发现文生图模型中"艺术风格"存储在特定的Cross-Attention层中。通过修改这些层的Key/Value矩阵，可以将模型生成的"梵高风格"永久性地改变，而无需重新训练整个模型。
                </p>
              </div>

              {/* App 2 */}
              <div className="bg-red-50 rounded-xl p-6 border border-red-100">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-red-200 rounded-full mr-3"><AlertTriangle className="text-red-700 w-5 h-5" /></div>
                  <h3 className="font-bold text-red-900">幻觉检测</h3>
                </div>
                <p className="text-sm text-red-800 mb-3">
                  <strong>场景：</strong> 识别VLM描述了图片中不存在的物体。
                </p>
                <p className="text-xs text-red-600 bg-white p-3 rounded border border-red-100">
                  <strong>案例：</strong> 利用 <strong>Logit Lens</strong> 监控生成过程。如果模型在生成某个物体词（如"bicycle"）时，其中间层的置信度突然下降或注意力发散，这往往是幻觉的强烈信号。
                </p>
              </div>

              {/* App 3 */}
              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-emerald-200 rounded-full mr-3"><ShieldCheck className="text-emerald-700 w-5 h-5" /></div>
                  <h3 className="font-bold text-emerald-900">安全与去偏</h3>
                </div>
                <p className="text-sm text-emerald-800 mb-3">
                  <strong>场景：</strong> 移除NSFW概念或减少偏见。
                </p>
                <p className="text-xs text-emerald-600 bg-white p-3 rounded border border-emerald-100">
                  <strong>案例：</strong> 使用 <strong>SAE (稀疏自编码器)</strong> 提取出代表"暴力"或"色情"的特征方向，并在推理时抑制这些特征的激活（Feature Ablation），从而实现无监督的安全护栏。
                </p>
              </div>

              {/* App 4 */}
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-orange-200 rounded-full mr-3"><Layers className="text-orange-700 w-5 h-5" /></div>
                  <h3 className="font-bold text-orange-900">改善组合性</h3>
                </div>
                <p className="text-sm text-orange-800 mb-3">
                  <strong>场景：</strong> 解决属性绑定错误（Attribute Binding）。
                </p>
                <p className="text-xs text-orange-600 bg-white p-3 rounded border border-orange-100">
                  <strong>案例：</strong> 当用户输入"红色的猫"时，如果模型生成了红色的背景。可以通过干预 Cross-Attention map，强制"红色"这个词的注意力权重只聚焦在"猫"的像素区域上。
                </p>
              </div>

              {/* App 5 */}
              <div className="bg-cyan-50 rounded-xl p-6 border border-cyan-100">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-cyan-200 rounded-full mr-3"><Zap className="text-cyan-700 w-5 h-5" /></div>
                  <h3 className="font-bold text-cyan-900">高效上下文学习</h3>
                </div>
                <p className="text-sm text-cyan-800 mb-3">
                  <strong>场景：</strong> 压缩Prompt，提升推理速度。
                </p>
                <p className="text-xs text-cyan-600 bg-white p-3 rounded border border-cyan-100">
                  <strong>案例：</strong> 利用 <strong>Task Vectors</strong>。将Long Prompt（包含许多示例）产生的作用压缩成一个单一的向量，在推理时直接叠加到模型上，从而省去了处理长文本的开销。
                </p>
              </div>
            </div>
          </section>

          {/* Challenges */}
          <section id="challenges" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">7. 挑战与未来展望</h2>
            <div className="bg-white rounded-xl shadow-lg border-t-4 border-slate-600 p-8">
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-12 text-3xl font-bold text-slate-300">01</div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg">缺乏统一的评估基准 (Benchmarks)</h4>
                    <p className="text-slate-600 text-sm mt-1">目前各个研究使用的数据集和评估指标非常碎片化。社区急需像 NLP 领域那样的标准测试集，来量化不同解释方法的忠实度（Faithfulness）和效用。</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-12 text-3xl font-bold text-slate-300">02</div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg">新架构的跟进滞后</h4>
                    <p className="text-slate-600 text-sm mt-1">
                      现有的解释多集中在基于 U-Net 的 Stable Diffusion 和早期的 LLaVA。对于最新的 <strong>Diffusion Transformers (DiT, 如Sora)</strong>、统一多模态模型（如Chameleon）以及 <strong>Mamba</strong> 架构，机械解释性研究还很空白。
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-12 text-3xl font-bold text-slate-300">03</div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg">数据归因的计算效率</h4>
                    <p className="text-slate-600 text-sm mt-1">
                      在大规模多模态预训练数据（通常数十亿级别）上进行精确的数据归因仍然极度昂贵。开发无需重新训练（Retraining-free）的高效估算方法是未来的重点。
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-12 text-3xl font-bold text-slate-300">04</div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg">从组件到电路 (Circuits)</h4>
                    <p className="text-slate-600 text-sm mt-1">
                      目前的分析多停留在单个神经元或层级。未来的方向是识别完整的<strong>跨模态电路（Cross-Modal Circuits）</strong>——即跨越视觉和文本编码器、由多个组件协同工作的子图，来实现特定任务（如视觉推理）。
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center py-12 border-t border-slate-200 mt-12">
            <p className="text-slate-500 mb-2">Based on the paper: "A Survey on Mechanistic Interpretability for Multi-Modal Foundation Models"</p>
            <p className="text-slate-400 text-sm">arXiv:2502.17516v1</p>
          </footer>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default MechInterpSurvey;






