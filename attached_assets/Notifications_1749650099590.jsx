import React, { useState } from "react";
import TopBar from "../components/TopBar";
import TripNotificationsList from "../components/notifications/TripNotificationsList";
import PersonalNotificationsList from "../components/notifications/PersonalNotificationsList";
import SystemNotificationsList from "../components/notifications/SystemNotificationsList";
import { useAppContext } from "../components/AppContext";

const tabs = [
    { id: 'trip', label: 'התראות נסיעות' },
    { id: 'personal', label: 'התראות אישיות' },
    { id: 'system', label: 'התראות מערכת' },
];

export default function Notifications() {
    const { notifications, trips, isLoading } = useAppContext();
    const [activeTab, setActiveTab] = useState('trip');
    
    const pendingTrips = trips.filter(trip => trip.status === 'pending');
    const personalNotifications = notifications.filter(n => n.type === 'personal');
    const systemNotifications = notifications.filter(n => n.type === 'system');

    const renderContent = () => {
        switch (activeTab) {
            case 'trip':
                return <TripNotificationsList trips={pendingTrips} />;
            case 'personal':
                return <PersonalNotificationsList notifications={personalNotifications} />;
            case 'system':
                return <SystemNotificationsList notifications={systemNotifications} />;
            default:
                return null;
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center" dir="rtl">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-gray-100 flex flex-col" dir="rtl">
            <TopBar />
            <div className="pt-20 pb-32 px-4 flex-grow">
                <div className="max-w-md mx-auto">
                    <div className="bg-yellow-100/50 p-4 rounded-xl text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">התראות</h1>
                    </div>
                    <div className="flex justify-center gap-2 mb-8">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`py-3 px-4 rounded-xl font-bold transition-colors text-sm relative ${
                                    activeTab === tab.id
                                        ? 'bg-yellow-400 text-gray-900 shadow-lg'
                                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                }`}
                            >
                                {tab.label}
                                {tab.id === 'trip' && pendingTrips.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                                        {pendingTrips.length}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
} 