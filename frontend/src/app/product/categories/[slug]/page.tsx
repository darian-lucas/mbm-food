'use client';
import { notFound } from "next/navigation";
import ProductList from "@/components/common/ProductList";

// Ánh xạ slug sang idcate
const categoryMap: Record<string, string> = {
  pizza: "67b0a4fbb5a39baf9de368ff",
  "khai-vi": "67b0a54db5a39baf9de36902",
  "my-y": "67b0a582b5a39baf9de36904",
  salad: "67b0a5d2b5a39baf9de36907",
  "nuoc-uong": "67b0a75ab5a39baf9de3690a",
};

export default function CategoryPage({ params }: { params: { slug: string } }) {
  // Lấy ID danh mục tương ứng
  const categoryId = categoryMap[params.slug];
  if (!categoryId) return notFound();

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Danh mục: {params.slug.replace("-", " ").toUpperCase()}
      </h1>

      {/* Gọi ProductList, nhưng ép nó hiển thị toàn bộ sản phẩm */}
      <ProductList idcate={categoryId} showAll={true} />
    </div>
  );
}
