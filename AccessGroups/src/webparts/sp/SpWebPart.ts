import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneCheckbox,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './SpWebPart.module.scss';
import * as strings from 'SpWebPartStrings';

import 'jquery';

import {SPComponentLoader} from '@microsoft/sp-loader';

export interface ISpWebPartProps {
  showWpTitle: boolean;  
  description: string;
  spList: string;
  siteURL1: string;
  listID: string;
  showMod1: boolean;
  tableIdNum: string;
}

declare var $;
export default class SpWebPartWebPart extends BaseClientSideWebPart<ISpWebPartProps> {
  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  myList = require("./ListGroups");

  public render(): void {
    var isHidden = this.properties.showMod1;
    var isTitle = this.properties.showWpTitle;
    var xStyle = "visibility: hidden";
    var xTitleStyle = "";

    if(isHidden == true){
      xStyle = "";
    } else {
      xStyle = "visibility: hidden";
    }

    if(isTitle == true){
      xTitleStyle = "";
    } else {
      xTitleStyle = "visibility: hidden";
    }

    this.domElement.innerHTML = `
    <div class="${styles.sp}">
    <!--<div class="${styles.container}">-->

          <!--<span class="ms-font-xl ms-fontColor-red" id="ErrorResults"></span>-->
          <div  style="${escape(xTitleStyle)}">
            <span class="ms-font-xl ms-fontColor-black">Access Group</span>
            <p class="ms-font-l ms-fontColor-black">${escape(this.properties.description)}</p>
          </div>
          <p class="ms-font-xl ms-fontColor-black">${escape(this.properties.spList)}</p>
          <div style=${escape(xStyle)}>
            <a href="${escape(this.properties.siteURL1)}/_layouts/15/people.aspx?MembershipGroupId=${escape(this.properties.listID)}" class="${styles.button}" target="_blank" >
              <span class="ms-fontColor-white ${styles.label}">Manage Group</span>
            </a>
          </div>

          <div id="ResultsTable${escape(this.properties.tableIdNum)}"></div> 
    <!--</div>-->
    </div>
    `;

    this.context.pageContext.site.absoluteUrl;
    this.myList.init(this.properties.siteURL1,this.properties.spList,this.properties.tableIdNum);
   
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    this.properties.listID = this.myList.id(this.properties.spList);
    return {
      pages: [
        {
          header: {
            description: "Edit the web part properties"/*strings.PropertyPaneDescription*/
          },
          groups: [
            {
              groupName: "Site",
              groupFields: [
                PropertyPaneTextField('siteURL1', {
                  label: 'Site URL'
                })
              ]
            },
            {
              groupName: "Table id",
              groupFields: [
                PropertyPaneTextField('tableIdNum', {
                  label: 'Table id (If this is copy set this to a different number than the other(s).)'
                })
              ]
            },
            {
              groupName: "Title",
              groupFields: [
                PropertyPaneCheckbox('showWpTitle', {
                  text: 'Display Title/Description'
                }),
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            },
            {
              groupName: "List",
              groupFields: [
                PropertyPaneTextField('spList', {
                  label: strings.ListFieldLabel
                }),
                PropertyPaneTextField('listID', {
                  label: 'List ID'
                }),
                PropertyPaneCheckbox('showMod1', {
                  text: strings.ListCKBoxLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
