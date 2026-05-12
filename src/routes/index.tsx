import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

const fmt = (n: number) =>
  "R$ " + n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtDate = (d: string) => new Date(d).toLocaleDateString("pt-BR");

const mockLicenses = [
  { product: "GetLicence Pro", key: "GL-PRO-9F2A-77BD-XK21", plan: "yearly", expires: "2026-11-20", status: "active" },
  { product: "GetLicence Cloud", key: "GL-CLD-1122-AB34-ZZ09", plan: "monthly", expires: "2025-12-15", status: "active" },
];
const mockPayments = [
  { created: "2025-11-12", amount: 299.0, due: "2025-11-20", status: "paid" },
  { created: "2025-10-12", amount: 49.0, due: "2025-10-20", status: "paid" },
  { created: "2025-09-12", amount: 49.0, due: "2025-09-20", status: "paid" },
];

function Index() {
  const [logged, setLogged] = useState(false);
  const [email, setEmail] = useState("cliente@exemplo.com");
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
              Emita chaves de licença, controle expiração, renove assinaturas e acompanhe pagamentos
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
                🔑
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
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-blue-600 text-white grid place-items-center font-bold">
              🔑
            </div>
            <div className="font-bold text-lg">
              Get<span className="text-blue-600">Licence</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <a className="px-3 py-2 rounded-lg border border-slate-900 text-slate-900 font-medium text-sm">
              Minhas licenças
            </a>
          </div>
          <button
            onClick={() => setLogged(false)}
            className="border border-slate-200 px-3 py-2 rounded-lg text-sm"
          >
            ⎋ Sair
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold">Minhas licenças</h2>
        <p className="text-slate-500 mb-6">Suas chaves ativas e histórico de pagamentos.</p>

        <h3 className="font-semibold mb-2">🔑 Licenças</h3>
        <div className="bg-white border border-slate-200 rounded-xl p-4 mb-8 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr>
                {["Produto", "Chave", "Plano", "Expira", "Status"].map((h) => (
                  <th key={h} className="text-left font-semibold text-slate-700 bg-slate-100 p-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockLicenses.map((l) => (
                <tr key={l.key} className="border-t border-slate-100">
                  <td className="p-3">{l.product}</td>
                  <td className="p-3">
                    <code className="text-xs">{l.key}</code>
                  </td>
                  <td className="p-3">{l.plan === "yearly" ? "Anual" : "Mensal"}</td>
                  <td className="p-3">{fmtDate(l.expires)}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-xs border border-slate-200">
                      {l.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="font-semibold mb-2">💳 Pagamentos</h3>
        <div className="bg-white border border-slate-200 rounded-xl p-4 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr>
                {["Data", "Valor", "Vencimento", "Status"].map((h) => (
                  <th key={h} className="text-left font-semibold text-slate-700 bg-slate-100 p-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockPayments.map((p, i) => (
                <tr key={i} className="border-t border-slate-100">
                  <td className="p-3">{fmtDate(p.created)}</td>
                  <td className="p-3">{fmt(p.amount)}</td>
                  <td className="p-3">{fmtDate(p.due)}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-xs border border-slate-200">
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
