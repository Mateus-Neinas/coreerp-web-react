import { useMemo, useRef, useState } from "react";
import {
  Activity, ArrowDownRight, ArrowUpRight, Bell, BriefcaseBusiness, ChartNoAxesCombined,
  Check, ChevronDown, CircleHelp, Command, FileText, LayoutDashboard, Package,
  Plus, Search, Settings, ShoppingCart, Users, Wallet, X
} from "lucide-react";

const initialOrders = [
  { id: "PED-1048", customer: "Aurora Comércio", date: "06 nov, 2026", amount: 1840.00, status: "Em andamento" },
  { id: "PED-1047", customer: "Horizonte Studio", date: "06 nov, 2026", amount: 960.50, status: "Aguardando" },
  { id: "PED-1046", customer: "Vale Norte Ltda.", date: "05 nov, 2026", amount: 3270.00, status: "Concluído" },
  { id: "PED-1045", customer: "Casa Nativa", date: "05 nov, 2026", amount: 1280.00, status: "Concluído" },
  { id: "PED-1044", customer: "Lume Design", date: "04 nov, 2026", amount: 2145.90, status: "Em andamento" },
];
const nav = [
  { label: "Visão geral", icon: LayoutDashboard },
  { label: "Pedidos", icon: ShoppingCart },
  { label: "Clientes", icon: Users },
  { label: "Produtos", icon: Package },
  { label: "Relatórios", icon: ChartNoAxesCombined },
];

function money(value) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

function Metric({ icon: Icon, label, value, change, tone = "mint", down = false }) {
  const ChangeIcon = down ? ArrowDownRight : ArrowUpRight;
  return <article className="metric-card">
    <div className="metric-top"><span className={`metric-icon ${tone}`}><Icon size={18} /></span><span className={down ? "change negative" : "change"}><ChangeIcon size={14} /> {change}</span></div>
    <p className="metric-label">{label}</p><strong className="metric-value">{value}</strong>
    <span className="metric-caption">em relação ao mês passado</span>
  </article>;
}

export default function App() {
  const [active, setActive] = useState("Visão geral");
  const [query, setQuery] = useState("");
  const [orders, setOrders] = useState(initialOrders);
  const [notice, setNotice] = useState("");
  const dialog = useRef(null);
  const visibleOrders = useMemo(() => orders.filter(order => [order.id, order.customer, order.status].join(" ").toLowerCase().includes(query.toLowerCase())), [orders, query]);

  function createOrder(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next = { id: `PED-${1050 + orders.length}`, customer: data.get("customer"), date: "06 nov, 2026", amount: Number(data.get("amount")), status: "Aguardando" };
    setOrders(current => [next, ...current]);
    dialog.current?.close();
    event.currentTarget.reset();
    setNotice("Pedido criado e incluído na lista.");
    window.setTimeout(() => setNotice(""), 3200);
  }

  return <div className="app-shell">
    <aside className="sidebar">
      <a className="brand" href="#" aria-label="CoreERP, início"><span className="brand-mark">c</span><span>core<span className="brand-light">erp</span></span></a>
      <div className="workspace-switch"><div className="workspace-avatar">N</div><div><strong>Norte & Co.</strong><small>Plano profissional</small></div><ChevronDown size={16} /></div>
      <div className="side-label">MENU PRINCIPAL</div>
      <nav className="primary-nav" aria-label="Navegação principal">
        {nav.map(item => <button key={item.label} data-testid={item.label === "Pedidos" ? "nav-orders" : undefined} className={active === item.label ? "nav-item active" : "nav-item"} onClick={() => setActive(item.label)} aria-current={active === item.label ? "page" : undefined}><item.icon size={18} /><span>{item.label}</span>{item.label === "Pedidos" && <span className="nav-count">{orders.length}</span>}</button>)}
      </nav>
      <div className="side-label side-label-spaced">PREFERÊNCIAS</div>
      <nav className="primary-nav" aria-label="Preferências">
        <button className="nav-item" onClick={() => setNotice("Configurações demonstrativas do workspace.")}><Settings size={18} /><span>Configurações</span></button>
        <button className="nav-item" onClick={() => setNotice("Central de ajuda do CoreERP.")}><CircleHelp size={18} /><span>Central de ajuda</span></button>
      </nav>
      <div className="sidebar-bottom"><div className="upgrade-card"><span className="upgrade-icon"><Activity size={17} /></span><strong>Seu negócio, em fluxo.</strong><p>Veja como aproveitar melhor seu painel.</p><button onClick={() => setNotice("Guia de configuração em breve.")}>Explorar recursos <ArrowUpRight size={14} /></button></div><div className="profile"><div className="profile-avatar">MN</div><div><strong>Mateus Neinas</strong><small>Administrador</small></div><ChevronDown size={16} /></div></div>
    </aside>

    <main className="main-panel">
      <header className="topbar">
        <div className="breadcrumbs"><span>Workspace</span><span className="crumb-sep">/</span><strong>{active}</strong></div>
        <div className="top-actions"><label className="global-search"><Search size={16} /><input aria-label="Pesquisar no sistema" placeholder="Buscar..." value={query} onChange={event => setQuery(event.target.value)} /><kbd><Command size={11} /> K</kbd></label><button className="icon-button notification-button" aria-label="Notificações" onClick={() => setNotice("Você está em dia. Nenhuma notificação nova.")}><Bell size={18} /><i /></button><div className="top-avatar">MN</div></div>
      </header>
      <div className="page-content">
        <div className="page-heading"><div><div className="eyebrow">SEXTA-FEIRA, 06 DE NOVEMBRO DE 2026</div><h1 data-testid="dashboard-title">{active === "Visão geral" ? "Visão geral" : active}</h1><p>Acompanhe o ritmo do seu negócio em um só lugar.</p></div><button className="button-primary" data-testid="add-order" onClick={() => dialog.current?.showModal()}><Plus size={17} /> Novo pedido</button></div>

        <section className="metrics-grid" aria-label="Indicadores principais">
          <Metric icon={Wallet} label="Faturamento do mês" value="R$ 48.290" change="+12,8%" />
          <Metric icon={ShoppingCart} label="Pedidos recebidos" value={String(orders.length + 123)} change="+8,2%" tone="lavender" />
          <Metric icon={Users} label="Clientes ativos" value="86" change="+4,6%" tone="peach" />
          <Metric icon={Package} label="Produtos cadastrados" value="214" change="−2,1%" tone="blue" down />
        </section>

        <section className="content-grid">
          <article className="panel revenue-panel">
            <div className="panel-heading"><div><h2>Receita ao longo do tempo</h2><p>Visão mensal do desempenho</p></div><button className="select-button" onClick={() => setNotice("Período atual: últimos 7 meses.")}>Últimos 7 meses <ChevronDown size={15} /></button></div>
            <div className="chart-summary"><strong>R$ 48.290,00</strong><span className="change"><ArrowUpRight size={14} /> 12,8%</span><small>vs. R$ 42.820 no período anterior</small></div>
            <div className="chart-wrap" role="img" aria-label="Gráfico de receita crescente entre maio e novembro">
              <div className="chart-y"><span>50k</span><span>40k</span><span>30k</span><span>20k</span><span>10k</span></div>
              <div className="chart-area"><div className="grid-lines"><i /><i /><i /><i /><i /></div><div className="bars">{[38,52,46,66,58,79,91].map((height,index)=><div className="bar-column" key={index}><span className="bar-value">{[21,29,25,37,32,42,48][index]}k</span><i style={{height:height+"%"}} /><small>{["Mai","Jun","Jul","Ago","Set","Out","Nov"][index]}</small></div>)}</div></div>
            </div>
          </article>
          <article className="panel status-panel"><div className="panel-heading"><div><h2>Pedidos por status</h2><p>Distribuição atual</p></div><button className="more-button" aria-label="Mais opções">•••</button></div><div className="donut-area"><div className="donut"><div><strong>{orders.length + 123}</strong><small>pedidos</small></div></div></div><div className="legend"><div><span className="legend-dot completed" />Concluídos <strong>64%</strong></div><div><span className="legend-dot progress" />Em andamento <strong>24%</strong></div><div><span className="legend-dot waiting" />Aguardando <strong>12%</strong></div></div></article>
        </section>

        <section className="panel orders-panel">
          <div className="panel-heading orders-heading"><div><h2>Pedidos recentes</h2><p>Veja o que está acontecendo agora</p></div><button className="button-secondary" onClick={() => setActive("Pedidos")}>Ver todos <ArrowUpRight size={15} /></button></div>
          <div className="table-scroll" role="region" aria-label="Tabela de pedidos recentes" tabIndex="0"><table data-testid="orders-table"><caption className="sr-only">Pedidos recentes do CoreERP</caption><thead><tr><th scope="col">Pedido</th><th scope="col">Cliente</th><th scope="col">Data</th><th scope="col">Valor</th><th scope="col">Status</th><th scope="col"><span className="sr-only">Ações</span></th></tr></thead><tbody>{visibleOrders.slice(0,5).map(order=><tr key={order.id}><th scope="row"><span className="order-id">{order.id}</span></th><td><span className="customer-cell"><span className="customer-avatar">{order.customer.slice(0,1)}</span>{order.customer}</span></td><td className="muted-cell">{order.date}</td><td className="amount-cell">{money(order.amount)}</td><td><span className={`status-pill ${order.status.toLowerCase().replaceAll(" ","-")}`}><i />{order.status}</span></td><td><button className="row-menu" aria-label={`Ações para ${order.id}`}>•••</button></td></tr>)}</tbody></table>{visibleOrders.length === 0 && <p className="empty-state">Nenhum pedido encontrado.</p>}</div>
          <div className="table-footer"><span>Mostrando <strong>{Math.min(visibleOrders.length,5)}</strong> de <strong>{visibleOrders.length}</strong> pedidos</span><div><button disabled aria-label="Página anterior">‹</button><button className="page-current">1</button><button aria-label="Próxima página">›</button></div></div>
        </section>
        <footer className="app-footer"><span>CoreERP <span>·</span> Seu negócio em movimento.</span><span>Ajuda <span>·</span> Privacidade <span>·</span> v0.1.0</span></footer>
      </div>
    </main>

    <dialog className="order-dialog" ref={dialog} data-testid="order-dialog" aria-labelledby="dialog-title"><form onSubmit={createOrder}><div className="dialog-top"><div><span className="dialog-icon"><BriefcaseBusiness size={18} /></span><h2 id="dialog-title">Criar pedido</h2><p>Preencha os dados básicos para registrar um novo pedido.</p></div><button type="button" className="icon-button" aria-label="Fechar" onClick={() => dialog.current?.close()}><X size={18} /></button></div><fieldset><legend>Informações do pedido</legend><label htmlFor="customer">Cliente</label><input id="customer" name="customer" autoComplete="organization" placeholder="Nome do cliente" required /><label htmlFor="amount">Valor total</label><input id="amount" name="amount" type="number" min="0.01" step="0.01" inputMode="decimal" placeholder="0,00" required /></fieldset><div className="dialog-actions"><button type="button" className="button-secondary" onClick={() => dialog.current?.close()}>Cancelar</button><button type="submit" className="button-primary" data-testid="save-order"><Check size={16} /> Salvar pedido</button></div></form></dialog>
    <div role="status" aria-live="polite" className={notice ? "toast visible" : "toast"}>{notice}</div>
  </div>;
}
