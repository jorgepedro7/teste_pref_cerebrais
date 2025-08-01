import z from "zod";

export const AssessmentAnswerSchema = z.object({
  questionId: z.number(),
  answer: z.enum(['I', 'C', 'O', 'A']),
});

export const AssessmentSubmissionSchema = z.object({
  userName: z.string().min(1, "Nome é obrigatório"),
  userAge: z.number().min(1, "Idade é obrigatória").max(120, "Idade deve ser válida"),
  userCompany: z.string().min(1, "Empresa é obrigatória"),
  answers: z.array(AssessmentAnswerSchema).length(25, "Todas as 25 questões devem ser respondidas"),
});

export const AssessmentResultSchema = z.object({
  id: z.number(),
  userName: z.string(),
  userAge: z.number().optional(),
  userCompany: z.string().optional(),
  iScore: z.number(),
  cScore: z.number(),
  oScore: z.number(),
  aScore: z.number(),
  dominantType: z.string(),
  createdAt: z.string(),
});

export type AssessmentAnswer = z.infer<typeof AssessmentAnswerSchema>;
export type AssessmentSubmission = z.infer<typeof AssessmentSubmissionSchema>;
export type AssessmentResult = z.infer<typeof AssessmentResultSchema>;

export interface Question {
  id: number;
  text: string;
  options: {
    I: string;
    C: string;
    O: string;
    A: string;
  };
}

export const questions: Question[] = [
  {
    id: 1,
    text: "Eu sou...",
    options: {
      I: "Idealista, criativo e visionário",
      C: "Divertido, espiritual e benéfico",
      O: "Confiável, meticuloso e previsível",
      A: "Focado, determinado e persistente"
    }
  },
  {
    id: 2,
    text: "Eu gosto de...",
    options: {
      A: "Ser piloto",
      C: "Conversar com os passageiros",
      O: "Planejar a viagem",
      I: "Explorar novas rotas"
    }
  },
  {
    id: 3,
    text: "Se você quiser se dar bem comigo...",
    options: {
      I: "Me dê liberdade",
      O: "Me deixe saber sua expectativa",
      A: "Lidere, siga ou saia do caminho",
      C: "Seja amigável, carinhoso e compreensivo"
    }
  },
  {
    id: 4,
    text: "Para conseguir obter bons resultados é preciso...",
    options: {
      I: "Ter incertezas",
      O: "Controlar o essencial",
      C: "Diversão e celebração",
      A: "Planejar e obter recursos"
    }
  },
  {
    id: 5,
    text: "Eu me divirto quando...",
    options: {
      A: "Estou me exercitando",
      I: "Tenho novidades",
      C: "Estou com os outros",
      O: "Determino as regras"
    }
  },
  {
    id: 6,
    text: "Eu penso que...",
    options: {
      C: "Unidos venceremos, divididos perderemos",
      A: "O ataque é melhor que a defesa",
      I: "É bom ser manso, mas andar com um porrete",
      O: "Um homem prevenido vale por dois"
    }
  },
  {
    id: 7,
    text: "Minha preocupação é...",
    options: {
      I: "Gerar a ideia global",
      C: "Fazer com que as pessoas gostem",
      O: "Fazer com que funcione",
      A: "Fazer com que aconteça"
    }
  },
  {
    id: 8,
    text: "Eu prefiro...",
    options: {
      I: "Perguntas a respostas",
      O: "Ter todos os detalhes",
      A: "Vantagens a meu favor",
      C: "Que todos tenham a chance de ser ouvidos"
    }
  },
  {
    id: 9,
    text: "Eu gosto de...",
    options: {
      A: "Fazer progresso",
      C: "Construir memórias",
      O: "Fazer sentido",
      I: "Tornar as pessoas confortáveis"
    }
  },
  {
    id: 10,
    text: "Eu gosto de chegar...",
    options: {
      A: "Na frente",
      C: "Junto",
      O: "Na hora",
      I: "Em outro lugar"
    }
  },
  {
    id: 11,
    text: "Um ótimo dia para mim é quando...",
    options: {
      A: "Consigo fazer muitas coisas",
      C: "Me divirto com meus amigos",
      O: "Tudo segue conforme planejado",
      I: "Desfruto de coisas novas e estimulantes"
    }
  },
  {
    id: 12,
    text: "Eu vejo a morte como...",
    options: {
      I: "Uma grande aventura misteriosa",
      C: "Oportunidade de rever os falecidos",
      O: "Um modo de receber recompensas",
      A: "Algo que sempre chega muito cedo"
    }
  },
  {
    id: 13,
    text: "Minha filosofia de vida é...",
    options: {
      A: "Há ganhadores e perdedores, e eu acredito ser um ganhador",
      C: "Para eu ganhar, ninguém precisa perder",
      O: "Para ganhar é preciso seguir as regras",
      I: "Para ganhar, é necessário inventar novas regras"
    }
  },
  {
    id: 14,
    text: "Eu sempre gostei de...",
    options: {
      I: "Explorar",
      O: "Evitar surpresas",
      A: "Focalizar a meta",
      C: "Realizar uma abordagem natural"
    }
  },
  {
    id: 15,
    text: "Eu gosto de mudanças se...",
    options: {
      A: "Me der uma vantagem competitiva",
      C: "For divertido e puder ser compartilhado",
      I: "Me der mais liberdade e variedade",
      O: "Melhorar ou me der mais controle"
    }
  },
  {
    id: 16,
    text: "Não existe nada de errado em...",
    options: {
      A: "Se colocar na frente",
      C: "Colocar os outros na frente",
      I: "Mudar de ideia",
      O: "Ser consistente"
    }
  },
  {
    id: 17,
    text: "Eu gosto de buscar conselhos de...",
    options: {
      A: "Pessoas bem-sucedidas",
      C: "Anciões e conselheiros",
      O: "Autoridades no assunto",
      I: "Lugares, os mais estranhos"
    }
  },
  {
    id: 18,
    text: "Meu lema é...",
    options: {
      I: "Fazer o que precisa ser feito",
      O: "Fazer bem feito",
      C: "Fazer junto com o grupo",
      A: "Simplesmente fazer"
    }
  },
  {
    id: 19,
    text: "Eu gosto de...",
    options: {
      I: "Complexidade, mesmo se confuso",
      O: "Ordem e sistematização",
      C: "Calor humano e animação",
      A: "Coisas claras e simples"
    }
  },
  {
    id: 20,
    text: "Tempo para mim é...",
    options: {
      A: "Algo que detesto desperdiçar",
      C: "Um grande ciclo",
      O: "Uma flecha que leva ao inevitável",
      I: "Irrelevante"
    }
  },
  {
    id: 21,
    text: "Se eu fosse bilionário...",
    options: {
      C: "Faria doações para entidades",
      O: "Criaria uma poupança avantajada",
      I: "Faria o que desse na cabeça",
      A: "Exibiria bastante com algumas pessoas"
    }
  },
  {
    id: 22,
    text: "Eu acredito que...",
    options: {
      A: "O destino é mais importante que a jornada",
      C: "A jornada é mais importante que o destino",
      O: "Um centavo economizado é um centavo ganho",
      I: "Bastam um navio e uma estrela para navegar"
    }
  },
  {
    id: 23,
    text: "Eu acredito também que...",
    options: {
      A: "Aquele que hesita está perdido",
      O: "De grão em grão a galinha enche o papo",
      C: "O que vai, volta",
      I: "Um sorriso ou uma careta é o mesmo para quem é cego"
    }
  },
  {
    id: 24,
    text: "Eu acredito ainda que...",
    options: {
      O: "É melhor prudência do que arrependimento",
      I: "A autoridade deve ser desafiada",
      A: "Ganhar é fundamental",
      C: "O coletivo é mais importante do que o individual"
    }
  },
  {
    id: 25,
    text: "Eu penso que...",
    options: {
      I: "Não é fácil ficar encurralado",
      O: "É preferível olhar, antes de pular",
      C: "Duas cabeças pensam melhor que do que uma",
      A: "Se você não tem condições de competir, não compita"
    }
  }
];
