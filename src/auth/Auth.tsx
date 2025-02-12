import { FormEvent, useState } from "react";
import { useAuthSession } from "./AuthSessionContext";
import { Navigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import styles from "../utils/utils.module.css"


export const Auth = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const { session } = useAuthSession();

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setLoading(true);
            const { error } = await supabase.auth.signInWithOtp({ email });
            if (error) {
                throw error;
            }
            alert('Check your email for the login link!');
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    }

    if (session) {
        return <Navigate to="/" />
    }

    return (
        <div className={styles.centeredFlex}>
            <div>
                <h1>Notez App</h1>
                <p>Login via magic link in your email inbox</p>
                {loading ? ("Sending magic link...") : (
                    <form onSubmit={handleLogin}>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                        <button>
                            Send link
                        </button>
                    </form>)}
            </div>

        </div>
    )
}