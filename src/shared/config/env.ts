function required(name: string, value: string | undefined) {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function normalizeDataMode(value: string | undefined): "mock" | "live" {
  return String(value || "mock").toLowerCase() === "live" ? "live" : "mock";
}

export const env = {
  apiBaseUrl: required("VITE_API_BASE_URL", import.meta.env.VITE_API_BASE_URL),
  supabaseUrl: required("VITE_SUPABASE_URL", import.meta.env.VITE_SUPABASE_URL),
  supabaseAnonKey: required(
    "VITE_SUPABASE_ANON_KEY",
    import.meta.env.VITE_SUPABASE_ANON_KEY
  ),
  dataMode: normalizeDataMode(import.meta.env.VITE_DATA_MODE),
};