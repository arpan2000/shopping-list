import React, { useState } from 'react';
import { Plus, Trash } from 'lucide-react';
import ShoppingItem from './ShoppingItem';

const ShoppingList = ({ list, onUpdateList, onDeleteList }) => {
  const [newItem, setNewItem] = useState('');

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    
    const updatedList = {
      ...list,
      items: [
        ...list.items,
        { id: Date.now(), name: newItem.trim(), completed: false }
      ]
    };
    
    onUpdateList(updatedList);
    setNewItem('');
  };

  const handleToggleItem = (itemId) => {
    const updatedItems = list.items.map(item => 
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );
    
    onUpdateList({ ...list, items: updatedItems });
  };

  const handleDeleteItem = (itemId) => {
    const updatedItems = list.items.filter(item => item.id !== itemId);
    onUpdateList({ ...list, items: updatedItems });
  };

  const allItemsCompleted = list.items.length > 0 && list.items.every(item => item.completed);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="bg-purple-500 p-4">
        <h2 className="text-white font-medium text-lg">{list.name}</h2>
      </div>
      
      <div className="p-4">
        <form onSubmit={handleAddItem} className="flex mb-4">
          <input
            type="text"
            placeholder="Add an item..."
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-200"
          />
          <button 
            type="submit" 
            className="bg-purple-500 text-white p-2 rounded-r-md hover:bg-purple-600 transition-colors"
          >
            <Plus size={20} />
          </button>
        </form>
        
        <div className="divide-y divide-gray-100">
          {list.items.length === 0 && (
            <p className="text-gray-500 text-center py-4">No items yet. Add some!</p>
          )}
          
          {list.items.map(item => (
            <ShoppingItem 
              key={item.id}
              item={item}
              onToggleItem={handleToggleItem}
              onDeleteItem={handleDeleteItem}
            />
          ))}
        </div>
      </div>
      
      {allItemsCompleted && list.items.length > 0 && (
        <div className="p-4 bg-gray-50 border-t border-gray-100">
          <button 
            onClick={() => onDeleteList(list.id)} 
            className="w-full flex items-center justify-center gap-2 text-red-500 p-2 border border-red-200 rounded-md hover:bg-red-50 transition-colors"
          >
            <Trash size={16} />
            <span>Delete Completed List</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ShoppingList;