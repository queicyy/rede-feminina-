import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonDatetime,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonSpinner,
  IonToast,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonButtons,
  IonMenuButton,
} from "@ionic/react";
import { calendarOutline, timeOutline, checkmarkCircleOutline } from "ionicons/icons";
import { useCalendarSlots } from "../../hooks/useSchedule";
import { Booking } from "../../types/schedule.types";

const CalendarPage: React.FC = () => {
  const { availableSlots, loadingSlots, submitting, fetchAvailableSlots, createBooking } = useCalendarSlots();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{ start: string; end: string } | null>(null);

  // Form states
  const [responsibleName, setResponsibleName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [description, setDescription] = useState("");

  const [institutionType, setInstitutionType] = useState("");
  const [participants, setParticipants] = useState("");
  const [address, setAddress] = useState("");

  const [toastMsg, setToastMsg] = useState("");
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(selectedDate).catch((err) => setToastMsg(err.message));
      setSelectedSlot(null);
    }
  }, [selectedDate, fetchAvailableSlots]);

  const handleBooking = async () => {
    if (!selectedDate || !selectedSlot || !responsibleName || !email || !whatsapp || !description) {
      setToastMsg("Preencha todos os campos obrigatórios.");
      return;
    }

    const bookingData: Booking = {
      responsible_name: responsibleName,
      company_name: companyName,
      email,
      whatsapp,
      description,
      scheduled_date: selectedDate,
      start_time: selectedSlot.start + ":00",
      end_time: selectedSlot.end + ":00",
      status: "pending",
    };

    try {
      await createBooking(bookingData);
      setSuccess(true);
    } catch (error: any) {
      setToastMsg(error.message);
    }
  };

  const resetForm = () => {
    setSuccess(false);
    setSelectedDate(null);
    setSelectedSlot(null);
    setResponsibleName("");
    setCompanyName("");
    setEmail("");
    setWhatsapp("");
    setDescription("");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Solicitar Palestra</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div
          style={{
            backgroundColor: "#fff3f7",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "20px",
            border: "1px solid #f7c6d7",
          }}
        >
          <h3>Palestras Outubro Rosa</h3>

          <p>
            A Rede Feminina de Combate ao Câncer de Itapema realiza palestras de conscientização sobre prevenção e
            diagnóstico precoce do câncer de mama.
          </p>

          <p>
            Consulte as datas disponíveis e envie sua solicitação de agendamento. Nossa equipe analisará o pedido e
            entrará em contato para confirmação.
          </p>
        </div>
        {success ? (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <IonIcon icon={checkmarkCircleOutline} color="success" style={{ fontSize: "80px" }} />
            <h2>Solicitação Enviada!</h2>
            <p>
              Sua solicitação de agendamento foi enviada para nossa equipe e está sob análise. Você receberá um retorno
              em breve via WhatsApp.
            </p>
            <IonButton onClick={resetForm} className="ion-margin-top">
              Agendar Nova Apresentação
            </IonButton>
          </div>
        ) : (
          <IonGrid>
            <IonRow>
              <IonCol size="12" sizeMd="6">
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>1. Escolha uma Data</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonDatetime
                      presentation="date"
                      min={new Date().toISOString()}
                      value={selectedDate ? selectedDate + "T12:00:00" : undefined}
                      onIonChange={(e) => {
                        const val = e.detail.value;
                        if (typeof val === "string") {
                          setSelectedDate(val.split("T")[0]);
                        }
                      }}
                    />
                  </IonCardContent>
                </IonCard>
              </IonCol>

              <IonCol size="12" sizeMd="6">
                {selectedDate && (
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>2. Escolha o Horário</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      {loadingSlots ? (
                        <IonSpinner />
                      ) : availableSlots.length === 0 ? (
                        <p>Nenhum horário disponível para esta data.</p>
                      ) : (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                          {availableSlots.map((slot, i) => (
                            <IonButton
                              key={i}
                              fill={selectedSlot?.start === slot.start ? "solid" : "outline"}
                              onClick={() => setSelectedSlot(slot)}
                            >
                              <IonIcon slot="start" icon={timeOutline} />
                              {slot.start} às {slot.end}
                            </IonButton>
                          ))}
                        </div>
                      )}
                    </IonCardContent>
                  </IonCard>
                )}

                {selectedSlot && (
                  <IonCard>
                   <IonCardHeader>
  <IonCardTitle>
    3. Informações da Instituição
  </IonCardTitle>
</IonCardHeader>

<IonCardContent>
  <p
    style={{
      fontSize: "12px",
      marginBottom: "10px",
      color: "#d63384",
    }}
  >
    * Campos obrigatórios
  </p>
                      <IonItem>
                        <IonLabel position="stacked">Nome do Responsável *</IonLabel>
                        <IonInput
                          value={responsibleName}
                          onIonChange={(e) => setResponsibleName(e.detail.value!)}
                          placeholder="Seu nome"
                        />
                      </IonItem>
                      <IonItem>
                        <IonLabel position="stacked">Nome da Empresa</IonLabel>
                        <IonInput
                          value={companyName}
                          onIonChange={(e) => setCompanyName(e.detail.value!)}
                          placeholder="Sua empresa (opcional)"
                        />
                      </IonItem>

                      <IonItem>
                        <IonLabel position="stacked">Tipo de Instituição *</IonLabel>
                        <IonInput
                          value={institutionType}
                          onIonChange={(e) => setInstitutionType(e.detail.value!)}
                          placeholder="Escola, Empresa, ONG..."
                        />
                      </IonItem>

                      <IonItem>
                        <IonLabel position="stacked">Quantidade de Participantes *</IonLabel>
                        <IonInput
                          type="number"
                          value={participants}
                          onIonChange={(e) => setParticipants(e.detail.value!)}
                          placeholder="Ex: 50"
                        />
                      </IonItem>

                      <IonItem>
                        <IonLabel position="stacked">Local da Palestra *</IonLabel>
                        <IonInput
                          value={address}
                          onIonChange={(e) => setAddress(e.detail.value!)}
                          placeholder="Rua, número e bairro"
                        />
                      </IonItem>

                      <IonItem>
                        <IonLabel position="stacked">Email *</IonLabel>
                        <IonInput
                          type="email"
                          value={email}
                          onIonChange={(e) => setEmail(e.detail.value!)}
                          placeholder="seu@email.com"
                        />
                      </IonItem>
                      <IonItem>
                        <IonLabel position="stacked">WhatsApp *</IonLabel>
                        <IonInput
                          type="tel"
                          value={whatsapp}
                          onIonChange={(e) => setWhatsapp(e.detail.value!)}
                          placeholder="(DD) 99999-9999"
                        />
                      </IonItem>
                      <IonItem>
                        <IonLabel position="stacked">Descrição da Palestra *</IonLabel>
                        <IonTextarea
                          value={description}
                          onIonChange={(e) => setDescription(e.detail.value!)}
                          rows={3}
                          placeholder="Assunto abordado, público alvo..."
                        />
                      </IonItem>

                      <IonButton
                        expand="block"
                        className="ion-margin-top"
                        onClick={handleBooking}
                        disabled={submitting}
                      >
                        {submitting ? <IonSpinner name="crescent" /> : "Confirmar Solicitação"}
                        <IonIcon slot="end" icon={calendarOutline} />
                      </IonButton>
                    </IonCardContent>
                  </IonCard>
                )}
              </IonCol>
            </IonRow>
          </IonGrid>
        )}

        <IonToast isOpen={!!toastMsg} message={toastMsg} duration={3000} onDidDismiss={() => setToastMsg("")} />
      </IonContent>
    </IonPage>
  );
};
export default CalendarPage;