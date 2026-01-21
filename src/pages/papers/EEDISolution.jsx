import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Brain, Database, Target, BarChart2, AlertTriangle, Pickaxe, Layers, CheckCircle, Trophy, Code, Settings, Filter, Play, Zap, Cpu, GitMerge, Image, MessageSquare, Shuffle, Award } from 'lucide-react';

const EEDISolution = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // 检测系统偏好
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      setIsDark(false);
    }
  }, []);

  const toggleDark = () => setIsDark(!isDark);

  // 处理导航点击滚动（考虑固定导航栏高度）
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 64; // 导航栏高度
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-slate-900 text-slate-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navigation */}
      <nav className={`fixed w-full z-50 backdrop-blur-md border-b ${isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white/70 border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className={`flex items-center gap-2 ${isDark ? 'text-slate-400 hover:text-indigo-400' : 'text-gray-600 hover:text-indigo-600'} transition-colors`}>
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">返回首页</span>
            </Link>
            <div className="flex-shrink-0 flex items-center gap-2">
              <Brain className={`h-8 w-8 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
              <span className="font-bold text-xl tracking-tight">EEDI Solution</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <button onClick={(e) => scrollToSection(e, 'overview')} className={`hover:text-indigo-500 transition ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>总览</button>
              <button onClick={(e) => scrollToSection(e, 'data')} className={`hover:text-indigo-500 transition ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>数据工程</button>
              <button onClick={(e) => scrollToSection(e, 'biencoder')} className={`hover:text-indigo-500 transition ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>BiEncoder</button>
              <button onClick={(e) => scrollToSection(e, 'training')} className={`hover:text-indigo-500 transition ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>训练策略</button>
              <button onClick={(e) => scrollToSection(e, 'fusion')} className={`hover:text-indigo-500 transition ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>多模型融合</button>
            </div>
            <button onClick={toggleDark} className={`p-2 rounded-full transition ${isDark ? 'hover:bg-slate-800' : 'hover:bg-gray-200'}`}>
              {isDark ? (
                <svg className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="overview" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <span className={`px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block ${isDark ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-800'}`}>
          Kaggle Competition 🥉 Bronze Medal
        </span>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          EEDI - Mining Misconceptions <br />
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            in Mathematics
          </span>
        </h1>

        {/* Competition Introduction Block */}
        <div className={`mt-8 mb-12 text-left max-w-4xl mx-auto backdrop-blur-md rounded-2xl p-8 border shadow-xl ${isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-white/60 border-gray-200'}`}>
          <div className={`flex items-center gap-3 mb-4 border-b pb-4 ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
            <Trophy className="text-yellow-500 w-7 h-7" />
            <h2 className="text-2xl font-bold">比赛背景与任务说明</h2>
          </div>

          <p className={`text-base md:text-lg leading-relaxed mb-6 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
            本次 Kaggle 比赛由教育科技公司 <strong>Eedi</strong> 主办。Eedi 拥有全球最大的数学诊断问题库，但在标记学生错误选项背后的"概念误区（Misconception）"方面面临挑战。比赛的目标是开发一个 NLP 模型，能够<strong>自动预测学生选择某个错误选项背后的具体数学误解</strong>。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className={`p-4 rounded-xl border ${isDark ? 'bg-indigo-900/30 border-indigo-800' : 'bg-indigo-50 border-indigo-100'}`}>
              <div className="flex items-center gap-2 mb-2">
                <Target className={`w-5 h-5 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
                <span className={`font-bold text-base ${isDark ? 'text-indigo-300' : 'text-indigo-700'}`}>核心任务</span>
              </div>
              <p className={isDark ? 'text-slate-400' : 'text-gray-600'}>
                这是一个 <strong>Retrieval & Ranking</strong> 任务。给定一道题目（Question）和错误的选项（Distractor），模型需要从 2500+ 个候选误解库中，检索并排序出最能解释该错误的 MisconceptionId。
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${isDark ? 'bg-pink-900/30 border-pink-800' : 'bg-pink-50 border-pink-100'}`}>
              <div className="flex items-center gap-2 mb-2">
                <BarChart2 className={`w-5 h-5 ${isDark ? 'text-pink-400' : 'text-pink-600'}`} />
                <span className={`font-bold text-base ${isDark ? 'text-pink-300' : 'text-pink-700'}`}>评价指标</span>
              </div>
              <p className={isDark ? 'text-slate-400' : 'text-gray-600'}>
                <strong>MAP@25</strong> (Mean Average Precision at 25)。模型需要为每个样本提交最多 25 个预测结果，如果正确答案在列表中越靠前，得分越高。
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${isDark ? 'bg-blue-900/30 border-blue-800' : 'bg-blue-50 border-blue-100'}`}>
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                <span className={`font-bold text-base ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>主要挑战</span>
              </div>
              <p className={isDark ? 'text-slate-400' : 'text-gray-600'}>
                <strong>Unseen Misconceptions</strong>。测试集中包含训练集中从未出现过的误解，模型必须具备强大的泛化能力，理解数学语义而非死记硬背。
              </p>
            </div>
          </div>
        </div>

        <p className={`max-w-2xl mx-auto text-xl mb-10 ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
          本方案基于 Qwen2.5-14B 大语言模型。通过合成数据增强、难负例挖掘 (Hard Negative Mining) 和 QLoRA 高效微调，构建了一套高精度的误解检索系统。
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
          <div className={`p-6 rounded-2xl shadow-lg hover:transform hover:-translate-y-1 transition duration-300 backdrop-blur border ${isDark ? 'bg-slate-800/70 border-slate-700' : 'bg-white/70 border-gray-200'}`}>
            <div className={`h-12 w-12 rounded-lg flex items-center justify-center mb-4 mx-auto ${isDark ? 'bg-blue-900' : 'bg-blue-100'}`}>
              <Database className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <h3 className="font-bold text-lg mb-2">数据增强</h3>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>使用 GPT-4 生成合成数据，扩充训练样本。</p>
          </div>

          <div className={`p-6 rounded-2xl shadow-lg hover:transform hover:-translate-y-1 transition duration-300 backdrop-blur border ${isDark ? 'bg-slate-800/70 border-slate-700' : 'bg-white/70 border-gray-200'}`}>
            <div className={`h-12 w-12 rounded-lg flex items-center justify-center mb-4 mx-auto ${isDark ? 'bg-purple-900' : 'bg-purple-100'}`}>
              <Zap className={`w-6 h-6 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
            </div>
            <h3 className="font-bold text-lg mb-2">Qwen2.5-14B</h3>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>DeepSpeed Zero2 + QLoRA 微调，平衡显存与性能。</p>
          </div>

          <div className={`p-6 rounded-2xl shadow-lg hover:transform hover:-translate-y-1 transition duration-300 backdrop-blur border ${isDark ? 'bg-slate-800/70 border-slate-700' : 'bg-white/70 border-gray-200'}`}>
            <div className={`h-12 w-12 rounded-lg flex items-center justify-center mb-4 mx-auto ${isDark ? 'bg-pink-900' : 'bg-pink-100'}`}>
              <Filter className={`w-6 h-6 ${isDark ? 'text-pink-400' : 'text-pink-600'}`} />
            </div>
            <h3 className="font-bold text-lg mb-2">难负例挖掘</h3>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>挖掘 Hard Negatives 提升模型排序判别力。</p>
          </div>
        </div>
      </section>

      {/* Data Engineering */}
      <section id="data" className={`py-20 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Database className="text-indigo-500 w-8 h-8" />
                数据工程 Pipeline
              </h2>
              <p className={`mb-6 leading-relaxed ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                为了解决数据稀缺和分布不均的问题，我们构建了一个强大的数据处理管道。核心不仅在于清洗，更在于利用 LLM 生成高质量的合成数据。
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center font-bold ${isDark ? 'bg-green-900 text-green-400' : 'bg-green-100 text-green-600'}`}>1</div>
                  <div>
                    <h4 className="font-bold text-lg">GPT-4V 合成数据 (Data Augmentation)</h4>
                    <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                      对应文件: <code className={`px-1 py-0.5 rounded text-xs ${isDark ? 'bg-slate-700' : 'bg-gray-100'}`}>gpt_data.ipynb</code><br />
                      调用 GPT-4V API 处理数学题目截图，提取结构化信息：Question、Answers (A/B/C/D)、Subject、Construct、CorrectAnswer。批量处理 869 张图片扩充训练集。
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center font-bold ${isDark ? 'bg-yellow-900 text-yellow-400' : 'bg-yellow-100 text-yellow-600'}`}>2</div>
                  <div>
                    <h4 className="font-bold text-lg">5-Fold GroupKFold 切分</h4>
                    <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                      对应文件: <code className={`px-1 py-0.5 rounded text-xs ${isDark ? 'bg-slate-700' : 'bg-gray-100'}`}>new_merge.ipynb</code><br />
                      使用 <strong>GroupKFold</strong> 按 QuestionId 分组，确保同一道题的不同错误选项不会同时出现在训练集和验证集中，防止数据泄露。
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center font-bold ${isDark ? 'bg-purple-900 text-purple-400' : 'bg-purple-100 text-purple-600'}`}>3</div>
                  <div>
                    <h4 className="font-bold text-lg">Query Template 设计</h4>
                    <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                      结构化 Prompt 格式：<br />
                      <code className={`text-xs ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                        ###question###: Subject-Construct-QuestionText<br />
                        ###Correct Answer###: CorrectText<br />
                        ###Misconcepte Incorrect answer###: WrongText
                      </code>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`w-full md:w-1/2 rounded-xl p-6 border font-mono text-sm overflow-x-auto ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-gray-100 border-gray-200'}`}>
              <div className={`flex items-center gap-2 mb-4 ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2">gpt_data.ipynb - GPT-4V Prompt</span>
              </div>
              <pre className={isDark ? 'text-blue-400' : 'text-blue-600'}>
{`PROMPT = """Identify the mathematical 
problem in the image, output:
- Question: Complete problem description
- Answers: A:[Text] # B:[Text] # C:[Text] # D:[Text]
- Subject: Category of the problem
- Construct: Most granular knowledge level
- CorrectAnswer: Which option is correct
"""

# Process 869 images with GPT-4V
for image_file in tqdm(image_files):
    base64_image = encode_image(str(image_file))
    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=[{
            "role": "user",
            "content": [
                {"type": "text", "text": PROMPT},
                {"type": "image_url", "image_url": {
                    "url": f"data:image/jpeg;base64,{base64_image}"
                }}
            ]
        }],
        max_tokens=300
    )`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* GPT Data Statistics */}
      <section className={`py-12 ${isDark ? 'bg-slate-800/50' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Image className={`w-6 h-6 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
            数据统计与 Token 长度分析
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={`p-4 rounded-xl text-center ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'}`}>
              <div className="text-3xl font-bold text-indigo-500">5,446</div>
              <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>训练样本数（含合成）</div>
            </div>
            <div className={`p-4 rounded-xl text-center ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'}`}>
              <div className="text-3xl font-bold text-pink-500">2,587</div>
              <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>候选误解数</div>
            </div>
            <div className={`p-4 rounded-xl text-center ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'}`}>
              <div className="text-3xl font-bold text-green-500">~130</div>
              <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Query 平均 Token 数</div>
            </div>
            <div className={`p-4 rounded-xl text-center ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'}`}>
              <div className="text-3xl font-bold text-amber-500">~62</div>
              <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Passage 平均 Token 数</div>
            </div>
          </div>
        </div>
      </section>

      {/* BiEncoder Architecture */}
      <section id="biencoder" className={`py-20 ${isDark ? 'bg-slate-900/50' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">BiEncoder 双塔模型架构</h2>
            <p className={`max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
              基于 Qwen2.5-14B 构建的检索模型，采用 Last Token Pooling + In-Batch Negatives 训练策略。
            </p>
          </div>

          {/* Architecture Diagram */}
          <div className={`p-8 rounded-2xl mb-12 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Cpu className={`w-6 h-6 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
              BiEncoderModel 架构详解
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className={`font-bold mb-3 ${isDark ? 'text-indigo-300' : 'text-indigo-700'}`}>核心组件</h4>
                <div className="space-y-3">
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-slate-900' : 'bg-gray-100'}`}>
                    <div className="font-mono text-sm text-green-500">Last Token Pooling</div>
                    <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                      提取序列<strong>最后一个 Token</strong> 的隐藏状态作为句子表示，适合自回归 LLM。
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-slate-900' : 'bg-gray-100'}`}>
                    <div className="font-mono text-sm text-pink-500">In-Batch Negatives</div>
                    <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                      同一 Batch 内的其他正样本作为负样本，极大提升训练效率。
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-slate-900' : 'bg-gray-100'}`}>
                    <div className="font-mono text-sm text-amber-500">Temperature Scaling</div>
                    <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                      使用 <code>temperature=0.02</code> 对 Cosine Similarity 进行缩放，增强区分度。
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-slate-900' : 'bg-gray-100'}`}>
                    <div className="font-mono text-sm text-cyan-500">Cross-Device Negatives</div>
                    <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                      启用 <code>negatives_cross_device=True</code>，跨 GPU 收集负样本。
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className={`font-bold mb-3 ${isDark ? 'text-pink-300' : 'text-pink-700'}`}>QLoRA 配置详情</h4>
                <div className={`rounded-lg p-4 font-mono text-xs ${isDark ? 'bg-slate-900 text-slate-300' : 'bg-gray-100 text-gray-700'}`}>
                  <pre>
{`LoraConfig(
    r=64,              # LoRA rank
    lora_alpha=128,    # Alpha scaling
    target_modules=[
        "q_proj", "k_proj", "v_proj",
        "o_proj", "gate_proj",
        "up_proj", "down_proj"
    ],
    bias="none",
    lora_dropout=0.05,
    task_type="CAUSAL_LM"
)

# 4-bit Quantization (NF4)
BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.bfloat16
)`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Hard Negative Mining */}
            <div className={`p-8 rounded-2xl relative overflow-hidden backdrop-blur border ${isDark ? 'bg-slate-800/70 border-slate-700' : 'bg-white/70 border-gray-200'}`}>
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-purple-500 opacity-10 rounded-full blur-2xl"></div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Pickaxe className="text-purple-500 w-6 h-6" />
                Hard Negative Mining
              </h3>
              <div className={`mb-4 text-sm font-mono ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                File: new_mining.py
              </div>
              <p className={`mb-6 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                在训练检索模型之前，先使用基座模型对所有误解点进行一次粗排，找出<strong>得分高但实际错误</strong>的 Hard Negatives。
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>编码所有 Query 和 Misconception Candidates</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>计算 Cosine Similarity 并取 Top-200</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>移除正样本，剩余作为 Hard Negatives</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>训练时随机采样 train_group_size-1 个负样本</span>
                </li>
              </ul>

              <div className={`rounded-lg p-4 text-xs font-mono ${isDark ? 'bg-slate-900 text-slate-300' : 'bg-gray-100 text-gray-700'}`}>
{`# 移除正样本
train_df['new_had_recall_pids'] = list(
    map(lambda x, y: do(x, y), 
        train_df['new_had_recall_pids'], 
        train_df['answer_id'])
)`}
              </div>
            </div>

            {/* Loss Function */}
            <div className={`p-8 rounded-2xl relative overflow-hidden backdrop-blur border ${isDark ? 'bg-slate-800/70 border-slate-700' : 'bg-white/70 border-gray-200'}`}>
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-500 opacity-10 rounded-full blur-2xl"></div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Target className="text-blue-500 w-6 h-6" />
                训练目标：对比学习损失
              </h3>
              
              <p className={`mb-6 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                使用 <strong>CrossEntropyLoss</strong> 进行 In-Batch 对比学习，正样本位置为对角线。
              </p>

              <div className={`rounded-lg p-4 mb-4 ${isDark ? 'bg-slate-900' : 'bg-gray-100'}`}>
                <div className={`text-center font-serif text-lg ${isDark ? 'text-slate-200' : 'text-gray-800'}`}>
                  scores = (q_reps @ p_reps.T) / τ
                </div>
                <div className={`text-center text-xs mt-2 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                  τ = 0.02 (temperature)
                </div>
              </div>

              <div className={`rounded-lg p-4 text-xs font-mono ${isDark ? 'bg-slate-900 text-slate-300' : 'bg-gray-100 text-gray-700'}`}>
{`# Target: 每个 query 的正样本在 group 中的位置
target = torch.arange(scores.size(0)) * group_size
loss = CrossEntropyLoss(scores, target)

# Group Size: 1 正样本 + 7 负样本 = 8`}
              </div>

              <div className={`mt-4 p-3 rounded-lg border ${isDark ? 'bg-indigo-900/30 border-indigo-700' : 'bg-indigo-50 border-indigo-200'}`}>
                <div className={`text-sm ${isDark ? 'text-indigo-300' : 'text-indigo-700'}`}>
                  <strong>💡 关键洞察：</strong>In-Batch Negatives 将有效负样本数从 group_size 提升到 batch_size × group_size
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Execution */}
      <section id="training" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-slate-900 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-white">训练执行与超参数配置</h2>
          
          {/* Hyperparameters Table */}
          <div className="mb-12 bg-black/30 rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-amber-400" />
              完整训练超参数
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-slate-400 text-xs">Batch Size (per GPU)</div>
                <div className="text-white font-mono text-lg">8</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-slate-400 text-xs">Train Group Size</div>
                <div className="text-white font-mono text-lg">8</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-slate-400 text-xs">Query Max Length</div>
                <div className="text-white font-mono text-lg">256</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-slate-400 text-xs">Passage Max Length</div>
                <div className="text-white font-mono text-lg">128</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-slate-400 text-xs">Epochs</div>
                <div className="text-white font-mono text-lg">30</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-slate-400 text-xs">Learning Rate</div>
                <div className="text-white font-mono text-lg">1e-4</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-slate-400 text-xs">Warmup Steps</div>
                <div className="text-white font-mono text-lg">100</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-slate-400 text-xs">LR Scheduler</div>
                <div className="text-white font-mono text-lg">Cosine</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-slate-400 text-xs">Weight Decay</div>
                <div className="text-white font-mono text-lg">0.01</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-slate-400 text-xs">Gradient Accumulation</div>
                <div className="text-white font-mono text-lg">1</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-slate-400 text-xs">GPUs</div>
                <div className="text-white font-mono text-lg">3×A100</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-slate-400 text-xs">Precision</div>
                <div className="text-white font-mono text-lg">FP16</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3 space-y-6">
              <p className="text-slate-300">
                训练通过 Shell 脚本自动化执行。使用 DeepSpeed Zero-2 分布式训练框架，配置了随机 Master Port 以支持多 GPU 并行。
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-24 text-slate-400 text-sm font-mono">Script</span>
                  <span className="font-mono bg-white/10 px-2 py-1 rounded text-white">LLM_vector_train.sh</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-24 text-slate-400 text-sm font-mono">Model</span>
                  <span className="font-mono bg-white/10 px-2 py-1 rounded text-white">Qwen2.5-14B</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-24 text-slate-400 text-sm font-mono">Zero Stage</span>
                  <span className="font-mono bg-white/10 px-2 py-1 rounded text-white">Stage 2</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-24 text-slate-400 text-sm font-mono">Temperature</span>
                  <span className="font-mono bg-white/10 px-2 py-1 rounded text-white">0.02</span>
                </div>
              </div>
            </div>

            <div className="lg:w-2/3 bg-black/50 rounded-xl p-6 border border-white/10 font-mono text-xs md:text-sm overflow-x-auto shadow-2xl">
              <pre className="text-green-400">
{`#!/bin/bash
MODEL_USE="Qwen2.5-14B-Instruct_v1"
ZERO_STAGE=2
OUTPUT=\${PATH_PRE}/\${MODEL_USE}_qlora_rerun

# Random Port for Distributed Training
MASTER_PORT=$(shuf -n 1 -i 10000-65535)

deepspeed --master_port \${MASTER_PORT} \\
    --include localhost:0,1,2 LLM_vector_train.py \\
    --extra_data False \\
    --per_device_train_batch_size 8 \\
    --train_group_size 8 \\
    --query_max_len 256 \\
    --passage_max_len 128 \\
    --num_train_epochs 30 \\
    --learning_rate 1e-4 \\
    --num_warmup_steps 100 \\
    --weight_decay 0.01 \\
    --lr_scheduler_type cosine \\
    --zero_stage \${ZERO_STAGE} \\
    --gradient_checkpointing`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Model Fusion */}
      <section id="fusion" className={`py-20 ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6 text-center">多模型融合与 Reranking</h2>
          <p className={`text-center mb-12 max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
            最终方案采用 三阶段 Pipeline：Qwen2.5-14B 召回 → Qwen2.5-72B 重排序 → 多数投票融合
          </p>

          {/* Pipeline Diagram */}
          <div className={`p-8 rounded-2xl mb-12 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Stage 1 */}
              <div className={`flex-1 p-6 rounded-xl border text-center ${isDark ? 'bg-indigo-900/30 border-indigo-700' : 'bg-indigo-50 border-indigo-200'}`}>
                <div className={`text-4xl mb-3 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>1️⃣</div>
                <h4 className="font-bold mb-2">Qwen2.5-14B Recall</h4>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                  微调后的 BiEncoder<br />
                  召回 Top-100 候选
                </p>
              </div>
              
              <div className={`text-2xl ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>→</div>
              
              {/* Stage 2 */}
              <div className={`flex-1 p-6 rounded-xl border text-center ${isDark ? 'bg-pink-900/30 border-pink-700' : 'bg-pink-50 border-pink-200'}`}>
                <div className={`text-4xl mb-3 ${isDark ? 'text-pink-400' : 'text-pink-600'}`}>2️⃣</div>
                <h4 className="font-bold mb-2">Qwen2.5-72B Rerank</h4>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                  vLLM 推理 + 多轮选择<br />
                  MultipleChoiceLogitsProcessor
                </p>
              </div>
              
              <div className={`text-2xl ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>→</div>
              
              {/* Stage 3 */}
              <div className={`flex-1 p-6 rounded-xl border text-center ${isDark ? 'bg-green-900/30 border-green-700' : 'bg-green-50 border-green-200'}`}>
                <div className={`text-4xl mb-3 ${isDark ? 'text-green-400' : 'text-green-600'}`}>3️⃣</div>
                <h4 className="font-bold mb-2">Majority Voting</h4>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                  多结果融合<br />
                  去重 + 排序
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* vLLM Reranking */}
            <div className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Zap className={`w-5 h-5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
                vLLM 72B 三轮重排序
              </h3>
              <p className={`text-sm mb-4 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                使用 vLLM 加速推理，让 72B 模型从 Top-25 中逐轮选出最佳答案：
              </p>
              
              <div className={`rounded-lg p-4 font-mono text-xs mb-4 ${isDark ? 'bg-slate-900 text-green-400' : 'bg-gray-100 text-green-600'}`}>
{`# 三轮迭代选择 (run_vllm.py)
# Round 1: 从 25 个候选中选出第 1 名
# Round 2: 移除第 1 名，从剩余 24 个选出第 2 名
# Round 3: 移除前 2 名，从剩余 23 个选出第 3 名

responses = llm.generate(
    df["text"].values,
    vllm.SamplingParams(
        temperature=0,
        max_tokens=1,
        logits_processors=[
            MultipleChoiceLogitsProcessor(
                tokenizer, 
                choices=[str(i) for i in range(1, 26)]
            )
        ]
    )
)`}
              </div>

              <div className={`p-3 rounded-lg ${isDark ? 'bg-indigo-900/30' : 'bg-indigo-50'}`}>
                <div className={`text-xs ${isDark ? 'text-indigo-300' : 'text-indigo-700'}`}>
                  <strong>💡 关键技术：</strong>MultipleChoiceLogitsProcessor 将输出限制为有效选项编号 (1-25)
                </div>
              </div>
            </div>

            {/* Majority Voting */}
            <div className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <GitMerge className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
                多数投票融合策略
              </h3>
              <p className={`text-sm mb-4 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                融合 3 个模型的预测结果，位置级别多数投票：
              </p>

              <div className="space-y-3 mb-4">
                <div className={`p-3 rounded-lg ${isDark ? 'bg-slate-900' : 'bg-gray-100'}`}>
                  <span className="text-indigo-500 font-mono text-sm">sm1</span>
                  <span className={`text-xs ml-2 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>72B vLLM 三轮重排序结果</span>
                </div>
                <div className={`p-3 rounded-lg ${isDark ? 'bg-slate-900' : 'bg-gray-100'}`}>
                  <span className="text-pink-500 font-mono text-sm">sm2</span>
                  <span className={`text-xs ml-2 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>14B Embedding 召回结果</span>
                </div>
                <div className={`p-3 rounded-lg ${isDark ? 'bg-slate-900' : 'bg-gray-100'}`}>
                  <span className="text-green-500 font-mono text-sm">sm3</span>
                  <span className={`text-xs ml-2 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>32B LLM 推理 + BGE 二次召回</span>
                </div>
              </div>

              <div className={`rounded-lg p-4 font-mono text-xs ${isDark ? 'bg-slate-900 text-slate-300' : 'bg-gray-100 text-gray-700'}`}>
{`# 位置级别多数投票
for j in range(25):  # 对每个位置
    counter = Counter()
    for vote in [mm1[i][j], mm2[i][j], mm3[i][j]]:
        counter[vote] += 1
    # 相同频率时保持原始顺序
    best = max(counter, key=lambda x: (
        counter[x], -original_order.index(x)
    ))`}
              </div>
            </div>
          </div>

          {/* Inference Pipeline Detail */}
          <div className={`mt-12 p-8 rounded-2xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Play className={`w-5 h-5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
              完整推理流程 (infer.py)
            </h3>
            
            <div className="grid md:grid-cols-4 gap-4">
              <div className={`p-4 rounded-lg text-center ${isDark ? 'bg-slate-900' : 'bg-gray-100'}`}>
                <div className="text-2xl mb-2">📥</div>
                <div className="font-bold text-sm">加载模型</div>
                <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                  8-bit 量化 + LoRA merge
                </p>
              </div>
              <div className={`p-4 rounded-lg text-center ${isDark ? 'bg-slate-900' : 'bg-gray-100'}`}>
                <div className="text-2xl mb-2">🔢</div>
                <div className="font-bold text-sm">批量编码</div>
                <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                  Query + Candidates Embedding
                </p>
              </div>
              <div className={`p-4 rounded-lg text-center ${isDark ? 'bg-slate-900' : 'bg-gray-100'}`}>
                <div className="text-2xl mb-2">📊</div>
                <div className="font-bold text-sm">相似度计算</div>
                <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                  Cosine Similarity → Top-100
                </p>
              </div>
              <div className={`p-4 rounded-lg text-center ${isDark ? 'bg-slate-900' : 'bg-gray-100'}`}>
                <div className="text-2xl mb-2">📝</div>
                <div className="font-bold text-sm">生成提交</div>
                <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                  submission.csv (Top-25)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LLM Reasoning Section */}
      <section className={`py-16 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <MessageSquare className={`w-6 h-6 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
            LLM 推理生成 (Qwen2.5-32B)
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className={`font-bold mb-4 ${isDark ? 'text-slate-200' : 'text-gray-800'}`}>Prompt 模板设计</h3>
              <div className={`rounded-lg p-4 font-mono text-xs ${isDark ? 'bg-slate-900 text-slate-300' : 'bg-gray-100 text-gray-700'}`}>
{`PROMPT = """Here is a question about 
{ConstructName}({SubjectName}).
Question: {Question}
Correct Answer: {CorrectAnswer}
Incorrect Answer: {IncorrectAnswer}

You are a Mathematics teacher. 
Identify the misconception behind 
the Incorrect Answer.

There are some possible misconceptions:
{Retrieval}  # Top-100 召回结果
"""`}
              </div>
            </div>
            
            <div>
              <h3 className={`font-bold mb-4 ${isDark ? 'text-slate-200' : 'text-gray-800'}`}>二次检索（Post-processing）</h3>
              <p className={`text-sm mb-4 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                使用 LLM 生成的误解描述，通过 SentenceTransformer (BGE) 进行二次语义检索：
              </p>
              <div className={`rounded-lg p-4 font-mono text-xs ${isDark ? 'bg-slate-900 text-slate-300' : 'bg-gray-100 text-gray-700'}`}>
{`# 清洗 LLM 输出
df['llmMisconception_clean'] = df.apply(
    number2sentence, axis=1
)

# BGE 二次检索
model = SentenceTransformer(
    'Eedi-finetuned-bge'
)
embedding_query = model.encode(
    df['llmMisconception_clean']
)
top25ids = util.semantic_search(
    embedding_query, 
    embedding_Misconception, 
    top_k=100
)`}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Insights */}
      <section className={`py-16 ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Award className={`w-6 h-6 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
            关键洞察与总结
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
              <h3 className="font-bold text-lg mb-3 text-green-500">✅ What Worked</h3>
              <ul className={`space-y-2 text-sm ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span><strong>GPT-4V 数据合成</strong>：有效扩充训练集，提供多样化样本</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span><strong>Hard Negative Mining</strong>：显著提升模型对难样本的区分能力</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span><strong>In-Batch Negatives</strong>：高效利用 batch 内样本，增强对比学习</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span><strong>温度缩放 (τ=0.02)</strong>：增强相似度分布的区分度</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span><strong>多模型融合</strong>：72B Rerank + 多数投票显著提升最终分数</span>
                </li>
              </ul>
            </div>
            
            <div className={`p-6 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
              <h3 className="font-bold text-lg mb-3 text-amber-500">💡 Key Takeaways</h3>
              <ul className={`space-y-2 text-sm ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  <span><strong>Last Token Pooling</strong> 比 Mean Pooling 更适合 Decoder-only LLM</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  <span><strong>GroupKFold</strong> 防止数据泄露，确保验证集真实反映泛化能力</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  <span><strong>QLoRA 4-bit</strong> 使 14B 模型训练成为可能（3×A100 80GB）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  <span><strong>vLLM</strong> 使 72B 模型推理在 Kaggle 环境可行</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  <span><strong>结构化 Query Template</strong> 帮助模型理解数学题目上下文</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Code Files Summary */}
          <div className={`mt-8 p-6 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
            <h3 className="font-bold text-lg mb-4">📁 代码文件总览</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-sm">
              <div className={`p-3 rounded-lg text-center ${isDark ? 'bg-slate-900' : 'bg-gray-100'}`}>
                <div className="font-mono text-xs text-indigo-500">gpt_data.ipynb</div>
                <div className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>GPT-4V 数据合成</div>
              </div>
              <div className={`p-3 rounded-lg text-center ${isDark ? 'bg-slate-900' : 'bg-gray-100'}`}>
                <div className="font-mono text-xs text-pink-500">new_mining.py</div>
                <div className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Hard Negative 挖掘</div>
              </div>
              <div className={`p-3 rounded-lg text-center ${isDark ? 'bg-slate-900' : 'bg-gray-100'}`}>
                <div className="font-mono text-xs text-green-500">new_merge.ipynb</div>
                <div className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>数据合并与切分</div>
              </div>
              <div className={`p-3 rounded-lg text-center ${isDark ? 'bg-slate-900' : 'bg-gray-100'}`}>
                <div className="font-mono text-xs text-amber-500">LLM_vector_train.py</div>
                <div className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>BiEncoder 训练</div>
              </div>
              <div className={`p-3 rounded-lg text-center ${isDark ? 'bg-slate-900' : 'bg-gray-100'}`}>
                <div className="font-mono text-xs text-cyan-500">infer.ipynb</div>
                <div className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>模型推理</div>
              </div>
              <div className={`p-3 rounded-lg text-center ${isDark ? 'bg-slate-900' : 'bg-gray-100'}`}>
                <div className="font-mono text-xs text-purple-500">run_vllm.py</div>
                <div className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>72B Reranking</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-10 border-t ${isDark ? 'bg-black border-slate-800' : 'bg-white border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className={`mb-4 ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>
            EEDI - Mining Misconceptions in Mathematics 🥉 Bronze Medal Solution
          </p>
          <div className="flex justify-center space-x-6 text-2xl text-slate-400">
            <span className="hover:text-blue-500 cursor-pointer transition">🐍</span>
            <span className="hover:text-white cursor-pointer transition">📊</span>
            <span className="hover:text-green-500 cursor-pointer transition">💾</span>
          </div>
          <p className={`text-xs mt-8 ${isDark ? 'text-slate-600' : 'text-gray-400'}`}>
            Based on solution files: gpt_data.ipynb, infer.ipynb, LLM_vector_train.py, new_mining.py, new_merge.ipynb, run_vllm.py
          </p>
        </div>
      </footer>
    </div>
  );
};

export default EEDISolution;

