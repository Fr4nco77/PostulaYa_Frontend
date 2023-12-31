export type FormValue = FormDataEntryValue | null

export type RawFormData = {
    [k: string]: FormDataEntryValue;
}

export type Errors = {
    [key: string]: string[]
}

export type FilterProps = {
    placeholder: string;
    names: string[];
    values: string[];
    query: string;
};

export type ApplicationQuery = {
    query: string;
    token: string
}

export type Skills = {
    _id: string,
    name: string
}[]
