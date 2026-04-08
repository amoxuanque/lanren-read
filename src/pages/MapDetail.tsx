import React, { useState } from 'react';
import { mockMaps } from '../lib/mockData';
import { useApp } from '../contexts/AppContext';
import { ArrowLeft } from 'lucide-react';
import { clsx } from 'clsx';

export function MapDetail() {
  const { language, currentMapId, navigate } = useApp();
  const mapData = mockMaps.find(m => m.id === currentMapId) || mockMaps[0];
  
  const [activePart, setActivePart] = useState(mapData.parts?.[0]?.id);
  const [activeCategory, setActiveCategory] = useState(mapData.methods?.categories?.[0]);

  if (!mapData) return <div className="p-8 text-white">Map not found</div>;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1117] text-zinc-300 font-sans selection:bg-amber-500/30">
      {/* Sticky Nav */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#0f1117]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center px-4 sm:px-6 lg:px-8 h-14 overflow-x-auto scrollbar-hide">
          <button onClick={() => navigate('home')} className="mr-6 flex-shrink-0 text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex space-x-6 sm:space-x-8 text-sm font-medium whitespace-nowrap">
            <button onClick={() => scrollToSection('overview')} className="text-amber-500">总览</button>
            <button onClick={() => scrollToSection('knowledgeMap')} className="text-zinc-400 hover:text-zinc-200 transition-colors">知识地图</button>
            <button onClick={() => scrollToSection('parts')} className="text-zinc-400 hover:text-zinc-200 transition-colors">四大部分</button>
            <button onClick={() => scrollToSection('methods')} className="text-zinc-400 hover:text-zinc-200 transition-colors">方法地图</button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        
        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-32">
          <div className="flex-1">
            <div className="text-amber-500/80 text-sm font-medium tracking-widest mb-6 uppercase">中文交互知识地图</div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold leading-[1.1] tracking-tight text-white mb-8">
              《{mapData.title}》<br/>
              <span className="text-[#dcb773] text-2xl sm:text-3xl lg:text-4xl mt-4 block leading-snug">
                {mapData.oneLiner?.[language as 'zh' | 'en'] || mapData.oneLiner?.zh || ''}
              </span>
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl mb-10">
              {mapData.about?.[language as 'zh' | 'en']}
            </p>
            <div className="flex flex-wrap gap-4 mb-16">
              <button onClick={() => scrollToSection('parts')} className="rounded-full border border-zinc-700 bg-zinc-800/50 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800 transition-colors">
                先看整本书骨架
              </button>
              <button onClick={() => scrollToSection('knowledgeMap')} className="rounded-full border border-zinc-700 bg-transparent px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800/50 transition-colors">
                直接进入知识地图
              </button>
            </div>
            
            {mapData.stats && (
              <div className="grid grid-cols-2 gap-6 max-w-lg">
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                  <div className="text-xs text-amber-500/80 mb-2">书籍结构</div>
                  <div className="text-4xl font-serif text-white mb-4">{mapData.stats.structure}</div>
                  <div className="text-sm text-zinc-500">核心部分，层层递进。</div>
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                  <div className="text-xs text-amber-500/80 mb-2">阅读体量</div>
                  <div className="text-4xl font-serif text-white mb-4">{mapData.stats.volume}</div>
                  <div className="text-sm text-zinc-500">建议按模块阅读，提取核心框架。</div>
                </div>
              </div>
            )}
          </div>
          
          {/* Right Card */}
          <div className="lg:w-[400px] flex-shrink-0">
            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-800/50 to-zinc-900/50 p-8 overflow-hidden aspect-[3/4] flex flex-col justify-between">
              <div className="absolute top-20 right-20 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-40 right-10 w-24 h-24 bg-orange-500/20 rounded-full blur-3xl"></div>
              
              <div className="text-sm tracking-widest text-zinc-400 uppercase">{mapData.author || 'AUTHOR'}</div>
              
              <div className="mt-auto">
                <h2 className="text-5xl font-serif font-bold text-white mb-4">知识地图</h2>
                <div className="text-sm text-zinc-400 tracking-widest">使命 / 执行 / 公司 / 未来</div>
              </div>
            </div>
            
            {mapData.readingPosition && (
              <div className="mt-8">
                <div className="text-xs text-zinc-500 mb-2">阅读定位</div>
                <p className="text-sm text-zinc-400 leading-relaxed">{mapData.readingPosition[language as 'zh' | 'en'] || mapData.readingPosition.zh || mapData.readingPosition}</p>
              </div>
            )}
          </div>
        </section>

        {/* Overview Section */}
        {mapData.overview && (
          <section id="overview" className="mb-32 scroll-mt-24">
            <div className="text-xs text-amber-500/80 mb-4">总览</div>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">{mapData.overview.title}</h2>
            <p className="text-lg text-zinc-400 mb-12">{mapData.overview.subtitle}</p>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {mapData.overview.cards.map((card: any, idx: number) => (
                <div key={idx} className="relative rounded-2xl border border-white/5 bg-white/[0.02] p-6 pt-8 overflow-hidden group">
                  <div className={clsx("absolute top-0 left-0 right-0 h-1 bg-gradient-to-r", card.color)}></div>
                  <div className="text-xs text-zinc-500 mb-4">{card.layer}</div>
                  <h3 className="text-xl font-bold text-white mb-4">{card.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">{card.desc}</p>
                  <ul className="space-y-2">
                    {card.points.map((pt: string, i: number) => (
                      <li key={i} className="text-sm text-zinc-300 flex items-start">
                        <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-zinc-600 flex-shrink-0"></span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Knowledge Map Section */}
        {mapData.knowledgeMap && (
          <section id="knowledgeMap" className="mb-32 scroll-mt-24">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
              <div>
                <h2 className="text-3xl font-bold text-white mb-10">五大关键领域</h2>
                <div className="space-y-8">
                  {mapData.knowledgeMap.areas.map((area: any, idx: number) => (
                    <div key={idx}>
                      <div className="flex justify-between items-end mb-3">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                          {area.title}
                        </h3>
                        <span className="text-xs text-zinc-500">{area.status}</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mb-3">
                        <div className={clsx("h-full rounded-full", area.color)} style={{ width: `${area.progress}%` }}></div>
                      </div>
                      <p className="text-sm text-zinc-400">{area.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-white mb-10">核心思维工具</h2>
                <div className="space-y-6">
                  {mapData.knowledgeMap.tools.map((tool: any, idx: number) => (
                    <div key={idx} className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                      <div className="text-xs text-zinc-500 mb-2">思维工具</div>
                      <h3 className="text-xl font-bold text-white mb-3">{tool.title}</h3>
                      <p className="text-sm text-zinc-400 mb-4">{tool.desc}</p>
                      {tool.points && (
                        <ul className="space-y-2">
                          {tool.points.map((pt: string, i: number) => (
                            <li key={i} className="text-sm text-zinc-300 flex items-start">
                              <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-zinc-600 flex-shrink-0"></span>
                              {pt}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Parts Section */}
        {mapData.parts && (
          <section id="parts" className="mb-32 scroll-mt-24">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">不是目录复述，而是每一部分该怎么看</h2>
            <p className="text-lg text-zinc-400 mb-12">左边选部分，右边看这一部分的任务、重点章节和最该带走的东西。</p>
            
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Nav */}
              <div className="lg:w-1/3 space-y-4">
                {mapData.parts.map((part: any) => (
                  <button
                    key={part.id}
                    onClick={() => setActivePart(part.id)}
                    className={clsx(
                      "w-full text-left p-6 rounded-2xl border transition-all",
                      activePart === part.id 
                        ? "border-amber-500/50 bg-amber-500/5" 
                        : "border-white/5 bg-white/[0.02] hover:bg-white/[0.04]"
                    )}
                  >
                    <div className="text-xs text-amber-500/80 mb-2">{part.subtitle}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{part.title}</h3>
                    <p className="text-sm text-zinc-400">{part.navDesc}</p>
                  </button>
                ))}
              </div>
              
              {/* Right Content */}
              <div className="lg:w-2/3">
                {mapData.parts.map((part: any) => (
                  <div key={part.id} className={clsx(activePart === part.id ? "block" : "hidden")}>
                    <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 sm:p-10">
                      <div className="text-xs text-amber-500/80 mb-2">{part.subtitle}</div>
                      <h3 className="text-4xl font-serif font-bold text-white mb-6">{part.title}</h3>
                      <p className="text-base text-zinc-300 leading-relaxed mb-8">{part.intro}</p>
                      
                      <div className="flex flex-wrap gap-3 mb-10">
                        {part.tags.map((tag: string, i: number) => (
                          <span key={i} className="rounded-full border border-white/10 px-4 py-1.5 text-xs text-zinc-400">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="rounded-2xl bg-white/[0.02] p-6 border border-white/5">
                          <h4 className="text-sm font-bold text-white mb-4">这一部分的任务</h4>
                          <p className="text-sm text-zinc-400">{part.task}</p>
                        </div>
                        <div className="rounded-2xl bg-white/[0.02] p-6 border border-white/5">
                          <h4 className="text-sm font-bold text-white mb-4">优先章节</h4>
                          <div className="flex flex-wrap gap-2">
                            {part.chapters.map((ch: string, i: number) => (
                              <span key={i} className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-400">
                                {ch}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="rounded-2xl bg-white/[0.02] p-6 border border-white/5">
                          <h4 className="text-sm font-bold text-white mb-4">看完该带走</h4>
                          <ul className="space-y-2">
                            {part.takeaways.map((pt: string, i: number) => (
                              <li key={i} className="text-sm text-zinc-400 flex items-start">
                                <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-zinc-600 flex-shrink-0"></span>
                                {pt}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="rounded-2xl bg-white/[0.02] p-6 border border-white/5">
                          <h4 className="text-sm font-bold text-white mb-4">怎么理解它的位置</h4>
                          <p className="text-sm text-zinc-400">{part.position}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Methods Grid Section */}
        {mapData.methods && (
          <section id="methods" className="mb-32 scroll-mt-24">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">
              {mapData.methods.items.length}条方法不做横向切换，改成固定知识网格
            </h2>
            <p className="text-lg text-zinc-400 mb-10">这里不再依赖左右滑动，而是把方法按类别切成固定地图。点击分类会在同一页里切换内容，不会超出页面。</p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              {mapData.methods.categories.map((cat: string, i: number) => {
                const isActive = activeCategory === cat;
                return (
                  <button 
                    key={i} 
                    onClick={() => setActiveCategory(cat)}
                    className={clsx(
                      "rounded-full border px-4 py-1.5 text-xs transition-colors",
                      isActive ? "border-amber-500/50 text-amber-500 bg-amber-500/10" : "border-white/10 text-zinc-400 hover:text-white"
                    )}
                  >
                    {cat} · {mapData.methods.items.filter((item:any) => item.category === cat).length || 12}
                  </button>
                );
              })}
            </div>
            
            <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 mb-6">
              <div className="text-xs text-zinc-500 mb-4">{activeCategory} · {mapData.methods.items.filter((item:any) => item.category === activeCategory).length} 条</div>
              <h3 className="text-2xl font-bold text-white mb-4">{activeCategory}</h3>
              <p className="text-sm text-zinc-400">这一组不是横向滚动列表，而是固定知识网格。你可以把它当成这一类方法的速记卡片墙，先扫一遍，再挑和你工作最相关的几条深读。</p>
            </div>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {mapData.methods.items.filter((item:any) => item.category === activeCategory).map((item: any) => (
                <div key={item.id} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 hover:bg-white/[0.04] transition-colors">
                  <div className="text-[10px] text-zinc-500 mb-3">{item.category} · {item.id}</div>
                  <h4 className="text-sm font-bold text-white mb-2 leading-snug">{item.title}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
