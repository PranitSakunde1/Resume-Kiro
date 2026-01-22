import React from 'react'
import { Briefcase, Calendar, MapPin, ChevronRight } from 'lucide-react'
import { resumeData } from '../data/resumeData'

const Experience = () => {
  const { experience } = resumeData

  return (
    <section id="experience" className="py-20 bg-white dark:bg-dark-900">
      <div className="container-max section-padding">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A journey of growth, innovation, and technical excellence across diverse projects and technologies.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-400 via-primary-500 to-primary-600"></div>

          <div className="space-y-12">
            {experience.map((job, index) => (
              <div
                key={job.id}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 animate-slide-up`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1 w-4 h-4 bg-primary-500 rounded-full border-4 border-white dark:border-dark-900 shadow-lg z-10"></div>

                {/* Content */}
                <div className={`flex-1 ml-12 md:ml-0 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:ml-auto'}`}>
                  <div className="bg-gray-50 dark:bg-dark-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group hover:transform hover:scale-105">
                    {/* Company and position */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`${index % 2 === 0 ? 'md:text-right' : ''}`}>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {job.position}
                        </h3>
                        <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium mb-2">
                          <Briefcase className="w-4 h-4" />
                          <span>{job.company}</span>
                        </div>
                        {/* Project and team info for Technical Lead */}
                        {job.project && (
                          <div className={`text-sm text-gray-600 dark:text-gray-400 mb-1 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                            <span className="font-medium">Project:</span> {job.project}
                          </div>
                        )}
                        {job.teamSize && (
                          <div className={`text-sm text-gray-600 dark:text-gray-400 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                            <span className="font-medium">Team Size:</span> {job.teamSize}
                          </div>
                        )}
                      </div>
                      {job.type === 'current' && (
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs font-medium rounded-full">
                          Current
                        </span>
                      )}
                    </div>

                    {/* Duration */}
                    <div className={`flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">{job.duration}</span>
                    </div>

                    {/* Description */}
                    <p className={`text-gray-700 dark:text-gray-300 mb-4 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                      {job.description}
                    </p>

                    {/* Achievements */}
                    {job.achievements && job.achievements.length > 0 && (
                      <div className={`${index % 2 === 0 ? 'md:text-right' : ''}`}>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Achievements:</h4>
                        <ul className={`space-y-2 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                          {job.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                              <ChevronRight className={`w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0 ${index % 2 === 0 ? 'md:order-2' : ''}`} />
                              <span className="text-sm leading-relaxed">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Years indicator */}
                <div className={`hidden md:block ${index % 2 === 0 ? 'order-2' : 'order-1'}`}>
                  <div className="bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap">
                    {job.duration.split(' - ')[0]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience summary */}
        <div className="mt-16 text-center animate-fade-in">
          <div className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/10 dark:to-primary-800/10 rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              5+ Years of Excellence
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              From Software Engineer to Technical Lead, I've consistently delivered high-quality solutions, 
              led cross-functional teams, and driven innovation in enterprise-level applications. 
              My experience spans the full software development lifecycle, from requirements analysis to production deployment.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience