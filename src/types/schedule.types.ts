export interface AvailabilityRule {
  id?: string;
  type: "recurring" | "custom";
  day_of_week?: number | null;
  specific_date?: string | null;
  start_time: string;
  end_time: string;
  slot_duration_minutes: number;
}

export interface Booking {
  id?: string;
  responsible_name: string;
  company_name?: string;
  email: string;
  whatsapp: string;
  description: string;
  scheduled_date: string;
  start_time: string;
  end_time: string;
  status: "pending" | "approved" | "rejected";
  rejection_reason?: string;
  created_at?: string;
}
