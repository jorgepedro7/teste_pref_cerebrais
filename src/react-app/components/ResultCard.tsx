import { AssessmentResult } from '@/shared/types';

interface ResultCardProps {
  result: AssessmentResult;
}

const typeDescriptions = {
  I: {
    name: 'Idealista',
    description: 'Criativo, visionário e inovador. Gosta de explorar novas possibilidades e questionar o status quo.',
    color: 'from-purple-500 to-pink-500',
    traits: ['Criativo', 'Visionário', 'Inovador', 'Questionador']
  },
  C: {
    name: 'Colaborativo',
    description: 'Social, empático e orientado para pessoas. Valoriza relacionamentos e trabalho em equipe.',
    color: 'from-blue-500 to-cyan-500',
    traits: ['Empático', 'Social', 'Colaborativo', 'Compreensivo']
  },
  O: {
    name: 'Organizador',
    description: 'Metódico, confiável e focado em detalhes. Gosta de estrutura e planejamento.',
    color: 'from-green-500 to-teal-500',
    traits: ['Metódico', 'Confiável', 'Detalhista', 'Planejador']
  },
  A: {
    name: 'Assertivo',
    description: 'Determinado, focado em resultados e orientado para ação. Gosta de liderar e competir.',
    color: 'from-orange-500 to-red-500',
    traits: ['Determinado', 'Focado', 'Líder', 'Competitivo']
  }
};

export default function ResultCard({ result }: ResultCardProps) {
  const dominantType = result.dominantType as keyof typeof typeDescriptions;
  const typeInfo = typeDescriptions[dominantType];
  
  const scores = [
    { type: 'I', name: 'Idealista', score: result.iScore },
    { type: 'C', name: 'Colaborativo', score: result.cScore },
    { type: 'O', name: 'Organizador', score: result.oScore },
    { type: 'A', name: 'Assertivo', score: result.aScore }
  ];

  const maxScore = Math.max(result.iScore, result.cScore, result.oScore, result.aScore);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Resultado do Teste
        </h1>
        <p className="text-xl text-gray-600">
          Olá, <span className="font-semibold">{result.userName}</span>!
        </p>
        {(result.userAge || result.userCompany) && (
          <div className="text-sm text-gray-500 mt-2">
            {result.userAge && <span>{result.userAge} anos</span>}
            {result.userAge && result.userCompany && <span> • </span>}
            {result.userCompany && <span>{result.userCompany}</span>}
          </div>
        )}
      </div>

      {/* Dominant Type Card */}
      <div className={`bg-gradient-to-r ${typeInfo.color} rounded-2xl p-8 text-white shadow-2xl`}>
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            Seu Perfil Dominante: {typeInfo.name}
          </h2>
          <p className="text-lg mb-6 opacity-90">
            {typeInfo.description}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {typeInfo.traits.map((trait) => (
              <span
                key={trait}
                className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scores Breakdown */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Distribuição das Suas Preferências
        </h3>
        <div className="space-y-6">
          {scores.map(({ type, name, score }) => {
            const percentage = (score / 25) * 100;
            const isHighest = score === maxScore;
            
            return (
              <div key={type} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className={`font-semibold ${isHighest ? 'text-indigo-600' : 'text-gray-700'}`}>
                    {name} ({type})
                  </span>
                  <span className={`font-bold ${isHighest ? 'text-indigo-600' : 'text-gray-600'}`}>
                    {score}/25 ({Math.round(percentage)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full transition-all duration-500 ${
                      isHighest 
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600' 
                        : 'bg-gradient-to-r from-gray-400 to-gray-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-600">
        <p className="mb-2">
          <strong>JL Consultoria e Coach Empresarial</strong>
        </p>
        <p className="text-sm">
          Teste realizado em{' '}
          {new Date(result.createdAt).toLocaleString('pt-BR')}
        </p>
      </div>
    </div>
  );
}
