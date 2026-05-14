import { NextResponse } from "next/server";

export async function GET() {
  const products = [
    { id: 1, name: "Bàn phím cơ Keychron", price: 150, desc: "Bàn phím cơ không dây chất lượng cao, gõ cực êm." },
    { id: 2, name: "Chuột Logitech MX Master 3", price: 99, desc: "Chuột công thái học tốt nhất cho lập trình viên." },
    { id: 3, name: "Màn hình Dell UltraSharp", price: 350, desc: "Màn hình 4K sắc nét, chuẩn màu đồ họa." },
    { id: 4, name: "Tai nghe Sony WH-1000XM5", price: 299, desc: "Chống ồn đỉnh cao, âm thanh trung thực." },
    { id: 5, name: "Giá đỡ màn hình Human Motion", price: 45, desc: "Cánh tay linh hoạt, tối ưu không gian làm việc." },
    { id: 6, name: "Bàn nâng hạ Ergonomic", price: 250, desc: "Thay đổi độ cao thông minh, bảo vệ cột sống." },
    { id: 7, name: "Hub USB-C Ugreen 7-in-1", price: 35, desc: "Mở rộng kết nối đa năng, tốc độ truyền tải nhanh." },
    { id: 8, name: "Loa Bluetooth Marshall Emberton", price: 120, desc: "Thiết kế cổ điển, âm thanh 360 độ mạnh mẽ." },
    { id: 9, name: "Ổ cứng SSD Samsung 1TB", price: 85, desc: "Tốc độ đọc ghi cực nhanh, lưu trữ an toàn." },
    { id: 10, name: "Ghế công thái học Sihoo", price: 180, desc: "Hỗ trợ thắt lưng tối ưu, ngồi lâu không mỏi." },
  ];

  return NextResponse.json(products);
}