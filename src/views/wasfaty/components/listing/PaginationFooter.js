import React, { forwardRef, useState } from "react";
import DataTable from "react-data-table-component";
import { Fragment } from "react-is";
import { Card, Col, Input, Label, Row } from "reactstrap";
import PaginationComponent from "./Pagination";
import startCase from "lodash/startCase";
import { observer } from "mobx-react";
import { useIntl } from "react-intl";
import { IntlService } from "../../services";

function PaginationFooter({
  handlePageChange,
  pagination = {},
  isStopPaginationFirstCall,
}) {
  const intl = useIntl();

  return (
    <Fragment>
      <div className="d-flex justify-content-between align-items-center">
        <div className="mt-1">
          <p className="list-info">{`${IntlService.m("Showing")} ${
            pagination?.to || 0
          } ${IntlService.m("from")} ${pagination?.totalPages} ${IntlService.m(
            "data"
          )}`}</p>
        </div>
        <div className="">
          <PaginationComponent
            pagination={pagination}
            handlePageChange={handlePageChange}
            isStopPaginationFirstCall={isStopPaginationFirstCall}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default observer(PaginationFooter);
