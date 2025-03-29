import React, { useContext, useState } from "react";
import { View, FlatList, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CartImage from "../assets/cart.png";
import Context from "../context/context";
import products from "../product/productList";

const Home = () => {
    const navigation = useNavigation();
    const {cart, setCart} = useContext(Context)

    const addToCart = (input) => setCart([...cart, input])
    const removeFromCart = (id) => {
        setCart(cart.filter((item) => item.id !== id))
    };

    return (
        <View style={{ flex: 1,margin:10,marginBottom:40}}>
            <View style={styles.header}>
                <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>POS</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Cart", { cart })} style={styles.cart}>
                    <Image source={CartImage} style={styles.icon} />
                    <Text style={{ color: "#ff6600", fontWeight: "bold",fontSize:30 }}> {cart.length} </Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={products}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    const inCart = cart.some((cartItem) => cartItem.id === item.id);
                    return (
                    <View style={styles.card}>
                        <Image source={item.path} style={styles.image} />
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold" }}> Name: {item.name}</Text>
                            <Text style={{ fontSize: 16, fontWeight: "bold" }}> Weight: {item.weight}</Text>
                            <Text style={{ fontSize: 16, fontWeight: "bold" }}> Price: {item.price}</Text>
                              {inCart?
                               <TouchableOpacity onPress={() => removeFromCart(item.id)} style={[styles.button,{backgroundColor:"red"}]}>
                                <Text >Remove</Text>
                            </TouchableOpacity>:<TouchableOpacity onPress={() => addToCart(item)} style={styles.button}>
                                <Text >Add to Cart</Text>
                            </TouchableOpacity>}
                        </View>
                    </View>
                )}}
            />
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "orange", padding: 10 ,borderRadius:10,marginTop:"10%"},
    cart: { flexDirection: "row", alignItems: "center", backgroundColor: "white", padding: 10, borderRadius: 10, },
    icon: { width: 30, height: 30 },
    card: { flexDirection: "row", padding: 10, alignItems: "center", backgroundColor: "white",borderRadius:8,margin:10 },
    image: { width: 200, height: 200, marginRight: 10 },
    button: { backgroundColor: "green", padding: 5, borderRadius: 5, marginTop: 5, alignItems: "center",height:45,justifyContent:"center" },
});
