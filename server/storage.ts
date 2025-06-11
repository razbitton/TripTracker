import { users, trips, drivers, notifications, type User, type InsertUser, type Trip, type InsertTrip, type Driver, type InsertDriver, type Notification, type InsertNotification } from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Trips
  getTrip(id: number): Promise<Trip | undefined>;
  listTrips(orderBy?: string): Promise<Trip[]>;
  createTrip(trip: InsertTrip): Promise<Trip>;
  updateTrip(id: number, trip: Partial<InsertTrip>): Promise<Trip | undefined>;
  deleteTrip(id: number): Promise<boolean>;
  
  // Drivers
  getDriver(id: number): Promise<Driver | undefined>;
  listDrivers(): Promise<Driver[]>;
  createDriver(driver: InsertDriver): Promise<Driver>;
  
  // Notifications
  getNotification(id: number): Promise<Notification | undefined>;
  listNotifications(orderBy?: string): Promise<Notification[]>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  updateNotification(id: number, notification: Partial<InsertNotification>): Promise<Notification | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private trips: Map<number, Trip>;
  private drivers: Map<number, Driver>;
  private notifications: Map<number, Notification>;
  private currentUserId: number;
  private currentTripId: number;
  private currentDriverId: number;
  private currentNotificationId: number;

  constructor() {
    this.users = new Map();
    this.trips = new Map();
    this.drivers = new Map();
    this.notifications = new Map();
    this.currentUserId = 1;
    this.currentTripId = 1;
    this.currentDriverId = 1;
    this.currentNotificationId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Create sample user
    const user: User = {
      id: this.currentUserId++,
      email: "chaim@example.com",
      username: "chaim",
      full_name: "חיים חיימוביץ",
      phone: "055.0485965",
      created_date: new Date(),
    };
    this.users.set(user.id, user);

    // Create sample trips
    const sampleTrips: Trip[] = [
      {
        id: this.currentTripId++,
        pickup_location: "תל אביב, רחוב דיזנגוף 100",
        destination: "ירושלים, רחוב יפו 25",
        status: "accepted",
        price: "120",
        driver_id: "chaim@example.com",
        passenger_notes: null,
        passenger_count: null,
        estimated_duration: null,
        vehicle_type: "trip",
        channel_id: null,
        client_phone: "052-1234567",
        pickup_details: "מיידי",
        publisher_email: "chaim@example.com",
        created_by: "chaim@example.com",
        created_date: new Date(),
      },
      {
        id: this.currentTripId++,
        pickup_location: "חיפה, שדרות בן גוריון 50",
        destination: "נתניה, רחוב הרצל 15",
        status: "accepted",
        price: "85",
        driver_id: "chaim@example.com",
        passenger_notes: null,
        passenger_count: null,
        estimated_duration: null,
        vehicle_type: "delivery",
        channel_id: null,
        client_phone: "052-9876543",
        pickup_details: "מחר בשעה 08:00",
        publisher_email: "chaim@example.com",
        created_by: "chaim@example.com",
        created_date: new Date(),
      },
      {
        id: this.currentTripId++,
        pickup_location: "רמת גן, רחוב ביאליק 30",
        destination: "פתח תקווה, רחוב רוטשילד 12",
        status: "pending",
        price: "65",
        driver_id: null,
        passenger_notes: null,
        passenger_count: null,
        estimated_duration: null,
        vehicle_type: "trip",
        channel_id: null,
        client_phone: "052-5555555",
        pickup_details: "מיידי",
        publisher_email: null,
        created_by: null,
        created_date: new Date(),
      },
      {
        id: this.currentTripId++,
        pickup_location: "אשקלון, רחוב הנשיא 8",
        destination: "באר שבע, רחוב רגר 22",
        status: "pending",
        price: "140",
        driver_id: null,
        passenger_notes: null,
        passenger_count: null,
        estimated_duration: null,
        vehicle_type: "delivery",
        channel_id: null,
        client_phone: "052-7777777",
        pickup_details: "היום בשעה 16:22",
        publisher_email: "chaim@example.com",
        created_by: "chaim@example.com",
        created_date: new Date(),
      },
    ];

    sampleTrips.forEach(trip => this.trips.set(trip.id, trip));

    // Create sample notifications
    const sampleNotifications: Notification[] = [
      {
        id: this.currentNotificationId++,
        title: "נסיעה חדשה זמינה",
        subtitle: "נסיעה מתל אביב לירושלים - ₪120",
        details: "מיקום: רחוב דיזנגוף 100",
        type: "personal",
        status: "new",
        trip_id: null,
        created_date: new Date(),
      },
      {
        id: this.currentNotificationId++,
        title: "נסיעה התקבלה",
        subtitle: "הנהג קיבל את הנסיעה שלך",
        details: "משלוח לרמת גן - ₪65",
        type: "personal",
        status: "new",
        trip_id: null,
        created_date: new Date(),
      },
      {
        id: this.currentNotificationId++,
        title: "עדכון מערכת",
        subtitle: "המערכת תהיה לא זמינה למספר דקות בלילה",
        details: null,
        type: "system",
        status: "new",
        trip_id: null,
        created_date: new Date(),
      },
    ];

    sampleNotifications.forEach(notification => this.notifications.set(notification.id, notification));
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      created_date: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async getTrip(id: number): Promise<Trip | undefined> {
    return this.trips.get(id);
  }

  async listTrips(orderBy?: string): Promise<Trip[]> {
    const trips = Array.from(this.trips.values());
    if (orderBy === "-created_date") {
      return trips.sort((a, b) => new Date(b.created_date!).getTime() - new Date(a.created_date!).getTime());
    }
    return trips;
  }

  async createTrip(insertTrip: InsertTrip): Promise<Trip> {
    const id = this.currentTripId++;
    const trip: Trip = {
      id,
      pickup_location: insertTrip.pickup_location,
      destination: insertTrip.destination,
      status: insertTrip.status ?? null,
      price: insertTrip.price ?? null,
      driver_id: insertTrip.driver_id ?? null,
      passenger_notes: insertTrip.passenger_notes ?? null,
      passenger_count: insertTrip.passenger_count ?? null,
      estimated_duration: insertTrip.estimated_duration ?? null,
      vehicle_type: insertTrip.vehicle_type ?? null,
      channel_id: insertTrip.channel_id ?? null,
      client_phone: insertTrip.client_phone ?? null,
      pickup_details: insertTrip.pickup_details ?? null,
      publisher_email: insertTrip.publisher_email ?? null,
      created_by: insertTrip.created_by ?? null,
      created_date: new Date(),
    };
    this.trips.set(id, trip);
    return trip;
  }

  async updateTrip(id: number, tripUpdate: Partial<InsertTrip>): Promise<Trip | undefined> {
    const existingTrip = this.trips.get(id);
    if (!existingTrip) return undefined;

    const updatedTrip: Trip = {
      ...existingTrip,
      ...tripUpdate,
      status: tripUpdate.status ?? existingTrip.status,
      price: tripUpdate.price ?? existingTrip.price,
      driver_id: tripUpdate.driver_id ?? existingTrip.driver_id,
      passenger_notes: tripUpdate.passenger_notes ?? existingTrip.passenger_notes,
      passenger_count: tripUpdate.passenger_count ?? existingTrip.passenger_count,
      estimated_duration: tripUpdate.estimated_duration ?? existingTrip.estimated_duration,
      vehicle_type: tripUpdate.vehicle_type ?? existingTrip.vehicle_type,
      channel_id: tripUpdate.channel_id ?? existingTrip.channel_id,
      client_phone: tripUpdate.client_phone ?? existingTrip.client_phone,
      pickup_details: tripUpdate.pickup_details ?? existingTrip.pickup_details,
      publisher_email: tripUpdate.publisher_email ?? existingTrip.publisher_email,
      created_by: tripUpdate.created_by ?? existingTrip.created_by,
    };
    this.trips.set(id, updatedTrip);
    return updatedTrip;
  }

  async deleteTrip(id: number): Promise<boolean> {
    return this.trips.delete(id);
  }

  async getDriver(id: number): Promise<Driver | undefined> {
    return this.drivers.get(id);
  }

  async listDrivers(): Promise<Driver[]> {
    return Array.from(this.drivers.values());
  }

  async createDriver(insertDriver: InsertDriver): Promise<Driver> {
    const id = this.currentDriverId++;
    const driver: Driver = {
      id,
      name: insertDriver.name,
      phone: insertDriver.phone,
      vehicle_type: insertDriver.vehicle_type,
      license_plate: insertDriver.license_plate,
      rating: insertDriver.rating ?? "5",
      is_available: insertDriver.is_available ?? true,
      current_location: insertDriver.current_location ?? null,
    };
    this.drivers.set(id, driver);
    return driver;
  }

  async getNotification(id: number): Promise<Notification | undefined> {
    return this.notifications.get(id);
  }

  async listNotifications(orderBy?: string): Promise<Notification[]> {
    const notifications = Array.from(this.notifications.values());
    if (orderBy === "-created_date") {
      return notifications.sort((a, b) => new Date(b.created_date!).getTime() - new Date(a.created_date!).getTime());
    }
    return notifications;
  }

  async createNotification(insertNotification: InsertNotification): Promise<Notification> {
    const id = this.currentNotificationId++;
    const notification: Notification = {
      id,
      title: insertNotification.title,
      subtitle: insertNotification.subtitle,
      details: insertNotification.details ?? null,
      type: insertNotification.type ?? null,
      status: insertNotification.status ?? null,
      trip_id: insertNotification.trip_id ?? null,
      created_date: new Date(),
    };
    this.notifications.set(id, notification);
    return notification;
  }

  async updateNotification(id: number, notificationUpdate: Partial<InsertNotification>): Promise<Notification | undefined> {
    const existingNotification = this.notifications.get(id);
    if (!existingNotification) return undefined;
    
    const updatedNotification: Notification = {
      ...existingNotification,
      ...notificationUpdate,
      details: notificationUpdate.details ?? existingNotification.details,
      type: notificationUpdate.type ?? existingNotification.type,
      status: notificationUpdate.status ?? existingNotification.status,
      trip_id: notificationUpdate.trip_id ?? existingNotification.trip_id,
    };
    this.notifications.set(id, updatedNotification);
    return updatedNotification;
  }
}

export const storage = new MemStorage();
