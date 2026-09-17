export type UserRole = 
  | 'Super Admin'
  | 'Transport Manager'
  | 'Fleet Manager'
  | 'Dispatcher'
  | 'Driver Manager'
  | 'Maintenance Manager'
  | 'Finance Manager'
  | 'Safety Officer'
  | 'Driver'
  | 'admin'
  | 'driver'
  | 'passenger';

export type BusStatus = 'active' | 'idle' | 'maintenance' | 'out_of_service' | 'emergency';


export interface Bus {
  id: string;
  registrationNumber: string;
  model: string;
  capacity: number;
  currentPassengers: number;
  status: BusStatus;
  routeId: string;
  routeName: string;
  driverId: string;
  driverName: string;
  speedKmH: number;
  fuelLevelPercent: number;
  lastServiceDate: string;
  nextServiceDue: string;
  lat: number;
  lng: number;
  depotLocation: string;
  healthScore?: number;
  mileageKm?: number;
  engineHealthPercent?: number;
  brakeHealthPercent?: number;
  tyreHealthPercent?: number;
  batteryLevelPercent?: number;
  gpsStatus?: 'connected' | 'degraded' | 'offline';
  etaMins?: number;
  lastGpsUpdate?: string;
}

export type DriverStatus = 'on_duty' | 'off_duty' | 'on_break' | 'suspended';

export interface DriverSafetyMetrics {
  overspeedEvents: number;
  harshBrakingEvents: number;
  harshAccelerationEvents: number;
  harshCorneringEvents: number;
  idleTimeHours: number;
  incidentsCount: number;
  complaintsCount: number;
}

export interface DriverDocument {
  type: 'Driving License' | 'Medical Certificate' | 'Training Certificate' | 'Badge';
  documentNumber: string;
  issueDate: string;
  expiryDate: string;
  status: 'valid' | 'expiring_soon' | 'expired';
}

export interface Driver {
  id: string;
  name: string;
  avatar: string;
  licenseNumber: string;
  licenseExpiry: string;
  experienceYears: number;
  safetyScore: number; // 0 - 100
  phone: string;
  email?: string;
  joiningDate?: string;
  emergencyContact?: string;
  status: DriverStatus;
  assignedBusId?: string;
  assignedBusPlate?: string;
  assignedBusNumber?: string;
  assignedRouteName?: string;
  totalTripsCompleted: number;
  qualifications: string[];
  onTimeRatePercent?: number;
  passengerRating?: number;
  attendancePresent?: number;
  attendanceAbsent?: number;
  attendanceLeave?: number;
  overtimeHours?: number;
  safetyMetrics?: DriverSafetyMetrics;
  documents?: DriverDocument[];
}

export interface RouteStop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  scheduledTime: string;
  passengerBoardingAvg: number;
}

export interface Route {
  id: string;
  code: string;
  name: string;
  origin: string;
  destination: string;
  distanceKm: number;
  avgDurationMins: number;
  totalStops: number;
  status: 'active' | 'inactive' | 'modified';
  stops: RouteStop[];
  activeBusesCount: number;
  frequencyMins: number;
  onTimeRatePercent?: number;
  avgDelayMins?: number;
  avgOccupancyPercent?: number;
  dailyPassengers?: number;
  dailyRevenue?: number;
  dailyFuelUsageLitres?: number;
  routeCode?: string;
  routeName?: string;
  estimatedArrival?: string;
}

export type TripStatus = 'in_transit' | 'scheduled' | 'completed' | 'delayed' | 'cancelled';

export interface TripEvent {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  type: 'boarding' | 'departure' | 'delay' | 'stop' | 'incident' | 'completion';
}

export interface Trip {
  id: string;
  routeCode: string;
  routeName: string;
  busNumber: string;
  busId?: string;
  driverName: string;
  driverId?: string;
  departureTime: string;
  arrivalTime: string;
  status: TripStatus;
  passengerCount: number;
  maxCapacity: number;
  etaMins: number;
  currentStop: string;
  progressPercent: number;
  distanceKm?: number;
  delayReason?: string;
  events?: TripEvent[];
}

export interface PassengerTicket {
  id: string;
  passengerName: string;
  busNumber: string;
  routeName: string;
  fromStop: string;
  toStop: string;
  bookingTime: string;
  ticketNumber?: string;
  fareINR?: number;
  date?: string;
  time?: string;
  boardingPoint?: string;

  fareAmount: number;
  seatNumber: string;
  qrCodeToken: string;
  status: 'active' | 'used' | 'cancelled';
}

export type MaintenancePriority = 'critical' | 'high' | 'medium' | 'low';
export type MaintenanceStatus = 'scheduled' | 'in_progress' | 'completed' | 'overdue' | 'on_hold' | 'cancelled';

export interface MaintenanceWorkOrder {
  id: string;
  busId: string;
  busRegistration: string;
  busModel: string;
  issueTitle: string;
  problemDescription: string;
  diagnosticsText: string;
  partsRequired: string[];
  priority: MaintenancePriority;
  status: MaintenanceStatus;
  technicianName: string;
  createdDate: string;
  dueDate: string;
  laborCost: number;
  partsCost: number;
  totalCost: number;
  notes: string;
}

export interface MaintenanceRecord {
  id: string;
  busId: string;
  busRegistration: string;
  busModel: string;
  serviceType: string;
  description: string;
  priority: MaintenancePriority;
  status: MaintenanceStatus;
  dueDate: string;
  estimatedCost: number;
  technicianName: string;
}

export interface FuelRecord {
  id: string;
  busId: string;
  busRegistration: string;
  date: string;
  litres: number;
  cost: number;
  odometerKm: number;
  mileageKmpl: number;
  fuelType: 'Diesel' | 'Electric' | 'CNG';
  stationName: string;
  anomalyDetected?: boolean;
  anomalyReason?: string;
}

export type NotificationCategory = 'critical' | 'maintenance' | 'trip' | 'driver' | 'system' | 'emergency' | 'ai' | 'passenger';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  category: NotificationCategory;
  actionUrl?: string;
}

export interface FleetSummary {
  totalBuses: number;
  activeBuses: number;
  idleBuses: number;
  maintenanceBuses: number;
  emergencyBuses?: number;
  activeDrivers: number;
  todayTrips: number;
  onTimeRatePercent: number;
  totalPassengersToday: number;
  fleetUtilizationPercent: number;
}

// Enterprise Modules Data Interfaces
export interface Depot {
  id: string;
  name: string;
  code: string;
  location: string;
  lat: number;
  lng: number;
  totalCapacity: number;
  busesParked: number;
  availableBays: number;
  maintenanceBays: number;
  fuelAvailabilityL: number;
  activeStaff: number;
  incomingBusesCount: number;
  outgoingBusesCount: number;
  utilizationPercent: number;
}

export interface VehicleInspectionItem {
  id: string;
  name: string;
  category: string;
  status: 'pass' | 'warning' | 'fail';
  isCritical: boolean;
  notes?: string;
}

export interface InspectionReport {
  id: string;
  busId: string;
  busRegistration: string;
  driverId: string;
  driverName: string;
  timestamp: string;
  overallStatus: 'safe' | 'unsafe';
  items: VehicleInspectionItem[];
}

export type IncidentType = 'accident' | 'breakdown' | 'passenger_emergency' | 'driver_emergency' | 'route_blockage' | 'vehicle_failure' | 'medical_emergency';
export type IncidentSeverity = 'low' | 'medium' | 'high' | 'critical';
export type IncidentStatus = 'open' | 'investigating' | 'resolved';

export interface Incident {
  id: string;
  type: IncidentType;
  severity: IncidentSeverity;
  status: IncidentStatus;
  timestamp: string;
  busId: string;
  busRegistration: string;
  driverId: string;
  driverName: string;
  location: string;
  passengerCount: number;
  description: string;
  actionsTaken: string[];
  assignedTeam: string;
  resolutionText?: string;
}

export interface EmergencyEvent {
  id: string;
  incidentId: string;
  busRegistration: string;
  driverName: string;
  driverPhone: string;
  passengerCount: number;
  locationName: string;
  lat: number;
  lng: number;
  nearestDepot: string;
  nearestSupportTeam: string;
  severity: IncidentSeverity;
  timeAgo: string;
  isLocked: boolean;
  actionsLog: string[];
}

export interface ComplianceRecord {
  id: string;
  entityType: 'bus' | 'driver';
  entityId: string;
  entityName: string;
  documentType: string;
  documentNumber: string;
  issueDate: string;
  expiryDate: string;
  status: 'valid' | 'expiring_0_7' | 'expiring_8_30' | 'expiring_31_90' | 'expired';
}

export interface FinancialExpense {
  id: string;
  category: 'Fuel' | 'Maintenance' | 'Driver Payroll' | 'Operations' | 'Parts' | 'Other';
  amount: number;
  budgetAmount: number;
  date: string;
  description: string;
  vendorName: string;
  status: 'paid' | 'pending' | 'approved';
}

export interface RevenueRecord {
  id: string;
  date: string;
  routeCode: string;
  busRegistration: string;
  depotName: string;
  ticketSalesRevenue: number;
  passRevenue: number;
  totalRevenue: number;
  passengerCount: number;
}

export interface Vendor {
  id: string;
  name: string;
  category: 'Fuel' | 'Spare Parts' | 'Maintenance' | 'Technology';
  contactPerson: string;
  phone: string;
  email: string;
  activeContracts: number;
  totalSpend: number;
  performanceRating: number; // 0 - 5
  status: 'active' | 'preferred' | 'under_review';
}

export interface SystemServiceHealth {
  id: string;
  name: string;
  type: 'GPS Telematics' | 'API Gateway' | 'Database' | 'Notifications Engine' | 'Auth Service' | 'Data Synchronization';
  status: 'operational' | 'warning' | 'degraded' | 'offline';
  lastSyncTime: string;
  responseTimeMs: number;
  uptimePercent: number;
}

export interface AuditLogItem {
  id: string;
  userName: string;
  userRole: string;
  timestamp: string;
  module: string;
  action: string;
  entity: string;
  status: 'success' | 'warning' | 'failed';
  ipAddress: string;
}

export interface UserRoleDefinition {
  id: string;
  name: string;
  role: 'Super Admin' | 'Transport Manager' | 'Fleet Manager' | 'Dispatcher' | 'Maintenance Manager' | 'Driver Manager' | 'Finance Manager' | 'Safety Officer' | 'Driver';
  email: string;
  avatar: string;
  permissions: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
    export: boolean;
    approve: boolean;
  };
}

export interface AIRecommendation {
  id: string;
  title: string;
  category: 'Optimization' | 'Maintenance' | 'Safety' | 'Dispatch';
  confidencePercent: number;
  impactText: string;
  description: string;
  actionLabel: string;
  isApplied: boolean;
}
