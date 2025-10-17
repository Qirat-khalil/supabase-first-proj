import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'


let supaUrl = "https://yngmtjgxxylbynbdgxcu.supabase.co"
let supaKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InluZ210amd4eHlsYnluYmRneGN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MTEyMjAsImV4cCI6MjA3NjI4NzIyMH0.q9wmbJ0GLQRx2AcmMfnu3R0EasVWPV2d1WyCN5gvaxc"


const supabase = createClient(supaUrl, supaKey)


export default supabase