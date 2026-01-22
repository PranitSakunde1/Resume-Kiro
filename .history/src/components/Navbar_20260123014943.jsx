import React, { useState, useEffect } from 'react'
import { Menu, X, Download, FileText } from 'lucide-react'
import { generatePDF } from '../utils/pdfGenerator'

const Navbar = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  const handleDownloadResume = () => {
    // Create a link to download the resume PDF
    const link = document.createElement('a')
    link.href = '/resume.pdf'
    link.download = 'Pranit_Sakunde_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleGeneratePDF = async () => {
    await generatePDF();
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container-max section-padding">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-xl font-bold gradient-text hover:scale-105 transition-transform"
            >
              PS
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`nav-link ${activeSection === item.id ? 'active text-primary-400' : 'text-gray-700 dark:text-gray-300'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Download Resume Button */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={handleDownloadResume}
              className="inline-flex items-center px-4 py-2 border border-primary-500 text-sm font-medium rounded-lg text-primary-500 hover:bg-primary-500 hover:text-white transition-colors duration-200"
            >
              <Download className="w-4 h-4 mr-2" />
              Resume PDF
            </button>
            <button
              onClick={handleGeneratePDF}
              className="inline-flex items-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
            >
              <FileText className="w-4 h-4 mr-2" />
              Generate PDF
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-primary-400 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-dark-800 rounded-lg mt-2 shadow-lg">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    activeSection === item.id
                      ? 'text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-dark-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={handleDownloadResume}
                className="flex items-center w-full px-3 py-2 text-base font-medium text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-md transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Resume PDF
              </button>
              <button
                onClick={handleGeneratePDF}
                className="flex items-center w-full px-3 py-2 text-base font-medium text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-md transition-colors"
              >
                <FileText className="w-4 h-4 mr-2" />
                Generate Website PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar