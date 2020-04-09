import React, { useContext } from 'react'
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from "react-native";
import { Context } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons'

const IndexScreen = ({ navigation }) => {
    const { state, addBlogPost, deleteBlogPost } = useContext(Context)
    return(
        <View>
            <FlatList 
                data={state}
                keyExtractor={(blogPost) => {blogPost.title}}
                renderItem={({ item }) => {
                    return(
                        <TouchableOpacity onPress={() => {navigation.navigate('Show', {id: item.id})}}>
                            <View style={styles.rowStyle}>
                                <Text style={styles.titleStyle}>{item.title}</Text>
                                <TouchableOpacity onPress={() => {deleteBlogPost(item.id)}}>
                                    <Feather style={styles.iconStyle} name="trash"/>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

IndexScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: 
        <TouchableOpacity onPress={() => navigation.navigate('Create')}>
            <Feather name="plus" side={30}/>
        </TouchableOpacity> 
    }
}

const styles = StyleSheet.create({
    rowStyle: {
        flexDirection: row,
        justifyContent: "space-between",
        paddingVertical: 20,
        borderTopWidth:1,
        borderColor: "gray"        
    },
    titleStyle: {
        fontSize: 18
    },
    iconStyle: {
        fontSize: 24
    }
})

export default IndexScreen