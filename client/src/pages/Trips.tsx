import React, { useState, useEffect } from "react";
import TopBar from "../components/TopBar";
import BottomNavigation from "../components/BottomNavigation";
import CentralAddButton from "../components/CentralAddButton";
import { useAppContext } from "../components/AppContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Phone } from "lucide-react";
import { formatCurrency, formatDate } from "@/utils";

const tabs = [
  { id: 'my_trips', label: 'נסיעות שלי' },
  { id: 'available_trips', label: 'נסיעות פנויות' },
  { id: 'published_trips', label: 'נסיעות שפרסמתי' },
];

export default function Trips() {
  const { trips, user, isLoading } = useAppContext();
  const [activeTab, setActiveTab] = useState('my_trips');

  const myTrips = user ? trips.filter(trip => 
    (trip.driver_id === user.email && trip.status === 'accepted') ||
    (trip.status === 'accepted')
  ) : [];
  
  const availableTrips = trips.filter(trip => trip.status === 'pending');
  
  const publishedTrips = user ? trips.filter(trip => {
    const isPublisher = trip.publisher_email === user.email;
    const isCreator = trip.created_by === user.email;
    return isPublisher || isCreator;
  }) : [];

  const renderTrip = (trip: any, showActions: boolean = true, actionType: string = 'my') => (
    <Card key={trip.id} className="bg-white rounded-xl shadow-sm border border-gray-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                trip.status === 'accepted' ? 'bg-green-100 text-green-800' :
                trip.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {trip.status === 'accepted' ? 'בביצוע' : 
                 trip.status === 'pending' ? 'זמין' : 'ממתין'}
              </span>
              <span className="text-gray-500 text-sm">
                {formatDate(trip.created_date)}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-600" />
                <span className="font-medium">{trip.pickup_location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-red-600" />
                <span className="font-medium">{trip.destination}</span>
              </div>
            </div>
          </div>
          <div className="text-left">
            <div className="text-2xl font-bold text-gray-900">{formatCurrency(trip.price || 0)}</div>
            <div className="text-sm text-gray-500">
              {trip.vehicle_type === 'trip' ? 'נסיעה' : 'משלוח'}
            </div>
          </div>
        </div>
        {showActions && (
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            {actionType === 'my' && (
              <>
                <Button className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-medium">
                  פרטי הנסיעה
                </Button>
                <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium">
                  <Phone className="w-4 h-4 inline mr-1" />
                  התקשר
                </Button>
              </>
            )}
            {actionType === 'available' && (
              <>
                <Button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-3 rounded-lg font-medium">
                  קבל נסיעה
                </Button>
                <Button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-medium">
                  פרטים
                </Button>
              </>
            )}
            {actionType === 'published' && (
              <>
                <Button className="flex-1 bg-red-400 hover:bg-red-500 text-white py-3 rounded-lg font-medium">
                  בטל נסיעה
                </Button>
                <Button className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-medium">
                  ערוך
                </Button>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'my_trips':
        return (
          <div className="space-y-4">
            {myTrips.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                אין נסיעות פעילות
              </div>
            ) : (
              myTrips.map(trip => renderTrip(trip, true, 'my'))
            )}
          </div>
        );
      case 'available_trips':
        return (
          <div className="space-y-4">
            {availableTrips.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                אין נסיעות זמינות כרגע
              </div>
            ) : (
              availableTrips.map(trip => renderTrip(trip, true, 'available'))
            )}
          </div>
        );
      case 'published_trips':
        return (
          <div className="space-y-4">
            {publishedTrips.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                לא פרסמת נסיעות עדיין
              </div>
            ) : (
              publishedTrips.map(trip => renderTrip(trip, true, 'published'))
            )}
          </div>
        );
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
      
      <div className="pt-20 px-4 flex-grow pb-32">
        <div className="max-w-md mx-auto">
          <div className="bg-yellow-100/50 p-4 rounded-xl text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">נסיעות</h1>
          </div>

          <div className="flex justify-center gap-2 mb-8">
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
