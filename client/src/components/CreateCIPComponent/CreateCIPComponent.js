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
      showModal: false,
      observationDate: new Date(),
      summary: ""
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

  onSummaryChange = evt => this.setState({ summary: evt.target.value });

  onObservationDateChange = evt => this.setState({ observationDate: evt.target.value });

  sendCip = () => {
    const payload = {
      "@type": "ActiveCard",
      "@context": "http://schema.org/extensions",
      "themeColor": "1be3bb",
      "summary": this.state.summary,
      "sections": [
          {
              "activityTitle": "Interesting Luggage Detected",
              "activitySubtitle": "LAX Airport",
              "activityImage": "https://demostoragepqy.blob.core.windows.net/publicshare/Logo_Stacked_Color_No_Tag_Icon.png",
              "facts": [
                  {
                      "name": "Report date",
                      "value": this.state.observationDate.toString()
                  },
                  {
                      "name": "Status",
                      "value": "Status goes here"
                  },
                  {
                      "name": "Risk Assessment Score",
                      "value": "<strong style='color:#e74714'>High</strong>"
                  },
                  {
                      "name": "Summary",
                      "value": this.state.summary
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
      url: "https://propinquity.webhook.office.com/webhookb2/b2b1947d-f98d-4e04-a492-6f58ad70db59@919368bf-e989-46f9-bbb7-26c80e8e6b63/IncomingWebhook/f4f6056546854818971411eef062c49f/4620c3a9-e502-4c7c-a583-ab44fe0c55a4"
    };

    const header = new HttpHeaders();
    const resource = new WebResource(request.url, "POST", JSON.stringify(payload), null, header, false, false);

    hookHttpClient.sendRequest(resource);
    this.setState({ showModal: false });
  };

  render() {
    const { showModal, observationDate, summary } = this.state;

    return (
      <ModalComponent isVisible={showModal} className="cip-modal">
        <div style={{ width: 650, height: 400 }}>
          <h2>
            Create CIP
          </h2>
          <Label>Upload</Label>
          <input id="json-file-input" type="file" name="name" />
          <Label>Observation Date</Label>
          <DatePicker value={observationDate} onChange={this.onObservationDateChange}
            placeholder="Select a date..." />
          <TextField label="Description" multiline rows={8} text={summary} onChange={this.onSummaryChange} />
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
