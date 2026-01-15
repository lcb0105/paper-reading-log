import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Calendar, FolderOpen, List } from 'lucide-react';

// 分组数据结构
const paperGroups = [
  {
    id: 'my-work',
    title: 'My Work & Related 我的工作与相关论文',
    papers: [
      {
        id: 'p-tuning-v2',
        title: 'P-Tuning v2: Prompt Tuning Can Be Comparable to Fine-tuning Universally Across Scales and Tasks',
        authors: 'Xiao Liu, Kaixuan Ji, et al. (Tsinghua)',
        date: '2022-03',
        description: '【Deep Prompt Tuning】打破 Prompt Tuning 的局限性，在每一层 Transformer 加入可训练 Prompt 向量。仅微调 0.1%-3% 参数，在 330M-2B 模型规模和困难序列标注任务（NER/QA）上达到与 Fine-tuning 相当的性能。',
        tags: ['P-Tuning', 'Prompt Tuning', 'PEFT', 'NLU'],
        path: '/papers/p-tuning-v2'
      },
      {
        id: 'neftune',
        title: 'NEFTune: Noisy Embeddings Improve Instruction Finetuning',
        authors: 'Neel Jain et al.',
        date: '2023-10',
        description: '【噪声嵌入正则化】极简却惊人的增强技术：仅在训练时的 Embedding 上添加随机噪声，LLaMA-2-7B 在 AlpacaEval 从 29.8% 飙升至 64.7%（+35%）。通过 α/√(Ld) 缩放因子控制扰动强度，作为正则化器防止过拟合指令格式。',
        tags: ['NEFTune', 'Regularization', 'Instruction Tuning', 'ICLR 2024'],
        path: '/papers/neftune'
      },
      {
        id: 'dcpc',
        title: 'Whose Instructions Count? Resolving Preference Bias in Instruction Fine-Tuning',
        authors: 'First Author Work',
        date: '2025-09',
        description: '【🏆 NeurIPS 2025 一作】解决指令微调中被忽视的"偏好偏差"问题。提出 DCPC (Dynamic Cross-Layer Preference Correction) 框架：通过偏好敏感相似度检测冲突、跨层前缀对齐拉近表示、PCM 模块注入共识偏好。在偏好偏移数据集上 Acc 提升 4-6.7%，方差降低 35%。',
        tags: ['DCPC', 'Preference Bias', 'IFT', 'NeurIPS 2025', '🏆 First Author'],
        path: '/papers/dcpc'
      }
    ]
  },
  {
    id: 'deepseek-series',
    title: 'DeepSeek Series',
    papers: [
      {
        id: 'deepseek-v3',
        title: 'DeepSeek-V3 Technical Report',
        authors: 'DeepSeek-AI',
        date: '2024-12',
        description: 'A strong Mixture-of-Experts (MoE) language model with 671B total parameters with 37B activated for each token.',
        tags: ['LLM', 'MoE', 'Transformer'],
        path: '/papers/deepseek-v3'
      },
      {
        id: 'deepseek-v2',
        title: 'DeepSeek-V2: A Strong, Economical, and Efficient MoE Language Model',
        authors: 'DeepSeek-AI',
        date: '2024-05',
        description: 'Introducing MLA (Multi-Head Latent Attention) and DeepSeekMoE. Strong performance with significantly reduced training costs and KV cache.',
        tags: ['LLM', 'MoE', 'MLA', 'GRPO'],
        path: '/papers/deepseek-v2'
      },
      {
        id: 'deepseek-llm',
        title: 'DeepSeek LLM: Scaling Open-Source Language Models with Longtermism',
        authors: 'DeepSeek-AI',
        date: '2024-01',
        description: '深入探索 DeepSeek LLM (7B & 67B) 的扩展定律、架构创新与卓越性能。在代码、数学和推理领域超越 LLaMA-2 70B。',
        tags: ['LLM', 'Scaling Laws', 'Dense'],
        path: '/papers/deepseek-llm'
      },
      {
        id: 'deepseek-math-v2',
        title: 'DeepSeekMath-V2: Towards Self-Verifiable Mathematical Reasoning',
        authors: 'DeepSeek-AI',
        date: '2025-01',
        description: '从“盲目刷题”到“自我反思”的范式转变。引入过程监督与自验证机制，通过 GRPO 提升数学推理能力。',
        tags: ['Self-Verification', 'Process Supervision', 'RL'],
        path: '/papers/deepseek-math-v2'
      },
      {
        id: 'deepseek-prover-v2',
        title: 'DeepSeek-Prover-V2: Unlocking the Potential of LLMs for Formal Math',
        authors: 'DeepSeek-AI',
        date: '2024-06',
        description: '推进形式化数学推理，采用递归子目标分解和强化学习策略，在 MiniF2F 测试中刷新 SOTA。',
        tags: ['Formal Math', 'RL', 'Reasoning'],
        path: '/papers/deepseek-prover-v2'
      },
      {
        id: 'deepseek-v32',
        title: 'DeepSeek-V3.2: Pushing the Frontier of Open-Source LLMs',
        authors: 'DeepSeek-AI',
        date: '2025-06',
        description: '【DSA + Scalable RL】引入 DeepSeek Sparse Attention (DSA) 高效稀疏注意力机制，通过无偏 KL 估计器稳定大规模 GRPO 训练。1800+ 环境 + 85K Prompt 的 Agent 数据合成流水线。IMO/IOI 2025 金牌水平。',
        tags: ['DSA', 'Sparse Attention', 'GRPO', 'Agent'],
        path: '/papers/deepseek-v32'
      }
    ]
  },
  {
    id: 'qwen-series',
    title: 'Qwen Series',
    papers: [
      {
        id: 'qwen1',
        title: 'Qwen Technical Report',
        authors: 'Alibaba Cloud',
        date: '2023-09',
        description: 'The first comprehensive technical report of Qwen series (7B/14B). Detailed breakdown of architecture (RoPE, SwiGLU, RMSNorm) and alignment.',
        tags: ['LLM', 'Transformer', 'Alignment'],
        path: '/papers/qwen1' 
      },
      {
        id: 'qwen2',
        title: 'Qwen2 Technical Report',
        authors: 'Alibaba Cloud',
        date: '2024-07',
        description: '新一代 Qwen 系列，0.5B-72B 全尺寸覆盖。引入 MoE 架构 (57B-A14B)，7T 高质量数据预训练，支持 128K 长文本。',
        tags: ['LLM', 'MoE', 'Long Context', 'Multilingual'],
        path: '/papers/qwen2'
      },
      {
        id: 'qwen25',
        title: 'Qwen2.5 Technical Report',
        authors: 'Alibaba Cloud',
        date: '2024-09',
        description: 'Qwen 系列最新迭代，预训练数据从 7T 扩展至 18T tokens。双阶段 RL 策略：Offline DPO + Online GRPO。支持 1M 上下文 (Turbo)，结合 YaRN 与 DCA 实现长度外推。',
        tags: ['LLM', '18T Tokens', 'GRPO', '128K Context'],
        path: '/papers/qwen25'
      },
      {
        id: 'gated-attention',
        title: 'Gated Attention: Non-linearity, Sparsity, and Attention-Sink-Free',
        authors: 'Qwen Team',
        date: '2024-12',
        description: '【门控注意力】在 SDPA 输出后添加 Head-specific Sigmoid Gate，引入非线性打破低秩瓶颈，通过输入依赖稀疏性消除 Attention Sink 现象，显著提升训练稳定性。',
        tags: ['Gated Attention', 'Attention Sink', 'Sparsity'],
        path: '/papers/gated-attention'
      },
      {
        id: 'qwen3',
        title: 'Qwen3 Technical Report',
        authors: 'Alibaba Cloud',
        date: '2025-04',
        description: 'Qwen3 系列：统一思考模式框架，通过 /think 和 /no_think 标记动态切换。36T tokens 预训练，119 种语言支持。四阶段后训练 + 强到弱蒸馏。旗舰 235B-A22B 超越 DeepSeek-R1 和 o1。',
        tags: ['LLM', 'MoE', 'Thinking Mode', '36T Tokens'],
        path: '/papers/qwen3'
      }
    ]
  },
  {
    id: 'llama-series',
    title: 'LLaMA Series',
    papers: [
      {
        id: 'llama-deep-dive',
        title: 'LLaMA: Open and Efficient Foundation Language Models',
        authors: 'Meta AI',
        date: '2023-02',
        description: '打破"参数至上"的迷信，用公开数据和极致工程优化重新定义大模型训练范式。13B 模型击败 GPT-3 (175B)。',
        tags: ['LLM', 'Transformer', 'Open Source'],
        path: '/papers/llama-deep-dive'
      },
      {
        id: 'llama2',
        title: 'Llama 2: Open Foundation and Fine-Tuned Chat Models',
        authors: 'Meta AI',
        date: '2023-07',
        description: '从预训练到 RLHF 微调的全流程披露，双奖励模型解决有用性与安全性冲突，Ghost Attention 解决多轮对话遗忘问题。',
        tags: ['LLM', 'RLHF', 'Chat', 'Safety'],
        path: '/papers/llama2'
      },
      {
        id: 'llama3',
        title: 'The Llama 3 Herd of Models',
        authors: 'Meta AI',
        date: '2024-07',
        description: '405B 稠密架构旗舰模型，15.6T Token 训练数据，128K 上下文窗口。坚持简单架构，通过极致数据工程对标 GPT-4。',
        tags: ['LLM', 'Multimodal', 'Scaling Laws', '405B'],
        path: '/papers/llama3'
      }
    ]
  },
  {
    id: 'post-training',
    title: 'Post-training 后训练',
    papers: [
      {
        id: 'deep-rl-human-prefs',
        title: 'Deep Reinforcement Learning from Human Preferences',
        authors: 'OpenAI & DeepMind',
        date: '2017-06',
        description: '【RLHF 奠基之作】提出通过人类偏好比较来学习奖励函数，用极少的人类反馈（<1%）完成复杂任务。Bradley-Terry 模型 + 交叉熵损失。',
        tags: ['RLHF', 'Reward Model', 'Human Feedback'],
        path: '/papers/deep-rl-human-prefs'
      },
      {
        id: 'instructgpt',
        title: 'InstructGPT: Training LMs to Follow Instructions with Human Feedback',
        authors: 'OpenAI (Ouyang et al.)',
        date: '2022-03',
        description: '【RLHF 工程实践】完整的 RLHF 三步法：SFT → 奖励模型 → PPO。1.3B InstructGPT 在人类评估中胜过 175B GPT-3。',
        tags: ['RLHF', 'PPO', 'SFT', 'Alignment'],
        path: '/papers/instructgpt'
      },
      {
        id: 'deepseek-math',
        title: 'DeepSeekMath: Pushing the Limits of Mathematical Reasoning',
        authors: 'DeepSeek-AI',
        date: '2024-02',
        description: '【GRPO 强化学习】提出 Group Relative Policy Optimization，无需 Critic Model。7B 模型在 MATH 达到 51.7%，接近 GPT-4。',
        tags: ['GRPO', 'Math Reasoning', 'RL'],
        path: '/papers/deepseek-math'
      },
      {
        id: 'gspo',
        title: 'Group Sequence Policy Optimization (GSPO)',
        authors: 'Qwen Team (Alibaba)',
        date: '2025-07',
        description: '【Qwen3 背后的 RL 基石】序列级重要性比率替代 Token 级，彻底解决长文本训练中的模型坍塌问题。完美适配 MoE 架构。',
        tags: ['GSPO', 'Sequence-level RL', 'MoE'],
        path: '/papers/gspo'
      },
      {
        id: 'aspo',
        title: 'ASPO: Asymmetric Importance Sampling Policy Optimization',
        authors: 'Kuaishou & Tsinghua',
        date: '2025-10',
        description: '【快手 ASPO 算法】揭示 GRPO 正样本权重错配问题，通过反转正优势 Token 的 IS 比率 + 软双重截断，显著提升训练稳定性和推理性能。',
        tags: ['ASPO', 'IS Ratio', 'OSRL'],
        path: '/papers/aspo'
      },
      {
        id: 'dpo',
        title: 'DPO: Direct Preference Optimization',
        authors: 'Stanford (Rafailov et al.)',
        date: '2023-05',
        description: '【Stanford DPO 算法】揭示语言模型与奖励模型的对偶性，通过最优策略解析解重参数化奖励函数，将复杂 RLHF 转化为简单二分类损失，无需显式奖励建模即可实现稳定高效的偏好对齐。',
        tags: ['DPO', 'Preference Learning', 'No RL'],
        path: '/papers/dpo'
      },
      {
        id: 'lora',
        title: 'LoRA: Low-Rank Adaptation of Large Language Models',
        authors: 'Microsoft',
        date: '2021-06',
        description: '【微软 LoRA 算法】揭示大模型适应任务时的权重更新具有极低"内在秩"的特性，通过冻结预训练权重并注入并行的低秩分解矩阵，显著减少万倍训练参数并消除推理延迟，性能匹敌全量微调。',
        tags: ['LoRA', 'PEFT', 'Low-Rank'],
        path: '/papers/lora'
      },
      {
        id: 'lora-plus',
        title: 'LoRA+: Efficient Low Rank Adaptation of Large Models',
        authors: 'UC Berkeley & ICML 2024',
        date: '2024-02',
        description: '【LoRA 改进版】通过量纲分析揭示标准 LoRA 在大宽度模型上的低效本质：A 和 B 矩阵对输入维度 n 的依赖不同。核心修正：为 B 设置更高学习率（λ≈16），训练速度提升 2 倍。',
        tags: ['LoRA+', 'Learning Rate', 'PEFT'],
        path: '/papers/lora-plus'
      },
      {
        id: 'lora-fa',
        title: 'LoRA-FA: Memory-Efficient Low-Rank Adaptation',
        authors: 'HKBU & HKUST',
        date: '2023-08',
        description: '【显存优化 LoRA】冻结投影降维矩阵 A，仅更新投影升维矩阵 B。核心洞察：计算 A 的梯度需存储高维输入 X，而计算 B 的梯度只需低维 XA，显存降低数百倍。',
        tags: ['LoRA-FA', 'Memory Efficient', 'Frozen-A'],
        path: '/papers/lora-fa'
      },
      {
        id: 'adalora',
        title: 'AdaLoRA: Adaptive Budget Allocation for PEFT',
        authors: 'ICLR 2023',
        date: '2023-03',
        description: '【自适应 LoRA】以 SVD 形式参数化增量更新 (P·Λ·Q)，根据重要性得分动态分配参数预算。核心发现：FFN 和高层网络需要更多的秩，通过立方衰减策略逐步剪枝。',
        tags: ['AdaLoRA', 'SVD', 'Rank Allocation'],
        path: '/papers/adalora'
      },
      {
        id: 'dora',
        title: 'DoRA: Weight-Decomposed Low-Rank Adaptation',
        authors: 'NVIDIA & ICML 2024',
        date: '2024-02',
        description: '【权重分解 LoRA】将权重分解为幅度 m 和方向 V，揭示 LoRA 与 FT 学习模式差异：LoRA 耦合幅度/方向（正相关），FT 解耦（负相关）。DoRA 模拟 FT，性能提升 2-3%。',
        tags: ['DoRA', 'Weight Decomposition', 'Magnitude-Direction'],
        path: '/papers/dora'
      }
    ]
  },
  {
    id: 'multimodal',
    title: 'Multimodal 多模态综述',
    papers: [
      {
        id: 'mllm-survey',
        title: 'A Survey on Multimodal Large Language Models',
        authors: 'arXiv 2023',
        date: '2023-06',
        description: '【MLLM 综合综述】系统梳理多模态大语言模型：三大核心模块（模态编码器 + LLM + 模态接口）、三阶段训练范式（预训练 → 指令微调 → 对齐）、多模态幻觉问题与缓解方法、M-ICL/M-CoT 扩展技术。',
        tags: ['Survey', 'MLLM', 'Multimodal', 'Vision-Language'],
        path: '/papers/mllm-survey'
      },
      {
        id: 'mllm-overview',
        title: 'Multimodal Large Language Models: A Survey',
        authors: 'Jiayang Wu et al.',
        date: '2023-11',
        description: '【MLLM 发展史综述】从历史脉络到技术全景：四大阶段发展历程（单模态→模态转换→模态融合→大规模 MLLM）、ViT/CLIP/BLIP-2/LLaVA 等核心模型解析、ITC/MLM 等训练目标公式推导、AGI 挑战与灾难性遗忘问题。',
        tags: ['Survey', 'MLLM', 'CLIP', 'LLaVA'],
        path: '/papers/mllm-overview'
      },
      {
        id: 'vit-survey',
        title: 'Visual Instruction Tuning towards General-Purpose Multimodal Model',
        authors: 'Survey 2023',
        date: '2023',
        description: '【视觉指令微调综述】从传统任务特定范式到基于指令的通用范式转变。系统梳理 GPMM 三大支柱：数据构建（GPT-4 扩展）、架构设计（Vision Encoder + Adapter + LLM）、两阶段训练。涵盖判别/生成/推理任务及视频/3D/医疗领域应用。',
        tags: ['Survey', 'VIT', 'LLaVA', 'LISA'],
        path: '/papers/vit-survey'
      },
      {
        id: 'mm-llms',
        title: 'MM-LLMs: Recent Advances in MultiModal Large Language Models',
        authors: 'Survey 2024',
        date: '2024',
        description: '【MM-LLMs 最新进展】系统分析 126 个多模态大模型：五大核心组件（模态编码器 + 输入投影器 + LLM + 输出投影器 + 模态生成器）、LDM 生成原理、两阶段训练流程（MM PT + MM IT）。深度解析 Any-to-Any 架构与潜在扩散模型的条件控制机制。',
        tags: ['Survey', 'MM-LLMs', 'LDM', 'Any-to-Any'],
        path: '/papers/mm-llms'
      },
      {
        id: 'mllm-revolution',
        title: 'The Revolution of Multimodal Large Language Models: A Survey',
        authors: 'arXiv 2024',
        date: '2024-02',
        description: '【MLLM 革命综述】系统解析视觉 MLLM 的架构选择（ViT + LLM + Adapter）、三大核心公式（Cross-Attention/自回归损失/ITC 对比学习）、两阶段训练（特征对齐 + 指令微调）。涵盖视觉定位、图像生成、视频理解及医疗/自动驾驶等领域应用。',
        tags: ['Survey', 'MLLM', 'Cross-Attention', 'ITC'],
        path: '/papers/mllm-revolution'
      },
      {
        id: 'efficient-mllms',
        title: 'Efficient Multimodal Large Language Models: A Survey',
        authors: 'arXiv 2024',
        date: '2024-05',
        description: '【高效 MLLM 综述】深度解析边缘设备部署：轻量化架构（MobileVLM/TinyLLaVA）、视觉 Token 压缩（LLaVA-UHD/Mini-Gemini）、高效结构（MoE/Mamba/SSM）、PEFT 技术（LoRA-FA/LOMO）。涵盖剪枝、蒸馏、量化及 ShareGPT4V 数据生成范式。',
        tags: ['Survey', 'Efficient', 'MoE', 'Mamba', 'PEFT'],
        path: '/papers/efficient-mllms'
      },
      {
        id: 'mllm-comprehensive',
        title: 'A Comprehensive Review of Multimodal Large Language Models',
        authors: 'arXiv 2024',
        date: '2024-08',
        description: '【MLLM 全面综述】从 LLaVA 到 Sora，系统解析图像/视频/音频三大模态：输入编码器（ViT/Whisper/ImageBind）、特征融合（Linear/Q-Former/Cross-Attention）、两阶段训练范式。涵盖 Video-LLaMA、Qwen-Audio、SpeechGPT 等代表模型及幻觉/计算成本等关键挑战。',
        tags: ['Survey', 'MLLM', 'Video', 'Audio', 'Sora'],
        path: '/papers/mllm-comprehensive'
      },
      {
        id: 'mech-interp-survey',
        title: 'A Survey on Mechanistic Interpretability for Multi-Modal Foundation Models',
        authors: 'arXiv 2025',
        date: '2025-02',
        description: '【机械可解释性综述】深度解析 MLLM 内部机制：三维分类体系（模型家族/解释技术/下游应用）、LLM 适配方法（线性探测/Logit Lens/因果追踪/SAE）、多模态特有技术（Cross-Attention 分析/TextSpan/网络解剖）。涵盖模型编辑、幻觉检测、安全去偏等关键应用。',
        tags: ['Survey', 'Interpretability', 'CLIP', 'Diffusion', 'SAE'],
        path: '/papers/mech-interp-survey'
      },
      {
        id: 'understanding-mllms',
        title: 'Understanding Multimodal LLMs',
        authors: 'Sebastian Raschka',
        date: '2024',
        description: '【多模态 LLM 架构指南】深度解析两大核心范式：统一嵌入架构（LLaVA/Molmo/Qwen2-VL）vs 交叉注意力架构（Llama 3.2/NVLM-X/Flamingo）。涵盖 Vision Encoder（ViT/CLIP/SigLIP）、Projector（Linear/MLP/Perceiver）技术细节，并深度盘点 2024 年十大前沿模型及 NVLM 对比结论。',
        tags: ['Guide', 'Architecture', 'LLaVA', 'NVLM', 'Llama 3.2'],
        path: '/papers/understanding-mllms'
      },
      {
        id: 'vlm-knowledge-base',
        title: 'VLM Knowledge Base: 视觉语言模型完全指南',
        authors: 'Multi-source Summary',
        date: '2024',
        description: '【VLM 技术百科】系统整理 15+ 经典与前沿视觉语言模型。基础架构（Flamingo/BLIP-2）、指令微调（InstructBLIP/LLaVA/MiniGPT-4）、架构创新（CogVLM/Qwen-VL/Yi-VL）、高分辨率方案（Monkey/LLaVA-UHD/MoE-LLaVA）、全模态与视频（NExT-GPT/LLaMA-VID）。涵盖 Q-Former、Perceiver Resampler、Visual Expert、AnyRes 等核心技术。',
        tags: ['Knowledge Base', 'Flamingo', 'BLIP-2', 'LLaVA', 'CogVLM'],
        path: '/papers/vlm-knowledge-base'
      }
    ]
  },
  {
    id: 'vision-encoder',
    title: 'Vision Encoder 图像编码器',
    papers: [
      {
        id: 'vision-transformer',
        title: 'An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale',
        authors: 'Alexey Dosovitskiy et al.',
        date: 'ICLR 2021',
        description: '【ViT 开山之作】提出纯 Transformer 图像分类架构。核心思想：将图像切分为 16×16 Patch 序列，通过线性投影 + 位置编码 + [CLS] Token 输入标准 Transformer 编码器。深度解析四大核心公式（嵌入层/编码器/分类头/Attention），对比 CNN 归纳偏置差异。JFT-300M 预训练后达到 88.55% ImageNet Top-1，计算量仅为 ResNet 的 1/4。',
        tags: ['ViT', 'Transformer', 'Patch Embedding', 'ICLR 2021'],
        path: '/papers/vision-transformer'
      },
      {
        id: 'clip',
        title: 'CLIP: Learning Transferable Visual Models From Natural Language Supervision',
        authors: 'OpenAI (Radford et al.)',
        date: '2021-02',
        description: '【对比学习里程碑】通过对比学习在 4 亿对（图像-文本）数据上训练，实现强大的 Zero-Shot 迁移能力。双塔架构（ViT + Text Transformer）+ 对称交叉熵损失，无需微调直接迁移到 30+ 下游任务，Zero-Shot ImageNet 准确率达 76.2%。',
        tags: ['CLIP', 'Contrastive Learning', 'Zero-Shot', 'OpenAI'],
        path: '/papers/clip'
      },
      {
        id: 'blip',
        title: 'BLIP: Bootstrapping Language-Image Pre-training for Unified Vision-Language Understanding and Generation',
        authors: 'Salesforce Research (Li et al.)',
        date: '2022-01',
        description: '【统一理解与生成】提出 MED (Multimodal Mixture of Encoder-Decoder) 架构，在单一模型中实现图文理解与生成。通过 CapFilt (Captioning and Filtering) 机制净化网络数据，显著提升多模态任务性能。',
        tags: ['BLIP', 'Multimodal', 'Encoder-Decoder', 'Data Filtering'],
        path: '/papers/blip'
      },
      {
        id: 'blip2',
        title: 'BLIP-2: Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Language Models',
        authors: 'Salesforce Research (Li et al.)',
        date: '2023-01',
        description: '【Q-Former 架构】提出轻量级 Querying Transformer (Q-Former) 作为视觉-语言桥梁。两阶段预训练：冻结图像编码器学习表征 → 冻结 LLM 学习生成。可训练参数仅 188M，Zero-shot VQAv2 达 65.0%，超越 Flamingo-80B。',
        tags: ['BLIP-2', 'Q-Former', 'Frozen LLM', 'CVPR 2023'],
        path: '/papers/blip2'
      },
      {
        id: 'instructblip',
        title: 'InstructBLIP: Towards General-purpose Vision-Language Models with Instruction Tuning',
        authors: 'Salesforce Research (Dai et al.)',
        date: '2023-05',
        description: '【指令感知视觉特征】在 BLIP-2 基础上引入指令微调。核心创新：Q-Former 同时接收图像和指令，动态提取任务相关的视觉特征。26 个数据集训练，13 个 Held-out 任务全部 SOTA。平方根采样策略解决数据不平衡问题。',
        tags: ['InstructBLIP', 'Instruction Tuning', 'Zero-Shot', 'NeurIPS 2023'],
        path: '/papers/instructblip'
      },
      {
        id: 'siglip',
        title: 'SigLIP: Sigmoid Loss for Language Image Pre-Training',
        authors: 'Google DeepMind (Zhai et al.)',
        date: '2023-03',
        description: '【Sigmoid 对比学习】用 Sigmoid 损失替代 Softmax，将对比学习问题重新定义为成对二分类。内存消耗不再随 Batch Size 平方增长，32k Batch 即达性能饱和点。4 个 TPUv4 芯片 2 天达到 84.5% ImageNet 0-shot。',
        tags: ['SigLIP', 'Sigmoid Loss', 'ICCV 2023', 'Efficient Training'],
        path: '/papers/siglip'
      },
      {
        id: 'eva',
        title: 'EVA: Exploring the Limits of Masked Visual Representation Learning at Scale',
        authors: 'BAAI (Fang et al.)',
        date: '2022-11',
        description: '【10 亿参数 ViT】完全基于公开数据，通过预测被掩码图像区域对应的 CLIP 视觉特征进行预训练。Vanilla ViT 架构 + 负余弦相似度损失。ImageNet 达 89.7% Top-1，LVIS 与 COCO 实例分割差距几乎消除，展现强大语义泛化能力。',
        tags: ['EVA', 'MIM', 'CLIP Feature', 'CVPR 2022'],
        path: '/papers/eva'
      },
      {
        id: 'eva-clip',
        title: 'EVA-CLIP: 大规模 CLIP 训练技术的改进',
        authors: 'BAAI (智源研究院)',
        date: '2023-03',
        description: '【高效 CLIP 训练】结合 EVA 初始化 + LAMB 优化器 + Flash Attention + FLIP Token Dropping，5.0B 参数模型仅需 9B 样本即达 82.0% ImageNet Zero-shot Top-1。深度对比 AdamW vs LAMB 优化器原理，CLIP InfoNCE 损失函数公式详解。',
        tags: ['EVA-CLIP', 'LAMB', 'Flash Attention', 'CVPR 2023'],
        path: '/papers/eva-clip'
      }
    ]
  },
  {
    id: 'popular-mllm',
    title: 'Popular MLLMs 常用多模态大模型',
    papers: [
      {
        id: 'flamingo',
        title: 'Flamingo: a Visual Language Model for Few-Shot Learning',
        authors: 'DeepMind',
        date: 'NeurIPS 2022',
        description: '【Few-Shot VLM 里程碑】通过 Perceiver Resampler 将任意长度视觉特征压缩为固定 Token，门控交叉注意力 (tanh(α)=0 初始化) 稳定融合冻结的 NFNet + Chinchilla LLM。M3W 交错图文数据赋予强大 In-context Learning 能力，32-shot 超越多任务 Fine-tuned SOTA。',
        tags: ['Flamingo', 'Few-Shot', 'Perceiver', 'Gated XATTN'],
        path: '/papers/flamingo'
      },
      {
        id: 'llava',
        title: 'LLaVA: Visual Instruction Tuning',
        authors: 'Microsoft & UW-Madison',
        date: 'NeurIPS 2023',
        description: '【视觉指令微调开创之作】首次使用 GPT-4 生成 158K 多模态指令数据。极简架构：Linear Projection 连接 CLIP ViT + Vicuna LLM，两阶段训练（特征对齐→端到端微调）。ScienceQA SOTA (92.53%)，开源推动 LLaVA-1.5/NeXT/OneVision 等后续发展。',
        tags: ['LLaVA', 'Visual Instruction', 'GPT-4 Data', 'Open Source'],
        path: '/papers/llava'
      },
      {
        id: 'llava-1.5',
        title: 'LLaVA-1.5: Improved Baselines with Visual Instruction Tuning',
        authors: 'Microsoft & UW-Madison',
        date: 'CVPR 2024',
        description: '【LLaVA 系统性改进】三个关键升级：MLP 连接器替代 Linear Projection + CLIP-ViT-L-336px 高分辨率 + 学术任务数据（VQA/GQA/OCRVQA）。响应格式提示平衡长短回答。仅 1.2M 公开数据，1 天训练，11 项基准 SOTA。',
        tags: ['LLaVA-1.5', 'MLP Connector', '336px', 'Data Efficient'],
        path: '/papers/llava-1.5'
      },
      {
        id: 'llava-next',
        title: 'LLaVA-NeXT Ablations: Beyond Data',
        authors: 'LLaVA-VL Team',
        date: '2024-05',
        description: '【LLaVA-NeXT 消融实验】深度剖析架构选择：LLM 越强多模态越强，SigLIP-SO400M 最佳性价比。Higher-AnyRes + 阈值双线性插值公式支持 6×6 网格。Stage 1.5 高质量预热至关重要：全量微调 + Re-captioned 合成数据显著提升性能。',
        tags: ['LLaVA-NeXT', 'Ablation', 'Higher-AnyRes', 'Stage 1.5'],
        path: '/papers/llava-next'
      },
      {
        id: 'deepseek-vl2',
        title: 'DeepSeek-VL2: Mixture-of-Experts Vision-Language Models',
        authors: 'DeepSeek-AI',
        date: '2024-12',
        description: '【MoE 视觉语言模型】引入动态分块（Dynamic Tiling）处理任意宽高比高分辨率图像，采用 DeepSeekMoE + MLA 架构实现高效推理。三版本 Tiny/Small/Standard (1.0B/2.8B/4.5B 激活参数)，在 OCR、文档理解、视觉定位等任务上达到 SOTA。',
        tags: ['DeepSeek-VL2', 'MoE', 'Dynamic Tiling', 'MLA'],
        path: '/papers/deepseek-vl2'
      },
      {
        id: 'qwen-vl',
        title: 'Qwen-VL: A Versatile Vision-Language Model for Understanding, Localization, Text Reading, and Beyond',
        authors: 'Alibaba Group',
        date: '2023-08',
        description: '【通用视觉语言模型】基于 Qwen-7B 的多模态扩展，通过位置感知 Cross-Attention Adapter 将 ViT-bigG 视觉特征压缩为固定 256 Token。三阶段训练：14 亿图文对预训练→多任务预训练→指令微调。支持图像描述、VQA、OCR 和视觉定位 (Grounding)，448×448 高分辨率输入。',
        tags: ['Qwen-VL', 'Cross-Attention', 'Grounding', 'OCR'],
        path: '/papers/qwen-vl'
      },
      {
        id: 'qwen2-vl',
        title: 'Qwen2-VL: Enhancing Vision-Language Model\'s Perception of the World at Any Resolution',
        authors: 'Alibaba Qwen Team',
        date: '2024-09',
        description: '【动态分辨率 VLM】重新定义视觉处理范式：原生动态分辨率 (Naive Dynamic Resolution) 处理任意尺寸图像 + M-RoPE 多模态旋转位置编码融合时间/高度/宽度三维信息。3D 卷积统一图像视频理解，2×2 池化压缩 Token。72B 版本在 DocVQA、MathVista 超越 GPT-4o。',
        tags: ['Qwen2-VL', 'M-RoPE', 'Dynamic Resolution', 'Video'],
        path: '/papers/qwen2-vl'
      },
      {
        id: 'qwen2.5-vl',
        title: 'Qwen2.5-VL Technical Report',
        authors: 'Alibaba Qwen Team',
        date: '2025-02',
        description: '【细粒度感知 + Agent】Window Attention 优化 ViT 推理效率 + 绝对时间 MRoPE 实现秒级视频事件定位 + 动态 FPS 采样支持小时级视频。4.1T 预训练数据（↑3.4x）。全能文档解析（手写/表格/图表/化学公式/乐谱）+ 精确对象定位 + 电脑/手机操作 Agent 能力。',
        tags: ['Qwen2.5-VL', 'Window Attention', 'Absolute Time', 'Visual Agent'],
        path: '/papers/qwen2.5-vl'
      },
      {
        id: 'qwen2.5-omni',
        title: 'Qwen2.5-Omni Technical Report',
        authors: 'Qwen Team, Alibaba Group',
        date: '2025-03',
        description: '【端到端全模态流式交互】Thinker-Talker 双模块架构解耦推理与语音生成 + TMROPE 实现音画精确同步（40ms精度）+ 滑动窗口 DiT 实现毫秒级流式输出。支持文本/图像/音频/视频统一感知与文本+语音双模态生成。DPO 优化语音质量，击败专门 TTS 模型。',
        tags: ['Qwen2.5-Omni', 'Thinker-Talker', 'TMROPE', 'Streaming', 'End-to-End'],
        path: '/papers/qwen2.5-omni'
      },
      {
        id: 'janus',
        title: 'Janus: Decoupling Visual Encoding for Unified Multimodal Understanding and Generation',
        authors: 'DeepSeek-AI',
        date: '2024-10',
        description: '【解耦视觉编码的统一模型】理解任务用 SigLIP 提取高层语义，生成任务用 VQ Tokenizer 保留像素细节，双路径共享同一 LLM。1.3B 参数超越 LLaVA-1.5 7B (POPE 87.0 vs 85.9)，GenEval 击败 SDXL 和 DALL-E 2。CFG 引导增强文图一致性。',
        tags: ['Janus', 'Decoupling', 'SigLIP', 'VQ Tokenizer', 'CFG'],
        path: '/papers/janus'
      },
      {
        id: 'kimi-vl',
        title: 'Kimi-VL Technical Report',
        authors: 'Moonshot AI',
        date: '2025-04',
        description: '【高效 MoE 视觉语言模型】16B 总参数仅 2.8B 激活，128K 长上下文。MoonViT 原生分辨率 + NaViT Packing + 2D RoPE。Thinking-2506 版本：MathVista 80.1、MathVision 56.9、VideoMMMU 65.2（超 GPT-4o）。Long-CoT + RL 训练，Token 消耗减少 20%。ScreenSpot-Pro 52.8 远超 GPT-4o (0.8)。',
        tags: ['Kimi-VL', 'MoE', 'MoonViT', 'Long-CoT', '128K Context'],
        path: '/papers/kimi-vl'
      }
    ]
  },
  {
    id: 'iquest-jiukun-series',
    title: 'IQuest_九坤 Series',
    papers: [
      {
        id: 'iquest-coder-v1',
        title: 'IQuest-Coder-V1 Technical Report',
        authors: 'IQuest Coder Team',
        date: '2025',
        description: '【Code-Flow 多阶段训练范式】超越静态代码表示，7B/14B/40B 全系列 + LoopCoder 循环架构。提出多语言 Scaling Law 显式建模跨语言迁移。SWE-Bench 81.4%、HumanEval+ 90.2、CRUXEval 98.9%。Thinking Path 激发长程推理与错误自修正能力。',
        tags: ['IQuest-Coder', 'Code-Flow', 'LoopCoder', 'Scaling Law', 'SWE-Bench'],
        path: '/papers/iquest-coder-v1'
      }
    ]
  }
];

const PaperCard = ({ paper }) => (
  <Link 
    to={paper.path} 
    className="block bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 hover:bg-slate-800/50 transition-all group h-full"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="flex gap-2 flex-wrap">
        {paper.tags.map(tag => (
          <span key={tag} className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-md font-medium border border-blue-500/20">
            {tag}
          </span>
        ))}
      </div>
      <ArrowRight className="text-slate-500 group-hover:text-blue-400 transition-colors shrink-0" size={20} />
    </div>
    
    <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-blue-300 transition-colors">
      {paper.title}
    </h3>
    
    <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
      <span className="flex items-center gap-1">
        <BookOpen size={14} />
        {paper.authors}
      </span>
      <span className="flex items-center gap-1">
        <Calendar size={14} />
        {paper.date}
      </span>
    </div>
    
    <p className="text-slate-400 text-sm line-clamp-4">
      {paper.description}
    </p>
  </Link>
);

const Home = () => {
  const [activeSection, setActiveSection] = useState('');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      
      for (const group of paperGroups) {
        const element = document.getElementById(group.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(group.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始化
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-blue-500/30">
      {/* 左侧固定导航栏 */}
      <aside className="fixed left-0 top-0 h-full w-56 bg-slate-900/80 backdrop-blur-md border-r border-slate-800 z-40 hidden lg:flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-2 text-blue-400">
            <List size={20} />
            <span className="font-semibold text-sm">目录导航</span>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          {paperGroups.map((group) => (
            <button
              key={group.id}
              onClick={() => scrollToSection(group.id)}
              className={`w-full text-left px-6 py-3 text-sm transition-all flex items-center justify-between group ${
                activeSection === group.id
                  ? 'bg-blue-500/10 text-blue-400 border-r-2 border-blue-500'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              <span className="truncate">{group.title}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded ${
                activeSection === group.id
                  ? 'bg-blue-500/20 text-blue-300'
                  : 'bg-slate-800 text-slate-500 group-hover:bg-slate-700'
              }`}>
                {group.papers.length}
              </span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800 text-xs text-slate-600">
          共 {paperGroups.reduce((sum, g) => sum + g.papers.length, 0)} 篇论文
        </div>
      </aside>

      {/* 主内容区域 */}
      <div className="lg:ml-56">
        <header className="pt-24 pb-12 px-6">
          <div className="container mx-auto max-w-5xl">
            <h1 className="text-4xl font-bold text-white mb-4">
              Paper Reading <span className="text-blue-500">Log</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl">
              Personal collection of paper notes, technical deep dives, and architectural breakdowns.
            </p>
          </div>
        </header>

        <main className="container mx-auto px-6 max-w-5xl pb-24 space-y-12">
          {paperGroups.map((group) => (
            <section key={group.id} id={group.id} className="scroll-mt-8 animate-fade-in">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                  <FolderOpen size={20} />
                </div>
                <h2 className="text-2xl font-bold text-slate-100">
                  {group.title}
                </h2>
                <span className="px-2 py-0.5 bg-slate-800 text-slate-400 text-xs rounded-full">
                  {group.papers.length}
                </span>
              </div>
              
              {group.papers.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {group.papers.map(paper => (
                    <PaperCard key={paper.id} paper={paper} />
                  ))}
                </div>
              ) : (
                <div className="text-slate-500 text-sm italic p-4 border border-slate-800 border-dashed rounded-xl text-center">
                  No papers added yet. Coming soon...
                </div>
              )}
            </section>
          ))}
        </main>

        <footer className="border-t border-slate-900 py-8 text-center text-slate-600 text-sm">
          <div className="container mx-auto">
            © 2025 Paper Reading Log
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
