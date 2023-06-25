/* eslint-disable */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import React, { Component } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Pivot, PivotItem, Stack, Customizations, Icon, TextField, SearchBox, Button, DefaultButton } from "office-ui-fabric-react/lib/";
import { withTranslation } from "react-i18next";
import { WebResource, HttpMethods, HttpHeadersLike, HttpHeaders, RawHttpHeaders } from "@azure/core-http";

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

import { hookHttpClient } from "./services/ApiService";
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
  
  optionalComponents = [
    {
      id: "console",
      name: this.props.t("app.optionalComponents.console"),
      showProp: "showConsole"
    },
    {
      id: "output",
      name: this.props.t("app.optionalComponents.output"),
      showProp: "showOutput"
    }
  ]

  constructor(props) {
    
    super(props);
    this.state = {      
      exportedQuery: "",
      isLoading: false,
      searchExpression: "",
      layout: {
        modelViewerWidth: 0,
        drawerHeight: 20,
        showImport: false,
        importFile: null,
        showTabularView: false,
        showOutput: false,
        showConsole: false
      },
      modelUploadResults: null,
      mainContentSelectedKey: "graph-viewer",
      leftPanelSelectedKey: "models",
      contrast: contrastOptions.normal,
      possibleDisplayNameProperties: [],
      selectedDisplayNameProperty: "",
      relationships: []
    };
  }
  
  
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

  callWebHook = () => {

    const payload = {
      "@type": "ActiveCard",
      "@context": "http://schema.org/extensions",
      "themeColor": "1be3bb",
      "summary": "Summary goes here",
      "sections": [
          {
              "activityTitle": "**Title goes here**",
              "activitySubtitle": "Subtitle goes here",
              "activityImage": "https://demostoragepqy.blob.core.windows.net/publicshare/Logo_Stacked_Color_No_Tag_Icon.png",
              "facts": [
                  {
                      "name": "Report date",
                      "value": "Date/Time goes here"
                  },
                  {
                      "name": "Status",
                      "value": "Status goes here"
                  },
                  {
                      "name": "Risk Assessment Score",
                      "value": "<strong style='color:#e74714'>High</strong>"
                  }
              ],
              "markdown": true
          }
      ],
      "potentialAction": [
          {
              "@type": "ActionCard",
              "name": "Add a comment",
              "inputs": [
                  {
                      "@type": "TextInput",
                      "id": "comment",
                      "isMultiline": false,
                      "title": "Add a comment here for this task"
                  }
              ],
              "actions": [
                  {
                      "@type": "HttpPOST",
                      "name": "Add comment",
                      "target": "https://docs.microsoft.com/outlook/actionable-messages"
                  }
              ]
          },
          {
              "@type": "OpenUri",
              "name": "View Graph Node",
              "targets": [
                  {
                      "os": "default",
                      "uri": "https://demo.propinquity.one/graph"
                  }
              ]
          },
          {
              "@type": "ActionCard",
              "name": "Change status",
              "inputs": [
                  {
                      "@type": "MultichoiceInput",
                      "id": "list",
                      "title": "Select a status",
                      "isMultiSelect": "false",
                      "choices": [
                          {
                              "display": "In Progress",
                              "value": "1"
                          },
                          {
                              "display": "Active",
                              "value": "2"
                          },
                          {
                              "display": "Closed",
                              "value": "3"
                          }
                      ]
                  }
              ],
              "actions": [
                  {
                      "@type": "HttpPOST",
                      "name": "Save",
                      "target": "https://docs.microsoft.com/outlook/actionable-messages"
                  }
              ]
          }
      ]
    };

    const request = {
      url: "https://propinquity.webhook.office.com/webhookb2/b2b1947d-f98d-4e04-a492-6f58ad70db59@919368bf-e989-46f9-bbb7-26c80e8e6b63/IncomingWebhook/3c2df48d4ce14d1a9e3fc1a91d592060/b46773af-6cfc-4936-bd8e-8715f264103d"
    };

    const header = new HttpHeaders();
    const resource = new WebResource(request.url, "POST", JSON.stringify(payload), null,  header, false, false);

    hookHttpClient.sendRequest(resource);
  }

  render() {
    const { layout, contrast } = this.state;
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
    <div className="search-area">
    <SearchBox id="searchExpressionTextField" placeholder="Search for companies" onSearch={newValue => console.log('value is ' + newValue)} />
    <DefaultButton type="submit" onClick={this.callWebHook} ></DefaultButton>
    <TabularViewComponent />
    </div>
      </>
    );
  }

}

export default withTranslation()(Search);


/*
export default () => {
  const history = useHistory();
  withTranslation()(Search)
  return (
      <Search history={history} />
  )
}*/