export type Routes = {
    path: string,
    name: string,
    icon: string,
    layout?: string,
    role?: string
}

export declare type DataRequest = {
    _id: string,
    user: string,
    fileId: string,
    resource: string,
    comment: string,
    status: string
};

export declare type Visa = {
    exp: number
    format: string
    ga4gh_visa_v1: Assertion
    iat: number
    iss: string
    sub: string
};

export declare type Assertion = {
    sub?: string,
    type: string,
    value: string,
    source: string,
    by: string,
    asserted: number
};


export declare type Policy = {
    _id: string,
    dacId: string,
    fileId: string,
    acl: string,
    policy: string
}

export declare type DACInfo = {
    dacId?: string,
    dacName?: string,
    dacStudy?: string,
    datasets?: string,
    adminName?: string,
    adminSurname?: string,
    emailAddress?: string,
    studyDescription?: string,
    status?: boolean
};