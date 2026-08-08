import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Plus,
  Edit,
  Trash2,
  LogOut,
  ArrowLeft,
  FolderGit2,
  Wrench,
  ExternalLink,
  Database,
  CheckCircle2,
  Tag,
} from 'lucide-react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useAuth } from '../context/AuthContext';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import ProjectForm from '../components/admin/ProjectForm';
import SkillForm from '../components/admin/SkillForm';
import CategoryForm from '../components/admin/CategoryForm';

const MySwal = withReactContent(Swal);

const GithubIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 14}
    height={props.size || 14}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const INITIAL_PROJECTS = [
  {
    id: 'p1',
    title: 'RT Administration System',
    description:
      'A Modern Residential Administration and Financial Management Platform for Neighborhood Communities.',
    full_description:
      'RT Administration System is a web-based platform designed to digitize and simplify neighborhood administration processes for residential communities. Built specifically for local community management, the system helps RT administrators efficiently manage resident data, housing units, monthly contributions, expenses, and financial reporting through a centralized platform.\n\nThe system manages residential units consisting of permanent houses and temporary rental properties, while maintaining complete resident history and occupancy records. Financial operations are streamlined through an integrated contribution management system that handles monthly security and cleaning fees, tracks payment status per house, and records operational expenses.',
    category: 'Web Development',
    tech: ['Next.js', 'Laravel API', 'SSO', 'TanStack Query', 'Full Stack Development'],
    features: ['Real-time Payment Status', 'Citizen Management', 'Financial Reports'],
    github_link: '',
    live_link: '',
    cover_image: '/project/py.png',
    images: [{ id: 'img1', url: '/project/py.png', is_cover: true }, { id: 'img2', url: '/project/cc.png' }],
    created_at: '2026-07-15T00:00:00Z',
  },
  {
    id: 'p2',
    title: 'Coreculture',
    description: 'E-commerce platform fashion streetwear & football culture.',
    full_description:
      'Coreculture is a modern e-commerce and brand showcase platform built for streetwear fashion and football culture enthusiasts. It integrates product collections, story articles, and photoshoot previews with interactive filtering.',
    category: 'WEB',
    tech: ['NextJS', 'Tailwind', 'Supabase', 'Vercel'],
    features: ['Article Upload', 'Photoshoot Upload', 'Interactive Preview'],
    live_link: 'https://coreculture.vercel.app/',
    github_link: 'https://github.com/Galabeewww/coreculture',
    cover_image: '/project/cc.png',
    images: [{ id: 'img2', url: '/project/cc.png', is_cover: true }],
    created_at: '2026-06-20T00:00:00Z',
  },
];

const INITIAL_SKILLS = [
  { id: 's1', name: 'React', logo_url: '/icon/react.png', category: 'Skills' },
  { id: 's2', name: 'Tailwind', logo_url: '/icon/tailwind.png', category: 'Skills' },
  { id: 's3', name: 'JavaScript', logo_url: '/icon/js.png', category: 'Skills' },
  { id: 's4', name: 'GitHub', logo_url: '/icon/github.png', category: 'Tools' },
  { id: 's5', name: 'VS Code', logo_url: '/icon/vsc.png', category: 'Tools' },
];

const INITIAL_CATEGORIES = [
  { id: 'c1', name: 'WEB' },
  { id: 'c2', name: 'MOBILE' },
  { id: 'c3', name: 'WEB DESIGN' },
  { id: 'c4', name: 'UI/UX' },
];

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects');

  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingProject, setEditingProject] = useState(null);
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [isSkillFormOpen, setIsSkillFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    if (isSupabaseConfigured) {
      try {
        const { data: dbProjects } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        const { data: dbSkills } = await supabase
          .from('skills')
          .select('*')
          .order('created_at', { ascending: false });

        const { data: dbCategories } = await supabase
          .from('categories')
          .select('*')
          .order('name', { ascending: true });

        if (dbProjects && dbProjects.length > 0) setProjects(dbProjects);
        else loadLocalProjects();

        if (dbSkills && dbSkills.length > 0) setSkills(dbSkills);
        else loadLocalSkills();

        if (dbCategories && dbCategories.length > 0) setCategories(dbCategories);
        else loadLocalCategories();
      } catch (err) {
        console.error(err);
        loadLocalProjects();
        loadLocalSkills();
        loadLocalCategories();
      }
    } else {
      loadLocalProjects();
      loadLocalSkills();
      loadLocalCategories();
    }
    setLoading(false);
  };

  const loadLocalProjects = () => {
    const saved = localStorage.getItem('portfolio_crud_projects');
    if (saved) setProjects(JSON.parse(saved));
    else {
      setProjects(INITIAL_PROJECTS);
      localStorage.setItem('portfolio_crud_projects', JSON.stringify(INITIAL_PROJECTS));
    }
  };

  const loadLocalSkills = () => {
    const saved = localStorage.getItem('portfolio_crud_skills');
    if (saved) setSkills(JSON.parse(saved));
    else {
      setSkills(INITIAL_SKILLS);
      localStorage.setItem('portfolio_crud_skills', JSON.stringify(INITIAL_SKILLS));
    }
  };

  const loadLocalCategories = () => {
    const saved = localStorage.getItem('portfolio_crud_categories');
    if (saved) setCategories(JSON.parse(saved));
    else {
      setCategories(INITIAL_CATEGORIES);
      localStorage.setItem('portfolio_crud_categories', JSON.stringify(INITIAL_CATEGORIES));
    }
  };

  const saveProjectsToStorage = (updated) => {
    setProjects(updated);
    localStorage.setItem('portfolio_crud_projects', JSON.stringify(updated));
  };

  const saveSkillsToStorage = (updated) => {
    setSkills(updated);
    localStorage.setItem('portfolio_crud_skills', JSON.stringify(updated));
  };

  const saveCategoriesToStorage = (updated) => {
    setCategories(updated);
    localStorage.setItem('portfolio_crud_categories', JSON.stringify(updated));
  };

  // ===== PROJECT CRUD ACTIONS =====

  const handleSaveProject = async (projectData) => {
    const isEdit = Boolean(projectData.id);

    // Format new project payload
    const formattedProject = {
      ...projectData,
      id: projectData.id || `p_${Date.now()}`,
      created_at: projectData.created_at || new Date().toISOString(),
    };

    // ===== Detect "No Changes" on Update =====
    if (isEdit) {
      const original = projects.find((p) => p.id === formattedProject.id);
      if (original) {
        const fieldsToCompare = ['title', 'description', 'full_description', 'category', 'live_link', 'github_link', 'cover_image'];
        const noFieldChanges = fieldsToCompare.every(
          (key) => (original[key] || '') === (formattedProject[key] || '')
        );
        const origTech = JSON.stringify(Array.isArray(original.tech) ? original.tech : []);
        const newTech = JSON.stringify(Array.isArray(formattedProject.tech) ? formattedProject.tech : []);
        const origFeatures = JSON.stringify(Array.isArray(original.features) ? original.features : []);
        const newFeatures = JSON.stringify(Array.isArray(formattedProject.features) ? formattedProject.features : []);
        const origImages = JSON.stringify(original.images || []);
        const newImages = JSON.stringify(formattedProject.images || []);
        const origCreatedAt = original.created_at ? new Date(original.created_at).toISOString().substring(0, 7) : '';
        const newCreatedAt = formattedProject.created_at ? new Date(formattedProject.created_at).toISOString().substring(0, 7) : '';

        if (noFieldChanges && origTech === newTech && origFeatures === newFeatures && origImages === newImages && origCreatedAt === newCreatedAt) {
          MySwal.fire({
            icon: 'info',
            title: 'No Changes Detected',
            text: 'No data has been modified. Please make changes before saving.',
            confirmButtonColor: '#0284c7',
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
          });
          return;
        }
      }
    }

    if (isSupabaseConfigured) {
      try {
        if (isEdit) {
          await supabase
            .from('projects')
            .update({
              title: formattedProject.title,
              description: formattedProject.description,
              full_description: formattedProject.full_description,
              category: formattedProject.category,
              tech: formattedProject.tech,
              features: formattedProject.features,
              live_link: formattedProject.live_link,
              github_link: formattedProject.github_link,
              cover_image: formattedProject.cover_image,
              images: formattedProject.images,
              updated_at: new Date().toISOString(),
            })
            .eq('id', formattedProject.id);
        } else {
          await supabase.from('projects').insert([
            {
              title: formattedProject.title,
              description: formattedProject.description,
              full_description: formattedProject.full_description,
              category: formattedProject.category,
              tech: formattedProject.tech,
              features: formattedProject.features,
              live_link: formattedProject.live_link,
              github_link: formattedProject.github_link,
              cover_image: formattedProject.cover_image,
              images: formattedProject.images,
            },
          ]);
        }
      } catch (err) {
        console.error("Supabase project save error:", err);
      }
    }

    // Always update React State & LocalStorage for immediate persistence
    if (isEdit) {
      const updatedList = projects.map((p) => (p.id === formattedProject.id ? formattedProject : p));
      saveProjectsToStorage(updatedList);
    } else {
      const updatedList = [formattedProject, ...projects];
      saveProjectsToStorage(updatedList);
    }

    // Close form modal
    setIsProjectFormOpen(false);
    setEditingProject(null);

    // SweetAlert notification
    MySwal.fire({
      icon: 'success',
      title: isEdit ? 'Project Updated!' : 'Project Added!',
      text: isEdit
        ? `Project "${formattedProject.title}" has been successfully updated.`
        : `Project "${formattedProject.title}" has been saved permanently.`,
      timer: 2000,
      showConfirmButton: false,
      background: 'var(--bg-card)',
      color: 'var(--text-primary)',
    });
  };

  const handleDeleteProject = (project) => {
    MySwal.fire({
      title: 'Hapus Proyek?',
      text: `Apakah Anda yakin ingin menghapus proyek "${project.title}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#3f3f46',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
      background: 'var(--bg-card)',
      color: 'var(--text-primary)',
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (isSupabaseConfigured) {
          try {
            await supabase.from('projects').delete().eq('id', project.id);
          } catch (err) {
            console.error(err);
          }
        }
        const updated = projects.filter((p) => p.id !== project.id);
        saveProjectsToStorage(updated);

        MySwal.fire({
          icon: 'success',
          title: 'Terhapus!',
          text: `Proyek "${project.title}" telah terhapus.`,
          timer: 1500,
          showConfirmButton: false,
          background: 'var(--bg-card)',
          color: 'var(--text-primary)',
        });
      }
    });
  };

  // ===== SKILL CRUD ACTIONS =====

  const handleSaveSkill = async (skillData) => {
    const isEdit = Boolean(skillData.id);
    const formattedSkill = {
      ...skillData,
      id: skillData.id || `s_${Date.now()}`,
    };

    // ===== Detect "No Changes" on Update =====
    if (isEdit) {
      const original = skills.find((s) => s.id === formattedSkill.id);
      if (original) {
        const noChanges =
          (original.name || '') === (formattedSkill.name || '') &&
          (original.logo_url || '') === (formattedSkill.logo_url || '') &&
          (original.category || '') === (formattedSkill.category || '');
        if (noChanges) {
          MySwal.fire({
            icon: 'info',
            title: 'No Changes Detected',
            text: 'No data has been modified. Please make changes before saving.',
            confirmButtonColor: '#0284c7',
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
          });
          return;
        }
      }
    }

    if (isSupabaseConfigured) {
      try {
        if (isEdit) {
          await supabase
            .from('skills')
            .update({
              name: formattedSkill.name,
              logo_url: formattedSkill.logo_url,
              category: formattedSkill.category,
            })
            .eq('id', formattedSkill.id);
        } else {
          await supabase.from('skills').insert([
            {
              name: formattedSkill.name,
              logo_url: formattedSkill.logo_url,
              category: formattedSkill.category,
            },
          ]);
        }
      } catch (err) {
        console.error(err);
      }
    }

    if (isEdit) {
      const updated = skills.map((s) => (s.id === formattedSkill.id ? formattedSkill : s));
      saveSkillsToStorage(updated);
    } else {
      saveSkillsToStorage([...skills, formattedSkill]);
    }

    setIsSkillFormOpen(false);
    setEditingSkill(null);

    MySwal.fire({
      icon: 'success',
      title: isEdit ? 'Skill Updated!' : 'Skill Added!',
      text: `Skill "${formattedSkill.name}" has been saved successfully.`,
      timer: 2000,
      showConfirmButton: false,
      background: 'var(--bg-card)',
      color: 'var(--text-primary)',
    });
  };

  const handleDeleteSkill = (skill) => {
    MySwal.fire({
      title: 'Hapus Skill?',
      text: `Apakah Anda yakin ingin menghapus skill "${skill.name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#3f3f46',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
      background: 'var(--bg-card)',
      color: 'var(--text-primary)',
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (isSupabaseConfigured) {
          try {
            await supabase.from('skills').delete().eq('id', skill.id);
          } catch (err) {
            console.error(err);
          }
        }
        const updated = skills.filter((s) => s.id !== skill.id);
        saveSkillsToStorage(updated);

        MySwal.fire({
          icon: 'success',
          title: 'Terhapus!',
          text: `Skill "${skill.name}" telah terhapus.`,
          timer: 1500,
          showConfirmButton: false,
          background: 'var(--bg-card)',
          color: 'var(--text-primary)',
        });
      }
    });
  };

  // ===== CATEGORY CRUD ACTIONS =====

  const handleSaveCategory = async (catData) => {
    const isEdit = Boolean(catData.id);
    const formattedCat = {
      ...catData,
      id: catData.id || `c_${Date.now()}`,
    };

    // ===== Detect "No Changes" on Update =====
    if (isEdit) {
      const original = categories.find((c) => c.id === formattedCat.id);
      if (original && (original.name || '') === (formattedCat.name || '')) {
        MySwal.fire({
          icon: 'info',
          title: 'No Changes Detected',
          text: 'No data has been modified. Please make changes before saving.',
          confirmButtonColor: '#0284c7',
          background: 'var(--bg-card)',
          color: 'var(--text-primary)',
        });
        return;
      }
    }

    if (isSupabaseConfigured) {
      try {
        if (isEdit) {
          await supabase.from('categories').update({ name: formattedCat.name }).eq('id', formattedCat.id);
        } else {
          await supabase.from('categories').insert([{ name: formattedCat.name }]);
        }
      } catch (err) {
        console.error(err);
      }
    }

    if (isEdit) {
      const updated = categories.map((c) => (c.id === formattedCat.id ? formattedCat : c));
      saveCategoriesToStorage(updated);
    } else {
      saveCategoriesToStorage([...categories, formattedCat]);
    }

    setIsCategoryFormOpen(false);
    setEditingCategory(null);

    MySwal.fire({
      icon: 'success',
      title: isEdit ? 'Category Updated!' : 'Category Added!',
      text: `Category "${formattedCat.name}" has been saved successfully.`,
      timer: 1800,
      showConfirmButton: false,
      background: 'var(--bg-card)',
      color: 'var(--text-primary)',
    });
  };

  const handleDeleteCategory = (cat) => {
    MySwal.fire({
      title: 'Hapus Kategori?',
      text: `Hapus kategori "${cat.name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#3f3f46',
      confirmButtonText: 'Ya, Hapus!',
      background: 'var(--bg-card)',
      color: 'var(--text-primary)',
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (isSupabaseConfigured) {
          try {
            await supabase.from('categories').delete().eq('id', cat.id);
          } catch (err) {
            console.error(err);
          }
        }
        saveCategoriesToStorage(categories.filter((c) => c.id !== cat.id));

        MySwal.fire({
          icon: 'success',
          title: 'Terhapus!',
          timer: 1500,
          showConfirmButton: false,
          background: 'var(--bg-card)',
          color: 'var(--text-primary)',
        });
      }
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] relative">
      {/* Top Navbar Admin */}
      <header className="border-b border-[var(--border-color)] bg-[var(--bg-card)] sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="p-2 rounded-xl border border-[var(--border-color)] hover:bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200"
              title="Lihat Website Utama"
            >
              <ArrowLeft size={18} />
            </Link>
            <h1 className="text-lg font-bold font-display text-[var(--text-primary)] flex items-center gap-2">
              Dashboard Admin <span className="text-xs px-2 py-0.5 rounded bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--badge-text)]">CRUD</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
              <Database size={14} />
              {isSupabaseConfigured ? (
                <span className="text-emerald-500 font-semibold flex items-center gap-1">
                  <CheckCircle2 size={12} /> Supabase Connected
                </span>
              ) : (
                <span className="text-amber-500 font-semibold">Local Storage Mode</span>
              )}
            </span>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 font-semibold text-xs border border-rose-500/20 transition-all duration-200 cursor-pointer"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4 flex-wrap gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setActiveTab('projects')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer ${
                activeTab === 'projects'
                  ? 'bg-[var(--accent-btn)] text-[var(--accent-btn-text)] shadow-md'
                  : 'border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
              }`}
            >
              <FolderGit2 size={18} /> Proyek ({projects.length})
            </button>

            <button
              onClick={() => setActiveTab('skills')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer ${
                activeTab === 'skills'
                  ? 'bg-[var(--accent-btn)] text-[var(--accent-btn-text)] shadow-md'
                  : 'border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
              }`}
            >
              <Wrench size={18} /> Skills ({skills.length})
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer ${
                activeTab === 'categories'
                  ? 'bg-[var(--accent-btn)] text-[var(--accent-btn-text)] shadow-md'
                  : 'border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
              }`}
            >
              <Tag size={18} /> Kategori ({categories.length})
            </button>
          </div>

          <div>
            {activeTab === 'projects' && (
              <button
                onClick={() => {
                  setEditingProject(null);
                  setIsProjectFormOpen(true);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent-btn)] hover:bg-[var(--accent-btn-hover)] text-[var(--accent-btn-text)] font-semibold text-sm shadow-md transition-all duration-200 cursor-pointer"
              >
                <Plus size={18} /> Tambah Proyek Baru
              </button>
            )}

            {activeTab === 'skills' && (
              <button
                onClick={() => {
                  setEditingSkill(null);
                  setIsSkillFormOpen(true);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent-btn)] hover:bg-[var(--accent-btn-hover)] text-[var(--accent-btn-text)] font-semibold text-sm shadow-md transition-all duration-200 cursor-pointer"
              >
                <Plus size={18} /> Tambah Skill Baru
              </button>
            )}

            {activeTab === 'categories' && (
              <button
                onClick={() => {
                  setEditingCategory(null);
                  setIsCategoryFormOpen(true);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent-btn)] hover:bg-[var(--accent-btn-hover)] text-[var(--accent-btn-text)] font-semibold text-sm shadow-md transition-all duration-200 cursor-pointer"
              >
                <Plus size={18} /> Tambah Kategori
              </button>
            )}
          </div>
        </div>

        {/* TAB 1: KELOLA PROYEK */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            {loading ? (
              <div className="text-center py-12 text-[var(--text-muted)]">Memuat data proyek...</div>
            ) : projects.length === 0 ? (
              <div className="text-center py-16 p-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] space-y-3">
                <FolderGit2 className="w-12 h-12 text-[var(--text-muted)] mx-auto" />
                <h3 className="text-lg font-bold">Belum Ada Proyek</h3>
                <p className="text-sm text-[var(--text-muted)]">Klik tombol "Tambah Proyek Baru" untuk memasukkan proyek pertama Anda.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="glow-card rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-44 w-full bg-[var(--bg-secondary)] overflow-hidden">
                        <img
                          src={project.cover_image || project.image || '/project/py.png'}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded text-[10px] font-bold bg-black/70 text-white uppercase tracking-wider backdrop-blur-md">
                          {project.category || 'WEB'}
                        </span>
                      </div>

                      <div className="p-5 space-y-3">
                        <h3 className="font-bold text-lg text-[var(--text-primary)] font-display line-clamp-1">
                          {project.title}
                        </h3>
                        <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {(Array.isArray(project.tech) ? project.tech : []).slice(0, 3).map((t, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded text-[10px] font-medium bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--badge-text)]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border-t border-[var(--border-color)] flex items-center justify-between bg-[var(--bg-secondary)]/50">
                      <div className="flex items-center gap-2">
                        {project.live_link && (
                          <a
                            href={project.live_link}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                            title="Live Demo"
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                        {project.github_link && (
                          <a
                            href={project.github_link}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                            title="GitHub"
                          >
                            <GithubIcon size={14} />
                          </a>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingProject(project);
                            setIsProjectFormOpen(true);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--border-color)] text-xs font-semibold border border-[var(--border-color)] transition-colors duration-200 cursor-pointer"
                        >
                          <Edit size={14} /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 text-xs font-semibold border border-rose-500/20 transition-colors duration-200 cursor-pointer"
                        >
                          <Trash2 size={14} /> Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: KELOLA SKILLS */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            {loading ? (
              <div className="text-center py-12 text-[var(--text-muted)]">Memuat data skill...</div>
            ) : skills.length === 0 ? (
              <div className="text-center py-16 p-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] space-y-3">
                <Wrench className="w-12 h-12 text-[var(--text-muted)] mx-auto" />
                <h3 className="text-lg font-bold">Belum Ada Skill</h3>
                <p className="text-sm text-[var(--text-muted)]">Klik tombol "Tambah Skill Baru" untuk memasukkan skill.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="glow-card rounded-2xl p-4 border border-[var(--border-color)] bg-[var(--bg-card)] flex flex-col items-center justify-between text-center space-y-3 group"
                  >
                    <img
                      src={skill.logo_url || skill.logo}
                      alt={skill.name}
                      className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-200"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/icon/react.png';
                      }}
                    />
                    <div>
                      <h4 className="font-bold text-sm text-[var(--text-primary)]">{skill.name}</h4>
                      <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">{skill.category || 'Skills'}</span>
                    </div>

                    <div className="flex items-center gap-1.5 pt-2 border-t border-[var(--border-color)] w-full justify-center">
                      <button
                        onClick={() => {
                          setEditingSkill(skill);
                          setIsSkillFormOpen(true);
                        }}
                        className="p-1.5 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200 cursor-pointer"
                        title="Edit Skill"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteSkill(skill)}
                        className="p-1.5 rounded-lg hover:bg-rose-500/10 text-rose-500 transition-colors duration-200 cursor-pointer"
                        title="Hapus Skill"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: KELOLA KATEGORI */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="glow-card rounded-2xl p-5 border border-[var(--border-color)] bg-[var(--bg-card)] flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--text-primary)]">
                      <Tag size={18} />
                    </div>
                    <span className="font-bold text-base font-display tracking-wide">{cat.name}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setEditingCategory(cat);
                        setIsCategoryFormOpen(true);
                      }}
                      className="p-1.5 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200 cursor-pointer"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(cat)}
                      className="p-1.5 rounded-lg hover:bg-rose-500/10 text-rose-500 transition-colors duration-200 cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Modal Forms */}
      {isProjectFormOpen && (
        <ProjectForm
          project={editingProject}
          categories={categories}
          onSave={handleSaveProject}
          onClose={() => {
            setIsProjectFormOpen(false);
            setEditingProject(null);
          }}
        />
      )}

      {isSkillFormOpen && (
        <SkillForm
          skill={editingSkill}
          onSave={handleSaveSkill}
          onClose={() => {
            setIsSkillFormOpen(false);
            setEditingSkill(null);
          }}
        />
      )}

      {isCategoryFormOpen && (
        <CategoryForm
          category={editingCategory}
          onSave={handleSaveCategory}
          onClose={() => {
            setIsCategoryFormOpen(false);
            setEditingCategory(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
