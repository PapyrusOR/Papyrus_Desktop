# Papyrus WCAG 2.1 AA/AAA 分级实施指南

> **目标**：全应用支持 WCAG 2.1 AA 级，关键场景支持 AAA 级

---

## 📊 分级覆盖矩阵

| 领域 | AA 级要求 | AAA 级要求 | 实施策略 |
|------|-----------|------------|----------|
| **对比度** | 普通 4.5:1，大文本 3:1 | 普通 7:1，大文本 4.5:1 | ✅ AA：基础主题<br>🎯 AAA：高对比度模式 |
| **文本呈现** | 无要求 | 行距 1.5，段落距 2 倍，宽度 ≤80 字符 | 🎯 AAA：阅读增强模式 |
| **图像文本** | 特定情况可用 | 严禁使用（除装饰/商标） | ✅ AA：避免图片文本 |
| **时间限制** | 允许警告延长 | 禁止使用 | ✅ AA：无时间限制设计 |
| **交互动画** | 避免闪烁 | 允许用户禁用 | ✅ AA：prefers-reduced-motion<br>🎯 AAA：设置开关 |
| **链接目的** | 可通过上下文理解 | 仅链接文本本身明确 | ✅ AA：描述性链接文本 |
| **节标题** | 页面标题 | 必须使用节标题组织 | 🎯 AAA：语义化标题层级 |
| **阅读水平** | 无要求 | 超出初中水平需简化版 | ✅ AA：简洁文案 |
| **发音** | 无要求 | 歧义词提供发音 | ❌ 暂不实施 |
| **错误预防** | 法律/金融数据 | 所有提交页面可逆/确认 | ✅ AA：表单验证 |
| **媒体替代** | 基础音频描述 | 扩展音频描述+手语 | ❌ 暂不实施 |

---

## ✅ AA 级实施清单（全应用强制）

### 1. 可感知性 (Perceivable)

#### 1.1 文本替代
- [x] 所有图片提供 `alt` 文本
- [x] 图标按钮使用 `aria-label`
- [x] 装饰性图片使用 `aria-hidden="true"`

#### 1.2 时序媒体
- [x] 无自动播放音频/视频

#### 1.3 适应性
- [x] 信息不依赖颜色单独传达
- [x] 正确阅读顺序（DOM 顺序 = 视觉顺序）

#### 1.4 可区分性
- [x] **颜色对比度 ≥ 4.5:1（普通文本）**
- [x] **颜色对比度 ≥ 3:1（大文本/粗体）**
- [x] 支持文本缩放至 200%
- [x] 支持 `prefers-reduced-motion`

### 2. 可操作性 (Operable)

#### 2.1 键盘可访问
- [x] 所有功能可通过键盘完成
- [x] 无键盘陷阱
- [x] 焦点顺序符合逻辑

#### 2.2 足够时间
- [x] 无自动超时

#### 2.4 导航
- [x] 跳过重复内容链接（Skip Link）
- [x] 页面标题描述性
- [x] 焦点可见

### 3. 可理解性 (Understandable)

#### 3.1 可读性
- [x] 页面语言标记 `lang="zh-CN"`

#### 3.2 可预测性
- [x] 导航可预测
- [x] 输入可预测

#### 3.3 输入辅助
- [x] 错误识别
- [x] 表单标签关联
- [x] 错误建议

---

## 🎯 AAA 级增强场景（可选启用）

### 场景 1：阅读增强模式（文本呈现）

**目标用户**：
- 阅读障碍用户
- 注意力缺陷用户
- 老年用户

**功能实现**：
```css
/* AAA 级文本呈现 */
.aaa-reading-mode {
  /* 行距 1.5 倍 */
  line-height: 1.5 !important;
  
  /* 段落间距 2 倍 */
  p, .paragraph {
    margin-bottom: 2em !important;
  }
  
  /* 文本宽度 ≤ 80 字符 */
  max-width: 80ch !important;
  
  /* 非两端对齐 */
  text-align: left !important;
  hyphens: none !important;
}
```

**启用方式**：设置 → 无障碍 → 阅读增强

### 场景 2：高对比度模式（对比度增强）

**目标用户**：
- 低视力用户
- 视力障碍用户

**功能实现**：
```css
/* AAA 级对比度 */
.aaa-high-contrast {
  --color-text-1: #000000;
  --color-text-2: #1a1a1a;
  --color-text-3: #333333;
  
  /* 普通文本 7:1 对比度 */
  /* 大文本 4.5:1 对比度 */
}
```

**启用方式**：设置 → 无障碍 → 高对比度

### 场景 3：节标题导航

**目标用户**：
- 屏幕阅读器用户
- 认知障碍用户

**功能实现**：
```tsx
// 语义化标题层级
<main>
  <h1>页面标题</h1>
  <section aria-labelledby="section1-title">
    <h2 id="section1-title">节标题 1</h2>
    ...
  </section>
  <section aria-labelledby="section2-title">
    <h2 id="section2-title">节标题 2</h2>
    ...
  </section>
</main>

// 标题导航面板
<nav aria-label="页面内容">
  <ul role="list">
    <li><a href="#section1-title">节标题 1</a></li>
    <li><a href="#section2-title">节标题 2</a></li>
  </ul>
</nav>
```

### 场景 4：动画完全禁用

**目标用户**：
- 前庭功能障碍用户
- 癫痫患者

**功能实现**：
```css
.aaa-no-animation,
.aaa-no-animation *,
.aaa-no-animation *::before,
.aaa-no-animation *::after {
  animation-duration: 0.01ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.01ms !important;
  scroll-behavior: auto !important;
}
```

**启用方式**：设置 → 无障碍 → 完全禁用动画

---

## 🔧 技术实现架构

### 设置存储
```typescript
interface AccessibilitySettings {
  // AA 级（默认启用）
  focusIndicator: boolean;      // 焦点指示器
  
  // AAA 级（可选启用）
  highContrast: boolean;        // 高对比度
  readingEnhancement: boolean;  // 阅读增强
  noAnimation: boolean;         // 完全禁用动画
  screenReaderOptimized: boolean; // 屏幕阅读器优化
}
```

### CSS 类名策略
```
├── .aa-base          # AA 级基础样式（始终启用）
├── .aaa-contrast     # AAA 高对比度
├── .aaa-reading      # AAA 阅读增强
└── .aaa-no-motion    # AAA 动画禁用
```

### React Context
```tsx
// 无障碍设置上下文
const AccessibilityContext = createContext<{
  settings: AccessibilitySettings;
  updateSetting: (key: string, value: boolean) => void;
}>(...);
```

---

## 📋 验证检查表

### 自动化测试
- [ ] Lighthouse Accessibility Score ≥ 95
- [ ] axe DevTools 无 AA 级错误
- [ ] 颜色对比度全部达标

### 手动测试
- [ ] 键盘全程可操作
- [ ] 屏幕阅读器导航流畅
- [ ] 200% 缩放无内容截断
- [ ] 高对比度模式显示正常

---

## 🚀 实施路线图

### 第一阶段：AA 级基础（已完成）
- [x] 基础焦点样式
- [x] Skip Link
- [x] ARIA 标签
- [x] prefers-reduced-motion

### 第二阶段：AA 级完善（当前）
- [ ] 表单错误处理优化
- [ ] 屏幕阅读器通知系统
- [ ] 语义化标题层级

### 第三阶段：AAA 级增强（可选）
- [ ] 阅读增强模式
- [ ] 高对比度模式
- [ ] 节标题导航
- [ ] 完全动画禁用

---

**最后更新**：2026-03-31
