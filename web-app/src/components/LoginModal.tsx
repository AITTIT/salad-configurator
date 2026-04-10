import React, { useState } from "react";
import Modal from "./Modal";

export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin?: (creds: { email: string; password: string }) => void;
}

export default function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin?.({ email, password });
    setEmail("");
    setPassword("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <h2 className="text-lg font-medium mb-4">Kirjaudu sisään</h2>

        <label className="block mb-3">
          <span className="text-sm block mb-1">Sähköposti</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md placeholder-gray-500"
            placeholder="you@example.com"
            aria-label="Sähköposti"
          />
        </label>

        <label className="block mb-4">
          <span className="text-sm block mb-1">Salasana</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md placeholder-gray-500"
            placeholder="••••••••"
            aria-label="Salasana"
          />
        </label>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            disabled={!email || !password}
          >
            Kirjaudu
          </button>
        </div>
           </form>
    </Modal>
  );
}