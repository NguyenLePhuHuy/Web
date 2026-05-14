"use client";

import React from 'react';

interface PaymentMethodProps {
  id: string;
  icon: string;
  title: string;
  description: string;
  isSelected: boolean;
  onClick: (id: string) => void;
}

const PaymentMethodItem: React.FC<PaymentMethodProps> = ({ 
  id, icon, title, description, isSelected, onClick 
}) => {
  return (
    <div 
      onClick={() => onClick(id)}
      /* DÙNG STYLE TRỰC TIẾP ĐỂ ÉP MÀU - BỎ QUA LỖI TAILWIND */
      style={{
        backgroundColor: isSelected ? '#000000' : '#ffffff',
        color: isSelected ? '#ffffff' : '#111827',
      }}
      className={`w-fit flex items-center p-4 px-6 rounded-xl border border-black cursor-pointer transition-all duration-300 mb-4 hover:bg-gray-50`}
    >
      <div className="flex items-center gap-4 mr-8">
        <div className="text-2xl">{icon}</div>
        <div className="flex flex-col text-left">
          <div className="font-bold">{title}</div>
          {/* Chú thích cũng ép màu trực tiếp cho an toàn */}
          <div 
            style={{ color: isSelected ? '#9ca3af' : '#6b7280' }} 
            className="text-sm transition-colors"
          >
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodItem;