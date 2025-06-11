import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Bus, Phone, MapPin, Edit, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Trip } from "@/entities/Trip";
import { useAppContext } from "../components/AppContext";
import AddressInput from "../components/AddressInput";

const ProgressIcon = ({ icon: Icon, isActive }) => (
    <div className="flex flex-col items-center z-10">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-colors duration-300 ${isActive ? 'bg-yellow-400' : 'bg-gray-200'}`}>
            <Icon className={`w-14 h-14 ${isActive ? 'text-white' : 'text-gray-500'}`} />
        </div>
    </div>
);

const timings = ["מיידי", "היום", "מחר"];
const vehicleTypes = [
    { value: 'trip', label: 'נסיעה' },
    { value: 'delivery', label: 'משלוח' }
];

// יצירת אפשרויות שעות
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
    const navigate = useNavigate();
    const { reload, user } = useAppContext();
    const [step, setStep] = useState(1);
    const [editingTrip, setEditingTrip] = useState(null);
    const [formData, setFormData] = useState({
        pickup_location: "",
        destination: "",
        client_phone: "",
        pickup_details: "מיידי", // ברירת מחדל
        pickup_time: "", // שדה חדש לשעה
        vehicle_type: "",
        price: 0, // Changed from "" to 0
        passenger_notes: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // טעינת נתוני נסיעה לעריכה אם קיימים
    useEffect(() => {
        const editData = localStorage.getItem('editingTrip');
        if (editData) {
            const tripData = JSON.parse(editData);
            setEditingTrip(tripData);
            
            // פירוק pickup_details לתזמון ושעה
            let timing = tripData.pickup_details || "מיידי";
            let time = "";
            
            if (timing.includes("היום בשעה")) {
                time = timing.split("בשעה ")[1];
                timing = "היום";
            } else if (timing.includes("מחר בשעה")) {
                time = timing.split("בשעה ")[1];
                timing = "מחר";
            }
            // ... existing code ...
        }
    }, []);

    return (
        <div>
            {/* Rest of the component code */}
        </div>
    );
} 