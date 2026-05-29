import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonSpinner,
  IonButton,
  IonModal,
  IonTextarea,
  IonToast,
} from "@ionic/react";
import { useDashboardBookings } from "../../../hooks/useSchedule";
import { Booking } from "../../../types/schedule.types";

const AgendamentosDashboard: React.FC = () => {
  const { bookings, loading, fetchBookings, updateStatus } = useDashboardBookings();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    fetchBookings().catch((err) => setToastMessage(err.message));
  }, [fetchBookings]);

  const handleUpdateStatus = async (id: string, status: "approved" | "rejected", reason?: string) => {
    const bookingToNotify = bookings.find((b) => b.id === id);
    if (!bookingToNotify) return;

    try {
      await updateStatus(bookingToNotify, status, reason);
      setToastMessage(`Solicitação ${status === "approved" ? "aprovada" : "recusada"}!`);
      setShowRejectModal(false);
      setSelectedBooking(null);
    } catch (error: any) {
      setToastMessage(error.message);
    }
  };

  const getStatusColor = (status: string) => {
    if (status === "approved") return "success";
    if (status === "rejected") return "danger";
    return "warning";
  };

  const getStatusLabel = (status: string) => {
    if (status === "approved") return "Aprovado";
    if (status === "rejected") return "Recusado";
    return "Pendente";
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="">
          <IonTitle>Solicitações de Agendamento</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {loading ? (
          <IonSpinner />
        ) : (
          <IonList>
            {bookings.length === 0 && <p>Nenhuma solicitação encontrada.</p>}
            {bookings.map((booking) => (
              <IonItem button key={booking.id} onClick={() => setSelectedBooking(booking)}>
                <IonLabel>
                  <h2>
                    {booking.responsible_name} {booking.company_name && `- ${booking.company_name}`}
                  </h2>
                  <p>
                    Data: {booking.scheduled_date} | {booking.start_time.slice(0, 5)} as {booking.end_time.slice(0, 5)}
                  </p>
                </IonLabel>
                <IonBadge color={getStatusColor(booking.status)}>{getStatusLabel(booking.status)}</IonBadge>
              </IonItem>
            ))}
          </IonList>
        )}

        {/* Modal of Details */}
        <IonModal isOpen={!!selectedBooking} onDidDismiss={() => setSelectedBooking(null)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Detalhes da Solicitação</IonTitle>
              <IonButton slot="end" fill="clear" onClick={() => setSelectedBooking(null)}>
                Fechar
              </IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            {selectedBooking && (
              <div>
                <h2>{selectedBooking.responsible_name}</h2>
                <p>
                  <strong>Status:</strong>{" "}
                  <IonBadge color={getStatusColor(selectedBooking.status)}>
                    {getStatusLabel(selectedBooking.status)}
                  </IonBadge>
                </p>
                <p>
                  <strong>Empresa:</strong> {selectedBooking.company_name || "N/A"}
                </p>
                <p>
                  <strong>Email:</strong> {selectedBooking.email}
                </p>
                <p>
                  <strong>WhatsApp:</strong> {selectedBooking.whatsapp}
                </p>
                <p>
                  <strong>Data:</strong> {selectedBooking.scheduled_date}
                </p>
                <p>
                  <strong>Horário:</strong> {selectedBooking.start_time.slice(0, 5)} às{" "}
                  {selectedBooking.end_time.slice(0, 5)}
                </p>
                <p>
                  <strong>Descrição:</strong>
                </p>
                <div style={{ backgroundColor: "#f4f4f4", padding: "10px", borderRadius: "8px" }}>
                  {selectedBooking.description}
                </div>

                {selectedBooking.status === "pending" && (
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                    <IonButton color="danger" fill="outline" onClick={() => setShowRejectModal(true)}>
                      Recusar
                    </IonButton>
                    <IonButton color="success" onClick={() => handleUpdateStatus(selectedBooking.id!, "approved")}>
                      Aprovar
                    </IonButton>
                  </div>
                )}
                {selectedBooking.status === "rejected" && (
                  <p style={{ marginTop: "10px", color: "red" }}>
                    <strong>Motivo da Recusa:</strong> {selectedBooking.rejection_reason}
                  </p>
                )}
              </div>
            )}
          </IonContent>
        </IonModal>

        {/* Modal Rejection Reason */}
        <IonModal
          isOpen={showRejectModal}
          onDidDismiss={() => setShowRejectModal(false)}
          initialBreakpoint={0.5}
          breakpoints={[0, 0.5]}
        >
          <IonContent className="ion-padding">
            <h2>Motivo da Recusa</h2>
            <p>Por favor, informe o motivo para o palestrante:</p>
            <IonItem>
              <IonTextarea
                placeholder="Escreva o motivo..."
                value={rejectionReason}
                onIonChange={(e) => setRejectionReason(e.detail.value!)}
                rows={4}
              />
            </IonItem>
            <IonButton
              expand="block"
              color="danger"
              onClick={() => {
                if (selectedBooking) {
                  handleUpdateStatus(selectedBooking.id!, "rejected", rejectionReason);
                }
              }}
              disabled={!rejectionReason}
            >
              Confirmar Recusa
            </IonButton>
          </IonContent>
        </IonModal>

        <IonToast
          isOpen={!!toastMessage}
          message={toastMessage}
          duration={2000}
          onDidDismiss={() => setToastMessage("")}
        />
      </IonContent>
    </IonPage>
  );
};

export default AgendamentosDashboard;
