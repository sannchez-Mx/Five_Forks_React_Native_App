import React, { useRef, useState } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { Button, Overlay, Text } from "react-native-elements";
import Toast from "react-native-easy-toast";

import t from "tcomb-form-native";
import {
  AddReviewRestaurantStruct,
  AddReviewRestaurantOptions
} from "../../forms/AddReviewRestaurant";
const Form = t.form.Form;

import { firebaseReviewUserStatus } from "../../utils/FireBase";

export default function AddReviewRestaurant(props) {
  const [loading, setLoading] = useState(false);

  const rating = useRef("");
  const reviewRef = useRef("");
  const toast = useRef("");

  const sendReview = () => {
    const ratingValue = rating.current.state.position;
    setLoading(true);
    if (ratingValue == 0) {
      toast.current.show("Tienes que puntuar el restaurante", 1500);
      setLoading(false);
    } else {
      const validate = reviewRef.current.getValue();
      if (!validate) {
        toast.current.show("Completa el formulario", 1500);
        setLoading(false);
      } else {
        const {
          id,
          limitReview,
          setReviews,
          setStartReviews,
          setRating
        } = props.navigation.state.params;
        const { goBack } = props.navigation;
        firebaseReviewUserStatus(
          id,
          validate,
          ratingValue,
          setLoading,
          toast,
          goBack,
          limitReview,
          setReviews,
          setStartReviews,
          setRating
        );
      }
    }
  };

  return (
    <View style={styles.viewBody}>
      <View style={styles.viewRating}>
        <AirbnbRating
          ref={rating}
          count={5}
          reviews={["Pésimo", "Deficiente", "Bueno", "Muy bueno", "Excelente"]}
          defaultRating={0}
          size={35}
        />
      </View>
      <View style={styles.formReview}>
        <Form
          ref={reviewRef}
          type={AddReviewRestaurantStruct}
          options={AddReviewRestaurantOptions}
        />
      </View>
      <View style={styles.viewSendReview}>
        <Button
          title="Enviar"
          onPress={() => sendReview()}
          buttonStyle={styles.sendBtnReview}
        />
      </View>
      <Overlay
        overlayStyle={styles.overlayLoading}
        isVisible={loading}
        width="auto"
        height="auto"
      >
        <View>
          <Text style={styles.overlayLoadingText}>Enviando Review</Text>
          <ActivityIndicator size="large" color="#00a680" />
        </View>
      </Overlay>
      <Toast
        ref={toast}
        position="bottom"
        positionValue={320}
        fadeInDuration={1000}
        fadeOutDuration={1000}
        opacity={0.8}
        textStyle={{ color: "white" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  viewRating: {
    height: 110,
    backgroundColor: "#f2f2f2"
  },
  formReview: {
    margin: 10,
    marginTop: 40
  },
  viewSendReview: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 30,
    marginLeft: 20,
    marginRight: 20
  },
  sendBtnReview: {
    backgroundColor: "#00a680"
  },
  overlayLoading: {
    padding: 25
  },
  overlayLoadingText: {
    color: "#00a680",
    marginBottom: 20,
    fontSize: 20
  }
});
