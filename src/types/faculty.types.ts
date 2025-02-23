
export interface IFacultyForm {
    password: string
    faculty: {
      designation: string
      name: {
        firstName: string
        middleName: string
        lastName: string
      }
      gender: "male" | "female" | "other"
      dateOfBirth: string
      email: string
      contactNo: string
      emergencyContactNo: string
      bloogGroup: string
      presentAddress: string
      permanentAddress: string
      academicDepartment: string
    }
  }
  
  export interface IApiResponse {
    success: boolean
    message: string
    data?: any
    errorSources?: Array<{
      path: string
      message: string
    }>
  }
  
  