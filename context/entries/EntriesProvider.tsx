import { FC, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Entry } from '../../interfaces';

import { EntriesContext , entriesReducer} from './';
import { NewEntry } from '../../components/ui/NewEntry';

export interface EntriesState {
   entries: Entry[];
}


const Entries_INITIAL_STATE: EntriesState = {
   entries: [
        {
            _id: uuidv4(),
            description: 'Pendiente: node js and python which is good?',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            _id: uuidv4(),
            description: 'In-Progress: You cannot compair. Python is a programming language',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
        },
        {
            _id: uuidv4(),
            description: 'Finish: You cannot compair. Python is a programming language',
            status: 'finished',
            createdAt: Date.now() - 100000,
        },
   ],
}

interface Props {
   children?: React.ReactNode
}


export const EntriesProvider:FC<Props> = ({ children }) => {


   const [state, dispatch] = useReducer( entriesReducer, Entries_INITIAL_STATE );

   const addNewEntry = ( description: string ) => {

      const NewEntry: Entry = {
        _id: uuidv4(),
        description,
        createdAt: Date.now(),
        status: 'pending'
      }

      dispatch({ type: '[Entry] Add-Entry' , payload: NewEntry })

   }

   const updateEntry = ( entry: Entry ) => {

      dispatch({ type: '[Entry] Updated-Entry', payload: entry });

   }

   return (
       <EntriesContext.Provider value={{
         ...state,

         // Methods
         addNewEntry,
         updateEntry
       }} >
         { children }
       </EntriesContext.Provider>
   )
};