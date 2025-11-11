import { 
  type Admin, type InsertAdmin,
  type Client, type InsertClient,
  type Review, type InsertReview,
  type Booking, type InsertBooking,
  admins, clients, reviews, bookings
} from "@shared/schema";
import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Admin methods
  getAdminByUsername(username: string): Promise<Admin | undefined>;
  createAdmin(admin: InsertAdmin): Promise<Admin>;
  
  // Client methods
  getAllClients(): Promise<Client[]>;
  getClient(id: string): Promise<Client | undefined>;
  createClient(client: InsertClient): Promise<Client>;
  updateClient(id: string, client: Partial<InsertClient>): Promise<Client | undefined>;
  deleteClient(id: string): Promise<boolean>;
  
  // Review methods
  getAllReviews(): Promise<Review[]>;
  getApprovedReviews(): Promise<Review[]>;
  getReview(id: string): Promise<Review | undefined>;
  createReview(review: InsertReview): Promise<Review>;
  approveReview(id: string): Promise<Review | undefined>;
  deleteReview(id: string): Promise<boolean>;
  
  // Booking methods
  getAllBookings(): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  markBookingAsRead(id: string): Promise<Booking | undefined>;
}

export class MemStorage implements IStorage {
  private admins: Map<string, Admin>;
  private clients: Map<string, Client>;
  private reviews: Map<string, Review>;
  private bookings: Map<string, Booking>;

  constructor() {
    this.admins = new Map();
    this.clients = new Map();
    this.reviews = new Map();
    this.bookings = new Map();
  }

  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    return Array.from(this.admins.values()).find(
      (admin) => admin.username === username,
    );
  }

  async createAdmin(insertAdmin: InsertAdmin): Promise<Admin> {
    const id = randomUUID();
    const admin: Admin = { ...insertAdmin, id };
    this.admins.set(id, admin);
    return admin;
  }

  async getAllClients(): Promise<Client[]> {
    return Array.from(this.clients.values());
  }

  async getClient(id: string): Promise<Client | undefined> {
    return this.clients.get(id);
  }

  async createClient(insertClient: InsertClient): Promise<Client> {
    const id = randomUUID();
    const client: Client = { 
      ...insertClient, 
      id,
      logoUrl: insertClient.logoUrl || null,
      createdAt: new Date(),
    };
    this.clients.set(id, client);
    return client;
  }

  async updateClient(id: string, updates: Partial<InsertClient>): Promise<Client | undefined> {
    const client = this.clients.get(id);
    if (!client) return undefined;
    
    const updated: Client = { ...client, ...updates };
    this.clients.set(id, updated);
    return updated;
  }

  async deleteClient(id: string): Promise<boolean> {
    return this.clients.delete(id);
  }

  async getAllReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values());
  }

  async getApprovedReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(r => r.approved);
  }

  async getReview(id: string): Promise<Review | undefined> {
    return this.reviews.get(id);
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = randomUUID();
    const review: Review = { 
      ...insertReview, 
      id,
      approved: false,
      createdAt: new Date(),
    };
    this.reviews.set(id, review);
    return review;
  }

  async approveReview(id: string): Promise<Review | undefined> {
    const review = this.reviews.get(id);
    if (!review) return undefined;
    
    const approved: Review = { ...review, approved: true };
    this.reviews.set(id, approved);
    return approved;
  }

  async deleteReview(id: string): Promise<boolean> {
    return this.reviews.delete(id);
  }

  async getAllBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const booking: Booking = { 
      ...insertBooking, 
      id,
      read: false,
      createdAt: new Date(),
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async markBookingAsRead(id: string): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (!booking) return undefined;
    
    const updatedBooking: Booking = { ...booking, read: true };
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }
}

export class FileStorage implements IStorage {
  private filePath: string;
  private data: {
    admins: Admin[];
    clients: Client[];
    reviews: Review[];
    bookings: Booking[];
  };

  constructor(filePath?: string) {
    this.filePath = filePath || path.resolve(process.cwd(), "data", "storage.json");
    this.data = { admins: [], clients: [], reviews: [], bookings: [] };
    this.ensureFile();
    this.load();
  }

  private ensureFile() {
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify({ admins: [], clients: [], reviews: [], bookings: [] }, null, 2));
    }
  }

  private load() {
    try {
      const raw = fs.readFileSync(this.filePath, "utf8");
      const parsed = JSON.parse(raw);
      this.data = {
        admins: parsed.admins || [],
        clients: parsed.clients || [],
        reviews: parsed.reviews || [],
        bookings: parsed.bookings || [],
      };
    } catch (e) {
      console.error("Failed to load storage file, starting with empty data", e);
      this.data = { admins: [], clients: [], reviews: [], bookings: [] };
    }
  }

  private save() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
  }

  // Admin methods
  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    return this.data.admins.find((a) => a.username === username);
  }

  async createAdmin(insertAdmin: InsertAdmin): Promise<Admin> {
    const id = randomUUID();
    const admin: Admin = { ...insertAdmin, id };
    this.data.admins.push(admin);
    this.save();
    return admin;
  }

  // Client methods
  async getAllClients(): Promise<Client[]> {
    return this.data.clients;
  }

  async getClient(id: string): Promise<Client | undefined> {
    return this.data.clients.find((c) => c.id === id);
  }

  async createClient(insertClient: InsertClient): Promise<Client> {
    const id = randomUUID();
    const client: Client = {
      ...insertClient,
      id,
      logoUrl: insertClient.logoUrl || null,
      createdAt: new Date(),
    };
    this.data.clients.push(client);
    this.save();
    return client;
  }

  async updateClient(id: string, updates: Partial<InsertClient>): Promise<Client | undefined> {
    const idx = this.data.clients.findIndex((c) => c.id === id);
    if (idx === -1) return undefined;
    const updated = { ...this.data.clients[idx], ...updates } as Client;
    this.data.clients[idx] = updated;
    this.save();
    return updated;
  }

  async deleteClient(id: string): Promise<boolean> {
    const orig = this.data.clients.length;
    this.data.clients = this.data.clients.filter((c) => c.id !== id);
    const changed = this.data.clients.length !== orig;
    if (changed) this.save();
    return changed;
  }

  // Review methods
  async getAllReviews(): Promise<Review[]> {
    return this.data.reviews;
  }

  async getApprovedReviews(): Promise<Review[]> {
    return this.data.reviews.filter((r) => r.approved);
  }

  async getReview(id: string): Promise<Review | undefined> {
    return this.data.reviews.find((r) => r.id === id);
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = randomUUID();
    const review: Review = { ...insertReview, id, approved: false, createdAt: new Date() };
    this.data.reviews.push(review);
    this.save();
    return review;
  }

  async approveReview(id: string): Promise<Review | undefined> {
    const idx = this.data.reviews.findIndex((r) => r.id === id);
    if (idx === -1) return undefined;
    this.data.reviews[idx] = { ...this.data.reviews[idx], approved: true } as Review;
    this.save();
    return this.data.reviews[idx];
  }

  async deleteReview(id: string): Promise<boolean> {
    const orig = this.data.reviews.length;
    this.data.reviews = this.data.reviews.filter((r) => r.id !== id);
    const changed = this.data.reviews.length !== orig;
    if (changed) this.save();
    return changed;
  }

  // Booking methods
  async getAllBookings(): Promise<Booking[]> {
    return this.data.bookings;
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const booking: Booking = { ...insertBooking, id, read: false, createdAt: new Date() };
    this.data.bookings.push(booking);
    this.save();
    return booking;
  }

  async markBookingAsRead(id: string): Promise<Booking | undefined> {
    const idx = this.data.bookings.findIndex((b) => b.id === id);
    if (idx === -1) return undefined;
    this.data.bookings[idx] = { ...this.data.bookings[idx], read: true } as Booking;
    this.save();
    return this.data.bookings[idx];
  }
}

export class DatabaseStorage implements IStorage {
  // Admin methods
  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    const result = await db.select().from(admins).where(eq(admins.username, username));
    return result[0];
  }

  async createAdmin(insertAdmin: InsertAdmin): Promise<Admin> {
    const result = await db.insert(admins).values(insertAdmin).returning();
    return result[0];
  }

  // Client methods
  async getAllClients(): Promise<Client[]> {
    return await db.select().from(clients);
  }

  async getClient(id: string): Promise<Client | undefined> {
    const result = await db.select().from(clients).where(eq(clients.id, id));
    return result[0];
  }

  async createClient(insertClient: InsertClient): Promise<Client> {
    const result = await db.insert(clients).values(insertClient).returning();
    return result[0];
  }

  async updateClient(id: string, updates: Partial<InsertClient>): Promise<Client | undefined> {
    const result = await db.update(clients).set(updates).where(eq(clients.id, id)).returning();
    return result[0];
  }

  async deleteClient(id: string): Promise<boolean> {
    const result = await db.delete(clients).where(eq(clients.id, id)).returning();
    return result.length > 0;
  }

  // Review methods
  async getAllReviews(): Promise<Review[]> {
    return await db.select().from(reviews);
  }

  async getApprovedReviews(): Promise<Review[]> {
    return await db.select().from(reviews).where(eq(reviews.approved, true));
  }

  async getReview(id: string): Promise<Review | undefined> {
    const result = await db.select().from(reviews).where(eq(reviews.id, id));
    return result[0];
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const result = await db.insert(reviews).values(insertReview).returning();
    return result[0];
  }

  async approveReview(id: string): Promise<Review | undefined> {
    const result = await db.update(reviews).set({ approved: true }).where(eq(reviews.id, id)).returning();
    return result[0];
  }

  async deleteReview(id: string): Promise<boolean> {
    const result = await db.delete(reviews).where(eq(reviews.id, id)).returning();
    return result.length > 0;
  }

  // Booking methods
  async getAllBookings(): Promise<Booking[]> {
    return await db.select().from(bookings);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const result = await db.insert(bookings).values(insertBooking).returning();
    return result[0];
  }

  async markBookingAsRead(id: string): Promise<Booking | undefined> {
    const result = await db.update(bookings).set({ read: true }).where(eq(bookings.id, id)).returning();
    return result[0];
  }
}

// Use database storage if DATABASE_URL is set, otherwise fall back to file storage
export const storage = process.env.DATABASE_URL 
  ? new DatabaseStorage() 
  : new FileStorage();
