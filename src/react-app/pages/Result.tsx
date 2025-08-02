import { useLocation, Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';

type AnswerType = 'I' | 'C' | 'O' | 'A';

interface AssessmentAnswer {
  answer: AnswerType;
  // Adicione outros campos se necessário
}

export default function Result() {
  const location = useLocation();
  const { userName, userAge, userCompany, assessmentAnswers } = location.state || {};

  // Verifica se assessmentAnswers existe e tem dados
  if (!assessmentAnswers || !Array.isArray(assessmentAnswers) || assessmentAnswers.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Resultado não disponível
          </h2>
          <p className="text-gray-600 mb-6">
            Não é possível exibir o resultado. Verifique se o teste foi enviado corretamente.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar ao Início
          </Link>
        </div>
      </div>
    );
  }

  const scores: Record<AnswerType, number> = { I: 0, C: 0, O: 0, A: 0 };
  assessmentAnswers.forEach((a: AssessmentAnswer) => {
    // Garante que a resposta é válida
    if (scores[a.answer] !== undefined) {
      scores[a.answer]++;
    }
  });
  const dominantType = (Object.entries(scores) as [AnswerType, number][])
    .reduce((a, b) => a[1] > b[1] ? a : b)[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Resultado do Teste
        </h2>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Nome:</span> {userName}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Idade:</span> {userAge}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Empresa:</span> {userCompany}
        </p>
        <p className="text-gray-600 mb-4">
          <span className="font-semibold">Tipo dominante:</span> {dominantType}
        </p>
        <div className="mb-4">
          <span className="font-semibold">Pontuações:</span>
          <pre className="text-left text-gray-700">{JSON.stringify(scores, null, 2)}</pre>
        </div>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar ao Início
        </Link>
      </div>
    </div>
  );
}
