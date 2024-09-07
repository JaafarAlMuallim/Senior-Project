import React from "react";
import {TouchableOpacity,Image, View, Text,StyleSheet } from "react-native";


export default function Welcome(){
    return(
        <View className="w-80">
            <Text className={"text-2xl font-normal"}>
                Welcome to
            </Text>
            <Text className={"text-primary-default text-5xl font-bold mt-2"}>
                EduLink
            </Text>
            <Text className={"text-1xl"}>
                A place where you can track all your 
            </Text>
            <Text className={"text-1xl"}>
                expenses and incomes...
            </Text>
            <Text className={"text-1xl mt-5 mb-2"} >
                Let’s Get Started...
            </Text>

            <TouchableOpacity className="items-center justify-center mt-2 min-h-16 p-3 rounded-2xl" style={styles.button}>
                    <Image source={require('@/assets/images/Google_Icons.webp')}
                        style={{width: 20, height: 20}}/>
                    <Text className="text-primary-black font-medium" >
                        Continue with Google
                        </Text>
            </TouchableOpacity>

            <TouchableOpacity className="items-center justify-center mt-2 min-h-16 p-3 rounded-2xl" style={styles.button}>
                    <Text className="text-primary-black text-1xl font-medium" >
                        Continue with Email
                    </Text>
                    <Text className="text-primary-default text-1xl font-extrabold ml-2"> 
                        @
                    </Text>
            </TouchableOpacity>
            
            
                <Text className={"text-1xl mt-5"}>
                    Already have an account?
                    <Text  className={"text-primary-default font-bold"}>
                        Login
                    </Text>
                </Text>
            
        </View>
    )
}

const styles = StyleSheet.create({
button:{
    backgroundColor: "rgba(69, 97, 255, 0.05)",
    flexDirection: 'row',
    flexWrap: 'wrap',
},
});