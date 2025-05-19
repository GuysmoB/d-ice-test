'use client';
import { Box } from '@mui/material';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FC } from 'react';
import { useGlobalContext } from '../lib/contexts/Context';
import Sidebar from './Sidebar';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX;

interface IMap {}

const Map: FC<IMap> = () => {
	const { routes, mapContainer } = useGlobalContext();

	return (
		<Box id='container' sx={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
			<Box id='map' ref={mapContainer} sx={{ borderRadius: '8px', flex: 1 }} />
			<Sidebar routes={routes} />
		</Box>
	);
};

export default Map;
