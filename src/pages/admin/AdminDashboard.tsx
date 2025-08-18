import type React from "react"
import { Card, Col, Row } from "antd"
import { RiFilePaper2Fill } from "react-icons/ri";
import { FaUserGraduate, FaUserNurse  } from "react-icons/fa";
import { IoBookSharp } from "react-icons/io5";
import { Area } from "@ant-design/plots"

const AdminDashboard: React.FC = () => {
  // Sample data for the chart
  const data = [
    { month: "Jan", "Student Fees": 400000, "Salary Paid": 10000, Incomes: 12000, Expenses: 11000 },
    { month: "Feb", "Student Fees": 150000, "Salary Paid": 11000, Incomes: 13000, Expenses: 12000 },
    { month: "Mar", "Student Fees": 100000, "Salary Paid": 12000, Incomes: 14000, Expenses: 13000 },
    { month: "Apr", "Student Fees": 90000, "Salary Paid": 13000, Incomes: 15000, Expenses: 14000 },
    { month: "May", "Student Fees": 85000, "Salary Paid": 14000, Incomes: 16000, Expenses: 15000 },
    { month: "Jun", "Student Fees": 80000, "Salary Paid": 15000, Incomes: 17000, Expenses: 16000 },
    { month: "Jul", "Student Fees": 75000, "Salary Paid": 16000, Incomes: 18000, Expenses: 17000 },
    { month: "Aug", "Student Fees": 70000, "Salary Paid": 17000, Incomes: 19000, Expenses: 18000 },
    { month: "Sep", "Student Fees": 65000, "Salary Paid": 18000, Incomes: 20000, Expenses: 19000 },
    { month: "Oct", "Student Fees": 60000, "Salary Paid": 19000, Incomes: 21000, Expenses: 20000 },
    { month: "Nov", "Student Fees": 55000, "Salary Paid": 20000, Incomes: 22000, Expenses: 21000 },
    { month: "Dec", "Student Fees": 50000, "Salary Paid": 21000, Incomes: 23000, Expenses: 22000 },
  ]

  const config = {
    data,
    xField: "month",
    yField: "value",
    seriesField: "category",
    smooth: true,
    animation: {
      appear: {
        animation: "path-in",
        duration: 1000,
      },
    },
    xAxis: {
      range: [0, 1],
      tickCount: 12,
    },
    yAxis: {
      label: {
        formatter: (v: string) => `${Number(v).toLocaleString()}`,
      },
      max: 450000,
      tickCount: 10,
    },
    legend: {
      position: "top",
    },
  }

  // Transform data for the chart
  const transformedData = data.reduce((acc, curr) => {
    const categories = ["Student Fees", "Salary Paid", "Incomes", "Expenses"]
    categories.forEach((category) => {
      acc.push({
        month: curr.month,
        value: curr[category],
        category: category,
      })
    })
    return acc
  }, [] as any[])

  return (
    <div style={{ padding: "5px" }}>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered={false}
            style={{
              background: "linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)",
              borderRadius: "12px",
            }}
            bodyStyle={{ padding: "20px" }}
          >
            <div style={{ color: "white" }}>
              <div style={{ fontSize: "16px", marginBottom: "8px" }}>Pending Application</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "36px", fontWeight: "bold" }}>20</span>
                <RiFilePaper2Fill style={{ fontSize: "24px", opacity: 0.8 }} />
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered={false}
            style={{
              background: "linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)",
              borderRadius: "12px",
            }}
            bodyStyle={{ padding: "20px" }}
          >
            <div style={{ color: "white" }}>
              <div style={{ fontSize: "16px", marginBottom: "8px" }}>Active Student</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "36px", fontWeight: "bold" }}>350</span>
                <FaUserGraduate style={{ fontSize: "24px", opacity: 0.8 }} />
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered={false}
            style={{
              background: "linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)",
              borderRadius: "12px",
            }}
            bodyStyle={{ padding: "20px" }}
          >
            <div style={{ color: "white" }}>
              <div style={{ fontSize: "16px", marginBottom: "8px" }}>Total Staff</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "36px", fontWeight: "bold" }}>120</span>
                <FaUserNurse style={{ fontSize: "24px", opacity: 0.8 }} />
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered={false}
            style={{
              background: "linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)",
              borderRadius: "12px",
            }}
            bodyStyle={{ padding: "20px" }}
          >
            <div style={{ color: "white" }}>
              <div style={{ fontSize: "16px", marginBottom: "8px" }}>Total Books</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "36px", fontWeight: "bold" }}>560</span>
                <IoBookSharp  style={{ fontSize: "24px", opacity: 0.8 }} />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: "24px" }}>
        <Area {...config} data={transformedData} />
      </Card>
    </div>
  )
}

export default AdminDashboard


