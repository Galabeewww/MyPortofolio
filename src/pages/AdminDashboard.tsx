import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  Briefcase,
} from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useAuth } from "../context/AuthContext";
import api, { useLocalApi } from "../lib/api";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";
import ProjectForm from "../components/admin/ProjectForm";
import SkillForm from "../components/admin/SkillForm";
import CategoryForm from "../components/admin/CategoryForm";
import ExperienceForm from "../components/admin/ExperienceForm";

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

const INITIAL_PROJECTS = [];
const INITIAL_SKILLS = [];
const INITIAL_CATEGORIES = [];

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("projects");

  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingProject, setEditingProject] = useState(null);
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [isSkillFormOpen, setIsSkillFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  const [isExperienceFormOpen, setIsExperienceFormOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resProjects, resSkills, resCat, resExp] = await Promise.all([
        api.projects.getAll().catch(() => ({ data: null })),
        api.skills.getAll().catch(() => ({ data: null })),
        api.categories.getAll().catch(() => ({ data: null })),
        api.experiences.getAll().catch(() => ({ data: null })),
      ]);

      if (resProjects?.data && Array.isArray(resProjects.data) && resProjects.data.length > 0) {
        setProjects(resProjects.data);
      } else {
        loadLocalProjects();
      }

      if (resSkills?.data && Array.isArray(resSkills.data) && resSkills.data.length > 0) {
        setSkills(resSkills.data);
      } else {
        loadLocalSkills();
      }

      if (resCat?.data && Array.isArray(resCat.data) && resCat.data.length > 0) {
        setCategories(resCat.data);
      } else {
        loadLocalCategories();
      }

      if (resExp?.data && Array.isArray(resExp.data) && resExp.data.length > 0) {
        setExperiences(sortExperiences(resExp.data));
      } else {
        loadLocalExperiences();
      }
    } catch (err) {
      console.error("fetchData catch error:", err);
      loadLocalProjects();
      loadLocalSkills();
      loadLocalCategories();
      loadLocalExperiences();
    }
    setLoading(false);
  };

  const loadLocalProjects = () => {
    const saved = localStorage.getItem("portfolio_crud_projects");
    if (saved) setProjects(JSON.parse(saved));
    else {
      setProjects(INITIAL_PROJECTS);
      localStorage.setItem("portfolio_crud_projects", JSON.stringify(INITIAL_PROJECTS));
    }
  };

  const loadLocalSkills = () => {
    const saved = localStorage.getItem("portfolio_crud_skills");
    if (saved) setSkills(JSON.parse(saved));
    else {
      setSkills(INITIAL_SKILLS);
      localStorage.setItem("portfolio_crud_skills", JSON.stringify(INITIAL_SKILLS));
    }
  };

  const loadLocalCategories = () => {
    const saved = localStorage.getItem("portfolio_crud_categories");
    if (saved) setCategories(JSON.parse(saved));
    else {
      setCategories(INITIAL_CATEGORIES);
      localStorage.setItem("portfolio_crud_categories", JSON.stringify(INITIAL_CATEGORIES));
    }
  };

  const sortExperiences = (list) => {
    return [...list].sort((a, b) => {
      if (a.is_present && !b.is_present) return -1;
      if (!a.is_present && b.is_present) return 1;

      const dateA = a.start_date || a.created_at || a.period || "";
      const dateB = b.start_date || b.created_at || b.period || "";
      return dateB.localeCompare(dateA);
    });
  };

  const loadLocalExperiences = () => {
    const saved = localStorage.getItem("portfolio_crud_experiences");
    if (saved) setExperiences(sortExperiences(JSON.parse(saved)));
    else setExperiences([]);
  };

  const saveProjectsToStorage = (updated) => {
    setProjects(updated);
    localStorage.setItem("portfolio_crud_projects", JSON.stringify(updated));
  };

  const saveSkillsToStorage = (updated) => {
    setSkills(updated);
    localStorage.setItem("portfolio_crud_skills", JSON.stringify(updated));
  };

  const saveCategoriesToStorage = (updated) => {
    setCategories(updated);
    localStorage.setItem("portfolio_crud_categories", JSON.stringify(updated));
  };

  const saveExperiencesToStorage = (updated) => {
    const sorted = sortExperiences(updated);
    setExperiences(sorted);
    localStorage.setItem("portfolio_crud_experiences", JSON.stringify(sorted));
  };

  // ===== PROJECT CRUD ACTIONS =====

  const handleSaveProject = async (projectData) => {
    const isEdit = Boolean(projectData.id);

    const formattedProject = {
      ...projectData,
      id: projectData.id || `p_${Date.now()}`,
      created_at: projectData.created_at || new Date().toISOString(),
    };

    // Detect "No Changes" on Update
    if (isEdit) {
      const original = projects.find((p) => p.id === formattedProject.id);
      if (original) {
        const fieldsToCompare = [
          "title",
          "description",
          "full_description",
          "category",
          "live_link",
          "github_link",
          "cover_image",
        ];
        const noFieldChanges = fieldsToCompare.every(
          (key) => (original[key] || "") === (formattedProject[key] || ""),
        );
        const origTech = JSON.stringify(Array.isArray(original.tech) ? original.tech : []);
        const newTech = JSON.stringify(Array.isArray(formattedProject.tech) ? formattedProject.tech : []);
        const origFeatures = JSON.stringify(Array.isArray(original.features) ? original.features : []);
        const newFeatures = JSON.stringify(Array.isArray(formattedProject.features) ? formattedProject.features : []);
        const origImages = JSON.stringify(original.images || []);
        const newImages = JSON.stringify(formattedProject.images || []);

        if (noFieldChanges && origTech === newTech && origFeatures === newFeatures && origImages === newImages) {
          MySwal.fire({
            icon: "info",
            title: "No Changes Detected",
            text: "No data has been modified. Please make changes before saving.",
            confirmButtonColor: "#0284c7",
            background: "var(--bg-card)",
            color: "var(--text-primary)",
          });
          return;
        }
      }
    } else {
      const isDuplicate = projects.some(
        (p) => p.title.toLowerCase().trim() === formattedProject.title.toLowerCase().trim()
      );
      if (isDuplicate) {
        MySwal.fire({
          icon: "warning",
          title: "Proyek Sudah Ada",
          text: `Proyek dengan judul "${formattedProject.title}" sudah terdaftar. Silakan gunakan judul lain.`,
          confirmButtonColor: "#0284c7",
          background: "var(--bg-card)",
          color: "var(--text-primary)",
        });
        return;
      }
    }

    // Sanitize: only send columns that exist in the database table
    const dbPayload: Record<string, unknown> = {
      id: formattedProject.id,
      title: formattedProject.title,
      description: formattedProject.description,
      full_description: formattedProject.full_description || "",
      category: formattedProject.category || "",
      tech: Array.isArray(formattedProject.tech) ? formattedProject.tech : [],
      features: Array.isArray(formattedProject.features) ? formattedProject.features : [],
      live_link: formattedProject.live_link || "",
      github_link: formattedProject.github_link || "",
      cover_image: formattedProject.cover_image || "",
      images: formattedProject.images || [],
    };

    try {
      let res;
      if (isEdit) {
        const updatePayload = { ...dbPayload, updated_at: new Date().toISOString() };
        delete updatePayload.id;
        res = await api.projects.update(formattedProject.id, updatePayload);
      } else {
        res = await api.projects.insert({ ...dbPayload, created_at: formattedProject.created_at });
      }

      if (res?.error) {
        console.error("API project save error:", res.error);
        MySwal.fire({
          icon: "error",
          title: "Gagal Menyimpan Proyek",
          text: `Terjadi kesalahan database: ${res.error.message || res.error}`,
          confirmButtonColor: "#0284c7",
          background: "var(--bg-card)",
          color: "var(--text-primary)",
        });
        return;
      }
    } catch (err: any) {
      console.error("Project save exception:", err);
    }

    if (isEdit) {
      const updatedList = projects.map((p) =>
        p.id === formattedProject.id ? formattedProject : p,
      );
      saveProjectsToStorage(updatedList);
    } else {
      const updatedList = [formattedProject, ...projects];
      saveProjectsToStorage(updatedList);
    }

    setIsProjectFormOpen(false);
    setEditingProject(null);

    setTimeout(() => {
      MySwal.fire({
        icon: "success",
        title: isEdit ? "Project Updated!" : "Project Added!",
        text: `Project "${formattedProject.title}" has been saved successfully.`,
        timer: 2000,
        showConfirmButton: false,
        background: "var(--bg-card)",
        color: "var(--text-primary)",
      });
    }, 150);
  };

  const handleDeleteProject = (project) => {
    MySwal.fire({
      title: "Hapus Proyek?",
      text: `Apakah Anda yakin ingin menghapus proyek "${project.title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#3f3f46",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
      background: "var(--bg-card)",
      color: "var(--text-primary)",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.projects.delete(project.id);
        } catch (err) {
          console.error("Delete project error:", err);
        }
        const updated = projects.filter((p) => p.id !== project.id);
        saveProjectsToStorage(updated);

        setTimeout(() => {
          MySwal.fire({
            icon: "success",
            title: "Terhapus!",
            text: `Proyek "${project.title}" telah terhapus.`,
            timer: 1500,
            showConfirmButton: false,
            background: "var(--bg-card)",
            color: "var(--text-primary)",
          });
        }, 150);
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

    if (isEdit) {
      const original = skills.find((s) => s.id === formattedSkill.id);
      if (original) {
        const noChanges =
          (original.name || "") === (formattedSkill.name || "") &&
          (original.logo_url || "") === (formattedSkill.logo_url || "") &&
          (original.category || "") === (formattedSkill.category || "");
        if (noChanges) {
          MySwal.fire({
            icon: "info",
            title: "No Changes Detected",
            text: "No data has been modified. Please make changes before saving.",
            confirmButtonColor: "#0284c7",
            background: "var(--bg-card)",
            color: "var(--text-primary)",
          });
          return;
        }
      }
    } else {
      const isDuplicate = skills.some(
        (s) => s.name.toLowerCase().trim() === formattedSkill.name.toLowerCase().trim()
      );
      if (isDuplicate) {
        MySwal.fire({
          icon: "warning",
          title: "Skill Sudah Ada",
          text: `Skill dengan nama "${formattedSkill.name}" sudah terdaftar. Silakan gunakan nama lain.`,
          confirmButtonColor: "#0284c7",
          background: "var(--bg-card)",
          color: "var(--text-primary)",
        });
        return;
      }
    }

    try {
      const res = isEdit
        ? await api.skills.update(formattedSkill.id, formattedSkill)
        : await api.skills.insert(formattedSkill);

      if (res?.error) {
        MySwal.fire({
          icon: "error",
          title: "Gagal Menyimpan Skill",
          text: `Terjadi kesalahan database: ${res.error.message || res.error}`,
          confirmButtonColor: "#0284c7",
          background: "var(--bg-card)",
          color: "var(--text-primary)",
        });
        return;
      }
    } catch (err: any) {
      console.error("Skill save exception:", err);
    }

    if (isEdit) {
      const updated = skills.map((s) =>
        s.id === formattedSkill.id ? formattedSkill : s,
      );
      saveSkillsToStorage(updated);
    } else {
      saveSkillsToStorage([...skills, formattedSkill]);
    }

    setIsSkillFormOpen(false);
    setEditingSkill(null);

    setTimeout(() => {
      MySwal.fire({
        icon: "success",
        title: isEdit ? "Skill Updated!" : "Skill Added!",
        text: `Skill "${formattedSkill.name}" has been saved successfully.`,
        timer: 2000,
        showConfirmButton: false,
        background: "var(--bg-card)",
        color: "var(--text-primary)",
      });
    }, 150);
  };

  const handleDeleteSkill = (skill) => {
    MySwal.fire({
      title: "Hapus Skill?",
      text: `Apakah Anda yakin ingin menghapus skill "${skill.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#3f3f46",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
      background: "var(--bg-card)",
      color: "var(--text-primary)",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.skills.delete(skill.id);
        } catch (err) {
          console.error(err);
        }
        const updated = skills.filter((s) => s.id !== skill.id);
        saveSkillsToStorage(updated);

        setTimeout(() => {
          MySwal.fire({
            icon: "success",
            title: "Terhapus!",
            text: `Skill "${skill.name}" telah terhapus.`,
            timer: 1500,
            showConfirmButton: false,
            background: "var(--bg-card)",
            color: "var(--text-primary)",
          });
        }, 150);
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

    if (isEdit) {
      const original = categories.find((c) => c.id === formattedCat.id);
      if (original && (original.name || "") === (formattedCat.name || "")) {
        MySwal.fire({
          icon: "info",
          title: "No Changes Detected",
          text: "No data has been modified. Please make changes before saving.",
          confirmButtonColor: "#0284c7",
          background: "var(--bg-card)",
          color: "var(--text-primary)",
        });
        return;
      }
    } else {
      const isDuplicate = categories.some(
        (c) => c.name.toLowerCase().trim() === formattedCat.name.toLowerCase().trim()
      );
      if (isDuplicate) {
        MySwal.fire({
          icon: "warning",
          title: "Kategori Sudah Ada",
          text: `Kategori "${formattedCat.name}" sudah terdaftar. Silakan gunakan nama kategori lain.`,
          confirmButtonColor: "#0284c7",
          background: "var(--bg-card)",
          color: "var(--text-primary)",
        });
        return;
      }
    }

    try {
      const res = isEdit
        ? await api.categories.update(formattedCat.id, formattedCat)
        : await api.categories.insert(formattedCat);

      if (res?.error) {
        MySwal.fire({
          icon: "error",
          title: "Gagal Menyimpan Kategori",
          text: `Terjadi kesalahan database: ${res.error.message || res.error}`,
          confirmButtonColor: "#0284c7",
          background: "var(--bg-card)",
          color: "var(--text-primary)",
        });
        return;
      }
    } catch (err: any) {
      console.error("Category save exception:", err);
    }

    if (isEdit) {
      const updated = categories.map((c) =>
        c.id === formattedCat.id ? formattedCat : c,
      );
      saveCategoriesToStorage(updated);
    } else {
      saveCategoriesToStorage([...categories, formattedCat]);
    }

    setIsCategoryFormOpen(false);
    setEditingCategory(null);

    setTimeout(() => {
      MySwal.fire({
        icon: "success",
        title: isEdit ? "Category Updated!" : "Category Added!",
        text: `Category "${formattedCat.name}" has been saved successfully.`,
        timer: 1800,
        showConfirmButton: false,
        background: "var(--bg-card)",
        color: "var(--text-primary)",
      });
    }, 150);
  };

  const handleDeleteCategory = (cat) => {
    MySwal.fire({
      title: "Hapus Kategori?",
      text: `Hapus kategori "${cat.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#3f3f46",
      confirmButtonText: "Ya, Hapus!",
      background: "var(--bg-card)",
      color: "var(--text-primary)",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.categories.delete(cat.id);
        } catch (err) {
          console.error(err);
        }
        saveCategoriesToStorage(categories.filter((c) => c.id !== cat.id));

        setTimeout(() => {
          MySwal.fire({
            icon: "success",
            title: "Kategori Terhapus!",
            text: `Kategori "${cat.name}" telah berhasil dihapus.`,
            timer: 1800,
            showConfirmButton: false,
            background: "var(--bg-card)",
            color: "var(--text-primary)",
          });
        }, 150);
      }
    });
  };

  // ===== EXPERIENCE CRUD ACTIONS =====

  const handleSaveExperience = async (expData) => {
    const isEdit = Boolean(expData.id);
    const formattedExp = {
      ...expData,
      id: expData.id || `exp_${Date.now()}`,
    };

    if (isEdit) {
      const original = experiences.find((e) => e.id === formattedExp.id);
      if (original) {
        const noChanges =
          (original.title || "") === (formattedExp.title || "") &&
          (original.company || "") === (formattedExp.company || "") &&
          (original.location || "") === (formattedExp.location || "") &&
          (original.period || "") === (formattedExp.period || "") &&
          (original.start_date || "") === (formattedExp.start_date || "") &&
          (original.end_date || "") === (formattedExp.end_date || "") &&
          Boolean(original.is_present) === Boolean(formattedExp.is_present) &&
          JSON.stringify(original.responsibilities || []) ===
            JSON.stringify(formattedExp.responsibilities || []) &&
          JSON.stringify(original.tech || []) ===
            JSON.stringify(formattedExp.tech || []);

        if (noChanges) {
          MySwal.fire({
            icon: "info",
            title: "No Changes Detected",
            text: "No data has been modified. Please make changes before saving.",
            confirmButtonColor: "#0284c7",
            background: "var(--bg-card)",
            color: "var(--text-primary)",
          });
          return;
        }
      }
    }

    try {
      const res = isEdit
        ? await api.experiences.update(formattedExp.id, formattedExp)
        : await api.experiences.insert(formattedExp);

      if (res?.error) {
        MySwal.fire({
          icon: "error",
          title: "Gagal Menyimpan Experience",
          text: `Terjadi kesalahan database: ${res.error.message || res.error}`,
          confirmButtonColor: "#0284c7",
          background: "var(--bg-card)",
          color: "var(--text-primary)",
        });
        return;
      }
    } catch (err: any) {
      console.error("Experience save exception:", err);
    }

    if (isEdit) {
      const updated = experiences.map((e) =>
        e.id === formattedExp.id ? formattedExp : e,
      );
      saveExperiencesToStorage(updated);
    } else {
      saveExperiencesToStorage([formattedExp, ...experiences]);
    }

    setIsExperienceFormOpen(false);
    setEditingExperience(null);

    setTimeout(() => {
      MySwal.fire({
        icon: "success",
        title: isEdit ? "Experience Updated!" : "Experience Added!",
        text: `Experience "${formattedExp.title}" has been saved successfully.`,
        timer: 2000,
        showConfirmButton: false,
        background: "var(--bg-card)",
        color: "var(--text-primary)",
      });
    }, 150);
  };

  const handleDeleteExperience = (exp) => {
    MySwal.fire({
      title: "Hapus Pengalaman Kerja?",
      text: `Hapus "${exp.title} - ${exp.company}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#3f3f46",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
      background: "var(--bg-card)",
      color: "var(--text-primary)",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.experiences.delete(exp.id);
        } catch (err) {
          console.error(err);
        }
        saveExperiencesToStorage(experiences.filter((e) => e.id !== exp.id));

        setTimeout(() => {
          MySwal.fire({
            icon: "success",
            title: "Pengalaman Kerja Terhapus!",
            text: `Pengalaman "${exp.title}" di ${exp.company} telah berhasil dihapus.`,
            timer: 1800,
            showConfirmButton: false,
            background: "var(--bg-card)",
            color: "var(--text-primary)",
          });
        }, 150);
      }
    });
  };

  const handleLogout = () => {
    MySwal.fire({
      title: "Konfirmasi Logout",
      text: "Apakah Anda yakin ingin keluar dari dashboard admin?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#3f3f46",
      confirmButtonText: "Ya, Logout!",
      cancelButtonText: "Batal",
      background: "var(--bg-card)",
      color: "var(--text-primary)",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        MySwal.fire({
          icon: "success",
          title: "Berhasil Logout!",
          text: "Anda telah keluar dari halaman admin.",
          timer: 1500,
          showConfirmButton: false,
          background: "var(--bg-card)",
          color: "var(--text-primary)",
        }).then(() => {
          navigate("/");
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
      {/* Header Admin Navbar */}
      <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="p-2 rounded-xl border border-[var(--border-color)] hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
              title="Kembali ke Beranda Portofolio"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="text-lg font-bold font-display text-[var(--text-primary)] leading-tight">
                Admin Dashboard
              </h1>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  <CheckCircle2 size={10} /> Authenticated
                </span>
                <span className="text-[11px] text-[var(--text-muted)] flex items-center gap-1">
                  <Database size={10} />
                  {isSupabaseConfigured ? "Supabase Cloud" : "Local Mode"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 transition-colors duration-200 cursor-pointer"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab("projects")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
              activeTab === "projects"
                ? "bg-[var(--accent-btn)] text-[var(--accent-btn-text)] shadow-md"
                : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <FolderGit2 size={16} />
            Proyek ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab("skills")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
              activeTab === "skills"
                ? "bg-[var(--accent-btn)] text-[var(--accent-btn-text)] shadow-md"
                : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Wrench size={16} />
            Skills ({skills.length})
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
              activeTab === "categories"
                ? "bg-[var(--accent-btn)] text-[var(--accent-btn-text)] shadow-md"
                : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Tag size={16} />
            Kategori ({categories.length})
          </button>
          <button
            onClick={() => setActiveTab("experiences")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
              activeTab === "experiences"
                ? "bg-[var(--accent-btn)] text-[var(--accent-btn-text)] shadow-md"
                : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Briefcase size={16} />
            Work Experience ({experiences.length})
          </button>
        </div>

        {/* TAB 1: PROJECTS */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
              <div>
                <h2 className="text-xl font-bold font-display text-[var(--text-primary)]">
                  Kelola Proyek Portofolio
                </h2>
                <p className="text-xs text-[var(--text-muted)]">
                  Tambah, ubah, atau hapus karya proyek yang akan tampil di halaman portofolio utama.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingProject(null);
                  setIsProjectFormOpen(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--accent-btn)] hover:bg-[var(--accent-btn-hover)] text-[var(--accent-btn-text)] text-xs font-semibold shadow-md transition-all duration-200 cursor-pointer"
              >
                <Plus size={16} />
                Tambah Proyek Baru
              </button>
            </div>

            {loading ? (
              <div className="py-16 text-center text-xs text-[var(--text-muted)]">
                Memuat data proyek...
              </div>
            ) : projects.length === 0 ? (
              <div className="py-16 text-center rounded-2xl border border-dashed border-[var(--border-color)] p-8">
                <FolderGit2 className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-3 opacity-40" />
                <p className="text-sm font-semibold text-[var(--text-primary)]">Belum Ada Proyek</p>
                <p className="text-xs text-[var(--text-muted)] mt-1 mb-4">
                  Klik tombol "Tambah Proyek Baru" untuk memasukkan proyek pertama Anda.
                </p>
                <button
                  onClick={() => {
                    setEditingProject(null);
                    setIsProjectFormOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--accent-btn)] text-[var(--accent-btn-text)] text-xs font-semibold shadow-sm"
                >
                  <Plus size={14} /> Tambah Proyek
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="group rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] overflow-hidden flex flex-col justify-between hover:border-[var(--text-secondary)] transition-all duration-300 shadow-sm hover:shadow-lg"
                  >
                    <div>
                      <div className="relative aspect-video w-full overflow-hidden bg-[var(--bg-secondary)]">
                        <img
                          src={project.cover_image || project.image || "/icon/react.png"}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).onerror = null;
                            (e.target as HTMLImageElement).src = "/icon/react.png";
                          }}
                        />
                        <div className="absolute top-3 right-3 flex items-center gap-1.5">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/10 shadow-sm">
                            {project.category || "WEB"}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 space-y-3">
                        <h3 className="text-base font-bold font-display text-[var(--text-primary)] line-clamp-1">
                          {project.title}
                        </h3>
                        <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Tech tags */}
                        {Array.isArray(project.tech) && project.tech.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {project.tech.map((t, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)]"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-4 border-t border-[var(--border-color)] bg-[var(--bg-secondary)]/30 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {project.live_link && (
                          <a
                            href={project.live_link}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200"
                            title="Live Demo"
                          >
                            <ExternalLink size={15} />
                          </a>
                        )}
                        {project.github_link && (
                          <a
                            href={project.github_link}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200"
                            title="GitHub Repo"
                          >
                            <GithubIcon size={15} />
                          </a>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingProject(project);
                            setIsProjectFormOpen(true);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--border-color)] text-[var(--text-primary)] text-xs font-semibold transition-colors duration-200 cursor-pointer"
                        >
                          <Edit size={13} /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project)}
                          className="p-1.5 rounded-lg hover:bg-rose-500/10 text-rose-500 transition-colors duration-200 cursor-pointer"
                          title="Hapus Proyek"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SKILLS */}
        {activeTab === "skills" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
              <div>
                <h2 className="text-xl font-bold font-display text-[var(--text-primary)]">
                  Kelola Technical Skills & Tools
                </h2>
                <p className="text-xs text-[var(--text-muted)]">
                  Kelola keahlian teknis dan perangkat lunak yang akan muncul di section Technical Skills.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingSkill(null);
                  setIsSkillFormOpen(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--accent-btn)] hover:bg-[var(--accent-btn-hover)] text-[var(--accent-btn-text)] text-xs font-semibold shadow-md transition-all duration-200 cursor-pointer"
              >
                <Plus size={16} />
                Tambah Skill Baru
              </button>
            </div>

            {skills.length === 0 ? (
              <div className="py-16 text-center rounded-2xl border border-dashed border-[var(--border-color)] p-8">
                <Wrench className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-3 opacity-40" />
                <p className="text-sm font-semibold text-[var(--text-primary)]">Belum Ada Skill</p>
                <p className="text-xs text-[var(--text-muted)] mt-1 mb-4">
                  Klik tombol "Tambah Skill Baru" untuk menambahkan keahlian teknis Anda.
                </p>
                <button
                  onClick={() => {
                    setEditingSkill(null);
                    setIsSkillFormOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--accent-btn)] text-[var(--accent-btn-text)] text-xs font-semibold shadow-sm"
                >
                  <Plus size={14} /> Tambah Skill
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="group relative rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] p-4 flex flex-col items-center text-center justify-between hover:border-[var(--text-secondary)] transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center p-2 mb-3 mt-1">
                      <img
                        src={skill.logo_url || skill.logo || "/icon/react.png"}
                        alt={skill.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).onerror = null;
                          (e.target as HTMLImageElement).src = "/icon/react.png";
                        }}
                      />
                    </div>
                    <div className="space-y-1 mb-3">
                      <h4 className="text-xs font-bold text-[var(--text-primary)] line-clamp-1">
                        {skill.name}
                      </h4>
                      <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-semibold text-[var(--text-secondary)] bg-[var(--bg-secondary)]">
                        {skill.category || "Skills"}
                      </span>
                    </div>

                    <div className="w-full flex items-center justify-center gap-1.5 pt-2 border-t border-[var(--border-color)]">
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

        {/* TAB 3: CATEGORIES */}
        {activeTab === "categories" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
              <div>
                <h2 className="text-xl font-bold font-display text-[var(--text-primary)]">
                  Kelola Kategori Proyek
                </h2>
                <p className="text-xs text-[var(--text-muted)]">
                  Kelola pilihan kategori filter untuk mengelompokkan proyek (misal: WEB, MOBILE, UI/UX).
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingCategory(null);
                  setIsCategoryFormOpen(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--accent-btn)] hover:bg-[var(--accent-btn-hover)] text-[var(--accent-btn-text)] text-xs font-semibold shadow-md transition-all duration-200 cursor-pointer"
              >
                <Plus size={16} />
                Tambah Kategori Baru
              </button>
            </div>

            {categories.length === 0 ? (
              <div className="py-16 text-center rounded-2xl border border-dashed border-[var(--border-color)] p-8">
                <Tag className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-3 opacity-40" />
                <p className="text-sm font-semibold text-[var(--text-primary)]">Belum Ada Kategori</p>
                <p className="text-xs text-[var(--text-muted)] mt-1 mb-4">
                  Klik tombol "Tambah Kategori Baru" untuk menambahkan kategori pertama Anda.
                </p>
                <button
                  onClick={() => {
                    setEditingCategory(null);
                    setIsCategoryFormOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--accent-btn)] text-[var(--accent-btn-text)] text-xs font-semibold shadow-sm"
                >
                  <Plus size={14} /> Tambah Kategori
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] p-4 flex items-center justify-between hover:border-[var(--text-secondary)] transition-all duration-200 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--text-primary)]">
                        <Tag size={16} />
                      </div>
                      <span className="text-sm font-bold uppercase text-[var(--text-primary)] tracking-wide">
                        {cat.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setEditingCategory(cat);
                          setIsCategoryFormOpen(true);
                        }}
                        className="p-1.5 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200 cursor-pointer"
                        title="Edit Kategori"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(cat)}
                        className="p-1.5 rounded-lg hover:bg-rose-500/10 text-rose-500 transition-colors duration-200 cursor-pointer"
                        title="Hapus Kategori"
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

        {/* TAB 4: WORK EXPERIENCES */}
        {activeTab === "experiences" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
              <div>
                <h2 className="text-xl font-bold font-display text-[var(--text-primary)]">
                  Kelola Work Experience
                </h2>
                <p className="text-xs text-[var(--text-muted)]">
                  Kelola riwayat posisi, perusahaan, tanggung jawab, dan periode pengalaman kerja.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingExperience(null);
                  setIsExperienceFormOpen(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--accent-btn)] hover:bg-[var(--accent-btn-hover)] text-[var(--accent-btn-text)] text-xs font-semibold shadow-md transition-all duration-200 cursor-pointer"
              >
                <Plus size={16} />
                Tambah Pengalaman Baru
              </button>
            </div>

            {experiences.length === 0 ? (
              <div className="py-16 text-center rounded-2xl border border-dashed border-[var(--border-color)] p-8">
                <Briefcase className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-3 opacity-40" />
                <p className="text-sm font-semibold text-[var(--text-primary)]">Belum Ada Pengalaman Kerja</p>
                <p className="text-xs text-[var(--text-muted)] mt-1 mb-4">
                  Klik tombol "Tambah Pengalaman Baru" untuk memasukkan riwayat pengalaman kerja Anda.
                </p>
                <button
                  onClick={() => {
                    setEditingExperience(null);
                    setIsExperienceFormOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--accent-btn)] text-[var(--accent-btn-text)] text-xs font-semibold shadow-sm"
                >
                  <Plus size={14} /> Tambah Pengalaman
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:border-[var(--text-secondary)] transition-all duration-200 shadow-sm"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold font-display text-[var(--text-primary)]">
                          {exp.title}
                        </h3>
                        <span className="text-xs font-medium text-[var(--text-secondary)]">
                          @ {exp.company}
                        </span>
                        {exp.is_present && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                            Present / Masih Bekerja
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--text-muted)]">
                        <span className="font-semibold text-sky-500">{exp.period}</span>
                        {exp.location && <span>• {exp.location}</span>}
                      </div>

                      {/* Responsibilities list */}
                      {Array.isArray(exp.responsibilities) && exp.responsibilities.length > 0 && (
                        <ul className="space-y-1 pt-2">
                          {exp.responsibilities.map((resp, idx) => (
                            <li key={idx} className="text-xs text-[var(--text-secondary)] flex items-start gap-2">
                              <span className="text-sky-500 mt-0.5">•</span>
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Tech stack */}
                      {Array.isArray(exp.tech) && exp.tech.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {exp.tech.map((t, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-start pt-2 sm:pt-0">
                      <button
                        onClick={() => {
                          setEditingExperience(exp);
                          setIsExperienceFormOpen(true);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--border-color)] text-[var(--text-primary)] text-xs font-semibold transition-colors duration-200 cursor-pointer"
                      >
                        <Edit size={13} /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteExperience(exp)}
                        className="p-1.5 rounded-lg hover:bg-rose-500/10 text-rose-500 transition-colors duration-200 cursor-pointer"
                        title="Hapus Pengalaman"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* FORM MODALS */}
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

      {isExperienceFormOpen && (
        <ExperienceForm
          experience={editingExperience}
          onSave={handleSaveExperience}
          onClose={() => {
            setIsExperienceFormOpen(false);
            setEditingExperience(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
