import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import COLORS from '../themes/colors'
import SIZES from '../themes/sizes'

export const Status = ({ status }) => {
   const text_color = status === 'Pending' ? COLORS.WARNING :
      status === 'Validate' ? COLORS.PRIMARY :
         status === 'Printed' ? COLORS.SUCCESS :
            COLORS.ERROR

   const bg_color = status === 'Pending' ? COLORS.WARNING_15 :
      status === 'Validate' ? COLORS.PRIMARY_15 :
         status === 'Printed' ? COLORS.SUCCESS_15 :
            COLORS.ERROR_15

   const itemStyles = StyleSheet.create({
      badge: {
         borderRadius: 5,
         backgroundColor: bg_color,
         paddingVertical: 4,
         paddingHorizontal: 8
      },
      badge_label: {
         color: text_color,
         fontSize: SIZES.H9,
         fontWeight: 'bold'
      }
   })

   return (
      <View style={itemStyles.badge}>
         <Text style={itemStyles.badge_label}>{status}</Text>
      </View>
   )
}