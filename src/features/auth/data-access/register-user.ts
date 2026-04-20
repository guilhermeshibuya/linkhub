import { supabase } from '@/services/supabse'
import type { RegisterSchema } from '../schemas/register-schema'
import type { UsernameSchema } from '../schemas/username-schema'

type RegisterUserData = RegisterSchema & UsernameSchema

type RegisterUserResult =
  | { success: true }
  | { success: false; field: 'email' | 'username' | 'unknown'; message: string }

export const registerUser = async (
  formData: RegisterUserData,
): Promise<RegisterUserResult> => {
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        name: formData.name,
        username: formData.username,
      },
    },
  })

  if (error) {
    if (error.code === 'user_already_exists') {
      return {
        success: false,
        field: 'email',
        message: 'auth.errors.emailAlreadyInUse',
      }
    }
    return {
      success: false,
      field: 'unknown',
      message: 'auth.errors.unknown',
    }
  }

  if (!data.user)
    return { success: false, field: 'unknown', message: 'auth.errors.unknown' }

  return { success: true }
}
