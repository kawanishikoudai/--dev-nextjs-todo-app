"use client";

import { useEffect, useState } from "react";
import { fetchTodos, addTodo, updateTodo, deleteTodo } from "./api/todoApi";
import { useRouter } from "next/navigation";

type Todo = {
    id: number;
    title: string;
    category: string | null;
    status: string;
    dueDate: string | null;
    createAt: string;
};

export default function Home() {
    const router = useRouter();

    const [todos, setTodos] = useState<Todo[]>([]);
    const [title, setTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }
        fetchTodos().then((data) => setTodos(data));
    }, []);

    const loadTodos = async () => {
        const data = await fetchTodos();
        setTodos(data);
    };

    const handleAdd = async () => {
        if (title.trim() === "") {
            setError("TODOを入力してください");
            return;
        }
        setError(null);
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
        <main className="min-h-screen bg-white p-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold text-blue-600 mb-8">
                    TODOリスト
                </h1>
                <div className="flex gap-3 mb-6">
                    <textarea
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="TODOを入力"
                        rows={10}
                        className="flex-1 border border-blue-200 rounded-lg px-4 py-2 outline-none focus:border-blue-500 transition placeholder:text-gray-400  resize-none text-gray-800"
                    ></textarea>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={() => handleAdd()}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition mb-6"
                    >
                        追加
                    </button>
                </div>
                <ul className="flex flex-col gap-3">
                    {todos.map((todo) => (
                        <li
                            key={todo.id}
                            className="flex items-center justify-between border border-blue-100 rounded-xl px-5 py-4 shadow-sm"
                        >
                            <span className="text-gray-700">{todo.title}</span>
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-blue-400">
                                    {todo.status}
                                </span>
                                <button
                                    onClick={() =>
                                        handleUpdate(
                                            todo.id,
                                            todo.title,
                                            "DONE",
                                        )
                                    }
                                    className="text-sm bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1 rounded-lg transition"
                                >
                                    完了
                                </button>
                                <button
                                    onClick={() => handleDelete(todo.id)}
                                    className="text-sm bg-red-50 hover:bg-red-100 text-red-400 px-3 py-1 rounded-lg transition"
                                >
                                    削除
                                </button>
                            </div>
                        </li>
                    ))}
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </ul>
            </div>
        </main>
    );
}
