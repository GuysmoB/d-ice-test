interface Waypoint {
	id: number;
	lng: number;
	lat: number;
	marker?: mapboxgl.Marker;
}

interface Route {
	id: string;
	name: string;
	waypoints: Waypoint[];
}

interface RouteGeometry {
	type: 'LineString';
	coordinates: number[][];
}

interface RouteFeature {
	type: 'Feature';
	properties: Record<string, any>;
	geometry: RouteGeometry;
}

interface MapboxDirectionsResponse {
	routes: Array<{
		geometry: RouteGeometry;
		[key: string]: any;
	}>;
	[key: string]: any;
}


