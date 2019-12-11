import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  FlatList
} from "react-native";
import {
  Image,
  Icon,
  ListItem,
  Button,
  Text,
  Rating,
  Avatar
} from "react-native-elements";
import Toast from "react-native-easy-toast";

import {
  firebaseAuthState,
  checkUserReview,
  firebaseLoadReviews
} from "../../utils/FireBase";

export default function RestaurantView(props) {
  useEffect(() => {
    firebaseLoadReviews(
      id,
      limitReview,
      setStartReviews,
      setReviews,
      setRating
    );
  }, [id, limitReview, setStartReviews, setReviews]);

  const [isLogin, setIsLogin] = useState(false),
    [reviews, setReviews] = useState(null),
    [startReviews, setStartReviews] = useState(null),
    [limitReview, setLimitReview] = useState(5),
    [loading, setLoading] = useState(false),
    [rating, setRating] = useState(0);

  const toast = useRef("");

  const {
    id,
    name,
    city,
    address,
    description,
    image
  } = props.navigation.state.params.restaurant.item.restaurant;
  
  const { navigate } = props.navigation;

  const listExtraInfo = [
    {
      text: `${city}, ${address}`,
      iconName: "map-marker",
      iconType: "material-community",
      action: null
    }
  ];

  const goToScreenAddReview = () => {
    checkUserReview(id).then(res => {
      res
        ? toast.current.show("Ya has comentado este restaurante", 2000)
        : navigate("AddReview", {
            id,
            name,
            limitReview,
            setStartReviews,
            setReviews,
            setRating
          });
    });
  };

  const loadButtonAddReview = () => {
    firebaseAuthState(setIsLogin);

    if (!isLogin) {
      return (
        <Text>
          Inicia sesión para escribir un comentario.{" "}
          <Text onPress={() => navigate("Login")} style={styles.textLinkLogin}>
            Iniciar Sesión
          </Text>
        </Text>
      );
    } else {
      return (
        <Button
          title="Añadir comentario"
          onPress={() => goToScreenAddReview()}
          buttonStyle={styles.btnAddReview}
        />
      );
    }
  };

  const renderRow = reviews => {
    const {
        title,
        review,
        rating,
        id_user,
        createAt,
        image_user
      } = reviews.item.review,
      createReview = new Date(createAt.seconds * 1000);

    return (
      <View style={styles.viewReview}>
        <View style={styles.viewReviewImage}>
          <Avatar
            source={{
              uri: image_user
                ? image_user
                : "https://api.adorable.io/avatars/285/abott2@adorable.io.png"
            }}
            size="large"
            rounded
            containerStyle={styles.imageAvatarUser}
          />
        </View>
        <View style={styles.viewInfoUser}>
          <Text style={styles.reviewTitle}>{title}</Text>
          <Text style={styles.reviewText}>{review}</Text>
          <Rating imageSize={15} startingValue={rating} readonly={true} />
          <Text style={styles.reviewDate}>
            {createReview.getDate()} / {createReview.getMonth() + 1} / {""}
            {createReview.getFullYear()} - {createReview.getHours()} : {""}
            {createReview.getMinutes()}
          </Text>
        </View>
      </View>
    );
  };

  const renderFlatList = reviews => {
    if (reviews) {
      return (
        <FlatList
          data={reviews}
          renderItem={renderRow}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.5}
        />
      );
    } else {
      return (
        <View style={styles.loadReviews}>
          <ActivityIndicator size="large" />
          <Text>Cargando Comentarios...</Text>
        </View>
      );
    }
  };

  return (
    <ScrollView style={styles.viewBody}>
      <View style={styles.viewImage}>
        <Image
          source={{ uri: image }}
          PlaceholderContent={<ActivityIndicator />}
          style={styles.imageLoader}
        />
      </View>
      <View style={styles.viewInfo}>
        <View style={styles.viewRating}>
          <Text style={styles.nameInfo}>{name}</Text>
          <Rating
            imageSize={20}
            readonly
            startingValue={rating}
            style={{ position: "absolute", right: 0 }}
          />
        </View>
        <Text style={styles.descriptionInfo}>{description}</Text>
      </View>
      <View style={styles.extraInfo}>
        <Text style={styles.extraInfoTitle}>
          Información sobre el restaurante
        </Text>
        {listExtraInfo.map((item, index) => (
          <ListItem
            key={index}
            title={item.text}
            leftIcon={<Icon name={item.iconName} type={item.iconType} />}
          />
        ))}
      </View>
      <View style={styles.viewBtnAddReview}>{loadButtonAddReview()}</View>

      <View style={{ textAlign: "center" }}>
        <Text style={styles.commentTitle}>Comentarios</Text>
      </View>

      {renderFlatList(reviews)}

      <Toast
        ref={toast}
        position="bottom"
        positionValue={320}
        fadeInDuration={1000}
        fadeOutDuration={1000}
        opacity={0.8}
        textStyle={{ color: "white" }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  viewImage: {
    width: "100%"
  },
  imageLoader: {
    width: "100%",
    height: 200,
    resizeMode: "cover"
  },
  viewInfo: {
    margin: 15
  },
  nameInfo: {
    fontSize: 20,
    fontWeight: "bold"
  },
  descriptionInfo: {
    marginTop: 5,
    color: "gray"
  },
  extraInfo: {
    margin: 15,
    marginTop: 25
  },
  extraInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },
  viewBtnAddReview: {
    margin: 20
  },
  btnAddReview: {
    backgroundColor: "#00a680"
  },
  textLinkLogin: {
    color: "#00a680",
    fontWeight: "bold"
  },
  loadReviews: {
    marginTop: 20,
    alignItems: "center"
  },
  viewReview: {
    flexDirection: "row",
    margin: 10,
    paddingBottom: 20,
    borderBottomColor: "#e3e3e3",
    borderBottomWidth: 1
  },
  viewReviewImage: {
    marginRight: 15
  },
  imageAvatarUser: {
    width: 50,
    height: 50
  },
  viewInfoUser: {
    flex: 1,
    alignItems: "flex-start"
  },
  reviewTitle: {
    fontWeight: "bold"
  },
  reviewText: {
    paddingTop: 2,
    color: "gray",
    marginBottom: 5
  },
  reviewDate: {
    marginTop: 5,
    color: "gray",
    fontSize: 12
  },
  commentTitle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 15,
    fontWeight: "bold"
  },
  viewRating: {
    flexDirection: "row"
  }
});
