import { Question } from '@/shared/types';

interface QuestionCardProps {
  question: Question;
  selectedAnswer?: string;
  onAnswerSelect: (answer: 'I' | 'C' | 'O' | 'A') => void;
}

export default function QuestionCard({ question, selectedAnswer, onAnswerSelect }: QuestionCardProps) {
  const optionColors = {
    I: 'from-purple-500 to-pink-500',
    C: 'from-blue-500 to-cyan-500', 
    O: 'from-green-500 to-teal-500',
    A: 'from-orange-500 to-red-500'
  };

  const optionHoverColors = {
    I: 'hover:from-purple-600 hover:to-pink-600',
    C: 'hover:from-blue-600 hover:to-cyan-600',
    O: 'hover:from-green-600 hover:to-teal-600',
    A: 'hover:from-orange-600 hover:to-red-600'
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
        {question.text}
      </h2>
      
      <div className="space-y-4">
        {(Object.entries(question.options) as [keyof typeof question.options, string][]).map(([key, option]) => (
          <button
            key={key}
            onClick={() => onAnswerSelect(key)}
            className={`
              w-full p-4 rounded-xl text-left transition-all duration-200 transform
              ${selectedAnswer === key 
                ? `bg-gradient-to-r ${optionColors[key]} text-white shadow-lg scale-105` 
                : `bg-gray-50 hover:bg-gradient-to-r ${optionColors[key]} ${optionHoverColors[key]} hover:text-white hover:shadow-md hover:scale-102`
              }
              border-2 ${selectedAnswer === key ? 'border-transparent' : 'border-gray-200 hover:border-transparent'}
            `}
          >
            <div className="flex items-center">
              <span className={`
                inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold mr-4
                ${selectedAnswer === key 
                  ? 'bg-white/20 text-white' 
                  : 'bg-gray-200 text-gray-600'
                }
              `}>
                {key}
              </span>
              <span className="font-medium">{option}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
