import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 
  | 'Super Admin'
  | 'Transport Manager'
  | 'Fleet Manager'
  | 'Dispatcher'
  | 'Driver Manager'
  | 'Maintenance Manager'
  | 'Finance Manager'
  | 'Safety Officer'
  | 'Driver';

export interface ActiveSession {
  id: string;
  device: string;
  location: string;
  ip: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  role: UserRole;
  avatar: string;
  createdAt: string;
  preferences: {
    theme: 'light' | 'dark' | 'system';
    notifications: boolean;
    emailAlerts: boolean;
    smsAlerts: boolean;
    language: string;
  };
  activeSessions: ActiveSession[];
}

const defaultUser: UserProfile = {
  id: 'USR-360-001',
  name: 'Alexander Pierce',
  email: 'alexander@smartbus360.com',
  phone: '+1 (555) 360-8920',
  company: 'Metropolitan Rapid Transit Authority',
  role: 'Super Admin',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  createdAt: 'Jan 15, 2024',
  preferences: {
    theme: 'system',
    notifications: true,
    emailAlerts: true,
    smsAlerts: false,
    language: 'English (US)'
  },
  activeSessions: [
    {
      id: 'SESS-01',
      device: 'MacBook Pro 16" (Chrome 122)',
      location: 'Coimbatore, India',
      ip: '192.168.1.104',
      lastActive: 'Active Now',
      isCurrent: true
    },
    {
      id: 'SESS-02',
      device: 'iPhone 15 Pro (SmartBus App)',
      location: 'Chennai, India',
      ip: '103.24.182.11',
      lastActive: '2 hours ago',
      isCurrent: false
    },
    {
      id: 'SESS-03',
      device: 'iPad Air 5 (Safari)',
      location: 'Bengaluru, India',
      ip: '49.207.52.88',
      lastActive: 'Yesterday',
      isCurrent: false
    }
  ]
};

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  login: (email: string, pass: string, rememberMe?: boolean) => Promise<boolean>;
  register: (data: { name: string; email: string; company: string; phone: string; role?: UserRole }) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  updatePreferences: (prefs: Partial<UserProfile['preferences']>) => void;
  changePassword: (currentPass: string, newPass: string) => Promise<boolean>;
  terminateSession: (sessionId: string) => void;
  terminateAllOtherSessions: () => void;
  
  // Logout Modal State
  isLogoutModalOpen: boolean;
  openLogoutModal: () => void;
  closeLogoutModal: () => void;
  confirmLogout: () => void;

  // Session Expiry State
  isSessionExpired: boolean;
  triggerSessionExpired: () => void;
  dismissSessionExpired: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const savedAuth = localStorage.getItem('smartbus360_auth');
    return savedAuth ? JSON.parse(savedAuth) : true; // Default logged in for seamless enterprise platform experience
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    const savedUser = localStorage.getItem('smartbus360_user');
    return savedUser ? JSON.parse(savedUser) : defaultUser;
  });

  const [currentRole, setCurrentRoleState] = useState<UserRole>(() => {
    const savedRole = localStorage.getItem('smartbus360_role') as UserRole;
    return savedRole || defaultUser.role;
  });

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isSessionExpired, setIsSessionExpired] = useState(false);

  useEffect(() => {
    localStorage.setItem('smartbus360_auth', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('smartbus360_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('smartbus360_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('smartbus360_role', currentRole);
  }, [currentRole]);

  const setCurrentRole = (role: UserRole) => {
    setCurrentRoleState(role);
    if (user) {
      setUser({ ...user, role });
    }
  };

  const login = async (email: string, pass: string, _rememberMe = true): Promise<boolean> => {
    // Simulate auth network request
    await new Promise(resolve => setTimeout(resolve, 600));

    // Simple validation rule: email must not be empty
    if (!email || !pass) return false;

    const loggedUser: UserProfile = {
      ...defaultUser,
      email: email,
      name: email.split('@')[0].replace('.', ' ').toUpperCase(),
    };

    setUser(loggedUser);
    setIsAuthenticated(true);
    setCurrentRoleState(loggedUser.role);
    return true;
  };

  const register = async (data: { name: string; email: string; company: string; phone: string; role?: UserRole }): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 800));

    const newUser: UserProfile = {
      ...defaultUser,
      id: `USR-360-${Math.floor(100 + Math.random() * 900)}`,
      name: data.name,
      email: data.email,
      company: data.company,
      phone: data.phone || defaultUser.phone,
      role: data.role || 'Transport Manager',
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    setUser(newUser);
    setIsAuthenticated(true);
    setCurrentRoleState(newUser.role);
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('smartbus360_auth');
    localStorage.removeItem('smartbus360_user');
  };

  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  const confirmLogout = () => {
    setIsLogoutModalOpen(false);
    logout();
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    setUser({ ...user, ...data });
  };

  const updatePreferences = (prefs: Partial<UserProfile['preferences']>) => {
    if (!user) return;
    setUser({
      ...user,
      preferences: { ...user.preferences, ...prefs }
    });
  };

  const changePassword = async (_currentPass: string, _newPass: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return true;
  };

  const terminateSession = (sessionId: string) => {
    if (!user) return;
    setUser({
      ...user,
      activeSessions: user.activeSessions.filter(s => s.id !== sessionId)
    });
  };

  const terminateAllOtherSessions = () => {
    if (!user) return;
    setUser({
      ...user,
      activeSessions: user.activeSessions.filter(s => s.isCurrent)
    });
  };

  const triggerSessionExpired = () => setIsSessionExpired(true);
  const dismissSessionExpired = () => {
    setIsSessionExpired(false);
    logout();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        currentRole,
        setCurrentRole,
        login,
        register,
        logout,
        updateProfile,
        updatePreferences,
        changePassword,
        terminateSession,
        terminateAllOtherSessions,
        isLogoutModalOpen,
        openLogoutModal,
        closeLogoutModal,
        confirmLogout,
        isSessionExpired,
        triggerSessionExpired,
        dismissSessionExpired
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
