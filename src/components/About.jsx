import React from "react";

const About = () => {
  const skills = [
    {
      category: "Skills",
      icon: "/icon/skill.png", // ganti dengan logo frontend
      items: [
        { name: "React", logo: "/icon/react.png" },
        { name: "JavaScript", logo: "/icon/js.png" },
        { name: "Php", logo: "/icon/php.png" },
        { name: "Bootstrap", logo: "/icon/icb.png" },
        { name: "Tailwind", logo: "/icon/tailwind.png" },
        { name: "HTML5", logo: "/icon/html.png" },
        { name: "CSS3", logo: "/icon/css.png" },
        { name: "MySQL", logo: "/icon/mysql.png" },
      ],
    },
    {
      category: "Tools",
      icon: "/icon/tool.png", // ganti dengan logo tools/devops
      items: [
        { name: "GitHub", logo: "/icon/github.png" },
        { name: "Vercel", logo: "/icon/vercel.png" },
        { name: "VS Code", logo: "/icon/vsc.png" },
        { name: "Postman", logo: "/icon/postman.png" },
        { name: "Figma", logo: "/icon/figma.png" },
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
          Halooo, Saya Abi, Junior Web Developer pemula yang suka explorasi
          untuk menciptakan website . Selain itu, saya juga tertarik dengan
          Quality Assurance (QA) untuk memastikan aplikasi yang saya kembangkan
          memiliki kualitas dan keandalan yang tinggi.
        </p>
        {/* <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Saya orang yang sangat senang mempelajari teknologi baru dan
          bereksperimen dengan teknologi yang sedang berkembang pada saat ini.
        </p> */}
      </div>

      {/* Skills & Tools - Tanpa Card, Semua Ikon Berjajar di Tengah */}
      <div className="max-w-3xl mx-auto text-center space-y-7">
        {skills.map((skillGroup, index) => (
          <div key={index}>
            <h3 className="text-lg font-semibold uppercase tracking-widest text-slate-300 mb-6">
              {skillGroup.category}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-5 justify-center">
              {skillGroup.items.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="p-3 rounded-xl bg-white/5 border border-white/15 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-all duration-300">
                    <img
                      src={skill.logo}
                      alt={skill.name}
                      title={skill.name}
                      className="w-13 h-13 group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-xs text-slate-400 group-hover:text-indigo-300 font-medium transition-colors duration-300">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
