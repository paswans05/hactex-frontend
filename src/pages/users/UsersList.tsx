/**
 * Hactex — Company User Management Page (/users)
 * Provides company-isolated user CRUD, role assignment, and status controls.
 */
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Users, UserPlus, Search, Filter, Shield, 
  CheckCircle2, XCircle, AlertTriangle, Trash2, Edit2,
  Mail, Phone, Clock, RefreshCw, X
} from 'lucide-react';
import { userService, type UserFilterParams } from '../../api/services/user.service';
import type { User, Role } from '../../api/types';
import { getUser } from '../../lib/auth';
import { useCompany } from '../../context/CompanyContext';

export const UsersList: React.FC = () => {
  const currentUser = getUser();
  const { company } = useCompany();

  // Users & Roles state
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    role: 'staff',
    phone: '',
    status: 'ACTIVE'
  });
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  // Fetch Users
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params: UserFilterParams = {};
      if (searchTerm.trim()) params.search = searchTerm.trim();
      if (selectedRole) params.role = selectedRole;
      if (selectedStatus) params.status = selectedStatus;

      const res = await userService.listUsers(params);
      if (res.success && res.data) {
        setUsers(res.data);
      } else {
        setError(res.error || 'Failed to load users');
      }
    } catch (err: any) {
      setError(err?.message || 'Error fetching users list');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedRole, selectedStatus]);

  // Fetch Roles
  useEffect(() => {
    async function loadRoles() {
      try {
        const res = await userService.listRoles();
        if (res.success && res.data) {
          setRoles(res.data);
        }
      } catch (err) {
        console.warn('Failed to load roles:', err);
      }
    }
    loadRoles();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Handle Add User
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError(null);

    if (!formData.name.trim() || formData.name.length < 2) {
      setModalError('Full name must be at least 2 characters long.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setModalError('Please provide a valid work email.');
      return;
    }
    if (!formData.password || formData.password.length < 6) {
      setModalError('Password must be at least 6 characters.');
      return;
    }

    try {
      setModalLoading(true);
      const res = await userService.createUser({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        username: formData.username.trim() || undefined,
        role: formData.role,
        phone: formData.phone.trim() || undefined,
        status: formData.status
      });

      if (res.success) {
        setSuccessMsg(`User ${formData.name} added successfully.`);
        setShowAddModal(false);
        setFormData({ name: '', email: '', username: '', password: '', role: 'staff', phone: '', status: 'ACTIVE' });
        fetchUsers();
        setTimeout(() => setSuccessMsg(null), 4000);
      } else {
        setModalError(res.error || 'Failed to create user.');
      }
    } catch (err: any) {
      setModalError(err?.message || 'Failed to create user.');
    } finally {
      setModalLoading(false);
    }
  };

  // Handle Edit User
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    setModalError(null);

    try {
      setModalLoading(true);
      const res = await userService.updateUser(selectedUser.id, {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        role: formData.role,
        phone: formData.phone.trim() || undefined,
        password: formData.password ? formData.password : undefined
      });

      if (res.success) {
        setSuccessMsg(`User ${formData.name} updated successfully.`);
        setShowEditModal(false);
        fetchUsers();
        setTimeout(() => setSuccessMsg(null), 4000);
      } else {
        setModalError(res.error || 'Failed to update user.');
      }
    } catch (err: any) {
      setModalError(err?.message || 'Failed to update user.');
    } finally {
      setModalLoading(false);
    }
  };

  // Handle Quick Status Change
  const handleStatusChange = async (user: User, newStatus: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED') => {
    if (user.id === currentUser?.id || user.uuid === currentUser?.uuid) {
      alert('You cannot change your own account status.');
      return;
    }
    try {
      const res = await userService.changeStatus(user.id, newStatus);
      if (res.success) {
        setSuccessMsg(`Status for ${user.name} updated to ${newStatus}.`);
        fetchUsers();
        setTimeout(() => setSuccessMsg(null), 4000);
      } else {
        setError(res.error || 'Failed to update user status.');
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to update user status.');
    }
  };

  // Handle Delete User
  const handleDeleteConfirm = async () => {
    if (!selectedUser) return;
    try {
      setModalLoading(true);
      const res = await userService.deleteUser(selectedUser.id);
      if (res.success) {
        setSuccessMsg(`User ${selectedUser.name} deleted successfully.`);
        setShowDeleteModal(false);
        setSelectedUser(null);
        fetchUsers();
        setTimeout(() => setSuccessMsg(null), 4000);
      } else {
        setModalError(res.error || 'Failed to delete user.');
      }
    } catch (err: any) {
      setModalError(err?.message || 'Failed to delete user.');
    } finally {
      setModalLoading(false);
    }
  };

  const openEdit = (user: User) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email || '',
      username: user.username,
      password: '',
      role: user.role,
      phone: user.phone || '',
      status: user.status || 'ACTIVE'
    });
    setModalError(null);
    setShowEditModal(true);
  };

  const openDelete = (user: User) => {
    setSelectedUser(user);
    setModalError(null);
    setShowDeleteModal(true);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl border-2 border-slate-900/10 p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                User Management
                {company && (
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                    {company.name} ({company.company_code})
                  </span>
                )}
              </h1>
              <p className="text-sm text-slate-500 font-medium mt-0.5">
                Manage team members, assign operational roles, and enforce security policies.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => fetchUsers()}
            className="p-2.5 rounded-xl border-2 border-slate-200 hover:bg-slate-50 text-slate-600 transition cursor-pointer"
            title="Refresh list"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => {
              setFormData({ name: '', email: '', username: '', password: '', role: 'staff', phone: '', status: 'ACTIVE' });
              setModalError(null);
              setShowAddModal(true);
            }}
            className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white text-sm font-bold flex items-center justify-center gap-2 transition shadow cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            Add Team Member
          </button>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border-2 border-rose-300 text-rose-800 flex items-center gap-3 text-sm font-semibold">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
          {error}
        </div>
      )}
      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border-2 border-emerald-300 text-emerald-800 flex items-center gap-3 text-sm font-semibold">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          {successMsg}
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl border-2 border-slate-900/10 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by name, email, or username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:border-slate-900 focus:outline-none bg-slate-50/50"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium bg-slate-50/50 focus:outline-none focus:border-slate-900 w-full sm:w-auto"
            >
              <option value="">All Roles</option>
              {roles.map((r) => (
                <option key={r.id} value={r.name}>
                  {r.label || r.name}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium bg-slate-50/50 focus:outline-none focus:border-slate-900 w-full sm:w-auto"
            >
              <option value="">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="SUSPENDED">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-2xl border-2 border-slate-900/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Login</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    <div className="w-6 h-6 border-2 border-slate-400 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    Loading company team members...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    No users found matching current filters.
                  </td>
                </tr>
              ) : (
                users.map((user) => {
                  const isSelf = user.id === currentUser?.id || user.uuid === currentUser?.uuid;
                  return (
                    <tr key={user.id} className="hover:bg-slate-50/75 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold flex items-center justify-center text-sm">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 flex items-center gap-1.5">
                              {user.name}
                              {isSelf && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-bold border border-blue-200">
                                  You
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-slate-400 font-medium">@{user.username}</div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${
                          user.role === 'admin' || user.role === 'super_admin'
                            ? 'bg-purple-50 text-purple-800 border-purple-200'
                            : user.role === 'manager'
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : 'bg-slate-100 text-slate-800 border-slate-200'
                        }`}>
                          <Shield className="w-3 h-3" />
                          {user.role.toUpperCase()}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                            <Mail className="w-3.5 h-3.5 text-slate-400" />
                            {user.email || 'No email provided'}
                          </div>
                          {user.phone && (
                            <div className="flex items-center gap-1.5 text-xs text-slate-500">
                              <Phone className="w-3.5 h-3.5 text-slate-400" />
                              {user.phone}
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                          user.status === 'ACTIVE'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : user.status === 'SUSPENDED'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-rose-50 text-rose-800 border-rose-200'
                        }`}>
                          {user.status === 'ACTIVE' ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <XCircle className="w-3 h-3 text-rose-600" />
                          )}
                          {user.status || 'ACTIVE'}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {user.last_login_at 
                            ? new Date(user.last_login_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                            : 'Never'}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEdit(user)}
                            className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition cursor-pointer"
                            title="Edit user"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          {/* Quick Status Toggle */}
                          {!isSelf && (
                            user.status === 'ACTIVE' ? (
                              <button
                                onClick={() => handleStatusChange(user, 'INACTIVE')}
                                className="p-1.5 rounded-lg hover:bg-rose-100 text-slate-400 hover:text-rose-700 transition cursor-pointer"
                                title="Deactivate user"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            ) : (
                              <button
                                onClick={() => handleStatusChange(user, 'ACTIVE')}
                                className="p-1.5 rounded-lg hover:bg-emerald-100 text-slate-400 hover:text-emerald-700 transition cursor-pointer"
                                title="Activate user"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                              </button>
                            )
                          )}

                          {!isSelf && (
                            <button
                              onClick={() => openDelete(user)}
                              className="p-1.5 rounded-lg hover:bg-rose-100 text-slate-400 hover:text-rose-700 transition cursor-pointer"
                              title="Delete user"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: Add User */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border-2 border-slate-900 p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-black text-lg text-slate-900 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-emerald-600" />
                Add Team Member
              </h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-1 text-slate-400 hover:text-slate-900 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {modalError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold">
                {modalError}
              </div>
            )}

            <form onSubmit={handleAddSubmit} className="space-y-3.5 text-sm">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Suresh Patel"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="suresh@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Temporary Password *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Min 6 chars"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:border-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Assigned Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-slate-900 focus:outline-none capitalize"
                  >
                    {roles.map((r) => (
                      <option key={r.id} value={r.name}>
                        {r.label || r.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:border-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Account Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-slate-900 focus:outline-none"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                    <option value="SUSPENDED">SUSPENDED</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 font-bold hover:bg-slate-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={modalLoading}
                  className="px-5 py-2 rounded-lg bg-slate-900 hover:bg-emerald-700 text-white font-bold transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {modalLoading ? 'Creating...' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Edit User */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border-2 border-slate-900 p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-black text-lg text-slate-900 flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-blue-600" />
                Edit Member: {selectedUser.name}
              </h3>
              <button 
                onClick={() => setShowEditModal(false)}
                className="p-1 text-slate-400 hover:text-slate-900 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {modalError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold">
                {modalError}
              </div>
            )}

            <form onSubmit={handleEditSubmit} className="space-y-3.5 text-sm">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Change Password
                  </label>
                  <input
                    type="password"
                    placeholder="Leave blank to keep"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:border-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Assigned Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-slate-900 focus:outline-none capitalize"
                  >
                    {roles.map((r) => (
                      <option key={r.id} value={r.name}>
                        {r.label || r.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 font-bold hover:bg-slate-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={modalLoading}
                  className="px-5 py-2 rounded-lg bg-slate-900 hover:bg-blue-700 text-white font-bold transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {modalLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Delete User Confirmation */}
      {showDeleteModal && selectedUser && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border-2 border-slate-900 p-6 max-w-sm w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 border border-rose-300 text-rose-700 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base">Delete Team Member</h3>
                <p className="text-xs text-slate-500 font-medium">This action cannot be undone.</p>
              </div>
            </div>

            {modalError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold">
                {modalError}
              </div>
            )}

            <p className="text-sm text-slate-600 font-medium">
              Are you sure you want to delete <strong className="text-slate-900">{selectedUser.name}</strong> ({selectedUser.email})? They will immediately lose access to all company records.
            </p>

            <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-lg text-slate-600 font-bold hover:bg-slate-100 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={modalLoading}
                onClick={handleDeleteConfirm}
                className="px-5 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {modalLoading ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;

