import createDataContext from './createDataContext'

const reducer = (state, action) => {
   switch (action) {
      case 'setUserList':
         return { ...state, users: action.payload }
      default:
         return state
   }
}

const getAllUserFormService = (dispatch) => {
   return async (callback) => {
      console.log('Request is start')
      try {
         // TODO
         if (callback)
            callback(undefined, null)
      } catch (error) {
         if (callback)
            callback(error, undefined)
      }
   }
}

export const { Context, Provider } = createDataContext(
   reducer,
   {
      getAllUserFormService
   },
   {
      users: []
   }
)
