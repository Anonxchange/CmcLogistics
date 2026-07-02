import { supabase } from '@/lib/supabase';

// Returns only CMC shipments — excludes SmartShip shipments
// Includes rows where project_tag is NULL (the original 24 CMC shipments)
export const fetchCMCShipments = async () => {
  const { data, error } = await supabase
    .from('shipments')
    .select('*')
    .or('project_tag.is.null,project_tag.neq.smartship')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
};
