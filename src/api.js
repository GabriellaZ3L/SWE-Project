import {supabase} from "./SupabaseClient.js";

// Sign-Up, adds email + password to Supabase table
export async function signUp(email, password, name){
  // Supabase answers with data and an error (null if there isn't any)
  const {data, error}= await supabase.auth.signUp({email, password});
  // If Supabase returns an error, return it to user
  if (error){
    return error.message;
  }
  // Inserts row with info into profiles table
  const result= await supabase.from("profiles").insert({id: data.user.id, display_name: name});
  if (result.error){
    return result.error.message;
  }
  return null;
}

// Login, checks for email and password
export async function login(email, password){
  // Supabase answers with error or null
  const {error}= await supabase.auth.signIn({email, password});
  // If Supabase returns an error, return it to user
  if (error){
    return error.message;
  }
  return null;
}

// Logout function, removes login
export async function logout(){
  await supabase.auth.signOut();
}

