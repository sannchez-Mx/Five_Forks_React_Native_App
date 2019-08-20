import t from "tcomb-form-native";

export default (formValidation = {
  email: t.refinement(t.String, value => /@/.test(value)),
  password: t.refinement(t.String, value => value.length >= 6)
});
