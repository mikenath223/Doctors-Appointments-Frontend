export interface Appointment {
  id: string;
  date: string;
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  };
  doctorId: string;
  purpose: string;
  time: string;
  userId: string;
  status: APPOINTMENT_STATUS;
  updatedAt: {
    _seconds: number;
    _nanoseconds: number;
  };
  doctor: {
    createdAt: string;
    specialty: string;
    role: string;
    profileInfo: {
      qualification: string;
      patientStories: number;
      reviews: Array<string>;
      successRate: number;
      ratings: number;
      experience: string;
    };
    name: string;
    address?: string;
    about: string;
    photo: string;
    id: string;
    email: string;
    phoneNo: string;
    updatedAt: string;
  };
  meetingLink: string;
  amountPaid: string;
  refundAmount: string;
  consultation: CONSULTATION_TYPE;
}

export enum CONSULTATION_TYPE {
  messaging = "MESSAGING",
  voiceCall = "VOICE_CALL",
  videoCall = "VIDEO_CALL",
  inPerson = "IN_PERSON",
}

export interface IBookAppointmentFormData {
  consultation: CONSULTATION_TYPE;
  purpose: string;
}

export enum APPOINTMENT_STATUS {
  upcoming = "UPCOMING",
  cancelled = "CANCELLED",
  completed = "COMPLETED",
}
