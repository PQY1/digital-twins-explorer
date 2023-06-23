// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import React, { Component } from "react";
import { DetailsList, SelectionMode } from "office-ui-fabric-react";
import LoaderComponent from "../LoaderComponent/LoaderComponent";
import { withTranslation } from "react-i18next";

import { eventService } from "../../services/EventService";

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
        isPadded: false
      },
      {
        key: "companyNameColumn",
        fieldName: "companyName",
        name: props.t("app.tabularViewComponentConfig.name"),
        data: "string",
        minWidth: 100,
        maxWidth: 200,
        isPadded: false
      },
      {
        key: "cipDegreeColumn",
        fieldName: "cipDegree",
        name: props.t("app.tabularViewComponentConfig.cipDegree"),
        data: "string",
        minWidth: 60,
        maxWidth: 80,
        isPadded: false
      },
      {
        key: "cipScoreColumn",
        fieldName: "cipScore",
        name: props.t("app.tabularViewComponentConfig.cipScore"),
        data: "string",
        minWidth: 60,
        maxWidth: 80,
        isPadded: false
      },
      {
        key: "ceoNameColumn",
        fieldName: "ceoName",
        name: props.t("app.tabularViewComponentConfig.ceoName"),
        data: "string",
        minWidth: 60,
        maxWidth: 100,
        isPadded: false
      },
      {
        key: "stateColumn",
        fieldName: "state",
        name: props.t("app.tabularViewComponentConfig.state"),
        data: "string",
        minWidth: 60,
        maxWidth: 80,
        isPadded: false
      },
      {
        key: "countryColumn",
        fieldName: "country",
        name: props.t("app.tabularViewComponentConfig.country"),
        data: "string",
        minWidth: 60,
        maxWidth: 80,
        isPadded: false
      },
      {
        key: "annualRevenueColumn",
        fieldName: "annualRevenue",
        name: props.t("app.tabularViewComponentConfig.annualRevenue"),
        data: "string",
        minWidth: 60,
        maxWidth: 80,
        isPadded: false
      },
      {
        key: "numberOfIncidentsColumn",
        fieldName: "numberOfIncidents",
        name: props.t("app.tabularViewComponentConfig.numberOfIncidents"),
        data: "string",
        minWidth: 80,
        maxWidth: 140,
        isPadded: false
      },
      {
        key: "lastUpdatedColumn",
        fieldName: "lastUpdated",
        name: props.t("app.tabularViewComponentConfig.lastUpdated"),
        data: "string",
        minWidth: 100,
        maxWidth: 200,
        isPadded: false
      },
      {
        key: "subsidiariesColumn",
        fieldName: "subsidiaries",
        name: props.t("app.tabularViewComponentConfig.subsidiaries"),
        data: "string",
        minWidth: 80,
        maxWidth: 200,
        isPadded: false
      }
    ];
  }

  componentDidMount = () => {
    this.setState({ isLoading: false });
  }

  generateItems = () => {
    const items = [
      {
        id: 1,
        companyName: "Inotiv",
        cipDegree: 2,
        cipScore: 97,
        ceoName: "Ben Franklin",
        state: "Idaho",
        country: "USA",
        annualRevenue: 10.6,
        numberOfIncidents: 4,
        lastUpdated: "12-23-2023",
        subsidiaries: 12
      },
      {
        id: 2,
        companyName: "Inovation Group",
        cipDegree: 4,
        cipScore: 43,
        ceoName: "John Adams",
        state: "Texas",
        country: "USA",
        annualRevenue: 230.6,
        numberOfIncidents: 2,
        lastUpdated: "2-3-2022",
        subsidiaries: 52
      }
    ];
    return items;
  }

  navigateToGraph = () => {
    eventService.publishOpenTabularView();
  }

  render() {
    const { isLoading, items } = this.state;
    return (
      <div className="ev-grid tabular-view">
        <DetailsList
          items={items}
          onActiveItemChanged={this.navigateToGraph}
          columns={this.columns}
          isHeaderVisible
          selectionMode={SelectionMode.single}
          width="70%" />
        {isLoading && <LoaderComponent />}
      </div>
    );
  }

}

export default withTranslation("translation", { withRef: true })(TabularViewComponent);
