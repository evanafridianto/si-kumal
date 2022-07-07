import React, { useState, useEffect } from "react";
import { Button, Form, Col, Figure } from "react-bootstrap";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet";
import { toast, ToastContainer } from "react-toastify";

const CulinaryEdit = () => {
  const [name, setName] = useState("");
  const [urban_village, setUrbanVillage] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [price_range, setPriceRange] = useState("");
  const [open_time, setOpenTime] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [preview, setPreview] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    edit();
  }, []);

  // edit
  const edit = async () => {
    const response = await axios.get(`http://localhost:2000/culinary/${id}`);
    setName(response.data.name);
    setUrbanVillage(response.data.urban_village);
    setAddress(response.data.address);
    setLat(response.data.lat);
    setLong(response.data.long);
    setPriceRange(response.data.price_range);
    setOpenTime(response.data.open_time);
    setCategory(response.data.category);
    setPhoto(response.data.photo);
    setPreview(`http://localhost:2000/images/${response.data.photo}`);
  };

  const loadImage = (e) => {
    const photo = e.target.files[0];
    setPhoto(photo);
    setPreview(URL.createObjectURL(photo));
  };

  // update
  const update = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("urban_village", urban_village);
    formData.append("address", address);
    formData.append("lat", lat);
    formData.append("long", long);
    formData.append("price_range", price_range);
    formData.append("open_time", open_time);
    formData.append("category", category);
    formData.append("photo", photo);

    try {
      var response = await axios.patch(
        `http://localhost:2000/culinary/${id}`,
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      Swal.fire({
        title: "Good job!",
        text: response.data.message,
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
      }).then((result) => {
        navigate("/culinaries");
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <ToastContainer />;
      <Helmet>
        <title>SI-KUMAL | Edit</title>
      </Helmet>
      <main className="container">
        <div className="bg-light p-5 rounded">
          <h5>Data Form</h5>
          <Button
            variant="secondary"
            size="sm"
            as={Link}
            to={"/culinaries"}
            className="mb-3"
          >
            <FontAwesomeIcon icon={faArrowAltCircleLeft} fixedWidth />
            Back to Data List
          </Button>
          <Form className="row g-3" onSubmit={update}>
            <Col md="12">
              <Form.Control required type="hidden" value={id} />
            </Col>
            <Col md="12">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
            <Col md="6">
              <Form.Label>Urban Village</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Urban Village"
                value={urban_village}
                onChange={(e) => setUrbanVillage(e.target.value)}
              />
            </Col>
            <Col md="6">
              <Form.Label>Address</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Col>
            <Col md="6">
              <Form.Label>Latitude</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Latitude"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
              />
            </Col>
            <Col md="6">
              <Form.Label>Longitude</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Longitude"
                value={long}
                onChange={(e) => setLong(e.target.value)}
              />
            </Col>
            <Col md="6">
              <Form.Label>Price Range</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Price Range"
                value={price_range}
                onChange={(e) => setPriceRange(e.target.value)}
              />
            </Col>
            <Col md="6">
              <Form.Label>Open Time</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Open Time"
                value={open_time}
                onChange={(e) => setOpenTime(e.target.value)}
              />
            </Col>
            <Col md="6">
              <Form.Label>Category</Form.Label>
              <Form.Select
                aria-label="Select category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Uncategorized">Uncategorized</option>
                <option value="KAFE">KAFE</option>
                <option value="KEDAI">KEDAI</option>
                <option value="CASUAL DINING">CASUAL DINING</option>
                <option value="KUE & ROTI">KUE & ROTI</option>
                <option value="GERAI MINUMAN">GERAI MINUMAN</option>
                <option value="JAJANAN CEPAT SAJI">JAJANAN CEPAT SAJI</option>
              </Form.Select>
            </Col>
            <Col md="6">
              <Form.Label>Photo</Form.Label>
              <Form.Control type="file" onChange={loadImage} />
              {preview ? (
                <Figure className="mt-2">
                  <Figure.Image
                    height={200}
                    width={150}
                    alt="Preview Image"
                    src={preview}
                  />
                </Figure>
              ) : (
                ""
              )}
            </Col>

            <Col md="12">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Col>
          </Form>
        </div>
      </main>
    </>
  );
};

export default CulinaryEdit;
