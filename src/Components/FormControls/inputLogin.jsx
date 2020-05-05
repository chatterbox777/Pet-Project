import React from "react";
import classTags from "./input.module.css";

export const InputLogin = ({ input, meta, ...props }) => {
  debugger;
  return (
    <div>
      <div
        className={
          (meta.touched || meta.dirty) && meta.error ? classTags.error : null
        }
      >
        <input {...input} placeholder={"Введите логин"} {...props} />
      </div>
      {(meta.touched || meta.dirty) && meta.error ? (
        <span className={classTags.error_span}>{meta.error}</span>
      ) : null}
    </div>
  );
};
