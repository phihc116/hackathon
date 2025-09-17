import React, { useState } from 'react';

const RegisterView: React.FC = () => {
    const [form, setForm] = useState({ username: '', email: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); 
        alert(`Registered: ${form.username}`);
    };

    return (
        <div style={{ maxWidth: 400, margin: '2rem auto' }}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Username:
                        <input
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Email:
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterView;