import { Box, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";

const PaginationComponent = (props) => {
  const { data, setData } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const handlePaginationChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    if (data?.length !== 0) {
      const newData = [];
      const indexOfLastItem = currentPage * perPage;
      const indexOfFirstItem = indexOfLastItem - perPage;
      for (
        let i = indexOfFirstItem;
        i < indexOfLastItem && i < data.length;
        i++
      ) {
        newData.push(data[i]);
      }
      setData(newData);
    }
  }, [data, currentPage, perPage]);

  if (!data || data?.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="paginations"
    >
      <Pagination
        count={Math.ceil(data.length / perPage)}
        page={currentPage}
        onChange={handlePaginationChange}
      />
    </Box>
  );
};

PaginationComponent.propTypes = {};

export default PaginationComponent;
