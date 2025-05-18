import { Box, Button, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditRoute from './EditRoute';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface ISidebar {
	onSelectRoute?: (route: Route) => void;
	onEditRoute?: (route: Route) => void;
	onAddRoute?: (route: Route) => void;
	onUpdateRouteWaypoints?: (routeId: string, waypoints: Waypoint[]) => void;
	routes?: Route[];
}

const Sidebar: FC<ISidebar> = ({ onSelectRoute, onEditRoute, onAddRoute, routes }) => {
	const [showNewRoute, setShowNewRoute] = useState(false);
	const [editingRoute, setEditingRoute] = useState<Route | null>(null);

	const handleEditRoute = (route: Route) => {
		setEditingRoute(route);

		if (onEditRoute) {
			onEditRoute(route);
		}
	};

	const handleAddRoute = (route: Route) => {
		setShowNewRoute(false);

		if (onAddRoute) {
			onAddRoute(route);
		}

		if (onSelectRoute) {
			onSelectRoute(route);
		}
	};

	const handleSaveEdit = (updatedRoute: Route) => {
		if (!editingRoute) return;

		setEditingRoute(null);

		if (onSelectRoute) {
			onSelectRoute(updatedRoute);
		}
	};

	const handleSelectRoute = (route: Route) => {
		if (onSelectRoute) {
			onSelectRoute(route);
		}
	};

	if (showNewRoute) {
		return <EditRoute onAdd={handleAddRoute} onBack={() => setShowNewRoute(false)} />;
	}

	if (editingRoute) {
		return <EditRoute route={editingRoute} onAdd={handleSaveEdit} onBack={() => setEditingRoute(null)} />;
	}

	return (
		<Box
			id='sidebar'
			sx={{
				display: 'flex',
				flexDirection: 'column',
				padding: 2,
				gap: 2,
				width: '300px',
				backgroundColor: '#364d69',
				color: 'white'
			}}
		>
			<Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between', alignItems: 'center' }}>
				<Typography variant='h6' sx={{ color: 'white' }}>
					Routes
				</Typography>

				<Button variant='contained' color='secondary' onClick={() => setShowNewRoute(true)} sx={{ color: 'white' }}>
					Add
				</Button>
			</Box>

			<List sx={{ width: '100%', bgcolor: 'transparent', p: 0 }}>
				{!routes || routes.length === 0 ? (
					<Typography variant='body2' sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', mt: 2 }}>
						No routes available. Create one!
					</Typography>
				) : (
					routes.map((route) => (
						<ListItem
							key={route.id}
							onClick={() => handleSelectRoute(route)}
							sx={{
								mb: 1,
								bgcolor: 'rgba(255,255,255,0.1)',
								borderRadius: 1,
								'&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
								cursor: 'pointer'
							}}
							secondaryAction={
								<Box>
									<IconButton
										edge='end'
										aria-label='edit'
										onClick={(e) => {
											e.stopPropagation();
											handleEditRoute(route);
										}}
										sx={{ color: 'white' }}
									>
										<EditIcon />
									</IconButton>
								</Box>
							}
						>
							<ListItemText
								primary={route.name}
								secondary={`${route.waypoints.length} waypoints`}
								primaryTypographyProps={{ color: 'white' }}
								secondaryTypographyProps={{ color: 'lightgray' }}
							/>
						</ListItem>
					))
				)}
			</List>

			<Button variant='contained' color='secondary' onClick={() => setShowNewRoute(true)} sx={{ color: 'white' }}>
				<AddIcon />
				Add new route
			</Button>
		</Box>
	);
};

export default Sidebar;
