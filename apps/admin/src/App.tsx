// apps/admin/src/App.tsx

import { Routes, Route, Navigate } from 'react-router-dom'
import { authService } from './services/auth.service'
import { AdminLayout } from './components/layout/AdminLayout/AdminLayout'
import { Login }       from './pages/Login'
import { Dashboard }   from './pages/Dashboard'
import { Products }    from './pages/Products'
import { Orders }      from './pages/Orders'
import { Customers }   from './pages/Customers'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  return authService.isLoggedIn()
    ? <>{children}</>
    : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route index              element={<Dashboard />} />
        <Route path="products"   element={<Products />} />
        <Route path="orders"     element={<Orders />} />
        <Route path="customers"  element={<Customers />} />
      </Route>
    </Routes>
  )
}