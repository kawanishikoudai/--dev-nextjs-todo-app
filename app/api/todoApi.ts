const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchTodos = async () => {
    const res = await fetch(`${BASE_URL}/api/todos`);
    return res.json();
};

export const addTodo = async (title: string) => {
    return await fetch(`${BASE_URL}/api/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, status: "PENDING" }),
    });
};

export const updateTodo = async (id: number, title: string, status: string) => {
    return await fetch(`${BASE_URL}/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, status }),
    });
};

export const deleteTodo = async (id: number) => {
    return await fetch(`${BASE_URL}/api/todos/${id}`, {
        method: "DELETE",
    });
};
