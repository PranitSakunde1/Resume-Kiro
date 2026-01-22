import React, { useState } from 'react'
import { ExternalLink, Github, Folder, Tag, Building, Users, TrendingUp, Award, Zap } from 'lucide-react'
import { resumeData } from '../data/resumeData'

const Projects = () => {
  const { projects } = resumeData
  const [hoveredProject, setHoveredProject] = useState(null)

  const getCategoryColor = (category) => {
    const colors = {
      'Healthcare Platform': 'from-red-500 to-red-600',
      'Enterprise Platform': 'from-blue-500 to-blue-600',
      'HR Platform': 'from-green-500 to-green-600',
      'Monitoring Solution': 'from-purple-500 to-purple-600',
    }
    return colors[category] || 'from-primary-500 to-primary-600'
  }

  const getCategoryIcon = (category) => {
    const icons = {
      'Healthcare Platform': Award,
      'Enterprise Platform': Building,
      'HR Platform': Users,
      'Monitoring Solution': TrendingUp,
    }
    return icons[category] || Folder
  }

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-dark-800 dark:via-dark-900 dark:to-dark-800 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-purple-200/10 dark:bg-purple-800/5 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-blue-200/10 dark:bg-blue-800/5 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container-max section-padding relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Portfolio Showcase
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Enterprise-level solutions delivered at Quest Global for HP Inc., showcasing expertise in building scalable, 
            high-performance applications using modern technologies and leading cross-functional teams.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {projects.map((project, index) => {
            const CategoryIcon = getCategoryIcon(project.category)
            const colorClass = getCategoryColor(project.category)
            
            return (
              <div
                key={project.id}
                className="group bg-white dark:bg-dark-900 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105 border border-gray-100 dark:border-dark-700 relative"
                style={{ animationDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Enhanced project header */}
                <div className={`h-3 bg-gradient-to-r ${colorClass}`}></div>
                
                <div className="p-8">
                  {/* Company and Client info */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-xl bg-gradient-to-r ${colorClass} text-white shadow-lg`}>
                          <CategoryIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                            {project.category}
                          </span>
                          {project.isLeadership && (
                            <div className="text-xs text-primary-600 dark:text-primary-400 font-bold">
                              LEADERSHIP PROJECT
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Company and Client badges */}
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full text-xs font-semibold">
                          Quest Global
                        </span>
                        <span className="text-xs text-gray-400">for</span>
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold">
                          {project.client}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-400 hover:text-primary-500 transition-colors opacity-50 cursor-not-allowed">
                        <Github className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-primary-500 transition-colors opacity-50 cursor-not-allowed">
                        <ExternalLink className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Project name and team info */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {project.name}
                    {project.teamSize && (
                      <span className="ml-3 text-sm font-normal text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-dark-700 px-2 py-1 rounded-full">
                        Team: {project.teamSize}
                      </span>
                    )}
                  </h3>

                  {/* Project description */}
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Impact metrics */}
                  {project.impact && (
                    <div className="mb-6 p-4 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/10 dark:to-purple-900/10 rounded-xl border border-primary-100 dark:border-primary-800/20">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-primary-500" />
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Impact</span>
                      </div>
                      <p className="text-primary-700 dark:text-primary-300 font-semibold">{project.impact}</p>
                    </div>
                  )}

                  {/* Technologies */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Tag className="w-5 h-5 text-primary-500" />
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Tech Stack
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className={`px-3 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-gradient-to-r hover:${colorClass} hover:text-white transition-all cursor-default transform hover:scale-105`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project status/type indicator */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-dark-700">
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      {project.isLeadership ? 'Leadership Role' : 'Development Contribution'}
                    </span>
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${colorClass} animate-pulse`}></div>
                  </div>
                </div>

                {/* Enhanced hover effect overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${colorClass} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}></div>
                
                {/* Hover particles */}
                {hoveredProject === project.id && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className={`absolute w-1 h-1 bg-gradient-to-r ${colorClass} rounded-full animate-ping`}
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`,
                          animationDelay: `${Math.random() * 1000}ms`
                        }}
                      ></div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Enhanced projects summary */}
        <div className="text-center animate-fade-in">
          <div className="bg-gradient-to-r from-white via-primary-50 to-white dark:from-dark-900 dark:via-primary-900/10 dark:to-dark-900 rounded-3xl p-10 shadow-2xl max-w-6xl mx-auto border border-primary-100 dark:border-primary-800/20">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center justify-center gap-3">
              <Building className="w-8 h-8 text-primary-500" />
              Enterprise Impact at Quest Global
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 text-lg">
              These projects represent my contribution to Quest Global's delivery excellence for HP Inc., 
              serving thousands of users and managing critical business operations across healthcare, enterprise management, 
              and workforce optimization. As a leader, I've successfully managed cross-functional teams, designed system architectures, 
              and delivered scalable solutions that demonstrate reliability, performance optimization, and technical excellence.
            </p>
            
            {/* Enhanced project stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-white dark:bg-dark-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">4+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Major Projects</div>
              </div>
              <div className="text-center p-6 bg-white dark:bg-dark-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">8</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Team Members Led</div>
              </div>
              <div className="text-center p-6 bg-white dark:bg-dark-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">6+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Technologies Used</div>
              </div>
              <div className="text-center p-6 bg-white dark:bg-dark-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">50K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Users Impacted</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects