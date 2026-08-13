import React, { createContext, useContext, useState, useEffect } from "react";

const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      contact: "Contact",
      admin: "Admin",
      dashboard: "Dashboard",
      logout: "Logout",
      logoutSuccessTitle: "Logged Out",
      logoutSuccessText: "You have successfully logged out.",
    },
    hero: {
      tagline: "MUHAMMAD ABI RAFDI PRATAMA",
      bio: "I build modern web applications and quality software that deliver exceptional user experiences with precision and speed.",
      viewProjects: "VIEW PROJECTS",
      available: "AVAILABLE FOR WORK",
      socialGithub: "GITHUB",
      socialLinkedin: "LINKEDIN",
      socialEmail: "EMAIL",
      marqueeItems: [
        "WEB DEVELOPER",
        "/",
        "FRONTEND DEV",
        "/",
        "QUALITY ASSURANCE",
        "/",
        "SOFTWARE TESTING",
        "/",
      ],
    },
    about: {
      titlePrefix: "About ",
      titleSuffix: "Me.",
      subtitle:
        "A dedicated Junior Web Developer & Quality Assurance Specialist based in Indonesia.",
      badge: "Web Dev & QA Tester",
      greeting: "Hello, I'm Muhammad Abi Rafdi Pratama",
      para1:
        "I am a passionate Junior Web Developer dedicated to building modern, responsive, and user-friendly web applications. I love exploring technologies like React, Next.js, and Tailwind CSS to create visually appealing interfaces.",
      para2:
        "Beyond web development, I am deeply interested in Quality Assurance (QA) & Software Testing to ensure every software product built is performant, secure, responsive, and bug-free.",
      location: "Bandung, Indonesia",
      role: "Web Dev & QA Tester",
      pillar1Title: "Web Development",
      pillar1Desc:
        "Building modern web interfaces with React, Next.js, and Tailwind CSS.",
      pillar2Title: "Quality Assurance (QA)",
      pillar2Desc:
        "Software testing, bug identification, and test scenario creation.",
      pillar3Title: "Continuous Learning",
      pillar3Desc:
        "Constantly learning and adapting to modern software engineering trends.",
      skillsTitlePrefix: "Technical ",
      skillsTitleSuffix: "Skills.",
      skillsSubtitle:
        "A breakdown of my software engineering capabilities and technologies I use daily.",
      downloadCV: "DOWNLOAD CV",
    },
    experience: {
      titlePrefix: "Work ",
      titleSuffix: "Experience.",
      subtitle:
        "My professional journey and track record in web development & software quality engineering.",
      present: "PRESENT",
      noExperience: "No work experience entries added yet.",
    },
    projects: {
      titlePrefix: "Featured ",
      titleSuffix: "Projects.",
      subtitle:
        "Explore a curated showcase of web applications and quality assurance projects I've built.",
      allCategories: "All Projects",
      share: "Share",
      liveDemo: "Live Demo",
      github: "GitHub",
      noDemoTitle: "Live Demo Unavailable",
      noDemoText: "Live demo is not available for this project.",
      noGithubTitle: "GitHub Unavailable",
      noGithubText: "GitHub repository is not available for this project.",
      copiedTitle: "Link Copied",
      copiedText: "Project link has been copied to clipboard!",
      noProjects: "No projects found in this category.",
      viewAll: "View All Projects",
      showLess: "Show Less",
    },
    contact: {
      titlePrefix: "Get In ",
      titleSuffix: "Touch.",
      subtitle:
        "Have a project in mind or want to collaborate? Feel free to send a message!",
      nameLabel: "Your Name",
      namePlaceholder: "Steve Alakay",
      emailLabel: "Your Email",
      emailPlaceholder: "Steve@example.com",
      messageLabel: "Your Message",
      messagePlaceholder: "Hi Abi, I'd like to talk about...",
      sendBtn: "Send Message",
      sendingBtn: "Sending...",
      successTitle: "Message Sent!",
      successText: "Thank you for reaching out. I will get back to you soon!",
      errorTitle: "Error",
      errorText: "Failed to send message. Please try again later.",
      infoTitle: "Contact Information",
      infoDesc:
        "Feel free to reach out directly through email or social media.",
      emailTitle: "Email Address",
      locationTitle: "Location",
      statusTitle: "Work Status",
      statusText: "Open for Opportunities",
    },
    footer: {
      rights: "All Rights Reserved.",
      tagline: "Designed & Built with passion by Muhammad Abi Rafdi Pratama.",
    },
    sessionExpired: {
      title: "Session Expired",
      text: "You have been automatically logged out due to 3 minutes of inactivity.",
    },
  },
  id: {
    nav: {
      home: "Beranda",
      about: "Tentang",
      skills: "Keahlian",
      experience: "Pengalaman",
      projects: "Proyek",
      contact: "Kontak",
      admin: "Admin",
      dashboard: "Dasbor",
      logout: "Keluar",
      logoutSuccessTitle: "Berhasil Keluar",
      logoutSuccessText: "Anda telah berhasil keluar dari akun admin.",
    },
    hero: {
      tagline: "MUHAMMAD ABI RAFDI PRATAMA",
      bio: "Saya membangun aplikasi web modern dan perangkat lunak berkualitas yang memberikan pengalaman pengguna terbaik dengan presisi dan kecepatan.",
      viewProjects: "LIHAT PROYEK",
      available: "SIAP BEKERJA",
      socialGithub: "GITHUB",
      socialLinkedin: "LINKEDIN",
      socialEmail: "EMAIL",
      marqueeItems: [
        "WEB DEVELOPER",
        "/",
        "FRONTEND DEV",
        "/",
        "QUALITY ASSURANCE",
        "/",
        "SOFTWARE TESTING",
        "/",
      ],
    },
    about: {
      titlePrefix: "Tentang ",
      titleSuffix: "Saya.",
      subtitle:
        "Junior Web Developer & Quality Assurance Specialist yang berdedikasi berbasis di Indonesia.",
      badge: "Web Dev & QA Tester",
      greeting: "Halo, Saya Muhammad Abi Rafdi Pratama",
      para1:
        "Saya seorang Junior Web Developer yang bersemangat dalam menciptakan website modern, responsif, dan mudah digunakan. Saya menyukai eksplorasi teknologi baru seperti React, Next.js, dan Tailwind CSS untuk memberikan antarmuka visual yang memukau.",
      para2:
        "Selain pengembangan web, saya juga sangat tertarik dengan bidang Quality Assurance (QA) & Software Testing untuk memastikan seluruh aplikasi yang dikembangkan memiliki performa tinggi, keamanan teruji, dan bebas dari kendala.",
      location: "Indonesia",
      role: "Web Dev & QA Tester",
      pillar1Title: "Web Development",
      pillar1Desc:
        "Membangun antarmuka web modern dengan React, Next.js, dan Tailwind CSS.",
      pillar2Title: "Quality Assurance (QA)",
      pillar2Desc:
        "Pengujian aplikasi, identifikasi bug, dan skenario pengujian kualitas software.",
      pillar3Title: "Continuous Learning",
      pillar3Desc:
        "Selalu belajar dan beradaptasi dengan tren serta arsitektur teknologi terbaru.",
      skillsTitlePrefix: "Keahlian ",
      skillsTitleSuffix: "Teknis.",
      skillsSubtitle:
        "Ringkasan keahlian rekayasa perangkat lunak dan teknologi yang saya gunakan sehari-hari.",
      downloadCV: "UNDUH CV",
    },
    experience: {
      titlePrefix: "Pengalaman ",
      titleSuffix: "Kerja.",
      subtitle:
        "Perjalanan profesional dan rekam jejak saya dalam pengembangan web & kualitas perangkat lunak.",
      present: "SEKARANG",
      noExperience: "Belum ada entri pengalaman kerja yang ditambahkan.",
    },
    projects: {
      titlePrefix: "Proyek ",
      titleSuffix: "Unggulan.",
      subtitle:
        "Jelajahi koleksi aplikasi web dan proyek pengujian kualitas (QA) yang telah saya bangun.",
      allCategories: "Semua Proyek",
      share: "Bagikan",
      liveDemo: "Live Demo",
      github: "GitHub",
      noDemoTitle: "Live Demo Tidak Tersedia",
      noDemoText: "Live demo tidak tersedia untuk proyek ini.",
      noGithubTitle: "GitHub Tidak Tersedia",
      noGithubText: "Repositori GitHub tidak tersedia untuk proyek ini.",
      copiedTitle: "Tautan Disalin",
      copiedText: "Tautan proyek telah berhasil disalin ke papan klip!",
      noProjects: "Tidak ada proyek ditemukan dalam kategori ini.",
      viewAll: "Lihat Semua Proyek",
      showLess: "Tampilkan Lebih Sedikit",
    },
    contact: {
      titlePrefix: "Hubungi ",
      titleSuffix: "Saya.",
      subtitle:
        "Punya ide proyek atau ingin berkolaborasi? Jangan ragu untuk mengirimkan pesan!",
      nameLabel: "Nama Anda",
      namePlaceholder: "John Doe",
      emailLabel: "Email Anda",
      emailPlaceholder: "john@example.com",
      messageLabel: "Pesan Anda",
      messagePlaceholder: "Halo Abi, saya ingin mendiskusikan tentang...",
      sendBtn: "Kirim Pesan",
      sendingBtn: "Mengirim...",
      successTitle: "Pesan Terkirim!",
      successText:
        "Terima kasih telah menghubungi. Saya akan segera membalas pesan Anda!",
      errorTitle: "Gagal",
      errorText: "Gagal mengirim pesan. Silakan coba lagi nanti.",
      infoTitle: "Informasi Kontak",
      infoDesc:
        "Jangan ragu untuk menghubungi langsung melalui email atau media sosial.",
      emailTitle: "Alamat Email",
      locationTitle: "Lokasi",
      statusTitle: "Status Pekerjaan",
      statusText: "Tersedia untuk Peluang Baru",
    },
    footer: {
      rights: "Hak Cipta Dilindungi.",
      tagline:
        "Dirancang & dibangun dengan penuh dedikasi oleh Muhammad Abi Rafdi Pratama.",
    },
    sessionExpired: {
      title: "Sesi Berakhir",
      text: "Anda telah otomatis terlogout karena tidak ada aktivitas selama 3 menit.",
    },
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("portfolio_lang") || "en";
  });

  const toggleLanguage = () => {
    const nextLang = lang === "en" ? "id" : "en";
    setLang(nextLang);
    localStorage.setItem("portfolio_lang", nextLang);
  };

  const t = translations[lang] || translations.en;

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
