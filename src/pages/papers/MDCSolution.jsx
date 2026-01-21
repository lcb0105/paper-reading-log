import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Database, FileCode, Search, Bot, CheckCircle, Medal, Filter, Brain, ExternalLink, Github, Layers, Scissors, Zap, BookOpen, Code, FileText, Settings } from 'lucide-react';

const MDCSolution = () => {
  // 处理导航点击滚动
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 64;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">返回首页</span>
            </Link>
            <div className="flex items-center gap-2">
              <Database className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-xl tracking-tight text-gray-900">MDC Solution</span>
            </div>
            <div className="hidden md:flex space-x-6 text-sm font-medium">
              <button onClick={(e) => scrollToSection(e, 'overview')} className="text-gray-500 hover:text-blue-600 transition">概览</button>
              <button onClick={(e) => scrollToSection(e, 'pipeline')} className="text-gray-500 hover:text-blue-600 transition">流程</button>
              <button onClick={(e) => scrollToSection(e, 'parsing')} className="text-gray-500 hover:text-blue-600 transition">解析</button>
              <button onClick={(e) => scrollToSection(e, 'regex')} className="text-gray-500 hover:text-blue-600 transition">正则</button>
              <button onClick={(e) => scrollToSection(e, 'llm')} className="text-gray-500 hover:text-blue-600 transition">LLM</button>
              <button onClick={(e) => scrollToSection(e, 'code')} className="text-gray-500 hover:text-blue-600 transition">代码</button>
              <a href="https://www.kaggle.com/competitions/make-data-count-finding-data-references" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                Kaggle <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="overview" className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
                  <Medal className="w-4 h-4 mr-2" /> Rank 52 / 1282 (Silver Medal)
                </div>
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">寻找数据引用</span>
                  <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Make Data Count 2025</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-auto">
                  这是一个针对科研论文全文的数据引用识别方案。我们采用了"解析-提取-LLM验证-后处理"的四阶段流水线，结合规则与 Qwen2.5 大模型，实现了高精度的端到端提取。
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <button onClick={(e) => scrollToSection(e, 'pipeline')} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                      查看详细方案
                    </button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10">
                      <Github className="w-5 h-5 mr-2" /> 代码仓库
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-gray-50 flex items-center justify-center p-8">
          <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
            <div className="bg-white p-6 rounded-xl shadow-lg transform translate-y-4">
              <FileCode className="w-8 h-8 text-blue-500 mb-2" />
              <div className="font-bold text-gray-900">PDF & XML</div>
              <div className="text-sm text-gray-500">双流解析处理</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg transform -translate-y-4">
              <Filter className="w-8 h-8 text-purple-500 mb-2" />
              <div className="font-bold text-gray-900">800+ Prefixes</div>
              <div className="text-sm text-gray-500">黑名单过滤机制</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg transform translate-y-4">
              <Brain className="w-8 h-8 text-green-500 mb-2" />
              <div className="font-bold text-gray-900">Qwen 2.5 32B</div>
              <div className="text-sm text-gray-500">上下文语义验证</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg transform -translate-y-4">
              <CheckCircle className="w-8 h-8 text-pink-500 mb-2" />
              <div className="font-bold text-gray-900">F1 Score</div>
              <div className="text-sm text-gray-500">Top 4% 排名</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pipeline Overview */}
      <section id="pipeline" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Methodology</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              四阶段流水线架构
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              我们的方案由四个紧密耦合的模块组成，旨在平衡召回率与精确率。
            </p>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-lg text-center hover:transform hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl mb-4">
                  <FileCode className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">1. 文档解析</h3>
                <p className="text-sm text-gray-500">
                  统一处理 PDF (PyMuPDF) 和 XML (TEI/JATS/BioC)，支持并发与错误恢复，清洗非文本字符。
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-lg text-center hover:transform hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-2xl mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">2. ID 提取</h3>
                <p className="text-sm text-gray-500">
                  基于正则提取 DOI 和 Accession ID (PDB, GEO等)。利用 800+ 出版商前缀过滤文献引用。
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-lg text-center hover:transform hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center text-green-600 text-2xl mb-4">
                  <Bot className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">3. LLM 验证</h3>
                <p className="text-sm text-gray-500">
                  使用 Qwen2.5-32B 对 DOI 候选进行上下文二分类判定（Data vs Literature），阈值 0.7。
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-lg text-center hover:transform hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 mx-auto bg-pink-100 rounded-full flex items-center justify-center text-pink-600 text-2xl mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">4. 后处理</h3>
                <p className="text-sm text-gray-500">
                  关键词（Context Keywords）二次过滤，去除重复，统一格式化为 DOI 链接。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parsing Section */}
      <section id="parsing" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <FileText className="w-6 h-6 text-blue-600" />
            Step 1: 文档解析详解
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* PDF Parsing */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <FileCode className="w-5 h-5 text-red-500" />
                PDF 解析 (PyMuPDF)
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                使用 <code className="bg-gray-100 px-1 rounded">fitz</code> (PyMuPDF) 逐页提取文本，支持并发处理提升效率：
              </p>
              <div className="bg-gray-900 rounded-lg p-4 text-xs text-gray-300 font-mono overflow-x-auto">
{`# parse.py - PDF解析核心代码
def pdf2text(path, out_dir):
    doc = pymupdf.open(str(path))
    out = out_dir / f"{path.stem}.txt"
    with open(out, "wb") as f:
        for page in doc:
            f.write(page.get_text().encode("utf8"))
            f.write(b"\\n")

# 并发处理 (pdfs_parallel_extract.py)
with ProcessPoolExecutor(max_workers) as executor:
    future_to_path = {
        executor.submit(process_single_pdf, path): path 
        for path in pdf_paths
    }`}
              </div>
            </div>

            {/* XML Parsing */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-green-500" />
                XML 解析 (多Schema支持)
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                自动检测 XML 类型 (TEI/JATS/Wiley/BioC)，针对性提取正文和参考文献：
              </p>
              <div className="bg-gray-900 rounded-lg p-4 text-xs text-gray-300 font-mono overflow-x-auto">
{`# parse.py - XML类型检测
def xml_kind(path) -> str:
    head = path.open('rb').read(2048).decode('utf8','ignore')
    if 'www.tei-c.org/ns' in head: return 'tei'
    if re.search(r'(NLM|TaxonX)//DTD', head): return 'jats'
    if 'www.wiley.com/namespaces' in head: return 'wiley'
    if 'BioC.dtd' in head: return 'bioc'
    return 'unknown'

# JATS格式专门提取body和ref-list
if kind == 'jats':
    elems = root.xpath('//body//sec|//ref-list')
    txt = ' '.join(' '.join(e.itertext()) for e in elems)`}
              </div>
            </div>
          </div>

          {/* Reference Section Detection */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Scissors className="w-5 h-5 text-purple-500" />
              引用区域检测：分割正文与参考文献
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              为了减少来自参考文献部分的噪音，我们实现了智能引用区域检测，将正文 (body) 和参考文献 (references) 分开处理：
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-sm text-gray-700 mb-2">检测策略</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• 查找 "REFERENCES"、"BIBLIOGRAPHY" 等标题</li>
                  <li>• 检测 [1]、(1)、1. 等引用编号模式</li>
                  <li>• 从文档后 50% 开始搜索以提高效率</li>
                  <li>• 支持多次出现时取最后一次</li>
                </ul>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 text-xs text-gray-300 font-mono">
{`# getid.py - 引用检测正则
ref_header_patterns = [
    r'\\b(R\\s*E\\s*F\\s*E\\s*R\\s*E\\s*N\\s*C\\s*E\\s*S|
    BIBLIOGRAPHY|LITERATURE CITED|
    WORKS CITED|ACKNOWLEDGEMENTS)\\b'
]
citation_pattern = r'^\\s*(\\[\\d+\\]|\\(\\d+\\)|\\d+\\.)\\s*'`}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regex Extraction Section */}
      <section id="regex" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Search className="w-6 h-6 text-purple-600" />
            Step 2: 正则表达式提取详解
          </h2>

          {/* Accession ID Patterns */}
          <div className="bg-gray-50 p-6 rounded-xl mb-8">
            <h3 className="font-bold text-lg mb-4 text-purple-700">Accession ID 正则模式 (REGEX_IDS)</h3>
            <p className="text-gray-600 text-sm mb-4">涵盖 20+ 种生物信息学数据库的 ID 格式：</p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="bg-white p-3 rounded-lg border">
                <h4 className="font-bold text-xs text-gray-700 mb-2">基因组学</h4>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li><code className="bg-purple-100 px-1 rounded">PRJNA\d+</code> BioProject</li>
                  <li><code className="bg-purple-100 px-1 rounded">GSE\d+</code> GEO Series</li>
                  <li><code className="bg-purple-100 px-1 rounded">SRR\d+</code> SRA Runs</li>
                </ul>
              </div>
              <div className="bg-white p-3 rounded-lg border">
                <h4 className="font-bold text-xs text-gray-700 mb-2">蛋白质组学</h4>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li><code className="bg-blue-100 px-1 rounded">PXD\d+</code> ProteomeXchange</li>
                  <li><code className="bg-blue-100 px-1 rounded">PDB [1-9][A-Z0-9]{'{'}3{'}'}</code></li>
                  <li><code className="bg-blue-100 px-1 rounded">MTBLS\d+</code> MetaboLights</li>
                </ul>
              </div>
              <div className="bg-white p-3 rounded-lg border">
                <h4 className="font-bold text-xs text-gray-700 mb-2">数据仓库</h4>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li><code className="bg-green-100 px-1 rounded">dryad\.\S+</code> Dryad</li>
                  <li><code className="bg-green-100 px-1 rounded">pangaea\.\d+</code> PANGAEA</li>
                  <li><code className="bg-green-100 px-1 rounded">pasta/\S+</code> PASTA</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 text-xs text-green-400 font-mono overflow-x-auto">
{`# getid.py - 完整 REGEX_IDS 模式
REGEX_IDS = (
    r"\\b(?:"
    r"GM[0-2]\\d{4}|NA[0-2]\\d{4}|HG0[0-4]\\d{3}|"           # 1000 Genomes
    r"AY\\d{6}|AB\\d{6}|MK\\d{6}|AM\\d{6}|AP\\d{6}|"         # GenBank
    r"CHEMBL\\d+|E-[A-Z]{4}-\\d{2,6}|"                        # ChEMBL, ArrayExpress
    r"ENSBTAG\\d+|ENSOARG\\d+|EMPIAR-\\d+|"                   # Ensembl, EMPIAR
    r"EPI_ISL_\\d{5,}|EPI\\d{6,7}|"                           # GISAID
    r"PRJNA\\d+|PRJDB\\d+|PRJEB\\d+|PXD\\d+|"                 # BioProject, PX
    r"SAM[NED][A-Z]?\\d{6,9}(?:\\.\\d+)?|"                    # BioSample
    r"GSE\\d+|GSM\\d+|"                                        # GEO
    r"PDB\\s?[1-9][A-Z0-9]{3}|HMDB\\d+|"                      # PDB, HMDB
    r"dryad\\.[^\\s\\"<>]+|pasta\\/[^\\s\\"<>]+|"             # Dryad, PASTA
    r"(?:SR[PX]|ERR|DRR|DRX|DRP|ERP|ERX)\\d{6,}|"             # SRA/ENA
    r"phs\\d{6}(?:\\.v\\d{1,2}\\.p\\d{1,2})?|"                # dbGaP
    r"EGA[SDC]\\d{11}"                                         # EGA
    r")\\b"
)`}
            </div>
          </div>

          {/* DOI Patterns for Data Repos */}
          <div className="bg-blue-50 p-6 rounded-xl mb-8">
            <h3 className="font-bold text-lg mb-4 text-blue-700">数据仓库 DOI 模式 (REGEX_DOI)</h3>
            <p className="text-gray-600 text-sm mb-4">针对特定数据仓库的 DOI 格式，这些 DOI 有独特的命名规则：</p>
            
            <div className="bg-gray-900 rounded-lg p-4 text-xs text-blue-400 font-mono overflow-x-auto">
{`# getid.py - 特定数据仓库 DOI 模式
REGEX_DOI = (
    r"(?i)(?:"
    r"10\\.17632/[a-z0-9]{10}\\.\\d|"           # Mendeley Data
    r"10\\.7910/dvn/[a-z0-9]{6}|"               # Harvard Dataverse
    r"10\\.6073/pasta/[0-9a-f]{32}|"            # PASTA/EDI
    r"10\\.5066/[pf]9[a-z0-9]{6}|"              # USGS ScienceBase
    r"10\\.5281/zenodo\\.\\d+|"                  # Zenodo
    r"10\\.5061/dryad\\.[^\\s]+|"                # Dryad
    r"10\\.1594/pangaea\\.\\d+|"                 # PANGAEA
    r"10\\.22033/esgf/cmip6\\.\\d{3,5}|"        # ESGF CMIP6
    r"10\\.15485/\\d{7}|"                        # DOE OSTI
    r"10\\.7937/(?:k9/)?tcia.*"                  # TCIA Cancer Imaging
    r")\\b"
)`}
            </div>
          </div>

          {/* 800+ Blacklist Prefixes */}
          <div className="bg-red-50 p-6 rounded-xl">
            <h3 className="font-bold text-lg mb-4 text-red-700 flex items-center gap-2">
              <Filter className="w-5 h-5" />
              800+ 出版商前缀黑名单
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              这些 DOI 前缀对应学术期刊/出版商，提取时直接过滤以减少误报：
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-4">
              {[
                { prefix: '10.1038', name: 'Nature' },
                { prefix: '10.1126', name: 'Science' },
                { prefix: '10.1016', name: 'Elsevier' },
                { prefix: '10.1371', name: 'PLOS' },
                { prefix: '10.1093', name: 'Oxford' },
                { prefix: '10.1007', name: 'Springer' },
                { prefix: '10.1002', name: 'Wiley' },
                { prefix: '10.1073', name: 'PNAS' },
                { prefix: '10.3390', name: 'MDPI' },
                { prefix: '10.1186', name: 'BMC' },
                { prefix: '10.7554', name: 'eLife' },
                { prefix: '10.1101', name: 'bioRxiv' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-2 rounded border text-xs text-center">
                  <code className="text-red-600">{item.prefix}</code>
                  <div className="text-gray-500 mt-1">{item.name}</div>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-900 rounded-lg p-4 text-xs text-gray-300 font-mono">
{`# helpers.py - 800+ 前缀黑名单 (部分示例)
PAPER_PREFIXES = [
    '10.3390', '10.1186', '10.1128', '10.1016', '10.1371', 
    '10.1038', '10.3389', '10.1093', '10.1007', '10.1002', 
    '10.1021', '10.1111', '10.1073', '10.1080', '10.1074',
    # ... 共 800+ 个前缀
]

def is_paper_prefix(col: str = "dataset_id") -> pl.Expr:
    expr = pl.lit(False)
    for p in PAPER_PREFIXES:
        expr = expr | pl.col(col).str.starts_with(f"{DOI_LINK}{p}")
    return expr`}
            </div>
          </div>
        </div>
      </section>

      {/* LLM Section */}
      <section id="llm" className="py-16 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Brain className="w-6 h-6 text-green-600" />
            Step 3: Qwen2.5-32B LLM 语义验证
          </h2>

          {/* Overview */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
            <h3 className="font-bold text-lg mb-4 text-green-700">核心思路</h3>
            <p className="text-gray-600 mb-4">
              正则提取召回率高，但会将大量参考文献的 DOI 误判为数据集。我们引入 <strong>Qwen2.5-32B-Instruct-AWQ</strong> 进行二分类判定：
            </p>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <Scissors className="w-6 h-6 mx-auto text-green-600 mb-2" />
                <div className="text-sm font-bold">上下文截取</div>
                <div className="text-xs text-gray-500">DOI 前后 ±100 字符</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <BookOpen className="w-6 h-6 mx-auto text-blue-600 mb-2" />
                <div className="text-sm font-bold">System Prompt</div>
                <div className="text-xs text-gray-500">包含判断规则和示例</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <Zap className="w-6 h-6 mx-auto text-purple-600 mb-2" />
                <div className="text-sm font-bold">Logits Processor</div>
                <div className="text-xs text-gray-500">只输出 A/B 二选一</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <Settings className="w-6 h-6 mx-auto text-orange-600 mb-2" />
                <div className="text-sm font-bold">阈值过滤</div>
                <div className="text-xs text-gray-500">P(A) &gt; 0.7 才保留</div>
              </div>
            </div>
          </div>

          {/* Context Window */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
            <h3 className="font-bold text-lg mb-4 text-blue-700">上下文窗口截取</h3>
            <p className="text-gray-600 text-sm mb-4">
              为每个提取到的 DOI，我们从原始文本中截取其前后各 100 个字符作为上下文，供 LLM 判断：
            </p>
            <div className="bg-gray-900 rounded-lg p-4 text-xs text-gray-300 font-mono">
{`# getid.py - 上下文窗口截取函数
def get_context_window(text: str, substring: str, window: int = 100) -> str:
    idx = text.find(substring)
    if idx == -1:
        raise ValueError
    start = max(idx - window, 0)
    end = min(idx + len(substring) + window, len(text))
    return text[start:end]

# 示例输出:
# "...were deposited to the Dryad repository (https://doi.org/10.5061/dryad.x1y2z3). 
#  All sequence data are available..."`}
            </div>
          </div>

          {/* Complete System Prompt */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
            <h3 className="font-bold text-lg mb-4 text-purple-700">完整 System Prompt</h3>
            <div className="grid lg:grid-cols-2 gap-4">
              {/* Rules A */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-bold text-sm text-green-800 mb-3">✅ 输出 A (数据集) 的规则</h4>
                <ul className="text-xs text-gray-600 space-y-2">
                  <li>• DOI 前缀匹配已知数据仓库 (Dryad: 10.5061, Zenodo: 10.5281, Figshare: 10.6084...)</li>
                  <li>• 文本使用 "we generated", "we created", "we collected" 等表述</li>
                  <li>• 明确说明 "specifically generated for this study"</li>
                  <li>• 描述了作者直接参与数据生成/处理的过程</li>
                  <li>• 使用 NCBI SRA (SRP), BioProject (PRJNA), GEO (GSE) 等前缀</li>
                  <li>• 文本说 "raw data collected by our team"</li>
                </ul>
              </div>
              {/* Rules B */}
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-bold text-sm text-red-800 mb-3">❌ 输出 B (文献) 的规则</h4>
                <ul className="text-xs text-gray-600 space-y-2">
                  <li>• 明确引用参考文献 "using dataset from [Author et al., Year]"</li>
                  <li>• 使用 "we reused the existing dataset" 等表述</li>
                  <li>• 数据集名称是公认的 benchmark (如 MNIST, ImageNet)</li>
                  <li>• 说明数据 "retrieved from [external source]"</li>
                  <li>• 第三方是数据创建者 "developed by [Institution] in 20XX"</li>
                  <li>• 数据集 "has been used in previous studies"</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Few-shot Examples */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
            <h3 className="font-bold text-lg mb-4 text-orange-700">Few-shot 示例</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold text-xs text-green-700 mb-2">→ A (数据集)</h4>
                <ul className="text-xs text-gray-600 space-y-2 bg-green-50 p-3 rounded-lg">
                  <li>"Raw images are stored on Figshare (DOI 10.6084/m9.figshare.1234567)." → <strong className="text-green-700">A</strong></li>
                  <li>"Sequence reads available under BioProject accession PRJNA765432." → <strong className="text-green-700">A</strong></li>
                  <li>"See Supplementary Data at Zenodo (10.5281/zenodo.987654)." → <strong className="text-green-700">A</strong></li>
                  <li>"Metabolomics data in MetaboLights MTBLS1234." → <strong className="text-green-700">A</strong></li>
                  <li>"MRI scans deposited at OpenNeuro (DOI 10.18112/openneuro.ds000001)." → <strong className="text-green-700">A</strong></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-xs text-red-700 mb-2">→ B (文献)</h4>
                <ul className="text-xs text-gray-600 space-y-2 bg-red-50 p-3 rounded-lg">
                  <li>"As described in Nature Methods (DOI 10.1038/s41592-020-0793-2)." → <strong className="text-red-700">B</strong></li>
                  <li>"Method details published in J. Proteome Res. DOI: 10.1021/acs.jproteome." → <strong className="text-red-700">B</strong></li>
                  <li>"Referenced paper: DOI 10.1101/2020.01.01.123456 (bioRxiv preprint)." → <strong className="text-red-700">B</strong></li>
                  <li>"Protein structure described in Science (DOI 10.1126/science.abc1234)." → <strong className="text-red-700">B</strong></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Inference Code */}
          <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl">
            <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
              <span className="text-gray-300 text-xs font-mono">llm_validate.py - vLLM 推理代码</span>
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <pre className="p-4 text-xs text-gray-300 overflow-x-auto">
              <code>{`# llm_validate.py - 完整推理流程

# 1. 加载 Qwen2.5-32B-AWQ 模型 (量化版本节省显存)
model_path = "/kaggle/input/qwen2.5/transformers/32b-instruct-awq/1"
llm = vllm.LLM(
    model_path, 
    quantization='awq',
    tensor_parallel_size=2,        # 双 GPU 并行
    gpu_memory_utilization=0.9,
    max_model_len=4096,
    enable_prefix_caching=True     # 缓存 System Prompt
)

# 2. 使用 MultipleChoiceLogitsProcessor 强制只输出 A 或 B
from logits_processor_zoo.vllm import MultipleChoiceLogitsProcessor
mclp = MultipleChoiceLogitsProcessor(tokenizer, choices=["A", "B"])

# 3. 执行推理，获取 logprobs
outputs = llm.generate(prompts, vllm.SamplingParams(
    n=1,
    temperature=0,                  # 确定性输出
    max_tokens=1,                   # 只生成一个 token
    logits_processors=[mclp],
    logprobs=5                      # 返回 top-5 概率
))

# 4. 计算概率并应用阈值
logprobs = [{lp.decoded_token: lp.logprob for lp in list(lps)} 
            for lps in [out.outputs[0].logprobs[0].values() for out in outputs]]

choices = [math.exp(d["A"]) for d in logprobs]  # 转换为概率
choices = [True if p > 0.7 else False for p in choices]  # 阈值 0.7

# 只有置信度 > 70% 的 DOI 才被保留为数据集`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Post Processing Section */}
      <section id="code" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-pink-600" />
            Step 4: 后处理与精细化过滤
          </h2>

          {/* Context Keywords Filter */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
            <h3 className="font-bold text-lg mb-4 text-pink-700">上下文关键词二次过滤</h3>
            <p className="text-gray-600 text-sm mb-4">
              对于通过了 LLM 验证但 DOI 前缀仍在出版商列表中的候选，我们检查其上下文是否包含"数据相关"关键词。如果不包含，则剔除：
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-bold text-xs text-green-700 mb-2">✅ 数据相关关键词</h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  {['dataset', 'repository', 'archive', 'deposited', 'available', 'availability', 
                    'supplementary', 'raw data', 'uploaded', 'hosted', 'stored', 'accession',
                    'accessed', 'obtained', 'downloaded', 'archived', 'housed'].map((kw, i) => (
                    <span key={i} className="bg-white px-2 py-1 rounded border border-green-200 text-green-700">{kw}</span>
                  ))}
                </div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 text-xs text-gray-300 font-mono">
{`# post_filter.py - 关键词正则
CONTEXT_RE = r"(?i)\\b(
    data(?:set)?|repository|archive|
    deposited|available|availability|
    supplementary|raw(?:\\s+data)?|
    uploaded|hosted|stored|accession|
    accessed|found|obtained|downloaded|
    archived|housed
)\\b"

# 过滤逻辑
keep_mask = (
    (~is_paper_prefix("dataset_id"))
    | doi_rows["window"].str.contains(CONTEXT_RE)
)`}
              </div>
            </div>
          </div>

          {/* Deduplication */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
            <h3 className="font-bold text-lg mb-4 text-purple-700">去重：消除 OCR 错误</h3>
            <p className="text-gray-600 text-sm mb-4">
              PDF OCR 经常产生末尾数字错误的 DOI（如 10.5061/dryad.x1y2z3 被错误识别为 10.5061/dryad.x1y2z34）。我们通过检测"只差一位数字"的重复来清理：
            </p>
            
            <div className="bg-gray-900 rounded-lg p-4 text-xs text-gray-300 font-mono">
{`# post_filter.py - 去重逻辑
def remove_extra_digit(df: pl.DataFrame, column: str) -> pl.DataFrame:
    """
    Remove rows where the value in column is just the same DOI 
    with one extra digit at the end (common OCR error).
    """
    items_set = set(df[column].to_list())
    
    def keep_row(value):
        # 如果去掉末尾1-2位数字后存在于集合中，则为冗余
        if (value[-1].isdigit() and value[:-1] in items_set) or \\
           (len(value) > 2 and value[-2:].isdigit() and value[:-2] in items_set):
            return False
        return True
    
    return df.filter(pl.col(column).map_elements(keep_row, return_dtype=pl.Boolean))`}
            </div>
          </div>

          {/* Accession ID Processing */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
            <h3 className="font-bold text-lg mb-4 text-blue-700">Accession ID 特殊处理</h3>
            <p className="text-gray-600 text-sm mb-4">
              对于 Accession ID（非 DOI 格式），我们直接信任正则结果，不进行 LLM 验证，并自动转换为标准 DOI 格式：
            </p>
            
            <div className="bg-gray-900 rounded-lg p-4 text-xs text-gray-300 font-mono">
{`# getid.py - Accession ID 转 DOI
acc_df = acc_df.with_columns(
    # Dryad: dryad.x1y2z3 → https://doi.org/10.5061/dryad.x1y2z3
    pl.when(pl.col('dataset_id').str.contains(r'^(dryad\\.|DRYAD\\.)'))
      .then(f'{DOI_LINK}10.5061/' + pl.col('dataset_id').str.to_lowercase())
      .otherwise('dataset_id')
      .alias('dataset_id')
).with_columns(
    # PASTA: pasta/xxx → https://doi.org/10.6073/pasta/xxx
    pl.when(pl.col('dataset_id').str.contains(r'^(pasta\\/|PASTA\\/)'))
      .then(f'{DOI_LINK}10.6073/' + pl.col('dataset_id').str.to_lowercase())
      .otherwise('dataset_id')
      .alias('dataset_id')
).with_columns(
    # PANGAEA: pangaea.123456 → https://doi.org/10.1594/pangaea.123456
    pl.when(pl.col('dataset_id').str.contains('^(pangaea\\.|PANGAEA\\.)'))
      .then(f'{DOI_LINK}10.1594/' + pl.col('dataset_id').str.to_lowercase())
      .otherwise('dataset_id')
      .alias('dataset_id')
)`}
            </div>
          </div>

          {/* Data Type Classification */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
            <h3 className="font-bold text-lg mb-4 text-orange-700">数据类型分类 (Primary vs Secondary)</h3>
            <p className="text-gray-600 text-sm mb-4">
              最终输出需要区分 Primary（原始数据存储）和 Secondary（数据集引用）。我们基于 DOI 前缀和 Accession ID 格式进行分类：
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-bold text-xs text-green-700 mb-2">Primary 数据</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• DOI 格式：以 <code className="bg-white px-1 rounded">https://doi.org/</code> 开头</li>
                  <li>• 特定仓库 DOI (Dryad, Zenodo, Figshare...)</li>
                  <li>• LLM 判定为数据集的候选</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-bold text-xs text-blue-700 mb-2">Secondary 数据</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Accession ID 格式：GSE, PRJNA, PXD 等</li>
                  <li>• SAM (BioSample) 开头的 ID</li>
                  <li>• 非 DOI 格式的数据库引用</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-4 text-xs text-gray-300 font-mono mt-4">
{`# helpers.py - 类型分类函数
def assume_type(df: pl.DataFrame) -> pl.DataFrame:
    return df.with_columns(
        pl.when(
            is_doi_link('dataset_id')  # DOI 格式
            .or_(pl.col('dataset_id').str.starts_with('SAM'))  # BioSample
        )
        .then(pl.lit('Primary'))
        .otherwise(pl.lit('Secondary'))
        .alias('type')
    )`}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-lg mb-4 text-gray-700">技术栈</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { name: 'Polars', desc: '高性能 DataFrame', color: 'blue' },
                { name: 'vLLM', desc: 'LLM 推理加速', color: 'green' },
                { name: 'PyMuPDF', desc: 'PDF 解析', color: 'red' },
                { name: 'lxml', desc: 'XML 解析', color: 'yellow' },
                { name: 'Qwen2.5-32B', desc: 'AWQ 量化模型', color: 'purple' },
                { name: 'logits-processor-zoo', desc: '输出控制', color: 'pink' },
              ].map((tech, idx) => (
                <div key={idx} className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className={`text-sm font-bold text-${tech.color}-600 mb-1`}>{tech.name}</div>
                  <div className="text-xs text-gray-500">{tech.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pipeline Summary */}
      <section className="py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">完整流程总结</h2>
          
          {/* Flow Diagram */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="bg-blue-100 px-4 py-2 rounded-lg font-bold text-blue-700">PDF/XML</div>
              <span className="text-gray-400">→</span>
              <div className="bg-blue-100 px-4 py-2 rounded-lg font-bold text-blue-700">PyMuPDF/lxml</div>
              <span className="text-gray-400">→</span>
              <div className="bg-purple-100 px-4 py-2 rounded-lg font-bold text-purple-700">正则提取</div>
              <span className="text-gray-400">→</span>
              <div className="bg-red-100 px-4 py-2 rounded-lg font-bold text-red-700">800+ 前缀过滤</div>
              <span className="text-gray-400">→</span>
              <div className="bg-green-100 px-4 py-2 rounded-lg font-bold text-green-700">Qwen2.5-32B</div>
              <span className="text-gray-400">→</span>
              <div className="bg-pink-100 px-4 py-2 rounded-lg font-bold text-pink-700">后处理</div>
              <span className="text-gray-400">→</span>
              <div className="bg-orange-100 px-4 py-2 rounded-lg font-bold text-orange-700">submission.csv</div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm">
              <h3 className="font-bold text-lg mb-3 text-green-600">✅ What Worked</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span><strong>800+ 黑名单前缀</strong>：快速过滤文献，减少 LLM 调用量</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span><strong>Logits 概率 + 阈值</strong>：比生成文本更稳定可靠</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span><strong>上下文窗口 ±100 字符</strong>：平衡信息量与噪声</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span><strong>Accession ID 直接信任</strong>：格式特征明确，无需 LLM</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span><strong>引用区域检测</strong>：减少参考文献部分的误报</span>
                </li>
              </ul>
            </div>
            
            <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm">
              <h3 className="font-bold text-lg mb-3 text-amber-600">💡 Key Takeaways</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  <span><strong>规则 + LLM 混合</strong>：规则高召回，LLM 精准过滤</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  <span><strong>阈值 0.7</strong>：多次实验后的最优平衡点</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  <span><strong>ProcessPoolExecutor</strong>：PDF 并发解析提速</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  <span><strong>Polars 替代 Pandas</strong>：大规模数据处理更高效</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  <span><strong>Prefix Caching</strong>：vLLM 缓存 System Prompt</span>
                </li>
              </ul>
            </div>
            
            <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm">
              <h3 className="font-bold text-lg mb-3 text-red-600">❌ Lessons Learned</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>OCR 噪音</strong>：PDF 解析产生大量末尾错误</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>DOI 换行</strong>：跨行 DOI 需要特殊正则处理</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>XML Schema 多样性</strong>：TEI/JATS/Wiley 各有差异</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>边界情况</strong>：同一 DOI 既是数据又是文献</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Figshare 特殊处理</strong>：需从结果中过滤</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="font-bold text-xl text-gray-900">MDC Solution</span>
            <p className="text-sm text-gray-500 mt-1">Make Data Count 2025 Competition - Silver Medal 🥈</p>
          </div>
          <div className="flex space-x-6">
            <a href="https://www.kaggle.com/competitions/make-data-count-finding-data-references" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition">
              <span className="sr-only">Kaggle</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2z"/>
              </svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition">
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MDCSolution;

