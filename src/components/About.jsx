import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const INITIAL_SKILLS = [
  { name: 'React', logo: '/icon/react.png', category: 'Skills' },
  { name: 'JavaScript', logo: '/icon/js.png', category: 'Skills' },
  { name: 'Php', logo: '/icon/php.png', category: 'Skills' },
  { name: 'Bootstrap', logo: '/icon/icb.png', category: 'Skills' },
  { name: 'Tailwind', logo: '/icon/tailwind.png', category: 'Skills' },
  { name: 'HTML5', logo: '/icon/html-5.png', category: 'Skills' },
  { name: 'CSS3', logo: '/icon/css.png', category: 'Skills' },
  { name: 'MySQL', logo: '/icon/mysql.png', category: 'Skills' },
  { name: 'GitHub', logo: '/icon/github.png', category: 'Tools' },
  { name: 'Vercel', logo: '/icon/vercel.png', category: 'Tools' },
  { name: 'VS Code', logo: '/icon/vsc.png', category: 'Tools' },
  { name: 'Postman', logo: '/icon/postman.png', category: 'Tools' },
  { name: 'Figma', logo: '/icon/figma.png', category: 'Tools' },
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

  return (
    <section id="about" className="py-24 relative border-t border-[var(--border-color)]">
      {/* Judul Bagian */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h2 className="text-3xl sm:text-4xl font-bold font-display text-[var(--text-primary)]">
          Tentang <span className="underline underline-offset-8 decoration-1">Saya</span>
        </h2>
        <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed">
          Halooo, Saya Abi, Junior Web Developer pemula yang suka eksplorasi untuk menciptakan website modern.
          Selain itu, saya juga tertarik dengan Quality Assurance (QA) untuk memastikan aplikasi yang saya kembangkan memiliki kualitas dan keandalan yang tinggi.
        </p>
      </div>

      {/* Skills & Tools - Berjajar di Tengah */}
      <div className="max-w-3xl mx-auto text-center space-y-10">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--text-muted)] mb-6">
            Skills & Tools
          </h3>

          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 sm:gap-6 justify-center">
            {skillsList.map((skill, sIdx) => (
              <div
                key={sIdx}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="p-3.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] group-hover:border-[var(--border-color-hover)] transition-all duration-300 shadow-sm group-hover:-translate-y-1">
                  <img
                    src={skill.logo}
                    alt={skill.name}
                    title={skill.name}
                    className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/icon/react.png';
                    }}
                  />
                </div>
                <span className="text-xs text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] font-semibold transition-colors duration-200">
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
