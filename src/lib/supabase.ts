```
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface RegisterUserData {
  email: string;
  password: string;
  userType: 'client' | 'contractor';
  fullName: string;
  companyName?: string;
  // Contractor specific fields
  licenseNumber?: string;
  specialty?: string;
  yearsExperience?: number;
  portfolioUrl?: string;
}

export async function registerUser(userData: RegisterUserData) {
  try {
    // 1. Create auth user with metadata
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          user_type: userData.userType,
          full_name: userData.fullName
        }
      }
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('No user returned from sign up');

    // 2. Create profile in profiles table
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        user_type: userData.userType,
        full_name: userData.fullName,
        company_name: userData.companyName || null
      });

    if (profileError) throw profileError;

    // 3. If contractor, create contractor details
    if (userData.userType === 'contractor') {
      const { error: contractorError } = await supabase
        .from('contractor_details')
        .insert({
          id: authData.user.id,
          license_number: userData.licenseNumber || null,
          specialty: userData.specialty || 'general',
          years_experience: userData.yearsExperience || 0,
          portfolio_url: userData.portfolioUrl || null
        });

      if (contractorError) throw contractorError;
    }

    return { user: authData.user, error: null };
  } catch (error) {
    console.error('Registration error:', error);
    return { user: null, error };
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const { data: { user }, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    if (!user) throw new Error('No user returned from sign in');

    // Get user profile to determine type
    const { data: profile } = await supabase
      .from('profiles')
      .select('user_type, full_name, company_name')
      .eq('id', user.id)
      .single();

    return { 
      user,
      userType: profile?.user_type as 'client' | 'contractor' | null,
      profile,
      error: null 
    };
  } catch (error) {
    console.error('Login error:', error);
    return { user: null, userType: null, profile: null, error };
  }
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return { user, profile };
}
```;
