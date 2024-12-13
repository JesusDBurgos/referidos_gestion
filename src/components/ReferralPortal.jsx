import React, { useState } from 'react';
import { UserPlus, History, LineChart, LayoutDashboard } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ReferralPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [newStudent, setNewStudent] = useState({
    nombre: '',
    email: '',
    telefono: '',
    programa: '',
  });

  const [referralHistory] = useState([
    {
      id: 1,
      estudiante: 'María González',
      estado: 'Matriculado',
      fecha: '2024-03-10',
      recompensa: '100€',
      fase: 'Completado'
    },
    {
      id: 2,
      estudiante: 'Juan Pérez',
      estado: 'En proceso',
      fecha: '2024-03-08',
      recompensa: 'Pendiente',
      fase: 'Entrevista'
    },
  ]);

  const monthlyData = [
    { month: 'Ene', referidos: 4 },
    { month: 'Feb', referidos: 6 },
    { month: 'Mar', referidos: 8 },
    { month: 'Abr', referidos: 5 },
  ];

  const statusData = [
    { name: 'Matriculados', value: 15 },
    { name: 'En proceso', value: 8 },
    { name: 'Pendientes', value: 4 },
  ];

  const COLORS = ['#4ade80', '#fbbf24', '#94a3b8'];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Nuevo estudiante:', newStudent);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const StatCard = ({ title, value, description }) => (
    <div className="bg-white rounded-lg shadow p-6 w-full">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold mt-2 text-standard">{value}</h3>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </div>
  );

  return (
    <div className="w-full">
      {/* Fixed header */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="px-4 sm:px-6 md:px-8 py-4">
          <h1 className="text-3xl font-bold text-center mb-4 text-standard">Portal de Referidos</h1>
          
          {/* Tabs */}
          <div className="flex space-x-1 rounded-lg bg-gray-100 p-1">
            {[
              { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
              { id: 'registro', icon: UserPlus, label: 'Nuevo Referido' },
              { id: 'historial', icon: History, label: 'Historial' },
              { id: 'seguimiento', icon: LineChart, label: 'Seguimiento' },
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

      {/* Contenedor principal con altura fija */}
      <div className="fixed top-32 bottom-0 left-0 right-0 overflow-auto bg-gray-50">
        <div className="px-4 sm:px-6 md:px-8 py-6">
          {/* Dashboard Content */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StatCard
                  title="Total Referidos"
                  value="27"
                  description="Total acumulado"
                />
                <StatCard
                  title="Referidos Activos"
                  value="12"
                  description="En proceso actual"
                />
                <StatCard
                  title="Recompensas Ganadas"
                  value="1,500€"
                  description="Este año"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4 text-standard">Referidos por Mes</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="referidos" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-2 text-standard">Estado de Referidos</h3>
                  <div className="h-64 mb-3">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={statusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {statusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-2">
                      {statusData.map((entry, index) => (
                        <div key={entry.name} className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: COLORS[index] }}
                          />
                          <span className="text-sm text-standard">{entry.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Registro Content */}
          {activeTab === 'registro' && (
            <div className="bg-white rounded-lg shadow p-6 max-w-3xl mx-auto">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Registrar Nuevo Estudiante</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    name="nombre"
                    value={newStudent.nombre}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={newStudent.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    name="telefono"
                    value={newStudent.telefono}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Programa de interés"
                    name="programa"
                    value={newStudent.programa}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Registrar Referido
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Historial Content */}
          {activeTab === 'historial' && (
            <div className="bg-white rounded-lg shadow overflow-hidden max-w-6xl mx-auto">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">Historial de Referidos</h2>
              </div>
              <div className="overflow-x-auto text-standard">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-4 font-medium">Estudiante</th>
                      <th className="text-left p-4 font-medium">Estado</th>
                      <th className="text-left p-4 font-medium">Fecha</th>
                      <th className="text-left p-4 font-medium">Recompensa</th>
                      <th className="text-left p-4 font-medium">Fase</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {referralHistory.map((referral) => (
                      <tr key={referral.id}>
                        <td className="p-4">{referral.estudiante}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            referral.estado === 'Matriculado' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {referral.estado}
                          </span>
                        </td>
                        <td className="p-4">{referral.fecha}</td>
                        <td className="p-4">{referral.recompensa}</td>
                        <td className="p-4">{referral.fase}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Seguimiento Content */}
          {activeTab === 'seguimiento' && (
            <div className="bg-white rounded-lg shadow p-6 max-w-6xl mx-auto">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Seguimiento de Referidos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-standard">
                {referralHistory.map((referral) => (
                  <div key={referral.id} className="bg-white rounded-lg shadow p-4 border border-gray-200">
                    <h3 className="font-semibold mb-2">{referral.estudiante}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Estado:</span>
                        <span>{referral.estado}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fase actual:</span>
                        <span>{referral.fase}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Última actualización:</span>
                        <span>{referral.fecha}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferralPortal;