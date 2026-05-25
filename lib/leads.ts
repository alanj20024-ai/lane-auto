import { supabase } from './supabase'

export interface LeadResult {
  success: boolean
  error?: string
}

export interface QuoteHoldParams {
  email: string
  origin: string
  destination: string
  vehicleSize: string
  pickupDate: string // YYYY-MM-DD
  priceCents: number
}

export interface NotifyParams {
  email: string
  zipCode?: string
}

export async function createQuoteHoldLead(params: QuoteHoldParams): Promise<LeadResult> {
  const { error } = await supabase.from('leads').insert({
    email: params.email,
    source: 'quote_hold',
    origin: params.origin,
    destination: params.destination,
    vehicle_size: params.vehicleSize,
    pickup_date: params.pickupDate,
    price_cents: params.priceCents,
  })
  if (error) {
    console.error('[leads] createQuoteHoldLead:', error.message)
    return { success: false, error: error.message }
  }
  return { success: true }
}

export async function createNotifyLead(params: NotifyParams): Promise<LeadResult> {
  const { error } = await supabase.from('leads').insert({
    email: params.email,
    source: 'notify_me',
    zip_code: params.zipCode || null,
  })
  if (error) {
    console.error('[leads] createNotifyLead:', error.message)
    return { success: false, error: error.message }
  }
  return { success: true }
}
