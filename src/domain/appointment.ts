export interface Appointment {
  date: string;
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  };
  doctorId: string;
  purpose: string;
  time: string;
  userId: string;
  status: string;
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
}
