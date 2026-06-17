import { useState, useCallback } from "react";
import { scheduleService } from "../services/schedule";
import { AvailabilityRule, Booking } from "../types/schedule.types";

export const useAvailabilityRules = () => {
  const [rules, setRules] = useState<AvailabilityRule[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRules = useCallback(async () => {
    setLoading(true);
    try {
      const data = await scheduleService.fetchRules();
      setRules(data);
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao carregar as regras.");
    } finally {
      setLoading(false);
    }
  }, []);

  const saveRule = async (index: number) => {
    const rule = rules[index];

    try {
      if (rule.id) {
        await scheduleService.updateRule(rule.id, rule);
      } else {
        const newRule = await scheduleService.createRule(rule);
        const updatedRules = [...rules];
        updatedRules[index] = newRule;
        setRules(updatedRules);
      }
    } catch (error: any) {
      console.error("ERRO AO SALVAR REGRA:", error);

      if (error?.message) {
        throw new Error(error.message);
      }

      throw error;
    }
  };

  const removeRule = async (index: number) => {
    const rule = rules[index];
    try {
      if (rule.id) {
        await scheduleService.deleteRule(rule.id);
      }
      const updatedRules = [...rules];
      updatedRules.splice(index, 1);
      setRules(updatedRules);
    } catch (error) {
      throw new Error("Erro ao excluir regra.");
    }
  };

  return { rules, setRules, loading, fetchRules, saveRule, removeRule };
};

export const useCalendarSlots = () => {
  const [availableSlots, setAvailableSlots] = useState<{ start: string; end: string }[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchAvailableSlots = useCallback(async (dateStr: string) => {
    setLoadingSlots(true);
    try {
      const selectedDateObj = new Date(dateStr + "T12:00:00");
      const dayOfWeek = selectedDateObj.getDay();

      const rules = await scheduleService.fetchRules();

      let applicableRule = rules.find((r) => r.type === "custom" && r.specific_date === dateStr);
      if (!applicableRule) {
        applicableRule = rules.find((r) => r.type === "recurring" && r.day_of_week === dayOfWeek);
      }

      if (!applicableRule) {
        setAvailableSlots([]);
        return;
      }

      const occupiedSlots = await scheduleService.getOccupiedSlots(dateStr);

      const slots: { start: string; end: string }[] = [];
      let currentStart = new Date(`1970-01-01T${applicableRule.start_time}`);
      const endTime = new Date(`1970-01-01T${applicableRule.end_time}`);
      const durationMs = applicableRule.slot_duration_minutes * 60000;

      while (currentStart.getTime() + durationMs <= endTime.getTime()) {
        const slotEnd = new Date(currentStart.getTime() + durationMs);
        const startStr = currentStart.toTimeString().substring(0, 5);
        const endStr = slotEnd.toTimeString().substring(0, 5);

        const isOccupied = occupiedSlots?.some((occ: any) => {
          const occStartStr = occ.start_t.substring(0, 5);
          const occEndStr = occ.end_t.substring(0, 5);
          return (startStr >= occStartStr && startStr < occEndStr) || (endStr > occStartStr && endStr <= occEndStr);
        });

        if (!isOccupied) {
          slots.push({ start: startStr, end: endStr });
        }
        currentStart = slotEnd;
      }
      setAvailableSlots(slots);
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao buscar horários disponíveis.");
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  const createBooking = async (bookingData: Booking) => {
    setSubmitting(true);
    try {
      await scheduleService.createBooking(bookingData);
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao salvar o agendamento.");
    } finally {
      setSubmitting(false);
    }
  };

  return { availableSlots, setAvailableSlots, loadingSlots, submitting, fetchAvailableSlots, createBooking };
};

export const useDashboardBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const data = await scheduleService.fetchBookings();
      setBookings(data);
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao carregar solicitações.");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateStatus = async (booking: Booking, status: "approved" | "rejected", reason?: string) => {
    try {
      await scheduleService.updateBookingStatus(booking, status, reason);
      await fetchBookings();
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao atualizar status.");
    }
  };

  return { bookings, loading, fetchBookings, updateStatus };
};
