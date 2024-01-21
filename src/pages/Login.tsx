import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { TAuthLoginInfo } from "../types/auth.type";

function Login() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: "shovo123",
      password: "Shovo123@",
    },
  });
  const [login, { data, error }] = useLoginMutation();

  console.log("data =>", data);
  console.log("error =>", error);

  const handleLogin = (data: TAuthLoginInfo) => {
    const userInfo = {
      username: data.username,
      password: data.password,
    };

    login(userInfo);
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
