import { TAcademicSemester } from '.';

export type TSemester = {
  _id: string;
  academicSemester: TAcademicSemester;
  status: string;
  startDate: string;
  endDate: string;
  minCredit: number;
  maxCredit: number;
  createdAt: string;
  updatedAt: string;
};

export type TCourse = {
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: { course: string | null; isDeleted: boolean }[];
  isDeleted: boolean;
};

export type TFacultyBrief = {
  _id: string;
  name?: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  email?: string;
};

export type TOfferedCourse = {
  _id: string;
  course: TCourse;
  semesterRegistration: {
    _id: string;
    academicSemester: TAcademicSemester;
  };
  section: number;
  maxCapacity: number;
  faculty: TFacultyBrief;
  classDays: ('SAT' | 'SUN' | 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI')[];
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  room?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};
