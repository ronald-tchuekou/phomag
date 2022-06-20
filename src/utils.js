import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'
import * as ImagePicker from 'expo-image-picker'
import { Alert, Platform, ToastAndroid } from 'react-native'
import { ENV } from './api/env'
import COLORS from './themes/colors'
import API_ROUTES from './api/api_routes'
import detectPresenceApi from './api/detect-presence-api'

export const storeLocaleValue = async (key, value, callback) => {
   try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
      if (callback)
         callback(undefined, value)
   } catch (error) {
      if (callback)
         callback(error, undefined)
   }
}

export const getLocaleValue = async (key, callback) => {
   try {
      const value = await AsyncStorage.getItem(key)
      if (callback)
         callback(undefined, value ? JSON.parse(value) : null)
   } catch (error) {
      if (callback)
         callback(error, undefined)
   }
}

export const registerForPushNotificationsAsync = async () => {
   try{
      let token;
         const { status: existingStatus } = await Notifications.getPermissionsAsync();
         let finalStatus = existingStatus;
         if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
         }
         if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
         }
         token = (await Notifications.getExpoPushTokenAsync({
            experienceId: '@ronald-tchuekou/detect-presence',
         })).data;
         console.log(token);

      if (Platform.OS === 'android') {
         Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: COLORS.PRIMARY,
         });
      }

      return token;
   }catch(e){
      ToastAndroid.show('Votre téléphone ne peux pas avoir de notification ===> ' + e.message, ToastAndroid.LONG)
      console.log('Error when generate de user token of notification : ', e)
      return null
   }
}

export const notifyUser = async (title, subtitle, message, data = {}) => {
   return await Notifications.scheduleNotificationAsync({
      content: {
         title: title,
         subtitle: subtitle,
         body: message,
         data: data,
         priority: 'HIGH',
         color: COLORS.PRIMARY
      },
      trigger: {
         second: 2,
         channelId: ENV.notification_channel_id
      }
   })
}

export const uploadImage = (formData, userToken, bucket) => {
   return new Promise(async (resolve, reject) => {
      try {
         const fileResponse = await detectPresenceApi.post(API_ROUTES.GET_FIlES + '/' + bucket, formData, {
            headers: {
               'x-access-token': userToken,
               'Content-Type': 'multipart/form-data'
            }
         })
         resolve(fileResponse.data)
      } catch (e) {
         reject(e)
      }
   })
}

export const pickImage = async (callback) => {
   try {
      const pickImagePermission = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (pickImagePermission.granted) {
         let file_picked = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [5, 5],
            quality: 1,
            exif: true
         })
         if (!file_picked.cancelled && callback)
            callback(undefined, file_picked)
      } else {
         Alert.alert(
            'message d\'avertissement',
            'Pour pouvoir télécharger une image de votre téléphone, vous devez donner la permission à Detect Presence de pouvoir accéder à votre galerie.'
         )
         if (callback)
            callback(undefined, null)
      }
   } catch (e) {
      if (callback)
         callback(e, undefined)
   }
}

export const ToastMessage = (message) => ToastAndroid.show(message, ToastAndroid.LONG)
