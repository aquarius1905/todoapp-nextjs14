import { Task } from "@/app/types/tasks";

const baseUrl = "http://localhost:3001"

export const getAllTodos = async (): Promise<Task[]> => {
  const res = await fetch(`${baseUrl}/tasks`, {
    cache: "no-store"
  });

  return res.json();
};

export const addTodo = async (todo: Task): Promise<Task> => {
  const res = await fetch(`${baseUrl}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(todo),
  });

  return res.json();
};

export const editTodo = async (id: string, newText: string): Promise<Task> => {
  const res = await fetch(`${baseUrl}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text: newText }),
  });

  return res.json();
};

export const deleteTodo = async (id: string): Promise<Task> => {
  const res = await fetch(`${baseUrl}/tasks/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
  });
  
  return res.json();
};