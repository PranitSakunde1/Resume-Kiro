import React from 'react'
import { Mail, Phone, MapPin, Github, Linkedin, Send, MessageCircle } from 'lucide-react'
import { resumeData } from '../data/resumeData'

const Contact = () => {
  const { contact } = resumeData

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: contact.email,
      href: `mailto:${contact.email}`,
      color: 'from-red-500 to-red-600',
      description: 'Send me an email'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: contact.phone,
      href: `tel:${contact.phone}`,
      color: 'from-green-500 to-green-600',
      description: 'Give me a call'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'View Projects',
      href: contact.github,
      color: 'from-gray-700 to-gray-900',
      description: 'Check out my code'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Connect',
      href: contact.linkedin,
      color: 'from-blue-600 to-blue-700',
      description: 'Let\'s connect professionally'
    }
  ]

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-dark-800">
      <div className="container-max section-padding">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Ready to collaborate on your next project? Let's discuss how we can work together 
            to build something amazing.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Information */}
            <div className="animate-slide-in-left">
              <div className="bg-white dark:bg-dark-900 rounded-xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Let's Connect
                  </h3>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  I'm always interested in discussing new opportunities, innovative projects, 
                  and potential collaborations. Whether you have a project in mind or just want to chat about technology, 
                  feel free to reach out!
                </p>

                {/* Location */}
                <div className="flex items-start gap-4 mb-8 p-4 bg-gray-50 dark:bg-dark-800 rounded-lg">
                  <div className="p-2 bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-lg">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Location</h4>
                    <p className="text-gray-600 dark:text-gray-400">{contact.location}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                      Available for remote work and local opportunities
                    </p>
                  </div>
                </div>

                {/* Contact methods grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {contactMethods.map((method, index) => {
                    const IconComponent = method.icon
                    return (
                      <a
                        key={index}
                        href={method.href}
                        target={method.href.startsWith('http') ? '_blank' : '_self'}
                        rel={method.href.startsWith('http') ? 'noopener noreferrer' : ''}
                        className="group p-4 bg-gray-50 dark:bg-dark-800 rounded-lg hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${method.color} text-white group-hover:scale-110 transition-transform`}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                              {method.label}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-500 truncate">
                              {method.description}
                            </p>
                          </div>
                        </div>
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="animate-slide-in-right">
              <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl p-8 text-white shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Ready to Start a Project?</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Send className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Quick Response</h4>
                      <p className="text-primary-100 text-sm">
                        I typically respond to emails within 24 hours and am available for calls during business hours.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Free Consultation</h4>
                      <p className="text-primary-100 text-sm">
                        Let's discuss your project requirements and explore how I can help bring your ideas to life.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Primary CTA */}
                <div className="mt-8 pt-6 border-t border-primary-400">
                  <a
                    href={`mailto:${contact.email}?subject=Project Inquiry&body=Hi Pranit,%0D%0A%0D%0AI'm interested in discussing a project opportunity with you.%0D%0A%0D%0AProject Details:%0D%0A- %0D%0A- %0D%0A- %0D%0A%0D%0ABest regards`}
                    className="inline-flex items-center justify-center w-full px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors duration-200 hover:transform hover:scale-105"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Send Project Inquiry
                  </a>
                </div>

                {/* Secondary CTAs */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors duration-200"
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </a>
                  <a
                    href={contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors duration-200"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </a>
                </div>
              </div>

              {/* Availability status */}
              <div className="mt-6 bg-white dark:bg-dark-900 rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium text-gray-900 dark:text-white">Available for new projects</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Currently accepting new freelance and full-time opportunities
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact