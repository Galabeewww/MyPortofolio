import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2, Calendar, Loader2 } from 'lucide-react';

const formatMonthYear = (yyyyMM) => {
  if (!yyyyMM) return '';
  try {
    const [year, month] = yyyyMM.split('-');
    if (!year || !month) return yyyyMM;
    const date = new Date(parseInt(year, 10), parseInt(month, 10) - 1, 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  } catch {
    return yyyyMM;
  }
};

const ExperienceForm = ({ experience, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    start_date: '',
    end_date: '',
    is_present: false,
    responsibilities: [''],
    tech: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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
        start_date: experience.start_date || '',
        end_date: experience.end_date || '',
        is_present: Boolean(experience.is_present),
        responsibilities: resp.length > 0 ? resp : [''],
        tech: Array.isArray(experience.tech) ? experience.tech.join(', ') : experience.tech || '',
      });
    }
  }, [experience]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'is_present' && checked) {
      setFormData((prev) => ({
        ...prev,
        is_present: true,
        end_date: '',
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const techArray = formData.tech
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const respArray = formData.responsibilities
        .map((r) => r.trim())
        .filter((r) => r.length > 0);

      const startText = formatMonthYear(formData.start_date) || '2025';
      let endText = 'Present';

      if (formData.is_present) {
        endText = 'Present';
      } else if (formData.end_date) {
        endText = formatMonthYear(formData.end_date);
      } else {
        endText = 'Present';
      }

      const formattedPeriod = `${startText} – ${endText}`;

      const payload = {
        ...formData,
        period: formattedPeriod,
        id: experience ? experience.id : undefined,
        responsibilities: respArray,
        tech: techArray,
        created_at: experience?.created_at || new Date().toISOString(),
      };

      await onSave(payload);
    } finally {
      setIsSubmitting(false);
    }
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
            disabled={isSubmitting}
            className="p-2 rounded-full hover:bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200 disabled:opacity-50"
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
                disabled={isSubmitting}
                value={formData.title}
                onChange={handleChange}
                placeholder="Contoh: Fullstack Developer"
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] transition-colors duration-200 disabled:opacity-50"
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
                disabled={isSubmitting}
                value={formData.company}
                onChange={handleChange}
                placeholder="Contoh: MTs At-Tarbiyah Lebak"
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] transition-colors duration-200 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Lokasi */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
              Lokasi / Tipe Kerja
            </label>
            <input
              type="text"
              name="location"
              disabled={isSubmitting}
              value={formData.location}
              onChange={handleChange}
              placeholder="Contoh: Remote / Rangkasbitung"
              className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] transition-colors duration-200 disabled:opacity-50"
            />
          </div>

          {/* Format Tanggal Periode: Mulai & Selesai */}
          <div className="space-y-3 p-4 rounded-2xl bg-[var(--bg-secondary)]/50 border border-[var(--border-color)]">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-2">
              <Calendar size={14} className="text-sky-500" />
              <span>Periode Pengalaman Kerja</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-[var(--text-secondary)] mb-1">
                  Tanggal Mulai *
                </label>
                <input
                  type="month"
                  name="start_date"
                  required
                  disabled={isSubmitting}
                  value={formData.start_date}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-sky-500 transition-colors duration-200 text-sm disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[var(--text-secondary)] mb-1">
                  Tanggal Selesai
                </label>
                <input
                  type="month"
                  name="end_date"
                  disabled={formData.is_present || isSubmitting}
                  value={formData.end_date}
                  onChange={handleChange}
                  placeholder="Kosongkan jika masih bekerja"
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-sky-500 transition-colors duration-200 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Checkbox Masih Bekerja (Present) */}
            <div className="flex items-center gap-3 pt-1">
              <input
                type="checkbox"
                id="is_present"
                name="is_present"
                disabled={isSubmitting}
                checked={formData.is_present}
                onChange={handleChange}
                className="w-4 h-4 accent-sky-500 rounded cursor-pointer disabled:opacity-50"
              />
              <label htmlFor="is_present" className="text-xs font-bold text-sky-500 cursor-pointer select-none">
                Masih Bekerja Di Sini (Belum Selesai / Status Present)
              </label>
            </div>
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
                disabled={isSubmitting}
                className="inline-flex items-center gap-1 text-xs font-semibold text-sky-500 hover:underline disabled:opacity-50"
              >
                <Plus size={14} /> Tambah Poin
              </button>
            </div>
            <div className="space-y-2">
              {formData.responsibilities.map((resp, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    disabled={isSubmitting}
                    value={resp}
                    onChange={(e) => handleRespChange(idx, e.target.value)}
                    placeholder={`Poin #${idx + 1}...`}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--text-primary)] transition-colors duration-200 disabled:opacity-50"
                  />
                  {formData.responsibilities.length > 1 && (
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => removeRespInput(idx)}
                      className="p-2 rounded-lg hover:bg-rose-500/10 text-rose-500 transition-colors duration-200 disabled:opacity-50"
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
              disabled={isSubmitting}
              value={formData.tech}
              onChange={handleChange}
              placeholder="React, TypeScript, Node.js, NGINX, Tailwind CSS"
              className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] transition-colors duration-200 disabled:opacity-50"
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-[var(--border-color)]">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl border border-[var(--border-color)] hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm font-semibold transition-colors duration-200 cursor-pointer disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-sm font-extrabold shadow-md transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>Simpan Pengalaman</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExperienceForm;
