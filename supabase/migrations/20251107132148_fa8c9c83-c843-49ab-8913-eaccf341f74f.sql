-- Update profiles RLS policy to allow viewing basic profile info of all users
-- This is needed for displaying user names/avatars in comments, likes, and chats

-- Drop the old restrictive SELECT policy
DROP POLICY IF EXISTS profiles_select_own_or_admin ON profiles;

-- Create new policy that allows all authenticated users to view basic profile info
CREATE POLICY "profiles_select_public_info" 
ON profiles 
FOR SELECT 
USING (true);

-- Keep the update policy restrictive (own profile only)
-- This ensures users can only edit their own profiles