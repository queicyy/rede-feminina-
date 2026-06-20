import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonList,
  IonIcon,
  IonToast,
  IonSpinner,
  IonButtons,
  IonMenuButton,
} from "@ionic/react";
import { trashOutline, addOutline } from "ionicons/icons";
import { useAvailabilityRules } from "../../../hooks/useSchedule";
import { AvailabilityRule } from "../../../types/schedule.types";

const AvailabilityConfig: React.FC = () => {
  const { rules, setRules, loading, fetchRules, saveRule, removeRule } = useAvailabilityRules();
  const [toastMessage, setToastMessage] = useState("");

  const daysOfWeek = [
    { value: 0, label: "Domingo" },
    { value: 1, label: "Segunda-feira" },
    { value: 2, label: "Terça-feira" },
    { value: 3, label: "Quarta-feira" },
    { value: 4, label: "Quinta-feira" },
    { value: 5, label: "Sexta-feira" },
    { value: 6, label: "Sábado" },
  ];

  useEffect(() => {
    fetchRules().catch((err) => setToastMessage(err.message));
  }, [fetchRules]);

  const handleAddRule = () => {
    setRules([
      ...rules,
      {
        type: "recurring",
        day_of_week: 1,
        start_time: "08:00",
        end_time: "17:00",
        slot_duration_minutes: 60,
      },
    ]);
  };

  const handleRuleChange = (index: number, field: keyof AvailabilityRule, value: any) => {
    const updatedRules = [...rules];
    (updatedRules[index] as any)[field] = value;

    if (field === "type") {
      if (value === "recurring") {
        updatedRules[index].specific_date = null;
        updatedRules[index].day_of_week = 1;
      } else {
        updatedRules[index].day_of_week = null;
        updatedRules[index].specific_date = new Date().toISOString().split("T")[0];
      }
    }

    setRules(updatedRules);
  };

  const handleSave = async (index: number) => {
    try {
      await saveRule(index);
      setToastMessage("Regra salva com sucesso!");
    } catch (error: any) {
      setToastMessage(error.message);
    }
  };

  const handleDelete = async (index: number) => {
    try {
      await removeRule(index);
      setToastMessage("Regra removida.");
    } catch (error: any) {
      setToastMessage(error.message);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Gerenciar Horários</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>Regras de Disponibilidade</h2>
        <p>Defina quais dias e horários estão abertos para agendamento de palestras.</p>

        {loading ? (
          <IonSpinner />
        ) : (
          <IonList>
            {rules.map((rule, index) => (
              <div
                key={rule.id || index}
                style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0", borderRadius: "8px" }}
              >
                <IonItem lines="none">
                  <IonLabel position="stacked">Tipo de Regra</IonLabel>
                  <IonSelect value={rule.type} onIonChange={(e) => handleRuleChange(index, "type", e.detail.value)}>
                    <IonSelectOption value="recurring">Dia da Semana (Recorrente)</IonSelectOption>
                    <IonSelectOption value="custom">Data Específica</IonSelectOption>
                  </IonSelect>
                </IonItem>

                {rule.type === "recurring" ? (
                  <IonItem lines="none">
                    <IonLabel position="stacked">Dia da Semana</IonLabel>
                    <IonSelect
                      value={rule.day_of_week}
                      onIonChange={(e) => handleRuleChange(index, "day_of_week", parseInt(e.detail.value, 10))}
                    >
                      {daysOfWeek.map((day) => (
                        <IonSelectOption key={day.value} value={day.value}>
                          {day.label}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>
                ) : (
                  <IonItem lines="none">
                    <IonLabel position="stacked">Data Específica</IonLabel>
                    <IonInput
                      type="date"
                      value={rule.specific_date}
                      onIonChange={(e) => handleRuleChange(index, "specific_date", e.detail.value)}
                    />
                  </IonItem>
                )}

                <IonItem lines="none">
                  <IonLabel position="stacked">Horário Início</IonLabel>
                  <IonInput
                    type="time"
                    value={rule.start_time}
                    onIonChange={(e) => handleRuleChange(index, "start_time", e.detail.value)}
                  />
                </IonItem>

                <IonItem lines="none">
                  <IonLabel position="stacked">Horário Fim</IonLabel>
                  <IonInput
                    type="time"
                    value={rule.end_time}
                    onIonChange={(e) => handleRuleChange(index, "end_time", e.detail.value)}
                  />
                </IonItem>

                <IonItem lines="none">
                  <IonLabel position="stacked">Duração (Minutos) por Palestra</IonLabel>
                  <IonInput
                    type="number"
                    value={rule.slot_duration_minutes}
                    onIonChange={(e) =>
                      handleRuleChange(index, "slot_duration_minutes", parseInt(e.detail.value || "60", 10))
                    }
                  />
                </IonItem>

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                  <IonButton color="danger" fill="outline" onClick={() => handleDelete(index)}>
                    <IonIcon slot="icon-only" icon={trashOutline} />
                  </IonButton>
                  <IonButton color="success" onClick={() => handleSave(index)}>
                    Salvar
                  </IonButton>
                </div>
              </div>
            ))}
          </IonList>
        )}

        <IonButton expand="block" onClick={handleAddRule} className="ion-margin-top">
          <IonIcon slot="start" icon={addOutline} />
          Nova Regra
        </IonButton>

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

export default AvailabilityConfig;