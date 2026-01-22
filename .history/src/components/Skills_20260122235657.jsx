import React from 'react'
import { Code, Cloud, TestTube, Cog, Brain, Zap } from 'lucide-react'
import { resumeData } from '../data/resumeData'

const Skills = () => {
  const { skills } = resumeData

  const skillIcons = {
    'Programming Languages': Code,
    'Frameworks': Cog,
    'Cloud & DevOps': Cloud,
    'Testing & Quality': TestTube,
    'Development Practices': Zap,
    'AI & Modern Tech': Brain,
    'Integration & Auth': Cog,
    'Leadership & Architecture': Brain
  }

  const skillColors = {
    'Programming Languages': 'from-blue-500 to-blue-600',
    'Frameworks': 'from-green-500 to-green-600',
    'Cloud & DevOps': 'from-purple-500 to-purple-600',
    'Testing & Quality': 'from-red-500 to-red-600',
    'Development Practices': 'from-yellow-500 to-yellow-600',
    'AI & Modern Tech': 'from-pink-500 to-pink-600',
    'Integration & Auth': 'from-indigo-500 to-indigo-600'
  }

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-dark-800">
      <div className="container-max section-padding">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A comprehensive toolkit of modern technologies and methodologies I use to build scalable, efficient solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, skillList], index) => {
            const IconComponent = skillIcons[category] || Code
            const colorClass = skillColors[category] || 'from-primary-500 to-primary-600'
            
            return (
              <div
                key={category}
                className="group bg-white dark:bg-dark-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${colorClass} text-white mr-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {category}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-primary-100 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Skill count indicator */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-700">
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>{skillList.length} skills</span>
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${colorClass}`}></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Skills summary */}
        <div className="mt-16 text-center animate-fade-in">
          <div className="bg-white dark:bg-dark-900 rounded-xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Core Expertise
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Specialized in <span className="text-primary-600 font-medium">Java 8 ecosystem</span> with 
              extensive experience in <span className="text-primary-600 font-medium">Spring Boot microservices</span>, 
              <span className="text-primary-600 font-medium"> AWS cloud services</span>, and modern development practices. 
              Currently expanding expertise in <span className="text-primary-600 font-medium">GenAI and MCP technologies</span> 
              to stay at the forefront of software innovation.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills