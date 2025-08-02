import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';

export default function Result() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Resultado não disponível
        </h2>
        <p className="text-gray-600 mb-6">
          Não é possível exibir o resultado em ambiente estático.
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
