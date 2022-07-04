import API_ROUTES from '../api/api_routes'
import phomagApi from '../api/phomag-api'
import createDataContext from './createDataContext'

const reducer = (state, action) => {
   switch (action.type) {
      case 'set_form_data_field':
         const payload = action.payload
         return {
            ...state,
            formData: {
               ...(state.formData ? state.formData : {}),
               [payload.key]: payload.value,
            },
         }
      case 'reset_form_data':
         return { ...state, formData: null }
      default:
         return state
   }
}

const getPlages = () => {
   return async (callback) => {
      try {
         const response = await phomagApi.get(API_ROUTES.GET_PLAGES)
         if (callback) callback(undefined, response.data)
      } catch (error) {
         if (callback) callback(error.response.data, undefined)
      }
   }
}

const getPlagesByDate = () => {
   return async (id, date, callback) => {
      try {
         const response = await phomagApi.get(API_ROUTES.GET_PLAGES + '/' + date + '/' + id)
         if (callback) callback(undefined, response.data)
      } catch (error) {
         if (callback) callback(error.response.data, undefined)
      }
   }
}

const createPlage = (dispatch) => {
   return async (data, token, callback) => {
      try {
         const response = await phomagApi.post(API_ROUTES.GET_PLAGES, data, {
            headers: {
               'x-access-token': token,
            },
         })
         dispatch({ type: 'reset_form_data' })
         if (callback) callback(undefined, response.data)
      } catch (error) {
         if (callback) callback(error.response.data, undefined)
      }
   }
}

const updatePlage = () => {
   return async (id, data, callback) => {
      try {
         const response = await phomagApi.put(API_ROUTES.GET_PLAGES + '/' + id, data)
         if (callback) callback(undefined, response.data)
      } catch (error) {
         if (callback) callback(error.response.data, undefined)
      }
   }
}

const deletePlages = () => {
   return async (id, callback) => {
      try {
         const response = await phomagApi.delete(API_ROUTES.GET_PLAGES + '/' + id)
         if (callback) callback(undefined, response.data)
      } catch (error) {
         if (callback) callback(error.response.data, undefined)
      }
   }
}

const setFormDataField = (dispatch) => {
   return (data, callback) => {
      dispatch({ type: 'set_form_data_field', payload: data })
      if (callback) callback()
   }
}

const resetFormData = (dispatch) => {
   return (callback) => {
      dispatch({ type: 'reset_form_data', payload: null })
      if (callback) callback()
   }
}

export const { Context, Provider } = createDataContext(
   reducer,
   {
      setFormDataField,
      getPlages,
      getPlagesByDate,
      createPlage,
      updatePlage,
      deletePlages,
      resetFormData,
   },
   {
      formData: null,
   }
)
