import { Button, Row } from 'antd';
import CForm from '../components/form/CForm';
import CInput from '../components/form/CInput';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useChangePasswordMutation } from '../redux/features/admin/userManagement.api';
import { TResponse } from '../types';
import { useAppDispatch } from '../redux/hooks';
import { logout } from '../redux/features/auth/authSlice';
import { Navigate, useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);

    const res = (await changePassword(data)) as TResponse<any>;
    console.log(res?.data?.success);
    if (res?.data?.success) {
      dispatch(logout());
      navigate('/login');
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <CForm onSubmit={onSubmit}>
        <CInput type="text" name="oldPassword" label="Old Password" />
        <CInput type="text" name="newPassword" label="New Password" />
        <Button htmlType="submit">Login</Button>
      </CForm>
    </Row>
  );
};

export default ChangePassword;
