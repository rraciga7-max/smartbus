import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatCard } from '../components/StatCard';
import { Modal } from '../components/Modal';
import { mockBuses, mockMaintenanceTasks } from '../data/mockData';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [isAddBusModalOpen, setIsAddBusModalOpen] = useState(false);
  const [isAddRouteModalOpen, setIsAddRouteModalOpen] = useState(false);
  const [newRegNumber, setNewRegNumber] = useState('');
  const [newRouteName, setNewRouteName] = useState('Gandhipuram to Singanallur');

  const handleAddBusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Bus ${newRegNumber || 'TN 38 AB 9999'} added successfully!`);
    setIsAddBusModalOpen(false);
    setNewRegNumber('');
  };

  const handleAddRouteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Route "${newRouteName}" created successfully!`);
    setIsAddRouteModalOpen(false);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-background pb-24 md:pb-12">
      {/* Header Greeting Area */}
      <div className="px-margin-mobile md:px-margin-desktop py-lg">
        <h1 className="font-headline-sm text-headline-sm md:text-headline-lg text-on-background mb-xs font-bold">
          Good Morning, Fleet Admin
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Here is the live status of your public transit operations.
        </p>
      </div>

      {/* Summary Stat Cards Grid */}
      <div className="px-margin-mobile md:px-margin-desktop grid grid-cols-2 lg:grid-cols-4 gap-md mb-xl">
        <StatCard
          title="Active Buses"
          value="42"
          iconName="directions_bus"
          badgeText="Live"
          variant="primary"
          onClick={() => navigate('/buses')}
        />
        <StatCard
          title="Today's Trips"
          value="128"
          iconName="route"
          variant="tertiary"
          onClick={() => navigate('/routes')}
        />
        <StatCard
          title="Drivers Available"
          value="15"
          iconName="person"
          variant="secondary"
          onClick={() => navigate('/buses')}
        />
        <StatCard
          title="Maintenance Alerts"
          value="3"
          iconName="warning"
          badgeText="Action Req"
          variant="error"
          onClick={() => navigate('/maintenance')}
        />
      </div>

      {/* Quick Actions Grid */}
      <div className="px-margin-mobile md:px-margin-desktop mb-xl">
        <h2 className="font-title-lg text-title-lg text-on-background mb-md font-bold">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-sm md:gap-md">
          <button
            onClick={() => setIsAddBusModalOpen(true)}
            className="bg-primary text-on-primary rounded-[16px] py-md px-sm flex flex-col items-center justify-center gap-sm shadow-sm hover:shadow-md hover:bg-primary-container transition-all active:scale-95 min-h-[96px]"
          >
            <span className="material-symbols-outlined text-[28px]">add_circle</span>
            <span className="font-label-md text-label-md font-semibold">Add Bus</span>
          </button>

          <button
            onClick={() => setIsAddRouteModalOpen(true)}
            className="bg-surface-container text-primary rounded-[16px] py-md px-sm flex flex-col items-center justify-center gap-sm shadow-sm hover:shadow-md transition-all active:scale-95 border border-surface-variant min-h-[96px]"
          >
            <span className="material-symbols-outlined text-[28px]">edit_road</span>
            <span className="font-label-md text-label-md font-semibold">Add Route</span>
          </button>

          <button
            onClick={() => navigate('/buses')}
            className="bg-surface-container text-primary rounded-[16px] py-md px-sm flex flex-col items-center justify-center gap-sm shadow-sm hover:shadow-md transition-all active:scale-95 border border-surface-variant min-h-[96px]"
          >
            <span className="material-symbols-outlined text-[28px]">assignment_ind</span>
            <span className="font-label-md text-label-md font-semibold">Assign Driver</span>
          </button>

          <button
            onClick={() => navigate('/maintenance')}
            className="bg-surface-container text-primary rounded-[16px] py-md px-sm flex flex-col items-center justify-center gap-sm shadow-sm hover:shadow-md transition-all active:scale-95 border border-surface-variant min-h-[96px]"
          >
            <span className="material-symbols-outlined text-[28px]">bar_chart</span>
            <span className="font-label-md text-label-md font-semibold">View Reports</span>
          </button>
        </div>
      </div>

      {/* Live Fleet Preview & Recent Activity */}
      <div className="px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-lg">
        {/* Live Active Buses List */}
        <div>
          <div className="flex items-center justify-between mb-md">
            <h2 className="font-title-lg text-title-lg text-on-background font-bold">
              Live Buses Preview
            </h2>
            <button
              onClick={() => navigate('/buses')}
              className="text-label-md text-primary font-semibold hover:underline flex items-center gap-1"
            >
              View All (142)
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
          <div className="flex flex-col gap-sm">
            {mockBuses.slice(0, 3).map((bus: any) => (
              <div
                key={bus.id}
                onClick={() => navigate('/buses')}
                className="bg-surface-container-lowest rounded-[24px] p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-surface-variant relative overflow-hidden group hover:shadow-md transition-all cursor-pointer"
              >
                <div
                  className={`absolute top-0 left-0 w-1.5 h-full ${
                    bus.status === 'active'
                      ? 'bg-[#10B981]'
                      : bus.status === 'maintenance'
                      ? 'bg-error'
                      : 'bg-[#F59E0B]'
                  }`}
                />
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="font-title-lg text-title-lg font-bold text-on-surface">
                      {bus.registrationNumber}
                    </span>
                    <span className="font-body-md text-body-md text-on-surface-variant flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-[16px]">route</span>
                      {bus.routeName}
                    </span>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full font-label-sm font-bold uppercase tracking-wider ${
                      bus.status === 'active'
                        ? 'bg-[#10B981]/10 text-[#10B981]'
                        : bus.status === 'maintenance'
                        ? 'bg-error-container text-on-error-container'
                        : 'bg-[#F59E0B]/10 text-[#F59E0B]'
                    }`}
                  >
                    {bus.status}
                  </span>
                </div>
                <div className="h-px w-full bg-surface-variant my-2" />
                <div className="flex justify-between items-center text-label-md text-on-surface-variant">
                  <span>Driver: {bus.driverName}</span>
                  <span className="font-medium text-on-surface">{bus.speedKmH > 0 ? `${bus.speedKmH} km/h` : 'Depot'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Maintenance & Activity Feed */}
        <div>
          <div className="flex items-center justify-between mb-md">
            <h2 className="font-title-lg text-title-lg text-on-background font-bold">
              Critical Actions
            </h2>
            <button
              onClick={() => navigate('/maintenance')}
              className="text-label-md text-primary font-semibold hover:underline flex items-center gap-1"
            >
              Maintenance Center
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
          <div className="flex flex-col gap-sm">
            {mockMaintenanceTasks.map((task: any) => (
              <div
                key={task.id}
                onClick={() => navigate('/maintenance')}
                className="bg-surface-container-lowest rounded-[24px] p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-surface-variant relative overflow-hidden group hover:shadow-md transition-all cursor-pointer flex flex-col gap-2"
              >

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-title-md text-label-md font-bold text-on-surface">
                      {task.registrationNumber}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-label-sm font-bold ${
                        task.priority === 'HIGH'
                          ? 'bg-error/10 text-error'
                          : 'bg-[#F59E0B]/10 text-[#D97706]'
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-error font-semibold">
                    {task.dueDate}
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface font-medium">
                  {task.serviceType}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Bus Modal */}
      <Modal isOpen={isAddBusModalOpen} onClose={() => setIsAddBusModalOpen(false)} title="Add New Bus to Fleet">
        <form onSubmit={handleAddBusSubmit} className="flex flex-col gap-4">
          <div>
            <label className="font-label-md text-on-surface-variant block mb-1">Registration Plate</label>
            <input
              type="text"
              placeholder="e.g. TN 38 AB 9999"
              value={newRegNumber}
              onChange={(e) => setNewRegNumber(e.target.value)}
              className="w-full p-3 rounded-xl bg-surface-container border border-surface-variant text-on-surface focus:outline-none focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="font-label-md text-on-surface-variant block mb-1">Bus Model</label>
            <select className="w-full p-3 rounded-xl bg-surface-container border border-surface-variant text-on-surface focus:outline-none focus:border-primary">
              <option>Volvo 9400 B11R</option>
              <option>Scania Metrolink HD</option>
              <option>Tata Starbus Urban</option>
              <option>Ashok Leyland JanBus</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-3.5 bg-primary text-on-primary font-title-lg rounded-xl shadow-md hover:bg-primary-container transition-all mt-2"
          >
            Save & Add Bus
          </button>
        </form>
      </Modal>

      {/* Add Route Modal */}
      <Modal isOpen={isAddRouteModalOpen} onClose={() => setIsAddRouteModalOpen(false)} title="Create New Bus Route">
        <form onSubmit={handleAddRouteSubmit} className="flex flex-col gap-4">
          <div>
            <label className="font-label-md text-on-surface-variant block mb-1">Route Name</label>
            <input
              type="text"
              placeholder="e.g. Saravanampatti to Railway Station"
              value={newRouteName}
              onChange={(e) => setNewRouteName(e.target.value)}
              className="w-full p-3 rounded-xl bg-surface-container border border-surface-variant text-on-surface focus:outline-none focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="font-label-md text-on-surface-variant block mb-1">Route Number / Code</label>
            <input
              type="text"
              placeholder="e.g. 21A"
              className="w-full p-3 rounded-xl bg-surface-container border border-surface-variant text-on-surface focus:outline-none focus:border-primary"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3.5 bg-primary text-on-primary font-title-lg rounded-xl shadow-md hover:bg-primary-container transition-all mt-2"
          >
            Create Route
          </button>
        </form>
      </Modal>
    </div>
  );
};
