import { supabase } from "../utils/supabase";
import { AvailabilityRule, Booking } from "../types/schedule.types";

const WEBHOOK_URL = import.meta.env.VITE_N8N_URL;

export const scheduleService = {
  async fetchRules() {
    const { data, error } = await supabase
      .from("availability_rules")
      .select("*")
      .order("type", { ascending: false })
      .order("day_of_week", { ascending: true });
    if (error) throw error;
    return data as AvailabilityRule[];
  },

  async createRule(rule: AvailabilityRule) {
    const { data, error } = await supabase.from("availability_rules").insert(rule).select();
    if (error) throw error;
    return data[0] as AvailabilityRule;
  },

  async updateRule(id: string, rule: Partial<AvailabilityRule>) {
    const { error } = await supabase.from("availability_rules").update(rule).eq("id", id);
    if (error) throw error;
  },

  async deleteRule(id: string) {
    const { error } = await supabase.from("availability_rules").delete().eq("id", id);
    if (error) throw error;
  },

  // Calendar logic
  async getOccupiedSlots(dateStr: string) {
    const { data, error } = await supabase.rpc("get_occupied_slots", { target_date: dateStr });
    if (error) throw error;
    return data;
  },

  async createBooking(bookingData: Booking) {
    const { data, error } = await supabase.from("presentation_bookings").insert(bookingData).select();
    if (error) throw error;

    // N8N trigger - ADMIN
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "new_booking",
        administrador: true,
        target_whatsapp: import.meta.env.VITE_WHATSAPP_ADMIN_SCHEDULE,
        data: bookingData,
        admin_link: window.location.origin + "/admin/agendamentos",
      }),
    }).catch((err) => console.error("Webhook error:", err));

    // N8N trigger - USER (Company)
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "new_booking",
        administrador: false,
        target_whatsapp: bookingData.whatsapp,
        description:
          "Sua solicitação foi realizada com sucesso e atualmente está com status Pendente. A confirmação ou recusa será informada assim que o status for atualizado.",
        data: bookingData,
      }),
    }).catch((err) => console.error("Webhook error:", err));

    return data[0] as Booking;
  },

  // Dashboard logic
  async fetchBookings() {
    const { data, error } = await supabase
      .from("presentation_bookings")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data as Booking[];
  },

  async updateBookingStatus(booking: Booking, status: "approved" | "rejected", reason?: string) {
    const { error } = await supabase
      .from("presentation_bookings")
      .update({ status, rejection_reason: reason })
      .eq("id", booking.id);
    if (error) throw error;

    let notificationDesc = "";
    if (status === "approved") {
      notificationDesc = `Sua solicitação de agendamento foi APROVADA!\n\nDetalhes confirmados:\nEmpresa: ${booking.company_name || "N/A"}\nResponsável: ${booking.responsible_name}\nData: ${booking.scheduled_date}\nHorário: ${booking.start_time.slice(0, 5)} às ${booking.end_time.slice(0, 5)}\nDescrição: ${booking.description}`;
    } else if (status === "rejected") {
      notificationDesc = `Infelizmente, sua solicitação de agendamento foi RECUSADA.\n\nMotivo informado: ${reason}\n\nDetalhes do pedido rejeitado:\nData: ${booking.scheduled_date}\nHorário: ${booking.start_time.slice(0, 5)} às ${booking.end_time.slice(0, 5)}\nDescrição: ${booking.description}`;
    }

    // N8N trigger for update - USER (Company)
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "status_update",
        administrador: false,
        target_whatsapp: booking.whatsapp,
        description: notificationDesc,
        data: {
          ...booking,
          status,
          rejection_reason: reason,
        },
      }),
    }).catch((err) => console.error("Webhook error:", err));
  },
};
