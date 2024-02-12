import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { TQueryParam } from "../../../types/global";
import { useGetAllCourseQuery } from "../../../redux/features/course/courseApi";
import { CouseType } from "../../../types/course.type";

export type TTableData = Pick<
  CouseType,
  "_id" | "title" | "instructor" | "price" | "startDate" | "endDate"
>;

const GetAllCourse = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const {
    data: courseData,
    isLoading,
    isFetching,
  } = useGetAllCourseQuery(undefined);

  console.log(courseData);

  console.log({ isLoading, isFetching });

  const tableData = courseData?.data?.courses?.map(
    ({ _id, title, instructor, price, startDate, endDate }: TTableData) => ({
      key: _id,
      title,
      instructor,
      price,
      startDate,
      endDate,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
      filters: [
        {
          text: "Autumn",
          value: "Autumn",
        },
        {
          text: "Fall",
          value: "Fall",
        },
        {
          text: "Summer",
          value: "Summer",
        },
      ],
    },
    {
      title: "Instructor",
      key: "instructor",
      dataIndex: "instructor",
      filters: [
        {
          text: "2024",
          value: "2024",
        },
        {
          text: "2025",
          value: "2025",
        },
        {
          text: "2026",
          value: "2026",
        },
      ],
    },
    {
      title: "Price",
      key: "price",
      dataIndex: "price",
    },
    {
      title: "Start Date",
      key: "startDate",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      key: "endDate",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
        );
      },
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );

      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );

      setParams(queryParams);
    }
  };

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
    />
  );
};

export default GetAllCourse;
