"use client"

import type React from "react"
import { Card, Row, Col, message, Typography, Space, Button } from "antd"
import CForm from "../../../components/form/CForm"
import CInput from "../../../components/form/CInput"
import CSelect from "../../../components/form/CSelect"
import {
  useAddAcademicDepartmentMutation,
  useGetAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api"

const { Title, Text } = Typography

type TFormValues = {
  name: string
  academicFaculty: string
}

const CreateAcademicDepartment: React.FC = () => {
  const {
    data: facultiesResp,
    isLoading: facultiesLoading,
    isError: facultiesError,
  } = useGetAcademicFacultiesQuery(undefined)

  const [addAcademicDepartment, { isLoading: creating }] = useAddAcademicDepartmentMutation()

  // Map faculties to select options; fall back between .name and .title
  const facultyOptions =
    facultiesResp?.data?.map((f: { _id: string; name?: string; title?: string }) => ({
      label: f.name || f.title || "Unnamed Faculty",
      value: f._id,
    })) || []

  const onSubmit = async (values: TFormValues) => {
    try {
      await addAcademicDepartment(values).unwrap()
      message.success("Academic department created successfully")
    } catch (err: any) {
      const msg = err?.data?.message || err?.message || "Failed to create academic department"
      message.error(msg)
    }
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card>
          <Space direction="vertical" size={8} style={{ width: "100%" }}>
            <Title level={4}>Create Academic Department</Title>
            <Text type="secondary">Associate the department with a faculty.</Text>
          </Space>
        </Card>
      </Col>

      <Col span={24}>
        <Card>
          <CForm onSubmit={onSubmit as any} defaultValues={{ name: "", academicFaculty: "" }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <CInput name="name" label="Department Name" placeholder="e.g., Computer Science" />
              </Col>

              <Col xs={24} md={12}>
                <CSelect
                  name="academicFaculty"
                  label="Academic Faculty"
                  options={facultyOptions}
                  disabled={facultiesLoading || facultiesError}
                  placeholder={
                    facultiesLoading
                      ? "Loading faculties..."
                      : facultiesError
                        ? "Failed to load faculties"
                        : "Select faculty"
                  }
                />
              </Col>

              <Col span={24}>
                {/* <button
                  type="submit"
                  className="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60"
                  disabled={creating || facultiesLoading}
                >
                  {creating ? "Creating..." : "Create Department"}
                </button> */}
                   <Button type="primary" htmlType="submit" disabled={creating || facultiesLoading}>
                      {creating ? "Creating..." : "Create Department"}
                  </Button>
              </Col>
            </Row>
          </CForm>
        </Card>
      </Col>
    </Row>
  )
}

export default CreateAcademicDepartment
