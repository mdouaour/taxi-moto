import { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';

export function useAuth() {
  const [session, setSession] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSessionAndRole = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        // Fetch user role from public.users table
        const { data: userProfile, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error("Error fetching user role:", error);
          setUserRole(null);
        } else if (userProfile) {
          setUserRole(userProfile.role);
        }
      }
      setLoading(false);
    };

    getSessionAndRole();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        // Re-fetch role on auth state change
        getSessionAndRole();
      } else {
        setUserRole(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return { session, userRole, loading };
}
