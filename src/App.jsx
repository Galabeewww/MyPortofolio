import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 selection:bg-indigo-500 selection:text-white relative bg-grid-pattern overflow-x-hidden">
      {/* Dekorasi Gradient Latar Belakang */}
      <div className="absolute top-0 left-0 w-full h-[700px] bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent pointer-events-none z-0"></div>
      
      {/* Ornamen Bola Cahaya Mengambang */}
      <div className="absolute top-[20%] left-[-10%] w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute top-[60%] right-[-10%] w-[350px] h-[350px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
