import React, { createContext, useState, useEffect, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { User, Trip, Notification } from '@shared/schema';

interface AppContextType {
  user: User | null;
  trips: Trip[];
  notifications: Notification[];
  isLoading: boolean;
  reload: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const { data: userData, isLoading: userLoading, refetch: refetchUser } = useQuery({
    queryKey: ['/api/users/me'],
    retry: false,
  });

  const { data: tripsData, isLoading: tripsLoading, refetch: refetchTrips } = useQuery({
    queryKey: ['/api/trips?orderBy=-created_date'],
    retry: false,
  });

  const { data: notificationsData, isLoading: notificationsLoading, refetch: refetchNotifications } = useQuery({
    queryKey: ['/api/notifications?orderBy=-created_date'],
    retry: false,
  });

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  useEffect(() => {
    if (tripsData) {
      setTrips(tripsData);
    }
  }, [tripsData]);

  useEffect(() => {
    if (notificationsData) {
      setNotifications(notificationsData);
    }
  }, [notificationsData]);

  const isLoading = userLoading || tripsLoading || notificationsLoading;

  const reload = () => {
    refetchUser();
    refetchTrips();
    refetchNotifications();
  };

  const value = {
    user,
    trips,
    notifications,
    isLoading,
    reload
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
