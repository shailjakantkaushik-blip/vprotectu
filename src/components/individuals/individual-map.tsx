import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";

const Map = dynamic(() => import("react-map-gl"), { ssr: false });

interface ScanLocation {
  latitude: number;
  longitude: number;
  scanned_at: string;
}

interface IndividualMapProps {
  individualId: string;
  guardianLocation: { latitude: number; longitude: number };
}

export default function IndividualMap({ individualId, guardianLocation }: IndividualMapProps) {
  const [scanLocation, setScanLocation] = useState<ScanLocation | null>(null);

  useEffect(() => {
    async function fetchLatestScan() {
      const supabase = supabaseBrowser();
      const { data, error } = await supabase
        .from("scans")
        .select("latitude, longitude, scanned_at")
        .eq("individual_id", individualId)
        .order("scanned_at", { ascending: false })
        .limit(1)
        .single();
      if (data) setScanLocation({
        latitude: Number(data.latitude),
        longitude: Number(data.longitude),
        scanned_at: String(data.scanned_at),
      });
    }
    fetchLatestScan();
  }, [individualId]);

  if (!scanLocation || !guardianLocation) return <div>Loading map...</div>;

  // Mapbox Directions API or similar can be used for directions
  return (
    <Map
      initialViewState={{
        longitude: scanLocation.longitude,
        latitude: scanLocation.latitude,
        zoom: 13,
      }}
      style={{ width: "100%", height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
    >
      {/* Add markers for scanLocation and guardianLocation */}
    </Map>
  );
}
