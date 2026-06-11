# 安浴到家 Figma Design Handoff

## 页面清单

| 路由 | 页面 | 类型 |
| --- | --- | --- |
| `/` | 首页 | Tab 页面 |
| `/services` | 服务 | Tab 页面 |
| `/profile` | 我的 | Tab 页面 |
| `/bind` | 绑定家庭 | 流程页 |
| `/assessment/choose` | 选择评估方式 | 流程页 |
| `/assessment/apply` | 申请专业评估 | 流程页 |
| `/assessment/self` | 拍照评估 | 流程页 |
| `/plan` | 推荐方案 | 方案页 |
| `/plan/confirm` | 方案确认 | 方案页 |
| `/products` | 选择改造类别 | 产品页 |
| `/products/:categoryId` | 产品选项 | 产品页 |
| `/progress` | 服务进度 | 服务详情页 |
| `/maintenance` | 维护与提醒 | 售后页 |
| `/assessment` | 评估结果 | 报告页 |
| `/notifications` | 消息通知 | 通知页 |

## 组件清单

| React 组件 | 文件 | Figma 建议命名 |
| --- | --- | --- |
| `PhoneShell` | `app/src/components/PhoneShell.tsx` | Frame / PhoneShell |
| `StatusBar` | `app/src/components/StatusBar.tsx` | System / StatusBar |
| `BottomNav` | `app/src/components/BottomNav.tsx` | Navigation / BottomNav |
| `PageHeader` | `app/src/components/PageHeader.tsx` | Navigation / PageHeader |
| `Button` | `app/src/components/primitives.tsx` | Controls / Button |
| `Card` | `app/src/components/primitives.tsx` | Surfaces / Card |
| `Chip` | `app/src/components/primitives.tsx` | Controls / Chip |
| `SectionHeader` | `app/src/components/primitives.tsx` | Content / SectionHeader |
| `Stepper` | `app/src/components/Stepper.tsx` | Progress / Stepper |
| `MenuGroup` | `app/src/components/MenuGroup.tsx` | Lists / MenuGroup |
| `EmptyState` | `app/src/components/EmptyState.tsx` | Feedback / EmptyState |
| `ServiceCard` | `app/src/components/ServiceCard.tsx` | Cards / ServiceCard |
| `ProductCard` | `app/src/components/ProductCard.tsx` | Cards / ProductCard |
| `ChoiceCard` | `app/src/components/ChoiceCard.tsx` | Cards / ChoiceCard |
| `IconBadge` | `app/src/components/primitives.tsx` | Foundations / IconBadge |
| `FixedBottomBar` | `app/src/components/primitives.tsx` | Navigation / FixedBottomBar |
| `InfoNote` | `app/src/components/primitives.tsx` | Feedback / InfoNote |

## 设计 Token 表

`app/src/styles/tokens.css` 是唯一设计变量来源。Figma 建议用 Variables 建立同名 collection。

| 分类 | Token | 值 |
| --- | --- | --- |
| Surface | `--surface-page` | `#F5F5F3` |
| Surface | `--surface-card` | `#FFFFFF` |
| Surface | `--surface-soft` | `#F4F7F2` |
| Surface | `--surface-warm` | `#F6F6F4` |
| Text | `--text-primary` | `#1A1D1A` |
| Text | `--text-secondary` | `#6B6F6B` |
| Text | `--text-tertiary` | `#A3A7A3` |
| Brand | `--accent` | `#5B8C5A` |
| Brand | `--accent-hover` | `#4E7A4E` |
| Brand | `--accent-soft` | `#EDF3EC` |
| Brand | `--accent-deep` | `#3D6B3D` |
| Semantic | `--success`, `--warning`, `--danger`, `--info` | 见 `tokens.css` |
| Border | `--border`, `--border-light`, `--divider` | 见 `tokens.css` |
| Radius | `--radius-sm/md/lg/xl/2xl/pill` | `8/12/16/20/24/999px` |
| Spacing | `--space-1/2/3/4/5/6/8/10/page` | `4/8/12/16/20/24/32/40/20px` |
| Type | `--text-display/title/section/body/body-sm/label/caption/micro` | `30/24/20/17/15/14/13/11px` |
| Layout | `--phone-width`, `--phone-height` | `430px`, `932px` |

## 页面使用组件

| 页面 | 主要组件 |
| --- | --- |
| App Shell | `PhoneShell`, `StatusBar`, `HomeIndicator` |
| 首页 | `BottomNav`, `SectionHeader`, `Card`, `Chip`, `Stepper` |
| 服务 | `BottomNav`, `EmptyState`, `Button`, `ServiceCard` |
| 我的 | `BottomNav`, `MenuGroup`, `SectionHeader`, `Chip` |
| 推荐方案 | `PageHeader`, `SectionHeader`, `Chip`, `Button`, `FixedBottomBar` |
| 产品选项 | `PageHeader`, `ProductCard`, `Button`, `FixedBottomBar` |
| 改造类别 | `PageHeader`, `Button`, `FixedBottomBar`, `InfoNote` |
| 维护与提醒 | `PageHeader`, `SectionHeader`, `Card` |
| 消息通知 | `PageHeader`, `EmptyState` |
| 评估方式选择 | `PageHeader`, `ChoiceCard`, `InfoNote` |
| 绑定家庭 / 评估 / 进度 / 确认页 | 保留现有页面结构，可继续按 `PageHeader`, `Button`, `Card`, `SectionHeader` 逐步替换 |

## Figma 还原建议

1. 先建立 `AnYu Tokens` variables：颜色、字号、间距、圆角按 `tokens.css` 同名录入。
2. 建 `PhoneShell` 430×932 frame，内部固定 `StatusBar` 高 54px，页面内容使用 auto layout vertical。
3. 以 React 组件名创建 Figma component，variant 对齐 CSS class：`Button primary/secondary/ghost`, `Chip accent/success/info/warning/danger`, `Card default/soft/warm/accent`。
4. 将 `IconBadge` 建为所有圆形/圆角图标容器的基础组件，tone 对齐 `accent/info/warning/success/neutral`。
5. 页面 frame 不直接复刻大量零散图层，优先实例化组件，再填充页面私有内容。
6. 产品图片、空状态图、头像和 logo 从 `app/src/assets/images` 或 `anyu_ui_assets` 导入，保持原始比例。
7. 底部导航作为固定 overlay，`BottomNav` 高度为 `--bottomnav-height` 84px。

## 430×932 页面规格说明

- 设计画板：`430 × 932px`。
- 手机圆角：`44px`。
- 状态栏高度：`54px`。
- 常规子页顶栏高度：`56px`。
- 底部导航高度：`84px`。
- 页面左右边距：`20px`。
- 页面背景：`--surface-page`。
- 卡片背景：`--surface-card`，主圆角通常为 `--radius-xl`。
