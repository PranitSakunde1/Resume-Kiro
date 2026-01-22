import React from 'react'
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react'
import { resumeData } from '../data/resumeData'

const Education = () => {
  const { education } = resumeData

  const getEducationIcon = (type) => {
    switch (type) {
      case 'diploma':
        return Award
      case 'bachelor':
        return GraduationCap
      default:
        return GraduationCap
    }
  }

  const getEducationColor = (type) => {
    switch (type) {
      case 'diploma':
        return 'from-green-500 to-green-600'
      case 'bachelor':
        return 'from-blue-500 to-blue-600'
      default:
        return 'from-primary-500 to-primary-600'
    }
  }

  return (
    <section id="education" className="py-20 bg-white dark:bg-dark-900">
      <div className="container-max section-padding">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Education & <span className="gradient-text">Training</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Academic foundation and specialized training that shaped my technical expertise and problem-solving approach.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {education.map((edu, index) => {
              const IconComponent = getEducationIcon(edu.type)
              const colorClass = getEducationColor(edu.type)
              
              return (
                <div
                  key={edu.id}
                  className="group bg-gray-50 dark:bg-dark-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 animate-slide-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    {/* Icon */}
                    <div className={`flex-shrink-0 p-4 rounded-xl bg-gradient-to-r ${colorClass} text-white group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-8 h-8" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {edu.degree}
                          </h3>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                            <MapPin className="w-4 h-4" />
                            <span className="font-medium">{edu.institution}</span>
                          </div>
                          {edu.year && (
                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-500">
                              <Calendar className="w-4 h-4" />
                              <span>{edu.year}</span>
                            </div>
                          )}
                        </div>

                        {/* Education type badge */}
                        <div className="flex-shrink-0">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${colorClass} text-white`}>
                            {edu.type === 'diploma' ? 'Post Graduate Diploma' : 'Bachelor\'s Degree'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional info for specific education */}
                  {edu.degree.includes('Electronics') && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-700">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Specialization:</span> Electronics Engineering with focus on 
                        digital systems, embedded programming, and hardware-software integration.
                      </p>
                    </div>
                  )}

                  {edu.institution.includes('CDAC') && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-700">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Focus Areas:</span> Advanced software development, 
                        enterprise application development, and modern programming methodologies.
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Education summary */}
        <div className="mt-16 text-center animate-fade-in">
          <div className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/10 dark:to-primary-800/10 rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Continuous Learning Journey
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              My educational background combines strong engineering fundamentals with specialized software development training. 
              This foundation, coupled with continuous learning and hands-on experience, enables me to tackle complex technical challenges 
              and stay current with evolving technologies.
            </p>
            
            {/* Learning highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Engineering Foundation</div>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Award className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Specialized Training</div>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Continuous Learning</div>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <MapPin className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Pune Education Hub</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education