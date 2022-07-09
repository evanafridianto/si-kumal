import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/map.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Table, Image } from "react-bootstrap";
import { Helmet } from "react-helmet";
const CulinaryMap = () => {
  const [culinaries, setCulinary] = useState([]);

  useEffect(() => {
    getCulinary();
  }, []);

  const getCulinary = async () => {
    const response = await axios.get("http://localhost:2000/culinary");
    setCulinary(response.data);
  };
  const center = [-7.959963432258623, 112.6493871382015];

  return (
    <>
      <Helmet>
        <title>SI-KUMAL | Map</title>
      </Helmet>
      <MapContainer center={center} zoom={14}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {culinaries.map((culinary, index) => (
          <Marker key={culinary.id} position={[culinary.lat, culinary.long]}>
            <Popup>
              <Table striped bordered size="sm">
                <tbody>
                  <tr>
                    <th colSpan="3">
                      <h4> {culinary.name}</h4>
                    </th>
                  </tr>
                  <tr>
                    <td width="100px">Kategori</td>
                    <td>{culinary.category}</td>
                  </tr>
                  <tr>
                    <td>Kisaran Harga</td>
                    <td>{culinary.price_range}</td>
                  </tr>
                  <tr>
                    <td>Jam Buka</td>
                    <td>{culinary.open_time}</td>
                  </tr>
                  <tr>
                    <td>Alamat</td>
                    <td>
                      {culinary.address}, Kel. {culinary.urban_village}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-center" colSpan="3">
                      <Image
                        className="img-thumbnail"
                        height={200}
                        width={150}
                        src={"http://localhost:2000/images/" + culinary.photo}
                        alt="file"
                      />
                    </th>
                  </tr>
                </tbody>
              </Table>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};
export default CulinaryMap;
