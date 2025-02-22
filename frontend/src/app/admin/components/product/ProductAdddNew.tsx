"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef, useEffect } from "react";
import slugify from "slugify";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import CategoryServices from "../../services/CategoryServices";
import { Editor } from "@tinymce/tinymce-react";

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
import { TCreateProductParams } from "../../types";
import { editorOptions } from "../../constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductServices from "../../services/ProductServices";

const formSchema = z.object({
  name: z.string().min(3, "Tên danh mục phải có ít nhất 3 ký tự"),
  description: z.string().optional(),
  slug: z.string().optional(),
  image: z.string().optional(),
  idcate: z.string().optional(),
  hot: z.number().optional(),
  price: z.string().optional(),
  sale_price: z.string().optional(),
});

function ProductAddNew() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const editorRef = useRef<Editor | null>(null);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
    []
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      slug: "",
      image: "",
      hot: 0,
      idcate: "",
      price: "",
      sale_price: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const categoryData = await CategoryServices.getAllCategories();
      setCategories(categoryData);
    };

    fetchData();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const productData: TCreateProductParams = {
        name: values.name,
        description: values.description || "",
        slug:
          values.slug || slugify(values.name, { lower: true, locale: "vi" }),
        idcate: values.idcate || "",
        hot: values.hot || 0,
        variants: [
          {
            option: "Default",
            image: file ? URL.createObjectURL(file) : "",
            price: values.price ? parseFloat(values.price) : 0,
            sale_price: values.sale_price ? parseFloat(values.sale_price) : 0,
          },
        ],
      };

      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("description", productData.description);
      formData.append("slug", productData.slug);
      formData.append("hot", String(productData.hot));
      formData.append("idcate", productData.idcate);
      formData.append("price", String(productData.variants[0].price));
      formData.append("sale_price", String(productData.variants[0].sale_price));

      if (file) {
        formData.append("image", file);
      }

      const res = await ProductServices.createProduct(formData);
      if (!res?.success) {
        toast.error(res?.message || "Có lỗi xảy ra");
        return;
      }
      toast.success("Tạo sản phẩm thành công");
      router.push("/admin/pages/category/new");
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi tạo sản phẩm");
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
                <FormLabel>Tên sản phẩm</FormLabel>
                <FormControl>
                  <Input placeholder="Tên sản phẩm" {...field} />
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
                <FormLabel>Đường dẫn sản phẩm</FormLabel>
                <FormControl>
                  <Input placeholder="slug-danh-muc" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá khuyến mãi</FormLabel>
                <FormControl>
                  <Input placeholder="299.000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sale_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá gốc</FormLabel>
                <FormControl>
                  <Input placeholder="399.000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hot"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hot</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="idcate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Danh mục</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem value={category._id} key={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormLabel>Ảnh đại diện</FormLabel>
                <FormControl>
                  <div className="border border-gray-300 p-2 rounded-md h-[250px]">
                    <input
                      type="file"
                      accept="image/*"
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
                        className="h-[200px] w-auto rounded-lg object-cover mt-2"
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-start-1 col-end-3">
                <FormLabel>Mô tả sản phẩm</FormLabel>
                <FormControl>
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onInit={(_evt, editor) => {
                      (editorRef.current = editor).setContent(
                        field.value || ""
                      );
                    }}
                    initialValue={field.value}
                    init={editorOptions}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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

export default ProductAddNew;
