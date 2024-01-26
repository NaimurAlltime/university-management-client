import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CRForm from "../components/form/CRForm";
import CRInput from "../components/form/CRInput";

function Login() {
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const dispatch = useAppDispatch();

  const defaultValues = {
    username: "shovo123",
    password: "Shovo123@",
  };

  const handleLogin = async (data: FieldValues) => {
    const toastId = toast.loading("Log in loading");
    try {
      const userInfo = {
        username: data.username,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();

      const user: TUser = verifyToken(res.data.token);

      dispatch(setUser({ user: user, token: res.data.token }));
      toast.success("Login Successfully done!", {
        id: toastId,
        duration: 2000,
      });
      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      toast.error("something went wrong!", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <CRForm onSubmit={handleLogin} defaultValues={defaultValues}>
        <CRInput type="text" name="username" label="Username:" />
        <CRInput type="text" name="password" label="Password:" />
        <Button htmlType="submit">Login</Button>
      </CRForm>
    </Row>
  );
}

export default Login;
