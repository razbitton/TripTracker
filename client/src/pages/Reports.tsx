import React, { useState, useEffect } from "react";
import TopBar from "../components/TopBar";
import BottomNavigation from "../components/BottomNavigation";
import CentralAddButton from "../components/CentralAddButton";
import { useAppContext } from "../components/AppContext";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/utils";
import { MapPin, Navigation } from "lucide-react";

const tabs = [
  { id: 'published', label: 'נסיעות שפרסמתי' },
  { id: 'performed', label: 'נסיעות שביצעתי' },
  { id: 'general_summary', label: 'סיכום כללי' },
];

export default function Reports() {
  const { trips, user, isLoading } = useAppContext();
  const [activeTab, setActiveTab] = useState('published');
  const [summaryData, setSummaryData] = useState<any>(null);

  useEffect(() => {
    if (user && trips) {
      const userPublishedTrips = trips.filter(trip => trip.created_by === user.email);
      const userPerformedTrips = userPublishedTrips.filter(trip => trip.status === 'completed');
      const totalIncome = userPerformedTrips.reduce((sum, trip) => sum + (parseFloat(trip.price || "0")), 0);
      
      const now = new Date();
      const monthlyTrips = userPublishedTrips.filter(trip => {
          const tripDate = new Date(trip.created_date!);
          return tripDate.getFullYear() === now.getFullYear() && tripDate.getMonth() === now.getMonth();
      }).length;

      setSummaryData({
          totalIncome,
          upcomingCharges: { amount: 950, trips: 15 },
          totalTrips: userPublishedTrips.length,
          monthlyTrips,
          performedTripsCountForIncome: userPerformedTrips.length
      });
    }
  }, [user, trips]);

  const publishedTrips = user ? trips.filter(trip => trip.created_by === user.email) : [];
  const performedTrips = publishedTrips.filter(trip => trip.status === 'completed');

  const renderGeneralSummary = () => (
    <div className="space-y-6">
      <Card className="bg-white rounded-xl shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">סיכום כספי</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {formatCurrency(summaryData?.totalIncome || 0)}
              </div>
              <div className="text-sm text-gray-500">סה״כ הכנסות</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {formatCurrency(summaryData?.upcomingCharges.amount || 0)}
              </div>
              <div className="text-sm text-gray-500">חיובים עתידיים</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white rounded-xl shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">סטטיסטיקות</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {summaryData?.totalTrips || 0}
              </div>
              <div className="text-sm text-gray-500">סה״כ נסיעות</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">
                {summaryData?.monthlyTrips || 0}
              </div>
              <div className="text-sm text-gray-500">נסיעות החודש</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPublishedTrips = () => (
    <div className="space-y-4">
      {publishedTrips.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          לא פרסמת נסיעות עדיין
        </div>
      ) : (
        publishedTrips.map((trip) => (
          <Card key={trip.id} className="bg-white rounded-xl shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="font-bold text-gray-900 mb-1">
                    {trip.pickup_location} → {trip.destination}
                  </div>
                  <div className="text-sm text-gray-500">{formatDate(trip.created_date!)}</div>
                  <div className="text-sm text-gray-600 mt-2">
                    סטטוס: {trip.status === 'pending' ? 'ממתין' : 
                            trip.status === 'accepted' ? 'בביצוע' : 
                            trip.status === 'completed' ? 'הושלם' : 'בוטל'}
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold text-gray-900">{formatCurrency(trip.price || 0)}</div>
                  <div className="text-sm text-gray-500">
                    {trip.vehicle_type === 'trip' ? 'נסיעה' : 'משלוח'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );

  const renderPerformedTrips = () => (
    <div className="space-y-4">
      {performedTrips.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          לא ביצעת נסיעות עדיין
        </div>
      ) : (
        performedTrips.map((trip) => (
          <Card key={trip.id} className="bg-white rounded-xl shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="font-bold text-gray-900 mb-1">
                    {trip.pickup_location} → {trip.destination}
                  </div>
                  <div className="text-sm text-gray-500">{formatDate(trip.created_date!)}</div>
                  <div className="text-sm text-gray-600 mt-2">זמן נסיעה: 35 דקות</div>
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold text-green-600">{formatCurrency(trip.price || 0)}</div>
                  <div className="text-sm text-gray-500">הושלם</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
  
  const renderContent = () => {
    switch (activeTab) {
      case 'general_summary':
        return renderGeneralSummary();
      case 'published':
        return renderPublishedTrips();
      case 'performed':
        return renderPerformedTrips();
      default:
        return renderGeneralSummary();
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
      <div className="pt-20 px-4 flex-grow pb-32">
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
      <BottomNavigation />
      <CentralAddButton />
    </div>
  );
}
