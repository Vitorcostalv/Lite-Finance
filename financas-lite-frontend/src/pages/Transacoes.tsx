import { useState } from 'react'
import { useGlobalStore } from '../stores/global'
import { Plus, Edit, Trash2, Filter, Search } from 'lucide-react'

interface Transacao {
  id: number
  data: string
  descricao: string
  valor: number
  status: 'confirmado' | 'pendente' | 'cancelado'
  categoria: {
    nome: string
    tipo: 'RECEITA' | 'DESPESA'
    cor: string
  }
  conta: {
    nome: string
  }
  tags: string[]
}

export default function Transacoes() {
  const { selectedMonth, searchQuery } = useGlobalStore()
  const [showFilters, setShowFilters] = useState(false)
  const [selectedTransacoes, setSelectedTransacoes] = useState<number[]>([])
  const [showNovaTransacao, setShowNovaTransacao] = useState(false)

  // Dados mockados
  const transacoes: Transacao[] = [
    {
      id: 1,
      data: '2024-01-15',
      descricao: 'Salário',
      valor: 3200.00,
      status: 'confirmado',
      categoria: { nome: 'Salário', tipo: 'RECEITA', cor: '#10B981' },
      conta: { nome: 'Itaú' },
      tags: ['trabalho']
    },
    {
      id: 2,
      data: '2024-01-14',
      descricao: 'Supermercado',
      valor: -180.50,
      status: 'confirmado',
      categoria: { nome: 'Mercado', tipo: 'DESPESA', cor: '#EF4444' },
      conta: { nome: 'Nubank' },
      tags: ['alimentação']
    },
    {
      id: 3,
      data: '2024-01-13',
      descricao: 'Uber',
      valor: -25.80,
      status: 'confirmado',
      categoria: { nome: 'Transporte', tipo: 'DESPESA', cor: '#F59E0B' },
      conta: { nome: 'Nubank' },
      tags: ['transporte']
    },
    {
      id: 4,
      data: '2024-01-12',
      descricao: 'Netflix',
      valor: -45.90,
      status: 'pendente',
      categoria: { nome: 'Entretenimento', tipo: 'DESPESA', cor: '#8B5CF6' },
      conta: { nome: 'Itaú' },
      tags: ['streaming']
    }
  ]

  const filteredTransacoes = transacoes.filter(transacao => {
    const matchesSearch = transacao.descricao.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const toggleSelectTransacao = (id: number) => {
    setSelectedTransacoes(prev => 
      prev.includes(id) 
        ? prev.filter(t => t !== id)
        : [...prev, id]
    )
  }

  const formatCurrency = (valor: number) => {
    return valor.toLocaleString('pt-BR', { 
      style: 'currency', 
      currency: 'BRL',
      minimumFractionDigits: 2 
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmado': return 'bg-green-500'
      case 'pendente': return 'bg-yellow-500'
      case 'cancelado': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Transações</h1>
          <p className="text-muted">Gerencie suas transações financeiras</p>
        </div>
        <button 
          onClick={() => setShowNovaTransacao(true)}
          className="btn btn-primary flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nova transação
        </button>
      </div>

      {/* Filtros */}
      <div className="card p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Filtros</h3>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn btn-secondary flex items-center"
          >
            <Filter className="h-4 w-4 mr-2" />
            {showFilters ? 'Ocultar' : 'Mostrar'} filtros
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select className="bg-card border border-gray-600 rounded-md px-3 py-2 text-white">
              <option>Todas as categorias</option>
              <option>Mercado</option>
              <option>Transporte</option>
              <option>Entretenimento</option>
            </select>
            
            <select className="bg-card border border-gray-600 rounded-md px-3 py-2 text-white">
              <option>Todas as contas</option>
              <option>Itaú</option>
              <option>Nubank</option>
            </select>
            
            <select className="bg-card border border-gray-600 rounded-md px-3 py-2 text-white">
              <option>Todos os status</option>
              <option>Confirmado</option>
              <option>Pendente</option>
              <option>Cancelado</option>
            </select>
            
            <input
              type="text"
              placeholder="Valor mínimo"
              className="bg-card border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-400"
            />
          </div>
        )}
      </div>

      {/* Ações em lote */}
      {selectedTransacoes.length > 0 && (
        <div className="card p-4 bg-primary/10 border-primary/20">
          <div className="flex items-center justify-between">
            <span className="text-white">
              {selectedTransacoes.length} transação(ões) selecionada(s)
            </span>
            <div className="flex space-x-2">
              <button className="btn btn-secondary text-sm">
                Alterar categoria
              </button>
              <button className="btn btn-secondary text-sm">
                Alterar status
              </button>
              <button className="btn bg-red-600 hover:bg-red-700 text-white text-sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabela de transações */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    className="rounded border-gray-600"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedTransacoes(transacoes.map(t => t.id))
                      } else {
                        setSelectedTransacoes([])
                      }
                    }}
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white">Data</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white">Descrição</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white">Categoria</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white">Conta</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-white">Valor</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-white">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white">Tags</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-white">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredTransacoes.map((transacao) => (
                <tr key={transacao.id} className="hover:bg-gray-800/50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedTransacoes.includes(transacao.id)}
                      onChange={() => toggleSelectTransacao(transacao.id)}
                      className="rounded border-gray-600"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm text-white">
                    {new Date(transacao.data).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-4 py-3 text-sm text-white">
                    {transacao.descricao}
                  </td>
                  <td className="px-4 py-3">
                    <span 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: transacao.categoria.cor }}
                    >
                      {transacao.categoria.nome}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-white">
                    {transacao.conta.nome}
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-medium">
                    <span className={transacao.valor >= 0 ? 'text-receita' : 'text-despesa'}>
                      {formatCurrency(transacao.valor)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getStatusColor(transacao.status)}`}>
                      {transacao.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {transacao.tags.map((tag, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-700 text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="text-gray-400 hover:text-white">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-red-400">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty state */}
      {filteredTransacoes.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted mb-4">
            {searchQuery ? 'Nenhuma transação encontrada para sua busca.' : 'Nenhuma transação encontrada.'}
          </div>
          {!searchQuery && (
            <button 
              onClick={() => setShowNovaTransacao(true)}
              className="btn btn-primary"
            >
              <Plus className="h-4 w-4 mr-2" />
              Criar primeira transação
            </button>
          )}
        </div>
      )}
    </div>
  )
}
