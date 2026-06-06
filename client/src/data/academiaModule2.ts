// THE DESK — Academia Module 2: Price Action (EXPANDED)
// Sources: Al Brooks (brookstradingcourse.com), Investopedia, CME Group,
//          TradingView, BabyPips, Lance Beggs (yourtradingcoach.com)
// ============================================================

import type { StudyLesson, QuizBlock } from './academiaStudyContent';

// ── LIÇÃO 2.1 — Estrutura de Tendência ────────────────────────
export const lesson_2_1: StudyLesson = {
  id: '2.1',
  title: 'Estrutura de Tendência — Topos e Fundos',
  duration: '16 min',
  blocks: [
    {
      type: 'text',
      content:
        'A estrutura de mercado é a linguagem fundamental do Price Action. Antes de qualquer indicador, antes de qualquer padrão de candle, você precisa entender onde o mercado está estruturalmente. Charles Dow, fundador da teoria técnica moderna, definiu em 1900: uma tendência de alta é uma série de topos e fundos ascendentes (Higher Highs e Higher Lows). Uma tendência de baixa é uma série de topos e fundos descendentes (Lower Highs e Lower Lows). Simples assim — mas poucos traders realmente aplicam isso de forma consistente.',
    },
    {
      type: 'callout',
      content:
        'Fonte: Dow Theory — Charles Dow (1900). Al Brooks — "Reading Price Charts Bar by Bar" (2009). Investopedia — Dow Theory: investopedia.com/terms/d/dowtheory.asp',
    },
    {
      type: 'svg',
      svgId: 'trendStructure',
    },
    {
      type: 'heading',
      content: 'Higher Highs e Higher Lows — A Tendência de Alta',
    },
    {
      type: 'text',
      content:
        'Em uma tendência de alta saudável, cada swing high (topo) é mais alto que o anterior, e cada swing low (fundo) é mais alto que o anterior. Isso significa que compradores estão dispostos a pagar preços cada vez mais altos, e mesmo quando o mercado corrige, os vendedores não conseguem empurrar o preço abaixo do fundo anterior. O momento em que o preço quebra abaixo do último Higher Low é o primeiro sinal de que a tendência pode estar enfraquecendo.',
    },
    {
      type: 'table',
      table: {
        headers: ['Estrutura', 'Topos', 'Fundos', 'Interpretação', 'Viés'],
        rows: [
          ['Tendência de Alta', 'HH (Higher High)', 'HL (Higher Low)', 'Compradores no controle', 'Comprar em correções (HL)'],
          ['Tendência de Baixa', 'LH (Lower High)', 'LL (Lower Low)', 'Vendedores no controle', 'Vender em bounces (LH)'],
          ['Lateral (Range)', 'Topos iguais', 'Fundos iguais', 'Equilíbrio entre forças', 'Comprar no suporte, vender na resistência'],
          ['Reversão de Alta', 'LH → HH', 'LL → HL', 'Transição de baixa para alta', 'Aguardar confirmação do HL'],
          ['Reversão de Baixa', 'HH → LH', 'HL → LL', 'Transição de alta para baixa', 'Aguardar confirmação do LH'],
        ],
      },
    },
    {
      type: 'heading',
      content: 'Identificando Swing Highs e Swing Lows',
    },
    {
      type: 'text',
      content:
        'Um Swing High é um candle com máxima mais alta que os N candles anteriores e posteriores. Um Swing Low é um candle com mínima mais baixa que os N candles ao redor. O valor de N depende do timeframe e do estilo de trading. Para day trading no MES/MNQ em 5 minutos, N=3 (3 candles antes e 3 depois) é um bom ponto de partida. Swing highs e lows são os "blocos de construção" da estrutura de mercado — tudo mais é derivado deles.',
    },
    {
      type: 'example',
      content:
        'Exemplo real: MES em 5 de março de 2024. O índice estava em tendência de alta com HH em 5.180 e HL em 5.120. O preço subiu para novo HH em 5.210, corrigiu para HL em 5.155 (acima do anterior de 5.120 — estrutura intacta), e então subiu para 5.250. Traders que identificaram a estrutura de HH/HL compraram no HL de 5.155 com stop em 5.135 (abaixo do HL) e target no próximo HH projetado em 5.240. Risco: 20 pontos × $5 = $100. Ganho: 85 pontos × $5 = $425. R:R = 1:4.25.',
    },
    {
      type: 'quiz',
      quiz: {
        question: 'O MES fez os seguintes movimentos: 5.100 → 5.180 → 5.130 → 5.200 → 5.155 → 5.240. Qual é a estrutura atual?',
        options: [
          { id: 'a', text: 'Tendência de baixa (Lower Highs e Lower Lows)' },
          { id: 'b', text: 'Mercado lateral (topos e fundos iguais)' },
          { id: 'c', text: 'Tendência de alta (Higher Highs e Higher Lows)' },
          { id: 'd', text: 'Reversão de tendência em andamento' },
        ],
        correctId: 'c',
        explanation: 'Topos: 5.180 → 5.200 → 5.240 (cada um mais alto = Higher Highs). Fundos: 5.130 → 5.155 (cada um mais alto = Higher Lows). Estrutura de tendência de alta intacta. O viés é comprar em correções para os Higher Lows.',
      },
    },
    {
      type: 'quiz',
      quiz: {
        question: 'Em uma tendência de alta, qual é o primeiro sinal de que a estrutura pode estar quebrando?',
        options: [
          { id: 'a', text: 'O preço não consegue fazer um novo Higher High' },
          { id: 'b', text: 'O preço quebra abaixo do último Higher Low' },
          { id: 'c', text: 'O volume diminui durante a subida' },
          { id: 'd', text: 'Aparece um candle vermelho grande' },
        ],
        correctId: 'b',
        explanation: 'O primeiro sinal estrutural de fraqueza em uma tendência de alta é quando o preço quebra abaixo do último Higher Low. Isso significa que vendedores conseguiram empurrar o preço abaixo de onde compradores anteriormente entraram — a estrutura de HL está quebrada. Pode ser início de reversão ou lateralização.',
      },
    },
    {
      type: 'source',
      label: 'Investopedia — Dow Theory',
      url: 'https://www.investopedia.com/terms/d/dowtheory.asp',
    },
    {
      type: 'source',
      label: 'Al Brooks — Brooks Trading Course',
      url: 'https://www.brookstradingcourse.com/',
    },
  ],
};

// ── LIÇÃO 2.2 — Zonas de Oferta e Demanda ────────────────────
export const lesson_2_2: StudyLesson = {
  id: '2.2',
  title: 'Zonas de Oferta e Demanda — Onde os Institucionais Operam',
  duration: '18 min',
  blocks: [
    {
      type: 'text',
      content:
        'Zonas de oferta e demanda (Supply & Demand) são uma evolução do conceito de suporte e resistência. Enquanto S&R foca em níveis de preço onde o mercado reagiu, as zonas de S&D focam em ONDE os grandes players (institucionais, market makers) deixaram ordens pendentes. A teoria foi popularizada por Sam Seiden e é baseada na premissa de que grandes ordens institucionais não podem ser executadas de uma vez — elas deixam "rastros" no gráfico na forma de movimentos explosivos.',
    },
    {
      type: 'callout',
      content:
        'Fonte: Sam Seiden — Online Trading Academy. Investopedia — Supply and Demand in Trading: investopedia.com/articles/active-trading/031215/supply-and-demand-trading.asp',
    },
    {
      type: 'heading',
      content: 'Como Identificar Zonas de Demanda (Compra)',
    },
    {
      type: 'text',
      content:
        'Uma zona de demanda é formada quando o preço estava consolidando (lateral) e então explodiu para cima com força. A lógica: institucionais colocaram ordens de compra nessa zona, mas não conseguiram executar tudo. Quando o preço retorna à zona, as ordens restantes são ativadas, criando suporte. Características de uma zona de demanda válida: (1) O preço saiu da zona com um ou poucos candles grandes; (2) A zona ainda não foi "testada" (quanto menos testes, mais ordens restantes); (3) O movimento de saída foi forte (indica urgência institucional).',
    },
    {
      type: 'table',
      table: {
        headers: ['Tipo de Zona', 'Formação', 'Expectativa', 'Qualidade'],
        rows: [
          ['Demanda (Rally-Base-Rally)', 'Subida → consolidação → subida forte', 'Preço retorna e sobe novamente', 'Alta'],
          ['Demanda (Drop-Base-Rally)', 'Queda → consolidação → subida forte', 'Preço retorna e sobe (reversão)', 'Muito Alta'],
          ['Oferta (Rally-Base-Drop)', 'Subida → consolidação → queda forte', 'Preço retorna e cai (reversão)', 'Muito Alta'],
          ['Oferta (Drop-Base-Drop)', 'Queda → consolidação → queda forte', 'Preço retorna e cai novamente', 'Alta'],
        ],
      },
    },
    {
      type: 'heading',
      content: 'Frescor da Zona — Quantas Vezes Foi Testada?',
    },
    {
      type: 'text',
      content:
        'O "frescor" de uma zona é inversamente proporcional ao número de vezes que foi testada. Uma zona nunca testada tem todas as ordens institucionais intactas — alta probabilidade de reação. Uma zona testada 3 vezes já consumiu a maioria das ordens — baixa probabilidade. Regra prática: use zonas com 0-1 testes anteriores. Após 2 testes, a zona perde força significativamente. Após 3 testes, considere que a zona foi "consumida" e pode ser rompida.',
    },
    {
      type: 'example',
      content:
        'Exemplo com MNQ: Em fevereiro de 2024, o MNQ estava em 17.800. Houve uma consolidação de 30 minutos entre 17.750-17.790, seguida de um rali explosivo de 200 pontos em 3 candles de 5 minutos (Drop-Base-Rally). Essa zona de demanda em 17.750-17.790 nunca tinha sido testada. Quando o MNQ corrigiu de volta para 17.780 em março, traders que identificaram a zona compraram com stop em 17.730 (abaixo da zona) e target em 18.000 (próxima zona de oferta). Risco: 50 pontos × $2 = $100. Ganho: 220 pontos × $2 = $440. R:R = 1:4.4.',
    },
    {
      type: 'quiz',
      quiz: {
        question: 'Uma zona de demanda foi formada quando o preço consolidou entre 5.200-5.220 e então subiu 80 pontos rapidamente. O preço já retornou a essa zona 3 vezes e subiu em cada uma. Qual é a qualidade atual dessa zona?',
        options: [
          { id: 'a', text: 'Excelente — foi testada 3 vezes e funcionou todas, é muito confiável' },
          { id: 'b', text: 'Baixa — após 3 testes, a maioria das ordens institucionais foi consumida' },
          { id: 'c', text: 'Média — depende do volume em cada teste' },
          { id: 'd', text: 'Alta — zonas de demanda ficam mais fortes com cada teste' },
        ],
        correctId: 'b',
        explanation: 'Cada teste de uma zona consome ordens institucionais pendentes. Após 3 testes, a maioria das ordens foi executada. A zona perde força e tem alta probabilidade de ser rompida no próximo teste. Prefira zonas "frescas" (0-1 testes) para maior probabilidade de reação.',
      },
    },
    {
      type: 'source',
      label: 'Investopedia — Supply and Demand in Trading',
      url: 'https://www.investopedia.com/articles/active-trading/031215/supply-and-demand-trading.asp',
    },
  ],
};

// ── LIÇÃO 2.3 — Padrões de Price Action ──────────────────────
export const lesson_2_3: StudyLesson = {
  id: '2.3',
  title: 'Padrões de Price Action — Flags, Wedges e Triângulos',
  duration: '20 min',
  blocks: [
    {
      type: 'text',
      content:
        'Padrões gráficos são formações de preço que se repetem ao longo da história dos mercados. Eles funcionam porque refletem psicologia humana — medo, ganância e indecisão criam os mesmos padrões repetidamente. Thomas Bulkowski, em "Encyclopedia of Chart Patterns" (2021), analisou mais de 1.000 padrões e calculou as taxas de sucesso de cada um. Os padrões de continuação (que confirmam a tendência) têm taxas de sucesso maiores que os de reversão.',
    },
    {
      type: 'callout',
      content:
        'Fonte: Thomas Bulkowski — "Encyclopedia of Chart Patterns" (3ª ed., 2021). Investopedia — Chart Patterns: investopedia.com/articles/technical/112601.asp',
    },
    {
      type: 'heading',
      content: 'Bull Flag — O Padrão de Continuação Mais Confiável',
    },
    {
      type: 'text',
      content:
        'O Bull Flag é formado por dois componentes: (1) o "mastro" — um movimento forte e rápido de alta (o impulso inicial); (2) a "bandeira" — uma consolidação em canal levemente descendente ou lateral após o mastro. O padrão representa uma pausa antes da continuação da tendência. Traders compram no rompimento da parte superior da bandeira, com stop abaixo da parte inferior da bandeira e target projetado pelo tamanho do mastro. Bulkowski reporta taxa de sucesso de 67% para Bull Flags.',
    },
    {
      type: 'table',
      table: {
        headers: ['Padrão', 'Tipo', 'Taxa de Sucesso (Bulkowski)', 'Onde Entrar', 'Stop'],
        rows: [
          ['Bull Flag', 'Continuação de alta', '67%', 'Rompimento da resistência da bandeira', 'Abaixo da mínima da bandeira'],
          ['Bear Flag', 'Continuação de baixa', '67%', 'Rompimento do suporte da bandeira', 'Acima da máxima da bandeira'],
          ['Triângulo Ascendente', 'Continuação de alta', '72%', 'Rompimento da resistência horizontal', 'Abaixo do suporte do triângulo'],
          ['Triângulo Descendente', 'Continuação de baixa', '72%', 'Rompimento do suporte horizontal', 'Acima da resistência do triângulo'],
          ['Triângulo Simétrico', 'Neutro (continuação)', '54%', 'Rompimento em qualquer direção', 'Oposto ao rompimento'],
          ['Cunha de Alta (Rising Wedge)', 'Reversão de baixa', '69%', 'Rompimento abaixo do suporte', 'Acima da máxima recente'],
          ['Cunha de Baixa (Falling Wedge)', 'Reversão de alta', '74%', 'Rompimento acima da resistência', 'Abaixo da mínima recente'],
          ['Cabeça e Ombros', 'Reversão de baixa', '83%', 'Rompimento da neckline', 'Acima do ombro direito'],
        ],
      },
    },
    {
      type: 'heading',
      content: 'Cabeça e Ombros — O Padrão de Reversão Mais Famoso',
    },
    {
      type: 'text',
      content:
        'O padrão Cabeça e Ombros é formado por três topos: dois ombros (mais baixos) e uma cabeça (mais alta) no centro. A "neckline" é a linha que conecta os dois fundos entre os três topos. O padrão se completa quando o preço rompe abaixo da neckline. O target é projetado subtraindo a altura da cabeça (da neckline até o topo) do ponto de rompimento. Com taxa de sucesso de 83% (Bulkowski), é um dos padrões mais confiáveis — mas também um dos mais raros.',
    },
    {
      type: 'example',
      content:
        'Exemplo real: Em julho de 2023, o MES formou um Cabeça e Ombros no gráfico de 15 minutos. Ombro esquerdo em 4.580, cabeça em 4.620, ombro direito em 4.575. Neckline em 4.540. O preço rompeu abaixo de 4.540 com volume 2x acima da média. Target: 4.540 - (4.620 - 4.540) = 4.540 - 80 = 4.460. O preço atingiu 4.458 nas horas seguintes. Traders que venderam no rompimento de 4.540 com stop em 4.560 (20 pontos) e target em 4.460 (80 pontos) tiveram R:R de 1:4.',
    },
    {
      type: 'quiz',
      quiz: {
        question: 'O MES fez um rali de 5.200 para 5.280 (mastro de 80 pontos) em 4 candles de 5 minutos, depois consolidou em canal descendente entre 5.260-5.275 por 20 minutos. O que você está vendo e onde é o target projetado?',
        options: [
          { id: 'a', text: 'Bear Flag — target em 5.200 (queda de 80 pontos)' },
          { id: 'b', text: 'Bull Flag — target em 5.355 (5.275 + 80 pontos do mastro)' },
          { id: 'c', text: 'Triângulo simétrico — aguardar rompimento' },
          { id: 'd', text: 'Cabeça e Ombros — reversão iminente' },
        ],
        correctId: 'b',
        explanation: 'Bull Flag: mastro de 80 pontos (5.200→5.280) + bandeira descendente (5.260-5.275). Entrada no rompimento acima de 5.275. Target = topo da bandeira + tamanho do mastro = 5.275 + 80 = 5.355. Stop abaixo da mínima da bandeira (5.260 - buffer = 5.255). R:R = 20 pontos risco para 80 pontos ganho = 1:4.',
      },
    },
    {
      type: 'source',
      label: 'Thomas Bulkowski — Encyclopedia of Chart Patterns',
      url: 'https://www.investopedia.com/articles/technical/112601.asp',
    },
    {
      type: 'source',
      label: 'Investopedia — Chart Patterns',
      url: 'https://www.investopedia.com/articles/technical/112601.asp',
    },
  ],
};

// ── LIÇÃO 2.4 — Médias Móveis e EMA ──────────────────────────
export const lesson_2_4: StudyLesson = {
  id: '2.4',
  title: 'Médias Móveis — O Termômetro da Tendência',
  duration: '15 min',
  blocks: [
    {
      type: 'text',
      content:
        'Médias Móveis (Moving Averages) são a ferramenta de análise técnica mais usada no mundo. Elas suavizam o ruído do preço e mostram a direção da tendência de forma clara. Existem dois tipos principais: SMA (Simple Moving Average) — média aritmética dos últimos N fechamentos; e EMA (Exponential Moving Average) — média que dá mais peso aos preços recentes. Para day trading, a EMA é preferida porque reage mais rápido às mudanças de preço.',
    },
    {
      type: 'table',
      table: {
        headers: ['Média Móvel', 'Uso Principal', 'Timeframe Ideal', 'Interpretação'],
        rows: [
          ['EMA 9', 'Scalping, momentum de curto prazo', '1-5 min', 'Preço acima = micro tendência de alta'],
          ['EMA 20', 'Day trading, tendência intraday', '5-15 min', 'Suporte/resistência dinâmico principal'],
          ['EMA 50', 'Tendência de médio prazo', '15-60 min', 'Separação entre bull e bear market intraday'],
          ['EMA 200', 'Tendência de longo prazo', '1h-diário', 'Acima = mercado bullish; abaixo = bearish'],
          ['SMA 20', 'Bollinger Bands (base)', 'Qualquer', 'Base para cálculo de volatilidade'],
        ],
      },
    },
    {
      type: 'heading',
      content: 'Cruzamentos de Médias — Golden Cross e Death Cross',
    },
    {
      type: 'text',
      content:
        'O Golden Cross ocorre quando uma média de curto prazo cruza ACIMA de uma de longo prazo (ex: EMA 50 cruza acima da EMA 200). É considerado um sinal bullish de longo prazo. O Death Cross é o oposto: média curta cruza ABAIXO da longa — sinal bearish. Para day trading, cruzamentos de EMA 9 e EMA 20 são usados para sinais de entrada: EMA 9 cruza acima da EMA 20 = sinal de compra; abaixo = sinal de venda. Mas atenção: em mercados laterais, esses cruzamentos geram muitos sinais falsos.',
    },
    {
      type: 'text',
      content:
        'A estratégia mais eficaz com médias móveis não é o cruzamento em si, mas o "pullback para a média". Em tendência de alta, quando o preço corrige de volta à EMA 20 e começa a subir novamente (mostrando que a média está funcionando como suporte), essa é uma entrada de alta probabilidade. O stop vai abaixo da EMA 20 e o target é o próximo nível de resistência.',
    },
    {
      type: 'quiz',
      quiz: {
        question: 'O MES está acima da EMA 20 em tendência de alta. O preço corrige e toca a EMA 20, formando um Martelo. O que isso representa?',
        options: [
          { id: 'a', text: 'Sinal de reversão bearish — a tendência está terminando' },
          { id: 'b', text: 'Pullback para suporte dinâmico (EMA 20) + confirmação de candle = entrada de alta probabilidade' },
          { id: 'c', text: 'O preço vai romper abaixo da EMA 20 com certeza' },
          { id: 'd', text: 'Sinal neutro — aguardar mais confirmação' },
        ],
        correctId: 'b',
        explanation: 'Pullback para EMA 20 em tendência de alta + Martelo (padrão de reversão bullish) = confluência de dois sinais. A EMA 20 funcionando como suporte dinâmico + padrão de candle de reversão = entrada de alta probabilidade. Stop abaixo da mínima do Martelo, target no próximo nível de resistência.',
      },
    },
    {
      type: 'source',
      label: 'Investopedia — Moving Average',
      url: 'https://www.investopedia.com/terms/m/movingaverage.asp',
    },
    {
      type: 'source',
      label: 'Investopedia — Golden Cross vs Death Cross',
      url: 'https://www.investopedia.com/terms/g/goldencross.asp',
    },
  ],
};

// ── LIÇÃO 2.5 — Breakouts e Fakeouts ─────────────────────────
export const lesson_2_5: StudyLesson = {
  id: '2.5',
  title: 'Breakouts e Fakeouts — Verdadeiros vs Falsos Rompimentos',
  duration: '17 min',
  blocks: [
    {
      type: 'text',
      content:
        'Um breakout (rompimento) ocorre quando o preço supera um nível de suporte ou resistência significativo. É um dos setups mais populares no trading — e também um dos mais perigosos para iniciantes. Por quê? Porque a maioria dos rompimentos são FAKEOUTS (falsos rompimentos). Estudos mostram que entre 60-70% dos rompimentos de resistência falham e o preço retorna para dentro da faixa. Isso acontece porque market makers e algoritmos usam esses níveis óbvios para acionar stops e coletar liquidez.',
    },
    {
      type: 'callout',
      content:
        'Fonte: Al Brooks — "Trading Price Action Ranges" (2012). Investopedia — Breakout Trading: investopedia.com/terms/b/breakout.asp',
    },
    {
      type: 'heading',
      content: 'Como Distinguir Breakout Real de Fakeout',
    },
    {
      type: 'table',
      table: {
        headers: ['Característica', 'Breakout Real', 'Fakeout'],
        rows: [
          ['Volume', 'Alto — significativamente acima da média', 'Baixo ou médio'],
          ['Velocidade', 'Rápido e decisivo', 'Lento, hesitante'],
          ['Fechamento do candle', 'Fecha bem além do nível', 'Fecha perto do nível ou volta para dentro'],
          ['Candles seguintes', 'Continuam na direção do rompimento', 'Revertem rapidamente'],
          ['Contexto', 'Alinhado com tendência maior', 'Contra a tendência maior'],
          ['Reteste', 'Retesta o nível e mantém', 'Volta completamente para dentro da faixa'],
        ],
      },
    },
    {
      type: 'heading',
      content: 'A Estratégia do Reteste — Mais Segura que o Breakout',
    },
    {
      type: 'text',
      content:
        'Em vez de entrar no rompimento (arriscado), muitos traders profissionais preferem esperar o reteste. Após um breakout genuíno, o preço frequentemente retorna ao nível rompido para "testá-lo" como novo suporte/resistência (role reversal). Entrar no reteste tem vantagens: (1) Você confirma que o rompimento foi real; (2) O stop é mais curto (logo abaixo do nível retestado); (3) A relação risco/retorno é melhor. A desvantagem: às vezes o preço não retesta e você perde o movimento.',
    },
    {
      type: 'example',
      content:
        'Exemplo prático: O MES tinha resistência em 5.300 por 2 semanas. Em uma manhã, rompeu acima de 5.300 com volume 4x acima da média, fechando em 5.325. Trader A entrou no rompimento em 5.305 — risco alto, pois pode ser fakeout. Trader B esperou o reteste: o preço corrigiu para 5.303, formou um Martelo e subiu novamente. Trader B entrou em 5.305 com stop em 5.292 (13 pontos) e target em 5.365 (60 pontos). R:R = 1:4.6. O reteste confirmou que 5.300 virou suporte.',
    },
    {
      type: 'quiz',
      quiz: {
        question: 'O MES rompe acima de uma resistência em 5.250 com volume baixo. O candle fecha em 5.252 (apenas 2 pontos acima). Nos próximos 2 candles, o preço volta para 5.245. O que aconteceu?',
        options: [
          { id: 'a', text: 'Breakout real — o preço vai subir mais após a correção' },
          { id: 'b', text: 'Fakeout — o rompimento falhou (volume baixo, fechamento fraco, reversão rápida)' },
          { id: 'c', text: 'Reteste normal — comprar em 5.245' },
          { id: 'd', text: 'Impossível determinar sem mais dados' },
        ],
        correctId: 'b',
        explanation: 'Três sinais de fakeout: (1) volume baixo no rompimento; (2) fechamento fraco (apenas 2 pontos acima da resistência); (3) reversão rápida de volta para dentro da faixa. Breakouts reais têm volume alto, fecham bem além do nível e os candles seguintes continuam na direção do rompimento.',
      },
    },
    {
      type: 'source',
      label: 'Investopedia — Breakout Trading Definition',
      url: 'https://www.investopedia.com/terms/b/breakout.asp',
    },
    {
      type: 'source',
      label: 'Al Brooks — Trading Price Action Ranges',
      url: 'https://www.brookstradingcourse.com/',
    },
  ],
};

// ── LIÇÃO 2.6 — Confluência e Setups de Alta Probabilidade ───
export const lesson_2_6: StudyLesson = {
  id: '2.6',
  title: 'Confluência — Quando Múltiplos Fatores Apontam para o Mesmo Lugar',
  duration: '14 min',
  blocks: [
    {
      type: 'text',
      content:
        'Confluência é o princípio de que um setup de trading é mais confiável quando múltiplos fatores independentes apontam para a mesma direção. Um suporte sozinho é um sinal. Um suporte + EMA 20 + Fibonacci 61.8% + padrão de candle bullish = confluência de 4 fatores = setup de alta probabilidade. Lance Beggs, em "Your Trading Coach", descreve confluência como "empilhar as probabilidades a seu favor".',
    },
    {
      type: 'table',
      table: {
        headers: ['Fator de Confluência', 'Peso', 'Exemplo'],
        rows: [
          ['Suporte/Resistência horizontal', 'Alto', 'Nível testado 3+ vezes'],
          ['EMA 20 ou 50 como S&R dinâmico', 'Médio', 'Preço corrige para EMA 20 em tendência'],
          ['Fibonacci 61.8%', 'Médio-Alto', 'Retração de 61.8% de um swing'],
          ['VWAP', 'Alto (intraday)', 'Preço retorna ao VWAP após desvio'],
          ['Padrão de candle de reversão', 'Médio', 'Martelo, Engolfo, Pinbar'],
          ['Zona de S&D institucional', 'Alto', 'Drop-Base-Rally nunca testada'],
          ['Nível psicológico redondo', 'Médio', '5.000, 5.100, 5.200'],
          ['Alinhamento com tendência maior', 'Alto', 'Comprar em pullback em tendência de alta'],
        ],
      },
    },
    {
      type: 'text',
      content:
        'A regra prática: exija pelo menos 3 fatores de confluência antes de entrar em um trade. Com 1 fator: probabilidade ~50%. Com 2 fatores: ~60%. Com 3+ fatores: ~70%+. Não é garantia, mas estatisticamente você está operando com a probabilidade a seu favor. Traders profissionais são seletivos — eles esperam pelos setups de alta confluência e deixam passar os mediocres.',
    },
    {
      type: 'quiz',
      quiz: {
        question: 'Você identifica: (1) suporte horizontal em 5.200 testado 3 vezes, (2) EMA 20 passando por 5.198, (3) Fibonacci 61.8% de retração em 5.202, (4) Martelo formado em 5.199. Quantos fatores de confluência você tem?',
        options: [
          { id: 'a', text: '1 fator — apenas o suporte horizontal conta' },
          { id: 'b', text: '2 fatores — suporte e padrão de candle' },
          { id: 'c', text: '4 fatores — todos são independentes e apontam para compra' },
          { id: 'd', text: '3 fatores — EMA e Fibonacci são o mesmo indicador' },
        ],
        correctId: 'c',
        explanation: '4 fatores independentes: (1) suporte horizontal, (2) EMA 20 como suporte dinâmico, (3) Fibonacci 61.8% como suporte, (4) Martelo como confirmação de reversão bullish. Todos apontam para compra na zona 5.198-5.202. Este é um setup de alta confluência — entrada com stop abaixo de 5.190 e target no próximo nível de resistência.',
      },
    },
    {
      type: 'source',
      label: 'Lance Beggs — Your Trading Coach',
      url: 'https://yourtradingcoach.com/',
    },
    {
      type: 'source',
      label: 'Investopedia — Confluence in Trading',
      url: 'https://www.investopedia.com/terms/c/confluence.asp',
    },
  ],
};

// ── QUIZ DO MÓDULO 2 ──────────────────────────────────────────
export const mod2QuizExpanded: QuizBlock[] = [
  {
    question: 'O que define uma tendência de alta segundo a Teoria de Dow?',
    options: [
      { id: 'a', text: 'O preço está acima da EMA 200' },
      { id: 'b', text: 'Série de Higher Highs (topos mais altos) e Higher Lows (fundos mais altos)' },
      { id: 'c', text: 'O preço subiu mais de 20% nos últimos 6 meses' },
      { id: 'd', text: 'Volume crescente nos movimentos de alta' },
    ],
    correctId: 'b',
    explanation: 'Teoria de Dow (1900): tendência de alta = HH + HL. Cada topo é mais alto que o anterior e cada fundo é mais alto que o anterior. Isso mostra que compradores estão dispostos a pagar mais e vendedores não conseguem empurrar o preço abaixo dos fundos anteriores.',
  },
  {
    question: 'Uma zona de demanda "Drop-Base-Rally" é formada quando:',
    options: [
      { id: 'a', text: 'O preço sobe, consolida e sobe novamente' },
      { id: 'b', text: 'O preço cai, consolida e então sobe explosivamente' },
      { id: 'c', text: 'O preço cai, consolida e continua caindo' },
      { id: 'd', text: 'O preço sobe, consolida e cai' },
    ],
    correctId: 'b',
    explanation: 'Drop-Base-Rally: queda → consolidação (base) → rali explosivo. É o padrão de demanda mais forte porque mostra que institucionais colocaram ordens de compra na zona de consolidação durante a queda, e quando o preço retornou à zona, as ordens foram ativadas criando o rali.',
  },
  {
    question: 'Qual é a taxa de sucesso do padrão Cabeça e Ombros segundo Bulkowski?',
    options: [
      { id: 'a', text: '54%' },
      { id: 'b', text: '67%' },
      { id: 'c', text: '83%' },
      { id: 'd', text: '91%' },
    ],
    correctId: 'c',
    explanation: 'Thomas Bulkowski (Encyclopedia of Chart Patterns, 2021) reporta 83% de taxa de sucesso para o padrão Cabeça e Ombros — um dos mais altos entre todos os padrões. O target é projetado subtraindo a altura da cabeça (da neckline ao topo) do ponto de rompimento da neckline.',
  },
  {
    question: 'Qual é a principal diferença entre EMA e SMA?',
    options: [
      { id: 'a', text: 'EMA usa mais períodos que SMA' },
      { id: 'b', text: 'EMA dá mais peso aos preços recentes, reagindo mais rápido às mudanças de preço' },
      { id: 'c', text: 'SMA é mais precisa que EMA' },
      { id: 'd', text: 'EMA só funciona em tendências de alta' },
    ],
    correctId: 'b',
    explanation: 'EMA (Exponential Moving Average) usa uma fórmula que dá peso exponencialmente maior aos preços mais recentes. Resultado: reage mais rápido às mudanças de preço que a SMA (Simple Moving Average), que trata todos os períodos igualmente. Para day trading, EMA é preferida por ser mais responsiva.',
  },
  {
    question: 'Um rompimento de resistência com volume BAIXO é mais provavelmente:',
    options: [
      { id: 'a', text: 'Um breakout real — volume baixo indica menos resistência' },
      { id: 'b', text: 'Um fakeout — breakouts reais precisam de volume alto para confirmar' },
      { id: 'c', text: 'Neutro — volume não é relevante para breakouts' },
      { id: 'd', text: 'Um breakout real se o candle fechar acima da resistência' },
    ],
    correctId: 'b',
    explanation: 'Volume é o "combustível" do breakout. Volume baixo = poucos participantes = fácil de reverter. Market makers frequentemente criam fakeouts em volume baixo para acionar stops. Breakouts reais têm volume significativamente acima da média — mostrando participação institucional genuína.',
  },
  {
    question: 'O que é "confluência" no contexto de trading?',
    options: [
      { id: 'a', text: 'Quando dois indicadores dão o mesmo sinal' },
      { id: 'b', text: 'Quando múltiplos fatores independentes apontam para a mesma direção, aumentando a probabilidade do setup' },
      { id: 'c', text: 'Quando o preço está no VWAP e na EMA ao mesmo tempo' },
      { id: 'd', text: 'A convergência de duas tendências de mercado diferentes' },
    ],
    correctId: 'b',
    explanation: 'Confluência = empilhar probabilidades. Quanto mais fatores independentes apontam para a mesma direção (suporte, EMA, Fibonacci, padrão de candle, VWAP, zona de S&D), maior a probabilidade do setup funcionar. Exija pelo menos 3 fatores antes de entrar.',
  },
  {
    question: 'Em uma tendência de alta, qual é o sinal mais confiável para entrar em uma compra?',
    options: [
      { id: 'a', text: 'Comprar quando o preço está no topo (novo Higher High)' },
      { id: 'b', text: 'Comprar no pullback para o último Higher Low ou EMA 20' },
      { id: 'c', text: 'Comprar quando o volume aumenta' },
      { id: 'd', text: 'Comprar após 3 candles verdes consecutivos' },
    ],
    correctId: 'b',
    explanation: 'Em tendência de alta, a entrada de maior probabilidade é no pullback (correção) para o último Higher Low ou para a EMA 20. Isso oferece: (1) stop curto (abaixo do HL ou EMA); (2) entrada próxima do suporte; (3) alinhamento com a tendência maior. Comprar no topo significa stop muito longe e R:R ruim.',
  },
  {
    question: 'O que é a estratégia do "reteste" em breakouts?',
    options: [
      { id: 'a', text: 'Entrar imediatamente quando o preço rompe o nível' },
      { id: 'b', text: 'Aguardar o preço retornar ao nível rompido (role reversal) para confirmar e entrar com melhor R:R' },
      { id: 'c', text: 'Testar o nível com uma posição pequena antes de aumentar' },
      { id: 'd', text: 'Colocar uma ordem limite no nível de resistência' },
    ],
    correctId: 'b',
    explanation: 'A estratégia do reteste: após um breakout genuíno, aguardar o preço retornar ao nível rompido (que agora funciona como suporte/resistência invertida). Vantagens: (1) confirma que o rompimento foi real; (2) stop mais curto; (3) melhor R:R. Desvantagem: às vezes o preço não retesta.',
  },
];
