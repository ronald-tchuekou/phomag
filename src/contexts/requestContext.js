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
      case 'set_current_request':
         return { ...state, currentRequest: action.payload }
      case 'set_request_list':
         return { ...state, requestsList: action.payload }
      case 'set_pending_request_list':
         return { ...state, pendingRequestsList: action.payload }
      case 'set_validate_request_list':
         return { ...state, validateRequestsList: action.payload }
      case 'set_cancel_request_list':
         return { ...state, cancelRequestsList: action.payload }
      case 'set_printed_request_list':
         return { ...state, printedRequestsList: action.payload }
      default:
         return state
   }
}

const getRequests = () => {
   return async (token, callback) => {
      try {
         const response = await phomagApi.get(API_ROUTES.GET_REQUEST, {
            headers: {
               'x-access-token': token,
            },
         })
         if (callback) callback(undefined, response.data)
      } catch (error) {
         if (callback) callback(error.response.data, undefined)
      }
   }
}

const getAuthorRequests = () => {
   return async (token, status, callback) => {
      try {
         const query = status ? `?status=${status}` : ''
         const response = await phomagApi.get(API_ROUTES.GET_REQUEST + '/author' + query, {
            headers: {
               'x-access-token': token,
            },
         })
         if (callback) callback(undefined, response.data)
      } catch (error) {
         if (callback) callback(error.response.data, undefined)
      }
   }
}

const getValidatorRequests = () => {
   return async (token, status, callback) => {
      try {
         const query = status ? `?status=${status}` : ''
         const response = await phomagApi.get(API_ROUTES.GET_REQUEST + '/validator' + query, {
            headers: {
               'x-access-token': token,
            },
         })
         if (callback) callback(undefined, response.data)
      } catch (error) {
         if (callback) callback(error.response.data, undefined)
      }
   }
}

const getPrinterRequests = () => {
   return async (token, status, callback) => {
      try {
         const query = status ? `?status=${status}` : ''
         const response = await phomagApi.get(API_ROUTES.GET_REQUEST + '/printer' + query, {
            headers: {
               'x-access-token': token,
            },
         })
         if (callback) callback(undefined, response.data)
      } catch (error) {
         if (callback) callback(error.response.data, undefined)
      }
   }
}

const createRequest = (dispatch) => {
   return async (data, token, callback) => {
      try {
         const response = await phomagApi.post(API_ROUTES.GET_REQUEST, data, {
            headers: {
               'x-access-token': token,
            },
         })
         dispatch({ type: 'reset_form_data', payload: response.data })
         if (callback) callback(undefined, response.data)
      } catch (error) {
         if (callback) callback(error.response.data, undefined)
      }
   }
}

const updateRequest = () => {
   return async (id, data, token, callback) => {
      try {
         const response = await phomagApi.put(API_ROUTES.GET_REQUEST + `/${id}`, data, {
            headers: {
               'x-access-token': token,
            },
         })
         if (callback) callback(undefined, response.data)
      } catch (error) {
         if (callback) callback(error.response.data, undefined)
      }
   }
}

const deleteRequest = () => {
   return async (id, token, callback) => {
      try {
         const response = await phomagApi.delete(API_ROUTES.GET_REQUEST + `/${id}`, {
            headers: {
               'x-access-token': token,
            },
         })
         if (callback) callback(undefined, response.data)
      } catch (error) {
         if (callback) callback(error.response.data, undefined)
      }
   }
}

const setCurrentRequest = (dispatch) => {
   return async (request, callback) => {
      try {
         dispatch({ type: 'set_current_request', payload: request })
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
      getRequests,
      getAuthorRequests,
      getValidatorRequests,
      getPrinterRequests,
      createRequest,
      updateRequest,
      deleteRequest,
      setCurrentRequest,
      setFormDataField,
      resetFormData,
   },
   {
      currentRequest: null,
      formData: null,
      requestsList: [],
      pendingRequestsList: [],
      validateRequestsList: [],
      cancelRequestsList: [],
      printedRequestsList: [],
   }
)
