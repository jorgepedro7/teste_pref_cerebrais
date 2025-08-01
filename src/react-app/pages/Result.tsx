import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { AssessmentResult } from '@/shared/types';
import ResultCard from '@/react-app/components/ResultCard';
import { ArrowLeft, RotateCcw } from 'lucide-react';

export default function Result() {
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResult = async () => {
      if (!id) {
        setError('ID do resultado não encontrado');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/assessment/${id}`);
        if (response.ok) {
          const data = await response.json();
          setResult(data);
        } else {
          throw new Error('Resultado não encontrado');
        }
      } catch (err) {
        setError('Erro ao carregar o resultado');
        console.error('Erro:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600">Carregando seu resultado...</p>
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Resultado não encontrado
          </h2>
          <p className="text-gray-600 mb-6">
            {error || 'O resultado que você está procurando não existe ou expirou.'}
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="max-w-6xl mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Início
          </Link>
          
          <Link
            to="/assessment"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Fazer Novo Teste
          </Link>
        </div>

        <ResultCard result={result} />
      </div>
    </div>
  );
}
