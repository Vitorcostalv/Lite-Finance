import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  CreditCard, 
  Tag, 
  Wallet, 
  RotateCcw, 
  Settings,
  Menu,
  X,
  Search,
  Plus,
  Moon,
  Sun
} from 'lucide-react'
import { useGlobalStore } from '../stores/global'
import { useAuthStore } from '../stores/auth'
import dayjs from 'dayjs'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Transações', href: '/transacoes', icon: CreditCard },
  { name: 'Categorias', href: '/categorias', icon: Tag },
  { name: 'Contas', href: '/contas', icon: Wallet },
  { name: 'Recorrências', href: '/recorrencias', icon: RotateCcw },
  { name: 'Configurações', href: '/configuracoes', icon: Settings },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { 
    selectedMonth, 
    setSelectedMonth, 
    selectedAccount, 
    setSelectedAccount,
    searchQuery,
    setSearchQuery,
    isDarkMode,
    toggleDarkMode
  } = useGlobalStore()
  const { signOut } = useAuthStore()
  const location = useLocation()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-card transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
          <h1 className="text-xl font-bold text-white">Lite Finance</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors"
          >
            <Settings className="mr-3 h-5 w-5" />
            Sair
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-card border-b border-gray-700 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <Menu className="h-6 w-6" />
              </button>
              
              <div className="flex items-center space-x-4">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="bg-card border border-gray-600 rounded-md px-3 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {Array.from({ length: 12 }, (_, i) => {
                    const month = dayjs().subtract(i, 'month')
                    return (
                      <option key={month.format('YYYY-MM')} value={month.format('YYYY-MM')}>
                        {month.format('MMMM [de] YYYY')}
                      </option>
                    )
                  })}
                </select>

                <select
                  value={selectedAccount || ''}
                  onChange={(e) => setSelectedAccount(e.target.value || null)}
                  className="bg-card border border-gray-600 rounded-md px-3 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Todas as contas</option>
                  <option value="1">Itaú</option>
                  <option value="2">Nubank</option>
                  <option value="3">Carteira</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar transações..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-card border border-gray-600 rounded-md text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary w-64"
                />
              </div>

              <button className="btn btn-primary flex items-center px-4 py-2">
                <Plus className="h-4 w-4 mr-2" />
                Nova transação
              </button>

              <button
                onClick={toggleDarkMode}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
