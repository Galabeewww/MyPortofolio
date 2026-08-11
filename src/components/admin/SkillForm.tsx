import React, { useState, useEffect } from 'react';
import { X, Save, Upload, Loader2 } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../lib/supabaseClient';

const SkillForm = ({ skill, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    logo_url: '',
    category: 'Skills',
  });
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    let imageUrl = '';

    if (isSupabaseConfigured) {
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `skills/${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('portfolio-images')
          .upload(fileName, file);

        if (uploadError) {
          console.error(uploadError);
          imageUrl = await readFileAsDataURL(file);
        } else {
          const { data } = supabase.storage
            .from('portfolio-images')
            .getPublicUrl(fileName);
          imageUrl = data.publicUrl;
        }
      } catch (err) {
        console.error(err);
        imageUrl = await readFileAsDataURL(file);
      }
    } else {
      imageUrl = await readFileAsDataURL(file);
    }

    setFormData((prev) => ({ ...prev, logo_url: imageUrl }));
    setUploading(false);
    e.target.value = '';
  };

  const readFileAsDataURL = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSave({
        ...formData,
        id: skill ? skill.id : undefined,
      });
    } finally {
      setIsSubmitting(false);
    }
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
            disabled={isSubmitting}
            className="p-2 rounded-full hover:bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200 cursor-pointer disabled:opacity-50"
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
              disabled={isSubmitting}
              value={formData.name}
              onChange={handleChange}
              placeholder="Contoh: ReactJS, Figma, Tailwind"
              className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] transition-colors duration-200 disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
              Kategori
            </label>
            <select
              name="category"
              disabled={isSubmitting}
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] transition-colors duration-200 disabled:opacity-50"
            >
              <option value="Skills">Skills</option>
              <option value="Tools">Tools</option>
            </select>
          </div>

          {/* Upload Logo Gambar Input (File Upload + URL Input) */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
              Upload Logo Gambar *
            </label>

            <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-[var(--border-color)] hover:border-[var(--text-secondary)] rounded-xl cursor-pointer bg-[var(--bg-secondary)] transition-colors duration-200 mb-3">
              <Upload className="w-6 h-6 text-[var(--text-muted)] mb-1" />
              <span className="text-xs font-semibold text-[var(--text-primary)]">
                {uploading ? 'Mengunggah logo...' : 'Klik untuk pilih file gambar logo'}
              </span>
              <span className="text-[10px] text-[var(--text-muted)]">PNG, SVG, JPG, WEBP</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading || isSubmitting}
                className="hidden"
              />
            </label>

            <span className="block text-[11px] text-[var(--text-muted)] mb-1">
              Atau masukkan Path / URL Gambar:
            </span>
            <input
              type="text"
              name="logo_url"
              required
              disabled={isSubmitting}
              value={formData.logo_url}
              onChange={handleChange}
              placeholder="/icon/react.png atau https://..."
              className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--text-primary)] transition-colors duration-200 disabled:opacity-50"
            />
          </div>

          {/* Thumbnail Preview */}
          {formData.logo_url && (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
              <span className="text-xs text-[var(--text-muted)]">Preview:</span>
              <img
                src={formData.logo_url}
                alt="Preview"
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).onerror = null;
                  (e.target as HTMLImageElement).src = '/icon/react.png';
                }}
              />
              <span className="text-sm font-semibold text-[var(--text-primary)]">
                {formData.name || 'Logo Skill'}
              </span>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--border-color)]">
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
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[var(--accent-btn)] hover:bg-[var(--accent-btn-hover)] text-[var(--accent-btn-text)] text-sm font-semibold shadow-md transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>Simpan</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SkillForm;
