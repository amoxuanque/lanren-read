export const mockMaps = [
  {
    id: '1',
    title: 'The Book of Elon',
    author: 'Walter Isaacson',
    cover: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?q=80&w=800&auto=format&fit=crop',
    oneLiner: {
      zh: '把马斯克的世界观拆成一张可读的地图',
      en: 'A company is not a money-making container, but a machine to push the future forward.'
    },
    about: {
      zh: '这本书不是普通传记，更像一份把公开言论、公司实践、工程方法和未来主张重新编排后的“认知系统图”。我把它压缩成单页知识地图，让你不靠左右滑动，也能完整读完主要结构。',
      en: 'This book is not an ordinary biography, but an operational manual compressing Musk\'s value judgments, thinking tools, organizational methods, and civilizational narratives.'
    },
    stats: {
      structure: 4,
      volume: 371
    },
    readingPosition: {
      zh: '先别把它当人物故事\n更准确地说，这是一份关于目标、工程、组织与文明愿景的操作手册。'
    },
    overview: {
      title: '整本书其实只做了四件事',
      subtitle: '先定义什么值得做，再定义怎么想、怎么干、最后把公司嵌入对人类未来的想象。',
      cards: [
        {
          layer: '第一层',
          title: '先界定什么值得做',
          desc: '这本书先解决价值判断，再谈成功技巧。它反复强调，真正重要的是你做的事是否有用，是否提升了未来变好的概率。',
          points: ['有用比荣耀更重要', '使命先于标签', '长期问题值得更大投入'],
          color: 'from-orange-500 to-amber-500'
        },
        {
          layer: '第二层',
          title: '再决定用什么脑子思考',
          desc: '书里最核心的认知姿态，不是聪明感，而是回到物理约束、材料成本、真实反馈和第一性原理，减少认知自欺。',
          points: ['默认自己可能有错', '先找真实约束', '别把惯例当答案'],
          color: 'from-pink-500 to-rose-500'
        },
        {
          layer: '第三层',
          title: '把组织改造成执行机器',
          desc: '愿景不能自动落地。真正把事情做出来的，是删流程、去瓶颈、贴近现场、压缩周期和把责任压到具体个人。',
          points: ['速度来自删减', '工厂也是产品', '执行是组织设计问题'],
          color: 'from-blue-500 to-cyan-500'
        },
        {
          layer: '第四层',
          title: '把公司放进文明叙事',
          desc: '后半本把能源、火箭、人工智能、脑机接口和火星放进同一张长期地图里，公司被视为推动文明向前的机器。',
          points: ['企业承担长期目标', '技术被赋予文明含义', '未来议题直接进入战略'],
          color: 'from-purple-500 to-indigo-500'
        }
      ]
    },
    knowledgeMap: {
      areas: [
        { title: '互联网', status: '已实现', progress: 100, color: 'bg-orange-500', desc: 'Zip2 与支付阶段已经完成，证明他最先掌握的是信息与软件层面的杠杆。' },
        { title: '可持续能源', status: '进行中', progress: 65, color: 'bg-cyan-400', desc: 'Tesla、储能与太阳能被放在同一套能源系统里，不是卖车，而是改写能源基础设施。' },
        { title: '太空探索', status: '进行中', progress: 40, color: 'bg-blue-500', desc: 'SpaceX 的终点不是发射业务，而是把进入太空和去火星的成本打到可持续。' },
        { title: '人工智能', status: '双刃剑', progress: 50, color: 'bg-purple-500', desc: '书里对人工智能既兴奋又警惕，它被视为文明级变量，不能只看增长潜力。' },
        { title: '脑机接口', status: '前沿试探', progress: 20, color: 'bg-indigo-400', desc: '它被当成连接能力补丁，短期是医疗，长期是人类与更强系统并存时的带宽升级。' }
      ],
      tools: [
        { 
          title: '第一性原理', 
          desc: '不从类比出发，而从物理规律、材料成本和底层约束出发，重新判断什么是真的难、什么只是传统太重。',
          points: ['把问题拆到不能再拆', '别把行业经验当自然法则', '从底层重算成本与可能性']
        },
        { 
          title: '魔杖数字', 
          desc: '先看理论上的极限值，再判断今天距离极限还有多大优化空间。这个动作让团队不容易把平庸当现实。',
          points: ['先想完美值是多少', '用极限衡量浪费', '让目标有方向感']
        }
      ]
    },
    parts: [
      {
        id: 'part1',
        title: '追求使命',
        subtitle: '第一部分',
        navDesc: '先解决“什么值得投入”，否则后面所有高强度执行都会像无意义透支。',
        intro: '这部分是价值底盘。它把“有用性”放在个人成功和职业荣耀之前，再把第一性原理接进来，形成一种很典型的马斯克式成功定义：去做真正重要、且有机会扩大现实边界的事。',
        tags: ['适合先抓价值标准与判断框架', '第一次接触这本书的人应该从这里起步'],
        task: '先解决“什么值得投入”，否则后面所有高强度执行都会像无意义透支。',
        takeaways: ['职业选择先过“是否有用”这一关。', '第一性原理是绕开行业惯性的工具。'],
        chapters: ['有用的人生', '像物理学家一样思考', '工程创造价值', '为未来而战'],
        position: '如果你不先理解这一层，第二部分的高压执行会显得像偏执；读懂这一层后，后面的强度才会变得有逻辑。'
      },
      {
        id: 'part2',
        title: '极限硬核执行',
        subtitle: '第二部分',
        navDesc: '这一部分回答的是：怎样把极难的事真的做出来，而不是做成一堆漂亮幻灯片。',
        intro: '这是全书最具现实指导意义的部分。它详细拆解了马斯克如何通过“白痴指数”、删减流程、打破部门墙来重塑制造和工程体系。',
        tags: ['适合管理者和工程师', '最具实操价值的章节'],
        task: '把组织变成一台高效的执行机器，消除一切不增加价值的环节。',
        takeaways: ['最好的流程就是没有流程。', '如果你的设计没有被经常打回来，说明你不够激进。'],
        chapters: ['白痴指数', '删减与加速', '拥抱硬核', '工厂即产品'],
        position: '这是连接愿景与现实的桥梁。没有这部分的硬核执行，第一部分的使命就只是空谈。'
      },
      {
        id: 'part3',
        title: '建立公司',
        subtitle: '第三部分',
        navDesc: '这里不只是讲创业故事，而是讲连续下注、熬过危机和压回下一局的结构。',
        intro: '讲述了从 Zip2 到 PayPal，再到 SpaceX 和 Tesla 的连续创业历程。重点在于如何管理现金流、控制权，以及在生死存亡之际如何做决策。',
        tags: ['适合创业者和高管', '理解风险与下注'],
        task: '在资源极度受限和面临巨大不确定性时，如何保持生存并持续扩张。',
        takeaways: ['把退出收益变成更大问题的筹码。', '在危机中保持对核心目标的专注。'],
        chapters: ['Zip2与PayPal', 'SpaceX的豪赌', 'Tesla的产能地狱', '度过至暗时刻'],
        position: '提供了真实的商业战场视角，展示了理论在现实约束下如何变形和存活。'
      }
    ],
    methods: {
      categories: ['价值标准', '认知方式', '执行机制', '组织管理', '创业与下注', '未来与文明'],
      items: [
        { id: '01', category: '价值标准', title: '普通人也能把自己练到不普通', desc: '能力不是先天标签，而是长期投入后的结果。' },
        { id: '02', category: '价值标准', title: '先问是否有用，再问是否好看', desc: '有贡献的工作比体面的叙事更重要。' },
        { id: '03', category: '价值标准', title: '荣耀不是目标，贡献才是', desc: '别把外界认同误当成工作的意义。' },
        { id: '04', category: '价值标准', title: '采取会提高未来变好概率的行动', desc: '方向感来自长期效果，而不是一时热闹。' },
        { id: '05', category: '价值标准', title: '工作的意义来自真实产出', desc: '如果没造出东西，就只是停留在表述层。' },
        { id: '06', category: '价值标准', title: '对社会净贡献高于个人头衔', desc: '...' },
        { id: '07', category: '价值标准', title: '如果不制造东西，世界不会变', desc: '...' },
        { id: '08', category: '价值标准', title: '使命应比舒适更大', desc: '...' },
        { id: '09', category: '价值标准', title: '长期问题比热点问题更值钱', desc: '...' },
        { id: '10', category: '价值标准', title: '让产品真的改善生活', desc: '...' }
      ]
    },
    saves: 12450,
    status: 'has_map',
    visibility: 'public'
  },
  {
    id: '2',
    title: '定位 (Positioning)',
    author: 'Al Ries, Jack Trout',
    cover: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop',
    oneLiner: {
      zh: '品牌不是靠把自己讲完整来赢，而是靠先把自己讲清楚来赢。',
      en: 'Brands win not by telling everything, but by being clear first.'
    },
    about: {
      zh: '《定位》的核心观点是：营销竞争的主战场不在工厂、不在渠道、甚至不完全在货架上，而是在潜在顾客的心智里。在一个传播过度、信息爆炸的环境中，顾客不会完整理解你，也不会耐心比较所有选项。他只会记住少数几个名字、少数几个类别、少数几个代表词。所以品牌真正要做的，不是把所有优点都说出来，而是找到一个能够被记住、被区分、被反复强化的位置。',
      en: 'The core idea of Positioning is that the main battlefield of marketing competition is in the prospect\'s mind.'
    },
    saves: 8920,
    status: 'has_map',
    visibility: 'public'
  }
];

export let mockSearchResults = [
  ...mockMaps,
  {
    id: '5',
    title: '思考，快与慢 (Thinking, Fast and Slow)',
    author: 'Daniel Kahneman',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop',
    oneLiner: { zh: '', en: '' },
    saves: 0,
    status: 'no_map_upload',
  },
  {
    id: '6',
    title: '刻意练习 (Peak)',
    author: 'Anders Ericsson',
    cover: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=800&auto=format&fit=crop',
    oneLiner: { zh: '', en: '' },
    saves: 0,
    status: 'no_map_paid',
  }
];

export const addSearchResult = (book: any) => {
  mockSearchResults = [book, ...mockSearchResults];
};

export const mockShelf = {
  wantToRead: [mockSearchResults[2]],
  organized: [mockMaps[0]],
  favorited: [mockMaps[1]],
  shared: [mockMaps[0]]
};


