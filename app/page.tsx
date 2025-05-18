'use client';
import { Box, Button, colors, Typography } from '@mui/material';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import Sidebar from './components/sidebar';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX;

export default function Home() {
	const mapContainer = useRef(null);
	const map = useRef<mapboxgl.Map | null>(null);
	const [waypoints, setWaypoints] = useState<Waypoint[]>([]);
	const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);
	const [isEditMode, setIsEditMode] = useState(false);
	const [currentRouteId, setCurrentRouteId] = useState<string | null>(null);
	const [routes, setRoutes] = useState<Route[]>([]);

	const updateRouteWaypoints = (routeId: string, updatedWaypoints: Waypoint[]) => {
		setRoutes((currentRoutes) => currentRoutes.map((route) => (route.id === routeId ? { ...route, waypoints: updatedWaypoints } : route)));
		console.log(`Updated waypoints for route ${routeId}:`, updatedWaypoints);
	};

	const displayRoute = (route: Route, isEditing = false): void => {
		if (!map.current) return;

		setIsEditMode(isEditing);
		setCurrentRouteId(isEditing ? route.id : null);
		markers.forEach((marker) => marker.remove());
		setMarkers([]);
		setWaypoints(route.waypoints);

		const newMarkers = route.waypoints.map((waypoint) => {
			const marker = new mapboxgl.Marker({
				draggable: isEditing,
				color: isEditing ? '#FF6347' : '#FF0000'
			})
				.setLngLat([waypoint.lng, waypoint.lat])
				.addTo(map.current!);

			(marker as any)._waypointId = waypoint.id;

			if (isEditing) {
				marker.on('dragend', () => {
					const lngLat = marker.getLngLat();
					const waypointId = (marker as any)._waypointId;

					console.log('Dragging waypoint ID:', waypointId);

					setWaypoints((currentWaypoints) => {
						const updatedWaypoints = currentWaypoints.map((wp) =>
							wp.id === waypointId ? { ...wp, lng: lngLat.lng, lat: lngLat.lat } : wp
						);

						if (isEditing && currentRouteId) {
							console.log('Calling updateRouteWaypoints from drag handler');
							updateRouteWaypoints(currentRouteId, updatedWaypoints);
						}

						fetchRoute(updatedWaypoints);
						return updatedWaypoints;
					});
				});
			}

			return marker;
		});

		setMarkers(newMarkers);
		fetchRoute(route.waypoints);
		const bounds = new mapboxgl.LngLatBounds();
		route.waypoints.forEach((point) => {
			bounds.extend([point.lng, point.lat]);
		});

		map.current.fitBounds(bounds, { padding: 50, maxZoom: 15 });
	};

	const fetchRoute = async (points: Waypoint[]): Promise<void> => {
		if (points.length < 2) return;

		const lineStringGeometry: RouteGeometry = {
			type: 'LineString',
			coordinates: points.map((point) => [point.lng, point.lat])
		};

		drawRoute(lineStringGeometry);
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
		console.log('waypoints:', waypoints);
	}, [waypoints]);

	useEffect(() => {
		import('../data.json')
			.then((data) => {
				setRoutes(data.routes);
			})
			.catch((error) => {
				console.error('Failed to load routes:', error);
			});
	}, []);

	useEffect(() => {
		if (map.current) return;

		if (mapContainer.current) {
			map.current = new mapboxgl.Map({
				container: mapContainer.current,
				style: 'mapbox://styles/mapbox/streets-v12',
				center: [-1.15, 46.16],
				zoom: 9
			});

			map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

			map.current.on('click', (e) => {
				if (!isEditMode) {
					const newWaypoint = {
						id: Date.now(),
						lng: e.lngLat.lng,
						lat: e.lngLat.lat
					};

					const marker = new mapboxgl.Marker({ draggable: true, color: '#FF0000' })
						.setLngLat([newWaypoint.lng, newWaypoint.lat])
						.addTo(map.current!);

					(marker as any)._waypointId = newWaypoint.id;
					console.log('Marker created with waypoint ID:', newWaypoint.id);

					marker.on('dragend', () => {
						const lngLat = marker.getLngLat();
						const waypointId = (marker as any)._waypointId;

						console.log('Dragging waypoint ID:', waypointId);
						console.log('Current waypoints:', waypoints);

						setWaypoints((currentWaypoints) => {
							const updatedWaypoints = currentWaypoints.map((wp) =>
								wp.id === waypointId ? { ...wp, lng: lngLat.lng, lat: lngLat.lat } : wp
							);

							console.log('Updated waypoints:', updatedWaypoints);
							fetchRoute(updatedWaypoints);
							return updatedWaypoints;
						});
					});

					setWaypoints((prevWaypoints) => {
						const newWaypoints = [...prevWaypoints, newWaypoint];
						fetchRoute(newWaypoints);
						return newWaypoints;
					});

					setMarkers((prevMarkers) => [...prevMarkers, marker]);
				}
			});
		}

		return () => map.current?.remove();
	}, [isEditMode]);

	return (
		<Box id='container' sx={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
			<Box id='map' ref={mapContainer} sx={{ borderRadius: '8px', flex: 1 }} />
			<Sidebar
				routes={routes}
				onSelectRoute={(route) => displayRoute(route, false)}
				onEditRoute={(route) => displayRoute(route, true)}
				onAddRoute={(route) => {
					setRoutes((current) => [...current, route]);
					displayRoute(route, false);
				}}
				onUpdateRouteWaypoints={updateRouteWaypoints}
			/>
		</Box>
	);
}
