export interface Meta {
    lastUpdated: Date;
}

export interface Link {
    relation: string;
    url: string;
}

export interface Search {
    mode: string;
}

export interface Meta2 {
    profile: string[];
}

export interface Identifier {
    value: string;
    system: string;
}

export interface Name {
    given: string[];
    family: string[];
}

export interface Address {
    line: string[];
    use: string;
    postalCode: string;
}

export interface ManagingOrganization {
    reference: string;
}

export interface Meta3 {
    profile: string[];
}

export interface Identifier2 {
    system: string;
    value: string;
}

export interface Address2 {
    line: string[];
    postalCode: string;
}

export interface Telecom {
    value: string;
    use: string;
    system: string;
}

export interface Contained {
    resourceType: string;
    meta: Meta3;
    id: string;
    identifier: Identifier2[];
    address: Address2[];
    telecom: Telecom[];
    name: string;
}

export interface Resource {
    id: string;
    resourceType: string;
    meta: Meta2;
    identifier: Identifier[];
    name: Name[];
    address: Address[];
    telecom: any[];
    managingOrganization: ManagingOrganization;
    contained: Contained[];
    gender: string;
    birthDate: string;
}

export interface Entry {
    search: Search;
    resource: Resource;
}

export interface SearchResponse {
    resourceType: string;
    id: string;
    meta: Meta;
    type: string;
    total: number;
    link: Link[];
    entry: Entry[];
}

export interface RootObject {
    searchResponse: SearchResponse;
}
