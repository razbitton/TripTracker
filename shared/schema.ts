import { pgTable, text, serial, integer, boolean, timestamp, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  username: text("username").notNull(),
  full_name: text("full_name").notNull(),
  phone: text("phone").notNull(),
  created_date: timestamp("created_date").defaultNow(),
});

export const trips = pgTable("trips", {
  id: serial("id").primaryKey(),
  pickup_location: text("pickup_location").notNull(),
  destination: text("destination").notNull(),
  status: text("status", { enum: ["pending", "accepted", "in_progress", "completed", "cancelled"] }).default("pending"),
  price: numeric("price"),
  driver_id: text("driver_id"),
  passenger_notes: text("passenger_notes"),
  passenger_count: integer("passenger_count"),
  estimated_duration: integer("estimated_duration"),
  vehicle_type: text("vehicle_type", { enum: ["trip", "delivery"] }),
  channel_id: text("channel_id"),
  client_phone: text("client_phone"),
  pickup_details: text("pickup_details"),
  publisher_email: text("publisher_email"),
  created_by: text("created_by"),
  created_date: timestamp("created_date").defaultNow(),
});

export const drivers = pgTable("drivers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  vehicle_type: text("vehicle_type", { enum: ["small_truck", "medium_truck", "large_truck"] }).notNull(),
  license_plate: text("license_plate").notNull(),
  rating: numeric("rating").default("5"),
  is_available: boolean("is_available").default(true),
  current_location: text("current_location"),
});

export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  details: text("details"),
  type: text("type", { enum: ["personal", "system"] }).default("personal"),
  status: text("status", { enum: ["new", "read"] }).default("new"),
  trip_id: text("trip_id"),
  created_date: timestamp("created_date").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  created_date: true,
});

export const insertTripSchema = createInsertSchema(trips).omit({
  id: true,
  created_date: true,
});

export const insertDriverSchema = createInsertSchema(drivers).omit({
  id: true,
});

export const insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  created_date: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertTrip = z.infer<typeof insertTripSchema>;
export type Trip = typeof trips.$inferSelect;
export type InsertDriver = z.infer<typeof insertDriverSchema>;
export type Driver = typeof drivers.$inferSelect;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;
export type Notification = typeof notifications.$inferSelect;
