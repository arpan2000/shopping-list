import React from 'react';
import { Check, Trash } from 'lucide-react';

const ShoppingItem = ({ item, onToggleItem, onDeleteItem }) => {
  return (
    <div className="flex items-center justify-between p-3 border-b border-gray-100 group">
      <div 
        className={`flex items-center gap-3 cursor-pointer flex-1 ${item.completed ? "text-gray-400" : ""}`}
        onClick={() => onToggleItem(item.id)}
      >
        <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${item.completed ? "bg-purple-500 border-purple-500" : "border-gray-300"}`}>
          {item.completed && <Check size={12} className="text-white" />}
        </div>
        <span className={`${item.completed ? "line-through" : ""}`}>{item.name}</span>
      </div>
      <button 
        onClick={() => onDeleteItem(item.id)}
        className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash size={16} />
      </button>
    </div>
  );
};

export default ShoppingItem;