export enum FILE_TYPES {
  pdf = 'pdf',
  image = 'image',
  file = 'file',
}

export interface Profile {
  name: string
  picture: string
  user_id: string
  email: string
  current_plan: string
  enterprise_id: string
  status: string
}

export interface GetProfileResponse {
  data: Profile
}
