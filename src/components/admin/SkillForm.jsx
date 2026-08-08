import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

const SkillForm = ({ skill, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    logo_url: '',
    category: 'Skills',
  });

  useEffect(() => {
    if (skill) {
      setFormData({
        name: skill.name || '',
        logo_url: skill.logo_url || skill.logo || '',
        category: skill.category || 'Skills',
      });
    }
  }, [skill]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: skill ? skill.id : undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />

      <div
        className="relative w-full max-w-md rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] p-6 sm:p-8 shadow-2xl z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)] mb-6">
          <h3 className="text-xl font-bold font-display text-[var(--text-primary)]">
            {skill ? 'Edit Skill / Tool' : 'Tambah Skill Baru'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
              Nama Skill / Tool *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Contoh: ReactJS, Figma, Tailwind"
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
              className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] transition-colors duration-200"
            >
              <option value="Skills">Skills</option>
              <option value="Tools">Tools</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
              Logo URL / Path Gambar *
            </label>
            <input
              type="text"
              name="logo_url"
              required
              value={formData.logo_url}
              onChange={handleChange}
              placeholder="/icon/react.png atau https://..."
              className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] transition-colors duration-200"
            />
          </div>

          {formData.logo_url && (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
              <span className="text-xs text-[var(--text-muted)]">Preview:</span>
              <img
                src={formData.logo_url}
                alt="Preview"
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/icon/react.png';
                }}
              />
              <span className="text-sm font-semibold text-[var(--text-primary)]">
                {formData.name || 'Skill'}
              </span>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--border-color)]">
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
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SkillForm;
