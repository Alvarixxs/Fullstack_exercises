import axios from "axios";
import {Entry, NewEntry, Patient, PatientFormValues} from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const findById = async (id: string | undefined) : Promise<Patient> => {
  return await axios
    .get<Patient>(`${apiBaseUrl}/patients/${id}`)
    .then((response) => response.data);
};

const createEntry = async (id:string, object: NewEntry): Promise<Entry> => {
  const {data} = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );

  return data;
};

export default {
  getAll, create, findById, createEntry
};

