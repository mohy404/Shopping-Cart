import React, { useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MenuItem from "./MenuItem";
import { decrementQuantity, getProducts, incrementQuantity } from "./ProductReducer";
import { decrementQty, incrementQty } from "./CartReducer";

const images = [
  {
    id: "0",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqg_OBzcVDnKHv1d3hyVk_WlCo43pzit4CJQ&usqp=CAU",
    name: "Ice Cream",
    quantity: 0,
  },
  {
    id: "1",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT85O96gPiso_j2gaS0cePTBY4mCR3pumV6tw&usqp=CAU",
    name: "Biscuit",
    quantity: 0,
  },
  {
    id: "2",
    image:  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSicQWeRoxxLEr1RLIp8dJtw-NQvSE4xtlhwA&usqp=CAU",
    name: "Chocolate",
    quantity: 0,
  },
];

const HomeScreen = () => {
  const products = useSelector((state) => state.product.product);
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (products.length === 0) {
      images.forEach((image) => dispatch(getProducts(image)));
    }
  }, [dispatch, products]);

  const handleDecrement = (item) => {
    dispatch(decrementQty(item));
    dispatch(decrementQuantity(item));
  };

  const handleIncrement = (item) => {
    dispatch(incrementQty(item));
    dispatch(incrementQuantity(item));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Products Page</Text>
      {products.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}

      <Text style={styles.title}>Cart Page</Text>
      {cart.map((item) => (
        <Pressable key={item.id} style={styles.cartItem}>
          <View style={styles.cartItemContent}>
            <Text style={styles.cartItemText}>{item.name}</Text>
            <Image source={{ uri: item.image }} style={styles.cartItemImage} />
          </View>

          <View style={styles.quantityContainer}>
            <Pressable style={styles.quantityButton} onPress={() => handleDecrement(item)}>
              <Text style={styles.quantityButtonText}>-</Text>
            </Pressable>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <Pressable style={styles.quantityButton} onPress={() => handleIncrement(item)}>
              <Text style={styles.quantityButtonText}>+</Text>
            </Pressable>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 60,
    color: "red",
  },
  cartItem: {
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  cartItemContent: {
    flex: 1,
  },
  cartItemText: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF3366",
    borderRadius: 5,
    width: 120,
  },
  quantityButton: {
    paddingHorizontal: 10,
  },
  quantityButtonText: {
    fontSize: 20,
    color: "white",
  },
  quantity: {
    fontSize: 20,
    color: "white",
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
