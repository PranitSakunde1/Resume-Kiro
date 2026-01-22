import { Briefcase, Calendar, MapPin, ChevronRight, Building, Users, Award } from 'lucide-react'
import { resumeData } from '../data/resumeData'

const Experience = () => {
  const { experience } = resumeData

  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-white/50 via-gray-50/50 to-primary-50/50 dark:from-dark-900/50 dark:via-dark-800/50 dark:to-dark-900/50 relative overflow-hidden">

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
          {/* Modern flowing timeline line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary-300 to-transparent dark:via-primary-600 opacity-50"></div>

          <div className="space-y-12">
            {experience.map((job, index) => (
              <div
                key={job.id}
                className={`relative animate-slide-up`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Modern timeline connector */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-8 z-10">
                  <div className="relative">
                    {/* Connection line to card */}
                    <div className={`w-16 h-px bg-gradient-to-r ${job.type === 'current' ? 'from-green-400 to-emerald-500' : 'from-primary-400 to-primary-600'} ${index % 2 === 0 ? 'md:rotate-0' : 'md:rotate-180'}`}></div>
                    
                    {/* Modern indicator - hexagon shape */}
                    <div className={`absolute ${index % 2 === 0 ? 'right-0' : 'left-0'} top-1/2 transform -translate-y-1/2 ${index % 2 === 0 ? 'translate-x-4' : '-translate-x-4'}`}>
                      <div className={`w-4 h-4 transform rotate-45 bg-gradient-to-br ${job.type === 'current' ? 'from-green-500 to-emerald-600' : 'from-primary-500 to-primary-700'} shadow-lg`}>
                        <div className="absolute inset-0.5 bg-white dark:bg-dark-900 transform -rotate-45 rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Layout */}
                <div className="flex flex-col md:flex-row items-start gap-8 ml-16 md:ml-0">
                  
                  {/* Year Badge - Left side for even, right side for odd */}
                  <div className={`md:w-48 ${index % 2 === 0 ? 'md:order-1' : 'md:order-3'} ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    <div className={`relative group ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      {/* Year display */}
                      <div className="inline-block">
                        <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                          {job.duration.split(' - ')[0]}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                          {job.type === 'current' ? 'Present' : job.duration.split(' - ')[1]}
                        </div>
                        
                        {/* Status indicator */}
                        {job.type === 'current' && (
                          <div className={`inline-flex items-center gap-2 mt-2 px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full text-xs font-bold ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            Current
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Main Content Card */}
                  <div className="md:order-2 flex-1 max-w-2xl">
                    <div className="group relative bg-white dark:bg-dark-900 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-dark-700 overflow-hidden">
                      
                      {/* Card header with gradient accent */}
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${job.type === 'current' ? 'from-green-400 to-emerald-500' : 'from-primary-400 to-primary-600'}`}></div>
                      
                      {/* Floating background element */}
                      <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-primary-100 to-purple-100 dark:from-primary-900/20 dark:to-purple-900/20 rounded-full opacity-50 group-hover:scale-150 group-hover:opacity-30 transition-all duration-700"></div>
                      
                      <div className="relative z-10">
                        {/* Job Title */}
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {job.position}
                        </h3>
                        
                        {/* Company and Client */}
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <div className="flex items-center gap-2 px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full text-sm font-semibold">
                            <Building className="w-4 h-4" />
                            {job.company}
                          </div>
                          {job.client && (
                            <>
                              <span className="text-gray-400 text-sm">for</span>
                              <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
                                {job.client}
                              </div>
                            </>
                          )}
                        </div>

                        {/* Project and Team Info */}
                        {(job.project || job.teamSize) && (
                          <div className="flex flex-wrap items-center gap-4 mb-4 p-3 bg-gray-50 dark:bg-dark-800 rounded-lg">
                            {job.project && (
                              <div className="flex items-center gap-2 text-sm">
                                <Award className="w-4 h-4 text-primary-500" />
                                <span className="font-medium text-gray-700 dark:text-gray-300">{job.project}</span>
                              </div>
                            )}
                            {job.teamSize && (
                              <div className="flex items-center gap-2 text-sm">
                                <Users className="w-4 h-4 text-primary-500" />
                                <span className="font-medium text-gray-700 dark:text-gray-300">Leading {job.teamSize}</span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Description */}
                        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                          {job.description}
                        </p>

                        {/* Achievements */}
                        {job.achievements && job.achievements.length > 0 && (
                          <div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                              <Award className="w-5 h-5 text-primary-500" />
                              Key Achievements
                            </h4>
                            <div className="space-y-3">
                              {job.achievements.map((achievement, achIndex) => (
                                <div key={achIndex} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-dark-800 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-colors group/achievement">
                                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0 group-hover/achievement:scale-150 transition-transform"></div>
                                  <span className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">{achievement}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
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
              5+ Years of Leadership Excellence
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 text-lg">
              From Software Engineer to Technical Lead at Quest Global, I've consistently delivered high-quality solutions for HP Inc., 
              led cross-functional teams of up to 8 members, and driven innovation in enterprise-level healthcare applications. 
              My experience spans the full software development lifecycle, from HLD/LLD creation to production deployment, 
              with expertise in system architecture design and team mentorship.
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