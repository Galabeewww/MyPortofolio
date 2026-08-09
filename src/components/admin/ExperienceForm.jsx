import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2 } from 'lucide-react';

const ExperienceForm = ({ experience, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    period: '',
    is_present: false,
    responsibilities: [''],
    tech: '',
  });

  useEffect(() => {
    if (experience) {
      const resp = Array.isArray(experience.responsibilities)
        ? experience.responsibilities
        : typeof experience.responsibilities === 'string'
        ? experience.responsibilities.split('\n').filter(Boolean)
        : [''];

      setFormData({
        title: experience.title || '',
        company: experience.company || '',
        location: experience.location || '',
        period: experience.period || '',
        is_present: Boolean(experience.is_present),
        responsibilities: resp.length > 0 ? resp : [''],
        tech: Array.isArray(experience.tech) ? experience.tech.join(', ') : experience.tech || '',
      });
    }
  }, [experience]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRespChange = (index, value) => {
    const updated = [...formData.responsibilities];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, responsibilities: updated }));
  };

  const addRespInput = () => {
    setFormData((prev) => ({ ...prev, responsibilities: [...prev.responsibilities, ''] }));
  };

  const removeRespInput = (index) => {
    const updated = formData.responsibilities.filter((_, idx) => idx !== index);
    setFormData((prev) => ({
      ...prev,
      responsibilities: updated.length ? updated : [''],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const techArray = formData.tech
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const respArray = formData.responsibilities
      .map((r) => r.trim())
      .filter((r) => r.length > 0);

    const payload = {
      ...formData,
      id: experience ? experience.id : undefined,
      responsibilities: respArray,
      tech: techArray,
      created_at: experience?.created_at || new Date().toISOString(),
    };

    onSave(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />

      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] p-6 sm:p-8 shadow-2xl z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)] mb-6">
          <h3 className="text-xl font-bold font-display text-[var(--text-primary)]">
            {experience ? 'Edit Pengalaman Kerja' : 'Tambah Pengalaman Kerja'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          {/* Posisi / Job Title & Perusahaan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                Posisi / Job Title *
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="Contoh: Fullstack Developer"
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] transition-colors duration-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                Nama Perusahaan / Institusi *
              </label>
              <input
                type="text"
                name="company"
                required
                value={formData.company}
                onChange={handleChange}
                placeholder="Contoh: MTs At-Tarbiyah Lebak"
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] transition-colors duration-200"
              />
            </div>
          </div>

          {/* Lokasi & Periode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                Lokasi / Tipe
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Contoh: Remote / Rangkasbitung"
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] transition-colors duration-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                Periode *
              </label>
              <input
                type="text"
                name="period"
                required
                value={formData.period}
                onChange={handleChange}
                placeholder="Contoh: Apr 2025 – Present"
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] transition-colors duration-200"
              />
            </div>
          </div>

          {/* Checkbox Present */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="is_present"
              name="is_present"
              checked={formData.is_present}
              onChange={handleChange}
              className="w-4 h-4 accent-sky-500 rounded cursor-pointer"
            />
            <label htmlFor="is_present" className="text-xs font-semibold text-[var(--text-primary)] cursor-pointer">
              Posisi Sekarang / Aktif (Tampilkan badge PRESENT)
            </label>
          </div>

          {/* Tanggung Jawab / Pencapaian */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                Tanggung Jawab & Pencapaian (Setiap baris menjadi 1 poin dengan centang)
              </label>
              <button
                type="button"
                onClick={addRespInput}
                className="inline-flex items-center gap-1 text-xs font-semibold text-sky-500 hover:underline"
              >
                <Plus size={14} /> Tambah Poin
              </button>
            </div>
            <div className="space-y-2">
              {formData.responsibilities.map((resp, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={resp}
                    onChange={(e) => handleRespChange(idx, e.target.value)}
                    placeholder={`Poin #${idx + 1}...`}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--text-primary)] transition-colors duration-200"
                  />
                  {formData.responsibilities.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRespInput(idx)}
                      className="p-2 rounded-lg hover:bg-rose-500/10 text-rose-500 transition-colors duration-200"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
              Teknologi / Tech Stack (pisahkan dengan koma)
            </label>
            <input
              type="text"
              name="tech"
              value={formData.tech}
              onChange={handleChange}
              placeholder="React, TypeScript, Node.js, NGINX, Tailwind CSS"
              className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] transition-colors duration-200"
            />
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
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-sm font-extrabold shadow-md transition-all duration-200 cursor-pointer"
            >
              <Save size={16} />
              Simpan Pengalaman
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExperienceForm;
