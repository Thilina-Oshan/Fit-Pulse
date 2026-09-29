import React, { useState } from 'react';
import { ShoppingBag, Plus, Minus, Trash2, CheckCircle2 } from 'lucide-react';
import { mockPOSItems } from '../data/mockData';
import { POSItem } from '../types';

export const POSModule: React.FC = () => {
  const [cart, setCart] = useState<{ item: POSItem; quantity: number }[]>([]);

  const addToCart = (item: POSItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.item.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.item.id === id) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as { item: POSItem; quantity: number }[]
    );
  };

  const totalAmount = cart.reduce((sum, i) => sum + i.item.price * i.quantity, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Point of Sale (POS) & Merchandise</h2>
        <p className="text-sm text-slate-400">Sell supplements, gym gear, and manage instant billing.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Catalog */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockPOSItems.map((item) => (
            <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between">
              <img src={item.image} alt={item.name} className="h-40 w-full object-cover" />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400 bg-blue-950/50 border border-blue-800/40 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-white text-sm mt-2">{item.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">Stock available: {item.stock} pcs</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-extrabold text-emerald-400">LKR {item.price.toLocaleString()}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-3.5 py-2 rounded-xl transition shadow-md shadow-blue-600/20"
                  >
                    <Plus className="w-4 h-4" /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart & Billing Section */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl h-fit flex flex-col">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-4 mb-4">
            <ShoppingBag className="w-5 h-5 text-blue-500" />
            <h3 className="font-bold text-lg text-white">Current Order Bill</h3>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <p className="text-sm font-medium">Cart is currently empty</p>
              <p className="text-xs mt-1">Select items from the catalog to build an order.</p>
            </div>
          ) : (
            <div className="space-y-4 flex-1">
              {cart.map(({ item, quantity }) => (
                <div key={item.id} className="flex items-center justify-between bg-slate-800/50 p-3 rounded-xl border border-slate-700/40">
                  <div className="flex-1 pr-2">
                    <h4 className="text-xs font-bold text-white leading-tight">{item.name}</h4>
                    <p className="text-xs text-emerald-400 font-semibold mt-1">LKR {(item.price * quantity).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.id, -1)} className="p-1 text-slate-400 hover:text-white bg-slate-700 rounded-lg">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-white w-4 text-center">{quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="p-1 text-slate-400 hover:text-white bg-slate-700 rounded-lg">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="border-t border-slate-800 pt-4 mt-6 space-y-2">
                <div className="flex justify-between text-sm text-slate-400">
                  <span>Subtotal</span>
                  <span>LKR {totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-400">
                  <span>Tax (0%)</span>
                  <span>LKR 0</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-slate-800">
                  <span>Grand Total</span>
                  <span className="text-emerald-400">LKR {totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={() => {
                  alert('Payment Processed Successfully! Print Invoice Generated.');
                  setCart([]);
                }}
                className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 text-sm"
              >
                <CheckCircle2 className="w-4 h-4" /> Checkout & Print Receipt
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
