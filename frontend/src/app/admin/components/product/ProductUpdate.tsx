"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef, useEffect } from "react";
import slugify from "slugify";
import { toast } from "react-toastify";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import CategoryServices from "../../services/CategoryServices";
import { Editor } from "@tinymce/tinymce-react";
import { Plus, Trash2 } from "lucide-react";

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

// Định nghĩa schema cho một variant
const variantSchema = z.object({
  option: z.string().optional(),
  image: z.string().optional(),
  price: z.string().optional(),
  sale_price: z.string().optional(),
});

const formSchema = z.object({
  name: z.string().min(3, "Tên danh mục phải có ít nhất 3 ký tự"),
  description: z.string().optional(),
  slug: z.string().optional(),
  idcate: z.string().optional(),
  hot: z.number().optional(),
  variants: z.array(variantSchema),
});

function ProductUpdate() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [previewImages, setPreviewImages] = useState<(string | null)[]>([null]);
  const [files, setFiles] = useState<(File | null)[]>([null]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const editorRef = useRef<Editor | null>(null);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
    []
  );
  const [product, setProduct] = useState<TCreateProductParams | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      slug: "",
      hot: 0,
      idcate: "",
      variants: [
        {
          option: "",
          price: "",
          sale_price: "",
          image: "",
        },
      ],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  // Fetch product data and categories
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const categoryData = await CategoryServices.getAllCategories();
        setCategories(categoryData);

        // Fetch product data
        if (slug) {
          const productData = await ProductServices.getProductBySlug(
            slug as string
          );
          setProduct(productData);
          setCategoryId(productData._id);

          // Set form values
          form.setValue("name", productData.name);
          form.setValue("description", productData.description || "");
          form.setValue("slug", productData.slug || "");
          form.setValue("hot", productData.hot || 0);
          form.setValue("idcate", productData.idcate || "");

          // Set variants
          if (productData.variants && productData.variants.length > 0) {
            const formattedVariants = productData.variants.map(
              (variant: any) => ({
                _id: variant._id || "",
                option: variant.option || "",
                price: variant.price ? variant.price.toString() : "0",
                sale_price: variant.sale_price
                  ? variant.sale_price.toString()
                  : "0",
                image: variant.image || "",
              })
            );

            replace(formattedVariants);

            // Set preview images
            const newPreviewImages = productData.variants.map((variant: any) =>
              variant.image
                ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${variant.image}`
                : null
            );
            setPreviewImages(newPreviewImages);
            setFiles(new Array(newPreviewImages.length).fill(null));
            setExistingImages(
              productData.variants.map((v: any) => v.image || "")
            );
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Không thể tải dữ liệu sản phẩm");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug, form, replace]);

  const handleImageChange = (index: number, file: File) => {
    const newFiles = [...files];
    newFiles[index] = file; // Lưu tệp thực tế
    setFiles(newFiles);

    const newPreviewImages = [...previewImages];
    newPreviewImages[index] = URL.createObjectURL(file); // Chỉ để xem trước
    setPreviewImages(newPreviewImages);
  };

  const addVariant = () => {
    append({ option: "", price: "", sale_price: "", image: "" });
    setFiles([...files, null]);
    setPreviewImages([...previewImages, null]);
    setExistingImages([...existingImages, ""]);
  };

  const removeVariant = (index: number) => {
    remove(index);
    const newFiles = [...files];
    const newPreviewImages = [...previewImages];
    const newExistingImages = [...existingImages];
    newFiles.splice(index, 1);
    newPreviewImages.splice(index, 1);
    newExistingImages.splice(index, 1);
    setFiles(newFiles);
    setPreviewImages(newPreviewImages);
    setExistingImages(newExistingImages);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!slug) {
      toast.error("Không tìm thấy ID sản phẩm");
      return;
    }

    setIsSubmitting(true);
    try {
      const productData: TCreateProductParams = {
        name: values.name,
        description: values.description || "",
        slug:
          values.slug || slugify(values.name, { lower: true, locale: "vi" }),
        idcate: values.idcate || "",
        hot: values.hot || 0,
        variants: values.variants.map((variant, index) => ({
          option: variant.option || "",
          price: parseFloat(variant.price || "0"),
          sale_price: parseFloat(variant.sale_price || "0"),
          image: files[index]
            ? (files[index] as File).name
            : existingImages[index], // Giữ ảnh cũ nếu không có tệp mới
        })),
      };

      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("description", productData.description);
      formData.append("slug", productData.slug);
      formData.append("hot", String(productData.hot));
      formData.append("idcate", productData.idcate);

      // Thêm dữ liệu biến thể vào FormData
      productData.variants.forEach((variant, index) => {
        formData.append(`variants[${index}][option]`, variant.option);
        formData.append(`variants[${index}][price]`, String(variant.price));
        formData.append(
          `variants[${index}][sale_price]`,
          String(variant.sale_price)
        );

        // Thêm tệp hình ảnh mới nếu có
        if (files[index]) {
          formData.append(`variants[${index}][image]`, files[index] as File);
        } else if (existingImages[index]) {
          formData.append(`variants[${index}][image]`, existingImages[index]);
        }
      });

      // Gọi API cập nhật sản phẩm
      if (!categoryId) {
        throw new Error("Category ID is null");
      }
      const response = await ProductServices.updateProduct(
        categoryId,
        formData
      );
      if (response.success) {
        toast.success("Cập nhật sản phẩm thành công");
        router.push("/admin/manage/products");
      } else {
        toast.error(response.message || "Có lỗi xảy ra");
      }
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi cập nhật sản phẩm");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="py-10 text-center">Đang tải dữ liệu sản phẩm...</div>
    );
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
            name="hot"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hot</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    type="number"
                    {...field}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      field.onChange(value);
                    }}
                  />
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
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
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

          <div className="col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Biến thể sản phẩm</h3>
              <Button
                type="button"
                onClick={addVariant}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Thêm biến thể
              </Button>
            </div>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-2 gap-8 p-4 mb-4 border rounded-lg"
              >
                <FormField
                  control={form.control}
                  name={`variants.${index}.option`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Option</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhỏ 6 inch..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`variants.${index}.price`}
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
                  name={`variants.${index}.sale_price`}
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
                <FormItem>
                  <FormLabel>Ảnh biến thể</FormLabel>
                  <FormControl>
                    <div className="border border-gray-300 p-2 rounded-md h-[250px]">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleImageChange(index, file);
                          }
                        }}
                      />
                      {previewImages[index] && (
                        <Image
                          src={previewImages[index]!}
                          alt="Ảnh biến thể"
                          width={250}
                          height={250}
                          className="h-[200px] w-auto rounded-lg object-cover mt-2"
                        />
                      )}
                      {existingImages[index] && !previewImages[index] && (
                        <div className="mt-2 text-sm text-gray-500">
                          Đang sử dụng ảnh: {existingImages[index]}
                        </div>
                      )}
                    </div>
                  </FormControl>
                </FormItem>
                {index > 0 && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeVariant(index)}
                    className="col-span-2 w-fit"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Xóa biến thể
                  </Button>
                )}
              </div>
            ))}
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Mô tả sản phẩm</FormLabel>
                <FormControl>
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onInit={(_evt, editor) => {
                      editorRef.current = editor;
                      editor.setContent(field.value || "");
                    }}
                    initialValue={field.value}
                    init={editorOptions}
                    onEditorChange={(content: string) => {
                      form.setValue("description", content, {
                        shouldValidate: true,
                      });
                    }}
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
          Cập nhật
        </Button>
      </form>
    </Form>
  );
}

export default ProductUpdate;
