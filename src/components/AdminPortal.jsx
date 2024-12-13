import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { UserPlus, Activity, LayoutDashboard, Users, TrendingUp, Target, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog.jsx";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedReferidor, setSelectedReferidor] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const referidoresData = [
    {
      id: 1,
      nombre: 'Ana Martinez',
      email: 'ana.martinez@email.com',
      telefono: '+34 612 345 678',
      departamento: 'Ingeniería',
      fechaRegistro: '2024-01-15',
      totalReferidos: 12,
      referidosActivos: 5,
      ultimaActividad: '2024-03-10'
    },
    {
      id: 2,
      nombre: 'Carlos López',
      email: 'carlos.lopez@email.com',
      telefono: '+34 623 456 789',
      departamento: 'Marketing',
      fechaRegistro: '2024-02-01',
      totalReferidos: 10,
      referidosActivos: 4,
      ultimaActividad: '2024-03-12'
    },
    {
      id: 3,
      nombre: 'María García',
      email: 'maria.garcia@email.com',
      telefono: '+34 634 567 890',
      departamento: 'Ventas',
      fechaRegistro: '2024-01-20',
      totalReferidos: 8,
      referidosActivos: 3,
      ultimaActividad: '2024-03-11'
    },
  ];

  // Datos de ejemplo para las métricas
  const enrollmentData = [
    { referidor: 'Ana Martinez', matriculados: 8, referidos: 12, tasa: 66.7 },
    { referidor: 'Carlos López', matriculados: 6, referidos: 10, tasa: 60.0 },
    { referidor: 'María García', matriculados: 5, referidos: 8, tasa: 62.5 },
    { referidor: 'Juan Pérez', matriculados: 4, referidos: 7, tasa: 57.1 },
  ];

  const phaseData = [
    { name: 'Registrado', value: 25 },
    { name: 'Evaluación', value: 15 },
    { name: 'Matriculado', value: 20 },
    { name: 'Descartado', value: 5 },
  ];

  const campaignData = [
    { mes: 'Ene', redes: 15, referidos: 20, email: 12 },
    { mes: 'Feb', redes: 18, referidos: 22, email: 15 },
    { mes: 'Mar', redes: 25, referidos: 30, email: 20 },
    { mes: 'Abr', redes: 22, referidos: 25, email: 18 },
  ];

  const COLORS = ['#4ade80', '#fbbf24', '#3b82f6', '#ef4444'];

  const StatCard = ({ title, value, description, icon: Icon }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-2 text-standard">{value}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
        <Icon className="w-8 h-8 text-blue-500" />
      </div>
    </div>
  );

  const calculateOverallConversion = () => {
    const totalMatriculados = enrollmentData.reduce((sum, item) => sum + item.matriculados, 0);
    const totalReferidos = enrollmentData.reduce((sum, item) => sum + item.referidos, 0);
    return ((totalMatriculados / totalReferidos) * 100).toFixed(1);
  };

  return (
    <div className="w-full">
      {/* Header fijo */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="px-4 sm:px-6 md:px-8 py-4">
          <h1 className="text-3xl font-bold text-center mb-4">Dashboard Administrativo</h1>
          
          {/* Tabs */}
          <div className="flex space-x-1 rounded-lg bg-gray-100 p-1">
            {[
              { id: 'dashboard', icon: LayoutDashboard, label: 'General' },
              { id: 'referidores', icon: Users, label: 'Referidores' },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md flex-1
                  ${activeTab === id 
                    ? 'bg-white shadow-sm text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contenedor principal con scroll */}
      <div className="fixed top-32 bottom-0 left-0 right-0 overflow-auto bg-gray-50">
        <div className="px-4 sm:px-6 md:px-8 py-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Métricas generales */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard
                  title="Total Referidos"
                  value="65"
                  description="Acumulado"
                  icon={Users}
                />
                <StatCard
                  title="Tasa de Conversión"
                  value={`${calculateOverallConversion()}%`}
                  description="Promedio general"
                  icon={TrendingUp}
                />
                <StatCard
                  title="Matriculados"
                  value="23"
                  description="Este mes"
                  icon={UserPlus}
                />
                <StatCard
                  title="Campañas Activas"
                  value="4"
                  description="En curso"
                  icon={Target}
                />
              </div>

              {/* Gráficos principales */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Fases de referidos */}
                <div className="bg-white rounded-lg shadow p-6 text-standard">
                  <h3 className="text-lg font-semibold mb-2">Fases de Referidos</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={phaseData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {phaseData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-wrap justify-center gap-2">
                      {phaseData.map((entry, index) => (
                        <div key={entry.name} className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: COLORS[index] }}
                          />
                          <span className="text-sm">{`${entry.name} (${entry.value})`}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Impacto de campañas */}
                <div className="bg-white rounded-lg shadow p-6 text-standard">
                  <h3 className="text-lg font-semibold mb-4">Impacto de Campañas</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={campaignData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="mes" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="redes" stroke="#3b82f6" name="Redes Sociales" />
                        <Line type="monotone" dataKey="referidos" stroke="#4ade80" name="Programa Referidos" />
                        <Line type="monotone" dataKey="email" stroke="#fbbf24" name="Email Marketing" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Tabla de referidores top */}
              <div className="bg-white rounded-lg shadow overflow-hidden text-standard">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold">Top Referidores</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Referidor</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Matriculados</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Total Referidos</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Tasa Conversión</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {enrollmentData.map((item) => (
                        <tr key={item.referidor}>
                          <td className="px-6 py-4">{item.referidor}</td>
                          <td className="px-6 py-4">{item.matriculados}</td>
                          <td className="px-6 py-4">{item.referidos}</td>
                          <td className="px-6 py-4">{`${item.tasa}%`}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'referidores' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow overflow-hidden text-standard">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold">Gestión de Referidores</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Nombre</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Departamento</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Total Referidos</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Activos</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Última Actividad</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {referidoresData.map((referidor) => (
                        <tr 
                          key={referidor.id} 
                          className="hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <td className="px-6 py-4">{referidor.nombre}</td>
                          <td className="px-6 py-4">{referidor.departamento}</td>
                          <td className="px-6 py-4">{referidor.totalReferidos}</td>
                          <td className="px-6 py-4">{referidor.referidosActivos}</td>
                          <td className="px-6 py-4">{referidor.ultimaActividad}</td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => {
                                setSelectedReferidor(referidor);
                                setShowModal(true);
                              }}
                              className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                              Ver detalles
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Modal de Detalles */}
              <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle style={{ color: '#1f2937' }}>Detalles del Referidor</DialogTitle>
                  </DialogHeader>
                  
                  {selectedReferidor && (
                    <div className="space-y-4 text-standard">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Nombre</p>
                          <p className="mt-1">{selectedReferidor.nombre}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Email</p>
                          <p className="mt-1">{selectedReferidor.email}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Teléfono</p>
                          <p className="mt-1">{selectedReferidor.telefono}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Departamento</p>
                          <p className="mt-1">{selectedReferidor.departamento}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Fecha de Registro</p>
                          <p className="mt-1">{selectedReferidor.fechaRegistro}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Última Actividad</p>
                          <p className="mt-1">{selectedReferidor.ultimaActividad}</p>
                        </div>
                      </div>
                      
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <h4 className="font-medium mb-2">Estadísticas</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-500">Total Referidos</p>
                            <p className="mt-1">{selectedReferidor.totalReferidos}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Referidos Activos</p>
                            <p className="mt-1">{selectedReferidor.referidosActivos}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;