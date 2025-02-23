import type React from "react"
import { useForm, Controller } from "react-hook-form"
import { Button, Col, DatePicker, Form, Input, Row, Select, message } from "antd"
import type { IFacultyForm } from "../../../types/faculty.types"
import { useAddFacultyMutation } from "../../../redux/features/admin/userManagement.api"
import { useGetAcademicDepartmentsQuery } from "../../../redux/features/admin/academicManagement.api"
import dayjs from "dayjs"

const { Option } = Select

const defaultValues: IFacultyForm = {
  password: "123456",
  faculty: {
    designation: "Professor",
    name: {
      firstName: "Monir",
      middleName: "Ahmed",
      lastName: "Miraj",
    },
    gender: "male",
    dateOfBirth: dayjs("1980-05-15").format("YYYY-MM-DD"),
    email: "johsndoe@example.com",
    contactNo: "+1234567890",
    emergencyContactNo: "+1987654321",
    bloogGroup: "AB+",
    presentAddress: "123 Main Street, City",
    permanentAddress: "456 Elm Street, Town",
    academicDepartment: "67b8ed0ae1b9f767e9f380aa",
  }
}

const CreateFaculty: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFacultyForm>({
    defaultValues,
  })
  const [addFaculty, { isLoading }] = useAddFacultyMutation()
  const { data: departments, isLoading: departmentsLoading } = useGetAcademicDepartmentsQuery(undefined)

  const onSubmit = async (data: IFacultyForm) => {
    try {
      const formData = new FormData()
      formData.append(
        "data",
        JSON.stringify({
          password: data.password,
          faculty: {
            ...data.faculty,
            name: {
              firstName: data.faculty.name.firstName,
              middleName: data.faculty.name.middleName,
              lastName: data.faculty.name.lastName,
            },
          },
        }),
      )

      const result = await addFaculty(formData).unwrap()
      if (result.success) {
        message.success("Faculty created successfully")
      } else {
        message.error(result.message || "Failed to create faculty")
      }
    } catch (error) {
      message.error("An error occurred while creating the faculty")
      console.error(error)
    }
  }

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="First Name" required>
            <Controller
              name="faculty.name.firstName"
              control={control}
              rules={{ required: "First name is required" }}
              render={({ field }) => <Input {...field} />}
            />
            {errors.faculty?.name?.firstName && (
              <span style={{ color: "red" }}>{errors.faculty.name.firstName.message}</span>
            )}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Middle Name">
            <Controller name="faculty.name.middleName" control={control} render={({ field }) => <Input {...field} />} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Last Name" required>
            <Controller
              name="faculty.name.lastName"
              control={control}
              rules={{ required: "Last name is required" }}
              render={({ field }) => <Input {...field} />}
            />
            {errors.faculty?.name?.lastName && (
              <span style={{ color: "red" }}>{errors.faculty.name.lastName.message}</span>
            )}
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Designation" required>
            <Controller
              name="faculty.designation"
              control={control}
              rules={{ required: "Designation is required" }}
              render={({ field }) => <Input {...field} />}
            />
            {errors.faculty?.designation && <span style={{ color: "red" }}>{errors.faculty.designation.message}</span>}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Gender" required>
            <Controller
              name="faculty.gender"
              control={control}
              rules={{ required: "Gender is required" }}
              render={({ field }) => (
                <Select {...field}>
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="other">Other</Option>
                </Select>
              )}
            />
            {errors.faculty?.gender && <span style={{ color: "red" }}>{errors.faculty.gender.message}</span>}
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Date of Birth" required>
            <Controller
              name="faculty.dateOfBirth"
              control={control}
              rules={{ required: "Date of birth is required" }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  style={{ width: "100%" }}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => field.onChange(date ? date.format("YYYY-MM-DD") : null)}
                />
              )}
            />
            {errors.faculty?.dateOfBirth && <span style={{ color: "red" }}>{errors.faculty.dateOfBirth.message}</span>}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Email" required>
            <Controller
              name="faculty.email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => <Input {...field} />}
            />
            {errors.faculty?.email && <span style={{ color: "red" }}>{errors.faculty.email.message}</span>}
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Contact No" required>
            <Controller
              name="faculty.contactNo"
              control={control}
              rules={{ required: "Contact number is required" }}
              render={({ field }) => <Input {...field} />}
            />
            {errors.faculty?.contactNo && <span style={{ color: "red" }}>{errors.faculty.contactNo.message}</span>}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Emergency Contact No" required>
            <Controller
              name="faculty.emergencyContactNo"
              control={control}
              rules={{ required: "Emergency contact number is required" }}
              render={({ field }) => <Input {...field} />}
            />
            {errors.faculty?.emergencyContactNo && (
              <span style={{ color: "red" }}>{errors.faculty.emergencyContactNo.message}</span>
            )}
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Blood Group" required>
            <Controller
              name="faculty.bloogGroup"
              control={control}
              rules={{ required: "Blood group is required" }}
              render={({ field }) => (
                <Select {...field}>
                  <Option value="A+">A+</Option>
                  <Option value="A-">A-</Option>
                  <Option value="B+">B+</Option>
                  <Option value="B-">B-</Option>
                  <Option value="AB+">AB+</Option>
                  <Option value="AB-">AB-</Option>
                  <Option value="O+">O+</Option>
                  <Option value="O-">O-</Option>
                </Select>
              )}
            />
            {errors.faculty?.bloogGroup && <span style={{ color: "red" }}>{errors.faculty.bloogGroup.message}</span>}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Academic Department" required>
            <Controller
              name="faculty.academicDepartment"
              control={control}
              rules={{ required: "Academic department is required" }}
              render={({ field }) => (
                <Select {...field} loading={departmentsLoading}>
                  {departments?.data?.map((department) => (
                    <Option key={department._id} value={department._id}>
                      {department.name}
                    </Option>
                  ))}
                </Select>
              )}
            />
            {errors.faculty?.academicDepartment && (
              <span style={{ color: "red" }}>{errors.faculty.academicDepartment.message}</span>
            )}
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="Present Address" required>
        <Controller
          name="faculty.presentAddress"
          control={control}
          rules={{ required: "Present address is required" }}
          render={({ field }) => <Input.TextArea {...field} />}
        />
        {errors.faculty?.presentAddress && (
          <span style={{ color: "red" }}>{errors.faculty.presentAddress.message}</span>
        )}
      </Form.Item>

      <Form.Item label="Permanent Address" required>
        <Controller
          name="faculty.permanentAddress"
          control={control}
          rules={{ required: "Permanent address is required" }}
          render={({ field }) => <Input.TextArea {...field} />}
        />
        {errors.faculty?.permanentAddress && (
          <span style={{ color: "red" }}>{errors.faculty.permanentAddress.message}</span>
        )}
      </Form.Item>

      <Form.Item label="Password" required>
        <Controller
          name="password"
          control={control}
          rules={{ required: "Password is required" }}
          render={({ field }) => <Input.Password {...field} />}
        />
        {errors.password && <span style={{ color: "red" }}>{errors.password.message}</span>}
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Create Faculty
        </Button>
      </Form.Item>
    </Form>
  )
}

export default CreateFaculty

