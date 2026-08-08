import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const INITIAL_SKILLS = [
  { name: 'React', logo: '/icon/react.png', category: 'Frontend' },
  { name: 'Next.js', logo: '/icon/react.png', category: 'Framework' },
  { name: 'JavaScript', logo: '/icon/js.png', category: 'Language' },
  { name: 'PHP', logo: '/icon/php.png', category: 'Backend' },
  { name: 'Bootstrap', logo: '/icon/icb.png', category: 'UI' },
  { name: 'Tailwind CSS', logo: '/icon/tailwind.png', category: 'UI' },
  { name: 'HTML5', logo: '/icon/html-5.png', category: 'Markup' },
  { name: 'CSS3', logo: '/icon/css.png', category: 'Styling' },
  { name: 'MySQL', logo: '/icon/mysql.png', category: 'Database' },
  { name: 'GitHub', logo: '/icon/github.png', category: 'DevOps' },
  { name: 'Vercel', logo: '/icon/vercel.png', category: 'Deployment' },
  { name: 'VS Code', logo: '/icon/vsc.png', category: 'Tools' },
  { name: 'Postman', logo: '/icon/postman.png', category: 'Testing' },
  { name: 'Figma', logo: '/icon/figma.png', category: 'Design' },
];

const About = () => {
  const [skillsList, setSkillsList] = useState(INITIAL_SKILLS);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const savedSkills = localStorage.getItem('portfolio_crud_skills');

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('skills').select('*');
        if (!error && data && data.length > 0) {
          setSkillsList(
            data.map((item) => ({
              name: item.name,
              logo: item.logo_url || item.logo,
              category: item.category || 'Skills',
            }))
          );
          return;
        }
      } catch (err) {
        console.error('Supabase skills fetch error:', err);
      }
    }

    if (savedSkills) {
      const parsed = JSON.parse(savedSkills);
      setSkillsList(
        parsed.map((item) => ({
          name: item.name,
          logo: item.logo_url || item.logo,
          category: item.category || 'Skills',
        }))
      );
    }
  };

  // Divide skills into 2 rows for opposite scrolling marquee
  const halfLength = Math.ceil(skillsList.length / 2);
  const row1 = skillsList.slice(0, halfLength);
  const row2 = skillsList.slice(halfLength);

  // Duplicate rows for seamless infinite marquee effect
  const marqueeRow1 = [...row1, ...row1, ...row1, ...row1];
  const marqueeRow2 = [...row2, ...row2, ...row2, ...row2];

  return (
    <section id="about" className="py-24 relative border-t border-[var(--border-color)] overflow-hidden">
      {/* Judul & Deskripsi Sesuai Gambar Referensi */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 px-4">
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-[var(--text-primary)] tracking-tight">
          Technical <span className="text-blue-500">Skills</span>.
        </h2>
        <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-medium">
          A breakdown of my software engineering capabilities and technologies I use daily.
        </p>
      </div>

      {/* Marquee Interaktif Bergerak (Sesuai Referensi Gambar) */}
      <div className="relative max-w-7xl mx-auto marquee-container py-4">
        {/* Gradient Blur Fade Mask di Kiri dan Kanan */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-36 bg-gradient-to-r from-[var(--bg-primary)] via-[var(--bg-primary)]/80 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-36 bg-gradient-to-l from-[var(--bg-primary)] via-[var(--bg-primary)]/80 to-transparent z-20" />

        <div className="space-y-6 overflow-hidden">
          {/* Row 1: Bergerak ke Kiri */}
          <div className="animate-marquee flex gap-4 sm:gap-6 items-center">
            {marqueeRow1.map((skill, idx) => (
              <div
                key={`r1_${idx}`}
                className="flex-shrink-0 flex items-center gap-3.5 px-6 py-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] shadow-sm hover:border-[var(--border-color-hover)] hover:scale-105 transition-all duration-300 cursor-pointer select-none group"
              >
                <img
                  src={skill.logo}
                  alt={skill.name}
                  className="w-7 h-7 sm:w-8 sm:h-8 object-contain transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/icon/react.png';
                  }}
                />
                <span className="font-bold text-sm sm:text-base tracking-tight font-sans">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>

          {/* Row 2: Bergerak ke Kanan (Reverse) */}
          <div className="animate-marquee-reverse flex gap-4 sm:gap-6 items-center">
            {marqueeRow2.map((skill, idx) => (
              <div
                key={`r2_${idx}`}
                className="flex-shrink-0 flex items-center gap-3.5 px-6 py-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] shadow-sm hover:border-[var(--border-color-hover)] hover:scale-105 transition-all duration-300 cursor-pointer select-none group"
              >
                <img
                  src={skill.logo}
                  alt={skill.name}
                  className="w-7 h-7 sm:w-8 sm:h-8 object-contain transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/icon/react.png';
                  }}
                />
                <span className="font-bold text-sm sm:text-base tracking-tight font-sans">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
