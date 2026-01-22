import { useEffect, useState } from 'react';

const CodeBackground = () => {
  const [codeElements, setCodeElements] = useState([]);

  // Code snippets and symbols for animation
  const codeSnippets = [
    '{ }', '< />', '( )', '[ ]', '=>', '&&', '||', '++', '--', '===', '!==',
    'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while',
    'class', 'extends', 'import', 'export', 'async', 'await', 'try', 'catch',
    'Java', 'Spring', 'AWS', 'API', 'REST', 'JSON', 'HTTP', 'SQL', 'NoSQL',
    'Docker', 'K8s', 'CI/CD', 'Git', 'npm', 'yarn', 'webpack', 'babel',
    '0101', '1010', '1100', '0011', '1001', '0110', '1111', '0000',
    '@Override', '@Service', '@Component', '@Autowired', '@RestController',
    'public', 'private', 'static', 'void', 'String', 'int', 'boolean',
    'SELECT', 'FROM', 'WHERE', 'JOIN', 'INSERT', 'UPDATE', 'DELETE',
    'microservices', 'architecture', 'scalable', 'performance', 'optimization'
  ];

  const colors = [
    'rgba(14, 165, 233, 0.1)', // primary blue
    'rgba(139, 92, 246, 0.1)', // purple
    'rgba(236, 72, 153, 0.1)', // pink
    'rgba(34, 197, 94, 0.1)', // green
    'rgba(249, 115, 22, 0.1)', // orange
    'rgba(168, 85, 247, 0.1)', // violet
  ];

  useEffect(() => {
    const generateCodeElements = () => {
      const elements = [];
      const numberOfElements = 50;

      for (let i = 0; i < numberOfElements; i++) {
        elements.push({
          id: i,
          text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 0.8 + 0.4, // 0.4 to 1.2
          opacity: Math.random() * 0.3 + 0.1, // 0.1 to 0.4
          color: colors[Math.floor(Math.random() * colors.length)],
          duration: Math.random() * 20 + 15, // 15 to 35 seconds
          delay: Math.random() * 10, // 0 to 10 seconds delay
          direction: Math.random() > 0.5 ? 1 : -1, // left or right movement
        });
      }
      setCodeElements(elements);
    };

    generateCodeElements();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(14, 165, 233, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(14, 165, 233, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }}
        />
      </div>

      {/* Floating code elements */}
      {codeElements.map((element) => (
        <div
          key={element.id}
          className="absolute font-mono text-xs font-medium select-none"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            fontSize: `${element.size}rem`,
            color: element.color,
            opacity: element.opacity,
            animation: `
              codeFloat${element.direction > 0 ? 'Right' : 'Left'} ${element.duration}s linear infinite,
              codeFade ${element.duration}s ease-in-out infinite
            `,
            animationDelay: `${element.delay}s`,
            transform: 'translateZ(0)', // Hardware acceleration
          }}
        >
          {element.text}
        </div>
      ))}

      {/* Binary rain effect */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(20)].map((_, i) => (
          <div
            key={`binary-${i}`}
            className="absolute font-mono text-xs"
            style={{
              left: `${(i * 5) + Math.random() * 3}%`,
              color: 'rgba(14, 165, 233, 0.3)',
              animation: `binaryRain ${15 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            {Array.from({ length: 20 }, () => Math.random() > 0.5 ? '1' : '0').join('')}
          </div>
        ))}
      </div>

      {/* Subtle circuit pattern */}
      <div className="absolute inset-0 opacity-3">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="circuit" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <path
                d="M50 50 L150 50 L150 150 M100 50 L100 100 L50 100 M150 100 L200 100"
                stroke="rgba(14, 165, 233, 0.1)"
                strokeWidth="1"
                fill="none"
              />
              <circle cx="50" cy="50" r="2" fill="rgba(14, 165, 233, 0.2)" />
              <circle cx="150" cy="50" r="2" fill="rgba(139, 92, 246, 0.2)" />
              <circle cx="100" cy="100" r="2" fill="rgba(34, 197, 94, 0.2)" />
              <circle cx="150" cy="150" r="2" fill="rgba(236, 72, 153, 0.2)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      {/* CSS Animations - moved to index.css */}
    </div>
  );
};

export default CodeBackground;