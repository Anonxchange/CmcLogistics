import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Package, MapPin, Clock, CheckCircle, Truck, Calendar, Mail, Phone, ChevronDown, ChevronUp, AlertCircle, Plane, Ship, Printer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { format, parseISO, isValid } from 'date-fns';
import { supabase } from '@/lib/supabase';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import PrintInvoiceModal from '@/components/PrintInvoiceModal';

// Mapbox access token
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiY21jbG9naXN0aWNzIiwiYSI6ImNtZ2R0eW42YzFrNzQybHM3eDFlNjdoaXgifQ.3RMOjZq_jNHwnZcLlzDDvg';

// Add print styles for professional invoice format - works on all devices
const printStyles = `
  @media print {
    @page {
      size: A4;
      margin: 10mm 15mm;
    }

    html, body {
      height: auto;
      overflow: visible !important;
      font-size: 10pt;
    }

    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }

    body * {
      visibility: hidden !important;
    }

    #print-receipt-container,
    #print-receipt-container * {
      visibility: visible !important;
    }

    #print-receipt-container {
      position: fixed !important;
      left: 0 !important;
      top: 0 !important;
      width: 100% !important;
      max-width: 100% !important;
      background: white !important;
      padding: 0 !important;
      margin: 0 !important;
      z-index: 99999 !important;
    }

    .no-print,
    header,
    footer,
    nav,
    .print\\:hidden {
      display: none !important;
    }

    .print-invoice {
      padding: 30px;
      font-family: Arial, sans-serif;
      font-size: 11pt;
      line-height: 1.5;
      color: #000;
      background: #fff;
    }

    .invoice-header {
      text-align: center;
      margin-bottom: 20px;
      position: relative;
    }

    .invoice-watermark {
      transform: rotate(-45deg);
      position: absolute;
      top: 20px;
      right: 50px;
      font-size: 60pt;
      opacity: 0.08;
      font-weight: bold;
      white-space: nowrap;
    }

    .invoice-company {
      text-align: center;
      margin-bottom: 30px;
      border-bottom: 2px solid #000;
      padding-bottom: 15px;
    }

    .invoice-company-name {
      font-size: 14pt;
      font-weight: bold;
      margin-bottom: 8px;
    }

    .invoice-company-info {
      font-size: 10pt;
      line-height: 1.6;
    }

    .invoice-section {
      margin-bottom: 20px;
      page-break-inside: avoid;
    }

    .invoice-grid-2col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .invoice-grid-3col {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 20px;
    }

    .invoice-section-title {
      font-weight: bold;
      font-size: 11pt;
      margin-bottom: 10px;
      border-bottom: 1px solid #ccc;
      padding-bottom: 5px;
    }

    .invoice-details-box {
      border: 2px solid #000;
      padding: 15px;
      background: #f9f9f9;
      font-size: 9pt;
    }

    .invoice-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
      font-size: 10pt;
    }

    .invoice-table th,
    .invoice-table td {
      border: 1px solid #ccc;
      padding: 12px;
      text-align: left;
      page-break-inside: avoid;
    }

    .invoice-table th {
      background-color: #f0f0f0;
      border-top: 2px solid #000;
      border-bottom: 2px solid #000;
      font-weight: bold;
    }

    .invoice-stamp-area {
      border: 2px dashed #999;
      padding: 20px;
      text-align: center;
      background: #fafafa;
      border-radius: 8px;
    }

    .invoice-footer {
      border-top: 3px double #000;
      padding-top: 20px;
      margin-top: 30px;
    }

    .invoice-footer-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      text-align: center;
      font-size: 12pt;
    }

    .invoice-cost-label {
      color: #666;
      font-size: 9pt;
      margin-bottom: 5px;
    }

    .invoice-cost-value {
      font-weight: bold;
      font-size: 14pt;
    }
  }

  @media print and (max-width: 600px) {
    .print-invoice {
      padding: 15px !important;
      font-size: 9pt !important;
    }

    .invoice-table {
      font-size: 8pt !important;
    }

    .invoice-table th,
    .invoice-table td {
      padding: 6px !important;
    }

    .invoice-grid-2col,
    .invoice-grid-3col {
      display: block !important;
    }

    .invoice-cost-value {
      font-size: 12pt !important;
    }
  }
`;

// Function to safely format dates, handling invalid or null values.
const formatSafeDate = (dateValue: any, formatString: string = 'yyyy-MM-dd') => {
  if (!dateValue || dateValue === 'undefined' || dateValue === 'null') return 'N/A';

  try {
    const date = typeof dateValue === 'string' ? parseISO(dateValue) : new Date(dateValue);
    if (!isValid(date)) return 'N/A';
    return format(date, formatString);
  } catch (error) {
    console.warn('Date formatting error:', error, 'for value:', dateValue);
    return 'N/A';
  }
};

export default function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingData, setTrackingData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const { toast } = useToast();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  // Initialize Mapbox map when tracking data is available
  useEffect(() => {
    if (!trackingData || !mapContainer.current) return;

    // Set Mapbox access token
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    // Initialize map
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [0, 20],
        zoom: 1.5,
        projection: 'mercator'
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    }

    // Parse addresses to get coordinates
    const senderAddress = trackingData.shipment.senderAddress || '';
    const recipientAddress = trackingData.shipment.recipientAddress || '';
    
    // Get coordinates from tracking updates if available
    const getCoordinatesFromLocation = (location: string): [number, number] | null => {
      if (!location) return null;
      
      const locationLower = location.toLowerCase();
      // City-specific coordinates
      if (locationLower.includes('lagos') || locationLower.includes('nigeria')) {
        return [3.3792, 6.5244]; // Lagos, Nigeria
      } else if (locationLower.includes('london') || locationLower.includes('uk') || locationLower.includes('united kingdom')) {
        return [-0.1276, 51.5074]; // London, UK
      } else if (locationLower.includes('new york') || locationLower.includes('nyc')) {
        return [-74.0060, 40.7128]; // New York, USA
      } else if (locationLower.includes('dubai') || locationLower.includes('uae')) {
        return [55.2708, 25.2048]; // Dubai, UAE
      } else if (locationLower.includes('tokyo') || locationLower.includes('japan')) {
        return [139.6917, 35.6895]; // Tokyo, Japan
      } else if (locationLower.includes('los angeles') || locationLower.includes('california')) {
        return [-118.2437, 34.0522]; // Los Angeles, USA
      } else if (locationLower.includes('chicago')) {
        return [-87.6298, 41.8781]; // Chicago, USA
      } else if (locationLower.includes('toronto') || locationLower.includes('canada')) {
        return [-79.3832, 43.6532]; // Toronto, Canada
      } else if (locationLower.includes('paris') || locationLower.includes('france')) {
        return [2.3522, 48.8566]; // Paris, France
      } else if (locationLower.includes('berlin') || locationLower.includes('germany')) {
        return [13.4050, 52.5200]; // Berlin, Germany
      } else if (locationLower.includes('miami') || locationLower.includes('florida')) {
        return [-80.1918, 25.7617]; // Miami, USA
      } else if (locationLower.includes('sydney') || locationLower.includes('australia')) {
        return [151.2093, -33.8688]; // Sydney, Australia
      } else if (locationLower.includes('singapore')) {
        return [103.8198, 1.3521]; // Singapore
      } else if (locationLower.includes('hong kong')) {
        return [114.1694, 22.3193]; // Hong Kong
      } else if (locationLower.includes('mumbai') || locationLower.includes('india')) {
        return [72.8777, 19.0760]; // Mumbai, India
      } else if (locationLower.includes('havana') || locationLower.includes('cuba')) {
        return [-82.3666, 23.1136]; // Havana, Cuba
      }
      return null;
    };

    // Use tracking updates to get actual locations
    const originCoords = getCoordinatesFromLocation(senderAddress) || [-74.0060, 40.7128]; // Default origin
    const destinationCoords = getCoordinatesFromLocation(recipientAddress) || [0.0, 20.0]; // Default destination
    
    // Get current location from the most recent tracking update
    let currentCoords: [number, number] | null = null;
    let currentLocation = '';
    if (trackingData.trackingUpdates && trackingData.trackingUpdates.length > 0) {
      const latestUpdate = trackingData.trackingUpdates[0];
      currentLocation = latestUpdate.location;
      currentCoords = getCoordinatesFromLocation(latestUpdate.location);
      
      // If no match found, try to interpolate between origin and destination based on status
      if (!currentCoords && trackingData.shipment.status !== 'delivered') {
        const statusProgress: { [key: string]: number } = {
          'pending': 0.1,
          'picked_up': 0.2,
          'in_transit': 0.5,
          'stopover': 0.6,
          'held_by_customs': 0.7,
          'out_for_delivery': 0.9
        };
        const progress = statusProgress[trackingData.shipment.status] || 0.5;
        
        // Interpolate coordinates between origin and destination
        currentCoords = [
          originCoords[0] + (destinationCoords[0] - originCoords[0]) * progress,
          originCoords[1] + (destinationCoords[1] - originCoords[1]) * progress
        ];
      }
    }
    
    // Parse stopover coordinates if available
    let stopoverCoords: [number, number] | null = null;
    if (trackingData.shipment.stopoverCoordinates) {
      try {
        const coords = JSON.parse(trackingData.shipment.stopoverCoordinates);
        // Validate coordinates are within valid ranges
        if (coords.lat && coords.lng && 
            typeof coords.lat === 'number' && typeof coords.lng === 'number' &&
            coords.lat >= -90 && coords.lat <= 90 && 
            coords.lng >= -180 && coords.lng <= 180) {
          stopoverCoords = [coords.lng, coords.lat];
        } else {
          console.warn('Invalid stopover coordinates:', coords);
        }
      } catch (e) {
        console.error('Error parsing stopover coordinates:', e);
      }
    }

    // Clear existing markers and layers
    const existingMarkers = document.getElementsByClassName('mapboxgl-marker');
    while (existingMarkers[0]) {
      existingMarkers[0].remove();
    }

    // Remove all route layers and sources
    const layersToRemove = ['route', 'completed-route', 'completed-route-bg', 'remaining-route'];
    const sourcesToRemove = ['route', 'completed-route', 'remaining-route'];
    
    layersToRemove.forEach(layerId => {
      if (map.current?.getLayer(layerId)) {
        map.current.removeLayer(layerId);
      }
    });
    
    sourcesToRemove.forEach(sourceId => {
      if (map.current?.getSource(sourceId)) {
        map.current.removeSource(sourceId);
      }
    });

    // Add origin marker with enhanced styling
    const originEl = document.createElement('div');
    originEl.className = 'custom-marker';
    originEl.style.width = '36px';
    originEl.style.height = '36px';
    originEl.style.backgroundColor = '#10b981';
    originEl.style.borderRadius = '50%';
    originEl.style.border = '4px solid white';
    originEl.style.boxShadow = '0 4px 16px rgba(16, 185, 129, 0.5), 0 2px 8px rgba(0,0,0,0.2)';
    originEl.style.position = 'relative';
    originEl.style.transition = 'transform 0.3s ease';
    originEl.style.display = 'flex';
    originEl.style.alignItems = 'center';
    originEl.style.justifyContent = 'center';
    originEl.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
      </svg>
    `;

    new mapboxgl.Marker(originEl)
      .setLngLat(originCoords)
      .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<strong style="color: #10b981;">Origin</strong><br/>${senderAddress.split(',')[0]}`))
      .addTo(map.current);

    // Add stopover marker if stopover exists
    if (stopoverCoords) {
      const stopoverEl = document.createElement('div');
      stopoverEl.className = 'custom-marker';
      stopoverEl.style.width = '36px';
      stopoverEl.style.height = '36px';
      stopoverEl.style.backgroundColor = '#f59e0b';
      stopoverEl.style.borderRadius = '50%';
      stopoverEl.style.border = '4px solid white';
      stopoverEl.style.boxShadow = '0 4px 16px rgba(245, 158, 11, 0.5), 0 2px 8px rgba(0,0,0,0.2)';
      stopoverEl.style.transition = 'transform 0.3s ease';
      stopoverEl.style.display = 'flex';
      stopoverEl.style.alignItems = 'center';
      stopoverEl.style.justifyContent = 'center';
      stopoverEl.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <circle cx="12" cy="12" r="2"></circle>
        </svg>
      `;

      const stopoverLabel = trackingData.shipment.stopoverCity && trackingData.shipment.stopoverCountry
        ? `${trackingData.shipment.stopoverCity}, ${trackingData.shipment.stopoverCountry}`
        : 'Stopover Point';

      new mapboxgl.Marker(stopoverEl)
        .setLngLat(stopoverCoords)
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<strong style="color: #f59e0b;">Stopover</strong><br/>${stopoverLabel}`))
        .addTo(map.current);
    }

    // Add destination marker
    const destEl = document.createElement('div');
    destEl.className = 'custom-marker';
    const isDelivered = trackingData.shipment.status === 'delivered';
    destEl.style.width = '36px';
    destEl.style.height = '36px';
    destEl.style.backgroundColor = isDelivered ? '#10b981' : '#8b5cf6';
    destEl.style.borderRadius = '50%';
    destEl.style.border = '4px solid white';
    destEl.style.boxShadow = isDelivered 
      ? '0 4px 16px rgba(16, 185, 129, 0.5), 0 2px 8px rgba(0,0,0,0.2)' 
      : '0 4px 16px rgba(139, 92, 246, 0.5), 0 2px 8px rgba(0,0,0,0.2)';
    destEl.style.transition = 'transform 0.3s ease';
    destEl.style.display = 'flex';
    destEl.style.alignItems = 'center';
    destEl.style.justifyContent = 'center';
    destEl.innerHTML = isDelivered 
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>`;

    new mapboxgl.Marker(destEl)
      .setLngLat(destinationCoords)
      .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<strong style="color: ${isDelivered ? '#10b981' : '#8b5cf6'};">${isDelivered ? 'Delivered' : 'Destination'}</strong><br/>${recipientAddress.split(',')[0]}`))
      .addTo(map.current);

    // Add current location marker if available
    if (currentCoords && trackingData.shipment.status !== 'delivered') {
      const currentEl = document.createElement('div');
      currentEl.className = 'custom-marker pulse-marker';
      currentEl.style.width = '40px';
      currentEl.style.height = '40px';
      currentEl.style.backgroundColor = '#3b82f6';
      currentEl.style.borderRadius = '50%';
      currentEl.style.border = '4px solid white';
      currentEl.style.transition = 'transform 0.3s ease';
      currentEl.style.display = 'flex';
      currentEl.style.alignItems = 'center';
      currentEl.style.justifyContent = 'center';
      
      // Determine icon based on service type
      const serviceType = trackingData.shipment.serviceType;
      let iconSvg = '';
      
      if (serviceType === 'air') {
        // Plane icon
        iconSvg = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path>
          </svg>
        `;
      } else if (serviceType === 'sea') {
        // Ship icon
        iconSvg = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path>
            <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"></path>
            <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"></path>
            <path d="M12 10v4"></path>
            <path d="M12 2v3"></path>
          </svg>
        `;
      } else {
        // Truck icon (default for road transport)
        iconSvg = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="1" y="3" width="15" height="13"></rect>
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
            <circle cx="5.5" cy="18.5" r="2.5"></circle>
            <circle cx="18.5" cy="18.5" r="2.5"></circle>
          </svg>
        `;
      }
      
      currentEl.innerHTML = iconSvg;

      new mapboxgl.Marker(currentEl)
        .setLngLat(currentCoords)
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<strong style="color: #3b82f6;">Current Location</strong><br/>${currentLocation}`))
        .addTo(map.current);
    }

    // Draw route line with FedEx-style effects
    map.current.on('load', () => {
      if (!map.current) return;

      // Build route coordinates: origin → stopover (if exists) → current (if exists) → destination
      const routeCoordinates: [number, number][] = [originCoords];
      
      if (stopoverCoords) {
        routeCoordinates.push(stopoverCoords);
      }
      
      // Determine the current position in route
      let completedRouteCoords: [number, number][] = [originCoords];
      let remainingRouteCoords: [number, number][] = [];
      
      if (trackingData.shipment.status === 'delivered') {
        completedRouteCoords = routeCoordinates.concat([destinationCoords]);
      } else if (currentCoords) {
        completedRouteCoords.push(...(stopoverCoords ? [stopoverCoords] : []), currentCoords);
        remainingRouteCoords = [currentCoords, destinationCoords];
      } else {
        remainingRouteCoords = stopoverCoords 
          ? [originCoords, stopoverCoords, destinationCoords]
          : [originCoords, destinationCoords];
        completedRouteCoords = [originCoords];
      }

      // Add completed route (solid green line)
      if (completedRouteCoords.length > 1) {
        map.current.addSource('completed-route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: completedRouteCoords
            }
          }
        });

        // Background line (wider, darker)
        map.current.addLayer({
          id: 'completed-route-bg',
          type: 'line',
          source: 'completed-route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#065f46',
            'line-width': 6,
            'line-opacity': 0.4
          }
        });

        // Main line (green, solid)
        map.current.addLayer({
          id: 'completed-route',
          type: 'line',
          source: 'completed-route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#10b981',
            'line-width': 4
          }
        });
      }

      // Add remaining route (dashed blue/purple line)
      if (remainingRouteCoords.length > 1) {
        map.current.addSource('remaining-route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: remainingRouteCoords
            }
          }
        });

        // Animated dashed line
        map.current.addLayer({
          id: 'remaining-route',
          type: 'line',
          source: 'remaining-route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#8b5cf6',
            'line-width': 4,
            'line-dasharray': [2, 3],
            'line-opacity': 0.8
          }
        });

        // Animate the dashed line
        let dashOffset = 0;
        const animateDash = () => {
          if (!map.current || !map.current.getLayer('remaining-route')) return;
          
          dashOffset = (dashOffset + 0.1) % 5;
          map.current.setPaintProperty('remaining-route', 'line-dasharray', [2, 3]);
          
          requestAnimationFrame(animateDash);
        };
        animateDash();
      }

      // Full route outline for reference
      const allRouteCoords = [originCoords];
      if (stopoverCoords) allRouteCoords.push(stopoverCoords);
      allRouteCoords.push(destinationCoords);

      // Fit map to show all markers
      const bounds = new mapboxgl.LngLatBounds();
      allRouteCoords.forEach(coord => bounds.extend(coord as [number, number]));
      map.current.fitBounds(bounds, { padding: 80 });
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [trackingData]);

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;

    setIsLoading(true);
    setError('');
    setTrackingData(null);

    try {
      // Query Supabase directly for shipment data
      const { data: shipment, error: shipmentError } = await supabase
        .from('shipments')
        .select('*')
        .eq('tracking_number', trackingNumber.trim())
        .single();

      if (shipmentError || !shipment) {
        setError('Tracking number not found');
        toast({
          title: "Tracking failed",
          description: "Tracking number not found. Please check your tracking number and try again.",
          variant: "destructive",
        });
        return;
      }

      // Get tracking updates for this shipment
      const { data: updates, error: updatesError } = await supabase
        .from('tracking_updates')
        .select('*')
        .eq('shipment_id', shipment.id)
        .order('timestamp', { ascending: false });

      // Format the data to match the expected structure
      const trackingData = {
        shipment: {
          trackingNumber: shipment.tracking_number,
          senderName: shipment.sender_name,
          senderAddress: shipment.sender_address,
          senderPhone: shipment.sender_phone,
          recipientName: shipment.recipient_name,
          recipientAddress: shipment.recipient_address,
          recipientPhone: shipment.recipient_phone,
          serviceType: shipment.service_type,
          packageWeight: shipment.weight,
          status: shipment.status,
          estimatedDelivery: shipment.estimated_delivery,
          currentLocation: updates && updates.length > 0 ? updates[0].location : null,
          cost: shipment.cost,
          clearance_cost: shipment.clearance_cost,
          stopoverCountry: shipment.stopover_country,
          stopoverCity: shipment.stopover_city,
          stopoverCoordinates: shipment.stopover_coordinates
        },
        trackingUpdates: updates || []
      };

      setTrackingData(trackingData);
      toast({
        title: "Tracking information found",
        description: `Shipment ${trackingNumber} details loaded successfully`,
      });
    } catch (error) {
      console.error('Tracking error:', error);
      setError('Network error. Please try again.');
      toast({
        title: "Network error",
        description: "Please check your connection and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'picked_up': return 'bg-orange-500';
      case 'in_transit': return 'bg-blue-500';
      case 'stopover': return 'bg-cyan-500';
      case 'held_by_customs': return 'bg-amber-600';
      case 'out_for_delivery': return 'bg-purple-500';
      case 'delivered': return 'bg-green-500';
      case 'delayed': return 'bg-red-500';
      case 'failed_delivery': return 'bg-red-600';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'picked_up': return Package;
      case 'in_transit': return Truck;
      case 'held_by_customs': return AlertCircle;
      case 'out_for_delivery': return MapPin;
      case 'delivered': return CheckCircle;
      case 'delayed': return Clock;
      case 'failed_delivery': return Package;
      default: return Package;
    }
  };

  const faqItems = [
    {
      question: "What information do I need to track my package?",
      answer: "You only need your tracking number, which is typically 10-15 characters. Updates are available 24/7 and reflect real-time status."
    },
    {
      question: "How often is my tracking information updated?",
      answer: "Tracking information is updated in real-time as your package moves through our network. You'll see updates whenever there's a significant change in your shipment's status or location."
    },
    {
      question: "What should I do if my tracking isn't working?",
      answer: "Please verify your tracking number is correct and try again. If the issue persists, contact our customer support team for assistance."
    },
    {
      question: "Can I track multiple packages at once?",
      answer: "Currently, you can track one package at a time. For multiple shipments, please enter each tracking number separately."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <style>{printStyles}</style>
      <Header />

      {/* Navy Hero Section */}
      <div className="bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        {/* Animated Background Blobs */}
        <div className="pointer-events-none absolute -top-16 -right-24 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl motion-safe:animate-pulse"></div>
        <div className="pointer-events-none absolute -bottom-16 -left-24 h-48 w-48 rounded-full bg-purple-400/20 blur-3xl motion-safe:animate-pulse delay-1000"></div>
        <div className="pointer-events-none absolute top-1/2 left-1/4 h-32 w-32 rounded-full bg-cyan-400/20 blur-2xl motion-safe:animate-bounce delay-500"></div>
        {/* --- Airplane Effect --- */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`absolute airplane w-12 h-8 bg-white/50 rounded-full blur-sm ${
                i % 2 === 0 ? 'animate-fly-left' : 'animate-fly-right'
              }`}
              style={{
                top: `${Math.random() * 70}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 10 + 10}s`,
                animationDelay: `-${Math.random() * 20}s`,
              }}
            ></div>
          ))}
        </div>
        <style>{`
          @keyframes fly-left {
            0% { transform: translateX(-200%) rotate(-45deg); opacity: 0; }
            10% { transform: translateX(0%) rotate(-45deg); opacity: 1; }
            90% { transform: translateX(0%) rotate(-45deg); opacity: 1; }
            100% { transform: translateX(200%) rotate(-45deg); opacity: 0; }
          }
          @keyframes fly-right {
            0% { transform: translateX(200%) rotate(45deg); opacity: 0; }
            10% { transform: translateX(0%) rotate(45deg); opacity: 1; }
            90% { transform: translateX(0%) rotate(45deg); opacity: 1; }
            100% { transform: translateX(-200%) rotate(45deg); opacity: 0; }
          }
          .airplane {
            animation-timing-function: linear;
          }
          .animate-fly-left {
            animation-name: fly-left;
            animation-iteration-count: infinite;
          }
          .animate-fly-right {
            animation-name: fly-right;
            animation-iteration-count: infinite;
          }
        `}</style>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Track & Trace Your Shipment
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Real-time tracking for your packages, delivered with precision and care
            </p>

            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-primary-foreground/60">
              <span>Home</span>
              <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
              <span>Track & Trace Shipment</span>
            </div>
          </div>
        </div>

        {/* Curved bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" fill="none" className="w-full h-12">
            <path d="M0,0 C150,100 350,100 600,50 C850,0 1050,0 1200,50 L1200,120 L0,120 Z" fill="currentColor" className="text-background"/>
          </svg>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 lg:grid lg:grid-cols-12 lg:gap-8 lg:max-w-7xl xl:max-w-[1200px]">
        {/* Track Your Shipment Section - Left Column */}
        <div className="lg:col-span-5">
        <Card className="mb-8 lg:sticky lg:top-24">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold mb-2">
              Track Your Shipment
            </CardTitle>
            <CardDescription className="text-base leading-relaxed max-w-2xl mx-auto">
              Here's the fastest way to check the status of your shipment. No need to call Customer Service - our online results give you real-time, detailed progress as your shipment speeds through the Smartship network.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleTrackSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Tracking Number
                </label>
                <div className="sm:flex sm:items-center gap-3">
                  <div className="relative sm:flex-1">
                    <Input
                      type="text"
                      placeholder="Enter your tracking number"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      className="h-12 text-base pl-4 pr-12 border-2 border-border focus:border-primary transition-all duration-300 hover:shadow-md focus:shadow-lg"
                      data-testid="input-tracking-search"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="w-8 h-6 bg-muted border border-border rounded flex items-center justify-center">
                        <div className="grid grid-cols-3 gap-0.5">
                          {[...Array(9)].map((_, i) => (
                            <div key={i} className="w-0.5 h-0.5 bg-foreground/40 rounded-full"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isLoading || !trackingNumber.trim()}
                    className="w-full sm:w-auto h-12 px-6 text-base bg-primary hover:bg-primary/90 font-semibold transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 mt-3 sm:mt-0"
                    data-testid="button-track-search"
                  >
                    {isLoading ? (
                      <>
                        <Search className="w-4 h-4 mr-2 animate-spin" />
                        Tracking...
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" />
                        Track Shipment
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>

            {/* Tracking Tips */}
            <div className="bg-muted/30 rounded-lg p-4 border-l-4 border-primary">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground text-xs">®</span>
                </div>
                Tracking Tips
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Your tracking number can be found on your shipping confirmation email</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Tracking numbers typically contain a barcode - look for the package code on the left side of your shipping label</span>
                </li>
              </ul>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Status Overview Card - stays on left */}
        {trackingData && (
          <Card className="border-l-4 border-l-primary transition-all duration-300 hover:shadow-xl">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary/70 text-primary-foreground px-3 py-1 shadow-sm animate-pulse`}>
                        <div className={`w-2 h-2 rounded-full bg-white`}></div>
                        <span className="text-sm font-medium">
                          {trackingData.shipment.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mt-2">
                      Package Status
                    </h2>
                    <p className="text-muted-foreground">
                      Tracking #: <span className="font-mono font-semibold text-foreground">{trackingData.shipment.trackingNumber}</span>
                    </p>
                    {trackingData.shipment.currentLocation && (
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="font-medium">Last seen at: {trackingData.shipment.currentLocation}</span>
                      </div>
                    )}
                  </div>
                  {trackingData.shipment.estimatedDelivery && (
                    <div className="text-center md:text-right">
                      <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                      <p className="text-lg font-semibold text-foreground">
                        {formatSafeDate(trackingData.shipment.estimatedDelivery, 'EEE, MMM dd')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatSafeDate(trackingData.shipment.estimatedDelivery, 'yyyy')}
                      </p>
                    </div>
                  )}
                </div>

                {/* Visual Progress Indicator */}
                <div className="bg-muted/30 rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" />
                    Shipment Progress
                  </h3>

                  {/* Progress Steps */}
                  <div className="relative flex flex-wrap justify-between gap-2 sm:gap-0">
                    {[
                      { status: 'pending', label: 'Order\nReceived', icon: Clock },
                      { status: 'picked_up', label: 'Package\nPicked Up', icon: Package },
                      { status: 'in_transit', label: 'In\nTransit', icon: Truck },
                      { status: 'held_by_customs', label: 'Customs\nProcessing', icon: AlertCircle },
                      { status: 'out_for_delivery', label: 'Out for\nDelivery', icon: MapPin },
                      { status: 'delivered', label: 'Delivered', icon: CheckCircle }
                    ].map((step, index) => {
                      // Use service-specific icon for in_transit status
                      const getProgressIcon = (status: string) => {
                        if (status === 'in_transit') {
                          const serviceType = trackingData.shipment.serviceType;
                          if (serviceType === 'air') return Plane;
                          if (serviceType === 'sea') return Ship;
                          if (serviceType === 'road') return Truck;
                          return Truck;
                        }
                        return step.icon;
                      };

                      const StepIcon = getProgressIcon(step.status);
                      const currentStatus = trackingData.shipment.status;
                      const isActive = currentStatus === step.status;
                      const isCompleted = (() => {
                        const statuses = ['pending', 'picked_up', 'in_transit', 'held_by_customs', 'out_for_delivery', 'delivered'];
                        const currentIndex = statuses.indexOf(currentStatus);
                        const stepIndex = statuses.indexOf(step.status);
                        return currentIndex > stepIndex;
                      })();
                      const isPending = (() => {
                        const statuses = ['pending', 'picked_up', 'in_transit', 'held_by_customs', 'out_for_delivery', 'delivered'];
                        const currentIndex = statuses.indexOf(currentStatus);
                        const stepIndex = statuses.indexOf(step.status);
                        return currentIndex < stepIndex;
                      })();

                      return (
                        <div key={step.status} className={`flex flex-col items-center space-y-2 ${
                          step.status === 'held_by_customs' && isActive ? 'scale-105' : ''
                        }`}>
                          {/* Step Circle */}
                          <div className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                            isCompleted 
                              ? 'bg-green-500 border-green-500 text-white' 
                              : isActive 
                                ? step.status === 'held_by_customs'
                                  ? 'bg-amber-600 border-amber-600 text-white ring-4 ring-amber-600/20 shadow-lg'
                                  : 'bg-primary border-primary text-primary-foreground ring-4 ring-primary/20'
                                : isPending
                                  ? 'bg-muted border-border text-muted-foreground'
                                  : 'bg-muted border-border text-muted-foreground'
                          }`}>
                            <StepIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            {isCompleted && (
                              <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-3 bg-green-600 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                              </div>
                            )}
                            {step.status === 'held_by_customs' && isActive && (
                              <div className="absolute -top-2 -right-2 w-2 h-2 bg-amber-400 rounded-full animate-ping"></div>
                            )}
                          </div>

                          {/* Step Label */}
                          <div className="text-center">
                            <p className={`text-xs font-medium whitespace-pre-line ${
                              isActive 
                                ? step.status === 'held_by_customs' 
                                  ? 'text-amber-600 font-semibold' 
                                  : 'text-primary' 
                                : isCompleted 
                                  ? 'text-green-600' 
                                  : 'text-muted-foreground'
                            }`}>
                              {step.label}
                            </p>
                            {step.status === 'held_by_customs' && isActive && (
                              <p className="text-xs text-amber-600 font-medium mt-1">Clearance</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
        )}
        </div>

        {/* Right Column - Map and Updates */}
        <div className="lg:col-span-7">
        {trackingData && (
          <div className="space-y-8">
            {/* Shipment Route Map */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Shipment Route Map
                </CardTitle>
                <CardDescription>
                  Follow your package's complete journey from pickup to delivery
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="w-full">
                  {/* Map Container */}
                  <div className="relative w-full bg-gradient-to-br from-blue-50 to-cyan-50 overflow-hidden">
                    <div ref={mapContainer} className="relative bg-white shadow-inner w-full h-64 sm:h-80 md:h-96" />

                    {/* Route Summary */}
                    <div className="p-4 sm:p-6">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                        <div className="space-y-1">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-sm font-medium text-green-700">Origin</span>
                          </div>
                          <p className="text-xs text-muted-foreground break-words">
                            {trackingData.shipment.senderAddress?.split(',').slice(1).join(',').trim() || 'Sender Address'}
                          </p>
                        </div>

                        {trackingData.shipment.currentLocation && trackingData.shipment.status !== 'delivered' && (
                          <div className="space-y-1">
                            <div className="flex items-center justify-center gap-2">
                              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                              <span className="text-sm font-medium text-blue-700">Current</span>
                            </div>
                            <p className="text-xs text-muted-foreground">In Transit</p>
                          </div>
                        )}

                        <div className={`space-y-1 ${trackingData.shipment.currentLocation && trackingData.shipment.status !== 'delivered' ? 'col-span-2 md:col-span-1' : ''}`}>
                          <div className="flex items-center justify-center gap-2">
                            <div className={`w-3 h-3 ${trackingData.shipment.status === 'delivered' ? 'bg-green-500' : 'bg-purple-500'} rounded-full`}></div>
                            <span className={`text-sm font-medium ${trackingData.shipment.status === 'delivered' ? 'text-green-700' : 'text-purple-700'}`}>
                              {trackingData.shipment.status === 'delivered' ? 'Delivered' : 'Destination'}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground break-words">
                            {trackingData.shipment.recipientAddress?.split(',').slice(1).join(',').trim() || 'Recipient Address'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stopover Information Section - Only shown if stopover exists */}
            {(trackingData.shipment.stopoverCountry || trackingData.shipment.stopoverCity) && (
              <Card className="border-l-4 border-l-cyan-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-cyan-500" />
                    Stopover Point
                  </CardTitle>
                  <CardDescription>
                    Your shipment will pass through this intermediate location
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-cyan-50 dark:bg-cyan-950 rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {trackingData.shipment.stopoverCity && trackingData.shipment.stopoverCountry
                            ? `${trackingData.shipment.stopoverCity}, ${trackingData.shipment.stopoverCountry}`
                            : trackingData.shipment.stopoverCity || trackingData.shipment.stopoverCountry}
                        </h3>
                        <div className="space-y-2">
                          {trackingData.shipment.stopoverCity && (
                            <div className="flex items-center gap-2 text-sm">
                              <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                              <span className="text-muted-foreground">City:</span>
                              <span className="font-medium">{trackingData.shipment.stopoverCity}</span>
                            </div>
                          )}
                          {trackingData.shipment.stopoverCountry && (
                            <div className="flex items-center gap-2 text-sm">
                              <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                              <span className="text-muted-foreground">Country:</span>
                              <span className="font-medium">{trackingData.shipment.stopoverCountry}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-sm mt-3">
                            <Badge variant="outline" className="bg-cyan-100 text-cyan-700 border-cyan-300">
                              {trackingData.shipment.status === 'stopover' ? 'Currently at Stopover' : 'Stopover Planned'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-white dark:bg-gray-900 rounded-md border border-cyan-200 dark:border-cyan-800">
                      <p className="text-sm text-muted-foreground">
                        <strong>Note:</strong> Your shipment will be processed at this stopover location as part of its journey to the final destination.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tracking Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Complete Tracking Timeline
                </CardTitle>
                <CardDescription>
                  Follow your package's complete journey with detailed status updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Complete Process Timeline */}
                <div className="relative mb-8">
                  {/* Background Timeline line */}
                  <div className="absolute left-6 top-6 bottom-0 w-1 bg-border rounded-full"></div>

                  {/* Colored Progress line */}
                  <div 
                    className="absolute left-6 top-6 w-1 bg-gradient-to-b from-green-500 via-blue-500 to-primary rounded-full transition-all duration-1000 ease-in-out"
                    style={{
                      height: `${(() => {
                        const completeProcess = [
                          { status: 'pending' },
                          { status: 'picked_up' },
                          { status: 'in_transit' },
                          { status: 'held_by_customs' },
                          { status: 'out_for_delivery' },
                          { status: 'delivered' }
                        ];
                        const currentStatusIndex = completeProcess.findIndex(step => step.status === trackingData.shipment.status);
                        const progressPercentage = currentStatusIndex >= 0 ? ((currentStatusIndex + 1) / completeProcess.length) * 100 : 0;
                        return `${progressPercentage}%`;
                      })()}`
                    }}
                  ></div>

                  <div className="space-y-6">
                    {/* Generate complete process steps */}
                    {(() => {
                      const baseProcess = [
                        { status: 'pending', title: 'Order Created', description: 'Your shipping order has been created and is being processed', defaultTime: '2024-01-15 09:00 AM' },
                        { status: 'picked_up', title: 'Package Picked Up', description: 'Your package has been collected from the sender', defaultTime: '2024-01-15 02:30 PM' },
                        { status: 'in_transit', title: 'In Transit', description: 'Package is on its way to the destination', defaultTime: '2024-01-16 10:15 AM' }
                      ];
                      
                      // Add stopover step if stopover is configured
                      const hasStopover = trackingData.shipment.stopoverCountry && trackingData.shipment.stopoverCity;
                      if (hasStopover) {
                        baseProcess.push({
                          status: 'stopover',
                          title: 'Stopover Point',
                          description: `Package at stopover: ${trackingData.shipment.stopoverCity}, ${trackingData.shipment.stopoverCountry}`,
                          defaultTime: '2024-01-16 03:00 PM'
                        });
                      }
                      
                      // Add remaining steps
                      baseProcess.push(
                        { status: 'held_by_customs', title: 'Customs Processing', description: 'Package is being processed by customs officials for inspection', defaultTime: '2024-01-16 06:30 PM' },
                        { status: 'out_for_delivery', title: 'Out for Delivery', description: 'Package is out for delivery to the final destination', defaultTime: '2024-01-17 08:45 AM' },
                        { status: 'delivered', title: 'Delivered', description: 'Package has been successfully delivered', defaultTime: '2024-01-17 03:20 PM' }
                      );
                      
                      const completeProcess = baseProcess;

                      // Map status to icon based on service type for in_transit
                      const getSpecificIcon = (status: string) => {
                        if (status === 'in_transit') {
                          const serviceType = trackingData.shipment.serviceType;
                          if (serviceType === 'air') return Plane;
                          if (serviceType === 'sea') return Ship;
                          if (serviceType === 'road') return Truck;
                          return Truck; // default to truck
                        }

                        switch (status) {
                          case 'pending': return Clock;
                          case 'picked_up': return Package;
                          case 'stopover': return MapPin;
                          case 'held_by_customs': return AlertCircle;
                          case 'out_for_delivery': return MapPin;
                          case 'delivered': return CheckCircle;
                          default: return Package;
                        }
                      };

                      const currentStatusIndex = completeProcess.findIndex(step => step.status === trackingData.shipment.status);

                      return completeProcess.map((step, index) => {
                        const StatusIcon = getSpecificIcon(step.status);
                        const isCompleted = index <= currentStatusIndex;
                        const isActive = index === currentStatusIndex;
                        const isPending = index > currentStatusIndex;

                        // Find actual update for this status
                        const actualUpdate = trackingData.trackingUpdates.find((update: any) => update.status === step.status);

                        return (
                          <div 
                            key={step.status} 
                            className={`relative flex items-start gap-6 ${isActive ? 'pb-4' : ''}`}
                          >
                            {/* Status Icon - Clean design without check marks */}
                            <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                              isCompleted 
                                ? 'bg-white border-primary shadow-lg' 
                                : isPending 
                                  ? 'bg-muted border-border' 
                                  : 'bg-white border-border shadow-lg'
                            } ${isActive ? 'ring-4 ring-primary/20 scale-110' : ''}`}>
                              <StatusIcon className={`w-6 h-6 ${isCompleted ? 'text-primary' : isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                            </div>

                            {/* Content */}
                            <div className={`flex-1 min-w-0 ${isActive ? 'bg-primary/5 rounded-lg p-4' : 'pt-2'}`}>
                              <div className="flex items-start justify-between gap-4 mb-2">
                                <div>
                                  <h3 className={`font-semibold flex items-center gap-2 ${
                                    isActive ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-muted-foreground'
                                  }`}>
                                    {step.title}
                                    {isActive && <Badge variant="default" className="text-xs">CURRENT</Badge>}
                                    {isCompleted && index < currentStatusIndex && <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">COMPLETED</Badge>}
                                    {isPending && <Badge variant="outline" className="text-xs">PENDING</Badge>}
                                  </h3>
                                  <div className="flex items-center gap-2 mt-1">
                                    <MapPin className="w-4 h-4 text-primary" />
                                    <span className={`font-medium ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                                      {actualUpdate ? actualUpdate.location : 'Processing Location'}
                                    </span>
                                  </div>
                                </div>
                                <div className="text-right text-sm text-muted-foreground">
                                  <div className="font-medium">
                                    {actualUpdate 
                                      ? formatSafeDate(actualUpdate.timestamp, 'MMM dd, yyyy')
                                      : isPending ? 'Pending' : formatSafeDate(step.defaultTime, 'MMM dd, yyyy')
                                    }
                                  </div>
                                  <div>
                                    {actualUpdate && actualUpdate.timestamp
                                      ? (() => {
                                          try {
                                            const date = new Date(actualUpdate.timestamp);
                                            return isValid(date) ? format(date, 'h:mm a') : '--:--';
                                          } catch {
                                            return '--:--';
                                          }
                                        })()
                                      : isPending ? '--:--' : (() => {
                                          try {
                                            const date = new Date(step.defaultTime);
                                            return isValid(date) ? format(date, 'h:mm a') : '--:--';
                                          } catch {
                                            return '--:--';
                                          }
                                        })()
                                    }
                                  </div>
                                </div>
                              </div>
                              <p className={`text-sm leading-relaxed ${isCompleted ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>
                                {actualUpdate ? actualUpdate.description || step.description : step.description}
                              </p>

                              {/* Progress indicator */}
                              <div className="mt-3 flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${isCompleted ? 'bg-green-500' : isPending ? 'bg-gray-300' : 'bg-primary'}`}></div>
                                <span className={`text-xs font-medium ${
                                  isActive ? 'text-primary' : isCompleted ? 'text-green-600' : 'text-muted-foreground'
                                }`}>
                                  {isCompleted && index < currentStatusIndex ? 'Completed' : isActive ? 'In Progress' : 'Awaiting'}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>

                {/* Additional Updates */}
                {trackingData.trackingUpdates.length > 0 && (
                  <div className="border-t pt-6">
                    <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      Additional Updates
                    </h4>
                    <div className="space-y-4">
                      {trackingData.trackingUpdates
                        .filter((update: any) => !['pending', 'picked_up', 'in_transit', 'held_by_customs', 'out_for_delivery', 'delivered'].includes(update.status))
                        .map((update: any, index: number) => {
                          const StatusIcon = getStatusIcon(update.status);
                          return (
                            <div key={update.id} className="flex items-start gap-4 p-3 bg-muted/30 rounded-lg">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(update.status)}`}>
                                <StatusIcon className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between gap-4">
                                  <div>
                                    <h5 className="font-medium text-foreground">
                                      {update.status.replace('_', ' ').toUpperCase()}
                                    </h5>
                                    <div className="flex items-center gap-2 mt-1">
                                      <MapPin className="w-3 h-3 text-primary" />
                                      <span className="text-sm text-foreground">{update.location}</span>
                                    </div>
                                  </div>
                                  <div className="text-right text-xs text-muted-foreground">
                                    <div>{formatSafeDate(update.timestamp, 'MMM dd, yyyy')}</div>
                                    <div>
                                      {(() => {
                                        try {
                                          const date = new Date(update.timestamp);
                                          return isValid(date) ? format(date, 'h:mm a') : '--:--';
                                        } catch {
                                          return '--:--';
                                        }
                                      })()}
                                    </div>
                                  </div>
                                </div>
                                {update.description && (
                                  <p className="text-sm text-muted-foreground mt-2">{update.description}</p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Parcel Information */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-primary" />
                      Parcel Information
                    </CardTitle>
                    <CardDescription>
                      Detailed information about your shipment package
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={() => setIsPrintModalOpen(true)} 
                    variant="outline" 
                    size="sm"
                    className="no-print"
                  >
                    <Printer className="w-4 h-4 mr-2" />
                    Print Invoice
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Package Details */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground border-b pb-2">Package Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Tracking Number:</span>
                        <span className="font-mono font-medium">{trackingData.shipment.trackingNumber}</span>
                      </div>
                      {trackingData.shipment.packageWeight && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Weight:</span>
                          <span className="font-medium">{trackingData.shipment.packageWeight} kg</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Service Type:</span>
                        <Badge variant="outline">{trackingData.shipment.serviceType} Freight</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Current Status:</span>
                        <Badge className={`${getStatusColor(trackingData.shipment.status)} text-white`}>
                          {trackingData.shipment.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground border-b pb-2">Shipping Information</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-muted-foreground block">From:</span>
                        <div className="font-medium">{trackingData.shipment.senderName}</div>
                        <div className="text-sm text-muted-foreground">{trackingData.shipment.senderAddress || 'Sender Address'}</div>
                        {trackingData.shipment.senderPhone && (
                          <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <Phone className="w-3 h-3" />
                            {trackingData.shipment.senderPhone}
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground block">To:</span>
                        <div className="font-medium">{trackingData.shipment.recipientName}</div>
                        <div className="text-sm text-muted-foreground">{trackingData.shipment.recipientAddress || 'Recipient Address'}</div>
                        {trackingData.shipment.recipientPhone && (
                          <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <Phone className="w-3 h-3" />
                            {trackingData.shipment.recipientPhone}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Information */}
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold text-foreground mb-4">Delivery Information</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {trackingData.shipment.estimatedDelivery && (
                      <div className="text-center p-4 bg-primary/5 rounded-lg border">
                        <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
                        <div className="text-sm text-muted-foreground">Estimated Delivery</div>
                        <div className="font-semibold text-primary">
                          {formatSafeDate(trackingData.shipment.estimatedDelivery, 'EEE, MMM dd, yyyy')}
                        </div>
                      </div>
                    )}

                    {trackingData.shipment.currentLocation && (
                      <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <MapPin className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <div className="text-sm text-muted-foreground">Current Location</div>
                        <div className="font-semibold text-blue-600">{trackingData.shipment.currentLocation}</div>
                      </div>
                    )}

                    <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                      <Truck className="w-6 h-6 text-green-600 mx-auto mb-2" />
                      <div className="text-sm text-muted-foreground">Delivery Method</div>
                      <div className="font-semibold text-green-600">Ground Delivery</div>
                    </div>
                  </div>
                </div>

                {/* Special Instructions */}
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-1">Delivery Instructions</h4>
                      <p className="text-sm text-yellow-700">
                        Please ensure someone is available to receive the package during delivery hours (9 AM - 6 PM). 
                        If no one is available, the package will be held at the nearest pickup location.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Print Invoice Section - Hidden on screen, shown when printing */}
            <div id="print-receipt-container" style={{ display: 'none' }}>
              <div className="print-content" style={{ padding: '30px', fontFamily: 'Arial, sans-serif', fontSize: '11pt', lineHeight: '1.5', color: '#000', backgroundColor: '#fff' }}>

                {/* Header with Tracking Number */}
                <div style={{ textAlign: 'center', marginBottom: '20px', position: 'relative' }}>
                  <div style={{ fontSize: '8pt', color: '#999', letterSpacing: '2px', marginBottom: '10px' }}>
                    <div style={{ transform: 'rotate(-45deg)', position: 'absolute', top: '20px', right: '50px', fontSize: '60pt', opacity: '0.08', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                      True Copy
                    </div>
                  </div>
                  <h2 style={{ margin: '0 0 5px 0', fontSize: '14pt', fontWeight: 'normal' }}>Tracking Number: <strong style={{ fontSize: '16pt' }}>{trackingData.shipment.trackingNumber}</strong></h2>
                </div>

                {/* Company Info Section */}
                <div style={{ textAlign: 'center', marginBottom: '30px', borderBottom: '2px solid #000', paddingBottom: '15px' }}>
                  <div style={{ fontSize: '14pt', fontWeight: 'bold', marginBottom: '8px' }}>
                    CMC Logistics Company
                  </div>
                  <div style={{ fontSize: '10pt', lineHeight: '1.6' }}>
                    <div>Address: Canada, USA, UK, Asia and Europe</div>
                    <div>Email: support@chidimikecarlogistics.live</div>
                    <div>Company Website: http://chidimikecarlogistics.live</div>
                  </div>
                </div>

                {/* Sender and Recipient Section with Order Details */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 250px', gap: '20px', marginBottom: '20px' }}>
                  {/* Left: Sender and Recipient */}
                  <div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                      {/* FROM (SENDER) */}
                      <div>
                        <div style={{ fontWeight: 'bold', fontSize: '11pt', marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>
                          FROM (SENDER)
                        </div>
                        <div style={{ fontSize: '10pt', lineHeight: '1.7' }}>
                          <div style={{ fontWeight: 'bold' }}>{trackingData.shipment.senderName}</div>
                          <div>Address: {trackingData.shipment.senderAddress}</div>
                          {trackingData.shipment.senderPhone && (
                            <div>Phone: {trackingData.shipment.senderPhone}</div>
                          )}
                          <div style={{ marginTop: '8px' }}>Origin Office: {trackingData.shipment.senderAddress.split(',').slice(-2).join(',').trim()}</div>
                        </div>
                      </div>

                      {/* TO (CONSIGNEE) */}
                      <div>
                        <div style={{ fontWeight: 'bold', fontSize: '11pt', marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>
                          TO (CONSIGNEE)
                        </div>
                        <div style={{ fontSize: '10pt', lineHeight: '1.7' }}>
                          <div style={{ fontWeight: 'bold' }}>{trackingData.shipment.recipientName}</div>
                          {trackingData.shipment.recipientPhone && (
                            <div>Phone: {trackingData.shipment.recipientPhone}</div>
                          )}
                          <div>Address: {trackingData.shipment.recipientAddress}</div>
                          <div style={{ marginTop: '8px' }}>Destination Office: {trackingData.shipment.recipientAddress.split(',').slice(-2).join(',').trim()}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Order Details Box */}
                  <div style={{ border: '2px solid #000', padding: '15px', backgroundColor: '#f9f9f9', fontSize: '9pt' }}>
                    <div style={{ marginBottom: '8px' }}>
                      <div style={{ color: '#666' }}>Order ID:</div>
                      <div style={{ fontWeight: 'bold', fontSize: '10pt' }}>--</div>
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                      <div style={{ color: '#666' }}>Booking Mode:</div>
                      <div style={{ fontWeight: 'bold' }}>To Pay</div>
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                      <div style={{ color: '#666' }}>Shipment Cost:</div>
                      <div style={{ fontWeight: 'bold', fontSize: '11pt' }}>USD {trackingData.shipment.cost || '--'}</div>
                    </div>
                    <div>
                      <div style={{ color: '#666' }}>Tracking Number:</div>
                      <div style={{ fontWeight: 'bold', fontFamily: 'monospace', fontSize: '9pt' }}>{trackingData.shipment.trackingNumber}</div>
                    </div>
                  </div>
                </div>

                {/* Shipment Details Table */}
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', fontSize: '10pt' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f0f0f0', borderTop: '2px solid #000', borderBottom: '2px solid #000' }}>
                      <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ccc', width: '60px' }}>Qty</th>
                      <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ccc', width: '100px' }}>Product</th>
                      <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ccc', width: '100px' }}>Status</th>
                      <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ccc' }}>Description</th>
                      <th style={{ padding: '10px', textAlign: 'right', border: '1px solid #ccc', width: '100px' }}>Shipping Cost</th>
                      <th style={{ padding: '10px', textAlign: 'right', border: '1px solid #ccc', width: '100px' }}>Clearance Cost</th>
                      <th style={{ padding: '10px', textAlign: 'right', border: '1px solid #ccc', width: '100px' }}>Total Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '12px', border: '1px solid #ccc', textAlign: 'center', verticalAlign: 'top' }}>1</td>
                      <td style={{ padding: '12px', border: '1px solid #ccc', verticalAlign: 'top' }}>Parcel</td>
                      <td style={{ padding: '12px', border: '1px solid #ccc', verticalAlign: 'top' }}>
                        <span style={{ display: 'inline-block', padding: '4px 8px', backgroundColor: '#e3f2fd', border: '1px solid #2196f3', borderRadius: '4px', fontSize: '9pt', fontWeight: 'bold' }}>
                          {trackingData.shipment.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #ccc', verticalAlign: 'top', fontSize: '9pt', lineHeight: '1.6' }}>
                        <div><strong>Service:</strong> {trackingData.shipment.serviceType ? trackingData.shipment.serviceType.charAt(0).toUpperCase() + trackingData.shipment.serviceType.slice(1) : 'Standard'} Freight</div>
                        {trackingData.shipment.packageWeight && (
                          <div><strong>Weight:</strong> {trackingData.shipment.packageWeight} kg</div>
                        )}
                        {trackingData.shipment.estimatedDelivery && (
                          <div><strong>Est. Delivery:</strong> {formatSafeDate(trackingData.shipment.estimatedDelivery, 'MMM dd, yyyy')}</div>
                        )}
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #ccc', textAlign: 'right', verticalAlign: 'top', fontWeight: 'bold' }}>
                        USD {trackingData.shipment.cost || '--'}
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #ccc', textAlign: 'right', verticalAlign: 'top' }}>
                        USD --
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #ccc', textAlign: 'right', verticalAlign: 'top', fontWeight: 'bold', fontSize: '11pt' }}>
                        USD {trackingData.shipment.cost || '--'}
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Payment Methods and Stamp Section */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '30px', borderTop: '1px solid #ddd', paddingTop: '20px' }}>
                  {/* Payment Methods */}
                  <div style={{ fontSize: '9pt' }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Payment Methods:</div>
                    <div style={{ lineHeight: '1.8', color: '#555' }}>
                      For your convenience we have<br />
                      CMC Logistics several<br />
                      payment reliable, fast, secure.
                    </div>
                  </div>

                  {/* Official Stamp */}
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '9pt', marginBottom: '10px' }}>
                      Official Stamp/{new Date().toDateString()}
                    </div>
                    <div style={{ width: '120px', height: '120px', border: '2px dashed #999', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', backgroundColor: '#fafafa' }}>
                      <div style={{ fontSize: '8pt', color: '#999', textAlign: 'center' }}>
                        OFFICIAL<br />STAMP<br />AREA
                      </div>
                    </div>
                  </div>

                  {/* Stamp Duty */}
                  <div style={{ fontSize: '9pt', textAlign: 'right' }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Stamp Duty:</div>
                    <div style={{ fontSize: '18pt', fontWeight: 'bold', marginTop: '15px', color: '#333' }}>
                      Amount Due
                    </div>
                  </div>
                </div>

                {/* Cost Breakdown Footer */}
                <div style={{ borderTop: '3px double #000', paddingTop: '20px', marginTop: '30px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', textAlign: 'center', fontSize: '12pt' }}>
                    <div>
                      <div style={{ color: '#666', fontSize: '9pt', marginBottom: '5px' }}>SHIPPING COST:</div>
                      <div style={{ fontWeight: 'bold', fontSize: '14pt' }}>USD {trackingData.shipment.cost || '--'}</div>
                    </div>
                    <div>
                      <div style={{ color: '#666', fontSize: '9pt', marginBottom: '5px' }}>CLEARANCE COST:</div>
                      <div style={{ fontWeight: 'bold', fontSize: '14pt' }}>USD --</div>
                    </div>
                    <div>
                      <div style={{ color: '#666', fontSize: '9pt', marginBottom: '5px' }}>TOTAL AMOUNT:</div>
                      <div style={{ fontWeight: 'bold', fontSize: '14pt', color: '#000' }}>USD {trackingData.shipment.cost || '--'}</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* Tracking Features Section */}
        {!trackingData && !isLoading && (
          <div className="space-y-12">
            {/* Features Section */}
            <div className="text-center">
              <span className="text-sm font-semibold text-primary uppercase tracking-wide mb-2 block">
                TRACKING FEATURES
              </span>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Real-Time Tracking Benefits
              </h2>
              <p className="text-lg text-muted-foreground mb-12">
                Monitor your shipments with precision and confidence using our advanced tracking system
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Real-Time Updates */}
                <Card className="text-center p-6 shadow-lg">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Real-Time Updates</h3>
                  <p className="text-muted-foreground">
                    Stay informed with accurate, up-to-the-minute information about your shipment's location and status throughout its journey.
                  </p>
                </Card>

                {/* Estimated Delivery */}
                <Card className="text-center p-6 shadow-lg">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Estimated Delivery</h3>
                  <p className="text-muted-foreground">
                    Get precise delivery time estimates that help you plan and prepare for your shipment's arrival with confidence.
                  </p>
                </Card>

                {/* Shipment History */}
                <Card className="text-center p-6 shadow-lg">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Shipment History</h3>
                  <p className="text-muted-foreground">
                    Access a detailed timeline of your package's journey, including all transit points and handling activities along the route.
                  </p>
                </Card>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <span className="text-sm font-semibold text-primary uppercase tracking-wide mb-2 block">
                  HELP CENTER
                </span>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-muted-foreground">
                  Find answers to common tracking and shipping questions
                </p>
              </div>

              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <Card key={index} className="border">
                    <CardContent className="p-0">
                      <button
                        className="w-full text-left p-6 flex items-center justify-between hover:bg-muted transition-colors"
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      >
                        <span className="font-semibold text-foreground">{item.question}</span>
                        {expandedFaq === index ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </button>
                      {expandedFaq === index && (
                        <div className="px-6 pb-6">
                          <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Contact Help Section */}
            <div className="bg-primary text-primary-foreground rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">
                Need Additional Help With Your Shipment?
              </h2>
              <p className="text-primary-foreground/80 mb-8 text-lg">
                Our customer service team is available to assist you with any questions or concerns about your shipment.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-background text-foreground hover:bg-muted px-8 py-3"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Support
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-3"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Us
                </Button>
              </div>
            </div>
          </div>
        )}
        </div>
      </main>

      <Footer />

      {/* Print Invoice Modal */}
      {trackingData?.shipment && (
        <PrintInvoiceModal
          isOpen={isPrintModalOpen}
          onClose={() => setIsPrintModalOpen(false)}
          shipment={trackingData.shipment}
        />
      )}
    </div>
  );
}

function Label({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={className}>{children}</div>;
}