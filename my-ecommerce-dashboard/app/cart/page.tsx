"use client";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
// BƯỚC 3: Import component đã tách ra
import PaymentMethodItem from "@/components/PaymentMethodItem";

export default function ReadOnlyCart() {
  const { items, clearCart, updateQuantity } = useCartStore();
  
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isShowingQR, setIsShowingQR] = useState(false); 

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const processCheckout = () => {
    alert(`🎉 Đặt hàng thành công!\nPhương thức: ${paymentMethod}\nTổng tiền: $${total.toLocaleString()}`);
    clearCart(); 
    setShowPaymentModal(false); 
    setIsShowingQR(false); 
    setPaymentMethod(""); 
  };

  const handleConfirmPayment = () => {
    if (!paymentMethod) {
      alert("Vui lòng chọn một phương thức thanh toán trước khi xác nhận!");
      return;
    }

    // Logic này khớp với id "Quét mã QR" bên dưới
    if (paymentMethod === "qr") {
      setIsShowingQR(true);
    } else {
      processCheckout();
    }
  };

  const handleCloseModal = () => {
    setShowPaymentModal(false);
    setIsShowingQR(false);
    setPaymentMethod("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans antialiased relative">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-gray-400 hover:text-gray-900 mb-8 inline-flex items-center gap-2 text-sm transition-colors">
          <span className="text-lg">←</span> Quay lại cửa hàng
        </Link>

        <h1 className="text-2xl font-black mb-10 text-gray-900">Xác nhận đơn hàng</h1>

        {/* DANH SÁCH SẢN PHẨM */}
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm flex items-center justify-between border border-gray-200">
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-lg">{item.name}</h3>
                <p className="text-gray-500 font-medium">${item.price.toLocaleString()} / sản phẩm</p>
              </div>

              <div className="flex items-center mx-8">
                <span className="text-sm text-gray-400 font-medium">Số lượng:&nbsp;</span>
                <span className="text-xl font-black text-gray-800">{item.quantity}</span>
              </div>

              <div className="w-32 text-right">
                <p className="font-black text-xl text-gray-900">
                  ${(item.price * item.quantity).toLocaleString()}
                </p>
                <button 
                  onClick={() => updateQuantity(item.id, -item.quantity)}
                  className="text-xs text-red-500 hover:text-red-700 mt-2 font-bold"
                >
                  Xóa món
                </button>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="mt-12 bg-white p-8 rounded-xl shadow-md border border-gray-200 flex flex-col items-end">
    
            {/* Dòng Tạm tính */}
            <div className="flex justify-between w-full max-w-xs text-gray-500 mb-2">
                <span>Tạm tính:</span>
                <span className="text-gray-900 font-bold">${subtotal.toLocaleString()}</span>
            </div>

            {/* Dòng Thuế VAT - Ghi rõ 10% */}
            <div className="flex justify-between w-full max-w-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
                <span>Thuế VAT (10%):</span>
                <span className="text-red-500 font-bold">+${tax.toLocaleString()}</span>
            </div>

            {/* Dòng Tổng cộng thanh toán */}
            <div className="flex justify-between w-full max-w-xs text-2xl text-gray-900 mb-8">
                <span className="font-medium">Tổng cộng:</span>
                <span className="text-black font-black">${total.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-10">
              <button onClick={clearCart} 
                className="flex items-center justify-center px-6 py-3 border border-black rounded-lg font-bold text-gray-600 hover:text-red-600 hover:bg-gray-50 transition-colors">    
                Hủy đơn hàng
              </button>
              
              <button 
                onClick={() => setShowPaymentModal(true)}
                className="ml-4 flex items-center justify-center px-6 py-3 border border-black rounded-lg font-bold text-gray-900 hover:bg-gray-50 transition-colors">
                Thanh toán ngay
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MODAL THANH TOÁN */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white w-full max-w-3xl rounded-xl p-8 border border-black shadow-2xl">
            
            {!isShowingQR ? (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Phương thức thanh toán</h2>
                <p className="text-gray-500 text-sm mb-6">Vui lòng chọn 1 phương thức dưới đây.</p>

                {/* TÍCH HỢP COMPONENT TẠI ĐÂY */}
                <div className="flex flex-col items-start gap-4 mb-8">
                  <PaymentMethodItem 
                    id="cod"
                    icon="💵"
                    title="Thanh toán tiền mặt (COD)"
                    description="Thanh toán cho shipper khi nhận hàng"
                    isSelected={paymentMethod === "cod"}
                    onClick={setPaymentMethod}
                  />

                  <PaymentMethodItem 
                    id="qr"
                    icon="📱"
                    title="Quét mã QR"
                    description="Momo, ZaloPay, VNPay, App Ngân hàng"
                    isSelected={paymentMethod === "qr"}
                    onClick={setPaymentMethod}
                  />

                  <PaymentMethodItem 
                    id="credit"
                    icon="💳"
                    title="Thẻ Tín dụng / Ghi nợ"
                    description="Hỗ trợ thẻ Visa, Mastercard, JCB"
                    isSelected={paymentMethod === "credit"}
                    onClick={setPaymentMethod}
                  />
                </div>

                <div className="flex items-center gap-4 mt-6 border-t border-gray-200 pt-6">
                  <button 
                    onClick={handleCloseModal}
                    className="flex items-center justify-center px-6 py-3 border border-black rounded-lg font-bold text-gray-600 hover:text-red-600 hover:bg-gray-50 transition-colors"
                  >
                    Hủy bỏ
                  </button>

                  <style>{`
                    .btn-ep-kieu:hover {
                      background-color: #000000 !important;
                      color: #ffffff !important;
                    }
                  `}</style>

                  <button 
                    onClick={handleConfirmPayment}
                    className="ml-4 flex items-center justify-center px-6 py-3 border border-black rounded-lg font-bold transition-all duration-300 gap-2 bg-white text-black hover:!bg-black hover:!text-white btn-ep-kieu "
                  >
                    <span>Xác nhận thanh toán</span>
                    <span>${total.toLocaleString()}</span>
                  </button>
                </div>
              </>
            ) : (
              /* GIAO DIỆN QR */
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Quét mã để thanh toán</h2>
                <p className="text-gray-500 text-sm mb-6">Mở ứng dụng ngân hàng và quét mã dưới đây.</p>
                
                <div className="bg-white p-4 rounded-xl border-2 border-gray-200 inline-block mb-6">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ThanhToanHoaDon-${total}`} 
                    alt="Mã QR"
                    className="w-48 h-48"
                  />
                </div>

                <div className="block mb-8">
                    <div className="text-2xl font-black text-black border-2 border-gray-200 py-2 px-6 rounded-lg inline-block">
                        ${total.toLocaleString()}
                    </div>
                </div>

                <div className="flex items-center justify-center gap-4 mt-8">
                  <button 
                    onClick={() => setIsShowingQR(false)} 
                    className="px-6 py-3 border border-black rounded-lg font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    Quay lại
                  </button>
                  <button 
                    onClick={processCheckout} 
                    className="ml-4 px-6 py-3 border border-black rounded-lg font-bold text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    Tôi đã thanh toán
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}