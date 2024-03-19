"use client";

import { Task } from '@/app/types/tasks'
import { useEffect, useRef, useState } from 'react'
import { deleteTodo, editTodo } from '../api';

interface TodoProps {
  todo: Task
}

const Todo = ({ todo }: TodoProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskTtile, setEditedTaskTtile] = useState(todo.text);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleEdit = async () => {
    setIsEditing(true);
  }

  const handleSave = async () => {
    await editTodo(todo.id, editedTaskTtile);
    setIsEditing(false);
  }

  const handleDelete = async () => {
    await deleteTodo(todo.id)
  }

  return (
    <li
      key={todo.id}
      className="flex justify-between p-4 bg-white border-l-4 border-blue-500 rounded shadow">  
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          className="mr-2 py-1 rounded border-gray-400 border"
          value={editedTaskTtile}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedTaskTtile(e.target.value)}
        />
      ) : (
          <span>{todo.text}</span>
        )}
      <div>
        {isEditing ? (
          <button className="text-blue-500 mr-3" onClick={handleSave}>
            保存
          </button>
        ) : (
          <button className="text-green-500 mr-3" onClick={handleEdit}>
            編集
          </button>
          )}
        
        <button className="text-red-500" onClick={handleDelete}>
          削除
        </button>
      </div>
    </li>
  )
}

export default Todo