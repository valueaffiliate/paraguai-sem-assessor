/**
 * Configuração central da landing page Paraguai Sem Assessor.
 * Edite aqui preço, oferta, checkout, marca, módulos, FAQ, imagens e fontes.
 * Nada nesta página deve afirmar algo que não esteja confirmado aqui.
 */

export type ModuleStatus = "disponivel" | "em-breve" | "nao-definido";

export interface Photo {
  src: string;
  alt: string;
  /** Crédito exibido junto à foto. */
  author: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
  /** Só fotos com licença comercial conferida são exibidas. */
  verified: boolean;
}

export const brand = {
  name: "Paraguai Sem Assessor",
  shortName: "PSA",
  tagline: "Guia digital de residência no Paraguai para brasileiros",
  description:
    "Guia digital em português para entender as modalidades de residência no Paraguai, preparar seus documentos e organizar a solicitação nos órgãos oficiais por conta própria.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://paraguaisemassessor.com.br",
  locale: "pt_BR",
};

/** Produto vendido. O id é gravado nos pedidos e nos acessos. */
export const product = {
  id: "guia-paraguai-sem-assessor",
  name: "Guia Paraguai Sem Assessor",
};

export const offer = {
  currency: "BRL",
  launchPrice: 119.9,
  /** Preço regular planejado. Exibido apenas como informação, nunca riscado. */
  plannedRegularPrice: 199.9,
  paymentType: "Pagamento único",
  /**
   * URL do checkout real. Enquanto for null, a página mostra um aviso claro
   * de que o checkout ainda não está ativo e não leva a nenhum pagamento.
   */
  checkoutUrl: "/checkout" as string | null,
  /** Preencha somente com política comercial real. null = não exibido. */
  installments: null as string | null,
  guarantee: null as string | null,
  accessPeriod: null as string | null,
  updatesPolicy: null as string | null,
  benefits: [
    "Acesso completo ao guia digital",
    "Módulos e tutoriais",
    "Checklists práticos",
    "Guia de cidades",
    "Ferramentas de planejamento",
    "Biblioteca de fontes oficiais",
  ],
  disclaimer:
    "Guia digital educacional. Taxas governamentais e despesas pessoais não estão incluídas.",
};

/**
 * Rastreamento de anúncios do X (Twitter).
 * 1. No X Ads > Ferramentas > Gerenciador de eventos, crie o pixel e copie o ID (ex.: "abc12").
 * 2. Crie os eventos e cole os IDs (formato "tw-abc12-xyz34").
 * Também pode ser definido por variável de ambiente na Vercel.
 * Enquanto o ID for null, nenhum script do X é carregado.
 */
export const tracking = {
  xPixelId: (process.env.NEXT_PUBLIC_X_PIXEL_ID ?? null) as string | null,
  xEvents: {
    /** Clique no botão de compra (início do checkout). */
    checkoutClick: (process.env.NEXT_PUBLIC_X_EVENT_CHECKOUT ?? null) as string | null,
    /** Clique em qualquer botão "Quero o guia" que leva à oferta. */
    offerClick: (process.env.NEXT_PUBLIC_X_EVENT_OFFER ?? null) as string | null,
    /** Pagamento confirmado (disparado na página do pedido quando o status vira "pago"). */
    purchase: (process.env.NEXT_PUBLIC_X_EVENT_PURCHASE ?? null) as string | null,
  },
};

export const company = {
  /** Dados reais da empresa responsável. null = não exibido. */
  legalName: null as string | null,
  cnpj: null as string | null,
  address: null as string | null,
  contactEmail: null as string | null,
  whatsapp: null as string | null,
};

export const nav = [
  { label: "Como funciona", href: "#como-funciona" },
  { label: "O guia", href: "#plataforma" },
  { label: "Módulos", href: "#modulos" },
  { label: "Dúvidas", href: "#perguntas" },
];

const commons = (file: string, width = 2000) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;

export const photos = {
  hero: {
    src: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Ciudad_de_Asunci%C3%B3n_Paraguay.jpg",
    alt: "Vista do centro de Assunção, capital do Paraguai",
    author: "FF MM / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Ciudad_de_Asunci%C3%B3n_Paraguay.jpg",
    verified: true,
  } satisfies Photo,
};

export const cities: {
  slug: string;
  name: string;
  department: string;
  highlight: string;
  coords: string;
  photo: Photo | null;
}[] = [
  {
    slug: "assuncao",
    name: "Assunção",
    department: "Capital",
    highlight: "Capital do país e principal centro de serviços públicos e privados.",
    coords: "25°16′S 57°38′O",
    photo: photos.hero,
  },
  {
    slug: "ciudad-del-este",
    name: "Ciudad del Este",
    department: "Alto Paraná",
    highlight: "Polo comercial ligado a Foz do Iguaçu pela Ponte da Amizade.",
    coords: "25°31′S 54°37′O",
    // Licença ainda não conferida: fica pendente de revisão editorial.
    photo: {
      src: commons("Centro_ciudad_del_este_2.jpg", 1400),
      alt: "Centro de Ciudad del Este",
      author: "Wikimedia Commons",
      license: "A conferir",
      licenseUrl: "",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Centro_ciudad_del_este_2.jpg",
      verified: false,
    },
  },
  {
    slug: "encarnacion",
    name: "Encarnación",
    department: "Itapúa",
    highlight: "Costanera às margens do rio Paraná, turismo e vida urbana.",
    coords: "27°20′S 55°52′O",
    photo: {
      src: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Encarnaci%C3%B3n%2C_Paraguay.jpg",
      alt: "Costanera de Encarnación, às margens do rio Paraná",
      author: "Overkill53 / Wikimedia Commons",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Encarnaci%C3%B3n,_Paraguay.jpg",
      verified: true,
    },
  },
  {
    slug: "pedro-juan-caballero",
    name: "Pedro Juan Caballero",
    department: "Amambay",
    highlight: "Fronteira seca com Ponta Porã (MS), conexão direta com o Brasil.",
    coords: "22°33′S 55°44′O",
    photo: null, // Foto com licença verificada pendente.
  },
];

export const steps = [
  {
    title: "Entenda seu caminho",
    text: "Conheça as modalidades de residência e as diferenças entre elas.",
  },
  {
    title: "Prepare seus documentos",
    text: "Aprenda a identificar, solicitar e conferir os documentos necessários para seu caso.",
  },
  {
    title: "Organize os procedimentos no Paraguai",
    text: "Entenda como funcionam os atendimentos presenciais, taxas e protocolos.",
  },
  {
    title: "Acompanhe seus próximos passos",
    text: "Saiba quais procedimentos posteriores podem ser necessários, incluindo residência permanente e cédula, conforme a modalidade.",
  },
];

export const modules: { title: string; description: string; status: ModuleStatus }[] = [
  { title: "Conhecendo o Paraguai", description: "Panorama do país, regiões, moeda, idioma e o que considerar antes de decidir pela mudança.", status: "nao-definido" },
  { title: "Entendendo a documentação", description: "A diferença entre residência temporária, residência permanente, cédula e cidadania, e a ordem em que cada uma aparece.", status: "nao-definido" },
  { title: "Documentos brasileiros", description: "Certidões, antecedentes criminais, apostilamento e como organizar os documentos emitidos no Brasil.", status: "nao-definido" },
  { title: "Preparação da viagem", description: "O que levar, como conferir os documentos antes de embarcar e como planejar os dias no Paraguai.", status: "nao-definido" },
  { title: "Residência temporária MERCOSUL", description: "Requisitos, documentos e procedimento da modalidade baseada no acordo de residência do MERCOSUL.", status: "nao-definido" },
  { title: "Residência temporária pela Lei 6.984/2022", description: "Quando essa modalidade se aplica, quais exigências consultar e como ela difere do caminho MERCOSUL.", status: "nao-definido" },
  { title: "Procedimentos presenciais", description: "Como funciona o atendimento na Dirección Nacional de Migraciones, protocolos e acompanhamento da solicitação.", status: "nao-definido" },
  { title: "Cédula paraguaia", description: "Em que momento a cédula pode ser solicitada e quais etapas precisam estar concluídas.", status: "nao-definido" },
  { title: "Residência permanente", description: "Quando e como solicitar a passagem da residência temporária para a permanente, conforme a modalidade.", status: "nao-definido" },
  { title: "Documentação familiar", description: "Pontos de atenção para cônjuges, filhos e outros familiares no planejamento da documentação.", status: "nao-definido" },
  { title: "Onde morar no Paraguai", description: "Guia das principais cidades e critérios para escolher onde se estabelecer.", status: "nao-definido" },
  { title: "Planejamento financeiro", description: "Estimativa de taxas, deslocamentos, hospedagem e custos complementares do processo.", status: "nao-definido" },
  { title: "Trabalho, empresas e tributação", description: "Visão geral introdutória sobre trabalho e empresas. Não substitui consultoria tributária ou jurídica.", status: "nao-definido" },
  { title: "Vida prática no Paraguai", description: "Moradia, contas, bancos, saúde e rotina para quem está se mudando.", status: "nao-definido" },
  { title: "Plano de ação de 30 dias", description: "Um roteiro para transformar o conteúdo do guia em tarefas com prazos.", status: "nao-definido" },
];

export const faq = [
  { q: "O Paraguai Sem Assessor é uma consultoria?", a: "Não. É um guia educacional digital que ensina a organizar documentos e entender os procedimentos oficiais para realizar a solicitação por conta própria." },
  { q: "Vocês emitem a documentação?", a: "Não. Os documentos e autorizações são emitidos exclusivamente pelos órgãos competentes." },
  { q: "Preciso ir pessoalmente ao Paraguai?", a: "A solicitação de residência envolve procedimentos presenciais conforme as regras da Dirección Nacional de Migraciones." },
  { q: "O valor inclui taxas do governo?", a: "Não. O preço corresponde ao acesso ao guia. As taxas governamentais e demais despesas são pagas separadamente." },
  { q: "Preciso falar espanhol?", a: "O guia é em português. Algumas etapas oficiais ocorrem em espanhol e podem exigir compreensão de documentos e orientações locais." },
  { q: "O guia garante aprovação?", a: "Não. A decisão compete exclusivamente às autoridades paraguaias." },
];

export const sources = {
  /** Data da última conferência editorial das fontes. */
  checkedAt: null as string | null,
  items: [
    { label: "Residência temporária MERCOSUL", url: "https://migraciones.gov.py/residencia-temporaria-mercosur/", status: "a-revisar" },
    { label: "Residência temporária pela Lei 6.984/2022", url: "https://migraciones.gov.py/residencia-temporal/", status: "a-revisar" },
    { label: "Residência permanente MERCOSUL", url: "https://migraciones.gov.py/residencia-permanente-mercosur/", status: "a-revisar" },
    { label: "Taxas oficiais (aranceles migratorios)", url: "https://migraciones.gov.py/aranceles-migratorios/", status: "a-revisar" },
    { label: "Comprovação de solvência econômica", url: "https://migraciones.gov.py/migraciones-actualiza-el-regimen-de-acreditacion-de-solvencia-economica-para-extranjeros/", status: "a-revisar" },
  ] as { label: string; url: string; status: "conferida" | "a-revisar" }[],
};

export const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
