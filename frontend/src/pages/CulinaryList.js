import React, { useState, useEffect } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Helmet } from "react-helmet";

const CulinaryList = () => {
  const [culinaries, setCulinary] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get("http://localhost:2000/culinary");
    setCulinary(response.data);
  };

  const deleteCulinary = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.delete(
          `http://localhost:2000/culinary/${id}`
        );
        Swal.fire({
          title: "Good job!",
          text: response.data.message,
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
        getData();
      }
    });
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
          <Button
            variant="success"
            size="sm"
            as={Link}
            to={`/culinaries/edit/${row.id}`}
          >
            <FontAwesomeIcon icon={faPencil} />
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={() => deleteCulinary(row.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </ButtonGroup>
      ),
    },
  ];

  return (
    <>
      <Helmet>
        <title>SI-KUMAL | Data List</title>
      </Helmet>
      <main className="container">
        <div className="bg-light p-5 rounded">
          <Button
            variant="primary"
            as={Link}
            to={"/culinaries/add"}
            className="mb-3"
          >
            Add New
          </Button>
          <DataTable
            title="Culinaries List"
            columns={columns}
            data={culinaries}
            pagination
            responsive
          />
        </div>
      </main>
    </>
  );
};

export default CulinaryList;
