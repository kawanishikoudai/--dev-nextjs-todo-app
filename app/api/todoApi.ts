const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const getToken = () => {
    return localStorage.getItem("token");
};

export const fetchTodos = async () => {
    const token = getToken();
    const res = await fetch(`${BASE_URL}/api/todos`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
};

export const addTodo = async (title: string) => {
    return await fetch(`${BASE_URL}/api/todos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ title, status: "PENDING" }),
    });
};

export const updateTodo = async (id: number, title: string, status: string) => {
    return await fetch(`${BASE_URL}/api/todos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ title, status }),
    });
};

export const deleteTodo = async (id: number) => {
    return await fetch(`${BASE_URL}/api/todos/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
    });
};
