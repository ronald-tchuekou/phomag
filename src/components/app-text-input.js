import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import COLORS from '../themes/colors'

export const AppTextInput = ({
                                label,
                                value,
                                onChange,
                                type = 'default',
                                autoFocus = false,
                                capitalize = false,
                                secure = false,
                                iconRight,
                                iconLeft,
                                lines = 1,
                                multiline = false,
                                readOnly = true,
                                onPress,
                                maxLength = 300
                             }) => {
   const input_ref = React.useRef(null)

   const capitalization = capitalize === true ? 'words' : capitalize === false ? 'none' : capitalize

   // States
   const [focused, setFocused] = React.useState(false)

   function onFocus() {
      setFocused(true)
   }

   function onBlur() {
      setFocused(false)
   }

   const styles = StyleSheet.create({
      input_container: {
         position: 'relative'
      },
      icon1: {
         position: 'absolute',
         top: 0,
         left: 0,
         justifyContent: 'center',
         alignItems: 'center',
         height: 45,
         width: 45,
         zIndex: 10
      },
      icon2: {
         position: 'absolute',
         top: 0,
         right: 0,
         justifyContent: 'center',
         alignItems: 'center',
         height: 45,
         width: 45,
         zIndex: 10
      },
      input: {
         height: 45,
         width: '100%',
         borderRadius: 10,
         backgroundColor: COLORS.DARK_200,
         paddingLeft: iconLeft ? 45 : 10,
         paddingRight: iconRight ? 45 : 10,
         paddingVertical: 5
      }
   })

   return (
      <View style={styles.input_container}>
         {iconLeft ? (
            <View style={styles.icon1}>{iconLeft()}</View>
         ) : null}
         <TextInput
            onFocus={onFocus}
            onBlur={onBlur}
            onPressIn={onPress}
            ref={input_ref}
            numberOfLines={lines}
            multiline={multiline}
            style={styles.input}
            value={value}
            placeholder={label}
            maxLength={maxLength}
            editable={readOnly}
            autoFocus={autoFocus}
            autoCapitalize={capitalization}
            secureTextEntry={secure}
            onChangeText={onChange}
            keyboardType={type}
         />
         {iconRight ? (
            <View style={styles.icon2}>{iconRight()}</View>
         ) : null}
      </View>
   )
}
