/**
 * Common types used across the application
 */

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface AsyncState<T> extends LoadingState {
  data: T | null;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

export interface FilterParams {
  [key: string]: string | number | boolean | undefined;
}

export interface ListState<T> {
  items: T[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
  limit: number;
  total: number;
}

export interface ModalState {
  isVisible: boolean;
  title?: string;
  message?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
}

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

export interface KeyValue {
  [key: string]: any;
}

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}
