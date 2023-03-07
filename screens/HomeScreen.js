import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ChevronDownIcon,
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity";
const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  // turn off defaul header value
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  //////////////////////////////////////////////

  // As soon as it loads, fetching data.
  useEffect(() => {
    sanityClient
      .fetch(
        `
  *[_type == "featured"]{
    ...,
    restaurants[]->{
      ...,
      dishes[]->
    }
  }`
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);

  console.log(featuredCategories);

  //////////////////////////////////////////////

  return (
    <SafeAreaView className="bg-white pt-5">
      {/* Header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2 px-2">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />

        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>
        <UserIcon size={35} color="#00CCBB" />
      </View>

      {/*  SearchInput */}
      <View className="flex-row pb-2 items-center mx-4 space-x-2 px-2">
        <View className="flex-row  flex-1 space-x-2 bg-gray-200 p-3 rounded-full">
          <MagnifyingGlassIcon color="gray" size={20} />
          <TextInput
            placeholder="Restaurants & cuisines"
            keyboardType="default"
            className="text-gray-500"
          />
        </View>
        <AdjustmentsVerticalIcon color="#00CCBB" />
      </View>

      {/* Body */}

      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {/* Categories */}
        <Categories />
        {/* Featured Rows */}
        {/* Featured */}
        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            desc={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
