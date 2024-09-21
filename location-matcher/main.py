import requests
from geopy.distance import geodesic
import csv

# Set your coordinates and radius (in meters)
latitude = 41.308890
longitude = 69.284549
radius = 1000  # Radius in meters (e.g., 1000 meters or 1 km)

# Query Overpass API to find amenities
overpass_url = "http://overpass-api.de/api/interpreter"
overpass_query = f"""
[out:json];
(
  node["amenity"="school"](around:{radius},{latitude},{longitude});
  node["highway"="bus_stop"](around:{radius},{latitude},{longitude});
  node["railway"="station"](around:{radius},{latitude},{longitude});
  node["amenity"="hospital"](around:{radius},{latitude},{longitude});
);
out body;
"""
response = requests.get(overpass_url, params={'data': overpass_query})
data = response.json()

# Extract useful information from the response
places = []

for element in data['elements']:
    place = {
        'type': element['tags'].get('amenity', element['tags'].get('highway', element['tags'].get('railway'))),
        'name': element['tags'].get('name', 'Unnamed'),
        'lat': element['lat'],
        'lon': element['lon'],
        'distance': geodesic((latitude, longitude), (element['lat'], element['lon'])).meters
    }
    places.append(place)

# Sort places by distance
places = sorted(places, key=lambda x: x['distance'])

# Display the results
for place in places:
    print(f"{place['type'].capitalize()}: {place['name']} is {place['distance']:.2f} meters away.")


csv_filename = 'nearby_places.csv'
# Write data to CSV
with open(csv_filename, mode='w', newline='', encoding='utf-8') as csv_file:
    fieldnames = ['Type', 'Name', 'Latitude', 'Longitude', 'Distance (meters)']
    writer = csv.DictWriter(csv_file, fieldnames=fieldnames)

    # Write header
    writer.writeheader()

    # Write data
    for place in places:
        writer.writerow({
            'Type': place['type'].capitalize(),
            'Name': place['name'],
            'Latitude': place['lat'],
            'Longitude': place['lon'],
            'Distance (meters)': f"{place['distance']:.2f}"
        })

print(f"Data exported to {csv_filename}")