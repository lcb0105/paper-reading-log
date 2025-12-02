import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  CheckCircle,
  Zap,
  TrendingUp
} from 'lucide-react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const LoRAPlusPaper = () => {
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
      const sections = ['abstract', 'intro', 'theory', 'solution', 'experiments', 'conclusion'];
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

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      
      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-sm z-50 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-medium hidden sm:inline">返回首页</span>
          </Link>
          
          <span className="text-xl font-bold text-indigo-600">LoRA+ 论文详解</span>

          <div className="hidden md:flex space-x-4 text-sm">
            {['theory', 'solution', 'experiments'].map((id) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`px-2 py-1 rounded transition-colors ${
                  activeSection === id 
                    ? 'text-indigo-600 bg-indigo-50' 
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                {id === 'theory' ? '理论' : id === 'solution' ? '方案' : '实验'}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="max-w-4xl mx-auto px-4 pt-24 pb-12">
        
        {/* 论文头部信息 */}
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            LoRA+: Efficient Low Rank Adaptation of Large Models
          </h1>
          <p className="text-lg text-gray-600">作者: Soufiane Hayou, Nikhil Ghosh, Bin Yu</p>
          <p className="text-sm text-gray-500 mt-2">发布于: ICML 2024</p>
        </header>

        {/* 摘要 */}
        <section id="abstract" className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200 mb-8 scroll-mt-28">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">摘要 (Abstract)</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            本文指出了原始的低秩适应（LoRA）方法在处理大宽度（Embedding Dimension）模型时会导致次优的微调效果。这是因为在标准 LoRA 中，适配器矩阵 <InlineMath math="A" /> 和 <InlineMath math="B" /> 使用相同的学习率进行更新。
          </p>
          <p className="text-gray-700 leading-relaxed">
            通过使用大宽度网络的缩放参数（Scaling Arguments），作者证明了使用相同的学习率无法实现高效的特征学习（Feature Learning）。作为修正，论文提出了 <strong>LoRA+</strong> 算法，其核心极其简单：<strong className="text-indigo-600">为矩阵 B 设置比矩阵 A 更高的学习率</strong>。实验表明，LoRA+ 在不增加计算成本的情况下，能提升模型性能（1%-2%）并将微调速度提升高达 2 倍。
          </p>
        </section>

        {/* 1. 背景介绍 */}
        <section id="intro" className="mb-12 scroll-mt-28">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-gray-200">1. 背景与问题定义</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            随着深度学习模型参数量的激增（数百亿甚至数千亿），全量微调（Full Finetuning）变得在计算上不可行。LoRA（Low Rank Adaptation）作为一种参数高效的微调方法，通过冻结预训练权重 <InlineMath math="W \in \mathbb{R}^{n \times n}" />，并引入低秩矩阵 <InlineMath math="A" /> 和 <InlineMath math="B" /> 来近似权重的更新。
          </p>
          
          <div className="bg-blue-50 p-5 rounded-xl border-l-4 border-blue-500">
            <h4 className="font-bold text-blue-700 mb-3">LoRA 的定义</h4>
            <p className="text-gray-700 mb-3">
              对于预训练权重 <InlineMath math="W" />，LoRA 将其更新约束为低秩分解形式：
            </p>
            <div className="bg-white rounded-lg p-3 mb-4 overflow-x-auto">
              <BlockMath math="W = W^* + \frac{\alpha}{r}BA" />
            </div>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
              <li><InlineMath math="W^*" />：冻结的预训练权重。</li>
              <li><InlineMath math="B \in \mathbb{R}^{n \times r}" />：初始化为 0。</li>
              <li><InlineMath math="A \in \mathbb{R}^{r \times n}" />：通常使用高斯分布初始化。</li>
              <li><InlineMath math="r \ll n" />：秩，通常很小（如 8 或 16）。</li>
            </ul>
          </div>
        </section>

        {/* 2. 理论分析 */}
        <section id="theory" className="mb-12 scroll-mt-28">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-gray-200">2. 理论分析：为什么标准 LoRA 是低效的？</h2>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            为了理解 LoRA 在大模型（宽度 <InlineMath math="n \to \infty" />）下的行为，作者使用了一个简化的"玩具模型"进行数学推导。
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 玩具模型 (Toy Model)</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            考虑一个线性模型，其中 <InlineMath math="W^*=0" />（简化假设），秩 <InlineMath math="r=1" />。此时模型简化为：
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6 overflow-x-auto text-center">
            <BlockMath math="f(x) = b(a^\top x)" />
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 核心公式推导</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            在一步梯度下降后，模型输出的变化量 <InlineMath math="\Delta f_t = f_t(x) - f_{t-1}(x)" /> 可以被分解为三项：
          </p>
          
          <div className="bg-gray-50 border-l-4 border-indigo-500 rounded-r-lg p-4 mb-6 overflow-x-auto">
            <BlockMath math="\Delta f_t \approx \underbrace{-\eta b_{t-1}^2 U_{t-1} \|x\|^2}_{\delta_t^1 \text{ (A的贡献)}} + \underbrace{-\eta (a_{t-1}^\top x)^2 U_{t-1}}_{\delta_t^2 \text{ (B的贡献)}} + \underbrace{\eta^2 \cdots}_{\delta_t^3}" />
          </div>

          {/* 详细推导 */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
            <h4 className="font-bold text-amber-800 mb-3 text-lg">详细推导过程 (Derivation)</h4>
            <p className="text-sm text-gray-700 mb-3">假设损失函数为 <InlineMath math="\mathcal{L} = \frac{1}{2}(f(x) - y)^2" />，且 <InlineMath math="U = (f(x) - y)" /> 为误差项。</p>
            
            <ol className="list-decimal list-inside text-gray-800 space-y-3 text-sm">
              <li>
                <strong>计算梯度：</strong><br/>
                对 b 求导：<InlineMath math="\frac{\partial \mathcal{L}}{\partial b} = U \cdot (a^\top x)" /><br/>
                对 a 求导：<InlineMath math="\frac{\partial \mathcal{L}}{\partial a} = U \cdot b \cdot x" />
              </li>
              <li>
                <strong>参数更新（梯度下降）：</strong><br/>
                <InlineMath math="b_t = b_{t-1} - \eta \cdot U_{t-1} (a_{t-1}^\top x)" /><br/>
                <InlineMath math="a_t = a_{t-1} - \eta \cdot U_{t-1} b_{t-1} x" />
              </li>
              <li>
                <strong>代入新模型计算：</strong> <InlineMath math="f_t(x) = b_t (a_t^\top x)" />，展开乘积并计算差值即可得到上述三项。
              </li>
            </ol>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-4">2.3 各项的物理含义</h3>
          <div className="space-y-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
              <h4 className="font-bold text-blue-800 mb-2"><InlineMath math="\delta_t^1" />: 矩阵 A 的更新贡献</h4>
              <p className="text-sm text-gray-700">代表<strong>固定 b 不变，仅更新 a</strong> 对模型输出的改变。</p>
              <p className="text-sm text-gray-600 mt-2">
                <strong>关键：</strong>包含 <InlineMath math="\|x\|^2" /> 因子（输入向量模平方，约为 <InlineMath math="\Theta(n)" />）。
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-500">
              <h4 className="font-bold text-green-800 mb-2"><InlineMath math="\delta_t^2" />: 矩阵 B 的更新贡献</h4>
              <p className="text-sm text-gray-700">代表<strong>固定 a 不变，仅更新 b</strong> 对模型输出的改变。</p>
              <p className="text-sm text-gray-600 mt-2">
                <strong>关键：</strong>包含 <InlineMath math="(a^\top x)^2" />（中间激活值，约为 <InlineMath math="\Theta(1)" />，不随 n 增大）。
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-4">2.4 核心冲突与直观推导</h3>
          <p className="text-gray-700 mb-4">
            通过<strong>量纲分析</strong>，看每一项随着模型宽度 <InlineMath math="n" /> 变大会发生什么：
          </p>

          <div className="space-y-4">
            {/* Step 1 */}
            <div className="bg-indigo-50 p-4 rounded-xl border-l-4 border-indigo-500">
              <h4 className="font-bold text-indigo-900 mb-2">Step 1: 识别关键项随 n 的变化</h4>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                <li><InlineMath math="\|x\|^2" /> (输入向量模平方): 约为 <strong className="text-indigo-700"><InlineMath math="\Theta(n)" /></strong></li>
                <li><InlineMath math="(a^\top x)^2" /> (中间激活值): 约为 <strong className="text-indigo-700"><InlineMath math="\Theta(1)" /></strong></li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="bg-red-50 p-4 rounded-xl border-l-4 border-red-500">
              <h4 className="font-bold text-red-900 mb-2">Step 2: 分析 A 的需求</h4>
              <p className="text-gray-700 text-sm mb-2">
                看 <InlineMath math="\delta_t^1" />：<InlineMath math="\approx -\eta_A \cdot b^2 \cdot U \cdot \|x\|^2" />
              </p>
              <p className="text-gray-600 text-sm">
                为保持稳定：<InlineMath math="\eta_A \times n \approx 1" />
              </p>
              <p className="font-bold text-red-700 mt-2 text-sm">
                推论：<InlineMath math="\eta_A" /> 必须非常小，约为 <InlineMath math="1/n" />
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-500">
              <h4 className="font-bold text-green-900 mb-2">Step 3: 分析 B 的需求</h4>
              <p className="text-gray-700 text-sm mb-2">
                看 <InlineMath math="\delta_t^2" />：<InlineMath math="\approx -\eta_B \cdot (a^\top x)^2 \cdot U" />
              </p>
              <p className="text-gray-600 text-sm">
                为让 B 有效学习：<InlineMath math="\eta_B \times 1 \approx 1" />
              </p>
              <p className="font-bold text-green-700 mt-2 text-sm">
                推论：<InlineMath math="\eta_B" /> 必须保持较大，约为 <InlineMath math="1" />
              </p>
            </div>

            {/* 结论 */}
            <div className="p-5 border-2 border-gray-800 rounded-xl bg-white">
              <p className="font-bold text-gray-900 text-lg mb-3">🎯 最终结论</p>
              <p className="text-gray-700 mb-3">
                如果像标准 LoRA 那样强制 <InlineMath math="\eta_A = \eta_B = \eta" />，就会陷入两难：
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm">
                <li>如果用 <InlineMath math="\eta \approx 1/n" />（照顾 A）：B 的更新项 <InlineMath math="\delta_t^2 \approx 0" />，<strong className="text-red-600">B 学不动</strong>。</li>
                <li>如果用 <InlineMath math="\eta \approx 1" />（照顾 B）：A 的更新项 <InlineMath math="\delta_t^1 \approx \infty" />，<strong className="text-red-600">A 梯度爆炸</strong>。</li>
              </ul>
              <p className="mt-3 text-indigo-700 font-bold">
                这就是为什么 LoRA+ 要让 <InlineMath math="\eta_B \gg \eta_A" />！
              </p>
            </div>
          </div>
        </section>

        {/* 3. LoRA+ 解决方案 */}
        <section id="solution" className="mb-12 scroll-mt-28">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-gray-200">3. 解决方案：LoRA+</h2>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            既然问题出在两项对 <InlineMath math="n" /> 的依赖不同，解决办法就是<strong>解耦学习率</strong>。
          </p>

          <div className="bg-green-50 p-6 rounded-xl border border-green-200 text-center mb-8">
            <p className="text-xl font-bold text-green-800 mb-3">LoRA+ 的核心公式</p>
            <div className="overflow-x-auto">
              <BlockMath math="\eta_A = \Theta(n^{-1}), \quad \eta_B = \Theta(1)" />
            </div>
            <p className="text-gray-600 text-left mt-4 text-sm">
              通过让 <InlineMath math="\eta_B" /> 远大于 <InlineMath math="\eta_A" />，我们可以让 <InlineMath math="\delta_t^2" />（B 的更新贡献）变大，同时让 <InlineMath math="\eta_A" /> 足够小以抵消 <InlineMath math="\delta_t^1" /> 中的 <InlineMath math="\|x\|^2" /> 因子。
            </p>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-4">算法实现</h3>
          <div className="bg-slate-800 text-white p-5 rounded-xl font-mono text-sm overflow-x-auto">
            <p className="text-gray-400 mb-2"># 定义两个超参数：基础学习率 lr 和比率 lambda</p>
            <p>ratio_lambda = 16  <span className="text-gray-400"># 推荐值</span></p>
            <p>learning_rate_A = lr</p>
            <p>learning_rate_B = ratio_lambda * lr</p>
            <br/>
            <p className="text-gray-400"># 在优化器中设置不同的参数组</p>
            <p>optimizer = AdamW([</p>
            <p className="pl-4">{`{'params': model.lora_A, 'lr': learning_rate_A},`}</p>
            <p className="pl-4">{`{'params': model.lora_B, 'lr': learning_rate_B}`}</p>
            <p>])</p>
          </div>
        </section>

        {/* 4. 实验结果 */}
        <section id="experiments" className="mb-12 scroll-mt-28">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-gray-200">4. 实验验证</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h4 className="font-bold text-lg text-gray-800">性能提升</h4>
              </div>
              <p className="text-gray-600 text-sm mb-3">在 GLUE 任务上，相比于标准 LoRA，LoRA+ 带来了一致的性能提升。</p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>RoBERTa-base (MNLI): 准确率提升约 <strong>1.2%</strong></li>
                <li>尤其在"困难"任务上提升更明显</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-yellow-500" />
                <h4 className="font-bold text-lg text-gray-800">训练速度</h4>
              </div>
              <p className="text-gray-600 text-sm mb-3">LoRA+ 显著加快了收敛速度。</p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>微调速度提升高达 <strong className="text-indigo-600">2 倍</strong></li>
                <li>无需额外的计算开销</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-4">不同模型上的最佳比率 λ</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">模型</th>
                  <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">初始化方式</th>
                  <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">最佳比率 (<InlineMath math="\eta_B / \eta_A" />)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3 px-4 border-b text-gray-800">RoBERTa / GPT-2</td>
                  <td className="py-3 px-4 border-b text-gray-600">B~O(1), A=0</td>
                  <td className="py-3 px-4 border-b text-indigo-600 font-bold">≈ 16</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b text-gray-800">Llama-7b</td>
                  <td className="py-3 px-4 border-b text-gray-600">B~O(1), A=0</td>
                  <td className="py-3 px-4 border-b text-indigo-600 font-bold">≈ 2 - 4</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. 结论 */}
        <section id="conclusion" className="bg-gray-100 p-6 md:p-8 rounded-xl mb-8 scroll-mt-28">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">5. 总结 (Conclusion)</h2>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span><strong>核心发现：</strong> 标准 LoRA 使用统一学习率导致特征学习效率随模型宽度增加而降低。</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span><strong>LoRA+ 方法：</strong> 简单地设置 <InlineMath math="\eta_B \gg \eta_A" />（通常 <InlineMath math="\lambda \approx 16" />）即可修正这一问题。</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span><strong>实践收益：</strong> 性能提升 1%-2%，训练速度提升 2 倍，无额外计算开销。</span>
            </li>
          </ul>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            基于论文: "LoRA+: Efficient Low Rank Adaptation of Large Models" | ICML 2024
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LoRAPlusPaper;



