"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import slugify from "slugify";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import CategoryServices from "../../services/CategoryServices";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { TCreateCategoryParams } from "../../types";

// ✅ Schema validation
const formSchema = z.object({
  name: z.string().min(3, "Tên danh mục phải có ít nhất 3 ký tự"),
  description: z.string().optional(),
  slug: z.string().optional(),
  image: z.string().optional(),
});

function CategoryAddNew() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      slug: "",
      image: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const categoryData: TCreateCategoryParams = {
        name: values.name,
        description: values.description || "",
        slug: values.slug || slugify(values.name, { lower: true, locale: "vi" }),
        image: file ? URL.createObjectURL(file) : "",
      };

      const formData = new FormData();
      formData.append("name", categoryData.name);
      formData.append("description", categoryData.description);
      formData.append("slug", categoryData.slug);
      if (file) {
        formData.append("image", file);
      }

      const res = await CategoryServices.createCategory(formData);
      if (!res?.success) {
        toast.error(res?.message || "Có lỗi xảy ra");
        return;
      }
      toast.success("Tạo danh mục thành công");
      router.push("/admin/pages/category/new");
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi tạo danh mục");
    } finally {
      setIsSubmitting(false);
      form.reset();
      setPreviewImage(null);
      setFile(null);
    }
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        <div className="grid grid-cols-2 gap-8 mt-10 mb-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên danh mục *</FormLabel>
                <FormControl>
                  <Input placeholder="Tên danh mục" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Đường dẫn danh mục</FormLabel>
                <FormControl>
                  <Input placeholder="slug-danh-muc" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả danh mục</FormLabel>
              <FormControl>
                <Input placeholder="Nhập mô tả" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 🖼️ Upload Ảnh bằng input file */}
        <FormField
          control={form.control}
          name="image"
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ảnh đại diện</FormLabel>
              <FormControl>
                <div className="flex flex-col gap-3">
                  <input
                    type="file"
                    accept="images/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setFile(file);
                        setPreviewImage(URL.createObjectURL(file));
                      }
                    }}
                  />
                  {previewImage && (
                    <Image
                      src={previewImage}
                      alt="Ảnh danh mục"
                      width={250}
                      height={250}
                      className="rounded-md object-cover"
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          isLoading={isSubmitting}
          variant="primary"
          type="submit"
          className="w-[120px]"
          disabled={isSubmitting}
        >
          Tạo danh mục
        </Button>
      </form>
    </Form>
  );
}
export default CategoryAddNew;
