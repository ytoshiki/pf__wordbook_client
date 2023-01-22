import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { signin } from "../redux";
import { SignInType } from "../types/user";
import { useHistory } from "react-router-dom";
import SignupImage from "../assets/images/signup.png";
import "../styles/pages/Signin.scss";
import { State } from "../types/state";

interface SignInProps {
  signin: (credential: SignInType) => void;
  error: null | string;
  user: string;
}

const Signin: React.FC<SignInProps> = ({ signin, error, user }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState({
    email: "",
    password: "",
  });

  const [serverError, setServerError] = useState("");

  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.push("/");
    }

    const isLoggedIn = sessionStorage.getItem("jwt");
    if (isLoggedIn) {
      history.push("/");
    }
    setServerError(error ? "Either email or password is incorrect" : "");
  }, [error, signin, history, user]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setFormError({
        ...formError,
        email: !form.email ? "Email must be provided" : "",
        password: !form.password ? "Password must be provided" : "",
      });

      return;
    }

    signin(form);
  };

  return (
    <div className="signin">
      <div className="signin__sidebar">
        <img src={SignupImage} alt="" />
      </div>
      <div className="signin__content">
        <div className="signin__content-inner">
          <h1 className="signin__heading">ログイン</h1>
          <p className="signin__paragraph"></p>
          <form className="signin__form" action="" onSubmit={onSubmit}>
            <div className="signin__input-block">
              <label className="signin__label" htmlFor="">
                メールアドレス
              </label>
              <input
                className="signin__input"
                type="email"
                value={form.email}
                name="email"
                onChange={onChange}
              />
              {formError.email && (
                <div className="form-error">{formError.email}</div>
              )}
            </div>
            <div className="signin__input-block">
              <label className="signin__label" htmlFor="">
                パスワード
              </label>
              <input
                className="signin__input"
                type="password"
                value={form.password}
                name="password"
                onChange={onChange}
              />
              {formError.password && (
                <div className="form-error">{formError.password}</div>
              )}
            </div>
            {serverError && <div className="form-error">{serverError}</div>}
            <button className="signin__button">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (store: State) => {
  return {
    error: store.user.error,
    user: store.user.user.token,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  signin: (credintials: SignInType) => dispatch(signin(credintials)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
