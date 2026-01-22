import React from 'react'
import { Briefcase, Calendar, MapPin, ChevronRight, Building, Users, Award } from 'lucide-react'
import { resumeData } from '../data/resumeData'

const Experience = () => {
  const { experience } = resumeData

  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-white via-gray-50 to-primary-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-200/10 dark:bg-primary-800/5 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-200/10 dark:bg-purple-800/5 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container-max section-padding relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium mb-6">
            <Award className="w-4 h-4" />
            Career Journey
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A journey of growth, innovation, and technical excellence across diverse projects and technologies, 
            delivering enterprise solutions for global clients.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Enhanced timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-400 via-primary-500 to-primary-600 rounded-full shadow-lg"></div>

          <div className="space-y-16">
            {experience.map((job, index) => (
              <div
                key={job.id}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 animate-slide-up`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Enhanced timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1 w-6 h-6 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full border-4 border-white dark:border-dark-900 shadow-xl z-20 pulse-glow"></div>

                {/* Content */}
                <div className={`flex-1 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'}`}>
                  <div className="group bg-white dark:bg-dark-900 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105 border border-gray-100 dark:border-dark-700 relative overflow-hidden">
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className={`${index % 2 === 0 ? 'md:text-right' : ''}`}>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {job.position}
                          </h3>
                          
                          {/* Company and Client */}
                          <div className={`flex flex-col gap-2 mb-3 ${index % 2 === 0 ? 'md:items-end' : ''}`}>
                            <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold">
                              <Building className="w-5 h-5" />
                              <span>{job.company}</span>
                            </div>
                            {job.client && (
                              <div className={`flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                                <span className="px-2 py-1 bg-gray-100 dark:bg-dark-700 rounded-full text-xs font-medium">
                                  Client: {job.client}
                                </span>
                              </div>
                            )}
                          </div>
                          
                          {/* Project and team info */}
                          {job.project && (
                            <div className={`mb-2 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                                <Award className="w-4 h-4" />
                                {job.project}
                              </div>
                            </div>
                          )}
                          {job.teamSize && (
                            <div className={`text-sm text-gray-600 dark:text-gray-400 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                              <div className="inline-flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                <span className="font-medium">Leading {job.teamSize}</span>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {job.type === 'current' && (
                          <div className="flex flex-col items-end gap-2">
                            <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
                              Current Role
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Duration */}
                      <div className={`flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-6 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                        <Calendar className="w-5 h-5 text-primary-500" />
                        <span className="font-semibold text-lg">{job.duration}</span>
                      </div>

                      {/* Description */}
                      <p className={`text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                        {job.description}
                      </p>

                      {/* Achievements */}
                      {job.achievements && job.achievements.length > 0 && (
                        <div className={`${index % 2 === 0 ? 'md:text-right' : ''}`}>
                          <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-lg flex items-center gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}">
                            <Award className="w-5 h-5 text-primary-500" />
                            Key Achievements
                          </h4>
                          <div className="space-y-3">
                            {job.achievements.map((achievement, achIndex) => (
                              <div key={achIndex} className={`flex items-start gap-3 p-3 bg-gray-50 dark:bg-dark-800 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-colors ${index % 2 === 0 ? 'md:flex-row-reverse md:text-right' : ''}`}>
                                <ChevronRight className={`w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0 ${index % 2 === 0 ? 'md:rotate-180' : ''}`} />
                                <span className="text-gray-600 dark:text-gray-400 leading-relaxed">{achievement}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Enhanced years indicator */}
                <div className={`hidden md:block ${index % 2 === 0 ? 'order-2' : 'order-1'}`}>
                  <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-bold text-lg whitespace-nowrap shadow-lg hover:shadow-xl transition-shadow">
                    {job.duration.split(' - ')[0]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced experience summary */}
        <div className="mt-20 text-center animate-fade-in">
          <div className="bg-gradient-to-r from-primary-50 via-white to-primary-50 dark:from-primary-900/10 dark:via-dark-800 dark:to-primary-900/10 rounded-3xl p-10 max-w-5xl mx-auto shadow-xl border border-primary-100 dark:border-primary-800/20">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              5+ Years of Technical Leadership Excellence
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 text-lg">
              From Software Engineer to Technical Lead at Quest Global, I've consistently delivered high-quality solutions for HP Inc., 
              led cross-functional teams of up to 8 members, and driven innovation in enterprise-level healthcare applications. 
              My experience spans the full software development lifecycle, from HLD/LLD creation to production deployment, 
              with expertise in technical architecture design and team mentorship.
            </p>
            
            {/* Enhanced leadership highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-white dark:bg-dark-900 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">8</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Team Members Led</div>
              </div>
              <div className="text-center p-6 bg-white dark:bg-dark-900 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">50K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Users Served</div>
              </div>
              <div className="text-center p-6 bg-white dark:bg-dark-900 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">99.9%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">System Uptime</div>
              </div>
              <div className="text-center p-6 bg-white dark:bg-dark-900 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">40%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Productivity Boost</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience