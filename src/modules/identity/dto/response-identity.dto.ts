export class ResponseIdentityDto {
  id: string;
  email: string;
  status: 'active' | 'blocked';
  created_at: Date;
  last_login_at: Date | null;
}
