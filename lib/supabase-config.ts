import { createClient } from "@supabase/supabase-js"

// Get environment variables with fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Configuration object
export const supabaseConfig = {
  url: supabaseUrl,
  anonKey: supabaseAnonKey,
  serviceKey: supabaseServiceKey,
  isConfigured: !!(supabaseUrl && supabaseAnonKey),
  hasServiceKey: !!supabaseServiceKey,
}

// Helper function to check if Supabase is properly configured
export function validateSupabaseConfig() {
  const errors: string[] = []

  if (!supabaseUrl) {
    errors.push("NEXT_PUBLIC_SUPABASE_URL is missing")
  } else if (!supabaseUrl.includes("supabase.co")) {
    errors.push("NEXT_PUBLIC_SUPABASE_URL should be a valid Supabase URL")
  }

  if (!supabaseAnonKey) {
    errors.push("NEXT_PUBLIC_SUPABASE_ANON_KEY is missing")
  }

  if (!supabaseServiceKey) {
    errors.push("SUPABASE_SERVICE_ROLE_KEY is missing (needed for admin operations)")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Create clients only if configuration is available
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false,
        },
      })
    : null

export const supabaseAdmin =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      })
    : null

// Helper function to get error message for missing configuration
export function getSupabaseSetupMessage() {
  if (!supabaseUrl) {
    return {
      title: "Supabase URL Missing",
      message: "Please add NEXT_PUBLIC_SUPABASE_URL to your .env.local file",
      action: "Get it from: https://supabase.com/dashboard → Your Project → Settings → API",
    }
  }

  if (!supabaseAnonKey) {
    return {
      title: "Supabase API Key Missing",
      message: "Please add NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file",
      action: "Get it from: https://supabase.com/dashboard → Your Project → Settings → API",
    }
  }

  if (!supabaseServiceKey) {
    return {
      title: "Supabase Service Key Missing",
      message: "Please add SUPABASE_SERVICE_ROLE_KEY to your .env.local file",
      action: "Get it from: https://supabase.com/dashboard → Your Project → Settings → API",
    }
  }

  return null
}
