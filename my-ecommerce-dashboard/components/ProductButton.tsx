"use client";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";

export default function ProductAddToCart({ product }: { product: any }) {
  const addToCart = useCartStore((state) => state.addToCart);
  
  const [qty, setQty] = useState(1);

  const handleAdd = () => {

    for (let i = 0; i < qty; i++) {
      addToCart(product);
    }
    alert(`Đã thêm ${qty} ${product.name} vào giỏ hàng!`);
    setQty(1); 
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
 
      <div className="flex items-center justify-between gap-4 mx-2">
        <span className="text-sm text-gray-500 font-medium">Chọn số lượng:</span>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setQty(Math.max(1, qty - 1))} 
            disabled={qty === 1}
            className={`w-6 h-6 flex items-center justify-center transition-all
              ${qty === 1 ? "text-gray-200 cursor-not-allowed" : "text-gray-500 hover:text-red-500 active:scale-90"}`}
          >
            <div className="text-2xl font-light leading-none select-none mb-1">−</div>
          </button>

          <div className="w-4 text-center">
             <span className="text-lg font-black text-gray-800 tabular-nums">{qty}</span>
          </div>

          <button 
            onClick={() => setQty(qty + 1)}
            className="w-6 h-6 flex items-center justify-center text-gray-500 transition-all hover:text-indigo-600 active:scale-90"
          >
            <div className="text-2xl font-light leading-none select-none mb-1">+</div>
          </button>
        </div>
      </div>

      <button
        onClick={handleAdd}
        className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-indigo-600 transition-all shadow-md active:scale-95 text-sm uppercase tracking-widest"
      >
        Thêm vào giỏ
      </button>
    </div>
  );
}   