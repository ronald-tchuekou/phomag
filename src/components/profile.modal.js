import React from 'react'
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import { AppModal } from '../base-component/modal'
import COLORS from '../themes/colors'
import SIZES from '../themes/sizes'
import { Ionicons,Entypo } from '@expo/vector-icons'
import { AppTextInput } from './app-text-input'
import { Context as AuthContext } from '../contexts/authContext'
import STYLES from '../themes/style'
import { Space } from './space'

export const ProfileModal = React.forwardRef((props, ref) => {

   const { height } = Dimensions.get('window')

   const {
      state: { formData, currentUser },
      setFormDataField
   } = React.useContext(AuthContext)

   // Content state.
   const [visible, setVisible] = React.useState(false)

   React.useImperativeHandle(ref, () => ({
      open: open,
      close: close
   }))

   function setValue(key, value) {
      setFormDataField({ key: key, value: value }, () => {
      })
   }

   function getValue(key, default_value) {
      if (formData)
         return formData[key] || default_value
      return default_value
   }

   function open() {
      setValue('matricule', currentUser.matricule)
      setValue('lastname', currentUser.lastname)
      setValue('firstname', currentUser.firstname)
      setValue('email', currentUser.email)
      setValue('phone', currentUser.phone)
      setValue('function', currentUser.role)
      setVisible(true)
   }

   function close() {
      setVisible(false)
   }

   const styles = StyleSheet.create({
      wrapper: {
         borderRadius: 20,
         backgroundColor: COLORS.WHITE,
         padding: SIZES.DEFAULT_PADDING,
         width: '100%',
         maxWidth: 450,
         maxHeight: height - 180,
         position: 'relative'
      },
      title: {
         fontWeight: 'bold',
         textAlign: 'center',
         color: COLORS.DARK_500,
         fontSize: SIZES.H5
      },
      button_content: {
         overflow: 'hidden',
         borderRadius: 200,
         position: 'absolute',
         top: 0,
         right: 0
      },
      button: {
         padding: SIZES.SMALL_PADDING,
         borderRadius: 200
      }
   })

   return (
      <AppModal onClose={close} visible={visible} openMode={'fade'}>
         <View style={styles.wrapper}>
            <Text style={styles.title}>Mon Profil</Text>
            <AppTextInput
               label={'Matricule'}
               readOnly={false}
               onChange={(val) => setValue('matricule', val)}
               value={getValue('matricule', '')}
               iconLeft={() => <Ionicons name={'person'} size={30} color={COLORS.DARK_300} />}
            />
            <AppTextInput
               label={'Nom'}
               onChange={(val) => setValue('lastname', val)}
               value={getValue('lastname', '')}
               iconLeft={() => <Ionicons name={'person'} size={30} color={COLORS.DARK_300} />}
            />
            <AppTextInput
               label={'Prénom'}
               onChange={(val) => setValue('firstname', val)}
               value={getValue('firstname', '')}
               iconLeft={() => <Ionicons name={'person'} size={30} color={COLORS.DARK_300} />}
            />
            <AppTextInput
               label={'Adresse e-mail'}
               onChange={(val) => setValue('email', val)}
               value={getValue('email', '')}
               iconLeft={() => <Entypo name="email" size={30} color={COLORS.DARK_300} />}
            />
            <AppTextInput
               label={'Téléphone'}
               onChange={(val) => setValue('phone', val)}
               value={getValue('phone', '')}
               iconLeft={() => <Entypo name="phone" size={30} color={COLORS.DARK_300} />}
            />
            <AppTextInput
               label={'Fonction'}
               readOnly={false}
               onChange={(val) => setValue('function', val)}
               value={getValue('function', '')}
               iconLeft={() => <Ionicons name={'person'} size={30} color={COLORS.DARK_300} />}
            />
            <Space />
            <Space />
            <Pressable
               onPress={() => {
               }}
               android_ripple={{
                  color: 'rgba(255,255,255,0.53)'
               }}
               style={STYLES.button_primary}>
               <Text style={STYLES.button_text_primary}>Modifier</Text>
            </Pressable>
            <View style={styles.button_content}>
               <Pressable onPress={close} android_ripple={{
                  color: 'rgba(0, 0, 0, 0.15)'
               }} style={styles.button}>
                  <Ionicons name='close' size={35} color={COLORS.DARK_300} />
               </Pressable>
            </View>
         </View>
      </AppModal>
   )
})
