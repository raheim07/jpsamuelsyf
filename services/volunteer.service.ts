import { supabase } from "@/lib/supabase"
import { Volunteer } from "@/types/volunteer"

export async function createVolunteer(volunteer: Volunteer) {
  const { data, error } = await supabase
    .from("volunteers")
    .insert([volunteer])

  if (error) throw error

  return data
}