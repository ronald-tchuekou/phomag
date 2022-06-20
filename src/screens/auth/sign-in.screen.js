import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { AppStatusBar, AppTextInput, Space } from '../../components'
import COLORS from '../../themes/colors'
import { Context as AuthContext } from '../../contexts/authContext'
import SIZES from '../../themes/sizes'
import STYLES from '../../themes/style'
import { ToastMessage } from '../../utils'

const SignInScreen = ({}) => {
   const loader_ref = React.useRef(null)

   const {
      state: { formData },
      setFormDataField
   } = React.useContext(AuthContext)

   function setValue(key, value) {
      setFormDataField({ key: key, value: value }, () => {
      })
   }

   function getValue(key, default_value) {
      if (formData)
         return formData[key] || default_value
      return default_value
   }

   function submit() {
      const email = getValue('email', '').trim()
      const password = getValue('password', '').trim()

      if (email === '' || password === '') {
         ToastMessage('Veuillez renseigner votre adresse e-mail et votre mot de passe.')
         return
      }

      const data = {
         email: email,
         password: password
      }

      loader_ref.current.show()
      setTimeout(() => loader_ref.current.dismiss(), 4000)
   }

   return (
      <AppStatusBar barStyle={'dark-content'} bgColor={COLORS.DARK_100}>
         <View style={styles.container}>

            <Space />
            <Space />
            <Space />
            <Space />

            <Text style={styles.title}>Sing in to your</Text>
            <Text style={styles.title}>Account</Text>

            <Space />
            <Space />
            <Space />
            <Space />

            <AppTextInput
               label={'Adresse e-mail'}
               type={'email-address'}
               onChange={(val) => setValue('email', val)}
               value={getValue('email', '')}
               iconLeft={() => <Ionicons name={'person'} size={20} color={COLORS.DARK_300} />}
            />
            <Space />
            <Space />
            <AppTextInput
               secure
               label={'Mot de passe'}
               onChange={(val) => setValue('password', val)}
               value={getValue('password', '')}
               iconLeft={() => <Ionicons name={'lock-closed'} size={20} color={COLORS.DARK_300} />}
               iconRight={() => <Pressable onPress={() => {
               }} android_ripple={{
                  color: COLORS.DARK_300,
                  borderless: true
               }}>
                  <Ionicons name={'eye'} size={25} color={COLORS.DARK_300} />
               </Pressable>}
            />
            <Space />
            <Space />
            <Space />
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
               <Pressable
                  onPress={submit}
                  android_ripple={{
                     color: 'rgba(255,255,255,0.53)'
                  }}
                  style={[STYLES.button_primary, { width: 200 }]}>
                  <Text style={STYLES.button_text_primary}>Se connecter</Text>
               </Pressable>
            </View>
         </View>
      </AppStatusBar>
   )
}

const styles = StyleSheet.create({
   container: {
      padding: SIZES.DEFAULT_PADDING
   },
   title: {
      fontSize: SIZES.H1,
      fontWeight: 'bold'

   }
})

SignInScreen.navigationOptions = () => ({
   headerShown: false
})

export default SignInScreen
