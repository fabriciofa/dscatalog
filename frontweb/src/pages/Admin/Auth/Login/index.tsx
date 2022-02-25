import ButtonIcon from 'components/ButtonIcon';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import './styles.css';
import { backendRequestLogin } from 'util/requests';
import { useState } from 'react';

type FormData = {
  username: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const [hasError, setHasError] = useState(false);

  const onSubmit = (formData: FormData) => {
    backendRequestLogin(formData)
      .then((response) => {
        setHasError(false);
        console.log('SUCESSO', response);
      })
      .catch((errors) => {
        setHasError(true);
        console.log('ERRO', errors);
      });
  };

  return (
    <div className="base-card login-card">
      <h1>LOGIN</h1>
      {hasError && (
        <div className="alert alert-danger" role="alert">
          Erro ao efetuar login
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <input
            {...register('username')}
            type="text"
            className="form-control base-input"
            name="username"
            placeholder="Email"
          />
        </div>
        <div className="mb-2">
          <input
            {...register('password')}
            type="password"
            className="form-control base-input"
            name="password"
            placeholder="Senha"
          />
        </div>
        <Link to="/admin/auth/recover" className="login-link-recover">
          Esqueceu sua senha?
        </Link>
        <div className="login-submit">
          <ButtonIcon text="Fazer Login" />
        </div>
        <div className="signup-container">
          <span className="not-registered">Não tem cadastro?</span>
          <Link to="/admin/auth/register" className="login-link-register">
            Cadatre-se
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
