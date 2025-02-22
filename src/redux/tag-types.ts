
export enum tagTypes {
    user = "user",
    student = "student",
    admin = "admin",
    faculty = "faculty",
    academicSemester = "academic-semester",
    academicFaculty = "academic-faculty",
    academicDepartment = "academic-department",
  }
  
  export const tagTypesList = [
    tagTypes.user,
    tagTypes.student,
    tagTypes.admin,
    tagTypes.faculty,
    tagTypes.academicSemester,
    tagTypes.academicFaculty,
    tagTypes.academicDepartment,
  ]
  
    export const tagTypesListObject = {
        [tagTypes.user]: tagTypes.user,
        [tagTypes.student]: tagTypes.student,
        [tagTypes.admin]: tagTypes.admin,
        [tagTypes.faculty]: tagTypes.faculty,
        [tagTypes.academicSemester]: tagTypes.academicSemester,
        [tagTypes.academicFaculty]: tagTypes.academicFaculty,
        [tagTypes.academicDepartment]: tagTypes.academicDepartment,
    }  