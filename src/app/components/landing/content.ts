// Conteúdo da landing page.
// Os textos refletem funcionalidades que existem no app (geração de listas,
// filtros por competência/habilidade, revisão de respostas, ranking beta etc.).

export const WHATSAPP_COMMUNITY_URL =
  "https://chat.whatsapp.com/Ijj7nbXUWJs3gVH5qxXGBS?mode=ac_t";

export const navLinks = [
  { href: "#funcionalidades", label: "Funcionalidades" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#comunidade", label: "Comunidade" },
  { href: "#faq", label: "Dúvidas" },
];

export const areas = [
  {
    code: "LC",
    name: "Linguagens",
    fullName: "Linguagens, Códigos e suas Tecnologias",
    color: "bg-lc-exam",
    text: "text-lc-exam",
    competencias: 9,
  },
  {
    code: "CH",
    name: "Ciências Humanas",
    fullName: "Ciências Humanas e suas Tecnologias",
    color: "bg-ch-exam",
    text: "text-ch-exam",
    competencias: 6,
  },
  {
    code: "CN",
    name: "Ciências da Natureza",
    fullName: "Ciências da Natureza e suas Tecnologias",
    color: "bg-cn-exam",
    text: "text-cn-exam",
    competencias: 8,
  },
  {
    code: "MT",
    name: "Matemática",
    fullName: "Matemática e suas Tecnologias",
    color: "bg-mt-exam",
    text: "text-mt-exam",
    competencias: 7,
  },
] as const;

export const painPoints = [
  "PDFs de provas espalhados em dezenas de abas",
  "Não saber qual habilidade você mais erra",
  "Refazer sem querer questões que já resolveu",
  "Corrigir tudo à mão olhando o gabarito",
];

export const gains = [
  "Questões oficiais organizadas em listas",
  "Filtros por competência e habilidade",
  "Opção de pular questões já respondidas",
  "Correção automática e resultado na hora",
];

export const steps = [
  {
    title: "Crie sua conta",
    description:
      "Cadastre-se com e-mail ou entre direto com sua conta Google. Sem burocracia.",
  },
  {
    title: "Gere sua lista",
    description:
      "Escolha as áreas, defina quantas questões quer e, se quiser, filtre por competências e habilidades.",
  },
  {
    title: "Resolva e revise",
    description:
      "Responda no seu ritmo, revise antes de confirmar e veja questão a questão onde acertou e errou.",
  },
];

export const enemNumbers = [
  { value: 180, label: "questões objetivas por edição" },
  { value: 4, label: "áreas do conhecimento" },
  { value: 30, label: "competências na matriz" },
  { value: 120, label: "habilidades avaliadas" },
];

export const faqs = [
  {
    q: "O ENEM Quest é gratuito?",
    a: "Sim. O ENEM Quest está em beta aberto e você pode criar sua conta e usar a plataforma gratuitamente.",
  },
  {
    q: "De onde vêm as questões?",
    a: "De provas anteriores do ENEM aplicadas pelo INEP. Cada questão traz o ano, a prova, a aplicação e o código INEP, além da área, competência e habilidade a que pertence.",
  },
  {
    q: "Posso estudar só os assuntos em que tenho dificuldade?",
    a: "Pode. Ao gerar uma lista você escolhe as áreas e pode refinar por competências e habilidades da Matriz de Referência do ENEM.",
  },
  {
    q: "Vou ver questões repetidas?",
    a: "Não precisa. Na hora de gerar a lista, ative a opção de pular questões que você já respondeu.",
  },
  {
    q: "Funciona no celular?",
    a: "Por enquanto o painel é otimizado para notebooks e tablets. A versão para celular é prioridade e já está a caminho.",
  },
  {
    q: "Encontrei um erro ou tenho uma ideia. Como aviso?",
    a: "Entre na nossa comunidade no WhatsApp. É por lá que recebemos sugestões, relatos de bugs e decidimos as próximas funcionalidades.",
  },
];
