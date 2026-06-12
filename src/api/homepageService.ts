import api from "./api";

export const homepageService = {
  getHomeContent: () => api.get("/HomePageContent/home"),

  getAllContent: () => api.get("/HomePageContent/all"),

  createContent: (data: any) => api.post("/HomePageContent/create", data),

  toggleContent: (id: number) => api.put(`/HomePageContent/toggle/${id}`),
};
