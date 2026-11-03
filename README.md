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
- `checkoutUrl` está `null`: o botão mostra um aviso de checkout inativo, sem simular compra.
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
