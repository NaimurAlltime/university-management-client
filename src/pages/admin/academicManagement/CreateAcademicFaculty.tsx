"use client"

import { Button, Col, Row, message } from "antd"
import type { FieldValues, SubmitHandler } from "react-hook-form"
import CForm from "../../../components/form/CForm"
import CInput from "../../../components/form/CInput"
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api"

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty, { isLoading }] = useAddAcademicFacultyMutation()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const facultyData = {
        name: data.name,
      }

      const res: any = await addAcademicFaculty(facultyData)

      if (res?.data?.success) {
        message.success("Academic Faculty created successfully")
      } else if (res?.error?.data?.message) {
        message.error(res.error.data.message)
      } else {
        message.error("Failed to create Academic Faculty")
      }
    } catch (error) {
      message.error("Failed to create Academic Faculty")
    }
  }

  return (
    <div className="p-4 bg-white rounded-md shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Create Academic Faculty</h2>
      <CForm onSubmit={onSubmit}>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <CInput type="text" name="name" label="Faculty Name" placeholder="Enter faculty name" />
          </Col>
        </Row>
        <div className="mt-4">
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Create Faculty
          </Button>
        </div>
      </CForm>
    </div>
  )
}

export default CreateAcademicFaculty
