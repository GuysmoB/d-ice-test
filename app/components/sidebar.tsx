import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { useGlobalContext } from '../lib/contexts/Context';
import EditRoute from './EditRoute';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';

interface ISidebar {
	routes?: Route[];
}

const Sidebar: FC<ISidebar> = ({ routes = [] }) => {
	const [addNewRoute, setAddNewRoute] = useState(false);
	const [editingRoute, setEditingRoute] = useState<Route | null>(null);
	const { displayRoute, setCurrentRoute, setRoutes, setWaypoints, setIsEditMode, cleanMap, currentRoute } = useGlobalContext();

	const downloadFile = (dataUrl: string, fileName: string) => {
		const link = document.createElement('a');
		link.href = dataUrl;
		link.download = fileName;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const calculateDistance = (waypoints: Waypoint[]): number => {
		if (waypoints.length < 2) return 0;

		let totalDistance = 0;

		for (let i = 0; i < waypoints.length - 1; i++) {
			const lat1 = waypoints[i].lat;
			const lon1 = waypoints[i].lng;
			const lat2 = waypoints[i + 1].lat;
			const lon2 = waypoints[i + 1].lng;

			const R = 6371;
			const dLat = ((lat2 - lat1) * Math.PI) / 180;
			const dLon = ((lon2 - lon1) * Math.PI) / 180;

			const a =
				Math.sin(dLat / 2) * Math.sin(dLat / 2) +
				Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

			const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
			const distance = R * c;

			totalDistance += distance;
		}

		return totalDistance;
	};

	const exportAsGeoJSON = (route: Route) => {
		const geoJson = {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					properties: {
						name: route.name,
						distance: calculateDistance(route.waypoints).toFixed(2) + ' km'
					},
					geometry: {
						type: 'LineString',
						coordinates: route.waypoints.map((wp) => [wp.lng, wp.lat])
					}
				}
			]
		};

		const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(geoJson, null, 2));
		downloadFile(dataStr, `${route.name.replace(/\s+/g, '_')}.geojson`);
	};

	const exportAsGPX = (route: Route) => {
		let gpx = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="D-ICE Route Planner" xmlns="http://www.topografix.com/GPX/1/1">
  <metadata>
    <name>${route.name}</name>
    <desc>Route exported from D-ICE Route Planner</desc>
  </metadata>
  <trk>
    <name>${route.name}</name>
    <trkseg>
`;

		route.waypoints.forEach((wp) => {
			gpx += `      <trkpt lat="${wp.lat}" lon="${wp.lng}"></trkpt>\n`;
		});

		gpx += `    </trkseg>
  </trk>
</gpx>`;

		const dataStr = 'data:text/xml;charset=utf-8,' + encodeURIComponent(gpx);
		downloadFile(dataStr, `${route.name.replace(/\s+/g, '_')}.gpx`);
	};

	const handleEditRoute = (route: Route) => {
		setEditingRoute(route);
		setCurrentRoute(route);
		displayRoute(route.waypoints, true);
	};

	const handleAddRoute = (route: Route) => {
		setAddNewRoute(false);
		setRoutes((current) => [...current, route]);
		displayRoute(route.waypoints, false);
	};

	const handleSaveEdit = () => {
		if (!editingRoute) return;
		setEditingRoute(null);
		setCurrentRoute(null);
	};

	const deleteRoute = (route: Route) => {
		setRoutes((current) => current.filter((r) => r.id !== route.id));

		if (currentRoute?.id === route.id) {
			setCurrentRoute(null);
			setWaypoints([]);
			cleanMap();
		}
	};

	if (addNewRoute) {
		return (
			<EditRoute
				onAdd={handleAddRoute}
				onBack={() => {
					setAddNewRoute(false);
					setIsEditMode(false);
					cleanMap();
				}}
			/>
		);
	}

	if (editingRoute) {
		return (
			<EditRoute
				route={editingRoute}
				onAdd={handleSaveEdit}
				onBack={() => {
					setWaypoints(editingRoute.waypoints);
					displayRoute(editingRoute.waypoints, true);
					setEditingRoute(null);
					setIsEditMode(false);
					setCurrentRoute(null);
				}}
			/>
		);
	}

	return (
		<Box
			id='sidebar'
			sx={{
				display: 'flex',
				flexDirection: 'column',
				padding: 2,
				gap: 2,
				width: '500px',
				backgroundColor: '#364d69',
				color: 'white'
			}}
		>
			<Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between', alignItems: 'center' }}>
				<Typography variant='h6' sx={{ color: 'white' }}>
					Routes
				</Typography>
			</Box>

			{currentRoute && (
				<Box
					sx={{
						mt: 1,
						p: 2,
						bgcolor: 'rgba(255,255,255,0.1)',
						borderRadius: 1,
						border: '1px solid rgba(255,255,255,0.2)'
					}}
				>
					<Typography variant='subtitle1' sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>
						{currentRoute.name}
					</Typography>

					<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
						<Typography variant='body2' sx={{ color: 'white' }}>
							Distance:
						</Typography>
						<Typography variant='body2' sx={{ color: '#4CAF50', fontWeight: 'bold' }}>
							{calculateDistance(currentRoute.waypoints).toFixed(2)} km
						</Typography>
					</Box>

					<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
						<Typography variant='body2' sx={{ color: 'white' }}>
							Waypoints:
						</Typography>
						<Typography variant='body2' sx={{ color: '#2196F3', fontWeight: 'bold' }}>
							{currentRoute.waypoints.length}
						</Typography>
					</Box>

					{currentRoute.waypoints.length >= 2 && (
						<Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
							<Typography variant='body2' sx={{ color: 'white' }}>
								Start:
							</Typography>
							<Typography variant='body2' sx={{ color: 'white', fontWeight: 'bold' }}>
								{currentRoute.waypoints[0].lat.toFixed(2)}, {currentRoute.waypoints[0].lng.toFixed(2)}
							</Typography>
						</Box>
					)}

					{currentRoute.waypoints.length >= 2 && (
						<Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
							<Button
								size='small'
								variant='outlined'
								startIcon={<DownloadIcon />}
								onClick={() => exportAsGeoJSON(currentRoute)}
								sx={{
									fontSize: '0.7rem',
									color: 'white',
									borderColor: 'rgba(255,255,255,0.3)',
									'&:hover': {
										borderColor: 'white',
										backgroundColor: 'rgba(255,255,255,0.1)'
									}
								}}
							>
								GeoJSON
							</Button>

							<Button
								size='small'
								variant='outlined'
								startIcon={<DownloadIcon />}
								onClick={() => exportAsGPX(currentRoute)}
								sx={{
									fontSize: '0.7rem',
									color: 'white',
									borderColor: 'rgba(255,255,255,0.3)',
									'&:hover': {
										borderColor: 'white',
										backgroundColor: 'rgba(255,255,255,0.1)'
									}
								}}
							>
								GPX
							</Button>
						</Box>
					)}
				</Box>
			)}

			<List sx={{ width: '100%', bgcolor: 'transparent', p: 0 }}>
				{routes.length === 0 ? (
					<Typography variant='body2' sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', mt: 2 }}>
						No routes available. Create one!
					</Typography>
				) : (
					routes.map((route) => (
						<ListItem
							key={route.id}
							onClick={() => {
								setCurrentRoute(route);
								displayRoute(route.waypoints, false);
							}}
							sx={{
								mb: 1,
								borderRadius: 1,
								cursor: 'pointer',
								bgcolor: currentRoute?.id === route.id ? 'rgba(255,255,255,0.2)' : 'transparent',
								'&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
							}}
							secondaryAction={
								<Box sx={{ display: 'flex' }}>
									<IconButton
										edge='end'
										aria-label='edit'
										sx={{ color: 'white' }}
										onClick={(e) => {
											e.stopPropagation();
											handleEditRoute(route);
										}}
									>
										<EditIcon />
									</IconButton>
									<IconButton
										edge='end'
										aria-label='delete'
										sx={{ color: 'white' }}
										onClick={(e) => {
											e.stopPropagation();
											if (window.confirm(`Are you sure you want to delete route "${route.name}"?`)) {
												deleteRoute(route);
											}
										}}
									>
										<DeleteIcon />
									</IconButton>
								</Box>
							}
						>
							<ListItemText primary={route.name} />
						</ListItem>
					))
				)}
			</List>

			<Button
				variant='contained'
				color='secondary'
				sx={{ color: 'white' }}
				onClick={() => {
					cleanMap();
					setAddNewRoute(true);
					setIsEditMode(true);
				}}
			>
				<AddIcon />
				Add new route
			</Button>
		</Box>
	);
};

export default Sidebar;
