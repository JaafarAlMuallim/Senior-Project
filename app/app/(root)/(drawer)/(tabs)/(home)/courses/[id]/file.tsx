import { Redirect, Stack, router, useLocalSearchParams } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Page = () => {
  const { file, name } = useLocalSearchParams<{
    file?: string;
    name?: string;
  }>();

  if (!file || !name) {
    return <Redirect href="/(root)/(drawer)/(tabs)/(home)/home" />;
  }
  const source = { uri: file, cache: true };
  console.log(source.uri);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: `${name}`,
          headerTitleStyle: {
            color: "#4561FF",
            fontSize: 20,
            fontFamily: "PoppinsBold",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color={"#4561FF"} />
            </TouchableOpacity>
          ),
        }}
      />
      <View className="flex-1 flex flex-col justify-start items-center my-8">
        {/*TODO DO IN BUILD <Pdf
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={(error) => {
            console.log(error);
          }}
          onPressLink={(uri) => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={{
            flex: 1,
            height: Dimensions.get("window").height,
            width: Dimensions.get("window").width,
          }}
        />*/}
      </View>
    </>
  );
};
export default Page;
