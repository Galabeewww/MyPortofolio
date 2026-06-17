import React from "react";
import { Terminal, Cpu } from "lucide-react";

const About = () => {
  const skills = [
    {
      category: "Skills",
      icon: "/src/assets/icon/skill.png", // ganti dengan logo frontend
      items: [
        { name: "React", logo: "/src/assets/icon/react.png" },
        { name: "Tailwind", logo: "/src/assets/icon/tailwind.png" },
        { name: "JavaScript", logo: "/src/assets/icon/js.png" },
        { name: "HTML5", logo: "/src/assets/icon/html.png" },
        { name: "CSS3", logo: "/src/assets/icon/css.png" },
      ],
    },
    {
      category: "Tools",
      icon: "/src/assets/icon/tool.png", // ganti dengan logo tools/devops
      items: [
        { name: "GitHub", logo: "/src/assets/icon/github.png" },
        { name: "Vercel", logo: "/src/assets/icon/vercel.png" },
        { name: "VS Code", logo: "/src/assets/icon/vsc.png" },
      ],
    },
  ];

  return (
    <section id="about" className="py-24 relative border-t border-white/5">
      {/* Judul Bagian */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
          Tentang{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Saya
          </span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Saya orang yang sangat senang mempelajari teknologi baru dan
          bereksperimen dengan teknologi yang sedang berkembang pada saat ini.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Cerita Singkat */}
        <div className="lg:col-span-5 text-left space-y-6">
          {/* Latar Belakang */}
          <div className="glass-panel p-8 rounded-2xl border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-indigo-500 to-purple-500"></div>
            <div className="flex items-center gap-3 mb-4 text-white font-bold text-lg">
              <Terminal size={20} className="text-indigo-400" />
              <span>Latar Belakang</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Saya adalah lulusan Teknik Informatika Universitas Komputer
              Indonesia (UNIKOM) dengan minat besar di bidang Web Development
              dan Quality Assurance (QA).
            </p>
          </div>

          {/* Tujuan Karir */}
          <div className="glass-panel p-8 rounded-2xl border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-purple-500 to-cyan-500"></div>
            <div className="flex items-center gap-3 mb-4 text-white font-bold text-lg">
              <Cpu size={20} className="text-purple-400" />
              <span>Tujuan Karir</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Fokus saya adalah mengasah kemampuan Frontend, belajar Backend
              (Node.js/Express) untuk menjadi Full-Stack Developer, serta
              memperdalam minat di bidang Quality Assurance (QA).
            </p>
          </div>
        </div>

        {/* Skills dengan Logo */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
          {skills.map((skillGroup, index) => (
            <div
              key={index}
              className="glow-card rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <img
                    src={skillGroup.icon}
                    alt={skillGroup.category}
                    className="w-8 h-8"
                  />
                  <h3 className="font-bold text-white text-base sm:text-lg font-display">
                    {skillGroup.category}
                  </h3>
                </div>
                <br />
                <div className="flex flex-wrap gap-4">
                  {skillGroup.items.map((skill, sIdx) => (
                    <img
                      key={sIdx}
                      src={skill.logo}
                      alt={skill.name}
                      className="w-10 h-10"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
