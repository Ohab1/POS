import React, { useContext, useState } from "react";
import { View, FlatList, Text, TouchableOpacity, Alert } from "react-native";
import { Card, RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Context from "../context/context";

const Checkout = ({ route }) => {
    const { total } = route.params
    const { cart, setCart } = useContext(Context)
    const navigation = useNavigation()
    const [paymentMode, setPaymentMode] = useState("COD")
    const [address, setAddress] = useState("Kalyan Nagar, Bengaluru, 560043")

    const placeOrder = () => {
        Alert.alert("Success", "Order Placed Successfully", [{ text: "OK", onPress: () => {
            navigation.navigate("Home")
            setCart([])
        } }])
    };

    const customerAddres= ["Kalyan Nagar, Bengaluru, 560043", "Babusapalay, Bengaluru, 560042", "Flower Garden, Bengaluru, 560048"]
    const paymentType=["COD", "Online"]
    return (
        <View style={{paddingTop:"8%",marginRight:"2%",marginLeft:"2%"}}>
            
            <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>Order Summary</Text>

            <FlatList
                data={cart}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item,index }) => (
                    <Card style={{ padding: 10, marginVertical: 5 }} mode="contained">
                        <Text>Item details is below </Text>
                        <Text>Name: {item.name} </Text>
                        <Text>Price: {item.price}  </Text>
                        <Text>Weight({item.weight}) </Text>
                    </Card>
                )}
               ListFooterComponent={()=>(
                <View style={{marginBottom:80}}>
                     <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>Select Address:</Text>
            <RadioButton.Group onValueChange={setAddress} value={address}>
                {customerAddres.map((addr) => (
                    <TouchableOpacity key={addr} onPress={() => setAddress(addr)} style={{ flexDirection: "row", alignItems: "center", marginVertical: 3 }}>
                        <RadioButton value={addr} /><Text>{addr}</Text>
                    </TouchableOpacity>
                ))}
            </RadioButton.Group>

            <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>Payment Mode:</Text>
            <RadioButton.Group onValueChange={setPaymentMode} value={paymentMode}>
                {paymentType.map((mode) => (
                    <TouchableOpacity key={mode} onPress={() => setPaymentMode(mode)} style={{ flexDirection: "row", alignItems: "center", marginVertical: 3 }}>
                        <RadioButton value={mode} /><Text>{mode === "COD" ? "Cash on Delivery" : "Pay Online"}</Text>
                    </TouchableOpacity>
                ))}
            </RadioButton.Group>

            <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center", marginVertical: 10 }}>Total: ₹{total}</Text>

            <TouchableOpacity onPress={placeOrder} style={{ backgroundColor: "green", padding: 12, borderRadius: 5, alignItems: "center" }}>
                <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>Place Order</Text>
            </TouchableOpacity>
                </View>
               )} 
            />

           
        </View>
    );
};

export default Checkout;


