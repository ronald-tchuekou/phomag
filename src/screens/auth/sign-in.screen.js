import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { AppStatusBar, AppTextInput, ModalLoader, Space } from '../../components'
import { Context as AuthContext } from '../../contexts/authContext'
import COLORS from '../../themes/colors'
import SIZES from '../../themes/sizes'
import STYLES from '../../themes/style'
import { registerForPushNotificationsAsync, ToastMessage } from '../../utils'

const SignInScreen = ({ navigation }) => {
   const loader_ref = React.useRef(null)

   const {
      state: { formData },
      setFormDataField,
      signIn,
      setNotificationToken
   } = React.useContext(AuthContext)

   const [secure, setSecure] = React.useState(true)

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
         username: email,
         password: password
      }

      loader_ref.current.show()
      signIn(data, async (error, response) => {
         loader_ref.current.dismiss()
         if (error) {
            console.log(error)
            if (error.message)
               ToastMessage(error.message)
            else
               ToastMessage('An error are provided, please try again!')
            return
         }

         console.log(response)
         const notification_token = await registerForPushNotificationsAsync()
         setNotificationToken({
            id: response.user_id,
            token: response.token,
            notify_token: notification_token,
            role: response.role
         }, (error, res) => {
            if (error) {
               console.log(error)
               return
            }
            console.log(res)
         })

         if (response.role === 'Chief')
            return navigation.navigate('ManagerFlow')
         if (response.role === 'Teacher')
            return navigation.navigate('TeacherFlow')
         if (response.role === 'Printer')
            return navigation.navigate('PrinterServiceFlow')

         ToastMessage('Your connection information isn\'t correct!')
      })
   }

   return (
      <AppStatusBar barStyle={'dark-content'} bgColor={COLORS.WHITE}>
         <View style={styles.container}>
            <Space />
            <Space />
            <Space />
            <Space />
            <Text style={styles.title}>Sign in to your</Text>
            <Text style={styles.title}>Account</Text>
            <Space />
            <Space />
            <Space />
            <Space />
            <AppTextInput
               label={'Matricule / Adresse e-mail'}
               onChange={(val) => setValue('email', val)}
               value={getValue('email', '')}
               iconLeft={() => <Ionicons name={'person'} size={20} color={COLORS.DARK_300} />}
            />
            <Space />
            <Space />
            <AppTextInput
               secure={secure}
               label={'Mot de passe'}
               onChange={(val) => setValue('password', val)}
               value={getValue('password', '')}
               iconLeft={() => <Ionicons name={'lock-closed'} size={20} color={COLORS.DARK_300} />}
               iconRight={() => (
                  <Pressable onPress={() => setSecure(s => !s)} android_ripple={{
                     color: COLORS.DARK_500,
                     borderless: true
                  }} style={{ padding: 2, zIndex: 20 }}>
                     <Ionicons name={secure ? 'eye' : 'eye-off'} size={25} color={COLORS.DARK_300} />
                  </Pressable>
               )}
            />
            <Space />
            <Space />
            <Space />
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
               <LinearGradient
                  colors={[COLORS.PRIMARY_50, COLORS.PRIMARY]}
                  style={STYLES.button_container}
               >
                  <Pressable
                     onPress={submit}
                     android_ripple={{
                        color: 'rgba(255,255,255,0.53)'
                     }}
                     style={[STYLES.button_primary, { width: 150 }]}>
                     <Text style={STYLES.button_text_accent}>Connect</Text>
                  </Pressable>
               </LinearGradient>
            </View>
            <ModalLoader ref={loader_ref} />
         </View>
      </AppStatusBar>
   )
}

const styles = StyleSheet.create({
   container: {
      padding: SIZES.MEDIUM_PADDING,
      backgroundColor: COLORS.WHITE,
      flex: 1
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
