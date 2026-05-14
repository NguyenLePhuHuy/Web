"use client";

import { useEffect } from "react"; 
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore"; 

import { useCartStore } from "@/store/cartStore";
import ProductButton from "@/components/ProductButton";

const mockProducts = [
  { id: 1, name: "Bàn phím cơ Keychron", price: 150 },
  { id: 2, name: "Chuột Logitech MX Master 3", price: 99 },
  { id: 3, name: "Màn hình Dell UltraSharp", price: 350 },
  { id: 4, name: "Tai nghe Sony WH-1000XM5", price: 299 },
  { id: 5, name: "Giá đỡ màn hình Human Motion", price: 45 },
  { id: 6, name: "Bàn nâng hạ Ergonomic", price: 250 },
  { id: 7, name: "Hub USB-C Ugreen 7-in-1", price: 35 },
  { id: 8, name: "Loa Bluetooth Marshall Emberton", price: 120 },
  { id: 9, name: "Ổ cứng SSD Samsung 1TB", price: 85 },
  { id: 10, name: "Ghế công thái học Sihoo", price: 180 },
];

export default function Home() {
  const items = useCartStore((state) => state.items);

  const isAuthenticated = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; 
  }

  const handleLogout = () => {
    logout(); 
    router.push("/login"); 
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans antialiased">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex justify-between items-start mb-8 pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">TECH STORE</h1>
            <p className="text-sm text-gray-600 mt-1">Topic 2: Modern Ecosystem</p>
          </div>
          
          <div className="flex items-center gap-6">
            <Link href="/cart" className="flex items-center gap-1.5 text-sm font-bold text-gray-700 hover:text-black transition-colors">
              <span>🛒 Giỏ hàng &nbsp;</span>
              <span className="bg-gray-200 text-gray-900 flex items-center justify-center min-w-[24px] h-[24px] rounded-full text-xs font-black">
                {totalItems}
              </span>
            </Link>
            
            <button 
              onClick={handleLogout}
              className="text-sm font-bold text-gray-700 hover:text-black"
            >
              &nbsp;Đăng xuất
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProducts.map((product) => (
            <div key={product.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">

              <Link href={`/${product.id}`} className="hover:underline">
                <h3 className="font-bold text-lg text-gray-900 mb-2">{product.name}</h3>
              </Link>
              <p className="text-green-600 font-bold text-xl mb-6">${product.price}</p>
              
              <div className="mt-auto">
                <ProductButton product={product} />
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}