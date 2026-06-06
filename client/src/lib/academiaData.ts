// ============================================================
// THE DESK — ACADEMIA DATA
// 4 módulos, 25 lições, 90+ questões
// ============================================================

export type QuestionType =
  | "multiple_choice"
  | "true_false"
  | "calculation"
  | "scenario";

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options?: string[];
  correctIndex?: number; // for multiple_choice / true_false
  correctAnswer?: string; // for calculation / scenario (shown after)
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: string[];
  keyConcept: string;
  svgKey: string; // maps to SVG component in Academia.tsx
  questions: Question[];
}

export interface Module {
  id: number;
  title: string;
  subtitle: string;
  color: string;
  lessons: Lesson[];
}

// ============================================================
// MODULE 1 — FUNDAMENTOS
// ============================================================
const module1: Module = {
  id: 1,
  title: "FUNDAMENTOS",
  subtitle: "Beginner",
  color: "#26A69A",
  lessons: [
    {
      id: "1.1",
      title: "O que é um Candle",
      content: [
        "Um candle (vela) representa o movimento de preço em um período de tempo.",
        "Ele tem 4 componentes: abertura (open), fechamento (close), máxima (high) e mínima (low).",
        "O corpo (body) é a diferença entre abertura e fechamento. As sombras (wicks) mostram as extremidades.",
        "Candle verde/branco = fechou acima da abertura (compradores venceram). Candle vermelho = fechou abaixo (vendedores venceram).",
      ],
      keyConcept:
        "O candle conta a história da batalha entre compradores e vendedores em um período.",
      svgKey: "candle",
      questions: [
        {
          id: "1.1.1",
          type: "multiple_choice",
          text: "O que o CORPO de um candle representa?",
          options: [
            "A diferença entre a máxima e a mínima",
            "A diferença entre a abertura e o fechamento",
            "O volume negociado no período",
            "A direção do próximo candle",
          ],
          correctIndex: 1,
          explanation:
            "O corpo (body) do candle representa a diferença entre o preço de abertura e o preço de fechamento. As sombras mostram as extremidades (máxima e mínima).",
        },
        {
          id: "1.1.2",
          type: "multiple_choice",
          text: "Uma sombra superior longa indica o quê?",
          options: [
            "Compradores estão no controle",
            "O mercado vai subir",
            "Rejeição de preços mais altos — vendedores assumiram o controle",
            "Alta volatilidade sem significado",
          ],
          correctIndex: 2,
          explanation:
            "Uma sombra superior longa significa que o preço tentou subir mas foi rejeitado. Os vendedores empurraram o preço de volta, indicando pressão vendedora naquela região.",
        },
        {
          id: "1.1.3",
          type: "true_false",
          text: "Verdadeiro ou Falso: Um candle vermelho SEMPRE significa que o mercado vai continuar caindo.",
          options: ["Verdadeiro", "Falso"],
          correctIndex: 1,
          explanation:
            "FALSO. Um candle vermelho mostra que o preço fechou abaixo da abertura naquele período, mas não garante continuação. O contexto (suporte, tendência, volume) é o que determina a direção futura.",
        },
        {
          id: "1.1.4",
          type: "multiple_choice",
          text: "Quais são os 4 componentes de um candle?",
          options: [
            "Abertura, Fechamento, Volume, Tempo",
            "Abertura, Fechamento, Máxima, Mínima",
            "Corpo, Sombra, Volume, Cor",
            "Compra, Venda, Alta, Baixa",
          ],
          correctIndex: 1,
          explanation:
            "Os 4 componentes são: Open (abertura), Close (fechamento), High (máxima) e Low (mínima). Esses 4 dados formam o OHLC que compõe cada candle.",
        },
      ],
    },
    {
      id: "1.2",
      title: "Suporte e Resistência",
      content: [
        "Suporte é um nível de preço onde compradores historicamente apareceram, impedindo o preço de cair mais.",
        "Resistência é um nível onde vendedores historicamente apareceram, impedindo o preço de subir mais.",
        "Quando a resistência é quebrada com força, ela se torna o novo suporte (e vice-versa).",
        "Quanto mais vezes um nível é testado e respeitado, mais forte ele é.",
      ],
      keyConcept:
        "Suporte é onde compradores apareceram historicamente. Resistência é onde vendedores apareceram.",
      svgKey: "support_resistance",
      questions: [
        {
          id: "1.2.1",
          type: "multiple_choice",
          text: "O que acontece quando o preço chega em um suporte?",
          options: [
            "O preço sempre cai mais",
            "Compradores tendem a aparecer e defender o nível",
            "O mercado fecha",
            "O volume sempre aumenta",
          ],
          correctIndex: 1,
          explanation:
            "No suporte, compradores historicamente apareceram para defender aquele preço. Não é garantia, mas é uma zona de alta probabilidade de reação compradora.",
        },
        {
          id: "1.2.2",
          type: "multiple_choice",
          text: "Quando uma resistência é rompida com força, o que ela se torna?",
          options: [
            "Continua sendo resistência",
            "Perde sua relevância",
            "Torna-se o novo suporte",
            "Torna-se uma zona de perigo",
          ],
          correctIndex: 2,
          explanation:
            "Quando a resistência é quebrada, o papel se inverte — ela passa a ser suporte. Isso acontece porque os compradores que estavam esperando naquela zona agora defendem o nível de baixo.",
        },
        {
          id: "1.2.3",
          type: "scenario",
          text: "O preço quicou 3 vezes no nível 4500 sem romper. O que isso indica?",
          correctAnswer: "4500 é um suporte forte",
          explanation:
            "Quanto mais vezes um nível é testado e respeitado, mais forte ele é. Três toques no mesmo nível sem romper indica que há compradores consistentes naquela região — é um suporte forte.",
        },
        {
          id: "1.2.4",
          type: "true_false",
          text: "Verdadeiro ou Falso: Quanto mais vezes um nível é testado, mais forte ele é.",
          options: ["Verdadeiro", "Falso"],
          correctIndex: 0,
          explanation:
            "VERDADEIRO. Cada teste de um nível confirma que há participantes do mercado reagindo ali. Múltiplos toques criam um nível de alta confluência que traders profissionais respeitam.",
        },
      ],
    },
    {
      id: "1.3",
      title: "O que são Futuros (MES e MNQ)",
      content: [
        "Futuros são contratos para comprar ou vender um ativo a um preço definido em uma data futura.",
        "MES (Micro E-mini S&P 500): 1 ponto = $5. Tick = 0.25 = $1.25 por tick.",
        "MNQ (Micro E-mini Nasdaq): 1 ponto = $2. Tick = 0.25 = $0.50 por tick.",
        "O MNQ é mais volátil que o MES porque o Nasdaq tem mais tecnologia e oscila mais.",
      ],
      keyConcept:
        "Com 1 MES, cada ponto vale $5. Stop de 10 pontos = perda de $50.",
      svgKey: "futures_table",
      questions: [
        {
          id: "1.3.1",
          type: "multiple_choice",
          text: "Quanto vale 1 ponto no MES (Micro E-mini S&P 500)?",
          options: ["$2", "$5", "$10", "$50"],
          correctIndex: 1,
          explanation:
            "No MES, cada ponto vale $5. Portanto, se você compra a 4500 e vende a 4510 (10 pontos), seu lucro é $50 por contrato.",
        },
        {
          id: "1.3.2",
          type: "calculation",
          text: "Cálculo: Você tem 1 contrato MES com stop de 10 pontos. Qual é a perda máxima?",
          correctAnswer: "$50 (10 pontos × $5/ponto)",
          explanation:
            "1 contrato MES × 10 pontos × $5/ponto = $50. Sempre calcule seu risco em dólares ANTES de entrar no trade.",
        },
        {
          id: "1.3.3",
          type: "multiple_choice",
          text: "Qual é mais volátil: MES ou MNQ?",
          options: [
            "MES — porque o S&P é maior",
            "MNQ — porque o Nasdaq tem mais tecnologia e oscila mais",
            "São igualmente voláteis",
            "Depende do dia",
          ],
          correctIndex: 1,
          explanation:
            "O MNQ (Nasdaq) é geralmente mais volátil que o MES (S&P 500) porque o Nasdaq é dominado por ações de tecnologia que têm movimentos mais bruscos.",
        },
        {
          id: "1.3.4",
          type: "calculation",
          text: "Cálculo: Stop de 8 pontos no MES com 1 contrato = perda de quanto?",
          correctAnswer: "$40 (8 pontos × $5/ponto)",
          explanation:
            "8 pontos × $5/ponto = $40. Simples assim. Sempre faça esse cálculo antes de entrar.",
        },
        {
          id: "1.3.5",
          type: "true_false",
          text: "Verdadeiro ou Falso: MES e MNQ rastreiam o mesmo índice.",
          options: ["Verdadeiro", "Falso"],
          correctIndex: 1,
          explanation:
            "FALSO. MES rastreia o S&P 500 (500 maiores empresas dos EUA). MNQ rastreia o Nasdaq 100 (100 maiores empresas de tecnologia). São índices diferentes com comportamentos diferentes.",
        },
      ],
    },
    {
      id: "1.4",
      title: "Risco e Retorno (R:R)",
      content: [
        "R:R (Risk:Reward) é a relação entre o quanto você arrisca e o quanto você pode ganhar.",
        "R:R 1:2 significa: para cada $1 arriscado, você busca $2 de lucro.",
        "Com R:R 1:2, você pode errar 40% das vezes e ainda ser lucrativo.",
        "Nunca entre em um trade sem saber qual é o seu R:R antes de entrar.",
      ],
      keyConcept:
        "Com R:R de 1:2, você pode errar 40% das vezes e ainda ser lucrativo.",
      svgKey: "risk_reward",
      questions: [
        {
          id: "1.4.1",
          type: "multiple_choice",
          text: "O que significa R:R de 1:2?",
          options: [
            "Você faz 2 trades por dia",
            "Para cada $1 arriscado, você busca $2 de lucro",
            "Você precisa de 2 wins para cada loss",
            "O stop é 2x maior que o alvo",
          ],
          correctIndex: 1,
          explanation:
            "R:R 1:2 significa que para cada $1 que você arrisca, você busca $2 de retorno. Se você arrisca $50, seu alvo é $100.",
        },
        {
          id: "1.4.2",
          type: "calculation",
          text: "Você arrisca $50 por trade com R:R 1:2. Qual é o seu alvo?",
          correctAnswer: "$100 ($50 × 2)",
          explanation:
            "Com R:R 1:2, o alvo é sempre o dobro do risco. $50 de risco × 2 = $100 de alvo.",
        },
        {
          id: "1.4.3",
          type: "true_false",
          text: "Verdadeiro ou Falso: Com 40% de win rate e R:R 1:2, você é lucrativo.",
          options: ["Verdadeiro", "Falso"],
          correctIndex: 0,
          explanation:
            "VERDADEIRO. 10 trades: 4 wins × $100 = $400. 6 losses × $50 = $300. Resultado: +$100. Com bom R:R, você não precisa de alta win rate para ser lucrativo.",
        },
        {
          id: "1.4.4",
          type: "calculation",
          text: "10 trades, 4 wins de $100, 6 losses de $50. Qual é o resultado final?",
          correctAnswer: "+$100 (4×$100 = $400 - 6×$50 = $300 = +$100)",
          explanation:
            "Ganhos: 4 × $100 = $400. Perdas: 6 × $50 = $300. Resultado: $400 - $300 = +$100 de lucro com apenas 40% de acerto.",
        },
      ],
    },
    {
      id: "1.5",
      title: "O que é uma Prop Firm",
      content: [
        "Prop firms são empresas que financiam traders. Você faz uma avaliação e, se passar, opera com o capital deles.",
        "Regras típicas de avaliação 25K: meta de lucro $1.500 (6%), loss máximo diário $1.000, loss máximo total $2.500.",
        "Comissão MES: $0.50 por lado (round trip = $1.00 por contrato).",
        "O objetivo não é ganhar rápido — é provar disciplina e consistência.",
      ],
      keyConcept:
        "O objetivo da avaliação não é ganhar dinheiro rápido. É provar que você não perde de forma descontrolada.",
      svgKey: "prop_firm",
      questions: [
        {
          id: "1.5.1",
          type: "multiple_choice",
          text: "Qual é a meta de lucro típica de uma avaliação 25K?",
          options: ["$500 (2%)", "$1.500 (6%)", "$2.500 (10%)", "$5.000 (20%)"],
          correctIndex: 1,
          explanation:
            "A meta típica de uma avaliação 25K é $1.500, que representa 6% da conta. É um objetivo alcançável com consistência, não com apostas.",
        },
        {
          id: "1.5.2",
          type: "multiple_choice",
          text: "Qual é o loss máximo diário permitido?",
          options: ["$500", "$750", "$1.000", "$2.500"],
          correctIndex: 2,
          explanation:
            "O loss máximo diário é $1.000. Se você atingir esse limite, o dia de trading acabou. Isso protege a conta de drawdowns catastróficos em um único dia.",
        },
        {
          id: "1.5.3",
          type: "true_false",
          text: "Verdadeiro ou Falso: Você pode operar qualquer ativo na avaliação.",
          options: ["Verdadeiro", "Falso"],
          correctIndex: 1,
          explanation:
            "FALSO. Prop firms geralmente restringem os ativos que você pode operar. Futuros de índice (MES, MNQ) são os mais comuns, mas cada firma tem suas regras específicas.",
        },
        {
          id: "1.5.4",
          type: "multiple_choice",
          text: "O que acontece se você atingir o loss máximo total de $2.500?",
          options: [
            "Você recebe um aviso e pode continuar",
            "A conta é pausada por 24h",
            "A avaliação é encerrada — você falhou",
            "Você perde apenas os lucros acumulados",
          ],
          correctIndex: 2,
          explanation:
            "Atingir o loss máximo total encerra a avaliação. Você precisaria pagar novamente para recomeçar. Por isso o gerenciamento de risco é FUNDAMENTAL.",
        },
        {
          id: "1.5.5",
          type: "multiple_choice",
          text: "Por que prop firms existem?",
          options: [
            "Para ensinar traders iniciantes",
            "Para cobrar taxas de avaliação",
            "Elas fornecem capital, o trader fornece habilidade, ambos dividem o lucro",
            "Para competir com corretoras tradicionais",
          ],
          correctIndex: 2,
          explanation:
            "A prop firm tem capital mas precisa de traders habilidosos. O trader tem habilidade mas não tem capital suficiente. É uma parceria: a firma fornece o capital, o trader opera, e ambos dividem os lucros.",
        },
      ],
    },
  ],
};

// ============================================================
// MODULE 2 — PRICE ACTION
// ============================================================
const module2: Module = {
  id: 2,
  title: "PRICE ACTION",
  subtitle: "Basic",
  color: "#FFB74D",
  lessons: [
    {
      id: "2.1",
      title: "Estrutura de Mercado",
      content: [
        "Tendência de alta (uptrend): o mercado faz Máximas Mais Altas (HH) e Mínimas Mais Altas (HL).",
        "Tendência de baixa (downtrend): o mercado faz Máximas Mais Baixas (LH) e Mínimas Mais Baixas (LL).",
        "Mercado lateral (range): o preço oscila entre dois níveis sem direção clara.",
        "Sempre identifique a estrutura ANTES de entrar. Operar contra a tendência é nadar contra a corrente.",
      ],
      keyConcept:
        "Antes de entrar, identifique: o mercado está subindo, caindo ou lateralizando?",
      svgKey: "market_structure",
      questions: [
        {
          id: "2.1.1",
          type: "multiple_choice",
          text: "O que define uma tendência de alta?",
          options: [
            "Preço acima da média móvel",
            "Máximas Mais Altas (HH) e Mínimas Mais Altas (HL)",
            "Volume crescente",
            "RSI acima de 50",
          ],
          correctIndex: 1,
          explanation:
            "Uma tendência de alta é definida por HH (Higher Highs — máximas mais altas) e HL (Higher Lows — mínimas mais altas). Cada recuo cria uma mínima mais alta que a anterior.",
        },
        {
          id: "2.1.2",
          type: "multiple_choice",
          text: "O que é um mercado lateral (range)?",
          options: [
            "Preço subindo lentamente",
            "Preço oscilando entre dois níveis sem direção clara",
            "Mercado fechado",
            "Baixo volume de negociação",
          ],
          correctIndex: 1,
          explanation:
            "Um range é quando o preço fica preso entre suporte e resistência, sem criar novos HH ou LL. Em range, a estratégia muda: compra no suporte, vende na resistência.",
        },
        {
          id: "2.1.3",
          type: "true_false",
          text: "Verdadeiro ou Falso: Você deve operar na direção da tendência.",
          options: ["Verdadeiro", "Falso"],
          correctIndex: 0,
          explanation:
            "VERDADEIRO. Operar na direção da tendência aumenta significativamente a probabilidade de sucesso. 'The trend is your friend' é um dos princípios mais importantes do trading.",
        },
        {
          id: "2.1.4",
          type: "multiple_choice",
          text: "Em uma tendência de alta, o mercado faz uma Mínima Mais Baixa (LL). O que isso sinaliza?",
          options: [
            "Continuação da tendência de alta",
            "Possível mudança de tendência — alerta vermelho",
            "Oportunidade de compra",
            "Nada significativo",
          ],
          correctIndex: 1,
          explanation:
            "Uma LL (Lower Low) em uma tendência de alta quebra a estrutura. É um alerta de que a tendência pode estar mudando. Não é certeza, mas é um sinal para reduzir exposição ou sair.",
        },
        {
          id: "2.1.5",
          type: "scenario",
          text: "O mercado está fazendo HH e HL consistentemente nas últimas 2 horas. Qual é o bias correto?",
          correctAnswer: "Bias de compra — buscar longs nos recuos (HL)",
          explanation:
            "Com estrutura de HH e HL, o bias é comprador. A estratégia é aguardar um recuo que forme um HL e entrar comprado nessa região de suporte.",
        },
      ],
    },
    {
      id: "2.2",
      title: "Timeframes — Quando usar cada um",
      content: [
        "1M: precisão de entrada apenas. Muito ruído para análise.",
        "5M: timeframe principal de operação intraday.",
        "15M: encontrar setups e confirmar direção.",
        "1H: contexto do dia. 4H/Diário: tendência geral.",
        "Regra: confirme no 15M, entre no 5M.",
      ],
      keyConcept:
        "Nunca olhe só 1 timeframe. Confirme no 15M, entre no 5M.",
      svgKey: "timeframes",
      questions: [
        {
          id: "2.2.1",
          type: "multiple_choice",
          text: "Qual timeframe usar para identificar a tendência geral?",
          options: ["1M", "5M", "15M", "4H ou Diário"],
          correctIndex: 3,
          explanation:
            "4H ou Diário mostram a tendência macro. Antes de qualquer trade, verifique esses timeframes para entender o contexto maior.",
        },
        {
          id: "2.2.2",
          type: "multiple_choice",
          text: "Qual é o melhor timeframe para ENCONTRAR seu setup?",
          options: ["1M", "5M", "15M", "1H"],
          correctIndex: 2,
          explanation:
            "O 15M é ideal para encontrar setups — ele filtra o ruído do 1M e 5M mas ainda mostra movimentos intraday relevantes.",
        },
        {
          id: "2.2.3",
          type: "multiple_choice",
          text: "Qual timeframe usar para TIMING preciso de entrada?",
          options: ["1M ou 5M", "15M", "1H", "4H"],
          correctIndex: 0,
          explanation:
            "1M ou 5M são usados para timing preciso de entrada depois que o setup foi identificado no 15M. Eles permitem entrar com stop menor.",
        },
        {
          id: "2.2.4",
          type: "true_false",
          text: "Verdadeiro ou Falso: Operar apenas no 1M é uma boa estratégia.",
          options: ["Verdadeiro", "Falso"],
          correctIndex: 1,
          explanation:
            "FALSO. O 1M tem muito ruído — movimentos aleatórios sem significado. Sem contexto de timeframes maiores, você vai entrar e sair de trades aleatoriamente.",
        },
        {
          id: "2.2.5",
          type: "scenario",
          text: "Você quer entrar comprado no MES. Em que ordem você verifica os timeframes?",
          correctAnswer: "4H → 1H → 15M → 5M → 1M",
          explanation:
            "Top-down analysis: comece pelo maior (4H) para entender a tendência, desça para o 15M para encontrar o setup, e use o 5M/1M para timing de entrada.",
        },
      ],
    },
    {
      id: "2.3",
      title: "Candles de Reversão",
      content: [
        "Pin Bar: corpo pequeno com sombra longa — rejeição forte de um nível.",
        "Doji: abertura e fechamento quase iguais — indecisão entre compradores e vendedores.",
        "Engulfing Bullish: candle verde engole o candle vermelho anterior — reversão compradora.",
        "Engulfing Bearish: candle vermelho engole o candle verde anterior — reversão vendedora.",
        "Inside Bar: candle completamente dentro do anterior — compressão antes de um movimento.",
      ],
      keyConcept:
        "Esses padrões são alertas de mudança, não garantia. Use sempre com contexto.",
      svgKey: "reversal_candles",
      questions: [
        {
          id: "2.3.1",
          type: "multiple_choice",
          text: "O que um Doji indica?",
          options: [
            "Forte tendência de alta",
            "Indecisão entre compradores e vendedores",
            "Reversão garantida",
            "Alto volume de negociação",
          ],
          correctIndex: 1,
          explanation:
            "O Doji tem abertura e fechamento quase iguais, formando uma cruz. Isso indica equilíbrio entre compradores e vendedores — indecisão. Em um nível importante, pode sinalizar reversão.",
        },
        {
          id: "2.3.2",
          type: "multiple_choice",
          text: "Um Bullish Engulfing em suporte sinaliza o quê?",
          options: [
            "Continuação da queda",
            "Potencial reversão para cima",
            "Mercado lateral",
            "Nada relevante",
          ],
          correctIndex: 1,
          explanation:
            "Bullish Engulfing em suporte é um dos padrões mais poderosos: o candle verde engole o vermelho anterior, mostrando que compradores assumiram o controle naquele nível importante.",
        },
        {
          id: "2.3.3",
          type: "true_false",
          text: "Verdadeiro ou Falso: Um Pin Bar em resistência é um sinal de compra.",
          options: ["Verdadeiro", "Falso"],
          correctIndex: 1,
          explanation:
            "FALSO. Um Pin Bar em resistência é um sinal de VENDA. A sombra longa mostra que o preço tentou subir mas foi rejeitado pelos vendedores. É um sinal bearish.",
        },
        {
          id: "2.3.4",
          type: "multiple_choice",
          text: "O que é um Inside Bar?",
          options: [
            "Um candle com corpo muito grande",
            "Um candle completamente dentro do anterior — compressão antes de movimento",
            "Um candle que abre e fecha no mesmo preço",
            "Um candle com duas sombras iguais",
          ],
          correctIndex: 1,
          explanation:
            "Inside Bar é quando o candle atual está completamente dentro do range do candle anterior (máxima menor, mínima maior). Indica compressão — o mercado está 'respirando' antes de um movimento.",
        },
      ],
    },
    {
      id: "2.4",
      title: "Stop Loss e Take Profit",
      content: [
        "Stop Loss SEMPRE além de um nível de estrutura — nunca aleatório.",
        "Long: SL abaixo da última mínima de swing (swing low).",
        "Short: SL acima da última máxima de swing (swing high).",
        "Take Profit: máxima/mínima anterior, nível de resistência/suporte, ou alvo de R:R.",
        "Nunca mova o SL contra você quando estiver perdendo.",
      ],
      keyConcept:
        "Stop não é onde você aceita perder. É onde o mercado prova que você estava errado.",
      svgKey: "stop_loss",
      questions: [
        {
          id: "2.4.1",
          type: "multiple_choice",
          text: "Onde colocar o Stop Loss em um trade de compra (long)?",
          options: [
            "Abaixo do preço de entrada",
            "Abaixo da última mínima de swing (swing low)",
            "No mesmo preço de entrada",
            "Onde você aceita perder",
          ],
          correctIndex: 1,
          explanation:
            "O SL em um long deve ficar abaixo da última mínima de swing. Se o preço romper esse nível, a estrutura de alta foi quebrada e o setup original é inválido.",
        },
        {
          id: "2.4.2",
          type: "multiple_choice",
          text: "Onde colocar o Take Profit?",
          options: [
            "Quando você se sentir bem",
            "Na máxima anterior, resistência, ou alvo de R:R",
            "Sempre 20 pontos acima da entrada",
            "Quando o P&L atingir $100",
          ],
          correctIndex: 1,
          explanation:
            "TP deve ser em um nível técnico: máxima anterior, resistência, ou calculado pelo R:R desejado. Alvos arbitrários não fazem sentido.",
        },
        {
          id: "2.4.3",
          type: "true_false",
          text: "Verdadeiro ou Falso: Mover o SL para mais longe quando você está perdendo é boa gestão de risco.",
          options: ["Verdadeiro", "Falso"],
          correctIndex: 1,
          explanation:
            "FALSO. Mover o SL contra você é uma das piores decisões no trading. Você está aumentando o risco de um trade que já está indo mal. Respeite o stop original.",
        },
        {
          id: "2.4.4",
          type: "scenario",
          text: "Você entra comprado a 4500. A última mínima de swing está em 4490. Onde fica o SL?",
          correctAnswer: "Abaixo de 4490, por exemplo em 4488",
          explanation:
            "O SL deve ficar ABAIXO do swing low em 4490, não exatamente nele. Coloque alguns pontos abaixo (4488-4487) para evitar ser stopado por um spike de liquidez.",
        },
        {
          id: "2.4.5",
          type: "multiple_choice",
          text: "O que é uma saída parcial (partial exit)?",
          options: [
            "Sair do trade quando está com medo",
            "Fechar parte da posição antes do alvo final para reduzir risco",
            "Dividir o stop em dois",
            "Entrar em dois momentos diferentes",
          ],
          correctIndex: 1,
          explanation:
            "Saída parcial é fechar parte da posição (ex: 50%) antes do alvo final. Isso garante algum lucro e reduz o risco do restante da posição.",
        },
      ],
    },
    {
      id: "2.5",
      title: "Tipos de Ordem",
      content: [
        "Market Order: executa imediatamente ao preço atual. Use quando precisa entrar AGORA.",
        "Limit Buy: compra a um preço ABAIXO do atual. Você espera o preço vir até você.",
        "Stop Buy: compra quando o preço SOBE acima de um nível. Entrada em breakout.",
        "Stop Sell: vende quando o preço CAI abaixo de um nível. Entrada em breakdown.",
      ],
      keyConcept:
        "Limit buy = você vai ao mercado. Stop buy = o mercado confirma pra você.",
      svgKey: "order_types",
      questions: [
        {
          id: "2.5.1",
          type: "multiple_choice",
          text: "Você quer comprar MES a 4500 mas está em 4510. Qual ordem usar?",
          options: [
            "Market Order",
            "Limit Buy a 4500",
            "Stop Buy a 4500",
            "Stop Sell a 4500",
          ],
          correctIndex: 1,
          explanation:
            "Limit Buy a 4500 — você define o preço máximo que quer pagar. A ordem só executa se o preço cair até 4500 ou abaixo.",
        },
        {
          id: "2.5.2",
          type: "multiple_choice",
          text: "Você quer comprar MES APENAS se ele romper acima de 4520 (resistência). Qual ordem?",
          options: [
            "Market Order",
            "Limit Buy a 4520",
            "Stop Buy a 4520",
            "Stop Sell a 4520",
          ],
          correctIndex: 2,
          explanation:
            "Stop Buy a 4520 — a ordem só executa se o preço SUBIR até 4520. Isso confirma o rompimento antes de entrar.",
        },
        {
          id: "2.5.3",
          type: "multiple_choice",
          text: "O que uma Market Order garante?",
          options: [
            "Execução ao preço desejado",
            "Execução imediata, mas não o preço",
            "Melhor preço disponível",
            "Sem slippage",
          ],
          correctIndex: 1,
          explanation:
            "Market Order garante EXECUÇÃO mas não garante o PREÇO. Em mercados rápidos, pode haver slippage (diferença entre o preço esperado e o executado).",
        },
        {
          id: "2.5.4",
          type: "true_false",
          text: "Verdadeiro ou Falso: Uma Limit Sell executa quando o preço cai abaixo do seu nível especificado.",
          options: ["Verdadeiro", "Falso"],
          correctIndex: 1,
          explanation:
            "FALSO. Limit Sell executa no seu preço especificado OU MELHOR (acima). Se você coloca Limit Sell a 4520, ela executa a 4520 ou acima — nunca abaixo.",
        },
      ],
    },
    {
      id: "2.6",
      title: "Quando segurar vs quando sair",
      content: [
        "Não saia só porque o P&L oscilou negativamente — isso é normal.",
        "Sua saída é o stop ou o alvo. Não é o seu medo.",
        "Se o setup ainda é válido (estrutura intacta, preço no lado certo), fique no trade.",
        "Saída antecipada por medo é um dos maiores erros de traders iniciantes.",
      ],
      keyConcept:
        "Sua saída é o stop ou o alvo. Não é o seu medo.",
      svgKey: "hold_vs_exit",
      questions: [
        {
          id: "2.6.1",
          type: "scenario",
          text: "Você está com +$80 em um trade com alvo de $100. O preço recua para +$60 mas o setup está intacto. O que fazer?",
          correctAnswer: "Manter o trade — o setup ainda é válido",
          explanation:
            "Se o setup está intacto (preço não quebrou estrutura, não atingiu SL), mantenha o trade. Sair por medo de 'perder o lucro' é deixar dinheiro na mesa.",
        },
        {
          id: "2.6.2",
          type: "multiple_choice",
          text: "Quando é correto sair de um trade antes do alvo?",
          options: [
            "Quando o P&L cair",
            "Quando você estiver com medo",
            "Quando o setup original for invalidado",
            "Após 30 minutos no trade",
          ],
          correctIndex: 2,
          explanation:
            "Saia antecipado APENAS quando o setup original for invalidado — por exemplo, se o preço quebrar a estrutura que justificava a entrada. Não saia por emoção.",
        },
        {
          id: "2.6.3",
          type: "true_false",
          text: "Verdadeiro ou Falso: Sair de um trade vencedor cedo por medo é boa disciplina.",
          options: ["Verdadeiro", "Falso"],
          correctIndex: 1,
          explanation:
            "FALSO. Sair cedo por medo é deixar dinheiro na mesa e reforça um comportamento emocional. Disciplina é seguir o plano — stop ou alvo.",
        },
        {
          id: "2.6.4",
          type: "multiple_choice",
          text: "O que é um trailing stop?",
          options: [
            "Um stop que nunca muda",
            "Um stop que se move com o preço para travar lucros",
            "Um stop colocado no breakeven",
            "Um stop muito largo",
          ],
          correctIndex: 1,
          explanation:
            "Trailing stop se move junto com o preço na direção favorável, travando lucros progressivamente. Se o preço reverter, o stop trava o lucro acumulado.",
        },
      ],
    },
  ],
};

// ============================================================
// MODULE 3 — SMART MONEY CONCEPTS
// ============================================================
const module3: Module = {
  id: 3,
  title: "SMART MONEY",
  subtitle: "Intermediate",
  color: "#AB47BC",
  lessons: [
    {
      id: "3.1",
      title: "O que é Liquidez",
      content: [
        "Liquidez são ordens acumuladas no mercado — principalmente stops de traders de varejo.",
        "Máximas e mínimas anteriores são onde os stops se acumulam — alvos para instituições.",
        "O mercado frequentemente 'varre' (sweep) esses níveis antes de reverter.",
        "Após o sweep, o preço reverte — é aí que você entra.",
      ],
      keyConcept:
        "O mercado vai onde tem liquidez. Máximas e mínimas anteriores são alvos.",
      svgKey: "liquidity",
      questions: [
        {
          id: "3.1.1",
          type: "multiple_choice",
          text: "O que é um pool de liquidez?",
          options: [
            "Uma área de alto volume",
            "Uma área onde muitos stop losses estão acumulados",
            "Um nível de suporte forte",
            "Uma zona de consolidação",
          ],
          correctIndex: 1,
          explanation:
            "Pool de liquidez é onde muitos stops estão concentrados — geralmente acima de máximas ou abaixo de mínimas anteriores. Instituições precisam dessas ordens para executar posições grandes.",
        },
        {
          id: "3.1.2",
          type: "multiple_choice",
          text: "Por que o preço frequentemente sobe acima de máximas anteriores antes de reverter?",
          options: [
            "É aleatório",
            "Para varrer a liquidez (stops de vendedores) antes de cair",
            "Porque o mercado está em alta",
            "Por causa do volume",
          ],
          correctIndex: 1,
          explanation:
            "Acima de máximas anteriores há stops de vendedores a descoberto. As instituições sobem o preço até lá, ativam esses stops (comprando deles), e depois revertam com a posição vendida.",
        },
        {
          id: "3.1.3",
          type: "true_false",
          text: "Verdadeiro ou Falso: Quando o preço varre uma máxima e reverte imediatamente, é sinal de manipulação institucional.",
          options: ["Verdadeiro", "Falso"],
          correctIndex: 0,
          explanation:
            "VERDADEIRO. Esse padrão — spike acima da máxima seguido de reversão rápida — é chamado de 'liquidity grab' ou 'stop hunt'. Instituições usam isso para construir posições.",
        },
        {
          id: "3.1.4",
          type: "scenario",
          text: "O preço sobe acima da máxima do dia anterior e reverte rapidamente. Como você usa isso?",
          correctAnswer: "Aguardar a reversão confirmar e entrar vendido",
          explanation:
            "Após um liquidity grab (sweep da máxima + reversão), você entra na direção da reversão. O sweep confirmou que as instituições venderam ali.",
        },
      ],
    },
    {
      id: "3.2",
      title: "VWAP — O indicador mais importante",
      content: [
        "VWAP = Volume Weighted Average Price — preço médio ponderado pelo volume do dia.",
        "Reseta todo dia às 9:30 AM ET (abertura do mercado americano).",
        "Preço acima do VWAP = bias de compra. Abaixo = bias de venda.",
        "Setup VWAP pullback: preço acima do VWAP, recua até o VWAP, quica = long.",
      ],
      keyConcept:
        "VWAP é o preço justo do dia. O mercado fica gravitando em torno dele.",
      svgKey: "vwap",
      questions: [
        {
          id: "3.2.1",
          type: "multiple_choice",
          text: "O que significa VWAP?",
          options: [
            "Volume Weighted Average Price",
            "Variable Width Average Price",
            "Volatility Weighted Asset Price",
            "Volume With Average Percentage",
          ],
          correctIndex: 0,
          explanation:
            "VWAP = Volume Weighted Average Price. É o preço médio do dia ponderado pelo volume — ou seja, períodos de alto volume têm mais peso no cálculo.",
        },
        {
          id: "3.2.2",
          type: "multiple_choice",
          text: "O preço está acima do VWAP. Qual é o bias?",
          options: [
            "Bearish — buscar shorts",
            "Bullish — buscar longs",
            "Neutro",
            "Depende do RSI",
          ],
          correctIndex: 1,
          explanation:
            "Preço acima do VWAP = bias bullish. O mercado está pagando acima do preço médio do dia, indicando que compradores estão no controle.",
        },
        {
          id: "3.2.3",
          type: "multiple_choice",
          text: "Quando o VWAP reseta?",
          options: [
            "Toda semana",
            "Todo mês",
            "Todo dia às 9:30 AM ET (abertura do mercado)",
            "Nunca reseta",
          ],
          correctIndex: 2,
          explanation:
            "O VWAP reseta todo dia às 9:30 AM ET com a abertura do mercado americano. Por isso é uma ferramenta intraday — não funciona para swing trading.",
        },
        {
          id: "3.2.4",
          type: "multiple_choice",
          text: "O que é um setup de VWAP pullback?",
          options: [
            "Entrar quando o preço cruza o VWAP para baixo",
            "Preço acima do VWAP, recua até o VWAP, quica — entrar long",
            "Entrar quando o VWAP está subindo",
            "Vender quando o preço está muito acima do VWAP",
          ],
          correctIndex: 1,
          explanation:
            "VWAP pullback: preço abre acima do VWAP (bias bullish), recua para testar o VWAP (suporte dinâmico), mostra rejeição — entra long com SL abaixo do VWAP.",
        },
        {
          id: "3.2.5",
          type: "true_false",
          text: "Verdadeiro ou Falso: VWAP é mais útil para swing trading do que para day trading.",
          options: ["Verdadeiro", "Falso"],
          correctIndex: 1,
          explanation:
            "FALSO. VWAP é primariamente uma ferramenta intraday. Como reseta todo dia, perde relevância em timeframes maiores. Para swing, use médias móveis como EMA 21 ou 50.",
        },
      ],
    },
    {
      id: "3.3",
      title: "EMAs — 9 e 21",
      content: [
        "EMA (Exponential Moving Average) dá mais peso aos preços recentes.",
        "EMA 9 acima da EMA 21 = stack bullish — mercado em tendência de alta.",
        "EMA 9 abaixo da EMA 21 = stack bearish — mercado em tendência de baixa.",
        "Combine com VWAP: preço acima do VWAP + EMA 9 acima da 21 = setup de alta probabilidade.",
      ],
      keyConcept:
        "EMA 9 acima da 21 = mercado em tendência de alta. Simples assim.",
      svgKey: "ema",
      questions: [
        {
          id: "3.3.1",
          type: "multiple_choice",
          text: "EMA 9 cruza acima da EMA 21. O que isso sinaliza?",
          options: [
            "Reversão bearish",
            "Mudança de momentum para bullish",
            "Mercado lateral",
            "Hora de vender",
          ],
          correctIndex: 1,
          explanation:
            "EMA 9 cruzando acima da EMA 21 (golden cross) sinaliza mudança de momentum para bullish. Os preços recentes estão subindo mais rápido que a média de médio prazo.",
        },
        {
          id: "3.3.2",
          type: "multiple_choice",
          text: "Melhor condição para um long usando EMAs?",
          options: [
            "EMA 9 abaixo da EMA 21",
            "EMA 9 acima da EMA 21 e preço acima de ambas",
            "EMAs se cruzando",
            "EMA 21 acima da EMA 9",
          ],
          correctIndex: 1,
          explanation:
            "Para long: EMA 9 acima da EMA 21 (stack bullish) e preço acima de ambas. Isso confirma tendência de alta em múltiplas perspectivas.",
        },
        {
          id: "3.3.3",
          type: "true_false",
          text: "Verdadeiro ou Falso: EMAs preveem a direção futura do preço.",
          options: ["Verdadeiro", "Falso"],
          correctIndex: 1,
          explanation:
            "FALSO. EMAs são indicadores LAGGING (atrasados) — elas mostram a tendência atual baseada em dados passados. Não preveem o futuro, mas confirmam a direção atual.",
        },
        {
          id: "3.3.4",
          type: "scenario",
          text: "Preço acima do VWAP E EMA 9 acima da EMA 21. Qual é o bias?",
          correctAnswer: "Fortemente bullish — alta probabilidade de long",
          explanation:
            "Confluência de dois indicadores apontando para cima é um sinal forte. VWAP bullish + EMA stack bullish = setup de alta probabilidade para long.",
        },
      ],
    },
    {
      id: "3.4",
      title: "RSI — Leitura de Momentum",
      content: [
        "RSI 14 mede a velocidade e força das mudanças de preço. Escala de 0 a 100.",
        "Acima de 70 = sobrecomprado (overbought). Abaixo de 30 = sobrevendido (oversold).",
        "Linha 50 = bias. Acima de 50 = bias de compra. Abaixo de 50 = bias de venda.",
        "RSI sozinho não é sinal — use como filtro de confluência.",
      ],
      keyConcept:
        "RSI acima de 50 = bias de compra. Abaixo de 50 = bias de venda.",
      svgKey: "rsi",
      questions: [
        {
          id: "3.4.1",
          type: "multiple_choice",
          text: "RSI está em 75. O que isso indica?",
          options: [
            "Mercado em tendência forte — compre mais",
            "Sobrecomprado — possível reversão ou desaceleração",
            "Hora de vender imediatamente",
            "Nada relevante",
          ],
          correctIndex: 1,
          explanation:
            "RSI acima de 70 indica sobrecomprado — o preço subiu rápido demais. Pode haver desaceleração ou reversão, mas em tendências fortes o RSI pode ficar sobrecomprado por muito tempo.",
        },
        {
          id: "3.4.2",
          type: "multiple_choice",
          text: "RSI cruza acima de 50. O que isso sinaliza?",
          options: [
            "Bias bearish",
            "Bias bullish — momentum positivo",
            "Mercado lateral",
            "Sobrecomprado",
          ],
          correctIndex: 1,
          explanation:
            "RSI cruzando acima de 50 sinaliza que o momentum mudou para bullish. O preço está subindo mais do que caindo no período analisado.",
        },
        {
          id: "3.4.3",
          type: "true_false",
          text: "Verdadeiro ou Falso: RSI em 80 significa que você deve vender imediatamente.",
          options: ["Verdadeiro", "Falso"],
          correctIndex: 1,
          explanation:
            "FALSO. Em tendências fortes, o RSI pode ficar em 80+ por muito tempo. Vender apenas porque o RSI está alto sem outros sinais é um erro comum.",
        },
        {
          id: "3.4.4",
          type: "scenario",
          text: "Setup de VWAP pullback formando E RSI cruzando acima de 50. É um bom setup?",
          correctAnswer: "Sim — confluência de dois sinais aumenta a probabilidade",
          explanation:
            "Confluência é a chave. VWAP pullback + RSI bullish = dois sinais independentes apontando na mesma direção. Isso aumenta significativamente a probabilidade do trade.",
        },
      ],
    },
    {
      id: "3.5",
      title: "Order Blocks",
      content: [
        "Order Block (OB) é onde instituições colocaram ordens grandes — o preço frequentemente volta para testar.",
        "Bullish OB: último candle bearish antes de um movimento impulsivo de alta.",
        "Bearish OB: último candle bullish antes de um movimento impulsivo de baixa.",
        "Quando o preço retorna ao OB, busque confirmação (pin bar, engulfing) para entrar.",
      ],
      keyConcept:
        "Order Block é onde institucional entrou. O preço frequentemente volta para testar.",
      svgKey: "order_block",
      questions: [
        {
          id: "3.5.1",
          type: "multiple_choice",
          text: "O que é um Bullish Order Block?",
          options: [
            "O primeiro candle verde de uma tendência",
            "O último candle bearish antes de um movimento impulsivo de alta",
            "Uma zona de suporte qualquer",
            "Um candle com volume muito alto",
          ],
          correctIndex: 1,
          explanation:
            "Bullish OB é o último candle bearish antes de um impulso de alta. Instituições colocaram suas ordens de compra nessa zona — quando o preço retorna, elas defendem o nível.",
        },
        {
          id: "3.5.2",
          type: "multiple_choice",
          text: "Por que Order Blocks são importantes?",
          options: [
            "São visíveis em todos os timeframes",
            "Instituições colocaram ordens grandes ali — o preço tende a reagir",
            "São sempre respeitados",
            "Indicam alto volume",
          ],
          correctIndex: 1,
          explanation:
            "OBs marcam onde instituições entraram com posições grandes. Quando o preço retorna, essas mesmas instituições tendem a defender suas posições, causando reação.",
        },
        {
          id: "3.5.3",
          type: "true_false",
          text: "Verdadeiro ou Falso: Order Blocks são sempre respeitados.",
          options: ["Verdadeiro", "Falso"],
          correctIndex: 1,
          explanation:
            "FALSO. OBs podem ser quebrados. Nenhum nível é 100% confiável. Por isso sempre use SL e busque confluência (OB + VWAP + estrutura) antes de entrar.",
        },
        {
          id: "3.5.4",
          type: "scenario",
          text: "O preço retorna a um Bullish OB. Qual é a melhor forma de entrar?",
          correctAnswer: "Aguardar confirmação (pin bar, engulfing bullish) no OB, depois entrar long",
          explanation:
            "Não entre no OB cegamente. Aguarde um candle de confirmação (pin bar, bullish engulfing) que mostre rejeição do nível. Isso reduz falsos sinais.",
        },
      ],
    },
    {
      id: "3.6",
      title: "Fair Value Gap (FVG)",
      content: [
        "FVG é um desequilíbrio criado por um movimento impulsivo — gap entre o candle 1 e o candle 3.",
        "O mercado frequentemente volta para 'preencher' o FVG antes de continuar.",
        "Bullish FVG: mínima do candle 3 acima da máxima do candle 1 — zona de suporte.",
        "FVG + Order Block na mesma zona = confluência de alta probabilidade.",
      ],
      keyConcept:
        "FVG é um desequilíbrio. O mercado frequentemente volta para preenchê-lo.",
      svgKey: "fvg",
      questions: [
        {
          id: "3.6.1",
          type: "multiple_choice",
          text: "O que cria um FVG?",
          options: [
            "Alto volume em um candle",
            "Movimento impulsivo que deixa gap entre candle 1 e candle 3",
            "Dois candles do mesmo tamanho",
            "Abertura de mercado",
          ],
          correctIndex: 1,
          explanation:
            "FVG é criado quando um movimento impulsivo (candle 2 muito grande) deixa um gap entre a máxima do candle 1 e a mínima do candle 3. Essa zona não foi negociada.",
        },
        {
          id: "3.6.2",
          type: "true_false",
          text: "Verdadeiro ou Falso: FVGs são sempre completamente preenchidos.",
          options: ["Verdadeiro", "Falso"],
          correctIndex: 1,
          explanation:
            "FALSO. FVGs frequentemente são parcialmente preenchidos. Em tendências muito fortes, o preço pode nem voltar ao FVG. Não assuma preenchimento total.",
        },
        {
          id: "3.6.3",
          type: "multiple_choice",
          text: "Como usar um FVG como entrada?",
          options: [
            "Entrar quando o FVG é criado",
            "Aguardar o preço retornar ao FVG, ver rejeição, entrar",
            "Entrar quando o FVG é completamente preenchido",
            "Ignorar FVGs pequenos",
          ],
          correctIndex: 1,
          explanation:
            "Aguarde o preço retornar ao FVG (pullback), observe rejeição (candle de reversão), e entre na direção original do movimento impulsivo.",
        },
        {
          id: "3.6.4",
          type: "scenario",
          text: "Você encontra um FVG e um Order Block na mesma zona de preço. O que isso significa?",
          correctAnswer: "Confluência forte — alta probabilidade de reação nessa zona",
          explanation:
            "FVG + OB na mesma zona é uma das confluências mais poderosas no SMC. Dois conceitos independentes apontando para o mesmo nível aumenta muito a probabilidade de reação.",
        },
      ],
    },
  ],
};

// ============================================================
// MODULE 4 — GESTÃO E PSICOLOGIA
// ============================================================
const module4: Module = {
  id: 4,
  title: "GESTÃO & PSICOLOGIA",
  subtitle: "All levels",
  color: "#EF5350",
  lessons: [
    {
      id: "4.1",
      title: "Por que traders perdem",
      content: [
        "Mais de 80% dos day traders perdem dinheiro. O problema raramente é o setup.",
        "Top 5 causas: overtrading, revenge trading, sem stop, tamanho errado de posição, sem journal.",
        "Overtrading: operar demais, sem setup claro, por tédio ou ganância.",
        "Revenge trading: tentar recuperar perdas imediatamente — o pior inimigo do trader.",
      ],
      keyConcept:
        "A causa #1 de falha não é falta de conhecimento. É falta de disciplina.",
      svgKey: "why_traders_lose",
      questions: [
        {
          id: "4.1.1",
          type: "multiple_choice",
          text: "Qual é a principal causa de falha de traders?",
          options: [
            "Falta de conhecimento técnico",
            "Falta de capital",
            "Falta de disciplina e gestão de risco",
            "Mercado manipulado",
          ],
          correctIndex: 2,
          explanation:
            "A maioria dos traders que falham tem conhecimento suficiente — o problema é disciplina. Não seguir o plano, mover stops, fazer revenge trading.",
        },
        {
          id: "4.1.2",
          type: "multiple_choice",
          text: "O que é revenge trading?",
          options: [
            "Operar com raiva do mercado",
            "Tentar recuperar perdas imediatamente com trades impulsivos",
            "Operar o mesmo ativo que deu prejuízo",
            "Aumentar o tamanho da posição após uma perda",
          ],
          correctIndex: 1,
          explanation:
            "Revenge trading é entrar em trades impulsivos para recuperar perdas — sem setup, sem plano. É o caminho mais rápido para destruir uma conta.",
        },
        {
          id: "4.1.3",
          type: "true_false",
          text: "Verdadeiro ou Falso: Operar mais vezes por dia aumenta suas chances de lucro.",
          options: ["Verdadeiro", "Falso"],
          correctIndex: 1,
          explanation:
            "FALSO. Overtrading é uma das principais causas de perda. Mais trades = mais comissões + mais erros emocionais. Qualidade supera quantidade.",
        },
        {
          id: "4.1.4",
          type: "scenario",
          text: "Você perdeu $200 nos primeiros 30 minutos. O que você faz?",
          correctAnswer: "Parar de operar pelo dia — o mercado não está a seu favor",
          explanation:
            "Após uma perda significativa, o emocional está comprometido. A decisão mais profissional é parar, revisar o que aconteceu, e voltar amanhã com a cabeça fria.",
        },
      ],
    },
    {
      id: "4.2",
      title: "Sizing — Tamanho de Posição",
      content: [
        "Sizing é a decisão mais importante de cada trade — mais do que o setup.",
        "Regra básica: nunca arrisque mais de 1-2% do capital por trade.",
        "Em avaliação 25K com risco de 1%: máximo de $250 por trade.",
        "Comece com 1 contrato. Aumente apenas com consistência comprovada.",
      ],
      keyConcept:
        "Sizing correto é o que separa traders que sobrevivem dos que explodem.",
      svgKey: "sizing",
      questions: [
        {
          id: "4.2.1",
          type: "calculation",
          text: "Conta de $25.000 com risco de 1% por trade. Qual é o risco máximo por trade?",
          correctAnswer: "$250 (1% × $25.000)",
          explanation:
            "1% de $25.000 = $250. Esse é o máximo que você deve arriscar em um único trade para preservar o capital.",
        },
        {
          id: "4.2.2",
          type: "multiple_choice",
          text: "Você tem $250 de risco e seu stop é de 10 pontos no MES ($5/ponto). Quantos contratos?",
          options: ["1 contrato", "2 contratos", "5 contratos", "10 contratos"],
          correctIndex: 2,
          explanation:
            "10 pontos × $5/ponto = $50 de risco por contrato. $250 ÷ $50 = 5 contratos. Mas para iniciantes, comece com 1 contrato independente do cálculo.",
        },
        {
          id: "4.2.3",
          type: "true_false",
          text: "Verdadeiro ou Falso: Aumentar o tamanho da posição após uma série de wins é sempre uma boa ideia.",
          options: ["Verdadeiro", "Falso"],
          correctIndex: 1,
          explanation:
            "FALSO. Aumentar posição após wins pode ser perigoso — você pode estar em uma sequência de sorte, não de habilidade. Aumente gradualmente e apenas com consistência comprovada por meses.",
        },
        {
          id: "4.2.4",
          type: "scenario",
          text: "Você está em uma sequência de 5 wins. Você dobra o tamanho da posição. O que pode acontecer?",
          correctAnswer: "Um loss pode apagar todos os 5 wins anteriores",
          explanation:
            "Com posição dobrada, um único loss equivale a dois trades normais. Se você perdeu $50 por trade nos 5 wins (+$250), um loss com posição dobrada (-$100) ainda deixa lucro, mas psicologicamente pode levar a mais aumentos imprudentes.",
        },
      ],
    },
    {
      id: "4.3",
      title: "O Journal — Seu maior ativo",
      content: [
        "Journal é o registro de todos os seus trades — a ferramenta mais subutilizada por traders.",
        "Registre: ativo, direção, entrada, saída, P&L, setup, emoção no momento, lição aprendida.",
        "Revise semanalmente: quais setups funcionaram? Em quais horários você performa melhor?",
        "Sem journal, você repete os mesmos erros sem perceber.",
      ],
      keyConcept:
        "Sem journal, você está voando às cegas. Com journal, você tem dados.",
      svgKey: "journal",
      questions: [
        {
          id: "4.3.1",
          type: "multiple_choice",
          text: "Qual é o principal benefício de manter um journal de trades?",
          options: [
            "Impressionar outros traders",
            "Identificar padrões — o que funciona, o que não funciona",
            "Calcular impostos",
            "Lembrar de todos os trades",
          ],
          correctIndex: 1,
          explanation:
            "O journal permite identificar padrões: quais setups têm melhor win rate, em quais horários você performa melhor, quais emoções levam a maus trades.",
        },
        {
          id: "4.3.2",
          type: "multiple_choice",
          text: "O que você deve registrar no journal?",
          options: [
            "Apenas os trades vencedores",
            "Apenas o P&L",
            "Entrada, saída, setup, P&L, emoção e lição aprendida",
            "Apenas os trades perdedores",
          ],
          correctIndex: 2,
          explanation:
            "Registre tudo: setup, entrada, saída, P&L, mas também a emoção no momento e a lição. Os dados emocionais são tão importantes quanto os técnicos.",
        },
        {
          id: "4.3.3",
          type: "true_false",
          text: "Verdadeiro ou Falso: Traders profissionais não precisam de journal porque já têm experiência.",
          options: ["Verdadeiro", "Falso"],
          correctIndex: 1,
          explanation:
            "FALSO. Os melhores traders do mundo mantêm journals detalhados. A experiência sem dados é apenas memória seletiva — você lembra dos wins e esquece os losses.",
        },
        {
          id: "4.3.4",
          type: "scenario",
          text: "Após 1 mês de journal, você percebe que perde dinheiro sempre entre 14h-15h ET. O que você faz?",
          correctAnswer: "Parar de operar nesse horário — os dados mostram que não é seu horário",
          explanation:
            "Esse é exatamente o poder do journal. Com dados, você pode eliminar horários ruins, setups que não funcionam para você, e focar no que realmente traz resultados.",
        },
      ],
    },
    {
      id: "4.4",
      title: "Rotina do Trader Profissional",
      content: [
        "Pré-mercado (antes das 9:30 ET): revisar notícias, identificar níveis do dia, definir bias.",
        "Janela de operação: foco total, sem distrações, checklist de regras antes de cada trade.",
        "Pós-mercado: registrar trades no journal, revisar o que funcionou e o que não funcionou.",
        "Limites diários: máximo 2 trades, máximo $X de loss — quando atingir, parar.",
      ],
      keyConcept:
        "Consistência não vem de setups perfeitos. Vem de rotina e disciplina diária.",
      svgKey: "routine",
      questions: [
        {
          id: "4.4.1",
          type: "multiple_choice",
          text: "O que fazer no pré-mercado (antes das 9:30 ET)?",
          options: [
            "Nada — esperar o mercado abrir",
            "Revisar notícias, identificar níveis do dia, definir bias",
            "Colocar ordens de mercado",
            "Verificar P&L do dia anterior",
          ],
          correctIndex: 1,
          explanation:
            "Pré-mercado é para preparação: revisar notícias econômicas, marcar suportes/resistências, definir o bias do dia. Traders que chegam sem preparação tomam decisões impulsivas.",
        },
        {
          id: "4.4.2",
          type: "multiple_choice",
          text: "Por que ter um limite máximo de trades por dia?",
          options: [
            "Para economizar comissões",
            "Para evitar overtrading e trades emocionais após losses",
            "Porque o mercado fecha",
            "Regra da prop firm",
          ],
          correctIndex: 1,
          explanation:
            "Limite de trades previne overtrading. Após 2 trades (especialmente se forem losses), o emocional está comprometido. Parar protege você de si mesmo.",
        },
        {
          id: "4.4.3",
          type: "true_false",
          text: "Verdadeiro ou Falso: Operar sem checklist de regras é aceitável se você tem experiência.",
          options: ["Verdadeiro", "Falso"],
          correctIndex: 1,
          explanation:
            "FALSO. Pilotos de avião experientes ainda usam checklist. Cirurgiões experientes ainda seguem protocolos. A experiência não elimina a necessidade de processos — ela os reforça.",
        },
        {
          id: "4.4.4",
          type: "scenario",
          text: "São 14h ET, você já fez 2 trades (1 win, 1 loss). Você vê um setup perfeito. O que faz?",
          correctAnswer: "Respeitar o limite de 2 trades e não entrar",
          explanation:
            "Regras existem para ser seguidas, especialmente quando você 'quer' quebrá-las. O setup pode ser perfeito, mas quebrar sua regra de limite abre precedente para quebrar outras regras.",
        },
      ],
    },
    {
      id: "4.5",
      title: "Mindset — A mentalidade vencedora",
      content: [
        "Trading é um jogo de probabilidades, não de certezas. Aceite perdas como custo do negócio.",
        "Foco no processo, não no resultado. Um trade ruim com bom processo é melhor que um win por sorte.",
        "Cada trade é independente — uma série de losses não significa que o próximo vai perder.",
        "O mercado não sabe que você existe. Ele não está 'contra você'.",
      ],
      keyConcept:
        "Traders profissionais não tentam ter razão. Eles tentam executar bem.",
      svgKey: "mindset",
      questions: [
        {
          id: "4.5.1",
          type: "multiple_choice",
          text: "Como encarar uma perda no trading?",
          options: [
            "Como um fracasso pessoal",
            "Como custo do negócio — parte inevitável do processo",
            "Como sinal para parar de operar",
            "Como motivação para recuperar imediatamente",
          ],
          correctIndex: 1,
          explanation:
            "Perdas são inevitáveis no trading. Mesmo os melhores traders do mundo têm win rates de 50-60%. A diferença está no R:R e na consistência, não em evitar todas as perdas.",
        },
        {
          id: "4.5.2",
          type: "true_false",
          text: "Verdadeiro ou Falso: Após 5 losses seguidos, o próximo trade tem mais chance de ser um win.",
          options: ["Verdadeiro", "Falso"],
          correctIndex: 1,
          explanation:
            "FALSO. Cada trade é independente — como jogar uma moeda. 5 caras seguidas não aumenta a probabilidade de coroa na próxima. Esse erro (gambler's fallacy) leva ao revenge trading.",
        },
        {
          id: "4.5.3",
          type: "multiple_choice",
          text: "Qual é a mentalidade correta em relação ao resultado de um trade?",
          options: [
            "Focar em ganhar em cada trade",
            "Focar no processo — executar bem independente do resultado",
            "Focar em recuperar losses rapidamente",
            "Focar em não perder",
          ],
          correctIndex: 1,
          explanation:
            "Foco no processo, não no resultado. Se você executou bem (seguiu o plano, respeitou o stop, teve bom R:R), o resultado é secundário. Com bom processo, os resultados vêm com o tempo.",
        },
        {
          id: "4.5.4",
          type: "scenario",
          text: "Você seguiu todas as suas regras, mas o trade foi stopado. Como você avalia esse trade?",
          correctAnswer: "Foi um bom trade — o processo foi correto. Resultado ruim faz parte.",
          explanation:
            "Um trade executado corretamente (setup válido, stop no lugar certo, tamanho correto) é um bom trade independente do resultado. O mercado é probabilístico — você não controla o resultado, apenas o processo.",
        },
      ],
    },
  ],
};

export const ACADEMIA_MODULES: Module[] = [module1, module2, module3, module4];

export function getModuleProgress(moduleId: number, progress: Record<string, boolean[]>) {
  const mod = ACADEMIA_MODULES.find((m) => m.id === moduleId);
  if (!mod) return { completed: 0, total: 0, prog: [] };
  const key = `mod${moduleId}`;
  const prog = progress[key] || new Array(mod.lessons.length).fill(false);
  const completed = prog.filter(Boolean).length;
  return { completed, total: mod.lessons.length, prog };
}

export function getTotalProgress(progress: Record<string, boolean[]>) {
  const total = ACADEMIA_MODULES.reduce((sum, m) => sum + m.lessons.length, 0);
  const completed = ACADEMIA_MODULES.reduce((sum, m) => {
    const { completed: c } = getModuleProgress(m.id, progress);
    return sum + c;
  }, 0);
  return { completed, total };
}
