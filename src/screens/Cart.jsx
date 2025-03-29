import React, { useContext, useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Context from "../context/context";

const Cart = () => {
    const navigation = useNavigation();
    const { cart, setCart } = useContext(Context)

    const removeItem = (id) => {
        setCart(cart.filter((item) => item.id !== id));
    };

    const total = cart.reduce((acc, item) => acc + item.price, 0)

 

    return (
        <View style={{ marginTop: 50 }}>
            <FlatList
                data={cart}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={item.path} style={styles.image} />
                        <View >
                            <Text style={styles.text}>Name: {item.name}</Text>
                            <Text style={styles.text}>Weight: {item.weight}</Text>
                            <Text style={styles.text}>Price: {item.price}</Text>
                            <TouchableOpacity style={styles.button} onPress={() => removeItem(item.id)}>
                                <Text style={styles.buttonText}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                ListEmptyComponent={()=>(
                    <Text style={{fontSize:20,textAlign:"center"}}>Your cart is empty. Please add some items</Text>
                )}
                ListFooterComponent={() => (
                    <View style={{ marginBottom: 30 }}>
                        <Text style={styles.total}>Total: {total}</Text>
                        <TouchableOpacity  disabled={cart.length===0} style={[styles.checkoutButton,{backgroundColor:cart.length===0?"grey":"purple"}]} onPress={() => navigation.navigate("Checkout", { cart, total })}>
                            <Text style={styles.buttonText}>Proceed to Checkout</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

        </View>
    );
};

export default Cart;

const styles = StyleSheet.create({

    card: { flexDirection: "row", justifyContent: "space-around", padding: 20, margin: 20, borderRadius: 10, backgroundColor: "white" },
    image: { height: 100, width: 100 },
    text: { fontSize: 18, fontWeight: "bold" },
    button: { backgroundColor: "red", padding: 10, marginTop: 10, borderRadius: 5, justifyContent: "center", alignItems: "center" },
    buttonText: { color: "#fff", fontWeight: "bold" },
    total: { fontSize: 22, fontWeight: "bold", marginTop: 20, textAlign: "center" },
    checkoutButton: {  padding: 15, borderRadius: 5, alignItems: "center", margin: 20 },
});
