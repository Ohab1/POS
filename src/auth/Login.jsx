import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigation = useNavigation()


    const handleLogin = () => {
        if (!email || !password) return Alert.alert("Enter email and password")
        if (email.length < 5 || password.length < 4) return Alert.alert("Email must be at least 5 characters & password at least 4 characters")
        if (!email.includes("@") || !email.includes(".")) return Alert.alert("Invalid email")
        navigation.navigate("Home")
        setEmail("")
        setPassword("")
    };

    return (
        <View style={styles.container}>
            <Image 
                source={require("../assets/profile.png")}
                style={styles.logo} 
            />
            <Text style={styles.title}>Welcome To POS </Text>
            <TextInput 
                style={styles.input} 
                label="Enter your email" 
                mode="outlined" 
                value={email} 
                onChangeText={(input) => setEmail(input)} 
            />
            <TextInput 
                style={styles.input} 
                label="Enter your password" 
                mode="outlined" 
                secureTextEntry 
                value={password} 
                onChangeText={(input) => setPassword(input)} 
            />

            <TouchableOpacity onPress={handleLogin} style={styles.btn}>
                <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>

            
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingHorizontal: "5%",
        marginTop:"30%"
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20
    },
    input: {
        width: "100%",
        marginBottom: 15
    },
    btn: {
        backgroundColor: "orange",
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        marginTop: 20
    },
    btnText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff"
    }
});
