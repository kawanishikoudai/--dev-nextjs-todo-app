"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [step, setStep] = useState<"email" | "otp">("email");
    const [error, setError] = useState("");

    const sendOtp = async () => {
        if (email.trim() === "") {
            setError("メールアドレスを入力してください");
            return;
        }
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/send-otp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        setError("");
        setStep("otp");
    };

    const verifyOtp = async () => {
        if (code.trim() === "") {
            setError("コードを入力してください");
            return;
        }
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-otp`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, code }),
            },
        );
        if (res.ok) {
            const data = await res.json();
            localStorage.setItem("token", data.token);
            router.push("/");
        } else {
            setError("コードが無効です");
        }
    };
    return (
        <main className="min-h-screen bg-white flex items-center justify-center">
            <div className="w-full max-w-md border border-blue-100 rounded-xl p-8 shadow-sm">
                <h1 className="text-2xl font-bold text-blue-600 mb-8">
                    ログイン
                </h1>
                {step === "email" ? (
                    <>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="メールアドレス"
                            className="w-full border border-blue-200 rounded-lg px-4 py-2 outline-none focus:border-blue-500 transition text-gray-800 placeholder:text-gray-400 mb-4"
                        />
                        <button
                            onClick={sendOtp}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
                        >
                            コードを送信
                        </button>
                    </>
                ) : (
                    <>
                        <p className="text-gray-500 text-sm mb-4">
                            {email}にコードを送信しました
                        </p>
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="6桁のコード"
                            className="w-full border border-blue-200 rounded-lg px-4 py-2 outline-none focus:border-blue-500 transition text-gray-800 placeholder:text-gray-400 mb-4"
                        />
                        <button
                            onClick={verifyOtp}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
                        >
                            ログイン
                        </button>
                    </>
                )}
                {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
            </div>
        </main>
    );
}
