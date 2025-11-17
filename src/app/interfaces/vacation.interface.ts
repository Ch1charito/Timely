export interface Vacation {
  id?: string;
  vacStart: string;
  vacEnd: string;
  daysNeeded: number;
  reason: string;
  approved: boolean;
}