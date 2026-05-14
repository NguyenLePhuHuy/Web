"use client";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function CartHeader() {
  const items = useCartStore((state) => state.items);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex justify-between items-center mb-10 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
      <div>
        <h1 className="text-2xl font-black text-blue-600">TECH STORE</h1>
        <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">Topic 2: Modern Ecosystem</p>
      </div>

      <div className="flex items-center gap-4">

        <Link href="/cart">
          <button className="bg-gray-900 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-800 transition">
            🛒 Giỏ hàng
            <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          </button>
        </Link>

        <button 
          onClick={handleLogout}
          className="text-red-500 font-semibold hover:bg-red-50 px-4 py-2.5 rounded-xl transition"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
}