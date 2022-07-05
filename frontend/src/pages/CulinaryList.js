import React, { useState, useEffect } from "react";
import { Container, Button, ButtonGroup } from "react-bootstrap";
// import Swal from "sweetalert2/dist/sweetalert2.js";
// import "sweetalert2/dist/sweetalert2.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

import DataTable from "react-data-table-component";

const CulinaryList = () => {
  const [culinaries, setCulinary] = useState([]);

  useEffect(() => {
    getCulinary();
  }, []);

  const getCulinary = async () => {
    const response = await axios.get("http://localhost:2000/culinary");
    setCulinary(response.data);
  };

  const deleteCulinary = async (id) => {
    await axios.delete(`http://localhost:2000/culinary/${id}`);
    getCulinary();
  };

  const columns = [
    {
      name: "#",
      selector: (row, key) => key + 1,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Price Range",
      selector: (row) => row.price_range,
      sortable: true,
    },
    {
      name: "Open Time",
      selector: (row) => row.open_time,
      sortable: true,
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <ButtonGroup>
          <Button variant="success">
            <FontAwesomeIcon icon={faPencil} fixedWidth />
          </Button>
          <Button variant="danger" onClick={() => deleteCulinary(row.id)}>
            <FontAwesomeIcon icon={faTrash} fixedWidth />
          </Button>
        </ButtonGroup>
      ),
    },
  ];

  return (
    <div className="album">
      <Container className="py-5">
        <Button variant="primary" onClick={() => this.Add()}>
          Add New
        </Button>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mt-3">
          <DataTable
            title="Culinaries List"
            columns={columns}
            data={culinaries}
            pagination
            responsive
          />
        </div>
      </Container>
    </div>
  );
};

export default CulinaryList;
