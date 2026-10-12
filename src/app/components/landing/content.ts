import { AUTH_MAINTENANCE_ENABLED } from "@/config/maintenance";

// Conteúdo da landing page.
// Os textos refletem funcionalidades que existem no app (geração de listas,
// filtros por competência/habilidade, revisão de respostas, ranking beta etc.).

export const WHATSAPP_COMMUNITY_URL =
  "https://chat.whatsapp.com/Ijj7nbXUWJs3gVH5qxXGBS?mode=ac_t";

export const navLinks = [
  { href: "#funcionalidades", label: "Funcionalidades" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#planos", label: "Plano grátis" },
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
  "Perder tempo procurando questões para treinar",
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
    a: "Sim. O uso da plataforma é gratuito durante o beta, sem cartão de crédito. Durante a manutenção, login e cadastro ficam temporariamente indisponíveis.",
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
    a: "Você pode conhecer a plataforma pelo celular, mas o painel de estudos ainda fica indisponível em telas pequenas. Para resolver suas listas quando o acesso estiver disponível, use um notebook ou tablet. Os apps para iOS e Android serão lançados em breve.",
  },
  {
    q: "Por que não consigo entrar ou criar uma conta?",
    a: AUTH_MAINTENANCE_ENABLED
      ? "A plataforma está em manutenção. Os formulários continuam visíveis, mas login e cadastro estão temporariamente indisponíveis, inclusive com Google. Acompanhe as novidades na comunidade no WhatsApp."
      : "Confira os dados informados e a mensagem exibida no formulário. Se o problema continuar, entre em contato pelo e-mail suporte@enemquest.com.br.",
  },
  {
    q: "Preciso entender competências e habilidades para começar?",
    a: "Não. Você pode começar escolhendo apenas as áreas que quer treinar. Competência é um conjunto mais amplo de conhecimentos; habilidade é uma ação específica dentro dele. Esses filtros são opcionais e ajudam a refinar suas listas.",
  },
  {
    q: "Posso escolher a quantidade de questões da lista?",
    a: "Sim. Ao gerar uma lista, você pode definir um total geral, uma quantidade por área ou quantidades específicas para cada área selecionada. A geração depende das questões disponíveis para os filtros escolhidos.",
  },
  {
    q: "Quais áreas posso estudar?",
    a: "As quatro áreas das questões objetivas do ENEM: Linguagens, Ciências Humanas, Ciências da Natureza e Matemática. Você escolhe quais deseja incluir na sua lista.",
  },
  {
    q: "Quando vejo o resultado das minhas respostas?",
    a: "Ao concluir e enviar a lista, você recebe a correção automática, com acertos, erros e aproveitamento. Antes de enviar, pode revisar as alternativas marcadas e as questões que ficaram em branco.",
  },
  {
    q: "Meu aproveitamento equivale à nota oficial do ENEM?",
    a: "Não. O aproveitamento mostra seus acertos na lista e serve para acompanhar a prática. Ele não equivale à nota oficial do ENEM nem garante um resultado na prova.",
  },
  {
    q: "Já posso baixar o aplicativo para iOS ou Android?",
    a: "Ainda não. Os aplicativos estão previstos para iOS e Android, mas não estão disponíveis para download e ainda não há uma data de lançamento anunciada. Acompanhe as novidades pela comunidade no WhatsApp.",
  },
  {
    q: "O ENEM Quest é uma plataforma oficial do INEP?",
    a: "Não. O ENEM Quest é uma plataforma independente de estudos e não possui vínculo com o INEP ou o MEC. As questões utilizadas têm origem em provas anteriores do ENEM.",
  },
  {
    q: "Onde consulto a política de privacidade e os termos?",
    a: "O link para a política de privacidade e os termos de uso está no rodapé desta página. Para dúvidas sobre sua conta ou solicitações relacionadas aos seus dados, escreva para suporte@enemquest.com.br.",
  },
  {
    q: "Encontrei um erro ou tenho uma ideia. Como aviso?",
    a: "Entre na nossa comunidade no WhatsApp. É por lá que recebemos sugestões, relatos de bugs e decidimos as próximas funcionalidades.",
  },
];
