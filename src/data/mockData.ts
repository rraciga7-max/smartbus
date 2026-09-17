import type { 
  Bus, Driver, Route, Trip, PassengerTicket, MaintenanceRecord, FuelRecord, NotificationItem, FleetSummary,
  Depot, MaintenanceWorkOrder, InspectionReport, Incident, EmergencyEvent, ComplianceRecord,
  FinancialExpense, RevenueRecord, Vendor, SystemServiceHealth, AuditLogItem, UserRoleDefinition, AIRecommendation
} from '../types';

export const initialBuses: Bus[] = [
  {
    id: 'bus-1',
    registrationNumber: 'TN 38 AB 1234',
    model: 'Volvo 9400 B11R',
    capacity: 50,
    currentPassengers: 38,
    status: 'active',
    routeId: 'route-1',
    routeName: 'Route 21A: Gandhipuram ➔ Singanallur',
    driverId: 'drv-1',
    driverName: 'Rajesh K.',
    speedKmH: 42,
    fuelLevelPercent: 78,
    lastServiceDate: '2026-08-15',
    nextServiceDue: '2026-09-15',
    lat: 11.0168,
    lng: 76.9558,
    depotLocation: 'Central Depot - Bay 4',
    healthScore: 94,
    mileageKm: 142850,
    engineHealthPercent: 92,
    brakeHealthPercent: 88,
    tyreHealthPercent: 95,
    batteryLevelPercent: 98,
    gpsStatus: 'connected',
    etaMins: 14,
    lastGpsUpdate: '10 seconds ago'
  },
  {
    id: 'bus-2',
    registrationNumber: 'TN 38 XY 5678',
    model: 'Volvo 9400 B11R',
    capacity: 50,
    currentPassengers: 0,
    status: 'maintenance',
    routeId: 'route-2',
    routeName: 'Route 12D: Peelamedu ➔ Hope College',
    driverId: 'drv-2',
    driverName: 'Senthil M.',
    speedKmH: 0,
    fuelLevelPercent: 35,
    lastServiceDate: '2026-07-20',
    nextServiceDue: '2026-08-30',
    lat: 11.0289,
    lng: 76.9982,
    depotLocation: 'Peelamedu Workshop',
    healthScore: 68,
    mileageKm: 198400,
    engineHealthPercent: 70,
    brakeHealthPercent: 55,
    tyreHealthPercent: 72,
    batteryLevelPercent: 85,
    gpsStatus: 'connected',
    etaMins: 0,
    lastGpsUpdate: '2 mins ago'
  },
  {
    id: 'bus-3',
    registrationNumber: 'TN 38 CD 9012',
    model: 'Scania Metrolink HD',
    capacity: 45,
    currentPassengers: 0,
    status: 'idle',
    routeId: 'route-3',
    routeName: 'Route 45B: Ukkadam ➔ Marudhamalai',
    driverId: 'drv-3',
    driverName: 'Arun Kumar',
    speedKmH: 0,
    fuelLevelPercent: 92,
    lastServiceDate: '2026-08-01',
    nextServiceDue: '2026-09-10',
    lat: 10.9925,
    lng: 76.9614,
    depotLocation: 'Depot 3 (Ukkadam)',
    healthScore: 97,
    mileageKm: 85200,
    engineHealthPercent: 98,
    brakeHealthPercent: 96,
    tyreHealthPercent: 94,
    batteryLevelPercent: 100,
    gpsStatus: 'connected',
    etaMins: 0,
    lastGpsUpdate: '1 min ago'
  },
  {
    id: 'bus-4',
    registrationNumber: 'TN 58 AB 1024',
    model: 'Ashok Leyland Lynx Smart',
    capacity: 40,
    currentPassengers: 28,
    status: 'active',
    routeId: 'route-4',
    routeName: 'Route 7C: RS Puram ➔ Coimbatore Airport',
    driverId: 'drv-4',
    driverName: 'Priya Nair',
    speedKmH: 48,
    fuelLevelPercent: 64,
    lastServiceDate: '2026-08-10',
    nextServiceDue: '2026-09-20',
    lat: 11.0018,
    lng: 76.9535,
    depotLocation: 'Airport Shuttle Hub',
    healthScore: 91,
    mileageKm: 89400,
    engineHealthPercent: 90,
    brakeHealthPercent: 92,
    tyreHealthPercent: 88,
    batteryLevelPercent: 94,
    gpsStatus: 'connected',
    etaMins: 8,
    lastGpsUpdate: '5 seconds ago'
  },
  {
    id: 'bus-5',
    registrationNumber: 'TN 38 EF 3456',
    model: 'Tata Starbus EV 12m',
    capacity: 55,
    currentPassengers: 41,
    status: 'active',
    routeId: 'route-1',
    routeName: 'Route 21A: Gandhipuram ➔ Singanallur',
    driverId: 'drv-5',
    driverName: 'Ramesh V.',
    speedKmH: 36,
    fuelLevelPercent: 85,
    lastServiceDate: '2026-08-22',
    nextServiceDue: '2026-09-25',
    lat: 11.0105,
    lng: 76.9720,
    depotLocation: 'EV Charging Depot A',
    healthScore: 99,
    mileageKm: 42100,
    engineHealthPercent: 100,
    brakeHealthPercent: 98,
    tyreHealthPercent: 96,
    batteryLevelPercent: 85,
    gpsStatus: 'connected',
    etaMins: 22,
    lastGpsUpdate: '8 seconds ago'
  },
  {
    id: 'bus-6',
    registrationNumber: 'TN 38 GH 7890',
    model: 'Eicher Skyline Pro Express',
    capacity: 42,
    currentPassengers: 0,
    status: 'maintenance',
    routeId: 'route-3',
    routeName: 'Route 45B: Ukkadam ➔ Marudhamalai',
    driverId: 'drv-6',
    driverName: 'Suresh P.',
    speedKmH: 0,
    fuelLevelPercent: 20,
    lastServiceDate: '2026-06-15',
    nextServiceDue: '2026-08-28',
    lat: 11.0312,
    lng: 76.9380,
    depotLocation: 'Central Workshop',
    healthScore: 74,
    mileageKm: 165000,
    engineHealthPercent: 78,
    brakeHealthPercent: 70,
    tyreHealthPercent: 75,
    batteryLevelPercent: 80,
    gpsStatus: 'degraded',
    etaMins: 0,
    lastGpsUpdate: '15 mins ago'
  },
  {
    id: 'bus-7',
    registrationNumber: 'TN 59 BC 2048',
    model: 'Volvo 9600 Electric Multi-Axle',
    capacity: 52,
    currentPassengers: 12,
    status: 'emergency',
    routeId: 'route-1',
    routeName: 'Route 21A: Gandhipuram ➔ Singanallur',
    driverId: 'drv-7',
    driverName: 'Vijay Kumar',
    speedKmH: 0,
    fuelLevelPercent: 45,
    lastServiceDate: '2026-08-18',
    nextServiceDue: '2026-09-18',
    lat: 11.0180,
    lng: 76.9680,
    depotLocation: 'Central Depot - Bay 2',
    healthScore: 50,
    mileageKm: 62400,
    engineHealthPercent: 45,
    brakeHealthPercent: 90,
    tyreHealthPercent: 85,
    batteryLevelPercent: 45,
    gpsStatus: 'connected',
    etaMins: 0,
    lastGpsUpdate: 'Just now'
  }
];

export const initialDrivers: Driver[] = [
  {
    id: 'drv-1',
    name: 'Rajesh K.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    licenseNumber: 'TN-38-2015-0048192',
    licenseExpiry: '2028-11-20',
    experienceYears: 9,
    safetyScore: 96,
    phone: '+91 98421 10293',
    email: 'rajesh.k@smartbus360.in',
    joiningDate: '2017-04-12',
    emergencyContact: '+91 98421 99000 (Spouse)',
    status: 'on_duty',
    assignedBusId: 'bus-1',
    assignedBusPlate: 'TN 38 AB 1234',
    assignedRouteName: 'Route 21A: Gandhipuram ➔ Singanallur',
    totalTripsCompleted: 1420,
    onTimeRatePercent: 97.5,
    passengerRating: 4.8,
    attendancePresent: 24,
    attendanceAbsent: 0,
    attendanceLeave: 1,
    overtimeHours: 12,
    qualifications: ['Heavy Passenger Vehicle (HPV)', 'First Aid Certified', 'EV Fleet Specialist'],
    safetyMetrics: {
      overspeedEvents: 1,
      harshBrakingEvents: 2,
      harshAccelerationEvents: 0,
      harshCorneringEvents: 1,
      idleTimeHours: 4.2,
      incidentsCount: 0,
      complaintsCount: 0
    },
    documents: [
      { type: 'Driving License', documentNumber: 'TN-38-2015-0048192', issueDate: '2015-11-20', expiryDate: '2028-11-20', status: 'valid' },
      { type: 'Medical Certificate', documentNumber: 'MED-2026-904', issueDate: '2026-01-10', expiryDate: '2027-01-10', status: 'valid' },
      { type: 'Badge', documentNumber: 'BDG-TN38-142', issueDate: '2020-03-01', expiryDate: '2028-03-01', status: 'valid' }
    ]
  },
  {
    id: 'drv-2',
    name: 'Senthil M.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    licenseNumber: 'TN-38-2012-0091823',
    licenseExpiry: '2027-05-14',
    experienceYears: 12,
    safetyScore: 91,
    phone: '+91 97892 44321',
    email: 'senthil.m@smartbus360.in',
    joiningDate: '2015-02-01',
    emergencyContact: '+91 97892 11111 (Brother)',
    status: 'on_break',
    assignedBusId: 'bus-2',
    assignedBusPlate: 'TN 38 XY 5678',
    assignedRouteName: 'Route 12D: Peelamedu ➔ Hope College',
    totalTripsCompleted: 2150,
    onTimeRatePercent: 92.1,
    passengerRating: 4.5,
    attendancePresent: 22,
    attendanceAbsent: 1,
    attendanceLeave: 2,
    overtimeHours: 6,
    qualifications: ['Heavy Goods & Passenger', 'Defensive Driving Master', 'Volvo Certified'],
    safetyMetrics: {
      overspeedEvents: 4,
      harshBrakingEvents: 6,
      harshAccelerationEvents: 3,
      harshCorneringEvents: 2,
      idleTimeHours: 8.5,
      incidentsCount: 1,
      complaintsCount: 1
    },
    documents: [
      { type: 'Driving License', documentNumber: 'TN-38-2012-0091823', issueDate: '2012-05-14', expiryDate: '2027-05-14', status: 'valid' },
      { type: 'Medical Certificate', documentNumber: 'MED-2025-110', issueDate: '2025-09-01', expiryDate: '2026-09-05', status: 'expiring_soon' }
    ]
  },
  {
    id: 'drv-3',
    name: 'Arun Kumar',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    licenseNumber: 'TN-58-2018-0012984',
    licenseExpiry: '2029-09-30',
    experienceYears: 7,
    safetyScore: 98,
    phone: '+91 94433 88120',
    email: 'arun.kumar@smartbus360.in',
    joiningDate: '2019-08-15',
    emergencyContact: '+91 94433 00011 (Father)',
    status: 'off_duty',
    assignedBusId: 'bus-3',
    assignedBusPlate: 'TN 38 CD 9012',
    assignedRouteName: 'Route 45B: Ukkadam ➔ Marudhamalai',
    totalTripsCompleted: 980,
    onTimeRatePercent: 99.0,
    passengerRating: 4.9,
    attendancePresent: 25,
    attendanceAbsent: 0,
    attendanceLeave: 0,
    overtimeHours: 15,
    qualifications: ['Intercity Coach Expert', 'Passenger Safety Level 2'],
    safetyMetrics: {
      overspeedEvents: 0,
      harshBrakingEvents: 1,
      harshAccelerationEvents: 0,
      harshCorneringEvents: 0,
      idleTimeHours: 2.1,
      incidentsCount: 0,
      complaintsCount: 0
    },
    documents: [
      { type: 'Driving License', documentNumber: 'TN-58-2018-0012984', issueDate: '2018-09-30', expiryDate: '2029-09-30', status: 'valid' }
    ]
  },
  {
    id: 'drv-4',
    name: 'Priya Nair',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    licenseNumber: 'TN-38-2019-0056123',
    licenseExpiry: '2030-01-15',
    experienceYears: 6,
    safetyScore: 99,
    phone: '+91 96001 22934',
    email: 'priya.nair@smartbus360.in',
    joiningDate: '2020-01-10',
    emergencyContact: '+91 96001 77889 (Mother)',
    status: 'on_duty',
    assignedBusId: 'bus-4',
    assignedBusPlate: 'TN 58 AB 1024',
    assignedRouteName: 'Route 7C: RS Puram ➔ Coimbatore Airport',
    totalTripsCompleted: 850,
    onTimeRatePercent: 98.4,
    passengerRating: 4.9,
    attendancePresent: 25,
    attendanceAbsent: 0,
    attendanceLeave: 0,
    overtimeHours: 8,
    qualifications: ['Airport Shuttle Specialist', 'Customer Care Excellence', 'Eco-Driving Certified'],
    safetyMetrics: {
      overspeedEvents: 0,
      harshBrakingEvents: 0,
      harshAccelerationEvents: 0,
      harshCorneringEvents: 0,
      idleTimeHours: 1.8,
      incidentsCount: 0,
      complaintsCount: 0
    },
    documents: [
      { type: 'Driving License', documentNumber: 'TN-38-2019-0056123', issueDate: '2019-01-15', expiryDate: '2030-01-15', status: 'valid' }
    ]
  },
  {
    id: 'drv-5',
    name: 'Ramesh V.',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
    licenseNumber: 'TN-38-2014-0033219',
    licenseExpiry: '2026-12-10',
    experienceYears: 10,
    safetyScore: 94,
    phone: '+91 98940 77612',
    email: 'ramesh.v@smartbus360.in',
    joiningDate: '2016-06-20',
    emergencyContact: '+91 98940 55443 (Wife)',
    status: 'on_duty',
    assignedBusId: 'bus-5',
    assignedBusPlate: 'TN 38 EF 3456',
    assignedRouteName: 'Route 21A: Gandhipuram ➔ Singanallur',
    totalTripsCompleted: 1650,
    onTimeRatePercent: 95.8,
    passengerRating: 4.7,
    attendancePresent: 23,
    attendanceAbsent: 1,
    attendanceLeave: 1,
    overtimeHours: 10,
    qualifications: ['EV Fleet Specialist', 'First Aid Certified'],
    safetyMetrics: {
      overspeedEvents: 2,
      harshBrakingEvents: 3,
      harshAccelerationEvents: 1,
      harshCorneringEvents: 1,
      idleTimeHours: 3.5,
      incidentsCount: 0,
      complaintsCount: 0
    },
    documents: [
      { type: 'Driving License', documentNumber: 'TN-38-2014-0033219', issueDate: '2014-12-10', expiryDate: '2026-12-10', status: 'expiring_soon' }
    ]
  },
  {
    id: 'drv-7',
    name: 'Vijay Kumar',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
    licenseNumber: 'TN-59-2017-0099411',
    licenseExpiry: '2028-04-10',
    experienceYears: 8,
    safetyScore: 84,
    phone: '+91 95001 88234',
    email: 'vijay.k@smartbus360.in',
    joiningDate: '2018-03-12',
    emergencyContact: '+91 95001 11223 (Brother)',
    status: 'on_duty',
    assignedBusId: 'bus-7',
    assignedBusPlate: 'TN 59 BC 2048',
    assignedRouteName: 'Route 21A: Gandhipuram ➔ Singanallur',
    totalTripsCompleted: 1120,
    onTimeRatePercent: 88.5,
    passengerRating: 4.2,
    attendancePresent: 21,
    attendanceAbsent: 2,
    attendanceLeave: 2,
    overtimeHours: 4,
    qualifications: ['Heavy Vehicle Specialist'],
    safetyMetrics: {
      overspeedEvents: 7,
      harshBrakingEvents: 8,
      harshAccelerationEvents: 5,
      harshCorneringEvents: 4,
      idleTimeHours: 12.0,
      incidentsCount: 2,
      complaintsCount: 2
    },
    documents: [
      { type: 'Driving License', documentNumber: 'TN-59-2017-0099411', issueDate: '2017-04-10', expiryDate: '2028-04-10', status: 'valid' }
    ]
  }
];

export const initialRoutes: Route[] = [
  {
    id: 'route-1',
    code: '21A',
    name: 'Gandhipuram ➔ Singanallur Transit Line',
    origin: 'Gandhipuram Central Bus Stand',
    destination: 'Singanallur Bus Terminal',
    distanceKm: 14.8,
    avgDurationMins: 42,
    totalStops: 12,
    status: 'active',
    activeBusesCount: 3,
    frequencyMins: 10,
    onTimeRatePercent: 95.2,
    avgDelayMins: 2.5,
    avgOccupancyPercent: 82,
    dailyPassengers: 8450,
    dailyRevenue: 295750,
    dailyFuelUsageLitres: 340,
    stops: [
      { id: 'st-1', name: 'Gandhipuram Stand', lat: 11.0168, lng: 76.9558, scheduledTime: '08:00', passengerBoardingAvg: 45 },
      { id: 'st-2', name: 'Lakshmi Complex', lat: 11.0150, lng: 76.9620, scheduledTime: '08:06', passengerBoardingAvg: 20 },
      { id: 'st-3', name: 'Nava India', lat: 11.0120, lng: 76.9750, scheduledTime: '08:14', passengerBoardingAvg: 30 },
      { id: 'st-4', name: 'Peelamedu Signal', lat: 11.0250, lng: 76.9950, scheduledTime: '08:26', passengerBoardingAvg: 25 },
      { id: 'st-5', name: 'Singanallur Terminal', lat: 10.9980, lng: 77.0250, scheduledTime: '08:42', passengerBoardingAvg: 50 }
    ]
  },
  {
    id: 'route-2',
    code: '12D',
    name: 'Peelamedu ➔ Hope College Connector',
    origin: 'Peelamedu Tech Park',
    destination: 'Hope College Junction',
    distanceKm: 9.5,
    avgDurationMins: 28,
    totalStops: 8,
    status: 'active',
    activeBusesCount: 1,
    frequencyMins: 15,
    onTimeRatePercent: 91.0,
    avgDelayMins: 4.1,
    avgOccupancyPercent: 68,
    dailyPassengers: 4200,
    dailyRevenue: 147000,
    dailyFuelUsageLitres: 190,
    stops: [
      { id: 'st-6', name: 'Peelamedu Tech Park', lat: 11.0289, lng: 76.9982, scheduledTime: '09:00', passengerBoardingAvg: 35 },
      { id: 'st-7', name: 'TIDEL Park Coimbatore', lat: 11.0270, lng: 77.0020, scheduledTime: '09:08', passengerBoardingAvg: 40 },
      { id: 'st-8', name: 'Hope College Junction', lat: 11.0320, lng: 77.0120, scheduledTime: '09:28', passengerBoardingAvg: 15 }
    ]
  },
  {
    id: 'route-3',
    code: '45B',
    name: 'Ukkadam ➔ Marudhamalai Express',
    origin: 'Ukkadam Bus Stand',
    destination: 'Marudhamalai Temple Foothills',
    distanceKm: 18.2,
    avgDurationMins: 55,
    totalStops: 16,
    status: 'active',
    activeBusesCount: 1,
    frequencyMins: 20,
    onTimeRatePercent: 97.8,
    avgDelayMins: 1.2,
    avgOccupancyPercent: 88,
    dailyPassengers: 6100,
    dailyRevenue: 244000,
    dailyFuelUsageLitres: 280,
    stops: [
      { id: 'st-9', name: 'Ukkadam Stand', lat: 10.9925, lng: 76.9614, scheduledTime: '07:30', passengerBoardingAvg: 60 },
      { id: 'st-10', name: 'Lawley Road Junction', lat: 11.0110, lng: 76.9420, scheduledTime: '07:48', passengerBoardingAvg: 22 },
      { id: 'st-11', name: 'Vadavalli Bus Stop', lat: 11.0220, lng: 76.9100, scheduledTime: '08:05', passengerBoardingAvg: 30 },
      { id: 'st-12', name: 'Marudhamalai Foothills', lat: 11.0450, lng: 76.8700, scheduledTime: '08:25', passengerBoardingAvg: 45 }
    ]
  },
  {
    id: 'route-4',
    code: '7C',
    name: 'RS Puram ➔ Airport Express Shuttle',
    origin: 'RS Puram Head Post Office',
    destination: 'Coimbatore International Airport',
    distanceKm: 12.0,
    avgDurationMins: 35,
    totalStops: 7,
    status: 'active',
    activeBusesCount: 1,
    frequencyMins: 30,
    onTimeRatePercent: 98.6,
    avgDelayMins: 0.8,
    avgOccupancyPercent: 74,
    dailyPassengers: 2800,
    dailyRevenue: 140000,
    dailyFuelUsageLitres: 160,
    stops: [
      { id: 'st-13', name: 'RS Puram Post Office', lat: 11.0018, lng: 76.9535, scheduledTime: '10:00', passengerBoardingAvg: 20 },
      { id: 'st-14', name: 'Coimbatore Junction Railway Station', lat: 10.9980, lng: 76.9660, scheduledTime: '10:12', passengerBoardingAvg: 35 },
      { id: 'st-15', name: 'Airport Passenger Terminal', lat: 11.0300, lng: 77.0430, scheduledTime: '10:35', passengerBoardingAvg: 18 }
    ]
  }
];

export const initialTrips: Trip[] = [
  {
    id: 'trp-101',
    routeCode: '21A',
    routeName: 'Gandhipuram ➔ Singanallur',
    busNumber: 'TN 38 AB 1234',
    busId: 'bus-1',
    driverName: 'Rajesh K.',
    driverId: 'drv-1',
    departureTime: '08:00 AM',
    arrivalTime: '08:42 AM',
    status: 'in_transit',
    passengerCount: 38,
    maxCapacity: 50,
    etaMins: 14,
    currentStop: 'Nava India Signal',
    progressPercent: 62,
    distanceKm: 14.8,
    events: [
      { id: 'ev-1', timestamp: '08:00 AM', title: 'Boarding Completed', description: '38 passengers boarded at Gandhipuram Stand', type: 'boarding' },
      { id: 'ev-2', timestamp: '08:02 AM', title: 'Departed Depot', description: 'Bus left on time', type: 'departure' },
      { id: 'ev-3', timestamp: '08:14 AM', title: 'Arrived at Stop 3', description: 'Nava India signal stop reached', type: 'stop' }
    ]
  },
  {
    id: 'trp-102',
    routeCode: '7C',
    routeName: 'RS Puram ➔ Airport',
    busNumber: 'TN 58 AB 1024',
    busId: 'bus-4',
    driverName: 'Priya Nair',
    driverId: 'drv-4',
    departureTime: '08:15 AM',
    arrivalTime: '08:50 AM',
    status: 'in_transit',
    passengerCount: 28,
    maxCapacity: 40,
    etaMins: 8,
    currentStop: 'Railway Station Gate 2',
    progressPercent: 78,
    distanceKm: 12.0,
    events: [
      { id: 'ev-4', timestamp: '08:15 AM', title: 'Departed RS Puram', description: 'On-time departure with 28 passengers', type: 'departure' }
    ]
  },
  {
    id: 'trp-103',
    routeCode: '21A',
    routeName: 'Gandhipuram ➔ Singanallur',
    busNumber: 'TN 38 EF 3456',
    busId: 'bus-5',
    driverName: 'Ramesh V.',
    driverId: 'drv-5',
    departureTime: '08:30 AM',
    arrivalTime: '09:12 AM',
    status: 'scheduled',
    passengerCount: 41,
    maxCapacity: 55,
    etaMins: 42,
    currentStop: 'Gandhipuram Stand (Boarding)',
    progressPercent: 5,
    distanceKm: 14.8
  },
  {
    id: 'trp-104',
    routeCode: '45B',
    routeName: 'Ukkadam ➔ Marudhamalai',
    busNumber: 'TN 38 CD 9012',
    busId: 'bus-3',
    driverName: 'Arun Kumar',
    driverId: 'drv-3',
    departureTime: '07:30 AM',
    arrivalTime: '08:25 AM',
    status: 'completed',
    passengerCount: 45,
    maxCapacity: 45,
    etaMins: 0,
    currentStop: 'Marudhamalai Terminal',
    progressPercent: 100,
    distanceKm: 18.2
  },
  {
    id: 'trp-105',
    routeCode: '21A',
    routeName: 'Gandhipuram ➔ Singanallur',
    busNumber: 'TN 59 BC 2048',
    busId: 'bus-7',
    driverName: 'Vijay Kumar',
    driverId: 'drv-7',
    departureTime: '08:05 AM',
    arrivalTime: '08:47 AM',
    status: 'delayed',
    passengerCount: 12,
    maxCapacity: 52,
    etaMins: 35,
    currentStop: 'Lakshmi Complex',
    progressPercent: 20,
    distanceKm: 14.8,
    delayReason: 'Engine overheating warning triggered'
  }
];

export const initialMaintenanceWorkOrders: MaintenanceWorkOrder[] = [
  {
    id: 'wo-101',
    busId: 'bus-2',
    busRegistration: 'TN 38 XY 5678',
    busModel: 'Volvo 9400 B11R',
    issueTitle: 'Brake System Overhaul',
    problemDescription: 'Driver reported soft brake pedal feel during night shift. Hydraulic pressure test failed below 120 PSI.',
    diagnosticsText: 'Brake pads worn down to 2mm limit. Hydraulic line fluid leaking near rear right caliper assembly.',
    partsRequired: ['Volvo Heavy Duty Brake Pads Set', 'Hydraulic Fluid DOT4 5L', 'Caliper Seal Kit'],
    priority: 'high',
    status: 'in_progress',
    technicianName: 'Karthik S. (Master Tech)',
    createdDate: '2026-08-30',
    dueDate: '2026-09-01',
    laborCost: 4500,
    partsCost: 10000,
    totalCost: 14500,
    notes: 'Parts received from TVS Auto Components. Reassembly in progress at Bay 3.'
  },
  {
    id: 'wo-102',
    busId: 'bus-6',
    busRegistration: 'TN 38 GH 7890',
    busModel: 'Eicher Skyline Pro',
    issueTitle: 'Engine Diagnostics & 15K Service',
    problemDescription: 'Scheduled 15,000 km oil filter change, fuel filter cleaning, ECU scanner reset.',
    diagnosticsText: 'Routine inspection due. Engine oil viscosity degraded by 30%. Air filter clogged.',
    partsRequired: ['Engine Oil 15W-40 18L', 'Fuel Filter Element', 'Air Filter Cartridge'],
    priority: 'medium',
    status: 'scheduled',
    technicianName: 'Mani Service Center',
    createdDate: '2026-08-28',
    dueDate: '2026-09-03',
    laborCost: 2200,
    partsCost: 6000,
    totalCost: 8200,
    notes: 'Vehicle scheduled to enter garage after evening shift.'
  },
  {
    id: 'wo-103',
    busId: 'bus-7',
    busRegistration: 'TN 59 BC 2048',
    busModel: 'Volvo 9600 Electric',
    issueTitle: 'HV Battery Cooling Pump Alert',
    problemDescription: 'Thermal sensor warning triggered on Battery Pack 2. Coolant pressure low.',
    diagnosticsText: 'Coolant pump flow sensor intermittent connection.',
    partsRequired: ['EV Coolant Pump Harness', 'Deionized EV Coolant 10L'],
    priority: 'critical',
    status: 'scheduled',
    technicianName: 'Coimbatore EV Specialist Hub',
    createdDate: '2026-09-01',
    dueDate: '2026-09-01',
    laborCost: 5000,
    partsCost: 12500,
    totalCost: 17500,
    notes: 'URGENT: Vehicle pulled from active trip to prevent thermal trip.'
  }
];

export const initialMaintenanceRecords: MaintenanceRecord[] = [
  {
    id: 'mnt-1',
    busId: 'bus-2',
    busRegistration: 'TN 38 XY 5678',
    busModel: 'Volvo 9400 B11R',
    serviceType: 'Brake System Overhaul',
    description: 'Driver reported soft brake pedal feel during night shift. Full brake pad replacement & hydraulic fluid flush required.',
    priority: 'high',
    status: 'in_progress',
    dueDate: '2026-09-01',
    estimatedCost: 14500,
    technicianName: 'Karthik S. (Master Tech)'
  },
  {
    id: 'mnt-2',
    busId: 'bus-6',
    busRegistration: 'TN 38 GH 7890',
    busModel: 'Eicher Skyline Pro',
    serviceType: 'Engine Diagnostics & Oil Change',
    description: 'Scheduled 15,000 km oil filter change, fuel filter cleaning, and ECU scan.',
    priority: 'medium',
    status: 'scheduled',
    dueDate: '2026-09-03',
    estimatedCost: 8200,
    technicianName: 'Mani Service Center'
  },
  {
    id: 'mnt-3',
    busId: 'bus-1',
    busRegistration: 'TN 38 AB 1234',
    busModel: 'Volvo 9400 B11R',
    serviceType: 'AC Compressor Inspection',
    description: 'Routine air conditioning filter cleaning and refrigerant pressure check.',
    priority: 'low',
    status: 'scheduled',
    dueDate: '2026-09-15',
    estimatedCost: 3500,
    technicianName: 'CoolingTech India'
  }
];

export const initialFuelRecords: FuelRecord[] = [
  {
    id: 'fuel-1',
    busId: 'bus-1',
    busRegistration: 'TN 38 AB 1234',
    date: '2026-08-31',
    litres: 120,
    cost: 11400,
    odometerKm: 142850,
    mileageKmpl: 4.6,
    fuelType: 'Diesel',
    stationName: 'IOCL Fuel Station - Gandhipuram'
  },
  {
    id: 'fuel-2',
    busId: 'bus-4',
    busRegistration: 'TN 58 AB 1024',
    date: '2026-08-30',
    litres: 95,
    cost: 9025,
    odometerKm: 89400,
    mileageKmpl: 5.1,
    fuelType: 'Diesel',
    stationName: 'HP Petrol Bunk - RS Puram',
    anomalyDetected: true,
    anomalyReason: 'Fuel usage is 19% higher than expected average due to high idling in traffic.'
  },
  {
    id: 'fuel-3',
    busId: 'bus-5',
    busRegistration: 'TN 38 EF 3456',
    date: '2026-08-30',
    litres: 180,
    cost: 1620,
    odometerKm: 42100,
    mileageKmpl: 1.2,
    fuelType: 'Electric',
    stationName: 'Coimbatore Smart City Fast Charging Hub'
  }
];

export const initialTickets: PassengerTicket[] = [
  {
    id: 'tkt-88192',
    passengerName: 'Ananya Ramakrishnan',
    busNumber: 'TN 38 AB 1234',
    routeName: 'Route 21A: Gandhipuram ➔ Singanallur',
    fromStop: 'Gandhipuram Stand',
    toStop: 'Singanallur Terminal',
    bookingTime: '08:02 AM, Aug 31',
    fareAmount: 35,
    seatNumber: 'Seat 14B',
    qrCodeToken: 'SMARTBUS360-TKT-88192-21A',
    status: 'active'
  },
  {
    id: 'tkt-88193',
    passengerName: 'Vikram Sundaram',
    busNumber: 'TN 58 AB 1024',
    routeName: 'Route 7C: RS Puram ➔ Airport',
    fromStop: 'RS Puram Post Office',
    toStop: 'Airport Terminal',
    bookingTime: '08:10 AM, Aug 31',
    fareAmount: 50,
    seatNumber: 'Seat 04A',
    qrCodeToken: 'SMARTBUS360-TKT-88193-7C',
    status: 'active'
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'EMERGENCY: Vehicle Overheating Alert',
    message: 'Bus TN 59 BC 2048 reported engine thermal warning on Route 21A near Lakshmi Complex.',
    timestamp: '5 mins ago',
    read: false,
    category: 'emergency',
    actionUrl: '/emergency'
  },
  {
    id: 'notif-2',
    title: 'High Priority Maintenance Required',
    message: 'Bus TN 38 XY 5678 reported brake pad softness. Work Order WO-101 assigned at Peelamedu Workshop.',
    timestamp: '25 mins ago',
    read: false,
    category: 'maintenance',
    actionUrl: '/maintenance'
  },
  {
    id: 'notif-3',
    title: 'Driver License Expiry Alert',
    message: 'Driver Ramesh V. license (TN-38-2014-0033219) will expire in 90 days. Renewal document pending.',
    timestamp: '1 hour ago',
    read: false,
    category: 'driver',
    actionUrl: '/compliance'
  },
  {
    id: 'notif-4',
    title: 'Route 21A AI Optimization Suggested',
    message: 'AI Optimizer detected 24% passenger demand spike expected between 08:00 - 09:00. Additional bus deployment recommended.',
    timestamp: '2 hours ago',
    read: true,
    category: 'ai',
    actionUrl: '/demand-forecasting'
  }
];

export const initialDepots: Depot[] = [
  {
    id: 'dep-1',
    name: 'Central Depot & HQ',
    code: 'DEP-HQ-01',
    location: 'Gandhipuram, Coimbatore',
    lat: 11.0168,
    lng: 76.9558,
    totalCapacity: 60,
    busesParked: 42,
    availableBays: 18,
    maintenanceBays: 6,
    fuelAvailabilityL: 45000,
    activeStaff: 38,
    incomingBusesCount: 5,
    outgoingBusesCount: 8,
    utilizationPercent: 70
  },
  {
    id: 'dep-2',
    name: 'Ukkadam Terminal Depot',
    code: 'DEP-UK-02',
    location: 'Ukkadam, Coimbatore',
    lat: 10.9925,
    lng: 76.9614,
    totalCapacity: 40,
    busesParked: 32,
    availableBays: 8,
    maintenanceBays: 4,
    fuelAvailabilityL: 32000,
    activeStaff: 24,
    incomingBusesCount: 3,
    outgoingBusesCount: 4,
    utilizationPercent: 80
  },
  {
    id: 'dep-3',
    name: 'Peelamedu Tech Hub Depot',
    code: 'DEP-PL-03',
    location: 'Peelamedu, Coimbatore',
    lat: 11.0289,
    lng: 76.9982,
    totalCapacity: 35,
    busesParked: 28,
    availableBays: 7,
    maintenanceBays: 5,
    fuelAvailabilityL: 28000,
    activeStaff: 20,
    incomingBusesCount: 2,
    outgoingBusesCount: 6,
    utilizationPercent: 80
  },
  {
    id: 'dep-4',
    name: 'Airport EV Charging Hub',
    code: 'DEP-EV-04',
    location: 'Coimbatore Airport Road',
    lat: 11.0300,
    lng: 77.0430,
    totalCapacity: 25,
    busesParked: 16,
    availableBays: 9,
    maintenanceBays: 3,
    fuelAvailabilityL: 1200, // EV Charging capacity index
    activeStaff: 15,
    incomingBusesCount: 1,
    outgoingBusesCount: 3,
    utilizationPercent: 64
  }
];

export const initialInspectionReports: InspectionReport[] = [
  {
    id: 'insp-201',
    busId: 'bus-1',
    busRegistration: 'TN 38 AB 1234',
    driverId: 'drv-1',
    driverName: 'Rajesh K.',
    timestamp: '2026-09-01 07:15 AM',
    overallStatus: 'safe',
    items: [
      { id: 'i-1', name: 'Brake System & Fluids', category: 'Safety', status: 'pass', isCritical: true },
      { id: 'i-2', name: 'Tyre Pressure & Tread Depth', category: 'Wheels', status: 'pass', isCritical: true },
      { id: 'i-3', name: 'Headlights & Turn Indicators', category: 'Electrical', status: 'pass', isCritical: false },
      { id: 'i-4', name: 'Engine Oil & Coolant Level', category: 'Engine', status: 'pass', isCritical: true },
      { id: 'i-5', name: 'Emergency Door & Hammer', category: 'Safety', status: 'pass', isCritical: true },
      { id: 'i-6', name: 'Fire Extinguisher Charge', category: 'Safety', status: 'pass', isCritical: true },
      { id: 'i-7', name: 'First Aid Kit Completeness', category: 'Safety', status: 'pass', isCritical: false },
      { id: 'i-8', name: 'GPS Telematics Transponder', category: 'Electronics', status: 'pass', isCritical: true },
      { id: 'i-9', name: 'Cabin AC System & Vents', category: 'Comfort', status: 'pass', isCritical: false }
    ]
  },
  {
    id: 'insp-202',
    busId: 'bus-7',
    busRegistration: 'TN 59 BC 2048',
    driverId: 'drv-7',
    driverName: 'Vijay Kumar',
    timestamp: '2026-09-01 07:45 AM',
    overallStatus: 'unsafe',
    items: [
      { id: 'i-10', name: 'Brake System & Fluids', category: 'Safety', status: 'pass', isCritical: true },
      { id: 'i-11', name: 'Engine Oil & Coolant Level', category: 'Engine', status: 'fail', isCritical: true, notes: 'Coolant temperature warning light active during initial start.' },
      { id: 'i-12', name: 'GPS Telematics Transponder', category: 'Electronics', status: 'warning', isCritical: false }
    ]
  }
];

export const initialIncidents: Incident[] = [
  {
    id: 'inc-901',
    type: 'breakdown',
    severity: 'critical',
    status: 'investigating',
    timestamp: '2026-09-01 08:18 AM',
    busId: 'bus-7',
    busRegistration: 'TN 59 BC 2048',
    driverId: 'drv-7',
    driverName: 'Vijay Kumar',
    location: 'Lakshmi Complex Junction, Gandhipuram',
    passengerCount: 12,
    description: 'Electric bus experienced sudden HV battery coolant warning and safe shutdown protocol on Route 21A.',
    actionsTaken: ['Driver instructed passengers to safely wait at stop', 'Control room dispatched replacement bus TN 38 EF 3456', 'Tow truck dispatched from Central Depot'],
    assignedTeam: 'Rapid Emergency Response Unit 1',
    resolutionText: 'Replacement bus arrived at 08:24 AM. Passengers transferred seamlessly.'
  },
  {
    id: 'inc-902',
    type: 'route_blockage',
    severity: 'medium',
    status: 'resolved',
    timestamp: '2026-08-31 05:30 PM',
    busId: 'bus-4',
    busRegistration: 'TN 58 AB 1024',
    driverId: 'drv-4',
    driverName: 'Priya Nair',
    location: 'Railway Station Flyover',
    passengerCount: 34,
    description: 'Heavy traffic blockage due to stalled private lorry on flyover lane.',
    actionsTaken: ['Dispatcher rerouted via Avinashi Road underpass', 'Passenger ETA updated via app notification'],
    assignedTeam: 'Traffic Control Room Liaison',
    resolutionText: 'Rerouting saved 18 minutes delay.'
  }
];

export const initialEmergencies: EmergencyEvent[] = [
  {
    id: 'em-01',
    incidentId: 'inc-901',
    busRegistration: 'TN 59 BC 2048',
    driverName: 'Vijay Kumar',
    driverPhone: '+91 95001 88234',
    passengerCount: 12,
    locationName: 'Lakshmi Complex Junction (Route 21A)',
    lat: 11.0150,
    lng: 76.9620,
    nearestDepot: 'Central Depot & HQ (1.2 km away)',
    nearestSupportTeam: 'Mobile EV Support Team Alpha',
    severity: 'critical',
    timeAgo: '12 mins ago',
    isLocked: false,
    actionsLog: [
      '08:18 AM - SOS Telematics signal triggered by vehicle ECU',
      '08:19 AM - Dispatcher established voice link with driver Vijay Kumar',
      '08:21 AM - Replacement bus TN 38 EF 3456 dispatched'
    ]
  }
];

export const initialComplianceRecords: ComplianceRecord[] = [
  {
    id: 'cmp-1',
    entityType: 'bus',
    entityId: 'bus-1',
    entityName: 'TN 38 AB 1234 (Volvo 9400)',
    documentType: 'Fitness Certificate',
    documentNumber: 'FC-TN38-2025-901',
    issueDate: '2025-10-01',
    expiryDate: '2026-10-01',
    status: 'valid'
  },
  {
    id: 'cmp-2',
    entityType: 'bus',
    entityId: 'bus-2',
    entityName: 'TN 38 XY 5678 (Volvo 9400)',
    documentType: 'Pollution Certificate (PUC)',
    documentNumber: 'PUC-2026-8812',
    issueDate: '2026-03-05',
    expiryDate: '2026-09-05',
    status: 'expiring_0_7'
  },
  {
    id: 'cmp-3',
    entityType: 'driver',
    entityId: 'drv-5',
    entityName: 'Ramesh V. (Driver)',
    documentType: 'Driving License',
    documentNumber: 'TN-38-2014-0033219',
    issueDate: '2014-12-10',
    expiryDate: '2026-12-10',
    status: 'expiring_31_90'
  },
  {
    id: 'cmp-4',
    entityType: 'bus',
    entityId: 'bus-6',
    entityName: 'TN 38 GH 7890 (Eicher Skyline)',
    documentType: 'Passenger Transport Permit',
    documentNumber: 'PERMIT-TN-2021-44',
    issueDate: '2021-08-15',
    expiryDate: '2026-08-15',
    status: 'expired'
  }
];

export const initialExpenses: FinancialExpense[] = [
  {
    id: 'exp-501',
    category: 'Fuel',
    amount: 142000,
    budgetAmount: 150000,
    date: '2026-08-31',
    description: 'Bulk Diesel Refill - Indian Oil Corporation (1,500L)',
    vendorName: 'Indian Oil Corporation Ltd',
    status: 'paid'
  },
  {
    id: 'exp-502',
    category: 'Maintenance',
    amount: 22700,
    budgetAmount: 20000,
    date: '2026-08-30',
    description: 'Volvo Brake Overhaul Spare Parts & Fluid Supply',
    vendorName: 'TVS Auto Components',
    status: 'approved'
  },
  {
    id: 'exp-503',
    category: 'Driver Payroll',
    amount: 485000,
    budgetAmount: 480000,
    date: '2026-08-31',
    description: 'Monthly Driver & Crew Salary Disbursement (52 drivers)',
    vendorName: 'CityTransit Payroll Corp',
    status: 'paid'
  }
];

export const initialRevenues: RevenueRecord[] = [
  {
    id: 'rev-1',
    date: '2026-08-31',
    routeCode: '21A',
    busRegistration: 'TN 38 AB 1234',
    depotName: 'Central Depot & HQ',
    ticketSalesRevenue: 24500,
    passRevenue: 5075,
    totalRevenue: 29575,
    passengerCount: 845
  },
  {
    id: 'rev-2',
    date: '2026-08-31',
    routeCode: '45B',
    busRegistration: 'TN 38 CD 9012',
    depotName: 'Ukkadam Terminal Depot',
    ticketSalesRevenue: 19800,
    passRevenue: 4600,
    totalRevenue: 24400,
    passengerCount: 610
  },
  {
    id: 'rev-3',
    date: '2026-08-31',
    routeCode: '7C',
    busRegistration: 'TN 58 AB 1024',
    depotName: 'Airport EV Charging Hub',
    ticketSalesRevenue: 12000,
    passRevenue: 2000,
    totalRevenue: 14000,
    passengerCount: 280
  }
];

export const initialVendors: Vendor[] = [
  {
    id: 'vnd-1',
    name: 'Indian Oil Corporation Ltd (IOCL)',
    category: 'Fuel',
    contactPerson: 'S. Ramanathan (Sales Manager)',
    phone: '+91 94440 12345',
    email: 'commercial@iocl.co.in',
    activeContracts: 2,
    totalSpend: 1450000,
    performanceRating: 4.8,
    status: 'preferred'
  },
  {
    id: 'vnd-2',
    name: 'TVS Auto Components & Spares',
    category: 'Spare Parts',
    contactPerson: 'M. Loganathan',
    phone: '+91 98430 99887',
    email: 'spares.cbe@tvs.in',
    activeContracts: 1,
    totalSpend: 380000,
    performanceRating: 4.6,
    status: 'active'
  },
  {
    id: 'vnd-3',
    name: 'Coimbatore EV Specialist Hub',
    category: 'Maintenance',
    contactPerson: 'Dr. K. Arul',
    phone: '+91 97888 22110',
    email: 'service@cbe-ev.com',
    activeContracts: 1,
    totalSpend: 290000,
    performanceRating: 4.9,
    status: 'preferred'
  }
];

export const initialSystemHealth: SystemServiceHealth[] = [
  {
    id: 'sys-1',
    name: 'GPS Telematics Gateway',
    type: 'GPS Telematics',
    status: 'operational',
    lastSyncTime: '2 seconds ago',
    responseTimeMs: 24,
    uptimePercent: 99.98
  },
  {
    id: 'sys-2',
    name: 'Core Operations REST API',
    type: 'API Gateway',
    status: 'operational',
    lastSyncTime: 'Just now',
    responseTimeMs: 45,
    uptimePercent: 99.95
  },
  {
    id: 'sys-3',
    name: 'Fleet Realtime Database',
    type: 'Database',
    status: 'operational',
    lastSyncTime: 'Just now',
    responseTimeMs: 12,
    uptimePercent: 99.99
  },
  {
    id: 'sys-4',
    name: 'Push Notification Engine',
    type: 'Notifications Engine',
    status: 'operational',
    lastSyncTime: '10 seconds ago',
    responseTimeMs: 60,
    uptimePercent: 99.90
  },
  {
    id: 'sys-5',
    name: 'Enterprise Auth & RBAC',
    type: 'Auth Service',
    status: 'operational',
    lastSyncTime: '1 min ago',
    responseTimeMs: 30,
    uptimePercent: 100.0
  }
];

export const initialAuditLogs: AuditLogItem[] = [
  {
    id: 'aud-1001',
    userName: 'Admin Executive',
    userRole: 'Super Admin',
    timestamp: '2026-09-01 08:21 AM',
    module: 'Emergency Center',
    action: 'Dispatched Support Vehicle',
    entity: 'Bus TN 38 EF 3456 -> TN 59 BC 2048',
    status: 'success',
    ipAddress: '192.168.1.45'
  },
  {
    id: 'aud-1002',
    userName: 'Karthik S. (Dispatcher)',
    userRole: 'Dispatcher',
    timestamp: '2026-09-01 08:05 AM',
    module: 'Dispatch Center',
    action: 'Reassigned Driver',
    entity: 'Driver Rajesh K. -> Route 21A',
    status: 'success',
    ipAddress: '192.168.1.18'
  },
  {
    id: 'aud-1003',
    userName: 'System AI Engine',
    userRole: 'System Automation',
    timestamp: '2026-09-01 07:45 AM',
    module: 'Inspection',
    action: 'Vehicle Lock Triggered',
    entity: 'Bus TN 59 BC 2048 marked Unsafe',
    status: 'warning',
    ipAddress: '127.0.0.1'
  }
];

export const initialUserRoles: UserRoleDefinition[] = [
  {
    id: 'usr-1',
    name: 'Admin Executive',
    role: 'Super Admin',
    email: 'admin@smartbus360.in',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
    permissions: { view: true, create: true, edit: true, delete: true, export: true, approve: true }
  },
  {
    id: 'usr-2',
    name: 'Ramesh Sundaram',
    role: 'Transport Manager',
    email: 'ramesh.mgr@smartbus360.in',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
    permissions: { view: true, create: true, edit: true, delete: false, export: true, approve: true }
  },
  {
    id: 'usr-3',
    name: 'Karthik S.',
    role: 'Dispatcher',
    email: 'karthik.disp@smartbus360.in',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120',
    permissions: { view: true, create: true, edit: true, delete: false, export: true, approve: false }
  }
];

export const initialAIRecommendations: AIRecommendation[] = [
  {
    id: 'rec-1',
    title: 'Deploy Additional Bus on Route 21A',
    category: 'Optimization',
    confidencePercent: 94,
    impactText: '+18% Passenger Throughput, -12 mins average peak wait time',
    description: 'Historical and realtime demand analytics forecast peak passenger overcrowding between 08:00 AM and 09:00 AM at Nava India and Peelamedu stops.',
    actionLabel: 'Deploy Bus TN 38 CD 9012',
    isApplied: false
  },
  {
    id: 'rec-2',
    title: 'Schedule Preventive Brake Service for BUS-1024',
    category: 'Maintenance',
    confidencePercent: 88,
    impactText: 'Prevents potential braking degradation event in ~400 km',
    description: 'Telemetry sensor data shows subtle increase in brake pedal stroke travel over last 5 days.',
    actionLabel: 'Create Maintenance Work Order',
    isApplied: false
  },
  {
    id: 'rec-3',
    title: 'Reroute Route 7C via Avinashi Flyover',
    category: 'Safety',
    confidencePercent: 91,
    impactText: 'Saves 14 mins fuel idling & bypasses construction bottleneck',
    description: 'Live traffic sensors report 2.4 km congestion on Old Railway Road.',
    actionLabel: 'Apply Reroute to Active Trips',
    isApplied: false
  }
];

export const initialFleetSummary: FleetSummary = {
  totalBuses: 142,
  activeBuses: 128,
  idleBuses: 4,
  maintenanceBuses: 9,
  emergencyBuses: 1,
  activeDrivers: 135,
  todayTrips: 482,
  onTimeRatePercent: 96.4,
  totalPassengersToday: 18450,
  fleetUtilizationPercent: 90.1
};

export const mockBuses = initialBuses;
export const mockDrivers = initialDrivers;
export const mockRoutes = initialRoutes;
export const mockTrips = initialTrips;
export const mockTickets = initialTickets;
export const mockTicket = initialTickets[0];
export const mockMaintenanceTasks = initialMaintenanceRecords;

