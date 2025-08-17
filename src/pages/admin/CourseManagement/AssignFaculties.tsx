"use client"

import { Button, Col, Form, message, Row } from "antd"
import type { FieldValues, SubmitHandler } from "react-hook-form"
import CForm from "../../../components/form/CForm"
import CSelect from "../../../components/form/CSelect"
import CSelectWithWatch from "../../../components/form/CSelectWithWatch"
import { toast } from "sonner"
import {
  useGetAllCoursesQuery,
  useAddFacultiesMutation,
  useGetCourseFacultiesQuery,
} from "../../../redux/features/admin/courseManagement"
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api"
import { useState } from "react"
import type { TResponseRedux } from "../../../types"

const AssignFaculties = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>("")

  const { data: coursesData, isLoading: coursesLoading } = useGetAllCoursesQuery([])
  const { data: facultiesData, isLoading: facultiesLoading } = useGetAllFacultiesQuery([])
  const { data: assignedFacultiesData, refetch: refetchAssignedFaculties } = useGetCourseFacultiesQuery(
    selectedCourseId,
    {
      skip: !selectedCourseId,
    },
  )

  const [addFaculties, { isLoading: isAssigning }] = useAddFacultiesMutation()

  console.log("=== AssignFaculties Debug Info ===")
  console.log("Selected Course ID:", selectedCourseId)
  console.log("Courses Data:", coursesData)
  console.log("Faculties Data:", facultiesData)
  console.log("Assigned Faculties Data:", assignedFacultiesData)

  const courseOptions =
    coursesData?.data?.map((course) => ({
      value: course._id,
      label: `${course.title} (${course.prefix}${course.code})`,
    })) || []

  const facultyOptions =
    facultiesData?.data?.map((faculty: any) => ({
      value: faculty._id,
      label: faculty.name?.firstName
        ? `${faculty.name.firstName} ${faculty.name.middleName || ""} ${faculty.name.lastName}`.trim()
        : faculty.fullName || faculty.email || "Unknown Faculty",
    })) || []

  // Get currently assigned faculty IDs
  const assignedFacultyIds = assignedFacultiesData?.data?.map((faculty: any) => faculty._id) || []

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.course) {
      toast.error("Please select a course")
      return
    }

    if (!data.faculties || data.faculties.length === 0) {
      toast.error("Please select at least one faculty")
      return
    }

    // const toastId = toast.loading("Assigning faculties...")

    try {
      const res = (await addFaculties({
        courseId: data.course,
        data: { faculties: data.faculties },
      })) as TResponseRedux<any>

      if (res.error) {
        toast.error(res.error.data.message || "Failed to assign faculties")
      } else {
        message.success("Faculties assigned successfully")
        await refetchAssignedFaculties()
      }
    } catch (err) {
      console.error("Assignment error:", err)
      // toast.error("Something went wrong", { id: toastId })
      // message.success("Faculties assigned successfully")
    }
  }

  const handleCourseChange = (value: string) => {
    console.log("Course changed to:", value)
    setSelectedCourseId(value)
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Assign Teachers to Course</h2>
      <p className="text-gray-600 mb-6">
        Select a course and assign teachers who will teach this course. These teachers will appear in the "Offer Course"
        page when you select the course.
      </p>
{/* 
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">How to use:</h3>
        <ol className="list-decimal list-inside text-blue-700 space-y-1">
          <li>First create faculty users in "User Management → Create Faculty"</li>
          <li>Select a course from the dropdown below</li>
          <li>Choose one or more teachers for that course</li>
          <li>Click "Assign Teachers" to save</li>
          <li>Go to "Offer Course" to create course offerings with assigned teachers</li>
        </ol>
      </div> */}

      <Row justify="center">
        <Col span={12}>
          <CForm onSubmit={onSubmit}>
            <CSelectWithWatch
              label="Course"
              name="course"
              options={courseOptions}
              disabled={coursesLoading}
              placeholder={coursesLoading ? "Loading courses..." : "Select course"}
              onValueChange={handleCourseChange}
            />

            <CSelect
              label="Teachers/Faculty"
              name="faculties"
              mode="multiple"
              options={facultyOptions}
              disabled={facultiesLoading || !selectedCourseId}
              placeholder={
                facultiesLoading
                  ? "Loading teachers..."
                  : !selectedCourseId
                    ? "Select a course first"
                    : facultyOptions.length === 0
                      ? "No faculty users found. Create faculty in User Management first."
                      : "Select teachers"
              }
              defaultValue={assignedFacultyIds}
            />

            {selectedCourseId && assignedFacultiesData?.data?.length > 0 && (
              <div
                style={{
                  marginBottom: 16,
                  padding: 12,
                  background: "#e6f7ff",
                  borderRadius: 6,
                  border: "1px solid #91d5ff",
                }}
              >
                <strong style={{ color: "#1890ff" }}>Currently assigned teachers:</strong>
                <ul style={{ margin: "8px 0 0 0", paddingLeft: 20 }}>
                  {assignedFacultiesData.data.map((faculty: any) => (
                    <li key={faculty._id} style={{ color: "#595959", marginBottom: 4 }}>
                      {faculty.name?.firstName
                        ? `${faculty.name.firstName} ${faculty.name.middleName || ""} ${faculty.name.lastName}`.trim()
                        : faculty.fullName || faculty.email || "Unknown Faculty"}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedCourseId && assignedFacultiesData?.data?.length === 0 && (
              <div
                style={{
                  marginBottom: 16,
                  padding: 12,
                  background: "#fff7e6",
                  borderRadius: 6,
                  border: "1px solid #ffd591",
                }}
              >
                <span style={{ color: "#fa8c16" }}>No teachers assigned to this course yet</span>
              </div>
            )}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isAssigning}
                disabled={!selectedCourseId}
                size="large"
                style={{ width: "100%" }}
              >
                Assign Teachers
              </Button>
            </Form.Item>
          </CForm>
        </Col>
      </Row>
    </div>
  )
}

export default AssignFaculties
