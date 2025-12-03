import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DeepSeekV3 from './pages/papers/DeepSeekV3';
import DeepSeekProverV2 from './pages/papers/DeepSeekProverV2';
import DeepSeekMathV2 from './pages/papers/DeepSeekMathV2';
import DeepSeekLLM from './pages/papers/DeepSeekLLM';
import DeepSeekV2 from './pages/papers/DeepSeekV2';
import Qwen1 from './pages/papers/Qwen1';
import Qwen2 from './pages/papers/Qwen2';
import LlamaDeepDive from './pages/papers/LlamaDeepDive';
import Llama2 from './pages/papers/LLama2';
import Llama3 from './pages/papers/LLama3';
import DeepRLHumanPrefs from './pages/papers/DeepRLHumanPrefs';
import InstructGPTPaper from './pages/papers/InstructGPTPaper';
import DeepSeekMathPaper from './pages/papers/DeepSeekMathPaper';
import GSPOPaper from './pages/papers/GSPOPaper';
import ASPOPaper from './pages/papers/ASPOPaper';
import DPOPaper from './pages/papers/DPOPaper';
import LoRAPaper from './pages/papers/LoRAPaper';
import LoRAPlusPaper from './pages/papers/LoRAPlusPaper';
import LoRAFAPaper from './pages/papers/LoRAFAPaper';
import AdaLoRAPaper from './pages/papers/AdaLoRAPaper';
import DoRAPaper from './pages/papers/DoRAPaper';
import Qwen25 from './pages/papers/Qwen25';
import GatedAttention from './pages/papers/GatedAttention';
import Qwen3 from './pages/papers/Qwen3';
import MLLMSurvey from './pages/papers/MLLMSurvey';
import MLLMOverview from './pages/papers/MLLMOverview';
import DeepSeekV32 from './pages/papers/DeepSeekV32';
import VITPaper from './pages/papers/VITPaper';
import MMLLMsPaper from './pages/papers/MMLLMsPaper';
import MLLMRevolutionPaper from './pages/papers/MLLMRevolutionPaper';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/papers/deepseek-v3" element={<DeepSeekV3 />} />
        <Route path="/papers/deepseek-v2" element={<DeepSeekV2 />} />
        <Route path="/papers/deepseek-prover-v2" element={<DeepSeekProverV2 />} />
        <Route path="/papers/deepseek-math-v2" element={<DeepSeekMathV2 />} />
        <Route path="/papers/deepseek-llm" element={<DeepSeekLLM />} />
        <Route path="/papers/qwen1" element={<Qwen1 />} />
        <Route path="/papers/qwen2" element={<Qwen2 />} />
        <Route path="/papers/llama-deep-dive" element={<LlamaDeepDive />} />
        <Route path="/papers/llama2" element={<Llama2 />} />
        <Route path="/papers/llama3" element={<Llama3 />} />
        <Route path="/papers/deep-rl-human-prefs" element={<DeepRLHumanPrefs />} />
        <Route path="/papers/instructgpt" element={<InstructGPTPaper />} />
        <Route path="/papers/deepseek-math" element={<DeepSeekMathPaper />} />
        <Route path="/papers/gspo" element={<GSPOPaper />} />
        <Route path="/papers/aspo" element={<ASPOPaper />} />
        <Route path="/papers/dpo" element={<DPOPaper />} />
        <Route path="/papers/lora" element={<LoRAPaper />} />
        <Route path="/papers/lora-plus" element={<LoRAPlusPaper />} />
        <Route path="/papers/lora-fa" element={<LoRAFAPaper />} />
        <Route path="/papers/adalora" element={<AdaLoRAPaper />} />
        <Route path="/papers/dora" element={<DoRAPaper />} />
        <Route path="/papers/qwen25" element={<Qwen25 />} />
        <Route path="/papers/gated-attention" element={<GatedAttention />} />
        <Route path="/papers/qwen3" element={<Qwen3 />} />
        <Route path="/papers/mllm-survey" element={<MLLMSurvey />} />
        <Route path="/papers/mllm-overview" element={<MLLMOverview />} />
        <Route path="/papers/deepseek-v32" element={<DeepSeekV32 />} />
        <Route path="/papers/vit-survey" element={<VITPaper />} />
        <Route path="/papers/mm-llms" element={<MMLLMsPaper />} />
        <Route path="/papers/mllm-revolution" element={<MLLMRevolutionPaper />} />
      </Routes>
    </Router>
  );
};

export default App;
