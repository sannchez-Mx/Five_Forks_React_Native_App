import firebase from "firebase";
import "firebase/firestore";

export const UploadImage = async (uri, nameImage, folder) => {
  const response = await fetch(uri);
  const blob = await response.blob();

  let ref = firebase
    .storage()
    .ref()
    .child(`${folder}/${nameImage}`);

  await ref.put(blob);

  return firebase
    .storage()
    .ref(`${folder}/${nameImage}`)
    .getDownloadURL()
    .then(res => res)
    .catch(err => console.log(err));
};
