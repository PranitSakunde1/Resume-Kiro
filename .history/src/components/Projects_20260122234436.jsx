import React from 'react'
import { ExternalLink, Github, Folder, Tag } from 'lucide-react'
import { resumeData } from '../data/resumeData'

const Projects = () => {
  const { projects } = resumeData

  const getCategoryColor = (category) => {
    const colors = {
      'Enterprise Platform': 'from-blue-500 to-blue-600',
      'HR Platform': 'from-green-500 to-green-600',
      'Monitoring Solution': 'from-purple-500 to-purple-600',
    }
    return colors[category] || 'from-primary-500 to-primary-600'
  }

  const getCategoryIcon = (category) => {
    // You can customize icons based on category
    return Folder
  }

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-dark-800">
      <div className="container-max section-padding">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Enterprise-level solutions that showcase my expertise in building scalable, 
            high-performance applications using modern technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const CategoryIcon = getCategoryIcon(project.category)
            const colorClass = getCategoryColor(project.category)
            
            return (
              <div
                key={project.id}
                className="group bg-white dark:bg-dark-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Project header */}
                <div className={`h-2 bg-gradient-to-r ${colorClass}`}></div>
                
                <div className="p-6">
                  {/* Category and icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${colorClass} text-white`}>
                        <CategoryIcon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {project.category}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {/* You can add actual project links here */}
                      <button className="p-2 text-gray-400 hover:text-primary-500 transition-colors opacity-50 cursor-not-allowed">
                        <Github className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-primary-500 transition-colors opacity-50 cursor-not-allowed">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Project name */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {project.name}
                  </h3>

                  {/* Project description */}
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed text-sm">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Tag className="w-4 h-4 text-primary-500" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Tech Stack
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded text-xs font-medium hover:bg-primary-100 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project status/type indicator */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-dark-700">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Enterprise Project
                    </span>
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${colorClass}`}></div>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            )
          })}
        </div>

        {/* Projects summary */}
        <div className="mt-16 text-center animate-fade-in">
          <div className="bg-white dark:bg-dark-900 rounded-xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Enterprise Impact
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              These projects represent my contribution to HP's enterprise ecosystem, 
              serving thousands of users and managing critical business operations. 
              Each solution demonstrates scalability, reliability, and performance optimization.
            </p>
            
            {/* Project stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">3+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Major Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">5+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Technologies Used</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">1000+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Users Impacted</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects