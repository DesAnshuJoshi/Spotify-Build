import { UserDetails } from '@/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const getUserDetails = async (): Promise<UserDetails | null> => {
  const supabase = createServerComponentClient({
    cookies: () => cookies()
  });

  // Fetch session to ensure user is logged in
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  if (sessionError || !session) {
    // console.error('No valid session found:', sessionError);
    return null;
  }

  // Fetch user details from 'public/users' table
  const { data: userData, error: userError } = await supabase
    .from('users') // Use 'public/users' for public schema
    .select('id, full_name, avatar_url')
    .single();

  if (userError) {
    console.error('Error fetching user details from public schema:', userError.message);
  }

  // Fetch email from Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError) {
    console.error('Error fetching email from Supabase Auth:', authError.message);
  }

  // Determine fallback values
  const fullName = userData?.full_name || '';
  const email = authData?.user?.email || '';
  const firstName = fullName ? fullName.split(' ')[0] : (email.split('@')[0] || '');
  const lastName = fullName ? fullName.split(' ').slice(1).join(' ') : '';

  return {
    id: userData?.id || '',
    first_name: firstName,
    last_name: lastName,
    full_name: fullName,
    email: email,
    avatar_url: userData?.avatar_url || '',
  } as UserDetails;
};
