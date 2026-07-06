import api from "./api";
import type { Resource } from "../types";

export const resourceService = {
  getPublished: () => api.get<Resource[]>("/resource"),

  getAllAdmin: () => api.get<Resource[]>("/resource/all"),

  create: (data: Partial<Resource>) => api.post("/resource", data),

  update: (id: number, data: Partial<Resource>) =>
    api.put(`/resource/${id}`, data),

  remove: (id: number) => api.delete(`/resource/${id}`),
};
