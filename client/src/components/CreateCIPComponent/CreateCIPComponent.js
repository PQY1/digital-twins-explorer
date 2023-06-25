/* eslint-disable max-len */
/* eslint-disable indent */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import ModalComponent from "../ModalComponent/ModalComponent";


import React, { Component } from "react";

import { DatePicker, DefaultButton, Label, TextField } from "office-ui-fabric-react";

import { WebResource, HttpHeaders} from "@azure/core-http";
import { hookHttpClient } from "../../services/ApiService";

import "./CreateCIPComponent.scss";


export class CreateCIPComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  resetModalState = () => {
    this.setState({
      showModal: false
    });
  };

  open = () => {
    this.setState({ showModal: true });
  }

  close = () => {
    this.setState({ showModal: false });
  }

  sendCip = () => {
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
    const resource = new WebResource(request.url, "POST", JSON.stringify(payload), null, header, false, false);

    hookHttpClient.sendRequest(resource);
    this.setState({ showModal: false });
  };

  render() {
    const { showModal } = this.state;

    return (
      <ModalComponent isVisible={showModal} className="cip-modal">
        <div style={{ width: 650, height: 400 }}>
          <h2>
            Create CIP
          </h2>
          <Label>Upload</Label>
          <input id="json-file-input" type="file" name="name" />
          <Label>Observation Date</Label>
          <DatePicker
            placeholder="Select a date..." />
          <Label>Description</Label>
          <TextField label="Standard" multiline rows={4} />
          <div className="btn-group">
            <DefaultButton
              className="modal-button close-button"
              onClick={this.close}>Close
            </DefaultButton>
            <DefaultButton text="Send" onClick={this.sendCip} />
          </div>
        </div>
      </ModalComponent>
    );
  }

}
