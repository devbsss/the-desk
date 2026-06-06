import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { z } from "zod";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  analysis: router({
    generate: publicProcedure
      .input(
        z.object({
          tradeData: z.object({
            total_trades: z.number(),
            wins: z.number(),
            losses: z.number(),
            breakevens: z.number(),
            win_rate: z.string(),
            pnl_total: z.number(),
            maior_win: z.number(),
            maior_loss: z.number(),
            media_por_trade: z.number(),
            streak_atual: z.string(),
            trades_por_ativo: z.record(z.string(), z.any()),
            trades_por_horario: z.record(z.string(), z.any()),
            trades_por_dia_semana: z.record(z.string(), z.any()),
            trades_por_humor: z.record(z.string(), z.any()),
            trades_por_sono: z.record(z.string(), z.any()),
            seguiu_plano: z.record(z.string(), z.any()),
            dias_operados: z.number(),
            historico_diario: z.array(z.any()),
          }),
        })
      )
      .mutation(async ({ input }) => {
        const response = await invokeLLM({
          model: "claude-sonnet-4-20250514",
          max_tokens: 2000,
          messages: [
            {
              role: "system",
              content: `Você é um analista sênior de trading de futuros americanos (MES/MNQ). 
Analisa dados de um trader em fase de paper trade tentando passar a avaliação da Lucid Trading (prop firm). 
Responda APENAS em português brasileiro. 
Seja direto, honesto e específico — não elogie sem motivo. 
Formate a resposta em JSON com as chaves: resumo, pontos_fortes, pontos_fracos, melhor_horario, melhor_ativo, padrao_comportamental, recomendacao_principal, pronto_para_eval.
Não use markdown dentro do JSON, apenas texto puro nos valores.
O campo pronto_para_eval deve ser um booleano (true/false).
Todos os outros campos devem ser strings com texto descritivo em português.`,
            },
            {
              role: "user",
              content: `Analisa esses dados de trading e me dá um relatório completo: ${JSON.stringify(input.tradeData)}`,
            },
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "trading_analysis",
              strict: true,
              schema: {
                type: "object",
                properties: {
                  resumo: { type: "string", description: "Resumo executivo da performance" },
                  pontos_fortes: { type: "string", description: "Pontos fortes identificados" },
                  pontos_fracos: { type: "string", description: "Pontos fracos identificados" },
                  melhor_horario: { type: "string", description: "Melhor horário de operação" },
                  melhor_ativo: { type: "string", description: "Melhor ativo (MES ou MNQ)" },
                  padrao_comportamental: { type: "string", description: "Padrão comportamental identificado" },
                  recomendacao_principal: { type: "string", description: "Recomendação principal de ação" },
                  pronto_para_eval: { type: "boolean", description: "Se está pronto para avaliação" },
                },
                required: ["resumo", "pontos_fortes", "pontos_fracos", "melhor_horario", "melhor_ativo", "padrao_comportamental", "recomendacao_principal", "pronto_para_eval"],
                additionalProperties: false,
              },
            },
          },
        });

        const content = response.choices[0]?.message?.content;
        if (!content || typeof content !== "string") {
          throw new Error("Empty response from LLM");
        }

        return JSON.parse(content);
      }),
  }),
});

export type AppRouter = typeof appRouter;
