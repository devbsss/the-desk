// THE DESK — Academia Module 1: Fundamentos do Mercado (EXPANDED)
// Sources: CME Group Education, Investopedia, Steve Nison (Japanese Candlestick Charting Techniques),
//          CFTC, NFA, Topstep, Apex Trader Funding, Lucid Trading
// ============================================================

import type { StudyLesson, QuizBlock } from './academiaStudyContent';

// ── LIÇÃO 1.1 — O que é um Candle ─────────────────────────────
export const lesson_1_1: StudyLesson = {
  id: '1.1',
  title: 'O que é um Candle — Lendo a Batalha',
  duration: '12 min',
  blocks: [
    {
      type: 'text',
      content:
        'Os gráficos de candlestick foram desenvolvidos no Japão no século XVIII pelo comerciante de arroz Munehisa Homma. Ele percebeu que o preço do arroz não era determinado apenas pela oferta e demanda física — a psicologia dos traders tinha um papel enorme. Seu sistema visual captura a batalha entre compradores e vendedores em cada período de tempo. Steve Nison introduziu essa técnica ao Ocidente em 1991 com o livro "Japanese Candlestick Charting Techniques", que se tornou referência mundial.',
    },
    {
      type: 'callout',
      content:
        'Fonte: Steve Nison — "Japanese Candlestick Charting Techniques" (1991). CME Group Education: cmegroup.com/education',
    },
    {
      type: 'heading',
      content: 'Anatomia de um Candle',
    },
    {
      type: 'text',
      content:
        'Cada candle contém quatro informações essenciais: Abertura (Open), Fechamento (Close), Máxima (High) e Mínima (Low). O corpo (body) é o retângulo entre abertura e fechamento. As sombras (wicks ou shadows) são as linhas finas que se estendem acima e abaixo do corpo, mostrando os extremos de preço atingidos durante o período. Um candle verde (ou branco) significa que o preço fechou ACIMA da abertura — compradores venceram. Um candle vermelho (ou preto) significa que fechou ABAIXO — vendedores venceram.',
    },
    {
      type: 'svg',
      svgId: 'candleAnatomy',
    },
    {
      type: 'table',
      table: {
        headers: ['Parte do Candle', 'O que representa', 'Sinal'],
        rows: [
          ['Corpo grande verde', 'Compradores dominaram o período inteiro', 'Força compradora'],
          ['Corpo grande vermelho', 'Vendedores dominaram o período inteiro', 'Força vendedora'],
          ['Corpo pequeno (qualquer cor)', 'Equilíbrio entre compradores e vendedores', 'Indecisão'],
          ['Sombra superior longa', 'Compradores tentaram subir mas foram rejeitados', 'Resistência acima'],
          ['Sombra inferior longa', 'Vendedores tentaram cair mas foram rejeitados', 'Suporte abaixo'],
          ['Sem sombras (Marubozu)', 'Um lado dominou completamente do início ao fim', 'Momentum forte'],
        ],
      },
    },
    {
      type: 'heading',
      content: 'Exemplo Real: MES em 5 de junho de 2025',
    },
    {
      type: 'example',
      content:
        'Imagine o MES abrindo às 9h30 ET em 5.280 pontos. Durante a manhã sobe até 5.310 (máxima), cai até 5.265 (mínima) e fecha às 16h em 5.295. Resultado: candle verde com corpo de 15 pontos (5.280→5.295), sombra superior de 15 pontos (5.295→5.310) e sombra inferior de 15 pontos (5.265→5.280). Cada ponto no MES vale $5. Esse candle de 15 pontos de corpo representa $75 de movimento. A sombra inferior mostra que vendedores tentaram empurrar abaixo de 5.280 mas foram absorvidos — zona de suporte.',
    },
    {
      type: 'quiz',
      quiz: {
        question: 'Um candle tem abertura em 5.200, fechamento em 5.180, máxima em 5.215 e mínima em 5.170. Qual a cor e o tamanho do corpo?',
        options: [
          { id: 'a', text: 'Verde, 20 pontos' },
          { id: 'b', text: 'Vermelho, 20 pontos' },
          { id: 'c', text: 'Verde, 45 pontos' },
          { id: 'd', text: 'Vermelho, 45 pontos' },
        ],
        correctId: 'b',
        explanation: 'Fechamento (5.180) < Abertura (5.200) = candle vermelho. Corpo = |5.200 - 5.180| = 20 pontos. A sombra superior vai de 5.200 até 5.215 (15 pts) e a inferior de 5.180 até 5.170 (10 pts).',
      },
    },
    {
      type: 'heading',
      content: 'Lendo o Contexto — Não o Candle Isolado',
    },
    {
      type: 'text',
      content:
        'Um candle isolado não tem significado. O que importa é o contexto: onde o candle aparece (em suporte? em resistência? no meio de uma tendência?), qual é o tamanho relativo ao candle anterior, e o que o volume diz. Al Brooks, autor de "Reading Price Charts Bar by Bar", enfatiza que traders iniciantes cometem o erro de memorizar padrões sem entender o contexto. Um Doji em plena tendência de alta tem significado diferente de um Doji em resistência após 5 candles verdes consecutivos.',
    },
    {
      type: 'callout',
      content:
        'Fonte: Al Brooks — "Reading Price Charts Bar by Bar" (2009). Disponível em: brookstradingcourse.com',
    },
    {
      type: 'quiz',
      quiz: {
        question: 'Por que um candle isolado não é suficiente para tomar uma decisão de trade?',
        options: [
          { id: 'a', text: 'Porque você precisa de pelo menos 3 candles para confirmar qualquer padrão' },
          { id: 'b', text: 'Porque o significado de um candle depende do contexto: onde está, tendência atual e volume' },
          { id: 'c', text: 'Porque candles só funcionam em timeframes de 15 minutos ou maiores' },
          { id: 'd', text: 'Porque o mercado de futuros é muito rápido para análise de candles' },
        ],
        correctId: 'b',
        explanation: 'O contexto é tudo. Um mesmo padrão de candle pode ser bullish em suporte e irrelevante no meio de um trading range. Sempre pergunte: onde estou no mercado? Qual a tendência maior? O volume confirma?',
      },
    },
    {
      type: 'source',
      label: 'CME Group — Introduction to Candlestick Charts',
      url: 'https://www.cmegroup.com/education/courses/technical-analysis/introduction-to-candlestick-charts.html',
    },
    {
      type: 'source',
      label: 'Investopedia — Candlestick Charting: What Is It?',
      url: 'https://www.investopedia.com/trading/candlestick-charting-what-is-it/',
    },
  ],
};

// ── LIÇÃO 1.2 — Padrões de Candle Essenciais ──────────────────
export const lesson_1_2: StudyLesson = {
  id: '1.2',
  title: 'Padrões de Candle Essenciais — Os 8 que Importam',
  duration: '15 min',
  blocks: [
    {
      type: 'text',
      content:
        'Existem centenas de padrões de candlestick catalogados, mas a maioria dos traders profissionais usa apenas um punhado deles com consistência. O segredo não é memorizar todos — é entender profundamente os 8 padrões mais confiáveis e saber exatamente em qual contexto cada um funciona. Steve Nison identificou que os padrões mais poderosos são aqueles que mostram uma reversão clara de sentimento, com confirmação no candle seguinte.',
    },
    {
      type: 'heading',
      content: 'Padrões de Reversão de Fundo (Bullish)',
    },
    {
      type: 'table',
      table: {
        headers: ['Padrão', 'Estrutura', 'Condição de Validade', 'Confiabilidade'],
        rows: [
          ['Martelo (Hammer)', 'Corpo pequeno no topo, sombra inferior longa (≥2x corpo)', 'Aparece após tendência de baixa', 'Alta'],
          ['Engolfo de Alta (Bullish Engulfing)', '2 candles: vermelho pequeno + verde grande que engolfa o corpo anterior', 'Após downtrend, volume crescente', 'Muito Alta'],
          ['Estrela da Manhã (Morning Star)', '3 candles: vermelho longo + doji/pequeno + verde longo', 'Após downtrend, gap entre candles', 'Muito Alta'],
          ['Pinbar Bullish', 'Sombra inferior longa, corpo no terço superior, mínima abaixo do suporte', 'Em zona de suporte ou S&R', 'Alta'],
        ],
      },
    },
    {
      type: 'heading',
      content: 'Padrões de Reversão de Topo (Bearish)',
    },
    {
      type: 'table',
      table: {
        headers: ['Padrão', 'Estrutura', 'Condição de Validade', 'Confiabilidade'],
        rows: [
          ['Estrela Cadente (Shooting Star)', 'Corpo pequeno na base, sombra superior longa (≥2x corpo)', 'Aparece após tendência de alta', 'Alta'],
          ['Engolfo de Baixa (Bearish Engulfing)', '2 candles: verde pequeno + vermelho grande que engolfa o corpo anterior', 'Após uptrend, volume crescente', 'Muito Alta'],
          ['Estrela da Noite (Evening Star)', '3 candles: verde longo + doji/pequeno + vermelho longo', 'Após uptrend, gap entre candles', 'Muito Alta'],
          ['Homem Enforcado (Hanging Man)', 'Igual ao Martelo mas aparece após tendência de alta', 'Após uptrend, confirmar com próximo candle', 'Média'],
        ],
      },
    },
    {
      type: 'heading',
      content: 'Doji — O Candle da Indecisão',
    },
    {
      type: 'text',
      content:
        'O Doji é formado quando abertura e fechamento são praticamente iguais, resultando em um corpo muito pequeno ou inexistente. Ele representa equilíbrio perfeito entre compradores e vendedores — nenhum lado venceu. Existem variações: Doji padrão (sombras simétricas), Dragonfly Doji (sombra inferior longa, sem sombra superior — bullish em suporte), Gravestone Doji (sombra superior longa, sem sombra inferior — bearish em resistência), e Long-legged Doji (sombras longas dos dois lados — máxima indecisão). Um Doji após uma série de candles direcionais é um sinal de alerta: o momentum pode estar esgotando.',
    },
    {
      type: 'example',
      content:
        'Exemplo real: Em outubro de 2022, o S&P 500 formou um Morning Star clássico nos mínimos do bear market. O primeiro candle foi um vermelho longo (queda de 2,8%), seguido por um Doji com gap para baixo (indecisão), e então um candle verde longo que fechou acima do meio do primeiro candle. Quem reconheceu o padrão e esperou o fechamento do terceiro candle como confirmação capturou o início de um rali de 15% nas semanas seguintes. Fonte: Investopedia Historical Charts.',
    },
    {
      type: 'quiz',
      quiz: {
        question: 'Você vê um candle com sombra inferior de 20 pontos, corpo de 3 pontos no topo e sombra superior de 2 pontos, após 5 candles vermelhos consecutivos em uma zona de suporte. Que padrão é esse e o que ele sugere?',
        options: [
          { id: 'a', text: 'Estrela Cadente — possível continuação da queda' },
          { id: 'b', text: 'Martelo — possível reversão de alta, aguardar confirmação' },
          { id: 'c', text: 'Doji — indecisão, sem sinal claro' },
          { id: 'd', text: 'Marubozu — força vendedora extrema' },
        ],
        correctId: 'b',
        explanation: 'Sombra inferior longa (≥2x o corpo), corpo pequeno no topo, após downtrend em suporte = Martelo clássico. Sugere que vendedores tentaram empurrar o preço para baixo mas compradores absorveram tudo e fecharam perto da abertura. Aguardar o próximo candle verde para confirmar antes de entrar.',
      },
    },
    {
      type: 'quiz',
      quiz: {
        question: 'Qual é a diferença entre um Martelo e um Homem Enforcado?',
        options: [
          { id: 'a', text: 'A estrutura do candle é diferente — o Martelo tem sombra superior e o Homem Enforcado tem sombra inferior' },
          { id: 'b', text: 'A estrutura é idêntica, mas o contexto é diferente: Martelo aparece após downtrend (bullish), Homem Enforcado após uptrend (bearish)' },
          { id: 'c', text: 'O Martelo é sempre verde e o Homem Enforcado é sempre vermelho' },
          { id: 'd', text: 'O Homem Enforcado tem sombra maior que o Martelo' },
        ],
        correctId: 'b',
        explanation: 'Estrutura idêntica: corpo pequeno no topo, sombra inferior longa. O que muda é o contexto. Martelo após downtrend = sinal de reversão bullish. Homem Enforcado após uptrend = sinal de reversão bearish. Sempre analise ONDE o padrão aparece.',
      },
    },
    {
      type: 'source',
      label: 'Steve Nison — Japanese Candlestick Charting Techniques (1991)',
      url: 'https://www.investopedia.com/articles/active-trading/092315/5-most-powerful-candlestick-patterns.asp',
    },
  ],
};

// ── LIÇÃO 1.3 — Heikin Ashi: O Candle Filtrado ────────────────
export const lesson_1_3: StudyLesson = {
  id: '1.3',
  title: 'Heikin Ashi — O Candle que Filtra o Ruído',
  duration: '14 min',
  blocks: [
    {
      type: 'text',
      content:
        'Heikin Ashi (平均足) significa "barra média" em japonês. É uma variação dos gráficos de candlestick que usa valores médios para suavizar o ruído do mercado e tornar as tendências mais visíveis. Diferente dos candles normais que mostram o preço exato de abertura, fechamento, máxima e mínima, o Heikin Ashi calcula esses valores usando médias dos períodos anteriores. O resultado é um gráfico mais "limpo" que facilita a identificação de tendências, mas que NÃO mostra os preços reais de execução.',
    },
    {
      type: 'callout',
      content:
        '⚠️ IMPORTANTE: Os preços do Heikin Ashi NÃO são preços reais de mercado. Você não pode usar os valores de abertura/fechamento do HA para calcular P&L ou definir stops exatos. Use HA para identificar tendência e candles normais para definir entradas e stops precisos.',
    },
    {
      type: 'heading',
      content: 'Como o Heikin Ashi é Calculado',
    },
    {
      type: 'table',
      table: {
        headers: ['Valor HA', 'Fórmula', 'O que representa'],
        rows: [
          ['HA Close', '(Open + High + Low + Close) ÷ 4', 'Preço médio do período'],
          ['HA Open', '(HA Open anterior + HA Close anterior) ÷ 2', 'Média das aberturas HA'],
          ['HA High', 'Máximo entre: High real, HA Open, HA Close', 'Máxima real do período'],
          ['HA Low', 'Mínimo entre: Low real, HA Open, HA Close', 'Mínima real do período'],
        ],
      },
    },
    {
      type: 'text',
      content:
        'Por causa dessas médias, o Heikin Ashi tem propriedades únicas: em tendências fortes de alta, os candles HA tendem a ser verdes consecutivos SEM sombra inferior (os compradores dominam completamente). Em tendências fortes de baixa, candles vermelhos consecutivos sem sombra superior. Quando a tendência está enfraquecendo, aparecem sombras nos dois lados e corpos menores. Isso torna muito fácil identificar quando uma tendência está forte, fraca ou revertendo.',
    },
    {
      type: 'heading',
      content: 'Lendo os Sinais do Heikin Ashi',
    },
    {
      type: 'table',
      table: {
        headers: ['Padrão HA', 'Significado', 'Ação sugerida'],
        rows: [
          ['Candles verdes sem sombra inferior', 'Tendência de alta forte — compradores no controle', 'Manter long, não vender'],
          ['Candles vermelhos sem sombra superior', 'Tendência de baixa forte — vendedores no controle', 'Manter short, não comprar'],
          ['Candle pequeno com sombras dos dois lados', 'Tendência enfraquecendo, possível reversão', 'Reduzir posição, aguardar confirmação'],
          ['Candle Doji HA (corpo mínimo)', 'Reversão iminente — mercado em equilíbrio', 'Sair da posição atual, aguardar novo sinal'],
          ['Primeiro candle verde após série vermelha', 'Possível início de reversão bullish', 'Aguardar confirmação (2º candle verde)'],
          ['Primeiro candle vermelho após série verde', 'Possível início de reversão bearish', 'Aguardar confirmação (2º candle vermelho)'],
        ],
      },
    },
    {
      type: 'example',
      content:
        'Exemplo prático com MNQ: Imagine que o MNQ está em tendência de alta. No gráfico de 5 minutos HA, você vê 8 candles verdes consecutivos sem sombra inferior — tendência forte, não há motivo para sair. No 9º candle, aparece uma sombra inferior pequena. No 10º, o candle é pequeno com sombras dos dois lados. Isso é um sinal de alerta: a tendência está perdendo força. No candle normal (não HA), você vê que o preço está em uma resistência importante. Combinação de HA enfraquecendo + resistência no candle normal = hora de considerar saída ou stop mais apertado.',
    },
    {
      type: 'heading',
      content: 'Heikin Ashi vs Candles Normais — Quando Usar Cada Um',
    },
    {
      type: 'table',
      table: {
        headers: ['Situação', 'Use Candles Normais', 'Use Heikin Ashi'],
        rows: [
          ['Identificar tendência geral', '✓ (funciona)', '✓✓ (mais claro)'],
          ['Definir entrada precisa', '✓✓ (preços reais)', '✗ (preços médios)'],
          ['Definir stop-loss exato', '✓✓ (preços reais)', '✗ (não use HA para stops)'],
          ['Filtrar ruído em scalping', '✗ (muito ruído)', '✓✓ (suaviza o ruído)'],
          ['Identificar reversão de tendência', '✓ (padrões de candle)', '✓✓ (sombras HA são claras)'],
          ['Calcular P&L', '✓✓ (preços reais)', '✗ (valores calculados)'],
        ],
      },
    },
    {
      type: 'text',
      content:
        'A estratégia mais eficaz para traders que usam Heikin Ashi é a abordagem dual: use o HA no timeframe principal para identificar a direção da tendência e o momento de fraqueza/força, e então mude para candles normais no mesmo timeframe (ou um menor) para encontrar a entrada exata, o stop-loss e o target. Isso combina a clareza do HA com a precisão dos candles reais.',
    },
    {
      type: 'warning',
      content:
        'Heikin Ashi em mercados laterais (ranging) gera muitos sinais falsos. Em um mercado sem tendência clara, os candles HA ficam alternando cores rapidamente, criando a ilusão de tendências que não existem. Sempre confirme com outros indicadores ou com a estrutura de mercado antes de operar baseado apenas no HA.',
    },
    {
      type: 'quiz',
      quiz: {
        question: 'Você está operando MES com Heikin Ashi. Após 6 candles verdes sem sombra inferior, aparece um candle com sombra inferior de 8 pontos e sombra superior de 3 pontos. O que isso indica?',
        options: [
          { id: 'a', text: 'A tendência de alta está se fortalecendo — adicionar contratos' },
          { id: 'b', text: 'A tendência de alta está enfraquecendo — considerar reduzir posição ou apertar stop' },
          { id: 'c', text: 'O mercado vai reverter imediatamente — sair agora' },
          { id: 'd', text: 'Sinal irrelevante, continuar operando normalmente' },
        ],
        correctId: 'b',
        explanation: 'Candles HA verdes sem sombra inferior = tendência forte. Quando aparece sombra inferior, significa que vendedores começaram a aparecer durante o período. Não é sinal de reversão imediata, mas é alerta de enfraquecimento. Apertar o stop ou reduzir posição é prudente. Aguardar mais um candle para confirmar.',
      },
    },
    {
      type: 'quiz',
      quiz: {
        question: 'Por que você NÃO deve usar o preço de fechamento do Heikin Ashi para definir seu stop-loss?',
        options: [
          { id: 'a', text: 'Porque o HA é muito lento para scalping' },
          { id: 'b', text: 'Porque o preço de fechamento HA é uma média calculada, não o preço real de mercado onde sua ordem seria executada' },
          { id: 'c', text: 'Porque stops devem ser sempre baseados em suporte e resistência' },
          { id: 'd', text: 'Porque o HA não funciona em futuros' },
        ],
        correctId: 'b',
        explanation: 'O HA Close = (Open + High + Low + Close) ÷ 4. Esse valor é calculado matematicamente e não existe como preço real no mercado. Se você colocar um stop em 5.280 baseado no HA Close, mas o preço real nunca passou por 5.280 — seu stop pode nunca ser ativado, ou ser ativado num preço diferente do esperado. Use sempre preços reais para stops.',
      },
    },
    {
      type: 'source',
      label: 'Investopedia — Heikin Ashi: How to Use It in Trading',
      url: 'https://www.investopedia.com/trading/heikin-ashi-better-candlestick/',
    },
    {
      type: 'source',
      label: 'TradingView — Heikin Ashi Indicator Documentation',
      url: 'https://www.tradingview.com/support/solutions/43000502349-heikin-ashi/',
    },
  ],
};

// ── LIÇÃO 1.4 — Suporte e Resistência ────────────────────────
export const lesson_1_4: StudyLesson = {
  id: '1.4',
  title: 'Suporte e Resistência — O Mapa do Mercado',
  duration: '16 min',
  blocks: [
    {
      type: 'text',
      content:
        'Suporte e resistência são os conceitos mais fundamentais da análise técnica. Suporte é um nível de preço onde a demanda é forte o suficiente para impedir que o preço caia mais — é o "chão". Resistência é onde a oferta é forte o suficiente para impedir que o preço suba mais — é o "teto". Esses níveis existem porque os traders têm memória: eles lembram onde o preço reagiu antes e antecipam que vai reagir novamente.',
    },
    {
      type: 'callout',
      content:
        'Fonte: Investopedia — "Support and Resistance Basics" (investopedia.com/trading/support-and-resistance-basics/). BabyPips School of Pipsology — babypips.com/learn/forex/support-and-resistance',
    },
    {
      type: 'heading',
      content: 'Por que Suporte e Resistência Funcionam?',
    },
    {
      type: 'text',
      content:
        'A psicologia por trás é simples. Imagine que o MES chegou a 5.300 e reverteu para baixo. Três grupos de traders ficaram "marcados" por esse nível: (1) Quem vendeu em 5.300 e lucrou — vai querer vender novamente se o preço voltar; (2) Quem comprou em 5.300 e está no prejuízo — vai querer sair no zero a zero quando o preço voltar; (3) Quem não entrou em 5.300 e se arrependeu — vai querer comprar se o preço cair de volta. Esses três grupos criam pressão vendedora em 5.300, tornando-o uma resistência. Quando mais traders "lembram" de um nível, mais forte ele é.',
    },
    {
      type: 'svg',
      svgId: 'supportResistance',
    },
    {
      type: 'heading',
      content: 'Tipos de Suporte e Resistência',
    },
    {
      type: 'table',
      table: {
        headers: ['Tipo', 'Como identificar', 'Força', 'Exemplo'],
        rows: [
          ['Horizontal', 'Toques múltiplos no mesmo nível de preço', 'Alta (mais toques = mais forte)', 'MES 5.300 testado 4x'],
          ['Dinâmico (Médias Móveis)', 'Preço respeita uma média móvel (EMA 20, EMA 50)', 'Média', 'Preço quica na EMA 20 em tendência de alta'],
          ['Psicológico (números redondos)', 'Níveis como 5.000, 5.100, 5.200, 5.500', 'Alta', 'MNQ em 20.000 — nível psicológico forte'],
          ['Swing High/Low', 'Máximas e mínimas anteriores significativas', 'Alta', 'Mínima de outubro 2022 no S&P 500'],
          ['Fibonacci', 'Retrações de 38.2%, 50%, 61.8% de um movimento', 'Média-Alta', 'Retração de 61.8% de um rali de 100 pontos'],
          ['VWAP', 'Preço médio ponderado por volume do dia', 'Alta (intraday)', 'Preço retorna ao VWAP após desvio'],
        ],
      },
    },
    {
      type: 'heading',
      content: 'A Regra da Inversão — Suporte Vira Resistência',
    },
    {
      type: 'text',
      content:
        'Uma das regras mais importantes: quando um suporte é rompido com força, ele se torna resistência. E quando uma resistência é rompida, ela se torna suporte. Isso acontece porque os traders que compraram no suporte agora estão no prejuízo. Quando o preço retorna ao nível rompido, eles aproveitam para sair no zero a zero (ou com perda menor), criando pressão vendedora — o antigo suporte agora funciona como resistência. Esse fenômeno é chamado de "role reversal" e é um dos setups mais confiáveis do trading.',
    },
    {
      type: 'example',
      content:
        'Exemplo com MES: O nível de 5.200 funcionou como suporte por 3 semanas, sendo testado 5 vezes. Na sexta tentativa, o preço rompeu abaixo de 5.200 com um candle vermelho de 25 pontos e volume 3x acima da média. Nas duas semanas seguintes, o preço tentou voltar a 5.200 duas vezes, mas encontrou vendedores exatamente nesse nível e reverteu para baixo. O antigo suporte de 5.200 tornou-se resistência. Traders que reconheceram esse padrão venderam em 5.200 com stop em 5.215 e target em 5.150 — risco/retorno de 1:3.3.',
    },
    {
      type: 'quiz',
      quiz: {
        question: 'O MES estava em suporte em 5.100 por 2 semanas. Hoje rompeu abaixo com volume alto e fechou em 5.075. O que você espera que aconteça se o preço retornar a 5.100?',
        options: [
          { id: 'a', text: 'O preço vai continuar subindo — o suporte ainda é válido' },
          { id: 'b', text: 'O preço provavelmente vai encontrar resistência em 5.100 (role reversal)' },
          { id: 'c', text: 'O nível de 5.100 não tem mais relevância após o rompimento' },
          { id: 'd', text: 'O preço vai subir até a próxima resistência sem parar em 5.100' },
        ],
        correctId: 'b',
        explanation: 'Role reversal: suporte rompido vira resistência. Traders que compraram em 5.100 agora estão no prejuízo. Quando o preço retorna a 5.100, eles vendem para sair no zero a zero, criando pressão vendedora. Esse é um dos setups mais confiáveis — vender no retest de 5.100 com stop acima de 5.115 e target em 5.050.',
      },
    },
    {
      type: 'heading',
      content: 'Zonas vs Níveis Exatos',
    },
    {
      type: 'text',
      content:
        'Um erro comum de iniciantes é tratar suporte e resistência como linhas exatas. Na prática, são ZONAS. O mercado raramente respeita um nível ao centavo — ele pode perfurar levemente antes de reverter (stop hunt), ou pode reverter alguns pontos antes de chegar ao nível. Por isso, traders profissionais trabalham com zonas de 5-15 pontos no MES/MNQ, não com linhas precisas. Se 5.200 é suporte, a zona é 5.195-5.210. Entrar quando o preço toca a zona, não quando toca o número exato.',
    },
    {
      type: 'quiz',
      quiz: {
        question: 'Por que traders profissionais trabalham com "zonas" de suporte/resistência em vez de linhas exatas?',
        options: [
          { id: 'a', text: 'Porque é mais fácil de desenhar no gráfico' },
          { id: 'b', text: 'Porque o mercado frequentemente perfura levemente os níveis antes de reverter (stop hunt), e zonas capturam essa variação natural' },
          { id: 'c', text: 'Porque os algoritmos não conseguem calcular níveis exatos' },
          { id: 'd', text: 'Porque zonas funcionam melhor em timeframes maiores' },
        ],
        correctId: 'b',
        explanation: 'O mercado é movido por algoritmos e market makers que frequentemente fazem "stop hunts" — empurram o preço levemente além de um nível óbvio para acionar stops de varejo, e então revertem. Trabalhar com zonas de 5-15 pontos evita que você seja stopado por esses movimentos e aumenta a taxa de acerto.',
      },
    },
    {
      type: 'source',
      label: 'Investopedia — Support and Resistance Basics',
      url: 'https://www.investopedia.com/trading/support-and-resistance-basics/',
    },
    {
      type: 'source',
      label: 'CME Group — Technical Analysis Course',
      url: 'https://www.cmegroup.com/education/courses/technical-analysis.html',
    },
  ],
};

// ── LIÇÃO 1.5 — Contratos Futuros MES e MNQ ──────────────────
export const lesson_1_5: StudyLesson = {
  id: '1.5',
  title: 'Contratos MES e MNQ — Especificações Completas',
  duration: '18 min',
  blocks: [
    {
      type: 'text',
      content:
        'Os contratos Micro E-mini foram lançados pela CME Group em maio de 2019 para democratizar o acesso ao mercado de futuros de índices. Antes deles, o E-mini S&P 500 (ES) tinha um valor de $50 por ponto — muito capital para a maioria dos traders individuais. Os Micros têm 1/10 do tamanho: o MES vale $5 por ponto e o MNQ vale $2 por ponto. Isso permite que traders com contas menores (como as de prop firms) operem com risco controlado.',
    },
    {
      type: 'callout',
      content:
        'Fonte oficial: CME Group — Micro E-mini Equity Index Futures FAQ. cmegroup.com/articles/faqs/frequently-asked-questions-micro-e-mini-equity-index-futures.html',
    },
    {
      type: 'heading',
      content: 'Especificações Completas — MES e MNQ',
    },
    {
      type: 'table',
      table: {
        headers: ['Especificação', 'MES (Micro E-mini S&P 500)', 'MNQ (Micro E-mini Nasdaq-100)'],
        rows: [
          ['Ativo subjacente', 'Índice S&P 500', 'Índice Nasdaq-100'],
          ['Multiplicador', '$5 por ponto', '$2 por ponto'],
          ['Tick mínimo', '0,25 pontos', '0,25 pontos'],
          ['Valor do tick', '$1,25', '$0,50'],
          ['Horário (CME Globex)', 'Dom 18h — Sex 17h ET (pausa 17h-18h)', 'Dom 18h — Sex 17h ET (pausa 17h-18h)'],
          ['Meses de vencimento', 'Mar, Jun, Set, Dez (H, M, U, Z)', 'Mar, Jun, Set, Dez (H, M, U, Z)'],
          ['Liquidação', 'Financeira (cash settlement)', 'Financeira (cash settlement)'],
          ['Margem inicial (aprox.)', '~$1.200-1.500 (varia com volatilidade)', '~$1.500-2.000 (varia com volatilidade)'],
          ['Símbolo CME', 'MES', 'MNQ'],
          ['Símbolo TradingView', 'CME_MINI:MES1!', 'CME_MINI:MNQ1!'],
        ],
      },
    },
    {
      type: 'heading',
      content: 'Calculando P&L — Exemplos Práticos',
    },
    {
      type: 'example',
      content:
        'MES — Exemplo de trade: Você compra 2 contratos MES em 5.280 e vende em 5.295. Movimento: 15 pontos. Cálculo: 15 pontos × $5/ponto × 2 contratos = $150 de lucro bruto. Se o preço tivesse ido para 5.270 (seu stop), seria: 10 pontos × $5 × 2 = $100 de perda. Risco/Retorno: $100 risco para $150 ganho = 1:1.5.',
    },
    {
      type: 'example',
      content:
        'MNQ — Exemplo de trade: Você vende (short) 3 contratos MNQ em 19.850 e cobre em 19.790. Movimento: 60 pontos a favor. Cálculo: 60 pontos × $2/ponto × 3 contratos = $360 de lucro bruto. Se tivesse ido contra até 19.880 (stop de 30 pontos): 30 × $2 × 3 = $180 de perda. Risco/Retorno: $180 risco para $360 ganho = 1:2.',
    },
    {
      type: 'table',
      table: {
        headers: ['Movimento (pontos)', 'MES (1 contrato)', 'MES (2 contratos)', 'MNQ (1 contrato)', 'MNQ (2 contratos)'],
        rows: [
          ['5 pontos', '$25', '$50', '$10', '$20'],
          ['10 pontos', '$50', '$100', '$20', '$40'],
          ['20 pontos', '$100', '$200', '$40', '$80'],
          ['50 pontos', '$250', '$500', '$100', '$200'],
          ['100 pontos', '$500', '$1.000', '$200', '$400'],
        ],
      },
    },
    {
      type: 'heading',
      content: 'Rollover — Trocando de Contrato',
    },
    {
      type: 'text',
      content:
        'Contratos futuros têm data de vencimento. O MES e MNQ vencem na terceira sexta-feira dos meses de março, junho, setembro e dezembro. Cerca de 1-2 semanas antes do vencimento, o volume começa a migrar para o próximo contrato. Esse processo é chamado de "rollover". Como day trader, você raramente precisa se preocupar com rollover — você fecha suas posições no mesmo dia. Mas é importante saber que no dia do vencimento (expiration Friday), o volume pode ser anormal e os spreads maiores.',
    },
    {
      type: 'quiz',
      quiz: {
        question: 'Você compra 1 contrato MES em 5.100 e o preço vai para 5.125. Qual é seu lucro?',
        options: [
          { id: 'a', text: '$25' },
          { id: 'b', text: '$125' },
          { id: 'c', text: '$250' },
          { id: 'd', text: '$50' },
        ],
        correctId: 'b',
        explanation: 'Movimento = 5.125 - 5.100 = 25 pontos. MES vale $5 por ponto. Lucro = 25 × $5 = $125. Simples mas fundamental — você precisa saber calcular isso instantaneamente durante o trade.',
      },
    },
    {
      type: 'quiz',
      quiz: {
        question: 'Qual é o valor de 1 tick no MNQ?',
        options: [
          { id: 'a', text: '$1,25' },
          { id: 'b', text: '$2,50' },
          { id: 'c', text: '$0,50' },
          { id: 'd', text: '$5,00' },
        ],
        correctId: 'c',
        explanation: 'MNQ: multiplicador $2 por ponto × tick de 0,25 pontos = $0,50 por tick. MES: $5 × 0,25 = $1,25 por tick. Memorize esses valores — você vai usar constantemente para calcular risco antes de entrar em cada trade.',
      },
    },
    {
      type: 'source',
      label: 'CME Group — Micro E-mini S&P 500 Specifications',
      url: 'https://www.cmegroup.com/markets/equities/sp/micro-e-mini-sandp-500.html',
    },
    {
      type: 'source',
      label: 'CME Group — Micro E-mini Nasdaq-100 Specifications',
      url: 'https://www.cmegroup.com/markets/equities/nasdaq/micro-e-mini-nasdaq-100.html',
    },
  ],
};

// ── LIÇÃO 1.6 — Gestão de Risco Fundamental ──────────────────
export const lesson_1_6: StudyLesson = {
  id: '1.6',
  title: 'Gestão de Risco — A Única Coisa que Garante Sobrevivência',
  duration: '20 min',
  blocks: [
    {
      type: 'text',
      content:
        'Gestão de risco não é um tema chato de teoria — é literalmente a diferença entre sobreviver no trading a longo prazo ou explodir a conta em semanas. Traders profissionais não são aqueles que acertam mais — são aqueles que perdem MENOS quando estão errados. Mark Douglas, em "Trading in the Zone", diz: "Os melhores traders não têm medo de estar errados porque eles não apostam mais do que podem perder confortavelmente." A gestão de risco é o que torna isso possível.',
    },
    {
      type: 'callout',
      content:
        'Fonte: Mark Douglas — "Trading in the Zone" (2000). CFTC — Basics of Futures Trading: cftc.gov/ConsumerProtection/EducationCenter/FuturesMarketBasics',
    },
    {
      type: 'heading',
      content: 'A Regra dos 1-2%',
    },
    {
      type: 'text',
      content:
        'A regra mais universal do gerenciamento de risco: nunca arrisque mais de 1-2% do capital total da conta em um único trade. Em uma conta de $25.000, 1% = $250 de risco máximo por trade. Isso parece conservador, mas considere: com 1% de risco, você pode perder 20 trades consecutivos e ainda ter 82% do capital. Com 10% de risco por trade, 10 perdas consecutivas (algo que ACONTECE) deixam você com apenas 35% do capital — praticamente impossível de recuperar.',
    },
    {
      type: 'table',
      table: {
        headers: ['Risco por trade', 'Após 10 perdas seguidas', 'Após 20 perdas seguidas', 'Para recuperar ao original'],
        rows: [
          ['1%', '$22.321 (89%)', '$20.000 (80%)', 'Ganhar 25%'],
          ['2%', '$20.000 (80%)', '$14.859 (59%)', 'Ganhar 69%'],
          ['5%', '$15.987 (64%)', '$7.358 (29%)', 'Ganhar 241%'],
          ['10%', '$9.765 (39%)', '$1.216 (5%)', 'Ganhar 1.957%'],
        ],
      },
    },
    {
      type: 'heading',
      content: 'Calculando o Tamanho de Posição',
    },
    {
      type: 'text',
      content:
        'O tamanho de posição não é uma escolha aleatória — é calculado matematicamente. Fórmula: Número de contratos = (Capital × % de risco) ÷ (Stop em pontos × Valor por ponto). Exemplo: Conta de $25.000, risco de 1% ($250), stop de 10 pontos no MES ($50 por contrato). Contratos = $250 ÷ $50 = 5 contratos. Se o stop fosse de 20 pontos ($100 por contrato): $250 ÷ $100 = 2,5 contratos → arredonde para 2.',
    },
    {
      type: 'example',
      content:
        'Exemplo real com prop firm: Você tem uma conta Apex de $50.000 com limite de perda diária de $1.000. Seu setup tem stop de 8 pontos no MES. Risco por contrato = 8 × $5 = $40. Máximo de contratos para o dia = $1.000 ÷ $40 = 25 contratos. Mas se você quer arriscar no máximo 2% da conta ($1.000) por trade, e o stop é $40/contrato: 25 contratos. Porém, se você já perdeu $400 no dia, o risco disponível é apenas $600 → 15 contratos máximo.',
    },
    {
      type: 'heading',
      content: 'Risco/Retorno — A Matemática da Sobrevivência',
    },
    {
      type: 'text',
      content:
        'Risco/Retorno (R:R) é a relação entre o que você arrisca e o que espera ganhar. Um R:R de 1:2 significa: arrisca $100 para ganhar $200. Com R:R de 1:2 e taxa de acerto de 50%, você é lucrativo: 5 wins × $200 = $1.000, 5 losses × $100 = $500, lucro líquido = $500. Com R:R de 1:1 e 50% de acerto, você empata (antes das comissões — na prática perde). Por isso, traders profissionais buscam R:R mínimo de 1:1.5, idealmente 1:2 ou mais.',
    },
    {
      type: 'table',
      table: {
        headers: ['R:R', 'Taxa de acerto necessária para breakeven', 'Com 50% de acerto', 'Com 40% de acerto'],
        rows: [
          ['1:1', '50%', 'Empata', 'Perde'],
          ['1:1.5', '40%', 'Lucrativo', 'Empata'],
          ['1:2', '33%', 'Muito lucrativo', 'Lucrativo'],
          ['1:3', '25%', 'Excelente', 'Muito lucrativo'],
        ],
      },
    },
    {
      type: 'quiz',
      quiz: {
        question: 'Você tem uma conta de $10.000 e quer arriscar 1% por trade. Seu setup tem stop de 5 pontos no MES. Quantos contratos você pode operar?',
        options: [
          { id: 'a', text: '1 contrato' },
          { id: 'b', text: '2 contratos' },
          { id: 'c', text: '4 contratos' },
          { id: 'd', text: '10 contratos' },
        ],
        correctId: 'c',
        explanation: 'Risco = 1% × $10.000 = $100. Stop por contrato = 5 pontos × $5/ponto = $25. Contratos = $100 ÷ $25 = 4 contratos. Com 4 contratos e stop de 5 pontos, você perde exatamente $100 (1% da conta) se o stop for ativado.',
      },
    },
    {
      type: 'heading',
      content: 'Regras das Prop Firms — O que Você Precisa Saber',
    },
    {
      type: 'text',
      content:
        'Prop firms como Topstep, Apex Trader Funding e Lucid Trading têm regras específicas que você DEVE conhecer antes de operar. As mais importantes são: (1) Limite de perda diária — atingiu, parou. Na Topstep, isso bloqueia a conta pelo resto do dia mas não encerra a avaliação. Na Apex, o trailing drawdown funciona diferente. (2) Trailing drawdown — o limite de perda máxima sobe conforme você lucra, até um teto. (3) Regra de consistência — alguns dias não podem representar mais de X% do lucro total. (4) Número máximo de contratos por conta.',
    },
    {
      type: 'table',
      table: {
        headers: ['Prop Firm', 'Perda Diária Máx', 'Drawdown Máx', 'Regra de Consistência', 'Contratos Máx (50k)'],
        rows: [
          ['Topstep $50k', '$1.000/dia', '$2.000 trailing', 'Não obrigatória', '10 MES'],
          ['Apex $50k', '$1.000/dia', '$2.500 trailing', 'Não', '10 MES'],
          ['Lucid Trading $50k', '$1.000/dia', '$2.000', 'Sim (40% regra)', '10 MES'],
        ],
      },
    },
    {
      type: 'warning',
      content:
        'As regras das prop firms mudam frequentemente. Sempre verifique o site oficial antes de começar sua avaliação. Os valores acima são aproximados e podem estar desatualizados.',
    },
    {
      type: 'quiz',
      quiz: {
        question: 'Você tem R:R de 1:2 e taxa de acerto de 45%. Você é lucrativo?',
        options: [
          { id: 'a', text: 'Não — precisa de pelo menos 50% de acerto para ser lucrativo' },
          { id: 'b', text: 'Sim — com R:R 1:2, você só precisa de 33% de acerto para breakeven' },
          { id: 'c', text: 'Depende do número de trades' },
          { id: 'd', text: 'Não — R:R de 1:2 é muito baixo para ser lucrativo' },
        ],
        correctId: 'b',
        explanation: 'Com R:R 1:2: em 100 trades com 45% de acerto → 45 wins × 2R = 90R de lucro, 55 losses × 1R = 55R de perda. Lucro líquido = 35R. Você é lucrativo mesmo acertando menos da metade. Com R:R 1:2, o breakeven é em 33% de acerto (1 win compensa 2 losses).',
      },
    },
    {
      type: 'source',
      label: 'CFTC — Futures Market Basics',
      url: 'https://www.cftc.gov/ConsumerProtection/EducationCenter/FuturesMarketBasics/index.htm',
    },
    {
      type: 'source',
      label: 'Investopedia — Position Sizing',
      url: 'https://www.investopedia.com/terms/p/positionsizing.asp',
    },
    {
      type: 'source',
      label: 'Topstep — Trading Rules',
      url: 'https://www.topstep.com/trading-rules/',
    },
  ],
};

// ── LIÇÃO 1.7 — Sessões de Mercado e Liquidez ────────────────
export const lesson_1_7: StudyLesson = {
  id: '1.7',
  title: 'Sessões de Mercado — Quando o Dinheiro se Move',
  duration: '14 min',
  blocks: [
    {
      type: 'text',
      content:
        'O mercado de futuros opera quase 24 horas por dia, mas nem todas as horas são iguais. A liquidez — a quantidade de compradores e vendedores ativos — varia enormemente ao longo do dia. Operar em horários de baixa liquidez significa spreads maiores, slippage maior e movimentos erráticos. Entender as sessões de mercado é fundamental para escolher os melhores momentos para operar.',
    },
    {
      type: 'callout',
      content:
        'Fonte: CME Group — Micro E-mini Futures Trading Hours. Investopedia — The Forex 3-Session Trading System (investopedia.com/articles/forex/08/3-market-system.asp)',
    },
    {
      type: 'table',
      table: {
        headers: ['Sessão', 'Horário ET', 'Características', 'Para MES/MNQ'],
        rows: [
          ['Tóquio (Ásia)', '19h - 04h ET', 'Volume baixo, movimentos lentos, consolidação', 'Evitar — liquidez mínima'],
          ['Londres (Europa)', '03h - 12h ET', 'Volume crescente, tendências iniciam, institucional', 'Bom após 04h ET'],
          ['Overlap Londres+NY', '08h - 12h ET', 'MÁXIMA liquidez e volatilidade, melhores setups', 'MELHOR período'],
          ['Nova York (tarde)', '12h - 17h ET', 'Volume decrescente, movimentos menores', 'Cuidado após 14h'],
          ['Pré-mercado NY', '04h - 09h30 ET', 'Notícias econômicas, gaps, volatilidade', 'Cuidado com gaps'],
          ['Abertura NY', '09h30 - 10h30 ET', 'Alta volatilidade, movimentos rápidos', 'Avançado — cuidado'],
        ],
      },
    },
    {
      type: 'heading',
      content: 'O Overlap Londres-Nova York: O Santo Graal da Liquidez',
    },
    {
      type: 'text',
      content:
        'Das 08h às 12h ET, as sessões de Londres e Nova York se sobrepõem. Nesse período, traders europeus e americanos estão ativos simultaneamente — é quando o volume é máximo, os spreads são mínimos e os movimentos mais direcionais. Dados históricos do CME Group mostram que mais de 70% do volume diário de MES e MNQ ocorre entre 08h e 16h ET, com pico entre 09h30 e 11h. Para day traders, esse é o período de ouro.',
    },
    {
      type: 'example',
      content:
        'Dados reais de volume: Em um dia típico de 2024, o MES negociou aproximadamente 800.000 contratos entre 09h30 e 16h ET, mas apenas 120.000 contratos entre 18h e 03h ET (sessão asiática). Isso significa que operar à noite tem 6x menos liquidez — maior slippage, spreads mais amplos e movimentos menos confiáveis.',
    },
    {
      type: 'heading',
      content: 'Horários para Evitar',
    },
    {
      type: 'text',
      content:
        'Alguns horários são particularmente perigosos para day traders: (1) 12h-13h ET — almoço de Nova York, volume cai drasticamente, mercado pode ficar lateral ou fazer movimentos falsos; (2) 15h30-16h ET — fechamento do mercado de ações, algoritmos de rebalanceamento podem criar movimentos bruscos; (3) Qualquer horário com divulgação de dados econômicos importantes (NFP, CPI, FOMC) — spreads explodem e o mercado pode mover 50+ pontos em segundos.',
    },
    {
      type: 'quiz',
      quiz: {
        question: 'Qual é o melhor período para operar MES/MNQ como day trader e por quê?',
        options: [
          { id: 'a', text: '19h-23h ET — mercado mais calmo, menos risco' },
          { id: 'b', text: '08h-12h ET — overlap Londres+NY com máxima liquidez e movimentos direcionais' },
          { id: 'c', text: '03h-07h ET — sessão de Londres com tendências fortes' },
          { id: 'd', text: '14h-17h ET — tarde de Nova York com volume estável' },
        ],
        correctId: 'b',
        explanation: 'O overlap Londres+NY (08h-12h ET) concentra o maior volume, menores spreads e movimentos mais direcionais. Mais de 70% do volume diário ocorre entre 08h e 16h ET, com pico no overlap. Mercado calmo (sessão asiática) parece "seguro" mas tem baixa liquidez, spreads maiores e movimentos erráticos.',
      },
    },
    {
      type: 'source',
      label: 'CME Group — Micro E-mini Futures Trading Hours',
      url: 'https://www.cmegroup.com/markets/equities/micro-emini-equity.html',
    },
    {
      type: 'source',
      label: 'Investopedia — The Forex 3-Session Trading System',
      url: 'https://www.investopedia.com/articles/forex/08/3-market-system.asp',
    },
  ],
};

// ── LIÇÃO 1.8 — Volume e VWAP ─────────────────────────────────
export const lesson_1_8: StudyLesson = {
  id: '1.8',
  title: 'Volume e VWAP — O que o Dinheiro Grande Está Fazendo',
  duration: '16 min',
  blocks: [
    {
      type: 'text',
      content:
        'Volume é o número de contratos negociados em um período. É o único indicador que não é derivado do preço — é uma medida independente de participação do mercado. Quando o preço sobe com volume alto, a tendência é genuína. Quando sobe com volume baixo, pode ser uma armadilha. Jesse Livermore, um dos maiores traders da história, dizia: "Volume é o combustível do mercado. Sem volume, os movimentos de preço são suspeitos."',
    },
    {
      type: 'heading',
      content: 'Lendo o Volume',
    },
    {
      type: 'table',
      table: {
        headers: ['Situação', 'Interpretação', 'O que fazer'],
        rows: [
          ['Preço sobe + volume alto', 'Tendência de alta genuína, institucional comprando', 'Seguir a tendência'],
          ['Preço sobe + volume baixo', 'Movimento fraco, possível armadilha (bull trap)', 'Cuidado, aguardar confirmação'],
          ['Preço cai + volume alto', 'Tendência de baixa genuína, institucional vendendo', 'Seguir a tendência'],
          ['Preço cai + volume baixo', 'Correção técnica, provavelmente temporária', 'Possível oportunidade de compra'],
          ['Volume muito alto em suporte', 'Absorção — compradores absorvendo vendedores', 'Possível reversão bullish'],
          ['Volume muito alto em resistência', 'Distribuição — vendedores absorvendo compradores', 'Possível reversão bearish'],
        ],
      },
    },
    {
      type: 'heading',
      content: 'VWAP — O Preço Justo do Dia',
    },
    {
      type: 'text',
      content:
        'O VWAP (Volume Weighted Average Price — Preço Médio Ponderado por Volume) é o preço médio de todas as transações do dia, ponderado pelo volume de cada transação. É o indicador mais usado por traders institucionais e algoritmos. Por quê? Porque representa o "preço justo" do dia — o nível onde a maioria do dinheiro foi negociado. Fundos de pensão e gestores de ativos usam o VWAP como benchmark: se compraram acima do VWAP, pagaram caro; abaixo, compraram barato.',
    },
    {
      type: 'text',
      content:
        'Para day traders, o VWAP funciona como suporte/resistência dinâmico. Em tendências de alta, o preço tende a ficar acima do VWAP e retornar a ele em correções (oportunidade de compra). Em tendências de baixa, fica abaixo e retorna ao VWAP em bounces (oportunidade de venda). Quando o preço está no VWAP, é zona de equilíbrio — sem viés direcional claro.',
    },
    {
      type: 'example',
      content:
        'Exemplo prático: O MES abre em 5.280. O VWAP começa em 5.280 e sobe para 5.295 às 10h30 conforme o mercado sobe. O preço está em 5.310 — acima do VWAP. Uma correção puxa o preço de volta para 5.295 (VWAP). Traders que usam VWAP como suporte compram em 5.295 com stop em 5.285 (10 pontos abaixo do VWAP) e target em 5.320 (25 pontos acima). R:R = 1:2.5.',
    },
    {
      type: 'quiz',
      quiz: {
        question: 'O MES está em tendência de alta. O preço corrige de 5.320 para 5.298, exatamente no VWAP do dia. O que isso representa para um trader que usa VWAP?',
        options: [
          { id: 'a', text: 'Sinal de reversão bearish — vender' },
          { id: 'b', text: 'Zona de suporte dinâmico — possível oportunidade de compra com stop abaixo do VWAP' },
          { id: 'c', text: 'O VWAP não tem relevância em tendências de alta' },
          { id: 'd', text: 'Aguardar o preço cair mais 20 pontos antes de comprar' },
        ],
        correctId: 'b',
        explanation: 'Em tendência de alta, o VWAP funciona como suporte dinâmico. O preço corrigindo até o VWAP é uma oportunidade de compra — o mercado está "testando o preço justo do dia" antes de continuar subindo. Stop abaixo do VWAP (5-10 pontos) e target no topo anterior ou além.',
      },
    },
    {
      type: 'source',
      label: 'Investopedia — VWAP: Volume Weighted Average Price',
      url: 'https://www.investopedia.com/terms/v/vwap.asp',
    },
    {
      type: 'source',
      label: 'CME Group — Volume and Open Interest',
      url: 'https://www.cmegroup.com/education/courses/technical-analysis/volume-and-open-interest.html',
    },
  ],
};

// ── QUIZ DO MÓDULO 1 ──────────────────────────────────────────
export const mod1QuizExpanded: QuizBlock[] = [
  {
    question: 'Qual é o valor de 1 ponto no contrato MES?',
    options: [
      { id: 'a', text: '$2' },
      { id: 'b', text: '$5' },
      { id: 'c', text: '$10' },
      { id: 'd', text: '$50' },
    ],
    correctId: 'b',
    explanation: 'O MES (Micro E-mini S&P 500) tem multiplicador de $5 por ponto. O ES (E-mini S&P 500) tem $50 por ponto — o MES é exatamente 1/10 do tamanho. Fonte: CME Group.',
  },
  {
    question: 'Um candle vermelho com sombra inferior muito longa após uma tendência de baixa é chamado de:',
    options: [
      { id: 'a', text: 'Estrela Cadente' },
      { id: 'b', text: 'Martelo Invertido' },
      { id: 'c', text: 'Martelo (Hammer)' },
      { id: 'd', text: 'Doji' },
    ],
    correctId: 'c',
    explanation: 'O Martelo pode ser verde OU vermelho — a cor não importa tanto quanto a estrutura (sombra inferior longa, corpo pequeno no topo) e o contexto (após downtrend). A sombra inferior longa mostra que vendedores tentaram empurrar o preço para baixo mas compradores absorveram tudo.',
  },
  {
    question: 'Qual a principal diferença entre Heikin Ashi e candles normais?',
    options: [
      { id: 'a', text: 'Heikin Ashi usa preços de fechamento do dia anterior' },
      { id: 'b', text: 'Heikin Ashi usa valores médios calculados, não preços reais de mercado' },
      { id: 'c', text: 'Heikin Ashi só funciona em timeframes de 1 hora ou maiores' },
      { id: 'd', text: 'Heikin Ashi não mostra sombras (wicks)' },
    ],
    correctId: 'b',
    explanation: 'O HA Close = (O+H+L+C)/4 e o HA Open = média das aberturas HA anteriores. São valores calculados que não existem como preços reais no mercado. Por isso, use HA para identificar tendência mas use candles normais para definir entradas e stops precisos.',
  },
  {
    question: 'O que significa "role reversal" em suporte e resistência?',
    options: [
      { id: 'a', text: 'Quando o preço reverte exatamente no nível de suporte' },
      { id: 'b', text: 'Quando um suporte rompido se torna resistência (e vice-versa)' },
      { id: 'c', text: 'Quando o mercado muda de tendência de alta para baixa' },
      { id: 'd', text: 'Quando dois níveis de suporte se fundem em um' },
    ],
    correctId: 'b',
    explanation: 'Role reversal: suporte rompido → vira resistência. Resistência rompida → vira suporte. Acontece porque traders que compraram no suporte ficam no prejuízo após o rompimento e vendem quando o preço retorna ao nível (criando resistência). É um dos setups mais confiáveis do trading.',
  },
  {
    question: 'Você tem conta de $25.000, quer arriscar 2% por trade, e seu stop é de 10 pontos no MES. Quantos contratos você pode operar?',
    options: [
      { id: 'a', text: '5 contratos' },
      { id: 'b', text: '10 contratos' },
      { id: 'c', text: '2 contratos' },
      { id: 'd', text: '25 contratos' },
    ],
    correctId: 'b',
    explanation: 'Risco = 2% × $25.000 = $500. Stop por contrato = 10 pontos × $5/ponto = $50. Contratos = $500 ÷ $50 = 10 contratos. Com 10 contratos e stop de 10 pontos, você perde exatamente $500 (2% da conta) se o stop for ativado.',
  },
  {
    question: 'Qual período do dia tem maior liquidez para operar MES/MNQ?',
    options: [
      { id: 'a', text: '19h-23h ET (sessão asiática)' },
      { id: 'b', text: '03h-07h ET (abertura de Londres)' },
      { id: 'c', text: '08h-12h ET (overlap Londres+Nova York)' },
      { id: 'd', text: '14h-17h ET (tarde de Nova York)' },
    ],
    correctId: 'c',
    explanation: 'O overlap Londres+NY (08h-12h ET) concentra mais de 70% do volume diário. Nesse período, traders europeus e americanos estão ativos simultaneamente, criando máxima liquidez, menores spreads e movimentos mais direcionais. É o período ideal para day trading.',
  },
  {
    question: 'O que o VWAP representa no contexto do day trading?',
    options: [
      { id: 'a', text: 'O preço de abertura do dia' },
      { id: 'b', text: 'O preço médio ponderado por volume — o "preço justo" do dia usado como referência por institucionais' },
      { id: 'c', text: 'O nível de suporte mais forte do dia' },
      { id: 'd', text: 'A média móvel de 20 períodos' },
    ],
    correctId: 'b',
    explanation: 'VWAP = preço médio de todas as transações do dia, ponderado pelo volume. É o benchmark dos institucionais — fundos que compraram acima do VWAP pagaram caro; abaixo, compraram barato. Para day traders, funciona como suporte/resistência dinâmico: preço acima do VWAP = viés bullish; abaixo = bearish.',
  },
  {
    question: 'Em um Engolfo de Alta (Bullish Engulfing), o que deve acontecer?',
    options: [
      { id: 'a', text: 'Um candle verde pequeno seguido de um candle vermelho grande' },
      { id: 'b', text: 'Um candle vermelho seguido de um candle verde que engolfa completamente o corpo do anterior' },
      { id: 'c', text: 'Dois candles verdes consecutivos de tamanho crescente' },
      { id: 'd', text: 'Um Doji seguido de um candle verde longo' },
    ],
    correctId: 'b',
    explanation: 'Bullish Engulfing: (1) candle vermelho (qualquer tamanho), (2) candle verde que abre abaixo do fechamento do anterior e fecha acima da abertura do anterior — engolfando completamente o corpo. Indica forte reversão de sentimento. Mais poderoso com volume crescente e em zona de suporte.',
  },
  {
    question: 'Qual é o tick mínimo do MNQ e seu valor em dólares?',
    options: [
      { id: 'a', text: '0,25 pontos = $1,25' },
      { id: 'b', text: '0,50 pontos = $1,00' },
      { id: 'c', text: '0,25 pontos = $0,50' },
      { id: 'd', text: '1,00 ponto = $2,00' },
    ],
    correctId: 'c',
    explanation: 'MNQ: tick mínimo = 0,25 pontos. Valor = 0,25 × $2 (multiplicador) = $0,50 por tick. Compare com MES: 0,25 × $5 = $1,25 por tick. O MNQ tem ticks menores em valor absoluto, mas o índice Nasdaq-100 se move em intervalos maiores que o S&P 500.',
  },
  {
    question: 'Por que candles HA sem sombra inferior indicam tendência de alta forte?',
    options: [
      { id: 'a', text: 'Porque o algoritmo do HA remove as sombras em tendências fortes' },
      { id: 'b', text: 'Porque o HA Open é calculado como média, então quando compradores dominam completamente, o preço nunca cai abaixo da abertura HA durante o período' },
      { id: 'c', text: 'Porque sombras inferiores só aparecem em candles vermelhos' },
      { id: 'd', text: 'Porque o mercado não tem vendedores durante tendências fortes' },
    ],
    correctId: 'b',
    explanation: 'No HA, a mínima = mínimo entre (Low real, HA Open, HA Close). Em tendências fortes de alta, o preço real nunca cai abaixo do HA Open durante o período, então a mínima HA = HA Open = base do corpo. Resultado: sem sombra inferior. Isso indica que compradores dominaram do início ao fim do período.',
  },
];
