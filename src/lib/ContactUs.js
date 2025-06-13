import { AsyncHandler } from "@/utils/api";
import { csrApi } from "@/utils/api";


export const HandleContactUs =  AsyncHandler(async (form) => {
    const data = await csrApi.post(`/contacts`, {...form} );    
    return data;
})