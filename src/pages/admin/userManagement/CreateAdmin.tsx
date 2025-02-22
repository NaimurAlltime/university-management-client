import { Button, Col, Row, message } from "antd"
import dayjs from "dayjs"
import type { IAdminForm } from "../../../types/admin.types"
import { useAddAdminMutation } from "../../../redux/features/admin/userManagement.api"
import PHForm from "../../../components/form/PHForm"
import PHInput from "../../../components/form/PHInput"
import PHSelect from "../../../components/form/PHSelect"
import PHDatePicker from "../../../components/form/PHDatePicker"

const defaultValues: IAdminForm = {
  password: "123456",
  admin: {
    designation: "Head of Admin",
    name: {
      firstName: "Naimur",
      middleName: "Rahman",
      lastName: "Naim",
    },
    gender: "male",
    dateOfBirth: "1999-05-15",
    email: "naimur123@gmail.com",
    contactNo: "1234567890",
    emergencyContactNo: "9876543210",
    bloogGroup: "B+",
    presentAddress: "123 Main Street, City, Country",
    permanentAddress: "456 Park Avenue, City, Country",
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

const CreateAdmin = () => {
  const [addAdmin, { isLoading }] = useAddAdminMutation()

  const onSubmit = async (data: IAdminForm) => {
    try {
      const formData = new FormData()
      formData.append("data", JSON.stringify(data))

      const result = await addAdmin(formData).unwrap()
      if (result.success) {
        message.success("Admin created successfully")
      } else {
        message.error(result.message || "Failed to create admin")
      }
    } catch (error) {
      message.error("An error occurred while creating the admin")
      console.error(error)
    }
  }

  return (
    <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
      <Row gutter={16}>
        <Col span={24}>
          <PHInput name="admin.designation" label="Designation" rules={{ required: "Designation is required" }} />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <PHInput
            name="admin.name.firstName"
            label="First Name"
            rules={{
              required: "First name is required",
              minLength: {
                value: 2,
                message: "First name must be at least 2 characters",
              },
            }}
          />
        </Col>
        <Col span={8}>
          <PHInput name="admin.name.middleName" label="Middle Name" />
        </Col>
        <Col span={8}>
          <PHInput name="admin.name.lastName" label="Last Name" rules={{ required: "Last name is required" }} />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <PHSelect
            name="admin.gender"
            label="Gender"
            options={genderOptions}
            rules={{ required: "Gender is required" }}
          />
        </Col>
        <Col span={12}>
          <PHDatePicker
            name="admin.dateOfBirth"
            label="Date of Birth"
            rules={{
              required: "Date of birth is required",
              validate: {
                isValid: (value: string) => {
                  if (!value) return "Date of birth is required"
                  return dayjs(value).isValid() || "Invalid date format"
                },
                isPast: (value: string) => {
                  if (!value) return true
                  const date = dayjs(value)
                  return date.isBefore(dayjs()) || "Date of birth must be in the past"
                },
              },
            }}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <PHInput
            name="admin.email"
            label="Email"
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
          <PHInput name="admin.contactNo" label="Contact No" rules={{ required: "Contact number is required" }} />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <PHInput
            name="admin.emergencyContactNo"
            label="Emergency Contact No"
            rules={{ required: "Emergency contact number is required" }}
          />
        </Col>
        <Col span={12}>
          <PHSelect name="admin.bloogGroup" label="Blood Group" options={bloodGroupOptions} />
        </Col>
      </Row>

      <PHInput
        name="admin.presentAddress"
        label="Present Address"
        type="textarea"
        rules={{ required: "Present address is required" }}
      />

      <PHInput
        name="admin.permanentAddress"
        label="Permanent Address"
        type="textarea"
        rules={{ required: "Permanent address is required" }}
      />

      <PHInput name="password" label="Password" type="password" rules={{ required: "Password is required" }} />

      <Button type="primary" htmlType="submit" loading={isLoading}>
        Create Admin
      </Button>
    </PHForm>
  )
}

export default CreateAdmin

