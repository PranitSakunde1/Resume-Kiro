import { useState, useEffect } from 'react'
import { MapPin, Mail, Phone, Github, Linkedin, Download, ChevronDown, Sparkles, Code, Zap, FileText } from 'lucide-react'
import { resumeData } from '../data/resumeData'
import { generatePDF } from '../utils/pdfGenerator'

const Hero = () => {
  const { personal } = resumeData
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    const handleMouseMove = (e) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleDownloadResume = () => {
    const link = document.createElement('a')
    link.href = '/resume.pdf'
    link.download = 'Pranit_Sakunde_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const scrollToNext = () => {
    document.getElementById('skills').scrollIntoView({ behavior: 'smooth' })
  }

  const handleGeneratePDF = async () => {
    await generatePDF();
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Subtle background overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-white/50 to-purple-50/30 dark:from-dark-900/80 dark:via-dark-800/70 dark:to-dark-900/80"></div>

      <div className="container-max section-padding relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
          
          {/* Left side - Enhanced Content */}
          <div className={`flex-1 text-center lg:text-left transition-all duration-1000 ${isLoaded ? 'animate-slide-in-left' : 'opacity-0'}`}>
            
            <div className="mb-8">
              <p className="text-primary-600 dark:text-primary-400 font-semibold mb-4 tracking-wide uppercase text-sm flex items-center justify-center lg:justify-start gap-2">
                <Sparkles className="w-4 h-4" />
                Technical Leader & Innovator
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Hi, I'm{' '}
                <span className="gradient-text relative">
                  {personal.name}
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 to-purple-400 rounded-full"></div>
                </span>
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {personal.role}
              </h2>
            </div>

            <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl leading-relaxed">
              {personal.summary}
            </p>

            {/* Enhanced contact info */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-10 text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-dark-800/50 rounded-xl backdrop-blur-sm border border-gray-200/50 dark:border-dark-700/50 hover:scale-105 transition-transform">
                <MapPin className="w-5 h-5 text-primary-500" />
                <span className="font-medium">{personal.location}</span>
              </div>
              <a href={`mailto:${personal.email}`} className="flex items-center gap-3 p-3 bg-white/50 dark:bg-dark-800/50 rounded-xl backdrop-blur-sm border border-gray-200/50 dark:border-dark-700/50 hover:scale-105 transition-transform hover:text-primary-500">
                <Mail className="w-5 h-5 text-primary-500" />
                <span className="font-medium">{personal.email}</span>
              </a>
              <a href={`tel:${personal.phone}`} className="flex items-center gap-3 p-3 bg-white/50 dark:bg-dark-800/50 rounded-xl backdrop-blur-sm border border-gray-200/50 dark:border-dark-700/50 hover:scale-105 transition-transform hover:text-primary-500">
                <Phone className="w-5 h-5 text-primary-500" />
                <span className="font-medium">{personal.phone}</span>
              </a>
            </div>

            {/* Enhanced action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <button
                onClick={handleDownloadResume}
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold rounded-2xl transition-all duration-300 hover:transform hover:scale-105 shadow-xl hover:shadow-2xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Resume PDF
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
              </button>
              <button
                onClick={handleGeneratePDF}
                className="group inline-flex items-center justify-center px-8 py-4 border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white font-bold rounded-2xl transition-all duration-300 hover:transform hover:scale-105 backdrop-blur-sm"
              >
                <FileText className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Website PDF
              </button>
              <button
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold rounded-2xl transition-all duration-300 hover:transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Let's Talk
              </button>
            </div>

            {/* Enhanced social links */}
            <div className="flex justify-center lg:justify-start gap-4">
              <a
                href={resumeData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 bg-white/80 dark:bg-dark-800/80 hover:bg-primary-100 dark:hover:bg-primary-900/20 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 rounded-2xl transition-all duration-300 hover:transform hover:scale-110 shadow-lg hover:shadow-xl backdrop-blur-sm border border-gray-200/50 dark:border-dark-700/50"
              >
                <Github className="w-6 h-6 group-hover:animate-pulse" />
              </a>
              <a
                href={resumeData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 bg-white/80 dark:bg-dark-800/80 hover:bg-primary-100 dark:hover:bg-primary-900/20 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 rounded-2xl transition-all duration-300 hover:transform hover:scale-110 shadow-lg hover:shadow-xl backdrop-blur-sm border border-gray-200/50 dark:border-dark-700/50"
              >
                <Linkedin className="w-6 h-6 group-hover:animate-pulse" />
              </a>
            </div>
          </div>

          {/* Right side - Enhanced Profile Image with Advanced Coding Animations */}
          <div className={`flex-shrink-0 transition-all duration-1000 delay-300 ${isLoaded ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <div className="relative group">
              {/* Advanced coding-themed background effects */}
              <div className="absolute -inset-12 bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 rounded-full blur-3xl opacity-20 animate-pulse group-hover:opacity-40 transition-opacity duration-1000"></div>
              <div className="absolute -inset-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-2xl opacity-30 animate-pulse delay-500"></div>
              
              {/* Rotating code ring */}
              <div className="absolute -inset-6 border-2 border-dashed border-primary-400/30 rounded-full animate-spin-slow"></div>
              <div className="absolute -inset-4 border border-dotted border-purple-400/40 rounded-full animate-reverse-spin"></div>
              
              {/* Profile image container */}
              <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white dark:border-dark-700 shadow-2xl group-hover:shadow-3xl transition-all duration-500 bg-gradient-to-br from-primary-100 to-purple-100 dark:from-primary-900/20 dark:to-purple-900/20">
                <img
                  src="/profile.jpg"
                  alt={personal.name}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(personal.name)}&size=400&background=0ea5e9&color=ffffff&bold=true`
                  }}
                />
                
                {/* Coding overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Matrix-style code rain overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/10 to-transparent animate-pulse"></div>
                </div>
              </div>

              {/* Advanced floating code elements */}
              <div className="absolute top-4 right-4 text-primary-500 animate-float delay-0">
                <div className="bg-white/90 dark:bg-dark-800/90 rounded-lg px-2 py-1 text-xs font-mono shadow-lg backdrop-blur-sm border border-primary-200 dark:border-primary-800">
                  {'{ }'}
                </div>
              </div>
              
              <div className="absolute top-1/4 -left-12 text-purple-500 animate-float delay-300">
                <div className="bg-white/90 dark:bg-dark-800/90 rounded-lg px-2 py-1 text-xs font-mono shadow-lg backdrop-blur-sm border border-purple-200 dark:border-purple-800">
                  Java 17
                </div>
              </div>
              
              <div className="absolute bottom-1/4 -right-12 text-blue-500 animate-float delay-600">
                <div className="bg-white/90 dark:bg-dark-800/90 rounded-lg px-2 py-1 text-xs font-mono shadow-lg backdrop-blur-sm border border-blue-200 dark:border-blue-800">
                  AWS
                </div>
              </div>
              
              <div className="absolute bottom-8 left-4 text-green-500 animate-float delay-900">
                <div className="bg-white/90 dark:bg-dark-800/90 rounded-lg px-2 py-1 text-xs font-mono shadow-lg backdrop-blur-sm border border-green-200 dark:border-green-800">
                  GoLang
                </div>
              </div>
              
              <div className="absolute top-1/2 -right-8 text-pink-500 animate-float delay-1200">
                <div className="bg-white/90 dark:bg-dark-800/90 rounded-lg px-2 py-1 text-xs font-mono shadow-lg backdrop-blur-sm border border-pink-200 dark:border-pink-800">
                  {'< />'}
                </div>
              </div>

              {/* Orbiting code symbols */}
              <div className="absolute inset-0 animate-orbit">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
                  <Code className="w-6 h-6 text-primary-500 opacity-70" />
                </div>
              </div>
              
              <div className="absolute inset-0 animate-orbit-reverse delay-1000">
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4">
                  <Zap className="w-5 h-5 text-purple-500 opacity-70" />
                </div>
              </div>

              {/* Pulsing tech indicators */}
              <div className="absolute top-8 left-8 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
              <div className="absolute bottom-12 right-8 w-4 h-4 bg-blue-400 rounded-full animate-pulse delay-500"></div>
              <div className="absolute top-1/3 -left-2 w-2 h-2 bg-yellow-400 rounded-full animate-bounce delay-700"></div>
              <div className="absolute bottom-1/3 -right-2 w-3 h-3 bg-red-400 rounded-full animate-ping delay-1000"></div>

              {/* Binary code streams */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-1000">
                <div className="absolute top-4 left-4 text-xs font-mono text-primary-400 animate-slide-down">
                  1010<br/>0110<br/>1100
                </div>
                <div className="absolute top-8 right-6 text-xs font-mono text-purple-400 animate-slide-down delay-300">
                  1001<br/>0101<br/>1110
                </div>
                <div className="absolute bottom-12 left-6 text-xs font-mono text-blue-400 animate-slide-up">
                  0011<br/>1010<br/>0101
                </div>
              </div>

              {/* Glowing connection lines */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-700">
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8"/>
                      <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6"/>
                      <stop offset="100%" stopColor="#ec4899" stopOpacity="0.4"/>
                    </linearGradient>
                  </defs>
                  <circle cx="200" cy="200" r="180" fill="none" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="5,5" className="animate-dash"/>
                  <circle cx="200" cy="200" r="160" fill="none" stroke="url(#lineGradient)" strokeWidth="0.5" strokeDasharray="3,3" className="animate-dash-reverse"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={scrollToNext}
            className="group p-4 text-gray-400 hover:text-primary-500 transition-colors bg-white/50 dark:bg-dark-800/50 rounded-full backdrop-blur-sm border border-gray-200/50 dark:border-dark-700/50 hover:scale-110 transition-transform"
          >
            <ChevronDown className="w-6 h-6 group-hover:animate-pulse" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero