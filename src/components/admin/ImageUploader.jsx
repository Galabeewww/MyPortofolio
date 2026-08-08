import React, { useState } from 'react';
import { Upload, X, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../lib/supabaseClient';

const ImageUploader = ({ images = [], onChange }) => {
  const [uploading, setUploading] = useState(false);

  // images format: Array of { id, url, is_cover, file? }

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    const newImages = [...images];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      let imageUrl = '';

      if (isSupabaseConfigured) {
        try {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
          const filePath = `projects/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('portfolio-images')
            .upload(filePath, file);

          if (uploadError) {
            console.error('Storage upload error:', uploadError.message);
            // Fallback to base64 if storage fails
            imageUrl = await readFileAsDataURL(file);
          } else {
            const { data } = supabase.storage
              .from('portfolio-images')
              .getPublicUrl(filePath);
            imageUrl = data.publicUrl;
          }
        } catch (err) {
          console.error(err);
          imageUrl = await readFileAsDataURL(file);
        }
      } else {
        // Local preview fallback using Data URL
        imageUrl = await readFileAsDataURL(file);
      }

      const isFirst = newImages.length === 0 && i === 0;
      newImages.push({
        id: `img_${Date.now()}_${i}`,
        url: imageUrl,
        is_cover: isFirst || false,
      });
    }

    // Ensure at least one image is set as cover if available
    if (newImages.length > 0 && !newImages.some((img) => img.is_cover)) {
      newImages[0].is_cover = true;
    }

    onChange(newImages);
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

  const setCoverImage = (targetId) => {
    const updated = images.map((img) => ({
      ...img,
      is_cover: img.id === targetId,
    }));
    onChange(updated);
  };

  const removeImage = (targetId) => {
    let updated = images.filter((img) => img.id !== targetId);
    if (updated.length > 0 && !updated.some((img) => img.is_cover)) {
      updated[0].is_cover = true;
    }
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
          Gambar Proyek (Upload Beberapa & Pilih Cover Utama)
        </label>
        <span className="text-xs text-[var(--text-muted)]">
          {images.length} gambar dipilih
        </span>
      </div>

      {/* Upload Dropzone */}
      <label className="relative flex flex-col items-center justify-center p-6 border-2 border-dashed border-[var(--border-color)] hover:border-[var(--text-secondary)] rounded-xl cursor-pointer bg-[var(--bg-secondary)] transition-colors duration-200">
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <Upload className="w-8 h-8 text-[var(--text-muted)] mb-1" />
          <p className="text-sm font-medium text-[var(--text-primary)]">
            {uploading ? 'Mengunggah gambar...' : 'Klik untuk upload beberapa gambar sekaligus'}
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            Format: PNG, JPG, JPEG, WEBP (Bisa memilih beberapa file)
          </p>
        </div>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          disabled={uploading}
          className="hidden"
        />
      </label>

      {/* Image Previews Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
          {images.map((img) => (
            <div
              key={img.id}
              className={`relative rounded-xl overflow-hidden group border-2 transition-all duration-200 bg-[var(--bg-secondary)] ${
                img.is_cover
                  ? 'border-[var(--text-primary)] ring-2 ring-offset-2 ring-black dark:ring-white'
                  : 'border-[var(--border-color)] hover:border-[var(--border-color-hover)]'
              }`}
            >
              <img
                src={img.url}
                alt="Preview"
                className="w-full h-28 object-cover"
              />

              {/* Cover Badge */}
              {img.is_cover ? (
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-[var(--accent-btn)] text-[var(--accent-btn-text)] shadow-md flex items-center gap-1">
                  <CheckCircle size={10} /> Cover Utama
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => setCoverImage(img.id)}
                  className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-black/70 hover:bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  Set Jadi Cover
                </button>
              )}

              {/* Delete Button */}
              <button
                type="button"
                onClick={() => removeImage(img.id)}
                className="absolute top-2 right-2 p-1 rounded-full bg-black/70 hover:bg-rose-600 text-white transition-colors duration-200"
                title="Hapus gambar"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
