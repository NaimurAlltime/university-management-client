export interface IAdminForm {
    password: string
    admin: {
      designation: string
      name: {
        firstName: string
        middleName?: string
        lastName: string
      }
      gender: "male" | "female" | "other"
      dateOfBirth: string
      email: string
      contactNo: string
      emergencyContactNo: string
      bloogGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-"
      presentAddress: string
      permanentAddress: string
    }
  }
  
  