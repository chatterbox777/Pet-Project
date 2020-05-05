import React from "react";
import classTags from "./LoginForm.module.css";
import { reduxForm, Field } from "redux-form";
import { requiredField, maxLengthCreator } from "../../Validation/validator";
import { InputLogin } from "../FormControls/inputLogin";
import { InputPass } from "../FormControls/inputPassword";

const maxLength30 = maxLengthCreator(30);

const LoginForm = (props) => {
  const { handleSubmit } = props;

  return (
    <div className={classTags.align}>
      <form onSubmit={handleSubmit} className={classTags.block} action="">
        <div>
          <Field
            name={"login"}
            component={InputLogin}
            placeholder={"Введите логин"}
            validate={[requiredField, maxLength30]}
          />
        </div>
        <div>
          <Field
            name={"password"}
            component={InputPass}
            placeholder={"Введите пароль"}
            type="password"
            validate={[requiredField, maxLength30]}
          />
        </div>
        <div>
          <Field
            name={"rememberMeCheckBox"}
            type="checkbox"
            component={"input"}
          />{" "}
          remember me
        </div>
        <div>
          <button>sign in</button>
        </div>
      </form>
    </div>
  );
};

const LoginReduxForm = reduxForm({
  // a unique name for the form
  form: "login",
})(LoginForm);

export default LoginReduxForm;
