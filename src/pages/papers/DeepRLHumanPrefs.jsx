import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  Brain, 
  Target, 
  Code, 
  Cpu, 
  Lightbulb, 
  GitBranch, 
  Activity,
  CheckCircle2
} from 'lucide-react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const DeepRLHumanPrefs = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      {/* 1. 固定顶部导航栏 */}
      <nav className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm text-white z-50 shadow-lg border-b border-slate-700">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="p-2 hover:bg-slate-800 rounded-full transition-colors duration-200"
              title="返回首页"
            >
              <ArrowLeft size={20} />
            </Link>
            <span className="font-semibold text-lg hidden md:block text-slate-200">
              论文深度解析
            </span>
          </div>
          
          <div className="flex space-x-1 md:space-x-4 text-sm">
            {[
              { id: 'intro', label: '简介' },
              { id: 'method', label: '核心方法' },
              { id: 'math', label: '数学原理' },
              { id: 'experiments', label: '实验结果' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-3 py-1.5 hover:bg-slate-700 rounded-md transition-colors duration-200 text-slate-300 hover:text-white"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* 2. Header 区域 */}
      <header className="pt-32 pb-16 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-50 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1 mb-6">
            <span className="bg-blue-500 w-2 h-2 rounded-full animate-pulse"></span>
            <span className="text-blue-200 text-xs font-medium">NIPS 2017</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">
            Deep Reinforcement Learning from Human Preferences
          </h1>
          <h2 className="text-xl md:text-2xl text-slate-300 mb-8 font-light">
            基于人类偏好的深度强化学习
          </h2>
          
          <div className="flex flex-wrap justify-center gap-3 text-sm text-slate-400 mb-8">
            <span className="px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700">OpenAI</span>
            <span className="px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700">DeepMind</span>
            <span className="px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700">arXiv:1706.03741</span>
          </div>

          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Paul F Christiano, Miljan Martic, Jan Leike, Shane Legg, Tom B Brown, Dario Amodei
          </p>
        </div>
      </header>

      {/* 3. Main 内容区域 */}
      <main className="container mx-auto px-4 max-w-4xl pb-24 space-y-12">
        
        {/* Abstract / Summary */}
        <section id="intro" className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 scroll-mt-24">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-blue-50 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">核心摘要与背景</h2>
          </div>
          
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              在传统的强化学习（RL）中，智能体（Agent）通常依赖于一个定义明确的奖励函数（Reward Function）来学习。然而，在许多复杂的现实任务中（如"把鸡蛋炒好"或"清理桌子"），很难用数学公式精确地写出一个奖励函数。
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <h3 className="flex items-center font-semibold text-blue-900 mb-2">
                <Target className="w-4 h-4 mr-2" />
                核心问题
              </h3>
              <p className="text-blue-800">
                如何让强化学习系统在没有明确奖励函数的情况下，解决复杂的任务？
              </p>
            </div>

            <p>
              <strong className="text-slate-900">本文的解决方案：</strong> 通过让非专家的人类用户对一段段智能体的行为视频进行比较（Preference），来学习一个奖励函数，进而指导强化学习。
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-4">
              {[
                { title: '低成本', desc: '只需极少的人类反馈（<1%）', icon: <Activity className="w-4 h-4" /> },
                { title: '灵活性', desc: '完成难以代码描述的目标', icon: <GitBranch className="w-4 h-4" /> },
                { title: '高性能', desc: 'Atari/MuJoCo 表现出色', icon: <CheckCircle2 className="w-4 h-4" /> }
              ].map((item, i) => (
                <div key={i} className="flex flex-col p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="flex items-center font-semibold text-slate-800 mb-1">
                    {item.icon} <span className="ml-2">{item.title}</span>
                  </div>
                  <span className="text-sm text-slate-500">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Method Section */}
        <section id="method" className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 scroll-mt-24">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">方法论：三进程循环</h2>
          </div>

          <p className="mb-8 text-slate-600">
            系统通过三个异步运行的进程来工作，形成一个闭环：
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 hover:border-purple-200 transition-colors">
              <div className="text-lg font-bold text-purple-600 mb-3 flex items-center">
                <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs mr-2">1</span>
                策略优化
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                智能体与环境交互。它使用传统的RL算法（如A2C或TRPO）来最大化 <strong>预测的奖励</strong> <InlineMath math="\hat{r}" />。
              </p>
            </div>
            
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 hover:border-purple-200 transition-colors">
              <div className="text-lg font-bold text-purple-600 mb-3 flex items-center">
                <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs mr-2">2</span>
                偏好收集
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                系统从交互中切出两段短视频片段（trajectory segments），展示给人类。人类选择看起来"更好"的那一段。
              </p>
            </div>
            
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 hover:border-purple-200 transition-colors">
              <div className="text-lg font-bold text-purple-600 mb-3 flex items-center">
                <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs mr-2">3</span>
                奖励建模
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                使用监督学习，更新神经网络 <InlineMath math="\hat{r}" />，使其预测结果符合人类的比较偏好。
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-dashed border-slate-300 rounded-lg p-4 text-center text-sm text-slate-500 font-medium">
            数据流向：
            策略 <InlineMath math="\pi" /> <span className="text-slate-300 mx-1">→</span> 
            轨迹 <InlineMath math="\tau" /> <span className="text-slate-300 mx-1">→</span> 
            人类比较 <InlineMath math="(\sigma^1 > \sigma^2)" /> <span className="text-slate-300 mx-1">→</span> 
            奖励模型 <InlineMath math="\hat{r}" /> <span className="text-slate-300 mx-1">→</span> 
            策略 <InlineMath math="\pi" />
          </div>
        </section>

        {/* Mathematics Section */}
        <section id="math" className="bg-white rounded-xl shadow-sm border border-indigo-100 p-6 md:p-8 scroll-mt-24 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
          
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Code className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">数学原理详解</h2>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center">
                1. 轨迹片段 (Trajectory Segment)
              </h3>
              <p className="text-slate-600 mb-3">
                一个轨迹片段 <InlineMath math="\sigma" /> 是观测值和动作的序列：
              </p>
              <div className="bg-slate-50 rounded-lg border border-slate-200 p-4 overflow-x-auto">
                <BlockMath math="\sigma = \left( (o_0, a_0), (o_1, a_1), \dots, (o_{k-1}, a_{k-1}) \right) \in (\mathcal{O} \times \mathcal{A})^k" />
              </div>
              <p className="text-xs text-slate-400 mt-2 text-center">
                其中 <InlineMath math="o" /> 是观测，<InlineMath math="a" /> 是动作，<InlineMath math="k" /> 是片段长度。
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                2. 偏好预测模型 (Bradley-Terry Model)
              </h3>
              <p className="text-slate-600 mb-3">
                论文使用 <strong>Bradley-Terry 模型</strong> 假设人类偏好 <InlineMath math="\sigma^1" /> 的概率与累积奖励的指数成正比：
              </p>
              <div className="bg-slate-50 rounded-lg border border-slate-200 p-4 overflow-x-auto">
                <BlockMath math="\hat{P}[\sigma^1 > \sigma^2] = \frac{\exp \left( \sum_{t} \hat{r}(o_t^1, a_t^1) \right)}{\exp \left( \sum_{t} \hat{r}(o_t^1, a_t^1) \right) + \exp \left( \sum_{t} \hat{r}(o_t^2, a_t^2) \right)}" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                3. 损失函数 (Loss Function)
              </h3>
              <p className="text-slate-600 mb-3">
                通过最小化交叉熵损失来训练奖励函数 <InlineMath math="\hat{r}" />：
              </p>
              <div className="bg-slate-50 rounded-lg border border-slate-200 p-4 overflow-x-auto">
                <BlockMath math="loss(\hat{r}) = - \sum_{(\sigma^1, \sigma^2, \mu) \in \mathcal{D}} \left( \mu(1) \log \hat{P}[\sigma^1 > \sigma^2] + \mu(2) \log \hat{P}[\sigma^2 > \sigma^1] \right)" />
              </div>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
              <h4 className="font-bold text-amber-800 mb-2 text-sm uppercase tracking-wide">技术细节补充</h4>
              <ul className="list-disc list-inside text-sm text-amber-800/80 space-y-1">
                <li><strong>Ensemble：</strong> 训练多个奖励预测器并取平均，以稳定训练。</li>
                <li><strong>L2 正则化：</strong> 防止奖励函数过拟合。</li>
                <li><strong>Label Smoothing：</strong> 假设人类有10%的概率随机选择。</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Experiments Section */}
        <section id="experiments" className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 scroll-mt-24">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <Cpu className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">实验与结果</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
              <h3 className="font-bold text-lg text-slate-800 mb-2">MuJoCo 机器人控制</h3>
              <p className="text-sm text-slate-500 mb-3">任务：Hopper, Walker, Cheetah 等</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                使用约 700 次人类查询（Query），就能达到与基于真实奖励函数训练的 RL 相当的性能。在 Ant 任务中，人类反馈甚至优于原生奖励函数。
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
              <h3 className="font-bold text-lg text-slate-800 mb-2">Atari 游戏</h3>
              <p className="text-sm text-slate-500 mb-3">任务：Pong, Breakout, Space Invaders 等</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                即使奖励函数非常稀疏或复杂，通过人类偏好也能学会玩游戏。例如在 Enduro 赛车游戏中，通过人类反馈学会了超越车辆。
              </p>
            </div>
          </div>

          <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
            <h3 className="font-bold text-lg text-indigo-900 mb-4 flex items-center">
              <Lightbulb className="w-5 h-5 mr-2 text-indigo-600" />
              亮点：新颖行为的学习 (Novel Behaviors)
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-50">
                <span className="font-bold text-indigo-600 block mb-2">后空翻 (Backflip)</span>
                <p className="text-sm text-slate-600">
                  Hopper 机器人学会了在原地做完美的后空翻，并平稳着地。这仅仅用了一个小时的人类反馈训练。
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-50">
                <span className="font-bold text-indigo-600 block mb-2">单腿行驶</span>
                <p className="text-sm text-slate-600">
                  Half-Cheetah 机器人学会了用单腿保持平衡并前进。
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 4. Footer 区域 */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2 font-medium text-slate-300">Deep Reinforcement Learning from Human Preferences</p>
          <p className="text-sm opacity-60">Based on the NIPS 2017 paper by OpenAI & DeepMind</p>
        </div>
      </footer>
    </div>
  );
};

export default DeepRLHumanPrefs;
