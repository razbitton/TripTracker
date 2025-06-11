import React, { createContext, useState, useEffect, useContext } from 'react';
import { User } from '@/entities/User';
import { Trip } from '@/entities/Trip';
import { Notification } from '@/entities/Notification';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [trips, setTrips] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadData = async () => {
        setIsLoading(true);
        try {
            const [userData, tripsData, notificationsData] = await Promise.all([
                User.me().catch(() => null),
                Trip.list("-created_date").catch(() => []),
                Notification.list("-created_date").catch(() => [])
            ]);
            setUser(userData);
            setTrips(tripsData);
            setNotifications(notificationsData);
        } catch (error) {
            console.error("Failed to load global app data:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        loadData();
    }, []);

    const value = {
        user,
        trips,
        notifications,
        isLoading,
        reload: loadData
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
}; 