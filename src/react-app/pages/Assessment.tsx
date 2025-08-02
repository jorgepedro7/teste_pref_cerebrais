import { useState } from 'react';
import { useNavigate } from 'react-router';
import { questions, AssessmentAnswer } from '@/shared/types';
import ProgressBar from '@/react-app/components/ProgressBar';
import QuestionCard from '@/react-app/components/QuestionCard';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';

export default function Assessment() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userCompany, setUserCompany] = useState('');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNameInput, setShowNameInput] = useState(true);

  /* ------------------------------------------------------------------
     Handlers – coleta dados iniciais do usuário
  ------------------------------------------------------------------ */
  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim() && userAge.trim() && userCompany.trim()) {
      setShowNameInput(false);
    }
  };

  /* ------------------------------------------------------------------
     Seleção de respostas & navegação entre questões
  ------------------------------------------------------------------ */
  const handleAnswerSelect = (answer: 'I' | 'C' | 'O' | 'A') => {
    setAnswers(prev => ({ ...prev, [questions[currentQuestion].id]: answer }));
  };
  const handleNext = () => currentQuestion < questions.length - 1 && setCurrentQuestion(q => q + 1);
  const handlePrevious = () => currentQuestion > 0 && setCurrentQuestion(q => q - 1);

  /* ------------------------------------------------------------------
     SUBMIT – envia direto ao webhook n8n (sem backend /api/assessment)
  ------------------------------------------------------------------ */
  const handleSubmit = async () => {
    setIsSubmitting(true);

    const assessmentAnswers: AssessmentAnswer[] = questions.map(q => ({
      questionId: q.id,
      answer: answers[q.id] as 'I' | 'C' | 'O' | 'A',
    }));

    const payload = {
      timestamp: new Date().toISOString(),
      user: {
        name: userName,
        age: parseInt(userAge, 10),
        company: userCompany,
      },
      answers: assessmentAnswers,
    };

    try {
      const res = await fetch(
        'https://n8nwebhook.projetosjl.com.br/webhook/back-forms-respostas',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        alert('Respostas enviadas com sucesso!');
        navigate('/'); // volta à home ou ajuste conforme sua rota de resultado.
      } else {
        throw new Error('Falha ao enviar o teste');
      }
    } catch (error) {
      console.error('Erro ao enviar:', error);
      alert('Ocorreu um erro ao enviar o teste. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ------------------------------------------------------------------
     Cálculos auxiliares
  ------------------------------------------------------------------ */
  const currentAnswer = answers[questions[currentQuestion]?.id];
  const canProceed = currentAnswer !== undefined;
  const allQuestionsAnswered = questions.every(q => answers[q.id] !== undefined);

  /* ------------------------------------------------------------------
     Tela inicial – coleta de nome/idade/empresa
  ------------------------------------------------------------------ */
  if (showNameInput) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-100">
          {/* Título */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">CerebroTest</h1>
            <p className="text-gray-600">Teste de Avaliação de Preferência Cerebral</p>
            <p className="text-sm text-gray-500 mt-4"><strong>JL Consultoria e Coach Empresarial</strong></p>
          </div>

          {/* Formulário de identificação */}
          <form onSubmit={handleNameSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Nome completo</label>
              <input id="name" type="text" required value={userName} onChange={e => setUserName(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" placeholder="Digite seu nome completo" />
            </div>
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">Idade</label>
              <input id="age" type="number" required min="1" max="120" value={userAge} onChange={e => setUserAge(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" placeholder="Digite sua idade" />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">Empresa onde trabalha</label>
              <input id="company" type="text" required value={userCompany} onChange={e => setUserCompany(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" placeholder="Digite o nome da empresa" />
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg">Começar Teste</button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>O teste contém 25 questões e leva cerca de 5-10 minutos para completar.</p>
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------
     Fluxo principal do questionário
  ------------------------------------------------------------------ */
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="max-w-3xl mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">CerebroTest</h1>
          <p className="text-gray-600">Olá, <span className="font-semibold">{userName}</span>! Responda cada questão escolhendo a alternativa que mais se identifica com você.</p>
        </div>

        <ProgressBar current={currentQuestion + 1} total={questions.length} />
        <QuestionCard question={questions[currentQuestion]} selectedAnswer={currentAnswer} onAnswerSelect={handleAnswerSelect} />

        {/* Navegação de botões */}
        <div className="flex justify-between items-center mt-8">
          <button onClick={handlePrevious} disabled={currentQuestion === 0} className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${currentQuestion === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg border border-gray-200'}`}>
            <ChevronLeft className="w-5 h-5 mr-2" /> Anterior
          </button>

          {currentQuestion === questions.length - 1 ? (
            <button onClick={handleSubmit} disabled={!allQuestionsAnswered || isSubmitting} className={`flex items-center px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform ${allQuestionsAnswered && !isSubmitting ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white hover:from-green-600 hover:to-teal-700 hover:scale-105 shadow-lg' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
              {isSubmitting ? <div className="animate-spin w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full" /> : <Send className="w-5 h-5 mr-2" />}
              {isSubmitting ? 'Enviando...' : 'Finalizar Teste'}
            </button>
          ) : (
            <button onClick={handleNext} disabled={!canProceed} className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform ${canProceed ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 hover:scale-105 shadow-lg' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
              Próxima <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          )}
        </div>

        {!allQuestionsAnswered && currentQuestion === questions.length - 1 && (
          <div className="mt-4 text-center text-red-600 text-sm">Responda todas as questões antes de finalizar o teste.</div>
        )}
      </div>
    </div>
  );
}
