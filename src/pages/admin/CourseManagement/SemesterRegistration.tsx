import { Button, Col, Row, message } from "antd"
import CForm from "../../../components/form/CForm"
import CSelect from "../../../components/form/CSelect"
import CDatePicker from "../../../components/form/CDatePicker"
import CInput from "../../../components/form/CInput"
import { semesterStatusOptions } from "../../../constants/semester"
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api"
import { useAddRegisteredSemesterMutation } from "../../../redux/features/admin/courseManagement"
import type { FieldValues, SubmitHandler } from "react-hook-form"

type TCreateSemesterRegistration = {
  academicSemester: string
  status: "UPCOMING" | "ONGOING" | "ENDED"
  startDate: string // YYYY-MM-DD
  endDate: string // YYYY-MM-DD
  minCredit: string | number
  maxCredit: string | number
}

const SemesterRegistration = () => {
  const { data: semesters, isLoading: semestersLoading } = useGetAllSemestersQuery(undefined)
  const [addRegisteredSemester, { isLoading }] = useAddRegisteredSemesterMutation()

  const semesterOptions =
    semesters?.data?.map((s) => ({
      value: s._id,
      label: `${s.name} ${s.year}`,
    })) || []

  const onSubmit: SubmitHandler<FieldValues> = async (values: TCreateSemesterRegistration) => {
    try {
      const payload = {
        academicSemester: values.academicSemester,
        status: values.status || "UPCOMING",
        startDate: values.startDate ? new Date(values.startDate).toISOString() : undefined,
        endDate: values.endDate ? new Date(values.endDate).toISOString() : undefined,
        minCredit: Number(values.minCredit),
        maxCredit: Number(values.maxCredit),
      }

      const res: any = await addRegisteredSemester(payload).unwrap()
      if (res?.success) {
        message.success("Semester registration created")
      } else {
        message.error(res?.message || "Failed to create registration")
      }
    } catch (err: any) {
      message.error(err?.data?.message || "Something went wrong")
      // eslint-disable-next-line no-console
      console.error(err)
    }
  }

  return (
    <CForm
      onSubmit={onSubmit}
      defaultValues={{
        status: "UPCOMING",
      }}
    >
      <Row gutter={16}>
        <Col span={12}>
          <CSelect
            name="academicSemester"
            label="Academic Semester"
            required
            options={semesterOptions}
            loading={semestersLoading}
            rules={{ required: "Academic semester is required" }}
          />
        </Col>
        <Col span={12}>
          <CSelect
            name="status"
            label="Status"
            required
            options={semesterStatusOptions}
            rules={{ required: "Status is required" }}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <CDatePicker
            name="startDate"
            label="Start Date"
            required
            rules={{ required: "Start date is required" }}
          />
        </Col>
        <Col span={12}>
          <CDatePicker name="endDate" label="End Date" required rules={{ required: "End date is required" }} />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <CInput
            type="number"
            name="minCredit"
            label="Minimum Credit"
            required
            rules={{
              required: "Minimum credit is required",
              min: { value: 1, message: "Minimum credit must be at least 1" },
            }}
          />
        </Col>
        <Col span={12}>
          <CInput
            type="number"
            name="maxCredit"
            label="Maximum Credit"
            required
            rules={{
              required: "Maximum credit is required",
              min: { value: 1, message: "Maximum credit must be at least 1" },
            }}
          />
        </Col>
      </Row>

      <Button type="primary" htmlType="submit" loading={isLoading}>
        Create Registration
      </Button>
    </CForm>
  )
}

export default SemesterRegistration
