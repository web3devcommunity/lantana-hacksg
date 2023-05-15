import { User } from "./user";

export type CauseAttestation = {
  user: User;
  date?: Date;
  comment: string;
  isProfessional: boolean;
};
