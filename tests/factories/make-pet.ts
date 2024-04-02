interface MakePetParams {
  id?: string
  name?: string
  description?: string
  type?: 'DOG' | 'CAT' | 'BIRD' | 'RODENT' | 'REPTILE' | 'OTHER'
  age?: 'BABY' | 'YOUNG' | 'ADULT' | 'SENIOR' | 'OTHER'
  size?: 'SMALL' | 'MEDIUM' | 'LARGE' | 'XLARGE' | 'OTHER'
  stamina?: 'LOW' | 'MEDIUM' | 'HIGH' | 'OTHER'
  autonomy?: 'LOW' | 'MEDIUM' | 'HIGH' | 'OTHER'
  org_id?: string
  org_city?: string
}

export function makePet(params?: MakePetParams) {
  return {
    id: params?.id ?? 'dsadasda',
    name: params?.name ?? 'Gato 1',
    description: params?.description ?? 'Gato Laranja',
    type: params?.type ?? 'CAT',
    age: params?.age ?? 'ADULT',
    size: params?.size ?? 'SMALL',
    stamina: params?.stamina ?? 'LOW',
    autonomy: params?.autonomy ?? 'LOW',
    photos: ['photo1', 'photo2'],
    org_id: params?.org_id ?? 'org-id-1',
    city: params?.org_city ?? 'Cidade dos Gatos',
  }
}
