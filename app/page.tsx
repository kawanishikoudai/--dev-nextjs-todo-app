"use client";

import { useEffect, useState } from "react";
import { fetchTodos, addTodo, updateTodo, deleteTodo } from "./api/todoApi";

type Todo = {
    id: number;
    title: string;
    category: string | null;
    status: string;
    dueDate: string | null;
    createAt: string;
};

export default function Home() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        fetchTodos().then((data) => setTodos(data));
    }, []);

    const loadTodos = async () => {
        const data = await fetchTodos();
        setTodos(data);
    };

    const handleAdd = async () => {
        await addTodo(title);
        setTitle("");
        await loadTodos();
    };

    const handleDelete = async (id: number) => {
        await deleteTodo(id);
        await loadTodos();
    };

    const handleUpdate = async (id: number, title: string, status: string) => {
        await updateTodo(id, title, status);
        await loadTodos();
    };

    return (
        <main>
            <h1>TODOリスト</h1>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="TODOを入力"
            ></input>
            <button onClick={() => handleAdd()}>追加</button>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.title} - {todo.status}
                        <button onClick={() => handleDelete(todo.id)}>
                            削除
                        </button>
                        <button
                            onClick={() =>
                                handleUpdate(todo.id, todo.title, "DONE")
                            }
                        >
                            完了
                        </button>
                    </li>
                ))}
            </ul>
        </main>
    );
}
