import { useGetAllCourseQuery } from "../../../redux/features/course/courseApi";

function GetAllCourse() {
  const { data: courses } = useGetAllCourseQuery(undefined);
  console.log(courses);
  return <div>GetAllCourse</div>;
}

export default GetAllCourse;
