import t from "tcomb-form-native";

//Template para los inputs
import InputTemplate from "./templates/Inputs";
import TextareaTemplate from "./templates/Textarea";

//Definir el modelo de dominio para los inputs
export const AddReviewRestaurantStruct = t.struct({
  title: t.String,
  review: t.String
});

//renderizar configuraciones adicionales
export const AddReviewRestaurantOptions = {
  fields: {
    title: {
      template: InputTemplate,
      config: {
        placeholder: "Titulo de la opinión",
        type: "material-community",
        name: "silverware"
      }
    },
    review: {
      template: TextareaTemplate,
      config: {
        placeholder: "Opinión"
      }
    }
  }
};