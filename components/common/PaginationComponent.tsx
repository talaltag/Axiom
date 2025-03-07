import React, { useState, useEffect } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

interface PaginationProps {
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
  };
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  pagination,
  onPageChange,
}) => {
  const [activePage, setActivePage] = useState(pagination.page);

  useEffect(() => {
    setActivePage(pagination.page);
  }, [pagination.page]);

  const handlePageClick = (page: number) => {
    if (page < 1 || page > pagination.totalPages) {
      return;
    }
    setActivePage(page);
    onPageChange(page);
  };

  return (
    <Pagination>
      {/* Previous Button */}
      <PaginationItem disabled={activePage === 1}>
        <PaginationLink
          previous
          onClick={() => handlePageClick(activePage - 1)}
        />
      </PaginationItem>

      {/* Page Number Buttons */}
      {[...Array(pagination.totalPages)].map((_, index) => (
        <PaginationItem key={index} active={activePage === index + 1}>
          <PaginationLink onClick={() => handlePageClick(index + 1)}>
            {index + 1}
          </PaginationLink>
        </PaginationItem>
      ))}

      {/* Next Button */}
      <PaginationItem disabled={activePage === pagination.totalPages}>
        <PaginationLink next onClick={() => handlePageClick(activePage + 1)} />
      </PaginationItem>
    </Pagination>
  );
};

export default PaginationComponent;
