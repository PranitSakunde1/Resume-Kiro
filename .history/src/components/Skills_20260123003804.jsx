import React, { useState, useEffect } from 'react'
import { Code, Cloud, TestTube, Cog, Brain, Zap, Award, TrendingUp } from 'lucide-react'
import { resumeData } from '../data/resumeData'

const Skills = () => {
  const { skills } = resumeData
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const [visibleCards, setVisibleCards] = useState([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index)
            setVisibleCards(prev => [...prev, index])
          }
        })
      },
      { threshold: 0.1 }
    )

    const cards = document.querySelectorAll('.skill-card')
    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  const skillIcons = {
    'Programming Languages': Code,
    'Frameworks': Cog,
    'Cloud & DevOps': Cloud,
    'Testing & Quality': TestTube,
    'Development Practices': Zap,
    'AI & Modern Tech': Brain,
    'Monitoring & Analytics': TrendingUp,
    'Authentication & Security': Award,
    'Leadership & Architecture': Award
  }

  const skillColors = {
    'Programming Languages': 'from-blue-500 to-blue-600',
    'Frameworks': 'from-green-500 to-green-600',
    'Cloud & DevOps': 'from-purple-500 to-purple-600',
    'Testing & Quality': 'from-red-500 to-red-600',
    'Development Practices': 'from-yellow-500 to-yellow-600',
    'AI & Modern Tech': 'from-pink-500 to-pink-600',
    'Integration & Auth': 'from-indigo-500 to-indigo-600',
    'Leadership & Architecture': 'from-orange-500 to-orange-600'
  }

  const skillLevels = {
    'Programming Languages': 95,
    'Frameworks': 90,
    'Cloud & DevOps': 85,
    'Testing & Quality': 88,
    'Development Practices': 92,
    'AI & Modern Tech': 75,
    'Integration & Auth': 80,
    'Leadership & Architecture': 90
  }

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-dark-800 dark:via-dark-900 dark:to-dark-800 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-200/10 dark:bg-primary-800/5 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/10 dark:bg-purple-800/5 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container-max section-padding relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4" />
            Technical Expertise
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A comprehensive toolkit of modern technologies and methodologies I use to build scalable, 
            efficient solutions that drive business success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {Object.entries(skills).map(([category, skillList], index) => {
            const IconComponent = skillIcons[category] || Code
            const colorClass = skillColors[category] || 'from-primary-500 to-primary-600'
            const level = skillLevels[category] || 80
            const isVisible = visibleCards.includes(index)
            
            return (
              <div
                key={category}
                data-index={index}
                className={`skill-card group bg-white dark:bg-dark-900 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105 border border-gray-100 dark:border-dark-700 relative overflow-hidden ${
                  isVisible ? 'animate-slide-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredSkill(category)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                {/* Header */}
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${colorClass} text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{level}%</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Proficiency</div>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="mb-4 relative z-10">
                  <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${colorClass} rounded-full transition-all duration-1000 ease-out`}
                      style={{ 
                        width: isVisible ? `${level}%` : '0%',
                        transitionDelay: `${index * 100 + 300}ms`
                      }}
                    ></div>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors relative z-10">
                  {category}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                  {skillList.slice(0, hoveredSkill === category ? skillList.length : 3).map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className={`px-3 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium hover:bg-gradient-to-r hover:${colorClass} hover:text-white transition-all cursor-default transform hover:scale-105`}
                    >
                      {skill}
                    </span>
                  ))}
                  {skillList.length > 3 && hoveredSkill !== category && (
                    <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-full text-xs font-medium">
                      +{skillList.length - 3} more
                    </span>
                  )}
                </div>

                {/* Skill count and experience indicator */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-dark-700 relative z-10">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>{skillList.length} skills</span>
                  </div>
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${colorClass} animate-pulse`}></div>
                </div>

                {/* Hover effect particles */}
                {hoveredSkill === category && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(5)].map((_, i) => (
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

        {/* Enhanced skills summary */}
        <div className="text-center animate-fade-in">
          <div className="bg-gradient-to-r from-white via-primary-50 to-white dark:from-dark-900 dark:via-primary-900/10 dark:to-dark-900 rounded-3xl p-10 shadow-2xl max-w-5xl mx-auto border border-primary-100 dark:border-primary-800/20">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center justify-center gap-3">
              <Award className="w-8 h-8 text-primary-500" />
              Core Expertise & Leadership
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 text-lg">
              Specialized in <span className="text-primary-600 font-semibold">Java 8 ecosystem</span> with 
              extensive experience in <span className="text-primary-600 font-semibold">Spring Boot microservices</span>, 
              <span className="text-primary-600 font-semibold"> AWS cloud services</span>, and modern development practices. 
              Currently leading teams with expertise in <span className="text-primary-600 font-semibold">HLD/LLD design</span> and 
              <span className="text-primary-600 font-semibold"> system architecture</span>. 
              Expanding expertise in <span className="text-primary-600 font-semibold">GenAI and MCP technologies</span> 
              to stay at the forefront of software innovation.
            </p>

            {/* Skill highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-white dark:bg-dark-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">5+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-dark-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">8</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Skill Categories</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-dark-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">25+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Technologies</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-dark-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">90%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Avg Proficiency</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills