import React, { useState, useEffect } from 'react';
import ShoppingList from './ShoppingList';
import { Plus } from 'lucide-react';

const ListManager = () => {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState('');
  
  // Load lists from localStorage on component mount
  useEffect(() => {
    const savedLists = localStorage.getItem('shoppingLists');
    if (savedLists) {
      setLists(JSON.parse(savedLists));
    }
  }, []);
  
  // Save lists to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('shoppingLists', JSON.stringify(lists));
  }, [lists]);

  const handleCreateList = (e) => {
    e.preventDefault();
    if (!newListName.trim()) return;
    
    const newList = {
      id: Date.now(),
      name: newListName.trim(),
      items: []
    };
    
    setLists([...lists, newList]);
    setNewListName('');
  };

  const handleUpdateList = (updatedList) => {
    setLists(lists.map(list => 
      list.id === updatedList.id ? updatedList : list
    ));
  };

  const handleDeleteList = (listId) => {
    setLists(lists.filter(list => list.id !== listId));
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-6">Shopping Lists</h1>
        
        <form onSubmit={handleCreateList} className="flex mb-6">
          <input
            type="text"
            placeholder="New shopping list name..."
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-200"
          />
          <button 
            type="submit" 
            className="bg-purple-500 text-white px-4 rounded-r-md hover:bg-purple-600 transition-colors flex items-center"
          >
            <Plus size={20} className="mr-1" /> 
            <span>Create</span>
          </button>
        </form>
      </div>
      
      {lists.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg shadow-md">
          <h3 className="text-xl mb-2 text-gray-700">No shopping lists yet</h3>
          <p className="text-gray-500">Create your first shopping list above!</p>
        </div>
      ) : (
        lists.map(list => (
          <ShoppingList
            key={list.id}
            list={list}
            onUpdateList={handleUpdateList}
            onDeleteList={handleDeleteList}
          />
        ))
      )}
    </div>
  );
};

export default ListManager;