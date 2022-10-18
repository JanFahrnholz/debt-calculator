import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
    Alert,
    Avatar,
    CircularProgress,
    CssBaseline,
    Link,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { FC, FormEvent, ReactElement, useContext, useState } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../context/UserContext";

type Card = {
    icon: ReactElement;
    onClick: Function;
};

const LoginPage: FC = () => {
    const [error, setError] = useState<string>();
    const [status, setStatus] = useState<any>("Sign in");
    const router = useRouter();
    const { login } = useContext(UserContext);

    const handleSubmit = async (e: any) => {
        setStatus(
            <CircularProgress sx={{ color: "secondary.main" }} size={14} />
        );
        e.preventDefault();

        const email = e.target["email"].value;
        const pw = e.target["pw"].value;

        const res = await login(email, pw);
        setError(res);
        setStatus("Login");

        if (!res) router.push("/");
    };

    return (
        <Box>
            <CssBaseline />
            <div className="flex min-h-full flex-col justify-center py-10 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <Avatar sx={{ mx: "auto", bgcolor: "primary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-primary">
                        Login to your account
                    </h2>
                </div>
                <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-dark-900 px-4 sm:rounded-lg sm:px-10">
                        <form
                            className="space-y-4"
                            method="POST"
                            onSubmit={(e) => handleSubmit(e)}
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-primary"
                                >
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="pw"
                                    className="block text-sm font-medium text-primary"
                                >
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="pw"
                                        name="pw"
                                        type="password"
                                        autoComplete="password"
                                        required
                                        className="block w-full appearance-none rounded-md px-3 py-2 placeholder-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                                    />
                                </div>
                            </div>

                            {error && (
                                <Alert
                                    className="mb-1"
                                    severity="error"
                                    variant="filled"
                                >
                                    {error}
                                </Alert>
                            )}

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md border hover:cursor-pointer border-transparent bg-primary py-3 px-4 font-medium text-dark-900 shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2"
                                >
                                    {status}
                                </button>
                            </div>
                        </form>

                        <Link href={"/register"}>
                            <Typography
                                sx={{
                                    color: "text.secondary",
                                    mt: 1.5,
                                    textDecoration: "underline",
                                }}
                            >
                                New here? Create an account
                            </Typography>
                        </Link>
                        {/* <LoginProvider /> */}
                    </div>
                </div>
            </div>
        </Box>
    );
};

export default LoginPage;
