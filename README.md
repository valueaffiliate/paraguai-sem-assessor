# Paraguai Sem Assessor — Landing page

Next.js (App Router) + TypeScript + Tailwind CSS 4 + Lucide + Motion. Pronto para Vercel.

## Rodar
```bash
npm install
npm run dev      # http://localhost:3000
npm run lint && npx tsc --noEmit && npm run build
```

## Onde editar
Tudo em `src/config/site.ts`: preço, oferta, `checkoutUrl`, dados da empresa, módulos (com status
`disponivel` / `em-breve` / `nao-definido`), FAQ, fotos (com autor/licença e flag `verified`) e fontes oficiais
(`checkedAt`). Defina `NEXT_PUBLIC_SITE_URL` na Vercel para canonical/sitemap.

## Pendências editoriais
- Checkout próprio em `/checkout`; falta ligar o gateway real (ver "Pagamentos e área do aluno").
- Fotos de Ciudad del Este e Pedro Juan Caballero sem licença conferida: aparecem com fundo neutro.
- Fontes oficiais com data de conferência pendente.
- Termos, privacidade, reembolso e contato: páginas marcadas como "em elaboração".
- Status de publicação dos 15 módulos não definido (nenhum selo é exibido).
- shadcn/ui não foi instalado (a CLI precisa de rede indisponível no ambiente); os componentes são próprios e
  seguem o mesmo padrão, podendo ser trocados por shadcn depois.

## X Ads (Twitter) — pixel
O pixel só carrega quando o ID está definido. Na Vercel, em Settings > Environment Variables:
- `NEXT_PUBLIC_X_PIXEL_ID` — ID do pixel (X Ads > Ferramentas > Gerenciador de eventos)
- `NEXT_PUBLIC_X_EVENT_OFFER` — ID do evento "clique em Quero o guia" (ex.: `tw-abc12-xyz34`)
- `NEXT_PUBLIC_X_EVENT_CHECKOUT` — ID do evento "clique no checkout"
Também é possível preencher direto em `tracking` no `src/config/site.ts`.
A compra confirmada deve ser registrada na página de obrigado do provedor de checkout (ou via integração dele com o X).
Antes de ativar, mencione o uso de pixels de publicidade na Política de privacidade (LGPD).

## Pagamentos e área do aluno

Fluxo: landing → `/checkout` (nome, e-mail, CPF, Pix ou cartão) → `/pedido/[id]` (QR code Pix, atualiza sozinha)
→ gateway chama `POST /api/webhooks/pagamento` → pedido marcado como pago, acesso liberado e usuário criado no
Supabase → aluno entra em `/entrar` com o e-mail (link mágico, sem senha) → `/aluno`.

### Configurar
1. Crie o projeto no Supabase e rode `supabase/migrations/0001_pagamentos.sql` no SQL Editor.
2. Em Authentication > URL Configuration, coloque a URL do site e adicione `https://SEU-DOMINIO/auth/callback`
   em Redirect URLs.
3. Configure um SMTP próprio em Authentication > Emails (o envio padrão do Supabase tem limite baixo).
4. Copie `.env.example` para as variáveis da Vercel.
5. Gateway: preencha `src/lib/payments/gateways/custom.ts` (pontos marcados com "AJUSTE") conforme a API do
   seu gateway e defina `PAYMENT_PROVIDER=custom`.
6. No painel do gateway, cadastre o webhook `https://SEU-DOMINIO/api/webhooks/pagamento`.

### Garantias do código
- O preço vem do servidor (`offer.launchPrice`); o navegador não consegue alterar o valor.
- Webhook com assinatura verificada, idempotente (evento repetido é ignorado) e com conferência do valor pago.
- Reembolso (`refunded`) revoga o acesso.
- O gateway de teste (`mock`) é bloqueado em produção na Vercel; sem Supabase em produção, o checkout não roda.
- Sem Supabase em desenvolvimento, os pedidos ficam em memória (somem ao reiniciar).
