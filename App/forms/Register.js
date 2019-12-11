import React from "react";

import t from "tcomb-form-native";
import formValidation from "../utils/Validation";

//Template para los inputs
import InputTemplate from "./templates/Inputs";

//Definir el modelo de dominio para los inputs
export const RegisterStruct = t.struct({
  name: t.String, // <-- Un string requerido
  email: formValidation.email,
  password: formValidation.password,
  passwordConfirmation: formValidation.password
});

//renderizar configuraciones adicionales
export const RegisterOptions = {
  fields: {
    name: {
      /***** Configaración sin uso de template ****/
      //label: "Nombre (*)", // <-- Etiqueta para el nombre de campo
      //placeholder: "Escribe tu Nombre",
      //error: "Nombre Invalido",
      /***********************/
      template: InputTemplate,
      config: {
        label: "Nombre (*)",
        placeholder: "Escribe tu Nombre",
        error: "Nombre Invalido",
        type: "material-community",
        name: "account-circle"
      }
    },
    email: {
      template: InputTemplate,
      config: {
        label: "Email (*)",
        placeholder: "Escribe tu Email",
        error: "Email Invalido",
        type: "material-community",
        name: "at"
      }
    },
    password: {
      template: InputTemplate,
      config: {
        label: "Contraseña (*)",
        placeholder: "Escribe tu Contraseña",
        error: "Contraseña Invalida",
        password: true,
        secureTextEntry: true,
        type: "material-community",
        name: "account-key"
      }
    },
    passwordConfirmation: {
      template: InputTemplate,
      config: {
        label: "Repetir Contraseña",
        placeholder: "Repite tu Contraseña",
        error: "Contraseña Invalida",
        password: true,
        secureTextEntry: true,
        type: "material-community",
        name: "lock-reset"
      }
    }
  }
};
