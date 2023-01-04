import { ILayoutStore } from "./reducer";

export interface IRootStore {
  layout: ILayoutStore;
}

export const sidebarState = (store: IRootStore) => store.layout.sidebarOpen;

export const selectSchools = (store: IRootStore) => store.layout.schools;
export const selectGraduateSchools = (store: IRootStore) =>
  store.layout.schools.filter((school) => school.graduate_school === true);

export const selectUndergraduateSchools = (store: IRootStore) =>
  store.layout.schools.filter((school) => school.undergraduate_school === true);

export const selectJuniorSchools = (store: IRootStore) =>
  store.layout.schools.filter(
    (school) => school.junior_transfer_school === true
  );
export const selectTests = (store: IRootStore) => store.layout.tests;
export const selectCategories = (store: IRootStore) => store.layout.categories;

export const selectSubjects = (store: IRootStore) => store.layout.subjects;
export const selectSubjectsByCategoryId = (
  store: IRootStore,
  category: string
) => store.layout.subjects[category];
