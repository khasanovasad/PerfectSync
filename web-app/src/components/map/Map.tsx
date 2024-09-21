import React, { useEffect, useRef, useState } from 'react'

// Yandex Maps types
declare global {
	interface Window {
		ymaps: any
	}
}

interface MarkerData {
	coordinates: [number, number]
	hintContent?: string
	balloonContent?: string
}

const YandexMap: React.FC = () => {
	const mapContainer = useRef<HTMLDivElement>(null)
	const mapInstance = useRef<any>(null) // To store the map instance
	const [searchQuery, setSearchQuery] = useState<string>('') // For storing user input
	const [markersData, setMarkersData] = useState<MarkerData[]>([
		{
			coordinates: [41.3111, 69.2404],
			hintContent: 'Marker 1',
			balloonContent: 'First marker',
		},
		{
			coordinates: [41.295, 69.26],
			hintContent: 'Marker 2',
			balloonContent: 'Second marker',
		},
	]) // Example initial markers data

	useEffect(() => {
		// Dynamically load Yandex Maps script
		const loadYandexMaps = () => {
			if (document.querySelector('script[src*="https://api-maps.yandex.ru"]')) {
				if (window.ymaps) {
					window.ymaps.ready(initMap)
				}
				return
			}

			const script = document.createElement('script')
			const apiKey = import.meta.env.VITE_YANDEX_API_KEY

			if (!apiKey) {
				console.error('Yandex API key is missing')
				return
			}

			script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=en_US`
			script.type = 'text/javascript'
			script.onload = () => {
				window.ymaps.ready(initMap)
			}
			document.body.appendChild(script)
		}

		// Initialize the map centered on Tashkent
		const initMap = () => {
			if (!mapContainer.current) return
			if (mapInstance.current) return // Prevent map reinitialization

			mapInstance.current = new window.ymaps.Map(mapContainer.current, {
				center: [41.2995, 69.2401], // Tashkent coordinates
				zoom: 10, // Adjust zoom level
			})

			// Remove the default search control
			mapInstance.current.controls.remove('searchControl')

			// Add markers from state to the map
			addMarkers(markersData)
		}

		loadYandexMaps()

		// Cleanup map on unmount
		return () => {
			if (mapInstance.current) {
				mapInstance.current.destroy()
				mapInstance.current = null
			}
		}
	}, [markersData]) // Reinitialize map if markersData changes

	// Function to handle search and move the map based on the address
	const handleSearch = () => {
		if (!window.ymaps || !searchQuery) return

		// Define the bounding box for Uzbekistan (Southwest and Northeast coordinates)
		const uzbekistanBounds = [
			[37.1851, 55.9966], // Southwest corner (near Karakalpakstan)
			[45.5907, 73.1486], // Northeast corner (near Ferghana Valley)
		]

		// Geocode the address entered by the user, limiting the search to Uzbekistan's bounds
		window.ymaps
			.geocode(searchQuery, {
				boundedBy: uzbekistanBounds,
				strictBounds: true, // Force the search to stay within the bounds
				results: 1, // Return only one result
			})
			.then((res: any) => {
				const geoObject = res.geoObjects.get(0) // Get the first result from the geocoding response
				if (geoObject) {
					const coordinates = geoObject.geometry.getCoordinates() // Get the latitude and longitude
					const address = geoObject.getAddressLine() // Get the full address (optional)
					console.log(`Coordinates: ${coordinates}, Address: ${address}`)

					// Move the map to the geocoded coordinates
					mapInstance.current.setCenter(coordinates, 12, {
						duration: 500, // Smooth pan duration
					})

					// Create a custom placemark with a specific color
					const placemark = new window.ymaps.Placemark(
						coordinates,
						{
							hintContent: address || 'Location',
							balloonContent: `You searched for: ${searchQuery}`,
						},
						{
							preset: 'islands#icon', // Default icon preset
							iconColor: '#FF0000', // Set the marker color (red in this example)
						}
					)

					// Clear previous markers and add the new marker
					mapInstance.current.geoObjects.removeAll()
					addMarkers(markersData) // Re-add existing markers
					mapInstance.current.geoObjects.add(placemark)
				} else {
					alert('Address not found within Uzbekistan!')
				}
			})
			.catch((error: any) => {
				console.error('Geocoding error:', error)
				alert('Error finding location!')
			})
	}

	// Function to add markers to the map
	const addMarkers = (markers: MarkerData[]) => {
		markers.forEach(marker => {
			const placemark = new window.ymaps.Placemark(
				marker.coordinates,
				{
					hintContent: marker.hintContent,
					balloonContent: marker.balloonContent,
				},
				{
					preset: 'islands#icon',
					iconColor: '#0000FF', // Set a different color for these markers (blue in this example)
				}
			)

			mapInstance.current.geoObjects.add(placemark)
		})
	}

	return (
		<div>
			<h1>Yandex Map with Custom Search (Restricted to Uzbekistan)</h1>
			<div style={{ marginBottom: '10px' }}>
				{/* Custom search input */}
				<input
					type='text'
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					placeholder='Enter address...'
					style={{ padding: '10px', width: '300px', marginRight: '10px' }}
				/>
				<button onClick={handleSearch} style={{ padding: '10px' }}>
					Search
				</button>
			</div>
			<div ref={mapContainer} style={{ width: '100%', height: '500px' }} />
		</div>
	)
}

export default YandexMap
