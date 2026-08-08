import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2 } from 'lucide-react';
import ImageUploader from './ImageUploader';

const ProjectForm = ({ project, categories = [], onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    full_description: '',
    category: 'WEB',
    created_at: new Date().toISOString().substring(0, 7), // YYYY-MM
    tech: '',
    features: [''],
    live_link: '',
    github_link: '',
    images: [],
  });

  const defaultCategories = categories.length > 0 ? categories : [
    { id: 'c1', name: 'WEB' },
    { id: 'c2', name: 'MOBILE' },
    { id: 'c3', name: 'WEB DESIGN' },
    { id: 'c4', name: 'UI/UX' },
  ];

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        full_description: project.full_description || project.description || '',
        category: project.category || 'WEB',
        created_at: project.created_at
          ? new Date(project.created_at).toISOString().substring(0, 7)
          : new Date().toISOString().substring(0, 7),
        tech: Array.isArray(project.tech) ? project.tech.join(', ') : project.tech || '',
        features: Array.isArray(project.features) && project.features.length > 0 ? project.features : [''],
        live_link: project.live_link || project.liveLink || '',
        github_link: project.github_link || project.githubLink || '',
        images: project.images || (project.image ? [{ id: '1', url: project.image, is_cover: true }] : []),
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (index, value) => {
    const updated = [...formData.features];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, features: updated }));
  };

  const addFeatureInput = () => {
    setFormData((prev) => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeatureInput = (index) => {
    const updated = formData.features.filter((_, idx) => idx !== index);
    setFormData((prev) => ({ ...prev, features: updated.length ? updated : [''] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Process tech string into array
    const techArray = formData.tech
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    // Filter empty features
    const featuresArray = formData.features
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    // Get cover image
    const coverImageObj = formData.images.find((img) => img.is_cover) || formData.images[0];
    const cover_image = coverImageObj ? coverImageObj.url : '';

    const payload = {
      ...formData,
      id: project ? project.id : undefined,
      tech: techArray,
      features: featuresArray,
      cover_image: cover_image,
      image: cover_image,
      images: formData.images,
      created_at: formData.created_at ? `${formData.created_at}-01T00:00:00Z` : new Date().toISOString(),
    };

    onSave(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />

      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] p-6 sm:p-8 shadow-2xl z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)] mb-6">
          <h3 className="text-xl font-bold font-display text-[var(--text-primary)]">
            {project ? 'Edit Proyek' : 'Tambah Proyek Baru'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Judul, Kategori & Tanggal Pembuatan */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                Judul Proyek *
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="Contoh: Coreculture E-Commerce"
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] transition-colors duration-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                Kategori
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] transition-colors duration-200 uppercase font-bold"
              >
                {defaultCategories.map((cat) => (
                  <option key={cat.id || cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                Created At (Bulan & Tahun) *
              </label>
              <input
                type="month"
                name="created_at"
                required
                value={formData.created_at}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] transition-colors duration-200"
              />
            </div>
          </div>

          {/* Deskripsi Singkat */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
              Deskripsi Singkat (Tampil di Kartu & Sisi Kanan Pop-up Modal) *
            </label>
            <textarea
              name="description"
              required
              rows={2}
              value={formData.description}
              onChange={handleChange}
              placeholder="Ringkasan singkat proyek..."
              className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] transition-colors duration-200"
            />
          </div>

          {/* Deskripsi Lengkap (Full Description) */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
              Deskripsi Lengkap (Tampil di Kiri Bawah Gambar Pop-up Modal)
            </label>
            <textarea
              name="full_description"
              rows={4}
              value={formData.full_description}
              onChange={handleChange}
              placeholder="Penjelasan mendalam proyek yang akan tampil di bagian Description di bawah gambar pop-up..."
              className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] transition-colors duration-200"
            />
          </div>

          {/* Multi Image Upload */}
          <ImageUploader
            images={formData.images}
            onChange={(updatedImages) =>
              setFormData((prev) => ({ ...prev, images: updatedImages }))
            }
          />

          {/* Teknologi */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
              Teknologi / Tags (pisahkan dengan koma)
            </label>
            <input
              type="text"
              name="tech"
              value={formData.tech}
              onChange={handleChange}
              placeholder="React, Next.js, Tailwind, Supabase, PostgreSQL"
              className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] transition-colors duration-200"
            />
          </div>

          {/* Fitur Utama */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                Fitur Utama (Akan tampil di pop-up modal)
              </label>
              <button
                type="button"
                onClick={addFeatureInput}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--text-primary)] hover:underline"
              >
                <Plus size={14} /> Tambah Fitur
              </button>
            </div>
            <div className="space-y-2">
              {formData.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(idx, e.target.value)}
                    placeholder={`Fitur #${idx + 1}`}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--text-primary)] transition-colors duration-200"
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeatureInput(idx)}
                      className="p-2 rounded-lg hover:bg-rose-500/10 text-rose-500 transition-colors duration-200"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                Live Demo URL (Kosongkan jika tidak ada)
              </label>
              <input
                type="text"
                name="live_link"
                value={formData.live_link}
                onChange={handleChange}
                placeholder="https://myproject.vercel.app"
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] transition-colors duration-200"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                GitHub Repository URL (Kosongkan jika tidak ada)
              </label>
              <input
                type="text"
                name="github_link"
                value={formData.github_link}
                onChange={handleChange}
                placeholder="https://github.com/user/repo"
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] transition-colors duration-200"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-[var(--border-color)]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-[var(--border-color)] hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm font-semibold transition-colors duration-200"
            >
              Batal
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[var(--accent-btn)] hover:bg-[var(--accent-btn-hover)] text-[var(--accent-btn-text)] text-sm font-semibold shadow-md transition-all duration-200"
            >
              <Save size={16} />
              Simpan Proyek
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
