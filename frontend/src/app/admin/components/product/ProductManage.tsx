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
import { toast } from "react-toastify";
import ProductServices from "../../services/ProductServices";
import CategoryServices from "../../services/CategoryServices";
import { commonClassNames } from "../../constants";

const API_URL = process.env.NEXT_PUBLIC_URL_IMAGE;

interface Product {
  name: string;
  _id: string;
  createdAt: string;
  description: string;
  variants: {
    option: string;
    image: string;
    price: number;
    sale_price: number;
  }[];
  slug: string;
  status: string;
  idcate: string;
}

const ProductManage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const productData = await ProductServices.getAllProducts();
      setProducts(productData);

      const categoryData = await CategoryServices.getAllCategories();
      setCategories(categoryData);
    };

    fetchData();
  }, []);

  const handleDeleteProduct = async (id: string) => {
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
          await ProductServices.deleteProduct(id);

          setProducts((prev) => prev.filter((item) => item._id !== id));

          toast.success("Xóa sản phẩm thành công!");
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
        href="/admin/manage/products/new"
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
        <Heading className="">Quản lý sản phẩm</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-[300px]">
            <Input placeholder="Tìm kiếm sản phẩm..." onChange={() => {}} />
          </div>
        </div>
      </div>
      <Table className="table-responsive">
        <TableHeader>
          <TableRow>
            <TableHead>Thông tin</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Danh mục</TableHead>
            {/* <TableHead>Mô tả</TableHead> */}
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length > 0 &&
            products.map((product) => {
              return (
                <TableRow key={product.slug}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        alt=""
                        src={
                          product.variants?.[0]?.image
                            ? `${API_URL}/images/${product.variants[0].image}`
                            : "/placeholder.jpg" // Ảnh mặc định nếu không có ảnh
                        }
                        
                        width={100}
                        height={100}
                        className="flex-shrink-0 size-14 rounded-lg object-contain"
                      />
                      <div className="flex flex-col gap-1">
                        <h3 className="font-bold text-sm whitespace-nowrap">
                          {product.name}
                        </h3>
                        <h4 className="text-xs text-slate-500">
                          {new Date(product.createdAt).toLocaleDateString(
                            "vi-VI"
                          )}
                        </h4>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                  {product.variants?.[0]?.price ? `${product.variants[0].price.toLocaleString("vi")} VNĐ` : "Chưa có giá"}


                  </TableCell>
                  <TableCell className="px-3">
                    {" "}
                    {categories.find((cate) => cate._id === product.idcate)
                      ?.name || "Không xác định"}
                  </TableCell>
                  {/* <TableCell className="">
                    <div className="flex items-center gap-20">
                      <p className="line-clamp-1 pl-3">{product.description}</p>
                    </div>
                  </TableCell> */}
                  <TableCell className="pl-4"><span className={commonClassNames.status}>{product.status}</span></TableCell>
                  <TableCell className="px-3">
                    <div className="flex gap-3 ">
                      <Link
                        href={`/admin/manage/products/update?slug=${product.slug}`}
                        className={commonClassNames.action}
                      >
                        <IconEdit />
                      </Link>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
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

export default ProductManage;
