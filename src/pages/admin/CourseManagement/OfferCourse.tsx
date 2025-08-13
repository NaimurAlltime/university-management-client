"use client"

import { Button, Col, Form, Row, message } from "antd"
import CForm from "../../../components/form/CForm"
import CInput from "../../../components/form/CInput"
import CSelect from "../../../components/form/CSelect"
import CSelectWithWatch from "../../../components/form/CSelectWithWatch"
import CTimePicker from "../../../components/form/CTimePicker"
import {
  useCreateOfferedCourseMutation,
  useGetAllCoursesQuery,
  useGetAllRegisteredSemestersQuery,
  useGetCourseFacultiesQuery,
} from "../../../redux/features/admin/courseManagement"
import { useMemo, useState } from "react"
import type { TCourse, TFacultyBrief, TSemester } from "../../../types/courseManagement.type"

type TFormValues = {
  semesterRegistration: string
  course: string
  section: number
  maxCapacity: number
  faculty: string
  classDays: string[]
  startTime: string // from CTimePicker (string or dayjs) -> we convert to HH:mm
  endTime: string
  room?: string
}

const daysOptions = [
  { label: "Sat", value: "SAT" },
  { label: "Sun", value: "SUN" },
  { label: "Mon", value: "MON" },
  { label: "Tue", value: "TUE" },
  { label: "Wed", value: "WED" },
  { label: "Thu", value: "THU" },
  { label: "Fri", value: "FRI" },
]

const OfferCourse = () => {
  const [form] = Form.useForm<TFormValues>()

  const { data: semestersResp } = useGetAllRegisteredSemestersQuery(undefined)
  const { data: coursesResp } = useGetAllCoursesQuery(undefined)
  const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>()

  // Fetch faculties for selected course
  const {
    data: courseFacultiesResp,
    isLoading: facultiesLoading,
    error: facultiesError,
  } = useGetCourseFacultiesQuery(selectedCourseId!, {
    skip: !selectedCourseId,
  })

  console.log("=== OfferCourse Debug Info ===")
  console.log("Selected Course ID:", selectedCourseId)
  console.log("Course Faculties Response:", courseFacultiesResp)
  console.log("Faculties Loading:", facultiesLoading)
  console.log("Faculties Error:", facultiesError)

  const semesterOptions = useMemo(
    () =>
      (semestersResp?.data || []).map((s: TSemester) => ({
        label: `${s.academicSemester?.name ?? ""} ${s.academicSemester?.year ?? ""} - ${s.status}`,
        value: s._id,
      })),
    [semestersResp],
  )

  const courseOptions = useMemo(
    () =>
      (coursesResp?.data || []).map((c: TCourse) => ({
        label: `${c.prefix}${c.code} - ${c.title}`,
        value: c._id,
      })),
    [coursesResp],
  )

  const facultyOptions = useMemo(() => {
    const list: TFacultyBrief[] = courseFacultiesResp?.data || []
    console.log("Faculty List from API:", list)
    const options = list.map((f) => ({
      label: f?.name
        ? `${f.name.firstName}${f.name.middleName ? " " + f.name.middleName : ""} ${f.name.lastName}`
        : f.email || f._id,
      value: f._id,
    }))
    console.log("Faculty Options:", options)
    return options
  }, [courseFacultiesResp])

  const [createOfferedCourse, { isLoading }] = useCreateOfferedCourseMutation()

  const onSubmit = async (values: TFormValues) => {
    try {
      const toHHmm = (val: any) => {
        if (!val) return ""
        // CTimePicker may return Dayjs/string; support both
        if (typeof val === "string") return val
        if (val?.format) return val.format("HH:mm")
        return String(val)
      }

      const payload = {
        ...values,
        section: Number(values.section),
        maxCapacity: Number(values.maxCapacity),
        startTime: toHHmm(values.startTime),
        endTime: toHHmm(values.endTime),
      }

      const res: any = await createOfferedCourse(payload)
      if (res?.data?.success || res?.data?._id) {
        message.success("Offered course created successfully")
        form.resetFields()
        setSelectedCourseId(undefined)
      } else if (res?.error?.data?.message) {
        message.error(res.error.data.message)
      } else {
        message.error("Failed to create offered course")
      }
    } catch {
      message.error("Failed to create offered course")
    }
  }

  return (
    <div className="p-4 bg-white rounded-md shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Offer Course</h2>
      <p className="text-gray-600 mb-4">
        Create a course offering for students. Only teachers assigned to the selected course will appear in the faculty
        dropdown.
      </p>

      <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800 text-sm">
          <strong>Note:</strong> If no teachers appear in the faculty dropdown, please go to "Assign Faculties" first to
          assign teachers to the selected course.
        </p>
      </div>

      <CForm onSubmit={onSubmit as any}>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <CSelectWithWatch
              name="semesterRegistration"
              label="Registered Semester"
              placeholder="Select registered semester"
              options={semesterOptions}
            />
          </Col>
          <Col xs={24} md={12}>
            <CSelectWithWatch
              name="course"
              label="Course"
              placeholder="Select course"
              options={courseOptions}
              onValueChange={(val) => {
                // console.log("Course selected in OfferCourse:", val)
                setSelectedCourseId(val as string | undefined)
              }}
            />
          </Col>
          <Col xs={12} md={6}>
            <CInput name="section" type="number" label="Section" placeholder="e.g. 1" />
          </Col>
          <Col xs={12} md={6}>
            <CInput name="maxCapacity" type="number" label="Max Capacity" placeholder="e.g. 30" />
          </Col>
          <Col xs={24} md={12}>
            <CSelect
              name="faculty"
              label="Faculty"
              placeholder={
                facultiesLoading
                  ? "Loading faculties..."
                  : selectedCourseId
                    ? "Select faculty"
                    : "Select a course first"
              }
              options={facultyOptions}
              // showSearch
              loading={facultiesLoading}
              disabled={!selectedCourseId || facultyOptions.length === 0}
            />
            {selectedCourseId && facultyOptions.length === 0 && !facultiesLoading && (
              <div
                style={{
                  marginTop: 8,
                  marginBottom: 16,
                  padding: 8,
                  background: "#fff2e8",
                  borderRadius: 4,
                  fontSize: "12px",
                  color: "#d46b08",
                  border: "1px solid #ffec3d",
                }}
              >
                <strong>No teachers assigned to this course!</strong>
                <br />
                Go to "Course Management → Assign Faculties" to assign teachers first.
              </div>
            )}
          </Col>
          <Col xs={24}>
            <CSelect
              name="classDays"
              label="Class Days"
              placeholder="Select class days"
              options={daysOptions}
              mode="multiple"
            />
          </Col>
          <Col xs={12} md={6}>
            <CTimePicker name="startTime" label="Start Time" />
          </Col>
          <Col xs={12} md={6}>
            <CTimePicker name="endTime" label="End Time" />
          </Col>
          <Col xs={24} md={12}>
            <CInput name="room" label="Room" placeholder="e.g. R-201" />
          </Col>
        </Row>
        <div className="mt-4">
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Offer Course
          </Button>
        </div>
      </CForm>
    </div>
  )
}

export default OfferCourse
