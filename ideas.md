# Ideas de Design — The Desk

## Contexto
Trading journal pessoal com estética de terminal de trading profissional. Tema escuro, denso, limpo. Inspirado no TradingView dark mode.

---

<response>
## Idea 1: "Bloomberg Terminal Noir"

<text>
**Design Movement:** Neo-Brutalist Terminal — inspirado nos terminais Bloomberg e Reuters dos anos 90, mas com refinamento contemporâneo.

**Core Principles:**
1. Densidade informacional máxima sem sacrificar legibilidade
2. Hierarquia via tipografia monospace e peso de fonte, não cor
3. Grid rígido com separadores finos — cada pixel tem propósito
4. Zero decoração — a informação É o design

**Color Philosophy:** Preto absoluto (#000000) como void, superfícies em #0D0D0D como "painéis flutuantes" no escuro. Verde (#26A69A) e vermelho (#EF5350) reservados exclusivamente para dados de performance. Branco (#E8E8E8) como texto primário — nunca branco puro para evitar fadiga visual.

**Layout Paradigm:** Grid assimétrico de 12 colunas com painéis de tamanhos variados, similar a um terminal de trading real. Sidebar fixa à esquerda com navegação vertical minimalista. Conteúdo principal em grid de cards com bordas de 1px.

**Signature Elements:**
- Indicadores de status com dot pulsante (verde/vermelho/cinza)
- Números que "contam" ao carregar (countUp animation)
- Bordas de 1px em #1E1E1E criando separação sutil entre painéis

**Interaction Philosophy:** Feedback instantâneo. Hover states com background shift sutil (não glow). Clicks com scale(0.97) de 100ms. Sem delays artificiais.

**Animation:** Apenas funcional — fade-in de 200ms em cards ao montar, countUp em números de stats (800ms ease-out), dot pulsante no status. Nada mais.

**Typography System:** Space Mono 700 para títulos/labels, JetBrains Mono 400 para body/dados, JetBrains Mono 600 para números de destaque.
</text>

<probability>0.08</probability>
</response>

---

<response>
## Idea 2: "Cockpit HUD"

<text>
**Design Movement:** Sci-Fi HUD (Heads-Up Display) — inspirado em interfaces de cockpit de aviação e painéis de controle de missão espacial.

**Core Principles:**
1. Informação organizada em "instrumentos" visuais distintos
2. Hierarquia por luminosidade — elementos mais importantes são mais brilhantes
3. Linhas de grade sutis como referência visual (como um HUD real)
4. Estado do sistema sempre visível na periferia

**Color Philosophy:** Fundo #000000 como "espaço". Cards em #0D0D0D com borda superior colorida indicando categoria. Verde ciano (#26A69A) como cor de "sistema operacional". Vermelho (#EF5350) como alerta. Branco com opacidade variável para hierarquia textual.

**Layout Paradigm:** Layout centralizado com "painel de instrumentos" — cards organizados como gauges num cockpit. Header fixo com status bar (como barra de instrumentos de voo). Navegação por tabs no topo.

**Signature Elements:**
- Borda superior nos cards com cor semântica (verde = positivo, vermelho = negativo, cinza = neutro)
- Mini "gauges" circulares para win rate e progress
- Linhas de grid sutis no background (#0A0A0A) como papel milimetrado

**Interaction Philosophy:** Transições de estado claras — elementos mudam de "inativo" para "ativo" com shift de opacidade. Hover revela informação adicional sem popup.

**Animation:** Fade-in escalonado (stagger 50ms) nos cards do dashboard. Progress bars que preenchem ao montar. Números que incrementam. Pulse suave no status dot.

**Typography System:** IBM Plex Mono 700 para headers, Geist Mono 400 para dados, IBM Plex Mono 500 para labels de instrumentos.
</text>

<probability>0.06</probability>
</response>

---

<response>
## Idea 3: "Minimal Data Canvas"

<text>
**Design Movement:** Swiss Data Design — inspirado na escola tipográfica suíça aplicada a dashboards de dados. Clareza absoluta, sem ornamento.

**Core Principles:**
1. Tipografia como elemento estrutural primário
2. Espaço negativo generoso entre blocos de informação
3. Alinhamento rigoroso em baseline grid
4. Cor usada apenas para codificar significado (win/loss)

**Color Philosophy:** Preto (#000000) como canvas infinito. Texto em tons de cinza (#E8E8E8, #999999, #666666) criando 3 níveis de hierarquia. Verde e vermelho apenas em dados de performance — nunca decorativos. Sem accent color — a ausência de cor é o statement.

**Layout Paradigm:** Single column no mobile, two-column assimétrico no desktop (sidebar estreita + área principal larga). Seções separadas por espaço generoso (não por bordas). Scroll vertical longo e fluido.

**Signature Elements:**
- Números grandes (48px+) como elemento visual dominante nos stats
- Separadores horizontais ultra-finos (#1E1E1E) entre seções
- Labels em uppercase com letter-spacing expandido

**Interaction Philosophy:** Minimalista — hover muda opacidade do texto, não background. Focus states com outline sutil. Formulários limpos com labels flutuantes.

**Animation:** Quase nenhuma — apenas fade-in de 150ms ao navegar entre páginas. Números aparecem instantaneamente. A velocidade É a animação.

**Typography System:** Space Mono 700 para números grandes e títulos, JetBrains Mono 400 para body, Space Mono 400 para labels em uppercase com tracking expandido.
</text>

<probability>0.04</probability>
</response>
