// ===================================================================
// API Client - Dual Database Support
// LOCAL  → Express server (PostgreSQL via pgAdmin)
// ONLINE → Supabase
// ===================================================================

import { supabase, isSupabaseConfigured } from './supabaseClient';

const LOCAL_API_URL = import.meta.env.VITE_LOCAL_API_URL || 'http://localhost:3001/api';

// Deteksi mode: jika Supabase dikonfigurasi → gunakan Supabase, jika tidak → gunakan local API
const useLocalApi = !isSupabaseConfigured;

// ===== LOCAL API HELPERS =====

const localFetch = async (endpoint: string, options: RequestInit = {}) => {
  const res = await fetch(`${LOCAL_API_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || json.message || 'API Error');
  return json;
};

// ===== UNIFIED API CLIENT =====

export const api = {
  // ===== AUTH =====
  auth: {
    login: async (username: string, password: string) => {
      if (useLocalApi) {
        try {
          const res = await localFetch('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
          });
          return { data: res.user || res, error: null };
        } catch (err: any) {
          return { data: null, error: { message: err.message || 'Login gagal' } };
        }
      }
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();
      return { data, error };
    },
  },

  // ===== PROJECTS =====
  projects: {
    getAll: async () => {
      if (useLocalApi) {
        const data = await localFetch('/projects');
        return { data, error: null };
      }
      return supabase.from('projects').select('*').order('created_at', { ascending: false });
    },

    insert: async (project: Record<string, unknown>) => {
      if (useLocalApi) {
        const data = await localFetch('/projects', {
          method: 'POST',
          body: JSON.stringify(project),
        });
        return { data, error: null };
      }
      return supabase.from('projects').insert([project]);
    },

    update: async (id: string, updates: Record<string, unknown>) => {
      if (useLocalApi) {
        const data = await localFetch(`/projects/${id}`, {
          method: 'PUT',
          body: JSON.stringify(updates),
        });
        return { data, error: null };
      }
      return supabase.from('projects').update(updates).eq('id', id);
    },

    delete: async (id: string) => {
      if (useLocalApi) {
        await localFetch(`/projects/${id}`, { method: 'DELETE' });
        return { error: null };
      }
      return supabase.from('projects').delete().eq('id', id);
    },
  },

  // ===== SKILLS =====
  skills: {
    getAll: async () => {
      if (useLocalApi) {
        const data = await localFetch('/skills');
        return { data, error: null };
      }
      return supabase.from('skills').select('*').order('created_at', { ascending: false });
    },

    insert: async (skill: Record<string, unknown>) => {
      if (useLocalApi) {
        const data = await localFetch('/skills', {
          method: 'POST',
          body: JSON.stringify(skill),
        });
        return { data, error: null };
      }
      return supabase.from('skills').insert([skill]);
    },

    update: async (id: string, updates: Record<string, unknown>) => {
      if (useLocalApi) {
        const data = await localFetch(`/skills/${id}`, {
          method: 'PUT',
          body: JSON.stringify(updates),
        });
        return { data, error: null };
      }
      return supabase.from('skills').update(updates).eq('id', id);
    },

    delete: async (id: string) => {
      if (useLocalApi) {
        await localFetch(`/skills/${id}`, { method: 'DELETE' });
        return { error: null };
      }
      return supabase.from('skills').delete().eq('id', id);
    },
  },

  // ===== CATEGORIES =====
  categories: {
    getAll: async () => {
      if (useLocalApi) {
        const data = await localFetch('/categories');
        return { data, error: null };
      }
      return supabase.from('categories').select('*').order('created_at', { ascending: false });
    },

    insert: async (category: Record<string, unknown>) => {
      if (useLocalApi) {
        const data = await localFetch('/categories', {
          method: 'POST',
          body: JSON.stringify(category),
        });
        return { data, error: null };
      }
      return supabase.from('categories').insert([category]);
    },

    update: async (id: string, updates: Record<string, unknown>) => {
      if (useLocalApi) {
        const data = await localFetch(`/categories/${id}`, {
          method: 'PUT',
          body: JSON.stringify(updates),
        });
        return { data, error: null };
      }
      return supabase.from('categories').update(updates).eq('id', id);
    },

    delete: async (id: string) => {
      if (useLocalApi) {
        await localFetch(`/categories/${id}`, { method: 'DELETE' });
        return { error: null };
      }
      return supabase.from('categories').delete().eq('id', id);
    },
  },

  // ===== EXPERIENCES =====
  experiences: {
    getAll: async () => {
      if (useLocalApi) {
        const data = await localFetch('/experiences');
        return { data, error: null };
      }
      return supabase.from('experiences').select('*').order('created_at', { ascending: false });
    },

    insert: async (experience: Record<string, unknown>) => {
      if (useLocalApi) {
        const data = await localFetch('/experiences', {
          method: 'POST',
          body: JSON.stringify(experience),
        });
        return { data, error: null };
      }
      return supabase.from('experiences').insert([experience]);
    },

    update: async (id: string, updates: Record<string, unknown>) => {
      if (useLocalApi) {
        const data = await localFetch(`/experiences/${id}`, {
          method: 'PUT',
          body: JSON.stringify(updates),
        });
        return { data, error: null };
      }
      return supabase.from('experiences').update(updates).eq('id', id);
    },

    delete: async (id: string) => {
      if (useLocalApi) {
        await localFetch(`/experiences/${id}`, { method: 'DELETE' });
        return { error: null };
      }
      return supabase.from('experiences').delete().eq('id', id);
    },
  },
};

export { useLocalApi };
export default api;
