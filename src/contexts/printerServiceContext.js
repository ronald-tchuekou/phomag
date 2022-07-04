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
      case 'set_current_printer':
         return { ...state, currentPrinter: action.payload }
      case 'set_printers_list':
         return { ...state, printersList: action.payload }
      default:
         return state
   }
}

const getPrinters = (dispatch) => {
   return async (token, callback) => {
      try {
         const response = await phomagApi.get(API_ROUTES.GET_PRINTER_SERVICE, {
            headers: {
               'x-access-token': token,
            },
         })
         dispatch({ type: 'set_printers_list', payload: response.data })
         if (callback) callback(undefined, response.data)
      } catch (error) {
         if (callback) callback(error.response.data, undefined)
      }
   }
}

const getPrinterById = (dispatch) => {
   return async (id, callback) => {
      try {
         const response = await phomagApi.get(API_ROUTES.GET_PRINTER_SERVICE + '/' + id)
         dispatch({ type: 'set_current_printer', payload: response.data })
         if (callback) callback(undefined, response.data)
      } catch (error) {
         if (callback) callback(error.response.data, undefined)
      }
   }
}

const createPrinter = (dispatch) => {
   return async (data, token, callback) => {
      try {
         await phomagApi.post(API_ROUTES.GET_PRINTER_SERVICE, data, {
            headers: {
               'x-access-token': token,
            },
         })
         const response = await phomagApi.get(API_ROUTES.GET_PRINTER_SERVICE, {
            headers: {
               'x-access-token': token,
            },
         })
         dispatch({ type: 'set_printers_list', payload: response.data })
         if (callback) callback(undefined, response.data)
      } catch (error) {
         if (callback) callback(error.response.data, undefined)
      }
   }
}

const updatePrinter = () => {
   return async (id, data, callback) => {
      try {
         const response = await phomagApi.put(API_ROUTES.GET_PRINTER_SERVICE + '/' + id, data)
         if (callback) callback(undefined, response.data)
      } catch (error) {
         if (callback) callback(error.response.data, undefined)
      }
   }
}

const deletePrinter = () => {
   return async (id, callback) => {
      try {
         const response = await phomagApi.delete(API_ROUTES.GET_PRINTER_SERVICE + '/' + id)
         if (callback) callback(undefined, response.data)
      } catch (error) {
         if (callback) callback(error.response.data, undefined)
      }
   }
}

const setCurrentPrinter = (dispatch) => {
   return async (printer, callback) => {
      try {
         dispatch({ type: 'set_current_printer', payload: printer })
         if (callback) callback(undefined, true)
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
      getPrinters,
      getPrinterById,
      setCurrentPrinter,
      createPrinter,
      updatePrinter,
      deletePrinter,
      resetFormData,
   },
   {
      currentPrinter: null,
      printersList: [],
      formData: null,
   }
)
