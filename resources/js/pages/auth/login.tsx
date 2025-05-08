import {useForm} from "@inertiajs/react";
import {FormEvent} from "react";

type LoginProps = {
    username: string,
    password: string,
    remember: boolean
}

export default function Login() {
    const {data, setData, post} = useForm<LoginProps>({
        username: '',
        password: '',
        remember: true
    })

    const handleLogin = (e: FormEvent) => {
        e.preventDefault()
        post(route('login.post'))
    }

    return (
        <form onSubmit={handleLogin} className="p-6">
            <input type="text" placeholder="نام کاربری" value={data.username} onChange={(e) => setData("username", e.target.value)}/>
            <input type="text" placeholder="رمزعبور" value={data.password} onChange={(e) => setData("password", e.target.value)}/>

            <button type="submit">
                ورود
            </button>
        </form>
    )
}
