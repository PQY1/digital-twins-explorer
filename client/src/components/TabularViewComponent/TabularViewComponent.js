// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import React, { Component } from "react";
import { DetailsList, SelectionMode } from "office-ui-fabric-react";
import LoaderComponent from "../LoaderComponent/LoaderComponent";
import { withTranslation } from "react-i18next";

import "./TabularViewComponent.scss";

export class TabularViewComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      items: this.generateItems()
    };
    this.columns = [
      {
        key: "idColumn",
        fieldName: "id",
        name: "Id",
        data: props.t("app.tabularViewComponentConfig.ID"),
        minWidth: 20,
        maxWidth: 50,
        isPadded: true
      },
      {
        key: "companyNameColumn",
        fieldName: "CompanyName",
        name: props.t("app.tabularViewComponentConfig.name"),
        data: "string",
        minWidth: 200,
        maxWidth: 200,
        isPadded: true
      },
      {
        key: "cipDegreeColumn",
        fieldName: "cipDegree",
        name: props.t("app.tabularViewComponentConfig.cipDegree"),
        data: "string",
        minWidth: 200,
        maxWidth: 200,
        isPadded: true
      },
      {
        key: "cipScoreColumn",
        fieldName: "cipScore",
        name: props.t("app.tabularViewComponentConfig.cipScore"),
        data: "string",
        minWidth: 200,
        maxWidth: 200,
        isPadded: true
      },
      {
        key: "ceoNameColumn",
        fieldName: "ceoName",
        name: props.t("app.tabularViewComponentConfig.ceoName"),
        data: "string",
        minWidth: 200,
        maxWidth: 200,
        isPadded: true
      },
      {
        key: "stateColumn",
        fieldName: "state",
        name: props.t("app.tabularViewComponentConfig.state"),
        data: "string",
        minWidth: 200,
        maxWidth: 200,
        isPadded: true
      },
      {
        key: "countryColumn",
        fieldName: "country",
        name: props.t("app.tabularViewComponentConfig.country"),
        data: "string",
        minWidth: 200,
        maxWidth: 200,
        isPadded: true
      },
      {
        key: "annualRevenueColumn",
        fieldName: "annualRevenue",
        name: props.t("app.tabularViewComponentConfig.annualRevenue"),
        data: "string",
        minWidth: 200,
        maxWidth: 200,
        isPadded: true
      },
      {
        key: "numberOfIncidentsColumn",
        fieldName: "numberOfIncidents",
        name: props.t("app.tabularViewComponentConfig.numberOfIncidents"),
        data: "string",
        minWidth: 200,
        maxWidth: 200,
        isPadded: true
      },
      {
        key: "lastUpdatedColumn",
        fieldName: "lastUpdated",
        name: props.t("app.tabularViewComponentConfig.lastUpdated"),
        data: "string",
        minWidth: 200,
        maxWidth: 200,
        isPadded: true
      },
      {
        key: "subsidiariesColumn",
        fieldName: "Subsidiaries",
        name: props.t("app.tabularViewComponentConfig.subsidiaries"),
        data: "string",
        minWidth: 200,
        maxWidth: 200,
        isPadded: true
      }
    ];
  }

  componentDidMount = () => {
    this.setState({ isLoading: false });
  }

  generateItems = () => {
    const items = this.props.relationships
      ? this.props.relationships.map(element => {
        const item = {
          name: element.$relationshipName,
          source: element.$sourceId,
          target: element.$targetId,
          id: element.$relationshipId
        };
        return item;
      })
      : [];
    return items;
  }

  render() {
    const { isLoading, items } = this.state;
    return (
      <div className="ev-grid tabular-view">
        <DetailsList
          items={items}
          columns={this.columns}
          isHeaderVisible
          selectionMode={SelectionMode.none}
          width="70%" />
        {isLoading && <LoaderComponent />}
      </div>
    );
  }

}

export default withTranslation("translation", { withRef: true })(TabularViewComponent);
