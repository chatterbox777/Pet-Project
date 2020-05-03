import React from "react";
import classTags from "./LoginForm.module.css";
import { reduxForm, Field } from "redux-form";
import { requiredField, maxLengthCreator } from "../../Validation/validator";
import { Input } from "../FormControls/input";

const maxLength5 = maxLengthCreator(5);

const LoginForm = (props) => {
  const { handleSubmit } = props;

  return (
    <div className={classTags.align}>
      <form onSubmit={handleSubmit} className={classTags.block} action="">
        <div>
          <Field
            name={"login"}
            component={Input}
            placeholder={"Введите логин"}
            validate={[requiredField, maxLength5]}
          />
        </div>
        <div>
          <Field
            name={"password"}
            component={"input"}
            placeholder={"Введите пароль"}
            type="password"
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
