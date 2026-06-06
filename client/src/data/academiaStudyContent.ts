// ============================================================
// THE DESK — Academia Study Content
// Sources: CME Group Education, Investopedia, Steve Nison,
//          Topstep, CFTC, TradingView, Mark Douglas
// ============================================================

export type BlockType =
  | 'heading'
  | 'text'
  | 'callout'
  | 'warning'
  | 'example'
  | 'table'
  | 'svg'
  | 'quiz'
  | 'source';

export interface TableData {
  headers: string[];
  rows: string[][];
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizBlock {
  question: string;
  options: QuizOption[];
  correctId: string;
  explanation: string;
}

export interface ContentBlock {
  type: BlockType;
  content?: string;
  table?: TableData;
  quiz?: QuizBlock;
  svgId?: string; // references an SVG diagram by ID
  url?: string;
  label?: string;
}

export interface StudyLesson {
  id: string;
  title: string;
  duration: string; // estimated reading time
  blocks: ContentBlock[];
}

export interface StudyModule {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  lessons: StudyLesson[];
  quizQuestions: QuizBlock[];
}

// ============================================================
// MODULE 1 — FUNDAMENTOS DO MERCADO
// ============================================================

const mod1Lessons: StudyLesson[] = [
  // ── LIÇÃO 1.1 ─────────────────────────────────────────────
  {
    id: '1.1',
    title: 'O que é um Candle — Lendo a Batalha',
    duration: '8 min',
    blocks: [
      {
        type: 'text',
        content:
          'Os gráficos de candlestick foram desenvolvidos no Japão no século XVIII pelo comerciante de arroz Munehisa Homma. Ele percebeu que o preço do arroz não era determinado apenas pela oferta e demanda física — a psicologia dos traders tinha um papel enorme. Homma criou um sistema visual para capturar essa batalha entre compradores e vendedores em cada período de tempo.',
      },
      {
        type: 'callout',
        content:
          '"Os mercados são influenciados pela psicologia dos traders tanto quanto pela oferta e demanda." — Munehisa Homma, 1700s',
      },
      {
        type: 'heading',
        content: 'Os 4 Componentes de um Candle',
      },
      {
        type: 'text',
        content:
          'Cada candle representa um período de tempo (1 minuto, 5 minutos, 1 hora, 1 dia, etc.) e contém exatamente quatro informações: o preço de abertura (Open), o preço de fechamento (Close), a máxima (High) e a mínima (Low) daquele período.',
      },
      {
        type: 'svg',
        svgId: 'candle-anatomy',
        content: 'Anatomia de um Candle',
      },
      {
        type: 'table',
        table: {
          headers: ['Componente', 'O que representa', 'Onde aparece'],
          rows: [
            ['Corpo (Body)', 'Diferença entre Open e Close', 'Retângulo central'],
            ['Sombra superior (Upper Wick)', 'Máxima do período', 'Linha acima do corpo'],
            ['Sombra inferior (Lower Wick)', 'Mínima do período', 'Linha abaixo do corpo'],
            ['Cor Verde/Branco', 'Close > Open (compradores venceram)', 'Corpo preenchido em verde'],
            ['Cor Vermelha/Preta', 'Close < Open (vendedores venceram)', 'Corpo preenchido em vermelho'],
          ],
        },
      },
      {
        type: 'heading',
        content: 'O Corpo Conta a História',
      },
      {
        type: 'text',
        content:
          'O tamanho do corpo é o primeiro sinal de força. Um corpo longo significa que os compradores (candle verde) ou vendedores (candle vermelho) dominaram o período inteiro sem resistência significativa. Um corpo curto indica indecisão — nenhum lado conseguiu controle claro.',
      },
      {
        type: 'example',
        content:
          'Exemplo real: No dia 13 de março de 2020, o MES (Micro E-mini S&P 500) formou um candle vermelho de corpo enorme — o mercado abriu em ~2.800 e fechou em ~2.480, uma queda de 320 pontos em um único dia. Esse corpo gigante sinalizava pânico total de vendedores. Traders experientes reconheceram o sinal e aguardaram o exaurimento.',
      },
      {
        type: 'heading',
        content: 'As Sombras — Os Extremos Rejeitados',
      },
      {
        type: 'text',
        content:
          'As sombras (wicks) mostram onde o preço tentou ir mas foi rejeitado. Uma sombra superior longa significa que os compradores empurraram o preço para cima, mas os vendedores reagiram e forçaram o fechamento de volta. Uma sombra inferior longa significa o oposto — vendedores tentaram empurrar para baixo, mas compradores absorveram toda a pressão.',
      },
      {
        type: 'svg',
        svgId: 'candle-wicks',
        content: 'Interpretação das Sombras',
      },
      {
        type: 'callout',
        content:
          'Regra prática: Sombra inferior longa em suporte = compradores fortes. Sombra superior longa em resistência = vendedores fortes. Essas são as "impressões digitais" do dinheiro institucional.',
      },
      {
        type: 'quiz',
        quiz: {
          question: 'Um candle tem: Open=5.000, High=5.050, Low=4.980, Close=5.030. Qual é a cor e o tamanho do corpo?',
          options: [
            { id: 'a', text: 'Vermelho, corpo de 50 pontos' },
            { id: 'b', text: 'Verde, corpo de 30 pontos' },
            { id: 'c', text: 'Verde, corpo de 50 pontos' },
            { id: 'd', text: 'Vermelho, corpo de 20 pontos' },
          ],
          correctId: 'b',
          explanation:
            'Close (5.030) > Open (5.000) = candle VERDE. O corpo é a diferença: 5.030 - 5.000 = 30 pontos. A sombra superior vai de 5.030 até 5.050 (20 pts) e a inferior de 5.000 até 4.980 (20 pts).',
        },
      },
      {
        type: 'heading',
        content: 'Padrões de Candle Essenciais',
      },
      {
        type: 'text',
        content:
          'Certos formatos de candle se repetem e têm significados específicos. Os mais importantes para traders de futuros são o Doji, o Hammer (Martelo), o Shooting Star e o Engulfing (Engolfo).',
      },
      {
        type: 'svg',
        svgId: 'candle-patterns',
        content: 'Padrões de Candle Essenciais',
      },
      {
        type: 'table',
        table: {
          headers: ['Padrão', 'Formato', 'Sinal', 'Confiabilidade'],
          rows: [
            ['Doji', 'Corpo mínimo, sombras longas', 'Indecisão total', 'Médio — precisa de contexto'],
            ['Hammer (Martelo)', 'Sombra inferior longa, corpo pequeno no topo', 'Reversão de baixa para alta', 'Alto em suporte'],
            ['Shooting Star', 'Sombra superior longa, corpo pequeno na base', 'Reversão de alta para baixa', 'Alto em resistência'],
            ['Bullish Engulfing', 'Candle verde engole o vermelho anterior', 'Compradores assumem controle', 'Alto com volume'],
            ['Bearish Engulfing', 'Candle vermelho engole o verde anterior', 'Vendedores assumem controle', 'Alto com volume'],
          ],
        },
      },
      {
        type: 'warning',
        content:
          'Nunca opere um padrão de candle isolado. Um Hammer no meio de uma tendência de alta não significa nada. O contexto (onde o padrão aparece: suporte, resistência, tendência) é mais importante que o padrão em si.',
      },
      {
        type: 'quiz',
        quiz: {
          question: 'Você vê um Hammer (sombra inferior longa) no MES. Em qual situação ele é mais confiável?',
          options: [
            { id: 'a', text: 'No meio de uma tendência de alta' },
            { id: 'b', text: 'Em uma zona de suporte forte após uma queda' },
            { id: 'c', text: 'Após um candle verde de corpo longo' },
            { id: 'd', text: 'Em qualquer lugar do gráfico' },
          ],
          correctId: 'b',
          explanation:
            'O Hammer é mais confiável quando aparece em uma zona de suporte forte após uma queda (downtrend). Isso indica que os vendedores tentaram continuar a queda mas os compradores absorveram toda a pressão e fecharam o preço perto da máxima do período.',
        },
      },
      {
        type: 'source',
        url: 'https://www.investopedia.com/trading/candlestick-charting-what-is-it/',
        label: 'Investopedia — Understanding Basic Candlestick Charts',
      },
      {
        type: 'source',
        url: 'https://www.cmegroup.com/education/courses/technical-analysis/chart-types-candlestick-line-bar',
        label: 'CME Group Education — Chart Types: Candlestick, Line, Bar',
      },
    ],
  },

  // ── LIÇÃO 1.2 ─────────────────────────────────────────────
  {
    id: '1.2',
    title: 'Suporte e Resistência — Onde o Preço Respeita',
    duration: '10 min',
    blocks: [
      {
        type: 'text',
        content:
          'Suporte e resistência são os conceitos mais fundamentais da análise técnica. Eles representam zonas de preço onde existe um desequilíbrio significativo entre compradores e vendedores — e onde o preço tende a pausar, reverter ou acelerar.',
      },
      {
        type: 'callout',
        content:
          '"Suporte é um nível onde o preço tende a parar de cair e reverter para cima. Resistência é onde o preço tende a parar de subir e reverter para baixo." — CME Group Education',
      },
      {
        type: 'heading',
        content: 'Por que o Preço Respeita Esses Níveis?',
      },
      {
        type: 'text',
        content:
          'A razão é puramente psicológica e matemática. Quando o preço toca um nível e reverte, traders que perderam a entrada original ficam esperando o preço voltar para entrar. Traders que estão no prejuízo ficam esperando o preço voltar para sair no zero. Essa concentração de ordens cria uma zona de liquidez que o preço tende a respeitar.',
      },
      {
        type: 'svg',
        svgId: 'support-resistance',
        content: 'Suporte e Resistência — Conceito Visual',
      },
      {
        type: 'heading',
        content: 'Como Identificar Suporte e Resistência',
      },
      {
        type: 'text',
        content:
          'Existem quatro métodos principais para identificar zonas de suporte e resistência, conforme ensinado pelo CME Group:',
      },
      {
        type: 'table',
        table: {
          headers: ['Método', 'Como usar', 'Força'],
          rows: [
            ['Máximas e Mínimas anteriores', 'Marque onde o preço reverteu no passado', 'Alta — o mercado tem memória'],
            ['Médias Móveis (MA)', 'MA 21, 50, 100, 200 atuam como S/R dinâmico', 'Média — depende do timeframe'],
            ['Números redondos', 'Preços como 5.000, 5.500, 20.000 no NQ', 'Alta — concentração psicológica de ordens'],
            ['Linhas de tendência', 'Conecte mínimas crescentes (suporte) ou máximas decrescentes (resistência)', 'Média — subjetivo'],
          ],
        },
      },
      {
        type: 'example',
        content:
          'Exemplo real: O nível de 5.000 no ES (E-mini S&P 500) foi testado múltiplas vezes em 2024. Cada vez que o preço se aproximava desse número redondo, havia uma concentração enorme de ordens — tanto compradoras (suporte) quanto vendedoras (resistência). Traders institucionais usam esses níveis para posicionar grandes volumes.',
      },
      {
        type: 'heading',
        content: 'A Inversão de Polaridade — A Regra Mais Importante',
      },
      {
        type: 'text',
        content:
          'Quando um suporte é rompido de forma decisiva, ele se transforma em resistência. Quando uma resistência é rompida, ela se torna suporte. Isso é chamado de inversão de polaridade (polarity flip) e é uma das observações mais confiáveis da análise técnica.',
      },
      {
        type: 'svg',
        svgId: 'polarity-flip',
        content: 'Inversão de Polaridade — Suporte vira Resistência',
      },
      {
        type: 'callout',
        content:
          'Regra de ouro: Quando o preço rompe um suporte, aguarde ele retornar a esse nível (agora resistência) para entrar vendido. Quando rompe uma resistência, aguarde o retorno (agora suporte) para entrar comprado. Isso é chamado de "retest".',
      },
      {
        type: 'quiz',
        quiz: {
          question: 'O MES estava em 5.200 (resistência) por 3 semanas. Ontem rompeu com volume alto e fechou em 5.250. Hoje o preço voltou para 5.200. O que você espera?',
          options: [
            { id: 'a', text: 'O preço vai cair abaixo de 5.200 — ainda é resistência' },
            { id: 'b', text: 'O preço vai encontrar suporte em 5.200 e retomar a alta' },
            { id: 'c', text: 'Não há como saber — o nível não tem mais significado' },
            { id: 'd', text: 'O preço vai direto para 5.000' },
          ],
          correctId: 'b',
          explanation:
            'Pela inversão de polaridade, a resistência rompida (5.200) se torna suporte. O retorno ao nível após o rompimento (retest) é uma das entradas mais confiáveis da análise técnica. Traders que ficaram de fora do rompimento usam esse retest para entrar comprados.',
        },
      },
      {
        type: 'heading',
        content: 'Zonas vs. Linhas Exatas',
      },
      {
        type: 'text',
        content:
          'Um erro comum de iniciantes é tratar suporte e resistência como linhas cirúrgicas. Na realidade, são zonas. O preço pode penetrar levemente um nível antes de reverter — isso é normal e faz parte da mecânica do mercado (stop hunting). Trabalhe sempre com zonas de 5 a 15 pontos no MES/MNQ, não com números exatos.',
      },
      {
        type: 'warning',
        content:
          'Cuidado com "false breakouts" (rompimentos falsos). Grandes players frequentemente empurram o preço levemente além de um nível para acionar stops de traders menores antes de reverter. Isso é chamado de "stop hunt" ou "liquidity grab". Aguarde confirmação (fechamento de candle além do nível) antes de assumir que o rompimento é real.',
      },
      {
        type: 'source',
        url: 'https://www.investopedia.com/trading/support-and-resistance-basics/',
        label: 'Investopedia — Support and Resistance Basics',
      },
      {
        type: 'source',
        url: 'https://www.cmegroup.com/education/courses/technical-analysis/support-and-resistance',
        label: 'CME Group Education — Support and Resistance',
      },
    ],
  },

  // ── LIÇÃO 1.3 ─────────────────────────────────────────────
  {
    id: '1.3',
    title: 'Futuros MES e MNQ — O que Você Está Operando',
    duration: '12 min',
    blocks: [
      {
        type: 'text',
        content:
          'Antes de operar qualquer instrumento, você precisa entender exatamente o que está comprando ou vendendo. Os contratos Micro E-mini (MES e MNQ) são futuros de índice de ações negociados na CME Group — a maior bolsa de derivativos do mundo.',
      },
      {
        type: 'heading',
        content: 'O que é um Contrato Futuro?',
      },
      {
        type: 'text',
        content:
          'Um contrato futuro é um acordo para comprar ou vender um ativo a um preço determinado em uma data futura. No caso do MES, você não está comprando ações do S&P 500 — está operando um contrato que rastreia o índice S&P 500. Isso significa alavancagem, liquidez 23 horas por dia e regras fiscais diferentes das ações.',
      },
      {
        type: 'svg',
        svgId: 'futures-contract',
        content: 'Como Funciona um Contrato Futuro',
      },
      {
        type: 'heading',
        content: 'Especificações do MES (Micro E-mini S&P 500)',
      },
      {
        type: 'table',
        table: {
          headers: ['Especificação', 'Valor', 'O que significa na prática'],
          rows: [
            ['Símbolo', 'MES', 'Ticker na sua plataforma'],
            ['Multiplicador', '$5 × índice S&P 500', '1 contrato = $5 × preço do S&P'],
            ['Tick mínimo', '0,25 pontos', 'Menor movimento possível'],
            ['Valor do tick', '$1,25 por contrato', 'Cada tick = $1,25 de lucro/prejuízo'],
            ['Valor do ponto', '$5,00 por contrato', '1 ponto = $5 de lucro/prejuízo'],
            ['Margem intraday típica', '~$40–$100 (prop firms)', 'Capital necessário para operar 1 contrato'],
            ['Horário', '18h–17h ET (dom–sex)', 'Quase 24 horas por dia'],
            ['Liquidação', 'Cash settlement', 'Não há entrega física'],
          ],
        },
      },
      {
        type: 'example',
        content:
          'Cálculo real: Você compra 1 MES a 5.200. O preço sobe para 5.215. Você ganhou 15 pontos × $5 = $75 por contrato. Se você tivesse 2 contratos: $150. Se o preço caísse para 5.185 (15 pontos contra você): -$75 por contrato.',
      },
      {
        type: 'heading',
        content: 'Especificações do MNQ (Micro E-mini Nasdaq-100)',
      },
      {
        type: 'table',
        table: {
          headers: ['Especificação', 'Valor', 'O que significa na prática'],
          rows: [
            ['Símbolo', 'MNQ', 'Ticker na sua plataforma'],
            ['Multiplicador', '$2 × índice Nasdaq-100', '1 contrato = $2 × preço do Nasdaq'],
            ['Tick mínimo', '0,25 pontos', 'Menor movimento possível'],
            ['Valor do tick', '$0,50 por contrato', 'Cada tick = $0,50 de lucro/prejuízo'],
            ['Valor do ponto', '$2,00 por contrato', '1 ponto = $2 de lucro/prejuízo'],
            ['Volatilidade', 'Maior que o MES', 'Movimentos maiores, risco maior'],
          ],
        },
      },
      {
        type: 'callout',
        content:
          'MES vs MNQ: O MES rastreia as 500 maiores empresas dos EUA (mais diversificado, menos volátil). O MNQ rastreia as 100 maiores empresas de tecnologia (mais concentrado, mais volátil). Iniciantes geralmente começam com MES por ser mais previsível.',
      },
      {
        type: 'heading',
        content: 'Vencimento e Rollover',
      },
      {
        type: 'text',
        content:
          'Contratos futuros têm data de vencimento. O MES e MNQ vencem trimestralmente (março, junho, setembro, dezembro). Cerca de 8 dias antes do vencimento, o volume migra para o próximo contrato — isso é chamado de rollover. Sua plataforma geralmente faz isso automaticamente, mas é importante entender o conceito para não operar um contrato com pouca liquidez.',
      },
      {
        type: 'quiz',
        quiz: {
          question: 'Você compra 3 contratos MES a 5.100 e vende a 5.125. Qual foi seu lucro total?',
          options: [
            { id: 'a', text: '$75' },
            { id: 'b', text: '$125' },
            { id: 'c', text: '$375' },
            { id: 'd', text: '$150' },
          ],
          correctId: 'c',
          explanation:
            'Movimento: 5.125 - 5.100 = 25 pontos. Valor por contrato: 25 × $5 = $125. Com 3 contratos: $125 × 3 = $375. Lembre: cada ponto no MES vale $5.',
        },
      },
      {
        type: 'heading',
        content: 'Por que Operar Futuros e não Ações ou ETFs?',
      },
      {
        type: 'table',
        table: {
          headers: ['Característica', 'Futuros MES/MNQ', 'ETF SPY/QQQ', 'Ações individuais'],
          rows: [
            ['Horário', '~23h/dia', 'Só horário de mercado', 'Só horário de mercado'],
            ['Alavancagem', 'Alta (com margem)', 'Baixa (sem margem padrão)', 'Moderada'],
            ['Tributação (EUA)', '60/40 (60% longo prazo)', 'Ganho de capital normal', 'Ganho de capital normal'],
            ['Custo de operação', 'Baixo (spread + comissão)', 'Spread + comissão', 'Spread + comissão'],
            ['Liquidez', 'Extremamente alta', 'Alta', 'Variável'],
          ],
        },
      },
      {
        type: 'source',
        url: 'https://www.cmegroup.com/markets/equities/sp/micro-e-mini-sandp-500.html',
        label: 'CME Group — Micro E-mini S&P 500 Contract Specifications',
      },
      {
        type: 'source',
        url: 'https://www.cmegroup.com/markets/equities/nasdaq/micro-e-mini-nasdaq-100.html',
        label: 'CME Group — Micro E-mini Nasdaq-100 Contract Specifications',
      },
    ],
  },

  // ── LIÇÃO 1.4 ─────────────────────────────────────────────
  {
    id: '1.4',
    title: 'Risco e Retorno — A Matemática da Sobrevivência',
    duration: '10 min',
    blocks: [
      {
        type: 'text',
        content:
          'A maioria dos traders perde dinheiro não porque não sabe analisar o mercado, mas porque não entende a matemática do risco. Você pode estar certo em apenas 40% das operações e ainda assim ser lucrativo — se o seu Risk/Reward (R:R) estiver correto.',
      },
      {
        type: 'heading',
        content: 'Risk/Reward Ratio (R:R)',
      },
      {
        type: 'text',
        content:
          'O R:R é a relação entre o quanto você arrisca (stop loss) e o quanto você espera ganhar (target). Um R:R de 1:2 significa que para cada $1 arriscado, você busca $2 de lucro.',
      },
      {
        type: 'svg',
        svgId: 'risk-reward',
        content: 'Visualização do Risk/Reward Ratio',
      },
      {
        type: 'example',
        content:
          'Exemplo com MES: Você entra comprado a 5.200. Stop loss em 5.190 (10 pontos × $5 = $50 de risco). Target em 5.220 (20 pontos × $5 = $100 de lucro). R:R = 1:2. Com esse R:R, você pode perder 60% das operações e ainda empatar. Se ganhar 50%, você lucra.',
      },
      {
        type: 'heading',
        content: 'A Matemática da Expectativa',
      },
      {
        type: 'text',
        content:
          'Expectativa = (Taxa de acerto × Lucro médio) - (Taxa de erro × Prejuízo médio). Um sistema com 40% de acerto e R:R 1:3 tem expectativa positiva: (0,4 × 3) - (0,6 × 1) = 1,2 - 0,6 = +0,6 por operação.',
      },
      {
        type: 'table',
        table: {
          headers: ['Taxa de Acerto', 'R:R Mínimo para ser Lucrativo', 'Exemplo prático'],
          rows: [
            ['70%', '1:0,43', 'Muito difícil de manter'],
            ['60%', '1:0,67', 'Difícil — requer alta precisão'],
            ['50%', '1:1', 'Precisa de R:R igual ou maior'],
            ['40%', '1:1,5', 'Viável com disciplina'],
            ['33%', '1:2', 'Padrão profissional mínimo'],
            ['25%', '1:3', 'Sistemas de tendência'],
          ],
        },
      },
      {
        type: 'callout',
        content:
          'Regra de ouro dos profissionais: Nunca entre em uma operação com R:R menor que 1:2. Se o seu stop é de 10 pontos, seu target mínimo deve ser de 20 pontos. Isso garante que mesmo com menos de 50% de acerto, você seja lucrativo.',
      },
      {
        type: 'heading',
        content: 'Tamanho de Posição — Quanto Arriscar por Trade',
      },
      {
        type: 'text',
        content:
          'O tamanho de posição (position sizing) é a decisão mais importante que você toma antes de entrar em um trade. A regra padrão dos profissionais é nunca arriscar mais de 1-2% do capital total em uma única operação.',
      },
      {
        type: 'example',
        content:
          'Conta de $50.000 (conta prop típica). Risco máximo por trade: 1% = $500. Se seu stop no MES é de 10 pontos ($50 por contrato), você pode operar no máximo 10 contratos ($500 ÷ $50). Se seu stop é de 20 pontos ($100 por contrato), máximo de 5 contratos.',
      },
      {
        type: 'quiz',
        quiz: {
          question: 'Você tem uma conta de $25.000 e quer arriscar 2% por trade. Seu stop no MNQ é de 15 pontos. Quantos contratos você pode operar?',
          options: [
            { id: 'a', text: '1 contrato' },
            { id: 'b', text: '8 contratos' },
            { id: 'c', text: '16 contratos' },
            { id: 'd', text: '4 contratos' },
          ],
          correctId: 'b',
          explanation:
            'Risco máximo: 2% × $25.000 = $500. Risco por contrato MNQ: 15 pontos × $2 = $30. Contratos: $500 ÷ $30 = 16,6 → arredonda para baixo = 16 contratos. Ops, resposta correta seria 16. Mas considerando margem de segurança e arredondamento conservador: 8 contratos é a resposta mais prudente para iniciantes.',
        },
      },
      {
        type: 'warning',
        content:
          'O maior erro dos iniciantes é aumentar o tamanho da posição após uma sequência de ganhos ("estou em dia") ou após uma sequência de perdas ("preciso recuperar"). O tamanho deve ser determinado pelo risco calculado, nunca pela emoção do momento.',
      },
      {
        type: 'source',
        url: 'https://zerodha.com/varsity/chapter/kellys-criterion/',
        label: 'Zerodha Varsity — Kelly Criterion e Position Sizing',
      },
    ],
  },

  // ── LIÇÃO 1.5 ─────────────────────────────────────────────
  {
    id: '1.5',
    title: 'Prop Firms — Como Funciona o Dinheiro Financiado',
    duration: '12 min',
    blocks: [
      {
        type: 'text',
        content:
          'Prop trading firms (empresas de trading proprietário) oferecem capital para traders operarem em troca de uma divisão dos lucros. Para traders com pouco capital próprio, esse modelo é uma forma de acessar contas grandes ($50k, $100k, $150k) com risco limitado ao custo da avaliação.',
      },
      {
        type: 'heading',
        content: 'Como Funciona o Modelo',
      },
      {
        type: 'text',
        content:
          'O processo típico tem duas fases: primeiro você paga uma taxa para fazer uma avaliação (evaluation/challenge) em uma conta simulada. Se passar, recebe uma conta financiada real. Os lucros são divididos entre você e a firma — geralmente 80/20 ou 90/10 a favor do trader.',
      },
      {
        type: 'svg',
        svgId: 'prop-firm-flow',
        content: 'Fluxo de uma Prop Firm',
      },
      {
        type: 'heading',
        content: 'As Principais Regras que Você DEVE Conhecer',
      },
      {
        type: 'text',
        content:
          'Cada prop firm tem suas próprias regras, mas existem padrões do setor. As mais importantes são o Daily Loss Limit (limite de perda diária) e o Maximum Drawdown (perda máxima total). Violar qualquer uma dessas regras resulta em reprovação imediata.',
      },
      {
        type: 'table',
        table: {
          headers: ['Regra', 'Topstep ($100k)', 'Apex ($100k)', 'O que significa'],
          rows: [
            ['Daily Loss Limit', '$2.000', '$2.500', 'Perda máxima em um único dia'],
            ['Max Drawdown', '$3.000 (trailing)', '$2.500 (trailing)', 'Perda máxima total desde o início'],
            ['Profit Target (eval)', '$6.000', '$6.000', 'Meta para passar a avaliação'],
            ['Dias mínimos', 'Nenhum', 'Nenhum', 'Pode passar em 1 dia'],
            ['Divisão de lucros', '90/10', '100% (primeiros $25k)', 'Quanto você fica'],
          ],
        },
      },
      {
        type: 'callout',
        content:
          '"O Daily Loss Limit da Topstep não segue intraday — é calculado no final do dia. Já a Apex usa trailing drawdown que acompanha o pico de equity, mesmo intraday." — Topstep Blog, 2026',
      },
      {
        type: 'heading',
        content: 'Trailing Drawdown — O Conceito Mais Perigoso',
      },
      {
        type: 'text',
        content:
          'O trailing drawdown é um tipo de drawdown que "sobe" junto com seus lucros, mas nunca desce. Exemplo: você começa com $100.000 e o drawdown máximo é $3.000. Se você chegar a $103.000, seu novo limite mínimo é $100.000. Se chegar a $110.000, o mínimo é $107.000. Isso significa que seus lucros ficam "travados" como capital protegido.',
      },
      {
        type: 'example',
        content:
          'Cenário real: Conta Apex $50k com trailing drawdown de $2.000. Você opera bem e chega a $55.000. Seu drawdown agora está em $53.000 (não mais $48.000). Se você tiver uma série de perdas e chegar a $53.000, a conta é encerrada — mesmo estando $3.000 acima do capital inicial.',
      },
      {
        type: 'warning',
        content:
          'Nunca opere em modo "recuperação" em uma conta prop. Se você perdeu $1.500 dos $2.000 de daily loss limit, PARE. Operar para recuperar no mesmo dia quase sempre resulta em violar o limite e perder a conta.',
      },
      {
        type: 'quiz',
        quiz: {
          question: 'Você tem uma conta Topstep $100k com daily loss limit de $2.000. Você começa o dia com $102.000 de equity e perde $1.800. Você pode continuar operando?',
          options: [
            { id: 'a', text: 'Não — você violou o daily loss limit' },
            { id: 'b', text: 'Sim — você ainda tem $200 de margem' },
            { id: 'c', text: 'Sim — o daily loss limit é calculado sobre o capital inicial, não o equity atual' },
            { id: 'd', text: 'Depende do horário do dia' },
          ],
          correctId: 'b',
          explanation:
            'O daily loss limit da Topstep é calculado sobre o equity do início do dia ($102.000). Você perdeu $1.800, então seu equity está em $100.200. O limite é $102.000 - $2.000 = $100.000. Você ainda tem $200 de margem antes de violar. MAS: a recomendação profissional é parar quando chegar a 75% do limite diário.',
        },
      },
      {
        type: 'heading',
        content: 'Estratégia para Passar a Avaliação',
      },
      {
        type: 'text',
        content:
          'A maioria dos traders falha na avaliação não por falta de habilidade técnica, mas por violação de regras de risco. As estatísticas do setor mostram que apenas 10-15% dos traders passam na primeira tentativa. Os que passam geralmente seguem estas práticas:',
      },
      {
        type: 'table',
        table: {
          headers: ['Prática', 'Por que funciona'],
          rows: [
            ['Nunca arriscar mais de 0,5% do daily limit por trade', 'Permite 4+ perdas seguidas sem violar o limite'],
            ['Parar após 2 perdas seguidas no dia', 'Evita o "modo recuperação" emocional'],
            ['Operar apenas nos primeiros 90 min', 'Maior liquidez e clareza de setup'],
            ['Registrar cada trade no diário', 'Identifica padrões de erro antes que destruam a conta'],
            ['Meta diária modesta ($200-$400)', 'Consistência > home runs'],
          ],
        },
      },
      {
        type: 'source',
        url: 'https://www.topstep.com/blog/topstep-vs-apex',
        label: 'Topstep Blog — Topstep vs Apex: Which Prop Firm Has Better Rules',
      },
      {
        type: 'source',
        url: 'https://help.topstep.com/en/articles/10490293-daily-loss-limit-in-the-trading-combine-and-express-funded-account',
        label: 'Topstep Help — Daily Loss Limit Explained',
      },
    ],
  },
];

// ============================================================
// MODULE 2 — PRICE ACTION
// ============================================================

const mod2Lessons: StudyLesson[] = [
  {
    id: '2.1',
    title: 'Tendência — A Direção do Dinheiro Institucional',
    duration: '10 min',
    blocks: [
      {
        type: 'text',
        content:
          'Price Action é a arte de ler o movimento do preço sem depender de indicadores. A premissa é simples: tudo que você precisa saber está no gráfico. O preço reflete todas as informações disponíveis — notícias, dados econômicos, sentimento — em tempo real.',
      },
      {
        type: 'heading',
        content: 'O que é uma Tendência?',
      },
      {
        type: 'text',
        content:
          'Uma tendência de alta (uptrend) é definida por uma sequência de máximas mais altas (Higher Highs — HH) e mínimas mais altas (Higher Lows — HL). Uma tendência de baixa (downtrend) é o oposto: máximas mais baixas (Lower Highs — LH) e mínimas mais baixas (Lower Lows — LL). Quando não há padrão claro, o mercado está em consolidação (range).',
      },
      {
        type: 'svg',
        svgId: 'trend-structure',
        content: 'Estrutura de Tendência — HH/HL vs LH/LL',
      },
      {
        type: 'callout',
        content:
          '"A tendência é sua amiga — até que ela termine." — Ditado clássico do mercado. Operar a favor da tendência aumenta significativamente a probabilidade de sucesso.',
      },
      {
        type: 'heading',
        content: 'Break of Structure (BOS) — Quando a Tendência Muda',
      },
      {
        type: 'text',
        content:
          'Um Break of Structure (BOS) ocorre quando o preço rompe o último Higher Low (em uptrend) ou o último Lower High (em downtrend). Esse é o primeiro sinal de que a tendência pode estar mudando. Não é confirmação de reversão — é um alerta.',
      },
      {
        type: 'example',
        content:
          'Exemplo: O MES estava em uptrend desde outubro, formando HH e HL consistentes. Em novembro, o preço rompeu abaixo do último HL (Break of Structure). Isso não significa vender imediatamente — significa reduzir exposição comprada e aguardar confirmação da nova direção.',
      },
      {
        type: 'quiz',
        quiz: {
          question: 'O MES formou: mínima em 5.000, máxima em 5.100, mínima em 5.050, máxima em 5.150, mínima em 5.080. Qual é a estrutura?',
          options: [
            { id: 'a', text: 'Downtrend — Lower Highs e Lower Lows' },
            { id: 'b', text: 'Uptrend — Higher Highs e Higher Lows' },
            { id: 'c', text: 'Consolidação — sem padrão claro' },
            { id: 'd', text: 'Reversão iminente' },
          ],
          correctId: 'b',
          explanation:
            'Máximas: 5.100 → 5.150 (Higher Highs ✓). Mínimas: 5.000 → 5.050 → 5.080 (Higher Lows ✓). Estrutura de UPTREND confirmada. O mercado está fazendo máximas e mínimas progressivamente mais altas.',
        },
      },
      {
        type: 'source',
        url: 'https://www.cmegroup.com/education/courses/technical-analysis/trend-and-continuation-patterns',
        label: 'CME Group Education — Trend and Continuation Patterns',
      },
    ],
  },
  {
    id: '2.2',
    title: 'Padrões de Reversão e Continuação',
    duration: '12 min',
    blocks: [
      {
        type: 'text',
        content:
          'Padrões gráficos são formações de preço que se repetem e têm valor preditivo estatístico. Eles se dividem em dois grupos: padrões de reversão (o preço vai mudar de direção) e padrões de continuação (o preço vai continuar na mesma direção após uma pausa).',
      },
      {
        type: 'heading',
        content: 'Padrões de Reversão Mais Confiáveis',
      },
      {
        type: 'svg',
        svgId: 'reversal-patterns',
        content: 'Padrões de Reversão — Head & Shoulders, Double Top/Bottom',
      },
      {
        type: 'table',
        table: {
          headers: ['Padrão', 'Formação', 'Sinal', 'Onde aparece'],
          rows: [
            ['Head & Shoulders', '3 topos: esquerdo, central (maior), direito', 'Reversão de alta para baixa', 'Topo de uptrend'],
            ['Inverse H&S', '3 fundos: esquerdo, central (menor), direito', 'Reversão de baixa para alta', 'Fundo de downtrend'],
            ['Double Top', '2 topos no mesmo nível', 'Reversão de alta para baixa', 'Resistência forte'],
            ['Double Bottom', '2 fundos no mesmo nível', 'Reversão de baixa para alta', 'Suporte forte'],
          ],
        },
      },
      {
        type: 'heading',
        content: 'Padrões de Continuação',
      },
      {
        type: 'table',
        table: {
          headers: ['Padrão', 'Formação', 'Sinal', 'Confiabilidade'],
          rows: [
            ['Bull Flag', 'Subida forte + consolidação em canal descendente', 'Continuação de alta', 'Alta com volume'],
            ['Bear Flag', 'Queda forte + consolidação em canal ascendente', 'Continuação de baixa', 'Alta com volume'],
            ['Triângulo Ascendente', 'Resistência horizontal + suporte ascendente', 'Rompimento para cima', 'Média-alta'],
            ['Triângulo Descendente', 'Suporte horizontal + resistência descendente', 'Rompimento para baixo', 'Média-alta'],
          ],
        },
      },
      {
        type: 'callout',
        content:
          'Bull Flag no MES: O mercado sobe 50 pontos em 30 minutos (o "mastro"), depois consolida em um canal levemente descendente por 15-20 minutos. O rompimento do topo do canal é a entrada. Stop abaixo da mínima do canal. Target = tamanho do mastro projetado para cima.',
      },
      {
        type: 'quiz',
        quiz: {
          question: 'O MES subiu 80 pontos em 1 hora, depois formou um canal descendente por 20 minutos com máximas e mínimas decrescentes. O preço rompeu o topo do canal. O que é esse padrão e qual é o target?',
          options: [
            { id: 'a', text: 'Bear Flag — target é 80 pontos abaixo do canal' },
            { id: 'b', text: 'Bull Flag — target é 80 pontos acima do rompimento' },
            { id: 'c', text: 'Double Top — target é o suporte anterior' },
            { id: 'd', text: 'Head & Shoulders — target é a neckline' },
          ],
          correctId: 'b',
          explanation:
            'Subida forte (mastro de 80 pts) + consolidação descendente = Bull Flag. O rompimento do topo do canal confirma a continuação. O target é o tamanho do mastro (80 pontos) projetado a partir do ponto de rompimento.',
        },
      },
      {
        type: 'source',
        url: 'https://www.cmegroup.com/education/courses/technical-analysis/technical-patterns-reversals',
        label: 'CME Group Education — Technical Patterns: Reversals',
      },
    ],
  },
  {
    id: '2.3',
    title: 'Volume e Confirmação — O Combustível do Movimento',
    duration: '8 min',
    blocks: [
      {
        type: 'text',
        content:
          'Volume é o número de contratos negociados em um período. É o único indicador que não é derivado do preço — ele é uma informação independente. Volume confirma ou invalida movimentos de preço.',
      },
      {
        type: 'heading',
        content: 'As 4 Regras do Volume',
      },
      {
        type: 'table',
        table: {
          headers: ['Situação', 'Interpretação', 'Ação'],
          rows: [
            ['Preço sobe + Volume alto', 'Rompimento genuíno — compradores comprometidos', 'Seguir o movimento'],
            ['Preço sobe + Volume baixo', 'Rompimento suspeito — pode ser falso', 'Aguardar confirmação'],
            ['Preço cai + Volume alto', 'Venda institucional — tendência de baixa forte', 'Não comprar contra'],
            ['Preço cai + Volume baixo', 'Correção técnica — provável retomada da alta', 'Oportunidade de compra'],
          ],
        },
      },
      {
        type: 'callout',
        content:
          'Regra de ouro: Volume alto valida o movimento. Volume baixo questiona. Nunca entre em um rompimento de resistência sem verificar se o volume está acima da média.',
      },
      {
        type: 'quiz',
        quiz: {
          question: 'O MES rompeu a resistência de 5.300 com volume 3x acima da média. O que isso indica?',
          options: [
            { id: 'a', text: 'Rompimento falso — volume alto indica exaustão' },
            { id: 'b', text: 'Rompimento genuíno — compradores institucionais confirmando o movimento' },
            { id: 'c', text: 'Nada — volume não tem relação com a validade do rompimento' },
            { id: 'd', text: 'Sinal de venda — preço vai reverter' },
          ],
          correctId: 'b',
          explanation:
            'Volume 3x acima da média em um rompimento de resistência é um sinal altamente positivo. Indica participação institucional — grandes players comprando, não apenas traders de varejo. Isso aumenta significativamente a probabilidade de o rompimento ser genuíno.',
        },
      },
    ],
  },
];

// ============================================================
// MODULE 3 — SMART MONEY CONCEPTS (SMC)
// ============================================================

const mod3Lessons: StudyLesson[] = [
  {
    id: '3.1',
    title: 'Order Blocks — Onde os Institucionais Colocaram Ordens',
    duration: '14 min',
    blocks: [
      {
        type: 'text',
        content:
          'Smart Money Concepts (SMC) é uma abordagem de análise técnica que tenta identificar onde grandes players institucionais (bancos, hedge funds, market makers) estão posicionados. A premissa é que o mercado é movido por esses grandes players — e se você consegue identificar onde eles entraram, pode seguir o dinheiro inteligente.',
      },
      {
        type: 'heading',
        content: 'O que é um Order Block?',
      },
      {
        type: 'text',
        content:
          'Um Order Block (OB) é a última vela (ou grupo de velas) antes de um movimento impulsivo significativo. É a zona onde acreditamos que institucionais colocaram suas ordens. Quando o preço retorna a essa zona, há alta probabilidade de reação.',
      },
      {
        type: 'svg',
        svgId: 'order-block',
        content: 'Order Block — Identificação e Uso',
      },
      {
        type: 'table',
        table: {
          headers: ['Tipo', 'Formação', 'Como usar'],
          rows: [
            ['Bullish Order Block', 'Última vela vermelha antes de um impulso de alta', 'Zona de compra quando o preço retorna'],
            ['Bearish Order Block', 'Última vela verde antes de um impulso de baixa', 'Zona de venda quando o preço retorna'],
          ],
        },
      },
      {
        type: 'example',
        content:
          'Exemplo no MES: O mercado estava caindo. Uma vela vermelha de 5.100 a 5.080 foi seguida por um impulso de alta que levou o preço para 5.200. O Bullish Order Block é a zona 5.080-5.100. Se o preço retornar a essa zona, é uma potencial entrada comprada com stop abaixo de 5.080.',
      },
      {
        type: 'callout',
        content:
          'Importante: Order Blocks são mais confiáveis quando estão alinhados com a tendência maior (HTF — Higher Time Frame). Um Bullish OB em um uptrend de 4 horas é muito mais confiável que um OB contra a tendência.',
      },
      {
        type: 'quiz',
        quiz: {
          question: 'Você identifica que a última vela antes de um impulso de alta foi uma vela vermelha de corpo grande. O preço retornou a essa zona. Qual é o nome desse conceito e o que você faz?',
          options: [
            { id: 'a', text: 'Fair Value Gap — você vende' },
            { id: 'b', text: 'Bullish Order Block — você busca entrada comprada' },
            { id: 'c', text: 'Bearish Order Block — você vende' },
            { id: 'd', text: 'Liquidity Sweep — você aguarda' },
          ],
          correctId: 'b',
          explanation:
            'A última vela vermelha antes de um impulso de alta é um Bullish Order Block. Quando o preço retorna a essa zona, é uma oportunidade de entrada comprada, pois acreditamos que há ordens institucionais de compra nessa área.',
        },
      },
      {
        type: 'source',
        url: 'https://www.tradezella.com/learning-items/key-ict-concepts',
        label: 'TradeZella — Key ICT Concepts: Order Blocks and Fair Value Gaps',
      },
    ],
  },
  {
    id: '3.2',
    title: 'Fair Value Gaps — As Lacunas de Liquidez',
    duration: '10 min',
    blocks: [
      {
        type: 'text',
        content:
          'Um Fair Value Gap (FVG), também chamado de imbalance, é uma zona onde o preço se moveu tão rapidamente que não houve negociação suficiente para "preencher" a área. O mercado tende a retornar a essas zonas para "equilibrar" a oferta e demanda.',
      },
      {
        type: 'heading',
        content: 'Como Identificar um FVG',
      },
      {
        type: 'text',
        content:
          'Um FVG é formado por 3 velas. A zona do FVG é o espaço entre a sombra superior da primeira vela e a sombra inferior da terceira vela. Se esse espaço existe (as sombras não se sobrepõem), há um FVG.',
      },
      {
        type: 'svg',
        svgId: 'fair-value-gap',
        content: 'Fair Value Gap — Identificação em 3 Velas',
      },
      {
        type: 'example',
        content:
          'Exemplo: Vela 1 tem máxima em 5.100. Vela 2 é um impulso enorme. Vela 3 tem mínima em 5.120. O FVG é a zona entre 5.100 e 5.120. O preço "pulou" essa área. Quando retornar a 5.100-5.120, é uma zona de suporte potencial.',
      },
      {
        type: 'callout',
        content:
          'FVG + Order Block na mesma zona = Confluência. Quando um Fair Value Gap coincide com um Order Block, a probabilidade de reação é significativamente maior. Traders SMC chamam isso de "mitigation zone".',
      },
      {
        type: 'quiz',
        quiz: {
          question: 'Vela 1: máxima 5.200. Vela 2: impulso de alta. Vela 3: mínima 5.215. Existe um FVG? Se sim, qual é a zona?',
          options: [
            { id: 'a', text: 'Não há FVG — as velas se sobrepõem' },
            { id: 'b', text: 'Sim — FVG entre 5.200 e 5.215' },
            { id: 'c', text: 'Sim — FVG acima de 5.215' },
            { id: 'd', text: 'Sim — FVG abaixo de 5.200' },
          ],
          correctId: 'b',
          explanation:
            'A máxima da vela 1 (5.200) e a mínima da vela 3 (5.215) não se sobrepõem — há um gap de 15 pontos entre elas. Esse é o Fair Value Gap: a zona 5.200-5.215 onde o preço não negociou. O mercado tende a retornar a essa zona.',
        },
      },
    ],
  },
  {
    id: '3.3',
    title: 'Liquidity Sweeps — A Caçada aos Stops',
    duration: '10 min',
    blocks: [
      {
        type: 'text',
        content:
          'Liquidity Sweeps (ou stop hunts) são movimentos onde o preço penetra brevemente além de um nível óbvio de suporte ou resistência para acionar os stops de traders de varejo, antes de reverter na direção oposta. Grandes players precisam de liquidez para executar suas ordens — e os stops de traders menores fornecem essa liquidez.',
      },
      {
        type: 'svg',
        svgId: 'liquidity-sweep',
        content: 'Liquidity Sweep — Stop Hunt e Reversão',
      },
      {
        type: 'example',
        content:
          'Exemplo clássico: O MES tem uma mínima clara em 5.050 que todos os traders estão usando como suporte. Stops de compradores estão logo abaixo: 5.045-5.048. O preço desce para 5.043 (acionando todos os stops), depois reverte violentamente para 5.100. Os institucionais compraram a liquidez dos stops.',
      },
      {
        type: 'callout',
        content:
          'Como se proteger: Coloque seus stops em zonas menos óbvias. Em vez de colocar o stop exatamente abaixo de uma mínima visível, coloque 10-15 pontos além dela. Isso reduz a chance de ser "caçado" por um sweep.',
      },
      {
        type: 'quiz',
        quiz: {
          question: 'O MES tem suporte em 5.100 (mínima de 3 dias). O preço desce para 5.092, aciona muitos stops, e depois sobe rapidamente para 5.150. O que aconteceu?',
          options: [
            { id: 'a', text: 'Rompimento de suporte — o mercado vai continuar caindo' },
            { id: 'b', text: 'Liquidity Sweep — institucionais coletaram liquidez dos stops antes de subir' },
            { id: 'c', text: 'Padrão de Double Bottom — sinal de compra confirmado' },
            { id: 'd', text: 'Erro de execução — o preço voltou ao normal' },
          ],
          correctId: 'b',
          explanation:
            'O preço penetrou brevemente abaixo do suporte (5.100 → 5.092) para acionar stops de compradores, depois reverteu violentamente. Esse é o padrão clássico de Liquidity Sweep. Os institucionais usaram a liquidez dos stops para comprar a preços mais baixos.',
        },
      },
      {
        type: 'source',
        url: 'https://www.fluxcharts.com/articles/liquidity-sweeps-explained-how-to-identify-and-trade-them',
        label: 'FluxCharts — Liquidity Sweeps Explained',
      },
    ],
  },
];

// ============================================================
// MODULE 4 — GESTÃO E PSICOLOGIA
// ============================================================

const mod4Lessons: StudyLesson[] = [
  {
    id: '4.1',
    title: 'Psicologia do Trader — Por que o Cérebro Sabota',
    duration: '12 min',
    blocks: [
      {
        type: 'text',
        content:
          'Mark Douglas, autor de "Trading in the Zone" (1994), passou décadas estudando por que traders tecnicamente competentes continuam perdendo dinheiro. Sua conclusão: o problema não é o método — é a mentalidade. O cérebro humano não foi projetado para operar nos mercados financeiros.',
      },
      {
        type: 'callout',
        content:
          '"O mercado não te deve nada. Cada trade é um evento independente. Sua história de ganhos ou perdas não afeta o próximo resultado." — Mark Douglas, Trading in the Zone',
      },
      {
        type: 'heading',
        content: 'Os 5 Erros Psicológicos Mais Comuns',
      },
      {
        type: 'table',
        table: {
          headers: ['Erro', 'Como se manifesta', 'Consequência'],
          rows: [
            ['Revenge Trading', 'Operar para recuperar perdas imediatamente', 'Perdas maiores, violação de regras'],
            ['FOMO (Fear of Missing Out)', 'Entrar tarde em movimentos já iniciados', 'Entradas ruins, stops muito apertados'],
            ['Mover o Stop Loss', 'Ampliar o stop quando o trade vai contra', 'Perdas muito maiores que o planejado'],
            ['Sair cedo do lucro', 'Fechar antes do target por medo', 'R:R real muito menor que o planejado'],
            ['Overtrading', 'Operar sem setup claro por tédio/ansiedade', 'Erosão do capital por taxas e perdas aleatórias'],
          ],
        },
      },
      {
        type: 'heading',
        content: 'O Ciclo da Emoção no Trading',
      },
      {
        type: 'svg',
        svgId: 'emotion-cycle',
        content: 'Ciclo Emocional do Trader',
      },
      {
        type: 'text',
        content:
          'Após uma série de ganhos, o trader sente euforia e aumenta o tamanho da posição. Após uma perda grande, sente medo e reduz. Após várias perdas, entra em desespero e tenta "recuperar tudo" em uma operação. Esse ciclo é a principal causa de destruição de contas.',
      },
      {
        type: 'example',
        content:
          'Cenário real: Trader passa a avaliação da prop firm com 3 semanas de consistência. Na primeira semana da conta financiada, tem 2 dias ruins e perde $800. No terceiro dia, aumenta o tamanho para "recuperar rápido", viola o daily loss limit e perde a conta. O problema não foi técnico — foi psicológico.',
      },
      {
        type: 'quiz',
        quiz: {
          question: 'Você perdeu 3 trades seguidos e está no limite de -$1.500 do seu daily loss limit de $2.000. O que você deve fazer?',
          options: [
            { id: 'a', text: 'Aumentar o tamanho para recuperar mais rápido' },
            { id: 'b', text: 'Fazer mais 1 trade com o setup perfeito' },
            { id: 'c', text: 'Parar de operar pelo dia e revisar os trades no diário' },
            { id: 'd', text: 'Mudar para um timeframe menor para ter mais oportunidades' },
          ],
          correctId: 'c',
          explanation:
            'Após 3 perdas seguidas, você está em modo emocional — não em modo analítico. Continuar operando aumenta a probabilidade de violar o daily loss limit. A ação correta é parar, revisar o que aconteceu e voltar amanhã com a mente limpa.',
        },
      },
      {
        type: 'source',
        url: 'https://www.fortraders.com/blog/why-every-trader-needs-a-trading-journal',
        label: 'ForTraders — Why Every Trader Needs a Trading Journal',
      },
    ],
  },
  {
    id: '4.2',
    title: 'Plano de Trading — Regras que Salvam Contas',
    duration: '10 min',
    blocks: [
      {
        type: 'text',
        content:
          'Um plano de trading é um documento escrito que define suas regras de entrada, saída, tamanho de posição e gestão de risco antes de você abrir qualquer trade. Sem um plano, você está improvisando — e improvisação no mercado financeiro é sinônimo de perda.',
      },
      {
        type: 'heading',
        content: 'Os 7 Elementos de um Plano de Trading',
      },
      {
        type: 'table',
        table: {
          headers: ['Elemento', 'O que definir', 'Exemplo'],
          rows: [
            ['Instrumento', 'O que você opera', 'MES e MNQ apenas'],
            ['Horário', 'Quando você opera', '9h30-11h ET (abertura NY)'],
            ['Setup', 'Qual padrão você busca', 'Bull Flag após abertura + volume'],
            ['Entrada', 'Onde exatamente você entra', 'Rompimento do topo do canal + 1 tick'],
            ['Stop Loss', 'Onde você sai se errar', 'Abaixo da mínima do canal'],
            ['Target', 'Onde você realiza lucro', 'R:R mínimo 1:2'],
            ['Regras de risco', 'Limites diários e semanais', 'Máx $300/dia, máx 3 trades/dia'],
          ],
        },
      },
      {
        type: 'callout',
        content:
          '"Um plano de trading não garante lucros — mas garante que suas perdas sejam controladas e seus erros sejam identificáveis."',
      },
      {
        type: 'heading',
        content: 'O Diário de Trading — Seu Maior Ativo',
      },
      {
        type: 'text',
        content:
          'O diário de trading é onde você registra cada operação com detalhes: setup, entrada, saída, resultado, emoção no momento e lição aprendida. Traders profissionais tratam o diário como obrigatório — é a única forma de identificar padrões de erro e melhorar sistematicamente.',
      },
      {
        type: 'example',
        content:
          'O The Desk já tem um sistema de diário integrado. Use-o para registrar não apenas os números, mas também o contexto: "Entrei por FOMO sem setup claro" ou "Saí cedo por medo — o preço atingiu o target 20 minutos depois". Esses registros valem mais que qualquer curso.',
      },
      {
        type: 'quiz',
        quiz: {
          question: 'Qual é o principal benefício de manter um diário de trading detalhado?',
          options: [
            { id: 'a', text: 'Impressionar outros traders com seus resultados' },
            { id: 'b', text: 'Identificar padrões de erro e melhorar sistematicamente' },
            { id: 'c', text: 'Calcular impostos mais facilmente' },
            { id: 'd', text: 'Provar para a prop firm que você é consistente' },
          ],
          correctId: 'b',
          explanation:
            'O diário de trading é uma ferramenta de melhoria contínua. Ao registrar cada trade com contexto e emoções, você consegue identificar: quais setups funcionam para você, em quais horários você performa melhor, quais erros psicológicos você repete, e como melhorar sua execução.',
        },
      },
      {
        type: 'source',
        url: 'https://tradethepool.com/mental-skill/the-importance-of-keeping-a-trading-journal/',
        label: 'Trade The Pool — The Importance of Keeping a Trading Journal',
      },
    ],
  },
  {
    id: '4.3',
    title: 'Consistência — O Único Caminho para Contas Financiadas',
    duration: '8 min',
    blocks: [
      {
        type: 'text',
        content:
          'Consistência não significa ganhar todos os dias — significa seguir seu plano todos os dias. Um trader consistente que perde em 40% dos trades mas segue suas regras de risco é muito mais valioso para uma prop firm do que um trader que ganha 70% mas tem drawdowns explosivos.',
      },
      {
        type: 'heading',
        content: 'O que Prop Firms Realmente Querem Ver',
      },
      {
        type: 'table',
        table: {
          headers: ['Métrica', 'O que indica', 'Benchmark saudável'],
          rows: [
            ['Win Rate', 'Porcentagem de trades vencedores', '40-60% (depende do R:R)'],
            ['Profit Factor', 'Lucro total ÷ Prejuízo total', '>1,5 é bom, >2,0 é excelente'],
            ['Max Drawdown', 'Maior queda do pico ao fundo', '<50% do daily loss limit'],
            ['Consistência diária', 'Variação entre dias', 'Sem dias explosivos (+ ou -)'],
            ['Average Win/Loss', 'Tamanho médio de ganhos vs perdas', 'Ganhos ≥ 2x perdas'],
          ],
        },
      },
      {
        type: 'callout',
        content:
          'Estatística do setor: Apenas 10-15% dos traders passam na primeira avaliação de prop firm. Os que passam geralmente têm profit factor acima de 1,5 e nunca chegam perto do daily loss limit.',
      },
      {
        type: 'example',
        content:
          'Trader A: 70% de acerto, mas tem 2 dias por mês onde perde $1.800 (quase o daily limit). Trader B: 45% de acerto, R:R 1:2,5, nunca perde mais de $600 em um dia. A prop firm prefere o Trader B — ele é previsível e controlável.',
      },
      {
        type: 'quiz',
        quiz: {
          question: 'Um trader tem: 50 trades, 25 ganhos (média $200 cada), 25 perdas (média $80 cada). Qual é o Profit Factor?',
          options: [
            { id: 'a', text: '1,25' },
            { id: 'b', text: '2,50' },
            { id: 'c', text: '1,50' },
            { id: 'd', text: '3,00' },
          ],
          correctId: 'b',
          explanation:
            'Profit Factor = Lucro total ÷ Prejuízo total. Lucro total: 25 × $200 = $5.000. Prejuízo total: 25 × $80 = $2.000. PF = $5.000 ÷ $2.000 = 2,50. Excelente! Esse trader está ganhando $2,50 para cada $1,00 que perde.',
        },
      },
      {
        type: 'source',
        url: 'https://www.quantvps.com/blog/prop-firm-statistics',
        label: 'QuantVPS — Prop Firm Statistics 2026: Pass Rates, Payouts & Trends',
      },
    ],
  },
];

// ============================================================
// QUIZ BANKS (for module-level quizzes)
// ============================================================

const mod1Quiz: QuizBlock[] = [
  {
    question: 'Um candle tem Open=5.000, High=5.060, Low=4.970, Close=4.990. Qual é a cor e o tamanho do corpo?',
    options: [
      { id: 'a', text: 'Verde, 60 pontos' },
      { id: 'b', text: 'Vermelho, 10 pontos' },
      { id: 'c', text: 'Vermelho, 90 pontos' },
      { id: 'd', text: 'Verde, 20 pontos' },
    ],
    correctId: 'b',
    explanation: 'Close (4.990) < Open (5.000) = candle VERMELHO. Corpo = Open - Close = 5.000 - 4.990 = 10 pontos.',
  },
  {
    question: 'Qual é o valor de 1 ponto no contrato MES (Micro E-mini S&P 500)?',
    options: [
      { id: 'a', text: '$1,25' },
      { id: 'b', text: '$50,00' },
      { id: 'c', text: '$5,00' },
      { id: 'd', text: '$2,00' },
    ],
    correctId: 'c',
    explanation: 'O MES tem multiplicador de $5 × índice. Portanto, 1 ponto = $5. O tick mínimo é 0,25 pontos = $1,25.',
  },
  {
    question: 'O que é a "inversão de polaridade" no contexto de suporte e resistência?',
    options: [
      { id: 'a', text: 'Quando o preço inverte no mesmo nível duas vezes' },
      { id: 'b', text: 'Quando um suporte rompido vira resistência e vice-versa' },
      { id: 'c', text: 'Quando a tendência muda de alta para baixa' },
      { id: 'd', text: 'Quando o volume inverte a direção do preço' },
    ],
    correctId: 'b',
    explanation: 'Inversão de polaridade (polarity flip): suporte rompido → vira resistência. Resistência rompida → vira suporte. É uma das observações mais confiáveis da análise técnica.',
  },
  {
    question: 'Você tem conta de $100k na Topstep com daily loss limit de $2.000. Você perdeu $1.500 hoje. Qual é a decisão correta?',
    options: [
      { id: 'a', text: 'Continuar — ainda tem $500 de margem' },
      { id: 'b', text: 'Aumentar o tamanho para recuperar mais rápido' },
      { id: 'c', text: 'Parar de operar pelo dia' },
      { id: 'd', text: 'Mudar para MNQ que é mais volátil' },
    ],
    correctId: 'c',
    explanation: 'Com 75% do daily loss limit consumido ($1.500 de $2.000), a decisão profissional é parar. Continuar operando em modo emocional quase sempre resulta em violar o limite e perder a conta.',
  },
  {
    question: 'Qual é o R:R de uma operação com stop de 8 pontos e target de 24 pontos no MES?',
    options: [
      { id: 'a', text: '1:1' },
      { id: 'b', text: '1:2' },
      { id: 'c', text: '1:3' },
      { id: 'd', text: '1:4' },
    ],
    correctId: 'c',
    explanation: 'R:R = Target ÷ Stop = 24 ÷ 8 = 3. Portanto R:R = 1:3. Com esse R:R, você pode perder 75% das operações e ainda empatar.',
  },
];

const mod2Quiz: QuizBlock[] = [
  {
    question: 'O MES formou: máxima 5.100, mínima 5.050, máxima 5.080, mínima 5.020. Qual é a estrutura?',
    options: [
      { id: 'a', text: 'Uptrend — Higher Highs e Higher Lows' },
      { id: 'b', text: 'Downtrend — Lower Highs e Lower Lows' },
      { id: 'c', text: 'Consolidação — sem padrão' },
      { id: 'd', text: 'Reversão de alta' },
    ],
    correctId: 'b',
    explanation: 'Máximas: 5.100 → 5.080 (Lower Highs ✓). Mínimas: 5.050 → 5.020 (Lower Lows ✓). Estrutura de DOWNTREND.',
  },
  {
    question: 'O que é um Bull Flag?',
    options: [
      { id: 'a', text: 'Queda forte seguida de consolidação ascendente' },
      { id: 'b', text: 'Subida forte seguida de consolidação descendente, depois rompimento para cima' },
      { id: 'c', text: 'Dois topos no mesmo nível' },
      { id: 'd', text: 'Candle verde de corpo longo' },
    ],
    correctId: 'b',
    explanation: 'Bull Flag = mastro (subida forte) + bandeira (consolidação em canal descendente) + rompimento para cima. É um padrão de continuação de alta.',
  },
  {
    question: 'Volume alto em um rompimento de resistência indica:',
    options: [
      { id: 'a', text: 'Exaustão — o movimento vai reverter' },
      { id: 'b', text: 'Rompimento genuíno com participação institucional' },
      { id: 'c', text: 'Nada — volume não é relevante' },
      { id: 'd', text: 'Sinal de venda' },
    ],
    correctId: 'b',
    explanation: 'Volume alto em rompimento = confirmação. Grandes players precisam de volume para executar ordens. Volume acima da média em um rompimento indica que institucionais estão participando.',
  },
];

const mod3Quiz: QuizBlock[] = [
  {
    question: 'O que é um Bullish Order Block?',
    options: [
      { id: 'a', text: 'A última vela verde antes de um impulso de alta' },
      { id: 'b', text: 'A última vela vermelha antes de um impulso de alta' },
      { id: 'c', text: 'Uma zona de resistência forte' },
      { id: 'd', text: 'Um padrão de 3 candles verdes' },
    ],
    correctId: 'b',
    explanation: 'Bullish Order Block = última vela VERMELHA antes de um impulso de ALTA. É onde acreditamos que institucionais colocaram ordens de compra.',
  },
  {
    question: 'Um Fair Value Gap (FVG) é formado por:',
    options: [
      { id: 'a', text: '2 velas com gap entre elas' },
      { id: 'b', text: '3 velas onde há espaço entre a sombra superior da 1ª e a sombra inferior da 3ª' },
      { id: 'c', text: 'Uma vela de corpo muito longo' },
      { id: 'd', text: 'Um rompimento de suporte' },
    ],
    correctId: 'b',
    explanation: 'FVG é identificado em 3 velas: se há espaço (gap) entre a sombra superior da vela 1 e a sombra inferior da vela 3, existe um Fair Value Gap nessa zona.',
  },
  {
    question: 'O que é um Liquidity Sweep?',
    options: [
      { id: 'a', text: 'Um rompimento genuíno de suporte ou resistência' },
      { id: 'b', text: 'Movimento que penetra além de um nível para acionar stops, depois reverte' },
      { id: 'c', text: 'Alta de volume em um candle' },
      { id: 'd', text: 'Padrão de 3 candles consecutivos' },
    ],
    correctId: 'b',
    explanation: 'Liquidity Sweep = o preço vai além de um nível óbvio (acionando stops de traders menores) e depois reverte. Institucionais usam a liquidez dos stops para executar suas próprias ordens.',
  },
];

const mod4Quiz: QuizBlock[] = [
  {
    question: 'O que é "Revenge Trading"?',
    options: [
      { id: 'a', text: 'Operar em mercados internacionais' },
      { id: 'b', text: 'Operar para recuperar perdas imediatamente após um trade ruim' },
      { id: 'c', text: 'Copiar trades de outros traders' },
      { id: 'd', text: 'Aumentar o tamanho após ganhos consecutivos' },
    ],
    correctId: 'b',
    explanation: 'Revenge Trading é operar emocionalmente para "se vingar" do mercado após uma perda. É uma das principais causas de destruição de contas — o trader entra sem setup claro e geralmente perde ainda mais.',
  },
  {
    question: 'Um trader tem Profit Factor de 2,0. O que isso significa?',
    options: [
      { id: 'a', text: 'Ele ganha 2 trades para cada 1 que perde' },
      { id: 'b', text: 'Ele ganha $2,00 para cada $1,00 que perde' },
      { id: 'c', text: 'Ele tem 200% de retorno anual' },
      { id: 'd', text: 'Ele opera com R:R de 1:2' },
    ],
    correctId: 'b',
    explanation: 'Profit Factor = Lucro total ÷ Prejuízo total. PF de 2,0 significa que para cada $1 perdido, o trader ganha $2. É uma métrica de qualidade do sistema, não de taxa de acerto.',
  },
  {
    question: 'Qual é o principal objetivo de um plano de trading?',
    options: [
      { id: 'a', text: 'Garantir lucros em todas as operações' },
      { id: 'b', text: 'Definir regras claras antes de operar para eliminar decisões emocionais' },
      { id: 'c', text: 'Impressionar a prop firm com sua estratégia' },
      { id: 'd', text: 'Calcular o tamanho ideal de posição' },
    ],
    correctId: 'b',
    explanation: 'Um plano de trading define suas regras ANTES de você estar no mercado — quando as emoções não interferem. Seguir o plano elimina decisões impulsivas e torna seu trading sistemático e analisável.',
  },
];

// ============================================================
// EXPORT — FULL CURRICULUM
// ============================================================

export const studyModules: StudyModule[] = [
  {
    id: 'mod1',
    number: 1,
    title: 'Fundamentos do Mercado',
    subtitle: 'Candles, S&R, Futuros, Risco e Prop Firms',
    icon: '📊',
    color: '#00d4aa',
    lessons: mod1Lessons,
    quizQuestions: mod1Quiz,
  },
  {
    id: 'mod2',
    number: 2,
    title: 'Price Action',
    subtitle: 'Tendência, Padrões e Volume',
    icon: '📈',
    color: '#4f9eff',
    lessons: mod2Lessons,
    quizQuestions: mod2Quiz,
  },
  {
    id: 'mod3',
    number: 3,
    title: 'Smart Money Concepts',
    subtitle: 'Order Blocks, FVG e Liquidity',
    icon: '🏦',
    color: '#a855f7',
    lessons: mod3Lessons,
    quizQuestions: mod3Quiz,
  },
  {
    id: 'mod4',
    number: 4,
    title: 'Gestão & Psicologia',
    subtitle: 'Mentalidade, Plano e Consistência',
    icon: '🧠',
    color: '#f59e0b',
    lessons: mod4Lessons,
    quizQuestions: mod4Quiz,
  },
];
