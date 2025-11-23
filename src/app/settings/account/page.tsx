'use client';

import { Navbar } from '@/components/custom/navbar';
import { User, ChevronLeft, Mail, Phone, Calendar, Shield, Key } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function AccountPage() {
  const [formData, setFormData] = useState({
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 98765-4321',
    birthdate: '1990-05-15',
    cpf: '123.456.789-00',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveProfile = () => {
    alert('Perfil atualizado com sucesso!');
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    alert('Senha alterada com sucesso!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/settings" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-4 font-medium">
            <ChevronLeft className="w-5 h-5" />
            Voltar para Configurações
          </Link>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Conta e Segurança</h1>
              <p className="text-gray-600">Gerencie suas informações pessoais e segurança</p>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100 overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <User className="w-5 h-5 text-purple-600" />
              Informações Pessoais
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nome Completo</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                E-mail
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Telefone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Data de Nascimento
              </label>
              <input
                type="date"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                CPF
              </label>
              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleInputChange}
                disabled
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-100 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">O CPF não pode ser alterado</p>
            </div>
            <button
              onClick={handleSaveProfile}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Salvar Alterações
            </button>
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Key className="w-5 h-5 text-purple-600" />
              Alterar Senha
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Senha Atual</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Digite sua senha atual"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nova Senha</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Digite sua nova senha"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Confirmar Nova Senha</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Confirme sua nova senha"
              />
            </div>
            <button
              onClick={handleChangePassword}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Alterar Senha
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
