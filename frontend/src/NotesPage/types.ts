// 笔记相关类型定义

export interface Note {
  id: string;
  title: string;
  folder: string;
  preview: string;
  tags: string[];
  updatedAt: string;
  wordCount: number;
  content?: string; // 完整内容，编辑时使用
}

export interface Folder {
  name: string;
  count: number;
}

export interface OutlineItem {
  id: string;
  title: string;
  level: number;
}

// API 响应类型（预留）
export interface NotesApiResponse {
  notes: Note[];
  total: number;
}

export interface CreateNoteParams {
  title: string;
  folder: string;
  content: string;
  tags: string[];
}

export interface UpdateNoteParams {
  id: string;
  title: string;
  folder: string;
  content: string;
  tags: string[];
}


