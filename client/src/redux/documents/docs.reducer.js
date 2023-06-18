import * as docTypes from './docs.types';

const initialState = {
     loading: false,
     error: false,
     data: [],
}

export const reducer = (state = initialState, { type, payload }) => {

     switch (type) {
          case docTypes.DOC_LOADING: {
               return { ...state, loading: true, error: false };
          }

          case docTypes.DOC_ERROR: {
               return { ...state, loading: false, error: true };
          }

          case docTypes.DOC_SUCCESS: {
               return {...state, loading:false, error: false };
          }

          case docTypes.DOC_GET_SUCCESS: {
               return { loading: false, error: false, data: payload };
          }

          default: return state;
     }
}