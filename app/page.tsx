'use client';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map from './components/Map';
import { GlobalContext } from './lib/contexts/Context';

export default function Home() {
	return (
		<GlobalContext>
			<Map />
		</GlobalContext>
	);
}
