import { FC, useEffect, useReducer } from 'react';
import { useSnackbar } from 'notistack';

import { Entry } from '../../interfaces';
import {entriesApi} from '../../qwe';

import { EntriesContext , entriesReducer} from './';



export interface EntriesState {
   entries: Entry[];
}


const Entries_INITIAL_STATE: EntriesState = {
   entries: [],
}

interface Props {
   children?: React.ReactNode
}


export const EntriesProvider:FC<Props> = ({ children }) => {


   const [state, dispatch] = useReducer( entriesReducer, Entries_INITIAL_STATE );
   const { enqueueSnackbar } = useSnackbar();

   const addNewEntry = async( description: string ) => {


      const { data } = await entriesApi.post<Entry>('/entries', { description })

      dispatch({ type: '[Entry] Add-Entry' , payload: data })

   }

   const updateEntry = async( {_id, description ,status}: Entry , showSnackbar = false) => {

      try {
         const { data } = await entriesApi.put<Entry>(`/entries/${ _id }`, { description, status } )

         dispatch({ type: '[Entry] Updated-Entry', payload: data });


         if ( showSnackbar )
         enqueueSnackbar('Entrada Actualizada', {
            variant: 'success',
            autoHideDuration: 1500,
            anchorOrigin:{
               vertical: 'top',
               horizontal: 'right'
            }
         })
         
      } catch (error) {
         console.log({ error })
      }


   }

   const deleteEntry = async( {_id}:Entry , showSnackbar = false) => {

      const { data } = await entriesApi.delete<Entry>(`/entries/${ _id }` )

      try {
         dispatch({ type: '[Entry] Delete-Entry' , payload: data })

         if ( showSnackbar )
         enqueueSnackbar('Entrada Eliminada', {
            variant: 'error',
            autoHideDuration: 1500,
            anchorOrigin:{
               vertical: 'top',
               horizontal: 'right'
            }
         })

      } catch (error) {
         console.log(error)
      }

   }

   const refreshEntries = async() => {

      const { data } = await entriesApi.get<Entry[]>( '/entries' )
      
      dispatch({ type: '[Entry] Load-Entry', payload: data })
   }



   useEffect(() => {

      refreshEntries();

   }, []);
   

   return (
       <EntriesContext.Provider value={{
         ...state,

         // Methods
         addNewEntry,
         updateEntry,
         deleteEntry
       }} >
         { children }
       </EntriesContext.Provider>
   )
};