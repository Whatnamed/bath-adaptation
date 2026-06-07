/* 安浴到家 · Mock 数据 */

export const familyInfo = {
  elderName: '张奶奶',
  village: '桂林村',
  elderAge: 78,
  address: '桂林村 142 号',
  avatarUrl: '',
  phone: '138****6721',
};

export const currentUser = {
  name: '张建国',
  phone: '139****8823',
  relation: '儿子',
};

export const serviceOrder = {
  id: 'SV-2026-0415',
  status: 'plan_confirm',
  statusText: '方案待确认',
  createDate: '2026-04-15',
  steps: [
    { key: 'assessment', label: '入户评估', status: 'done', date: '5月18日' },
    { key: 'plan', label: '方案确认', status: 'current', date: '进行中' },
    { key: 'install', label: '上门安装', status: 'pending', date: '待预约' },
    { key: 'training', label: '使用教学', status: 'pending', date: '待完成' },
  ],
};

export const riskFindings = [
  {
    id: 1,
    title: '地面湿滑',
    desc: '卫生间地面瓷砖老化，表面光滑，遇水后摩擦系数极低，存在滑倒风险',
    level: 'high',
    location: '卫生间地面',
  },
  {
    id: 2,
    title: '起身借力不足',
    desc: '马桶旁和淋浴区缺少扶手，老人起身和蹲下时没有着力点',
    level: 'high',
    location: '马桶旁 / 淋浴区',
  },
  {
    id: 3,
    title: '夜间照明不足',
    desc: '卫生间到卧室的通道没有夜灯，夜间起夜容易在黑暗中磕碰',
    level: 'medium',
    location: '走廊 / 卫生间',
  },
];

export const planItems = [
  {
    id: 1,
    name: '防滑地面处理',
    desc: '在卫生间地面铺设防滑垫或做防滑涂层处理，有效提升地面摩擦系数，减少湿滑摔倒风险',
    solvesRisk: '地面湿滑',
    priority: 'recommended',
    price: 380,
    imageKey: 'antislip',
  },
  {
    id: 2,
    name: '助力扶手安装',
    desc: '在马桶旁和淋浴区安装不锈钢助力扶手，帮助老人安全起身和站立',
    solvesRisk: '起身借力不足',
    priority: 'recommended',
    price: 260,
    imageKey: 'handrail',
  },
  {
    id: 3,
    name: '夜间照明系统',
    desc: '在走廊和卫生间安装感应式 LED 夜灯，夜间自动亮起，无需摸黑找开关',
    solvesRisk: '夜间照明不足',
    priority: 'recommended',
    price: 150,
    imageKey: 'nightlight',
  },
  {
    id: 4,
    name: '紧急呼叫按钮',
    desc: '在卫生间和卧室安装一键呼叫按钮，紧急情况可立即通知子女和服务站',
    solvesRisk: '摔倒后无法求助',
    priority: 'optional',
    price: 120,
    imageKey: 'callbutton',
  },
];

export const costBreakdown = {
  items: [
    { label: '防滑地面处理', value: 380 },
    { label: '助力扶手安装（2处）', value: 260 },
    { label: '夜间照明系统', value: 150 },
    { label: '紧急呼叫按钮', value: 120 },
  ],
  serviceFee: 200,
  assessmentFee: 0,
  subsidy: -180,
  total: 930,
  note: '最终价格以上门复核为准',
};

export const reminders = [
  {
    id: 1,
    title: '呼叫按钮测试正常',
    subtitle: '上次检测时间：5月20日',
    type: 'success',
    icon: 'shield-check',
  },
  {
    id: 2,
    title: '扶手复检还有 28 天',
    subtitle: '预计复检时间：6月19日',
    type: 'info',
    icon: 'calendar-clock',
  },
];

export const serviceTimeline = [
  {
    step: '风险发现',
    status: 'done',
    date: '2026-04-10',
    desc: '村干部入户走访时发现卫浴安全隐患',
  },
  {
    step: '入户评估',
    status: 'done',
    date: '2026-05-18',
    desc: '评估员王师傅完成入户检查，记录 3 项风险',
    person: '评估员 王建华',
  },
  {
    step: '方案确认',
    status: 'current',
    date: '待确认',
    desc: '推荐防滑、扶手、夜灯、呼叫按钮 4 项改造',
  },
  {
    step: '上门安装',
    status: 'pending',
    date: '待预约',
    desc: '确认方案后预约安装时间',
  },
  {
    step: '使用教学',
    status: 'pending',
    date: '待完成',
    desc: '安装完成后师傅现场教学',
  },
  {
    step: '完工回访',
    status: 'pending',
    date: '待安排',
    desc: '服务站 7 天内上门回访',
  },
];

export const contacts = [
  {
    name: '王建华',
    role: '评估员',
    phone: '135****7210',
  },
  {
    name: '李明',
    role: '服务站站长',
    phone: '138****9032',
  },
  {
    name: '赵芳',
    role: '村干部',
    phone: '137****4456',
  },
];

export const stationInfo = {
  name: '桂林镇便民服务站',
  address: '桂林镇文化路 28 号',
  phone: '0773-5581234',
  hours: '周一至周六 8:00-17:30',
  manager: '李明',
};

export const serviceHistory = [
  {
    id: 'SV-2026-0415',
    title: '张奶奶家 · 卫浴适老化改造',
    status: 'in_progress',
    statusText: '方案待确认',
    date: '2026-04-15',
    items: ['防滑处理', '扶手安装', '夜灯', '呼叫按钮'],
  },
];

export const assessmentResult = {
  date: '2026年5月18日',
  assessor: '王建华',
  location: '桂林村 142 号',
  summary: '卫生间和走廊存在 3 项安全风险，建议优先进行防滑和扶手改造',
  photos: [
    { id: 1, desc: '卫生间地面（湿滑）' },
    { id: 2, desc: '马桶旁（缺少扶手）' },
    { id: 3, desc: '走廊夜间照明' },
  ],
  findings: riskFindings,
};

/* ── 改造产品分类 ── */
export const productCategories = [
  {
    id: 'toilet',
    name: '马桶改造',
    desc: '蹲改坐、加高、智能化等适老改造方案',
    icon: 'toilet',
    count: 4,
  },
  {
    id: 'shower',
    name: '淋浴改造',
    desc: '坐浴、恒温、防滑、隔断等安全升级',
    icon: 'shower',
    count: 4,
  },
  {
    id: 'basin',
    name: '洗漱台改造',
    desc: '圆角、扶手、壁挂等无障碍洗漱方案',
    icon: 'basin',
    count: 4,
  },
];

export const productOptions: Record<string, Array<{
  id: string;
  name: string;
  desc: string;
  tag?: string;
}>> = {
  toilet: [
    { id: 't1', name: '无损直插式蹲改坐', desc: '无需破坏原有地面，直接在蹲便器上加装坐便器', tag: '热门' },
    { id: 't2', name: '适老加高款坐便器', desc: '座面加高 5cm，减少膝关节弯曲角度，起身更省力' },
    { id: 't3', name: '适老智能坐便器', desc: '自动冲水、座圈加热、暖风烘干，提升使用舒适度' },
    { id: 't4', name: '带扶手一体式马桶', desc: '两侧一体化扶手设计，提供稳固支撑，防止侧翻' },
  ],
  shower: [
    { id: 's1', name: '壁挂折叠坐浴椅', desc: '不用时折叠贴墙，需要时展开即坐，安全省力洗浴', tag: '推荐' },
    { id: 's2', name: '无障碍恒温花洒', desc: '38°C 恒温防烫，大字温度显示，一键切换出水模式' },
    { id: 's3', name: '专业防滑地面材料', desc: '淋浴区专用防滑处理，湿态摩擦系数≥0.6，安全可靠' },
    { id: 's4', name: '简易淋浴隔断/浴帘', desc: '轻量化隔断方案，防止水花外溅，保持干燥区安全' },
  ],
  basin: [
    { id: 'b1', name: '圆角防磕碰台盆', desc: '全圆角设计，消除磕碰风险，适合活动不便的老人' },
    { id: 'b2', name: '助力型扶手台盆', desc: '台盆两侧集成扶手，洗漱时可借力支撑身体' },
    { id: 'b3', name: '迷你壁挂式台盆', desc: '小巧壁挂安装，下方留空方便轮椅使用', tag: '适合轮椅' },
    { id: 'b4', name: '悬空适老洗漱台', desc: '整体悬空设计，底部无遮挡，轮椅/坐浴椅可直接靠近' },
  ],
};

