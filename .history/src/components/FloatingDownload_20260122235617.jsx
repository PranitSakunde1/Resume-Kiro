import React, { useState, useEffect } from 'react'
import { Download, X } from 'lucide-react'

const FloatingDownload = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)

  const handleDownloadResume = () => {
    const link = document.createElement('a')
    link.href = '/resume.pdf'
    link.download = 'Pranit_Sakunde_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  if (!isVisible) return null

  return (
    <div className={`fixed bottom-4 left-4 z-50 transition-all duration-300 ${isMinimized ? 'w-12 h-12' : 'w-auto'}`}>
      {isMinimized ? (
        <button
          onClick={toggleMinimize}
          className="w-12 h-12 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-110 flex items-center justify-center"
          aria-label="Expand download resume"
        >
          <Download className="w-5 h-5" />
        </button>
      ) : (
        <div className="bg-white dark:bg-dark-900 rounded-lg shadow-lg border border-gray-200 dark:border-dark-700 p-4 max-w-xs animate-slide-up">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
              Resume Available
            </h4>
            <div className="flex gap-1">
              <button
                onClick={toggleMinimize}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                aria-label="Minimize"
              >
                <div className="w-3 h-0.5 bg-current"></div>
              </button>
              <button
                onClick={handleClose}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                aria-label="Close"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
          
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
            Download my complete resume with detailed experience and projects.
          </p>
          
          <button
            onClick={handleDownloadResume}
            className="w-full inline-flex items-center justify-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-all duration-200 hover:transform hover:scale-105 text-sm"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </button>
        </div>
      )}
    </div>
  )
}

export default FloatingDownload