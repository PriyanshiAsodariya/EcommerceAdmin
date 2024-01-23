import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, decrementby, increment, incrementby } from '../redux/slice/counterSlice';
// import { increment } from '../redux/Action/counter.action';

export default function Counter() {
    const dispatch = useDispatch();

    const handleInc = () => {
        dispatch(increment())
    }

    const handledec = () => {
        dispatch(decrement())
    }

    const incby = () =>{
        dispatch(incrementby())
    }

    const decby = () =>{
        dispatch(decrementby())
    }

    const counter = useSelector(state => state.counter)

    return (
        <View>
            <Text style = {{color :'black' , marginTop : 40 , fontWeight:'bold' , fontSize:40}}>Redux Counter</Text>
            <View style = {{flexDirection : 'row'}}>
            <TouchableOpacity onPress={() => handleInc()}>
                <Text style = {{color :'white' , marginLeft:50 , backgroundColor:"black" , width:100, height : 30 , marginTop : 20 ,textAlign:'center' }}>  INCREMENT  </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => incby()}>
                <Text style = {{color :'white' , marginLeft:50 , backgroundColor:"black" , width:100, height : 30 , marginTop : 20 ,textAlign:'center' }}> INC BY 10  </Text>
            </TouchableOpacity>
            </View>
            <Text style = {{color:'black' , marginLeft : 160, marginTop :20 , fontSize :30}}>{counter.count}</Text>

            <View style = {{flexDirection : 'row'}}>

            <TouchableOpacity onPress={() => handledec()}>
                <Text style = {{color :'white' , marginLeft:50 , backgroundColor:"black" , width:100, height : 30 , marginTop : 20 ,textAlign:'center' }}>  DECREMENT  </Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => decby()}>
                <Text style = {{color :'white' , marginLeft:50 , backgroundColor:"black" , width:100, height : 30 , marginTop : 20 ,textAlign:'center' }}> DEC BY 10  </Text>
            </TouchableOpacity>
            </View>
            
        </View>
    )
}