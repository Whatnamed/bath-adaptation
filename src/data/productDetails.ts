export interface ProductDetailInfo {
  price: number
  risks: string[]
  suitableFor: string[]
  dimensions: Array<{ label: string; value: string }>
  installConditions: string[]
  serviceIncludes: string[]
  note: string
}

const defaultServices = ['上门测量', '安装固定', '使用教学', '后续复检']
const defaultNote = '尺寸与安装条件为参考，最终以上门复核为准。'

export const productDetails: Record<string, ProductDetailInfo> = {
  t1: {
    price: 580,
    risks: ['蹲厕起身困难', '腿力下降后借力不足', '夜间如厕站立不稳'],
    suitableFor: ['家中仍保留蹲便器', '希望少施工完成蹲改坐', '暂时不方便整体拆改'],
    dimensions: [
      { label: '覆盖长度', value: '约 620 mm' },
      { label: '覆盖宽度', value: '约 420 mm' },
      { label: '座面高度', value: '约 430 mm' },
      { label: '预留前方空间', value: '建议 ≥ 650 mm' },
    ],
    installConditions: ['原蹲便器周边地面基本平整', '排污口位置需上门复核', '不适合严重破损或沉降地面'],
    serviceIncludes: defaultServices,
    note: defaultNote,
  },
  t2: {
    price: 720,
    risks: ['坐便过低起身费力', '膝关节弯曲角度过大', '如厕后站立不稳'],
    suitableFor: ['已有坐便器但高度偏低', '老人膝关节力量下降', '希望提升起身舒适度'],
    dimensions: [
      { label: '座面增高', value: '约 50 mm' },
      { label: '适配范围', value: '常规坐便器' },
      { label: '扶手预留', value: '两侧建议 ≥ 250 mm' },
      { label: '前方空间', value: '建议 ≥ 700 mm' },
    ],
    installConditions: ['坐便器结构完整', '周边有足够站立转身空间', '安装前需确认原坐便器尺寸'],
    serviceIncludes: defaultServices,
    note: defaultNote,
  },
  t3: {
    price: 1680,
    risks: ['冬季坐圈过冷', '清洁动作困难', '如厕后吹干不便'],
    suitableFor: ['希望提升如厕舒适度', '家中有稳定电源插座', '老人能接受简单按钮操作'],
    dimensions: [
      { label: '产品长度', value: '约 680 mm' },
      { label: '产品宽度', value: '约 400 mm' },
      { label: '座面高度', value: '约 420 mm' },
      { label: '电源距离', value: '建议 ≤ 1.5 m' },
    ],
    installConditions: ['需有安全接地电源', '水压和排污条件需复核', '湿区需做好防溅保护'],
    serviceIncludes: ['上门测量', '安装接入', '功能教学', '保养提醒'],
    note: defaultNote,
  },
  t4: {
    price: 1280,
    risks: ['如厕起身缺少支撑', '侧翻风险', '双手无稳定借力点'],
    suitableFor: ['老人起身需要双侧扶撑', '卫生间两侧空间有限', '希望产品与支撑一体化'],
    dimensions: [
      { label: '整体宽度', value: '约 650 mm' },
      { label: '扶手高度', value: '约 680 mm' },
      { label: '座面高度', value: '约 430 mm' },
      { label: '侧向预留', value: '建议 ≥ 150 mm' },
    ],
    installConditions: ['地面需平整', '安装位置需避开管线', '实际稳定性以上门复核为准'],
    serviceIncludes: defaultServices,
    note: defaultNote,
  },
  s1: {
    price: 360,
    risks: ['久站洗澡易疲劳', '洗浴时重心不稳', '出浴前体力下降'],
    suitableFor: ['淋浴区有可安装墙面', '空间较小但需要坐浴', '老人洗澡容易疲劳'],
    dimensions: [
      { label: '展开宽度', value: '约 360 mm' },
      { label: '座面深度', value: '约 320 mm' },
      { label: '安装高度', value: '约 450 mm' },
      { label: '折叠厚度', value: '约 80 mm' },
    ],
    installConditions: ['墙面需可打孔', '不建议安装在空鼓瓷砖上', '展开后需保留转身空间'],
    serviceIncludes: ['墙面检查', '打孔安装', '承重测试', '坐浴教学'],
    note: defaultNote,
  },
  s2: {
    price: 480,
    risks: ['水温忽冷忽热', '调温看不清', '烫伤风险'],
    suitableFor: ['老人对水温敏感', '现有花洒调节不稳定', '需要更清晰的温度控制'],
    dimensions: [
      { label: '主体宽度', value: '约 280 mm' },
      { label: '安装高度', value: '约 900–1100 mm' },
      { label: '软管长度', value: '约 1500 mm' },
      { label: '操作面板', value: '大字显示' },
    ],
    installConditions: ['冷热水接口需匹配', '水压需基本稳定', '安装前复核原管线位置'],
    serviceIncludes: ['接口检查', '安装调试', '温控教学', '使用回访'],
    note: defaultNote,
  },
  s3: {
    price: 380,
    risks: ['地面湿滑', '出浴转身滑倒', '夜间进入湿区不稳'],
    suitableFor: ['淋浴区长期潮湿', '地砖防滑不足', '暂不做大面积拆改'],
    dimensions: [
      { label: '处理范围', value: '按现场面积' },
      { label: '常见宽度', value: '约 800–1200 mm' },
      { label: '常见长度', value: '约 1000–1600 mm' },
      { label: '防滑等级', value: '湿区增强' },
    ],
    installConditions: ['地面需清洁干燥后施工', '破损地砖需先修补', '排水坡度需现场确认'],
    serviceIncludes: ['地面检查', '防滑处理', '干燥养护说明', '首月复检'],
    note: defaultNote,
  },
  s4: {
    price: 220,
    risks: ['水花外溅导致干区湿滑', '出浴路径积水', '地面难以保持干燥'],
    suitableFor: ['淋浴区与如厕区相邻', '空间不适合硬隔断', '希望轻量减少外溅'],
    dimensions: [
      { label: '建议宽度', value: '约 900–1200 mm' },
      { label: '建议高度', value: '约 1800 mm' },
      { label: '占用空间', value: '低' },
      { label: '安装方式', value: '轨道 / 浴帘杆' },
    ],
    installConditions: ['顶部或侧墙需可固定', '需避开灯具和管线', '不替代干湿分离改造'],
    serviceIncludes: ['位置确认', '轨道安装', '防溅说明', '配件更换提醒'],
    note: defaultNote,
  },
  b1: {
    price: 450,
    risks: ['洗漱台边角磕碰', '转身空间狭窄', '夜间洗漱碰撞'],
    suitableFor: ['卫生间通道较窄', '老人行动不便', '原台盆边角尖锐'],
    dimensions: [
      { label: '台盆宽度', value: '约 520 mm' },
      { label: '台盆深度', value: '约 420 mm' },
      { label: '安装高度', value: '约 780–820 mm' },
      { label: '圆角半径', value: '加大圆角' },
    ],
    installConditions: ['原给排水位置需复核', '墙面或柜体需稳定', '需保留正面站立空间'],
    serviceIncludes: defaultServices,
    note: defaultNote,
  },
  b2: {
    price: 560,
    risks: ['洗漱时站立不稳', '弯腰后缺少支撑', '台盆边缘不可借力'],
    suitableFor: ['老人洗漱需要扶撑', '台盆两侧有安装空间', '希望减少额外扶手数量'],
    dimensions: [
      { label: '台盆宽度', value: '约 600 mm' },
      { label: '扶手高度', value: '约 800 mm' },
      { label: '台盆深度', value: '约 450 mm' },
      { label: '侧向预留', value: '建议 ≥ 150 mm' },
    ],
    installConditions: ['台盆固定结构需可靠', '给排水管线需避让', '扶手承力需现场测试'],
    serviceIncludes: defaultServices,
    note: defaultNote,
  },
  b3: {
    price: 380,
    risks: ['台盆下方遮挡轮椅或坐具', '洗漱靠近困难', '空间利用不足'],
    suitableFor: ['需要坐姿洗漱', '卫生间面积较小', '希望释放台盆下方空间'],
    dimensions: [
      { label: '台盆宽度', value: '约 460 mm' },
      { label: '台盆深度', value: '约 360 mm' },
      { label: '下方净空', value: '建议 ≥ 650 mm' },
      { label: '安装高度', value: '约 760–800 mm' },
    ],
    installConditions: ['墙面需可承重', '给排水需墙排或可调整', '轻质隔墙需谨慎安装'],
    serviceIncludes: ['墙面复核', '挂装固定', '管线整理', '坐姿使用教学'],
    note: defaultNote,
  },
  b4: {
    price: 680,
    risks: ['轮椅 / 坐浴椅难以靠近', '台盆下方柜体阻挡', '洗漱动作费力'],
    suitableFor: ['需要坐姿或辅助器具靠近', '原洗漱台遮挡明显', '希望提升无障碍使用'],
    dimensions: [
      { label: '台盆宽度', value: '约 650 mm' },
      { label: '台盆深度', value: '约 480 mm' },
      { label: '下方净空', value: '建议 ≥ 680 mm' },
      { label: '正面预留', value: '建议 ≥ 800 mm' },
    ],
    installConditions: ['墙面承重需复核', '下方管线需包覆防碰', '需确认坐具回转空间'],
    serviceIncludes: ['空间测量', '悬挂安装', '管线防护', '坐姿洗漱教学'],
    note: defaultNote,
  },
}
