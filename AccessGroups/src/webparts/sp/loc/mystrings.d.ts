declare interface ISpWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  ListFieldLabel: string;
  ListCKBoxLabel: string;
}

declare module 'SpWebPartStrings' {
  const strings: ISpWebPartStrings;
  export = strings;
}
