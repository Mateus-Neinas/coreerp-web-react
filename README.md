# CoreERP Web React

Frontend React do CoreERP, uma plataforma de gestão empresarial genérica, organizada para crescer por módulos e atender negócios de diferentes segmentos.

## O que a interface demonstra

- Painel inicial com indicadores e visão operacional.
- Navegação entre visão geral, clientes, produtos, pedidos e relatórios.
- Tabela pesquisável com estados visuais.
- Layout que se adapta a telas menores, com navegação acessível por teclado.

## Executar

Requer Node.js 20 ou superior.

```bash
npm install
npm run dev
```

Vite inicia o painel em `http://localhost:5173`. A tela usa dados demonstrativos; a integração com a API principal será configurada por `VITE_API_URL` quando conectarmos os módulos.

## Estrutura

- `src/App.jsx`: navegação e telas do painel.
- `src/main.jsx`: inicialização do React.
- `src/styles.css`: tokens visuais e comportamento responsivo.

Os formulários usam rótulos associados, elementos semânticos e mensagens de status. A tabela tem cabeçalhos explícitos e pode ser percorrida em telas estreitas.
