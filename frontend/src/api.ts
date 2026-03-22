const BASE = '/api';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail ?? res.statusText);
  }
  return res.json();
}

// ========== Card Types ==========
export type Card = {
  id: string;
  q: string;
  a: string;
  next_review: number;
  interval: number;
};

export type ListCardsRes = { success: boolean; cards: Card[]; count: number };
export type NextDueRes = { success: boolean; card: Card | null; due_count: number; total_count: number };
export type RateRes = { success: boolean; card: Card; interval_days: number; ef: number; next: NextDueRes | null };

// ========== Note Types ==========
export type Note = {
  id: string;
  title: string;
  folder: string;
  content: string;
  preview: string;
  tags: string[];
  created_at: number;
  updated_at: number;
  word_count: number;
};

export type ListNotesRes = { success: boolean; notes: Note[]; count: number };
export type CreateNoteRes = { success: boolean; note: Note };
export type UpdateNoteRes = { success: boolean; note: Note };
export type DeleteNoteRes = { success: boolean };
export type ImportObsidianRes = { 
  success: boolean; 
  imported: number; 
  skipped: number; 
  errors: string[];
};

// ========== Card API ==========
export const api = {
  health: () => request<{ status: string }>('/health'),
  
  // Cards
  listCards: () => request<ListCardsRes>('/cards'),
  createCard: (q: string, a: string) => request<{ success: boolean; card: Card }>('/cards', { 
    method: 'POST', 
    body: JSON.stringify({ q, a }) 
  }),
  deleteCard: (id: string) => request<{ success: boolean }>(`/cards/${id}`, { method: 'DELETE' }),
  nextDue: () => request<NextDueRes>('/review/next'),
  rateCard: (id: string, grade: 1 | 2 | 3) => request<RateRes>(`/review/${id}/rate`, { 
    method: 'POST', 
    body: JSON.stringify({ grade }) 
  }),
  importTxt: (content: string) => request<{ success: boolean; count: number }>('/import/txt', { 
    method: 'POST', 
    body: JSON.stringify({ content }) 
  }),

  // Notes
  listNotes: () => request<ListNotesRes>('/notes'),
  createNote: (title: string, folder: string, content: string, tags?: string[]) => 
    request<CreateNoteRes>('/notes', { 
      method: 'POST', 
      body: JSON.stringify({ title, folder, content, tags: tags || [] }) 
    }),
  getNote: (id: string) => request<CreateNoteRes>(`/notes/${id}`),
  updateNote: (id: string, data: { title?: string; folder?: string; content?: string; tags?: string[] }) => 
    request<UpdateNoteRes>(`/notes/${id}`, { 
      method: 'PATCH', 
      body: JSON.stringify(data) 
    }),
  deleteNote: (id: string) => request<DeleteNoteRes>(`/notes/${id}`, { method: 'DELETE' }),
  
  // Obsidian Import
  importObsidian: (vaultPath: string, excludeFolders?: string[]) => 
    request<ImportObsidianRes>('/notes/import/obsidian', { 
      method: 'POST', 
      body: JSON.stringify({ vault_path: vaultPath, exclude_folders: excludeFolders || ['.obsidian', '.git'] }) 
    }),
};
