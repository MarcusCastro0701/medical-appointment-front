import { api } from "./client";

export type Appointment = {
  id: string;
  professional: {
    id: number;
    name: string;
    specialty: string;
  };
  patientName: string;
  reason: string | null;
  datetime: string;
  createdAt: string;
};

export const appointmentsApi = {
  list: () => api.get<Appointment[]>("/appointments"),
};
