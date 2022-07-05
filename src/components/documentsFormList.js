import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Pressable, View, Text, StyleSheet, Dimensions, Image, Linking } from 'react-native'
import { PdfSVG } from '../svg'
import COLORS from '../themes/colors'
import SIZES from '../themes/sizes'
import { RequestConfirmationModal } from './request-confirmation.modal'
import * as DocumentPicker from 'expo-document-picker'
import * as FileSystem from "expo-file-system"
import { formatFileSize, ToastMessage } from '../utils'
import { empty_file } from '../themes/images'

const { width } = Dimensions.get('window')

export const DocumentFormList = ({}) => {
   const confirm_ref = React.useRef(null)

   const [action, setAction] = React.useState(null)
   const [currentIndex, setCurrentIndex] = React.useState(-1)
   const [documents, setDocuments] = React.useState([])

   function removeDoc(index) {
      setCurrentIndex(index)
      setAction('remove')
      confirm_ref.current.show(
         'Click on Validate button if you want to remove this file on the request or click Cancel button to deney it.'
      )
   }

   async function addFile() {
      try {
         const response = await DocumentPicker.getDocumentAsync({
            type: 'application/*',
            copyToCacheDirectory: false,
            multiple: false,
         })
         if (response.type === 'success') {
            if (documents.find((item) => item.name === response.name))
               ToastMessage('This file is alredy exist on this request !')
            else setDocuments((s) => [...s, response])
         } else {
            ToastMessage('Any file are select!')
         }
         console.log(response)
      } catch (error) {
         console.log(error)
         ToastMessage('Please try again, an error are provided!')
      }
   }

   const showDoc = async (file) => {
      const path = "https://phomag-api.herokuapp.com/files?filename=exponentielle_et_logarithme.pdf&bucket=documents"
      console.log(path)
      const response = await Linking.canOpenURL(path)
      if (response) Linking.openURL(path)
      else ToastMessage('Any app cant open this file!')
   }

   const onConfirm = (status) => {
      if (status) {
         if (action === 'add') addFile()
         else setDocuments((s) => [...s.slice(0, currentIndex), ...s.slice(currentIndex + 1)])
      }
   }

   const addNewDoc = React.useCallback(() => {
      setCurrentIndex(-1)
      setAction('add')
      confirm_ref.current.show('Click on Validate button if you want to add new file on this request.')
   }, [])

   return (
      <>
         <View
            style={[
               styles.line,
               {
                  marginHorizontal: SIZES.MEDIUM_MARGIN,
                  paddingHorizontal: SIZES.SMALL_PADDING,
                  paddingBottom: SIZES.SMALL_PADDING,
               },
            ]}
         >
            <Text style={styles.title}>Documents list</Text>
            <Pressable
               onPress={addNewDoc}
               android_ripple={{
                  color: COLORS.DARK_200,
                  borderless: true,
               }}
            >
               <Ionicons name={'add'} size={30} color={COLORS.DARK_300} />
            </Pressable>
         </View>
         {documents.length === 0 ? (
            <View
               style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 170,
               }}
            >
               <Image source={empty_file} resizeMode="contain" style={{ width: 150, height: 150 }} />
               <Text
                  style={{
                     fontSize: SIZES.H6,
                     color: COLORS.DARK_300,
                     paddingHorizontal: SIZES.DEFAULT_PADDING,
                  }}
               >
                  No file add to this request !
               </Text>
            </View>
         ) : (
            <View style={[styles.container]}>
               {documents.map((item, index) => (
                  <View key={'file' + index} style={[styles.line]}>
                     <Pressable
                        onPress={() => showDoc(item)}
                        android_ripple={{
                           color: COLORS.DARK_100,
                        }}
                        style={styles.doc_container}
                     >
                        <PdfSVG />
                        <View style={{ padding: 5 }}>
                           <Text numberOfLines={1} style={styles.doc_name}>
                              {item.name}
                           </Text>
                           <Text style={styles.doc_sub_name}>{formatFileSize(item.size)}</Text>
                        </View>
                     </Pressable>
                     <Pressable
                        onPress={() => removeDoc(index)}
                        android_ripple={{
                           color: COLORS.WARNING_25,
                           borderless: true,
                        }}
                     >
                        <Ionicons name={'close'} size={30} color={COLORS.WARNING} />
                     </Pressable>
                  </View>
               ))}
            </View>
         )}
         <RequestConfirmationModal onConfirm={onConfirm} ref={confirm_ref} />
      </>
   )
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: COLORS.WHITE,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: COLORS.DARK_100,
      marginHorizontal: SIZES.MEDIUM_MARGIN,
      marginBottom: SIZES.SMALL_MARGIN,
      overflow: 'hidden',
      paddingHorizontal: SIZES.DEFAULT_PADDING,
      paddingVertical: SIZES.SMALL_PADDING,
   },
   line: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   doc_container: {
      flexDirection: 'row',
      paddingVertical: 5,
      width: width - 113,
   },
   doc_name: {
      fontSize: SIZES.H7,
      fontWeight: 'bold',
      color: COLORS.DARK_800,
      width: width - 170,
   },
   doc_sub_name: {
      fontSize: SIZES.H8,
      color: COLORS.DARK_300,
   },
})
