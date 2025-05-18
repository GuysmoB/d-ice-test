'use client';
import { Box, Button, colors, Typography } from '@mui/material';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import Sidebar from './components/sidebar';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX;

export default function Home() {
	const mapContainer = useRef(null);
	const map = useRef<mapboxgl.Map | null>(null);
	const [waypoints, setWaypoints] = useState<Waypoint[]>([]);

	const fetchRoute = async (points: Waypoint[]): Promise<void> => {
		if (points.length < 2) return;

		const coordinates: string = points.map((point) => `${point.lng},${point.lat}`).join(';');
		const url: string = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

		try {
			const response: Response = await fetch(url);
			const data: MapboxDirectionsResponse = await response.json();

			if (data.routes && data.routes.length > 0) {
				drawRoute(data.routes[0].geometry);
			}
		} catch (error) {
			console.error('Error fetching route:', error);
		}
	};

	const drawRoute = (geometry: RouteGeometry): void => {
		if (map.current && map.current.getSource('route')) {
			const routeSource = map.current.getSource('route') as mapboxgl.GeoJSONSource;
			routeSource.setData({
				type: 'Feature',
				properties: {},
				geometry
			} as RouteFeature);
		} else if (map.current) {
			map.current.addSource('route', {
				type: 'geojson',
				data: {
					type: 'Feature',
					properties: {},
					geometry
				} as RouteFeature
			});

			map.current.addLayer({
				id: 'route',
				type: 'line',
				source: 'route',
				layout: {
					'line-join': 'round',
					'line-cap': 'round'
				},
				paint: {
					'line-color': '#3887be',
					'line-width': 5,
					'line-opacity': 0.75
				}
			});
		}
	};

	useEffect(() => {
		console.log('mapboxgl.accessToken:', mapboxgl.accessToken);
	}, [mapboxgl.accessToken]);

	useEffect(() => {
		if (map.current) return; // Initialize map only once

		if (mapContainer.current) {
			map.current = new mapboxgl.Map({
				container: mapContainer.current,
				style: 'mapbox://styles/mapbox/streets-v12',
				center: [-1.15, 46.16], // La Rochelle, French west coast
				zoom: 9
			});

			// Add navigation controls
			map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

			// Add click listener to add waypoints
			map.current.on('click', (e) => {
				const newWaypoint = {
					id: Date.now(),
					lng: e.lngLat.lng,
					lat: e.lngLat.lat
				};

				// Add a marker for the waypoint
				const marker = new mapboxgl.Marker({ draggable: true }).setLngLat([newWaypoint.lng, newWaypoint.lat]);

				// If we have at least two waypoints, draw a route
				if (waypoints.length > 0) {
					// fetchRoute([...waypoints, newWaypoint]);
					console.log('Would fetch route with:', [...waypoints, newWaypoint]);
				}

				setWaypoints((prev) => [...prev, { ...newWaypoint, marker }]);

				// If we have at least two waypoints, draw a route
				if (waypoints.length > 0) {
					fetchRoute([...waypoints, newWaypoint]);
				}
			});

			return () => map.current?.remove();
		}
	}, []);

	return (
		<Box id='container' sx={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
			<Box id='map' ref={mapContainer} sx={{ borderRadius: '8px', flex: 1 }} />
			<Sidebar />
		</Box>
	);
}
