import { pgTable, text, integer, timestamp, serial, boolean, decimal } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const adminUsers = pgTable('admin_users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: text('role').notNull().default('admin'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const shipments = pgTable('shipments', {
  id: serial('id').primaryKey(),
  trackingNumber: text('tracking_number').notNull().unique(),
  senderName: text('sender_name').notNull(),
  senderEmail: text('sender_email').notNull(),
  senderPhone: text('sender_phone'),
  senderAddress: text('sender_address').notNull(),
  recipientName: text('recipient_name').notNull(),
  recipientEmail: text('recipient_email').notNull(),
  recipientPhone: text('recipient_phone'),
  recipientAddress: text('recipient_address').notNull(),
  serviceType: text('service_type').notNull(), // 'express', 'standard', 'overnight'
  packageType: text('package_type').notNull(), // 'document', 'package', 'pallet'
  weight: decimal('weight', { precision: 10, scale: 2 }),
  dimensions: text('dimensions'), // JSON string for length, width, height
  status: text('status').notNull().default('pending'), // 'pending', 'in_transit', 'delivered', 'exception'
  estimatedDelivery: timestamp('estimated_delivery'),
  actualDelivery: timestamp('actual_delivery'),
  cost: decimal('cost', { precision: 10, scale: 2 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const trackingUpdates = pgTable('tracking_updates', {
  id: serial('id').primaryKey(),
  shipmentId: integer('shipment_id').references(() => shipments.id).notNull(),
  status: text('status').notNull(),
  location: text('location').notNull(),
  description: text('description').notNull(),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
  updatedBy: integer('updated_by').references(() => adminUsers.id),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type AdminUser = typeof adminUsers.$inferSelect;
export type NewAdminUser = typeof adminUsers.$inferInsert;
export type Shipment = typeof shipments.$inferSelect;
export type NewShipment = typeof shipments.$inferInsert;
export type TrackingUpdate = typeof trackingUpdates.$inferSelect;
export type NewTrackingUpdate = typeof trackingUpdates.$inferInsert;
