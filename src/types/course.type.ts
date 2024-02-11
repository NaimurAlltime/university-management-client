export interface CouseType {
  details: Details;
  _id: string;
  title: string;
  instructor: string;
  categoryId: string;
  price: number;
  tags: Tag[];
  startDate: string;
  endDate: string;
  language: string;
  provider: string;
  createdBy: CreatedBy;
  createdAt: string;
  updatedAt: string;
  durationInWeeks: number;
  __v: number;
}

export interface Details {
  level: string;
  description: string;
}

export interface Tag {
  name: string;
  isDeleted: boolean;
}

export interface CreatedBy {
  _id: string;
  username: string;
  email: string;
  role: string;
}
