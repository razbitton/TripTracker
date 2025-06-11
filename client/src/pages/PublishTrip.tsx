import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, MapPin, Navigation, Phone } from "lucide-react";
import { useLocation } from "wouter";
import { createPageUrl } from "@/utils";
import { useAppContext } from "../components/AppContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const timings = ["מיידי", "היום", "מחר"];
const vehicleTypes = [
    { value: 'trip', label: 'נסיעה' },
    { value: 'delivery', label: 'משלוח' }
];

const generateTimeOptions = () => {
    const times = [];
    for (let hour = 6; hour <= 23; hour++) {
        for (let minute of ['00', '30']) {
            const timeStr = `${hour.toString().padStart(2, '0')}:${minute}`;
            times.push(timeStr);
        }
    }
    return times;
};

const timeOptions = generateTimeOptions();

export default function PublishTrip() {
    const [, setLocation] = useLocation();
    const { user, reload } = useAppContext();
    const { toast } = useToast();
    const queryClient = useQueryClient();
    
    const [formData, setFormData] = useState({
        pickup_location: "",
        destination: "",
        client_phone: "",
        pickup_details: "מיידי",
        pickup_time: "",
        vehicle_type: "",
        price: "",
        passenger_notes: ""
    });

    const createTripMutation = useMutation({
        mutationFn: async (tripData: any) => {
            const response = await apiRequest('POST', '/api/trips', tripData);
            return response.json();
        },
        onSuccess: () => {
            toast({
                title: "הנסיעה פורסמה בהצלחה",
                description: "הנסיעה שלך פורסמה ותופיע בנסיעות הזמינות",
            });
            queryClient.invalidateQueries({ queryKey: ['/api/trips'] });
            reload();
            setLocation(createPageUrl("trips"));
        },
        onError: () => {
            toast({
                title: "שגיאה בפרסום הנסיעה",
                description: "אנא נסה שוב מאוחר יותר",
                variant: "destructive",
            });
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.pickup_location || !formData.destination || !formData.vehicle_type || !formData.price) {
            toast({
                title: "שדות חסרים",
                description: "אנא מלא את כל השדות הנדרשים",
                variant: "destructive",
            });
            return;
        }

        let pickup_details = formData.pickup_details;
        if (formData.pickup_details !== "מיידי" && formData.pickup_time) {
            pickup_details = `${formData.pickup_details} בשעה ${formData.pickup_time}`;
        }

        const tripData = {
            pickup_location: formData.pickup_location,
            destination: formData.destination,
            client_phone: formData.client_phone,
            pickup_details,
            vehicle_type: formData.vehicle_type,
            price: formData.price,
            passenger_notes: formData.passenger_notes,
            publisher_email: user?.email,
            created_by: user?.email,
            status: "pending"
        };

        createTripMutation.mutate(tripData);
    };

    const updateFormData = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4" dir="rtl">
            <div className="max-w-md mx-auto pt-8 pb-40">
                <div className="flex items-center gap-4 mb-8">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setLocation(createPageUrl("home"))}
                        className="rounded-full w-16 h-16"
                    >
                        <ArrowRight className="w-12 h-12" />
                    </Button>
                    <h1 className="text-4xl font-bold text-gray-900">פרסם נסיעה</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Vehicle Type Selection */}
                    <div>
                        <Label className="block text-2xl font-semibold text-gray-900 mb-4">סוג הנסיעה</Label>
                        <div className="grid grid-cols-2 gap-4">
                            {vehicleTypes.map((type) => (
                                <Button
                                    key={type.value}
                                    type="button"
                                    className={`p-6 rounded-xl font-bold text-xl transition-colors ${
                                        formData.vehicle_type === type.value 
                                            ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900' 
                                            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                                    }`}
                                    onClick={() => updateFormData('vehicle_type', type.value)}
                                >
                                    {type.label}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Pickup Location */}
                    <div>
                        <Label className="block text-2xl font-semibold text-gray-900 mb-4">מיקום איסוף</Label>
                        <div className="relative">
                            <Input
                                type="text"
                                className="w-full h-16 text-xl text-right pr-6 pl-16 bg-white rounded-xl border-gray-300 border-2"
                                placeholder="הכנס כתובת איסוף"
                                value={formData.pickup_location}
                                onChange={(e) => updateFormData('pickup_location', e.target.value)}
                            />
                            <MapPin className="w-8 h-8 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>

                    {/* Destination */}
                    <div>
                        <Label className="block text-2xl font-semibold text-gray-900 mb-4">יעד</Label>
                        <div className="relative">
                            <Input
                                type="text"
                                className="w-full h-16 text-xl text-right pr-6 pl-16 bg-white rounded-xl border-gray-300 border-2"
                                placeholder="הכנס כתובת יעד"
                                value={formData.destination}
                                onChange={(e) => updateFormData('destination', e.target.value)}
                            />
                            <Navigation className="w-8 h-8 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>

                    {/* Client Phone */}
                    <div>
                        <Label className="block text-2xl font-semibold text-gray-900 mb-4">טלפון לקוח</Label>
                        <div className="relative">
                            <Input
                                type="tel"
                                className="w-full h-16 text-xl text-right pr-6 pl-16 bg-white rounded-xl border-gray-300 border-2"
                                placeholder="מספר טלפון"
                                value={formData.client_phone}
                                onChange={(e) => updateFormData('client_phone', e.target.value)}
                            />
                            <Phone className="w-8 h-8 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>

                    {/* Price */}
                    <div>
                        <Label className="block text-2xl font-semibold text-gray-900 mb-4">מחיר</Label>
                        <div className="relative">
                            <Input
                                type="number"
                                className="w-full h-16 text-xl text-right pr-6 pl-16 bg-white rounded-xl border-gray-300 border-2"
                                placeholder="0"
                                value={formData.price}
                                onChange={(e) => updateFormData('price', e.target.value)}
                            />
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">₪</span>
                        </div>
                    </div>

                    {/* Timing */}
                    <div>
                        <Label className="block text-2xl font-semibold text-gray-900 mb-4">תזמון</Label>
                        <div className="grid grid-cols-3 gap-4">
                            {timings.map((timing) => (
                                <Button
                                    key={timing}
                                    type="button"
                                    className={`p-4 rounded-xl font-bold transition-colors ${
                                        formData.pickup_details === timing 
                                            ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900' 
                                            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                                    }`}
                                    onClick={() => updateFormData('pickup_details', timing)}
                                >
                                    {timing}
                                </Button>
                            ))}
                        </div>
                        
                        {formData.pickup_details !== "מיידי" && (
                            <div className="mt-4">
                                <Select onValueChange={(value) => updateFormData('pickup_time', value)}>
                                    <SelectTrigger className="w-full h-16 text-xl bg-white rounded-xl border-gray-300 border-2">
                                        <SelectValue placeholder="בחר שעה" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {timeOptions.map((time) => (
                                            <SelectItem key={time} value={time}>{time}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>

                    {/* Notes */}
                    <div>
                        <Label className="block text-2xl font-semibold text-gray-900 mb-4">הערות</Label>
                        <Textarea
                            className="w-full h-32 text-xl text-right p-6 bg-white rounded-xl border-gray-300 border-2 resize-none"
                            placeholder="הערות נוספות..."
                            value={formData.passenger_notes}
                            onChange={(e) => updateFormData('passenger_notes', e.target.value)}
                        />
                    </div>

                    {/* Submit Button */}
                    <Button 
                        type="submit" 
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-6 text-2xl rounded-xl"
                        disabled={createTripMutation.isPending}
                    >
                        {createTripMutation.isPending ? "מפרסם..." : "פרסם נסיעה"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
