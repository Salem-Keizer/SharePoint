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
  description: string;
  spList: string;
  siteURL1: string;
  showMod1: boolean;
}

declare var $;
export default class SpWebPartWebPart extends BaseClientSideWebPart<ISpWebPartProps> {
  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  public render(): void {
    const myList = require("./ListGroups");
    var isHidden = this.properties.showMod1;
    var xStyle = "visibility: hidden";
    //var xListID = myList.id(this.properties.spList);
    
    if(isHidden == true){
      xStyle = "";
    } else {
      xStyle = "visibility: hidden";
    }

    this.domElement.innerHTML = `
    <div class="${styles.sp}">
    <!--<div class="${styles.container}">-->

          <span class="ms-font-xl ms-fontColor-red" id="ErrorResults"></span>
          <span class="ms-font-xl ms-fontColor-black">Access Group</span>
          <p class="ms-font-l ms-fontColor-black">${escape(this.properties.description)}</p>
          <p class="ms-font-l ms-fontColor-black">${escape(this.properties.spList)}</p>
          <div style=${escape(xStyle)}>
            <a href="${escape(this.properties.siteURL1)}/_layouts/15/people.aspx?MembershipGroupId=`+ myList.id(this.properties.spList) +`" class="${styles.button}" target="_blank" >
              <span class="ms-fontColor-white ${styles.label}">Manage Group</span>
            </a>
          </div>
          <br/><br/>
          <div id="ResultsTable"></div> 
    <!--</div>-->
    </div>
    `;

    this.context.pageContext.site.absoluteUrl;
    myList.init(this.properties.siteURL1,this.properties.spList);

  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: ""/*strings.PropertyPaneDescription*/
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('siteURL1', {
                  label: 'Site URL'
                }),
                PropertyPaneTextField('spList', {
                  label: strings.ListFieldLabel
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
