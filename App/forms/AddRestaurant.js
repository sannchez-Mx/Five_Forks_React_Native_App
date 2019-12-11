import t from "tcomb-form-native";

//Template para los inputs
import InputTemplate from "./templates/Inputs";
import TextareaTemplate from "./templates/Textarea";

//Definir el modelo de dominio para los inputs
export const AddRestaurantStruct = t.struct({
  name: t.String,
  city: t.String,
  address: t.String,
  description: t.String
});

//renderizar configuraciones adicionales
export const AddRestaurantOptions = {
  fields: {
    name: {
      template: InputTemplate,
      config: {
        label: "Nombre del restaurante *",
        placeholder: "Escribe el nombre del restaurante",
        error: "Nombre Invalido",
        type: "material-community",
        name: "silverware"
      }
    },
    city: {
      template: InputTemplate,
      config: {
        label: "Ciudad *",
        placeholder: "Escribe la ciudad de origen",
        error: "Ciudad Invalida",
        type: "material-community",
        name: "city"
      }
    },
    address: {
      template: InputTemplate,
      config: {
        label: "Dirección del restaurante *",
        placeholder: "Escribe tu Contraseña",
        error: "Contraseña Invalida",
        type: "material-community",
        name: "map-marker"
      }
    },
    description: {
      template: TextareaTemplate,
      config: {
        placeholder: "Descripción del restaurante"
      }
    }
  }
};
