import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  KeyRound,
  Package,
  CreditCard,
  Settings,
  User,
  LogOut,
  Plus,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const fmt = (n: number) =>
  "R$ " + n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtDate = (d: string) => new Date(d).toLocaleDateString("pt-BR");

const mockLicenses = [
  { product: "GetLicence Pro", client: "João Silva", key: "GL-PRO-9F2A-77BD-XK21", plan: "yearly", expires: "2026-11-20", status: "active" },
  { product: "GetLicence Cloud", client: "Maria Souza", key: "GL-CLD-1122-AB34-ZZ09", plan: "monthly", expires: "2025-12-15", status: "active" },
];
const mockPayments = [
  { created: "2025-11-12", client: "João Silva", amount: 299.0, due: "2025-11-20", status: "paid" },
  { created: "2025-10-12", client: "Maria Souza", amount: 49.0, due: "2025-10-20", status: "paid" },
  { created: "2025-09-12", client: "Maria Souza", amount: 49.0, due: "2025-09-20", status: "pending" },
];
const mockClients = [
  { name: "João Silva", email: "joao@exemplo.com", licenses: 1 },
  { name: "Maria Souza", email: "maria@exemplo.com", licenses: 1 },
];
const mockProducts = [
  { name: "GetLicence Pro", description: "Plano completo", monthly: 29.9, yearly: 299.0, active: true },
  { name: "GetLicence Cloud", description: "Hospedagem incluída", monthly: 49.0, yearly: 490.0, active: true },
];

type PageKey = "dashboard" | "clients" | "licenses" | "products" | "payments" | "settings";

const menu: { key: PageKey; label: string; icon: typeof LayoutDashboard }[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "clients", label: "Clientes", icon: Users },
  { key: "licenses", label: "Licenças", icon: KeyRound },
  { key: "products", label: "Produtos", icon: Package },
  { key: "payments", label: "Financeiro", icon: CreditCard },
  { key: "settings", label: "Configurações", icon: Settings },
];

function Index() {
  const [logged, setLogged] = useState(false);
  const [page, setPage] = useState<PageKey>("dashboard");
  const [email, setEmail] = useState("admin@exemplo.com");
  const [password, setPassword] = useState("demo1234");

  if (!logged) {
    return (
      <div className="min-h-screen flex" style={{ background: "linear-gradient(135deg,#6366f1,#a855f7)" }}>
        <div className="flex-1 hidden md:flex items-center p-16 text-white">
          <div className="max-w-lg">
            <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm mb-6">
              ✦ Sistema completo de licenciamento
            </span>
            <h1 className="text-5xl font-bold leading-tight">
              Gerencie licenças e pagamentos com <span className="opacity-90">GetLicence</span>.
            </h1>
            <p className="mt-6 text-lg opacity-90">
              Emita chaves, controle expiração, renove assinaturas e acompanhe pagamentos
              em um painel limpo e poderoso.
            </p>
          </div>
        </div>
        <div className="w-full md:w-[420px] flex items-center justify-center p-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setLogged(true);
            }}
            className="bg-white border border-slate-200 rounded-xl p-8 w-full"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-600 text-white grid place-items-center font-bold">
                <KeyRound className="w-5 h-5" />
              </div>
              <div className="text-xl font-bold">
                Get<span className="text-blue-600">Licence</span>
              </div>
            </div>
            <label className="text-sm">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2 w-full mb-4 mt-1"
            />
            <label className="text-sm">Senha</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2 w-full mb-4 mt-1"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg w-full">
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="h-16 flex items-center gap-2 px-5 border-b border-slate-200">
          <div className="w-9 h-9 rounded-lg bg-blue-600 text-white grid place-items-center">
            <KeyRound className="w-5 h-5" />
          </div>
          <div className="font-bold text-lg">
            Get<span className="text-blue-600">Licence</span>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {menu.map((m) => {
            const Icon = m.icon;
            const active = page === m.key;
            return (
              <button
                key={m.key}
                onClick={() => setPage(m.key)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                {m.label}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-200">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-9 h-9 rounded-full bg-slate-200 grid place-items-center">
              <User className="w-4 h-4 text-slate-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate">Administrador</div>
              <div className="text-xs text-slate-500 truncate">{email}</div>
            </div>
          </div>
          <button
            onClick={() => setLogged(false)}
            className="mt-2 w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100"
          >
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-auto">
        {page === "dashboard" && <DashboardPage />}
        {page === "clients" && <ClientsPage />}
        {page === "licenses" && <LicensesPage />}
        {page === "products" && <ProductsPage />}
        {page === "payments" && <PaymentsPage />}
        {page === "settings" && <SettingsPage />}
      </main>
    </div>
  );
}

function PageHeader({ title, subtitle, action }: { title: string; subtitle: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-slate-500">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

function StatCard({ label, value, icon: Icon }: { label: string; value: string; icon: typeof Users }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-start justify-between">
      <div>
        <div className="text-xs text-slate-500 uppercase tracking-wide">{label}</div>
        <div className="text-3xl font-bold mt-1">{value}</div>
      </div>
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 text-white grid place-items-center">
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
}

function DashboardPage() {
  return (
    <>
      <PageHeader title="Painel administrativo" subtitle="Gerencie produtos, licenças, pagamentos e clientes." />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Clientes" value="2" icon={Users} />
        <StatCard label="Licenças ativas" value="2" icon={KeyRound} />
        <StatCard label="Produtos" value="2" icon={Package} />
        <StatCard label="Receita paga" value={fmt(348)} icon={CreditCard} />
      </div>
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="font-bold text-lg mb-1">Bem-vindo</h2>
        <p className="text-slate-500">Use o menu lateral para gerenciar clientes, licenças, produtos, financeiro e integrações.</p>
      </div>
    </>
  );
}

function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
      <Plus className="w-4 h-4" /> {children}
    </button>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h} className="text-left font-semibold text-slate-700 bg-slate-100 p-3">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-slate-100">
              {r.map((c, j) => <td key={j} className="p-3">{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="px-2 py-0.5 rounded-full text-xs border border-slate-200">{children}</span>
);

function ClientsPage() {
  return (
    <>
      <PageHeader title="Clientes" subtitle="Cadastre e gerencie seus clientes." action={<PrimaryButton>Novo cliente</PrimaryButton>} />
      <DataTable
        headers={["Nome", "E-mail", "Licenças"]}
        rows={mockClients.map((c) => [c.name, c.email, c.licenses])}
      />
    </>
  );
}

function LicensesPage() {
  return (
    <>
      <PageHeader title="Licenças" subtitle="Emita e acompanhe chaves de licença." action={<PrimaryButton>Emitir licença</PrimaryButton>} />
      <DataTable
        headers={["Cliente", "Produto", "Chave", "Plano", "Expira", "Status"]}
        rows={mockLicenses.map((l) => [
          l.client, l.product, <code className="text-xs">{l.key}</code>,
          l.plan === "yearly" ? "Anual" : "Mensal", fmtDate(l.expires), <Badge>{l.status}</Badge>,
        ])}
      />
    </>
  );
}

function ProductsPage() {
  return (
    <>
      <PageHeader title="Produtos" subtitle="Configure produtos e preços." action={<PrimaryButton>Novo produto</PrimaryButton>} />
      <DataTable
        headers={["Produto", "Mensal", "Anual", "Status"]}
        rows={mockProducts.map((p) => [
          <div><div className="font-semibold">{p.name}</div><div className="text-xs text-slate-500">{p.description}</div></div>,
          fmt(p.monthly), fmt(p.yearly), <Badge>{p.active ? "Ativo" : "Inativo"}</Badge>,
        ])}
      />
    </>
  );
}

function PaymentsPage() {
  return (
    <>
      <PageHeader title="Financeiro" subtitle="Boletos e pagamentos." action={<PrimaryButton>Novo boleto</PrimaryButton>} />
      <DataTable
        headers={["Data", "Cliente", "Valor", "Vencimento", "Status"]}
        rows={mockPayments.map((p) => [
          fmtDate(p.created), p.client, fmt(p.amount), fmtDate(p.due), <Badge>{p.status}</Badge>,
        ])}
      />
    </>
  );
}

function SettingsPage() {
  return (
    <>
      <PageHeader title="Configurações" subtitle="Usuários e integrações de pagamento." />
      <div className="grid gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="font-bold mb-1">🏦 Provedor de pagamento</h3>
          <p className="text-slate-500 text-sm mb-4">Escolha qual gateway será usado para emitir cobranças.</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm">Provedor</label>
              <select className="border border-slate-200 rounded-lg px-3 py-2 w-full mt-1">
                <option>Manual (sem integração)</option>
                <option>Asaas</option><option>Sicredi</option><option>Sicoob</option>
              </select>
            </div>
            <div>
              <label className="text-sm">Ambiente</label>
              <select className="border border-slate-200 rounded-lg px-3 py-2 w-full mt-1">
                <option>Sandbox (testes)</option><option>Produção</option>
              </select>
            </div>
          </div>
          <div className="text-right mt-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg text-sm">Salvar</button>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="font-bold mb-1">Credenciais</h3>
          <p className="text-slate-500 text-sm mb-4">API Key do provedor selecionado.</p>
          <input type="password" className="border border-slate-200 rounded-lg px-3 py-2 w-full" placeholder="••••••••" />
        </div>
      </div>
    </>
  );
}
