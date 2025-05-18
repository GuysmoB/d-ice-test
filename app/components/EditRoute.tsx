import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import { FC, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface IEditRoute {
	onAdd?: (route: Route) => void;
	onBack?: () => void;
	route?: Route;
	waypoints?: Waypoint[];
}

const EditRoute: FC<IEditRoute> = ({ onAdd, onBack, route, waypoints: externalWaypoints }) => {
	const [name, setName] = useState<string>(route?.name || '');
	const [waypoints, setWaypoints] = useState<Waypoint[]>(
		route?.waypoints && route.waypoints.length > 0 ? route.waypoints : [{ id: Date.now(), lat: 46.16, lng: -1.15 }]
	);

	const addWaypoint = () => {
		// Add a new waypoint with default values or based on last waypoint
		const lastWaypoint = waypoints[waypoints.length - 1];
		setWaypoints([
			...waypoints,
			{
				id: Date.now(),
				lat: lastWaypoint ? lastWaypoint.lat : 46.16,
				lng: lastWaypoint ? lastWaypoint.lng : -1.15
			}
		]);
	};

	const deleteWaypoint = (id: number) => {
		if (waypoints.length <= 1) {
			return; // Always keep at least one waypoint
		}
		setWaypoints(waypoints.filter((wp) => wp.id !== id));
	};

	const updateWaypoint = (id: number, field: 'lat' | 'lng', value: number) => {
		setWaypoints(waypoints.map((wp) => (wp.id === id ? { ...wp, [field]: value } : wp)));
	};

	const handleSave = () => {
		if (onAdd) {
			onAdd({ id: uuidv4(), name, waypoints });
		}
	};

	useEffect(() => {
		if (externalWaypoints && externalWaypoints.length > 0) {
			setWaypoints(externalWaypoints);
		}
	}, [externalWaypoints]);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				padding: 2,
				width: '300px',
				backgroundColor: '#364d69',
				color: 'white',
				gap: 2
			}}
		>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={{ color: 'white' }} variant='text'>
					Back
				</Button>
				<Typography variant='h6' sx={{ color: 'white' }}>
					Edit Route
				</Typography>
			</Box>

			<TextField
				label='Route Name'
				value={name}
				onChange={(e) => setName(e.target.value)}
				variant='outlined'
				size='small'
				fullWidth
				margin='normal'
				sx={{
					'& .MuiInputBase-input': { color: 'white' },
					'& .MuiInputLabel-root': { color: 'lightgray' },
					'& .MuiOutlinedInput-root': {
						'& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
						'&:hover fieldset': { borderColor: 'white' },
						'&.Mui-focused fieldset': { borderColor: 'white' }
					}
				}}
			/>

			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
				{waypoints.map((waypoint, index) => (
					<Box
						key={waypoint.id}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							backgroundColor: 'rgba(255,255,255,0.1)',
							padding: 2,
							borderRadius: 1,
							gap: 1
						}}
					>
						<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
							<Typography variant='body2' sx={{ color: 'white' }}>
								Waypoint {index + 1}
							</Typography>

							<IconButton onClick={() => deleteWaypoint(waypoint.id)} disabled={waypoints.length <= 1} sx={{ color: 'white', p: 0.5 }}>
								<DeleteIcon fontSize='small' />
							</IconButton>
						</Box>

						<Box sx={{ display: 'flex', gap: 1 }}>
							<TextField
								label='Lat (°N/S)'
								type='number'
								value={waypoint.lat}
								onChange={(e) => updateWaypoint(waypoint.id, 'lat', parseFloat(e.target.value))}
								inputProps={{ step: 0.0001, min: -90, max: 90 }}
								size='small'
								sx={{
									flex: 1,
									'& .MuiInputBase-input': { color: 'white' },
									'& .MuiInputLabel-root': { color: 'lightgray' },
									'& .MuiOutlinedInput-root': {
										'& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
										'&:hover fieldset': { borderColor: 'white' },
										'&.Mui-focused fieldset': { borderColor: 'white' }
									}
								}}
							/>

							<TextField
								label='Lng (°E/W)'
								type='number'
								value={waypoint.lng}
								onChange={(e) => updateWaypoint(waypoint.id, 'lng', parseFloat(e.target.value))}
								inputProps={{ step: 0.0001, min: -180, max: 180 }}
								size='small'
								sx={{
									flex: 1,
									'& .MuiInputBase-input': { color: 'white' },
									'& .MuiInputLabel-root': { color: 'lightgray' },
									'& .MuiOutlinedInput-root': {
										'& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
										'&:hover fieldset': { borderColor: 'white' },
										'&.Mui-focused fieldset': { borderColor: 'white' }
									}
								}}
							/>
						</Box>
					</Box>
				))}
			</Box>

			<Button startIcon={<AddIcon />} onClick={addWaypoint} variant='contained' color='secondary' sx={{ color: 'white' }}>
				Add Waypoint
			</Button>

			<Button
				startIcon={<SaveIcon />}
				onClick={handleSave}
				variant='contained'
				color='primary'
				sx={{ mt: 2 }}
				disabled={!name || waypoints.length < 2}
			>
				Save Route
			</Button>
		</Box>
	);
};

export default EditRoute;
