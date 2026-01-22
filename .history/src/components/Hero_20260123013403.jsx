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
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-white/50 to-purple-50/30 dark:from-gray-900/80 dark:via-gray-800/70 dark:to-gray-900/80 transition-colors duration-300"></div>

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
              <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-transform">
                <MapPin className="w-5 h-5 text-primary-500" />
                <span className="font-medium">{personal.location}</span>
              </div>
              <a href={`mailto:${personal.email}`} className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-transform hover:text-primary-500">
                <Mail className="w-5 h-5 text-primary-500" />
                <span className="font-medium">{personal.email}</span>
              </a>
              <a href={`tel:${personal.phone}`} className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-transform hover:text-primary-500">
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

          {/* Right side - Enhanced Profile Image */}
          <div className={`flex-shrink-0 transition-all duration-1000 delay-300 ${isLoaded ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <div className="relative group">
              {/* Enhanced decorative elements */}
              <div className="absolute -inset-8 bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 rounded-full blur-2xl opacity-30 animate-pulse group-hover:opacity-50 transition-opacity"></div>
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full blur-xl opacity-40 animate-pulse delay-300"></div>
              
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
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Enhanced floating elements */}
              <div className="absolute top-8 right-8 w-6 h-6 bg-primary-400 rounded-full animate-ping"></div>
              <div className="absolute bottom-12 left-8 w-4 h-4 bg-purple-500 rounded-full animate-bounce delay-300"></div>
              <div className="absolute top-1/2 -right-4 w-3 h-3 bg-pink-500 rounded-full animate-pulse delay-700"></div>
              <div className="absolute bottom-1/4 -left-4 w-5 h-5 bg-blue-500 rounded-full animate-bounce delay-1000"></div>

              {/* Code symbols floating around */}
              <div className="absolute top-1/4 -left-8 text-primary-500 animate-bounce delay-500">
                <Code className="w-8 h-8 opacity-60" />
              </div>
              <div className="absolute bottom-1/3 -right-8 text-purple-500 animate-pulse delay-1200">
                <Zap className="w-6 h-6 opacity-60" />
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