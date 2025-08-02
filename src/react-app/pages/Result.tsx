import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const typeDescriptions: Record<string, string> = {
  I: "Idealista: Pessoas criativas, inovadoras e com visão de futuro.",
  C: "Colaborativo: Pessoas que valorizam o trabalho em equipe e a harmonia.",
  O: "Organizador: Pessoas práticas, detalhistas e focadas em processos.",
  A: "Assertivo: Pessoas determinadas, objetivas e orientadas para resultados."
};

const typeColors: Record<string, string> = {
  I: "bg-indigo-500",
  C: "bg-green-500",
  O: "bg-yellow-500",
  A: "bg-pink-500"
};

export default function Result() {
  const location = useLocation();
  const { userName, userAge, userCompany, scores, dominantType } = location.state || {};

  if (!scores || !dominantType) {
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

  const total = Object.values(scores).reduce((acc, val) => acc + val, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
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
        <div className="my-6">
          <span className="font-semibold text-lg">Tipo dominante:</span>
          <span className={`ml-2 px-3 py-1 rounded-full text-white font-bold ${typeColors[dominantType]}`}>
            {dominantType}
          </span>
          <div className="mt-2 text-gray-700 text-sm italic">
            {typeDescriptions[dominantType]}
          </div>
        </div>
        <div className="mb-6">
          <span className="font-semibold text-lg">Pontuações:</span>
          <div className="mt-2 space-y-3">
            {Object.entries(scores).map(([type, value]) => (
              <div key={type} className="text-left">
                <div className="flex justify-between mb-1">
                  <span className="font-semibold">{type}</span>
                  <span>{value} ({((value / total) * 100).toFixed(1)}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className={`${typeColors[type]} h-4 rounded-full transition-all`}
                    style={{ width: `${(value / total) * 100}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">{typeDescriptions[type]}</div>
              </div>
            ))}
          </div>
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
