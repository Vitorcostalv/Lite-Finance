import { useGlobalStore } from '../stores/global'
import { TrendingUp, TrendingDown, DollarSign, Target } from 'lucide-react'

export default function Dashboard() {
  const { selectedMonth } = useGlobalStore()

  // Dados mockados para demonstração
  const kpis = {
    saldoTotal: 15420.50,
    receita: 3200.00,
    despesa: 1850.30,
    resultado: 1349.70
  }

  const categorias = [
    { nome: 'Mercado', valor: 450.20, cor: '#EF4444' },
    { nome: 'Transporte', valor: 320.50, cor: '#F59E0B' },
    { nome: 'Lazer', valor: 180.00, cor: '#8B5CF6' },
    { nome: 'Saúde', valor: 120.80, cor: '#10B981' },
    { nome: 'Outros', valor: 779.80, cor: '#6B7280' },
  ]

  const metas = [
    { categoria: 'Mercado', gasto: 450.20, meta: 600.00, cor: '#EF4444' },
    { categoria: 'Transporte', gasto: 320.50, meta: 400.00, cor: '#F59E0B' },
    { categoria: 'Lazer', gasto: 180.00, meta: 200.00, cor: '#8B5CF6' },
  ]

  const proximasRecorrencias = [
    { descricao: 'Internet', valor: 99.90, data: '10/09' },
    { descricao: 'Netflix', valor: 45.90, data: '15/09' },
    { descricao: 'Academia', valor: 89.90, data: '20/09' },
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-muted">Visão geral das suas finanças em {selectedMonth}</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Saldo Total</p>
              <p className="text-2xl font-bold text-white">
                R$ {kpis.saldoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-primary" />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Receita</p>
              <p className="text-2xl font-bold text-receita">
                R$ {kpis.receita.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-receita" />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Despesa</p>
              <p className="text-2xl font-bold text-despesa">
                R$ {kpis.despesa.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <TrendingDown className="h-8 w-8 text-despesa" />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Resultado</p>
              <p className={`text-2xl font-bold ${kpis.resultado >= 0 ? 'text-receita' : 'text-despesa'}`}>
                R$ {kpis.resultado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <Target className="h-8 w-8 text-primary" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico Pizza - Gastos por Categoria */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Gastos por Categoria</h3>
          <div className="space-y-3">
            {categorias.map((categoria, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: categoria.cor }}
                  />
                  <span className="text-white">{categoria.nome}</span>
                </div>
                <span className="text-white font-medium">
                  R$ {categoria.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Metas do Mês */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Metas do Mês</h3>
          <div className="space-y-4">
            {metas.map((meta, index) => {
              const percentual = (meta.gasto / meta.meta) * 100
              return (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white">{meta.categoria}</span>
                    <span className="text-muted">
                      R$ {meta.gasto.toFixed(2)} / R$ {meta.meta.toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${Math.min(percentual, 100)}%`,
                        backgroundColor: meta.cor
                      }}
                    />
                  </div>
                  <div className="text-xs text-muted mt-1">
                    {percentual.toFixed(1)}% da meta
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Próximas Recorrências */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Próximas Recorrências</h3>
        <div className="space-y-3">
          {proximasRecorrencias.map((recorrencia, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div>
                <p className="text-white font-medium">{recorrencia.descricao}</p>
                <p className="text-sm text-muted">Próxima: {recorrencia.data}</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-white font-medium">
                  R$ {recorrencia.valor.toFixed(2)}
                </span>
                <button className="btn btn-primary text-xs px-3 py-1">
                  Lançar agora
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
