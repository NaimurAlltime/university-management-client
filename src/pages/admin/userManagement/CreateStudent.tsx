import type React from "react"
import { Button, Col, Row, message } from "antd"
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement.api"
import {
  useGetAllSemestersQuery,
  useGetAcademicDepartmentsQuery,
} from "../../../redux/features/admin/academicManagement.api"
import PHForm from "../../../components/form/PHForm"
import PHInput from "../../../components/form/PHInput"
import PHSelect from "../../../components/form/PHSelect"
import PHDatePicker from "../../../components/form/PHDatePicker"
import { IStudentForm } from "../../../types/student.type"

const defaultValues: IStudentForm = {
  password: "123456",
  student: {
    name: {
      firstName: "Naimur",
      middleName: "Rahman",
      lastName: "Naim",
    },
    gender: "male",
    dateOfBirth: "2002-06-05",
    email: "naimur@exsample.com",
    contactNo: "55566677277",
    emergencyContactNo: "88899902000",
    bloogGroup: "B-",
    presentAddress: "234 Elm Street",
    permanentAddress: "567 Maple Avenue",
    guardian: {
      fatherName: "James Wilson",
      fatherOccupation: "Professor",
      fatherContactNo: "3334445555",
      motherName: "Emma Wilson",
      motherOccupation: "Engineer",
      motherContactNo: "3332221111",
    },
    localGuardian: {
      name: "Sophie Adams",
      occupation: "Artist",
      contactNo: "6667778888",
      address: "890 Oak Street",
    },
    admissionSemester: "67b8e989e1b9f767e9f3809a",
    academicDepartment: "67b8ed9de1b9f767e9f380b1",
  },
}

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
]

const bloodGroupOptions = [
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
]

const CreateStudent: React.FC = () => {
  const [addStudent, { isLoading }] = useAddStudentMutation()
  const { data: semesters, isLoading: semestersLoading } = useGetAllSemestersQuery(undefined)
  const { data: departments, isLoading: departmentsLoading } = useGetAcademicDepartmentsQuery(undefined)

  const onSubmit = async (data: IStudentForm) => {
    try {
      const formData = new FormData()
      formData.append("data", JSON.stringify(data))

      const result = await addStudent(formData).unwrap()
      if (result.success) {
        message.success("Student created successfully")
      } else {
        message.error(result.message || "Failed to create student")
      }
    } catch (error) {
      message.error("An error occurred while creating the student")
      console.error(error)
    }
  }

  const semesterOptions = semesters?.data?.map((semester) => ({
    value: semester._id,
    label: `${semester.name} ${semester.year}`,
  }))

  const departmentOptions = departments?.data?.map((department) => ({
    value: department._id,
    label: department.name,
  }))

  return (
    <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
      <Row gutter={16}>
        <Col span={8}>
          <PHInput
            name="student.name.firstName"
            label="First Name"
            required
            rules={{ required: "First name is required" }}
          />
        </Col>
        <Col span={8}>
          <PHInput name="student.name.middleName" label="Middle Name" />
        </Col>
        <Col span={8}>
          <PHInput
            name="student.name.lastName"
            label="Last Name"
            required
            rules={{ required: "Last name is required" }}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <PHSelect
            name="student.gender"
            label="Gender"
            required
            options={genderOptions}
            rules={{ required: "Gender is required" }}
          />
        </Col>
        <Col span={12}>
          <PHDatePicker
            name="student.dateOfBirth"
            label="Date of Birth"
            required
            rules={{ required: "Date of birth is required" }}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <PHInput
            name="student.email"
            label="Email"
            required
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
          />
        </Col>
        <Col span={12}>
          <PHInput
            name="student.contactNo"
            label="Contact No"
            required
            rules={{ required: "Contact number is required" }}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <PHInput
            name="student.emergencyContactNo"
            label="Emergency Contact No"
            required
            rules={{ required: "Emergency contact number is required" }}
          />
        </Col>
        <Col span={12}>
          <PHSelect
            name="student.bloogGroup"
            label="Blood Group"
            required
            options={bloodGroupOptions}
            rules={{ required: "Blood group is required" }}
          />
        </Col>
      </Row>

      <PHInput
        name="student.presentAddress"
        label="Present Address"
        required
        type="textarea"
        rules={{ required: "Present address is required" }}
      />

      <PHInput
        name="student.permanentAddress"
        label="Permanent Address"
        required
        type="textarea"
        rules={{ required: "Permanent address is required" }}
      />

      <Row gutter={16}>
        <Col span={12}>
          <PHInput
            name="student.guardian.fatherName"
            label="Guardian's Name"
            required
            rules={{ required: "Guardian's name is required" }}
          />
        </Col>
        <Col span={12}>
          <PHInput
            name="student.guardian.fatherOccupation"
            label="Guardian's Occupation"
            required
            rules={{ required: "Guardian's occupation is required" }}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <PHInput
            name="student.guardian.fatherContactNo"
            label="Guardian's Contact No"
            required
            rules={{ required: "Guardian's contact number is required" }}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <PHInput
            name="student.localGuardian.name"
            label="Local Guardian's Name"
            required
            rules={{ required: "Local guardian's name is required" }}
          />
        </Col>
        <Col span={12}>
          <PHInput
            name="student.localGuardian.occupation"
            label="Local Guardian's Occupation"
            required
            rules={{ required: "Local guardian's occupation is required" }}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <PHInput
            name="student.localGuardian.contactNo"
            label="Local Guardian's Contact No"
            required
            rules={{ required: "Local guardian's contact number is required" }}
          />
        </Col>
        <Col span={12}>
          <PHInput
            name="student.localGuardian.address"
            label="Local Guardian's Address"
            required
            rules={{ required: "Local guardian's address is required" }}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <PHSelect
            name="student.admissionSemester"
            label="Admission Semester"
            required
            options={semesterOptions}
            loading={semestersLoading}
            rules={{ required: "Admission semester is required" }}
          />
        </Col>
        <Col span={12}>
          <PHSelect
            name="student.academicDepartment"
            label="Academic Department"
            required
            options={departmentOptions}
            loading={departmentsLoading}
            rules={{ required: "Academic department is required" }}
          />
        </Col>
      </Row>

      <PHInput name="password" label="Password" required type="password" rules={{ required: "Password is required" }} />

      <Button type="primary" htmlType="submit" loading={isLoading}>
        Create Student
      </Button>
    </PHForm>
  )
}

export default CreateStudent

