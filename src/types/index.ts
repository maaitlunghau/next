// Common types used across the application

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };
