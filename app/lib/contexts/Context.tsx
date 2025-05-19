'use client';

import { createContext, FC, useContext, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

interface IProps {
	children: React.ReactNode;
}

type IGlobal = {
	routes: Route[];
	setRoutes: React.Dispatch<React.SetStateAction<Route[]>>;
	waypoints: Waypoint[];
	setWaypoints: React.Dispatch<React.SetStateAction<Waypoint[]>>;
	markersRef: React.MutableRefObject<Map<number, mapboxgl.Marker>>;
	isEditMode: boolean;
	setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
	currentRoute: Route | null;
	setCurrentRoute: React.Dispatch<React.SetStateAction<Route | null>>;
	updateRouteWaypoints: (route: Route, updatedWaypoints: Waypoint[]) => void;
	fetchRoute: (points: Waypoint[]) => Promise<void>;
	drawRoute: (geometry: RouteGeometry) => void;
	displayRoute: (waypoints: Waypoint[], isEditing?: boolean) => void;
	removeMarker: (waypointId: number) => void;
	cleanMap: () => void;
	clearMarkers: () => void;
	map: React.MutableRefObject<mapboxgl.Map | null>;
	mapContainer: React.MutableRefObject<HTMLDivElement | null>;
};

const Context = createContext<IGlobal | undefined>(undefined);

export const GlobalContext: FC<IProps> = ({ children }) => {
	const [waypoints, setWaypoints] = useState<Waypoint[]>([]);
	const [isEditMode, setIsEditMode] = useState(false);
	const markersRef = useRef<Map<number, mapboxgl.Marker>>(new Map());

	const [currentRoute, setCurrentRoute] = useState<Route | null>(null);
	const [routes, setRoutes] = useState<Route[]>([]);
	const map = useRef<mapboxgl.Map | null>(null);
	const mapContainer = useRef(null);

	const clearMarkers = () => {
		markersRef.current.forEach((marker) => marker.remove());
		markersRef.current.clear();
	};

	const addMarker = (waypoint: Waypoint, isDraggable = false) => {
		if (!map.current) return;

		if (markersRef.current.has(waypoint.id)) {
			markersRef.current.get(waypoint.id)?.remove();
		}

		const marker = new mapboxgl.Marker({
			draggable: isDraggable,
			color: isDraggable ? '#FF6347' : '#FF0000'
		})
			.setLngLat([waypoint.lng, waypoint.lat])
			.addTo(map.current);

		(marker as any)._waypointId = waypoint.id;

		if (isDraggable) {
			marker.on('dragend', () => {
				const lngLat = marker.getLngLat();
				const waypointId = (marker as any)._waypointId;

				setWaypoints((currentWaypoints) => {
					const updatedWaypoints = currentWaypoints.map((wp) => (wp.id === waypointId ? { ...wp, lng: lngLat.lng, lat: lngLat.lat } : wp));
					if (currentRoute) updateRouteWaypoints(currentRoute, updatedWaypoints);
					fetchRoute(updatedWaypoints);
					return updatedWaypoints;
				});
			});
		}

		markersRef.current.set(waypoint.id, marker);
	};

	const removeMarker = (waypointId: number) => {
		const marker = markersRef.current.get(waypointId);
		if (marker) {
			marker.remove();
			markersRef.current.delete(waypointId);
		}
	};

	const updateRouteWaypoints = (route: Route, updatedWaypoints: Waypoint[]) => {
		setRoutes((currentRoutes) => currentRoutes.map((r) => (r.id === route.id ? { ...r, waypoints: updatedWaypoints } : r)));
	};

	const cleanMap = () => {
		setWaypoints([]);
		clearMarkers();

		if (map.current) {
			if (map.current.getLayer('route')) {
				map.current.removeLayer('route');
			}
			if (map.current.getSource('route')) {
				map.current.removeSource('route');
			}
		}
	};

	const displayRoute = (waypoints: Waypoint[], isEditing = false): void => {
		if (!map.current) {
			console.error('Map is not initialized');
			return;
		}

		setIsEditMode(isEditing);
		setWaypoints(waypoints);
		clearMarkers();

		waypoints.forEach((waypoint) => {
			addMarker(waypoint, isEditing);
		});

		if (waypoints.length >= 2) {
			fetchRoute(waypoints);
		} else if (map.current) {
			if (map.current.getLayer('route')) {
				map.current.removeLayer('route');
			}
			if (map.current.getSource('route')) {
				map.current.removeSource('route');
			}
		}

		if (waypoints.length > 0) {
			const bounds = new mapboxgl.LngLatBounds();
			waypoints.forEach((point) => {
				bounds.extend([point.lng, point.lat]);
			});
			map.current.fitBounds(bounds, { padding: 50, maxZoom: 15 });
		}
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
		console.log('Loading routes from JSON...');
		import('../../../data.json')
			.then((data) => {
				setRoutes(data.routes);
			})
			.catch((error) => {
				console.error('Failed to load routes:', error);
			});
	}, []);

	useEffect(() => {
		if (map.current || !mapContainer.current) return;

		console.log('Initializing map');
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [-1.15, 46.16],
			zoom: 9
		});

		map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

		return () => {
			console.log('Cleanup: removing map');
			clearMarkers();
			map.current?.remove();
			map.current = null;
		};
	}, []);

	useEffect(() => {
		if (!map.current) return;

		const clickHandler = (e: any) => {
			if (isEditMode) {
				const newWaypoint = {
					id: Date.now(),
					lng: Math.round(e.lngLat.lng * 100) / 100,
					lat: Math.round(e.lngLat.lat * 100) / 100
				};

				addMarker(newWaypoint, true);
				setWaypoints((prevWaypoints) => {
					const newWaypoints = [...prevWaypoints, newWaypoint];
					if (currentRoute) {
						console.log('Updating waypoints for route:', currentRoute);
						updateRouteWaypoints(currentRoute, newWaypoints);
					}

					fetchRoute(newWaypoints);
					return newWaypoints;
				});
			}
		};

		map.current.on('click', clickHandler);

		return () => {
			if (map.current) {
				map.current.off('click', clickHandler);
			}
		};
	}, [map.current, isEditMode]);

	return (
		<Context.Provider
			value={{
				routes,
				setRoutes,
				waypoints,
				setWaypoints,
				markersRef,
				isEditMode,
				setIsEditMode,
				currentRoute,
				setCurrentRoute,
				updateRouteWaypoints,
				fetchRoute,
				drawRoute,
				displayRoute,
				clearMarkers,
				removeMarker,
				cleanMap,
				map,
				mapContainer
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const useGlobalContext = () => {
	const context = useContext(Context);
	if (context === undefined) {
		throw new Error('unable to find GlobalContext');
	}

	return context;
};
