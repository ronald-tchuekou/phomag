import React from 'react'
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import COLORS from '../themes/colors'
import SIZES from '../themes/sizes'
import { Status } from './status'

const { width } = Dimensions.get('window')

export const RequestItem = ({ item, index, onPress }) => {
   const itemStyles = StyleSheet.create({
      container: {
         backgroundColor: COLORS.WHITE,
         borderRadius: 15,
         borderWidth: 1,
         borderColor: COLORS.DARK_100,
         marginHorizontal: SIZES.MEDIUM_MARGIN,
         marginTop: index === 0 ? SIZES.SMALL_MARGIN : 0,
         marginBottom: SIZES.SMALL_MARGIN,
         overflow: 'hidden',
      },
      content: {
         width: '100%',
         paddingHorizontal: SIZES.DEFAULT_PADDING,
         paddingVertical: SIZES.SMALL_PADDING,
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
      },
      title: {
         width: width - 150,
         fontSize: SIZES.H7,
         color: COLORS.DARK_500,
         fontWeight: '700',
      },
      label: {
         fontSize: SIZES.H8,
         color: COLORS.DARK_300,
      },
   })
   return (
      <View style={itemStyles.container}>
         <Pressable onPress={onPress} android_ripple={{ color: COLORS.DARK_200 }} style={itemStyles.content}>
            <View>
               <Text style={itemStyles.title} numberOfLines={1}>
                  {item.title}
               </Text>
               <Text style={itemStyles.label}>{item.date}</Text>
            </View>
            <Status status={item.status} />
         </Pressable>
      </View>
   )
}
