/* eslint-disable */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import React, { Component } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Pivot, PivotItem, Stack, Customizations, Icon, Text } from "office-ui-fabric-react/lib/";

import { withTranslation } from "react-i18next";

import GraphViewerComponent from "./components/GraphViewerComponent/GraphViewerComponent";
import ModelGraphViewerComponent from "./components/ModelGraphViewerComponent/ModelGraphViewerComponent";
import ModelViewerComponent from "./components/ModelViewerComponent/ModelViewerComponent";
import { TwinViewerComponent } from "./components/TwinViewerComponent/TwinViewerComponent";
import { OutputComponent } from "./components/OutputComponent/OutputComponent";
import QueryComponent from "./components/QueryComponent/QueryComponent";
import { ImportComponent } from "./components/ImportComponent/ImportComponent";
import TabularViewComponent from "./components/TabularViewComponent/TabularViewComponent";
import { ConsoleComponent } from "./components/ConsoleComponent/ConsoleComponent";
import AppCommandBar from "./components/AppCommandBar/AppCommandBar";
import ErrorMessageModal from "./components/ErrorMessageComponent/ErrorMessageModal";
import ErrorMessageBar from "./components/ErrorMessageComponent/ErrorMessageBar";
import LoaderComponent from "./components/LoaderComponent/LoaderComponent";

import { eventService } from "./services/EventService";
import { settingsService } from "./services/SettingsService";
import { ModelService } from "./services/ModelService";
import { exportService } from "./services/ExportService";
import themeVariables from "./theme/variables";
import { darkFabricTheme, darkFabricThemeHighContrast } from "./theme/DarkFabricTheme";
import logo from "./assets/Logo_Only.png";

import "prismjs/components/prism-json";
import "prismjs/themes/prism.css";
import ModelUploadMessageBar from "./components/ModelUploadMessageBar/ModelUploadMessageBar";
import { STRING_DTDL_TYPE } from "./services/Constants";
import ErrorPage from "./components/ErrorPage/ErrorPage";


const layoutConfig = {
  borderWidth: 3,
  minItemWidth: 15,
  headerHeight: 24,
  minDrawerHeight: 20,
  maxDrawerHeight: 300
};


const ENTER_KEY_CODE = 13;

const LEFT_ARROW_KEY_CODE = 37;
const RIGHT_ARROW_KEY_CODE = 39;
const CLOSING_BRACKET_KEY_CODE = 221;

const contrastOptions = {
  high: "high-contrast",
  normal: "normal"
};

class Search extends Component {

  toggleOptionalComponent = id => {
    this.setState(prevState => {
      const newState = { ...prevState };
      switch (id) {
        case "output":
          newState.layout.showOutput = !prevState.layout.showOutput;
          break;
        case "console":
          newState.layout.showConsole = !prevState.layout.showConsole;
          break;
        default:
          break;
      }
      return newState;
    });
  }
  
  toggleHighContrastMode = isHighContrast => {
    const contrast = isHighContrast ? contrastOptions.high : contrastOptions.normal;
    settingsService.contrast = contrast;
    this.setState({ contrast },
      () => this.setCurrentContrast());
  }

  render() {
    const { isLoading, layout, mainContentSelectedKey, leftPanelSelectedKey, contrast, selectedDisplayNameProperty, possibleDisplayNameProperties } = this.state;
    const optionalComponentsState = this.optionalComponents.map(p => {
      p.show = layout[p.showProp];
      return p;
    });
    return (
      <>
      <div role="banner" className="header" >
      <Stack horizontal className="top-bar">
        <div>
          <img src={logo} width={20} height={20} alt="" />
          <h1 className="top-bar-title">Propinquity CIP Engine</h1>
        </div>
        <AppCommandBar optionalComponents={optionalComponentsState}
          optionalComponentsState={optionalComponentsState}
          toggleOptionalComponent={this.toggleOptionalComponent}
          toggleHighContrastMode={this.toggleHighContrastMode}
          contrast={contrast} />
      </Stack>
    </div>
      </>
    );
  }

}

export default withTranslation()(Search);
