import { useState, useEffect } from 'react'
import { Mail, Phone, MapPin, Github, Linkedin, Send, MessageCircle, Zap, Clock, CheckCircle, ArrowRight, Sparkles, Code, Coffee } from 'lucide-react'
import { resumeData } from '../data/resumeData'

const Contact = () => {
  const { contact } = resumeData
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: contact.email,
      href: `mailto:${contact.email}`,
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-50 dark:bg-red-900/10',
      description: 'Drop me a line',
      response: '< 24 hours'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: contact.phone,
      href: `tel:${contact.phone}`,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-900/10',
      description: 'Let\'s talk',
      response: 'Instant'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'View Code',
      href: contact.github,
      color: 'from-gray-700 to-gray-900',
      bgColor: 'bg-gray-50 dark:bg-gray-900/10',
      description: 'Check my work',
      response: 'Always updated'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Connect',
      href: contact.linkedin,
      color: 'from-blue-600 to-blue-700',
      bgColor: 'bg-blue-50 dark:bg-blue-900/10',
      description: 'Professional network',
      response: 'Active daily'
    }
  ]

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50/50 via-white/50 to-primary-50/50 dark:from-gray-800/50 dark:via-gray-900/50 dark:to-gray-800/50 relative overflow-hidden transition-colors duration-300">

      <div className="container-max section-padding relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Let's Build Something Amazing
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Ready to <span className="gradient-text">Collaborate</span>?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            I'm passionate about creating innovative solutions and leading teams to success. 
            Let's discuss your next big project and make it extraordinary.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
            
            {/* Contact Cards */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon
                return (
                  <a
                    key={index}
                    href={method.href}
                    target={method.href.startsWith('http') ? '_blank' : '_self'}
                    rel={method.href.startsWith('http') ? 'noopener noreferrer' : ''}
                    className="group relative bg-white dark:bg-dark-900 rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105 border border-gray-100 dark:border-dark-700 overflow-hidden"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${method.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Response Time</div>
                          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{method.response}</div>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {method.label}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        {method.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                          {method.value}
                        </span>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>

            {/* Quick Stats & CTA */}
            <div className="space-y-6">
              {/* Stats Card */}
              <div className="bg-white dark:bg-dark-900 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-dark-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary-500" />
                  Quick Facts
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Available for new projects</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-primary-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">5+ years experience</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Code className="w-4 h-4 text-primary-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Technical Leadership</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Coffee className="w-4 h-4 text-primary-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Based in Pune, India</span>
                  </div>
                </div>
              </div>

              {/* Primary CTA */}
              <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105">
                <h3 className="text-xl font-bold mb-4">Start Your Project</h3>
                <p className="text-primary-100 text-sm mb-6 leading-relaxed">
                  Ready to bring your ideas to life? Let's schedule a free consultation and discuss your project requirements.
                </p>
                
                <a
                  href={`mailto:${contact.email}?subject=Project Collaboration Inquiry&body=Hi Pranit,%0D%0A%0D%0AI'm interested in discussing a project opportunity with you.%0D%0A%0D%0AProject Details:%0D%0A- Project Type: %0D%0A- Timeline: %0D%0A- Budget Range: %0D%0A- Key Requirements: %0D%0A%0D%0ABest regards`}
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-white text-primary-600 font-semibold rounded-xl hover:bg-primary-50 transition-all duration-200 hover:transform hover:scale-105 group"
                >
                  <Mail className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Send Project Brief
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Section - Enhanced */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Location & Availability */}
            <div className="bg-white dark:bg-dark-900 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-dark-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-xl">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Location & Availability</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Ready to collaborate globally</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-dark-800 rounded-xl">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2 animate-pulse"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Currently Available</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Accepting new freelance projects and full-time opportunities
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-dark-800 rounded-xl">
                  <MapPin className="w-5 h-5 text-primary-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{contact.location}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Open to remote work and international collaborations
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* What I Offer */}
            <div className="bg-white dark:bg-dark-900 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-dark-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">What I Bring</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Value-driven solutions</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'Technical Leadership',
                  'System Architecture',
                  'Team Management',
                  'Agile Development',
                  'Cloud Solutions',
                  'Performance Optimization'
                ].map((skill, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-dark-800 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact