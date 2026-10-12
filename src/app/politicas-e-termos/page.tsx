import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LandingFooter } from "../components/landing/LandingFooter";
import { Logo } from "../components/layout/Logo";

export const metadata: Metadata = {
  title: "Política de privacidade e termos de uso | ENEM Quest",
  description: "Saiba como o ENEM Quest utiliza dados pessoais e conheça as condições de uso da plataforma.",
};

const sections = [
  { id: "privacidade", title: "Política de privacidade", paragraphs: [
    "Esta política descreve o uso de dados pessoais no ENEM Quest, plataforma de estudos com questões de provas anteriores do ENEM. Para dúvidas sobre privacidade ou solicitações relacionadas aos seus dados, entre em contato pelo e-mail suporte@enemquest.com.br.",
    "O cadastro por e-mail solicita nome, sobrenome, e-mail, nome de usuário, telefone, data de nascimento e senha. O acesso com Google utiliza a autenticação desse serviço e informações de perfil associadas à conta. Também são utilizados os registros de listas, respostas e desempenho gerados durante o estudo.",
    "Esses dados permitem criar e administrar sua conta, autenticar o acesso, organizar suas listas e apresentar resultados e participação no ranking. Os dados necessários ao serviço são tratados para executar a relação com o usuário; obrigações legais e outras finalidades devem observar as bases legais aplicáveis. O aceite dos termos não representa consentimento genérico para qualquer uso de dados.",
  ] },
  { id: "cookies", title: "Cookies e preferências de marketing", paragraphs: [
    "Você pode aceitar ou recusar o uso de pixels de marketing para medir visitas e cliques nos botões de download. A recusa não impede o acesso ao site. Esses recursos dependem de autorização prévia e não devem ser ativados enquanto você não aceitar.",
    "Sua escolha é salva no armazenamento local deste navegador. Para alterá-la, utilize o botão Preferências de cookies no rodapé. Ao limpar os dados do navegador ou acessar por outro dispositivo, poderá ser necessário escolher novamente. No momento, nenhum pixel de marketing está integrado ao site.",
  ] },
  { id: "armazenamento", title: "Armazenamento e serviços externos", paragraphs: [
    "A plataforma utiliza armazenamento local do navegador para manter o token de autenticação. Ao sair da conta, esse token é removido. Você também pode limpar os dados do site nas configurações do navegador; isso pode encerrar seu acesso.",
    "O login com Google depende de um serviço externo, sujeito às próprias políticas de privacidade. A comunidade no WhatsApp é opcional e funciona fora do ENEM Quest. Ao entrar em um grupo, informações do seu perfil e telefone podem ficar visíveis a outros participantes conforme as configurações do WhatsApp.",
    "Dados de conta e estudo precisam ser mantidos enquanto necessários às finalidades do serviço e às obrigações legais aplicáveis. Você pode solicitar informações sobre retenção e exclusão pelo canal de suporte. Evite enviar senhas ou outros dados sensíveis por e-mail ou em grupos públicos.",
  ] },
  { id: "direitos", title: "Seus direitos e contato", paragraphs: [
    "Nos termos da Lei Geral de Proteção de Dados (LGPD), você pode solicitar confirmação do tratamento, acesso, correção e informações sobre compartilhamento. Quando aplicável, também pode solicitar portabilidade, anonimização, bloqueio ou eliminação, revogar consentimento e se opor ao tratamento nas hipóteses previstas em lei.",
    "Envie sua solicitação para suporte@enemquest.com.br. Para proteger sua conta, poderá ser necessário confirmar sua identidade. Pedidos serão avaliados conforme a legislação e eventuais obrigações de conservação de dados.",
    "Se você for menor de idade, envolva seu responsável nas decisões sobre cadastro e compartilhamento de dados. O tratamento de dados de crianças e adolescentes deve respeitar seu melhor interesse e os requisitos legais aplicáveis.",
  ] },
  { id: "termos", title: "Termos de uso", paragraphs: [
    "O ENEM Quest oferece ferramentas de prática e organização de estudos. Ao utilizar a plataforma, forneça informações corretas, mantenha suas credenciais protegidas e respeite os demais usuários. Não utilize o serviço para fraudes, tentativas de acesso indevido, exploração de vulnerabilidades ou ações que prejudiquem seu funcionamento.",
    "As questões têm origem em provas anteriores do ENEM e são apresentadas para estudo. A marca e os elementos próprios da plataforma não autorizam representação em nome do ENEM Quest. O ENEM Quest não possui vínculo com o INEP ou o MEC.",
    "Resultados apresentados nas listas indicam acertos e erros na plataforma. Eles não equivalem à nota oficial do ENEM, não reproduzem necessariamente sua metodologia de avaliação e não garantem aprovação ou desempenho em provas.",
  ] },
  { id: "disponibilidade", title: "Beta, disponibilidade e atualizações", paragraphs: [
    "A plataforma está em beta e é gratuita durante esse período. Funcionalidades podem evoluir, apresentar falhas ou ficar temporariamente indisponíveis para manutenção. No momento, login e cadastro estão temporariamente indisponíveis. O painel de estudos é destinado a notebooks e tablets; o acesso pelo celular ainda é limitado.",
    "Uma eventual oferta paga deverá informar previamente preços e condições antes de qualquer contratação. O cadastro no beta não constitui autorização para cobranças futuras.",
    "Esta página poderá ser atualizada para refletir alterações no serviço e no tratamento de dados. Mudanças relevantes devem ser comunicadas pelos canais disponíveis, com obtenção de consentimento quando exigido. Para dúvidas, erros ou solicitações, utilize suporte@enemquest.com.br.",
  ] },
];

export default function PoliciesAndTermsPage() {
  return (
    <div className="landing-page min-h-screen bg-gray-100-custom text-black-custom">
      <header className="border-b border-gray-300-custom bg-white-custom">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 px-6 py-6">
          <Link href="/" aria-label="ENEM Quest — início"><Logo height={28} logoTextColor="#090a0a" /></Link>
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 text-body14 font-semibold text-blue-primary hover:underline"><ArrowLeft aria-hidden className="h-4 w-4" /> Voltar ao início</Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <h1 className="text-head32 font-extrabold leading-tight sm:text-head40">Política de privacidade e termos de uso</h1>
        <p className="mt-4 text-body14 text-gray-500-custom">Última atualização: 12 de outubro de 2026.</p>
        <nav aria-label="Conteúdo desta página" className="mt-8 rounded-2xl border border-gray-300-custom bg-white-custom p-6">
          <ul className="grid gap-3 sm:grid-cols-2">
            {sections.map((section) => <li key={section.id}><a href={`#${section.id}`} className="text-body14 font-semibold text-blue-primary hover:underline">{section.title}</a></li>)}
          </ul>
        </nav>
        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-8">
              <h2 className="text-head24 font-bold">{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-4 text-body16 leading-relaxed text-gray-500-custom">{paragraph}</p>)}
            </section>
          ))}
        </div>
        <div className="mt-12 border-t border-gray-300-custom pt-6 text-body14 leading-relaxed text-gray-500-custom">
          <p>Contato: <a href="mailto:suporte@enemquest.com.br" className="font-semibold text-blue-primary underline underline-offset-4">suporte@enemquest.com.br</a>.</p>
          <p className="mt-3">Referência: <a href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm" target="_blank" rel="noopener noreferrer" className="text-blue-primary underline underline-offset-4">Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018)</a>.</p>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
