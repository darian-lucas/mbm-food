import CourseAddNew from "@/app/admin/components/category/CourseAddNew";
import Heading from "@/app/admin/components/common/Heading";
import React from "react";

const page = () => {
  return (
    <div>
      <Heading>Tạo danh mục mới</Heading>
      <CourseAddNew></CourseAddNew>
    </div>
  );
};

export default page;
