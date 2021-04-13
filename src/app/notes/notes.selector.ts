import { createSelector } from '@ngrx/store';

export const getNotesByDesc = createSelector(
    state => state["global"]["notes"]["notesByID"],
    (state:any) => {
        let flatDateArray = [];
        flatDateArray = flatDateArray.concat(Object.keys(state).map((id) => state[id]));  
        return flatDateArray.sort((a,b) => b.lastModified.toISOString().localeCompare(a.lastModified.toISOString()));
    }
);

export const getNotesForSelectedDate = createSelector(
    state => state["global"]["calendar"],
    getNotesByDesc,
    (state,notes: any) => {
        let notesArray: Array<any> = [];
        for(let entry of notes){
            if(state["selectedDate"] == entry["lastModified"].toISOString().split("T")[0]){
                notesArray.push(entry);
            }
        }
        return notesArray;
    }
)

export const getSelectedNoteAndID = createSelector(
    state => state["global"]["notes"]["selectedNoteID"],
    state => state["global"]["notes"]["notesByID"],
    (id, notes) => {
        return id ? [id, notes[id]] : [null,{}];
    }
)