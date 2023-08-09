import React from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQty as decrementCartQty,
  incrementQty as incrementCartQty,
} from "./CartReducer";
import {
  decrementQuantity as decrementProductQty,
  incrementQuantity as incrementProductQty,
} from "./ProductReducer";

const MenuItem = ({ item }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isItemInCart = cart.some((value) => value.id === item.id);

  const handleDecrement = () => {
    dispatch(decrementCartQty(item));
    dispatch(decrementProductQty(item));
  };

  const handleIncrement = () => {
    dispatch(incrementCartQty(item));
    dispatch(incrementProductQty(item));
  };

  const handleAddToCart = () => {
    dispatch(addToCart(item));
    dispatch(incrementProductQty(item));
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.itemContainer}>
        <View>
          <Text style={styles.itemName}>{item.name}</Text>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
        </View>

        {isItemInCart ? (
          <View style={styles.quantityContainer}>
            <Pressable style={styles.quantityButton} onPress={handleDecrement}>
              <Text style={styles.quantityButtonText}>-</Text>
            </Pressable>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <Pressable style={styles.quantityButton} onPress={handleIncrement}>
              <Text style={styles.quantityButtonText}>+</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable style={styles.addToCartButton} onPress={handleAddToCart}>
            <Text style={styles.addToCartButtonText}>ADD TO CART</Text>
          </Pressable>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  itemContainer: {
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
  },
  itemImage: {
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
  addToCartButton: {
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 10,
    padding: 5,
  },
  addToCartButtonText: {
    color: "gray",
  },
});

export default MenuItem;
