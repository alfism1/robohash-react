import { CHANGE_SEARCH_FIELD } from './constans';

export const setSearchField = text => ({
  type: CHANGE_SEARCH_FIELD,
  payload: text,
});