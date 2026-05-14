import ProductButton from "@/components/ProductButton";
import Link from "next/link";

const mockProducts = [
  { id: 1, name: "Bàn phím cơ Keychron", price: 150, desc: "Bàn phím cơ không dây chất lượng cao, gõ cực êm." },
  { id: 2, name: "Chuột Logitech MX Master 3", price: 99, desc: "Chuột công thái học tốt nhất cho lập trình viên." },
  { id: 3, name: "Màn hình Dell UltraSharp", price: 350, desc: "Màn hình 4K sắc nét, chuẩn màu đồ họa." },
  { id: 4, name: "Tai nghe Sony WH-1000XM5", price: 299, desc: "Tai nghe chống ồn chủ động không dây hàng đầu hiện nay." },
  { id: 5, name: "Giá đỡ màn hình Human Motion", price: 45, desc: "Arm màn hình linh hoạt, giúp tiết kiệm không gian bàn làm việc." },
  { id: 6, name: "Bàn nâng hạ Ergonomic", price: 250, desc: "Bàn làm việc đứng thay đổi chiều cao bằng động cơ điện êm ái." },
  { id: 7, name: "Hub USB-C Ugreen 7-in-1", price: 35, desc: "Cổng chuyển đổi đa năng hỗ trợ xuất HDMI 4K và sạc nhanh PD." },
  { id: 8, name: "Loa Bluetooth Marshall Emberton", price: 120, desc: "Loa di động thiết kế cổ điển, âm thanh 360 độ sống động." },
  { id: 9, name: "Ổ cứng SSD Samsung 1TB", price: 85, desc: "Ổ cứng chuẩn NVMe tốc độ cao, lý tưởng cho lưu trữ và chơi game." },
  { id: 10, name: "Ghế công thái học Sihoo", price: 180, desc: "Ghế lưới thoáng mát, bảo vệ cột sống cho người ngồi máy tính lâu." },
];

export function generateStaticParams() {
  return mockProducts.map((product) => ({
    id: product.id.toString(),
  }));
}

export default function ProductDetail({ params }: { params: { id: string } }) {
  const product = mockProducts.find((p) => p.id.toString() === params.id);

  if (!product) return <div className="p-8 text-center text-red-500">Sản phẩm không tồn tại</div>;

  return (
    <div className="p-8 max-w-2xl mx-auto mt-10 bg-white rounded-xl shadow-lg border border-gray-100">
      <Link href="/" className="text-blue-500 hover:underline mb-6 inline-block font-medium">
        &larr; Quay lại Dashboard
      </Link>
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-600 mb-6 leading-relaxed">{product.desc}</p>
      <p className="text-green-600 font-bold text-3xl mb-8">${product.price}</p>
      <ProductButton product={product} />
    </div>
  );
}