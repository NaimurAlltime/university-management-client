export interface IStudentForm {
    password: string
    student: {
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
      guardian: {
        fatherName: string
        fatherOccupation: string
        fatherContactNo: string
        motherName: string
        motherOccupation: string
        motherContactNo: string
      }
      localGuardian: {
        name: string
        occupation: string
        contactNo: string
        address: string
      }
      admissionSemester: string
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
  
  