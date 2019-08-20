import React from "react";

import t from "tcomb-form-native";
import formValidation from "../utils/Validation";

//Template para los inputs
import InputTemplate from "./templates/Inputs";

//Definir el modelo de dominio para los inputs
export const LoginStruct = t.struct({
  email: formValidation.email,
  password: formValidation.password
});

//renderizar configuraciones adicionales
export const LoginOptions = {
         fields: {
           email: {
             template: InputTemplate,
             config: {
               label: "Email (*)",
               placeholder: "Escribe tu Email",
               error: "Email Invalido",
               type: "material-community",
               name: "at",
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
               name: "account-key",
             }
           }
         }
       };
