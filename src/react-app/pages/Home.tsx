import { Link } from 'react-router';
import { Brain, CheckCircle, Clock, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-8 shadow-lg">
            <Brain className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            CerebroTest
          </h1>
          
          <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
            Descubra seu perfil de preferência cerebral através de uma avaliação completa e científica
          </p>
          
          <p className="text-gray-500 mb-8">
            <strong>JL Consultoria e Coach Empresarial</strong>
          </p>

          <Link
            to="/assessment"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-lg font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-xl"
          >
            Iniciar Teste Gratuito
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow duration-200">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-6">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Rápido e Eficiente
            </h3>
            <p className="text-gray-600">
              25 questões cuidadosamente elaboradas que levam apenas 5-10 minutos para completar.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow duration-200">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Resultado Detalhado
            </h3>
            <p className="text-gray-600">
              Análise completa do seu perfil com descrições detalhadas e insights personalizados.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow duration-200">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Aplicação Profissional
            </h3>
            <p className="text-gray-600">
              Desenvolvido para uso em coaching empresarial e desenvolvimento pessoal.
            </p>
          </div>
        </div>

        {/* About the Test */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Sobre o Teste de Preferência Cerebral
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-600 mb-4">
                O teste avalia quatro perfis principais de preferência cerebral, ajudando você a entender melhor seu estilo de pensamento e comportamento:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong className="text-purple-600">Idealista (I):</strong>
                    <span className="text-gray-600"> Criativo, visionário e inovador</span>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong className="text-blue-600">Colaborativo (C):</strong>
                    <span className="text-gray-600"> Social, empático e orientado para pessoas</span>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong className="text-green-600">Organizador (O):</strong>
                    <span className="text-gray-600"> Metódico, confiável e focado em detalhes</span>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong className="text-orange-600">Assertivo (A):</strong>
                    <span className="text-gray-600"> Determinado, focado em resultados e orientado para ação</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-8">
                <Brain className="w-24 h-24 text-indigo-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Autoconhecimento
                </h3>
                <p className="text-gray-600">
                  Descubra seus pontos fortes e áreas de desenvolvimento para crescimento pessoal e profissional.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Pronto para descobrir seu perfil?
          </h2>
          <p className="text-gray-600 mb-8">
            Comece agora mesmo e tenha acesso ao seu resultado detalhado em poucos minutos.
          </p>
          <Link
            to="/assessment"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-lg font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-xl"
          >
            Começar Teste Agora
          </Link>
        </div>
      </div>
    </div>
  );
}
