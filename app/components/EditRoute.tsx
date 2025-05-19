import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import { FC, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useGlobalContext } from '../lib/contexts/Context';

interface IEditRoute {
	onAdd?: (route: Route) => void;
	onBack?: () => void;
	route?: Route;
}

const EditRoute: FC<IEditRoute> = ({ onAdd, onBack, route }) => {
	const [name, setName] = useState<string>(route?.name || '');
	const { displayRoute, map: mapRef, setRoutes, setWaypoints, waypoints } = useGlobalContext();
	const [localWaypoints, setLocalWaypoints] = useState<Waypoint[]>(
		route?.waypoints && route.waypoints.length > 0 ? route.waypoints : [{ id: Date.now(), lat: 46.16, lng: -1.15 }]
	);

	const addWaypoint = () => {
		const lastWaypoint = localWaypoints[localWaypoints.length - 1];

		let newLat = lastWaypoint ? lastWaypoint.lat + 0.1 : 46.16;
		let newLng = lastWaypoint ? lastWaypoint.lng + 0.1 : -1.15;
		newLat = Math.round(newLat * 100) / 100;
		newLng = Math.round(newLng * 100) / 100;

		const newWaypoint = {
			id: Date.now(),
			lat: newLat,
			lng: newLng
		};

		const newWaypoints = [...localWaypoints, newWaypoint];
		setLocalWaypoints(newWaypoints);
		displayRoute(newWaypoints, true);
	};

	const deleteWaypoint = (id: number) => {
		if (localWaypoints.length <= 1) return;
		const newWaypoints = localWaypoints.filter((wp) => wp.id !== id);
		setLocalWaypoints(newWaypoints);
		displayRoute(newWaypoints, true);
	};

	const updateWaypoint = (id: number, field: 'lat' | 'lng', value: number) => {
		const newWaypoints = localWaypoints.map((wp) => (wp.id === id ? { ...wp, [field]: value } : wp));
		setLocalWaypoints(newWaypoints);
		displayRoute(newWaypoints, true);
	};

	const handleSave = () => {
		if (!name || localWaypoints.length < 2) {
			return;
		}

		const updatedRoute: Route = {
			id: route?.id || uuidv4(),
			name: name,
			waypoints: localWaypoints
		};

		if (route?.id) {
			setRoutes((currentRoutes) =>
				currentRoutes.map((r) => (r.id === route.id ? { ...r, name: updatedRoute.name, waypoints: updatedRoute.waypoints } : r))
			);
		}

		if (onAdd) {
			onAdd(updatedRoute);
		}

		displayRoute(localWaypoints, false);
	};

	useEffect(() => {
		setLocalWaypoints(waypoints);
	}, [waypoints]);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				padding: 2,
				width: '500px',
				backgroundColor: '#364d69',
				color: 'white',
				gap: 3
			}}
		>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={{ color: 'white' }} variant='text'>
					Back
				</Button>
			</Box>

			<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<Typography variant='body2' sx={{ px: 1, color: 'white' }}>
					Name
				</Typography>

				<TextField
					value={name}
					onChange={(e) => setName(e.target.value)}
					variant='outlined'
					size='small'
					margin='normal'
					sx={{
						flex: 1,
						ml: 8,
						backgroundColor: 'lightgrey',
						'& .MuiInputBase-input': { color: 'black' },
						'& .MuiInputLabel-root': { color: 'lightgray' },
						'& .MuiOutlinedInput-root': {
							'& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
							'&:hover fieldset': { borderColor: 'white' },
							'&.Mui-focused fieldset': { borderColor: 'white' }
						}
					}}
				/>
			</Box>

			<Box sx={{ display: 'flex', flexDirection: 'column', px: 1.5, gap: 1, alignItems: 'center', width: '100%' }}>
				<Box sx={{ display: 'flex', px: 1.5, gap: 1, alignItems: 'center', width: '100%' }}>
					<Typography variant='caption' sx={{ color: 'white' }}>
						Step
					</Typography>

					<Typography variant='caption' sx={{ color: 'white', width: '140px', ml: 10 }}>
						Latitude (°N/S)
					</Typography>

					<Typography variant='caption' sx={{ color: 'white', width: '140px' }}>
						Longitude (°E/W)
					</Typography>
				</Box>

				<Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
					{localWaypoints.map((waypoint, index) => (
						<Box
							key={waypoint.id}
							sx={{
								display: 'flex',
								flexDirection: 'column',
								padding: 1,
								borderRadius: 1,
								gap: 10
							}}
						>
							<Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flex: 1 }}>
								<Typography variant='body2' sx={{ color: 'white' }}>
									WP{index + 1}
								</Typography>

								<TextField
									type='number'
									value={waypoint.lat}
									onChange={(e) => updateWaypoint(waypoint.id, 'lat', parseFloat(e.target.value))}
									inputProps={{ step: 0.01, min: -90, max: 90 }}
									size='small'
									sx={{
										ml: 'auto',
										width: '140px',
										backgroundColor: 'lightgrey',
										'& .MuiInputBase-input': { color: 'black' },
										'& .MuiInputLabel-root': { color: 'lightgray' },
										'& .MuiOutlinedInput-root': {
											'& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
											'&:hover fieldset': { borderColor: 'white' },
											'&.Mui-focused fieldset': { borderColor: 'white' }
										}
									}}
								/>

								<TextField
									type='number'
									value={waypoint.lng}
									onChange={(e) => updateWaypoint(waypoint.id, 'lng', parseFloat(e.target.value))}
									inputProps={{ step: 0.01, min: -180, max: 180 }}
									size='small'
									sx={{
										width: '140px',
										backgroundColor: 'lightgrey',
										'& .MuiInputBase-input': { color: 'black' },
										'& .MuiInputLabel-root': { color: 'lightgray' },
										'& .MuiOutlinedInput-root': {
											'& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
											'&:hover fieldset': { borderColor: 'white' },
											'&.Mui-focused fieldset': { borderColor: 'white' }
										}
									}}
								/>

								<IconButton
									onClick={() => deleteWaypoint(waypoint.id)}
									disabled={localWaypoints.length <= 1}
									sx={{ color: 'white', p: 0.5 }}
								>
									<DeleteIcon fontSize='small' />
								</IconButton>
							</Box>
						</Box>
					))}
				</Box>
			</Box>

			<Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
				<Button
					startIcon={<AddIcon />}
					onClick={addWaypoint}
					variant='contained'
					color='secondary'
					sx={{ color: 'white' }}
					disabled={localWaypoints.length >= 6}
				>
					Add Waypoint
				</Button>

				<Button
					startIcon={<SaveIcon />}
					onClick={handleSave}
					variant='contained'
					color='primary'
					sx={{ mt: 2 }}
					disabled={!name || localWaypoints.length < 2}
				>
					Save Route
				</Button>
			</Box>
		</Box>
	);
};

export default EditRoute;
