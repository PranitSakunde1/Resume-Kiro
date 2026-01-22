import React from 'react'
import { MapPin, Mail, Phone, Github, Linkedin, Download, ChevronDown } from 'lucide-react'
import { resumeData } from '../data/resumeData'

const Hero = () => {
  const { personal } = resumeData

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

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 dark:bg-primary-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-300 dark:bg-primary-800/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
      </div>

      <div className="container-max section-padding relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* Left side - Content */}
          <div className="flex-1 text-center lg:text-left animate-slide-in-left">
            <div className="mb-6">
              <p className="text-primary-600 dark:text-primary-400 font-medium mb-2 tracking-wide uppercase text-sm">
                Welcome to my portfolio
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                Hi, I'm{' '}
                <span className="gradient-text">{personal.name}</span>
              </h1>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-600 dark:text-gray-300 mb-6">
                {personal.role}
              </h2>
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl leading-relaxed">
              {personal.summary}
            </p>

            {/* Contact info */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-500" />
                <span>{personal.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-500" />
                <a href={`mailto:${personal.email}`} className="hover:text-primary-500 transition-colors">
                  {personal.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary-500" />
                <a href={`tel:${personal.phone}`} className="hover:text-primary-500 transition-colors">
                  {personal.phone}
                </a>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <button
                onClick={handleDownloadResume}
                className="inline-flex items-center justify-center px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-all duration-200 hover:transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Resume
              </button>
              <button
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white font-medium rounded-lg transition-all duration-200 hover:transform hover:scale-105"
              >
                Get In Touch
              </button>
            </div>

            {/* Social links */}
            <div className="flex justify-center lg:justify-start gap-4">
              <a
                href={resumeData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-100 dark:bg-dark-800 hover:bg-primary-100 dark:hover:bg-primary-900/20 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg transition-all duration-200 hover:transform hover:scale-110"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={resumeData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-100 dark:bg-dark-800 hover:bg-primary-100 dark:hover:bg-primary-900/20 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg transition-all duration-200 hover:transform hover:scale-110"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right side - Profile Image */}
          <div className="flex-shrink-0 animate-slide-in-right">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full blur opacity-20 animate-pulse"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-primary-500 to-primary-700 rounded-full blur-sm opacity-30"></div>
              
              {/* Profile image */}
              <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white dark:border-dark-700 shadow-2xl">
                <img
                  src="/profile.jpg"
                  alt={personal.name}
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback to a placeholder if image fails to load
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(personal.name)}&size=400&background=0ea5e9&color=ffffff&bold=true`
                  }}
                />
              </div>

              {/* Floating elements */}
              <div className="absolute top-4 right-4 w-4 h-4 bg-primary-400 rounded-full animate-ping"></div>
              <div className="absolute bottom-8 left-4 w-3 h-3 bg-primary-500 rounded-full animate-bounce delay-300"></div>
              <div className="absolute top-1/2 -right-2 w-2 h-2 bg-primary-600 rounded-full animate-pulse delay-700"></div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={scrollToNext}
            className="p-2 text-gray-400 hover:text-primary-500 transition-colors"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero