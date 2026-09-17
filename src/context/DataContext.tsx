import React, { createContext, useContext, useState, useEffect } from 'react';
import type { 
  Bus, Driver, Route, Trip, MaintenanceRecord, 
  FuelRecord, PassengerTicket, NotificationItem, FleetSummary, BusStatus, MaintenanceStatus, TripStatus,
  Depot, MaintenanceWorkOrder, InspectionReport, Incident, EmergencyEvent, ComplianceRecord,
  FinancialExpense, RevenueRecord, Vendor, SystemServiceHealth, AuditLogItem, UserRoleDefinition, AIRecommendation
} from '../types';
import { 
  initialBuses, initialDrivers, initialRoutes, initialTrips, 
  initialMaintenanceRecords, initialFuelRecords, initialTickets, initialNotifications,
  initialDepots, initialMaintenanceWorkOrders, initialInspectionReports, initialIncidents, initialEmergencies,
  initialComplianceRecords, initialExpenses, initialRevenues, initialVendors, initialSystemHealth,
  initialAuditLogs, initialUserRoles, initialAIRecommendations
} from '../data/mockData';

interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface DataContextType {
  buses: Bus[];
  drivers: Driver[];
  routes: Route[];
  trips: Trip[];
  maintenanceRecords: MaintenanceRecord[];
  workOrders: MaintenanceWorkOrder[];
  fuelRecords: FuelRecord[];
  tickets: PassengerTicket[];
  notifications: NotificationItem[];
  fleetSummary: FleetSummary;
  toasts: ToastState[];
  depots: Depot[];
  inspectionReports: InspectionReport[];
  incidents: Incident[];
  emergencies: EmergencyEvent[];
  complianceRecords: ComplianceRecord[];
  expenses: FinancialExpense[];
  revenues: RevenueRecord[];
  vendors: Vendor[];
  systemHealth: SystemServiceHealth[];
  auditLogs: AuditLogItem[];
  userRoles: UserRoleDefinition[];
  aiRecommendations: AIRecommendation[];

  // Selection states
  selectedBusId: string | null;
  setSelectedBusId: (id: string | null) => void;
  selectedDriverId: string | null;
  setSelectedDriverId: (id: string | null) => void;
  selectedRouteId: string | null;
  setSelectedRouteId: (id: string | null) => void;
  selectedTripId: string | null;
  setSelectedTripId: (id: string | null) => void;
  isGlobalSearchOpen: boolean;
  setIsGlobalSearchOpen: (open: boolean) => void;
  
  // Handlers
  addBus: (bus: Omit<Bus, 'id'>) => void;
  updateBus: (id: string, busData: Partial<Bus>) => void;
  deleteBus: (id: string) => void;
  changeBusStatus: (id: string, status: BusStatus) => void;
  
  addDriver: (driver: Omit<Driver, 'id'>) => void;
  updateDriver: (id: string, driverData: Partial<Driver>) => void;
  deleteDriver: (id: string) => void;
  
  addRoute: (route: Omit<Route, 'id'>) => void;
  updateRoute: (id: string, routeData: Partial<Route>) => void;
  
  addTrip: (trip: Omit<Trip, 'id'>) => void;
  updateTripStatus: (id: string, status: TripStatus) => void;
  reassignTrip: (tripId: string, busId: string, driverId: string) => void;
  
  addMaintenanceRecord: (record: Omit<MaintenanceRecord, 'id'>) => void;
  updateMaintenanceStatus: (id: string, status: MaintenanceStatus) => void;
  addWorkOrder: (wo: Omit<MaintenanceWorkOrder, 'id'>) => void;
  updateWorkOrderStatus: (id: string, status: MaintenanceStatus) => void;

  addInspectionReport: (report: Omit<InspectionReport, 'id'>) => void;
  addIncident: (incident: Omit<Incident, 'id'>) => void;
  resolveIncident: (id: string, resolutionText: string) => void;
  resolveEmergency: (id: string) => void;
  lockTripEmergency: (emergencyId: string) => void;

  addExpense: (expense: Omit<FinancialExpense, 'id'>) => void;
  addVendor: (vendor: Omit<Vendor, 'id'>) => void;
  applyAIRecommendation: (id: string) => void;

  addFuelRecord: (record: Omit<FuelRecord, 'id'>) => void;
  bookTicket: (ticket: Omit<PassengerTicket, 'id' | 'bookingTime' | 'qrCodeToken' | 'status'>) => PassengerTicket;
  
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  deleteNotification: (id: string) => void;
  
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [buses, setBuses] = useState<Bus[]>(() => {
    const saved = localStorage.getItem('smartbus360_buses');
    return saved ? JSON.parse(saved) : initialBuses;
  });

  const [drivers, setDrivers] = useState<Driver[]>(() => {
    const saved = localStorage.getItem('smartbus360_drivers');
    return saved ? JSON.parse(saved) : initialDrivers;
  });

  const [routes, setRoutes] = useState<Route[]>(() => {
    const saved = localStorage.getItem('smartbus360_routes');
    return saved ? JSON.parse(saved) : initialRoutes;
  });

  const [trips, setTrips] = useState<Trip[]>(() => {
    const saved = localStorage.getItem('smartbus360_trips');
    return saved ? JSON.parse(saved) : initialTrips;
  });

  const [maintenanceRecords, setMaintenanceRecords] = useState<MaintenanceRecord[]>(() => {
    const saved = localStorage.getItem('smartbus360_maintenance');
    return saved ? JSON.parse(saved) : initialMaintenanceRecords;
  });

  const [workOrders, setWorkOrders] = useState<MaintenanceWorkOrder[]>(() => {
    const saved = localStorage.getItem('smartbus360_work_orders');
    return saved ? JSON.parse(saved) : initialMaintenanceWorkOrders;
  });

  const [fuelRecords, setFuelRecords] = useState<FuelRecord[]>(() => {
    const saved = localStorage.getItem('smartbus360_fuel');
    return saved ? JSON.parse(saved) : initialFuelRecords;
  });

  const [tickets, setTickets] = useState<PassengerTicket[]>(() => {
    const saved = localStorage.getItem('smartbus360_tickets');
    return saved ? JSON.parse(saved) : initialTickets;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('smartbus360_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  const [depots] = useState<Depot[]>(initialDepots);
  const [inspectionReports, setInspectionReports] = useState<InspectionReport[]>(initialInspectionReports);
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [emergencies, setEmergencies] = useState<EmergencyEvent[]>(initialEmergencies);
  const [complianceRecords] = useState<ComplianceRecord[]>(initialComplianceRecords);
  const [expenses, setExpenses] = useState<FinancialExpense[]>(initialExpenses);
  const [revenues] = useState<RevenueRecord[]>(initialRevenues);
  const [vendors, setVendors] = useState<Vendor[]>(initialVendors);
  const [systemHealth] = useState<SystemServiceHealth[]>(initialSystemHealth);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(initialAuditLogs);
  const [userRoles] = useState<UserRoleDefinition[]>(initialUserRoles);
  const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation[]>(initialAIRecommendations);

  // Selection states
  const [selectedBusId, setSelectedBusId] = useState<string | null>(null);
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);

  const [toasts, setToasts] = useState<ToastState[]>([]);

  // Persist to local storage
  useEffect(() => { localStorage.setItem('smartbus360_buses', JSON.stringify(buses)); }, [buses]);
  useEffect(() => { localStorage.setItem('smartbus360_drivers', JSON.stringify(drivers)); }, [drivers]);
  useEffect(() => { localStorage.setItem('smartbus360_routes', JSON.stringify(routes)); }, [routes]);
  useEffect(() => { localStorage.setItem('smartbus360_trips', JSON.stringify(trips)); }, [trips]);
  useEffect(() => { localStorage.setItem('smartbus360_maintenance', JSON.stringify(maintenanceRecords)); }, [maintenanceRecords]);
  useEffect(() => { localStorage.setItem('smartbus360_work_orders', JSON.stringify(workOrders)); }, [workOrders]);
  useEffect(() => { localStorage.setItem('smartbus360_fuel', JSON.stringify(fuelRecords)); }, [fuelRecords]);
  useEffect(() => { localStorage.setItem('smartbus360_tickets', JSON.stringify(tickets)); }, [tickets]);
  useEffect(() => { localStorage.setItem('smartbus360_notifications', JSON.stringify(notifications)); }, [notifications]);

  // Fleet Summary
  const fleetSummary: FleetSummary = {
    totalBuses: buses.length,
    activeBuses: buses.filter(b => b.status === 'active').length,
    idleBuses: buses.filter(b => b.status === 'idle').length,
    maintenanceBuses: buses.filter(b => b.status === 'maintenance').length,
    emergencyBuses: buses.filter(b => b.status === 'emergency').length,
    activeDrivers: drivers.filter(d => d.status === 'on_duty').length,
    todayTrips: trips.length,
    onTimeRatePercent: 96.4,
    totalPassengersToday: buses.reduce((sum, b) => sum + b.currentPassengers, 0) + 18200,
    fleetUtilizationPercent: buses.length > 0 ? Math.round((buses.filter(b => b.status === 'active').length / buses.length) * 100) : 0
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const logAuditAction = (module: string, action: string, entity: string, status: 'success' | 'warning' | 'failed' = 'success') => {
    const newLog: AuditLogItem = {
      id: `aud-${Date.now()}`,
      userName: 'Admin Executive',
      userRole: 'Super Admin',
      timestamp: new Date().toLocaleString(),
      module,
      action,
      entity,
      status,
      ipAddress: '192.168.1.45'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Bus Actions
  const addBus = (busData: Omit<Bus, 'id'>) => {
    const newBus: Bus = {
      ...busData,
      id: `bus-${Date.now()}`
    };
    setBuses(prev => [newBus, ...prev]);
    logAuditAction('Bus Management', 'Created Bus', `Bus ${newBus.registrationNumber}`);
    showToast(`Bus ${newBus.registrationNumber} added successfully.`);
  };

  const updateBus = (id: string, busData: Partial<Bus>) => {
    setBuses(prev => prev.map(b => b.id === id ? { ...b, ...busData } : b));
    logAuditAction('Bus Management', 'Updated Bus Profile', `Bus ID ${id}`);
    showToast(`Bus updated successfully.`);
  };

  const deleteBus = (id: string) => {
    const bus = buses.find(b => b.id === id);
    setBuses(prev => prev.filter(b => b.id !== id));
    logAuditAction('Bus Management', 'Deleted Bus', `Bus ${bus?.registrationNumber || id}`);
    showToast(`Bus ${bus?.registrationNumber || id} removed.`, 'info');
  };

  const changeBusStatus = (id: string, status: BusStatus) => {
    setBuses(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    logAuditAction('Bus Management', 'Status Changed', `Bus ${id} -> ${status}`);
    showToast(`Bus status changed to ${status.toUpperCase()}.`);
  };

  // Driver Actions
  const addDriver = (driverData: Omit<Driver, 'id'>) => {
    const newDriver: Driver = {
      ...driverData,
      id: `drv-${Date.now()}`
    };
    setDrivers(prev => [newDriver, ...prev]);
    logAuditAction('Driver Roster', 'Added Driver', `Driver ${newDriver.name}`);
    showToast(`Driver ${newDriver.name} added to fleet.`);
  };

  const updateDriver = (id: string, driverData: Partial<Driver>) => {
    setDrivers(prev => prev.map(d => d.id === id ? { ...d, ...driverData } : d));
    logAuditAction('Driver Roster', 'Updated Driver Profile', `Driver ID ${id}`);
    showToast(`Driver record updated.`);
  };

  const deleteDriver = (id: string) => {
    setDrivers(prev => prev.filter(d => d.id !== id));
    logAuditAction('Driver Roster', 'Deleted Driver', `Driver ID ${id}`);
    showToast(`Driver deleted.`, 'info');
  };

  // Route Actions
  const addRoute = (routeData: Omit<Route, 'id'>) => {
    const newRoute: Route = {
      ...routeData,
      id: `route-${Date.now()}`
    };
    setRoutes(prev => [newRoute, ...prev]);
    logAuditAction('Route Operations', 'Created Route', `Route ${newRoute.code}`);
    showToast(`Route ${newRoute.code} created.`);
  };

  const updateRoute = (id: string, routeData: Partial<Route>) => {
    setRoutes(prev => prev.map(r => r.id === id ? { ...r, ...routeData } : r));
    logAuditAction('Route Operations', 'Updated Route Config', `Route ID ${id}`);
    showToast(`Route configuration updated.`);
  };

  // Trip Actions
  const addTrip = (tripData: Omit<Trip, 'id'>) => {
    const newTrip: Trip = {
      ...tripData,
      id: `trp-${Date.now()}`
    };
    setTrips(prev => [newTrip, ...prev]);
    logAuditAction('Dispatch Center', 'Scheduled Trip', `Trip ${newTrip.id}`);
    showToast(`Trip scheduled for Bus ${newTrip.busNumber}.`);
  };

  const updateTripStatus = (id: string, status: TripStatus) => {
    setTrips(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    logAuditAction('Dispatch Center', 'Updated Trip Status', `Trip ${id} -> ${status}`);
    showToast(`Trip status updated to ${status}.`);
  };

  const reassignTrip = (tripId: string, busId: string, driverId: string) => {
    const bus = buses.find(b => b.id === busId);
    const driver = drivers.find(d => d.id === driverId);
    setTrips(prev => prev.map(t => {
      if (t.id === tripId) {
        return {
          ...t,
          busId,
          busNumber: bus ? bus.registrationNumber : t.busNumber,
          driverId,
          driverName: driver ? driver.name : t.driverName,
          status: 'scheduled'
        };
      }
      return t;
    }));
    logAuditAction('Dispatch Center', 'Reassigned Trip', `Trip ${tripId} reassigned to Bus ${bus?.registrationNumber} & Driver ${driver?.name}`);
    showToast(`Trip ${tripId} reassigned successfully.`);
  };

  // Maintenance & Work Orders
  const addMaintenanceRecord = (recordData: Omit<MaintenanceRecord, 'id'>) => {
    const newRecord: MaintenanceRecord = {
      ...recordData,
      id: `mnt-${Date.now()}`
    };
    setMaintenanceRecords(prev => [newRecord, ...prev]);
    logAuditAction('Maintenance', 'Logged Maintenance Task', `Bus ${newRecord.busRegistration}`);
    showToast(`Maintenance task logged for ${newRecord.busRegistration}.`);
  };

  const updateMaintenanceStatus = (id: string, status: MaintenanceStatus) => {
    setMaintenanceRecords(prev => prev.map(m => m.id === id ? { ...m, status } : m));
    showToast(`Maintenance status set to ${status}.`);
  };

  const addWorkOrder = (woData: Omit<MaintenanceWorkOrder, 'id'>) => {
    const newWO: MaintenanceWorkOrder = {
      ...woData,
      id: `wo-${Date.now()}`
    };
    setWorkOrders(prev => [newWO, ...prev]);
    logAuditAction('Maintenance', 'Created Work Order', `WO ${newWO.id} for Bus ${newWO.busRegistration}`);
    showToast(`Work order WO-${newWO.id} created for ${newWO.busRegistration}.`);
  };

  const updateWorkOrderStatus = (id: string, status: MaintenanceStatus) => {
    setWorkOrders(prev => prev.map(w => w.id === id ? { ...w, status } : w));
    logAuditAction('Maintenance', 'Work Order Status Update', `WO ${id} -> ${status}`);
    showToast(`Work order ${id} status updated to ${status}.`);
  };

  // Vehicle Inspection
  const addInspectionReport = (reportData: Omit<InspectionReport, 'id'>) => {
    const newReport: InspectionReport = {
      ...reportData,
      id: `insp-${Date.now()}`
    };
    setInspectionReports(prev => [newReport, ...prev]);
    if (newReport.overallStatus === 'unsafe') {
      changeBusStatus(newReport.busId, 'out_of_service');
      showToast(`CRITICAL: Inspection failed for ${newReport.busRegistration}. Bus flagged UNSAFE - DO NOT DISPATCH!`, 'error');
      logAuditAction('Inspection', 'Vehicle Unsafe Lockout Triggered', `Bus ${newReport.busRegistration}`, 'warning');
    } else {
      showToast(`Inspection passed for ${newReport.busRegistration}. Vehicle cleared for dispatch.`);
      logAuditAction('Inspection', 'Daily Inspection Passed', `Bus ${newReport.busRegistration}`);
    }
  };

  // Incident & Emergency Management
  const addIncident = (incidentData: Omit<Incident, 'id'>) => {
    const newIncident: Incident = {
      ...incidentData,
      id: `inc-${Date.now()}`
    };
    setIncidents(prev => [newIncident, ...prev]);
    logAuditAction('Incident Management', 'Logged Incident', `${newIncident.type.toUpperCase()} on Bus ${newIncident.busRegistration}`);
    showToast(`Incident #${newIncident.id} logged. Emergency response team notified.`, 'info');
  };

  const resolveIncident = (id: string, resolutionText: string) => {
    setIncidents(prev => prev.map(inc => inc.id === id ? { ...inc, status: 'resolved', resolutionText } : inc));
    logAuditAction('Incident Management', 'Resolved Incident', `Incident #${id}`);
    showToast(`Incident #${id} resolved successfully.`);
  };

  const resolveEmergency = (id: string) => {
    setEmergencies(prev => prev.filter(e => e.id !== id));
    logAuditAction('Emergency Center', 'Resolved Emergency Alert', `Emergency #${id}`);
    showToast(`Emergency alert #${id} marked as resolved.`, 'success');
  };

  const lockTripEmergency = (emergencyId: string) => {
    setEmergencies(prev => prev.map(e => e.id === emergencyId ? { ...e, isLocked: true } : e));
    logAuditAction('Emergency Center', 'Locked Trip & Dispatched Emergency Services', `Emergency #${emergencyId}`, 'warning');
    showToast(`Emergency services contacted. Trip locked down for safety.`, 'info');
  };

  // Finance & Vendor
  const addExpense = (expenseData: Omit<FinancialExpense, 'id'>) => {
    const newExpense: FinancialExpense = {
      ...expenseData,
      id: `exp-${Date.now()}`
    };
    setExpenses(prev => [newExpense, ...prev]);
    logAuditAction('Expense Management', 'Recorded Expense', `₹${newExpense.amount} for ${newExpense.category}`);
    showToast(`Expense record ₹${newExpense.amount} created.`);
  };

  const addVendor = (vendorData: Omit<Vendor, 'id'>) => {
    const newVendor: Vendor = {
      ...vendorData,
      id: `vnd-${Date.now()}`
    };
    setVendors(prev => [newVendor, ...prev]);
    logAuditAction('Vendor Management', 'Added Vendor', `Vendor ${newVendor.name}`);
    showToast(`Vendor ${newVendor.name} added to enterprise portal.`);
  };

  const applyAIRecommendation = (id: string) => {
    setAiRecommendations(prev => prev.map(rec => rec.id === id ? { ...rec, isApplied: true } : rec));
    logAuditAction('AI Operations Assistant', 'Applied AI Recommendation', `Recommendation #${id}`);
    showToast(`AI Recommendation #${id} applied to active operational workflow!`);
  };

  // Fuel Actions
  const addFuelRecord = (recordData: Omit<FuelRecord, 'id'>) => {
    const newRecord: FuelRecord = {
      ...recordData,
      id: `fuel-${Date.now()}`
    };
    setFuelRecords(prev => [newRecord, ...prev]);
    logAuditAction('Fuel Intelligence', 'Logged Fuel Entry', `${newRecord.litres}L for Bus ${newRecord.busRegistration}`);
    showToast(`Fuel log recorded for ${newRecord.busRegistration}.`);
  };

  // Ticket Actions
  const bookTicket = (ticketData: Omit<PassengerTicket, 'id' | 'bookingTime' | 'qrCodeToken' | 'status'>): PassengerTicket => {
    const id = `tkt-${Math.floor(10000 + Math.random() * 90000)}`;
    const newTicket: PassengerTicket = {
      ...ticketData,
      id,
      bookingTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      qrCodeToken: `SMARTBUS360-${id}`,
      status: 'active'
    };
    setTickets(prev => [newTicket, ...prev]);
    logAuditAction('Passenger Ticketing', 'Issued Ticket', `Ticket #${newTicket.id}`);
    showToast(`Ticket #${newTicket.id} issued successfully!`);
    return newTicket;
  };

  // Notification Actions
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read.');
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <DataContext.Provider value={{
      buses, drivers, routes, trips, maintenanceRecords, workOrders, fuelRecords, tickets, notifications, fleetSummary, toasts,
      depots, inspectionReports, incidents, emergencies, complianceRecords, expenses, revenues, vendors, systemHealth, auditLogs, userRoles, aiRecommendations,
      selectedBusId, setSelectedBusId, selectedDriverId, setSelectedDriverId, selectedRouteId, setSelectedRouteId, selectedTripId, setSelectedTripId,
      isGlobalSearchOpen, setIsGlobalSearchOpen,
      addBus, updateBus, deleteBus, changeBusStatus,
      addDriver, updateDriver, deleteDriver,
      addRoute, updateRoute,
      addTrip, updateTripStatus, reassignTrip,
      addMaintenanceRecord, updateMaintenanceStatus, addWorkOrder, updateWorkOrderStatus,
      addInspectionReport, addIncident, resolveIncident, resolveEmergency, lockTripEmergency,
      addExpense, addVendor, applyAIRecommendation,
      addFuelRecord, bookTicket,
      markNotificationAsRead, markAllNotificationsAsRead, deleteNotification,
      showToast, removeToast
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};
