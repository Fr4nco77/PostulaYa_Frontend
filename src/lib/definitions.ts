export type FormValue = FormDataEntryValue | null

export type RawFormData = {
    [k: string]: FormDataEntryValue;
}

export type Errors = {
    [key: string]: string[];
}

export interface FilterProps {
    placeholder: string;
    names: string[];
    values: string[];
    query: string;
};

export type ApplicationQuery = {
    query: string;
    token: string;
}

export type Skill = {
    _id: string;
    name: string;
}

export type Skills = Skill[]

export type Application = {
    _id: string;
    position: string;
    modality: string;
    type: string;
    recluter: string;
    company_name: string;
    company_ubication: string;
    platform: string;
    url: string;
    status: string;
    skills: Skills;
    notes?: string[];
    created_at: string;
    updated_at: string;
}

export type Note = {
    _id: string;
    title: string;
    body: string;
}

export type User = {
    username?: string;
    image?: string;
    skills?: string[];
}
