import { Router } from "express";
import { z } from "zod";
import { supaAdmin } from "./supabase";

export const router = Router();

// quem sou eu (debug)
router.get("/me", async (req, res) => {
  res.json({ user: req.user ?? null });
});

/* ================= CATEGORIAS ================ */
router.get("/categorias", async (req, res) => {
  const userId = req.user!.id;
  const { data, error } = await supaAdmin
    .from("categorias")
    .select("*")
    .eq("user_id", userId)
    .order("nome", { ascending: true });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

const CategoriaIn = z.object({
  nome: z.string().min(1),
  tipo: z.enum(["RECEITA", "DESPESA"]),
});

router.post("/categorias", async (req, res) => {
  const userId = req.user!.id;
  const body = CategoriaIn.parse(req.body);

  const { data, error } = await supaAdmin
    .from("categorias")
    .insert({ ...body, user_id: userId })
    .select()
    .single();

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
});

/* ================= TRANSAÇÕES ================ */
router.get("/transacoes", async (req, res) => {
  const userId = req.user!.id;
  const mes = (req.query.mes as string | undefined); // YYYY-MM
  const categoriaId = req.query.categoriaId ? Number(req.query.categoriaId) : undefined;
  const contaId = req.query.contaId ? Number(req.query.contaId) : undefined;

  let q = supaAdmin
    .from("transacoes")
    .select("*, categorias(*), contas(*)")
    .eq("user_id", userId)
    .order("data", { ascending: false })
    .order("id", { ascending: false });

  if (mes) {
    // PostgREST: usa gte/lt com strings ISO
    const [y, m] = mes.split("-").map(Number);
    const de = new Date(Date.UTC(y, m - 1, 1)).toISOString();
    const ate = new Date(Date.UTC(y, m, 1)).toISOString();
    q = q.gte("data", de).lt("data", ate);
  }
  if (categoriaId) q = q.eq("categoria_id", categoriaId);
  if (contaId) q = q.eq("conta_id", contaId);

  const { data, error } = await q;
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

const TransacaoIn = z.object({
  valor: z.number().finite(),
  data: z.string(), // 'YYYY-MM-DD' ou ISO
  descricao: z.string().optional(),
  categoriaId: z.number().int(),
  contaId: z.number().int().optional(),
  status: z.enum(["pendente", "confirmado"]).optional(),
  tags: z.array(z.string()).optional(),
});

router.post("/transacoes", async (req, res) => {
  const userId = req.user!.id;
  const input = TransacaoIn.parse(req.body);

  const payload: any = {
    user_id: userId,
    valor: input.valor,
    data: input.data, // pode mandar 'YYYY-MM-DD'
    descricao: input.descricao ?? null,
    categoria_id: input.categoriaId,
    conta_id: input.contaId ?? null,
    status: input.status ?? "confirmado",
    tags: input.tags ?? null,
  };

  const { data, error } = await supaAdmin
    .from("transacoes")
    .insert(payload)
    .select()
    .single();

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
});

/* ============ RESUMO MENSAL (total por categoria/conta) ============ */
router.get("/resumos/mensal", async (req, res) => {
  const userId = req.user!.id;
  const mes = String(req.query.mes || ""); // YYYY-MM

  if (!/^\d{4}-\d{2}$/.test(mes)) {
    return res.status(400).json({ error: "mes inválido. use YYYY-MM" });
  }

  // Use RPC? aqui vou de SQL simples via Edge Functions? Não precisa.
  // Vamos fazer 2 queries com agregação usando filtros de data.

  const [y, m] = mes.split("-").map(Number);
  const de = new Date(Date.UTC(y, m - 1, 1)).toISOString();
  const ate = new Date(Date.UTC(y, m, 1)).toISOString();

  // por categoria
  const catQ = supaAdmin
    .from("transacoes")
    .select("categoria_id, categorias(nome, tipo), valor")
    .eq("user_id", userId)
    .gte("data", de)
    .lt("data", ate);

  const { data: linhas, error } = await catQ;
  if (error) return res.status(500).json({ error: error.message });

  const porCategoria = Object.values(
    (linhas ?? []).reduce((acc: any, row: any) => {
      const key = row.categoria_id;
      const nome = row.categorias?.nome ?? "Sem categoria";
      const tipo = row.categorias?.tipo ?? "DESPESA";
      acc[key] ??= { categoria_id: key, nome, tipo, total: 0 };
      acc[key].total += Number(row.valor);
      return acc;
    }, {})
  );

  res.json({ mes, porCategoria });
});

export default router;
