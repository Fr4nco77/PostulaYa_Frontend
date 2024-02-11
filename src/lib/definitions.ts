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
    category: string;
    workday: string;
    recluter: string;
    company: string;
    location: string;
    platform: string;
    url: string;
    status: string;
    skills: Skills;
    created_at: string;
    updated_at: string;
}

export type Note = {
    _id: string;
    title: string;
    body: string;
    favorite?: boolean;
}

export type User = {
    username?: string;
    image?: string;
    skills?: string[];
}

export type Interview = {
    position: string;
    company: string;
    category: string;
    interviewer: string;
    user: {[key: string]: string};
    duration: string;
    preparation: string;
    feeling: string;
    questions: string[];
    answers: string[];
    feedback: string;
    observation: string;
    likes: string[];
    created_at: string;
}
