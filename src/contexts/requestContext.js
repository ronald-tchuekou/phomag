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

const getRequests = (dispatch) => {
   return async (token, callback) => {
      try {
         const response = await phomagApi.get(API_ROUTES.GET_REQUEST, {
            headers: {
               'x-access-token': token,
            },
         })
         dispatch({ type: 'set_request_list', payload: response.data })
         if (callback) callback(undefined, response.data)
      } catch (error) {
         if (callback) callback(error.response.data, undefined)
      }
   }
}

const getAuthorRequests = (dispatch) => {
   return async (token, status, callback) => {
      try {
         const query = status ? `?status=${status}` : ''
         const response = await phomagApi.get(API_ROUTES.GET_REQUEST + '/author' + query, {
            headers: {
               'x-access-token': token,
            },
         })
         switch (status) {
            case 'PENDING':
               dispatch({ type: 'set_pending_request_list', payload: response.data })
               break

            case 'VALIDATE':
               dispatch({ type: 'set_validate_request_list', payload: response.data })
               break

            case 'PRINTED':
               dispatch({ type: 'set_printed_request_list', payload: response.data })
               break

            case 'CANCELED':
               dispatch({ type: 'set_cancel_request_list', payload: response.data })
               break

            default:
               dispatch({ type: 'set_request_list', payload: response.data })
               break
         }
         if (callback) callback(undefined, response.data)
      } catch (error) {
         if (callback) callback(error.response.data, undefined)
      }
   }
}

const getValidatorRequests = (dispatch) => {
   return async (token, status, callback) => {
      try {
         const query = status ? `?status=${status}` : ''
         const response = await phomagApi.get(API_ROUTES.GET_REQUEST + '/validator' + query, {
            headers: {
               'x-access-token': token,
            },
         })
         switch (status) {
            case 'PENDING':
               dispatch({ type: 'set_pending_request_list', payload: response.data })
               break

            case 'VALIDATE':
               dispatch({ type: 'set_validate_request_list', payload: response.data })
               break

            case 'PRINTED':
               dispatch({ type: 'set_printed_request_list', payload: response.data })
               break

            case 'CANCELED':
               dispatch({ type: 'set_cancel_request_list', payload: response.data })
               break

            default:
               dispatch({ type: 'set_request_list', payload: response.data })
               break
         }
         if (callback) callback(undefined, response.data)
      } catch (error) {
         if (callback) callback(error.response.data, undefined)
      }
   }
}

const getPrinterRequests = (dispatch) => {
   return async (token, status, callback) => {
      try {
         const query = status ? `?status=${status}` : ''
         const response = await phomagApi.get(API_ROUTES.GET_REQUEST + '/printer' + query, {
            headers: {
               'x-access-token': token,
            },
         })
         switch (status) {
            case 'PENDING':
               dispatch({ type: 'set_pending_request_list', payload: response.data })
               break

            case 'VALIDATE':
               dispatch({ type: 'set_validate_request_list', payload: response.data })
               break

            case 'PRINTED':
               dispatch({ type: 'set_printed_request_list', payload: response.data })
               break

            case 'CANCELED':
               dispatch({ type: 'set_cancel_request_list', payload: response.data })
               break

            default:
               dispatch({ type: 'set_request_list', payload: response.data })
               break
         }
         if (callback) callback(undefined, response.data)
      } catch (error) {
         if (callback) callback(error.response.data, undefined)
      }
   }
}

const getPrinterRequestById = () => {
   return async (id, callback) => {
      try {
         const response = await phomagApi.get(API_ROUTES.GET_REQUEST + '/printer/' + id)
         if (callback) callback(undefined, response.data)
      } catch (error) {
         if (callback) callback(error.response.data, undefined)
      }
   }
}

const createRequest = () => {
   return async (data, token, callback) => {
      try {
         const response = await phomagApi.post(API_ROUTES.GET_REQUEST, data, {
            headers: {
               'x-access-token': token,
            },
         })
         if (callback) callback(undefined, response.data)
      } catch (error) {
         console.log(error)
         if (callback) callback(error.response.data, undefined)
      }
   }
}

const assignRequest = () => {
   return async (request_id, validator_id, date, callback) => {
      try {
         const query = `?request_id=${request_id}&validator_id=${validator_id}&date=${date}`
         const response = await phomagApi.get(API_ROUTES.GET_REQUEST + '/assign' + query)
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
      getPrinterRequestById,
      createRequest,
      assignRequest,
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
