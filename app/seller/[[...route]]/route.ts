// Disable static pre-rendering for all seller routes
// They require authentication which isn't available during build time
export const dynamic = "force-dynamic"
