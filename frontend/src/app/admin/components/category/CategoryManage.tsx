"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Heading from "../common/Heading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { IconDelete, IconEdit, IconLeftArrow, IconRightArrow } from "../icons";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2";
import CategoryServices from "../../services/CategoryServices";
import { toast } from "react-toastify";
import { commonClassNames } from "../../constants";

const API_URL = process.env.NEXT_PUBLIC_URL_IMAGE;

interface Category {
  _id: string;
  image: string;
  createdAt: string;
  description: string;
  name: string;
  slug: string;
}

const CategoryManage = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const showCategories = async () => {
      const data = await CategoryServices.getAllCategories();
      setCategories(data);
    };
    showCategories();
  }, []);

  const handleDeleteCategory = async (id: string) => {
    Swal.fire({
      title: "Bạn có chắc chắn?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa ngay!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {

          await CategoryServices.deleteCategory(id);
  
          setCategories((prev) => prev.filter((item) => item._id !== id));
  
          toast.success("Xóa danh mục thành công!");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          toast.error("Có lỗi xảy ra, vui lòng thử lại!");
        }
      }
    });
  };
  
  return (
    <>
      <Link
        href="/admin/pages/category/new"
        className="size-10 rounded-full bg-primary flexCenter text-white fixed right-5 bottom-5 animate-bounce"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </Link>
      <div className="flex items-center gap-5 justify-between mb-3">
        <Heading className="">Quản lý danh mục</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-[300px]">
            <Input placeholder="Tìm kiếm danh mục..." onChange={() => {}} />
          </div>
        </div>
      </div>
      <Table className="table-responsive">
        <TableHeader>
          <TableRow>
            <TableHead>Thông tin</TableHead>
            <TableHead>Mô tả</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length > 0 &&
            categories.map((category) => {
              return (
                <TableRow key={category.slug}>
                  <TableCell className="pr-20">
                    <div className="flex items-center gap-3">
                      <Image
                        alt=""
                        src={`${API_URL}/images/${category.image}`}
                        width={100}
                        height={100}
                        className="flex-shrink-0 size-14 rounded-lg object-contain"
                      />
                      <div className="flex flex-col gap-1">
                        <h3 className="font-bold text-sm lg:text-base whitespace-nowrap">
                          {category.name}
                        </h3>
                        <h4 className="text-xs lg:text-sm text-slate-500">
                          {new Date(category.createdAt).toLocaleDateString(
                            "vi-VI"
                          )}
                        </h4>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="">
                    <div className="flex items-center gap-20">
                      <p className="line-clamp-1">{category.description}</p>
                    </div>
                  </TableCell>
                  <TableCell className="pl-2">
                    <div className="flex gap-3">
                      <Link
                        href={`/admin/pages/category/update?slug=${category.slug}`}
                        className={commonClassNames.action}
                      >
                        <IconEdit />
                      </Link>
                      <button
                         onClick={() => handleDeleteCategory(category._id)}
                        className={commonClassNames.action}
                      >
                        <IconDelete />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <div className="flex justify-end gap-3 mt-5">
        <button
          className={commonClassNames.paginationButton}
          onClick={() => {}}
        >
          <IconLeftArrow />
        </button>
        <button
          className={commonClassNames.paginationButton}
          onClick={() => {}}
        >
          <IconRightArrow />
        </button>
      </div>
    </>
  );
};

export default CategoryManage;
