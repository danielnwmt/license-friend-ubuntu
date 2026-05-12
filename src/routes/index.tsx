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
  X,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const fmt = (n: number) =>
  "R$ " + n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtDate = (d: string) => new Date(d).toLocaleDateString("pt-BR");

type Client = { name: string; email: string; licenses: number };
type Product = { name: string; description: string; monthly: number; yearly: number; active: boolean };
type License = { product: string; client: string; key: string; plan: string; expires: string; status: string };
type Payment = { created: string; client: string; amount: number; due: string; status: string };

const initialClients: Client[] = [
  { name: "João Silva", email: "joao@exemplo.com", licenses: 1 },
  { name: "Maria Souza", email: "maria@exemplo.com", licenses: 1 },
];
const initialProducts: Product[] = [
  { name: "GetLicence Pro", description: "Plano completo", monthly: 29.9, yearly: 299.0, active: true },
  { name: "GetLicence Cloud", description: "Hospedagem incluída", monthly: 49.0, yearly: 490.0, active: true },
];
const initialLicenses: License[] = [
  { product: "GetLicence Pro", client: "João Silva", key: "GL-PRO-9F2A-77BD-XK21", plan: "yearly", expires: "2026-11-20", status: "active" },
  { product: "GetLicence Cloud", client: "Maria Souza", key: "GL-CLD-1122-AB34-ZZ09", plan: "monthly", expires: "2025-12-15", status: "active" },
];
const initialPayments: Payment[] = [
  { created: "2025-11-12", client: "João Silva", amount: 299.0, due: "2025-11-20", status: "paid" },
  { created: "2025-10-12", client: "Maria Souza", amount: 49.0, due: "2025-10-20", status: "paid" },
  { created: "2025-09-12", client: "Maria Souza", amount: 49.0, due: "2025-09-20", status: "pending" },
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

const randKey = (prefix: string) =>
  `GL-${prefix}-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

function Index() {
  const [logged, setLogged] = useState(false);
  const [page, setPage] = useState<PageKey>("dashboard");
  const [email, setEmail] = useState("admin@exemplo.com");
  const [password, setPassword] = useState("demo1234");

  const [clients, setClients] = useState<Client[]>(initialClients);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [licenses, setLicenses] = useState<License[]>(initialLicenses);
  const [payments, setPayments] = useState<Payment[]>(initialPayments);

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
            onSubmit={(e) => { e.preventDefault(); setLogged(true); }}
            className="bg-white border border-slate-200 rounded-xl p-8 w-full"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-600 text-white grid place-items-center font-bold">
                <KeyRound className="w-5 h-5" />
              </div>
              <div className="text-xl font-bold">Get<span className="text-blue-600">Licence</span></div>
            </div>
            <label className="text-sm">E-mail</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 w-full mb-4 mt-1" />
            <label className="text-sm">Senha</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 w-full mb-4 mt-1" />
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg w-full">Entrar</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="h-16 flex items-center gap-2 px-5 border-b border-slate-200">
          <div className="w-9 h-9 rounded-lg bg-blue-600 text-white grid place-items-center">
            <KeyRound className="w-5 h-5" />
          </div>
          <div className="font-bold text-lg">Get<span className="text-blue-600">Licence</span></div>
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
                  active ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"
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
          <button onClick={() => setLogged(false)} className="mt-2 w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100">
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        {page === "dashboard" && <DashboardPage clients={clients} licenses={licenses} products={products} payments={payments} />}
        {page === "clients" && <ClientsPage clients={clients} setClients={setClients} />}
        {page === "licenses" && <LicensesPage licenses={licenses} setLicenses={setLicenses} clients={clients} products={products} />}
        {page === "products" && <ProductsPage products={products} setProducts={setProducts} />}
        {page === "payments" && <PaymentsPage payments={payments} setPayments={setPayments} clients={clients} />}
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

function DashboardPage({ clients, licenses, products, payments }: { clients: Client[]; licenses: License[]; products: Product[]; payments: Payment[] }) {
  const revenue = payments.filter((p) => p.status === "paid").reduce((s, p) => s + p.amount, 0);
  return (
    <>
      <PageHeader title="Painel administrativo" subtitle="Gerencie produtos, licenças, pagamentos e clientes." />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Clientes" value={String(clients.length)} icon={Users} />
        <StatCard label="Licenças ativas" value={String(licenses.filter((l) => l.status === "active").length)} icon={KeyRound} />
        <StatCard label="Produtos" value={String(products.length)} icon={Package} />
        <StatCard label="Receita paga" value={fmt(revenue)} icon={CreditCard} />
      </div>
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="font-bold text-lg mb-1">Bem-vindo</h2>
        <p className="text-slate-500">Use o menu lateral para gerenciar clientes, licenças, produtos, financeiro e integrações.</p>
      </div>
    </>
  );
}

function PrimaryButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
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
          {rows.length === 0 ? (
            <tr><td colSpan={headers.length} className="p-6 text-center text-slate-400">Nenhum registro.</td></tr>
          ) : rows.map((r, i) => (
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

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-3">
      <label className="text-sm block mb-1">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "border border-slate-200 rounded-lg px-3 py-2 w-full";

function ClientsPage({ clients, setClients }: { clients: Client[]; setClients: (c: Client[]) => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setClients([...clients, { name, email, licenses: 0 }]);
    setName(""); setEmail(""); setOpen(false);
  };

  return (
    <>
      <PageHeader title="Clientes" subtitle="Cadastre e gerencie seus clientes." action={<PrimaryButton onClick={() => setOpen(true)}>Novo cliente</PrimaryButton>} />
      <DataTable headers={["Nome", "E-mail", "Licenças"]} rows={clients.map((c) => [c.name, c.email, c.licenses])} />
      {open && (
        <Modal title="Novo cliente" onClose={() => setOpen(false)}>
          <form onSubmit={submit}>
            <Field label="Nome"><input className={inputCls} required value={name} onChange={(e) => setName(e.target.value)} /></Field>
            <Field label="E-mail"><input type="email" className={inputCls} required value={email} onChange={(e) => setEmail(e.target.value)} /></Field>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg w-full mt-2">Salvar</button>
          </form>
        </Modal>
      )}
    </>
  );
}

function LicensesPage({ licenses, setLicenses, clients, products }: { licenses: License[]; setLicenses: (l: License[]) => void; clients: Client[]; products: Product[] }) {
  const [open, setOpen] = useState(false);
  const [client, setClient] = useState("");
  const [product, setProduct] = useState("");
  const [plan, setPlan] = useState("yearly");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + (plan === "yearly" ? 1 : 0));
    if (plan === "monthly") expires.setMonth(expires.getMonth() + 1);
    setLicenses([...licenses, {
      client: client || clients[0]?.name || "—",
      product: product || products[0]?.name || "—",
      key: randKey("PRO"), plan, expires: expires.toISOString().slice(0, 10), status: "active",
    }]);
    setOpen(false);
  };

  return (
    <>
      <PageHeader title="Licenças" subtitle="Emita e acompanhe chaves de licença." action={<PrimaryButton onClick={() => setOpen(true)}>Emitir licença</PrimaryButton>} />
      <DataTable
        headers={["Cliente", "Produto", "Chave", "Plano", "Expira", "Status"]}
        rows={licenses.map((l) => [
          l.client, l.product, <code className="text-xs">{l.key}</code>,
          l.plan === "yearly" ? "Anual" : "Mensal", fmtDate(l.expires), <Badge>{l.status}</Badge>,
        ])}
      />
      {open && (
        <Modal title="Emitir licença" onClose={() => setOpen(false)}>
          <form onSubmit={submit}>
            <Field label="Cliente">
              <select className={inputCls} value={client} onChange={(e) => setClient(e.target.value)}>
                {clients.map((c) => <option key={c.email}>{c.name}</option>)}
              </select>
            </Field>
            <Field label="Produto">
              <select className={inputCls} value={product} onChange={(e) => setProduct(e.target.value)}>
                {products.map((p) => <option key={p.name}>{p.name}</option>)}
              </select>
            </Field>
            <Field label="Plano">
              <select className={inputCls} value={plan} onChange={(e) => setPlan(e.target.value)}>
                <option value="monthly">Mensal</option>
                <option value="yearly">Anual</option>
              </select>
            </Field>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg w-full mt-2">Emitir</button>
          </form>
        </Modal>
      )}
    </>
  );
}

function ProductsPage({ products, setProducts }: { products: Product[]; setProducts: (p: Product[]) => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [monthly, setMonthly] = useState("0");
  const [yearly, setYearly] = useState("0");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setProducts([...products, { name, description, monthly: parseFloat(monthly) || 0, yearly: parseFloat(yearly) || 0, active: true }]);
    setName(""); setDescription(""); setMonthly("0"); setYearly("0"); setOpen(false);
  };

  return (
    <>
      <PageHeader title="Produtos" subtitle="Configure produtos e preços." action={<PrimaryButton onClick={() => setOpen(true)}>Novo produto</PrimaryButton>} />
      <DataTable
        headers={["Produto", "Mensal", "Anual", "Status"]}
        rows={products.map((p) => [
          <div><div className="font-semibold">{p.name}</div><div className="text-xs text-slate-500">{p.description}</div></div>,
          fmt(p.monthly), fmt(p.yearly), <Badge>{p.active ? "Ativo" : "Inativo"}</Badge>,
        ])}
      />
      {open && (
        <Modal title="Novo produto" onClose={() => setOpen(false)}>
          <form onSubmit={submit}>
            <Field label="Nome"><input className={inputCls} required value={name} onChange={(e) => setName(e.target.value)} /></Field>
            <Field label="Descrição"><input className={inputCls} value={description} onChange={(e) => setDescription(e.target.value)} /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Preço mensal"><input type="number" step="0.01" className={inputCls} value={monthly} onChange={(e) => setMonthly(e.target.value)} /></Field>
              <Field label="Preço anual"><input type="number" step="0.01" className={inputCls} value={yearly} onChange={(e) => setYearly(e.target.value)} /></Field>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg w-full mt-2">Salvar</button>
          </form>
        </Modal>
      )}
    </>
  );
}

function PaymentsPage({ payments, setPayments, clients }: { payments: Payment[]; setPayments: (p: Payment[]) => void; clients: Client[] }) {
  const [open, setOpen] = useState(false);
  const [client, setClient] = useState("");
  const [amount, setAmount] = useState("0");
  const [due, setDue] = useState(new Date().toISOString().slice(0, 10));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setPayments([...payments, {
      created: new Date().toISOString().slice(0, 10),
      client: client || clients[0]?.name || "—",
      amount: parseFloat(amount) || 0, due, status: "pending",
    }]);
    setOpen(false);
  };

  return (
    <>
      <PageHeader title="Financeiro" subtitle="Boletos e pagamentos." action={<PrimaryButton onClick={() => setOpen(true)}>Novo boleto</PrimaryButton>} />
      <DataTable
        headers={["Data", "Cliente", "Valor", "Vencimento", "Status"]}
        rows={payments.map((p) => [fmtDate(p.created), p.client, fmt(p.amount), fmtDate(p.due), <Badge>{p.status}</Badge>])}
      />
      {open && (
        <Modal title="Novo boleto" onClose={() => setOpen(false)}>
          <form onSubmit={submit}>
            <Field label="Cliente">
              <select className={inputCls} value={client} onChange={(e) => setClient(e.target.value)}>
                {clients.map((c) => <option key={c.email}>{c.name}</option>)}
              </select>
            </Field>
            <Field label="Valor"><input type="number" step="0.01" className={inputCls} required value={amount} onChange={(e) => setAmount(e.target.value)} /></Field>
            <Field label="Vencimento"><input type="date" className={inputCls} required value={due} onChange={(e) => setDue(e.target.value)} /></Field>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg w-full mt-2">Gerar</button>
          </form>
        </Modal>
      )}
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
              <select className={inputCls + " mt-1"}>
                <option>Manual (sem integração)</option>
                <option>Asaas</option><option>Sicredi</option><option>Sicoob</option>
              </select>
            </div>
            <div>
              <label className="text-sm">Ambiente</label>
              <select className={inputCls + " mt-1"}>
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
          <input type="password" className={inputCls} placeholder="••••••••" />
        </div>
      </div>
    </>
  );
}
