import React, { useState, useEffect } from "react";
import TopBar from "../components/TopBar";
import PerformedTripsReport from "../components/reports/PerformedTripsReport";
import PublishedTripsReport from "../components/reports/PublishedTripsReport";
import GeneralSummaryReport from "../components/reports/GeneralSummaryReport";
import { useAppContext } from "../components/AppContext";

const tabs = [
  { id: 'published', label: 'נסיעות שפרסמתי' },
  { id: 'performed', label: 'נסיעות שביצעתי' },
  { id: 'general_summary', label: 'סיכום כללי' },
];

export default function Reports() {
  const { trips, user, isLoading } = useAppContext();
  const [activeTab, setActiveTab] = useState('published');
  const [summaryData, setSummaryData] = useState(null);

  useEffect(() => {
    if (user && trips) {
      const userPublishedTrips = trips.filter(trip => trip.created_by === user.email);
      const userPerformedTrips = userPublishedTrips.filter(trip => trip.status === 'completed');
      const totalIncome = userPerformedTrips.reduce((sum, trip) => sum + (trip.price || 0), 0);
      
      const now = new Date();
      const monthlyTrips = userPublishedTrips.filter(trip => {
          const tripDate = new Date(trip.created_date);
          return tripDate.getFullYear() === now.getFullYear() && tripDate.getMonth() === now.getMonth();
      }).length;

      setSummaryData({
          totalIncome,
          upcomingCharges: { amount: 950, trips: 15 }, // Static data for now
          totalTrips: userPublishedTrips.length,
          monthlyTrips,
          performedTripsCountForIncome: userPerformedTrips.length
      });
    }
  }, [user, trips]);

  const publishedTrips = user ? trips.filter(trip => trip.created_by === user.email) : [];
  const performedTrips = publishedTrips.filter(trip => trip.status === 'completed');
  
  const renderContent = () => {
    switch (activeTab) {
      case 'general_summary':
        return <GeneralSummaryReport summary={summaryData} />;
      case 'published':
        return <PublishedTripsReport trips={publishedTrips} />;
      case 'performed':
        return <PerformedTripsReport trips={performedTrips} />;
      default:
        return <GeneralSummaryReport summary={summaryData} />;
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
      <div className="pt-20 px-4 flex-grow">
        <div className="max-w-md mx-auto">
          <div className="bg-yellow-100/50 p-4 rounded-xl text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">דוחות</h1>
          </div>
          <div className="flex justify-around items-center mb-8 border-b">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-4 rounded-xl font-bold transition-colors text-sm ${activeTab === tab.id ? 'bg-yellow-400 text-gray-900 shadow-lg' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
} 