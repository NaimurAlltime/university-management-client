import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { TAuthLoginInfo } from "../types/auth.type";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";

function Login() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: "shovo123",
      password: "Shovo123@",
    },
  });
  const [login] = useLoginMutation();

  const dispatch = useAppDispatch();

  const handleLogin = async (data: TAuthLoginInfo) => {
    const userInfo = {
      username: data.username,
      password: data.password,
    };

    const res = await login(userInfo).unwrap();

    const user = verifyToken(res.data.token);

    dispatch(setUser({ user: user, token: res.data.token }));
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <div>
        <label htmlFor="username">Username: </label>
        <input type="text" id="username" {...register("username")} />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input type="text" id="password" {...register("password")} />
      </div>
      <Button htmlType="submit">Login</Button>
    </form>
  );
}

export default Login;
