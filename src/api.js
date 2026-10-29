import {supabase} from "./SupabaseClient.js";

export async funtion signUp(email, password, name){
  const {data, error}= await supabase.auth.signUp({email, password})
  if (error){
    return error.message;
  }
  const result= await supabase.from("profiles").insert({id: data.user.id, display_name: name});
  if (result.error){
    return result.error.message;
  }
  return null;
}
  
