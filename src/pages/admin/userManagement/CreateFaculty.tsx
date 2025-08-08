import { Button, Col, Row, message } from "antd"
import CForm from "../../../components/form/CForm"
import CInput from "../../../components/form/CInput"
import CSelect from "../../../components/form/CSelect"
import CDatePicker from "../../../components/form/CDatePicker"
import { useAddFacultyMutation } from "../../../redux/features/admin/userManagement.api"
import { useGetAcademicDepartmentsQuery } from "../../../redux/features/admin/academicManagement.api"
import type { IFacultyForm } from "../../../types/faculty.types"

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

const defaultValues: IFacultyForm = {
  password: "123456",
  faculty: {
    designation: "",
    name: {
      firstName: "",
      middleName: "",
      lastName: "",
    },
    gender: "male",
    dateOfBirth: "",
    email: "",
    contactNo: "",
    emergencyContactNo: "",
    bloogGroup: "A+",
    presentAddress: "",
    permanentAddress: "",
    academicDepartment: "",
  },
}

const CreateFaculty = () => {
  const [addFaculty, { isLoading }] = useAddFacultyMutation()
  const { data: departments, isLoading: departmentsLoading } = useGetAcademicDepartmentsQuery(undefined)

  const departmentOptions =
    departments?.data?.map((dep) => ({ value: dep._id, label: dep.name })) || []

  const onSubmit = async (data: IFacultyForm) => {
    try {
      const formData = new FormData()
      formData.append("data", JSON.stringify(data))

      const res = await addFaculty(formData as any).unwrap()
      if (res?.success) {
        message.success("Faculty created successfully")
      } else {
        message.error(res?.message || "Failed to create faculty")
      }
    } catch (error: any) {
      message.error(error?.data?.message || "An error occurred while creating the faculty")
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }

  return (
    <CForm onSubmit={onSubmit as any} defaultValues={defaultValues}>
      {/* Basic Info */}
      <Row gutter={16}>
        <Col span={8}>
          <CInput
            name="faculty.name.firstName"
            label="First Name"
            required
            rules={{ required: "First name is required" }}
          />
        </Col>
        <Col span={8}>
          <CInput name="faculty.name.middleName" label="Middle Name" />
        </Col>
        <Col span={8}>
          <CInput
            name="faculty.name.lastName"
            label="Last Name"
            required
            rules={{ required: "Last name is required" }}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <CInput
            name="faculty.designation"
            label="Designation"
            required
            rules={{ required: "Designation is required" }}
          />
        </Col>
        <Col span={12}>
          <CSelect
            name="faculty.gender"
            label="Gender"
            required
            options={genderOptions}
            rules={{ required: "Gender is required" }}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <CDatePicker
            name="faculty.dateOfBirth"
            label="Date of Birth"
            required
            rules={{ required: "Date of birth is required" }}
          />
        </Col>
        <Col span={12}>
          <CInput
            name="faculty.email"
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
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <CInput
            name="faculty.contactNo"
            label="Contact No"
            required
            rules={{ required: "Contact number is required" }}
          />
        </Col>
        <Col span={12}>
          <CInput
            name="faculty.emergencyContactNo"
            label="Emergency Contact No"
            required
            rules={{ required: "Emergency contact number is required" }}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <CSelect
            name="faculty.bloogGroup"
            label="Blood Group"
            required
            options={bloodGroupOptions}
            rules={{ required: "Blood group is required" }}
          />
        </Col>
        <Col span={12}>
          <CSelect
            name="faculty.academicDepartment"
            label="Academic Department"
            required
            options={departmentOptions}
            loading={departmentsLoading}
            rules={{ required: "Academic department is required" }}
          />
        </Col>
      </Row>

      <CInput
        name="faculty.presentAddress"
        label="Present Address"
        type="textarea"
        required
        rules={{ required: "Present address is required" }}
      />

      <CInput
        name="faculty.permanentAddress"
        label="Permanent Address"
        type="textarea"
        required
        rules={{ required: "Permanent address is required" }}
      />

      <CInput name="password" label="Password" type="password" required rules={{ required: "Password is required" }} />

      <Button type="primary" htmlType="submit" loading={isLoading}>
        Create Faculty
      </Button>
    </CForm>
  )
}

export default CreateFaculty
