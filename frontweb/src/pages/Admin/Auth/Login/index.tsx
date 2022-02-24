import ButtonIcon from 'components/ButtonIcon';
import { Link } from 'react-router-dom';

import './styles.css';

const Login = () => {
  return (
    <div className="base-card login-card">
      <h1>LOGIN</h1>
      <form>
        <div className="mb-4">
          <input
            type="text"
            className="form-control base-input"
            name="email"
            placeholder="Email"
          />
        </div>
        <div className="mb-2">
          <input
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
