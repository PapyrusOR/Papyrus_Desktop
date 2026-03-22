import type { Note, Folder } from './types';

// Mock 数据 - 后续替换为真实 API
export const MOCK_NOTES: Note[] = [
  { 
    id: '1', 
    title: '极限的定义与性质', 
    folder: '高等数学', 
    preview: '数列极限：对于任意 ε > 0，存在正整数 N...', 
    tags: ['数学', '极限'], 
    updatedAt: '今天', 
    wordCount: 1240,
    content: `## 核心概念

数列极限的定义：对于任意 ε > 0，存在正整数 N，使得当 n > N 时，|aₙ - A| < ε 恒成立。

### 要点一：ε 的任意性
ε 代表了接近的程度，可以任意小。

### 要点二：N 的存在性
N 依赖于 ε，不同的 ε 对应不同的 N。

## 详细说明

极限的性质包括：
- 唯一性
- 有界性
- 保号性

## 实例分析

**例1**：证明 lim(1/n) = 0 (n→∞)

**例2**：证明等比数列的极限`
  },
  { 
    id: '2', 
    title: '导数的几何意义', 
    folder: '高等数学', 
    preview: '函数在某点的导数表示函数曲线在该点切线的斜率...', 
    tags: ['数学', '导数'], 
    updatedAt: '昨天', 
    wordCount: 890,
    content: `## 核心概念

导数的几何意义：函数在某点的导数表示函数曲线在该点切线的斜率。

### 要点一：切线斜率
导数 f'(x₀) = tan α，其中 α 是切线与 x 轴的夹角。

### 要点二：法线方程
法线与切线垂直，斜率为 -1/f'(x₀)。`
  },
  { 
    id: '3', 
    title: '微分中值定理', 
    folder: '高等数学', 
    preview: '罗尔定理、拉格朗日中值定理、柯西中值定理...', 
    tags: ['数学'], 
    updatedAt: '3天前', 
    wordCount: 2100 
  },
  { 
    id: '4', 
    title: 'React useEffect 详解', 
    folder: '前端开发', 
    preview: 'useEffect 是 React 中用于处理副作用的 Hook...', 
    tags: ['React', 'Hooks'], 
    updatedAt: '今天', 
    wordCount: 3200 
  },
  { 
    id: '5', 
    title: 'TypeScript 泛型', 
    folder: '前端开发', 
    preview: '泛型（Generics）是 TypeScript 的核心特性之一...', 
    tags: ['TS'], 
    updatedAt: '2天前', 
    wordCount: 1560 
  },
  { 
    id: '6', 
    title: '进程与线程', 
    folder: '操作系统', 
    preview: '进程是操作系统资源分配的基本单位...', 
    tags: ['OS'], 
    updatedAt: '4天前', 
    wordCount: 2800 
  },
  { 
    id: '7', 
    title: '内存管理', 
    folder: '操作系统', 
    preview: '操作系统的内存管理主要包括内存分配...', 
    tags: ['OS'], 
    updatedAt: '5天前', 
    wordCount: 3400 
  },
  { 
    id: '8', 
    title: '日语动词变形', 
    folder: '日本語', 
    preview: '日语动词分为三类...', 
    tags: ['日语', 'N2'], 
    updatedAt: '今天', 
    wordCount: 1890 
  },
];

// 生成文件夹列表
export const generateFolders = (notes: Note[]): Folder[] => {
  const folderMap = new Map<string, number>();
  folderMap.set('全部笔记', notes.length);
  notes.forEach(note => {
    folderMap.set(note.folder, (folderMap.get(note.folder) || 0) + 1);
  });
  return Array.from(folderMap.entries()).map(([name, count]) => ({ name, count }));
};

// 生成标签列表
export const generateTags = (notes: Note[]): string[] => {
  const tagSet = new Set<string>();
  notes.forEach(note => note.tags.forEach(tag => tagSet.add(tag)));
  return Array.from(tagSet);
};
