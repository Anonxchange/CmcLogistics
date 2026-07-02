import { supabase } from '@/lib/supabase';

// Returns only CMC shipments — excludes SmartShip shipments
export const fetchCMCShipments = async () => {
  const { data, error } = await supabase
    .from('shipments')
    .select('*')
    .not('project_tag', 'eq', 'smartship')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
};
