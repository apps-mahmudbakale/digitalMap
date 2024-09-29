import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Category colors for different layers
const categoryColors = {
    Healthcare: "red",
    Education: "blue",
    Transportation: "orange",
    Utilities: "green",
    PublicServices: "purple"
};

// GeoJSON Data as JavaScript Objects
const healthcareData = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [9.1605, 12.0022]
            },
            "properties": {
                "name": "General Hospital Dutse",
                "description": "A general hospital providing healthcare services in Dutse."
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [9.1896, 12.0057]
            },
            "properties": {
                "name": "Dutse Health Centre",
                "description": "Community health services in Dutse."
            }
        }
    ]
};

const educationData = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [9.1905, 12.0522]
            },
            "properties": {
                "name": "Dutse Model School",
                "description": "A model school offering primary and secondary education in Dutse."
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [9.1855, 12.0083]
            },
            "properties": {
                "name": "Dutse Secondary School",
                "description": "A secondary school providing quality education."
            }
        }
    ]
};

const transportationData = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [9.1601, 12.0021]
            },
            "properties": {
                "name": "Dutse Bus Terminal",
                "description": "Main bus terminal serving Dutse."
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [9.1702, 12.0019]
            },
            "properties": {
                "name": "Dutse Railway Station",
                "description": "Railway station for train services."
            }
        }
    ]
};

const utilitiesData = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [9.1605, 12.0022]
            },
            "properties": {
                "name": "Dutse Water Supply",
                "description": "Main water supply facility for Dutse."
            }
        }
    ]
};

const publicServicesData = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [9.1650, 12.0035]
            },
            "properties": {
                "name": "Dutse Police Station",
                "description": "Local police station providing security services."
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [9.1550, 12.0022]
            },
            "properties": {
                "name": "Dutse Fire Station",
                "description": "Fire station serving Dutse and surrounding areas."
            }
        }
    ]
};

// Filter component to filter between categories
const FilterButtons = ({ setFilter }) => {
    return (
        <div className="filter-buttons mb-4">
            <button onClick={() => setFilter('All')} className="btn btn-primary">All</button>
            <button onClick={() => setFilter('Healthcare')} className="btn btn-danger">Healthcare</button>
            <button onClick={() => setFilter('Education')} className="btn btn-info">Education</button>
            <button onClick={() => setFilter('Transportation')} className="btn btn-warning">Transportation</button>
            <button onClick={() => setFilter('Utilities')} className="btn btn-success">Utilities</button>
            <button onClick={() => setFilter('PublicServices')} className="btn btn-secondary">Public Services</button>
        </div>
    );
};

const MapComponent = ({ filter }) => {
    // Store GeoJSON objects in state directly
    const data = {
        Healthcare: healthcareData.features,
        Education: educationData.features,
        Transportation: transportationData.features,
        Utilities: utilitiesData.features,
        PublicServices: publicServicesData.features
    };

    const position = [12.0022, 9.1605]; // Center of Jigawa

    // Helper function to determine if a marker should be shown based on the filter
    const shouldShowMarker = (category) => filter === 'All' || filter === category;

    return (
        <MapContainer center={position} zoom={7} style={{ height: '600px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Layer Control for different categories */}
            <LayersControl position="topright">
                {/* Healthcare Layer */}
                {shouldShowMarker('Healthcare') && (
                    <LayersControl.Overlay checked name="Healthcare">
                        <LayerGroup>
                            {data.Healthcare.map((feature, index) => (
                                <Marker key={index} position={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]}>
                                    <Popup>
                                        <strong>{feature.properties.name}</strong> <br />
                                        {feature.properties.description}
                                    </Popup>
                                </Marker>
                            ))}
                        </LayerGroup>
                    </LayersControl.Overlay>
                )}

                {/* Education Layer */}
                {shouldShowMarker('Education') && (
                    <LayersControl.Overlay name="Education">
                        <LayerGroup>
                            {data.Education.map((feature, index) => (
                                <Marker key={index} position={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]}>
                                    <Popup>
                                        <strong>{feature.properties.name}</strong> <br />
                                        {feature.properties.description}
                                    </Popup>
                                </Marker>
                            ))}
                        </LayerGroup>
                    </LayersControl.Overlay>
                )}

                {/* Transportation Layer */}
                {shouldShowMarker('Transportation') && (
                    <LayersControl.Overlay name="Transportation">
                        <LayerGroup>
                            {data.Transportation.map((feature, index) => (
                                <Marker key={index} position={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]}>
                                    <Popup>
                                        <strong>{feature.properties.name}</strong> <br />
                                        {feature.properties.description}
                                    </Popup>
                                </Marker>
                            ))}
                        </LayerGroup>
                    </LayersControl.Overlay>
                )}

                {/* Utilities Layer */}
                {shouldShowMarker('Utilities') && (
                    <LayersControl.Overlay name="Utilities">
                        <LayerGroup>
                            {data.Utilities.map((feature, index) => (
                                <Marker key={index} position={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]}>
                                    <Popup>
                                        <strong>{feature.properties.name}</strong> <br />
                                        {feature.properties.description}
                                    </Popup>
                                </Marker>
                            ))}
                        </LayerGroup>
                    </LayersControl.Overlay>
                )}

                {/* Public Services Layer */}
                {shouldShowMarker('PublicServices') && (
                    <LayersControl.Overlay name="Public Services">
                        <LayerGroup>
                            {data.PublicServices.map((feature, index) => (
                                <Marker key={index} position={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]}>
                                    <Popup>
                                        <strong>{feature.properties.name}</strong> <br />
                                        {feature.properties.description}
                                    </Popup>
                                </Marker>
                            ))}
                        </LayerGroup>
                    </LayersControl.Overlay>
                )}
            </LayersControl>
        </MapContainer>
    );
};

// Main App Component
const App = () => {
    const [filter, setFilter] = useState('All');

    return (
        <div className="container">
            <h1 className="my-4">Jigawa State Infrastructure Map</h1>
            <p>Use the filters below to explore different types of infrastructure in Jigawa State.</p>

            {/* Render Filter Buttons */}
            <FilterButtons setFilter={setFilter} />

            {/* Render Map Component */}
            <MapComponent filter={filter} />
        </div>
    );
};

export default App;
