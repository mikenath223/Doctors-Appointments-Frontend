export interface User {
  id: string;
  name: string;
  email: string;
  phoneNo: string;
  password: string;
  photo: string;
}

export interface UserSliceState {
  user: User | null;
  loading: boolean;
}

export interface FindManyDoctorsAttr {
  search: string[];
  offset: 0;
  limit: 10;
}

export interface NextAvailableSlot {
  date: string;
  startTime: string;
}

export interface ProfileInfo {
  experience: string;
  patientStories: number;
  qualification: string;
  ratings: number;
  reviews: string[];
  successRate: number;
}

export interface AvailableTimes {
  available: boolean;
  startTime: string;
}

export interface Availability {
  date: string;
  availableTimes: AvailableTimes[];
}

export interface Doctor {
  about: string;
  createdAt: string;
  email: string;
  id: string;
  name: string;
  nextAvailableSlot: NextAvailableSlot;
  phoneNo: string;
  photo: string;
  profileInfo: ProfileInfo;
  role: string;
  specialty: string;
  updatedAt: string;
}

export interface DoctorDetails extends Omit<Doctor, "nextAvailableSlot"> {
  availability: Availability[];
}

export interface FindManyMockUsersAttr {
  offset: 0;
  limit: 10;
}

export interface MockUser extends User {
  isUserDependentAdded: boolean;
}
